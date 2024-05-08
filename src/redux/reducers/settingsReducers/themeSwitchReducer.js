import CONSTANTS from '../../../common/constants';

export const themeSwitchReducer = (state = {}, action) => {
    switch (action.type) {
        case CONSTANTS.SET_THEME_COLOR:
            return { ...state, themeColor: action.payload };

        default:
            return state;
    }
};
