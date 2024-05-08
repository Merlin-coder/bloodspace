export const requestPulloutDialogReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REQUEST_PULLOUT_DIALOG_OPEN':
            return { pullOutDialogOpen: action.payload };
        default:
            return state;
    }
};

export const requestPulloutIDReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REQUEST_PULLOUT_ID':
            return { pulloutId: action.payload };
        default:
            return state;
    }
};
