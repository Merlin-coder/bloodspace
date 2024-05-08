import CONSTANTS from '../../../common/constants';

export const rulePageReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CONDITION_REQUEST':
            return { ...state, loading: true };
        case 'CONDITION_SUCCESS':
            return { ...state, loading: false, condition: action.payload };
        case 'CONDITION_ERROR':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
export const ruleAllPageReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ALLCONDITION_REQUEST':
            return { ...state, loading: true };
        case 'ALLCONDITION_SUCCESS':
            return { ...state, loading: false, allCondition: action.payload };
        case 'ALLCONDITION_ERROR':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
export const getAll = (state = {}, action) => {
    switch (action.type) {
        case 'GETALL_REQUEST':
            return { ...state, loading: true };
        case 'GETALL_SUCCESS':
            return { ...state, loading: false, allData: action.payload };
        case 'GETALL_ERROR':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
export const getNotificationType = (state = {}, action) => {
    switch (action.type) {
        case 'GETNOTIFICATION_REQUEST':
            return { ...state, notificationTypeLoading: true };
        case 'GETNOTIFICATION_SUCCESS':
            return { ...state, notificationTypeLoading: false, notification: action.payload };
        case 'GETNOTIFICATION_ERROR':
            return { ...state, notificationTypeLoading: false, error: action.payload };

        default:
            return state;
    }
};

export const getResolutionType = (state = {}, action) => {
    switch (action.type) {
        case 'RESOLUTION_TYPE_REQUEST':
            return { ...state, resolutionTypeLoading: true };
        case 'RESOLUTION_TYPE_SUCCESS':
            return { ...state, resolutionTypeLoading: false, resolutionType: action.payload };
        case 'RESOLUTION_TYPE_ERROR':
            return { ...state, resolutionTypeLoading: false, error: action.payload };

        default:
            return state;
    }
};
export const getResolutionSubType = (state = {}, action) => {
    switch (action.type) {
        case 'RESOLUTION_SUBTYPE_REQUEST':
            return { ...state, resolutionSubTypeLoading: true };
        case 'RESOLUTION_SUBTYPE_SUCCESS':
            return { ...state, resolutionTypeLoading: false, resolutionSubType: action.payload };
        case 'RESOLUTION_SUBTYPE_ERROR':
            return { ...state, resolutionTypeLoading: false, error: action.payload };

        default:
            return state;
    }
};

export const getFactIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FACT_ID_REQUEST':
            return { ...state, factIdLoading: true };
        case 'FACT_ID_SUCCESS':
            return { ...state, factIdLoading: false, factId: action.payload };
        case 'FACT_ID_ERROR':
            return { ...state, factIdLoading: false, factIdError: action.payload };

        default:
            return state;
    }
};

export const getNotificationIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'NOTIFICATION_ID_REQUEST':
            return { ...state, notificaionIdloading: true };
        case 'NOTIFICATION_ID_SUCCESS':
            return { ...state, notificaionIdloading: false, notificationId: action.payload };
        case 'NOTIFICATION_ID_ERROR':
            return { ...state, notificaionIdloading: false, notificationIdError: action.payload };

        default:
            return state;
    }
};
export const getResolutioinIdReducer = (state = {}, action) => {
    switch (action.type) {
        case 'RESOLUTION_ID_REQUEST':
            return { ...state, resolutionIdLoading: true };
        case 'RESOLUTION_ID_SUCCESS':
            return { ...state, resolutionIdLoading: false, resolutionId: action.payload };
        case 'RESOLUTION_ID_ERROR':
            return { ...state, resolutionIdLoading: false, resolutionError: action.payload };

        default:
            return state;
    }
};

const postRuleType = { loading: false, postRuleError: null, postRuleSuccess: {} };

export const postRuleTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.POST_RULE_TYPE_REQUEST:
            return { postRuleTypeLoading: true };
        case CONSTANTS.POST_RULE_TYPE_SUCCESS:
            return { postRuleTypeLoading: false, postRuleSuccess: action.payload };
        case CONSTANTS.POST_RULE_TYPE_ERROR:
            return { postRuleTypeLoading: false, postRuleError: action.payload };
        case CONSTANTS.CLEAR_RULE_TYPE_POST:
            return {};
        default:
            return state;
    }
};
const putRuleType = { loading: false, putRuleError: null, putRuleSuccess: {} };

export const putRuleTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PUT_RULE_TYPE_REQUEST':
            return { putRuleTypeLoading: true };
        case 'PUT_RULE_TYPE_SUCCESS':
            return { putRuleTypeLoading: false, putRuleSuccess: action.payload };
        case 'PUT_RULE_TYPE_ERROR':
            return { putRuleTypeLoading: false, putRuleError: action.payload };
        case CONSTANTS.CLEAR_RULE_TYPE_put:
            return {};
        default:
            return state;
    }
};
export const ruleBreakReducer = (state = {}, action) => {
    switch (action.type) {
        case 'RULEBREAK_REQUEST':
            return { ruleBreakLoading: true };
        case 'RULEBREAK_SUCCESS':
            return { ruleBreakLoading: false, ruleBreak: action.payload };
        case 'RULEBREAK_ERROR':
            return { ruleBreakLoading: false, ruleBreakError: action.payload };
        case CONSTANTS.CLEAR_RULE_TYPE_put:
            return {};
        default:
            return state;
    }
};
export const ruleType = (state = 'Facts', action) => {
    switch (action.type) {
        case 'RULE_TYPE':
            return action.payload;

        default:
            return state;
    }
};
