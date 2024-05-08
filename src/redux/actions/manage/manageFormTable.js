import CONSTANTS from '../../../common/constants';
import axios from 'axios';

export const getFormTableData = (collectionName, pageSize, pageNumber, search, filters, sort) => async (
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
            Authorization: userInfo.data.token
        }
    };

    // getData(urlEndPoint)
    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}`;
    if (pageSize !== undefined) url = `${url}&pageSize=${pageSize}`;
    if (pageNumber !== undefined) url = `${url}&pageNumber=${pageNumber}`;
    if (search !== undefined) url = `${url}&search=${search}`;
    if (filters !== undefined) url = `${url}&filters=${filters}`;
    if (sort !== undefined) url = `${url}&sort=${sort}`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_FORM_TABLE_DATA_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_FORM_TABLE_DATA_FAIL,
            payload: data.error.errorMessage
        });
    }
};
