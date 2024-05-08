import CONSTANTS from '../../common/constants';

export const voucherDisplayConf = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.VOUCHER_ROW_SUCCESS:
            return { voucherRow: action.payload };
        case CONSTANTS.VOUCHER_ROW_ERROR:
            return { error: action.payload };
        default:
            return state;
    }
};
