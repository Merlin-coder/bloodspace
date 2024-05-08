import { makeStyles } from '@material-ui/core';

export const useSettingsStyles = makeStyles(
    (theme) => ({
        apiBehaviourContainer: {
            backgroundColor: theme.palette.secondary.main
        },
        root: {
            padding: '6px 0px',
            display: 'flex'
        },
        content: {
            display: 'flex',
            flexDirection: 'col',
            alignItems: 'left',
            margin: 20
        },
        content1: {
            display: 'flex',
            justifyContent: 'center',
            padding: '30px !important'
        },
        radio: {
            '&$checked': {
                color: theme.palette.primary.main
            },
            padding: 0,
            marginTop: 4,
            marginLeft: 5
        },
        associteRadio: {
            '&$checked': {
                color: theme.palette.primary.main
            },
            padding: 0,
            marginTop: 4,
            marginLeft: 5
        },
        radioBtns: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '2px',
            '& .MuiFormControlLabel-root': {
                display: 'flex',
                alignItems: 'flex-end',
                gap: 4
            }
        },
        checked: {},
        dateFormatCard: {
            marginTop: 20
        },
        labelStyles: {
            margin: 10
        },
        associateLabelStyles: {
            margin: 1
        },
        dateMargin: {
            margin: 10
        },
        lastUpdateText: {
            position: 'absolute',
            right: '0px',
            bottom: '0px',
            placeItems: 'center',
            padding: 10
        },
        lastUpdate: {
            color: theme.palette.colors.darkGrayishBlue
        },
        deleteButton: {
            '&:hover': {
                backgroundColor: theme.palette.colors.red,
                color: 'white'
            },
            backgroundColor: theme.palette.colors.red,
            color: 'white'
        },
        InputLabel: {
            marginBottom: 10
        },
        lfHfClass: {
            display: 'flex',
            flexDirection: 'col',
            alignItems: 'left',
            marginLeft: 20
        }
    }),
    { index: 1 }
);
