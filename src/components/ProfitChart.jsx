import React from 'react';
import {Dimensions, StyleSheet} from "react-native";
import {
    LineChart,
} from 'react-native-chart-kit';

const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
};

const screenWidth = Dimensions.get("window").width-20;

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
        },
        {
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
        }
    ]
};

class ProfitChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <LineChart
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
                />
            </>
        )
    }
}

export default ProfitChart