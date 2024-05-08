import { makeStyles } from '@material-ui/core';

export const useCardStyles = makeStyles(
    () => ({
        actionButton: {
            display: 'flex',
            flexDirection: 'row',
            // alignItems:"flex-end",
            justifyContent: 'space-around'
        },
        mediaStyles: {
            paddingTop: 5
        },
        cardButton: {
            marginRight: '10px'
        }
    }),
    { index: 1 }
);
