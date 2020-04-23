import {userSaga} from "./userSaga";
import {stockSaga} from "./stockSaga";
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        userSaga(),
        stockSaga(),
    ])
    // code after all-effect
}