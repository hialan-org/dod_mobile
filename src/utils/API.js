import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {ACCESS_TOKEN} from "../constants/SecureStore";
import {API_BASE_URL} from "../constants/data";


export const loginApi = async (accessToken) => {
    const loginApiUrl = '/loginWithGoogle';
    let options = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    }
    return axios.post(API_BASE_URL + loginApiUrl, {}, options)
        .then(result => {
            return result.data.body;
        }).catch(err => {
            console.log(err);
            throw err;
        });
}

export const getTopYieldApi = async (date, range) => {
    const getDodApiUrl = `/stocks/getTopYield?date=${date}&range=${range}`;
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
    let options = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    }
    return axios.get(API_BASE_URL + getDodApiUrl, options)
        .then(result => {
            return result.data;
        }).catch(err => {
            console.log(err);
            throw err;
        });
}

export const getStockApi = async () => {
    const getStockApiUrl = `/stocks`;
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
    let options = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    }
    return axios.get(API_BASE_URL + getStockApiUrl, options)
        .then(result => {
            return result.data;
        }).catch(err => {
            console.log(err);
            throw err;
        });
}

export const manageStockApi = async (stock) => {
    const manageStockApi = `/users/addStock`;
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
    let options = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    }
    return axios.post(API_BASE_URL + manageStockApi, stock, options)
        .then(result => {
            return result.data;
        }).catch(err => {
            console.log(err);
            throw err;
        })
}

export const getOwnedStocksApi = async () => {
    const getOwnedStocks = '/users/stocks';
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
    let options = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    }
    return axios.get(API_BASE_URL + getOwnedStocks, options)
        .then(result => {
            return result.data;
        }).catch(err => {
            console.log(err);
            throw err;
        })
}

export const getStocksPriceByDateApi = async (date) => {
    const getDodApiUrl = `/stocks/stock-history/${date}`;
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
    let options = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    }
    return axios.get(API_BASE_URL + getDodApiUrl, options)
        .then(result => {
            return result.data.body.stocksHistory;
        }).catch(err => {
            console.log(err);
            throw err;
        });
}