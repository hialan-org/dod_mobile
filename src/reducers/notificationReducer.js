import {
    GET_STAT_REQUESTED,
    GET_STAT_SUCCESS,
    GET_STAT_FAILED,
    GET_NOTIFICATION,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAILED
} from "../actions/types";

const initialState = [{
    id: 1,
    content: 'Welcome to DoD',
}, {
    id: 2,
    content: 'Let\'s begin your investment',
}, {
    id: 3,
    content: 'Thank you',
},
]

export default function statReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOTIFICATION:
            return {
                ...state,
            };
        case GET_NOTIFICATION_SUCCESS:
            return {
                ...state,
            }
        case GET_NOTIFICATION_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}