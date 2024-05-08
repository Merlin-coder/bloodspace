import { makeStyles } from '@material-ui/core';

export const useCustomStyle = makeStyles((theme) => ({
    top: {
        height: 4,
        position: 'relative',
        top: '-5px',
        background: theme.palette.label.main
    },
    bottom: {
        height: 4,
        position: 'relative',
        top: '8px',
        background: theme.palette.label.main
    }
}));
