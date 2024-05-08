import CONSTANTS from 'common/constants';

export const bulkViewReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.BULK_VIEW_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.BULK_VIEW_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case CONSTANTS.BULK_VIEW_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
