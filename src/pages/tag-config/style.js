import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 10
    },
    leftGrid: {},
    rightGrid: {},
    leftPaper: {
        height: '60vh',
        padding: 5,
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    rightPaper: {
        height: '60vh',
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    list: {
        padding: 5,
        border: `1px solid #000`,
        margin: '15px',
        textAlign: 'center',
        borderRadius: '5px'
    },
    listItem: {
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
        border: `2px dashed ${theme.palette.colors.gray.main}`,
        padding: 40,
        width: '90%',
        height: '320px',
        marginLeft: 44
    },
    formContainerText: {
        marginTop: 110
    },
    notdisplayed: {
        display: 'none'
    },
    displayed: {},
    headerIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputEditContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    cardRoot: {
        minWidth: 100,
        height: 40,

        border: '1px solid #000',
        // backgroundColor: '#887'
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    CheckboxPaper: {
        padding: 5,
        marginTop: 20
    },
    CheckboxContainer: {
        marginLeft: 10,
        display: 'flex',
        alignItems: 'center'
    },
    saveBtn: {
        marginTop: 15,
        marginLeft: 1200
    },
    rightHeadingContainer: {
        padding: 10,
        display: 'grid',
        placeItems: 'center',
        marginTop: 5
    },
    rightHeading: {
        color: theme.palette.colors.gray.main
    },
    leftHeadingContainer: {
        display: 'grid',
        placeItems: 'center',
        marginTop: 5
    },
    leftHeading: {
        color: theme.palette.colors.gray.main
    }
}));
