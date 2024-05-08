import CONSTANTS from '../../../common/constants';
const userLogin = { loading: false, userInfo: {}, error: null };
export const userLoginReducer = (state = userLogin, action) => {
    switch (action.type) {
        case CONSTANTS.USER_LOGIN_REQUEST:
            return { loading: true };
        case CONSTANTS.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case CONSTANTS.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case CONSTANTS.USER_LOGOUT:
            return userLogin;
        case CONSTANTS.CLEAR_LOGIN_STATE:
            return { loading: false, userInfo: null, error: null };
        default:
            return state;
    }
};
export const deviceLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DEVICE_LOGIN_REQUEST':
            return { deviceLoading: true };
        case 'DEVICE_LOGIN_SUCCESS':
            return { deviceLoading: false, deviceUserInfo: action.payload };
        case 'DEVICE_LOGIN_FAIL':
            return { deviceLoading: false, deviceError: action.payload };
        case 'DEVICE_BADGE_FAIL':
            return { deviceLoading: false, deviceError: true };
        case 'DEVICE_LOGOUT':
            return userLogin;
        case 'CLEAR_DEVICE_LOGIN_STATE':
            return {};
        default:
            return state;
    }
};
export const getLicenseReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_LICENSE_REQUEST':
            return { licenseLoading: true };
        case 'GET_LICENSE_SUCCESS':
            return { licenseLoading: false, licenseInfo: action.payload };
        case 'GET_LICENSE_ERROR':
            return { licenseLoading: false, licenseError: action.payload };

        default:
            return state;
    }
};

export const getOtpReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_OTP_REQUEST:
            return { otpLoading: true };
        case CONSTANTS.GET_OTP_SUCCESS:
            return { otpLoading: false, getOtpSuccess: action.payload };
        case CONSTANTS.GET_OTP_ERROR:
            return { otpLoading: false, getOtpError: action.payload };
        case CONSTANTS.CLEAR_OTP_LOGIN_RESPONSES:
            return {};
        default:
            return state;
    }
};

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.FORGOT_PASSWORD_REQUEST:
            return { requestingOtp: true };
        case CONSTANTS.FORGOT_PASSWORD_REQUEST_SUCCESS:
            return { requestingOtp: false, forgotPasswordResponse: action.payload };
        case CONSTANTS.FORGOT_PASSWORD_REQUEST_ERROR:
            return { requestingOtp: false, forgotPasswordError: action.payload };
        case CONSTANTS.CLEAR_FORGOT_PASSWORD_RESPONSE:
            return {};
        default:
            return state;
    }
};

export const verifyForgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.VERIFY_OTP_PASSWORD_REQUEST:
            return { otpLoading: true };
        case CONSTANTS.VERIFY_OTP_PASSWORD_REQUEST_SUCCESS:
            return { otpLoading: false, newPasswordSuccess: action.payload };
        case CONSTANTS.VERIFY_OTP_PASSWORD_REQUEST_ERROR:
            return { otpLoading: false, newPasswordSuccess: false, newPasswordError: action.payload };
        case CONSTANTS.CLEAR_NEW_PASSWORD_SUCCESS_MESSAGE:
            return { otpLoading: false, newPasswordSuccess: false, newPasswordError: false };
        default:
            return state;
    }
};
