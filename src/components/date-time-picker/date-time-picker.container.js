import { makeStyles } from '@material-ui/core';
import React from 'react';
import DateTimePickerComponent from './date-time-picker.component';

const useStyles = makeStyles((theme) => ({
    datePickerNew: {
        '& .MuiDialogActions-root': {
            backgroundColor: theme.palette.colors.green
        }
    }
}));

const DateTimePicker = (props) => {
    const classes = useStyles();
    return <DateTimePickerComponent className={classes.datePickerNew} {...props} />;
};

export default DateTimePicker;
