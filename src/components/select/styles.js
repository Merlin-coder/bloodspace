import { makeStyles } from '@material-ui/core/styles';

export const MenuStyles = makeStyles((theme) => ({
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
    },
    placeHolder: {
        color: theme.palette.grey[500]
    }
}));
