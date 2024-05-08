import CONSTANTS from 'common/constants';

export const addFilterChipData = (chipData) => {
    return {
        type: CONSTANTS.ADD_FILTER_CHIPS,
        payload: chipData
    };
};

export const removeFilterChipData = (chipData) => {
    return {
        type: CONSTANTS.REMOVE_FILTER_CHIPS,
        payload: chipData
    };
};

export const clearFilterChips = () => {
    return { type: CONSTANTS.CLEAR_FILTER_CHIPS };
};
