import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
//import Tooltip from '@material-ui/core/Tooltip';
import Close from '@material-ui/icons/Close';
import { useSearchStyles } from './style';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

const CustomSearch = (props) => {
    const classes = useSearchStyles();
    const {
        value,
        handleSearch,
        size,
        placeholder,
        handleChange,
        onEnterPress,
        inputRef,
        handleSearchDelete,
        loader,
        focus,
        onBlur,
        disabled
    } = props; // pass value and onClick(handleSearch) function to get the value after clicking the search icon

    return (
        <FormControl
            className={size === 'md' ? `${classes.label} ${classes.md}` : `${classes.label} ${classes.lg}`}
            variant="outlined"
            component={'span'}
        >
            <OutlinedInput
                className={classes.root}
                type="text"
                value={value}
                placeholder={placeholder}
                onFocus={focus}
                onMouseOut={onBlur}
                onChange={handleChange}
                inputRef={inputRef}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        if (onEnterPress) {
                            e.preventDefault();
                            onEnterPress();
                        }
                    }
                }}
                endAdornment={
                    <InputAdornment>
                        {value && (
                            <IconButton onClick={handleSearchDelete}>
                                <Close />
                            </IconButton>
                        )}
                        {!loader ? (
                            <IconButton onClick={handleSearch} disabled={disabled}>
                                <SearchIcon />
                            </IconButton>
                        ) : (
                            <CircularProgress className={classes.cricularProgress} size={26} />
                        )}
                    </InputAdornment>
                }
                disabled={disabled}
            />
        </FormControl>
    );
};

export default CustomSearch;
