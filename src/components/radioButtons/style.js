import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    radio: {
        '&$checked': {
            color: theme.palette.primary.main
        }
    },
    radioBtns: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '5px'
    },
    radioLabels: {
        '& .MuiFormControlLabel-label': {
            fontSize: 12
        }
    },
    checked: {}
}));
