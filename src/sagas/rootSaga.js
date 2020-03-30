import {loginWatcher, logoutWatcher} from "./userSaga";
import { all } from 'redux-saga/effects';
import {getDoDWatcher} from "./stockSaga";

export default function* rootSaga() {
    yield all([
        loginWatcher(),
        logoutWatcher(),
        getDoDWatcher(),
    ])
    // code after all-effect
}