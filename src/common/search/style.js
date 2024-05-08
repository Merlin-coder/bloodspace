import { makeStyles } from '@material-ui/core/styles';

export const useSearchStyles = makeStyles((theme) => ({
    md: {
        width: '100%'
    },
    lg: {
        width: '100%',
        minWidth: '450px'
    },
    root: {
        '& .MuiOutlinedInput-input': {
            padding: '13px 16px',
            zIndex: '4'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            backgroundColor: theme.palette.colors.white,
            border: `1.5px solid ${theme.palette.colors.gray.light}`
        },
        '& .MuiIconButton-root': {
            zIndex: 1
        }
    },
    label: {
        '& .MuiFormLabel-root': {
            marginTop: '-2px'
        }
    },
    cricularProgress: {
        zIndex: 1000
    }
}));
