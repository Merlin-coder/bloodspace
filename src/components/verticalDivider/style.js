import { makeStyles } from '@material-ui/core/styles';

export const CustomButtonStyles = makeStyles(
    {
        button: {
            padding: '3px 24px',
            fontSize: 16,
            letterSpacing: 0.5,
            minHeight: 46,
            textTransform: 'capitalize'
        }
    },
    { index: 1 }
);
