import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Loader from 'components/loader/loaderNew.container';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredDevicesData, getFilteredStocksData } from 'redux/actions/manage/stocksActions';
import { useStyles } from '../style';
const DeviceTable = (props) => {
    const {
        tempSelectedFIlters,
        filters3,
        setFilters3,
        isMainFilter,
        allSelected1,
        allSelected2,
        allSelected3,
        setAllSelected3,
        selectedLocations,
        selectedGroup,
        setSelectedDeviceName,
        tempLocations,
        filters,
        setSelectedDevices,
        allSelectedGroup,
        allLocationID
    } = props;

    const [selectedRows, setSelectedRows] = useState([]);
    const [deviceFilter, setDeviceFilter] = useState([]);
    const [deviceFilter2, setDeviceFilter2] = useState([]);
    const [deviceFilter3, setDeviceFilter3] = useState([]);
    const [deviceFilter4, setDeviceFilter4] = useState([]);
    const [deviceFilter5, setDeviceFilter5] = useState([]);
    const [deviceFilter6, setDeviceFilter6] = useState([]);
    const [allDeviceId, setAllDeviceID] = useState([]);
    const classes = useStyles();
    const { filteredDevicesLoading, filteredDevicesData } = useSelector((state) => state.getFilteredDevices);
    const [rows, setRows] = useState(filteredDevicesData?.data);
    const dispatch = useDispatch();
    useEffect(() => {
        setRows(filteredDevicesData?.data);

        // let LocationFilter = { key: 'deviceId', value: value };
        // let filteredData = [
        //     { key: 'selectedGroup', value: selectedGroup.length > 0 ? selectedGroup : tempSelectedFIlters },
        //     tempLocations,
        //     { key: 'deviceId', value: value }
        // ];

        // if (value !== undefined) {
        //     dispatch(getFilteredStocksData(JSON.stringify(filteredData)));
        // }
    }, [filteredDevicesData]);
    let allDeviceIds = filteredDevicesData?.data?.map((val) => val._id);
    const handleRowClick = (id) => {
        setAllSelected3(false);
        setRows((state) => {
            return rows?.map((row) => {
                if (row?._id === id) {
                    return { ...row, isSelected: !row.isSelected };
                }
                return row;
            });
        });
    };

    useEffect(() => {
        let selected = rows?.filter((row) => row.isSelected && row.isSelected === true);
        setSelectedRows(selected);
        let value = filteredDevicesData?.data?.map((val) => val._id);
        setAllDeviceID(value);
    }, [rows]);
    useEffect(() => {
        selectedRows?.length === 0 && setAllSelected3(true);
        let mData = [];
        let data = [];
        selectedRows?.map((row) => {
            mData.push({ id: row?._id, name: row?.name });
            data.push(row?._id);
        });
        setSelectedDeviceName(mData);
        setSelectedDevices(data);
    }, [selectedRows]);

    useEffect(() => {
        // if (allSelected1 && allSelected2 && allSelected3) {
        //     if (allSelectedGroup?.length > 0 && allLocationID?.length > 0 && allDeviceIds?.length > 0) {
        //         let filteredData = [
        //             { key: 'selectedGroup', value: allSelectedGroup.length > 0 && selectedGroup },
        //             { key: 'locationId', value: allLocationID },
        //             { key: 'deviceId', value: allDeviceIds }
        //         ];
        //             selectedRows?.map((row) => {
        //                 filteredData[2].value.push(row?._id);
        //             });
        //         filteredData[2]?.value?.length > 0 && setFilters3(filteredData);
        //     }
        // }
        if (allSelected1 && allSelected2 && !allSelected3) {
            if (allSelectedGroup?.length > 0 && allLocationID?.length > 0) {
                let filteredData = [
                    { key: 'selectedGroup', value: allSelectedGroup },
                    { key: 'locationId', value: allLocationID },
                    { key: 'deviceId', value: [] }
                ];
                selectedRows?.map((row) => {
                    filteredData[2].value.push(row?._id);
                });
                filteredData[2]?.value?.length > 0 && setDeviceFilter(filteredData);
            }
        }
        if (allSelected1 && !allSelected2 && allSelected3) {
            if (allSelectedGroup?.length > 0 && selectedLocations?.length > 0 && allDeviceIds?.length > 0) {
                let filteredData = [
                    { key: 'selectedGroup', value: allSelectedGroup },
                    { key: 'locationId', value: selectedLocations },
                    { key: 'deviceId', value: allDeviceIds }
                ];

                filteredData[2]?.value?.length > 0 && setDeviceFilter2(filteredData);
            }
        }
        if (allSelected1 && !allSelected2 && !allSelected3) {
            if (allSelectedGroup?.length > 0 && selectedLocations?.length > 0) {
                let filteredData = [
                    { key: 'selectedGroup', value: allSelectedGroup },
                    { key: 'locationId', value: selectedLocations },
                    { key: 'deviceId', value: [] }
                ];
                selectedRows?.map((row) => {
                    filteredData[2].value.push(row?._id);
                });
                filteredData[2]?.value?.length > 0 && setDeviceFilter3(filteredData);
            }
        }
        if (!allSelected1 && allSelected2 && allSelected3) {
            if (selectedGroup.length > 0 && allLocationID?.length > 0 && allDeviceIds?.length > 0) {
                let filteredData = [
                    { key: 'selectedGroup', value: selectedGroup },
                    { key: 'locationId', value: allLocationID },
                    { key: 'deviceId', value: allDeviceIds }
                ];

                filteredData[2]?.value?.length > 0 && setDeviceFilter4(filteredData);
            }
        }
        if (!allSelected1 && allSelected2 && !allSelected3) {
            if (selectedGroup.length > 0 && allLocationID?.length > 0) {
                let filteredData = [
                    { key: 'selectedGroup', value: selectedGroup },
                    { key: 'locationId', value: allLocationID },
                    { key: 'deviceId', value: [] }
                ];
                selectedRows?.map((row) => {
                    filteredData[2].value.push(row?._id);
                });
                filteredData[2]?.value?.length > 0 && setDeviceFilter5(filteredData);
            }
        }
        if (!allSelected1 && !allSelected2 && allSelected3) {
            if (selectedGroup.length > 0 && selectedLocations?.length > 0 && allDeviceIds?.length > 0) {
                let filteredData = [
                    { key: 'selectedGroup', value: selectedGroup },
                    { key: 'locationId', value: selectedLocations },
                    { key: 'deviceId', value: allDeviceIds }
                ];
                filteredData[2]?.value?.length > 0 && setDeviceFilter6(filteredData);
            }
        }
        if (!allSelected1 && !allSelected2 && !allSelected3) {
            if (selectedGroup.length > 0 && selectedLocations?.length > 0) {
                let filteredData = [
                    { key: 'selectedGroup', value: selectedGroup },
                    { key: 'locationId', value: selectedLocations },
                    { key: 'deviceId', value: [] }
                ];
                selectedRows?.map((row) => {
                    filteredData[2].value.push(row?._id);
                });
                filteredData[2]?.value?.length > 0 && setFilters3(filteredData);
            }
        }
    }, [selectedRows, allSelected1, allSelected2, allSelected3]);
    // useEffect(() => {
    //     if (!allSelected3 && allSelected2) {
    //         let filteredData = [{ key: 'deviceId', value: [] }];
    //         selectedRows?.map((row) => {
    //             filteredData[0].value.push(row?._id);
    //         });
    //         filteredData[0]?.value.length > 0 && setDeviceFilter(filteredData);
    //     }
    // }, [selectedRows, allSelected3, allSelected2]);
    // useEffect(() => {
    //     if (!allSelected3 && !allSelected2) {
    //         if (selectedLocations?.length > 0) {
    //             let filteredData = [
    //                 { key: 'locationId', value: selectedLocations },
    //                 { key: 'deviceId', value: [] }
    //             ];
    //             selectedRows?.map((row) => {
    //                 filteredData[1].value.push(row?._id);
    //             });
    //             filteredData[1]?.value.length > 0 && setDeviceFilter2(filteredData);
    //         }
    //     }
    // }, [selectedRows, allSelected3, allSelected2]);
    useEffect(() => {
        if (!allSelected1 && !allSelected2 && !allSelected3 && isMainFilter) {
            if (filters3 !== undefined && filters3.length > 0) {
                console.log('deviceFilter.............');
                dispatch(getFilteredStocksData(JSON.stringify(filters3)));
            }
        }
    }, [filters3, allSelected1, allSelected2, allSelected3]);
    useEffect(() => {
        if (isMainFilter && allSelected1 && allSelected2 && allSelected3) {
            console.log('deviceFilter.............');
            dispatch(getFilteredStocksData());
        }
    }, [isMainFilter, allSelected1, allSelected2, allSelected3]);
    useEffect(() => {
        if (allSelected1 && allSelected2 && !allSelected3) {
            if (deviceFilter !== undefined && deviceFilter.length > 0) {
                dispatch(getFilteredStocksData(JSON.stringify(deviceFilter)));
            }
        }
    }, [deviceFilter, allSelected1, allSelected2, allSelected3]);
    useEffect(() => {
        if (allSelected1 && !allSelected2 && allSelected3) {
            if (deviceFilter2 !== undefined && deviceFilter2.length > 0) {
                dispatch(getFilteredStocksData(JSON.stringify(deviceFilter2)));
            }
        }
    }, [deviceFilter2, allSelected1, allSelected2, allSelected3]);
    useEffect(() => {
        if (allSelected1 && !allSelected2 && !allSelected3) {
            if (deviceFilter3 !== undefined && deviceFilter3.length > 0) {
                dispatch(getFilteredStocksData(JSON.stringify(deviceFilter3)));
            }
        }
    }, [deviceFilter3, allSelected1, allSelected2, allSelected3]);
    useEffect(() => {
        if (!allSelected1 && allSelected2 && allSelected3) {
            if (deviceFilter4 !== undefined && deviceFilter4.length > 0) {
                dispatch(getFilteredStocksData(JSON.stringify(deviceFilter4)));
            }
        }
    }, [deviceFilter4, allSelected1, allSelected2, allSelected3]);
    useEffect(() => {
        if (!allSelected1 && allSelected2 && !allSelected3) {
            if (deviceFilter5 !== undefined && deviceFilter5.length > 0) {
                dispatch(getFilteredStocksData(JSON.stringify(deviceFilter5)));
            }
        }
    }, [deviceFilter5, allSelected1, allSelected2, allSelected3]);
    useEffect(() => {
        if (!allSelected1 && !allSelected2 && allSelected3) {
            if (deviceFilter6 !== undefined && deviceFilter6.length > 0) {
                dispatch(getFilteredStocksData(JSON.stringify(deviceFilter6)));
            }
        }
    }, [deviceFilter6, allSelected1, allSelected2, allSelected3]);

    return (
        <TableContainer style={{ overflowX: 'auto', height: '55.2vh' }} className={classes.root}>
            <div>
                <Table
                    stickyHeader
                    className={classes.table3}
                    style={{ overflowX: 'auto' }}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <span className={classes.summary}>Devices</span>
                            </TableCell>
                            <TableCell align="left">
                                <span className={classes.summary}>Count</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {filteredDevicesLoading ? (
                        <div>{/* <Loader type="stockTable2" /> */}</div>
                    ) : (
                        <TableBody>
                            {rows?.map((row1) => (
                                <TableRow
                                    className={
                                        row1.isSelected ? classes.productBloodRowSelected : classes.productBloodRow
                                    }
                                    key={row1.id}
                                    onClick={() => handleRowClick(row1._id)}
                                    style={{ width: '100px' }}
                                >
                                    <TableCell size="small" align="left">
                                        <span className={row1.isSelected ? classes.rowValueSelected : classes.rowValue}>
                                            {row1?.name}
                                        </span>
                                    </TableCell>
                                    <TableCell size="small" align="center">
                                        <span className={row1.isSelected ? classes.rowValueSelected : classes.rowValue}>
                                            {row1?.totalCount}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </div>
        </TableContainer>
    );
};

export default DeviceTable;
