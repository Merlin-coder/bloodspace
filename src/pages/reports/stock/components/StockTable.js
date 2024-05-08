import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Loader from 'components/loader/loaderNew.container';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getFilteredDevicesData,
    getFilteredLocationsData,
    getFilteredStocksData,
    setScreeenIndex
} from 'redux/actions/manage/stocksActions';
import { useStyles } from '../style';
import StockNoData from './StockNoData';
const StockTable = (props) => {
    const {
        setIndex,
        filters,
        setFilters,
        setChipsNames,
        allSelected1,
        setAllSelected1,
        allSelectedFilter1,
        setAllSelectedFilter1,
        setAllProductId,
        setAllBloodGroupId,
        setSelectedProducts,
        setSelectedBloodGroup,
        setSelectedGroup,
        showFilters,
        setTempSelectedFilters,
        setAllSelectedGroup,
        isMainFilter,
        setIsMainFilter
    } = props;
    const [selectedRow, setSelectedRow] = React.useState([]);
    const { stocksLoading, stocksData } = useSelector((state) => state.getStocks);
    const [rows, setRows] = React.useState(stocksData?.data?.stock);
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        setRows(stocksData?.data?.stock);
        let filter = [
            { key: 'bloodGroupId', value: [] },
            { key: 'productGroupId', value: [] }
        ];

        let tempSelectGroup = stocksData?.data?.stock?.map((item) => {
            let { bloodgroupId, productgroupId } = item;
            filter[0].value.push(bloodgroupId);
            filter[1].value.push(productgroupId);

            return { bloodgroupId, productgroupId };
        });

        if (tempSelectGroup?.length > 0) {
            // setFilters(filter);
            setTempSelectedFilters(tempSelectGroup);
        }
    }, [stocksData]);
    const allProductIDs = stocksData?.data?.stock.map((d) => d?.productgroupId);
    const allBloodGroupIDs = stocksData?.data?.stock.map((d) => d?.bloodgroupId);
    const handleRowClick = (id1, id2) => {
        setAllSelected1(false);
        setRows((state) => {
            return rows?.map((row) => {
                if (row?.productgroupId === id1 && row.bloodgroupId === id2) {
                    return { ...row, isSelected: !row.isSelected };
                }
                return row;
            });
        });
    };
    useEffect(() => {
        if (allSelected1 === true) {
            setRows((state) => {
                return rows?.map((row) => {
                    if (row) {
                        return { ...row, isSelected: false };
                    }
                    return row;
                });
            });
        }
    }, [allSelected1]);
    useEffect(() => {
        if (allBloodGroupIDs?.length > 0 && allProductIDs?.length > 0) {
            let filteredData = [
                { key: 'bloodgroupId', value: allBloodGroupIDs },
                { key: 'productgroupId', value: allProductIDs }
            ];
            setIsMainFilter(true);
            setAllSelectedFilter1(filteredData);
            setAllProductId(allProductIDs);
            setAllBloodGroupId(allBloodGroupIDs);
        }
        let filter = [
            { key: 'bloodGroupId', value: [] },
            { key: 'productGroupId', value: [] }
        ];
        let mArray = [];
        let tempSelectGroup = stocksData?.data?.stock?.map((item) => {
            let { bloodgroupId, productgroupId } = item;
            filter[0].value.push(bloodgroupId);
            filter[1].value.push(productgroupId);
            mArray.push({ bloodgroupId: item?.bloodgroupId, productgroupId: item?.productgroupId });
            return { bloodgroupId, productgroupId };
        });
        setAllSelectedGroup(mArray);
        if (tempSelectGroup?.length > 0) {
            // setFilters(filter);
            setTempSelectedFilters(tempSelectGroup);
        }
    }, [rows]);

    useEffect(() => {
        let selected = rows?.filter((row) => row.isSelected && row.isSelected === true);
        setSelectedRow(selected);
    }, [rows]);
    useEffect(() => {
        selectedRow?.length === 0 && setAllSelected1(true);
        let mArray = [];
        let data1 = [];
        let data2 = [];
        let filteredData = [
            { key: 'bloodgroupId', value: [] },
            { key: 'productgroupId', value: [] }
        ];
        selectedRow?.map((row) => {
            filteredData[0].value.push(row?.bloodgroupId);
            filteredData[1].value.push(row?.productgroupId);
            data1.push(row?.bloodgroupId);
            data2.push(row?.productgroupId);
            mArray.push({ bloodgroupId: row?.bloodgroupId, productgroupId: row?.productgroupId });
        });
        filteredData[0]?.value.length > 0 && filteredData[1]?.value.length > 0 && setFilters(filteredData);
        setSelectedGroup(mArray);
        setSelectedBloodGroup(data1);
        setSelectedProducts(data2);
    }, [selectedRow]);
    useEffect(() => {
        if (!allSelected1) {
            if (filters !== undefined && filters[0]?.value.length > 0 && filters[1]?.value.length > 0 && isMainFilter) {
                console.log('location..........');
                dispatch(getFilteredLocationsData(JSON.stringify(filters)));
            }
        }
    }, [filters, allSelected1]);
    useEffect(() => {
        if (allSelected1 && isMainFilter) {
            console.log('location..........');
            dispatch(getFilteredLocationsData());
        }
    }, [isMainFilter, allSelected1]);
    return (
        <TableContainer style={{ overflowX: 'auto', height: '55.2vh' }} className={classes.root}>
            <div>
                <Table
                    stickyHeader
                    className={classes.table}
                    style={{ overflowX: 'auto' }}
                    size="small"
                    aria-label="a dense table"
                >
                    {rows?.length === 0 ? (
                        <>
                            <StockNoData />
                        </>
                    ) : (
                        <>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        <span className={classes.summary}>Product</span>
                                    </TableCell>

                                    <TableCell align="center">
                                        <span className={classes.summary}>Blood Group</span>
                                    </TableCell>

                                    <TableCell align="center">
                                        <span className={classes.summary}>Assigned / Unassigned</span>
                                    </TableCell>
                                    {!setIndex && (
                                        <TableCell>
                                            <span className={classes.summary}>Minimum</span>
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <>
                                    {rows?.map((row1) => (
                                        <>
                                            <TableRow
                                                className={
                                                    row1.isSelected
                                                        ? classes.productBloodRowSelected
                                                        : classes.productBloodRow
                                                }
                                                key={row1._id}
                                                onClick={() => handleRowClick(row1.productgroupId, row1.bloodgroupId)}
                                            >
                                                <TableCell
                                                    size="small"
                                                    component="th"
                                                    scope="row"
                                                    align="left"
                                                    className={
                                                        row1.isSelected ? classes.rowNamesSelected : classes.rowNames
                                                    }
                                                >
                                                    <span> {row1.product} </span>
                                                </TableCell>

                                                <TableCell size="small" align="center">
                                                    <span
                                                        className={
                                                            row1.isSelected
                                                                ? classes.rowValueSelected
                                                                : classes.rowValue
                                                        }
                                                    >
                                                        {row1.bloodgroup}
                                                    </span>
                                                </TableCell>
                                                <TableCell size="small" align="center">
                                                    <span
                                                        className={
                                                            row1.isSelected
                                                                ? classes.rowValueSelected
                                                                : classes.rowValue
                                                        }
                                                    >
                                                        {row1.assigned} <span className={classes.backSlash}>/</span>{' '}
                                                        {row1.unassigned}
                                                    </span>
                                                </TableCell>

                                                <TableCell size="small" align="center">
                                                    <span
                                                        className={
                                                            row1.isSelected
                                                                ? classes.rowValueSelected
                                                                : classes.rowValue
                                                        }
                                                    >
                                                        {row1.minimum}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    ))}
                                </>
                            </TableBody>
                        </>
                    )}
                </Table>
            </div>
        </TableContainer>
    );
};

export default StockTable;
