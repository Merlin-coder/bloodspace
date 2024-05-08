import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, IconButton, InputLabel, Paper, TextField, Tooltip, Typography, useTheme } from '@material-ui/core';
import FlareIcon from '@material-ui/icons/Flare';
import 'font-awesome/css/font-awesome.min.css';
import { useHistory } from 'react-router';
import pluralize from 'pluralize';
import { useStyles } from './style';
import ConfirmationDialog from 'components/confirmations/confirmation.container';
import { Alert, CONSTANTS, CustomButton, CustomSearch } from 'common';
import { CustomDialog, CustomTable } from 'components';
import NoData from 'components/no data';
import DisplayConfig from 'components/displayConfig';
import AutoComplete from '../../components/autoComplete';
import CustomInput from 'components/inputfeild';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import {
    get2ndDropdown,
    get3rdDropdown,
    getDropDown,
    changeLOcationData,
    clearChangeLocationData,
    clearGetTransactionData,
    getTransferData,
    postTransferData,
    putHeaderAction,
    clearheaderActionsResponse
} from 'redux/actions';
import { useLocation } from 'react-router-dom';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import DeviceSelection from 'components/socketDeviceSelection/socketDeviceSelection';
import { SocketScanData } from 'redux/actions/socketAction';

let globalTags = [];
let resultedRfid = [];

const TransferUnit = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    //Local State Variables
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rowData, setRowData] = useState({});
    const [pageSize, setPageSize] = useState(10);
    const [sortValue, setSortValue] = useState({});
    const [pageNum, setPageNum] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [accessableCodes, setAccessableCodes] = useState([]);
    const [unitsearch, setUnitSearch] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSnackbarSeverity] = useState('');
    const [selectedStatus, setUpdateStatus] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [comments, setComments] = useState('');
    const [openTransferdialog, setOpenTransferDialog] = useState('');
    const [hostialddValue, setHospitalddvalue] = useState(null);
    const [locationddValue, setLocationddValue] = useState(null);
    const [deviceddValue, setDeviceddValue] = useState(null);
    const [destinationObject, setDestinationObject] = useState({});
    const [transferComment, setTransferComment] = useState('');
    const [transferTableData, setTransferTableData] = useState({ data: [] });
    const [changeLocation, setChangeLocation] = useState(false);
    const [scanCountDialog, setScanCountDialog] = useState(false);
    const label = 'Transfer Unit';
    const urlEndPoint = 'tranferUnit';
    const CurrentSubMenu = label.indexOf('ed') === -1 && label !== 'Request Unit' ? pluralize.plural(label) : label;
    let url = props.path.split('/').slice(2).join('/');
    const subMenuCode = 'transferUnit';

    //Global State
    const apiResponse = useSelector((state) => state.getTransferDataResponse);
    let { changeLocationLoading, changeLocationSuccess, changeLocationError } = useSelector(
        (state) => state.changeLocationInfo
    );
    const { scanStatus } = useSelector((state) => state.getSocketStartStopScan);
    const { getTransferDataLoading, getTransferDataSuccess, getTransferDataError } = apiResponse;
    const { userAccessData, userAccessLoading } = useSelector((state) => state.getUserAccess);
    const { options } = useSelector((state) => state.getDropDown);
    const { options2 } = useSelector((state) => state.get2ndDropdown);
    const { options3 } = useSelector((state) => state.get3rdDropdown);
    const { transferDataSuccess, transferDataError, transferDataLoading } = useSelector((state) => state.transferData);
    const { headerActions, headerActionsLoading, headerActionsError } = useSelector(
        (state) => state.putHeaderActionResponse
    );
    const socket = useSelector((state) => state.socketReducer.socket);
    const { preEncodeData } = useSelector((state) => state.getSocketScanData);

    useEffect(() => {
        socket?.on('listenScannedData', (data) => {
            handleUnitSearch(data?.data?.[0]?.rfidNumber);
        });
    }, [socket]);

    const { userInfo } = useSelector((state) => state.userLogin);
    useEffect(() => {
        let tempAccessCodes = [];
        if (userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1002') {
            tempAccessCodes = [
                'BS-ACO-1025',
                'BS-ACO-1035',
                'BS-ACO-1036',
                'BS-ACO-1024',
                'BS-ACO-1019',
                'BS-ACO-1038',
                'BS-MO-1059',
                'BS-ACO-1037'
            ];
        } else {
            let manageAccessCodes =
                userInfo?.data?.userAccess
                    ?.filter((item) => item['drawer-code'] === 'BS-DR-0075')
                    ?.map((subMenu) => subMenu?.menuId)
                    ?.flat()[0] || [];
            // .filter((item) => item['drawer-code'] === subMenuCode);
            let keysOfObject = Object.keys(manageAccessCodes);
            tempAccessCodes = [];
            keysOfObject.forEach((item) => {
                if (Array.isArray(manageAccessCodes[item])) {
                    manageAccessCodes[item][0] === '1' && tempAccessCodes.push(manageAccessCodes[item][1]);
                }
            });
        }
        setAccessableCodes(tempAccessCodes);
        return () => {
            dispatch(clearGetTransactionData());
            setTransferTableData({ data: [] });
        };
    }, [location]);

    useEffect(() => {
        if (scanStatus) {
            setTransferTableData({ data: [] });
        }
    }, []);

    // useEffect(() => {
    //     if (!userAccessLoading && userAccessData && userAccessData.data) {
    //         let currentMoudleData = userAccessData?.data[0]?.moduleId
    //             .filter((item) => item['drawer-code']?.includes(subMenuCode))
    //             .map((item) => item.code);

    //         setAccessableCodes(currentMoudleData);
    //     }
    // }, [userAccessData]);

    useEffect(() => {
        // return () => {
        setPageNum(0);
        dispatch(clearGetTransactionData());
        dispatch(clearChangeLocationData());
        globalTags = [];
        resultedRfid = [];
        // };
    }, [urlEndPoint]);

    const tableHandleChange = (changeValue, pageNumberOrPageSizeFlag) => {
        if (pageNumberOrPageSizeFlag) {
            setPageNum(changeValue);
        } else {
            setPageSize(changeValue);
            setPageNum(0);
        }
        if (changeValue && pageNumberOrPageSizeFlag) {
            if (changeValue > pageNum) setPageNum(changeValue);
        }
    };

    const sortOperation = (sort) => {
        setSortValue(sort);
    };

    const addUnitToTable = (response) => {
        let tempResultedRfidNumbers = response.data.map((item, index) => {
            return { index, rfid: item.rfidNumber };
        });
        let rfidFilteredRows = [];
        tempResultedRfidNumbers.forEach((item) => {
            if (!resultedRfid.includes(item.rfid)) {
                resultedRfid.push(item?.rfid);
                rfidFilteredRows.push(response.data[item?.index]);
            }
        });

        let tempTransferTalbeData = {
            status: true,
            displayConfigData: response.displayConfigData,
            error: null,
            message: 'Fetch Successful',
            data:
                transferTableData?.data?.length > 0 ? [...rfidFilteredRows, ...transferTableData?.data] : response.data,
            page: {
                hasNextPage: transferTableData?.data?.length > pageSize ? true : false,
                currentPage: 1,
                filterCount: transferTableData?.data?.length > 0 ? transferTableData?.data?.length + 1 : 1,
                totalCount: transferTableData?.data?.length > 0 ? transferTableData?.data?.length + 1 : 1
            }
        };

        setTransferTableData(tempTransferTalbeData);
    };

    useEffect(() => {
        if (getTransferDataSuccess?.data?.length > 0) {
            addUnitToTable(getTransferDataSuccess);
        } else if (getTransferDataError) {
            showSnackbar(true, getTransferDataError?.errorMessage, 'error');
        }
    }, [getTransferDataSuccess, getTransferDataError]);

    const handleUnitSearch = (tempRfid) => {
        let tempUnitSerch;
        if (tempRfid) {
            tempUnitSerch = tempRfid;
        } else {
            tempUnitSerch = unitsearch;
            setUnitSearch('');
        }
        if (!globalTags.includes(tempUnitSerch) && !resultedRfid.includes(tempUnitSerch) && tempUnitSerch.length > 0) {
            globalTags.unshift(tempUnitSerch);
            dispatch(getTransferData('refsku', JSON.stringify(tempUnitSerch)));
        }
    };

    const handleUnitSearchDelete = () => {
        setUnitSearch('');
    };

    const handleDialog = () => {
        setDialogOpen(!dialogOpen);
        setErrorMessage('');
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setErrorMessage('');
    };

    const handleOpenTransefer = (type) => {
        setOpenTransferDialog(true);
        setChangeLocation(false);
        dispatch(getDropDown('clients'));
    };
    const handlechangeLocation = () => {
        setOpenTransferDialog(true);
        setChangeLocation(true);
        dispatch(getDropDown('clients'));
    };

    const closeTransferDialog = () => {
        setHospitalddvalue(null);
        setLocationddValue(null);
        setDeviceddValue(null);
        setTransferComment('');
        setOpenTransferDialog(false);
        dispatch(clearGetTransactionData());
        dispatch(clearChangeLocationData());
    };

    const handleDeleteButtonClick = () => {
        let tempTransferTalbeData = {
            status: true,
            displayConfigData: getTransferDataSuccess?.displayConfigData,
            error: null,
            message: 'Fetch Successful',
            data:
                transferTableData?.data?.length > 1
                    ? [...transferTableData?.data.filter((item) => item._id !== rowData._id)]
                    : [],
            page: {
                hasNextPage: transferTableData?.data?.length > pageSize ? true : false,
                currentPage: 1,
                filterCount: transferTableData?.data?.length > 1 ? transferTableData?.data?.length - 1 : 0,
                totalCount: transferTableData?.data?.length > 1 ? transferTableData?.data?.length - 1 : 0
            }
        };

        globalTags = globalTags.filter((item) => item !== rowData.rfidNumber);
        resultedRfid = resultedRfid.filter((item) => item !== rowData.rfidNumber);

        setTransferTableData(tempTransferTalbeData);
        setDialogOpen(false);
    };

    function showSnackbar(isopen, message, severity) {
        setSnackbarMessage(`${message}`);
        setSnackbarSeverity(severity);
        setOpenSnackbar(isopen);
    }

    const clearTransactionData = () => {
        setOpenSnackbar(false);
        if (transferDataSuccess && transferDataSuccess.status) {
            globalTags = [];
            resultedRfid = [];
            setTransferTableData({ data: [] });
        }
        if (changeLocationSuccess && changeLocationSuccess.status) {
            globalTags = [];
            resultedRfid = [];
            setTransferTableData({ data: [] });
        }
    };

    const onChangeAutoComplete = (e, value, feild) => {
        let tempDestinationObject = { ...destinationObject };
        if (feild === 'hostialddValue') {
            let filters = [{ key: 'clientId._id', value: value?._id }];
            dispatch(get2ndDropdown('locations', JSON.stringify(filters)));
            setHospitalddvalue(value);

            setLocationddValue(null);
            setDeviceddValue(null);
        }
        if (feild === 'locationddValue') {
            let filters = [{ key: 'locationId._id', value: value?._id }];
            dispatch(get3rdDropdown('devices', JSON.stringify(filters)));

            setLocationddValue(value);

            setDeviceddValue(null);
        }
        if (feild === 'deviceddValue') {
            setDeviceddValue(value);
        }
        tempDestinationObject[feild] = value;
        setDestinationObject(tempDestinationObject);
    };

    const handleTransferData = () => {
        if (hostialddValue && hostialddValue?._id) {
            let tempData = transferTableData?.data.map((item) => item?._id);

            let temp = {
                collectionName: 'transaction',
                validData: {
                    'refsku-multiple': tempData,
                    transactionType: 'Issued',
                    transactionStatus: 'Pending',
                    clientId: hostialddValue?._id,
                    locationId: destinationObject?.['locationddValue']?._id,
                    deviceId: destinationObject?.['deviceddValue']?._id,
                    comments: transferComment
                }
            };

            dispatch(postTransferData(temp));
        }
    };

    const handleChangeLocationData = () => {
        if (hostialddValue && hostialddValue?._id) {
            let tempData = transferTableData?.data.map((item) => item?._id);

            let temp = {
                skus: tempData,
                root: {
                    clientId: hostialddValue?._id || '',
                    locationId: locationddValue?._id || '',
                    deviceId: deviceddValue?._id || ''
                }
            };

            dispatch(changeLOcationData(temp));
        }
    };

    const addCommentsForm = (
        <Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>Comments</InputLabel>
                    <CustomInput
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        fullWidth
                        // style={{ width: 600 }}
                        className={classes.textField}
                        size="lg"
                        multiline
                    />
                </Grid>
            </Grid>
        </Grid>
    );

    useEffect(() => {
        if (transferDataSuccess && transferDataSuccess.status && transferTableData?.data?.length > 0) {
            globalTags = [];
            resultedRfid = [];
            showSnackbar(true, 'Issue Success', 'success');
            setTransferTableData({ data: [] });
            setOpenTransferDialog(false);
            setHospitalddvalue(null);
            setDeviceddValue(null);
            setLocationddValue(null);
            setTransferComment('');
        }
        if (transferDataError) {
            showSnackbar(true, transferDataError || transferDataError.errorMessage, 'error');
            closeTransferDialog();
        }
    }, [transferDataSuccess, transferDataError]);

    useEffect(() => {
        if (changeLocationSuccess && changeLocationSuccess?.status && transferTableData?.data?.length > 0) {
            globalTags = [];
            resultedRfid = [];
            showSnackbar(true, 'Location Changed', 'success');
            setTransferTableData([]);
            setOpenTransferDialog(false);
            setHospitalddvalue(null);
            setDeviceddValue(null);
            setLocationddValue(null);
        }
        if (changeLocationError) {
            showSnackbar(true, changeLocationError || changeLocationError.errorMessage, 'error');
            closeTransferDialog();
        }
    }, [changeLocationSuccess, changeLocationError]);

    const formContainer = (
        <Grid container spacing={2}>
            <Grid item xs={6} className={classes.inputField}>
                <InputLabel className={classes.inputLabel}>Select Branch*</InputLabel>

                <AutoComplete
                    id="hospital"
                    options={options?.data || []}
                    value={hostialddValue}
                    onChange={(e, value) => onChangeAutoComplete(e, value, 'hostialddValue')}
                    fullWidth
                    name="name"
                    error={hostialddValue && hostialddValue._id ? false : true}
                />
            </Grid>
            <Grid item xs={6} className={classes.inputField}>
                <InputLabel className={classes.inputLabel}>Select Location</InputLabel>

                <AutoComplete
                    id="location"
                    options={options2?.data || []}
                    value={hostialddValue && locationddValue}
                    onChange={(e, value) => onChangeAutoComplete(e, value, 'locationddValue')}
                    fullWidth
                    name="name"
                    disabled={!hostialddValue || !options2?.data?.length > 0}
                />
            </Grid>
            <Grid item xs={6} className={classes.inputField}>
                <InputLabel className={classes.inputLabel}>Select Device</InputLabel>

                <AutoComplete
                    id="device"
                    options={options3?.data || []}
                    value={locationddValue && deviceddValue}
                    onChange={(e, value) => onChangeAutoComplete(e, value, 'deviceddValue')}
                    fullWidth
                    name="name"
                    disabled={!locationddValue || !options3?.data?.length > 0}
                />
            </Grid>
            {changeLocation ? null : (
                <Grid item xs={12} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>Comments</InputLabel>
                    <TextField
                        value={transferComment}
                        onChange={(e) => setTransferComment(e.target.value)}
                        variant="outlined"
                        multiline
                        fullWidth
                        size="small"
                        rows={3}
                    />
                </Grid>
            )}
        </Grid>
    );

    const updateAction = () => {
        const postData = { collectionName: 'activity' };

        postData['validData'] = transferTableData?.data?.map((ele) => {
            return {
                refskuId: ele?._id,
                'track-code': selectedStatus,
                comments: comments
            };
        });

        dispatch(putHeaderAction(postData, undefined, selectedStatus));
    };

    useEffect(() => {
        setOpenAdd(false);
        setComments('');
        if (headerActions && headerActions.status === true) {
            showSnackbar(true, headerActions.message, 'success');
        } else if (headerActionsError) {
            showSnackbar(true, headerActionsError.errorMessage, 'error');
        }

        return () => {
            setTimeout(() => {
                dispatch(clearheaderActionsResponse());
            }, 4000);
        };
    }, [headerActions, headerActionsError]);

    const onCloseCommentDialog = () => {
        setOpenAdd(false);
        setComments('');
    };

    const openCommentsPopup = (value) => {
        setOpenAdd(true);
        setUpdateStatus(value);
    };

    const handleScanCountDialog = () => {
        setScanCountDialog(!scanCountDialog);
    };

    React.useEffect(() => {
        if (socket) {
            socket.once('listenScannedData', (data) => {
                if (data.status === true) {
                    dispatch(SocketScanData(data.data));
                }
            });
        }
    }, [socket]);

    return (
        <>
            <Paper elevation={0} className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} md={4} lg={4}>
                        <>
                            <InputLabel className={classes.inputLabel}>Scan RFID / Unit ID</InputLabel>
                            <CustomSearch
                                value={unitsearch}
                                size="md"
                                placeholder={'Scan RFID / Unit ID'}
                                handleChange={(e) => setUnitSearch(e?.target?.value?.trim())}
                                onEnterPress={handleUnitSearch}
                                handleSearch={handleUnitSearch}
                                handleSearchDelete={handleUnitSearchDelete}
                                loader={unitsearch.length > 2 && getTransferDataLoading}
                                disabled={!accessableCodes.includes('BS-ACO-1035')}
                            />
                        </>
                    </Grid>
                    <Grid
                        lg={2}
                        style={{
                            display: 'flex',
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                            cursor: accessableCodes.includes('BS-ACO-1036') ? 'pointer' : ''
                        }}
                    >
                        <Typography
                            color={'primary'}
                            variant="h6"
                            onClick={() =>
                                globalTags.length > 0 && accessableCodes.includes('BS-ACO-1036')
                                    ? handleScanCountDialog()
                                    : handleScanCountDialog()
                            }
                        >
                            Scanned Count : {globalTags?.length}
                        </Typography>
                    </Grid>
                    <Grid
                        lg={6}
                        style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            paddingTop: 15
                        }}
                    >
                        <DeviceSelection />
                    </Grid>
                </Grid>
            </Paper>
            <CustomDialog
                title={`Scanned ID's`}
                open={scanCountDialog}
                // onSaveClick={handleScanCountDialog}
                // isSave
                // isOk
                tabIndex={1}
            >
                <Grid>
                    {globalTags.map((item, index) => (
                        <Typography key={index} color="primary">
                            {item}
                        </Typography>
                    ))}
                </Grid>
            </CustomDialog>
            {transferTableData?.data?.length > 0 ? (
                <>
                    <Paper elevation={0} className={classes.paper}>
                        <Grid container className={classes.countContainer}>
                            <Grid xs={3}>
                                <Typography variant="h6" color="primary" style={{ display: 'flex' }}>
                                    <Box fontWeight="500">
                                        {CurrentSubMenu ? `Units : ${transferTableData?.data?.length}` : null}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid xs={7} className="filterChips"></Grid>
                            <Grid
                                xs={2}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse'
                                }}
                            >
                                {accessableCodes?.includes('BS-ACO-1024') ? (
                                    <DisplayConfig
                                        response={transferTableData?.displayConfigData}
                                        pageSize={pageSize}
                                        pageNum={pageNum}
                                    />
                                ) : (
                                    <IconButton disabled>
                                        <Tooltip title="Display Config">
                                            <ViewColumnIcon />
                                        </Tooltip>
                                    </IconButton>
                                )}
                                <IconButton
                                    onClick={() => {
                                        openCommentsPopup('BS-TR-5111');
                                    }}
                                    disabled={!accessableCodes?.includes('BS-ACO-1019')}
                                >
                                    <Tooltip title="Trigger LED">
                                        <FlareIcon color={accessableCodes?.includes('BS-ACO-1019') ? 'primary' : ''} />
                                    </Tooltip>
                                </IconButton>
                                <IconButton
                                    onClick={() => handleOpenTransefer('Transfer')}
                                    disabled={!accessableCodes.includes('BS-ACO-1038')}
                                >
                                    <Tooltip title="Issue">
                                        <i
                                            className={'fa fa-sign-out'}
                                            style={{
                                                fontSize: 24,
                                                color: accessableCodes.includes('BS-ACO-1038')
                                                    ? theme.palette.primary.main
                                                    : ''
                                            }}
                                            aria-hidden="true"
                                        />
                                    </Tooltip>
                                </IconButton>
                                <IconButton
                                    onClick={() => handlechangeLocation()}
                                    disabled={!accessableCodes.includes('BS-ACO-1037')}
                                >
                                    <Tooltip title="Change Location">
                                        <EditLocationIcon
                                            color={accessableCodes.includes('BS-ACO-1037') ? 'primary' : ''}
                                        />
                                    </Tooltip>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                {transferTableData?.data?.length > 0 ? (
                                    <>
                                        <CustomTable
                                            response={transferTableData || { data: [] }}
                                            rowsPerPage={pageSize}
                                            selectedSearch={null}
                                            setRowData={setRowData}
                                            handleDialog={handleDialog}
                                            tableHandleChange={tableHandleChange}
                                            sortOperation={sortOperation}
                                            sort={sortValue}
                                            history={history}
                                            currentLocation={url}
                                            deleteRowAccess={accessableCodes?.includes('BS-MO-1059')}
                                            pageNum={pageNum}
                                            isAction={headerActionsLoading}
                                            transferUnit={true}
                                            module={'reports'}
                                            selectionAccess={true}
                                            sequenceChangeAccess={accessableCodes?.includes('BS-ACO-1025')}
                                            // transferLoading={getTransferDataLoading}
                                        />
                                    </>
                                ) : (
                                    <NoData />
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                    <ConfirmationDialog
                        deleteLabel
                        handleDialogClose={handleDialogClose}
                        dialogOpen={dialogOpen}
                        title={'Are You Sure You want to delete this record'}
                        type={'warning'}
                        error={errorMessage}
                    >
                        <Grid container spacing={2} className={classes.deleteDialog} justify="center">
                            <Grid item>
                                <CustomButton variant="outlined" color="primary" onClick={handleDialogClose}>
                                    {CONSTANTS.CANCEL}
                                </CustomButton>
                            </Grid>
                            <Grid item>
                                <CustomButton variant="contained" color="primary" onClick={handleDeleteButtonClick}>
                                    {CONSTANTS.CONTINUE}
                                </CustomButton>
                            </Grid>
                        </Grid>
                    </ConfirmationDialog>
                    <CustomDialog
                        title={changeLocation ? 'Change Location' : `Select Destination`}
                        open={openTransferdialog}
                        onCancelClick={closeTransferDialog}
                        onSaveClick={changeLocation ? handleChangeLocationData : handleTransferData}
                        disabled={!(hostialddValue && hostialddValue?._id)}
                        tabIndex={1}
                        loading={headerActionsLoading}
                    >
                        {formContainer}
                    </CustomDialog>
                    <CustomDialog
                        title={`Add Comments`}
                        open={openAdd}
                        // onClose={onCloseCommentDialog}
                        onCancelClick={onCloseCommentDialog}
                        onSaveClick={() => updateAction('')}
                        // isSave
                        // error={"errorMessage"}
                        // loading={postLoading}
                        // disabled={userGroupName?.length === 0}
                        tabIndex={1}
                        loading={headerActionsLoading}
                    >
                        {addCommentsForm}
                    </CustomDialog>

                    {openSnackbar && (
                        <Alert
                            open={openSnackbar}
                            message={snackbarMessage}
                            duration={2000}
                            onClose={() => clearTransactionData()}
                            vertical={'bottom'}
                            horizontal={'center'}
                            severity={severity === 'success' ? 'success' : 'error'}
                            actions={false}
                        />
                    )}
                </>
            ) : (
                <>
                    {transferTableData?.data?.length === 0 && (
                        <>
                            <Paper
                                elevation={1}
                                style={{
                                    marginTop: 20
                                }}
                            >
                                <NoData />
                            </Paper>
                        </>
                    )}
                    {openSnackbar && (
                        <Alert
                            open={openSnackbar}
                            message={snackbarMessage}
                            duration={2000}
                            onClose={() => clearTransactionData()}
                            vertical={'bottom'}
                            horizontal={'center'}
                            severity={severity === 'success' ? 'success' : 'error'}
                            actions={false}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default TransferUnit;