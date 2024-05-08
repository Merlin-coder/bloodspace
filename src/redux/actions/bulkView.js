import axios from 'axios';
import CONSTANTS from 'common/constants';

export const getBulkView = () => async (dispatch, getState) => {
    dispatch({ type: 'BULK_VIEW_REQUEST' });
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

    let url = `${CONSTANTS.BASEURL}index?filters=[{"key":"code","value":"BS-DC-1054"}]&collectionName=displayconfig`;

    const { data } = await axios.get(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.BULK_VIEW_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.BULK_VIEW_ERROR,
            payload: data.error
        });
    }
};
