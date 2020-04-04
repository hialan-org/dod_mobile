import React, {useState} from 'react';
import {Dimensions, SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Text, TextInput, RadioButton, Subheading} from 'react-native-paper';
import {common} from "../utils/stylesheet";
import {Line} from "../components/Line";
import DateTimePicker from '@react-native-community/datetimepicker';
import {GET_TOP_YIELD_STOCKS_REQUESTED, LOGOUT_REQUESTED} from "../actions/types";
import {connect} from 'react-redux';
import {ListStock} from "../components/ListStocks";
import {formatDateString} from "../utils";

const {height} = Dimensions.get('window');
let yesterday = new Date();
yesterday.setDate(yesterday.getDate()-1);

const Wallet = ({getDoDStocks, topStocksByDate}) => {
// class Wallet extends React.Component {
    const [money, setMoney] = useState("");
    const [checked, setChecked] = useState("dod");
    const [screenHeight, setScreenHeight] = useState(height);

    const [mode, setMode] = useState('date');
    const [date, setDate] = useState(yesterday);
    const [show, setShow] = useState(false);

    const onContentSizeChange = (contentWidth, contentHeight) => {
        setScreenHeight(contentHeight);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
        setMode('date');
    };

    const onPressSuggest = () => {
        getDoDStocks(date);
    }

    return (
        <SafeAreaView style={common.containerWrapper}>
            <ScrollView
                style={{flex: 1}}
                contentContainerStyle={common.scrollView}
                scrollEnabled={true}
                onContentSizeChange={onContentSizeChange}
            >
                <View style={common.container}>
                    <Text style={common.title}>Wallet</Text>
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
                            value="snp"
                            status={checked === 'snp' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked("snp");
                            }}
                        />
                        <Text>S&P 500</Text>
                    </View>
                    <Text>{date.toDateString()}</Text>
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => showDatepicker()}>
                            <Text>Show date picker</Text>
                        </TouchableOpacity>
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            onPressSuggest()
                        }}>
                        <Text>Suggest</Text>
                    </TouchableOpacity>

                    <ListStock stocks={
                        topStocksByDate[formatDateString(date)]
                            ? topStocksByDate[formatDateString(date)]
                            : []}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = state => {
    return {
        topStocksByDate: state.stock.topStocksByDate,
        allStocks: state.stock.allStocks,
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

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        width: 200,
        padding: 10,
        marginTop: 16,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);