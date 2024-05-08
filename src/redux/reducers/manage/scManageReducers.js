import CONSTANTS from 'common/constants';

const responseDataInitialState = { loading: false, error: '', responseData: {} };

export const getDataReducer = (state = responseDataInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DATA_REQUEST:
            if (state.responseData.data) {
                return { ...state };
            }
            return { ...state, loading: true };
        case CONSTANTS.GET_DATA_SUCCESS:
            if (state.responseData.data) {
                if (action.payload.page.currentPage === 1) {
                    return { ...state, loading: false, responseData: action.payload };
                }
                return {
                    ...state,
                    loading: false,
                    responseData: { ...action.payload, data: [...state.responseData.data, ...action.payload.data] }
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    responseData: { ...action.payload, data: [...action.payload.data] }
                };
            }
        case CONSTANTS.GET_DATA_ERROR:
            return { ...state, error: action.payload, loading: false };

        case CONSTANTS.CLEAR_DATA:
            return responseDataInitialState;

        default:
            return state;
    }
};

const userRoleInitialState = { loading: false, error: '', userRoleData: {} };

export const getUserRoleIdReducer = (state = userRoleInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_USER_ROLE_REQUEST:
            console.log("action",action.type)
            return { resLoading: true };
        case CONSTANTS.GET_USER_ROLE_SUCCESS:
            return { ...state, resLoading: false, userRoleData: action.payload };
        case CONSTANTS.GET_USER_ROLE_ERROR:
            return { ...state, resError: action.payload, resLoading: false };

      
   

        default:
            return state;
    }
};

export const getResponseDataReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_DATAS_REQUEST':
            return { resLoading: true };
        case 'GET_DATAS_DONE':
            return { resLoading: false, resData: action.payload };
        case 'GET_DATAS_FAIL':
            return { ...state, resError: action.payload, resLoading: false };

        case 'GET_DATAS_CLEAR':
            return {};

        default:
            return state;
    }
};
export const postPullOutReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PULLOUT_REQUEST':
            return { pullOutLoading: true, pullOutResponse: action.payload };
        case 'PULLOUT_REQUEST_SUCCESS':
            return { pullOutLoading: false, pullOutSuccess: action.payload };
        case 'PULLOUT_REQUEST_FAIL':
            return { pullOutLoading: false, pullOutError: action.payload };
        case 'PULLOUT_CLEAR_DATA':
            return {};
        default:
            return state;
    }
};

export const pullOutCancelActionReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PULL_OUT_CANCEL_LOADING':
            return { pullOutCancelLoading: true };
        case 'PULL_OUT_CANCEL__SUCCESS':
            return { pullOutCancelLoading: false, pullOutCancelSuccess: action.payload };
        case 'PULL_OUT_CANCEL__FAIL':
            return { pullOutCancelLoading: false, pullOutCancelError: action.payload };
        // case 'CLEAR_PULL_OUT_CANCEL_DATA':
        //     return {};
        default:
            return state;
    }
};

export const refreshPulloutDataReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REFRESH_PULLOUT_DATA_REQUEST':
            return { refreshPUlloutLoading: true };
        case 'REFRESH_PULLOUT_DATA_SUCCESS':
            return { refreshPullOutLoading: false, refreshPullOutSuccess: action.payload };
        case 'REFRESH_PULLOUT_DATA_FAIL':
            return { refreshPullOutLoading: false, refreshPullOutError: action.payload };
        case 'REFRESH_PULLOUT_CLEAR_DATA':
            return {};
        default:
            return state;
    }
};

export const getRefSkuDataReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_REFSKU_DATA_REQUEST':
            return { refskuDataLoading: true };

        case 'GET_REFSKU_DATA_SUCCESS':
            console.log(action.data, 'actionData', 'refskuDataSuccess');
            return { refskuDataLoading: false, refskuDataSuccess: action.payload };

        case 'GET_REFSKU_DATA_ERROR':
            return { refskuDataLoading: false, refskuDataError: action.data };

        default:
            return state;
    }
};
export const getUnitBatchReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_UNIT_BATCH_REQUEST':
            return { ...state, dataLoading: true };
        case 'GET_UNIT_BATCH_SUCCESS':
            return { ...state, dataLoading: false, dataResponse: action.payload };
        case 'GET_UNIT_BATCH_ERROR':
            return { ...state, dataLoading: false, error: action.payload };
        case 'CLEAR_UNIT_BATCH_DATA':
            return {};
        default:
            return state;
    }
};

export const errorReportDataReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ERROR_REPORT_DATA_REQUEST':
            return {};
        case 'ERROR_REPORT_DATA_SUCCESS':
            return action.payload;
        case 'ERROR_REPORT_DATA_FAIL':
            return action.payload;
        case 'ERROR_REPORT_CLEAR_DATA':
            return {};
        default:
            return state;
    }
};
const devisestatusInitialState = { loading: false, deviceStatus: {}, error: '' };

export const deviceStatusReducer = (state = devisestatusInitialState, action) => {
    console.log(action.payload)
    switch (action.type) {

        case CONSTANTS.GET_DEVICE_STATUS:
            return { ...state, loading: true };
        case CONSTANTS.GET_DEVICE_STATUS_SUCCESS:
            return { ...state, loading: false, deviceStatus: action.payload };
          
        case CONSTANTS.GET_DEVICE_STATUS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const requestRemoteAllocationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REMOTE_ALLOCATION_REQUEST':
            return { requestRemoteAllocationLoading: true };
        case 'REMOTE_ALLOCATION_SUCCESS':
            return { requestRemoteAllocationLoading: false, requestRemoteAllocationdata: action.payload };
        case 'REMOTE_ALLOCATION_FAIL':
            return { requestRemoteAllocationLoading: false, requestRemoteAllocationError: action.payload };
        case 'REMOTE_ALLOCATION_CLEAR_DATA':
            return {};
        default:
            return state;
    }
};

export const compatabilityPdfReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PDF_SLIP_REQUEST':
            return { compatabilityPdfLoading: true };
        case 'PDF_SLIP_SUCCESS':
            return { compatabilityPdfLoading: false, compatabilityPdfSlipdata: action.payload };
        case 'PDF_SLIP_FAIL':
            return { compatabilityPdfLoading: false, compatabilityPdfSlipError: action.payload };
        case 'PDF_SLIP_CLEAR_DATA':
            return {};
        default:
            return state;
    }
};

export const validationSlipUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'VALIDATION_SLIP_REQUEST':
            return { validationSlipLoading: true };
        case 'VALIDATION_SLIP_SUCCESS':
            return { validationSlipLoading: false, validationSlipUpdate: action.payload };
        case 'VALIDATION_SLIP_FAIL':
            return { validationSlipLoading: false, validationSlipUpdateError: action.payload };
        case 'VALIDATION_SLIP_CLEAR_DATA':
            return {};
        default:
            return state;
    }
};