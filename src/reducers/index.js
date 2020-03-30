import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import loadingReducer from "./loadingReducer";
import statReducer from "./statReducer";
import stockReducer from "./stockReducer";
import notificationReducer from "./notificationReducer";

export default combineReducers({
    user: userReducer,
    loading: loadingReducer,
    stat: statReducer,
    stock: stockReducer,
    notifications: notificationReducer,
});