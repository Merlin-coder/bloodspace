import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import MenuList from '@material-ui/core/MenuList';
import { MenuStyles } from './styles';
import { FormHelperText, Input, NativeSelect, TextField } from '@material-ui/core';

const SelectNativeOption = (props) => {
    //for menu button
    const { onChange, options, value, name, error, disabled, onFocus, requiredText, defaultValue, minWidth } = props;
    const classes = MenuStyles();
    return (
        <div>
            <FormControl variant="outlined" className={classes.form} fullWidth error={error}>
                <NativeSelect
                    id="select"
                    defaultValue={defaultValue}
                    style={{ minWidth: minWidth && minWidth }}
                    className={classes.root}
                    variant="outlined"
                    inputProps={{
                        name: { name },
                        id: 'uncontrolled-native'
                    }}
                >
                    {options?.map((option, index) => (
                        <option value={option.dbProperty} key={index}>
                            {option.dbProperty}
                        </option>
                    ))}
                </NativeSelect>
                {error && <FormHelperText>{requiredText} is required</FormHelperText>}
            </FormControl>
        </div>
    );
};
export default SelectNativeOption;
