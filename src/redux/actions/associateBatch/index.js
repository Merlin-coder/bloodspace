import axios from 'axios';
import CONSTANTS from 'common/constants';
export const associateBatchAction = (formData) => async (dispatch, getState) => {
    dispatch({ type: 'ASSOCIATE_BATCH_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/batchAssociate`;
    const { data } = await axios.post(url, formData, config);
    if (data.status === true) {
        dispatch({
            type: 'ASSOCIATE_BATCH_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'ASSOCIATE_BATCH_ERROR',
            payload: data.error
        });
    }
};

export const clearAssociateBatchPost = () => {
    return {
        type: 'CLEAR_ASSIGN_BATCH_RESPONSE'
    };
};
export const clearAssociateBatch = () => {
    return {
        type: 'CLEAR_ASSOCIATE_BATCH'
    };
};
export const clearAssociateForm = (val) => {
    localStorage.setItem('clearForms', JSON.stringify(val));
    return {
        type: 'CLEAR_FORM_ASSOCIATE_BATCH',
        payload: val
    };
};

export const associateBatchGtinSearch = (formData) => async (dispatch, getState) => {
    dispatch({ type: 'ASSOCIATE_GTIN_SEARCH_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/batchAssociate`;
    const { data } = await axios.post(url, formData, config);
    if (data.status === true) {
        dispatch({
            type: 'ASSOCIATE_GTIN_SEARCH_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'ASSOCIATE_GTIN_SEARCH_ERROR',
            payload: data.error
        });
    }
};

export const clearAssociateGtinSeach = () => {
    return {
        type: 'CLEAR_GTIN_SEARCH_BATCH'
    };
};

export const passingAssociateProps = (data) => {
    
    return {
        type: 'PASSING_DATA_AS_PROPS',
        payload: data
    };
};
export const socketResponse = (data) => {
    
    return {
        type: 'PASSING_DATA',
        payload: data
    };
};
