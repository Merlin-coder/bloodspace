import CONSTANTS from 'common/constants';

export const associateBatchReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ASSOCIATE_BATCH_REQUEST':
            return { loading: true };
        case 'ASSOCIATE_BATCH_SUCCESS':
            return { loading: false, associateBatchResponse: action.payload };
        case 'ASSOCIATE_BATCH_ERROR':
            return { loading: false, associateBatchError: action.payload };
        case 'CLEAR_ASSOCIATE_BATCH':
            return {};
        default:
            return state;
    }
};
export const clearAssociateBatchFormReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CLEAR_FORM_ASSOCIATE_BATCH':
            return { ...state, clearForms: action.payload };

        default:
            return state;
    }
};

export const passingAssociatePropsReducer = (state = { lisenbatchData: [] }, action) => {
    switch (action.type) {
        case 'PASSING_DATA_AS_PROPS':
            console.log("PASSING_DATA_AS_PROPS" + action.payload)
            return { lisenbatchData: action.payload||[]};

        default:
            return state;
    }
};

export const socketResponseReducer = (state = false, action) => {
    switch (action.type) {
        case 'PASSING_DATA':
            return action.payload;

        default:
            return state;
    }
};
