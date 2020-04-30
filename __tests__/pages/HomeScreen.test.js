import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import HomeScreen from "../../src/pages/HomeScreen";
import {Picker} from "react-native";
import {Entypo} from "@expo/vector-icons";
import {ActivityIndicator} from "react-native-paper";
import {user} from "../../__mocks__/user";
import {stock} from "../../__mocks__/stock";

const mockStore = configureStore([]);

describe('<HomeScreen />', () => {
    let store;
    let component;
    beforeEach(() => {
        store = mockStore({
            user: {

            },
            stat: {
                profit: 10,
            },
            stock: {
                myStocks: new Map()
            },
            loading: {
                getOwnedStocks: false,
            },
        });
        component = renderer.create(
            <Provider store={store}>
                <HomeScreen />
            </Provider>
        );
    });
    it('Test positive icon', () => {
        store = mockStore({
            user: {

            },
            stat: {
                profit: 10,
            },
            stock: {
                myStocks: new Map()
            },
            loading: {
                getOwnedStocks: false,
            },
        });
        component = renderer.create(
            <Provider store={store}>
                <HomeScreen />
            </Provider>
        );
        expect(component.root.findByType(Entypo)._fiber.pendingProps.name)
            .toEqual('triangle-up');
    })
    it('Test negative icon', () => {
        store = mockStore({
            user: {

            },
            stat: {
                profit: -10,
            },
            stock: {
                myStocks: new Map()
            },
            loading: {
                getOwnedStocks: false,
            },
        });
        component = renderer.create(
            <Provider store={store}>
                <HomeScreen />
            </Provider>
        );
        expect(component.root.findByType(Entypo)._fiber.pendingProps.name)
            .toEqual('triangle-down');
    })
});