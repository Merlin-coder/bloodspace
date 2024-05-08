import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StockPageStyles } from './style';

import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { CustomButton, CustomSearch } from 'common';
import { useHistory } from 'react-router-dom';
import DeviceTable from './components/DeviceTable';
import LocationTable from './components/LocationTable';
import {
    getFilteredDevicesData,
    getFilteredLocationsData,
    getFilteredStocksData,
    getStockFilters,
    getStocksData,
    setScreeenIndex
} from 'redux/actions/manage/stocksActions';
import { RequestUnit } from 'pages';
import Filter from './components/filter/filterContainer';
import FilteredStockTable from './components/FilteredStockTable';
import StockTable from './components/StockTable';
import CustomChip from 'components/chip';
import { getApplyFilters } from '../../../redux/actions/filters/globalFilterAction';
import { useLocation } from 'react-router-dom';
import drawerIcon from '../../../assets/drawerIcon.svg';
import bloodPacketIcon from '../../../assets/bloodPacket.png';
import DrawerStocks from './components/drawerStocks';

const StockPage = () => {
    const classes = StockPageStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [filters, setFilters] = useState([]);
    const location = useLocation();
    const [filters2, setFilters2] = useState([]);
    const [filters3, setFilters3] = useState([]);
    const [filters4, setFilters4] = useState([]);
    const [refFilters, setRefFilters] = useState(null);
    const [chipsNames, setChipsNames] = useState([]);
    const [allSelected1, setAllSelected1] = useState(true);
    const [allSelectedFilter1, setAllSelectedFilter1] = useState([]);
    const [allSelected2, setAllSelected2] = useState(true);
    const [allSelectedFilter2, setAllSelectedFilter2] = useState([]);
    const [allSelected3, setAllSelected3] = useState(true);
    const [allSelectedFilter3, setAllSelectedFilter3] = useState([]);
    const [allProductID, setAllProductId] = useState([]);
    const [allBloodGroupID, setAllBloodGroupId] = useState([]);
    const [allLocationID, setAllLocationID] = useState([]);
    const [allDeviceID, setAllDeviceID] = useState([]);
    const [updatedFilter2, setUpdatedFilter2] = useState([]);
    const [updatedFilter3, setUpdatedFilter3] = useState([]);
    const [updatedLocationFilter, setUpdatedLocationFilter] = useState([]);
    const [updatedDeviceFilter, setUpdatedDeviceFilter] = useState([]);
    const [updatedDeviceFilter2, setUpdatedDeviceFilter2] = useState([]);
    const [updatedDeviceFilter3, setUpdatedDeviceFilter3] = useState([]);
    const [updatedDeviceFilter4, setUpdatedDeviceFilter4] = useState([]);
    const [updatedDeviceFilter5, setUpdatedDeviceFilter5] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [allSelectedGroup, setAllSelectedGroup] = useState([]);
    const [selectedLocationName, setSelectedLocationName] = useState([]);
    const [selectedDeviceName, setSelectedDeviceName] = useState([]);
    const [filterKeysObject, setFilterKeysObject] = useState([]);
    const [filterChips, setFilterChips] = useState();
    const [showFilters, setShowFilters] = useState([]);
    const [refresh, doRefresh] = useState(0);
    const [deletedChip, setDeletedChip] = useState('');
    const [chipIdAndName, setChipIdAndName] = useState({});
    const { stocksLoading } = useSelector((state) => state.getStocks);
    const { screenIndex } = useSelector((state) => state.getStocksScreenSet);
    const { userAccessData, userAccessLoading } = useSelector((state) => state.getUserAccess);
    const [accessableCodes, setAccessableCodes] = useState([]);
    const [isMainFilter, setIsMainFilter] = useState(false);

    const [codesAndDescription, setCodesAndDescription] = useState({}); //to check codes related to this submenu
    const { userInfo } = useSelector((state) => state.userLogin);
    useEffect(() => {
        let tempAccessCodes = [];
        if (userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1002') {
            tempAccessCodes = ['BS-ACO-1034', 'BS-ACO-1015', 'BS-ACO-1016'];
        } else {
            let manageAccessCodes =
                userInfo?.data?.userAccess
                    ?.filter((item) => item['drawer-code'] === 'BS-DR-0068')
                    ?.map((subMenu) => subMenu?.menuId)
                    ?.flat()[0] || [];
            let keysOfObject = Object.keys(manageAccessCodes);
            keysOfObject.forEach((item) => {
                if (Array.isArray(manageAccessCodes[item])) {
                    manageAccessCodes[item][0] === '1' && tempAccessCodes.push(manageAccessCodes[item][1]);
                }
            });
            console.log(
                tempAccessCodes,
                manageAccessCodes,
                keysOfObject,
                'units in stock',
                'BS-ACO-1034',
                'BS-ACO-1015'
            );
        }
        setAccessableCodes(tempAccessCodes);
    }, [location]);

    let data = [
        {
            code: 'BS-DR-0045',
            fields: undefined,
            isDisabled: false,
            label: 'Request Unit',
            link: '/dashboard/request-unit',
            urlEndPoint: 'refsku'
        }
    ];
    useEffect(() => {
        dispatch(getStocksData());
        dispatch(getStockFilters());
        // dispatch(setScreeenIndex(0));
    }, []);
    const handleSearchDelete = () => {
        setSearchKey('');
        dispatch(getStocksData());
    };

    const handleSearch = (searchKey) => {
        setSearchKey(searchKey);
        if (searchKey.length > 2) {
            dispatch(getStocksData(JSON.stringify(searchKey)));
            dispatch(getFilteredLocationsData(JSON.stringify(searchKey)));
            dispatch(getFilteredDevicesData(JSON.stringify(searchKey)));
            dispatch(getFilteredStocksData(JSON.stringify(searchKey)));
        } else if (searchKey === '') {
            dispatch(getStocksData());
        }
    };

    const handleBackClick = () => {
        if (history.location.pathname === '/dashboard/stock-unit') {
            history.goBack();
        } else {
            history.push('/dashboard');
        }
    };

    const handleFilters = (filterData, dashboardFilter) => {
        dispatch(getStocksData(undefined, JSON.stringify(filterData)));
        dispatch(getFilteredLocationsData(JSON.stringify(filterData)));
        dispatch(getFilteredDevicesData(JSON.stringify(filterData)));
        dispatch(getFilteredStocksData(JSON.stringify(filterData)));

        setShowFilters(filterData);
    };
    useEffect(() => {
        showFilters?.length > 0 ? setIsMainFilter(true) : setIsMainFilter(false);
        if (showFilters?.length > 0) {
            dispatch(getStocksData(undefined, JSON.stringify(showFilters)));
            dispatch(getFilteredLocationsData(JSON.stringify(showFilters)));
            dispatch(getFilteredDevicesData(JSON.stringify(showFilters)));
            dispatch(getFilteredStocksData(JSON.stringify(showFilters)));
        }
    }, [showFilters]);

    useEffect(() => {
        if (screenIndex === 1) {
            setIsMainFilter(false);
        }
    }, [screenIndex]);

    const [tempLocations, setTempLocations] = useState([]);

    const handleResetFilters = () => {
        // showFilters ? dispatch(getData(urlEndPoint, pageSize * 3, 1)) : null;
        dispatch(getStocksData());
        dispatch(getFilteredLocationsData());
        dispatch(getFilteredDevicesData());
        dispatch(getFilteredStocksData());
        setShowFilters('');
    };
    const [tempSelectedFIlters, setTempSelectedFilters] = useState([]);

    const handleChipDelete = (chipToDelete) => () => {
        doRefresh((prev) => prev + 1);
        setDeletedChip(chipToDelete);
        let value = [];
        //Checkbox will come here to reset
        filterChips.forEach((chip) => {
            if (chip !== chipToDelete) {
                value.push(chip);
            }
        });

        let tempFilterKeys = {};
        if (chipToDelete in chipIdAndName === true) {
            let chipId = chipIdAndName[chipToDelete];
            showFilters?.forEach((chip) => {
                if (chip && chip.value && chip.value.length > 0 && chip?.value?.includes(chipId)) {
                    let chipValue = chip?.value?.filter((item) => item !== chipId);
                    if (chipValue.length >= 1) {
                        tempFilterKeys[chip.key] = { key: chip.key, value: chipValue };
                    }
                } else if (typeof chip === 'object') {
                    tempFilterKeys[chip.key] = chip;
                }
            });
            // let tempFilterObjects = showFilters.filter((item) => typeof item === 'object');
            setShowFilters([...Object.values(tempFilterKeys)]);
            // setShowFilters([...tempFilterKeys]);
        } else {
            let currentKey = filterKeysObject.filter((nextItem) => chipToDelete.includes(nextItem.label))[0]?.name;

            // let toBeDeletedFilter = typeof chipToDelete !== 'number' ? chipToDelete.split(' ')[0] : chipToDelete;
            if (currentKey) {
                showFilters.forEach((item) => {
                    if (item.key !== currentKey) {
                        tempFilterKeys[item.key] = item;
                    }
                });

                setShowFilters(Object.values(tempFilterKeys));
            }

            setShowFilters([...tempFilterKeys]);
        }
        if (Object.values(tempFilterKeys).length > 0) {
            dispatch(getStocksData(undefined, JSON.stringify(Object.values(tempFilterKeys))));
            // dispatch(getFilteredLocationsData(undefined, JSON.stringify(Object.values(tempFilterKeys))));
            // dispatch(getFilteredDevicesData(undefined, JSON.stringify(Object.values(tempFilterKeys))));
        } else {
            dispatch(getStocksData());
            // dispatch(getFilteredLocationsData());
            // dispatch(getFilteredDevicesData());
            // dispatch(getFilteredStocksData());
        }

        setFilterChips(value);
    };
    const handleViewDetails = () => {
        refFilters !== null && refFilters.length !== 0 && dispatch(setScreeenIndex(1));
        let chipData = chipsNames.map((item) => item.name);

        let chipNameAndId = {};
        chipsNames.forEach((item) => {
            let { name, id } = item;
            chipNameAndId[name] = id;
        });
        let filterKeysObjects = {};
        let filtersData = refFilters;
        dispatch(getApplyFilters({ chipData, chipNameAndId, filterKeysObjects, filtersData, staticFilters: true }));
        chipData = [];
    };
    const handleDrawerClick = () => {
        dispatch(setScreeenIndex(2));
        localStorage.setItem('drawerScreen', true);
    };
    const handleBloodPacketClick = () => {
        dispatch(setScreeenIndex(0));
        localStorage.setItem('drawerScreen', false);
    };

    return (
        <>
            {screenIndex === 0 && (
                <Grid container className={classes.root}>
                    <Grid container>
                        <Paper elevation={0} variant="outline" className={classes.paper} alignItems="flex-end">
                            <Grid
                                container
                                spacing={1}
                                justify="space-between"
                                className={classes.rootInout}
                                alignItems="center"
                            >
                                <Grid item xs={1} className={classes.backButton}>
                                    <CustomButton variant="outlined" onClick={handleBackClick}>
                                        Back
                                    </CustomButton>
                                </Grid>
                                <Grid item xs={3} className={classes.searchGrid}>
                                    <CustomSearch
                                        value={searchKey}
                                        size="md"
                                        handleChange={(e) =>
                                            e.target.value !== ' ' ? handleSearch(e.target.value) : null
                                        }
                                        handleSearchDelete={handleSearchDelete}
                                        loader={searchKey && searchKey.length < 3 ? true : searchKey && stocksLoading}
                                        placeholder="Product Group"
                                        disabled={!accessableCodes.includes('BS-ACO-1015')}
                                    />
                                </Grid>
                                <Grid xs={4} className="filterChips">
                                    <CustomChip dataArray={filterChips} handleDelete={handleChipDelete} />
                                </Grid>

                                <Grid item xs={3}>
                                    <Grid container justify="flex-end" spacing={2} alignItems="center">
                                        {/* <Grid item>
                                            <Grid container>
                                                <Grid item>
                                                    <CustomButton
                                                        noPadding
                                                        variant="outlined"
                                                        color={screenIndex === 0 ? '#dfe6e9' : 'default'}
                                                        onClick={handleBloodPacketClick}
                                                    >
                                                        <img src={bloodPacketIcon} className={classes.bloodIcon} />
                                                    </CustomButton>
                                                </Grid>
                                                <Grid item>
                                                    <CustomButton
                                                        noPadding
                                                        variant="outlined"
                                                        color={screenIndex === 2 ? '#dfe6e9' : 'default'}
                                                        onClick={handleDrawerClick}
                                                    >
                                                        <img src={drawerIcon} className={classes.drawerIconActive} />
                                                    </CustomButton>
                                                </Grid>
                                            </Grid>
                                        </Grid> */}
                                        <Grid item>
                                            <Filter
                                                screenId={2}
                                                setFilterKeysObject={setFilterKeysObject}
                                                handleFilters={handleFilters}
                                                setFilterKeys={setFilterChips}
                                                handleResetFilters={handleResetFilters}
                                                selectedFilters={showFilters}
                                                refresh={refresh}
                                                deletedChip={deletedChip}
                                                setChipIdAndName={setChipIdAndName}
                                                enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className={classes.paperContainer}
                                alignItems={'flex-end'}
                                wrap="nowrap"
                            // justify="space-between"
                            >
                                <>
                                    <Grid item xs={4} className={classes.paperItem}>
                                        <Grid container spacing={1}>
                                            <Grid item={12}>
                                                <Typography color="primary" variant="h6">
                                                    Total Units{' '}
                                                </Typography>
                                            </Grid>
                                            <Grid item={12} style={{ flexBasis: '100%' }}>
                                                <StockTable
                                                    setTempSelectedFilters={setTempSelectedFilters}
                                                    filters={filters}
                                                    setFilters={setFilters}
                                                    chipsNames={chipsNames}
                                                    setChipsNames={setChipsNames}
                                                    allSelected1={allSelected1}
                                                    setAllSelected1={setAllSelected1}
                                                    allSelectedFilter1={allSelectedFilter1}
                                                    setAllSelectedFilter1={setAllSelectedFilter1}
                                                    setAllProductId={setAllProductId}
                                                    setAllBloodGroupId={setAllBloodGroupId}
                                                    setSelectedProducts={setSelectedProducts}
                                                    setSelectedBloodGroup={setSelectedBloodGroup}
                                                    selectedGroup={selectedGroup}
                                                    setSelectedGroup={setSelectedGroup}
                                                    allSelectedGroup={allSelectedGroup}
                                                    setAllSelectedGroup={setAllSelectedGroup}
                                                    showFilters={showFilters}
                                                    isMainFilter={isMainFilter}
                                                    setIsMainFilter={setIsMainFilter}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <div style={{ display: 'flex' }}>
                                            <LocationTable
                                                setTempLocations={setTempLocations}
                                                filters={filters}
                                                setFilters={setFilters}
                                                filters2={filters2}
                                                setFilters2={setFilters2}
                                                chipsNames={chipsNames}
                                                setChipsNames={setChipsNames}
                                                allSelected1={allSelected1}
                                                allSelectedFilter1={allSelectedFilter1}
                                                allSelected2={allSelected2}
                                                setAllSelected2={setAllSelected2}
                                                allSelectedFilter2={allSelectedFilter2}
                                                setAllSelectedFilter2={setAllSelectedFilter2}
                                                allProductID={allProductID}
                                                allBloodGroupID={allBloodGroupID}
                                                setAllLocationID={setAllLocationID}
                                                setUpdatedFilter2={setUpdatedFilter2}
                                                updatedFilter2={updatedFilter2}
                                                updatedLocationFilter={updatedLocationFilter}
                                                setUpdatedLocationFilter={setUpdatedLocationFilter}
                                                setSelectedLocations={setSelectedLocations}
                                                selectedProducts={selectedProducts}
                                                selectedBloodGroup={selectedBloodGroup}
                                                setSelectedLocationName={setSelectedLocationName}
                                                isMainFilter={isMainFilter}
                                            />
                                            <DeviceTable
                                                filters={filters}
                                                tempLocations={tempLocations}
                                                filters2={filters2}
                                                setFilters2={setFilters2}
                                                filters3={filters3}
                                                setFilters3={setFilters3}
                                                chipsNames={chipsNames}
                                                setChipsNames={setChipsNames}
                                                allSelected1={allSelected1}
                                                allSelected2={allSelected2}
                                                allSelected3={allSelected3}
                                                allSelectedFilter2={allSelectedFilter2}
                                                setAllSelected3={setAllSelected3}
                                                allSelectedFilter3={allSelectedFilter3}
                                                setAllSelectedFilter3={setAllSelectedFilter3}
                                                allProductID={allProductID}
                                                allBloodGroupID={allBloodGroupID}
                                                allLocationID={allLocationID}
                                                setAllDeviceID={setAllDeviceID}
                                                setUpdatedFilter3={setUpdatedFilter3}
                                                updatedFilter3={updatedFilter3}
                                                updatedDeviceFilter={updatedDeviceFilter}
                                                setUpdatedDeviceFilter={setUpdatedDeviceFilter}
                                                updatedDeviceFilter2={updatedDeviceFilter2}
                                                setUpdatedDeviceFilter2={setUpdatedDeviceFilter2}
                                                updatedDeviceFilter3={updatedDeviceFilter3}
                                                setUpdatedDeviceFilter3={setUpdatedDeviceFilter3}
                                                updatedDeviceFilter4={updatedDeviceFilter4}
                                                setUpdatedDeviceFilter4={setUpdatedDeviceFilter4}
                                                updatedDeviceFilter5={updatedDeviceFilter5}
                                                setUpdatedDeviceFilter5={setUpdatedDeviceFilter5}
                                                selectedProducts={selectedProducts}
                                                selectedBloodGroup={selectedBloodGroup}
                                                selectedLocations={selectedLocations}
                                                setSelectedDevices={setSelectedDevices}
                                                selectedDevices={selectedDevices}
                                                selectedGroup={selectedGroup}
                                                allSelectedGroup={allSelectedGroup}
                                                setSelectedDeviceName={setSelectedDeviceName}
                                                tempSelectedFIlters={tempSelectedFIlters}
                                                isMainFilter={isMainFilter}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Grid container spacing={1} alignItems="center">
                                            <Grid item xs={12}>
                                                <Typography color="primary" variant="h6">
                                                    Filtered Units{' '}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FilteredStockTable
                                                    setIndex={setIndex}
                                                    filters3={filters3}
                                                    setFilters3={setFilters3}
                                                    filters4={filters4}
                                                    setFilters4={setFilters4}
                                                    refFilters={refFilters}
                                                    setRefFilters={setRefFilters}
                                                    chipsNames={chipsNames}
                                                    setChipsNames={setChipsNames}
                                                    screenIndex={screenIndex}
                                                    selectedLocationName={selectedLocationName}
                                                    selectedDeviceName={selectedDeviceName}
                                                    selectedLocations={selectedLocations}
                                                    selectedDevices={selectedDevices}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            </Grid>
                            <Grid container justify="flex-end">
                                <Grid item className={classes.detailsBtn}>
                                    <CustomButton
                                        onClick={handleViewDetails}
                                        color="primary"
                                        variant="contained"
                                        disabled={
                                            !accessableCodes.includes('BS-ACO-1016')
                                                ? true
                                                : filters4[1]?.value?.length > 0
                                                    ? false
                                                    : true
                                        }
                                        fontsize="0.8rem"
                                    >
                                        Details
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            )}
            {screenIndex === 1 && (
                <Grid container>
                    <Grid item xs={12}>
                        <RequestUnit
                            data={data}
                            path="/dashboard/request-unit"
                            // refFilters={refFilters}
                            // chipsNames={chipsNames}
                            setRefFilters={setRefFilters}
                            setFilters4={setFilters4}
                            setAllSelected1={setAllSelected1}
                            setAllSelected2={setAllSelected2}
                            setAllSelected3={setAllSelected3}
                        />
                    </Grid>
                </Grid>
            )}
            {screenIndex === 2 && (
                <Grid container className={classes.root}>
                    <Grid container>
                        <Paper elevation={0} variant="outline" className={classes.paper} alignItems="flex-end">
                            <Grid
                                container
                                spacing={1}
                                justify="space-between"
                                className={classes.rootInout}
                                alignItems="center"
                            >
                                <Grid xs={5} className="filterChips">
                                    <CustomChip dataArray={filterChips} handleDelete={handleChipDelete} />
                                </Grid>

                                <Grid item xs={3}>
                                    <Grid container justify="flex-end" spacing={2} alignItems="center">
                                        <Grid item>
                                            <Grid container>
                                                <Grid item>
                                                    <CustomButton
                                                        noPadding
                                                        variant="outlined"
                                                        color={screenIndex === 0 ? '#dfe6e9' : 'default'}
                                                        onClick={handleBloodPacketClick}
                                                    >
                                                        <img src={bloodPacketIcon} className={classes.bloodIcon} />
                                                    </CustomButton>
                                                </Grid>
                                                <Grid item>
                                                    <CustomButton
                                                        noPadding
                                                        variant="outlined"
                                                        color={screenIndex === 2 ? '#dfe6e9' : 'default'}
                                                        onClick={handleDrawerClick}
                                                    >
                                                        <img src={drawerIcon} className={classes.drawerIconActive} />
                                                    </CustomButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className={classes.paperContainer}
                                alignItems={'flex-end'}
                                wrap="nowrap"
                            // justify="space-between"
                            >
                                <>
                                    <DrawerStocks />
                                </>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </>
    );
};
export default StockPage;
