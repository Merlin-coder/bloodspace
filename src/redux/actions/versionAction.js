import axios from 'axios';
import CONSTANTS from 'common/constants';

export const getVersion = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.GET_VERSION_REQUEST });
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

    let url = `${CONSTANTS.BASEURL}index/version`;
    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_VERSION_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_VERSION_ERROR,
            payload: data.error
        });
    }
};
