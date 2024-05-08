import { Checkbox } from '@material-ui/core';
import React from 'react';
import { useSettingsStyles } from '../style';

const CheckboxInput = ({ name, label, type, value, alert, onChange }) => {
    const classes = useSettingsStyles();
    return (
        <div>
            <label htmlFor={name} style={{ fontWeight: 'bold' }}>
                {label}
            </label>
            <Checkbox
                name={name}
                color="primary"
                checked={value || false}
                onChange={onChange}
                className={classes.checkBox}
            />
            <div style={{ height: '21px', color: '#f00' }}>{alert}</div>
        </div>
    );
};

export default CheckboxInput;
