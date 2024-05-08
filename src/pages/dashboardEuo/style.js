import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles(
    (theme) => ({
        firstDiv: {
            padding: '10px 0px',
            //maxWidth: '1600px',
            margin: '0 auto'
        },
        counter: {
            fontSize: 55,
            fontWeight: 500,
            textAlign: 'center'
        },
        header: {
            padding: '10px 0px',

            maxWidth: '1600px',
            margin: '0 auto',
            marginLeft: '11px'
        },
        xs4Grid: {
            flexGrow: '0',
            maxWidth: '35.333333%',
            flexBasis: '35.333333% '
        },
        xs8Grid: {
            flexGrow: '0',
            maxWidth: '64.6666%',
            flexBasis: '64.6666% '
        },
        totalNo: {
            fontSize: '18px',
            color: theme.palette.colors.gray.dark,
            fontWeight: '300'
        },
        a: {
            textDecoration: 'none',
            color: 'inherit'
        },

        figures: {
            fontSize: '19px',
            fontWeight: '600',
            color: theme.palette.colors.black,
            marginLeft: '5px'
        },
        detailCard: {
            padding: '30px 50px',
            minWidth: '210px',
            boxShadow: '0 0 25px rgba(0,0,0,0.1)',
            borderRadius: '10px'
        },
        swapoutCard: {
            padding: '50px 265px',
            minWidth: '210px',
            boxShadow: '0 0 25px rgba(0,0,0,0.1)',
            borderRadius: '10px'
        },
        selectedButton: {
            backgroundColor: theme.palette.background.dark,
            padding: '8px 35px',
            textTransform: 'capitalize',
            '&:hover': {
                backgroundColor: theme.palette.background.dark
            }
        },
        disabledButton: {
            backgroundColor: theme.palette.colors.white,
            padding: '8px 35px',
            textTransform: 'capitalize',
            color: theme.palette.colors.gray.dark,
            border: `1px solid ${theme.palette.background.dark}`,
            '&:hover': {
                backgroundColor: theme.palette.colors.white,
                border: `1px solid ${theme.palette.background.dark}`
            }
        },
        detailCardTable: {
            padding: '30px 50px',
            minWidth: '210px',
            boxShadow: '0 0 25px rgba(0,0,0,0.1)',
            borderRadius: '10px'
        },
        smalldetailCard: {
            padding: '20px 25px',
            width: '100%',
            boxShadow: '0 0 25px rgba(0,0,0,0.1)',
            borderRadius: '10px'
        },
        smalldetailCardError: {
          
            boxShadow: '0 0 25px rgba(0,0,0,0.1)',
            borderRadius: '10px',
            borderLeft: '10px solid #CC1414',
        },
        smalldetailCardAvailable: {

            boxShadow: '0 0 25px rgba(0,0,0,0.1)',
            borderRadius: '10px',
            borderLeft: '10px solid green',
        },
        smalldetailCardAvail: {
            boxShadow: '0 0 25px rgba(0,0,0,0.1)',
            borderRadius: '10px',
            borderLeft: '10px solid yellow',
            //borderLeft: '10px solid #83bed4',
        },
        smalldetailCardMoveout: {

            boxShadow: '0 0 25px rgba(0,0,0,0.1)',
            borderRadius: '10px',
            borderLeft: '10px solid yellow',
        },
        tabledetailMoveOut: {
           
            borderRadius: '10px',
            borderLeft: '10px solid yellow',
        },
        tabledetailAvailable: {

            borderRadius: '10px',
            borderLeft: '10px solid green',
        },
        tabledetailError: {

            borderRadius: '10px',
            borderLeft: '10px solid #CC1414',
        },
        tabledetail: {
            padding: '20px 25px',
            width: '100%',
            //boxShadow: '0 0 25px rgba(0,0,0,0.1)',
            borderRadius: '10px'
        },
        iconContainer: {
            marginLeft: '-10px'
        },
        cardIcon: {
            fontSize: '50px'
        },
        cardMainText: {
            fontSize: '22px',
            fontWeight: '500',
            color: theme.palette.primary.main
        },
        iconValue: {
            fontSize: '45px',
            fontWeight: '500'
        },
        cardSubText: {
            fontSize: '17px',
            fontWeight: '400',
            color: theme.palette.colors.gray.main
        },
        cardSubSubText: {
            fontSize: '15px',
            fontWeight: '400',
            color: theme.palette.colors.gray.main
        },
        image: {
            display: 'block',
            margin: 'auto',
            height: '90px',
            width: '90px',
        },
        boxShadow: {
            boxShadow: '0 0 25px rgb(0 0 0 / 10%)'
        },
        numberSpan: {
            fontWeight: '500',
            marginLeft: '20px',
            textAlign: 'justify',
            color: theme.palette.colors.gray.main,
            '&:hover': {
                color: theme.palette.primary.main
            }
        },
        smalldetailTitle: {
            fontSize: '20px',
            fontWeight: '600'
        },
        smallCardIcon: {
            fontSize: '35px',
            marginLeft: '-4px',
            marginTop: '4px'
        },
        smallIconValue: {
            fontSize: '27px',
            fontWeight: '500'
        },
        resolution: {
            fontSize: '17px',
            color: theme.palette.colors.gray.main
        },
        resolutionRed: {
            fontSize: '18px',
            fontWeight: '500',
            minWidth: 35,
            justifyContent: 'center',
            display: 'flex'
        },
        resolutionValue: {
            fontSize: '18px',
            fontWeight: '500',
            color: '#247424',
            minWidth: 35,
            justifyContent: 'center',
            display: 'flex'
        },
        buttonGroup: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
                margin: theme.spacing(1)
            }
        },
        selectedButtonGroup: {
            backgroundColor: theme.palette.background.dark,
            '&:hover': {
                backgroundColor: theme.palette.background.dark
            }
        },
        radio: {
            '&$checked': {
                color: theme.palette.primary.main
            }
        },
        radioBtns: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '5px'
        },
        radioLabels: {
            '& .MuiFormControlLabel-label': {
                fontSize: 12
            }
        },

        warning: { color: '#f44336' },
        inputLabel: {
            fontSize: 14,
            marginBottom: 10,
            color: '#777777'
        },
        sideBar: {
            height: 'fit-content',
            backgroundColor: '#fff',
            width: '400px',
            borderRadius: 10,
            padding: '15px 25px !important',
            margin: '0 auto',
            marginTop: '0px'
        },
        tipsTypoBlue: {
            fontSize: 26,
            fontWeight: 500,
            color: theme.palette.primary.main
        },
        tipsTypo: {
            fontWeight: 400,
            color: theme.palette.colors.gray.main
        },
        tipsTypoSmall: {
            fontSize: 15,
            fontWeight: 400,
            color: theme.palette.colors.gray.main
        },
        typographyGray: {
            fontWeight: 400,
            textAlign: 'center',
            color: '#000',
            marginTop: 15
        },
        checked: {},
        blink: {
            animation: '$blinkAnimation 1s infinite',
        },
        '@keyframes blinkAnimation': {
            '0%, 100%': {
                opacity: 1,
            },
            '50%': {
                opacity: 0,
            },
        },

        // detailFigure: {
        //     fontSize: '20px',

        // },
        // detailFigureDesc: {
        //     fontSize: '22px',

        // },
        // chartCard: {
        //     padding: '15px 35px',
        //     boxShadow: '0 0 25px rgba(0,0,0,0.18)',
        //     borderRadius: '8px'
        // },
        // chartDiv: {
        //     paddingTop: '0px',
        //     padding: '10px 120px',
        //     marginTop: '5px'
        // },
        // tab: {
        //     '& .MuiTab-root': {
        //         minWidth: '50px',
        //         fontSize: '9.5px',
        //         fontWeight: '600'
        //     },
        //     '& .MuiTab-textColorPrimary.Mui-selected': {
        //         color: theme.palette.colors.gray.dark,
        //         fontSize: '10.5px'
        //     },
        //     '& .MuiTabs-indicator': {
        //         backgroundColor: theme.palette.colors.gray.main
        //     }
        // },
        // barChart: {
        //     marginTop: '40px',
        //     paddingBottom: '10px'
        // },
        // top5design: {
        //     fontWeight: 'bold'
        // },
        // DoughnutChart: {
        //     marginTop: '20px',
        //     marginBottom: '10px',
        //     //  transform: 'rotate(90deg)'
        //     width: '50%',
        //     margin: '0 auto'
        // },
        // pieCustomer: {
        //     paddingBottom: '14px',
        //     paddingTop: '10px'
        // },
        // PieChart: {
        //     marginTop: '13px',
        //     marginBottom: '9px'
        // },
        // totalNoOF: {
        //     fontSize: '13px',
        //     fontWeight: '400',
        //     color: theme.palette.colors.gray.dark,
        //     opacity: '0.8',
        //     padding: '11.5px 0'
        // },
        // noSpan: {
        //     marginLeft: 'auto',
        //     fontSize: '20px',
        //     fontWeight: '300'
        //     //color: theme.palette.colors.gray.dark,
        //     //opacity: '0.9',
        // }
    }),

    { index: 1 }
);
