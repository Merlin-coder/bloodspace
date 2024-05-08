import { makeStyles } from '@material-ui/core';

export const useAssignPageStyles = makeStyles(
    (theme) => ({
        inputField: {
            marginTop: 15,
            marginBottom: 5,
            position: 'relative'
        },
        anchor: {
            textDecoration: 'none'
        },
        intelligence: {
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 8,
            marginLeft: 20,
            marginRight: 18,
            padding: 30,
            marginTop: 20
        },
        assignBtn: {
            textTransform: 'none'
        },
        labelColor: {
            color: theme.palette.colors.gray.main,
            fontSize: 13
        },
        buttons: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginLeft: 'auto'
        },
        searchContainer: {
            backgroundColor: theme.palette.secondary.main,
            marginLeft: 25,
            marginTop: 25,
            marginRight: 20,
            paddingTop: 30,
            paddingRight: 10,
            paddingBottom: 30,
            borderRadius: 7,
            paddingLeft: 15
        },
        showingResults: {
            margin: 15
        },
        spanBold: {
            fontWeight: 'bold'
        },
        inputLabel: {
            fontSize: 13,
            fontWeight: 400,
            color: theme.palette.colors.gray.main,
            marginBottom: 5
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        genderLable: {
            fontSize: 13,
            fontWeight: 400,
            color: theme.palette.colors.gray.main,
            marginBottom: 5
        },
        radio: {
            '&$checked': {
                color: theme.palette.primary.main
            }
        },
        checked: {}, //to observe changes on checked

        lg: {
            borderRadius: '3px',
            '& .MuiAutocomplete-inputRoot': {
                padding: '4px'
            }
        },
        textField: {
            textTransform: 'capitalize'
        },
        addNewRecipient: {
            marginBottom: 10
        },
        addNewRecipientFontStyle: {
            fontWeight: 'bold'
        },
        radioGroup: {
            marginLeft: 5
        },
        modalActionButtons: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 25
        },
        modalCancelButton: {
            marginRight: 10
        },
        modalNextButton: {
            marginRight: 10
        },
        modalCompleteButton: {
            marginRight: 15
        },
        modalGrid: {
            backgroundColor: theme.palette.colors.white,
            borderRadius: 10,
            padding: 30,
            paddingLeft: 35,
            paddingRight: 20,
            border: 'none',
            outline: 'none'
        },
        modalStyles: {
            display: 'flex',
            alignItems: 'center',
            width: '60%',
            margin: 'auto'
        },
        margTop5: {
            marginTop: 5
        },
        sameDereservation: {
            marginTop: '-10px'
        },
        margTop: {
            marginTop: 10
        },
        action: {
            marginRight: '29px',
            paddingTop: '16px'
        },
        commentsGrid: {
            paddingRight: 15
        },
        margAuto: {
            marginRight: '10px'
        },
        Link: {
            textDecoration: 'none'
        },
        selectAlert: {
            color: '#f00',
            fontSize: 12,
            marginLeft: 5,
            position: 'absolute'
        },
        addUnitsDialogLabels: {
            color: theme.palette.colors.gray.main,
            fontSize: 13,
            marginTop: '-18px'
        },
        resultSuggestions: {
            color: theme.palette.colors.gray.main
        }
    }),
    { index: 1 }
);
