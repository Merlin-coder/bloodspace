import CONSTANTS from 'common/constants';

export const postUserRoleAccessReducers = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.POST_USER_ROLE_ACCESS_REQUEST:
            return { ...state, UserRoleAccessLoading: true };
        case CONSTANTS.POST_USER_ROLE_ACCESS_SUCCESS:
            return { ...state, postUserRoleAccessLoading: false, postUserRoleAccessSuccess: action.payload };
        case CONSTANTS.POST_USER_ROLE_ACCESS_ERROR:
            return { ...state, postUserRoleAccessLoading: false, postUserRoleAccessError: action.payload };
        case CONSTANTS.CLEAR_USER_ROLE_ACCESS_POST:
            return {};
        default:
            return state;
    }
};

export const getCurrentRoleActiveDevicesReducres = (state = {}, action) => {
    switch (action.type) {
        case 'GET_CURRENT_ACTIVE_DEVICES_REQUEST':
            return { ...state, currentActiveDevicesLoading: true };
        case 'GET_CURRENT_ACTIVE_DEVICES_SUCCESS':
            return { ...state, currentActiveDevicesLoading: false, currentActiveDevicesSuccess: action.payload };
        case 'GET_CURRENT_ACTIVE_DEVICES_ERROR':
            return { ...state, currentActiveDevicesLoading: false, currentActiveDevicesError: action.payload };
        case 'CLEAR_CURRENT_ACTIVE_DEVICES':
            return {};
        default:
            return state;
    }
};
