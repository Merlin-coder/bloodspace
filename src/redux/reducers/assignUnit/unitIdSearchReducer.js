import CONSTANTS from 'common/constants';

const unitIdSearch = { untiIdLoading: false, unitIdData: {}, error: null };

export const getUnitIdSearchReducer = (state = unitIdSearch, action) => {
    switch (action.type) {
        case CONSTANTS.GET_UNIT_SEARCH_REQUEST:
            return { untiIdLoading: true };
        case CONSTANTS.GET_UNIT_SEARCH_SUCCESS:
            return { unitIdData: action.payload };
        case CONSTANTS.GET_UNIT_SEARCH_ERROR:
            return { error: action.payload };
        case CONSTANTS.CLEAR_UNIT_ID_SEARCH:
            return unitIdSearch;
        default:
            return state;
    }
};
