import React from 'react';
import { IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core';
import { useInputStyles } from './styles';

const CustomInput = (props) => {
    const classes = useInputStyles();

    const {
        name,
        label,
        value,
        onChange,
        size,
        focus,
        fullWidth,
        helperText,
        error,
        onFocus,
        onBlur,
        onEnterPress,
        width,
        bgColor,
        inputRef,
        textTransform,
        ref,
        id,
        Icon,
        disabled,
        type,
        standard,
        placeholder,
        multiline,
        inputProps,
        toolTipLabel,
        onIconClick,
        required,
        readOnly
    } = props;
    return (
        <TextField
            variant={standard ? 'standard' : 'outlined'}
            error={error}
            required={required}
            helperText={helperText}
            label={label}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            id={id}
            className={size === 'md' ? classes.md : classes.lg}
            autoComplete="off"
            autoFocus={focus}
            fullWidth={fullWidth}
            // inputProps={{ autoFocus: focus }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    if (onEnterPress) {
                        onEnterPress();
                        e.preventDefault();
                    }
                }
            }}
            style={{ width: width, backgroundColor: bgColor }}
            inputProps={{
                ...inputProps,
                // autoFocus: focus,
                style: {
                    textTransform: textTransform
                }
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            inputRef={inputRef}
            ref={ref}
            disabled={disabled}
            multiline={multiline}
            InputProps={{
                readOnly: readOnly,
                endAdornment: Icon && (
                    <InputAdornment position="end">
                        <Tooltip title={toolTipLabel} l>
                            <IconButton onClick={onIconClick}>
                                {' '}
                                <Icon />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                )
            }}
        />
    );
};
export default CustomInput;
