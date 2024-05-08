import CONSTANTS from 'common/constants';
const initialVoucher = { voucherLoading: 'false', voucherData: {}, error: null };

export const getVoucherReducer = (state = initialVoucher, action) => {
    switch (action.type) {
        case CONSTANTS.VOUCHER_DATA_REQUEST:
            return { voucherLoading: true };
        case CONSTANTS.VOUCHER_DATA_SUCCESS:
            return { voucherLoading: false, voucherData: action.payload };
        case CONSTANTS.VOUCHER_DATA_ERROR:
            return { voucherLoading: false, error: action.payload };
        default:
            return state;
    }
};
