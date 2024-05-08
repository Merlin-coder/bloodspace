import { makeStyles } from '@material-ui/core';

export const useDatabaseStyles = makeStyles((theme) => ({
    TableHeadCell: {
        color: theme.palette.primary.main,
        whiteSpace: 'nowrap'
    },
    tableHead: {
        backgroundColor: theme.palette.background.default
    },
    inputCell: {
        padding: 5
    },
    selectCell: {
        '& .MuiSelect-outlined.MuiSelect-outlined': {
            width: 125
        },
        padding: 5
    },
    selectCell2: {
        '& .MuiSelect-outlined.MuiSelect-outlined': {
            width: 110
        },
        padding: 5
    },
    iconButton: {
        width: '50%',
        padding: '0px 10px'
    },
    addCollectionButton: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    dataBaseTable: {
        padding: '30px ',
        marginTop: 30
    },
    buttonsPaper: {
        padding: 30
    },
    checkBox: {
        padding: 0
    }
}));
