import * as actions from '../actions/step3/definitions';

import {chartConfig, chartSeries} from './step3/chartConfig.js';
import {chartSubtype, chartTypes} from './step3/chartTypes.js';

const reducers = {
    SET_CHART_TYPE: (action, newState) => {
        newState.chartConfig = { ...newState.chartConfig, ...action.newConfig };

        if (!action.chartType) {
            newState.chartType = newState.chartType;
            newState.chartSubtype[newState.chartType.value] = action.chartSubtype;
        } else {
            newState.chartType = action.chartType;
        }

        newState.chartSeries[newState.chartType.value] = action.newSeries;
        newState.echarts.setOption({ ...newState.chartConfig, series: action.newSeries }, true);
        newState.error = action.error;

        return newState;
    },
    SET_COLUMNS: (action, newState) => {
        // TODO: Memoize
        let largest = 0;

        if (action.columns.length > 0) {
            if (newState.chartConfig.xAxis[0].data) newState.chartConfig.xAxis[0].data = action.categoryAxis;

            newState.chartSeries[newState.chartType.value] = action.columns;
        } else {
            newState.chartSeries[newState.chartType.value] = [];
        }

        // Fill with 0s to even the length of the data arrays
        if (newState.chartConfig.xAxis[0].data) {
            for (const element of newState.chartSeries[newState.chartType.value]) {
                if (element.data.length > largest) largest = element.data.length;
            }

            for (const element of newState.chartSeries[newState.chartType.value]) {
                for (let i = element.data.length; i <= largest; i++) {
                    element.data.push(0);
                }
            }
        }

        newState.echarts.setOption({ ...newState.chartConfig, series: newState.chartSeries[newState.chartType.value]},
            true);
        newState.error = action.error;

        return newState;
    },
    TOGGLE_INVERT_DATA: (action, newState) => {
        // TODO: Memoize
        for (const element of newState.chartSeries[newState.chartType.value]) {
            element.data.reverse();
        }

        if (newState.chartConfig.xAxis[0].data) newState.chartConfig.xAxis[0].data.reverse();

        newState.invertData = !newState.invertData;
        newState.echarts.setOption({...newState.chartConfig, series: newState.chartSeries[newState.chartType.value]},
            false);
        newState.error = action.error;

        return newState;
    },
    TOGGLE_TRANSPOSE_DATA: (action, newState) => {
        const xAxis = {...newState.chartConfig.yAxis[0]};
        const yAxis = {...newState.chartConfig.xAxis[0]};

        newState.chartConfig.yAxis[0] = yAxis;
        newState.chartConfig.xAxis[0] = xAxis;

        newState.transposeData = !newState.transposeData;
        newState.echarts.setOption({...newState.chartConfig, series: newState.chartSeries[newState.chartType.value]},
            true);
        newState.error = action.error;

        return newState;
    },
    SET_CHART_TITLE: (action, newState) => {
        newState.chartConfig.title.text = action.chartTitle;
        newState.error = action.error;

        return newState;
    },
    TOGGLE_AXIS: (action, newState, axis) => {
        newState.chartConfig[axis][0].show = !newState.chartConfig[axis][0].show;

        if (!newState.chartConfig[axis][0].show) {
            newState.chartConfig[axis][0].splitLine.show = false;
            newState.chartConfig[axis][0].splitArea.show = false;
        }

        newState.error = action.error;

        return newState;
    },
    TOGGLE_AXIS_GRID: (action, newState, axis) => {
        if (!newState.chartConfig[axis][0].show) newState.chartConfig[axis][0].show = true;

        newState.chartConfig[axis][0].splitLine.show = newState.chartConfig[axis][0].splitLine.show ? false : true;
        newState.error = action.error;

        return newState;
    },
    TOGGLE_AXIS_AREA: (action, newState, axis) => {
        if (!newState.chartConfig[axis][0].show) newState.chartConfig[axis][0].show = true;

        newState.chartConfig[axis][0].splitArea.show = newState.chartConfig[axis][0].splitArea.show ? false : true;
        newState.error = action.error;

        return newState;
    }
};

const valueAxisOptions = [
    {
        name: 'Cantidad',
        value: 'count'
    },
    {
        name: 'Porcentaje',
        value: 'percent'
    }
];

const initialState = {
    echarts: {},
    defaultTab: 'tab1',
    chartTypes,
    chartType: chartTypes.line,
    chartSubtype: chartSubtype,
    invertData: false,
    transposeData: false,
    valueAxisOptions: valueAxisOptions,
    valueAxis: valueAxisOptions[0],
    chartConfig: {
        ...chartConfig,
        ...chartTypes.line.config
    },
    chartSeries
};

export default function step3(state = initialState, action = {}) {
    const newState = { ...state };

    switch (action.type) {
        case actions.SET_ECHARTS_INSTANCE:
            return {
                ...state,
                echarts: action.echarts,
                error: action.error
            };
        case actions.SET_DEFAULT_TAB:
            return {
                ...state,
                defaultTab: action.defaultTab,
                error: action.error
            };
        case actions.SET_CHART_TYPE:
        case actions.SET_CHART_SUBTYPE:
            return reducers.SET_CHART_TYPE(action, newState);
        case actions.SET_VALUE_AXIS:
            return {
                ...state,
                valueAxis: action.valueAxis,

                error: action.error
            };
        case actions.SET_COLUMNS:
            return reducers.SET_COLUMNS(action, newState);
        case actions.SET_DATA_RANGE:
            return {
                ...state,
                dataRange: action.dataRange,
                error: action.error
            };
        case actions.TOGGLE_INVERT_DATA:
            return reducers.TOGGLE_INVERT_DATA(action, newState);
        case actions.TOGGLE_TRANSPOSE_DATA:
            return reducers.TOGGLE_TRANSPOSE_DATA(action, newState);
        case actions.SET_CHART_TITLE:
            return reducers.SET_CHART_TITLE(action, newState);
        case actions.TOGGLE_X_AXIS:
            return reducers.TOGGLE_AXIS(action, newState, 'xAxis');
        case actions.TOGGLE_X_AXIS_GRID:
            return reducers.TOGGLE_AXIS_GRID(action, newState, 'xAxis');
        case actions.TOGGLE_X_AXIS_AREA:
            return reducers.TOGGLE_AXIS_AREA(action, newState, 'xAxis');
        case actions.TOGGLE_Y_AXIS:
            return reducers.TOGGLE_AXIS(action, newState, 'yAxis');
        case actions.TOGGLE_Y_AXIS_GRID:
            return reducers.TOGGLE_AXIS_GRID(action, newState, 'yAxis');
        case actions.TOGGLE_Y_AXIS_AREA:
            return reducers.TOGGLE_AXIS_AREA(action, newState, 'yAxis');
        default:
            return state;
    }
}