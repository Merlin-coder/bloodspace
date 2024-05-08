import { CONSTANTS } from 'common';
import SpaceCode from '../../common/sdk/spacecode';

export const socketReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.SOCKET_CONNECT:
            return { socket: action.payload };

        case CONSTANTS.SOCKET_DIALOG:
            return { dialog: action.payload };

        default:
            return state;
    }
};
export const getSocketDevice = (state = { device: undefined }, action) => {
    switch (action.type) {
        case CONSTANTS.SOCKET_DEVICE:
            return { device: action.payload };

        default:
            return state;
    }
};

export const getSocketDeviceValue = (state = { value: undefined }, action) => {
    switch (action.type) {
        case CONSTANTS.SOCKET_DEVICE_VALUE:
            return { value: action.payload };

        default:
            return state;
    }
};

export const getSocketDeviceStatus = (state = { devicestatus: undefined}, action) => {
    switch (action.type) {
        case CONSTANTS.SOCKET_DEVICE_STATUS:
            return { devicestatus: action.payload };

        default:
            return state;
    }
};
export const getSocketDeviceSerialnumber = (state = { serial: undefined }, action) => {
    switch (action.type) {
        case CONSTANTS.SOCKET_DEVICE_SERIALNUMBER:
            return { serial: action.payload };

        default:
            return state;
    }
};
export const getSocketDeviceConnection = (state = { status: false }, action) => {
    switch (action.type) {
        case CONSTANTS.SOCKET_DEVICE_CONNECTIONS:
            return { status: action.payload };

        default:
            return state;
    }
};
export const getSocketStartStopScan = (state = { scanStatus: false }, action) => {
    switch (action.type) {
        case 'SOCKET_DEVICE_SCAN_STATUS':
            return { scanStatus: action.payload };

        default:
            return state;
    }
};

export const bulkScanLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'SOCKET_BULK_SCAN_STATUS':
            return action.payload;
        default:
            return state;
    }
};

export const assignWriteRecipientReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ASSIGN_WRITE_RECIPIENT':
            return action.payload;
        default:
            return state;
    }
};

// SOCKET_CURRENT_PC_STATUS

export const currentPcReducer = (state = false, action) => {
    switch (action.type) {
        case 'SOCKET_CURRENT_PC_STATUS':
            return action.payload;
        default:
            return state;
    }
};

export const getSocketDeviceToken = (state = { token: undefined }, action) => {
    switch (action.type) {
        case 'SOCKET_DEVICE_TOKEN':
            return { token: action.payload };

        default:
            return state;
    }
};
export const getSocketScanData = (state = { preEncodeData: [], oneTimeScanTag: '' }, action) => {
    let tempData = [...state.preEncodeData];
    console.log(action.payload)
    console.log(action.type)
    switch (action.type) {
        case 'SOCKET_DEVICE_SCAN_RESULT':
            //tempData = tempData.filter((item) => item?.rfidNumber !== action?.payload[0]?.rfidNumber);

            return { preEncodeData: [...tempData, ...action.payload] };
        case 'SOCKET_DEVICE_ADD_DATA':
            tempData = tempData.filter((item) => item?.rfidNumber !== action?.payload?.rfidNumber);

            return { ...state, preEncodeData: [...tempData] };
        case 'SOCKET_DEVICE_BULK_DATA':
            return { ...state, preEncodeData: [] };
        case 'SOCKET_DEVICE_ONE_TIME_SCAN':
            return { ...state, oneTimeScanTag: action.payload };
        case 'LF_DEVICE_SCAN_RESULT':
            return { preEncodeData: [...state.preEncodeData, action.payload] };

        case 'SOCKET_DEVICE_ONE_TIME_SCAN_ERROR':
            return { ...state, oneTimeScanTag: '' };
        case 'CLEAR_ASSOCIATE_SOCKET_RESPONSE':
            return { preEncodeData: [], oneTimeScanTag: '' };
        default:
            return state;
    }
};
export const getLFConnectionStatus = (state = { lfDeviceStatus: false }, action) => {
    switch (action.type) {
        case 'LF_DEVICE':
            return { lfDeviceStatus: action.payload };

        default:
            return state;
    }
};

export const getLFDevice = (state = { lfDevice: false }, action) => {
    let dev = false;
    switch (action.type) {
        case 'GET_LF_DEVICE':
            dev = new SpaceCode.Device(action.payload);

            return { lfDevice: dev };

        default:
            return state;
    }
};

export const preEncodedLocalDataReducer = (state = { localPreEncode: [] }, action) => {
    switch (action.type) {
        case 'PRE_ENCODED_LOCAL_DATA':
            return { localPreEncode: action.payload || [] };
        case 'CLEAR_PRE_ENCODED_LOCAL_DATA':
            console.log("typeee", action);
            return { localPreEncode: [] };

        default:
            return state;
    }
};

export const assignDataLocalDataReducer = (state = { assignData: [] }, action) => {
    switch (action.type) {
        case 'ASSIGN_LOCAL_DATA':
            return { assignData: action.payload || [] };
        case 'CLEAR_ASSIGN_LOCAL_DATA':
            return { assignData: [] };

        default:
            return state;
    }
};


export const settingsLocalDataReducer = (state = { settingsData: [] }, action) => {
    switch (action.type) {
        case 'SETTINGS_LOCAL_DATA':
            return { settingsData: action.payload || [] };
        case 'CLEAR_SETTINGS_LOCAL_DATA':
            return { settingsData: [] };

        default:
            return state;
    }
};

export const settingsBatchDerervationDataReducer = (state = { settingsBatchData: [] }, action) => {
    switch (action.type) {
        case 'SETTINGS_BATCH_DATA':
            return { settingsBatchData: action.payload || [] };
        case 'CLEAR_SETTINGS_BATCH_DATA':
            return { settingsBatchData: [] };

        default:
            return state;
    }
};


export const settingsRemoteLoginPageReducer = (state = { remotesettingsData: [] }, action) => {
    switch (action.type) {
        case 'SETTINGS_REMOTE_LOGIN_PAGE':
            return { remotesettingsData: action.payload || [] };
        case 'CLEAR_SETTINGS_REMOTE_LOGIN_PAGE':
            return { remotesettingsData: [] };

        default:
            return state;
    }
};



export const associateBatchStateReducer = (state = { local2DBarcode: {} }, action) => {
    switch (action.type) {
        case 'ASSOCIATE_BATCH_LOCAL_DATA':
            return { local2DBarcode: action.payload || {} };
        case 'CLEAR_ASSOCIATE_BATCH_LOCAL_DATA':
            return { local2DBarcode: {} };

        default:
            return state;
    }
};

//'ASSOCIATE_BARCODE_LOCAL_DATA'

export const associateBarcodeStateReducer = (state = { barcoded: false }, action) => {
    switch (action.type) {
        case 'ASSOCIATE_BARCODE_LOCAL_DATA':
            return { barcoded: action.payload || false };
        default:
            return state;
    }
};
