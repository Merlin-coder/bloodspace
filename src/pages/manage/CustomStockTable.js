import {
    IconButton,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles
} from '@material-ui/core';

import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
        border: `1px solid ${theme.palette.colors.gray.light}`,
        borderRadius: '10px 10px 0px 0px',
        '& .MuiTableCell-sizeSmall': {
            padding: '14px 24px 16px 16px'
        },
        overflowX: 'auto',
        height: '55.2vh'
    },
    table: {
        minWidth: 100,
        overflowX: 'auto'
    },
    rowValue: {
        minWidth: '80px',
        fontSize: 14,
        fontWeight: '500',
        backgroundColor: theme.palette.list.main,
        borderRadius: '50px',
        color: theme.palette.colors.black,
        padding: '3px 30px'
    },
    summary: {
        fontSize: (isProductCode) => (isProductCode ? '15px' : '15px'),
        color: theme.palette.primary.darkBlue
    },
    summaryProductCode: {
        fontSize: '13px',
        color: theme.palette.primary.main,
        cursor: 'pointer',
        marginLeft: '20px'
    },

    productRowValue: {
        fontSize: '13px',
        color: theme.palette.colors.gray.main,
        marginRight: '20px'
    },
    productDesc: {
        fontSize: '13px',
        color: theme.palette.colors.gray.main
    },
    pointer: {
        cursor: 'pointer'
    },
    tableHeadRow: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main
    },
    iconStyles: {
        opacity: 0.7,
        fontSize: 16
    },
    iconButton: {
        marginRight: 5
    }
}));
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.darkBlue,
        color: theme.palette.common.white
    },
    body: {
        fontSize: '13px'
    }
}))(TableCell);
const StyledTableCellValue = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.colors.white
    }
}))(TableRow);

function CustomMovementTable(props) {
    const [row, setRow] = React.useState();
    const { response, isProductCode, noDesc, setSelected, selected } = props;
    const [cal, setCal] = React.useState();
    const classes = useStyles(isProductCode);

    const getData = () => {
        if (response) {
            setRow(response.data);
            if (!noDesc) setCal(response.data);
        }
    };
    const filterData = () => {
        setRow(() => {
            if (selected) {
                const filterRow = response.data.filter((value) => value.producyType === selected);

                setRow(filterRow);
            } else {
                ``;
                setRow(response.data);
            }
        });
    };

    React.useEffect(() => {
        if (response) {
            getData();
            filterData();
        }
        isProductCode && setRow();
    }, [response, selected]);
    const [click, setClick] = React.useState(0);

    return (
        <TableContainer className={classes.root}>
            <div>
                <Table stickyHeader className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow className={classes.tableHeadRow}>
                            <TableCell>
                                <span className={classes.summary}>{!noDesc ? 'Product Type' : 'Rule'}</span>
                            </TableCell>
                            {response && noDesc && (
                                <TableCell align="left">
                                    <span className={classes.summary}>Resolution</span>
                                </TableCell>
                            )}
                            {response && noDesc && (
                                <TableCell align={response ? 'left' : 'center'}>
                                    <span className={classes.summary}>Actions</span>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    {row && noDesc ? (
                        <TableBody>
                            {row.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell
                                        size="small"
                                        component="th"
                                        scope="row"
                                        className={classes.productDesc}
                                    >
                                        <span className={classes.productDesc}>{row.rule}</span>
                                    </StyledTableCell>{' '}
                                    {response && noDesc && (
                                        <StyledTableCellValue size="small" align="left">
                                            <span className={classes.productDesc}>{row.resolution}</span>
                                        </StyledTableCellValue>
                                    )}
                                    <StyledTableCellValue size="small" align="left">
                                        <IconButton size="small" className={classes.iconButton}>
                                            <EditIcon className={classes.iconStyles} />
                                        </IconButton>
                                        <IconButton size="small">
                                            <DeleteIcon className={classes.iconStyles} />
                                        </IconButton>
                                    </StyledTableCellValue>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            {row &&
                                cal.map((row1, i) => (
                                    <StyledTableRow
                                        key={row1.name}
                                        style={{ backgroundColor: i === click && '#F2F7FD' }}
                                        className={classes.pointer}
                                    >
                                        <StyledTableCell
                                            size="small"
                                            component="th"
                                            scope="row"
                                            className={classes.productDesc}
                                            onClick={() => {
                                                setClick(i);
                                                setSelected(row1.typeId);
                                                filterData();
                                            }}
                                        >
                                            <span> {row1.description} </span>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            {}
                        </TableBody>
                    )}
                </Table>
            </div>
        </TableContainer>
    );
}

export default CustomMovementTable;
