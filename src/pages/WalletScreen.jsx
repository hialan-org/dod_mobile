import React, {useState, useEffect} from 'react';
import {Dimensions, SafeAreaView, View, ScrollView, StyleSheet} from 'react-native';
import {Text, TextInput, RadioButton, Subheading, Button, DataTable} from 'react-native-paper';
import {common} from "../utils/stylesheet";
import {Line} from "../components/Line";
import DateTimePicker from '@react-native-community/datetimepicker';
import {GET_OWNED_STOCKS_REQUESTED, GET_TOP_YIELD_STOCKS_REQUESTED} from "../actions/types";
import {connect} from 'react-redux';
import {ListStock} from "../components/ListStocks";
import {formatDateString, isWeekend} from "../utils";
import {MaterialIcons} from "@expo/vector-icons";

const {height} = Dimensions.get('window');

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
while(isWeekend(yesterday)){
    yesterday.setDate(yesterday.getDate()-1);
}

const WalletScreen = ({
                          getTopYieldLoading, getOwnedStocksLoading, topStocksByDate, myStocksMap, navigation,
                          getDoDStocks, getOwnedStocks
                      }) => {
// class WalletScreen extends React.Component {
    const [money, setMoney] = useState("");
    const [checked, setChecked] = useState("dod");
    const [screenHeight, setScreenHeight] = useState(height);

    const [mode, setMode] = useState('date');
    const [date, setDate] = useState(yesterday);
    const [show, setShow] = useState(false);

    // const onContentSizeChange = (contentWidth, contentHeight) => {
    //     console.log(contentHeight);
    //     setScreenHeight(contentHeight);
    // };

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

    const showDatepicker = () => {
        setShow(true);
        setMode('date');
    };

    const onPressSuggest = () => {
        getDoDStocks(date);
    }

    // const scrollEnabled = screenHeight > height;
    // console.log(screenHeight + " --- " + height);

    useEffect(() => {
        myStocksMap == null && getOwnedStocks();
    }, [])

    const renderItem = (stock, index) => {
        return (
            <DataTable.Row key={`item-${index}`}>
                <DataTable.Cell>{stock.symbol}</DataTable.Cell>
                <DataTable.Cell>${stock.latestPrice}</DataTable.Cell>
                <DataTable.Cell>{stock.dividendYield}</DataTable.Cell>
                <DataTable.Cell>{stock.buyQuantity}</DataTable.Cell>
            </DataTable.Row>
        );
    }

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

    let suggestedStocks = null;
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
                // scrollEnabled={scrollEnabled}
                // onContentSizeChange={onContentSizeChange}
            >
                <View style={common.container}>
                    <View style={[common.row, common.spaceBetween]}>
                        <Text style={common.title}>Wallet</Text>
                        <Button
                            mode="outlined"
                            onPress={() => navigation.navigate('BuyStocks')}>
                            <MaterialIcons name="add" style={common.icon} />
                        </Button>
                    </View>
                    <ListStock titles={["Symbol", "Buy Price", "Latest Price", "Quantity"]}
                               loading={getOwnedStocksLoading}
                               stocks={myStocksMap ? Array.from(myStocksMap.values()) : []}
                               renderItem={renderMyStocks}/>
                    <Line/>
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
                            onPress={() => showDatepicker()}>
                            <Text style={common.buttonText}>Change date</Text>
                        </Button>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            maximumDate={yesterday}
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
                                       renderItem={renderItem}
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
        myStocksMap: state.stock.myStocksMap,
        topStocksByDate: state.stock.topStocksByDate,
        getOwnedStocksLoading: state.loading.getOwnedStocks,
        getTopYieldLoading: state.loading.getTopYield,
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
        getOwnedStocks: () => dispatch({
            type: GET_OWNED_STOCKS_REQUESTED,
        })
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);