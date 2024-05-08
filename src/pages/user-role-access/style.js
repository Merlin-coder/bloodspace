import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
    (theme) => ({
        checkBox: {
            '& .MuiFormControlLabel-root': {
                margin: 0
            }
        },
        tags: {
            display: 'grid',
            gridTemplateRows: 'repeat(5, 0.5fr)',
            gridAutoFlow: 'column',
            gridAutoColumns: '220px 250px',
            gap: '2px'
        },
        contentGrid: {
            display: 'flex'
        },
        itemLabel: {
            flex: 0.5,
            fontWeight: '500',
            fontSize: 'medium'
        },
        colonClass: {
            padding: '0 7px'
        },
        voucherValue: {
            flex: 1
        }
    }),
    { index: 1 }
);
