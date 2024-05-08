import CONSTANTS from 'common/constants';

export const createAlert = (alertData) => {
    return {
        type: CONSTANTS.CREATE_ALERT,
        payload: alertData
    };
};

export const removeAlert = () => {
    return { type: CONSTANTS.REMOVE_ALERT };
};

export const createErrorDialog = (errorMessage) => {
    return {
        type: 'CREATE_ERROR_DIALOG',
        payload: errorMessage
    };
};

export const removeErrorDialog = () => {
    return { type: 'REMOVE_ERROR_DIALOG' };
};
