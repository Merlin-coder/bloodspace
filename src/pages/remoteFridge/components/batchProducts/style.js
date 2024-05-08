const { makeStyles } = require('@material-ui/core');

export const useStyles = makeStyles((theme) => ({
    // cardRoot: {
    //     width: 345,
    //     minHeight: 172,
    //     padding: 15,
    //     boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    //     borderLeft: '13px solid #0e6cad',
    //     border: '1px solid #0e6cad',
    //     cursor: 'pointer',
    //     // backgroundColor: '#f2f2f2',
    //     position: 'relative',
    //     borderRadius: '10px',
    //     zIndex: 0
    //     // '&:before': {
    //     //     content: "''",
    //     //     position: 'absolute',
    //     //     top: 155,
    //     //     right: '-4px',
    //     //     border: '1px solid #fff',
    //     //     borderTop: '20px solid #fff',
    //     //     borderLeft: '20px solid #fff',
    //     //     borderRadius: '50%',
    //     //     zIndex: 9999,
    //     //     width: 0,

    //     // },
    //     // '&:after': {
    //     //     content: "''",
    //     //     position: 'absolute',
    //     //     top: 0,
    //     //     right: '-4px',
    //     //     border: '1px solid #fff',
    //     //     borderBottom: '20px solid #fff',
    //     //     borderLeft: '20px solid #fff',
    //     //     borderRadius: '50%',
    //     //     zIndex: 9990,
    //     //     width: 0
    //     // }
    // },
    // holes: {},
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
        height: '450px',
        borderRadius: '10px'
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
    checked: {}
}));
