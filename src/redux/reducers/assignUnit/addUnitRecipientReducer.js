import CONSTANTS from 'common/constants';

export const postAddUnit = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.POST_ADD_UNIT_REQUEST:
            return { ...state, postUnitLoading: true };
        case CONSTANTS.POST_ADD_UNIT_SUCCESS:
            return { ...state, postUnitLoading: false, postUnitResponse: action.payload };
        case CONSTANTS.POST_ADD_UNIT_ERROR:
            return { ...state, postUnitLoading: false, postUnitError: action.payload };
        case CONSTANTS.CLEAR_POST_UNIT_RESPONSE:
            return {};
        default:
            return state;
    }
};
