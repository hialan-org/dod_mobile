import {LOGIN_REQUESTED, LOGIN_SUCCESS, GET_TOP_YIELD_STOCKS_SUCCESS} from "./types";

export const loginRequest = (accessCode) => ({ type: LOGIN_REQUESTED, payload: accessCode })

export const loginSuccess = (user) => (
    { type: LOGIN_SUCCESS, payload: user }
)

export const getTopYieldStocksByDateSuccess = (stocks, date) => (
    { type: GET_TOP_YIELD_STOCKS_SUCCESS, payload: {stocks: stocks, date: date}}
)