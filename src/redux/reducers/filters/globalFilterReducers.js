import CONSTANTS from 'common/constants';

const filterChipInitialState = {};

export const getApplyFiltersReducers = (state = filterChipInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_FILTER_CHIPS:
            return action.payload;
        case CONSTANTS.CLEAR_FILTER_CHIPS:
            return { chipData: [] };
        default:
            return state;
    }
};
