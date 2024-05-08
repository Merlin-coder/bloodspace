import CONSTANTS from 'common/constants';

export const getDrawerReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.GET_DRAWER_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.GET_DRAWER_SUCCESS:
            return { ...state, loading: false, drawerResponse: action.payload };
        case CONSTANTS.GET_DRAWER_FAIL:
            return { ...state, loading: false, drawerError: action.payload };
        case 'CLEAR_DRAWER_RESPONSE':
            return {};
        default:
            return state;
    }
};

export const openDrawerReducer = (state = {}, action) => {
    switch (action.type) {
        case 'OPEN_DRAWER_MENU':
            return { drawerOpen: action.payload };
        default:
            return state;
    }
};
