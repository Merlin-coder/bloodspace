import CONSTANTS from '../../common/constants';

export const userAccessCodesReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.CODES_RECEIVED:
            return { drawerCodes: action.payload };

        default:
            return state;
    }
};

export const userSubMenuCodesReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.SUB_MENU_CODES_RECEIVED:
            return { subMenuAccessCodes: action.payload };

        default:
            return state;
    }
};
//CONSTANTS.ARRAY_OF_MENU_MODULES,
export const accessblePathsReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.ARRAY_OF_PATHS:
            return { accessablePaths: action.payload };

        default:
            return state;
    }
};

export const accessbleMenuModulesReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.ARRAY_OF_MENU_MODULES:
            return { accessbleMenuNames: action.payload };

        default:
            return state;
    }
};

//CONSTANTS.DRAWER_RESPONSE_STORE

export const storeDrawerResponseReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.DRAWER_RESPONSE_STORE:
            return { drawerData: action.payload };

        default:
            return state;
    }
};
