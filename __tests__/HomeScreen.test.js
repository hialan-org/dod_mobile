import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import HomeScreen from "../src/pages/HomeScreen";

const mockStore = configureStore([]);

describe.skip('<HomeScreen />', () => {
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
                stocksPrice: [],
            },
            loading: {
                getStocksHistory: false,
            },
        });
        store.dispatch = jest.fn();
        component = renderer.create(
            <Provider store={store}>
                <HomeScreen />
            </Provider>
        );
    });
    it('has 1 child', () => {
        console.log(component.toJSON());
        expect(component.toJSON()).toMatchSnapshot();
    });
    // it('should dispatch an action on button click', () => {
    //     renderer.act(() => {
    //         component.root.findByType('button').props.onClick();
    //     });
    //     expect(store.dispatch).toHaveBeenCalledTimes(1);
    // });
});