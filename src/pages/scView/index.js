import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    Table,
    IconButton,
    Paper,
    Box,
    Tooltip,
    Typography
} from '@material-ui/core';
import { CONSTANTS, CustomButton, CustomSearch, Filter } from 'common';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { clearVoucher, getVoucherResponse } from 'redux/actions/manage/scManageViewActions';
import { useStyles } from './style';
import moment from 'moment';
import { CustomTable } from 'components';
import SkeletonTable from 'components/loader/loaderNew.container';
import Skeleton from 'components/loader/loader.container';
import NoData from 'components/no data';
import ReportFilter from 'components/reportFilters';
import { getVoucherRowData } from 'redux/actions/voucherDisplayConf';
import VerticalDivider from 'components/verticalDivider';
import { clearData, getData } from 'redux/actions';
import DisplayConfig from 'components/displayConfig';
import keyFine from 'common/services/keyFineMethod';

const ScManageView = (props) => {
    const { data } = props;
    console.log('propro',props)
    const classes = useStyles();
    const [pageSize, setPageSize] = useState(10);
    const location = useLocation();

    const [voucherMap, setVoucherMap] = useState([]);
    console.log('vomap',voucherMap)
    const [loader, setLoader] = useState(true);
    const [dialogClose, setDialogClose] = useState(true);
    const [errorKey, setErrorKey] = useState([]);
    const [pageFilter, setPageFilter] = useState('Unit');
    console.log('pagefilter', pageFilter)
    const page = localStorage.getItem('page');
    console.log('page---',page)
    const { dateFormat } = useSelector((state) => state.dateFormat);

    const { voucherData, voucherLoading } = useSelector((state) => state.getVoucher);
    const socket = useSelector((state) => state.socketReducer.socket);
    // getvoucher response
    console.log('votable---',voucherData)
    const { voucherRow } = useSelector((state) => state.voucherRowData);
    console.log('voucherRowtotal---',voucherRow?.data[0])
    const mangeModule = JSON.parse(localStorage.getItem('mangeModule'));

    const dispatch = useDispatch();

    const history = useHistory();
    const previousLocation = history.location.state;
    console.log('previousLocation', previousLocation)

    useEffect(() => {
        if (page == 'Unit') {
            setPageFilter('Unit')
        }
        else if (page == 'Batch') {
            setPageFilter('Batch')
        }
    })

    const handleVoucherDisplayDate = (row, dbConf) => {
        let voucherDeatils = dbConf
            .filter((item) => item.dbProperty !== '#' && item.dbProperty !== '@' && item.dbProperty !== 'name')
            .map((item) => {
                let valueOfItem;
                if (item?.dbProperty?.includes('.')) {
                    let keyFineValue = keyFine(item.dbProperty, row);
                    valueOfItem = keyFineValue;
                    if (item.dbProperty === 'refskuId[0].expiryDateAndTime') {
                        valueOfItem = moment(valueOfItem).format(dateFormat);
                    }
                    if (item.dbProperty === 'refskuId[0].productiontionDateAndTime') {
                        valueOfItem = moment(valueOfItem).format(dateFormat);
                    }
                } else {
                    valueOfItem = row[item.dbProperty];
                }
                if (item.dbProperty === 'createdAt') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'collectionDateAndTime') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'productiontionDateAndTime') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'expiryDateAndTime') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'expiry') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'date') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'dob') {
                    return { key: item.label, value: moment(valueOfItem).format('DD-MMM-yyyy') };
                }
                return { key: item.label, value: valueOfItem };
            });
        setLoader(false);
        voucherDeatils !== 'undefined' ? setVoucherMap([...voucherDeatils]) : setVoucherMap([]);
        return voucherDeatils;
    };

    const handleClearVoucher = () => {
        let previousRowName = JSON.parse(localStorage.getItem('previousRowName'));

        localStorage.setItem('currentRowName', JSON.stringify(previousRowName));
        dispatch(clearVoucher());
        history.goBack();
        if (localStorage.getItem('page') === 'Batch') {
            localStorage.setItem('page', 'Unit');
        }
    };

    const capitalize = (expression) => expression.charAt(0).toUpperCase() + expression.slice(1);

    const handleVoucher = (row, displayConfig, name) => {
        let childDataTable;
        if (displayConfig) {
            childDataTable = displayConfig;
        } else {
            childDataTable = row.childDataTable;
        }
        let rowName;
        if (name) {
            rowName = name;
        } else {
            rowName = row.name;
        }
        localStorage.setItem('currentRowName', JSON.stringify(rowName));
        let filterdUrl = currentPath.slice(0, currentPath.length - 3).join('/');
        if (row.name) {
            history.push(`${filterdUrl}/${row?.name?.toLowerCase()}/${childDataTable}/${lastThreeItems[0]}/${row._id}`);
        }
    };

    let currentPath = location.pathname.split('/');
    let lastThreeItems = currentPath.slice(currentPath.length - 3, currentPath.length);

    //Changes for displayConfig
    const [dChecked, setDchecked] = useState(voucherRow?.displayConfigData);

    const { displayConfigloading, putDisplayConfigResponse } = useSelector((state) => state.putDisplayConfig);
    const [noChildDataTalbe, setNoChilDataTable] = useState(false);

    useEffect(() => {
        putDisplayConfigResponse?.status === true && dispatch(getVoucherRowData(lastThreeItems[1]));
    }, [displayConfigloading, putDisplayConfigResponse]);

    useEffect(() => {
        setDchecked(voucherRow?.displayConfigData);
    }, [voucherRow]);

    const onDChange = (row, e) => {
        console.log('name')
        const name = e.target.name;
        console.log('name',name)
        const value = name === 'isVisible' ? (e.target.checked === true ? 1 : 0) : e.target.value;
        const { _id } = row;
        const newRows = dChecked.map((row) => {
            if (row._id === _id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setDchecked(newRows);
    };

    //Changes for displayConfig

    useEffect(() => {
        console.log('transnav', props?.history?.location?.pathname)
        let removeUnnecessary = lastThreeItems[1].includes('-')
            ? lastThreeItems[1].split('-').join('')
            : lastThreeItems[1];
        let filtersData = [{ key: '_id', value: lastThreeItems[2] }];
        dispatch(getVoucherRowData(removeUnnecessary ? removeUnnecessary : 'recipient', undefined, JSON.stringify(filtersData), pageFilter ? pageFilter : "Unit")); //forVoucheDetails
        if (lastThreeItems[0] === 'undefined' || lastThreeItems[0] === 'null') {
            // dispatch(clearVoucher());
            setLoader(false);
            setNoChilDataTable(true);
        } 
        else {
            dispatch(getVoucherResponse(lastThreeItems[0], lastThreeItems[2], lastThreeItems[1], undefined, pageFilter ? pageFilter : "Unit")); //forTable 
            setLoader(true);
        }
        // on Every location change this will call api to get Data
        // 0 index if for childData Table, 1 index is for parentTable's childDataTable name, and 2 is for id of the row
    }, [location,pageFilter]);

    let voucherRowConf = voucherRow && voucherRow.data?.[0];

    let voucherRowDisplay =
        (voucherRow && voucherRow?.displayConfigData) || voucherRow?.displayConfigData?.displayConfig;

    React.useEffect(() => {
        if (voucherRowConf && voucherRowDisplay) {
            handleVoucherDisplayDate(voucherRowConf, voucherRowDisplay);
        }
    }, [voucherRow]);

    // Search Box Changes
    const [searchKey, setSearchKey] = useState('');
    const handleSearchDelete = () => {
        setSearchKey('');
        dispatch(getVoucherResponse(lastThreeItems[0], lastThreeItems[2], lastThreeItems[1]));
    };

    const handleSearch = (searchKey) => {
        setSearchKey(searchKey);
        if (searchKey.length > 2) {
            dispatch(clearData());
            dispatch(
                getVoucherResponse(
                    lastThreeItems[0],
                    lastThreeItems[2],
                    lastThreeItems[1],
                    JSON.stringify(searchKey.trim())
                )
            );
        } else if (searchKey === '') {
            dispatch(getVoucherResponse(lastThreeItems[0], lastThreeItems[2], lastThreeItems[1]));
        }
    };
    const handleSaveClick = () => {
        setDialogClose(false);
        setErrorKey([]);
        history.goBack();
    };
    console.log('scView');

    useEffect(() => {
        socket?.on('refresh', (data) => {
            
            const filter = localStorage.getItem('filter'); 
            const sortValue = localStorage.getItem('sort');
            const search = localStorage.getItem('search');
            if (window.location.pathname === '/dashboard/reports/movements') {
                dispatch(
                    getData(
                        'activity',
                        pageSize * 3,
                        1,
                        search !== null ? search : undefined,
                        filter !== null ? JSON.parse(filter) : undefined,
                        sortValue !== null ? JSON.parse(sortValue) : undefined,
                        page !== null ? page : pageFilter,
                        undefined,
                        undefined,
                        undefined,
                        //remotesettingsData?.emergencyLogin === 'TRUE' ? responseData?.locationId : undefined
                    )
                );
            }
            //window.location.reload()
        });
    }, [socket]);

    useEffect(() => {
        dispatch(getData('activity', pageSize * 3, undefined, undefined, undefined, undefined, pageFilter ? pageFilter : "Unit" ))
    },[pageFilter])
    return (
        <>
            {voucherLoading === true && searchKey === '' ? (
                <div className={classes.formLoader}>
                    <Skeleton type="table" />
                </div>
            ) : (
                <>
                    <Grid xs={12} item className={classes.buttonGrid}>
                        <CustomButton variant="outlined" color="primary" onClick={handleClearVoucher}>
                            {CONSTANTS.BACK}
                        </CustomButton>
                    </Grid>
                    <Grid>
                        <Paper elevation={0} className={classes.paper}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container>
                                        {loader ? (
                                            <div className={classes.voucherLoader}>
                                                <SkeletonTable type="table" />
                                            </div>
                                            ) : (

                                            voucherMap.map((item, index) => {
                                                if (item.value && item.key !== 'Machine Number' && item.key !== 'Token' && item.key !== 'Socket Status') {
                                                    return (
                                                        <Grid
                                                            item
                                                            key={index.toString()}
                                                            className={classes.contentGrid}
                                                            xs={4}
                                                        >
                                                            <Typography color="primary" className={classes.itemLabel}>
                                                                {capitalize(item.key)}
                                                            </Typography>
                                                            <Typography className={classes.colonClass}>
                                                                {':'}
                                                            </Typography>
                                                            <Typography className={classes.voucherValue}>
                                                                {item.value}
                                                            </Typography>
                                                        </Grid>
                                                    );
                                                }
                                            })
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        {noChildDataTalbe ? null : (
                            <Paper elevation={0} className={classes.tablePaper}>
                                <Grid> 
                                    <Grid container style={{ padding: 5 }}>
                                        <Grid item xs={5}>
                                            <CustomSearch
                                                value={searchKey}
                                                size="md"
                                                placeholder={'Search'}
                                                handleChange={(e) =>
                                                    e.target.value !== ' ' ? handleSearch(e.target.value) : null
                                                }
                                                handleSearchDelete={handleSearchDelete}
                                                loader={
                                                    searchKey && searchKey.length < 3
                                                        ? true
                                                        : searchKey && voucherLoading
                                                }
                                                disabled={voucherData?.data?.length === 0}
                                            />
                                            </Grid>
                                            {props?.computedMatch?.params?.id === 'reports' ? null :
                                                <Grid item xs={4} style={{ marginLeft: 350 }}>
                                                    <ReportFilter setPageFilter={setPageFilter} pageFilter={pageFilter} />
                                                </Grid>}
                                           
                                    </Grid>
                                    {voucherData?.data?.length > 0 ? (
                                        <Grid>
                                            <CustomTable
                                                response={voucherData}
                                                handleVoucher={handleVoucher}
                                                history={history}
                                                rowsPerPage={pageSize}
                                                module={mangeModule}
                                                scView={true}
                                            />
                                        </Grid>
                                    ) : (
                                        <NoData />
                                    )}
                                </Grid>
                            </Paper>
                            )}
                        </Grid>
                        <Grid>
                            {previousLocation && previousLocation['previousId&name']?.includes('swapouts') ? 
                            <>
                        {voucherRow?.data?.length > 0 ? (
                            <Grid>
                                <Grid item xs={12}>
                                    <ReportFilter setPageFilter={setPageFilter} pageFilter={pageFilter} />
                                </Grid>
                            </Grid>
                        ) : (
                        <NoData />
                        )}
                           
                        {voucherRow?.data?.length > 0 ? (

                                        <>
                                            <Box mt={6} />
                                            <Grid container item className={classes.tableGrid}>
                         
                                    <Grid item container xs={12} md={12} lg={12}>
                                        {pageFilter === 'Unit' && (

                                                        <TableContainer className={classes.tableContaine}>
                            <Table>
                                <TableHead style={{ height: '50px' }}>
                                    <TableRow>
                                        {[
                                                                            'Rfid Number',
                                                                            'Unit Id',
                                                                            'Blood Group',
                                                                            'Device Track',
                                                                            'Product Code',
                                                                            'Product Description',
                                                                            'Transfer Status',
                                                                            'Expiry Date',
                                        ].map((item, index) => (
                                            <TableCell key={index} className={classes.tableHeadCel} style={{ fontSize: '14px' }}>
                                                {item === '#' ? '' : item}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>


                                <TableBody>
                                     {voucherRow?.data?.length > 0 ? (
                                       voucherRow?.data[0]?.units?.map((item, index) => (
                                           <TableRow key={index} style={{ height: '50px' }}>
                                               {[
                                                   <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.rfidNumber}</TableCell>,
                                                   <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.donationCode}</TableCell>,
                                                   <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.bloodgroup.name}</TableCell>,
                                                   <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.deviceTrackId.name}</TableCell>,
                                                   <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.productcode.isbtcode}</TableCell>,
                                                   <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.productcode.isbtdescription}</TableCell>,
                                                   <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.transferStatus}</TableCell>,
                                                   <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.expiryDateAndTime}</TableCell>,
                                               ]}
                                           </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={10} style={{ textAlign: 'center' }}>
                                                <Typography color="primary" textAlign="center" className={classes.resolution}>
                                                    No data available
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                               {console.log("voucherRowData:", voucherRow?.data)}
                            </Table>
                        </TableContainer>
                                        )}

                                        {pageFilter === 'Batch' && (
                                            <TableContainer className={classes.tableContaine}>
                                                <Table>
                                                    <TableHead style={{ height: '50px' }}>
                                                        <TableRow>
                                                            {[
                                                                'Gtin Number',
                                                                'Batch Number',
                                                                'Rfid Number',
                                                                'Device Track',
                                                                'Product Description',
                                                                'Transfer Status',
                                                                'Expiry Date',

                                                            ].map((item, index) => (
                                                                <TableCell key={index} className={classes.tableHeadCel} style={{ textAlign: 'center', fontSize: '14px' }}>
                                                                    {item === '#' ? '' : item}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    </TableHead>


                                                    <TableBody>
                                                        {voucherRow?.data?.length > 0 ? (
                                                                        voucherRow?.data[0]?.batches?.map((item, index) => (
                                                                <TableRow key={index} style={{ height: '50px' }}>
                                                                    {[
                                                                        <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.gtinNumber}</TableCell>,
                                                                        <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.batchNumber}</TableCell>,
                                                                        <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.rfidNumber}</TableCell>,
                                                                        <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.deviceTrackId.name}</TableCell>,
                                                                        <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.batchProductId.name}</TableCell>,
                                                                        <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.transferStatus}</TableCell>,
                                                                        <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.expiryDate}</TableCell>,
                                                                    ]}
                                                                </TableRow>
                                                            ))
                                                        ) : (
                                                            <TableRow>
                                                                <TableCell colSpan={10} style={{ textAlign: 'center' }}>
                                                                    <Typography color="primary" textAlign="center" className={classes.resolution}>
                                                                        No data available
                                                                    </Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                    {console.log("voucherRowData:", voucherRow?.data)}
                                                </Table>
                                            </TableContainer>
                                        )}

                                    </Grid>
                                        </Grid>
                            </>
                   
                               ) : (
                                    <NoData />
                                    )}
                                </>
                            :null}
                   </Grid>
                </>
            )}
        </>
    );
};

export default ScManageView;
