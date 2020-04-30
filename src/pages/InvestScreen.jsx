import React, {useState, useEffect} from 'react';
import {Dimensions, SafeAreaView, View, ScrollView, StyleSheet} from 'react-native';
import {Text, TextInput, RadioButton, Subheading, Button, DataTable} from 'react-native-paper';
import {common} from "../utils/stylesheet";
import {Line} from "../components/Line";
import DateTimePicker from '@react-native-community/datetimepicker';
import {GET_OWNED_STOCKS_REQUESTED, GET_TOP_YIELD_STOCKS_REQUESTED} from "../actions/types";
import {connect} from 'react-redux';
import {ListStock} from "../components/ListStocks";
import {formatDateString, getYesterday, isWeekend} from "../utils";
import {MaterialIcons} from "@expo/vector-icons";

const {height} = Dimensions.get('window');

const InvestScreen = ({
                          getTopYieldLoading, topStocksByDate, myStocksMap, navigation,
                          getDoDStocks, getOwnedStocks
                      }) => {
    const [money, setMoney] = useState("");
    const [checked, setChecked] = useState("dod");

    const [date, setDate] = useState(getYesterday());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        let currentDate = date
        if(isWeekend(selectedDate)){
            alert("Please choose weekdays only");
            setShow(false);
        } else {
            currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
        }
        setDate(currentDate);
    };

    const onPressSuggest = () => {
        getDoDStocks(date);
    }

    const onPressRebalance = () => {
        let totalMoney = 0;

        for (let [k, v] of myStocksMap) {
            totalMoney = totalMoney + (v.latestPrice * v.quantity);
        }

        // console.log('totalMoney:',totalMoney);
        setMoney(totalMoney);
        getDoDStocks(date);
    };

    const renderTopStocks = (stock, index) => {
        return (
            <DataTable.Row key={`item-${index}`}>
                <DataTable.Cell>{stock.symbol}</DataTable.Cell>
                <DataTable.Cell>${stock.latestPrice}</DataTable.Cell>
                <DataTable.Cell>{stock.dividendYield}</DataTable.Cell>
                <DataTable.Cell>{stock.buyQuantity}</DataTable.Cell>
            </DataTable.Row>
        );
    }

    let suggestedStocks = null;
    let rebalancedStocks = null;
    let investEachStock = money ? parseFloat(money) / 5 : 0;
    if (topStocksByDate && topStocksByDate[formatDateString(date)]) {
        switch (checked) {
            case 'dod':
                suggestedStocks = topStocksByDate[formatDateString(date)]
                    .sort((s1, s2) => {
                        return s2.dividendYield - s1.dividendYield;
                    })
                    .slice(0, 5)
                    .map(stock => ({
                        ...stock,
                        buyQuantity: Math.floor(investEachStock / stock.latestPrice)
                    }));
                break;
            case 'smallDod':
                suggestedStocks = topStocksByDate[formatDateString(date)]
                    .sort((s1, s2) => {
                        return s1.latestPrice - s2.latestPrice;
                    })
                    .slice(0, 5)
                    .map(stock => ({
                        ...stock,
                        buyQuantity: Math.floor(investEachStock / stock.latestPrice)
                    }));;
                break;
        }
    }

    return (
        <SafeAreaView style={common.containerWrapper}>
            <ScrollView
                style={{flex: 1}}
                contentContainerStyle={common.scrollView}
                scrollEnabled={true}
            >
                <View style={common.container}>
                    <View style={[common.row, common.spaceBetween]}>
                        <Text style={common.title}>Invest</Text>
                        <Button
                            mode="outlined"
                            onPress={() => navigation.navigate('BuyStocks')}>
                            <MaterialIcons name="add" style={common.icon} />
                        </Button>
                    </View>
                    <TextInput
                        label='Money to invest'
                        value={money}
                        onChangeText={money => setMoney(money)}
                    />
                    <Subheading style={common.label}>Strategies: </Subheading>
                    <View style={[common.row, common.content]}>
                        <RadioButton
                            value="dod"
                            status={checked === 'dod' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked("dod");
                            }}
                        />
                        <Text>Dog of The Dow</Text>
                    </View>
                    <View style={[common.row, common.content]}>
                        <RadioButton
                            value="smallDod"
                            status={checked === 'smallDod' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked("smallDod");
                            }}
                        />
                        <Text>Small Dog of The Dow</Text>
                    </View>
                    <Text>{date.toDateString()}</Text>
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
                    {!suggestedStocks && <Button
                        style={common.button}
                        loading={getTopYieldLoading}
                        onPress={() => {
                            onPressSuggest()
                        }}>
                        <Text style={common.buttonText}>Suggest</Text>
                    </Button>}
                    {suggestedStocks &&
                    (
                        <>
                            <ListStock titles={["Symbol", "Price", "Yield", "Quantity"]}
                                       loading={getTopYieldLoading}
                                       stocks={suggestedStocks}
                                       renderItem={renderTopStocks}
                            />
                            <Line/>
                        </>
                    )}

                    {/*    Rebalance */}
                    {!rebalancedStocks && <Button
                        style={common.button}
                        loading={getTopYieldLoading}
                        onPress={() => {
                            onPressRebalance()
                        }}>
                        <Text style={common.buttonText}>Rebalance</Text>
                    </Button>}
                    {rebalancedStocks &&
                    (
                        <>
                            <ListStock titles={["Symbol", "Price", "Yield", "Quantity"]}
                                       loading={getTopYieldLoading}
                                       stocks={suggestedStocks}
                                       renderItem={renderTopStocks}
                            />
                            <Line/>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = state => {
    return {
        topStocksByDate: state.stock.topStocksByDate,
        getTopYieldLoading: state.loading.getTopYield,
        myStocksMap: state.stock.myStocksMap,
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getDoDStocks: (date) => dispatch({
            type: GET_TOP_YIELD_STOCKS_REQUESTED,
            payload: {
                date: date,
            }
        }),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestScreen);