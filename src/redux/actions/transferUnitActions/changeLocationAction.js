import axios from 'axios';
import CONSTANTS from 'common/constants';

export const changeLOcationData = (formData) => async (dispatch, getState) => {
    dispatch({ type: 'POST_CHANGE_LOCATION_REQUEST' });
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
    //
    const { data } = await axios.post(`${CONSTANTS.BASEURL}index/setRoot`, formData, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.POST_CHANGE_LOCATION_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.POST_CHANGE_LOCATION_ERROR,
            payload: data.error
        });
    }
};

export const clearChangeLocationData = () => {
    return { type: CONSTANTS.CLEAR_POST_CHANGE_LOCATION_DATA };
};

//'CLEAR_GET_TRANSFER_DATA'
