import { makeStyles } from '@material-ui/core';
import { CONSTANTS } from 'common';

export const searchTableStyles = makeStyles(
    (theme) => ({
        tableHead: {
            backgroundColor: theme.palette.background.default,
            opacity: '.9',
            borderBottom: `1.6px solid ${theme.palette.colors.gray.light}`,
            borderTop: `1.6px solid ${theme.palette.colors.gray.light}`,
            paddingTop: 0,
            paddingBottom: 0
        },
        alignLeft: {
            textAlign: 'left'
        },
        colorBlue: {
            color: theme.palette.primary.darkBlue
        },
        tablePagiNation: {
            '& .MuiTablePagination-spacer': {
                display: 'none'
            },
            '& p:nth-last-child(2)': {
                marginLeft: 'auto'
            },
            color: theme.palette.colors.gray.main,
            backgroundColor: theme.palette.background.default,
            '& p:nth-child(2)': {
                marginLeft: '-15px'
            }
        }
    }),
    { index: 1 }
);
