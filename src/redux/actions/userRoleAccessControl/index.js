import axios from 'axios';
import { CONSTANTS } from 'common';

export const postUserRoleAction = (formData) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.POST_USER_ROLE_ACCESS_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index/userAccess`;

    const { data } = await axios.post(url, formData, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.POST_USER_ROLE_ACCESS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.POST_USER_ROLE_ACCESS_ERROR,
            payload: data.error
        });
    }
};

export const clearPostUserRoleAction = () => {
    return {
        type: CONSTANTS.CLEAR_USER_ROLE_ACCESS_POST
    };
};

export const getCurrentRoleActiveDevices = (filters) => async (dispatch, getState) => {
    dispatch({ type: 'GET_CURRENT_ACTIVE_DEVICES_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index?collectionName=deviceaccesses`;
    if (filters !== undefined) url = `${url}&filters=${filters}`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_CURRENT_ACTIVE_DEVICES_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_CURRENT_ACTIVE_DEVICES_ERROR',
            payload: data.error
        });
    }
};
