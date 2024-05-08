import { CONSTANTS } from 'common';

export const flushDataReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.FLUSH_ZEBRA_DATA_REQUEST:
            return { flushDataLoading: true };
        case CONSTANTS.FLUSH_ZEBRA_DATA_SUCCES:
            return { flushDataLoading: false, flushDataSuccess: action.payload };
        case CONSTANTS.FLUSH_ZEBRA_DATA_ERROR:
            return { flushDataLoading: false, flushDataError: action.payload };
        default:
            return state;
    }
};
