import * as SecureStore from "expo-secure-store";
import {ACCESS_TOKEN, EMAIL, ROLE} from "../constants/SecureStore";

export const formatDateString = (date) => {
    return (date.getMonth()+1) + "-" + date.getDate() + "-" + date.getFullYear();
}

export const getUserInSecureStore = async() => {
    console.log("Check SecureStore");
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
    const email = await SecureStore.getItemAsync(EMAIL);
    const role = await SecureStore.getItemAsync(ROLE);
    if(accessToken && email && role) {
        return {
            accessToken: accessToken,
            email: email,
            role: role,
        }
    }
    return null;
}

export const clearSecureStore = async() => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(EMAIL);
    await SecureStore.deleteItemAsync(ROLE);
}