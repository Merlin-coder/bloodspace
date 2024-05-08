import axios from 'axios';
import CONSTANTS from 'common/constants';

export const getProfileDetails = (userId) => async (dispatch, getState) => {
    dispatch({ type: 'GET_API_DETAILS_FETCH' });
    const {
        userLogin: { userInfo }
    } = getState();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo.data.token
        }
    };
    const { data } = await axios.get(
        `${CONSTANTS.BASEURL}index?collectionName=user&filters=[{"key":"_id","value":${JSON.stringify(userId)}}]`,
        config
    );

    if (data.status === true) {
        dispatch({
            type: CONSTANTS.GET_API_DETAILS_SUCCESS,
            payload: data.data
        });
    } else {
        dispatch({
            type: CONSTANTS.GET_API_DETAILS_FAIL,
            payload: data.error.errorMessage
        });
    }
};
