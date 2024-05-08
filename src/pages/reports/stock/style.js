import { makeStyles } from '@material-ui/core/styles';

export const StockPageStyles = makeStyles((theme) => ({
    root: {
        marginTop: '5px'
    },
    filterIcon: {
        marginLeft: 40
    },
    rootInout: {
        backgroundColor: theme.palette.colors.white,
        marginBottom: 20
    },
    rootFilter: {
        marginLeft: 580
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
        flexWrap: 'no-wrap',
        height: 'auto'
    },
    paperContainer: {
        padding: ' 5px 0px',
        gap: '20px'
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
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    detailsBtn: {
        marginTop: 10
    },
    tableBorder: {
        border: '1px solid #000'
    },
    switcher: {
        height: '2rem',
        width: '5rem',
        border: `1px solid #5874`,
        display: 'flex',
        alignItems: 'center',
        marginTop: 5
    },
    bloodIcon: {
        height: '25px',
        width: '25px',
        marginLeft: 5,
        cursor: 'pointer'
    },
    bloodIconActive: {
        height: '25px',
        width: '25px',
        marginLeft: 5,
        cursor: 'pointer',
        backgroundColor: '#f2f7fb'
    },
    bloodpacketIcon: {
        height: '25px',
        width: '25px',
        cursor: 'pointer'
    },
    drawerIcon: {
        height: '25px',
        width: '25px',
        cursor: 'pointer'
    },
    drawerActive: {
        height: '30px',
        width: '36px',
        cursor: 'pointer',
        position: 'relative',
        background: '#5857',
        marginLeft: 23
    },
    drawerIconActive: {
        height: '25px',
        width: '25px',

        cursor: 'pointer'
    },
    paperRoot: {
        flexGrow: 1,
        maxWidth: 500
    }
}));
export const useStyles = makeStyles((theme) => ({
    root: {
        border: `1px solid ${theme.palette.colors.gray.light}`,
        borderRadius: '10px 10px 0px 0px',

        overflowX: 'auto',
        height: '55.2vh'
    },
    table: {
        width: '100%'
    },
    table2: {
        width: '100%',
        margingRight: 10
    },
    table3: {
        width: '100%'
    },
    table4: {
        width: '50%'
    },

    rowValue: {
        fontSize: 12,

        color: theme.palette.colors.black
    },
    rowValueSelected: {
        fontSize: 12,
        fontWeight: '500',
        // backgroundColor: theme.palette.list.main,
        // borderRadius: '50px',
        color: theme.palette.primary.main
        // padding: '3px 30px'
    },
    rowNames: {
        fontSize: 12,
        width: '130px',
        // fontWeight: '500',
        // backgroundColor: theme.palette.list.main,
        // borderRadius: '50px',
        color: theme.palette.colors.black
        // padding: '3px 30px'
    },
    rowNamesSelected: {
        fontSize: 12,
        width: '130px',
        fontWeight: '500',
        // backgroundColor: theme.palette.list.main,
        // borderRadius: '50px',
        color: theme.palette.primary.main
        // padding: '3px 30px'
    },
    isLink: {
        fontSize: 12,
        width: '141px',
        fontWeight: '500',
        // backgroundColor: theme.palette.list.main,
        // borderRadius: '50px',
        color: theme.palette.primary.main
        // padding: '3px 30px'
    },
    productBloodRow: {
        backgroundColor: theme.palette.colors.white,
        cursor: 'pointer'
    },
    productBloodRowSelected: {
        backgroundColor: theme.palette.primary.light,
        cursor: 'pointer'
    },
    summary: {
        color: theme.palette.primary.main
    },
    summary2: {
        backgroundColor: theme.palette.primary.main
    },
    allText: {
        color: theme.palette.primary.main,
        fontWeight: '500',
        fontSize: '12px'
    },

    productRowValue: {
        fontSize: '13px',
        color: theme.palette.colors.gray.main,
        marginRight: '20px'
    },
    productDesc: {
        fontSize: '13px',
        color: theme.palette.colors.gray.main
    },
    tableHead: {
        backgroundColor: '#F2F7FD',
        color: theme.palette.primary.main,
        position: 'fixed',
        width: '457px',
        zIndex: 999
        // top: '0px',
        // display: 'none'
    },
    backSlash: {
        color: theme.palette.primary.main,
        fontSize: 14,
        fontWeight: '900'
    }
}));
