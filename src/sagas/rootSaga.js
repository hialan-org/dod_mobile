import {loginWatcher, logoutWatcher} from "./userSaga";
import { all } from 'redux-saga/effects';
import {getTopYieldWatcher, stockSaga} from "./stockSaga";

export default function* rootSaga() {
    yield all([
        loginWatcher(),
        logoutWatcher(),
        stockSaga(),
    ])
    // code after all-effect
}