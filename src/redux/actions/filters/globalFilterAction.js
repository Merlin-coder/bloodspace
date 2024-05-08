import CONSTANTS from 'common/constants';

export const getApplyFilters = (chipData) => {
    return {
        type: CONSTANTS.ADD_FILTER_CHIPS,
        payload: chipData
    };
};

export const resetFilters = () => {
    return { type: CONSTANTS.CLEAR_FILTER_CHIPS };
};
