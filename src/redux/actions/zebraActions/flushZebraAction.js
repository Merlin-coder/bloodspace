import axios from 'axios';
import CONSTANTS from 'common/constants';
import CommonUserConfig from 'common/services/userConfig';

export const flushZebraAction = () => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.FLUSH_ZEBRA_DATA_REQUEST });
    const config = CommonUserConfig();

    let url = `${CONSTANTS.BASEURL}index/flushdata`;
    const { data } = await axios.delete(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.FLUSH_ZEBRA_DATA_SUCCES,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.FLUSH_ZEBRA_DATA_ERROR,
            payload: data.error
        });
    }
};
