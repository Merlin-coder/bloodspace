import axios from 'axios';
import CONSTANTS from 'common/constants';

export const deviceAccessDetails = (accessData) => {
    return {
        type: 'DEVICE_ACCESS_DETAILS',
        payload: accessData
    };
};

export const removeDeviceAccessDetails = (accessData) => {
    return {
        type: 'DEVICE_ACCESS_DETAILS_REMOVE',
        payload: accessData
    };
};

export const systemError = (mode) => {
    return {
        type: 'SYSTEM_ERROR_MODE',
        payload: mode
    };
};

export const clearSystemError = (mode) => {
    return {
        type: 'SYSTEM_ERROR_MODE_CLEAR',
        payload: mode
    };
};

export const remoteDashboardSocketDataAction = (data) => {
    return {
        type: 'REMOTE_DASHBOARD_SOCKET_DATA',
        payload: data
    };
};

export const remoteDashboardSocketDataClear = () => {
    return {
        type: 'REMOTE_DASHBOARD_SOCKET_DATA_CLEAR'
    };
};

export const getRemoteAccessDevice = (accessBadge, serialNumber) => async (dispatch, getState) => {
    console.log('accessBadge', accessBadge, 'serialNumber', serialNumber);

    dispatch({ type: 'GET_REMOTE_ACCESS_DEVICE' });
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

    let url = `${CONSTANTS.BASEURL}remote-session?accessBadge=${accessBadge}&serialNumber=${serialNumber}`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_REMOTE_ACCESS_DEVICE_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_REMOTE_ACCESS_DEVICE_ERROR',
            payload: data.error
        });
    }
};

export const socketSessionIdAction = (ID) => {
    return {
        type: 'SOCKET_SESSION_ID',
        payload: ID
    };
};

export const clearSocketSessionId = () => {
    return {
        type: 'CLEAR_SOCKET_SESSION_ID'
    };
};

export const handleBredcrumbsNameAction = (name) => {
    return {
        type: 'CHANGE_BREAD_CRUMBS_NAME',
        payload: name
    };
};

export const handleBredcrumbsNameClear = () => {
    return {
        type: 'CHANGE_BREAD_CRUMBS_NAME_CLEAR'
    };
};

export const remoteDBAccessDeviceAction = (id) => {
    return {
        type: 'REMOTE_DB_ACCESS_DEVICE',
        payload: id
    };
};
export const remoteDBAccessDeviceClear = () => {
    return {
        type: 'REMOTE_DB_ACCESS_DEVICE_CLEAR'
    };
};

export const getRemoteAssignAction = (assignData) => async (dispatch, getState) => {
    dispatch({ type: 'GET_REMOTE_ASSIGN_REQUEST' });
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

    let url = `${CONSTANTS.BASEURL}index/assign`;

    const { data } = await axios.post(url, assignData, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_REMOTE_ASSIGN_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_REMOTE_ASSIGN_ERROR',
            payload: data.error
        });
    }
};

export const clearRemoteAssignResponse = () => {
    return {
        type: 'CLEAR_REMOTE_ASSIGN'
    };
};

export const getBatchesByDeviceAction = (assignData) => async (dispatch, getState) => {
    dispatch({ type: 'GET_DEVICE_BATCHES_REQUEST' });
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

    let url = `${CONSTANTS.BASEURL}index/batchDevice?filters=[{"key":"deviceId","value":${assignData}}]`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_DEVICE_BATCHES_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_DEVICE_BATCHES_ERROR',
            payload: data.error
        });
    }
};

export const clearDeviceBatchesResponse = () => {
    return {
        type: 'CLEAR_DEVICE_BATCHES'
    };
};

//TODO: Get Status Report
export const getStatusReport = (deviceId) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_STATUS_REPORT_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/dashboard/statusReport`;
    if (deviceId !== undefined) url = `${url}?deviceId=${deviceId}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_STATUS_REPORT_SUCCESS,
            payload: data.data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_STATUS_REPORT_FAIL,
            payload: data.error.errorMessage
        });
    }
};
