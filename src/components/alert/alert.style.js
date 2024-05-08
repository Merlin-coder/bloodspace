import { makeStyles } from '@material-ui/core';

export const alertStyles = makeStyles(
    () => ({
        iconClass: {
            marginTop: '3px',
            fontSize: '17px'
        },
        closeIcon: {
            marginTop: 3,
            fontSize: '20px',
            marginRight: '10px'
        }
    }),
    { index: 1 }
);
