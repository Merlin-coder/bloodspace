import axios from 'axios';
import CONSTANTS from 'common/constants';
import { postAddUnit } from '../../reducers/assignUnit/addUnitRecipientReducer';

export const getUnitSearch = (collectionName, filterKey) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_UNIT_SEARCH_REQUEST });
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

    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&filters=${filterKey}`;

    const { data } = await axios.get(url, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_UNIT_SEARCH_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_UNIT_SEARCH_ERROR,
            payload: data.error
        });
    }
};

export const clearUnitIdSearch = () => {
    return {
        type: CONSTANTS.CLEAR_UNIT_ID_SEARCH
    };
};

export const getBatchSearch = (collectionName, filterKey) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_BATCH_SEARCH_REQUEST });
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

    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&filters=${filterKey}`;

    const { data } = await axios.get(url, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_BATCH_SEARCH_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_BATCH_SEARCH_ERROR,
            payload: data.error
        });
    }
};

export const clearBatchIdSearch = () => {
    return {
        type: CONSTANTS.CLEAR_BATCH_ID_SEARCH
    };
};
