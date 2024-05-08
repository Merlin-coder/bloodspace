import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
    (theme) => ({
        textField: {
            backgroundColor: theme.palette.colors.gray.veryLight,
            borderRadius: 8,
            padding: 7,
            marginLeft: 10,
            paddingLeft: 10,
            marginTop: 30
        },
        marginTop20: {
            marginTop: 20
        },
        marginLeft40: {
            marginLeft: 40
        },
        marginLeft35: {
            marginLeft: 35
        },
        marginRight15: {
            marginRight: 15
        },
        margin15: {
            margin: 15
        },
        resultGrid: {
            borderRadius: 5
        },
        leftInfo: {
            marginTop: 15,
            marginLeft: 30,
            marginBottom: 20
        },
        infoGrid: {
            display: 'flex',
            margin: 10,
            marginTop: 15,
            backgroundColor: theme.palette.colors.white,
            borderRadius: 8
            // paddingBottom: 30
        },
        resultFeilds: {
            marginTop: 15
        },
        feildNames: {
            fontSize: 18
        },
        backBtn: {
            '&:hover': {
                border: `solid 2px ${theme.palette.primary.main}`
            },
            padding: 10,
            width: '180px',
            marginTop: 25,
            textTransform: 'none',
            borderRadius: '8px',
            marginRight: '15px',
            fontSize: 16,
            letterSpacing: 0.5,
            border: `solid 2px ${theme.palette.primary.main}`
        },
        assignBtn: {
            padding: 10,
            width: '180px',
            marginTop: 25,
            textTransform: 'none',
            borderRadius: '8px',
            marginRight: '15px',
            fontSize: 16,
            letterSpacing: 0.5
        },

        tabel: {
            marginTop: 30
        },
        actions: {
            display: 'flex',
            direction: 'row'
        },
        comment: {
            marginTop: 10,
            background: theme.palette.colors.white,
            paddingRight: 30,
            marginBottom: 30
        },
        commentFeild: {
            marginTop: 20,
            color: theme.palette.colors.gray.main,
            fontSize: 18
        },
        tableHead: {
            fontWeight: 'bold',
            fontSize: 11
        },
        tabelBody: {
            fontSize: 12
        },
        dereservation: {
            marginTop: 13,
            fontWeight: 'bold'
        },
        checkBox: {
            marginTop: 27
        },
        firstRowColor: {
            '& .MuiTableCell-body': {
                color: theme.palette.primary.darkBlue,
                fontSize: 12
            }
        },
        labelColor: {
            color: theme.palette.colors.gray.main,
            fontSize: 13
        },
        delectIconColor: {
            color: theme.palette.colors.gray.main,
            fontSize: 28,
            padding: 0
        },
        dialogActions: {
            justifyContent: 'center',
            margin: 20
        },
        assignedUnitColor: {
            color: theme.palette.colors.red
        },
        dialogButton: {
            '&:hover': {
                border: `solid 2px ${theme.palette.primary.main}`
            },
            width: 180,
            height: 50,
            textTransform: 'none',
            border: `solid 2px ${theme.palette.primary.main}`,
            fontSize: 18
        },
        fontSize16: {
            color: theme.palette.colors.gray.main,
            fontSize: 16,
            fontWeight: '900',
            textAlign: 'center',
            margin: 'auto',
            width: 370
        },
        unitNotAvailable: {
            fontSize: 25,
            color: theme.palette.colors.red,
            marginBottom: 20
        },
        dialogGrid: {
            width: 300,
            margin: 40,
            marginBottom: 0,
            marginLeft: 70
        },
        dialogZindex: {
            zIndex: 20000
        },
        errorIcon: {
            color: theme.palette.colors.red,
            fontSize: 45
        },
        asignConfirmation: {
            fontSize: 25,
            color: theme.palette.colors.gray.main,
            margin: 'auto',
            textAlign: 'center'
        },
        assignAndBackBtns: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        deleteTableStyles: {
            marginTop: 5,
            marginLeft: -70
        },
        deleteTableCell: {
            borderBottom: 0,
            padding: 12
        },
        rowBorderTop: {
            borderTop: `solid 1px ${theme.palette.colors.gray.light}`,
            textAlign: 'center'
        },
        tableContainer: {
            marginTop: 10,
            marginRight: 10
        },
        paddingRight: {
            paddingRight: 70
        },
        minHeight: {
            minHeight: 140
        },
        tableGrid: {
            backgroundColor: theme.palette.colors.white,
            marginTop: 25,
            marginLeft: 15,
            marginRight: 15,
            padding: 20,
            borderRadius: 8
        },
        fontSize18: {
            fontSize: 18
        },
        deleteDialog: {
            marginTop: '25px',
            marginBottom: '15px'
        },
        sameDereservation: {
            marginTop: 33
        },
        datePickerNew: {
            '& .MuiPickersModal-withAdditionalAction': {
                backgroundColor: theme.palette.colors.green
            }
        },
        paper: {
            padding: 20,
            width: 'inherit'
        },
        firstNameField: {
            width: 100,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: 20,
            textTransform: 'capitalize'
        },
        lg: {
            borderRadius: '3px',
            '& .MuiAutocomplete-inputRoot': {
                padding: '4px'
            }
        },
        inputLabel: {
            fontSize: '14px',
            marginBottom: 10
        },
        inputField: {
            marginBottom: 5
        },
        error: { color: theme.palette.colors.red },
        ruleHeading: {
            fontWeight: '600',
            color: theme.palette.primary.main,
            marginBottom: 10
        },
        resolutionContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline'
        },
        selectFromOld: {
            cursor: 'pointer',
            color: theme.palette.primary.main
        },
        notifyPopup: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main
        },
        customHeader: {
            marginTop: '15px'
        },
        hospitalLink: {
            textDecoration: 'none',
            cursor: 'pointer'
        },
        searchContainer: {
            marginTop: '10',
            paddingTop: '152'
        },
        headerInfoPaper: {
            padding: 15,
            marginBottom: 20
        },
        nameAndCount: {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        loaderDivStyles: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px'
        },
        formLoader: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        },
        countContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '40px'
        },
        radio: {
            '&$checked': {
                color: theme.palette.primary.main
            }
        },
        radioBtns: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '10px'
        },
        checked: {},
        displayConfigListContainer: {
            padding: 2,
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
                borderRadius: '5px'
            }
        },
        displayConfigList: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        checkboxAndListContainer: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 6
        },
        filterChips: {
            display: 'flex',
            overflow: 'scroll',
            marginTop: 10
        },
        selectAlert: {
            color: '#f00',
            fontSize: 12,
            marginLeft: 14
            // position: 'absolute'
        },
        checkBoxContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 10
        },
        checkBoxlabel: {
            marginRight: 10,
            color: 'rgba(0, 0, 0, 0.54)'
        },
        simpleMenu: {
            padding: '10px 20px'
        },
        nofields: {
            marginLeft: 350,
            marginTop: 35,
            fontWeight: 'bold',
            color: '#f00'
        },
        backButton: {
            marginTop: 24
        },
        Icons: {
            marginTop: 24,
            marginLeft: 120
        },
        Icons1: {
            marginTop: 24
        }
    }),

    { index: 1 }
);
