import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

function Item({ stock }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{stock.symbol}</Text>
            <Text style={styles.title}>${stock.price}</Text>
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
    title: {
        fontSize: 20,
    },
});