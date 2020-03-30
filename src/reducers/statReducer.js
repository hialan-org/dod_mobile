import {
    GET_STAT_REQUESTED, GET_STAT_SUCCESS, GET_STAT_FAILED
} from "../actions/types";

const initialState = {
    profit: 10,
}

export default function statReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STAT_REQUESTED:
            return {
                ...state,
            };
        case GET_STAT_SUCCESS:
            return {
                ...state,
            }
        case GET_STAT_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}