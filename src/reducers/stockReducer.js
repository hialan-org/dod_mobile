import {
    GET_DOD_REQUESTED,
    GET_DOD_SUCCESS,
    GET_DOD_FAILED,
} from "../actions/types";

const allStocksMock = [{
    id: '1',
    symbol: 'AAPL',
    price: '500'
}, {
    id: '2',
    symbol: 'AMZN',
    price: '600'
}, {
    id: '3',
    symbol: 'MSFT',
    price: '445'
}, {
    id: '4',
    symbol: 'AXP',
    price: '321'
}, {
    id: '5',
    symbol: 'KO',
    price: '432'
}, {
    id: '6',
    symbol: 'DIS',
    price: '532'
},
];

const initialState = {
    dodStocks: [],
    allStocks: allStocksMock,
}

export default function stockReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOD_REQUESTED:
            return {
                ...state,
            };
        case GET_DOD_SUCCESS:
            return {
                ...state,
            }
        case GET_DOD_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}