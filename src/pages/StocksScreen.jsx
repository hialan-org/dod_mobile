import React, {useState, useEffect} from 'react';
import {common} from "../utils/stylesheet";
import {SafeAreaView, ScrollView, View} from "react-native";
import {Button, DataTable, RadioButton, Subheading, Text, TextInput} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import {ListStock} from "../components/ListStocks";
import {Line} from "../components/Line";
import DateTimePicker from "@react-native-community/datetimepicker";
import {getYesterday, isWeekend} from "../utils";
import {GET_OWNED_STOCKS_REQUESTED, GET_STOCKS_PRICE_REQUESTED, GET_TOP_YIELD_STOCKS_REQUESTED} from "../actions/types";
import {connect} from "react-redux";

const StocksScreen = ({
                          stocksPrice, getStocksHistoryLoading,
                          getStocksPrice,
                      }) => {
    const [date, setDate] = useState(getYesterday());
    const [show, setShow] = useState(false);

    useEffect(() => {
        getStocksPrice(date);
    }, [])

    const onChange = (event, selectedDate) => {
        let currentDate = date
        if(isWeekend(selectedDate)){
            alert("Please choose weekdays only");
            setShow(false);
        } else {
            currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            getStocksPrice(date);
        }
        setDate(currentDate);
    };

    const renderStocksPrice = (stockPrice, index) => {
        return (
            <DataTable.Row key={`item-${index}`}>
                <DataTable.Cell>{stockPrice.stock.symbol}</DataTable.Cell>
                <DataTable.Cell>${stockPrice.latestPrice}</DataTable.Cell>
                <DataTable.Cell>{stockPrice.dividendYield}</DataTable.Cell>
            </DataTable.Row>
        );
    }

    return (
        <SafeAreaView style={common.containerWrapper}>
            <ScrollView
                style={{flex: 1}}
                contentContainerStyle={common.scrollView}
                scrollEnabled={true}
            >
                <View style={common.container}>
                    <Text style={common.title}>Stocks</Text>
                    <View>
                        <Button
                            style={common.button}
                            onPress={() => setShow(true)}>
                            <Text style={common.buttonText}>Change date</Text>
                        </Button>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            maximumDate={getYesterday()}
                            onChange={onChange}
                        />
                    )}
                            <ListStock titles={["Symbol", "Price", "Yield"]}
                                       loading={getStocksHistoryLoading}
                                       stocks={stocksPrice}
                                       renderItem={renderStocksPrice}
                            />
                            <Line/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        stocksPrice: state.stock.stocksPrice,
        getStocksHistoryLoading: state.loading.getStocksHistory,
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

export default connect(mapStateToProps, mapDispatchToProps)(StocksScreen);