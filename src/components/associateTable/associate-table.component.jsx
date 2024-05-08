import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DialogTitle, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { data } from './associate-table-data.container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import DownloadExcel from '../../components/download-excel-data/download-excel-data.component';
import Search from '../../components/search/search.container';
import CustomInput from '../shared/CustomInput';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: '550px',
        '& .MuiTableCell-stickyHeader': {
            backgroundColor: theme.pallete.colors.gray.light,
            borderBottom: '5px'
        }
    },
    main: {
        paddingTop: '50px'
    },
    head: {
        backgroundColor: theme.palette.colors.black,
        '& .MuiTableRow-root': {
            backgroundColor: theme.palette.colors.gray.main
        }
    },
    first: {
        marginBottom: '20px'
    },
    search: {
        height: '40px'
    },
    bold: {
        fontWeight: 'bold'
    },
    right: {
        marginRight: '300px'
    },
    tableHeaderCell: {
        // color: 'red'
        width: 'auto'
    }
}));
const DragHead = SortableContainer(({ children }) => {
    return (
        <TableHead style={{ backgroundColor: '#EFEFEF !important', boxShadow: '6px 0px 5px 0px  ' }}>
            <TableRow>{children}</TableRow>
        </TableHead>
    );
});

const DragCell = SortableElement(({ value }) => {
    return <>{value}</>;
});

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.secondary.main
                  //   backgroundColor: lighten(theme.palette.secondary.light, 0.85)
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark
              },
    title: {
        flex: '1 1 100%'
    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();

    const { numSelected, open, setOpen, isTableDisplay } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
            style={{ overflow: 'hidden' }}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    <Search />
                </Typography>
            )}

            <Button onClick={() => setOpen(true)} disabled={isTableDisplay}>
                <DeleteIcon />
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogTitle></DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        cancel
                    </Button>
                    <Button onClick={() => setOpen(false)} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <DownloadExcel disabled={isTableDisplay} />
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

function AssociateTableComponent(props) {
    const {
        page,
        rowsPerPage,
        order,
        handleChangePage,
        handleChangeRowsPerPage,
        setOrder,
        columns,
        open,
        setOpen,
        isTableDisplay,
        searchDataFromList
    } = props;
    const classes = useStyles();
    const onReorderEnd = useCallback(
        ({ oldIndex, newIndex }) => {
            const newOrder = [...order];
            const moved = newOrder.splice(oldIndex, 1);
            newOrder.splice(newIndex, 0, moved[0]);
            setOrder(newOrder);
        },
        [order, setOrder]
    );
    return (
        <>
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={0} open={open} setOpen={setOpen} isTableDisplay={isTableDisplay} />
                <TableContainer className={classes.container}>
                    {data && (
                        <>
                            <Table stickyHeader>
                                <DragHead axis="x" onSortEnd={onReorderEnd}>
                                    {order.map((colIdx, i) => (
                                        <DragCell
                                            index={i}
                                            key={colIdx}
                                            value={
                                                <TableCell
                                                    align={columns[colIdx].align}
                                                    className={classes.tableHeaderCell}
                                                >
                                                    {columns[colIdx].label}
                                                </TableCell>
                                            }
                                        />
                                    ))}
                                </DragHead>

                                <TableBody>
                                    {data &&
                                        data.map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {order.map((column) => {
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {row.metaData[column].value || '-'}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </>
                    )}
                    {!data && (
                        <Table stickyHeader aria-label="sticky table" style={{ marginTop: '20px' }}>
                            <DragHead axis="x" onSortEnd={onReorderEnd}>
                                {order.map((colIdx, i) => (
                                    <DragCell
                                        index={i}
                                        key={colIdx}
                                        value={
                                            <TableCell
                                                align={columns[colIdx].align}
                                                className={classes.tableHeaderCell}
                                            >
                                                {columns[colIdx].label}
                                            </TableCell>
                                        }
                                    />
                                ))}
                            </DragHead>
                            {/* <TableBody style={{ display: 'flex', marginTop: '30px' }}> */}
                            <TableCell>
                                <CustomInput size="md" onChange={searchDataFromList} />
                            </TableCell>
                            <TableCell>
                                <CustomInput size="md" />
                            </TableCell>
                            <TableCell>
                                <CustomInput size="md" />
                            </TableCell>
                            {/* </TableBody> */}
                        </Table>
                    )}

                    {data && (
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={10}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            style={{ border: '1px solid darkgrey' }}
                        />
                    )}
                </TableContainer>
            </Paper>
            <Grid container style={{ justifyContent: 'center', display: 'flex', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ width: '150px', height: 40, letterSpacing: 2, fontSize: 16 }}
                    disabled={isTableDisplay}
                >
                    Update
                </Button>
            </Grid>
        </>
    );
}
export default AssociateTableComponent;
