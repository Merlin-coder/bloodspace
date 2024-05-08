import CONSTANTS from 'common/constants';

const bloodGrouopData = { loading: false, productCodes: {}, error: null };

export const getBloodGroupReducer = (state = bloodGrouopData, action) => {
    switch (action.type) {
        case CONSTANTS.GET_BLOOD_GROUPS_REQUEST:
            return { loading: true };
        case CONSTANTS.GET_BLOOD_GROUPS_SUCCESS:
            return { bloodGroups: action.payload };
        case CONSTANTS.GET_BLOOD_GROUPS_ERROR:
            return { error: action.payload };
        default:
            return state;
    }
};
