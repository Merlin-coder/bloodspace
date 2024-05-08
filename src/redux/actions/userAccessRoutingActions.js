import CONSTANTS from 'common/constants';

export const getUserAccessDrawerCodes = (codes) => {
    return {
        type: CONSTANTS.CODES_RECEIVED,
        payload: codes
    };
};

export const getSubMenuDrawerCodes = (codes) => {
    return {
        type: CONSTANTS.SUB_MENU_CODES_RECEIVED,
        payload: codes
    };
};

export const getAccessblePaths = (codes) => {
    return {
        type: CONSTANTS.ARRAY_OF_PATHS,
        payload: codes
    };
};

export const getAccessbleMenuModules = (codes) => {
    return {
        type: CONSTANTS.ARRAY_OF_MENU_MODULES,
        payload: codes
    };
};
export const storeDrawerResponseAction = (codes) => {
    return {
        type: CONSTANTS.DRAWER_RESPONSE_STORE,
        payload: codes
    };
};
