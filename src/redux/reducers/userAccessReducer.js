import CONSTANTS from '../../common/constants';

export const userAccessReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_USER_ACCESS_REQUEST:
            return { userAccessLoading: true };
        case CONSTANTS.GET_USER_ACCESS_SUCCESS:
            return { userAccessLoading: false, userAccessData: action.payload };
        case CONSTANTS.GET_USER_ACCESS_ERROR:
            return { userAccessLoading: false, userAccessError: action.payload };
        default:
            return state;
    }
};
