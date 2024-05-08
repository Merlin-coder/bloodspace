import CONSTANTS from '../../../common/constants';

export const getStocksReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_STOCKS_DATA_REQUEST:
            return { stocksLoading: true };
        case CONSTANTS.GET_STOCKS_DATA_SUCCESS:
            return { stocksLoading: false, stocksData: action.payload };
        case CONSTANTS.GET_STOCKS_DATA_FAIL:
            return { stocksLoading: false, error: action.payload };

        default:
            return state;
    }
};
export const getFilteredStocksReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_FILTERED_STOCKS_DATA_REQUEST':
            return { filteredStocksLoading: true };
        case 'GET_FILTERED_STOCKS_DATA_SUCCESS':
            return { filteredStocksLoading: false, filteredStocksData: action.payload };
        case 'GET_FILTERED_STOCKS_DATA_FAIL':
            return { filteredStocksLoading: false, error: action.payload };

        default:
            return state;
    }
};
export const getFilteredLocationsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_FILTERED_LOCATIONS_REQUEST':
            return { filteredLocationsLoading: true, filteredLocationsData: [] };
        case 'GET_FILTERED_LOCATIONS_SUCCESS':
            return { filteredLocationsLoading: false, filteredLocationsData: action.payload };
        case 'GET_FILTERED_LOCATIONS_FAIL':
            return { filteredLocationsLoading: false, error: action.payload };

        default:
            return state;
    }
};
export const getFilteredDevicesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_FILTERED_DEVICES_REQUEST':
            return { filteredDevicesLoading: true, filteredDevicesData: [] };
        case 'GET_FILTERED_DEVICES_SUCCESS':
            return { filteredDevicesLoading: false, filteredDevicesData: action.payload };
        case 'GET_FILTERED_DEVICES_FAIL':
            return { filteredDevicesLoading: false, error: action.payload };

        default:
            return state;
    }
};
export const getStocksFiltersReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_STOCKS_FILTERES_REQUEST':
            return { stocksFiltersLoading: true };
        case 'GET_STOCKS_FILTERES_SUCCESS':
            return { stocksFiltersLoading: false, stocksFiltersData: action.payload };
        case 'GET_STOCKS_FILTERES_FAIL':
            return { stocksFiltersLoading: false, error: action.payload };

        default:
            return state;
    }
};
export const getStocksScreenSetReducer = (state = { screenIndex: 0 }, action) => {
    switch (action.type) {
        case 'SET_STOCK_SCREEN':
            return { screenIndex: action.payload };
        default:
            return state;
    }
};
export const getLFStocksReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_LFSTOCKS_DATA_REQUEST':
            return { lfStocksLoading: true };
        case 'GET_LFSTOCKS_DATA_SUCCESS':
            return { lfStocksLoading: false, lfStocksData: action.payload };
        case 'GET_LFSTOCKS_DATA_FAIL':
            return { lfStocksLoading: false, error: action.payload };

        default:
            return state;
    }
};
