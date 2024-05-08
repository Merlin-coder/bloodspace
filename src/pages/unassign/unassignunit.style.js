import { makeStyles } from '@material-ui/core';

export const UnassignUnitStyles = makeStyles(
    (theme) => ({
        marginLeft40: {
            marginLeft: 40
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
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 8
            // paddingBottom: 30
        },
        emergrency: {
            padding: '40px 20px'
        },
        feildNames: {
            fontSize: 18
        },
        actions: {
            display: 'flex',
            direction: 'row'
        },
        fontSize16Check: {
            fontWeight: '400',
            fontSize: '14px',
            color: theme.palette.colors.gray.main
        },

        action: {
            marginRight: '29px'
        },

        comment: {
            marginTop: 10,
            background: theme.palette.colors.white,
            paddingRight: 30
        },
        commentFeild: {
            marginTop: 20,
            color: theme.palette.colors.gray.main,
            fontSize: 18
        },
        checkBox: {
            marginTop: 27,
            marginLeft: 5
        },
        firstRowColor: {
            '& .MuiTableCell-body': {
                color: theme.palette.primary.darkBlue,
                fontSize: 12
            }
        },
        // sameDereservation: {
        //     marginTop: 10
        // },
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
            justifyContent: 'flex-end',
            marginTop: 30
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
            marginTop: 30
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
            marginTop: '-10px'
        },
        datePickerNew: {
            '& .MuiPickersModal-withAdditionalAction': {
                backgroundColor: theme.palette.colors.green
            }
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
        unitsNotAvailableTitle: {
            display: 'block',
            margin: 'auto',
            marginBottom: 0
        },
        deleteIcon: {
            padding: 0
        },
        checkBoxComponent: {
            padding: 0,
            paddingLeft: 15
        },
        tableHeadCell: {
            color: theme.palette.colors.gray.main,
            backgroundColor: theme.palette.background.default,
            padding: '6px 24px 6px 2px'
        },
        tableHeadCel: {
            color: theme.palette.colors.gray.main,
            backgroundColor: theme.palette.background.default,
            padding: '6px 24px 6px 2px',
            textAlign: 'center'
        },
        addUnitsDialogLabels: {
            color: theme.palette.colors.gray.main,
            fontSize: 13
        },
        commentsGrid: {
            marginTop: 10,

            paddingRight: 10
        },
        addUnitsButton: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        tableResultCount: {
            marginTop: 10
        },
        infoLabels: {
            marginTop: 10
        },
        margTop: {
            marginTop: 10
        },
        errorContainer: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 204, 204,0.4)',
            marginLeft: 20,
            padding: 5,
            borderRadius: 5
        },
        assignError: {
            color: '#b33939',
            fontSize: 'small'
        },
        errorMessage: {
            color: '#b33939',
            marginLeft: 10,
            fontWeight: 500
        },
        colorIndication: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10
        }
    }),
    { index: 1 }
);
