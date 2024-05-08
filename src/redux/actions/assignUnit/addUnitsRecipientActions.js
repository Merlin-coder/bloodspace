import axios from 'axios';
import CONSTANTS from 'common/constants';
export const postAddUnitData = (formData) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.POST_ADD_UNIT_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/insertmany-activity`;
    const { data } = await axios.post(url, formData, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.POST_ADD_UNIT_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.POST_ADD_UNIT_ERROR,
            payload: data.error
        });
    }
};

export const clearPostUnitResponse = () => {
    return {
        type: CONSTANTS.CLEAR_POST_UNIT_RESPONSE
    };
};
