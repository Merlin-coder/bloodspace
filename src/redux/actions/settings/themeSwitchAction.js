import CONSTANTS from '../../../common/constants';

export function themeSwitch(color) {
    localStorage.setItem('themeColor', JSON.stringify(color));
    return {
        type: CONSTANTS.SET_THEME_COLOR,
        payload: color
    };
}
