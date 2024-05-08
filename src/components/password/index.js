import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { usePasswordStyles } from './styles';
import { TextField } from '@material-ui/core';

const CustomPassword = (props) => {
    const classes = usePasswordStyles();
    const {
        name,
        onEnterPress,
        value,
        onChange,
        size,
        focus,
        fullWidth,
        helperText,
        error,
        onFocus,
        onBlur,
        width,
        bgColor,
        inputRef
    } = props; // pass value and onchange function to get hte value
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            variant="outlined"
            error={error}
            helperText={helperText}
            name={name}
            value={value}
            type={showPassword ? 'text' : 'password'}
            onChange={onChange}
            className={size === 'md' ? classes.md : classes.lg}
            autoComplete="off"
            autoFocus={focus}
            fullWidth={fullWidth}
            style={{ width: width, backgroundColor: bgColor }}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onEnterPress();
                }
            }}
            inputRef={inputRef}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default CustomPassword;
