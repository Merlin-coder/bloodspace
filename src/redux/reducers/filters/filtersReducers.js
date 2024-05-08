import CONSTANTS from 'common/constants';

const filtersInitialState = { filtersLoading: false, error: '', filterCriteria: {} };

export const getFiltersCriteriaReducer = (state = filtersInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_FILTER_CRITERIA_REQUEST:
            return { filtersLoading: true };
        case CONSTANTS.FILTER_CRITERIA_REQUEST_SUCCESS:
            return { filtersLoading: false, filterCriteria: action.payload, error: '' };
        case CONSTANTS.FILTER_CRITERIA_REQUEST_ERROR:
            return { filtersLoading: false, error: action.payload };
        case CONSTANTS.CLEAR_FILTER_CRITERIA:
            return { filtersLoading: false, error: '', filterCriteria: {} };
        default:
            return state;
    }
};

const filterNewState = { newfiltersLoading: false, error: '', filtersNewData: [] };

export const getFilterReducer = (state = filterNewState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_FILTER_REQUEST:
            return { newfiltersLoading: true };
        case CONSTANTS.GET_FILTER_SUCCESS:
            return { newfiltersLoading: false, filtersNewData: action.payload, error: '' };
        case CONSTANTS.GET_FILTER_ERROR:
            return { newfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};

const filterRequestBatchState = { requestBatchfiltersLoading: false, error: '', requestBatchfiltersData: [] };

export const getRequestBatchFilterReducer = (state = filterRequestBatchState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_REQUESTBATCH_FILTER_REQUEST:
            return { requestBatchfiltersLoading: true };
        case CONSTANTS.GET_REQUESTBATCH_FILTER_SUCCESS:
            return { requestBatchfiltersLoading: false, requestBatchfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_REQUESTBATCH_FILTER_ERROR:
            return { requestBatchfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};

const filterActivityUnitState = { activityUnitfiltersLoading: false, error: '', activityUnitfiltersData: [] };

export const getActivityUnitFilterReducer = (state = filterActivityUnitState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_ACTIVITYUNIT_FILTER_REQUEST:
            return { activityUnitfiltersLoading: true };
        case CONSTANTS.GET_ACTIVITYUNIT_FILTER_SUCCESS:
            return { activityUnitfiltersLoading: false, activityUnitfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_ACTIVITYUNIT_FILTER_ERROR:
            return { activityUnitfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};

const filterActivityBatchState = { activityBatchfiltersLoading: false, error: '', activitybatchfiltersData: null };

export const getActivityBatchFilterReducer = (state = filterActivityBatchState, action) => {
    console.log("action.type", action.type);
    switch (action.type) {
        case CONSTANTS.GET_ACTIVITYBATCH_FILTER_REQUEST:
            return { activityBatchfiltersLoading: true, activitybatchfiltersData: null };
        case CONSTANTS.GET_ACTIVITYBATCH_FILTER_SUCCESS:
            return { activityBatchfiltersLoading: false, activitybatchfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_ACTIVITYBATCH_FILTER_ERROR:
            return { activityBatchfiltersLoading: false, error: action.payload, activitybatchfiltersData: null };
        default:
            return state;
    }
};

const filterNotifyUnitState = { notifyUnitfiltersLoading: false, error: '', notifyUnitfiltersData: [] };

export const getNotifyUnitFilterReducer = (state = filterNotifyUnitState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_NOTIFYUNIT_FILTER_REQUEST:
            return { notifyUnitfiltersLoading: true };
        case CONSTANTS.GET_NOTIFYUNIT_FILTER_SUCCESS:
            return { notifyUnitfiltersLoading: false, notifyUnitfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_NOTIFYUNIT_FILTER_ERROR:
            return { notifyUnitfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};

const filterNotifyBatchState = { notifyBatchfiltersLoading: false, error: '', notifyBatchfiltersData: [] };

export const getNotifyBatchFilterReducer = (state = filterNotifyBatchState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_NOTIFYBATCH_FILTER_REQUEST:
            return { notifyBatchfiltersLoading: true };
        case CONSTANTS.GET_NOTIFYBATCH_FILTER_SUCCESS:
            return { notifyBatchfiltersLoading: false, notifyBatchfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_NOTIFYBATCH_FILTER_ERROR:
            return { notifyBatchfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};

const filterWastedUnitState = { wastedUnitfiltersLoading: false, error: '', wastedUnitfiltersData: [] };

export const getWastedUnitFilterReducer = (state = filterWastedUnitState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_WASTEDUNIT_FILTER_REQUEST:
            return { wastedUnitfiltersLoading: true };
        case CONSTANTS.GET_WASTEDUNIT_FILTER_SUCCESS:
            return { wastedUnitfiltersLoading: false, wastedUnitfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_WASTEDUNIT_FILTER_ERROR:
            return { wastedUnitfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};

const filterWastedBatchState = { wastedBatchfiltersLoading: false, error: '', wastedBatchfiltersData: [] };

export const getWastedBatchFilterReducer = (state = filterWastedBatchState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_WASTEDBATCH_FILTER_REQUEST:
            return { wastedBatchfiltersLoading: true };
        case CONSTANTS.GET_WASTEDBATCH_FILTER_SUCCESS:
            return { wastedBatchfiltersLoading: false, wastedBatchfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_WASTEDBATCH_FILTER_ERROR:
            return { wastedBatchfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};

const filterTransfusedUnitState = { transfusedUnitfiltersLoading: false, error: '', transfusedUnitfiltersData: [] };

export const getTransfusedUnitFilterReducer = (state = filterTransfusedUnitState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_TRANSFUSEDUNIT_FILTER_REQUEST:
            return { transfusedUnitfiltersLoading: true };
        case CONSTANTS.GET_TRANSFUSEDUNIT_FILTER_SUCCESS:
            return { transfusedUnitfiltersLoading: false, transfusedUnitfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_TRANSFUSEDUNIT_FILTER_ERROR:
            return { transfusedUnitfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};

const filterTransfusedBatchState = { transfusedBatchfiltersLoading: false, error: '', transfusedBatchfiltersData: [] };

export const getTransfusedBatchFilterReducer = (state = filterTransfusedBatchState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_TRANSFUSEDBATCH_FILTER_REQUEST:
            return { transfusedBatchfiltersLoading: true };
        case CONSTANTS.GET_TRANSFUSEDBATCH_FILTER_SUCCESS:
            return { transfusedBatchfiltersLoading: false, transfusedBatchfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_TRANSFUSEDBATCH_FILTER_ERROR:
            return { transfusedBatchfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};

const filterRecipientState = { recipientfiltersLoading: false, error: '', recipientfiltersData: [] };

export const getRecipientFilterReducer = (state = filterRecipientState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_RECIPIENT_FILTER_REQUEST:
            return { recipientfiltersLoading: true };
        case CONSTANTS.GET_RECIPIENT_FILTER_SUCCESS:
            return {recipientfiltersLoading: false, recipientfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_RECIPIENT_FILTER_ERROR:
            return { recipientfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};

const filterUserState = { userfiltersLoading: false, error: '', userfiltersData: [] };

export const getUserFilterReducer = (state = filterUserState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_USER_FILTER_REQUEST:
            return { userfiltersLoading: true };
        case CONSTANTS.GET_USER_FILTER_SUCCESS:
            return { userfiltersLoading: false, userfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_USER_FILTER_ERROR:
            return { userfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};

const filterSwapState = { swapoutfiltersLoading: false, error: '', swapoutfiltersData: [] };

export const getSwapoutFilterReducer = (state = filterSwapState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_SWAPOUT_FILTER_REQUEST:
            return { swapoutfiltersLoading: true };
        case CONSTANTS.GET_SWAPOUT_FILTER_SUCCESS:
            return { swapoutfiltersLoading: false, swapoutfiltersData: action.payload, error: '' };
        case CONSTANTS.GET_SWAPOUT_FILTER_ERROR:
            return { swapoutfiltersLoading: false, error: action.payload };
        default:
            return state;
    }
};