import React from 'react';
import { makeStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
    md: {
        width: '200px',

        '& .MuiOutlinedInput-input': {
            padding: '8px 12px'
        }
    },
    lg: {
        width: '250px',

        '& .MuiOutlinedInput-input': {
            padding: '12px 18px'
        }
    }
});

const CustomInput = (props) => {
    const classes = useStyles();

    const { name, label, value, onChange, size } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            className={size === 'md' ? classes.md : classes.lg}
        />
    );
};
export default CustomInput;
