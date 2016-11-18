import * as actions from './definitions';

export function setChartType(chartType) {
    return {
        type: actions.SET_CHART_TYPE,
        chartType
    };
}

export function setChartSubtype(chartSubtype) {
    return {
        type: actions.SET_CHART_SUBTYPE,
        chartSubtype
    };
}

export function setColumns(columns) {
    return {
        type: actions.SET_COLUMNS,
        columns
    };
}

export function setDataRange(dataRange) {
    return {
        type: actions.SET_DATA_RANGE,
        dataRange
    };
}

export function toggleInvertData() {
    return {
        type: actions.TOGGLE_INVERT_DATA
    };
}

export function toggleTransposeData() {
    return {
        type: actions.TOGGLE_TRANSPOSE_DATA
    };
}

export function setChartTitle(chartTitle) {
    return {
        type: actions.SET_CHART_TITLE,
        chartTitle
    };
}

export function toggleXAxis() {
    return {
        type: actions.TOGGLE_X_AXIS
    };
}

export function toggleXAxisLabels() {
    return {
        type: actions.TOGGLE_X_AXIS_LABELS
    };
}

export function toggleXAxisGrid() {
    return {
        type: actions.TOGGLE_X_AXIS_GRID
    };
}

export function toggleYAxis() {
    return {
        type: actions.TOGGLE_Y_AXIS
    };
}

export function toggleYAxisLabels() {
    return {
        type: actions.TOGGLE_Y_AXIS_LABELS
    };
}

export function toggleYAxisGrid() {
    return {
        type: actions.TOGGLE_Y_AXIS_GRID
    };
}