import baseApi from './base-service'
import * as Constant from '../constant'
import {useEffect, useState} from "react";

export function getGoogleAuthorizationUrl(state) {

  let params = new URLSearchParams({
    response_type: 'code',
    client_id: Constant.GOOGLE_CLIENT_ID,
    scope: 'openid profile',
    redirect_uri: Constant.GOOGLE_OPEN_ID_CONNECT_REDIRECT_URI,
    state: state
  });
  let url = `${Constant.GOOGLE_OPEN_ID_CONNECT_ENDPOINT}?${params.toString()}`;
  return url;
}

export async function getState() {
  try {
    const res = await baseApi.get(`/get_state`);
    console.debug(res)
    return res.data;
  } catch (error) {
    console.debug(error);
  }
}

export async function getTwitterToken() {
  try {
    const res = await baseApi.get(`/get/twitter_token`);
    console.debug(res)
    return res.data;
  } catch (error) {
    console.debug(error);
  }
}

export function getTwitterAuthorizationUrl(token) {
  try {
    let params = new URLSearchParams({
      oauth_token: token
    });
    let url = `${Constant.REACT_APP_TWITTER_OAUTH_ENDPOINT}?${params.toString()}`;
    return url;
  } catch (error) {
    console.debug(error);
  }
}


export async function logout() {
  try {
    const res = await baseApi.get(`/logout`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}