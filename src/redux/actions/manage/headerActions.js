import CONSTANTS from '../../../common/constants';
import axios from 'axios';

// requestBodyForRequestUnitActions[trigerLed,pullOutrequest....]
// {{baseURL}}/index/insertmany-activity?selectAll=true&track=BS-TR-5104&filters=[{"key":"deviceId._id","value":["60e2f02be2735203b0e4de60"]},{"key":"productcodeId._id","value":["60e2f02de2735203b0e4dee2"]}]

export const putHeaderAction = (formData, selectAll, track, filters) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.PUT_HEADER_ACTIONS });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let response;

    let url = `${CONSTANTS.BASEURL}index/insertmany-activity`;

    if (formData?.validData === undefined) {
        if (selectAll !== undefined) url = `${url}?selectAll=${selectAll}`;

        if (track !== undefined) url = `${url}&track=${track}`;

        if (Object.keys(filters).length > 0) url = `${url}&filters=${JSON.stringify(filters)}`;
        response = await axios.post(url, formData, config);
    } else {
        response = await axios.post(url, formData, config);
    }

    const { data } = response;
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.PUT_HEADER_ACTIONS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.PUT_HEADER_ACTIONS_ERROR,
            payload: data.error
        });
    }
};

export const clearheaderActionsResponse = () => {
    return {
        type: CONSTANTS.PUT_HEADER_ACTIONS_CLEAR
    };
};

export const requestbatchHeaderAction = (formData, selectAll, track, filters) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.POST_REQUESTBATCH_ACTIONS });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let response;

    let url = `${CONSTANTS.BASEURL}index/insertbatch-activity`;

    if (formData?.validData === undefined) {
        if (selectAll !== undefined) url = `${url}?selectAll=${selectAll}`;

        if (track !== undefined) url = `${url}&track=${track}`;

        if (Object.keys(filters).length > 0) url = `${url}&filters=${JSON.stringify(filters)}`;
        response = await axios.post(url, formData, config);
    } else {
        response = await axios.post(url, formData, config);
    }

    const { data } = response;
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.POST_REQUESTBATCH_ACTIONS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.POST_REQUESTBATCH_ACTIONS_ERROR,
            payload: data.error
        });
    }
};

export const clearRequestbatchActions = () => {
    return {
        type: CONSTANTS.POST_REQUESTBATCH_ACTIONS_CLEAR
    };
};

export const putAction = (statusObject) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.PUT_ACTIONS });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index/notification-resolve`;

    const { data } = await axios.put(url, statusObject, config);
    console.log('data', data);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.PUT_ACTIONS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.PUT_ACTIONS_ERROR,
            payload: data.error
        });
    }
};

export const ledSelection = (formData, track) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.HEADER_LED_ACTIONS });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index/insertmany-activity`;
    if (track) url = `${url}?track=BS-TR-5114`;
    const { data } = await axios.post(url, formData, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.HEADER_LED_ACTIONS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.HEADER_LED_ACTIONS_ERROR,
            payload: data.error
        });
    }
};

export const clearLedResponse = () => {
    return {
        type: CONSTANTS.HEADER_LED_CLEAR
    };
};


export const declinedAction = (statusObject) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.DECLINED_ACTIONS });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}LISRequest`;

    const { data } = await axios.put(url, statusObject, config);
    console.log('data', data);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.DECLINED_ACTIONS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.DECLINED_ACTIONS_ERROR,
            payload: data.error
        });
    }
};
