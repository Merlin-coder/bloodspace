import axios from 'axios';
import CONSTANTS from 'common/constants';

export const uploadExcelFile = (file) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.UPLOAD_EXCEL_FILE_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };

    const { data } = await axios.post(`${CONSTANTS.BASEURL}index/import`, file, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.UPLOAD_EXCEL_FILE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.UPLOAD_EXCEL_FILE_FAIL,
            payload: data?.error?.errorMessage
        });
    }
};
