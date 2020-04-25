import {
    GET_TOP_YIELD_STOCKS_REQUESTED,
    GET_TOP_YIELD_STOCKS_SUCCESS,
    GET_TOP_YIELD_STOCKS_FAILED,
    GET_STOCK_FAILED,
    GET_STOCK_SUCCESS,
    GET_OWNED_STOCKS_SUCCESS,
    MANAGE_STOCK_SUCCESS,
    GET_STOCKS_PRICE_SUCCESS, LOGOUT_SUCCESS,
} from "../actions/types";
import {formatDateString} from "../utils";

const initialState = {
    topStocksByDate: null,
    stocksPrice: null,
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
                stocksSymbol: action.payload.stocks.sort((s1,s2) => {
                    return s1.symbol.localeCompare(s2.symbol);
                }),
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
        case GET_STOCKS_PRICE_SUCCESS:
            return {
                ...state,
                stocksPrice: action.payload.stocks.sort((s1, s2) => {
                    return s1.stock.symbol.localeCompare(s2.stock.symbol);
                }),
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return {
                ...state,
            }
    }
}