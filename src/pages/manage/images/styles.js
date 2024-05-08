import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
    (theme) => ({
        wrapper: {
            padding: '20px 15px',
            backgroundColor: theme.palette.colors.white,
            marginBottom: '10px',

            zIndex: '1000'
        },
        imageSection: {
            padding: '10px 0px',
            zIndex: '-10'
        },
        sidebar: {
            position: 'absolute !important',
            top: '4px',
            right: '4px'
        },
        iconContainer: {
            // backgroundColor: 'rgba(0, 0, 0, .1)'

            marginLeft: 'auto',
            display: 'none',
            transition: 'all .4s ease',
            animation: '$fade .1s ease-in-out',
            zIndex: '20'
        },
        deleteIconContainer: {
            gap: '15px'
        },
        statsuIcon: {
            fontSize: '32px'
        },
        deleteIcon: {
            animation: 'delete .3s ease-in-out'
        },

        root: {
            color: theme.palette.colors.white,
            marginLeft: 'auto',
            backgroundColor: 'rgba(0, 0, 0, .3)',
            fontSize: '30px',
            padding: '5px',
            display: 'none',
            transition: 'all .4s ease',
            cursor: 'pointer',
            zIndex: '20'
        },
        rootSelected: {
            color: theme.palette.colors.white,
            marginLeft: 'auto',
            backgroundColor: 'rgba(0, 0, 0, .3)',
            fontSize: '30px',
            padding: '5px',
            display: 'flex',
            transition: 'all .4s ease',
            cursor: 'pointer',
            zIndex: '20'
        },

        icon: {
            color: theme.palette.colors.white,
            backgroundColor: 'rgba(0, 0, 0, .3)',
            padding: '5px',
            width: '30px',
            cursor: 'pointer',
            animation: '$fade .1s ease-in-out'
        },
        card: {
            width: '100%',

            marginTop: '0px',
            position: 'relative',

            // boxShadow: ' 1px 8px 26px -8px rgba(71,67,67,0.83)',

            transition: 'all .4s ease',

            '&:hover': {
                '&  $iconContainer ': {
                    display: 'flex '
                },
                '&  $root': {
                    display: 'flex '
                }
            }
            // '@media (min-width: 1880px)': {
            //     marginTop: '100px'
            // }

            //s   marginTop: '35px'
        },
        image: {
            zIndex: '-1'
        },

        cardWrapper: {
            padding: '0px 15px'

            //  gap: '15px'
        },
        margTop: { marginTop: '-5px' },
        description: {
            color: theme.palette.colors.white,
            fontSize: '14px',
            fontWeight: '400'
        },
        desGrid: {
            width: '100%',
            margin: '0 auto',
            // marginBottom: '25px',

            // transform: 'translateY(-50px)',
            marginTop: '-50px',
            zIndex: '100',
            padding: '15px',
            textShadow: '1px 1px 3px rgb(0 0 0 / 60%)',
            background: 'linear-gradient(to bottom,  rgba(0,0,0,0) 0,rgba(0,0,0,0.65) 100%)'
        },
        dialog: {
            // backgroundColor: 'rgba(0,0,0,0.2)',
            backgroundColor: theme.palette.background.default
        },
        dialogTitle: {
            position: 'relative',
            fontWeight: '600',

            '&::after': {
                position: 'absolute',
                content: "''",
                top: 0,
                left: 0,
                width: '300px',
                height: '20px',
                backgroundColor: theme.palette.background.main
            }
        },
        extraImage: {
            cursor: 'pointer',
            transition: 'all .2s ease',
            '&:hover': {
                opacity: '0.5'
            }
        },
        arrowBack: {
            position: 'absolute',
            top: '250px',
            left: '100px',
            fontSize: '60px',
            color: theme.palette.colors.gray.veryLight,
            cursor: 'pointer',

            '&:hover': {
                color: theme.palette.primary.main
            }
        },
        arrowForward: {
            position: 'absolute',
            top: '250px',
            right: '87px',
            fontSize: '60px',
            color: theme.palette.colors.gray.veryLight,
            cursor: 'pointer',

            '&:hover': {
                color: theme.palette.primary.main
            }
        },
        default: {
            position: 'abosolute'
        },

        '@keyframes delete': {
            '0%': {
                skrewY: '(-30deg)',
                transform: 'translateY(-10px)'
            },
            '25%': {
                skrewY: '(30deg)',
                transform: 'translateY(-7.5px)'
            },
            '50%': {
                skrewY: '(-15deg)',
                transform: 'translateY(-5px)'
            },
            '75%': {
                skrewY: '(15deg)',
                transform: 'translateY(-2.5px)'
            },
            '100%': {
                skrewY: '(0deg)',
                transform: 'translateY(0px)'
            }
        }
    }),

    { index: 1 }
);
