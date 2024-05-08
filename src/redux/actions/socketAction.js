import { CONSTANTS } from 'common';
import socketIOClient from 'socket.io-client';

export const socketAction = (param) => async (dispatch) => {
    const LIVE_URL = window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2];
    let socket;
    /*    if (process.env.NODE_ENV === 'development') {
        socket = await socketIOClient(CONSTANTS.DEV_URL);
    } else {
        socket = await socketIOClient(CONSTANTS.LIVE_URL);
    }*/
    socket = await socketIOClient(LIVE_URL);

    if (socket) {
        if (param === 'dialog') {
            dispatch({
                type: CONSTANTS.SOCKET_DIALOG,
                payload: socket
            });
        } else {
            dispatch({
                type: CONSTANTS.SOCKET_CONNECT,
                payload: socket
            });
        }
    }
};

export const socketDevice = (device) => {
    return {
        type: CONSTANTS.SOCKET_DEVICE,
        payload: device
    };
};
export const socketDeviceValue = (value) => {
    return {
        type: CONSTANTS.SOCKET_DEVICE_VALUE,
        payload: value
    };
};

export const socketDeviceStatus = (devicestatus) => {
    console.log('devicestatus', devicestatus)
    return {
        type: CONSTANTS.SOCKET_DEVICE_STATUS,
        payload: devicestatus
    };
};

export const socketDeviceSerialnumber = (serial) => {
    console.log("act--",serial)
    return {
        type: CONSTANTS.SOCKET_DEVICE_SERIALNUMBER,
        payload: serial
    };
};
export const socketDeviceConnection = (device) => {
    return {
        type: CONSTANTS.SOCKET_DEVICE_CONNECTIONS,
        payload: device
    };
};

export const socketDeviceToken = (device) => {
    return {
        type: 'SOCKET_DEVICE_TOKEN',
        payload: device
    };
};

export const socketStartStopScan = (device) => {
    return {
        type: 'SOCKET_DEVICE_SCAN_STATUS',
        payload: device
    };
};

export const bulkScanLoadingAction = (option) => {
    return {
        type: 'SOCKET_BULK_SCAN_STATUS',
        payload: option
    };
};

export const currentPcAction = (option) => {
    return {
        type: 'SOCKET_CURRENT_PC_STATUS',
        payload: option
    };
};
export const assignWriteRecipientAction = (device) => {
    return {
        type: 'ASSIGN_WRITE_RECIPIENT',
        payload: device
    };
};

export const SocketScanData = (device) => {
    return {
        type: 'SOCKET_DEVICE_SCAN_RESULT',
        payload: device
    };
};
export const lfScanData = (device) => {
    return {
        type: 'LF_DEVICE_SCAN_RESULT',
        payload: device
    };
};
export const socketAssociateAddData = (device) => {
    return {
        type: 'SOCKET_DEVICE_ADD_DATA',
        payload: device
    };
};
export const socketAssociateBulkData = (device) => {
    return {
        type: 'SOCKET_DEVICE_BULK_DATA',
        payload: device
    };
};
export const oneTimeScanAction = (device) => {
    console.log(device);
    return {
        type: 'SOCKET_DEVICE_ONE_TIME_SCAN',
        payload: device
    };
};
export const oneTimeScanERROR = (device) => {
    return {
        type: 'SOCKET_DEVICE_ONE_TIME_SCAN_ERROR',
        payload: device
    };
};
export const lFConnection = (device) => {
    return {
        type: 'LF_DEVICE',
        payload: device
    };
};
export const lFDeviceMethod = (device) => {
    return {
        type: 'GET_LF_DEVICE',
        payload: device
    };
};

export const clearAssociteSocketResponse = () => {
    return {
        type: 'CLEAR_ASSOCIATE_SOCKET_RESPONSE'
    };
};

export const preEncodedLocalDataAction = (data) => {
    return {
        type: 'PRE_ENCODED_LOCAL_DATA',
        payload: data
    };
};

export const assignLocalDataAction = (data) => {
    return {
        type: 'ASSIGN_LOCAL_DATA',
        payload: data
    };
};

export const settingsLocalDataAction = (data) => {
    return {
        type: 'SETTINGS_LOCAL_DATA',
        payload: data
    };
};

export const settingsBatchDataAction = (data) => {
    return {
        type: 'SETTINGS_BATCH_DATA',
        payload: data
    };
};

export const settingsRemoteLoginPageAction = (data) =>
{
    console.log(" settingsRemoteLoginPageAction "+data);

    return {
        type: 'SETTINGS_REMOTE_LOGIN_PAGE',
        payload: data
    };
};

export const clearPreEncodedDataAction = () => {
    return {
        type: 'CLEAR_PRE_ENCODED_LOCAL_DATA'
    };
};

export const associateBatchStateAction = (data) => {
    return {
        type: 'ASSOCIATE_BATCH_LOCAL_DATA',
        payload: data
    };
};

export const clearAssociateBatchStateAction = () => {
    return {
        type: 'CLEAR_ASSOCIATE_BATCH_LOCAL_DATA'
    };
};

export const associateBarcodeStateAction = (data) => {
    return {
        type: 'ASSOCIATE_BARCODE_LOCAL_DATA',
        payload: data
    };
};
