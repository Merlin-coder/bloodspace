import axios from 'axios';
import CONSTANTS from 'common/constants';

const userLogin = localStorage?.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const config = {
    headers: {
        'Content-Type': 'application/json',
        authorization: userLogin?.data.token
    }
};

export const getFactTypes = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_FACT_TYPE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_FACT_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_FACT_TYPE_ERROR,
            payload: data.error
        });
    }
};

export const getFactConditions = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_FACT_CONDITION_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_FACT_CONDITION_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_FACT_CONDITION_ERROR,
            payload: data.error
        });
    }
};

export const getDynamicFactType = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_FACT_DYNAMIC_TYPE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_FACT_DYNAMIC_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_FACT_DYNAMIC_TYPE_ERROR,
            payload: data.error
        });
    }
};

export const getProductsInRules = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_PRODUCTS_IN_RULES_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_PRODUCTS_IN_RULES_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_PRODUCTS_IN_RULES_ERROR,
            payload: data.error
        });
    }
};

export const getUsersInRules = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_USERS_IN_RULES_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_USERS_IN_RULES_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_USERS_IN_RULES_ERROR,
            payload: data.error
        });
    }
};

export const getNotificationTypesInRules = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_NOTIFICATION_TYPE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_NOTIFICATION_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_NOTIFICATION_TYPE_ERROR,
            payload: data.error
        });
    }
};

export const getNotifiByTypesInRules = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_NOTIFI_BY_TYPE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_NOTIFI_BY_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_NOTIFI_BY_TYPE_ERROR,
            payload: data.error
        });
    }
};

export const getNotifyDynamicType = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_NOTIFY_DYNAMIC_TYPE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_NOTIFY_DYNAMIC_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_NOTIFY_DYNAMIC_TYPE_ERROR,
            payload: data.error
        });
    }
};

export const popupTemplate = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_POPUP_TEMPLATE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_POPUP_TEMPLATE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_POPUP_TEMPLATE_ERROR,
            payload: data.error
        });
    }
};

export const smsTemplate = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_SMS_TEMPLATE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_SMS_TEMPLATE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_SMS_TEMPLATE_ERROR,
            payload: data.error
        });
    }
};
export const emailTemplate = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_EMAIL_TEMPLATE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_EMAIL_TEMPLATE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_EMAIL_TEMPLATE_ERROR,
            payload: data.error
        });
    }
};
export const resolutionTypes = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_RESOLUTION_TYPE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_RESOLUTION_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_RESOLUTION_TYPE_ERROR,
            payload: data.error
        });
    }
};

export const selectedFact = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_SELECTED_FACT_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_SELECTED_FACT_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_SELECTED_FACT_ERROR,
            payload: data.error
        });
    }
};

export const selectedNotification = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_SELECTED_NOTIFICATION_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_SELECTED_NOTIFICATION_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_SELECTED_NOTIFICATION_ERROR,
            payload: data.error
        });
    }
};

export const selectedResolution = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_SELECTED_RESOLUTION_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=100`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_SELECTED_RESOLUTION_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_SELECTED_RESOLUTION_ERROR,
            payload: data.error
        });
    }
};
