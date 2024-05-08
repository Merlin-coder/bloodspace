import { makeStyles } from '@material-ui/core';

export const dateTimePickerStyles = makeStyles(
    () => ({
        textFeild: {
            fontSize: '15px',
            '& .MuiOutlinedInput-input': {}
        }
    }),
    { index: 1 }
);
