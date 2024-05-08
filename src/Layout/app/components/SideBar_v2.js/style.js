import { makeStyles } from '@material-ui/core';
import { CONSTANTS } from 'common';

export const useSidebarStyles = makeStyles((theme) => ({
    listItemButton: {
        width: '210px',
        borderRadius: '3px',
        color: theme.palette.colors.white,
        marginBottom: '8px',
        '&:hover': {
            backgroundColor: theme.palette.list.main,
            color: theme.palette.primary.main
        },
        '&:focus-within': {
            backgroundColor: theme.palette.list.main,
            color: theme.palette.primary.main
        }
    },
    listitemText: {
        marginLeft: '18px',
        letterSpacing: '0px',
        fontSize: '16px'
    },
    popover: {
        pointerEvents: 'none'
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.primary.main
    },
    navItemPoper: {
        width: '250px',
        color: theme.palette.primary.main,
        background: theme.palette.secondary.main
    }
}));
