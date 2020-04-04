import {
    GET_TOP_YIELD_STOCKS_REQUESTED,
    GET_TOP_YIELD_STOCKS_SUCCESS,
    GET_TOP_YIELD_STOCKS_FAILED,
} from "../actions/types";
import {formatDateString} from "../utils";

const allStocksMock = [{
    id: '1',
    dividendYield: 0.0377652,
    symbol: 'AAPL',
    companyName: 'Apple',
    latestPrice: 500
}, {
    id: '2',
    symbol: 'AMZN',
    dividendYield: 0.037762,
    companyName: 'Amazon',
    latestPrice: '600'
}, {
    id: '3',
    symbol: 'MSFT',
    dividendYield: 0.03772,
    companyName: 'Microsoft',
    latestPrice: '445'
}, {
    id: '4',
    dividendYield: 0.032,
    symbol: 'AXP',
    companyName: 'American Express',
    latestPrice: '321'
}, {
    id: '5',
    dividendYield: 0.0352,
    symbol: 'KO',
    companyName: 'Coca-Cola',
    latestPrice: '432'
}, {
    id: '6',
    symbol: 'DIS',
    dividendYield: 0.752,
    companyName: 'Walt Disney',
    latestPrice: '532'
},
];


const initialState = {
    topStocksByDate: {},
    allStocks: allStocksMock,
}

export default function stockReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOP_YIELD_STOCKS_REQUESTED:
            return {
                ...state,
            };
        case GET_TOP_YIELD_STOCKS_SUCCESS:
            action.payload.stocks.sort((s1, s2) =>{
                return s2.dividendYield - s1.dividendYield;
            }).slice(0,5)
            return {
                ...state,
                topStocksByDate: {
                    ...state.topStocksByDate,
                    [formatDateString(action.payload.date)]: action.payload.stocks.sort((s1, s2) =>{
                        return s2.dividendYield - s1.dividendYield;
                    }).slice(0,5)
                },
            }
        case GET_TOP_YIELD_STOCKS_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}