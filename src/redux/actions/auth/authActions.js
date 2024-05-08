import CONSTANTS from '../../../common/constants';
import axios from 'axios';
const config = {
    headers: {
        'Content-Type': 'application/json',
        type: 'Web'
    }
};

export const login = (username, password, otp,loginType) => async (dispatch) => {
    dispatch({ type: CONSTANTS.USER_LOGIN_REQUEST });

    try {
        let url = `${CONSTANTS.BASEURL}auth/`;

        if (otp === undefined) url = `${url}login`;
        if (otp !== undefined) url = `${url}otploginverify`;

        const loginResponse = await axios.post(url, otp ? { username, password, otp } : { username, password,loginType }, config);
        const { data } = loginResponse;
        if (data.status === true) {
            dispatch({
                type: CONSTANTS.USER_LOGIN_SUCCESS,
                payload: data
            });
            dispatch({
                type: CONSTANTS.USER_IS_LOGGEDIN,
                payload: true
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('isLoggedIn', true);
        } else {
            dispatch({
                type: CONSTANTS.USER_LOGIN_FAIL,
                payload: otp ? data.errorMessage : data.error.errorMessage
            });
        }
    } catch (error) {
        dispatch({
            type: CONSTANTS.USER_LOGIN_FAIL,
            payload: error?.response?.statusText
        });
    }
};

export const deviceLogin = (username, password, accessBadge, serialNumber) => async (dispatch) => {
    dispatch({ type: 'DEVICE_LOGIN_REQUEST' });

    try {
        let url = `${CONSTANTS.BASEURL}auth/`;

        if (accessBadge === undefined) url = `${url}loginManual`;
        if (accessBadge !== undefined) url = `${url}loginBadge`;

        const loginResponse = await axios.post(
            url,
            accessBadge ? { accessBadge, serialNumber } : { username, password, serialNumber },
            config
        );
        const { data } = loginResponse;
        console.log(data)
        console.log(accessBadge)
        console.log(data.errorCode)
        localStorage.setItem('InvalidBadge', false);
        if (data.status === true) {
            dispatch({
                type: 'DEVICE_LOGIN_SUCCESS',
                payload: data
            });
            dispatch({
                type: 'DEVICE_IS_LOGGEDIN',
                payload: true
            });
            localStorage.setItem('isLoggedInDevice', true);
            localStorage.setItem('deviceUserInfo', JSON.stringify(data));
            localStorage.setItem('userInfo', JSON.stringify(data));
        } else if (data.errorCode === "E001")
        {
            if (accessBadge !== undefined) {
                localStorage.setItem('InvalidBadge', true);
            }
            console.log(accessBadge === undefined ? 'DEVICE_LOGIN_FAIL' : 'DEVICE_BADGE_FAIL')
            dispatch({
                type: accessBadge === undefined ? 'DEVICE_LOGIN_FAIL' : 'DEVICE_BADGE_FAIL',
                payload: data.error === undefined ? data.errorMessage : data.error.errorMessage
            });
        }
        else {
            dispatch({
                type: accessBadge === undefined ? 'DEVICE_LOGIN_FAIL' : 'DEVICE_BADGE_FAIL',
                payload: data.error === undefined ? data.errorMessage : data.error.errorMessage
            });
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: accessBadge === undefined ? 'DEVICE_LOGIN_FAIL' : 'DEVICE_BADGE_FAIL',
            payload: error?.response?.statusText
        });
    }
};

export const remoteLogin = (username, password, accessBadge, serialNumber) => async (dispatch) => {
    dispatch({ type: 'DEVICE_LOGIN_REQUEST' });

    try {
        let url = `${CONSTANTS.BASEURL}auth/`;

        if (accessBadge === undefined) url = `${url}loginManual`;
        if (accessBadge !== undefined) url = `${url}loginBadge`;

        const loginResponse = await axios.post(
            url,
            accessBadge ? { accessBadge, serialNumber } : { username, password, serialNumber },
            config
        );
        const { data } = loginResponse;
        console.log(data)
        console.log(accessBadge)
        console.log(data.errorCode)
        localStorage.setItem('InvalidBadge', false);
        if (data.status === true) {
            dispatch({
                type: 'DEVICE_LOGIN_SUCCESS',
                payload: data
            });
            dispatch({
                type: 'DEVICE_IS_LOGGEDIN',
                payload: true
            });
            localStorage.setItem('isLoggedInDevice', true);
            localStorage.setItem('deviceUserInfo', JSON.stringify(data));
            localStorage.setItem('remoteDevDevice', JSON.stringify(data.data.deviceData));        
            let userData = {
                data: {
                    status: data.status,
                    user: data.data.userData,
                    userAccess: data.data.userAccess,
                    token: data.data.token
                }
            };
            localStorage.setItem('userInfo', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', true);
            dispatch({
                type: CONSTANTS.USER_LOGIN_SUCCESS,
                payload: userData
            });
            dispatch({
                type: CONSTANTS.USER_IS_LOGGEDIN,
                payload: true
            });
            
        } else if (data.errorCode === "E001") {
            if (accessBadge !== undefined) {
                localStorage.setItem('InvalidBadge', true);
            }
            console.log(accessBadge === undefined ? 'DEVICE_LOGIN_FAIL' : 'DEVICE_BADGE_FAIL')
            dispatch({
                type: accessBadge === undefined ? 'DEVICE_LOGIN_FAIL' : 'DEVICE_BADGE_FAIL',
                payload: data.error === undefined ? data.errorMessage : data.error.errorMessage
            });
        }
        else {
            dispatch({
                type: accessBadge === undefined ? 'DEVICE_LOGIN_FAIL' : 'DEVICE_BADGE_FAIL',
                payload: data.error === undefined ? data.errorMessage : data.error.errorMessage
            });
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: accessBadge === undefined ? 'DEVICE_LOGIN_FAIL' : 'DEVICE_BADGE_FAIL',
            payload: error?.response?.statusText
        });
    }
};
export const deviceLogout = () => (dispatch) => {
    localStorage.removeItem('deviceUserInfo');
    localStorage.setItem('isLoggedInDevice', false);
    dispatch({ type: 'DEVICE_LOGOUT' });
    dispatch({
        type: 'DEVICE_IS_LOGGEDIN',
        payload: false
    });
};
export const clearDeviceLoginState = () => {
    return {
        type: 'CLEAR_DEVICE_LOGIN_STATE'
    };
};

export const getOtpLogin = (username, password) => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_OTP_REQUEST });
    try {
        const loginResponse = await axios.post(`${CONSTANTS.BASEURL}auth/otplogin`, { username, password }, config);
        const { data } = loginResponse;
        if (data.status === true) {
            dispatch({
                type: CONSTANTS.GET_OTP_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.GET_OTP_ERROR,
                payload: data.error.errorMessage
            });
        }
    } catch (error) {
        dispatch({
            type: CONSTANTS.GET_OTP_ERROR,
            payload: error.response.statusText
        });
    }
};

export const clearLoginState = () => {
    return {
        type: 'CLEAR_LOGIN_STATE'
    };
};

export const clearOtpState = () => {
    return {
        type: CONSTANTS.CLEAR_OTP_LOGIN_RESPONSES
    };
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.setItem('isLoggedIn', false);
    dispatch({ type: CONSTANTS.USER_LOGOUT });
    dispatch({
        type: CONSTANTS.USER_IS_LOGGEDIN,
        payload: false
    });
};

export const forgotPasswordApi = (email) => async (dispatch) => {
    dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });
    try {
        const loginResponse = await axios.post(`${CONSTANTS.BASEURL}auth/forgetpassword`, { email }, config);
        const { data } = loginResponse;
        if (data.status === true) {
            dispatch({
                type: 'FORGOT_PASSWORD_REQUEST_SUCCESS',
                payload: data
            });
        } else {
            dispatch({
                type: 'FORGOT_PASSWORD_REQUEST_ERROR',
                payload: data.error
            });
        }
    } catch (error) {
        dispatch({
            type: 'FORGOT_PASSWORD_REQUEST_ERROR',
            payload: error
        });
    }
};

export const clearForgotPassowrdResponse = () => {
    return { type: 'CLEAR_FORGOT_PASSWORD_RESPONSE' };
};

export const verifyOtpAndPassword = (email, otp, password) => async (dispatch) => {
    dispatch({ type: 'VERIFY_OTP_PASSWORD_REQUEST' });
    try {
        const loginResponse = await axios.post(
            `${CONSTANTS.BASEURL}auth/forgetpasswordverify`,
            { email, otp, password },
            config
        );
        const { data } = loginResponse;
        if (data.status === true) {
            dispatch({
                type: 'VERIFY_OTP_PASSWORD_REQUEST_SUCCESS',
                payload: data
            });
        } else {
            dispatch({
                type: 'VERIFY_OTP_PASSWORD_REQUEST_ERROR',
                payload: data.error
            });
        }
    } catch (error) {
        dispatch({
            type: 'VERIFY_OTP_PASSWORD_REQUEST_ERROR',
            payload: error
        });
    }
};

export const clearNewPasswordSuccess = () => {
    return {
        type: 'CLEAR_NEW_PASSWORD_SUCCESS_MESSAGE'
    };
};
