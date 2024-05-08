import CONSTANTS from 'common/constants';

const batchIdSearch = { batchIdLoading: false, batchIdData: {}, error: null };

export const getBatchIdSearchReducer = (state = batchIdSearch, action) => {
    console.log("getBatchIdSearchReducer");
    switch (action.type) {
        case CONSTANTS.GET_BATCH_SEARCH_REQUEST:
            return { batchIdLoading: true };
        case CONSTANTS.GET_BATCH_SEARCH_SUCCESS:
            return { batchIdData: action.payload };
        case CONSTANTS.GET_BATCH_SEARCH_ERROR:
            return { error: action.payload };
        case CONSTANTS.CLEAR_BATCH_ID_SEARCH:
            return batchIdSearch;
        default:
            return state;
    }
};
