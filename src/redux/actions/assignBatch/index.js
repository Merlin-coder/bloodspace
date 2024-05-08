import axios from 'axios';
import CONSTANTS from 'common/constants';
export const postAssignBatch = (formData) => async (dispatch, getState) => {
    dispatch({ type: 'ASSIGN_BATCH_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/batchAssign`;
    const { data } = await axios.post(url, formData, config);
    if (data.status === true) {
        dispatch({
            type: 'ASSIGN_BATCH_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'ASSIGN_BATCH_ERROR',
            payload: data.error
        });
    }
};

export const postMultipleAssign = (formData) => async (dispatch, getState) => {
    dispatch({ type: 'MULTIPLE_ASSIGN_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}units/multiple_assign`;
    const { data } = await axios.post(url, formData, config);
    if (data.status === true) {
        dispatch({
            type: 'MULTIPLE_ASSIGN_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'MULTIPLE_ASSIGN_ERROR',
            payload: data.error
        });
    }
};

export const postAssignUnits = (formData) => async (dispatch, getState) => {
    dispatch({ type: 'ASSIGN_UNITS_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}units/assign`;
    const { data } = await axios.post(url, formData, config);
    console.log('dta----',data)
    if (data) {
        dispatch({
            type: 'ASSIGN_UNITS_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'ASSIGN_UNITS_ERROR',
            payload: data.error
        });
    }
};

export const clearaAssignBatchResponse = () => {
    return {
        type: 'CLEAR_ASSIGN_BATCH_RESPONSE'
    };
};

    export const clearaAssignUnitsResponse = () => {
        return {
            type: 'CLEAR_ASSIGN_UNITS_RESPONSE'
        };
};
export const clearMultipleAssignUnitsResponse = () => {
    return {
        type: 'CLEAR_MULTIPLE_ASSIGN_RESPONSE'
    };
};
