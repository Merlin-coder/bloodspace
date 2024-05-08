import { makeStyles } from '@material-ui/core';

export const searchTableStyles = makeStyles(
    () => ({
        tablePagiNation: {
            '& .MuiTablePagination-spacer': {
                display: 'none'
            },
            '& p:nth-last-child(2)': {
                marginLeft: 'auto'
            },
            color: '#777777',
            backgroundColor: '#F2F7FB',
            '& p:nth-child(2)': {
                marginLeft: '-15px'
            }
        }
    }),
    { index: 1 }
);
