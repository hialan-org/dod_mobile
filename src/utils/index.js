import * as SecureStore from "expo-secure-store";
import {ACCESS_TOKEN, EMAIL, ROLE, USER_ID} from "../constants/SecureStore";

export const formatDateString = (date) => {
    return (date.getMonth()+1) + "-" + date.getDate() + "-" + date.getFullYear();
}

export const timestampToDate = (timestamp) => {
    const tmp = new Date(timestamp);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = tmp.getFullYear();
    // const month = months[tmp.getMonth()];
    const month = tmp.getMonth()+1;
    const date = tmp.getUTCDate();
    const time = month + '-' + date;
    return time;
}

export const getUserInSecureStore = async() => {
    // console.log("Check SecureStore");
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
    const email = await SecureStore.getItemAsync(EMAIL);
    const role = await SecureStore.getItemAsync(ROLE);
    const userId = await SecureStore.getItemAsync(USER_ID);
    if(accessToken && email && role && userId) {
        return {
            accessToken: accessToken,
            email: email,
            role: role,
            userId: parseInt(userId),
        }
    }
    return null;
}

export const clearSecureStore = async() => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(EMAIL);
    await SecureStore.deleteItemAsync(ROLE);
    await SecureStore.deleteItemAsync(USER_ID);
}

export const addUserInfoToSecureStore = async(user) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN, user.accessToken);
    await SecureStore.setItemAsync(EMAIL, user.email);
    await SecureStore.setItemAsync(ROLE, user.role);
    await SecureStore.setItemAsync(USER_ID, user.userId.toString());
}

export const isWeekend = (date) => {
    if(date.getDay() === 6 || date.getDay()==0) {
        return true;
    }
    return false;
}

export const getYesterday = () => {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    while(isWeekend(yesterday)){
        yesterday.setDate(yesterday.getDate()-1);
    }
    return yesterday;
}