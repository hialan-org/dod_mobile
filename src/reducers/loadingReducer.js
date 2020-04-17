import {FAILED, REQUEST, SUCCESS} from "../constants/API";
import {
    GET_NOTIFICATION_REQUESTED,
    GET_OWNED_STOCKS_FAILED,
    GET_OWNED_STOCKS_REQUESTED,
    GET_OWNED_STOCKS_SUCCESS,
    GET_STAT_REQUESTED,
    GET_STOCK_REQUESTED,
    GET_STOCKS_PRICE_REQUESTED,
    GET_TOP_YIELD_STOCKS_FAILED,
    GET_TOP_YIELD_STOCKS_REQUESTED,
    GET_TOP_YIELD_STOCKS_SUCCESS,
    LOGIN_REQUESTED,
    LOGOUT_REQUESTED,
    MANAGE_STOCK_REQUESTED
} from "../actions/types";

const classify = (type) => {
    if(type.includes(REQUEST)){
        return REQUEST;
    }
    if(type.includes(SUCCESS)){
        return SUCCESS;
    }
    if(type.includes(FAILED)){
        return FAILED;
    }
}

const initialState = {
    general: false,
    getOwnedStocks: false,
    getTopYield: false,
}

export default function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_OWNED_STOCKS_REQUESTED:
            return {
                ...state,
                getOwnedStocks: true,
            }
        case GET_OWNED_STOCKS_SUCCESS:
        case GET_OWNED_STOCKS_FAILED:
            return {
                ...state,
                getOwnedStocks: false,
            }
        case GET_TOP_YIELD_STOCKS_REQUESTED:
            return {
                ...state,
                getTopYield: true,
            }
        case GET_TOP_YIELD_STOCKS_SUCCESS:
        case GET_TOP_YIELD_STOCKS_FAILED:
            return {
                ...state,
                getTopYield: false,
            }
        case LOGIN_REQUESTED:
        case LOGOUT_REQUESTED:
        case GET_STAT_REQUESTED:
        case GET_NOTIFICATION_REQUESTED:
        case GET_STOCK_REQUESTED:
        case MANAGE_STOCK_REQUESTED:
        case GET_STOCKS_PRICE_REQUESTED:
            return {
                ...state,
                general: true,
            };
        default:
            return {
                ...state,
                general: false,
            };
    }
}