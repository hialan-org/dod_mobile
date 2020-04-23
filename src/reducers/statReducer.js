import {
    GET_STAT_REQUESTED, GET_STAT_SUCCESS, GET_STAT_FAILED, GET_PROFIT_SUCCESS
} from "../actions/types";

const initialState = {
    profit: 0,
    profitByDate: null,
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
        case GET_PROFIT_SUCCESS:
            const profitByDate = action.payload.profit.sort((s1,s2) => {
                return s1.date - s2.date;
            })
            const userProfit = profitByDate[profitByDate.length-1].userProfit;
            return {
                ...state,
                profitByDate: profitByDate,
                profit: userProfit,
            }
        default:
            return state;
    }
}