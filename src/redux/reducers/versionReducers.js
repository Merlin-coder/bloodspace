import CONSTANTS from '../../common/constants';

export const versionReducers = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_VERSION_REQUEST:
            return { versionLoading: true };
        case CONSTANTS.GET_VERSION_SUCCESS:
            return { versionLoading: false, versionData: action.payload };
        case CONSTANTS.GET_VERSION_ERROR:
            return { versionLoading: false, versionError: action.payload };
        default:
            return state;
    }
};
