import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Picker} from 'react-native';
import {TextInput, Button, ToggleButton} from 'react-native-paper';
import {common} from "../utils/stylesheet";
import {connect} from 'react-redux';
import {GET_STOCK_REQUESTED, MANAGE_STOCK_REQUESTED} from "../actions/types";

const BuyStocksScreen = ({stocksSymbol, myStocksMap, loading, getStocksSymbol, manageStock}) => {
    const [selectedStock, setSelectedStock] = useState(
        stocksSymbol && stocksSymbol.length!=0 ? stocksSymbol[0].stockId : -1);
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isBuy, setIsBuy] = useState('buy');

    useEffect(() => {
        !stocksSymbol && getStocksSymbol();
    }, []);

    const onPressAccepted = () => {
        const stock = {
            stockId: selectedStock,
            stockPrice: parseFloat(price),
            stockQuantity: parseInt(quantity),
            isBuy: isBuy === 'buy',
        }
        if(isBuy==='buy'){
            manageStock(stock);
        } else { //If sell, check if user has enough stocks
            const ownedStock = myStocksMap.get(selectedStock);
            if(ownedStock && ownedStock.quantity >= parseInt(quantity)){
                manageStock(stock);
            } else {
                alert("You don't have enough stocks");
            }
        }
    }

    return (
        <SafeAreaView style={[common.containerWrapper]}>
            <View style={{padding: 10, flexDirection: 'row',}}>
                <TextInput
                    label="Stock"
                    mode="outlined"
                    value={selectedStock}
                    render={(props) => (
                        <Picker
                            selectedValue={selectedStock}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedStock(itemValue);
                            }}
                            style={{ width: 150 }}
                        >
                            {stocksSymbol && stocksSymbol.map((stock, index) => {
                                return (
                                    <Picker.Item label={stock.symbol} value={stock.stockId} key={stock.stockId}/>
                                )
                            })}
                        </Picker>
                    )}
                />
                <View style={{flexDirection:'row', margin: 12,}}>
                    <ToggleButton.Group onValueChange={value => setIsBuy(value)}
                                        value={isBuy}>
                        <ToggleButton
                            icon="alpha-b"
                            size={40}
                            value="buy"
                        />
                        <ToggleButton
                            icon="alpha-s"
                            size={40}
                            value="sell"
                        />
                    </ToggleButton.Group>
                </View>
            </View>
            <View style={{padding: 10}}>
                {isBuy === "buy" && <TextInput
                    label='Price'
                    value={price}
                    onChangeText={text => setPrice(text)}
                    keyboardType='decimal-pad'
                />}
                <TextInput
                    label='Quantity'
                    value={quantity}
                    onChangeText={text => setQuantity(text)}
                    keyboardType='decimal-pad'
                />
                <Button icon="plus-circle" mode="contained" onPress={onPressAccepted} loading={loading}>
                    Accept
                </Button>
            </View>
        </SafeAreaView>
    )
}
const mapStateToProps = state => {
    return {
        stocksSymbol: state.stock.stocksSymbol,
        myStocksMap: state.stock.myStocksMap,
        loading: state.loading.general,
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getStocksSymbol: () => dispatch({
            type: GET_STOCK_REQUESTED
        }),
        manageStock: (stock) => dispatch({
            type: MANAGE_STOCK_REQUESTED,
            payload: stock,
        })
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyStocksScreen)
