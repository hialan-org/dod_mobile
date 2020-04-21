import {View, Text, Button, StyleSheet, SafeAreaView, ScrollView, StatusBar, Dimensions} from "react-native";
import React, {useState, useEffect} from "react";
import {GET_STOCKS_PRICE_REQUESTED, GET_TOP_YIELD_STOCKS_REQUESTED, LOGOUT_REQUESTED} from "../actions/types";
import {connect} from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';
import ProfitChart from "../components/ProfitChart";
import {Ionicons, Entypo} from '@expo/vector-icons';
import {common} from "../utils/stylesheet";
import {ListStock} from "../components/ListStocks";
import {Line} from "../components/Line";
import {DataTable} from "react-native-paper";
import {isWeekend} from "../utils";

// const { height } = Dimensions.get('window');

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
while(isWeekend(yesterday)){
    yesterday.setDate(yesterday.getDate()-1);
}

function HomeScreen({profit, stocksPrice, loadingGetStocksHistory, getStocksPrice}) {

    // state = {
    //     screenHeight: height,
    // };

    // onContentSizeChange = (contentWidth, contentHeight) => {
    //     this.setState({ screenHeight: contentHeight });
    // };

    useEffect(() => {
        getStocksPrice(yesterday);
    }, [])

    const renderItem = (stockPrice, index) => {
        return (
            <DataTable.Row key={`item-${index}`}>
                <DataTable.Cell>{stockPrice.stock.symbol}</DataTable.Cell>
                <DataTable.Cell>${stockPrice.latestPrice}</DataTable.Cell>
                <DataTable.Cell>{stockPrice.dividendYield}</DataTable.Cell>
            </DataTable.Row>
        );
    }
        // const scrollEnabled = this.state.screenHeight > height;
        return (
            <View style={common.containerWrapper}>
                <StatusBar barStyle="light-content" backgroundColor="#468189"/>
                <ScrollView
                    style={{flex: 1}}
                    contentContainerStyle={common.scrollView}
                    scrollEnabled={true}
                    // scrollEnabled={scrollEnabled}
                    // onContentSizeChange={this.onContentSizeChange}
                >
                    <View style={common.container}>
                        <Text style={common.title}>Investing!!!</Text>
                        <Text
                            style={[styles.profit, profit >= 0 ? styles.positiveProfit : styles.negativeProfit]}>
                            {profit >= 0 ?
                                (<Entypo name="triangle-up" style={common.icon}/>) :
                                (<Entypo name="triangle-down" style={common.icon}/>)}
                            {profit}
                        </Text>
                        <ProfitChart/>
                        <Line/>
                        <Text>Stocks</Text>
                        <ListStock
                            titles={["Symbol", "Price", "Yield"]}
                            stocks={stocksPrice}
                            renderItem={renderItem}
                            loading={loadingGetStocksHistory}/>
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
        profit: state.stat.profit,
        stocksPrice: state.stock.stocksPrice,
        loadingGetStocksHistory: state.loading.getStocksHistory,
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getStocksPrice: (date) => dispatch({
            type: GET_STOCKS_PRICE_REQUESTED,
            payload: {
                date: date,
            }
        }),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);