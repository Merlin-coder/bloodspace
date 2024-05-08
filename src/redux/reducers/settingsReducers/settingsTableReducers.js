import CONSTANTS from 'common/constants';

let initialTableSettingsState = {
    settingsTableLoading: false,
    settingsTableResponse: {},
    settingsTableError: []
}

export const getTableSettingsReducer = (state = initialTableSettingsState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_SETTINGS_TABLE_REQUEST:
            return { ...state, settingsTableLoading: true };
        case CONSTANTS.GET_SETTINGS_TABLE_SUCCESS:
            return { ...state, loading: false, settingsTableResponse: action.payload };
        case CONSTANTS.GET_SETTINGS_TABLE_FAIL:
            return { ...state, loading: false, settingsTableError: action.payload };
        case CONSTANTS.CLEAR_SETTINGS_TABLE:
            return initialTableSettingsState;
        default:
            return state;
    }
};
