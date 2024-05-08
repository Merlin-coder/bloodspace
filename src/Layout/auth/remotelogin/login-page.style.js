import { makeStyles } from '@material-ui/core';

export const useLoginPageStyles = makeStyles(
    (theme) => ({

        tipsTypo: {
            fontSize: 36,
            fontWeight: 500,
            color: theme.palette.primary.main
        },
        tipsTypoSmall: {
            fontSize: 20,
            fontWeight: 400,
            color: theme.palette.colors.gray.main
        },
        tipsTypoBlue: {
            fontSize: 26,
            fontWeight: 500,
            color: theme.palette.primary.main
        },
        sideBar: {
            backgroundColor: '#fff',
            width: '500px',
            display: 'flex',
            margin: '140px auto',
            borderRadius: '50px'
        },

    }),

    { index: 1 }
);