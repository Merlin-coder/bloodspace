import { DatePicker } from 'common';
import React from 'react';

const DateInput = ({ name, label, type, value, alert, onChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={name} style={{ fontWeight: 'bold' }}>
                {label}
            </label>
            <DatePicker
                id={name}
                inputVariant={'outlined'}
                handleDate={onChange}
                value={value}
                format="dd/MM/yyyy"
                disableFuture={true}
            />
            {/* <input id={name} name={name} type={type} onChange={onChange} value={value} /> */}
            <div style={{ height: '21px', color: '#f00' }}>{alert}</div>
        </div>
    );
};

export default DateInput;
