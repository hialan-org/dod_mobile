import React from "react";
import {View, StyleSheet, Dimensions} from 'react-native';

export const Line = () => {
    return <View
        style={{
            borderBottomColor: 'black',
            // borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: 1,
        }}
    />
}