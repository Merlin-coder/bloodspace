import { makeStyles } from '@material-ui/core/styles';

export const headerInfoStyles = makeStyles(
    (theme) => ({
        buttonStyles: {
            display: 'inline-block',
            border: `solid 1px ${theme.palette.primary.main}`,
            color: theme.palette.primary.main,
            minWidth: 80,
            lineHeight: 1,
            padding: 0,
            marginRight: 10,
            height: 80
        },
        infoGrid: {
            display: 'inline-block',
            marginRight: 10,
            padding: '0 30px',
            borderRight: `solid 2px ${theme.palette.primary.main}`
        },
        infoGridlast: {
            display: 'inline-block',
            marginRight: 10,
            padding: '0 30px'
        },
        buttonsGrid: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        leftGridValue: {
            lineHeight: 1.8
        },
        selectedButtonStyles: {
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
                border: `solid 1px ${theme.palette.primary.main}`,
                color: theme.palette.background.default
            },
            display: 'inline-block',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.default,
            minWidth: 80,
            lineHeight: 1,
            padding: 0,
            marginRight: 10,
            transition: 'all 0.4s linear',
            height: 80
        }
    }),
    { index: 1 }
);
