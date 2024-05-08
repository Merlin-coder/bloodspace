import CONSTANTS from '../../common/constants';

export const appLoadingReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GLOBAL_APP_LOADER':
            return { appLoading: action.payload };
        default:
            return state;
    }
};
