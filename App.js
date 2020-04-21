import React from 'react';
import {Provider} from "react-redux";
import store from "./src/store";
import Navigation from "./src/pages/Navigation";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import {
    I18nManager,
} from "react-native";
import {translate} from "./src/i18n";

const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    en: () => require("./src/i18n/en.json"),
};

const setI18nConfig = () => {
    // fallback if no available language fits
    const fallback = { locale: "en", isRTL: false };

    const { locale, isRTL } = Localization || fallback;
    console.log(locale);

    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = { [locale]: translationGetters[locale]() };
    i18n.locale = locale;
};

export default class App extends React.Component {

    constructor(props) {
        super(props);
        // setI18nConfig();
    }

    componentDidMount() {
    }

    render() {
        return (
            <Provider store={store}>
                <Navigation/>
            </Provider>
        );
    }
}