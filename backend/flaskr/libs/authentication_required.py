from functools import wraps

from flask import session, jsonify


def authentication_required(f):

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get('user_id') is None:
            return jsonify({'message': 'Unauthorized'}), 401

        return f(*args, **kwargs)

    return decorated_function
