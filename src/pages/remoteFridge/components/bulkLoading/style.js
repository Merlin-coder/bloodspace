const { makeStyles } = require('@material-ui/core');

export const useStyles = makeStyles((theme) => ({
    root: {
        width: 220,
        minHeight: 240,
        padding: 10,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    },

    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    returnMainGrid: {
        padding: 50
    },
    cardTitle: {
        fontWeight: 400,
        fontSize: 19
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
    iconContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: '50%',
        width: 50,
        height: 50
    },
    actionGrid: {
        margin: 20
    },
    returnText: {
        color: '#4d4d4d'
    },
    returnErrorText: {
        color: '#fff',
        fontSize: 28
    },
    returnErrorTextBulk: {
        color: '#fff',
        fontSize: 24
        // fontWeight: 'bold'
    },
    returnErrorNextText: {
        color: '#fff',
        fontSize: 20
    },
    counter: {
        fontSize: '65px',
        fontWeight: 500
    },
    errorCounter: {
        fontSize: '65px',
        fontWeight: 500,
        color: '#fff'
    },
    tickIcon: {
        color: '#008000'
    },
    successText: {
        color: '#6f6f6f'
    },
    cardRoot: {
        width: 345,
        minHeight: 200,
        padding: 15,
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        borderRadius: 10,
        border: '1px solid #6f6f6f',
        borderLeft: '13px solid #0e6cad',
        cursor: 'pointer'
    },
    cardRootError: {
        width: 372,
        padding: 15,
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        borderRadius: 10,
        borderLeft: '13px solid #CC1414',
        cursor: 'pointer',
        marginBottom: '10px'
    },
    cardHead: {
        color: '#b5b5b5'
    },
    cardDetail: {
        color: '#6f6f6f'
    },
    errorSmallPaper: {
        padding: 20,
        // width: 410,
        maxHeight: 410,
        height: 445,
        borderRadius: 10,
        overflowY: 'auto'
    },
    errorSmallPaper2: {
        padding: 20,
        // width: 495,
        maxHeight: 410,
        height: 445,
        borderRadius: 10,
        overflowY: 'auto'
    },
    cardWarningText: {
        color: '#CC1414',
        fontWeight: 'bold'
    },
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 204, 204,0.4)',
        padding: 8,
        borderRadius: 10,
        border: '1px solid #CC1414'
    },
    // errorIcon: {
    //     color: '#b33939',
    //     fontSize: 'small'
    // },
    errorMessage: {
        color: '#b33939',
        fontWeight: 500,
        fontSize: '14px'
    },
    lockContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10
    }
}));
