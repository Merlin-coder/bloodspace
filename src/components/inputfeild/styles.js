import { makeStyles } from '@material-ui/core';

export const useInputStyles = makeStyles(
    (theme) => ({
        md: {
            width: '100%',
            minWidth: '290px',
            '& input[type=number]': {
                '-moz-appearance': 'textfield'
            },
            '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
            },
            '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
            },
            '& .MuiOutlinedInput-root': {
                borderRadius: '3px'
            },
            '& .MuiOutlinedInput-input': {
                padding: '13px 12px'
            },
            '& .MuiOutlinedInput-input:focus': {
                backgroundColor: theme.palette.background.default
            }
        },
        lg: {
            borderRadius: '3px',
            '& input[type=number]': {
                '-moz-appearance': 'textfield'
            },
            '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
            },
            '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
            },
            '& .MuiOutlinedInput-input': {
                padding: '14px 12px'
            },
            '& .MuiOutlinedInput-input:focus': {
                backgroundColor: theme.palette.background.default
            }
        },
        sm: {
            '& .MuiInputBase-fullWidth': {},
            '& .MuiOutlinedInput-root': {
                borderRadius: '3px'
            },
            '& .MuiOutlinedInput-input': {
                padding: '13px 12px'
            },
            '& .MuiOutlinedInput-input:focus': {
                backgroundColor: theme.palette.background.default
            }
        }
    }),
    { index: 1 }
);
