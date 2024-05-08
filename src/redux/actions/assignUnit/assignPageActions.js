import axios from 'axios';
import CONSTANTS from 'common/constants';

export const getRecipients = (collectionName, searchKey, pageSize = 0, pageNumber = 1) => async (
    dispatch,
    getState
) => {
    dispatch({ type: CONSTANTS.GET_RECIPIENTS_REQUEST });
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

    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&serach=${searchKey}`;
    if (pageSize !== undefined) url = `${url}&pageSize=${pageSize}`;
    if (pageNumber !== undefined) url = `${url}&pageNumber=${pageNumber}`;

    const { data } = await axios.get(url, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_RECIPIENTS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_RECIPIENTS_ERROR,
            payload: data.error
        });
    }
};

export const clearRecipientData = () => {
    return {
        type: CONSTANTS.CLEAR_RECIPIENT_DATA
    };
};

export const assignUnitDeviceAction = (data) => {
    return {
        type: 'DEVICE_UNITS_RESPONSE',
        payload: data
    };
};
