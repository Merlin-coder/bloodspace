import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    typoGraphy: {
        fontWeight: 600,
        textTransform: 'capitalize'
    },
    root: {
        width: 450,
        height: 470,
        borderRadius: '10px',
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main
    },
    logoContainer: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '90px',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px'
    },
    inputLabel: {
        marginBottom: 5,
        fontSize: '14px',
        color: theme.palette.label.main
    },
    error: {
        color: theme.palette.colors.red,
        marginLeft: 80
    },
    submitBtn: {
        width: 285,
        marginTop: 15,
        padding: '15px'
    },
    signInGrid: {
        marginLeft: 310,
        marginTop: 8
    },
    loginCardGrid: {
        marginTop: 30
    },
    passwordInputBox: {
        marginTop: 35
    },
    loginBtnContainer: {
        marginTop: 25
    },
    copyrightText: {
        color: theme.palette.label.main,
        marginTop: 20,
        marginBottom: 15
    },
    sessionText: {
        marginTop: 40
    }
}));
