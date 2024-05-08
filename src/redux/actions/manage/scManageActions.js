import axios from 'axios';
import CONSTANTS from 'common/constants';

const userLogin = localStorage?.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const config = {
    headers: {
        'Content-Type': 'application/json',
        authorization: userLogin?.data.token
    }
};

export const getData = (urlEndPoint, screenName, pageSize, pageNumber, search, filters, sort) => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_DATA_REQUEST });
    // getData(urlEndPoint)
    let url = `${CONSTANTS.BASEURL}${urlEndPoint}/index`;
    if (screenName !== undefined) url = `${url}?screen=${screenName}`;
    if (sort !== undefined) url = `${url}&sort=${sort}`;
    if (filters !== undefined) url = `${url}&filters=${filters}`;
    if (pageSize !== undefined) url = `${url}&pageSize=${pageSize}`;
    if (pageNumber !== undefined) url = `${url}&pageNumber=${pageNumber}`;
    if (search !== undefined) url = `${url}&search=${search}`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DATA_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DATA_ERROR,
            payload: data.error
        });
    }
};

export const getLocationTypes = () => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_LOCATION_TYPE_REQUEST });
    const { data } = await axios.get(`${CONSTANTS.BASEURL}location-type/index`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_LOCATION_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_LOCATION_TYPE_FAIL,
            payload: data.error
        });
    }
};

export const updateData = (urlEndPoint, update) => async (dispatch) => {
    dispatch({ type: CONSTANTS.UPDATE_DATA_REQUEST });
    const { data } = await axios.put(`${CONSTANTS.BASEURL}${urlEndPoint}`, update, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.UPDATE_DATA_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.UPDATE_DATA_FAIL,
            payload: data.error
        });
    }
};

export const deleteRow = (urlEndPoint, id) => async (dispatch) => {
    dispatch({ type: CONSTANTS.DELETE_ROW_REQUEST });
    const { data } = await axios.delete(`${CONSTANTS.BASEURL}${urlEndPoint}?_id=${id}`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.DELETE_ROW_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.DELETE_ROW_FAIL,
            payload: data.error
        });
    }
};

export const getUserRoles = () => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_USER_GROUPS_REQUEST });
    const { data } = await axios.get(`${CONSTANTS.BASEURL}user-role/index`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_USER_GROUPS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_USER_GROUPS_FAIL,
            payload: data.error
        });
    }
};

export const getDeviceTypes = () => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_DEVICE_TYPE_REQUEST });
    const { data } = await axios.get(`${CONSTANTS.BASEURL}device-type/index`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DEVICE_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DEVICE_TYPE_FAIL,
            payload: data.error
        });
    }
};

export const getClientIds = () => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_CLIENT_ID_REQUST });
    const { data } = await axios.get(`${CONSTANTS.BASEURL}client/index?screen=SC1003`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_CLIENT_ID_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_CLIENT_ID_FAIL,
            payload: data.error
        });
    }
};

export const getDownloadData = (urlEndPoint) => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_DOWNLOAD_DATA_REQUEST });
    const { data } = await axios.get(`${CONSTANTS.BASEURL}${urlEndPoint}/exportExcel`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DOWNLOAD_DATA_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DOWNLOAD_DATA_FAIL,
            payload: data.error
        });
    }
};

export const clearData = () => {
    return {
        type: CONSTANTS.CLEAR_DATA
    };
};

export const pullOutAction = (data1, put) => async (dispatch, getState) => {
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo?.data?.token
        }
    };

    console.log('called in pullOut Action', data1, put);
    dispatch({ type: 'PULLOUT_REQUEST' });
    // if (put !== undefined) url = `${url}?screen=${screenName}`;
    let data;
    if (put !== undefined) {
        data = await axios.put(`${CONSTANTS.BASEURL}request-pull-out`, data1, config);
    } else {
        data = await axios.post(`${CONSTANTS.BASEURL}request-pull-out`, data1, config);
    }
    if (data?.data?.status === true) {
        dispatch({
            type: 'PULLOUT_REQUEST_SUCCESS',
            payload: data?.data
        });
    } else {
        dispatch({
            type: 'PULLOUT_REQUEST_FAIL',
            payload: data?.data?.error
        });
    }
};
export const clearPullOutData = () => {
    return {
        type: 'PULLOUT_CLEAR_DATA'
    };
};

export const refreshPullOutData = (id) => async (dispatch) => {
    dispatch({ type: 'REFRESH_PULLOUT_DATA_REQUEST' });

    const { data } = await axios.get(`${CONSTANTS.BASEURL}request-pull-out/get-by-id?_id=${id}`, config);

    if (data.status === true) {
        dispatch({
            type: 'REFRESH_PULLOUT_DATA_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'REFRESH_PULLOUT_DATA_FAIL',
            payload: data?.error
        });
    }
};

export const clearRefreshPullOutData = () => {
    return {
        type: 'REFRESH_PULLOUT_CLEAR_DATA'
    };
};

export const pullOutCancelAction = (formData) => async (dispatch) => {
    dispatch({ type: 'PULL_OUT_CANCEL_LOADING' });
    const { data } = await axios.put(`${CONSTANTS.BASEURL}index`, formData, config);
    if (data.status === true) {
        dispatch({
            type: 'PULL_OUT_CANCEL_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'PULL_OUT_CANCEL_ERROR',
            payload: data?.error
        });
    }
};

export const getRefskuData = (collectionName, pageSize, pageNumber, search, filters, sort) => async (
    dispatch,
    getState
) => {
    dispatch({ type: 'GET_REFSKU_DATA_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo?.data?.token
        }
    };

    // getData(urlEndPoint)
    let url = `${CONSTANTS.BASEURL}index?collectionName=refsku`;
    if (pageSize !== undefined) url = `${url}&pageSize=${pageSize}`;
    if (pageNumber !== undefined) url = `${url}&pageNumber=${pageNumber}`;
    if (search !== undefined) url = `${url}&search=${search}`;
    if (filters !== undefined) url = `${url}&filters=${filters}`;
    if (sort !== undefined) url = `${url}&sort=${sort}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_REFSKU_DATA_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_REFSKU_DATA_ERROR',
            payload: data.error
        });
    }
};

export const errorReportData = (id) => async (dispatch) => {
    dispatch({ type: 'ERROR_REPORT_DATA_REQUEST' });

    const { data } = await axios.get(`${CONSTANTS.BASEURL}error-report/get-by-id?_id=${id}`, config);

    if (data.status === true) {
        dispatch({
            type: 'ERROR_REPORT_DATA_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'ERROR_REPORT_DATA_FAIL',
            payload: data?.error
        });
    }
};

export const clearErrorReportData = () => {
    return {
        type: 'ERROR_REPORT_CLEAR_DATA'
    };
};

export const requestRemoteAllocation = (body) => async (dispatch) => {
    dispatch({ type: 'REMOTE_ALLOCATION_REQUEST' });

    const { data } = await axios.post(`${CONSTANTS.BASEURL}LISRequest`,body, config);

    if (data.status === true) {
        dispatch({
            type: 'REMOTE_ALLOCATION_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'REMOTE_ALLOCATION_FAIL',
            payload: data
        });
    }
};

export const compatabilityPdfSlip = (pdf) => async (dispatch) => {
    dispatch({ type: 'PDF_SLIP_REQUEST' });

    const { data } = await axios.post(`${CONSTANTS.BASEURL}index/createPDF`, pdf, config);

    if (data.status === true) {
        dispatch({
            type: 'PDF_SLIP_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'PDF_SLIP_FAIL',
            payload: data?.error
        });
    }
};

export const validationSlipUpdate = (status,slipId) => async (dispatch) => {
    dispatch({ type: 'VALIDATION_SLIP_REQUEST' });

    const { data } = await axios.put(`${CONSTANTS.BASEURL}index/updateStatus?status=${status}&slipId=${slipId}`, config);

    if (data.status === true) {
        dispatch({
            type: 'VALIDATION_SLIP_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'VALIDATION_SLIP_FAIL',
            payload: data?.error
        });
    }
};