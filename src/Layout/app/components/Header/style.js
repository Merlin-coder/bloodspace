import { makeStyles } from '@material-ui/core';

export const useHeaderStyles = makeStyles((theme) => ({
    appBarExpandIcon: {
        marginTop: -19,
        marginLeft: '8px',
        color: theme.palette.primary.main,
        [theme.breakpoints.down('sm')]: {
            marginTop: -13,
            fontSize: '18px',
            marginLeft: '5px'
        }
    },
    loginList: {
        color: theme.palette.colors.black,
        paddingLeft: theme.spacing(3),
        cursor: 'pointer',
        right: -20,
        '@media (max-width: 549px)': {
            paddingLeft: theme.spacing(0),
            right: -20
        }
    },
    userName: {
        color: theme.palette.colors.gray.dark,
        fontWeight: 'bold',
        fontSize: '16px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px'
        }
    },

    role: {
        color: theme.palette.colors.gray.dark,
        marginLeft: 65,
        fontSize: '12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
            marginLeft: 47
        },
        '@media (max-width: 549px)': {
            fontSize: '8px'
        }
    },
    simpleMenu: {
        padding: '10px 20px'
    },
    nestedMenu: {
        padding: '0px 3px'
    },
    primary: {
        backgroundColor: theme.palette.colors.main,
        borderRadius: '50%',
        height: '1rem',
        width: '1rem'
    },
    magenta: {
        backgroundColor: theme.palette.colors.magenta,
        borderRadius: '50%',
        height: '1rem',
        width: '1rem'
    },
    red: {
        backgroundColor: theme.palette.colors.red,
        borderRadius: '50%',
        height: '1rem',
        width: '1rem'
    },
    green: {
        backgroundColor: theme.palette.colors.green,
        borderRadius: '50%',
        height: '1rem',
        width: '1rem'
    },
    pink: {
        backgroundColor: theme.palette.colors.pink,
        borderRadius: '50%',
        height: '1rem',
        width: '1rem'
    },
    indigo: {
        backgroundColor: theme.palette.colors.indigo,
        borderRadius: '50%',
        height: '1rem',
        width: '1rem'
    },
    purple: {
        backgroundColor: theme.palette.colors.purple,
        borderRadius: '50%',
        height: '1rem',
        width: '1rem'
    },
    dark: {
        backgroundColor: theme.palette.colors.dark,
        borderRadius: '50%',
        height: '1rem',
        width: '1rem'
    },
    subList: {
        display: 'flex',
        flexDirection: 'column'
    },
    footer: {},
    userNameToolbar: {
        color: theme.palette.colors.gray.dark,
        fontWeight: '700',
        fontSize: '1rem',
        textAlign: 'right'
    },
    usertypeToolbar: {
        color: theme.palette.colors.gray.dark,
        marginLeft: 30,
        fontSize: '0.8rem',
        textAlign: 'right'
    },
    userListToolbar: {
        marginLeft: -20,
        fontWeight: '800'
    },
    logoutIcon: {
        marginRight: 8
    },
    accountIcon: {
        marginRight: 8
    },
    paletteIcon: {
        marginRight: 5
    },
    toolbarListText: {
        marginLeft: -25
    },
    nested: {
        marginLeft: 10
    }
}));
