import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20
    },
    leftGrid: {},
    rightGrid: {},
    leftPaper: {
        height: '70vh',
        backgroundColor: theme.palette.primary.main,
        padding: 10
    },
    rightPaper: {
        height: '70vh',
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    list: {
        padding: 5,
        border: `1px solid #fff`,
        margin: '20px',
        textAlign: 'center',
        borderRadius: '5px'
    },
    listItem: {
        color: '#fff',
        cursor: 'pointer'
        // fontWeight: 500,
    },
    formGrid: {
        padding: 35
    },
    inputLabel: {
        fontSize: '14px',
        marginBottom: 10
    },
    inputContainer: {
        display: 'flex',
        direction: 'column'
    },
    inputField: {
        // marginBottom: 10,
        position: 'relative'
    },
    headerTypoGraphy: {
        fontWeight: 600,
        textTransform: 'capitalize',
        marginBottom: 10
    },
    headerContainer: {
        border: `2px dashed ${theme.palette.primary.main}`,
        padding: 15,
        width: '100%'
    },
    formContainer: {
        border: `2px dashed ${theme.palette.primary.main}`,
        padding: 40,
        width: '100%',
        height: '350px',
        marginTop: 20
    },
    formContainerText: {
        marginTop: 110
    },
    notdisplayed: {
        display: 'none'
    },
    displayed: {
        display: 'flex',
        marginTop: -10
    },
    headerIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputEditContainer: {
        display: 'flex',
        alignItems: 'center'
    }
}));
