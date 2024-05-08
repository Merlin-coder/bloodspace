import CONSTANTS from 'common/constants';

export const deleteCollectionReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.DELETE_COLLECTION_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.DELETE_COLLECTION_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case CONSTANTS.DELETE_COLLECTION_ERROR:
            return { ...state, loading: false, error: action.payload };
        case CONSTANTS.CLEAR_COLLECTION_SELECTOR:
            return { state };
        default:
            return state;
    }
};
