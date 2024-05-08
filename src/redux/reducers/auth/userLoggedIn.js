import CONSTANTS from '../../../common/constants';

export const isLoggedInReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.USER_IS_LOGGEDIN:
            return { loading: false, isLoggedIn: action.payload };
        default:
            return state;
    }
};
export const isDeviceLoggedInReducer = (state = { isLoggedInDevice: false }, action) => {
    switch (action.type) {
        case 'DEVICE_IS_LOGGEDIN':
            return { loading: false, isLoggedInDevice: action.payload };
        default:
            return state;
    }
};
