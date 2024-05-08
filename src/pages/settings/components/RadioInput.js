import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import { useSettingsStyles } from '../style';

const RadioInput = ({ name, label, type, value, alert, options, onChange }) => {
    const classes = useSettingsStyles();
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={name} style={{ fontWeight: 'bold' }}>
                {label}
            </label>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="api"
                    name={name}
                    value={value}
                    className={classes.radioBtns}
                    onChange={onChange}
                >
                    {options &&
                        options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                label={option.name}
                            />
                        ))}
                </RadioGroup>
            </FormControl>
            <div style={{ height: '21px', color: '#f00' }}>{alert}</div>
        </div>
    );
};

export default RadioInput;
