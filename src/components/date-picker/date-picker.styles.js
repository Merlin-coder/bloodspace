import { makeStyles } from '@material-ui/core';

export const datePickerStyles = makeStyles(
    () => ({
        root: {
            '& .MuiOutlinedInput-input': {}
        }
    }),
    { index: 1 }
);
