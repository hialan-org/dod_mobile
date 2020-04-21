import {MANAGE_STOCK_FAILED, MANAGE_STOCK_SUCCESS} from "../actions/types";

const initialState = {
    general: false,
    getOwnedStocks: false,
    getTopYield: false,
}

const initialState = {
    success: null,
    error: null,
}

export default function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case MANAGE_STOCK_SUCCESS:
            return {
                ...state,
                success: "",
            }
        case MANAGE_STOCK_FAILED:
            return {
                ...state,
                error: "",
            }
        default:
            return {
                ...state,
                success: null,
                error: null,
            };
    }
}