import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core';

const filter = createFilterOptions();
export const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiAutocomplete-inputRoot': {
            height: 48
        },
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
            padding: '6.5px'
        }
    }
}));

export default function AddAutoComplete({
    inputRef,
    formData,
    setFormData,
    options,
    fullWidth,
    currentPlaceHolder,
    batchProduct,
    disabled
}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    React.useEffect(() => {
        if (batchProduct) {
            setValue(formData?.batchProduct);
        }
    }, [formData]);

    return (
        <Autocomplete
            className={classes.root}
            value={value}
            onChange={(event, newValue) => {
                console.log(newValue, 'ddd');
                if (typeof newValue === 'string') {
                    setValue(newValue);
                    setFormData({ ...formData, batchProduct: newValue?.name });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue(newValue.inputValue);
                    setFormData({ ...formData, batchProduct: newValue.inputValue });
                } else {
                    setValue(newValue);
                    setFormData({ ...formData, batchProduct: newValue?.name });
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            disabled={disabled}
            options={options}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.name;
            }}
            renderOption={(option) => option.name}
            freeSolo
            renderInput={(params) => (
                <TextField
                    inputRef={inputRef}
                    inputProps={{
                        style: { height: 40 }
                    }}
                    {...params}
                    variant="outlined"
                    placeholder={`Add or Select ${currentPlaceHolder}`}
                />
            )}
            fullWidth={fullWidth}
        />
    );
}
