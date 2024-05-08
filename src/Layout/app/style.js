import { makeStyles } from '@material-ui/core';

const drawerWidth = 230;
export const useDashboardStyles = makeStyles(
    (theme) => ({
        root: {
            display: 'flex'
        },

        drawer: {
            width: drawerWidth,

            flexShrink: 0,
            '& .MuiBackdrop-root': {
                all: 'unset'
            }
        },
        inputLabel: {
            fontSize: '13px',
            fontWeight: '400',
            color: theme.palette.colors.gray.main,
            marginBottom: '5px'
        },
        drawerPaper: {
            width: drawerWidth,
            backgroundColor: theme.palette.primary.main,
            top: '70.5px',
            [theme.breakpoints.down('sm')]: {
                width: 222
            },
            '@media (max-width: 960px)': {
                width: 230
            },
            '@media (max-width: 600px)': {
                width: 222
            },
            '@media (max-width: 549px)': {
                width: 180
            }
        },

        appBar: {
            backgroundColor: theme.palette.secondary.main,
            height: '4.5rem',
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            [theme.breakpoints.down('sm')]: {
                paddingRight: '10px'
            }
        },
        logoContainer: {
            backgroundColor: theme.palette.primary.main,
            fontSize: '3.2rem',
            marginLeft: -24,
            marginTop: -23,
            marginBottom: -20,
            height: '4.5rem',
            width: drawerWidth,
            [theme.breakpoints.down('sm')]: {
                marginRight: '5px'
            },
            '@media (max-width: 549px)': {
                height: '3.5rem',
                marginLeft: -15,
                fontSize: '2.2rem',
                width: 120
            }
        },
        logo: {
            margin: 10,
            width: '210px',
            height: '48px',
            cursor: 'pointer'
        },
        mainToolbar: {
            display: 'flex',
            marginTop: 4
        },
        notificationsIcon: {
            color: theme.palette.primary.icon
        },
        breadcrumbs: { flexGrow: 1 },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar
        },

        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            overflowX: 'hidden',
            overflowY: 'hidden',
            backgroundColor: theme.palette.background.main
        },
        typography: {
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            fontSize: '28px',
            marginLeft: '32px',
            flexGrow: 1,
            [theme.breakpoints.down('sm')]: {
                fontSize: '16px',
                marginLeft: '10px'
            },
            '@media (max-width: 549px)': {
                marginLeft: theme.spacing(0)
            }
        },
        list: {
            marginLeft: 10,
            overflowY: 'auto',
            margin: 0,
            paddingTop: 60,
            marginBottom: 65,
            listStyle: 'none',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
                width: '0.55em'
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey',
                borderRadius: '6px'
            }
        },

        appBarDivider: {
            background: theme.palette.colors.gray.light,
            marginTop: '0.6rem',
            height: '52px',
            marginLeft: '24px',
            width: '1px',
            marginRight: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                marginLeft: '1px'
            },
            '@media (max-width: 549px)': {
                marginLeft: theme.spacing(0)
            }

            //    fontWeight: 'bold'
        },
        appBarDividerBottom: {
            // marginTop: '0.1rem',
            fontWeight: 'bold'
        },
        logoDividerBottom: {
            background: theme.palette.colors.gray.light
        },
        socketStatus: {
            color: 'white',
            '&:hover': {
                color: theme.palette.primary.main
            }
        }
    }),
    { index: 1 }
);
