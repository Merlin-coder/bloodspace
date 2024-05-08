import CustomPassword from 'components/password';
import React from 'react';

const PasswordInput = ({ name, label, type, value, alert, onChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor={name} style={{ fontWeight: 'bold' }}>
                {label}
            </label>
            <CustomPassword name="password" size="md" autoFocus onChange={onChange} value={value} />
            <div style={{ height: '21px', color: '#f00' }}>{alert}</div>
        </div>
    );
};

export default PasswordInput;
