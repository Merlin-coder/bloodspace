import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    text: {
        backgroundColor: theme.palette.background.dark,
        fontSize: '14px',
        padding: '4px 15px',
        marginRight: '6px',
        marginTop: '14px',
        borderRadius: '4px'
    },
    span: {
        fontWeight: 'bold'
    }
}));

const tabStyle = makeStyles(
    (theme) => ({
        tab1: {
            minHeight: '35px',
            padding: '15px 30px',
            borderRadius: '10px 10px 0 0',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            opacity: '2',
            boxShadow: '1px 1px 1px 1px aliceblue',
            fontSize: '15px',
            fontWeight: '500',
            zIndex: '100',
            textTransform: 'none'
        },
        tab2: {
            minHeight: '35px',
            padding: '0px 30px',
            borderRadius: '10px 10px 0 0',
            backgroundColor: 'white',
            color: theme.palette.colors.gray.main,
            opacity: '2',
            boxShadow: '1px 1px 1px 1px aliceblue',
            fontSize: '15px',
            fontWeight: '500',
            zIndex: '100',
            textTransform: 'none',
            marginTop: '15px'
        }
    }),
    { index: 1 }
);

export { useStyles, tabStyle };
