import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Loader from 'components/loader/loaderNew.container';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredStocksData, setScreeenIndex } from 'redux/actions/manage/stocksActions';
import { useStyles } from '../style';
import StockNoData from './StockNoData';
const FilteredStockTable = (props) => {
    const {
        setIndex,
        filters3,
        selectedLocations,
        filters4,
        setFilters4,
        refFilters,
        setRefFilters,
        chipsNames,
        setChipsNames,
        screenIndex,
        selectedDeviceName,
        selectedLocationName,
        selectedDevices
    } = props;
    const dispatch = useDispatch();
    const [selectedRow, setSelectedRow] = React.useState([]);
    const { filteredStocksLoading, filteredStocksData } = useSelector((state) => state.getFilteredStocks);
    const { filteredDevicesLoading, filteredDevicesData } = useSelector((state) => state.getFilteredDevices);
    const { filteredLocationsLoading, filteredLocationsData } = useSelector((state) => state.getFilteredLocations);
    const [rows, setRows] = React.useState(filteredStocksData?.data?.stock);
    useEffect(() => {
        const locationFilter = filteredLocationsData?.data;
        const deviceFilter = filteredDevicesData?.data;
        if (locationFilter?.length > 0 && deviceFilter?.length > 0) {
            setRows(filteredStocksData?.data?.stock);
        } else {
            setRows([]);
        }
    }, [filteredLocationsData, filteredDevicesData, filteredStocksData?.data?.stock]);
    const classes = useStyles();
    const handleRowClick = (id1, id2) => {
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
        let selected = rows?.filter((row) => row.isSelected && row.isSelected === true);
        setSelectedRow(selected);
    }, [rows]);

    useEffect(() => {
        let filteredData = [
            { key: 'productgroupId._id', value: [] },
            { key: 'bloodgroupId._id', value: [] },
            { key: 'locationId._id', value: [] },
            { key: 'deviceId._id', value: [] }
        ];
        let filteredData3 = [
            { key: 'productgroupId._id', value: [] },
            { key: 'bloodgroupId._id', value: [] },
            { key: 'locationId._id', value: [] }
        ];
        let filteredData4 = [
            { key: 'productgroupId._id', value: [] },
            { key: 'bloodgroupId._id', value: [] },
            { key: 'deviceId._id', value: [] }
        ];
        let filteredData2 = [
            { key: 'productgroupId._id', value: [] },
            { key: 'bloodgroupId._id', value: [] }
        ];
        let productNames = {};
        let bloodGroupNames = {};
        let mChipArray = [];
        selectedRow?.map((row) => {
            if (selectedLocations?.length === 0 && selectedDevices?.length === 0) {
                filteredData2[0].value.push(row?.productgroupId);
                filteredData2[1].value.push(row?.bloodgroupId);
                mChipArray.push({ id: row?.productgroupId, name: row?.product });
                mChipArray.push({ id: row?.bloodgroupId, name: row?.bloodgroup });
            } else if (selectedLocations?.length === 0) {
                filteredData4[0].value.push(row?.productgroupId);
                filteredData4[1].value.push(row?.bloodgroupId);
                filteredData4[2].value = selectedDevices;
                mChipArray.push({ id: row?.productgroupId, name: row?.product });
                mChipArray.push({ id: row?.bloodgroupId, name: row?.bloodgroup });
            } else if (selectedDevices?.length === 0) {
                filteredData3[0].value.push(row?.productgroupId);
                filteredData3[0].value.push(row?.bloodgroupId);
                filteredData3[1].value = selectedLocations;
                mChipArray.push({ id: row?.productgroupId, name: row?.product });
                mChipArray.push({ id: row?.bloodgroupId, name: row?.bloodgroup });
            } else {
                filteredData[0].value.push(row?.productgroupId);
                filteredData[1].value.push(row?.bloodgroupId);
                filteredData[2].value = selectedLocations;
                filteredData[3].value = selectedDevices;
                mChipArray.push({ id: row?.productgroupId, name: row?.product });
                mChipArray.push({ id: row?.bloodgroupId, name: row?.bloodgroup });
            }
        });
        function duplicateChips(arr) {
            let chipArray = [];
            arr.forEach((item) => {
                if (chipArray.findIndex((x) => x.name === item.name) === -1) {
                    chipArray.push(item);
                }
            });
            return chipArray;
        }
        let chips = duplicateChips(mChipArray);

        setChipsNames([...chips, ...selectedLocationName, ...selectedDeviceName]);
        setFilters4(
            selectedLocations?.length === 0 && selectedDevices?.length === 0
                ? filteredData2
                : selectedLocations?.length === 0
                ? filteredData4
                : selectedDevices?.length === 0
                ? filteredData3
                : filteredData
        );
    }, [selectedRow]);

    useEffect(() => {
        if (filters4 !== undefined) {
            filters4[0]?.value?.length !== 0 && setRefFilters(filters4);
        }
    }, [filters4]);
    // useEffect(() => {
    //     refFilters !== null && refFilters.length !== 0 && dispatch(setScreeenIndex(1));
    // }, [refFilters]);
    return (
        <TableContainer style={{ overflowX: 'auto', height: '55.2vh' }} className={classes.root}>
            <Table
                stickyHeader
                className={classes.table}
                style={{ overflowX: 'auto' }}
                size="small"
                aria-label="a dense table"
            >
                {rows?.length === 0 || rows === undefined ? (
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

                                <TableCell align="left">
                                    <span className={classes.summary}>Blood Group</span>
                                </TableCell>

                                <TableCell align="center">
                                    <span className={classes.summary}>Assigned / Unassigned</span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows?.map((row1) => (
                                <>
                                    <TableRow
                                        className={
                                            row1.isSelected ? classes.productBloodRowSelected : classes.productBloodRow
                                        }
                                        key={row1.productgroupId}
                                        onClick={() => {
                                            handleRowClick(row1.productgroupId, row1.bloodgroupId);
                                        }}
                                    >
                                        <TableCell
                                            size="small"
                                            component="th"
                                            scope="row"
                                            align="left"
                                            className={
                                                setIndex
                                                    ? classes.isLink
                                                    : row1.isSelected
                                                    ? classes.rowNamesSelected
                                                    : classes.rowNames
                                            }
                                        >
                                            <span> {row1.product} </span>
                                        </TableCell>

                                        <TableCell size="small" align="center">
                                            <span
                                                className={
                                                    row1.isSelected ? classes.rowValueSelected : classes.rowValue
                                                }
                                            >
                                                {row1.bloodgroup}
                                            </span>
                                        </TableCell>
                                        <TableCell size="small" align="center">
                                            <span
                                                className={
                                                    row1.isSelected ? classes.rowValueSelected : classes.rowValue
                                                }
                                            >
                                                {row1.assigned} <span className={classes.backSlash}>/</span>{' '}
                                                {row1.unassigned}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </>
                )}
            </Table>
        </TableContainer>
    );
};

export default FilteredStockTable;
