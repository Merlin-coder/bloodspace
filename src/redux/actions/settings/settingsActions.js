import axios from 'axios';
import CONSTANTS from '../../../common/constants';

export function apiResponseType(value) {
    localStorage.setItem('apiBehavior', JSON.stringify(value));
    return {
        type: CONSTANTS.SET_API_RESPONSE_TYPE,
        payload: value
    };
}
export function routesType(route) {
    localStorage.setItem('routeType', JSON.stringify(route));
    return {
        type: CONSTANTS.SET_ROUTE_TYPE,
        payload: route
    };
}

export function dateFormatSelection(value) {
    localStorage.setItem('dateFormat', JSON.stringify(value));
    return {
        type: CONSTANTS.SET_DATE_FORMAT,
        payload: value
    };
}
export function associateUnitValidationAction(value) {
    localStorage.setItem('AssociateUnitValidation', JSON.stringify(value));
    return {
        type: CONSTANTS.SET_ASSOCIATE_UNIT_VALIDATION,
        payload: value
    };
}
export function deviceWriteTag(value) {
    localStorage.setItem('AssociateUnitValidation', JSON.stringify(value));
    return {
        type: CONSTANTS.DEVICE_WRTIE_TAG,
        payload: value
    };
}

export function lfTagAction(value) {
    localStorage.setItem('Lf_Hf_TagValidation', JSON.stringify(value));
    return {
        type: 'LF_TAG',
        payload: value
    };
}

export const notificationSettingsAction = (body, put) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.NOTIFICATION_SETTINGS_LOADING });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo.data.token
        }
    };
    let tempData;
    if (put) {
        const { data } = await axios.put(`${CONSTANTS.BASEURL}setting`, body, config);
        tempData = data;
    } else {
        const { data } = await axios.put(`${CONSTANTS.BASEURL}setting`, body, config);
        tempData = data;
    }

    if (tempData.status === true) {
        dispatch({
            type: CONSTANTS.NOTIFICATION_SETTINGS_SUCCESS,
            payload: tempData
        });
    } else {
        dispatch({
            type: CONSTANTS.NOTIFICATION_SETTINGS_ERROR,
            payload: tempData
        });
    }
};

export const dereservationSettingAction = (body, put) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.NOTIFICATION_SETTINGS_LOADING });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo.data.token
        }
    };
    let tempData;
    if (put) {
        const { data } = await axios.put(`${CONSTANTS.BASEURL}setting/dereservation`, body, config);
        tempData = data;
    } else {
        const { data } = await axios.post(`${CONSTANTS.BASEURL}setting/dereservation`, body, config);
        tempData = data;
    }

    if (tempData.status === true) {
        dispatch({
            type: CONSTANTS.NOTIFICATION_SETTINGS_SUCCESS,
            payload: tempData
        });
    } else {
        dispatch({
            type: CONSTANTS.NOTIFICATION_SETTINGS_ERROR,
            payload: tempData
        });
    }
};

export const dereservationBatchSettingAction = (body, put) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.NOTIFICATION_SETTINGS_LOADING });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo.data.token
        }
    };
    let tempData;
    if (put) {
        const { data } = await axios.put(`${CONSTANTS.BASEURL}setting/batchDereservation`, body, config);
        tempData = data;
    } else {
        const { data } = await axios.post(`${CONSTANTS.BASEURL}setting/batchDereservation`, body, config);
        tempData = data;
    }

    if (tempData.status === true) {
        dispatch({
            type: CONSTANTS.NOTIFICATION_SETTINGS_SUCCESS,
            payload: tempData
        });
    } else {
        dispatch({
            type: CONSTANTS.NOTIFICATION_SETTINGS_ERROR,
            payload: tempData
        });
    }
};


export const settingSwapoutEmail = (body, post) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.NOTIFICATION_SETTINGS_LOADING });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo.data.token
        }
    };
    let tempData;
   
    const { data } = await axios.post(`${CONSTANTS.BASEURL}setting/swapout`, body, config);
        tempData = data;
    
    if (tempData.status === true) {
        dispatch({
            type: CONSTANTS.NOTIFICATION_SETTINGS_SUCCESS,
            payload: tempData
        });
    } else {
        dispatch({
            type: CONSTANTS.NOTIFICATION_SETTINGS_ERROR,
            payload: tempData
        });
    }
};


export const clearNotificationSettingsResponse = () => {
    return {
        type: CONSTANTS.CLEAR_NOTIFICATION_SETTINGS_RESPONSE
    };
};
