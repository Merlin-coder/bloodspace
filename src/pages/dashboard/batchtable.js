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
import { IconButton } from '@material-ui/core';
import { getApplyFilters } from 'redux/actions/filters/globalFilterAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';
import moment from 'moment';

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

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
        textAlign: 'right',
        cursor: 'pointer',
        color: theme.palette.colors.gray.main,
        '&:hover': {
            color: theme.palette.primary.main
        }
    }
}));

export default function BatchTable({ columns, response, groupBy, total, hospitalFilters }) {
    console.log('col---', columns)
    console.log('re---', response)
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const route = (value, name, group) => {
        dispatch(setScreeenIndex(1));
        console.log("Route");
        let filtersData;
        if (group?.product?.value === 'Total' && name === 'count') {
            let newFiltersObject = { staticFilters: true };
            dispatch(getApplyFilters(newFiltersObject));
            history.push('/dashboard/request-batch');
            return;
        }
        let chipData = [];

        if (groupBy === 'Product') {
            filtersData = [
                { key: 'batchNumber', value: [group?.batchNumber] },
                //{ key: 'bloodgroupId._id', value: [value?._id && value?._id] },
               // hospitalFilters
            ];
            chipData = [name, group?.name];
            if (name === 'count') {
                filtersData = [{ key: 'batchNumber', value: [group?.batchNumber] }];
                chipData = [group?.name];
            } else if (group?.product?.value === 'Total') {
                filtersData = [{ key: 'bloodgroupId._id', value: [value?.id] }];
                chipData = [name];
            }
            filtersData = filtersData.filter((val) => val);
        } else if (groupBy === 'Location') {
            const arrayOfLocation = [];
            response?.filter((ele) => ele?._id)?.map((ele) => arrayOfLocation.push(ele?.location?._id));
            filtersData = [
                { key: 'locationId._id', value: [group?.id] },
                //{ key: 'bloodgroupId._id', value: [value?._id && value?._id] },
                hospitalFilters
            ];
            chipData = [name, group.name];
            if (group?.location?.value === 'Total' && name === 'Total') {
                filtersData = [{ key: 'locationId._id', value: arrayOfLocation }]; //"622b0878b09c7622f2c4ae12"
                chipData = [name];
            } else if (name === 'count') {
                filtersData = [{ key: 'locationId._id', value: [group?.id] }];
                chipData = [group?.name];
            } else if (group?.location?.value === 'Total') {
                filtersData = [
                    //{ key: 'bloodgroupId._id', value: [value?._id] },
                    { key: 'locationId._id', value: arrayOfLocation }
                ];
                chipData = [name];
            }

            filtersData = filtersData.filter((val) => val);
            console.log(filtersData, 'filtersData');
        } else {
            const arrayOfLocation = [];
            response?.filter((ele) => ele?._id)?.map((ele) => arrayOfLocation.push(ele?.device?._id));
            filtersData = [
               // { key: 'bloodgroupId._id', value: [value?._id && value?._id] },
                { key: 'deviceId._id', value: [group?.id] },
                hospitalFilters
            ];
            chipData = [name, group?.name];
            if (group?.device?.value === 'Total' && name === 'Total') {
                filtersData = [{ key: 'deviceId._id', value: arrayOfLocation }]; //"622b0878b09c7622f2c4ae12"
                chipData = [name];
            } else if (name === 'count') {
                filtersData = [{ key: 'deviceId._id', value: [group?.id] }];
                chipData = [group?.name];
            } else if (group?.device?.value === 'Total') {
                filtersData = [
                   // { key: 'bloodgroupId._id', value: [value?._id] },
                    { key: 'deviceId._id', value: arrayOfLocation }
                ];
                chipData = [name];
            }

            filtersData = filtersData.filter((val) => val);
        }
        // let chipNameAndId = { name: name, id: value?._id };
        let chipNameAndId = {};
        chipNameAndId[`${group?.['product']?.value}`] = group?.['product']?._id;

        if (chipData.includes('A+')) {
            chipNameAndId['A+'] = group['A+']._id;
        }
        if (chipData.includes('A-')) {
            chipNameAndId['A-'] = group['A-']._id;
        }
        if (chipData.includes('B+')) {
            chipNameAndId['B+'] = group['B+']._id;
        }
        if (chipData.includes('B-')) {
            chipNameAndId['B-'] = group['B-']._id;
        }
        if (chipData.includes('AB+')) {
            chipNameAndId['AB+'] = group['AB+']._id;
        }
        if (chipData.includes('AB-')) {
            chipNameAndId['AB-'] = group['AB-']._id;
        }
        if (chipData.includes('Oh+')) {
            chipNameAndId['Oh+'] = group['Oh+']._id;
        }
        if (chipData.includes('Oh-')) {
            chipNameAndId['Oh-'] = group['Oh-']._id;
        }
        if (chipData.includes('O+')) {
            chipNameAndId['O+'] = group['O+']._id;
        }
        if (chipData.includes('O-')) {
            chipNameAndId['O-'] = group['O-']._id;
        }

        let filterKeysObjects = {};

        let newFiltersObject = { chipNameAndId, chipData, filtersData, filterKeysObjects, staticFilters: true };
        console.log('filtersData', chipNameAndId, chipData, filtersData, filterKeysObjects);
        dispatch(getApplyFilters(newFiltersObject));
        history.push('/dashboard/request-batch');
    };
    return (
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell
                                key={column.id + '' + index}
                                className={
                                    column.id === 'product' || column.id === 'location' || column.id === 'device'
                                        ? classes.firstColumn
                                        : classes.noSticky
                                }
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {response?.length > 0 &&
                        response?.map((row, rindex) => {

                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code + '' + rindex}>
                                    {columns.map((column, cindex) => {
                                        const value = row[column.id] || undefined;

                                        // setTotal(total+value);
                                        return (
                                            <TableCell
                                                key={column.id + '' + cindex}                            
                                                align={column.align}
                                                style={{
                                                    textTransform: 'capitalize'
                                                }}
                                            >
                                                <span
                                                    className={
                                                        (value !== undefined &&
                                                            value !== 0 &&
                                                            typeof value !== 'string' &&
                                                            classes.numberSpan) ||
                                                        null
                                                    }
                                                    onClick={() =>
                                                        value !== undefined &&
                                                        value !== 0 &&
                                                        typeof value !== 'string' &&
                                                        route(row[column.id], column.id, row)
                                                    }
                                                >
                                                    {column.id === "expiryDate" ? moment(value).format('DD-MMM-YYYY HH:mm'): value === undefined ? '-' : value === 0 ? '-' : value}
                                                </span>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
