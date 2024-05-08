import CONSTANTS from 'common/constants';

const alertState = {};

export const createAlertReducer = (state = alertState, action) => {
    switch (action.type) {
        case CONSTANTS.CREATE_ALERT:
            return action.payload;
        case CONSTANTS.REMOVE_ALERT:
            return {};
        default:
            return state;
    }
};

export const errorDialogReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_ERROR_DIALOG':
            return { errorMessage: action.payload };
        case 'REMOVE_ERROR_DIALOG':
            return { errorMessage: '' };
        default:
            return state;
    }
};
