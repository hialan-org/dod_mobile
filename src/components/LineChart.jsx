import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Circle, G, Rect, Text} from 'react-native-svg';
import {Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {common} from "../utils/stylesheet";

const screenWidth = Dimensions.get('window').width;

const Tooltip = ({x, y, textY, stroke, pointStroke, position}) => {
    let tipW = 9*(textY.length+1),
        tipH = 20,
        tipX = 5,
        tipY = -9,
        tipTxtX = 12,
        tipTxtY = 6;
    const posY = y;
    const posX = x;

    if (posX > screenWidth - tipW) {
        tipX = -(tipX + tipW);
        tipTxtX = tipTxtX - tipW - 6;
    }

    const boxPosX = position === 'left' ? posX - tipW - 10 : posX;

    return (
        <G>
            <Circle
                cx={posX}
                cy={posY}
                r={4}
                stroke={pointStroke}
                strokeWidth={2}
                fill={'blue'}
            />
            <G x={boxPosX < 40 ? 40 : boxPosX} y={posY}>
                <Rect
                    x={tipX}
                    y={tipY}
                    width={tipW}
                    height={tipH}
                    fill={'rgba(0, 0, 0, 0.5)'}
                    rx={2}
                    ry={2}
                />
                <Rect
                    x={tipX}
                    y={tipY}
                    width={tipW}
                    height={tipH}
                    rx={2}
                    ry={2}
                    fill={'transparent'}
                    stroke={stroke}
                />
                <Text
                    x={tipTxtX}
                    y={tipTxtY}
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="start">
                    {`$${textY}`}
                </Text>
            </G>
        </G>
    );
};

Tooltip.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    height: PropTypes.number,
    stroke: PropTypes.string,
    pointStroke: PropTypes.string,
    textY: PropTypes.string,
    position: PropTypes.string,
};

Tooltip.defaultProps = {
    position: 'right',
};

const tooltipDecorators = (state, data, valueFormatter) => () => {
    if (state === null) {
        return null;
    }
    const {index, value, x, y} = state;
    // const position = data.labels.length === index + 1 ? 'left' : 'right';
    const position = 'right'

    return (
        <Tooltip
            textY={valueFormatter(value)}
            x={x}
            y={y}
            stroke={'#00ccff'}
            pointStroke={'#00ccff'}
            position={position}
        />
    );
};

const LineChartWithTooltips = ({valueFormatter, ...props}) => {
    const [state, setState] = useState(null);
    return (
        <LineChart
            {...props}
            decorator={tooltipDecorators(state, props.data, valueFormatter)}
            onDataPointClick={setState}
        />
    );
};

LineChartWithTooltips.propTypes = {
    valueFormatter: PropTypes.func,
};

LineChartWithTooltips.defaultProps = {
    valueFormatter: value => String(value),
};

export default LineChartWithTooltips;