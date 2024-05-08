import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiTableCell-stickyHeader': {
            position: 'none'
        }
    },
    container: {
        maxHeight: 440
    },

    noSticky: {
        // position: 'inherit !important',
        // '& .MuiTableCell-stickyHeader': {
        //     position: 'none'
        // }
    },
    firstColumn: {
        position: 'sticky'
    },
    firstRow: {
        //  position: 'absolute',
        backgroundColor: theme.palette.background.default,
        width: '160px'
        // zIndex: 100
    },
    numberSpan: {
        fontWeight: '500',
        textAlign: 'justify',
        color: theme.palette.colors.gray.main,
        '&:hover': {
            color: theme.palette.primary.main
        }
    }
}));

export default function StickyHeadTable(columns, rows) {
    console.log(columns);

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    className={classes.noSticky}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {columns.row.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.columns?.map((column) => {
                                        const value = row[column.dbProperty];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
