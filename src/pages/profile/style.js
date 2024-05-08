import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    section: {
        display: 'grid',
        gridAutoFlow: 'column',
        width: '60%',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'minmax(48px, max-content) 0px auto'
        },
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'minmax(220px, max-content) auto'
        },
        border: '1px solid #dbdbdb'
    },
    permanentDrawerPaper: {
        borderRight: '1px solid #dbdbdb !important',
        left: 'unset !important',
        top: 'unset !important',
        position: 'relative !important'
    },
    permanentDrawerRoot: {
        height: '100% !important',
        '& div': {
            zIndex: 'unset !important'
        }
    },
    listItemSelected: {
        borderLeft: '2px solid black',
        '& span': {
            fontWeight: '600 !important'
        }
    },
    listItemButton: {
        paddingTop: '10px !important',
        paddingBottom: '10px !important'
    },
    container: {
        background: '#ffffff',
        display: 'grid',
        justifyContent: 'start',
        padding: '30px !important'
    },
    inputField: {
        marginBottom: 8,
        position: 'relative'
    },
    inputLabel: {
        fontSize: '14px',
        marginBottom: 7
    },
    selectAlert: {
        color: '#f00',
        fontSize: 12,
        marginLeft: 14,
        // marginBottom: 10,
        position: 'absolute'
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
    submitBtn: {
        marginTop: 5
    },
    profileLoader: {
        marginLeft: 220
    }
}));
