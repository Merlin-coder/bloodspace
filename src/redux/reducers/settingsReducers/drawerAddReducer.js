export const getAddDrawerReducer = (state = {}, action) => {
    switch (action.type) {
        case 'POST_ADD_DRAWER_REQUEST':
            return { ...state, loading: true };
        case 'POST_ADD_DRAWER_SUCCESS':
            return { ...state, loading: false, addDrawerSucess: action.payload };
        case 'POST_ADD_DRAWER_ERROR':
            return { ...state, loading: false, addDrawerError: action.payload };
        case 'CLEAR_ADD_DRAWER_RESPONSE':
            return {};
        default:
            return state;
    }
};
