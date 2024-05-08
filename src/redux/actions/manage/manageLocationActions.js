import axios from 'axios';
import CONSTANTS from 'common/constants';

const userLogin = localStorage?.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const config = {
    headers: {
        'Content-Type': 'application/json',
        authorization: userLogin?.data.token
    }
};

export const updateLocation = (editData) => async (dispatch) => {
    dispatch({ type: CONSTANTS.UPDATE_LOCATION_REQUEST });
    const { data } = await axios.put(`${CONSTANTS.BASEURL}location`, editData);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.UPDATE_LOCATION_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.ADD_LOCATION_FAIL,
            payload: data?.error?.errorMessage
        });
    }
};

export const deleteLocation = (id) => async (dispatch) => {
    dispatch({ type: CONSTANTS.DELETE_LOCATION_REQUEST });

    const { data } = await axios.delete(`${CONSTANTS.BASEURL}location?_id=${id}`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_LOCATION_REQUEST,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.DELETE_LOCATION_FAIL,
            payload: data.error.errorMessage
        });
    }
};

export const getLocationType = () => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_LOCATION_TYPE_REQUEST });

    const { data } = await axios.get(`${CONSTANTS.BASEURL}location-type/index`, config);

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_LOCATION_TYPE_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_LOCATION_TYPE_FAIL,
            payload: data.message
        });
    }
};

export const getLocations = (pageSize, pageNumber, search, filters, sort) => async (dispatch) => {
    dispatch({ type: CONSTANTS.GET_LOCATION_REQUEST });
    // getData(urlEndPoint)
    const { data } = await axios.get(
        `${CONSTANTS.BASEURL}location/index?search="${search}"&sort=${sort}&filters=${filters}&pageSize=${pageSize}&pageNumber=${pageNumber}&screen=SC1001`,
        config
    );

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_LOCATION_SUCCESS,
            payload: data
        });
        // console.log(data,'responseJson')
        localStorage.setItem('tableResponse', JSON.stringify(data));
        if (pageNumber === 1) {
            localStorage.setItem('displayConfig', JSON.stringify(data?.displayConfigData?.displayConfig));
        }
    } else {
        dispatch({
            type: CONSTANTS.GET_LOCATION_FAIL,
            payload: data.error
        });
    }
};

export const addLocation = (name, code, description, locationTypeId) => async (dispatch) => {
    dispatch({ type: CONSTANTS.ADD_LOCATION_REQUEST });

    const { data } = await axios.post(
        `${CONSTANTS.BASEURL}location`,
        { name, code, description, locationTypeId },
        config
    );

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.ADD_LOCATION_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.ADD_LOCATION_FAIL,
            payload: data?.error
        });
    }
};
