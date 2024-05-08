const { makeStyles } = require('@material-ui/core');

export const useStyles = makeStyles((theme) => ({
    returnMainGrid: {
        padding: 30,
        height: 'fit-content'
    },
    inputLabel: {
        fontSize: 14,
        marginBottom: 10,
        color: '#777777'
    },
    paperLabel: {
        color: '#777777'
    },
    surnameLabel: {
        // width: 300,
        display: 'flex',
        justifyContent: 'space-between'
    },
    paper: {
        border: '1px solid #d0d0d0',
        padding: 15,
        borderRadius: 10
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
    selectedRoot: {
        backgroundColor: theme.palette.primary.main,

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
    selectedMoreUnitroot: {
        backgroundColor: theme.palette.primary.main,
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

    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    notFound: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        border: '1px solid black'
    },
    patientDetails: {
        color: '#4d4d4d'
    },
    cardTitle: {
        fontSize: 50,
        fontWeight: 500,
        color: theme.palette.primary.main
    },
    selectedCardTitle: {
        fontSize: 50,
        fontWeight: 500,
        color: '#fff'
    },
    moreUnits: {
        fontSize: 30,
        fontWeight: 500,
        color: theme.palette.primary.main
    },
    selectedMoreUnits: {
        fontSize: 30,
        fontWeight: 500,
        color: '#fff'
    },
    cardWarningText: {
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#046474e',
        margin: 5
    },
    addBatchRemovePaper: {
        padding: 20,
        width: 410,
        // maxHeight: 410,
        height: 370,
        borderRadius: 10,
        overflowY: 'auto',
        border: '1px solid #d0d0d0',
        position: 'relative',
        marginBottom: 20
    },
    removePaper: {
        padding: 20,
        width: 410,
        // maxHeight: 410,
        height: 470,
        borderRadius: 10,
        overflowY: 'auto',
        border: '1px solid #d0d0d0',
        position: 'relative'
    },
    counter: {
        fontSize: 50,
        fontWeight: 'bold'
    },
    returnText: {
        color: '#4d4d4d'
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
    successText: {
        // fontWeight: 500,
        color: '#6f6f6f'
    },
    errorSmallPaper: {
        padding: 5,
        // width: 410,
        maxHeight: 410,
        height: 445,
        borderRadius: 10,
        overflowY: 'auto'
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
    tableDiv: {
        background: '#fff',
        boxShadow: 'inset 0 0 0 1px #d0d0d0',
        height: '10.5rem',
        overflow: 'hidden',
        width: '18rem',
        borderLeft: ' 13px solid #0e6cad',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: 50
    },
    table: {
        width: '80%',
        padding: '5px',
        marginTop: '15px',
        marginLeft: '20px'
    }
}));
