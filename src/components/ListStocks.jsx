import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

function Item({ stock }) {
    return (
        <View style={styles.item}>
            <Text style={styles.text}>{stock.symbol}</Text>
            <Text style={styles.text}>${stock.latestPrice}</Text>
            <Text style={styles.text}>{stock.dividendYield}</Text>
        </View>
    );
}

export const ListStock = ({stocks}) => {
    return (
        <View style={styles.container}>
            {stocks.map((stock,index) => {
                return (
                    <Item stock={stock} key={index}/>
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
    item: {
        // backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 15,
        alignSelf: 'flex-start',
    },
});