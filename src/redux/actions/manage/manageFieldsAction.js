import CONSTANTS from '../../../common/constants';
import axios from 'axios';
import { settingsLocalDataAction, settingsRemoteLoginPageAction, settingsBatchDataAction } from 'redux/actions/socketAction';
// const userLogin = localStorage?.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

export const getFields = (drawerCode) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_FIELDS_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index?collectionName=fields&filters=[{"key":"drawer-code","value":"${drawerCode}"}]&pageSize=20000`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_FIELDS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_FIELDS_ERROR,
            payload: data.error
        });
    }
};
export const postFormData = (formData, name) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.POST_FIELDS_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index`;
    if (name !== undefined) url = `${CONSTANTS.BASEURL}index/${name}`;
    const { data } = await axios.post(url, formData, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.POST_FIELDS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.POST_FIELDS_ERROR,
            payload: data.error
        });
    }
};

export const postSwapOutData = (deviceId) => async (dispatch, getState) => {
    console.log('emergencyId', deviceId)
    dispatch({ type: CONSTANTS.POST_SWAPOUT_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}swap`;
    //if (name !== undefined) url = `${CONSTANTS.BASEURL}index/${name}`;
    const { data } = await axios.post(url, deviceId);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.POST_SWAPOUT_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.POST_SWAPOUT_ERROR,
            payload: data.error
        });
    }
};

export const putSwapOutCancel = (deviceId) => async (dispatch, getState) => {
    console.log('emergencyId', deviceId)
    dispatch({ type: CONSTANTS.PUT_SWAPOUTCANCEL_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}swap/cancel`;
    //if (name !== undefined) url = `${CONSTANTS.BASEURL}index/${name}`;
    const { data } = await axios.put(url, deviceId);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.PUT_SWAPOUTCANCEL_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.PUT_SWAPOUTCANCEL_ERROR,
            payload: data.error
        });
    }
};

export const putFormData = (formData) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.PUT_FIELDS_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index`;

    const { data } = await axios.put(url, formData, config);
    console.log('data in api', data);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.PUT_FIELDS_SUCCESS,
            payload: data
        });
    } else {
        console.log("err", data.error);
        dispatch({
            type: CONSTANTS.PUT_FIELDS_ERROR,
            payload: data
        });
    }
};
export const putSwapoutData = (formData) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.PUT_SWAPOUT_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}swap`;

    const { data } = await axios.put(url, formData, config);
    console.log('data', data);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.PUT_SWAPOUT_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.PUT_SWAPOUT_ERROR,
            payload: data.error
        });
    }
};
export const putEditData = (formData) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.PUT_DISPLAY_CONFIG_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index/editDisplayconfig`;

    const { data } = await axios.put(url, formData, config);
    console.log('data', data);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.PUT_DISPLAY_CONFIG_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.PUT_DISPLAY_CONFIG_ERROR,
            payload: data.error
        });
    }
};

export const deleteFormData = (collectionName, id) => async (dispatch, getState) => {
    dispatch({ type: 'DELETE_FIELD_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&_id=${id}`;

    const { data } = await axios.delete(url, config);
    if (data.status === true) {
        dispatch({
            type: 'DELETE_FIELD_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'DELETE_FIELD_ERROR',
            payload: data.error
        });
    }
};

export const putDisplayConfigData = (formData) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.PUT_DISPLAY_CONFIG_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index`;

    const { data } = await axios.put(url, formData, config);
    if (data.status === true) { 
        dispatch({
            type: CONSTANTS.PUT_DISPLAY_CONFIG_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.PUT_DISPLAY_CONFIG_ERROR,
            payload: data.error
        });
    }
};

export const activeDeactiveAction = (formData) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.DELETE_ACTIVEDEACTIVE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    console.log("config---",config)
    let url = `${CONSTANTS.BASEURL}index/activeDeactive`;

    const { data } = await axios.delete(url, { data: formData, ...config });
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.DELETE_ACTIVEDEACTIVE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.DELETE_ACTIVEDEACTIVE_ERROR,
            payload: data.error
        });
    }
};

export const getDropDown = (name, filters) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DROPDOWN_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    if (name) {
        console.log('name---', name);
        let url = `${CONSTANTS.BASEURL}index?collectionName=${name}&pageSize=0`;
        if (filters !== undefined) url = `${url}&filters=${filters}`;
        const { data } = await axios.get(url, config);
        if (data.status === true) {
            console.log('drop data---', data);
            dispatch({
                type: CONSTANTS.GET_DROPDOWN_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.GET_DROPDOWN_ERROR,
                payload: data.error
            });
        }
    }
};

export const getSettings = (name, filters) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DROPDOWN_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    if (name) {
        let url = `${CONSTANTS.BASEURL}setting`;
        const { data } = await axios.get(url, config);
        if (data.status === true && data.data != null && data.data != undefined) {
            console.log('getsetting data', data);
            dispatch(settingsLocalDataAction(data.data));
        }
    }
};

export const getBatchSettings = (dereservation) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DROPDOWN_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
   
        let url = `${CONSTANTS.BASEURL}setting/batchDereservation`;
    const { data } = await axios.post(url, dereservation, config);
       
    dispatch(settingsBatchDataAction(data.data));
};

/*
export const getSettingsTableData = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_SETTINGS_TABLE_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}setting/settingData`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        console.log('getsetting data', data);
        dispatch({ type: CONSTANTS.GET_SETTINGS_TABLE_SUCCESS, payload: data });
    } else {
        dispatch({ type: CONSTANTS.GET_SETTINGS_TABLE_ERROR, payload: data.error });
    }
};
*/


export const getRemote = () => async (dispatch, getState) => {
    //dispatch({ type: CONSTANTS.GET_DROPDOWN_REQUEST });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let url = `${CONSTANTS.BASEURL}setting/config`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch(settingsRemoteLoginPageAction(data.data));
    }
};

export const get2ndDropdown = (name, filters) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_OTHER_DROPDOWN_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    if (name) {
        let url = `${CONSTANTS.BASEURL}index?collectionName=${name}&pageSize=0`;
        if (filters !== undefined) url = `${url}&filters=${filters}`;
        const { data } = await axios.get(url, config);
        if (data.status === true) {
            dispatch({
                type: CONSTANTS.GET_OTHER_DROPDOWN_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.GET_OTHER_DROPDOWN_ERROR,
                payload: data.error
            });
        }
    }
};

export const clearDropDown = () => {
    return {
        type: 'CLEAR_DROP_DOWN'
    };
};
export const clear3rdDropDown = () => {
    return {
        type: 'CLEAR_THIRD_DROP_DOWN'
    };
};
export const clear4thDropDown = () => {
    return {
        type: 'CLEAR_FOURTH_DROP_DOWN'
    };
};
export const clear5thDropDown = () => {
    return {
        type: 'CLEAR_FIFTH_DROP_DOWN'
    };
};
export const clear6thDropDown = () => {
    return {
        type: 'CLEAR_SIXTH_DROP_DOWN'
    };
};
export const clear7thDropDown = () => {
    return {
        type: 'CLEAR_SEVENTH_DROP_DOWN'
    };
};
export const clear8thDropDown = () => {
    return {
        type: 'CLEAR_EIGTH_DROP_DOWN'
    };
};
export const clear2ndDropDown = () => {
    return {
        type: 'CLEAR_SECOND_DROP_DOWN'
    };
};
export const clearCollectionDropDown = () => {
    return {
        type: 'CLEAR_COLLECTION_DROP_DOWN'
    };
};

export const getCollectionDropdown = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_COLLECTION_DROPDOWN_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/collections`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_COLLECTION_DROPDOWN_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_COLLECTION_DROPDOWN_ERROR',
            payload: data.error
        });
    }
};
export const get3rdDropdown = (name, filters) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_3RD_DROPDOWN_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    if (name) {
        let url = `${CONSTANTS.BASEURL}index?collectionName=${name}&pageSize=0`;
        if (filters !== undefined) url = `${url}&filters=${filters}`;
        // if (type !== undefined) url = `${url}&type=${type}`;
        const { data } = await axios.get(url, config);
        if (data.status === true) {
            dispatch({
                type: CONSTANTS.GET_3RD_DROPDOWN_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.GET_3RD_DROPDOWN_ERROR,
                payload: data.error
            });
        }
    }
};
export const get4thDropdown = (name, filters, search) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_4TH_DROPDOWN_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    if (name) {
        let url = `${CONSTANTS.BASEURL}index?collectionName=${name}&pageSize=0`;
        if (filters !== undefined) url = `${url}&filters=${filters}`;
        if (search !== undefined) url = `${url}&search=${JSON.stringify(search)}`;
        const { data } = await axios.get(url, config);
        if (data.status === true) {
            dispatch({
                type: CONSTANTS.GET_4TH_DROPDOWN_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.GET_4TH_DROPDOWN_ERROR,
                payload: data.error
            });
        }
    }
    console.log('line 315', name, filters);
};
export const get5thDropdown = (name, filters) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_5TH_DROPDOWN_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    if (name) {
        let url = `${CONSTANTS.BASEURL}index?collectionName=${name}&pageSize=0`;
        if (filters !== undefined) url = `${url}&filters=${filters}`;
        const { data } = await axios.get(url, config);
        if (data.status === true) {
            dispatch({
                type: CONSTANTS.GET_5TH_DROPDOWN_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.GET_5TH_DROPDOWN_ERROR,
                payload: data.error
            });
        }
    }
};
export const get6thDropdown = (name) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_6TH_DROPDOWN_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    if (name) {
        let url = `${CONSTANTS.BASEURL}index?collectionName=${name}&pageSize=0`;
        const { data } = await axios.get(url, config);
        if (data.status === true) {
            dispatch({
                type: CONSTANTS.GET_6TH_DROPDOWN_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.GET_6TH_DROPDOWN_ERROR,
                payload: data.error
            });
        }
    }
};
export const get7thDropdown = (name) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_7TH_DROPDOWN_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    if (name) {
        let url = `${CONSTANTS.BASEURL}index?collectionName=${name}&pageSize=0`;
        const { data } = await axios.get(url, config);
        if (data.status === true) {
            dispatch({
                type: CONSTANTS.GET_7TH_DROPDOWN_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.GET_7TH_DROPDOWN_ERROR,
                payload: data.error
            });
        }
    }
};
export const get8thDropdown = (name, filters, search) => async (dispatch, getState) => {
    dispatch({ type: 'GET_8TH_DROPDOWN_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    if (name) {
        let url = `${CONSTANTS.BASEURL}index?collectionName=${name}&pageSize=0`;
        if (filters !== undefined) url = `${url}&filters=${filters}`;
        if (search !== undefined) url = `${url}&search=${JSON.stringify(search)}`;
        const { data } = await axios.get(url, config);
        if (data.status === true) {
            dispatch({
                type: 'GET_8TH_DROPDOWN_SUCCESS',
                payload: data
            });
        } else {
            dispatch({
                type: 'GET_8TH_DROPDOWN_ERROR',
                payload: data.error
            });
        }
    }
};

export const clearPostResponse = () => {
    return {
        type: CONSTANTS.CLEAR_POST_FIELDS
    };
};
export const clearPutResponse = () => {
    return {
        type: CONSTANTS.CLEAR_PUT_FIELDS
    };
};
export const clearDisplayConfigPutResponse = () => {
    return {
        type: CONSTANTS.CLEAR_DISPLAY_CONFIG_PUT
    };
};
export const clearDeleteResponse = () => {
    return {
        type: 'CLEAR_DELETE_RESPONSE'
    };
};

export const postAddUserGroup = (postData) => async (dispatch, getState) => {
    dispatch({ type: 'POST_ADD_USER_GROUP_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index`;
    const { data } = await axios.post(url, postData, config);
    if (data.status === true) {
        dispatch({
            type: 'POST_ADD_USER_GROUP_SUCCESS',
            payload: data
        });
     
    } else {
        dispatch({
            type: 'POST_ADD_USER_GROUP_ERROR',
            payload: data.error
        });
        
    }
};


//WASTED UNITS FOR WASTED

export const postWastedUnit = (refskuId) => async (dispatch, getState) => {
    dispatch({ type: 'POST_WASTEDUNITS_REQUEST' });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}wastedUnits`;

    const { data } = await axios.post(url,refskuId,config);

    if (data.status === true) {
        dispatch({
            type: 'POST_WASTEDUNITS_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'POST_WASTEDUNITS_ERROR',
            payload: data.error
        });
    }
};

export const postWastedBatch = (batchId) => async (dispatch, getState) => {
    dispatch({ type: 'POST_WASTEDBATCH_REQUEST' });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}wastedBatches`;

    const { data } = await axios.post(url, batchId, config);

    if (data.status === true) {
        dispatch({
            type: 'POST_WASTEDBATCH_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'POST_WASTEDBATCH_ERROR',
            payload: data.error
        });
    }
};

export const postTransfusedUnits = (transfusedId) => async (dispatch, getState) => {
    dispatch({ type: 'POST_WASTEDUNITS_REQUEST' });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}transfused_Unit`;

    const { data } = await axios.post(url, transfusedId, config);

    if (data.status === true) {
        dispatch({
            type: 'POST_WASTEDUNITS_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'POST_WASTEDUNITS_ERROR',
            payload: data.error
        });
    }
};

export const postTransfusedBatch = (transfusedId) => async (dispatch, getState) => {
    dispatch({ type: 'POST_WASTEDBATCH_REQUEST' });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}transfused_Batch`;

    const { data } = await axios.post(url, transfusedId, config);

    if (data.status === true) {
        dispatch({
            type: 'POST_WASTEDBATCH_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'POST_WASTEDBATCH_ERROR',
            payload: data.error
        });
    }
};

export const getWastedUnits = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_WASTED_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    //let url = `${CONSTANTS.BASEURL}wastedUnits`;
    let url = `${CONSTANTS.BASEURL}wastedUnits`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_WASTED_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_WASTED_ERROR',
            payload: data.error
        });
    }
};

export const getWastedBatches = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_WASTED_BATCH_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    //let url = `${CONSTANTS.BASEURL}wastedBatches`;
    let url = `${CONSTANTS.BASEURL}wastedBatches`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_WASTED_BATCH_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_WASTED_BATCH_ERROR',
            payload: data.error
        });
    }
};

export const getWastedTransfusedUnit = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_WASTED_TRANSFUSED_UNIT_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    }; 
    let url = `${CONSTANTS.BASEURL}transfused_Unit`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_WASTED_TRANSFUSED_UNIT_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_WASTED_TRANSFUSED_UNIT_ERROR',
            payload: data.error
        });
    }
};

export const getWastedTransfusedBatch = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_WASTED_TRANSFUSED_BATCH_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}transfused_Batch`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_WASTED_TRANSFUSED_BATCH_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_WASTED_TRANSFUSED_BATCH_ERROR',
            payload: data.error
        });
    }
};


export const postExcelSheet = () => async (dispatch, getState) => {
    dispatch({ type: 'POST_EXCEL_GROUP_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}wastedUnits`;
    const { data } = await axios.post(url, config);
    if (data.status === true) {
        console.log(data,"dataaaaa------")
        dispatch({
            type: 'POST_EXCEL_GROUP_SUCCESS',
            payload: data
        });
      
    } else {
        console.log("error", data)
        dispatch({
            type: 'POST_EXCEL_GROUP_ERROR',
            payload: data.error
        });

    }
};

export const clearAddUserGroupResponse = () => (dispatch, getState) => {
    dispatch({ type: 'CLEAR_ADD_USER_GROUP_RESPONSE' });
    return {
        type: 'CLEAR_ADD_USER_GROUP_RESPONSE',
        payload: null
    };
};

export const deleteSelectedRecords = (collectionName, id) => async (dispatch, getState) => {
    dispatch({ type: 'DELETE_FIELD_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${
        CONSTANTS.BASEURL
    }index/deleteMany?deleteMany=true&collectionName=${collectionName}&_id=${JSON.stringify(id)}`;

    const { data } = await axios.delete(url, config);
    if (data.status === true) {
        dispatch({
            type: 'DELETE_FIELD_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'DELETE_FIELD_ERROR',
            payload: data.error
        });
    }
};

export const deactivateSelectedRecords = (collectionName, id) => async (dispatch, getState) => {
    dispatch({ type: 'DEACTIVATE_FIELD_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index/deleteMany?collectionName=${collectionName}&_id=${JSON.stringify(id)}`;

    const { data } = await axios.delete(url, config);
    if (data.status === true) {
        dispatch({
            type: 'DEACTIVATE_FIELD_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'DEACTIVATE_FIELD_ERROR',
            payload: data.error
        });
    }
};

export const deleteDisplayconfig = (deleteconfig) => async (dispatch, getState) => {
    dispatch({ type: 'DISPLAYCONFIG_DELETE_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index/deleteDisplayconfig`;

    const { data } = await axios.delete(url, { data: deleteconfig, ...config });
    if (data.status === true) {
        dispatch({
            type: 'DISPLAYCONFIG_DELETE_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'DISPLAYCONFIG_DELETE_ERROR',
            payload: data.error
        });
    }
};

export const getDeviceData = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_DEVICE_DATA_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `/api/v1/index?collectionName=device&pageSize=0&pageNumber=1`;

    const { data } = await axios.get(url, config);
    if (data.status) {
        dispatch({
            type: 'GET_DEVICE_DATA_SUCCESS',
            payload: data.data
        });
    } else {
        dispatch({
            type: 'GET_DEVICE_DATA_SUCCESS',
            payload: data.error
        });
    }
};

export const postRemoveEDQ = (removeEdq) => async (dispatch, getState) => {
    dispatch({ type: 'POST_REMOVEEDQ_REQUEST' });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index/removeEDQs`;

    const { data } = await axios.post(url, removeEdq, config);

    if (data.status === true) {
        dispatch({
            type: 'POST_REMOVEEDQ_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'POST_REMOVEEDQ_ERROR',
            payload: data.error
        });
    }
};

export const getRecipientCount = (recipientId) => async (dispatch, getState) => {
    dispatch({ type: 'GET_RECIPIENT_COUNT_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/getRecipientWithUnitData?recipientId=${recipientId}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_RECIPIENT_COUNT_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_RECIPIENT_COUNT_ERROR',
            payload: data.error
        });
    }
};

export const getDashCount = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_DASH_COUNT_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    let url = `${CONSTANTS.BASEURL}index/unitDashboard`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_DASH_COUNT_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_DASH_COUNT_ERROR',
            payload: data.error
        });
    }
};