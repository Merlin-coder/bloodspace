import CONSTANTS from '../../../common/constants';

export const changeResponseReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.SET_API_RESPONSE_TYPE:
            return { ...state, apiBehavior: action.payload };

        default:
            return state;
    }
};

export const changeRoutesReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.SET_ROUTE_TYPE:
            return { ...state, routeType: action.payload };

        default:
            return state;
    }
};
const initialDate = { dateFormat: 'DD-MMM-YYYY HH:mm a' };
export const dateFormatSelectionReducer = (state = initialDate, action) => {
    switch (action.type) {
        case CONSTANTS.SET_DATE_FORMAT:
            return { ...state, dateFormat: action.payload };

        default:
            return state;
    }
};

const initialValidation = { validationRequired: true };
export const associateUnitValidationReducer = (state = initialValidation, action) => {
    switch (action.type) {
        case CONSTANTS.SET_ASSOCIATE_UNIT_VALIDATION:
            return { validationRequired: action.payload };

        default:
            return state;
    }
};
export const deviceWriteTag = (state = { deviceWriteTagValidation: true }, action) => {
    switch (action.type) {
        case CONSTANTS.DEVICE_WRTIE_TAG:
            return { deviceWriteTagValidation: action.payload };

        default:
            return state;
    }
};

export const lfTagReducer = (state = { Lf_Hf_TagValidation: false }, action) => {
    switch (action.type) {
        case 'LF_TAG':
            return { Lf_Hf_TagValidation: action.payload };

        default:
            return state;
    }
};

export const notificationSettingsReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.NOTIFICATION_SETTINGS_LOADING:
            return { ...state, nsLoading: true };
        case CONSTANTS.NOTIFICATION_SETTINGS_SUCCESS:
            return { ...state, nsLoading: false, nsSuccess: action.payload };
        case CONSTANTS.NOTIFICATION_SETTINGS_ERROR:
            return { ...state, nsLoading: false, nsError: action.payload };
        case CONSTANTS.CLEAR_NOTIFICATION_SETTINGS_RESPONSE:
            return {};
        default:
            return state;
    }
};

export const swapoutEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.NOTIFICATION_SETTINGS_LOADING:
            return { ...state, emailLoading: true };
        case CONSTANTS.NOTIFICATION_SETTINGS_SUCCESS:
            return { ...state, emailLoading: false, emailSuccess: action.payload };
        case CONSTANTS.NOTIFICATION_SETTINGS_ERROR:
            return { ...state, emailLoading: false, emailError: action.payload };
       
        default:
            return state;
    }
};
