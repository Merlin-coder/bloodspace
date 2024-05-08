import { CONSTANTS } from 'common';

export const profileDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_API_DETAILS_FETCH:
            return { loading: true };
        case CONSTANTS.GET_API_DETAILS_SUCCESS:
            return { loading: false, data: action.payload };
        case CONSTANTS.GET_API_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
