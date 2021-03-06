import React from 'react';
import {Dimensions, StyleSheet} from "react-native";
import {
    LineChart,
} from 'react-native-chart-kit';
import {connect} from 'react-redux';
import {timestampToDate} from "../utils";
import {ActivityIndicator} from "react-native-paper";
import LineChartWithTooltips from "./LineChart";
import {Text} from "react-native";

const ProfitChart = ({loadingGetProfit, profit, myStocks}) => {
    const formatYAxis = (value) => {
        // if(value/1000000>1){
        //     return value/1000000 + 'm';
        // }
        // if(value/1000>1){
        //     return value/1000 + 'k';
        // }
        return value;
    }


    const chartConfig = {
        decimalPlaces: 0, // optional, defaults to 2dp
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
        strokeWidth: 2 // optional, default 3
    };
    const segments = 6;

    const screenWidth = Dimensions.get("window").width - 20;
    let labels = ["January", "February", "March", "April", "May", "June", "July"];
    let data1 = [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100,
        Math.random() * 100, Math.random() * 100, Math.random() * 100];
    let data2 = [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100,
        Math.random() * 100, Math.random() * 100, Math.random() * 100];
    let min = 0;
    let max = 0;

    if (profit && profit.length > 0) {
        //date, totalAmount, investedAMount
        labels = profit.map(profit => timestampToDate(profit.date));
        // labels = profit.map(profit => profit.date);
        data1 = profit.map(profit => profit.totalAmount);
        data2 = profit.map(profit => profit.investedAmount);

        min = Math.min(...data1, ...data2);
        max = Math.max(...data1, ...data2);
        const avg = Math.ceil((min+max)/2/100)*100;
        const step = Math.ceil(((max-min)/segments)/100)*100;
        min = avg - step*segments/2;
        max = avg + step*segments/2;
    }

    const data = {
        labels: labels,
        datasets: [{
            data: data1,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        }, {
            data: data2,
        }, {
            data: [max],
            color: () => `rgba(0, 0, 0, 0)`
        },{
            data: [min],
            color: () => `rgba(0, 0, 0, 0)`
        },]
    };

    return (
        <>
            {loadingGetProfit
                ? <ActivityIndicator animating={true}/>
                : (!myStocks || myStocks.size === 0) ? <Text>Please, Buy some stocks!</Text> :
                    (profit && profit.length > 0) ? <LineChartWithTooltips
                    data={data}
                    width={screenWidth} // from react-native
                    height={250}
                    yAxisLabel="$"
                    // yAxisSuffix=""
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                    formatYLabel={value => {
                        return formatYAxis(value);
                    }}
                    verticalLabelRotation={30}
                    segments={segments}
                    /> : <Text>Come back later to see your profit!</Text>}
        </>
    )
}

const mapStateToProps = state => {
    // console.log(state.stat.profitByDate);
    return {
        profit: state.stat.profitByDate,
        loadingGetProfit: state.loading.getProfit,
        myStocks: state.stock.myStocks,
    }
}

export default connect(mapStateToProps, null)(ProfitChart);