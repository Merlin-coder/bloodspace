import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '40px 25px'
    },

    textField: {
        height: '0px'
    },
    inputLabel: {
        fontSize: '13px',
        fontWeight: '400',
        color: theme.palette.colors.gray.main,
        marginBottom: '5px'
    },
    inputRow: {
        marginBottom: '0px',
        flexGrow: 1
    },
    gap: {
        gap: '30px'
    },
    tips: {
        fontSize: '23px',
        color: theme.palette.colors.gray.main,
        paddingBottom: '6px'
    },
    body: {
        fontSize: '15px',
        color: theme.palette.colors.gray.dark,
        lineHeight: '1.4'
    },
    or: {
        fontSize: '15px',
        color: theme.palette.colors.gray.dark,
        padding: '8px 0px'
    },

    span: {
        fontWeight: '600',
        color: theme.palette.colors.gray.main
    },
    butt: {
        marginBottom: '50px',
        marginTop: '20px'
    },
    test: {
        padding: '25px 0px'
    },
    lg: {
        borderRadius: '3px',
        '& .MuiAutocomplete-inputRoot': {
            padding: '4px'
        }
    },
    form: {
        width: 'inherit'
    },
    buttonSpan: {
        fontSize: '12.4px'
    },
    buttonGrid: { marginRight: '30px', paddingBottom: '20px' },
    tips1: {
        padding: '10px 32px !important'
    }
}));

export { useStyles };
