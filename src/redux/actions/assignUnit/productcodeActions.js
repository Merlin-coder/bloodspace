import axios from 'axios';
import CONSTANTS from 'common/constants';

export const getProductCodes = (collectionName = 'productcodes', pageSize = 1000, pageNumber = 1) => async (
    dispatch,
    getState
) => {
    dispatch({ type: CONSTANTS.GET_PRODUCT_CODE_REQUEST });
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

    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}`;
    if (pageSize !== undefined) url = `${url}&pageSize=${pageSize}`;
    if (pageNumber !== undefined) url = `${url}&pageNumber=${pageNumber}`;

    const { data } = await axios.get(url, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_PRODUCT_CODE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_PRODUCT_CODE_ERROR,
            payload: data.error
        });
    }
};

export const getBloodGroups = (collectionName = 'bloodGroups', pageSize = 1000, pageNumber = 1) => async (
    dispatch,
    getState
) => {
    dispatch({ type: CONSTANTS.GET_BLOOD_GROUPS_REQUEST });
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

    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}`;
    if (pageSize !== undefined) url = `${url}&pageSize=${pageSize}`;
    if (pageNumber !== undefined) url = `${url}&pageNumber=${pageNumber}`;

    const { data } = await axios.get(url, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_BLOOD_GROUPS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_BLOOD_GROUPS_ERROR,
            payload: data.error
        });
    }
};
