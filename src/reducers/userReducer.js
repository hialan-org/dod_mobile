import {
    LOGIN_REQUESTED,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_REQUESTED,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS, GET_PROFIT_SUCCESS
} from "../actions/types";

const initialState = {
    email: '',
    accessToken: '',
    role: '',
    userId: null,
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                role: action.payload.role,
                email: action.payload.email,
                accessToken: action.payload.accessToken,
                user: action.payload.userId,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                role: '',
                email: '',
                accessToken: '',
            }
        default:
            return state;
    }
}