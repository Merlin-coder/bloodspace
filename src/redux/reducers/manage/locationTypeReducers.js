import CONSTANTS from 'common/constants';

const locationTypesInitialState = { loading: false, locationTypes: {}, error: '' };

export const locationTypesReducer = (state = locationTypesInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_LOCATION_TYPE_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.GET_LOCATION_TYPE_SUCCESS:
            return { ...state, loading: false, locationTypes: action.payload };
        case CONSTANTS.GET_LOCATION_TYPE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
