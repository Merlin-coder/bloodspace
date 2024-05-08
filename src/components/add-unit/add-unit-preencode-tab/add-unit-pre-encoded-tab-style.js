import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '20px 25px'
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
        marginBottom: '20px'
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
    test: {
        padding: '10px 0px 50px 0px'
    },

    span: {
        fontWeight: '600',
        color: theme.palette.colors.gray.main
    },
    butt: {
        marginBottom: '50px',
        marginTop: '20px'
    },
    lg: {
        borderRadius: '3px',
        '& .MuiAutocomplete-inputRoot': {
            padding: '4px'
        }
    },
    firstLine: {
        marginBottom: '5px'
    },
    gridLine: {
        // marginBottom: '5px'
    },
    search: {
        marginLeft: 'auto',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    formGroup: {
        marginTop: '-1px'
    },

    selectedButton: {
        backgroundColor: theme.palette.background.dark,
        padding: '3px 5px',
        paddingRight: '15px',
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: theme.palette.background.dark
        }
    },
    disabledButton: {
        backgroundColor: theme.palette.colors.white,
        padding: '3px 5px',
        paddingRight: '15px',
        textTransform: 'capitalize',
        color: theme.palette.colors.gray.dark,
        border: `1px solid ${theme.palette.background.dark}`,
        '&:hover': {
            backgroundColor: theme.palette.colors.white,
            border: `1px solid ${theme.palette.background.dark}`
        }
    },
    countGrid: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: '-20px'
    },
    countSpan: {
        color: theme.palette.primary.main,
        fontSize: '20px',
        marginRight: '10px',
        fontWeight: '500'
    },
    form: {
        width: 'inherit'
    },
    normalSpan: {
        fontSize: '20px',
        color: theme.palette.colors.gray.main
    },
    tableHeadCell: {
        color: 'rgb(0, 67, 114)',
        backgroundColor: 'rgba(0, 0, 0, .1)'
    },
    deviceNo: {
        marginTop: '6px'
    },
    typoDevice: { marginLeft: '20px' },

    margTop: { marginTop: '10px' },
    margBottom: { marginBottom: '30px' },
    clear: {
        display: 'flex',
    }
}));

export { useStyles };
