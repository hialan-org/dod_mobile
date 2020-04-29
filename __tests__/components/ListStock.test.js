import React from 'react';
import renderer from 'react-test-renderer';
import {ListStock} from "../../src/components/ListStocks";
import {ActivityIndicator, DataTable, Text} from "react-native-paper";
import {stock} from "../../__mocks__/stock";

const titles = ["Symbol", "Price", "Yield"];

const renderStocksPrice = (stockPrice, index) => {
    return (
        <DataTable.Row key={`item-${index}`}>
            <DataTable.Cell>{stockPrice.stock.symbol}</DataTable.Cell>
            <DataTable.Cell>${stockPrice.latestPrice}</DataTable.Cell>
            <DataTable.Cell>{stockPrice.dividendYield}</DataTable.Cell>
        </DataTable.Row>
    );
}

describe('<ListStocks />', () => {
    it('Title render', () => {
        const listStocks = renderer.create(
            <ListStock
                titles={titles}
                stocks={[]}
                loading={false}
                renderItem={renderStocksPrice}
            />);
        expect(listStocks.root.findAllByType(DataTable.Title).length)
            .toEqual(titles.length);
        expect(listStocks.root.findAllByType(ActivityIndicator).length)
            .toEqual(0);
    });
    it('Empty data', () => {
        const listStocks = renderer.create(
            <ListStock
                titles={titles}
                stocks={[]}
                loading={false}
                renderItem={renderStocksPrice}
            />);
        expect(listStocks.root.findAllByType(DataTable.Row).length)
            .toEqual(1);
        expect(listStocks.root.findAllByType(ActivityIndicator).length)
            .toEqual(0);
    });
    it('With data', () => {
        const listStocks = renderer.create(
            <ListStock
                titles={titles}
                stocks={stock.stocksPrice}
                loading={false}
                renderItem={renderStocksPrice}
            />)
        expect(listStocks.root.findAllByType(DataTable.Row).length)
            .toEqual(stock.stocksPrice.length);
    });
    it('Is loading', () => {
        const listStocks = renderer.create(
            <ListStock
                titles={titles}
                stocks={stock.stocksPrice}
                loading={true}
                renderItem={renderStocksPrice}
            />)
        expect(listStocks.root.findAllByType(DataTable.Row).length)
            .toEqual(0);
        expect(listStocks.root.findAllByType(ActivityIndicator).length)
            .toEqual(1);
    });
});