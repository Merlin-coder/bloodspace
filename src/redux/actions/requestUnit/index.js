export const requestPulloutDialogOpen = (open) => {
    localStorage.setItem('dialogOpenLocalStore', open);
    console.log(typeof open, 'inAction');
    return {
        type: 'REQUEST_PULLOUT_DIALOG_OPEN',
        payload: open
    };
};

export const requestPullOutId = (id) => {
    return {
        type: 'REQUEST_PULLOUT_ID',
        payload: id
    };
};

export const requestErrorDialogOpen = (open) => {
    localStorage.setItem('dialogOpenLocalStore', open);
    console.log(typeof open, 'inAction');
    return {
        type: 'REQUEST_ERROR_DIALOG_OPEN',
        payload: open
    };
};
