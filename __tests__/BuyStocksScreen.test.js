import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import BuyStocksScreen from "../src/pages/BuyStocksScreen";
import {Picker} from "react-native";
import {stock} from "../__mocks__/stock";
import {ToggleButton, TextInput, Button} from "react-native-paper";

const mockStore = configureStore([]);

describe('<BuyStocksScreen />', () => {
    let store;
    let component;
    beforeEach(() => {
        store = mockStore({
            stock: {
                stocksSymbol: stock.stocksSymbol,
            },
            loading: {
                general: false,
            },
        });
        component = renderer.create(
            <Provider store={store}>
                <BuyStocksScreen />
            </Provider>
        );
    });
    it.skip('Test snapshot', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });
    it.skip('Test picker', () => {
        console.log(component.root.findByType(Picker).props.selectedValue)
        const pickerItems = component.root.findByType(Picker).props.children;
        expect(pickerItems.length).toEqual(stock.stocksSymbol.length);
        expect(component.root.findByType(Picker).props.selectedValue)
            .toEqual(stock.stocksSymbol[0].stockId);
        pickerItems.map((item, index) => {
            expect(stock.stocksSymbol).toContainEqual({
                symbol:item.props.label,
                stockId:item.props.value,
            })
        })
    })
    it('Test render enough component', () => {
        const toggleButtons = component.root.findAllByType(ToggleButton);
        expect(toggleButtons.length).toEqual(2);
        const textInputs = component.root.findAllByType(TextInput);
        expect(textInputs.length).toEqual(3);
    })
});