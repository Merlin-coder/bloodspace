import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 400;

const useTreeItemStyles = makeStyles(
    (theme) => ({
        content: {
            flexDirection: 'row-reverse'
        },
        labelRoot: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0.5, 0)
        },
        labelIcon: {
            marginRight: theme.spacing(1)
        },
        labelText: {
            fontWeight: 'inherit',
            flexGrow: 0.8
        },
        root: {
            selected: {
                '&:focus': {
                    backgroundColor: 'transparent'
                }
            },
            '&> .MuiTreeItem-content .MuiTreeItem-label:hover, &.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label': {
                backgroundColor: 'transparent !important'
            },
            '&> .MuiTreeItem-content .MuiTreeItem-label': {
                backgroundColor: 'transparent !important'
            },
            '&>.MuiTreeItem-content': {
                backgroundColor: 'transparent !important'
            }
        },

        label: {
            selected: {
                '&:focus': {
                    backgroundColor: 'transparent !important'
                }
            },
            fontSize: '0.9rem !important',
            '&:hover': {
                backgroundColor: 'transparent !important'
            },
            '&> .MuiTreeItem-content .MuiTreeItem-label:hover, &.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label': {
                backgroundColor: 'transparent !important'
            }
        }
    }),
    { index: 1 }
);

const useStyles = makeStyles(
    (theme) => ({
        root: {
            marginTop: 50
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        title: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            // fontWeight: 'bold',
            position: 'fixed',
            zIndex: '9999',
            paddingRight: 0
        },
        treeRoot: {
            flexGrow: 1,
            minWidth: 400,
            maxWidth: 400,
            padding: '0px 10px 95px 24px'
        },
        formGroup: {
            marginTop: 10,
            marginBottom: 10,
            height: 'auto'
        },
        formControlLeft: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            maxWidth: 170,
            minWidth: 140
        },
        formControl: {
            margin: theme.spacing(1),
            maxWidth: 170,
            minWidth: 140
        },
        formControl2: {
            margin: theme.spacing(2),
            maxWidth: 160,
            minWidth: 130
        },
        formControl2Right: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
            maxWidth: 160,
            minWidth: 130
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        chip: {
            margin: 2
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        chipSection: {
            marginTop: '75px ',
            width: 'fit-content',
            flexWrap: 'wrap',
            marginLeft: '12px',
            display: 'flex',
            gap: '8px',
            maxWidth: 'min-content'
        },
        // filterCloseButton
        filterButton: {
            padding: '12px 10px 12px 18px'
        },
        customSearchbox: {
            marginBottom: '15px',
            marginLeft: '-3px',
            marginTop: '15px'
        },
        datePicker: {
            marginLeft: '-8px',
            marginRight: '8px',
            marginTop: 10
        },
        slider: {
            marginLeft: '-7px'
        }
    }),
    { index: 1 }
);

export { useStyles, useTreeItemStyles };
