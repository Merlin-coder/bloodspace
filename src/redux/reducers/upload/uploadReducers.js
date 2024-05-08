import CONSTANTS from 'common/constants';

export const uploadExcelFileReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.UPLOAD_EXCEL_FILE_REQUEST:
            return { loading: true };
        case CONSTANTS.UPLOAD_EXCEL_FILE_SUCCESS:
            return { loading: false, file: action.payload };
        case CONSTANTS.UPLOAD_EXCEL_FILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
