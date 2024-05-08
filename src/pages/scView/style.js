import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    typoGraphy: {
        padding: 10
    },
    paper: {
        margin: 15,
        display: 'flex',
        justifyContent: 'space-evenly',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    tablePaper: {
        padding: '5px 10px',
        margin: 10
    },
    downloadLabel: {
        flex: 0.4,
        marginTop: 10
    },
    iconGrid: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 10,
        minHeight: '80px',
        height: 'auto'
    },
    dateStyles: {
        flex: 1,
        justifyContent: 'start'
    },
    createdDateLabel: {
        flex: 0.4
    },
    contentGrid: {
        display: 'flex',
        padding: 15
    },
    buttonGrid: {
        marginLeft: 15,
        display: 'flex',
        justifyContent: 'flex-start'
    },
    itemLabel: {
        flex: 0.5,
        fontWeight: '500',
        fontSize: 'medium'
    },
    formLoader: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    voucherLoader: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    colonClass: {
        padding: '0 7px'
    },
    voucherValue: {
        flex: 1
    },
    minHeight: {
        minHeight: 140
    },
    tableGrid: {
        backgroundColor: theme.palette.colors.white,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        borderRadius: 8
    },
    tableHeadCell: {
        color: theme.palette.colors.gray.main,
        backgroundColor: theme.palette.background.default,
        padding: '6px 24px 6px 2px'
    },
    tableHeadCel: {
        color: theme.palette.colors.gray.main,
        backgroundColor: theme.palette.background.default,
        padding: '6px 24px 6px 2px',
        textAlign: 'center'
    },
    tableContaine: {
        marginTop: 30
    },
    displayConfigListContainer: {
        padding: 2,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            borderRadius: '5px'
        }
    },
    displayConfigList: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    checkboxAndListContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 6
    },
    textField: {
        backgroundColor: theme.palette.colors.gray.veryLight,
        borderRadius: 8,
        padding: 7,
        marginLeft: 10,
        paddingLeft: 10,
        marginTop: 30
    }
}));
