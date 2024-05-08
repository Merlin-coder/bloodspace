import axios from 'axios';
import CONSTANTS from 'common/constants';

export const getVoucherRowData = (collectionName, pageSize = 0, filters,type) => async (dispatch, getState) => {
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

    let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}`;
    if (pageSize !== undefined) url = `${url}&pageSize=${pageSize}`;
    if (filters !== undefined) url = `${url}&filters=${filters}`;
    if (type !== undefined) url = `${url}&type=${type}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.VOUCHER_ROW_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.VOUCHER_ROW_ERROR,
            payload: data.error
        });
    }
};
