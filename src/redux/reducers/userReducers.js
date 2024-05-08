import CONSTANTS from '../../common/constants';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.USER_LOGIN_REQUEST:
            return { loading: true };
        case CONSTANTS.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case CONSTANTS.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case CONSTANTS.USER_LOGOUT:
            return {};
        default:
            return state;
    }
};
