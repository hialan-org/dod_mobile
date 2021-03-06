import {View, StyleSheet, ScrollView, StatusBar} from "react-native";
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
import {Colors, DataTable, Subheading, Text} from "react-native-paper";
import {getUserInSecureStore, getYesterday} from "../utils";

// const { height } = Dimensions.get('window');

const yesterday = getYesterday();
let weekBefore = new Date(getYesterday());
weekBefore.setDate(weekBefore.getDate() - 7);

function HomeScreen({
                        getProfitLoading, profit, getOwnedStocksLoading, myStocks,
                        getProfit, getOwnedStocks
                    }) {
    const [user, setUser] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);

    useEffect(() => {
        getUserInSecureStore().then((result) => {
            setUser(result);
        });
        myStocks == null && getOwnedStocks();
    }, [])

    useEffect(() => {
        if (user) {
            getProfit(user.userId, 0, weekBefore, yesterday);
        }
    }, [user])

    const renderMyStocks = (stock, index) => {
        const currentGain = stock.quantity*(stock.latestPrice - stock.buyPrice);
        return (
            <DataTable.Row key={`item-${index}`}
                           onPress={() => {
                               if(selectedStock && stock.stockId === selectedStock.stockId){
                                   getProfit(user.userId, 0, weekBefore, yesterday);
                                   setSelectedStock(null);
                               } else {
                                   getProfit(user.userId, stock.stockId, weekBefore, yesterday);
                                   setSelectedStock(stock);
                               }
                           }}
                           style={selectedStock && stock.stockId===selectedStock.stockId ? common.tableRowSelected : common.tableRow}
            >
                <DataTable.Cell>{stock.symbol}</DataTable.Cell>
                <DataTable.Cell>${stock.buyPrice}</DataTable.Cell>
                <DataTable.Cell>{stock.quantity}</DataTable.Cell>
                <DataTable.Cell>
                    <Text style={{color: currentGain>=0 ? 'green' : 'red'}}>${currentGain.toFixed(1)}</Text>
                </DataTable.Cell>
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
                    {!getProfitLoading && <Text
                        style={[styles.profit, profit >= 0 ? styles.positiveProfit : styles.negativeProfit]}>
                        {profit >= 0 ?
                            (<Entypo name="triangle-up" style={[{color: "green"}, common.icon]}/>) :
                            (<Entypo name="triangle-down" style={[{color: "green"}, common.icon]}/>)}
                        {profit}
                    </Text>}
                    <ProfitChart/>
                    <Line/>
                    <Subheading style={common.label}>My stocks</Subheading>

                    <ListStock titles={["Symbol", "Buy Price", "Quantity", "Gain/Loss"]}
                               loading={getOwnedStocksLoading}
                               stocks={myStocks ? Array.from(myStocks.values()) : []}
                               renderItem={renderMyStocks}/>
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
        myStocks: state.stock.myStocks,
        user: state.user,
        profit: state.stat.profit,
        getOwnedStocksLoading: state.loading.getOwnedStocks,
        getProfitLoading: state.loading.getProfit,
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