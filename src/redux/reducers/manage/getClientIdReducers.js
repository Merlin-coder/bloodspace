import CONSTANTS from 'common/constants';

const clientIdsInitialState = { loading: false, clientIds: {}, error: '' };

export const clientIdsReducer = (state = clientIdsInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_CLIENT_ID_REQUST:
            return { ...state, loading: true };
        case CONSTANTS.GET_CLIENT_ID_SUCCESS:
            return { ...state, loading: false, clientIds: action.payload };
        case CONSTANTS.GET_CLIENT_ID_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
