import CONSTANTS from 'common/constants';

const recipientData = { loading: false, recipients: {}, error: null };

export const getRecipientReducer = (state = recipientData, action) => {
    switch (action.type) {
        case CONSTANTS.GET_RECIPIENTS_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_RECIPIENTS_SUCCESS:
            return { recipients: action.payload };
        case CONSTANTS.GET_RECIPIENTS_ERROR:
            return { error: action.payload };
        case CONSTANTS.CLEAR_RECIPIENT_DATA:
            return recipientData;
        default:
            return state;
    }
};

export const assignUnitDeviceReducer = (state = [], action) => {
    switch (action.type) {
        case 'DEVICE_UNITS_RESPONSE':
            return action.payload;

        default:
            return state;
    }
};
