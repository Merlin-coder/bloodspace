import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Loader from 'components/loader/loaderNew.container';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredDevicesData, getFilteredStocksData } from 'redux/actions/manage/stocksActions';
import { useStyles } from '../style';
const LocationTable = (props) => {
    const {
        setFilters2,
        filters2,
        allSelected1,
        allSelected2,
        setAllSelected2,
        setAllLocationID,
        setSelectedLocations,
        selectedBloodGroup,
        selectedProducts,
        setSelectedLocationName,
        filters,
        allProductID,
        setTempLocations,
        allBloodGroupID,
        isMainFilter
    } = props;
    const [selectedRows, setSelectedRows] = useState([]);
    const [locationFilter, setLocationFilter] = useState([]);
    const [locationFilter2, setLocationFilter2] = useState([]);
    const classes = useStyles();
    const { filteredLocationsLoading, filteredLocationsData } = useSelector((state) => state.getFilteredLocations);
    const [rows, setRows] = useState(filteredLocationsData?.data);
    const allLocationIDs = filteredLocationsData?.data?.map((d) => d?._id);
    const dispatch = useDispatch();
    useEffect(() => {
        setRows(filteredLocationsData?.data);
    }, [filteredLocationsData?.data]);
    useEffect(() => {
        let selected = rows?.filter((row) => row.isSelected && row.isSelected === true);
        setSelectedRows(selected);
        setAllLocationID(allLocationIDs);
    }, [rows]);
    const handleRowClick = (id) => {
        setAllSelected2(false);
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
        if (allSelected2 === true) {
            setRows((state) => {
                return rows?.map((row) => {
                    if (row) {
                        return { ...row, isSelected: false };
                    }
                    return row;
                });
            });
        }
    }, [allSelected2]);

    useEffect(() => {
        selectedRows?.length === 0 && setAllSelected2(true);
        let data = [];
        let mData = [];
        selectedRows?.map((row) => {
            data.push(row?._id);
            mData.push({ id: row?._id, name: row?.name });
        });
        setSelectedLocationName(mData);
        setSelectedLocations(data);
    }, [selectedRows]);
    useEffect(() => {
        if (!allSelected1 && !allSelected2) {
            if (selectedBloodGroup?.length > 0 && selectedProducts?.length > 0) {
                let filteredData = [
                    { key: 'bloodgroupId', value: selectedBloodGroup },
                    { key: 'productgroupId', value: selectedProducts },
                    { key: 'locationId', value: [] }
                ];
                selectedRows?.map((row) => {
                    filteredData[2].value.push(row?._id);
                });
                filteredData[2]?.value.length > 0 && setFilters2(filteredData);
            }
        }
        if (allSelected1 && !allSelected2) {
            let filteredData = [
                { key: 'bloodgroupId', value: allBloodGroupID },
                { key: 'productgroupId', value: allProductID },
                { key: 'locationId', value: [] }
            ];
            if (selectedRows?.length > 0) {
                selectedRows?.map((row) => {
                    filteredData[2].value.push(row?._id);
                });
                filteredData[2]?.value?.length > 0 && setLocationFilter(filteredData);
            }
        }
        if (!allSelected1 && allSelected2) {
            let filteredData = [
                { key: 'bloodgroupId', value: selectedBloodGroup },
                { key: 'productgroupId', value: selectedProducts },
                { key: 'locationId', value: allLocationIDs }
            ];
            filteredData[2]?.value?.length > 0 && setLocationFilter2(filteredData);
        }
    }, [selectedRows, allSelected2, allSelected1]);

    useEffect(() => {
        if (!allSelected1 && !allSelected2 && isMainFilter) {
            if (filters2 !== undefined && filters2?.length > 0) {
                console.log('deviceFilter.....,,,........');
                dispatch(getFilteredDevicesData(JSON.stringify(filters2)));
            }
        }
    }, [filters2, allSelected1, allSelected2]);

    useEffect(() => {
        if (isMainFilter && allSelected2 && allSelected1) {
            console.log('deviceFilter.....,,,........');
            dispatch(getFilteredDevicesData());
        }
    }, [isMainFilter, allSelected2, allSelected1]);
    useEffect(() => {
        if (allSelected1 && !allSelected2) {
            if (locationFilter !== undefined && locationFilter[2]?.value?.length > 0) {
                dispatch(getFilteredDevicesData(JSON.stringify(locationFilter)));
            }
        }
    }, [locationFilter, allSelected2, allSelected1]);
    useEffect(() => {
        if (!allSelected1 && allSelected2) {
            if (locationFilter2 !== undefined && locationFilter2[2]?.value?.length > 0) {
                dispatch(getFilteredDevicesData(JSON.stringify(locationFilter2)));
            }
        }
    }, [locationFilter2, allSelected2, allSelected1]);

    return (
        <TableContainer style={{ overflowX: 'hidden', height: '55.2vh', marginRight: 10 }} className={classes.root}>
            <div>
                <Table
                    className={classes.table2}
                    stickyHeader
                    style={{ overflowX: 'auto' }}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <span className={classes.summary}>Locations</span>
                            </TableCell>
                            <TableCell align="center">
                                <span className={classes.summary}>Count</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {filteredLocationsLoading ? (
                        <div>{/* <Loader type="stockTable2" /> */}</div>
                    ) : (
                        <TableBody>
                            {rows?.map((row1) => (
                                <TableRow
                                    className={
                                        row1.isSelected ? classes.productBloodRowSelected : classes.productBloodRow
                                    }
                                    key={row1._id}
                                    onClick={() => handleRowClick(row1._id)}
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

export default LocationTable;
