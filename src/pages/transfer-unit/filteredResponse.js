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

let globalTags = [];
let resultedRfid = [];

const NOtExported = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

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
    const { getTransferDataLoading, getTransferDataSuccess, getTransferDataError } = apiResponse;
    const { userAccessData, userAccessLoading } = useSelector((state) => state.getUserAccess);
    const { options } = useSelector((state) => state.getDropDown);
    const { options2 } = useSelector((state) => state.get2ndDropdown);
    const { options3 } = useSelector((state) => state.get3rdDropdown);
    const { transferDataSuccess, transferDataError, transferDataLoading } = useSelector((state) => state.transferData);
    const { headerActions, headerActionsLoading, headerActionsError } = useSelector(
        (state) => state.putHeaderActionResponse
    );

    useEffect(() => {
        if (!userAccessLoading && userAccessData && userAccessData.data) {
            let currentMoudleData = userAccessData?.data[0]?.moduleId
                .filter((item) => item['drawer-code']?.includes(subMenuCode))
                .map((item) => item.code);

            setAccessableCodes(currentMoudleData);
        }
    }, [userAccessData]);

    useEffect(() => {
        return () => {
            setPageNum(0);
            dispatch(clearGetTransactionData());
            dispatch(clearChangeLocationData());
            globalTags = [];
        };
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
            if (!globalTags.includes(item.rfid)) {
                resultedRfid.push(item?.rfid);
                rfidFilteredRows.push(response.data[item?.index]);
            }
            // if(!response.data.)
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
        } else if (getTransferDataSuccess?.data?.length === 0) {
            showSnackbar(true, 'This Unit is not available for issue', 'error');
        }
    }, [getTransferDataSuccess]);

    const handleUnitSearch = () => {
        let tempUnitSerch = unitsearch;
        setUnitSearch('');
        if (!globalTags.includes(tempUnitSerch) && !resultedRfid.includes(tempUnitSerch) && tempUnitSerch.length > 0) {
            globalTags.unshift(tempUnitSerch);
            let UnitIdFilters = [{ key: 'transferStatus', value: 'Available' }];
            dispatch(getTransferData('refsku', JSON.stringify(tempUnitSerch), JSON.stringify(UnitIdFilters)));
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
            setTransferTableData({ data: [] });
        }
        if (changeLocationSuccess && changeLocationSuccess.status) {
            globalTags = [];
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

    return (
        <>
            <Paper elevation={0} className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} md={4} lg={4}>
                        <>
                            <InputLabel className={classes.inputLabel}>Scan RFID / Unit Id</InputLabel>
                            <CustomSearch
                                value={unitsearch}
                                size="md"
                                placeholder={'Scan RFID / Unit ID'}
                                handleChange={(e) => setUnitSearch(e?.target?.value?.trim())}
                                onEnterPress={handleUnitSearch}
                                handleSearch={handleUnitSearch}
                                handleSearchDelete={handleUnitSearchDelete}
                                loader={unitsearch.length > 2 && getTransferDataLoading}
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
                            cursor: 'pointer'
                        }}
                    >
                        <Typography
                            color={'primary'}
                            variant="h6"
                            onClick={() => (globalTags.length > 0 ? handleScanCountDialog() : null)}
                        >
                            Scanned Count : {globalTags?.length}
                        </Typography>
                    </Grid>
                    <Grid lg={7}></Grid>
                </Grid>
            </Paper>
            <CustomDialog
                title={`Scanned ID's`}
                open={scanCountDialog}
                onSaveClick={handleScanCountDialog}
                isSave
                isOk
                tabIndex={1}
            >
                <Grid xs={12} style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                    <Grid>
                        <Typography variant="h6">Previouse Scanned</Typography>
                        {globalTags.map((item, index) => (
                            <Typography key={index} color="primary">
                                {item}
                            </Typography>
                        ))}
                    </Grid>
                    <Grid>
                        <Typography variant="h6">Rfid Numbers In Previous Result</Typography>
                        {resultedRfid.map((item, index) => (
                            <Typography key={index} color="primary">
                                {item}
                            </Typography>
                        ))}
                    </Grid>
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
                                <DisplayConfig
                                    response={getTransferDataSuccess?.displayConfigData}
                                    urlEndPoint={urlEndPoint}
                                    pageSize={pageSize}
                                />
                                <Tooltip title="Trigger LED">
                                    <IconButton
                                        onClick={() => {
                                            openCommentsPopup('BS-TR-5111');
                                        }}
                                    >
                                        <FlareIcon color={'primary'} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Issue">
                                    <IconButton onClick={() => handleOpenTransefer('Transfer')}>
                                        <i
                                            className={'fa fa-sign-out'}
                                            style={{
                                                fontSize: 24,
                                                color: theme.palette.primary.main
                                            }}
                                            aria-hidden="true"
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Change Location">
                                    <IconButton onClick={() => handlechangeLocation()}>
                                        <EditLocationIcon color={'primary'} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                {transferTableData?.data?.length > 0 ? (
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
                                        // transferLoading={getTransferDataLoading}
                                    />
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
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '5pc',
                                    marginTop: 20
                                }}
                            >
                                <Typography color={'primary'}>No Results Yet...</Typography>
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

export default NOtExported;
