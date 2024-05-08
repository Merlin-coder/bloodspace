import { FormControl, InputLabel, Select } from '@material-ui/core';
import SelectOption from 'components/select';
import React from 'react';

const SelectInput = ({ name, label, type, value, alert, options, onChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={name} style={{ fontWeight: 'bold' }}>
                {label}
            </label>
            <SelectOption options={options} onChange={onChange} name={name} value={value} />
            <div style={{ height: '21px', color: '#f00' }}>{alert}</div>
        </div>
    );
};

export default SelectInput;
