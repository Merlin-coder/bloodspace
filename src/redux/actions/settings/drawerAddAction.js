//localhost:5001/api/v1/index/drawer

import CONSTANTS from '../../../common/constants';
import axios from 'axios';
// import CommonUserConfig from 'common/services/userConfig';

export const getAddDrawer = (body) => async (dispatch, getState) => {
    dispatch({ type: 'POST_ADD_DRAWER_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo.data.token
        }
    };

    const { data } = await axios.post(`${CONSTANTS.BASEURL}index/drawer`, body, config);

    if (data.status === true) {
        dispatch({
            type: 'POST_ADD_DRAWER_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'POST_ADD_DRAWER_ERROR',
            payload: data
        });
    }
};
export const clearAddDrawer = () => {
    return {
        type: 'CLEAR_ADD_DRAWER_RESPONSE'
    };
};
