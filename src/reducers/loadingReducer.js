import {FAILED, REQUEST, SUCCESS} from "../constants/API";
import {
    GET_NOTIFICATION_REQUESTED,
    GET_OWNED_STOCKS_FAILED,
    GET_OWNED_STOCKS_REQUESTED,
    GET_OWNED_STOCKS_SUCCESS, GET_PROFIT_FAILED, GET_PROFIT_REQUESTED, GET_PROFIT_SUCCESS,
    GET_STAT_REQUESTED,
    GET_STOCK_REQUESTED, GET_STOCKS_PRICE_FAILED,
    GET_STOCKS_PRICE_REQUESTED, GET_STOCKS_PRICE_SUCCESS,
    GET_TOP_YIELD_STOCKS_FAILED,
    GET_TOP_YIELD_STOCKS_REQUESTED,
    GET_TOP_YIELD_STOCKS_SUCCESS,
    LOGIN_REQUESTED,
    LOGOUT_REQUESTED, LOGOUT_SUCCESS, MANAGE_STOCK_FAILED,
    MANAGE_STOCK_REQUESTED, MANAGE_STOCK_SUCCESS
} from "../actions/types";

const initialState = {
    general: false,
    getOwnedStocks: false,
    getTopYield: false,
    getStocksHistory: false,
    getProfit: false,
    manageStock: false,
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
        case GET_STOCKS_PRICE_REQUESTED:
            return {
                ...state,
                getStocksHistory: true,
            }
        case GET_STOCKS_PRICE_SUCCESS:
        case GET_STOCKS_PRICE_FAILED:
            return {
                ...state,
                getStocksHistory: false,
            }
        case GET_PROFIT_REQUESTED:
            return {
                ...state,
                getProfit: true,
            }
        case GET_PROFIT_SUCCESS:
        case GET_PROFIT_FAILED:
            return {
                ...state,
                getProfit: false,
            }
        case MANAGE_STOCK_REQUESTED:
            return {
                ...state,
                manageStock: true,
            }
        case MANAGE_STOCK_SUCCESS:
        case MANAGE_STOCK_FAILED:
            return {
                ...state,
                manageStock: false,
            }
        case LOGOUT_SUCCESS:
            return initialState;
        case LOGIN_REQUESTED:
        case LOGOUT_REQUESTED:
        case GET_STAT_REQUESTED:
        case GET_NOTIFICATION_REQUESTED:
        case GET_STOCK_REQUESTED:
            return {
                ...state,
                general: true,
            }
        default:
            return {
                ...state,
                general: false,
            };
    }
}