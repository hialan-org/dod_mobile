import * as SecureStore from 'expo-secure-store';
import {getTopYieldStocksByDateSuccess, getRebalanceStocksByDateSuccess, loginSuccess} from "../actions";
import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
    GET_TOP_YIELD_STOCKS_REQUESTED,
    GET_TOP_YIELD_STOCKS_SUCCESS,
    GET_TOP_YIELD_STOCKS_FAILED,
    GET_STOCK_FAILED,
    GET_STOCK_SUCCESS,
    GET_STOCK_REQUESTED,
    MANAGE_STOCK_SUCCESS,
    MANAGE_STOCK_FAILED,
    MANAGE_STOCK_REQUESTED,
    GET_OWNED_STOCKS_REQUESTED,
    GET_OWNED_STOCKS_FAILED,
    GET_OWNED_STOCKS_SUCCESS, GET_STOCKS_PRICE_REQUESTED, GET_STOCKS_PRICE_FAILED, GET_STOCKS_PRICE_SUCCESS,
} from "../actions/types";
import {getOwnedStocksApi, getStockApi, getStocksPriceByDateApi, getTopYieldApi, manageStockApi} from "../utils/API";
import {formatDateString} from "../utils";

function* getTopYieldStocksWorker(action) {
    try{
        const listStocks = yield call(getTopYieldApi, formatDateString(action.payload.date),10);
        yield put(getTopYieldStocksByDateSuccess(listStocks, action.payload.date));
    } catch (e) {
        alert("Error: " + e);
        yield put({type: GET_TOP_YIELD_STOCKS_FAILED, payload: e});
    }
}

function* getTopYieldWatcher() {
    yield takeEvery(GET_TOP_YIELD_STOCKS_REQUESTED, getTopYieldStocksWorker);
}

function* getStockWorker(action) {
    try {
        const listStocks = yield call(getStockApi)
        yield put({
            type: GET_STOCK_SUCCESS,
            payload: {
                stocks: listStocks,
            }
        })
    } catch (e) {
        alert("Error: " + e);
        yield put({type: GET_STOCK_FAILED, payload: e})
    }
}

function* getStockWatcher() {
    yield takeEvery(GET_STOCK_REQUESTED, getStockWorker)
}

function* manageStockWorker(action) {
    try {
        const result = yield call(manageStockApi, action.payload);
        yield put({
            type: MANAGE_STOCK_SUCCESS,
            payload: result,
        })
    } catch (e){
        alert("Error: " + e);
        yield put({
            type: MANAGE_STOCK_FAILED,
            payload: e,
        })
    }
}

function* manageStockWatcher() {
    yield takeEvery(MANAGE_STOCK_REQUESTED, manageStockWorker)
}

function* getOwnedStocksWorker(action) {
    try {
        const stocks = yield call(getOwnedStocksApi);
        yield put({
            type: GET_OWNED_STOCKS_SUCCESS,
            payload: stocks,
        })
    } catch (e){
        alert("Error: " + e);
        yield put({
            type: GET_OWNED_STOCKS_FAILED,
            payload: e,
        })
    }
}

function* getOwnedStocksWatcher() {
    yield takeEvery(GET_OWNED_STOCKS_REQUESTED, getOwnedStocksWorker)
}

function* getStocksPriceWorker(action) {
    try{
        const result = yield call(getStocksPriceByDateApi, formatDateString(action.payload.date))
        yield put({
            type: GET_STOCKS_PRICE_SUCCESS,
            payload: {
                stocks: result,
            }
        })
    } catch(e){
        alert(e);
        yield put({
            type: GET_STOCKS_PRICE_FAILED,
            payload: e,
        })
    }
}

function* getStocksPriceWatcher() {
    yield takeEvery(GET_STOCKS_PRICE_REQUESTED, getStocksPriceWorker)
}

export function* stockSaga() {
    yield all([
        getStockWatcher(),
        getTopYieldWatcher(),
        manageStockWatcher(),
        getOwnedStocksWatcher(),
        getStocksPriceWatcher(),
    ])
}