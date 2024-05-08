import axios from 'axios';
import CONSTANTS from 'common/constants';

const userLogin = localStorage?.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const config = {
    headers: {
        'Content-Type': 'application/json',
        authorization: userLogin?.data?.token
    }
};

let cancelToken;

export const getData = (
    collectionName,
    pageSize,
    pageNumber,
    search,
    filters,
    sort,
    type,
    searchRecipient,
    searchRecipientMRN,
    searchRecipientName,
    screen,
    deviceId,
    searchRecipientLastName
) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DATA_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo?.data?.token
        }
    };
    console.log("searchRecipientLastName----", searchRecipientLastName)
    // getData(urlEndPoint)
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}`;
    if (pageSize !== undefined) url = `${url}&pageSize=${pageSize}`;
    if (pageNumber !== undefined) url = `${url}&pageNumber=${pageNumber}`;
    if (search !== undefined) url = `${url}&search=${JSON.stringify(search)}`;
    if (filters !== undefined) url = `${url}&filters=${JSON.stringify(filters)}`;
    if (sort !== undefined) url = `${url}&sort=${JSON.stringify(sort)}`;
    if (type !== undefined) url = `${url}&type=${type}`;
    if (screen !== undefined) url = `${url}&screen=${screen}`;
    if (deviceId !== undefined) url = `${url}&deviceId=${deviceId}`;
    if (searchRecipient !== undefined) url = `${url}&searchRecipient=${JSON.stringify(searchRecipient)}`;
    if (searchRecipientMRN !== undefined) url = `${url}&searchRecipientMRN=${JSON.stringify(searchRecipientMRN)}`;
    if (searchRecipientName !== undefined) url = `${url}&searchRecipientName=${JSON.stringify(searchRecipientName)}`;
    if (searchRecipientLastName !== undefined) url = `${url}&searchRecipientLastName=${JSON.stringify(searchRecipientLastName)}`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DATA_SUCCESS,
            payload: data
        });
        return data;
    } else {
        dispatch({
            type: CONSTANTS.GET_DATA_ERROR,
            payload: data.error
        });
        return false;
    }
    };

export const getUserAccessId = (
    collectionName,
    pageSize,
    pageNumber,
    search,
    filters,
    sort,
    type,
    searchRecipient,
    searchRecipientMRN,
    searchRecipientName
 
) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_USER_ROLE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo?.data?.token
        }
    };
    // getData(urlEndPoint)
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}`;
    if (pageSize !== undefined) url = `${url}&pageSize=${pageSize}`;
    if (pageNumber !== undefined) url = `${url}&pageNumber=${pageNumber}`;
    if (search !== undefined) url = `${url}&search=${JSON.stringify(search)}`;
    if (filters !== undefined) url = `${url}&filters=${JSON.stringify(filters)}`;
    if (sort !== undefined) url = `${url}&sort=${JSON.stringify(sort)}`;
    if (type !== undefined) url = `${url}&type=${type}`;
    if (searchRecipient !== undefined) url = `${url}&searchRecipient=${JSON.stringify(searchRecipient)}`;
    if (searchRecipientMRN !== undefined) url = `${url}&searchRecipientMRN=${JSON.stringify(searchRecipientMRN)}`;
    if (searchRecipientName !== undefined) url = `${url}&searchRecipientName=${JSON.stringify(searchRecipientName)}`;
    
    const { data } = await axios.get(url, config);
   
    if (data.status === true) {
        console.log('ssssssssss', data)
        dispatch({
            type: CONSTANTS.GET_USER_ROLE_SUCCESS,
            payload: data
        });
        return data;
    } else {
        dispatch({
            type: CONSTANTS.GET_USER_ROLE_ERROR,
            payload: data.error
        });
        return false;
    }
};

export const getExportData = (collectionName, pageSize, pageNumber, search, filters, sort) => async (
    dispatch,
    getState
) => {
    dispatch({ type: CONSTANTS.GET_DATA_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            type: 'Web',
            Authorization: userInfo?.data?.token
        }
    };

    if (typeof cancelToken != typeof undefined) {
        cancelToken?.cancel('Operation canceled due to new request.');
    }

    cancelToken = axios.CancelToken.source();

    // getData(urlEndPoint)
    let url = `${CONSTANTS.BASEURL}index/export?collectionName=${collectionName}`;
    if (pageSize !== undefined) url = `${url}&pageSize=${pageSize}`;
    if (pageNumber !== undefined) url = `${url}&pageNumber=${pageNumber}`;
    if (search !== undefined) url = `${url}&search=${search}`;
    if (filters !== undefined) url = `${url}&filters=${filters}`;
    if (sort !== undefined) url = `${url}&sort=${sort}`;

    const { data } = await axios.get(url, { cancelToken: cancelToken.token }, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DATA_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DATA_ERROR,
            payload: data.error
        });
    }
};

export const getDeviceStatus = (deviceserial) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DEVICE_STATUS });
    const {
        userLogin: { userInfo }
    } = getState();

   
    
    let url = `${CONSTANTS.BASEURL}setting/deviceStatus?serialNumber=${deviceserial}`;
   
    

    const { data } = await axios.get(url);
    
    if (data.status === true) {
        console.log("d--", data)
        dispatch({
            type: CONSTANTS.GET_DEVICE_STATUS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DEVICE_STATUS_ERROR,
            payload: data.error
        });
    }
};

export const getResData = (collectionName, filters) => async (dispatch, getState) => {
    dispatch({ type: 'GET_DATAS_REQUEST' });
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
    // if (typeof cancelToken != typeof undefined) {
    //     cancelToken?.cancel('Operation canceled due to new request.');
    // }

    // cancelToken = axios.CancelToken.source();

    // getData(urlEndPoint)
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}`;
    if (filters !== undefined) url = `${url}&filters=${filters}`;
    // if (search !== undefined) url = `${url}&search=${search}`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_DATAS_DONE',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_DATAS_FAIL',
            payload: data.error
        });
    }
};

export const getLocationTypes = () => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_LOCATION_TYPE_REQUEST });
    const { data } = await axios.get(`${CONSTANTS.BASEURL}index?collectionName=location-type`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_LOCATION_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_LOCATION_TYPE_FAIL,
            payload: data.error
        });
    }
};

export const updateData = (collectionName, update) => async (dispatch) => {
    dispatch({ type: CONSTANTS.UPDATE_DATA_REQUEST });

    let url = `${CONSTANTS.BASEURL}/index?collectionName=${collectionName}`;

    const { data } = await axios.put(url, update, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.UPDATE_DATA_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.UPDATE_DATA_FAIL,
            payload: data.error
        });
    }
};

export const postData = (collectionName, postData) => async (dispatch) => {
    dispatch({ type: CONSTANTS.POST_DATA_REQUEST });

    let url = `${CONSTANTS.BASEURL}/index?collectionName=${collectionName}`;

    const { data } = await axios.post(url, postData, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.POST_DATA_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.POST_DATA_ERROR,
            payload: data.error
        });
    }
};



export const deleteData = (collectionName, id) => async (dispatch) => {
    dispatch({ type: CONSTANTS.DELETE_ROW_REQUEST });

    let url = `${CONSTANTS.BASEURL}/index?collectionName=${collectionName}`;

    const { data } = await axios.delete(`${url}&id=${id}`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.DELETE_ROW_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.DELETE_ROW_FAIL,
            payload: data.error
        });
    }
};

export const getUserRoles = () => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_USER_GROUPS_REQUEST });
    const { data } = await axios.get(`${CONSTANTS.BASEURL}/index?collectionName=user-role`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_USER_GROUPS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_USER_GROUPS_FAIL,
            payload: data.error
        });
    }
};

export const getDeviceTypes = () => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_DEVICE_TYPE_REQUEST });
    const { data } = await axios.get(`${CONSTANTS.BASEURL}/index?collectionName=device-type`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DEVICE_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DEVICE_TYPE_FAIL,
            payload: data.error
        });
    }
};

export const getClientIds = () => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_CLIENT_ID_REQUST });
    const { data } = await axios.get(`${CONSTANTS.BASEURL}/index?collectionName=client`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_CLIENT_ID_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_CLIENT_ID_FAIL,
            payload: data.error
        });
    }
};

// export const getDownloadData = (urlEndPoint) => async (dispatch) => {
//     dispatch({ type: CONSTANTS.GET_DOWNLOAD_DATA_REQUEST });
//     const { data } = await axios.get(`${CONSTANTS.BASEURL}${urlEndPoint}/exportExcel`, config);

//     if (data.status === true) {
//         dispatch({
//             type: CONSTANTS.GET_DOWNLOAD_DATA_SUCCESS,
//             payload: data
//         });
//     } else {
//         dispatch({
//             type: CONSTANTS.GET_DOWNLOAD_DATA_FAIL,
//             payload: data.error
//         });
//     }
// };

export const clearData = () => {
    return {
        type: CONSTANTS.CLEAR_DATA
    };
};
export const clearResponseData = () => {
    return {
        type: 'GET_DATAS_CLEAR'
    };
};
export const getUnitBatch = (filters) => async (dispatch, getState) => {
    dispatch({ type: 'GET_UNIT_BATCH_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/unitBatchData`;
    if (filters !== undefined) url = `${url}?filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_UNIT_BATCH_SUCCESS',
            payload: data?.data
        });
    } else {
        dispatch({
            type: 'GET_UNIT_BATCH_ERROR',
            payload: data?.error
        });
    }
};

export const clearUnitBatchData = () => {
    return {
        type: 'CLEAR_UNIT_BATCH_DATA'
    };
};
