import CONSTANTS from 'common/constants';

const skuData = { loading: false, skuData: null, skueError: null, error: false, bulkView: false };

export const addSkuReducer = (state = skuData, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_SKU_REQUEST:
            return { loading: true };
        case CONSTANTS.ADD_SKU_SUCCESS:
            return { skuData: action.payload, loading: false, bulkView: false };
        case CONSTANTS.ADD_SKU_BULK_SUCCESS:
            return { skuData: action.payload, loading: false, bulkView: true };
        case CONSTANTS.ADD_SKU_ERROR:
            return { skueError: action.payload, loading: false, error: true };
        case CONSTANTS.CLEAR_ADD_SKU_DATA:
            return skuData;
        default:
            return state;
    }
};
