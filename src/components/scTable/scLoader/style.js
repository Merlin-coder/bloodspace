import { makeStyles } from '@material-ui/core';

export const useCustomStyle = makeStyles(() => ({
    loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px'
    }
}));
