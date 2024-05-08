import CONSTANTS from '../../../common/constants';

export const getDashboardReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_SCREEN_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_SCREEN_SUCCESS:
            return { loading: false, data: action.payload };
        case CONSTANTS.GET_SCREEN_FAIL:
            return { loading: false, data: action.payload };

        default:
            return state;
    }
};

export const getDashboardEuoReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DASHBOARDEUO_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_DASHBOARDEUO_SUCCESS:
            return { loading: false, dataEuo: action.payload };
        case CONSTANTS.GET_DASHBOARDEUO_FAIL:
            return { loading: false, dataEuo: action.payload };

        default:
            return state;
    }
};

export const ackNotifyEuoSaveReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.PUT_ACKNOTIFY_REQUEST:
            return { loading: true };
        case CONSTANTS.PUT_ACKNOTIFY_SUCCESS:
            return { loading: false, ackNotifyEuoSaveResponse: action.payload };
        case CONSTANTS.PUT_ACKNOTIFY_FAIL:
            return { loading: false, ackNotifyEuoSaveResponse: action.payload };

        default:
            return state;
    }
};

export const alertsEuoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALERTSEUO_REQUEST':
            return { loading: true };
        case 'GET_ALERTSEUO_SUCCESS':
            return { loading: false, alertsunderstoodEuo: action.payload };
        case 'GET_ALERTSEUO_FAIL':
            return { loading: false, alertsunderstoodEuo: action.payload };

        default:
            return state;
    }
};

export const alertsavEuoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ALERTSAVEUO_REQUEST':
            return { loading: true };
        case 'GET_ALERTSAVEUO_SUCCESS':
            return { loading: false, alertsavunderstoodEuo: action.payload };
        case 'GET_ALERTSAVEUO_FAIL':
            return { loading: false, alertsavunderstoodEuo: action.payload };

        default:
            return state;
    }
};

export const getEuoIncompleteUnitsReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DASHBOARDEUO_UNITS_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_DASHBOARDEUO_UNITS_SUCCESS:
            return { loading: false, incompleteUnitsEuo: action.payload };
        case CONSTANTS.GET_DASHBOARDEUO_UNITS_FAIL:
            return { loading: false, incompleteUnitsEuo: action.payload };

        default:
            return state;
    }
};

export const getEuoIncompleteBatchReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DASHBOARDEUO_BATCH_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_DASHBOARDEUO_BATCH_SUCCESS:
            return { loading: false, incompleteBatchEuo: action.payload };
        case CONSTANTS.GET_DASHBOARDEUO_BATCH_FAIL:
            return { loading: false, incompleteBatchEuo: action.payload };

        default:
            return state;
    }
};

export const getTemperatureReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_TEMP_SCREEN_REQUEST:
            return { load: true };
        case CONSTANTS.GET_TEMP_SCREEN_SUCCESS:
            return { load: false, temp: action.payload };
        case CONSTANTS.GET_TEMP_SCREEN_FAIL:
            return { load: false, temp: action.payload };

        default:
            return state;
    }
};
//const GraphState = { loading: false, GraphStatus: {}, error: '' };
export const getTemperatureGraphReducer = (state = {}, action) => {
    console.log(' getTemperatureGraphReducer ' + action.type);
    switch (action.type) {
        case CONSTANTS.GET_TEMP_GRAPH_REQUEST:
            return { load: true };
        case CONSTANTS.GET_TEMP_GRAPH_SUCCESS:
            return { GraphStatus: action.payload };
        case CONSTANTS.GET_TEMP_GRAPH_FAIL:
            return { GraphStatus: action.payload };

        default:
            return state;
    }
};
