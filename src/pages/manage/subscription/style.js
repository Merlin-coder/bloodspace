import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    leftPaper: {
        display: 'flex',
        gap: '110px',
        paddingTop: '30px',
        justifyContent: 'center',
        width: '950px'
    },
    card: {
        Width: 580,
        margin: 'auto',
        transition: '0.3s',

        marginLeft: '20px',
        padding: '0 20px',
        border: `1px solid  ${theme.palette.primary.main} `,
        background: ` linear-gradient(146deg,  ${theme.palette.primary.main} 20%,  rgba(256,256,256,0.9) 10%)`
    },
    cardShadow: {
        //   boxShadow: '0 5px 10px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)',
        Width: 480,
        margin: 'auto',
        transition: '0.3s',

        marginLeft: '20px',
        padding: '0 20px'
    },
    media: {
        paddingTop: '65%',
        width: '100px',
        margin: '0 auto'
    },
    content: {
        textAlign: 'center',
        padding: theme.spacing.unit * 2
    },

    heading: {
        fontWeight: 'bold'
    },
    subheading: {
        lineHeight: 1.8
    },
    priceCardContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: '40px',
        gap: '20px'
    },
    coontetnContainer: {},
    description: {
        color: theme.palette.colors.gray.main,

        fontSize: '18px'
    },
    number: {
        color: theme.palette.primary.main,
        borderRadius: ' 50%',
        border: `2px solid  ${theme.palette.primary.main}`,
        textAlign: 'center',
        width: '27px',
        height: '27px',
        padding: '1px'
    },
    divider: {
        width: '70%',
        margin: '0 auto'
    },
    textContainer: {
        marginTop: '30px'
    },
    choosePlan: {
        fontWeight: '700',
        fontSize: '28px'
    },
    choosePlanDesc: {
        fontSize: '16px',
        color: theme.palette.colors.gray.main,
        marginTop: '-4px',
        textAlign: 'center'
    },
    features: {
        paddingTop: '10px',
        width: '80%',
        margin: '0 auto',
        textAlign: 'center'
    },
    featuresText: {
        fontWeight: '500 !important',
        fontSize: '15px',
        letterSpacing: '1.2 !important',
        opacity: '0.9'
    },
    textDivider: {
        margin: '4px 0'
    },
    button: {
        borderRadius: '50px',
        marginTop: '20px',
        padding: '6px 35px',
        textTransform: 'capitalize'
    }
}));
