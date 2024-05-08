import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
    (theme) => ({
        formLoader: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        },
        displayConfigListContainer: {
            padding: 2,
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
                borderRadius: '5px'
            }
        },
        displayConfigList: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        checkboxAndListContainer: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 6
        },
        nofields: {
            marginLeft: 300,
            marginTop: 35,
            fontWeight: 'bold',
            color: '#f00'
        },
        nofieldsButton: {
            marginLeft: 300,
            marginTop: 10
        },
        noDC: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }),
    { index: 1 }
);
