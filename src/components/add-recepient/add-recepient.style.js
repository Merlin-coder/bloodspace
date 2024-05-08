import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
    (theme) => ({
        inputLabel: {
            fontSize: 13,
            fontWeight: 400,
            color: theme.palette.colors.gray.main,
            marginBottom: 5
        },
        genderLable: {
            fontSize: 13,
            fontWeight: 400,
            color: theme.palette.colors.gray.main
        },
        mainContainer: {
            margin: 30
        },
        fieldContainer: {
            margin: 20
        },
        fieldNames: {
            color: theme.palette.colors.gray.main
        },
        fieldNamesXs12: {
            color: theme.palette.colors.gray.main
        },
        saveButton: {
            margin: 8,
            marginLeft: 15,
            borderRadius: 5,
            textTransform: 'none',
            padding: 10,
            fontSize: 16,
            letterSpacing: 0.5,
            width: 300
        },
        saveButtonXs12: {
            marginRight: 15,
            borderRadius: 5,
            textTransform: 'none',
            padding: 10,
            fontSize: 16,
            letterSpacing: 0.5
        },
        radioBtns: {
            display: 'flex',
            flexDirection: 'row'
        },
        dateContainer: {
            marginLeft: 20,
            marginBottom: 20
        },
        female: {},
        male: {},
        radio: {
            '&$checked': {
                color: theme.palette.primary.main
            }
        },
        checked: {}, //to observer changes on checked
        container: {
            backgroundColor: theme.palette.colors.white,
            padding: 30,
            margin: 10,
            borderRadius: 8
        },
        cancelButton: {
            color: theme.palette.primary.main,
            border: `solid 1px ${theme.palette.primary.main}`
        },
        lg: {
            borderRadius: '3px',
            '& .MuiAutocomplete-inputRoot': {
                padding: '4px'
            }
        },
        textField: {
            textTransform: 'capitalize'
        }
    }),
    { index: 1 }
);

export { useStyles };
