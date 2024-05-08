import CONSTANTS from '../../../common/constants';

export const getFormTableReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_FORM_TABLE_DATA_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_FORM_TABLE_DATA_SUCCESS:
            return { loading: false, formTableData: action.payload };
        case CONSTANTS.GET_FORM_TABLE_DATA_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
