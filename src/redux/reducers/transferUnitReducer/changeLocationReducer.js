import { CONSTANTS } from 'common';

const changeLocationState = { changeLocationLoading: false, changeLocationSuccess: null, changeLocationError: null };
export const changeLocationDataReducere = (state = changeLocationState, action) => {
    switch (action.type) {
        case CONSTANTS.POST_CHANGE_LOCATION_REQUEST:
            return { changeLocationLoading: true };
        case CONSTANTS.POST_CHANGE_LOCATION_SUCCESS:
            return { changeLocationLoading: false, changeLocationSuccess: action.payload };
        case CONSTANTS.POST_CHANGE_LOCATION_ERROR:
            return { changeLocationLoading: false, changeLocationError: action.payload };
        case CONSTANTS.CLEAR_POST_CHANGE_LOCATION_DATA:
            return { changeLocationLoading: false, changeLocationSuccess: null, changeLocationError: null };
        default:
            return state;
    }
};
