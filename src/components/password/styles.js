import { makeStyles } from '@material-ui/core/styles';

export const usePasswordStyles = makeStyles(
    {
        md: {
            width: '100%',
            minWidth: '290px',

            '& .MuiOutlinedInput-root': {
                borderRadius: '3px'
            },
            '& .MuiOutlinedInput-input': {
                padding: '13px 12px'
            },
            '& .MuiOutlinedInput-input:focus': {
                backgroundColor: '#fff'
            }
        },
        lg: {
            borderRadius: '3px',

            '& .MuiOutlinedInput-input': {
                padding: '14px 12px'
            },
            '& .MuiOutlinedInput-input:focus': {
                backgroundColor: '#fff'
            }
        }
    },
    { index: 1 }
);
