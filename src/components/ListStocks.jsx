import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import Constants from 'expo-constants';
import {common} from "../utils/stylesheet";

export const ListStock = ({titles, stocks, renderItem}) => {
    return (
        <View style={styles.container}>
            <View style={common.tableItem}>
                {titles.map((title, index) =>
                    <Text style={common.tableTitle} key={`title-${index}`}>{title}</Text>
                )}
            </View>
            {stocks.map((stock, index) => {
                return (
                    renderItem(stock, index)
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
    },
});