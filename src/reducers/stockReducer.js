import {
    GET_TOP_YIELD_STOCKS_REQUESTED,
    GET_TOP_YIELD_STOCKS_SUCCESS,
    GET_TOP_YIELD_STOCKS_FAILED, GET_STOCK_FAILED, GET_STOCK_SUCCESS, GET_OWNED_STOCKS_SUCCESS, MANAGE_STOCK_SUCCESS,
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
    topStocksByDate: null,
    allStocks: allStocksMock,
    stocksSymbol: null,
    myStocksMap: null,
}

export default function stockReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOP_YIELD_STOCKS_REQUESTED:
            return {
                ...state,
            };
        case GET_TOP_YIELD_STOCKS_SUCCESS:
            return {
                ...state,
                topStocksByDate: {
                    ...state.topStocksByDate,
                    [formatDateString(action.payload.date)]: action.payload.stocks,
                },
            }
        case GET_STOCK_SUCCESS:
            return {
                ...state,
                stocksSymbol: action.payload.stocks,
            }
        case GET_OWNED_STOCKS_SUCCESS:
            const myStocksMap = new Map();
            action.payload.map((stock, index) => {
                myStocksMap.set(stock.stockId, stock);
            })
            return {
                ...state,
                myStocksMap: myStocksMap,
            }
        case MANAGE_STOCK_SUCCESS:
            //TODO:
            action.payload.map((ownedStock, index) => {
                let tmpStock = state.myStocksMap.get(ownedStock.stockId);
                if(tmpStock){
                    if(ownedStock.stockQuantity == 0){
                        state.myStocksMap.delete(ownedStock.stockId);
                    } else {
                        tmpStock = {
                            ...tmpStock,
                            buyPrice: ownedStock.stockAveragePrice,
                            quantity: ownedStock.stockQuantity,
                        }
                        state.myStocksMap.set(ownedStock.stockId, tmpStock);
                    }
                } else {
                    tmpStock = {
                        buyPrice: ownedStock.stockAveragePrice,
                        latestPrice: ownedStock.latestPrice,
                        quantity: ownedStock.stockQuantity,
                        stockId: ownedStock.stockId,
                        symbol: ownedStock.symbol,
                    }
                    state.myStocksMap.set(tmpStock.stockId, tmpStock);
                }
            });
            return {
                ...state,
            }
        default:
            return {
                ...state,
            }
    }
}