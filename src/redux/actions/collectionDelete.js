import axios from 'axios';
import CONSTANTS from 'common/constants';

export const deleteCollection = () => async (dispatch, getState) => {
    dispatch({ type: 'DELETE_COLLECTION_REQUEST' });
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

    let url = `${CONSTANTS.BASEURL}index/deleteAllRecords?collectionName=${JSON.stringify([
        'refsku',
        'notification',
        'transaction',
        'activity',
        'batch',
        'swapouts',
        'brokentag',
        'errorreports',
        'remotesessions',
        'requestpullouts',
        'wastedunits',
        'wastedbatches',
        'transfusedunits',
        'transfusedbatches',
        'lisrequests',
        'transfusions',
        'compatabilityslips',

    ])}`;

    const { data } = await axios.delete(url, config);
    if (data.status === true) {
        dispatch({
            type: CONSTANTS.DELETE_COLLECTION_SUCCESS,
            payload: data
        });
    } else {
        dispatch({
            type: CONSTANTS.DELETE_COLLECTION_ERROR,
            payload: data.error
        });
    }
};
export const clearCollectionDataResponse = () => {
    return {
        type: CONSTANTS.CLEAR_COLLECTION_SELECTOR
    };
};
