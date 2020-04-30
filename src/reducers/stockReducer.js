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
    myStocks: null,
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
            // let myStocks = new Map();
            // action.payload.map((stock, index) => {
            //     myStocks.set(stock.stockId, stock);
            // })
            return {
                ...state,
                myStocks: action.payload,
            }
        case MANAGE_STOCK_SUCCESS:
            let myStocks = [...state.myStocks];
            action.payload.map((ownedStock, index) => {
                let tmpStock = myStocks.find(stock => stock.stockId === ownedStock.stockId);
                if(tmpStock){
                    if(ownedStock.stockQuantity == 0){
                        myStocks = myStocks.filter(stock => stock.stockId!=ownedStock.stockId);
                    } else {
                        tmpStock.buyPrice = ownedStock.stockAveragePrice;
                        tmpStock.quantity = ownedStock.stockQuantity;
                    }
                } else {
                    tmpStock = {
                        buyPrice: ownedStock.stockAveragePrice,
                        latestPrice: ownedStock.latestPrice,
                        quantity: ownedStock.stockQuantity,
                        stockId: ownedStock.stockId,
                        symbol: ownedStock.symbol,
                    }
                    // myStocks.set(tmpStock.stockId, tmpStock);
                    myStocks.push(tmpStock);
                }
            });
            return {
                ...state,
                myStocks: myStocks,
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