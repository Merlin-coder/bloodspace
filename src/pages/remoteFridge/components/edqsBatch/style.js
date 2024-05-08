const { makeStyles } = require('@material-ui/core');

export const useStyles = makeStyles((theme) => ({
    cardHead: {
        color: '#b5b5b5'
    },
    cardDetail: {
        color: '#6f6f6f'
    },
    returnErrorText: {
        color: '#fff',
        fontSize: 28
    },
    returnErrorNextText: {
        color: '#fff',
        fontSize: 20
    },
    errorCounter: {
        fontSize: '65px',
        fontWeight: 500,
        color: '#fff'
    },
    paper: {
        border: '1px solid #d0d0d0',
        padding: 15,
        borderRadius: 10
    },
    paperLabel: {
        color: '#777777'
    },
    patientDetails: {
        color: '#4d4d4d'
    },
    root: {
        width: 110,
        height: 150,
        padding: 10,
        border: '1px solid #d0d0d0',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 10px',
        borderRadius: 10,
        cursor: 'pointer',
        '&:hover': {
            boxShadow: 'rgba(14,108,173, 0.8)0px 25px 50px -12px'
            // backgroundColor: 'rgba(14,108,173,0.0995)'
        }
    },
    cardTitle: {
        fontSize: 50,
        fontWeight: 500,
        color: theme.palette.primary.main
    },
    moreUnitroot: {
        width: 200,
        height: 150,
        padding: 10,
        border: '1px solid #d0d0d0',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 10px',
        borderRadius: 10,
        cursor: 'pointer',
        '&:hover': {
            boxShadow: 'rgba(14,108,173, 0.8)0px 25px 50px -12px'
            // backgroundColor: 'rgba(14,108,173,0.0995)'
        }
    },
    moreUnits: {
        fontSize: 30,
        fontWeight: 500,
        color: theme.palette.primary.main
    },
    inputLabel: {
        fontSize: 14,
        marginBottom: 10,
        color: '#777777'
    },
    removePaper: {
        padding: 30,
        width: 410,
        // maxHeight: 410,
        height: 500,
        borderRadius: 10,
        overflowY: 'auto',
        border: '1px solid #d0d0d0',
        position: 'relative',
        marginLeft: 25
    },
    cardWarningText: {
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#046474e',
        marginBottom: 15,
        marginLeft: 20
    },
    warningIcon: {
        color: '#CC1414'
    },
    successText: {
        color: '#6f6f6f'
    },
    warningPaper: {
        backgroundColor: '#CC1414',
        padding: '20px',
        margin: '5px 0',
        width: '100%',
        borderRadius: '10px',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    warningButton: {
        color: theme.palette.colors.red
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
    smalldetailTitle: {
        fontSize: '20px',
        fontWeight: '600'
    },
    cardMainText: {
        fontSize: '20px',
        fontWeight: '480',
        color: theme.palette.primary.main
    },
    cardValueText: {
        fontSize: '50px',
        fontWeight: '650',
        color: theme.palette.primary.main
    },
    cardHeader: {
        marginLeft: '10px',
        marginRight: '10px',
        minWidth: '90%'
    },
    cardNormal: {
        height: '55vh',
        overflow: 'auto',
        padding: '20px 7px',
        minWidth: '90%',
        boxShadow: '0 0 25px rgba(0,0,0,0.1)',
        backgroundColor: theme.palette.colors.white,
        borderRadius: '10px',
        marginLeft: '10px',
        marginRight: '10px'
    },
    cardSelected: {
        padding: '20px 25px',
        minWidth: '210px',
        boxShadow: '0 0 25px rgba(0,0,0,0.1)',
        backgroundColor: theme.palette.colors.blue.veryLight,
        border: `solid 2px ${theme.palette.primary.main}`,
        borderRadius: '10px'
    },
    centerColumn: {
        height: 100
    },

    smallCardIcon: {
        fontSize: '35px',
        marginRight: '10px'
    },
    tipsTypo: {
        fontSize: 26,
        fontWeight: 500,
        color: theme.palette.colors.gray.main
    },
    emptyCard: {
        marginLeft: '10px',
        marginRight: '10px',
        minWidth: '90%',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    linkText: {
        cursor: 'pointer'
    }
}));
