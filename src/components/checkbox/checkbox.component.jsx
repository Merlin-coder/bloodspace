import React from 'react';
import { Checkbox, FormControlLabel ,Grid} from '@material-ui/core';

const CheckboxComponent = (props) => {
    const { size, checked, defaultChecked, handleChange, label, name, disabled } = props;
    return (
        <FormControlLabel
            control={
                <Checkbox
                    disabled={disabled}
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                    size={size}
                    name={name}
                />
            }
            label={label}
        />
    );
};

export default CheckboxComponent;
