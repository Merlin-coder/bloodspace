import CONSTANTS from 'common/constants';

const filterChipInitialState = { chipData: [] };

export const getFiltersCriteriaReducer = (state = filterChipInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_FILTER_CHIPS:
            return { chipData: action.payload };
        case CONSTANTS.REMOVE_FILTER_CHIPS:
            return { chipData: action.payload };
        case CONSTANTS.CLEAR_FILTER_CHIPS:
            return filterChipInitialState;
        default:
            return state;
    }
};
