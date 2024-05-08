import CONSTANTS from 'common/constants';

const downloadDataState = { loading: false, downloadData: {}, error: '' };

export const downloadDataReducer = (state = downloadDataState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DOWNLOAD_DATA_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.GET_DOWNLOAD_DATA_SUCCESS:
            return { ...state, loading: false, downloadData: action.payload };
        case CONSTANTS.GET_DOWNLOAD_DATA_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
