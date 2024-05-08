import CONSTANTS from 'common/constants';

const locationTypeInitialState = { loading: false, error: '', locationType: {} };

export const getLocationTypeReducer = (state = locationTypeInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_LOCATION_TYPE_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_LOCATION_TYPE_SUCCESS:
            return { loading: false, locationType: action.payload, error: '' };
        case CONSTANTS.GET_LOCATION_TYPE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

const locationsInitialState = { loading: false, error: '', locations: {} };

export const getLocationReducer = (state = locationsInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_LOCATION_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.GET_LOCATION_SUCCESS:
            if (state.locations.data) {
                if (action.payload.page.currentPage === 1) {
                    return { ...state, loading: false, locations: action.payload };
                }
                return {
                    ...state,
                    loading: false,
                    locations: { ...action.payload, data: [...state.locations.data, ...action.payload.data] }
                };
            } else {
                return { ...state, loading: false, locations: { ...action.payload, data: [...action.payload.data] } };
            }
        case CONSTANTS.GET_LOCATION_FAIL:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export const addLocationReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LOCATION_REQUEST:
            return { loading: true };
        case CONSTANTS.ADD_LOCATION_SUCCESS:
            return { loading: false, locations: action.payload };
        case CONSTANTS.ADD_LOCATION_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const updateLocationReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_LOCATION_REQUEST:
            return { loading: true };
        case CONSTANTS.UPDATE_LOCATION_SUCCESS:
            return { loading: false, locations: action.payload };
        case CONSTANTS.UPDATE_LOCATION_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const deleteLocationReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.DELETE_LOCATION_REQUEST:
            return { loading: true };
        case CONSTANTS.DELETE_LOCATION_SUCCESS:
            return { loading: false, locations: action.payload };
        case CONSTANTS.DELETE_LOCATION_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
