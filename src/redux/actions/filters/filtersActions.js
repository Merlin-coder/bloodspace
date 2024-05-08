import axios from 'axios';
import CONSTANTS from 'common/constants';

export const getFilterCriteria = (collectionName) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_FILTER_CRITERIA_REQUEST });
    console.log(" FILTER CRITERIA REQUEST ")
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
    const { data } = await axios.get(`${CONSTANTS.BASEURL}filter?collectionName=${collectionName}`, config);

    if (data.status === true) {
        console.log("FILTER SUCCESS")
        dispatch({
            type: CONSTANTS.FILTER_CRITERIA_REQUEST_SUCCESS,
            payload: data
        });
    } else {
        console.log("FILTER FAILURE")
        dispatch({
            type: CONSTANTS.FILTER_CRITERIA_REQUEST_ERROR,
            payload: data.error
        });
    }
};

export const clearFilterCriteria = () => async (dispatch) => {
    dispatch({ type: CONSTANTS.CLEAR_FILTER_CRITERIA });
};

export const getFilter = (deviceId) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}units/filter?deviceId=${deviceId}`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getRequestBatchFilter = (deviceId) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_REQUESTBATCH_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}batches/filter?deviceId=${deviceId}`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        console.log("ttttbatch--", data)
        dispatch({
            type: CONSTANTS.GET_REQUESTBATCH_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_REQUESTBATCH_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getActivityUnitFilter = (status) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_ACTIVITYUNIT_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}units/getFilter?status=${status}`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        console.log("ttttactivity--", data)
        dispatch({
            type: CONSTANTS.GET_ACTIVITYUNIT_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_ACTIVITYUNIT_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getActivityBatchFilter = (status) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_ACTIVITYBATCH_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}batches/getFilter?status=${status}`;
    const { data } = await axios.get(url, config);
    console.log("databatch", data)
    if (data.status === true) {
        console.log("batchactivity--", data)
        dispatch({
            type: CONSTANTS.GET_ACTIVITYBATCH_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_ACTIVITYBATCH_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getNotifyUnitFilter = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_NOTIFYUNIT_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}units/notify/getFilter`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        console.log("ttttactivity--", data)
        dispatch({
            type: CONSTANTS.GET_NOTIFYUNIT_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_NOTIFYUNIT_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getNotifyBatchFilter = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_NOTIFYBATCH_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}units/notify/getBatchFilter`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        console.log("ttttactivity--", data)
        dispatch({
            type: CONSTANTS.GET_NOTIFYBATCH_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_NOTIFYYBATCH_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getWastedUnitFilter = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_WASTEDUNIT_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}wastedUnits/filter`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        console.log("ttttactivity--", data)
        dispatch({
            type: CONSTANTS.GET_WASTEDUNIT_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_WASTEDUNIT_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getWastedBatchFilter = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_WASTEDBATCH_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}wastedBatches/filter`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        console.log("ttttactivity--", data)
        dispatch({
            type: CONSTANTS.GET_WASTEDBATCH_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_WASTEDBATCH_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getTransfusedUnitFilter = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_TRANSFUSEDUNIT_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}transfused_Unit/filter`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        console.log("ttttactivity--", data)
        dispatch({
            type: CONSTANTS.GET_TRANSFUSEDUNIT_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_TRANSFUSEDUNIT_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getTransfusedBatchFilter = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_TRANSFUSEDBATCH_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}transfused_Batch/filter`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        console.log("ttttactivity--", data)
        dispatch({
            type: CONSTANTS.GET_TRANSFUSEDBATCH_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_TRANSFUSEDBATCH_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getRecipientFilter = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_RECIPIENT_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}index/recipient_filter`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        console.log("ttttactivity--", data)
        dispatch({
            type: CONSTANTS.GET_RECIPIENT_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_RECIPIENT_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getUserFilter = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_USER_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}index/user_filter`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        console.log("ttttactivity--", data)
        dispatch({
            type: CONSTANTS.GET_USER_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_USER_FILTER_ERROR,
            payload: data.error
        });
    }
};

export const getSwapoutFilter = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_SWAPOUT_FILTER_REQUEST });
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
    let url = `${CONSTANTS.BASEURL}swap/filter`;
    const { data } = await axios.get(url, config);

    if (data.status === true) {
        console.log("ttttactivity--", data)
        dispatch({
            type: CONSTANTS.GET_SWAPOUT_FILTER_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_SWAPOUT_FILTER_ERROR,
            payload: data.error
        });
    }
};