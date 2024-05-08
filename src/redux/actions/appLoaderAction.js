import CONSTANTS from 'common/constants';

export const getAppLoader = (state) => {
    return {
        type: 'GLOBAL_APP_LOADER',
        payload: state
    };
};
