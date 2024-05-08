import { TextField } from '@material-ui/core';
import CustomInput from 'components/inputfeild';
import React from 'react';

const TextInput = ({ name, label, type, value, alert, onChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={name} style={{ fontWeight: 'bold' }}>
                {label}
            </label>
            <CustomInput name={name} value={value} onChange={onChange} />
            <div style={{ height: '21px', color: '#f00' }}>{alert}</div>
        </div>
    );
};

export default TextInput;
