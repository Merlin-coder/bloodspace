import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    container: {
        height: '60vh'
    },
    img: {
        width: '9%',
        height: '39%',
        marginTop: 80
    },
    typography: {
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 12,
        color: theme.palette.label.main
    }
}));
