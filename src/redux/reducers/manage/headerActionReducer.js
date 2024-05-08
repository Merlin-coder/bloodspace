import CONSTANTS from 'common/constants';

const InitialState = { headerActionsLoading: false, headerActions: {}, headerActionsError: '' };
const InitialStateAction = { putActionsLoading: false, putheaderActions: {}, putheaderActionsError: '' };
const InitialDeclinedStateAction = { declinedActionsLoading: false, declinedheaderActions: {}, declinedheaderActionsError: '' };
const InitialStateLed = { headerLedLoading: false, headerLed: {}, headerLedError: '' };

export const putHeaderActionReducer = (state = InitialState, action) => {
    switch (action.type) {
        case CONSTANTS.PUT_HEADER_ACTIONS:
            return { ...state, headerActionsLoading: true };
        case CONSTANTS.PUT_HEADER_ACTIONS_SUCCESS:
            return { ...state, headerActionsLoading: false, headerActions: action.payload };
        case CONSTANTS.PUT_HEADER_ACTIONS_ERROR:
            return { ...state, headerActionsLoading: false, headerActionsError: action.payload };
        case CONSTANTS.PUT_HEADER_ACTIONS_CLEAR:
            return {};
        default:
            return state;
    }
};

export const requestbatchHeaderActionReducer = (state = InitialState, action) => {
    switch (action.type) {
        case CONSTANTS.POST_REQUESTBATCH_ACTIONS:
            return { ...state, requestbatchActionsLoading: true };
        case CONSTANTS.POST_REQUESTBATCH_ACTIONS_SUCCESS:
            return { ...state, requestbatchActionsLoading: false, requestbatchheaderActions: action.payload };
        case CONSTANTS.POST_REQUESTBATCH_ACTIONS_ERROR:
            return { ...state, requestbatchActionsLoading: false, requestbatchheaderActionsError: action.payload };
        case CONSTANTS.POST_REQUESTBATCH_ACTIONS_CLEAR:
            return {};
        default:
            return state;
    }
};

export const putActionReducer = (state = InitialStateAction, action) => {
    switch (action.type) {
        case CONSTANTS.PUT_ACTIONS:
            return { ...state, putActionsLoading: true };
        case CONSTANTS.PUT_ACTIONS_SUCCESS:
            return { ...state, putActionsLoading: false, putheaderActions: action.payload };
        case CONSTANTS.PUT_ACTIONS_ERROR:
            return { ...state, putActionsLoading: false, putheaderActionsError: action.payload };
        case CONSTANTS.PUT_ACTIONS_CLEAR:
            return {};
        default:
            return state;
    }
};

export const declinedActionReducer = (state = InitialDeclinedStateAction, action) => {
    switch (action.type) {
        case CONSTANTS.DECLINED_ACTIONS:
            return { ...state, declinedActionsLoading: true };
        case CONSTANTS.DECLINED_ACTIONS_SUCCESS:
            return { ...state, declinedActionsLoading: false, declinedheaderActions: action.payload };
        case CONSTANTS.DECLINED_ACTIONS_ERROR:
            return { ...state, declinedActionsLoading: false, declinedheaderActionsError: action.payload };
        case CONSTANTS.DECLINED_ACTIONS_CLEAR:
            return {};
        default:
            return state;
    }
};

export const HeaderLedActionReducer = (state = InitialStateLed, action) => {
    switch (action.type) {
        case CONSTANTS.HEADER_LED_ACTIONS:
            return { ...state, headerLedLoading: true };
        case CONSTANTS.HEADER_LED_ACTIONS_SUCCESS:
            return { ...state, headerLedLoading: false, headerLed: action.payload };
        case CONSTANTS.HEADER_LED_ACTIONS_ERROR:
            return { ...state, headerLedLoading: false, headerLedError: action.payload };
        case CONSTANTS.HEADER_LED_CLEAR:
            return {};
        default:
            return state;
    }
};
