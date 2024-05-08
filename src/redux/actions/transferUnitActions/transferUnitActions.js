import axios from 'axios';
import CONSTANTS from 'common/constants';

export const postTransferData = (formData, isEmergency) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.POST_TRANSFER_DATA_REQUEST });
    //for tocken from store using getState
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
    let url = `${CONSTANTS.BASEURL}index/transaction?`;
    url = `${url}isEmergency=${isEmergency}`
    const { data } = await axios.post(url, formData, config);
    //const { data } = await axios.post(`${CONSTANTS.BASEURL}index/transaction`, formData, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.POST_TRANSFER_DATA_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.POST_TRANSFER_DATA_ERROR,
            payload: data.error
        });
    }
};

export const clearTransferData = () => {
    return { type: CONSTANTS.CLEAR_GET_TRANSFER_DATA };
};

//'CLEAR_GET_TRANSFER_DATA'

export const clearGetTransactionData = () => {
    return { type: CONSTANTS.CLEAR_GET_TRANSFER_DATA };
};

export const getTransferData = (collectionName, search,type) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_TRANSACTION_DATA_REQUEST });
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

    // getData(urlEndPoint)
    let url = `${CONSTANTS.BASEURL}index/transfer?`;
    url = `${url}&pageSize=0`;

    if (search !== undefined) url = `${url}&collectionName=${collectionName}&search=${search}&type=${type}`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_TRANSACTION_DATA_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_TRANSACTION_DATA_ERROR,
            payload: data.error
        });
    }
};

export const getReceiveUnits = (filter) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_RECEIVE_UNITS_REQUEST });
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

    // getData(urlEndPoint)
    let url = `${CONSTANTS.BASEURL}index?collectionName=refsku`;
    url = `${url}&pageSize=0`;

    if (filter !== undefined) url = `${url}&filters=${filter}`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_RECEIVE_UNITS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_RECEIVE_UNITS_ERROR,
            payload: data.error
        });
    }
};

export const getReceivedUnits = (data) => {
    return {
        type: CONSTANTS.GET_RECEIVED_UNITS,
        payload: data
    };
};

export const clearReceivedUnits = () => {
    return {
        type: CONSTANTS.CLEAR_RECEIVED_UNITS
    };
};
