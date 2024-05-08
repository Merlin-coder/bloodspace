import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    root: {},
    label: {
        '& .MuiInputLabel-shrink': {
            display: 'hidden'
        }
    },
    form: {
        backgroundColor: theme.palette.colors.white,
        '& .MuiSelect-outlined.MuiSelect-outlined': {
            padding: '14px 20px'
        },
        '& .MuiSelect-select:focus': {
            backgroundColor: theme.palette.background.default
        }
    }
}));
export default function MultipleSelect({ options, value, onChange, name, isColumn }) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div>
            <FormControl variant="outlined" className={classes.form}>
                <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    name={name}
                    value={value === undefined && value === null ? [] : value}
                    onChange={onChange}
                    className={classes.root}
                    style={{ width: 430 }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left'
                        },
                        getContentAnchorEl: null,
                        style: {
                            maxHeight: '450px',
                            maxWidth: '400px'
                        }
                    }}
                >
                    {options?.map((option) => (
                        <MenuItem key={option.name} value={option?._id}>
                            {isColumn ? option?.dbProperty : option?.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
