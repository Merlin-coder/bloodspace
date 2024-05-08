import axios from 'axios';
import CONSTANTS from 'common/constants';

export const getStocksData = (search, filters) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_STOCKS_DATA_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index/stock`;
    if (search !== undefined) url = `${url}?search=${search}`;
    if (filters !== undefined) url = `${url}?filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_STOCKS_DATA_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_STOCKS_DATA_FAIL,
            payload: data.error
        });
    }
};
export const getFilteredStocksData = (filters) => async (dispatch, getState) => {
    dispatch({ type: 'GET_FILTERED_STOCKS_DATA_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index/stock`;
    if (filters !== undefined) url = `${url}?filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_FILTERED_STOCKS_DATA_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_FILTERED_STOCKS_DATA_FAIL',
            payload: data.error
        });
    }
};
export const getFilteredLocationsData = (filters) => async (dispatch, getState) => {
    dispatch({ type: 'GET_FILTERED_LOCATIONS_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index/fstock?groupBy=location`;
    if (filters !== undefined) url = `${url}&filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_FILTERED_LOCATIONS_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_FILTERED_LOCATIONS_FAIL',
            payload: data.error
        });
    }
};
export const getFilteredDevicesData = (filters) => async (dispatch, getState) => {
    dispatch({ type: 'GET_FILTERED_DEVICES_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index/fstock?groupBy=device`;
    if (filters !== undefined) url = `${url}&filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_FILTERED_DEVICES_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_FILTERED_DEVICES_FAIL',
            payload: data.error
        });
    }
};
export const getStockFilters = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_STOCKS_FILTERES_REQUEST' });
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
    let url = `${CONSTANTS.BASEURL}index/ffstock`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_STOCKS_FILTERES_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_STOCKS_FILTERES_FAIL',
            payload: data.error
        });
    }
};
export function setScreeenIndex(index) {
    return {
        type: 'SET_STOCK_SCREEN',
        payload: index
    };
}
export const getLFStocksData = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_LFSTOCKS_DATA_REQUEST' });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };

    let url = `${CONSTANTS.BASEURL}index/lfstock`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: 'GET_LFSTOCKS_DATA_SUCCESS',
            payload: data
        });
    } else {
        dispatch({
            type: 'GET_LFSTOCKS_DATA_FAIL',
            payload: data.error
        });
    }
};
