import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    sideBar: {
        height: 'fit-content',
        backgroundColor: '#fff',
        width: '300px',
        padding: '15px 25px !important',
        margin: '0 auto',
        marginTop: '48px'
    },
    firstDiv: {
        padding: '10px 4px',
        // maxWidth: '1600px',
        margin: '0 auto',
        marginTop: '30px',
        minWidth: 100
    },
    tipsTypoBlue: {
        fontSize: 26,
        fontWeight: 500,
        color: theme.palette.primary.main
    },
    tipsTypo: {
        fontWeight: 400,
        color: theme.palette.colors.gray.main
    },
    rootDisabled: {
        // width: 220,
        width: '100%',
        minHeight: 200,
        padding: 10,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        borderRadius: 10
        // cursor: 'pointer'
        // '&:hover': {
        //     boxShadow: 'rgba(14,108,173, 0.8)0px 25px 50px -12px'
        //     // backgroundColor: 'rgba(14,108,173,0.0995)'
        // }
    },
    root: {
        // width: 220,
        width: '100%',
        minHeight: 200,
        padding: 10,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        borderRadius: 10,
        border: `solid 2px ${theme.palette.colors.blue.light}`,
        cursor: 'pointer',
        '&:hover': {
            boxShadow: 'rgba(14,108,173, 0.8)0px 25px 50px -12px'
            // backgroundColor: 'rgba(14,108,173,0.0995)'
        }
    },
    root2: {
        width: 220,
        minHeight: 100,
        padding: 10,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        borderRadius: 10,
        cursor: 'pointer',
        '&:hover': {
            boxShadow: 'rgba(14,108,173, 0.8)0px 25px 50px -12px'
            // backgroundColor: 'rgba(14,108,173,0.0995)'
        }
    },
    rootCard3: {
        // width: 980,
        width: '100%',
        height: 100,
        padding: 10,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        borderRadius: 10,
        border: `solid 2px ${theme.palette.colors.blue.light}`,
        cursor: 'pointer',
        '&:hover': {
            boxShadow: 'rgba(14,108,173, 0.8)0px 25px 50px -12px'
            // backgroundColor: 'rgba(14,108,173,0.0995)'
        },
        diplay: 'flex',
        marginTop: 10
    },

    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    returnMainGrid: {
        padding: 30,
        height: 'fit-content'
    },
    cardTitle: {
        display: 'flex',
        fontWeight: 400,
        fontSize: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorBox: {
        backgroundColor: '#CC1414',
        padding: '1px 20px',
        margin: '5px 0',
        width: '99%',
        marginRight: 'auto',
        borderRadius: '10px'
    },
    icon: {
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
        height: 250,
        flexWrap: 'wrap'
    },
    paper: {
        marginTop: 25,
        borderRadius: 10,
        height: 'auto',
        boxSizing: 'border-box'
    },
    smalldetailCardMain: {
        padding: '10px 15px',
        minWidth: '210px',
        boxShadow: '0 0 25px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        minHeight: '80px'
    },
    cardMainText: {
        fontSize: '22px',
        fontWeight: '500',
        color: theme.palette.primary.main
    },
    smallCardIcon: {
        fontSize: '35px',
        marginLeft: '-4px',
        marginTop: '4px'
    },
    smallIconValue: {
        fontSize: '27px',
        fontWeight: '500'
    },
    resolution: {
        fontSize: '17px',
        color: theme.palette.colors.gray.main
    },
    resolutionRed: {
        fontSize: '18px',
        fontWeight: '500'
    },
    resolutionValue: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#247424'
    }
}));
