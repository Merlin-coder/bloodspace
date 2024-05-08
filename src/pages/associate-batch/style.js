import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
    (theme) => ({
        root: {
            padding: '40px 25px',
            justifyContent: 'space-evenly'
        },

        textField: {
            height: '0px'
        },
        inputLabel: {
            fontSize: '13px',
            fontWeight: '400',
            color: theme.palette.colors.gray.main,
            marginBottom: '5px'
        },
        inputLabels: {
            fontSize: 14,
            marginBottom: 10,
            color: '#777777'
        },
        radio: {
            '&$checked': {
                color: theme.palette.primary.main
            }
        },
        checked: {},
        radioBtns: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '5px'
        },
        inputRow: {
            marginBottom: '0px',
            flexGrow: 1,
            width: '100%'
        },
        gap: {
            gap: '30px'
        },
        tips: {
            fontSize: '23px',
            color: theme.palette.colors.gray.main,
            paddingBottom: '6px'
        },
        body: {
            fontSize: '15px',
            color: theme.palette.colors.gray.dark,
            lineHeight: '1.4'
        },
        or: {
            fontSize: '15px',
            color: theme.palette.colors.gray.dark,
            padding: '8px 0px'
        },

        span: {
            fontWeight: '600',
            color: theme.palette.colors.gray.main
        },
        butt: {
            marginBottom: '50px'
        },

        lg: {
            borderRadius: '3px',
            '& .MuiAutocomplete-inputRoot': {
                padding: '4px'
            }
        },
        form: {
            width: 'inherit'
        },
        buttonSpan: {
            fontSize: '12.4px'
        },
        buttonGrid: {
            marginLeft: 'auto'
        },
        rotate: {
            animation: `$rotation 2s infinite cubic-bezier(0.075, 0.82, 0.165, 1)`
            //   transition: 'all 1s cubic-bezier(0.075, 0.82, 0.165, 1)'
        },
        '@keyframes rotation': {
            from: {
                transform: 'rotate(0deg)'
            },
            to: {
                transform: 'rotate(359deg)'
            }
        }
    }),
    { index: 1 }
);

export { useStyles };
