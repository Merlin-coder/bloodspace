import { CONSTANTS } from 'common';

const postTransferState = { transferDataLoading: false, transferDataSuccess: null, transferDataError: null };
export const transferDataReducer = (state = postTransferState, action) => {
    switch (action.type) {
        case CONSTANTS.POST_TRANSFER_DATA_REQUEST:
            return { transferDataLoading: true };
        case CONSTANTS.POST_TRANSFER_DATA_SUCCESS:
            return { transferDataLoading: false, transferDataSuccess: action.payload };
        case CONSTANTS.POST_TRANSFER_DATA_ERROR:
            return { transferDataLoading: false, transferDataError: action.payload };
        case CONSTANTS.CLEAR_GET_TRANSFER_DATA:
            return postTransferState;
        default:
            return state;
    }
};

const trasferDataState = { getTransferDataLoading: false, getTransferDataSuccess: null, getTransferDataError: null };

export const getTransferDataReducer = (state = trasferDataState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_TRANSACTION_DATA_REQUEST:
            return { getTransferDataLoading: true };
        case CONSTANTS.GET_TRANSACTION_DATA_SUCCESS:
            return { getTransferDataLoading: false, getTransferDataSuccess: action.payload };
        case CONSTANTS.GET_TRANSACTION_DATA_ERROR:
            return { getTransferDataLoading: false, getTransferDataError: action.payload };
        case CONSTANTS.CLEAR_GET_TRANSFER_DATA:
            return trasferDataState;
        default:
            return state;
    }
};

export const getReceiveUnitsReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_RECEIVE_UNITS_REQUEST:
            return { getReceiveUnitsLoading: true };
        case CONSTANTS.GET_RECEIVE_UNITS_SUCCESS:
            return { getReceiveUnitsLoading: false, getReceiveUnitsSuccess: action.payload };
        case CONSTANTS.GET_RECEIVE_UNITS_ERROR:
            return { getReceiveUnitsLoading: false, getReceiveUnitsError: action.payload };
        case CONSTANTS.CLEAR_RECEIVE_UNITS_DATA:
            return {};
        default:
            return state;
    }
};

const getReceivedUnitsState = { receivedUnitsSuccess: {} };
export const getReceivedUnitsReducer = (state = getReceivedUnitsState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_RECEIVED_UNITS:
            return { receivedUnitsSuccess: action.payload };
        case CONSTANTS.CLEAR_RECEIVED_UNITS:
            return getReceivedUnitsState;
        default:
            return state;
    }
};
