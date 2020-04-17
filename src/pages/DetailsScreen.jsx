import React, {useState, useEffect} from 'react';
import {ScrollView, SafeAreaView, Dimensions, View} from 'react-native';
import {DataTable, Text} from 'react-native-paper';
// import { ShareDialog } from 'react-native-fbsdk';
import {connect} from 'react-redux';
import {GET_OWNED_STOCKS_REQUESTED} from "../actions/types";
import {formatDateString} from "../utils";
import {ListStock} from "../components/ListStocks";
import {common} from "../utils/stylesheet";

const {height} = Dimensions.get('window');

const DetailsScreen = ({myStocks, myStocksMap, loading, getOwnedStocks}) => {
    const [screenHeight, setScreenHeight] = useState(height);
    //Detail Screen to show from any Open detail button
    // static navigationOptions = {
    //     //To set the header image and title for the current Screen
    //     //Title
    //     headerRight:(
    //         <View style={{marginRight:10}}>
    //             <Button
    //                 onPress={() =>
    //                     Share.share({
    //                         title: 'Share via',
    //                         url: 'any link'
    //                     })
    //                 }
    //                 title="Condividi"
    //                 color="#000"
    //             />
    //         </View>
    //     )
    // };

    const onContentSizeChange = (contentWidth, contentHeight) => {
        setScreenHeight(contentHeight);
    };

    useEffect(() => {
        myStocksMap == null && getOwnedStocks();
    }, [])

    const scrollEnabled = screenHeight > height;

    const renderItem = (stock, index) => {
        return (
            <DataTable.Row key={`item-${index}`}>
                <DataTable.Cell>{stock.symbol}</DataTable.Cell>
                <DataTable.Cell>${stock.buyPrice}</DataTable.Cell>
                <DataTable.Cell>${stock.latestPrice}</DataTable.Cell>
                <DataTable.Cell>{stock.quantity}</DataTable.Cell>
            </DataTable.Row>
        );
    }

    return (
        <SafeAreaView style={common.containerWrapper}>
            <ScrollView
                style={{flex: 1}}
                contentContainerStyle={common.scrollView}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={onContentSizeChange}
            >
            <Text>Details!</Text>
            <ListStock titles={["Symbol", "Buy Price", "Latest Price", "Quantity"]}
                       loading={loading}
                       stocks={Array.from(myStocksMap.values())}
            renderItem={renderItem}/>
            </ScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = state => {
    return {
        myStocksMap: state.stock.myStocksMap,
        loading: state.loading.general,
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getOwnedStocks: () => dispatch({
            type: GET_OWNED_STOCKS_REQUESTED,
        })
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);