export const assignBatchReducers = (state = {}, action) => {
    switch (action.type) {
        case 'ASSIGN_BATCH_REQUEST':
            return { ...state, assignBatchLoading: true };
        case 'ASSIGN_BATCH_SUCCESS':
            return { ...state, assignBatchLoading: false, assignBatchResponse: action.payload };
        case 'ASSIGN_BATCH_ERROR':
            return { ...state, assignBatchLoading: false, assignBatchError: action.payload };
        case 'CLEAR_ASSIGN_BATCH_RESPONSE':
            return {};
        default:
            return state;
    }
};

export const multipleAssignReducers = (state = {}, action) => {
    switch (action.type) {
        case 'MULTIPLE_ASSIGN_REQUEST':
            return { ...state, multipleAssignLoading: true };
        case 'MULTIPLE_ASSIGN_SUCCESS':
            return { ...state, multipleAssignLoading: false, multipleAssignResponse: action.payload };
        case 'MULTIPLE_ASSIGN_ERROR':
            return { ...state, multipleAssignLoading: false, multipleAssignError: action.payload };
        case 'CLEAR_MULTIPLE_ASSIGN_RESPONSE':
            return {};
        default:
            return state;
    }
};


export const assignUnitsReducers = (state = {}, action) => {
    switch (action.type) {
        case 'ASSIGN_UNITS_REQUEST':
            return { ...state, assignUnitsLoading: true };
        case 'ASSIGN_UNITS_SUCCESS':
            return { ...state, assignUnitsLoading: false, assignUnisResponse: action.payload };
        case 'ASSIGN_UNITS_ERROR':
            return { ...state, assignUnitsLoading: false, assignUnitsError: action.payload };
        case 'CLEAR_ASSIGN_UNITS_RESPONSE':
            return {};
        default:
            return state;
    }
};
