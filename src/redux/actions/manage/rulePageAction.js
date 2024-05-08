import axios from 'axios';
import CONSTANTS from 'common/constants';

function getHeader(getState) {
    const {
        userLogin: { userInfo }
    } = getState();

    return {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo.data.token
        }
    };
}

export const getCondition = (filters) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.CONDITION_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}index?collectionName=rconditions&pageSize=500&pageNumber=0`;

    if (filters !== undefined) url = `${url}&filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.CONDITION_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.CONDITION_ERROR,
            payload: data.error
        });
    }
};
export const getAllCondition = (filters) => async (dispatch, getState) => {
    dispatch({ type: 'ALLCONDITION_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index?collectionName=rconditions&pageSize=500&pageNumber=0`;

    if (filters !== undefined) url = `${url}&filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'ALLCONDITION_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: ' ALLCONDITION_ERROR',
            payload: data.error
        });
    }
};

export const getAll = (filters) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GETALL_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}index/all`;
    if (filters !== undefined) url = `${url}?filters=${filters}`;

    const { data } = await axios.get(url, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GETALL_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GETALL_ERROR,
            payload: data.error
        });
    }
};
export const getnotificationTypes = () => async (dispatch, getState) => {
    dispatch({ type: 'GETNOTIFICATION_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index?collectionName=rnotificationtypes&pageSize=500&pageNumber=0`;
    let url1 = `${CONSTANTS.BASEURL}index?collectionName=rnotifyby&pageSize=500&pageNumber=0`;
    let url2 = `${CONSTANTS.BASEURL}index?collectionName=emailtemps&pageSize=500&pageNumber=0`;

    const notificationTypeFetch = await axios.get(url, config);
    const notifyByFetch = await axios.get(url1, config);
    const emailTemplateFetch = await axios.get(url2, config);

    if (notificationTypeFetch.data.status === true) {
        let notificationType = notificationTypeFetch.data;
        let notifyBy = notifyByFetch.data;
        let emailTemplate = emailTemplateFetch.data;
        dispatch({
            type: 'GETNOTIFICATION_SUCCESS',
            payload: { notificationType, notifyBy, emailTemplate }
        });
    } else {
        dispatch({
            type: 'GETNOTIFICATION_ERROR',
            payload: getnotificationTypes.data.status
        });
    }
};

export const postNotification = (body) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.POST_RULE_TYPE_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}index`;
    const { data } = await axios.post(url, body, config);
    if (data.status) {
        dispatch({
            type: CONSTANTS.POST_RULE_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.POST_RULE_TYPE_ERROR,
            payload: data
        });
    }
};
export const putRulesData = (body) => async (dispatch, getState) => {
    dispatch({ type: 'PUT_RULE_TYPE_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index`;
    const { data } = await axios.put(url, body, config);
    if (data.status) {
        dispatch({
            type: 'PUT_RULE_TYPE_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'PUT_RULE_TYPE_ERROR',
            payload: data
        });
    }
};

export const clearRuleTypePost = () => {
    return {
        type: CONSTANTS.CLEAR_RULE_TYPE_POST
    };
};
export const clearRuleTypePut = () => {
    return {
        type: 'CLEAR_RULE_TYPE_PUT'
    };
};

export const getResolutionType = (filter) => async (dispatch, getState) => {
    dispatch({ type: 'RESOLUTION_TYPE_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index?collectionName=resolutionmaintype`;
    if (filter) url = `url&filters=${filter}`;

    // if (filters !== undefined) url = `${url}&filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'RESOLUTION_TYPE_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'RESOLUTION_TYPE_ERROR',
            payload: data.error
        });
    }
};
export const getResolutionSubType = (filter) => async (dispatch, getState) => {
    dispatch({ type: 'RESOLUTION_SUBTYPE_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index?collectionName=resolutionsubtype`;
    if (filter) url = `${url}&filters=${filter}`;

    // if (filters !== undefined) url = `${url}&filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'RESOLUTION_SUBTYPE_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'RESOLUTION_SUBTYPE_ERROR',
            payload: data.error
        });
    }
};
export const getFactId = () => async (dispatch, getState) => {
    dispatch({ type: 'FACT_ID_REQUEST' });

    let config = getHeader(getState);

    // getData(urlEndPoint)
    let url = `${CONSTANTS.BASEURL}index?collectionName=facts&pageSize=500&pageNumber=0`;

    // if (filters !== undefined) url = `${url}&filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'FACT_ID_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'FACT_ID_ERROR',
            payload: data.error
        });
    }
};

export const getNotificationId = () => async (dispatch, getState) => {
    dispatch({ type: 'NOTIFICATION_ID_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index?collectionName=rnotifications&pageSize=500&pageNumber=0`;

    // if (filters !== undefined) url = `${url}&filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'NOTIFICATION_ID_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'NOTIFICATION_ID_ERROR',
            payload: data.error
        });
    }
};

export const getResolutionId = () => async (dispatch, getState) => {
    dispatch({ type: 'RESOLUTION_ID_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index?collectionName=resolutions&pageSize=500&pageNumber=0`;

    // if (filters !== undefined) url = `${url}&filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'RESOLUTION_ID_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'RESOLUTION_ID_ERROR',
            payload: data.error
        });
    }
};

export const ruleBreak = (id) => async (dispatch, getState) => {
    dispatch({ type: 'RULEBREAK_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index/break-rule?_id=${id}`;

    // if (filters !== undefined) url = `${url}&filters=${filters}`;
    const { data } = await axios.post(url, config);
    if (data.status === true) {
        dispatch({
            type: 'RULEBREAK_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'RULEBREAK_ERROR',
            payload: data.error
        });
    }
};
export const getRuleType = (type) => {
    return {
        type: 'RULE_TYPE',
        payload: type
    };
};
