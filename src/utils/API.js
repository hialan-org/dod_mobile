import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {ACCESS_TOKEN} from "../constants/SecureStore";

const API_BASE_URL = 'https://5dih1d57x5.execute-api.us-west-1.amazonaws.com/Prod';

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
            return err;
        });
}

export const getDoDApi = async () => {
    const getDodApiUrl = '/stocks/dogOfTheDow';
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
            return err;
        });
}