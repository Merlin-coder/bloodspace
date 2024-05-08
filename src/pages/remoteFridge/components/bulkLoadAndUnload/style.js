import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
    (theme) => ({
        loaded: {
            backgroundColor: 'blue',
            fontSize: 'big'
        },
        unloaded: {
            backgroundColor: 'blue',
            fontSize: 'big'
        },
    }),
    { index: 1 }
);
