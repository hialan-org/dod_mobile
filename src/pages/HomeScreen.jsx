import {View, Text, Button, StyleSheet, SafeAreaView, ScrollView, StatusBar, Dimensions} from "react-native";
import React, {useState, useEffect} from "react";
import {
    GET_OWNED_STOCKS_REQUESTED,
    GET_PROFIT_REQUESTED,
    GET_STOCKS_PRICE_REQUESTED,
} from "../actions/types";
import {connect} from 'react-redux';
import ProfitChart from "../components/ProfitChart";
import {Entypo} from '@expo/vector-icons';
import {common} from "../utils/stylesheet";
import {ListStock} from "../components/ListStocks";
import {Line} from "../components/Line";
import {Colors, DataTable, Subheading} from "react-native-paper";
import {getUserInSecureStore, getYesterday} from "../utils";

// const { height } = Dimensions.get('window');

const yesterday = getYesterday();
let weekBefore = new Date(getYesterday());
weekBefore.setDate(weekBefore.getDate() - 7);

function HomeScreen({
                        profit, getOwnedStocksLoading, myStocksMap,
                        getProfit, getOwnedStocks
                    }) {

    useEffect(() => {
        getUserInSecureStore().then((user) => {
            getProfit(user.userId, 0, weekBefore, yesterday);
        });
        myStocksMap == null && getOwnedStocks();
    }, [])

    const renderMyStocks = (stock, index) => {
        return (
            <DataTable.Row key={`item-${index}`}>
                <DataTable.Cell>{stock.symbol}</DataTable.Cell>
                <DataTable.Cell>${stock.buyPrice}</DataTable.Cell>
                <DataTable.Cell>${stock.latestPrice}</DataTable.Cell>
                <DataTable.Cell>{stock.quantity}</DataTable.Cell>
            </DataTable.Row>
        );
    }

    return (
        <View style={common.containerWrapper}>
            <StatusBar barStyle="light-content" backgroundColor="#468189"/>
            <ScrollView
                style={{flex: 1}}
                contentContainerStyle={common.scrollView}
                scrollEnabled={true}
            >
                <View style={common.container}>
                    <Text style={common.title}>Investing!!!</Text>
                    <Text
                        style={[styles.profit, profit >= 0 ? styles.positiveProfit : styles.negativeProfit]}>
                        {profit >= 0 ?
                            (<Entypo name="triangle-up" style={[{color: "green"}, common.icon]}/>) :
                            (<Entypo name="triangle-down" style={[{color: "green"}, common.icon]}/>)}
                        {profit}
                    </Text>
                    <ProfitChart/>
                    <Line/>
                    <Subheading style={common.label}>My stocks: </Subheading>

                    <ListStock titles={["Symbol", "Buy Price", "Latest Price", "Quantity"]}
                               loading={getOwnedStocksLoading}
                               stocks={myStocksMap ? Array.from(myStocksMap.values()) : []}
                               renderItem={renderMyStocks}/>
                    {/*<ListStock*/}
                    {/*    titles={["Symbol", "Price", "Yield"]}*/}
                    {/*    stocks={stocksPrice}*/}
                    {/*    renderItem={renderItem}*/}
                    {/*    loading={getStocksHistoryLoading}/>*/}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    profit: {
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    positiveProfit: {
        color: "green",
    },
    negativeProfit: {
        color: "red",
    },
    content: {
        flexGrow: 1,
        justifyContent: "space-between",
        padding: 10,
    },
});

const mapStateToProps = state => {
    return {
        myStocksMap: state.stock.myStocksMap,
        user: state.user,
        profit: state.stat.profit,
        getOwnedStocksLoading: state.loading.getOwnedStocks,
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getProfit: (userId, stockId, startDate, endDate) => dispatch({
            type: GET_PROFIT_REQUESTED,
            payload: {
                userId: userId,
                stockId: stockId,
                startDate: startDate,
                endDate: endDate,
            }
        }),
        getOwnedStocks: () => dispatch({
            type: GET_OWNED_STOCKS_REQUESTED,
        })
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);