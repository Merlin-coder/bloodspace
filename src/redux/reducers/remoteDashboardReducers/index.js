import CONSTANTS from 'common/constants';

export const deviceAccessDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DEVICE_ACCESS_DETAILS':
            return action.payload;
        case 'DEVICE_ACCESS_DETAILS_REMOVE':
            return {};
        default:
            return state;
    }
};

export const systemErrorModeReducer = (state = false, action) => {
    switch (action.type) {
        case 'SYSTEM_ERROR_MODE':
            console.log(action.payload, 'systemModein reducer');
            return action.payload;
        case 'SYSTEM_ERROR_MODE_CLEAR':
            return false;
        default:
            return state;
    }
};

export const socketSessionIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SOCKET_SESSION_ID':
            console.log(action.payload, 'socket session id  reducer');
            return action.payload;
        case 'CLEAR_SOCKET_SESSION_ID':
            return {};
        default:
            return state;
    }
};

export const breadCrumbsNameReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_BREAD_CRUMBS_NAME':
            console.log(action.payload, 'bread crumbs name  reducer');
            return action.payload || '';
        case 'CHANGE_BREAD_CRUMBS_NAME_CLEAR':
            return '';
        default:
            return state;
    }
};

export const remoteDashboardSocketDataReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REMOTE_DASHBOARD_SOCKET_DATA':
            console.log(action.payload, 'remoteDashBOard socket data reducer');
            return action.payload;
        case 'REMOTE_DASHBOARD_SOCKET_DATA_CLEAR':
            return {};
        default:
            return state;
    }
};

export const getRemoteAccessDeviceReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_REMOTE_ACCESS_DEVICE':
            return { remoteDeviceLoading: true };
        case 'GET_REMOTE_ACCESS_DEVICE_SUCCESS':
            return { remoteDeviceLoading: false, remoteAccessDevice: action.payload };
        case 'GET_REMOTE_ACCESS_DEVICE_ERROR':
            return { remoteDeviceLoading: false, remoteAccessDeviceError: action.payload };
        case 'CLEAR_REMOTE_ACCESS_DEVICE':
            return {};
        default:
            return state;
    }
};

export const getRemoteAssignReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_REMOTE_ASSIGN_REQUEST':
            return { remoteAssignLoading: true };
        case 'GET_REMOTE_ASSIGN_SUCCESS':
            return { remoteAssignLoading: false, remoteAssignSuccess: action.payload };
        case 'GET_REMOTE_ASSIGN_ERROR':
            return { remoteAssignLoading: false, remoteAssignError: action.payload };
        case 'CLEAR_REMOTE_ASSIGN':
            return {};
        default:
            return state;
    }
};

export const remoteDBAccessDeviceReducers = (state = '', action) => {
    switch (action.type) {
        case 'REMOTE_DB_ACCESS_DEVICE':
            return action.payload;
        case 'REMOTE_DB_ACCESS_DEVICE_CLEAR':
            return action.payload;
        default:
            return state;
    }
};

export const getBatchesByDeviceReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_DEVICE_BATCHES_REQUEST':
            return { deviceBatchLoading: true };
        case 'GET_DEVICE_BATCHES_SUCCESS':
            return { deviceBatchLoading: false, deviceBatchSuccess: action.payload };
        case 'GET_DEVICE_BATCHES_ERROR':
            return { deviceBatchLoading: false, deviceBatchError: action.payload };
        case 'CLEAR_DEVICE_BATCHES':
            return {};
        default:
            return state;
    }
};

export const getStatusReportReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_STATUS_REPORT_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_STATUS_REPORT_SUCCESS:
            return { loading: false, data: action.payload };
        case CONSTANTS.GET_STATUS_REPORT_FAIL:
            return { loading: false, data: action.payload };

        default:
            return state;
    }
};
