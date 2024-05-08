import React, { useState, useEffect } from 'react';
import {
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import data from './data.json';
import { useDispatch, useSelector } from 'react-redux';

import { getLFStocksData } from 'redux/actions/manage/stocksActions';
import Loader from 'components/loader/loader.container';
import { useHistory } from 'react-router-dom';
import { getApplyFilters } from 'redux/actions/filters/globalFilterAction';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650
    },
    customTableContainer: {
        overflowX: 'initial'
    },
    summary: {
        fontWeight: '500',
        fontSize: 16,
        cursor: 'pointer'
    },
    firstColumn: {
        position: 'sticky'
    },
    numberSpan: {
        padding: 15,
        cursor: 'pointer',
        color: theme.palette.colors.gray.main,
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    firstRow: {
        //  position: 'absolute',
        backgroundColor: theme.palette.background.default,
        width: '160px',
        fontWeight: '500',
        textAlign: 'justify',
        // zIndex: 100,
        color: theme.palette.colors.gray.main,
        '&:hover': {
            color: theme.palette.primary.main
        }
    }
}));
const columns = [
    {
        id: 'device',
        label: 'Device',
        align: 'left',
        format: (value) => value.toLocaleString('en-US')
    },

    {
        id: 'drawerNo1',
        label: '1',
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'drawerNo2',
        label: '2',
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'drawerNo3',
        label: '3',
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'drawerNo4',
        label: '4',
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'drawerNo5',
        label: '5',
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'drawerNo6',
        label: '6',
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'drawerNo7',
        label: '7',
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'total',
        label: '7',
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    }
];
const DrawerStocks = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [total, setTotal] = useState(0);
    const { lfStocksLoading, lfStocksData } = useSelector((state) => state.getLFStocks);
    let mData = [];
    lfStocksData?.data.map((d) => {
        let mObj = {};
        if (
            d.drawerDetails &&
            d.drawerDetails?.forEach((d) => {
                d.drawerNo === null;
            })
        ) {
            mObj.id = '';
            mObj.device = '';
            mObj.total = '';
            d.drawerDetails &&
                d.drawerDetails?.map((d) => {
                    mObj[`drawerNo${d.drawerNo}`] = '';
                    mObj.drawerNum = '';
                });
        } else {
            mObj.id = d?.deviceInfo && d?.deviceInfo[0]?._id;
            mObj.device = d?.deviceInfo && d?.deviceInfo[0]?.name;
            mObj.total = d?.deviceUnitCount;
            d.drawerDetails &&
                d.drawerDetails?.map((d) => {
                    mObj[`drawerNo${d.drawerNo}`] = d.unitCount;
                    mObj.drawerNum = d.drawerNo;
                });
        }
        mData.push(mObj);
    });
    let totalUnits = lfStocksData?.data?.filter((stock) => stock?.totalUnits)[0]?.totalUnits;
    useEffect(() => {
        dispatch(getLFStocksData());
    }, []);

    const route = (value, name, group) => {
        dispatch(setScreeenIndex(1));
        let filtersData;
        if ((group?.product?.value === 'Total' && name === 'Total') || group?.location?.value === 'Total') {
            let newFiltersObject = { staticFilters: true };
            dispatch(getApplyFilters(newFiltersObject));
            history.push('/dashboard/request-unit');
            return;
        }

        let chipData = [];
        filtersData = [
            { key: 'deviceId._id', value: [group?.id] },
            { key: 'drawerNo', value: group.drawerNum }
        ];
        chipData = [name, group.device];
        if (name === 'total') {
            filtersData = [{ key: 'deviceId._id', value: [group?.id] }];
            chipData = [group.device];
        }
        filtersData = filtersData.filter((val) => val);
        let chipNameAndId = { name: name, id: group?.id };
        let filterKeysObjects = {};
        let newFiltersObject = { chipNameAndId, chipData, filtersData, filterKeysObjects, staticFilters: true };
        dispatch(getApplyFilters(newFiltersObject));
        history.push('/dashboard/request-unit');
    };
    const handleTotalClick = () => {
        dispatch(setScreeenIndex(1));
        let newFiltersObject = { staticFilters: true };
        dispatch(getApplyFilters(newFiltersObject));
        history.push('/dashboard/request-unit');
        return;
    };
    return (
        <>
            <Grid item xs>
                <TableContainer className={classes.customTableContainer}>
                    {lfStocksLoading ? (
                        <div
                            style={{
                                display: 'grid',
                                placeItems: 'center'
                            }}
                        >
                            <Loader />
                        </div>
                    ) : (
                        <Table
                            size="small"
                            stickyHeader
                            aria-label="sticky table"
                            className={classes.table}
                            style={{ minWidth: 650 }}
                        >
                            <TableHead style={{ backgroundColor: '#5874' }}>
                                <TableRow>
                                    <TableCell
                                        className={classes.firstColumn}
                                        style={{ minWidth: 200 }}
                                        align="left"
                                        colSpan={1}
                                        rowSpan={2}
                                    >
                                        <span style={{ marginLeft: 15 }} className={classes.summary}>
                                            Device
                                        </span>
                                    </TableCell>

                                    <TableCell className={classes.firstColumn} align="center" colSpan={7} rowSpan={1}>
                                        <span className={classes.summary}>Drawers</span>
                                    </TableCell>
                                    <TableCell className={classes.firstColumn} align="center" colSpan={1} rowSpan={1}>
                                        <span className={classes.summary}>Total</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    {columns
                                        .filter((v) => v.id !== 'device' && v.id !== 'total' && v.id !== 'drawer')
                                        .map((col) => (
                                            <TableCell
                                                className={classes.firstColumn}
                                                key={col.id}
                                                align="center"
                                                rowSpan={1}
                                            >
                                                {col.label}
                                            </TableCell>
                                        ))}
                                    <TableCell className={classes.firstColumn} align="center" colSpan={1} rowSpan={2}>
                                        <span className={classes.summary} onClick={() => handleTotalClick()}>
                                            {totalUnits}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mData.length > 0 &&
                                    mData
                                        ?.filter((m) => m.device !== undefined)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row?.device}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id] || undefined;
                                                        return (
                                                            <TableCell
                                                                className={
                                                                    column.id === 'device' ? classes.firstRow : ''
                                                                }
                                                                align={column.align}
                                                                key={column.id}
                                                            >
                                                                <span
                                                                    className={classes.numberSpan}
                                                                    onClick={() =>
                                                                        value && route(row[column.id], column.id, row)
                                                                    }
                                                                >
                                                                    {value === undefined
                                                                        ? '-'
                                                                        : value === 0
                                                                        ? '-'
                                                                        : value}
                                                                </span>
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            </Grid>
        </>
    );
};

export default DrawerStocks;
