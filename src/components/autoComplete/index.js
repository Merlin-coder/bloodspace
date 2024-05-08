import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useReceipientPageStyles } from '../../pages/assign/recepient-page/recepient-page.style';
const AutoComplete = ({
    autoCOmpleteOpen,
    handleAutoCompleteChange,
    handleClickAway,
    onChange,
    value,
    autoCompleteError,
    onFocus,
    freeSolo ,
    options,
    description,
    inputRef,
    fullWidth,
    title,
    resetValue,
    name,
    disabled,
    errorText,
    collection
}) => {
    const classes = useReceipientPageStyles();
    return (
        <Autocomplete
            freeSolo={freeSolo}
            disabled={disabled}
            className={classes.lg}
            // onInputChange={handleAutoCompleteChange}
            open={autoCOmpleteOpen}
            openOnFocus={false}
            onChange={(e, value) => onChange(e, value)}
            value={value ? value : null}
            options={options}
            getOptionLabel={(option) =>
                name
                    ? `${option?.[name]}`
                    : collection
                    ? options && options.length && option && option.name
                    : `${option && option.isbtcode ? option.isbtcode : option?.code} | ${option?.[description]}`
            }
            fullWidth={fullWidth}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={autoCompleteError}
                    helperText={autoCompleteError && errorText}
                    size="medium"
                    variant="outlined"
                    inputRef={inputRef}
                    onChange={handleAutoCompleteChange}
                />
            )}
            onBlur={handleClickAway}
            style={{ backgroundColor: 'white' }}
            onFocus={onFocus}
            ListboxProps={{
                style: {
                    maxHeight: '200px'
                }
            }}
        />
    );
};

export default AutoComplete;
