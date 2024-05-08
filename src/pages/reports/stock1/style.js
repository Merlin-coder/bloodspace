import { makeStyles } from '@material-ui/core/styles';

export const StockPageStyles = makeStyles((theme) => ({
    root: {
        marginTop: '5px'
    },
    rootInout: {
        backgroundColor: theme.palette.colors.white,
        padding: '20px 30px'
    },
    inputLabel: {
        fontSize: '15px',
        fontWeight: '400',
        color: theme.palette.colors.gray.main,
        marginBottom: '5px',
        marginLeft: '2px'
    },
    buttonGroup: {
        display: 'flex',
        marginLeft: 'auto',
        gap: '20px'
    },
    buttonSpan: {
        fontSize: '13.4px'
    },
    chipSection: {
        marginTop: 5,
        padding: '0px 30px'

        //  backgroundColor: theme.palette.colors.white,
        //  width: '100%'
    },
    chipArray: { padding: '5px 20px' },
    chip: {
        margin: '3px 0px',
        marginRight: ' 10px',
        minWidth: '160px',
        height: '45px',
        backgroundColor: theme.palette.colors.gray.light,
        fontSize: '14px',
        borderRadius: '50px',
        '&.MuiChip-root': {
            padding: '3px  10px',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    },
    paper: {
        marginTop: '1rem',
        width: 'inherit',
        padding: '30px',
        flexWrap: 'no-wrap'
    },
    paperContainer: {
        padding: ' 5px 0px',
        gap: '50px'
    },
    bigtable: {
        flexGrow: 1,
        width: '90vh',
        marginTop: '-20px'
    },
    summaryTableHead: {
        backgroundColor: theme.palette.background.default,
        borderRadius: '10px 12px',
        color: theme.palette.primary.main
    },
    backLink: {
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '18px',
        marginLeft: 'auto'
    },
    searchGrid: { padding: '10px 0px' },
    isProductCodeBtn: {
        marginLeft: 'auto',
        marginTop: '10px'
    }
}));
