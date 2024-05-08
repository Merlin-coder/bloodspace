import CONSTANTS from 'common/constants';

const productCodeData = { loading: false, productCodes: {}, error: null };

export const getProductCodeReducer = (state = productCodeData, action) => {
    switch (action.type) {
        case CONSTANTS.GET_PRODUCT_CODE_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_PRODUCT_CODE_SUCCESS:
            return { productCodes: action.payload };
        case CONSTANTS.GET_PRODUCT_CODE_ERROR:
            return { error: action.payload };
        default:
            return state;
    }
};
