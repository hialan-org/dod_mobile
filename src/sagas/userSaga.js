import * as SecureStore from 'expo-secure-store';
import {loginSuccess} from "../actions";
import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
    GET_PROFIT_FAILED,
    GET_PROFIT_REQUESTED, GET_PROFIT_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUESTED,
    LOGOUT_FAILED,
    LOGOUT_REQUESTED,
    LOGOUT_SUCCESS
} from "../actions/types";
import {getProfitByDate, loginApi} from "../utils/API";
import {ACCESS_TOKEN, EMAIL, ROLE, USER_ID} from "../constants/SecureStore";
import {addUserInfoToSecureStore, formatDateString} from "../utils";

function* loginWorker(action) {
    try{
        // const response = yield call(fetchUserApi, 1000);
        const user = yield call(loginApi, action.payload);
        yield call(addUserInfoToSecureStore, user);
        yield put(loginSuccess(user));
    } catch (e) {
        alert("Error: " + e);
        yield put({type: LOGIN_FAILED, payload: e});
    }
}

function* loginWatcher() {
    yield takeEvery(LOGIN_REQUESTED, loginWorker);
}

function* logoutWorker(action){
    try{
        yield put({type: LOGOUT_SUCCESS});
    } catch (e) {
        yield put({type: LOGOUT_FAILED});
    }
}

function* logoutWatcher() {
    yield takeEvery(LOGOUT_REQUESTED, logoutWorker);
}

function* getProfitWorker(action){
    try{
        const {userId, stockId, startDate, endDate} = action.payload;
        const result = yield call(getProfitByDate,
            userId, stockId, formatDateString(startDate), formatDateString(endDate));
        yield put({
            type: GET_PROFIT_SUCCESS,
            payload: {
                profit: result,
            }
        });
    } catch(e){
        yield put({type: GET_PROFIT_FAILED})
    }
}

function* getProfitWatcher() {
    yield takeEvery(GET_PROFIT_REQUESTED, getProfitWorker)
}

export function* userSaga() {
    yield all([
        loginWatcher(),
        logoutWatcher(),
        getProfitWatcher(),
    ])
}