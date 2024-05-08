import { makeStyles } from '@material-ui/core';

export const useCustomStyle = makeStyles((theme) => ({
    rowStyle: {
        marginRight: '15px',
        color: theme.palette.label.main,
        fontSize: 12,
        padding: 'none',
        fontWeight: '500'
    }
}));
