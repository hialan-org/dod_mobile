import * as SecureStore from 'expo-secure-store';
import {getTopYieldStocksByDateSuccess, loginSuccess} from "../actions";
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import {
    GET_TOP_YIELD_STOCKS_REQUESTED,
    GET_TOP_YIELD_STOCKS_SUCCESS,
    GET_TOP_YIELD_STOCKS_FAILED,
} from "../actions/types";
import {getTopYieldApi} from "../utils/API";
import {formatDateString} from "../utils";

function* getTopYieldStocksWorker(action) {
    try{
        // const response = yield call(fetchUserApi, 1000);
        const listStocks = yield call(getTopYieldApi, formatDateString(action.payload.date),10);
        // console.log(listStocks.sort((s1, s2) =>{
        //     return s2.dividendYield - s1.dividendYield;
        // }).slice(0,5));
        yield put(getTopYieldStocksByDateSuccess(listStocks, action.payload.date));
    } catch (e) {
        alert("Error: " + e);
        yield put({type: GET_TOP_YIELD_STOCKS_FAILED, payload: e});
    }
}
export function* getDoDWatcher() {
    yield takeEvery(GET_TOP_YIELD_STOCKS_REQUESTED, getTopYieldStocksWorker);
}