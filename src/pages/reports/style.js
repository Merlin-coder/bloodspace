import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
    (theme) => ({
        textField: {
            backgroundColor: theme.palette.colors.gray.light,
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
        header: {
            margin: '15px 0px'
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
                color: theme.palette.primary.main,
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
        sameDereservation: {
            marginTop: 33
        },
        datePickerNew: {
            '& .MuiPickersModal-withAdditionalAction': {
                backgroundColor: theme.palette.colors.green
            }
        },
        paper: {
            padding: 10,
            paddingBottom: 20,
            marginBottom: 20
        },
        headerInfoPaper: {
            padding: 15,
            marginBottom: 20
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
            marginBottom: 10
        },
        error: { color: theme.palette.colors.red },
        tableResultsCount: {
            marginTop: 10,
            paddingLeft: 20
        },
        loaderDivStyles: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px'
        },
        tableDiv: {
            width: '100vh'
        }
    }),
    { index: 1 }
);
