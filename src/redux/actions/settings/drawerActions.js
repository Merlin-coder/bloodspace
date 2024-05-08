import CONSTANTS from '../../../common/constants';
import axios from 'axios';
// import CommonUserConfig from 'common/services/userConfig';

export const getDrawer = (userAccessRoleCode) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DRAWER_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data?.token
        }
    };

    const { data } = await axios.get(
        `${CONSTANTS.BASEURL}index/getDrawer?userAccessRoleCode=${userAccessRoleCode}`,
        config
    );

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DRAWER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DRAWER_FAIL,
            payload: data?.error?.errorMessage
        });
    }
};
export const getLicense = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_LICENSE_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo.data.token
        }
    };
    try {
        let url = `${CONSTANTS.BASEURL}index/getLicense`;

        const response = await axios.get(url, config);
        const { data } = response;
        if (data.status === true) {
            dispatch({
                type: 'GET_LICENSE_SUCCESS',
                payload: data
            });
        } else {
            dispatch({
                type: 'GET_LICENSE_ERROR',
                payload: data?.error?.errorMessage
            });
        }
    } catch (error) {
        dispatch({
            type: 'GET_LICENSE_ERROR',
            payload: error?.response?.statusText
        });
    }
};
export const clearDrawer = () => {
    return {
        type: 'CLEAR_DRAWER_RESPONSE'
    };
};
export const openDrawerAction = (option) => {
    return {
        type: 'OPEN_DRAWER_MENU',
        payload: option
    };
};
