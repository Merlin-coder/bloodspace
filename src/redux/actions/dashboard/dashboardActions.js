import CONSTANTS from '../../../common/constants';
import axios from 'axios';

export const getDashboard = (filter) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_SCREEN_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();
    const {
        deviceLogin: { deviceUserInfo }
    } = getState();

    console.log('Authorization' + userInfo?.data.token);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/dashboard`;
    if (filter !== undefined) url = `${url}?filters=${filter}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_SCREEN_SUCCESS,
            payload: data.data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_SCREEN_FAIL,
            payload: data?.error?.errorMessage
        });
    }
};

export const getDashboardEuo = (emergency) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DASHBOARDEUO_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/dashboard/Euo?emergencyDeviceId=${emergency}`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DASHBOARDEUO_SUCCESS,
            payload: data.data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DASHBOARDEUO_FAIL,
            payload: data?.error?.errorMessage
        });
    }
};

export const getDashboardEuoUnitsIncomplete = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DASHBOARDEUO_UNITS_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}units`;

    const { data } = await axios.get(url, config);
    console.log('euodata', data);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DASHBOARDEUO_UNITS_SUCCESS,
            payload: data.data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DASHBOARDEUO_UNITS_FAIL,
            payload: data?.error?.errorMessage
        });
    }
};

export const getDashboardEuoBatchIncomplete = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DASHBOARDEUO_BATCH_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}units/batch`;

    const { data } = await axios.get(url, config);
    console.log('euodata', data);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DASHBOARDEUO_BATCH_SUCCESS,
            payload: data.data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DASHBOARDEUO_BATCH_FAIL,
            payload: data?.error?.errorMessage
        });
    }
};

export const getTemperature = (deviceId, number, type) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_TEMP_SCREEN_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/dashboard/temparature`;
    if (deviceId !== undefined) url = `${url}?deviceId=${deviceId}&dateCount=${number}&dateValue=${type}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_TEMP_SCREEN_SUCCESS,
            payload: data?.data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_TEMP_SCREEN_FAIL,
            payload: data?.error?.errorMessage
        });
    }
};

export const getTemperatureGraph = (deviceId, number, type) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_TEMP_GRAPH_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/dashboard/dashboardTemparature`;
    url = `${url}?deviceId=${deviceId}&dateCount=${number}&dateValue=${type}`;
    const { data } = await axios.get(url, config);
    console.log('da---', data);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_TEMP_GRAPH_SUCCESS,
            payload: data?.data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_TEMP_GRAPH_FAIL,
            payload: data?.error?.errorMessage
        });
    }
};

export const ackNotifyEuoSave = (form) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.PUT_ACKNOTIFY_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/ackNotify`;

    const { data } = await axios.put(url, form, config);
    console.log('euodata', data);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.PUT_ACKNOTIFY_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.PUT_ACKNOTIFY_FAIL,
            payload: data?.error?.errorMessage
        });
    }
};

export const alertsEuo = (deviceId) => async (dispatch, getState) => {
    dispatch({ type: 'GET_ALERTSEUO_REQUEST' });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/getNotify`;
    url = `${url}?deviceId=${deviceId}`;
    const { data } = await axios.get(url, config);
    console.log('euodata', data);
    if (data.status === true) {
        dispatch({
            type: 'GET_ALERTSEUO_SUCCESS',
            payload: data.data
        });
    } else {
        dispatch({
            type: 'GET_ALERTSEUO_FAIL',
            payload: data?.error?.errorMessage
        });
    }
};

export const alertsavEuo = (deviceId) => async (dispatch, getState) => {
    dispatch({ type: 'GET_ALERTSAVEUO_REQUEST' });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}units/activityList`;
    url = `${url}?deviceId=${deviceId}`;
    const { data } = await axios.get(url, config);
    console.log('euodata', data);
    if (data.status === true) {
        dispatch({
            type: 'GET_ALERTSAVEUO_SUCCESS',
            payload: data.data
        });
    } else {
        dispatch({
            type: 'GET_ALERTSAVEUO_FAIL',
            payload: data?.error?.errorMessage
        });
    }
};
