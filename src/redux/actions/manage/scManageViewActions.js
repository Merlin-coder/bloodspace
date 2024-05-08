import axios from 'axios';
import CONSTANTS from 'common/constants';
import pluralize from 'pluralize';
export const getVoucherResponse = (
    collectionName = 'clients',
    value = 'no id',
    urlEndPoint = 'authority',
    search,type
) => async (dispatch, getState) => {
    dispatch({ type: CONSTANTS.VOUCHER_DATA_REQUEST });
    const {
        userLogin: { userInfo }
    } = getState();
    console.log('actions----', urlEndPoint)
    // index?collectionName=clients&filters=[{"key":"authorityId","value":"607ea64705cd93610b3afebc"}]
    //  filtervalue = JSON.stringify([{ key: 'status', value: 'fated' }]);
    //above comment is for example
    const config = {
        headers: {
            'Content-Type': 'application/json',
            authorization: userInfo?.data.token
        }
    };
    const parentId = pluralize?.singular(urlEndPoint);
    if (urlEndPoint === 'assignbatches' || urlEndPoint === 'wastedBatches'  || urlEndPoint === 'transfusedBatches') {
        let parent = 'assignbatche'
        let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=50&filters=[{"key":${JSON.stringify(
            `${parent}Id._id`
        )},"value":${JSON.stringify(value)}}]`;
        if (search !== undefined) url = `${url}&search=${search}`;
        if (type !== undefined) url = `${url}&type=${type}`;
        const { data } = await axios.get(url, config);
        if (data.status === true) {
            dispatch({
                type: CONSTANTS.VOUCHER_DATA_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.VOUCHER_DATA_ERROR,
                payload: data.error
            });
        }
    }
    else if (urlEndPoint === 'wastedUnits' || urlEndPoint  === 'transfusedUnits') {
        let parent = 'refsku'
        let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=50&filters=[{"key":${JSON.stringify(
            `${parent}Id._id`
        )},"value":${JSON.stringify(value)}}]`;
        if (search !== undefined) url = `${url}&search=${search}`;
        if (type !== undefined) url = `${url}&type=${type}`;
        const { data } = await axios.get(url, config);
        if (data.status === true) {
            dispatch({
                type: CONSTANTS.VOUCHER_DATA_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.VOUCHER_DATA_ERROR,
                payload: data.error
            });
        }
    }
    else {
        let url = `${CONSTANTS.BASEURL}index?collectionName=${collectionName}&pageSize=50&filters=[{"key":${JSON.stringify(
            `${parentId}Id._id`
        )},"value":${JSON.stringify(value)}}]`;
        if (search !== undefined) url = `${url}&search=${search}`;
        if (type !== undefined) url = `${url}&type=${type}`;
        const { data } = await axios.get(url, config);
        if (data.status === true) {
            dispatch({
                type: CONSTANTS.VOUCHER_DATA_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: CONSTANTS.VOUCHER_DATA_ERROR,
                payload: data.error
            });
        }
    }
   
};

export const clearVoucher = () => {
    return {
        type: CONSTANTS.CLEAR_VOUCHER
    };
};
