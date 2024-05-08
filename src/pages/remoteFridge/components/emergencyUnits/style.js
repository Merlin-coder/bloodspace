const { makeStyles } = require('@material-ui/core');

export const useStyles = makeStyles((theme) => ({
    inputLabel: {
        fontSize: 14,
        marginBottom: 10,
        color: '#777777'
    },
    warningPaper: {
        backgroundColor: '#CC1414',
        padding: '20px',
        margin: '5px 0',
        width: '100%',
        height: '450px',
        borderRadius: '10px'
    },
    warningIcon: {
        color: '#CC1414'
    },
    cardWarningText: {
        color: '#CC1414',
        fontWeight: 'bold',
        padding: 10
    },
    errorCounter: {
        fontSize: '65px',
        fontWeight: 500,
        color: '#fff'
    },
    returnErrorText: {
        color: '#fff',
        fontSize: 28
    },
    returnErrorNextText: {
        color: '#fff',
        fontSize: 20
    },
    errorSmallPaper: {
        padding: 20,
        width: 410,
        maxHeight: 410,
        height: 445,
        borderRadius: 10,
        overflowY: 'auto'
    },

    returnMainGrid: {
        padding: 20,
        height: '74vh',
        marginTop: 25
    },
    returnText: {
        color: '#4d4d4d'
    },
    counter: {
        fontSize: 55,
        fontWeight: 500
    },
    tickIcon: {
        color: '#008000'
    },
    successText: {
        // fontWeight: 500,
        color: '#6f6f6f'
    },
    cardRoot: {
        width: 345,
        minHeight: 200,
        padding: 15,
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        borderRadius: 10,
        border: '1px solid #6f6f6f',
        borderLeft: '13px solid #6f6f6f',
        cursor: 'pointer'
    },
    cardHead: {
        color: '#b5b5b5'
    },
    cardDetail: {
        color: '#6f6f6f'
    },
    radio: {
        '&$checked': {
            color: theme.palette.primary.main
        }
    },
    radioBtns: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '5px'
    },
    radioLabels: {
        '& .MuiFormControlLabel-label': {
            fontSize: 12
        }
    },
    checked: {},
    lockContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10
    }
}));
