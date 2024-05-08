import axios from 'axios';
import CONSTANTS from 'common/constants';
export const addSkuAction = (formData, bulkView) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.ADD_SKU_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/sku`;
    const { data } = await axios.post(url, formData, config);
    if (data.status === true) {
        if (bulkView) {
            dispatch({
                type: CONSTANTS.ADD_SKU_BULK_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.ADD_SKU_SUCCESS,
                payload: data
            });
        }
    } else {
        dispatch({
            type: CONSTANTS.ADD_SKU_ERROR,
            payload: data.error
        });
    }
};

export const clearAddSkuData = () => {
    return {
        type: CONSTANTS.CLEAR_ADD_SKU_DATA
    };
};
