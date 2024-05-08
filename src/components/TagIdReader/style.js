import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
    (theme) => ({
        rotate: {
            animation: `$rotation 2s infinite cubic-bezier(0.075, 0.82, 0.165, 1)`
            //   transition: 'all 1s cubic-bezier(0.075, 0.82, 0.165, 1)'
        },
        '@keyframes rotation': {
            from: {
                transform: 'rotate(0deg)'
            },
            to: {
                transform: 'rotate(359deg)'
            }
        }
    }),
    { index: 1 }
);
