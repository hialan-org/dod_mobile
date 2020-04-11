import {View, Text, Button, StyleSheet, SafeAreaView, ScrollView, StatusBar, Dimensions} from "react-native";
import React from "react";
import {GET_TOP_YIELD_STOCKS_REQUESTED, LOGOUT_REQUESTED} from "../actions/types";
import {connect} from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';
import ProfitChart from "../components/ProfitChart";
import {Ionicons, Entypo} from '@expo/vector-icons';
import {common} from "../utils/stylesheet";
import {ListStock} from "../components/ListStocks";
import {Line} from "../components/Line";

const { height } = Dimensions.get('window');

// function HomeScreen({navigation, logout, profit}) {
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        screenHeight: height,
    };

    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.props.logout();
    };

    componentDidMount = () => {
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
    };

    renderItem = (stock, index) => {
        return (
            <View style={common.tableItem} key={index}>
                <Text style={common.tableText}>{stock.symbol}</Text>
                <Text style={common.tableText}>${stock.latestPrice}</Text>
                <Text style={common.tableText}>{stock.dividendYield}</Text>
            </View>
        );
    }

    render() {
        const scrollEnabled = this.state.screenHeight > height;
        return (
            <View style={common.containerWrapper}>
                <StatusBar barStyle="light-content" backgroundColor="#468189"/>
                <ScrollView
                    style={{flex: 1}}
                    contentContainerStyle={common.scrollView}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View style={common.container}>
                        <Text style={common.title}>Investing</Text>
                        <Text
                            style={[styles.profit, this.props.profit >= 0 ? styles.positiveProfit : styles.negativeProfit]}>
                            {this.props.profit >= 0 ?
                                (<Entypo name="triangle-up" style={common.icon}/>) :
                                (<Entypo name="triangle-down" style={common.icon}/>)}
                            {this.props.profit}
                        </Text>
                        <ProfitChart/>
                        <Line/>
                        <Text>Stocks</Text>
                        <ListStock titles={["Symbol", "Price", "Yield"]} stocks={this.props.allStocks} renderItem={this.renderItem}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
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
        allStocks: state.stock.allStocks,
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        logout: () => dispatch({type: LOGOUT_REQUESTED}),
        getDoDStocks: () => dispatch({type: GET_TOP_YIELD_STOCKS_REQUESTED}),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);