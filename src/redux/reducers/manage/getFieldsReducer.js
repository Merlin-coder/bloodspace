import CONSTANTS from 'common/constants';

const initialFields = { fieldsLoading: false, fields: {}, error: '' };

export const getFieldsReducer = (state = initialFields, action) => {
    switch (action.type) {
        case CONSTANTS.GET_FIELDS_REQUEST:
            return { ...state, fieldsLoading: true };
        case CONSTANTS.GET_FIELDS_SUCCESS:
            return { ...state, fieldsLoading: false, fields: action.payload };
        case CONSTANTS.GET_FIELDS_ERROR:
            return { ...state, fieldsLoading: false, error: action.payload };
        default:
            return state;
    }
};
export const postFieldsReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.POST_FIELDS_REQUEST:
            return { ...state, postLoading: true };
        case CONSTANTS.POST_FIELDS_SUCCESS:
            return { ...state, postLoading: false, postResponse: action.payload };
        case CONSTANTS.POST_FIELDS_ERROR:
            return { ...state, postLoading: false, postError: action.payload };
        case CONSTANTS.CLEAR_POST_FIELDS:
            return {};
        default:
            return state;
    }
};
export const postSwapoutReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.POST_SWAPOUT_REQUEST:
            return { ...state, postSwapoutLoading: true };
        case CONSTANTS.POST_SWAPOUT_SUCCESS:
            return { ...state, postSwapoutLoading: false, postSwapoutResponse: action.payload };
        case CONSTANTS.POST_SWAPOUT_ERROR:
            return { ...state, postSwapoutLoading: false, postSwapoutError: action.payload };
        default:
            return state;
    }
};

export const putSwapoutCancelReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.PUT_SWAPOUTCANCEL_REQUEST:
            return { ...state, putSwapoutLoading: true };
        case CONSTANTS.PUT_SWAPOUTCANCEL_SUCCESS:
            return { ...state, putSwapoutCancelLoading: false, putSwapoutCancelResponse: action.payload };
        case CONSTANTS.PUT_SWAPOUTCANCEL_ERROR:
            return { ...state, putSwapoutCancelLoading: false, putSwapoutCancelError: action.payload };
        default:
            return state;
    }
};

export const putFieldsReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.PUT_FIELDS_REQUEST:
            return { ...state, putLoading: true };

        case CONSTANTS.PUT_FIELDS_SUCCESS:
            return { ...state, putLoading: false, putResponse: action.payload };
        case CONSTANTS.PUT_FIELDS_ERROR:
            return { ...state, putLoading: false, putError: action.payload };
        case CONSTANTS.CLEAR_PUT_FIELDS:
            return {};
        default:
            return state;
    }
};
export const putSwapoutReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.PUT_SWAPOUT_REQUEST:
            return { ...state, putSwapoutLoading: true };
        case CONSTANTS.PUT_SWAPOUT_SUCCESS:
            return { ...state, putSwapoutLoading: false, putSwapoutResponse: action.payload };
        case CONSTANTS.PUT_SWAPOUT_ERROR:
            return { ...state, putSwapoutLoading: false, putSwapoutError: action.payload };
       
        default:
            return state;
    }
};
export const getDropDownReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DROPDOWN_REQUEST:
            return { ...state, option1Loading: true };
        case CONSTANTS.GET_DROPDOWN_SUCCESS:
            return { ...state, option1Loading: false, options: action.payload };
        case CONSTANTS.GET_DROPDOWN_ERROR:
            return { ...state, option1Loading: false, error: action.payload };
        case 'CLEAR_DROP_DOWN':
            return {};
        default:
            return state;
    }
};
export const get2ndDropdownReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_OTHER_DROPDOWN_REQUEST:
            return { ...state, option2Loading: true };
        case CONSTANTS.GET_OTHER_DROPDOWN_SUCCESS:
            return { ...state, option2Loading: false, options2: action.payload };
        case CONSTANTS.GET_OTHER_DROPDOWN_ERROR:
            return { ...state, option2Loading: false, error: action.payload };
        case 'CLEAR_SECOND_DROP_DOWN':
            return {};
        default:
            return state;
    }
};
export const get3rdDropdownReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_3RD_DROPDOWN_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.GET_3RD_DROPDOWN_SUCCESS:
            return { ...state, loading: false, options3: action.payload };
        case CONSTANTS.GET_3RD_DROPDOWN_ERROR:
            return { ...state, loading: false, error: action.payload };
        case 'CLEAR_THIRD_DROP_DOWN':
            return {};

        default:
            return state;
    }
};
export const get4thDropdownReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_4TH_DROPDOWN_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.GET_4TH_DROPDOWN_SUCCESS:
            return { ...state, loading: false, options4: action.payload };
        case CONSTANTS.GET_4TH_DROPDOWN_ERROR:
            return { ...state, loading: false, error: action.payload };
        case 'CLEAR_FOURTH_DROP_DOWN':
            return {};

        default:
            return state;
    }
};
export const get5thDropdownReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_5TH_DROPDOWN_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.GET_5TH_DROPDOWN_SUCCESS:
            return { ...state, loading: false, options5: action.payload };
        case CONSTANTS.GET_5TH_DROPDOWN_ERROR:
            return { ...state, loading: false, error: action.payload };
        case 'CLEAR_FIFTH_DROP_DOWN':
            return {};

        default:
            return state;
    }
};
export const get6thdDropdownReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_6TH_DROPDOWN_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.GET_6TH_DROPDOWN_SUCCESS:
            return { ...state, loading: false, options6: action.payload };
        case CONSTANTS.GET_6TH_DROPDOWN_ERROR:
            return { ...state, loading: false, error: action.payload };
        case 'CLEAR_SIXTH_DROP_DOWN':
            return {};

        default:
            return state;
    }
};
export const get7thDropdownReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_7TH_DROPDOWN_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.GET_7TH_DROPDOWN_SUCCESS:
            return { ...state, loading: false, options7: action.payload };
        case CONSTANTS.GET_7TH_DROPDOWN_ERROR:
            return { ...state, loading: false, error: action.payload };
        case 'CLEAR_SEVENTH_DROP_DOWN':
            return {};

        default:
            return state;
    }
};
export const get8thDropdownReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_8TH_DROPDOWN_REQUEST':
            return { ...state, options8loading: true };
        case 'GET_8TH_DROPDOWN_SUCCESS':
            return { ...state, options8loading: false, options8: action.payload };
        case 'GET_8TH_DROPDOWN_ERROR':
            return { ...state, options8loading: false, error: action.payload };
        case 'CLEAR_EIGTH_DROP_DOWN':
            return {};

        default:
            return state;
    }
};
export const getCollectionDropdownReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_COLLECTION_DROPDOWN_REQUEST':
            return { ...state, loading: true };
        case 'GET_COLLECTION_DROPDOWN_SUCCESS':
            return { ...state, loading: false, collectionData: action.payload };
        case 'GET_COLLECTION_DROPDOWN_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'CLEAR_COLLECTION_DROP_DOWN':
            return {};

        default:
            return state;
    }
};

export const putDisplayConfigReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.PUT_DISPLAY_CONFIG_REQUEST:
            return { ...state, displayConfigloading: true };
        case CONSTANTS.PUT_DISPLAY_CONFIG_SUCCESS:
            return { ...state, displayConfigloading: false, putDisplayConfigResponse: action.payload };
        case CONSTANTS.PUT_DISPLAY_CONFIG_ERROR:
            return { ...state, displayConfigloading: false, displayConfigError: action.payload };
        case CONSTANTS.CLEAR_DISPLAY_CONFIG_PUT:
            return {};
        default:
            return state;
    }
};

export const activeDeactiveReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.DELETE_ACTIVEDEACTIVE_REQUEST:
            return { ...state, activeDeactiveloading: true };
        case CONSTANTS.DELETE_ACTIVEDEACTIVE_SUCCESS:
            return { ...state, activeDeactiveloading: false, activeDeactiveResponse: action.payload };
        case CONSTANTS.DELETE_ACTIVEDEACTIVE_ERROR:
            return { ...state, activeDeactiveloading: false, activeDeactiveError: action.payload };
       
        default:
            return state;
    }
};

export const deleteFieldReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_FIELD_REQUEST':
            return { ...state, deleteLoading: true };
        case 'DELETE_FIELD_SUCCESS':
            return { ...state, deleteLoading: false, deleteResponse: action.payload };
        case 'DELETE_FIELD_ERROR':
            return { ...state, deleteLoading: false, deleteError: action.payload };
        case 'CLEAR_DELETE_RESPONSE':
            return {};
        default:
            return state;
    }
};

export const deactivateFieldReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DEACTIVATE_FIELD_REQUEST':
            return { ...state, deactivateLoading: true };
        case 'DEACTIVATE_FIELD_SUCCESS':
            return { ...state, deactivateLoading: false, deactivateResponse: action.payload };
        case 'DEACTIVATE_FIELD_ERROR':
            return { ...state, deactivateLoading: false, deactivateError: action.payload };
        case 'CLEAR_DELETE_RESPONSE':
            return {};
        default:
            return state;
    }
};

export const deleteDisplayconfigReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DISPLAYCONFIG_DELETE_REQUEST':
            return { ...state, deleteDisplayconfigLoading: true };
        case 'DISPLAYCONFIG_DELETE_SUCCESS':
            return { ...state, deleteLoading: false, deleteDisplayconfigResponse: action.payload };
        case 'DISPLAYCONFIG_DELETE_ERROR':
            return { ...state, deleteLoading: false, deleteDisplayconfigError: action.payload };
        case 'CLEAR_DELETE_RESPONSE':
            return {};
        default:
            return state;
    }
};

export const getDeviceDataReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_DEVICE_DATA_REQUEST':
            return { ...state, deviceLoading: true };
        case 'GET_DEVICE_DATA_SUCCESS':
            return { ...state, deviceLoading: false, deviceResponse: action.payload };
        case 'GET_DEVICE_DATA_ERROR':
            return { ...state, deviceLoading: false, deviceError: action.payload };
        default:
            return state;
    }
};

const userGroup = { loading: false, postAddUserGroupResponse: null, postAddUserGroupError: null };

export const postAddUserGroupReducer = (state = userGroup, action) => {
    switch (action.type) {
        case 'POST_ADD_USER_GROUP_REQUEST':
            return { postAdduserGroupLoading: true };
        case 'POST_ADD_USER_GROUP_SUCCESS':
            return { postAdduserGroupLoading: false, postAddUserGroupResponse: action.payload };
        case 'POST_ADD_USER_GROUP_ERROR':
            return { postAdduserGroupLoading: false, postAddUserGroupError: action.payload };
        case 'CLEAR_ADD_USER_GROUP_RESPONSE':
            return { postAddUserGroupResponse: null, postAddUserGroupError: null };
        default:
            return state;
    }
};

const initialState = { loading: false, postExcelGroupResponse: [], postExcelGroupError: "" };

export const postExcelGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_EXCEL_GROUP_REQUEST':
            return { postExcelGroupLoading: true };
        case 'POST_EXCEL_GROUP_SUCCESS':
            return { postExcelGroupLoading: false, postExcelGroupResponse: action.payload };
        case 'POST_EXCEL_GROUP_ERROR':
            return { postExcelGroupLoading: false, postExcelGroupError: action.payload };
        case 'CLEAR_EXCEL_GROUP_RESPONSE':
            return { postExcelGroupResponse: null, postExcelGroupError: null };
        default:
            return state;
    }
};

const wastedUnitState = { wastedUnitLoading: false, wastedUnitResponse: [], wastedUnitError: "" };

export const wastedUnitReducer = (state = wastedUnitState, action) => {
    switch (action.type) {
        case 'POST_WASTEDUNITS_REQUEST':
            return { wastedUnitLoading: true };
        case 'POST_WASTEDUNITS_SUCCESS':
            return { wastedUnitLoading: false, wastedUnitResponse: action.payload };
        case 'POST_WASTEDUNITS_ERROR':
            return { wastedUnitLoading: false, wastedUnitError: action.payload };
        case 'POST_WASTEDUNITS_CLEAR':
            return {};
        default:
            return state;
    }
};

const wastedBatchState = { wastedBatchLoading: false, wastedBatchResponse: [], wastedBatchError: "" };

export const wastedBatchReducer = (state = wastedBatchState, action) => {
    switch (action.type) {
        case 'POST_WASTEDBATCH_REQUEST':
            return { wastedBatchLoading: true };
        case 'POST_WASTEDBATCH_SUCCESS':
            return { wastedBatchLoading: false, wastedBatchResponse: action.payload };
        case 'POST_WASTEDBATCH_ERROR':
            return { wastedBatchLoading: false, wastedBatchError: action.payload };
        case 'POST_WASTEDBATCH_CLEAR':
            return {};
        default:
            return state;
    }
};



export const getWastedUnitReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_WASTED_REQUEST':
            return { ...state, loading: true };
        case 'GET_WASTED_SUCCESS':
            return { ...state, loading: false, wastedUnits: action.payload };
        case 'GET_WASTED_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getWastedBatchReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_WASTED_BATCH_REQUEST':
            return { ...state, loading: true };
        case 'GET_WASTED_BATCH_SUCCESS':
            return { ...state, loading: false, wastedBatches: action.payload };
        case 'GET_WASTED_BATCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const removeEdqState = { removeEdqLoading: false, removeEdqResponse: [], removeEdqError: "" };

export const removeEdqReducer = (state = removeEdqState, action) => {
    switch (action.type) {
        case 'POST_REMOVEEDQ_REQUEST':
            return { removeEdqLoading: true };
        case 'POST_REMOVEEDQ_SUCCESS':
            return { removeEdqLoading: false, removeEdqResponse: action.payload };
        case 'POST_REMOVEEDQ_ERROR':
            return { removeEdqLoading: false, removeEdqError: action.payload };
        case 'POST_REMOVEEDQ_CLEAR':
            return {};
        default:
            return state;
    }
};

export const getRecipientCountReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_RECIPIIENT_COUNT_REQUEST':
            return { ...state, loading: true };
        case 'GET_RECIPIENT_COUNT_SUCCESS':
            return { ...state, loading: false, recipientCount: action.payload };
        case 'GET_RECIPIENT_COUNT_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'CLEAR_RECIPIENT_COUNT_CLEAR':
            return {};

        default:
            return state;
    }
};

export const getDashCountReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_DASH_COUNT_REQUEST':
            return { ...state, loading: true };
        case 'GET_DASH_COUNT_SUCCESS':
            return { ...state, loading: false };
        case 'GET_DASH_COUNT_ERROR':
            return { ...state, loading: false };
        case 'CLEAR_DASH_COUNT_CLEAR':
            return {};

        default:
            return state;
    }
};
