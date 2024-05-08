import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import { useStyles } from './style';

const CustomRadio = ({ name, value, options, onChange }) => {
    const classes = useStyles();
    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="api" name={name} value={value} className={classes.radioBtns} onChange={onChange}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                        label={option.name}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default CustomRadio;
