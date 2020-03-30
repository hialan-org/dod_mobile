import * as SecureStore from 'expo-secure-store';
import {getDoDSuccess, loginSuccess} from "../actions";
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
    GET_DOD_REQUESTED,
    GET_DOD_SUCCESS,
    GET_DOD_FAILED,
} from "../actions/types";
import {getDoDApi} from "../utils/API";

function* getDoDWorker(action) {
    try{
        // const response = yield call(fetchUserApi, 1000);
        const listStocks = yield call(getDoDApi);
        yield put(getDoDSuccess(listStocks));
    } catch (e) {
        alert("Error: " + e);
        yield put({type: GET_DOD_FAILED, payload: e});
    }
}
export function* getDoDWatcher() {
    yield takeEvery(GET_DOD_REQUESTED, getDoDWorker);
}