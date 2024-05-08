import CONSTANTS from 'common/constants';

const deviceTypesInitialState = { loading: false, deviceTypes: {}, error: '' };

export const deviceTypesReducer = (state = deviceTypesInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DEVICE_TYPE_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.GET_DEVICE_TYPE_SUCCESS:
            return { ...state, loading: false, deviceTypes: action.payload };
        case CONSTANTS.GET_DEVICE_TYPE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
