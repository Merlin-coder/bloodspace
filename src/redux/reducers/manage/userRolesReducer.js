import CONSTANTS from 'common/constants';

const userRolesInitialState = { loading: false, userRoles: {}, error: '' };

export const userRolesReducer = (state = userRolesInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_USER_GROUPS_REQUEST:
            return { ...state, loading: true };
        case CONSTANTS.GET_USER_GROUPS_SUCCESS:
            return { ...state, loading: false, userRoles: action.payload };
        case CONSTANTS.GET_USER_GROUPS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
