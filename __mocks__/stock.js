const stocksSymbol = [{
    symbol: "AAPL",
    stockId: 1,
}, {
    symbol: "AMZN",
    stockId: 2,
}, {
    symbol: "MSN",
    stockId: 3,
}];

const stocksPrice = [{
    stock : {
        symbol: "AAPL",
    },
    latestPrice: 45,
    dividendYield: 0.001,
}, {
    stock : {
        symbol: "AMZN",
    },
    latestPrice: 50,
    dividendYield: 0.002,
}, {
    stock : {
        symbol: "MSN",
    },
    latestPrice: 55,
    dividendYield: 0.003,
}]

export const stock = {
    topStocksByDate: null,
    stocksPrice: stocksPrice,
    stocksSymbol: stocksSymbol,
    myStocks: null,
}