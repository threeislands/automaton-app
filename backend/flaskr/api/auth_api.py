import hashlib
import os
from urllib.parse import parse_qs

import jwt
import requests
from flask import (
    Blueprint, redirect, request, session, jsonify, make_response, current_app
)
from requests_oauthlib import OAuth1Session

from flaskr.model.user import User
from flaskr.service.user_service import UserService

bp = Blueprint('auth', __name__, )


@bp.route('/get_state')
def get_session():
    state = hashlib.sha256(os.urandom(1024)).hexdigest()
    session['state'] = state
    return make_response(jsonify({'state': state}))


@bp.route('/google_openid_connect_redirect_uri')
def redirect_user():

    if request.args.get('state') != session['state']:
        return redirect(current_app.config['FRONT_APP_DEFAULT_URL'], code='302')

    code = request.args.get('code')
    body = {
        'code': code,
        'client_id': current_app.config['GOOGLE_OPENID_CONNECT_CLIENT_ID'],
        'client_secret': current_app.config['GOOGLE_OPENID_CONNECT_CLIENT_SECRET'],
        'redirect_uri': current_app.config['GOOGLE_OPENID_CONNECT_REDIRECT_URI'],
        'grant_type': 'authorization_code'
    }

    res = requests.post(current_app.config['GOOGLE_OPENID_CONNECT_ENDPOINT'], body)
    res_body = res.json()
    id_token = res_body['id_token']
    payload = jwt.decode(id_token, verify=False)

    external_identifier = payload['sub']
    display_name = payload['name']

    google_auth_code = current_app.config['GOOGLE_AUTH_CODE']
    user = UserService.find_by_user_identifier_and_external_auth_code(
        external_identifier, google_auth_code)

    if user is None:
        new_user = User(external_identifier=external_identifier,
                        display_name=display_name,
                        external_auth_code=google_auth_code)
        UserService.create(new_user)
        session['user_id'] = new_user.id
    else:
        session['user_id'] = user.id

    return redirect(current_app.config['FRONT_APP_DEFAULT_URL'], code='302')


@bp.route('/get/twitter_token')
def get_twitter_token():
    twitter = OAuth1Session(current_app.config['TWITTER_OAUTH_CONSUMER_KEY'],
                            current_app.config['TWITTER_OAUTH_CONSUMER_SECRET'])
    # 1.0
    info = twitter.post(current_app.config['TWITTER_OAUTH_REQUEST_TOKEN_ENDPOINT'])
    con = info.content.decode('utf-8')
    qs = parse_qs(con)
    token = qs['oauth_token'][0]

    res = jsonify({'token': token})

    return res


@bp.route('/twitter_oauth_redirect_uri')
def redirect_twitter():

    args = request.args
    oauth_token = args['oauth_token']
    oauth_verifier = args['oauth_verifier']

    twitter = OAuth1Session(current_app.config['TWITTER_OAUTH_CONSUMER_KEY'],
                            current_app.config['TWITTER_OAUTH_CONSUMER_SECRET'])

    info = twitter.post(current_app.config['TWITTER_OAUTH_ACCESS_TOKEN_ENDPOINT'],
                        {
                            'oauth_token': oauth_token,
                            'oauth_verifier': oauth_verifier
                        })

    con = info.content.decode('utf-8')
    qs = parse_qs(con)
    twitter_user_id = qs['user_id'][0]

    twitter_auth_code = current_app.config['TWITTER_AUTH_CODE']
    user = UserService.find_by_user_identifier_and_external_auth_code(
        twitter_user_id, twitter_auth_code)

    if user is None:
        user_info = twitter.get(current_app.config['TWITTER_SHOW_USERS_ENDPOINT'], params={
            'user_id': twitter_user_id
        })
        new_user = User(external_identifier=twitter_user_id,
                        display_name=user_info.json()['name'],
                        external_auth_code=twitter_auth_code)
        UserService.create(new_user)
        session['user_id'] = new_user.id
    else:
        session['user_id'] = user.id

    return redirect(current_app.config['FRONT_APP_DEFAULT_URL'], code='302')


@bp.route('/logout')
def logout():
    session.clear()
    return make_response({})
