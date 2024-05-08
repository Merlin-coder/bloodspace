import axios from 'axios';
import CONSTANTS from 'common/constants';

export const getUserAccessData = (filters) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_USER_ACCESS_REQUEST });
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

    let url = `${CONSTANTS.BASEURL}index?collectionName=${'useraccess'}`;
    if (filters !== undefined) url = `${url}&filters=${filters}`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_USER_ACCESS_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_USER_ACCESS_ERROR,
            payload: data.error
        });
    }
};
