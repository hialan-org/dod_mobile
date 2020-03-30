import {LOGIN_REQUESTED, LOGIN_SUCCESS, GET_DOD_SUCCESS} from "./types";

export const loginRequest = (accessCode) => ({ type: LOGIN_REQUESTED, payload: accessCode })

export const loginSuccess = (user) => (
    { type: LOGIN_SUCCESS, payload: user }
)

export const getDoDSuccess = (stocks) => (
    { type: GET_DOD_SUCCESS, payload: stocks}
)