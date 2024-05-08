import axios from 'axios';
import CONSTANTS from '../../common/constants';
// import {getData} from '../../../common/util'

export const getDeviceReducer = (state = { devices: { displayConfig: [], data: [] } }, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DEVICE_REQUEST:
            return { loading: true, devices: { displayConfig: [], data: [] } };
        case CONSTANTS.GET_DEVICE_SUCCESS:
            return { loading: false, devices: action.payload };
        case CONSTANTS.GET_DEVICE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
export const addDeviceReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_DEVICE_REQUEST:
            return { loading: true };
        case CONSTANTS.ADD_DEVICE_SUCCESS:
            return { loading: false, devices: action.payload };
        case CONSTANTS.ADD_DEVICE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
export const updateDeviceReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_DEVICE_REQUEST:
            return { loading: true };
        case CONSTANTS.UPDATE_DEVICE_SUCCESS:
            return { loading: false, devices: action.payload };
        case CONSTANTS.UPDATE_DEVICE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
export const deleteDeviceReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.DELETE_DEVICE_REQUEST:
            return { loading: true };
        case CONSTANTS.DELETE_DEVICE_SUCCESS:
            return { loading: false, devices: action.payload };
        case CONSTANTS.DELETE_DEVICE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
export const deviceTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DEVICETYPE_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_DEVICETYPE_SUCCESS:
            return { loading: false, deviceType: action.payload };
        case CONSTANTS.GET_DEVICETYPE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const locationTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_LOCATIONTYPE_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_LOCATIONTYPE_SUCCESS:
            return { loading: false, locationType: action.payload };
        case CONSTANTS.GET_LOCATIONTYPE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const clientReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_CLIENT_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_CLIENT_SUCCESS:
            return { loading: false, client: action.payload };
        case CONSTANTS.GET_CLIENT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getDevices = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DEVICE_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo.data.token
        }
    };
    const { data } = await axios.get(`${CONSTANTS.BASEURL}device/index`, config);
    // const { data } = await getData('device/index');

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DEVICE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DEVICE_FAIL,
            payload: data.error.errorMessage
        });
    }
};

export const getDeviceType = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DEVICE_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo.data.token
        }
    };
    const { data } = await axios.get(`${CONSTANTS.BASEURL}device-type/index`, config);
    // const { data } = await getData('device/index');

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DEVICE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DEVICE_FAIL,
            payload: data.error.errorMessage
        });
    }
};

export const getLocationType = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DEVICE_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo.data.token
        }
    };
    const { data } = await axios.get(`${CONSTANTS.BASEURL}location/index`, config);
    // const { data } = await getData('device/index');

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DEVICE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DEVICE_FAIL,
            payload: data.error.errorMessage
        });
    }
};

export const getClient = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_DEVICE_REQUEST });

    const {
        userLogin: { userInfo }
    } = getState();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo.data.token
        }
    };
    const { data } = await axios.get(`${CONSTANTS.BASEURL}client/index`, config);
    // const { data } = await getData('device/index');

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DEVICE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_DEVICE_FAIL,
            payload: data.error.errorMessage
        });
    }
};

export const addDevice = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.ADD_DEVICE_REQUEST });

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
    const { data } = await axios.post('client', {}, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_DEVICE_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } else {
        dispatch({
            type: CONSTANTS.ADD_DEVICE_FAIL,
            payload: data.error.errorMessage
        });
    }
};
