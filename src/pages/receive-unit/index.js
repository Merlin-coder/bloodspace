import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, IconButton, InputLabel, Paper, TextField, Tooltip, Typography, useTheme } from '@material-ui/core';
import FlareIcon from '@material-ui/icons/Flare';
import 'font-awesome/css/font-awesome.min.css';
import { useHistory, useLocation } from 'react-router';
import pluralize from 'pluralize';
import { useStyles } from './style';
import ConfirmationDialog from 'components/confirmations/confirmation.container';
import { Alert, CONSTANTS, CustomButton, CustomSearch } from 'common';
import { CustomDialog, CustomTable } from 'components';
import NoData from 'components/no data';
import HeaderIcons from 'components/header-button-and-icons';
import DisplayConfig from 'components/displayConfig';
import CustomInput from 'components/inputfeild';
import AutoComplete from '../../components/autoComplete';
import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import { assignUnitDeviceAction, get4thDropdown } from 'redux/actions';
import DeviceSelection from 'components/socketDeviceSelection/socketDeviceSelection';
import { get8thDropdown } from 'redux/actions/manage/manageFieldsAction';
import Loader from 'components/loader/loader.container';
import SelectOption from 'components/select';
import { CircularProgress } from '@material-ui/core';
import { createAlert } from 'redux/actions';
import {
    bulkScanLoadingAction,
    clearPreEncodedDataAction,
    currentPcAction,
    lFConnection,
    lFDeviceMethod,
    preEncodedLocalDataAction,
    assignWriteRecipientAction,
    socketAction,
    socketAssociateBulkData,
    socketDevice,
    assignLocalDataAction,
    socketDeviceConnection,
    socketDeviceToken,
    socketStartStopScan
} from '../../redux/actions/socketAction';
import {
    get2ndDropdown,
    get3rdDropdown,
    getDropDown,
    clearGetTransactionData,
    getTransferData,
    postTransferData,
    putHeaderAction,
    clearheaderActionsResponse,
    socketResponse,
    passingAssociateProps,
    clearPutResponse,
    putFormData,
    getReceiveUnits
} from 'redux/actions';


function TabPanel(props) {
    const { children, value, index, isDeviceAccess, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`
    };
}

const ReceiveUnit = (props) => {
    const {
        value,
        onChangeTab,
        tabList,
        associate,
        socketRef,
        tabPanelItem,
        setData,
        tabPanelItemObj,
        setAssociateDevice,
        setValue,
        tempTabValue,
        setTempTabValue,
        tabsDialog,
        handleSwitchTab,
        setRfidTag,
        rfidtag,
        setSocketResponseSuccess,
        handleCancelDialog,
        pleaseWait,
        dialogOkButtonLoader
    } = props;
        const theme = useTheme();
        const param = useLocation();
        const classes = useStyles();
    const history = useHistory();
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectedData, setSelectedData] = useState(0);
    const [selectAllRecords, setSelectedAllRecordsFlag] = useState(false);
    const bulkScanLoading = useSelector((state) => state.bulkScanLoadingStore);
    const { preEncodeData } = useSelector((state) => state.getSocketScanData);
        const [dialogOpen, setDialogOpen] = useState(false);
        const { device } = useSelector((state) => state.getSocketDevice);
        const [alertOpen2, setAlertOpen2] = useState(false);
    let { scanStatus } = useSelector((state) => state.getSocketStartStopScan);
    const { status } = useSelector((state) => state.getSocketDeviceConnection);
    const [rowData, setRowData] = useState({});
    const LedTrigger = useRef(false);
        const [pageSize, setPageSize] = useState(10);
        const [tagLoading, setTagLoading] = React.useState(false);
        const [pageNum, setPageNum] = useState(0);
    const [activeDevices, setActiveDevices] = React.useState([]);
    
        const [errorMessage, setErrorMessage] = useState('');
        const dispatch = useDispatch();
        const apiResponse = useSelector((state) => state.recieveUnitsStore);
        const { options8, options8loading } = useSelector((state) => state.get8thDropdown);
        const { getReceiveUnitsLoading, getReceiveUnitsSuccess, getTransferDataError } = apiResponse;
        // const mData = data.length > 1 ? data[1] : data[0];
        const label = 'Transfer Unit';
        const urlEndPoint = 'tranferUnit';
        const CurrentSubMenu = label.indexOf('ed') === -1 && label !== 'Request Unit' ? pluralize.plural(label) : label;
        let url = props.path.split('/').slice(2).join('/');
    const socket = useSelector((state) => state.socketReducer.socket);
        const { userAccessData, userAccessLoading } = useSelector((state) => state.getUserAccess);
        const [accessableCodes, setAccessableCodes] = useState([]);
        const subMenuCode = 'transferUnit';
        const [unitsearch, setUnitSearch] = useState('');
    const { lfDevice } = useSelector((state) => state.getLFDevice);
        const { options } = useSelector((state) => state.getDropDown);
        const { options2 } = useSelector((state) => state.get2ndDropdown);
        const { options3 } = useSelector((state) => state.get3rdDropdown);
    const { userInfo } = useSelector((state) => state.userLogin);
        const { transferDataSuccess, transferDataError, transferDataLoading } = useSelector((state) => state.transferData);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
        const { putLoading, putResponse, putError } = useSelector((state) => state.putFormFields);
        const { headerActions, headerActionsLoading, headerActionsError } = useSelector(
            (state) => state.putHeaderActionResponse
        );
        const [openSnackbar, setOpenSnackbar] = useState(false);
        const [snackbarMessage, setSnackbarMessage] = useState('');
        const [severity, setSnackbarSeverity] = useState('');
        const [selectedStatus, setUpdateStatus] = useState('');
        const [openAssignWarning, setOpenWarningAssign] = useState(false);
        const [openAdd, setOpenAdd] = useState(false);
        const [comments, setComments] = useState('');
        // const { receivedUnitsSuccess } = useSelector((state) => state.receivedUnitsStore);
    const { localPreEncode } = useSelector((state) => state.preEncodedLocalDataStore);
    const { local2DBarcode } = useSelector((state) => state.associateBatchState);
        const [openTransferdialog, setOpenTransferDialog] = useState('');
    const [show, setShow] = React.useState(true);
        const [hostialddValue, setHospitalddvalue] = useState(null);
        const [locationddValue, setLocationddValue] = useState(null);
        const [deviceddValue, setDeviceddValue] = useState(null);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alert, setAlert] = React.useState(false);
        const [destinationObject, setDestinationObject] = useState({});
    const [lFIPAddress, setLFIPAddress] = React.useState('');
        const [transferComment, setTransferComment] = useState('');
        const [transferTableData, setTransferTableData] = useState({});
    const [lfDeviceRequest, setLfDeviceRequest] = React.useState(false);
        const recivedUnitData = param.state?.unitIds;
        const selectedClient = param.state?.clientId;
        const selectedDevice = param.state?.deviceId;
        const selectedLocation = param.state?.locationId;
    const selectedVoucher = param.state?.voucherId;
    let { assignData } = useSelector(state => state.assignDataLocalDataStore); 
    const [triggeredLedList, setTriggerLedList] = useState([]);
    const [unchecked, setUnchecked] = useState([]);
    const currentPc = useSelector((state) => state.currentPcStore);
    const voucherRow = param.state.rowId;
    const [selectedDevicesValue, setSelectedDevicesValue] = React.useState();
    const [rowSelected, setRowSelected] = useState(false);
    const [sortValue, setSortValue] = useState({});
    const genericEmit = (data) => {
        console.log('========================================');
        console.log('generic ', JSON.stringify(data));
        console.log('========================================');
        if (data) {
            socket?.emit('generic', data);
        }
    };

   /* const sortOperation = (sort) => {
        setSortValue(sort);
        if (unitsearch?.length > 2 && showFilters?.length > 0) {
            let UnitIdFilters = [{ key: 'donationCode', value: [unitsearch] }, ...showFilters];
            dispatch(getData(urlEndPoint, pageSize * (pageNum + 3), pageNum, undefined, UnitIdFilters, sort));
        } else if (unitsearch?.length > 2) {
            let UnitIdFilters = [{ key: 'donationCode', value: [unitsearch] }];
            dispatch(getData(urlEndPoint, pageSize * (pageNum + 3), pageNum, undefined, UnitIdFilters, sort));
        } else if (searchKey?.length > 2 && showFilters?.length > 0) {
            dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, showFilters, sort));
        } else if (searchKey?.length > 2) {
            dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, undefined, sort));
        } else if (showFilters?.length > 0) {
            dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, showFilters, sort));
        } else {
            dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, undefined, sort));
        }
    };*/

    React.useEffect(() => {
        if (options8) {
            const active = options8.data.filter((item) => item.status == 1);
            setActiveDevices(active);
            dispatch(socketDevice(active.length > 0 ? active[0].name : ""))
            setSelectedDevicesValue(active[0]);
            dispatch(socketDeviceToken(active?.[0]?.token));
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: active[0]?.token,
                method: 'E111',
                payload: {
                    userName: userInfo.data.user.username,
                    message: 'connected'
                }
            });
        }
    }, [options8]);

    useEffect(() => {
        dispatch(get8thDropdown('devices', undefined, 'associate'));
    }, []);

    const rowChecked = (row) => {
        row ? setRowSelected(true) : setRowSelected(false);
    };

    

    const handleDeviceChange = (e) => {
        dispatch(socketDeviceConnection(false));
        dispatch(socketDevice(e.target.value));
        let selectedVal = activeDevices.filter((item) => item.name === e.target.value);
        if (selectedVal[0]?.deviceTypeId?.[0]?.name.includes('SBLF')) {
            setLfDeviceRequest(true);
            dispatch(lFDeviceMethod(selectedVal[0]?.ipAddress));
            setLFIPAddress(selectedVal[0]?.ipAddress);
        } else {
            setLfDeviceRequest(false);
        }
        setSelectedDevicesValue(selectedVal[0]);
        dispatch(socketDeviceToken(selectedVal[0]?.token));
        genericEmit({
            userName: userInfo?.data?.user?.username,
            deviceToken: selectedVal[0]?.token,
            method: 'E111',
            payload: {
                userName: userInfo.data.user.username,
                message: 'connected'
            }
        });
        dispatch(preEncodedLocalDataAction([]));
        if (scanStatus) {
            console.log('clicked', e?.target?.textContent);
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: 'E105',
                payload: {
                    userName: userInfo.data.user.username,
                    method: 'E105',
                    acknOn: 'ackStopScan'
                }
            });

            dispatch(socketAssociateBulkData());
        }
    };


    const startScanStop = (e) => {
        console.log('clicked', e?.target?.textContent);
        if (e?.target.textContent === 'Start') {
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: 'E104',
                payload: {
                    userName: userInfo.data.user.username,
                    method: 'E104',
                    acknOn: 'ackStartScan',
                    type: 'Associate'
                }
            });
            //dispatch(preEncodedLocalDataAction([]));
            dispatch(clearPreEncodedDataAction());
            dispatch(bulkScanLoadingAction(true));
            } else if (e?.target.textContent === 'Stop') {
            console.log('clicked', e?.target?.textContent);
            let data = [];

            dispatch(preEncodedLocalDataAction(data));

            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: 'E105',
                payload: {
                    userName: userInfo.data.user.username,
                    method: 'E105',
                    acknOn: 'ackStopScan'
                }
            });
            dispatch(clearPreEncodedDataAction());
            dispatch(socketAssociateBulkData());
        } else {
            if (lfDevice) {
                lfDevice.connect();
                if (lfDevice.isInitialized()) {
                    lfDevice.requestScan();
                    // Connection with the remote device established
                }
            } else {
                if (status && !scanStatus) {
                    genericEmit({
                        userName: userInfo?.data?.user?.username,
                        deviceToken: token,
                        method: 'E104',
                        payload: {
                            userName: userInfo.data.user.username,
                            method: 'E104',
                            acknOn: 'ackStartScan',
                            type: 'Associate'
                        }
                    });
                    //dispatch(preEncodedLocalDataAction([]));
                    dispatch(clearPreEncodedDataAction());
                    dispatch(bulkScanLoadingAction(true));
                } else if (scanStatus) {
                    console.log('clicked', e?.target?.textContent);
                    let data = [];

                    dispatch(preEncodedLocalDataAction(data));

                    genericEmit({
                        userName: userInfo?.data?.user?.username,
                        deviceToken: token,
                        method: 'E105',
                        payload: {
                            userName: userInfo.data.user.username,
                            method: 'E105',
                            acknOn: 'ackStopScan'
                        }
                    });
                    dispatch(clearPreEncodedDataAction());
                    dispatch(socketAssociateBulkData());
                    //dispatch(preEncodedLocalDataAction([]));
                }
            }
        }
    };


        useEffect(() => {
            dispatch(get2ndDropdown('locations'));
            if (selectedLocation) {
                let filters = [{ key: 'locationId._id', value: selectedLocation }];
                dispatch(get3rdDropdown('devices', JSON.stringify(filters)));
            } else {
                dispatch(get3rdDropdown('devices'));
            }
            if (selectedDevice) {
                setDisableDevice(true);
            }
        }, [param]);

        const [disableDevice, setDisableDevice] = useState(false);

        useEffect(() => {
            if (!userAccessLoading && userAccessData && userAccessData.data) {
                let currentMoudleData = userAccessData?.data[0]?.moduleId
                    .filter((item) => item['drawer-code']?.includes(subMenuCode))
                    .map((item) => item.code);
                let currentMoudleDatObject = userAccessData.data[0]?.moduleId
                    .filter((item) => item['drawer-code'].includes(subMenuCode))
                    .map((item) => {
                        let { code, name, description } = item;
                        return { code, name, description };
                    });
                setAccessableCodes(currentMoudleData);
            }
        }, [userAccessData]);

        useEffect(() => {
            if (recivedUnitData.length > 0) {
                let filtered = [
                    {
                        key: '_id',
                        value: recivedUnitData
                    }
                ];
                dispatch(getReceiveUnits(JSON.stringify(filtered)));
                dispatch(getDropDown('clients'));
            }

            return () => {
                setPageNum(0);
                dispatch(clearPutResponse());
                dispatch(clearGetTransactionData());
                setTransferTableData({});
            };
        }, [urlEndPoint]);

        useEffect(() => {
            return () => {
                setPageNum(0);
                dispatch(clearPutResponse());
                dispatch(clearGetTransactionData());
                setTransferTableData({});
            };
        }, [location]);

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

        useEffect(() => {
            if (recivedUnitData?.length > 0) {
                let TempRows = getReceiveUnitsSuccess?.data?.length > 0 && [
                    ...getReceiveUnitsSuccess?.data?.filter((item) => item?.transferStatus !== 'Available')
                ];

                let tempTransferTalbeData = {
                    status: true,
                    displayConfigData: getReceiveUnitsSuccess?.displayConfigData,
                    error: null,
                    message: 'Fetch Successful',
                    data: getReceiveUnitsSuccess?.data?.length > 0 ? TempRows : [],
                    page: {
                        hasNextPage: TempRows?.length > pageSize ? true : false,
                        currentPage: 1,
                        filterCount: TempRows.length,
                        totalCount: TempRows.length
                    }
                };

                setTransferTableData(tempTransferTalbeData);
            }
        }, [getReceiveUnitsSuccess]);

    const [allowReceive, setAllowReceive] = useState(false);

    const handleAlert = () => {
        setAlert(false);
        setAlertMessage('');
    };

    const handleUnitSearch = (e) => { 
        console.log(e);
            e = e.replace('=', '');
            console.log(e);
            setUnitSearch(e);
            if (recivedUnitData.length > 0) {
                let found = transferTableData?.data?.findIndex(
                    (item) =>
                        item?.rfidNumber?.split('-')?.join('')?.toLowerCase() === e.split('-')?.join('')?.toLowerCase() ||
                        item?.donationCode?.split('-')?.join('')?.toLowerCase() === e.split('-')?.join('')?.toLowerCase()
                );

                if (found !== -1) {
                    setUnitSearch('');
                    setAllowReceive(true);
                    let tempUnits = transferTableData.data;
                    let checkedUnit = { ...tempUnits[found], check: true, tick: true };
                    tempUnits.splice(found, 1, checkedUnit);
                    let tempTableData = { ...transferTableData, data: tempUnits };
                    setTransferTableData(tempTableData);
                }
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
            setOpenWarningAssign(false);
        };


        const handleOpenTransefer = () => {
            setOpenTransferDialog(true);
            let tempDevice = options3?.data?.filter((item) => item?._id === selectedDevice)[0];
            let tempHospital = options?.data?.filter((item) => item?._id === selectedClient)[0];
            let tempLocation = options2?.data?.filter((item) => item?._id === selectedLocation)[0];

            if (deviceddValue && deviceddValue._id) {
                //doNothing
            } else {
                setDeviceddValue(tempDevice);
            }
            if (locationddValue && locationddValue._id) {
                //doNothing
            } else if (tempLocation === undefined) {
                setDisableDevice(true);
                let filters = [{ key: 'clientId._id', value: selectedClient }];
                dispatch(get2ndDropdown('locations', JSON.stringify(filters)));
            } else {
                setLocationddValue(tempLocation);
            }
            setHospitalddvalue(tempHospital);
        };

        const closeTransferDialog = (clickAway) => {
            setHospitalddvalue(null);
            setLocationddValue(null);
            setDeviceddValue(null);
            setTransferComment('');
            setOpenTransferDialog(false);
            if (clickAway !== 'clickAway') {
                dispatch(clearPutResponse());
                dispatch(clearGetTransactionData());
            }
        };

        const handleDeleteButtonClick = () => {
            let tempTransferTalbeData = {
                status: true,
                displayConfigData: getReceiveUnitsSuccess.displayConfigData,
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
            setTransferTableData(tempTransferTalbeData);
            setDialogOpen(false);
        };

        const showSnackbar = (isopen, message, severity) => {
            setSnackbarMessage(`${message}`);
            setSnackbarSeverity(severity);
            setOpenSnackbar(isopen);
        };

        const clearTransactionData = () => {
            setOpenSnackbar(false);
            if (snackbarMessage === 'Receive Success') {
                dispatch(clearPutResponse());
                history.goBack();
            }
        };

        useEffect(() => {
            if (locationddValue && options3?.data?.length === 1 && selectedDevice === undefined) {
                if (deviceddValue && deviceddValue._id) {
                    //doNothing
                } else {
                    setDeviceddValue(options3?.data?.[0]);
                }
            } else if (options3?.data?.length === 0) {
                setDeviceddValue(null);
            }
        }, [options3]);

    useEffect(() => {
        if (socket && currentPc) {
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: 'E105',
                payload: {
                    userName: userInfo?.data?.user?.username,
                    method: 'E105',
                    acknOn: 'ackStopScan'
                }
            });
            dispatch(socketAssociateBulkData());
            dispatch(assignLocalDataAction([]));
        }
    }, []);


    

        useEffect(() => {
            if (options2?.data?.length === 1 && selectedLocation === undefined) {
                if (locationddValue && locationddValue._id) {
                    //doNothing
                } else {
                    setLocationddValue(options2?.data?.[0]);
                    let filters = [{ key: 'locationId._id', value: options2?.data?.[0]?._id }];
                    dispatch(get3rdDropdown('devices', JSON.stringify(filters)));
                    setDisableDevice(false);
                }
            }
        }, [options2]);

        const onChangeAutoComplete = (e, value, feild) => {
            let tempDestinationObject = { ...destinationObject };
            if (feild === 'hostialddValue') {
                let filters = [{ key: 'clientId._id', value: value?._id }];
                dispatch(get2ndDropdown('locations', JSON.stringify(filters)));
                setHospitalddvalue(value);
            }
            if (feild === 'locationddValue') {
                let filters = [{ key: 'locationId._id', value: value?._id }];
                dispatch(get3rdDropdown('devices', JSON.stringify(filters)));
                setDeviceddValue(null);
                setLocationddValue(value);
                setDisableDevice(false);
            }
            if (feild === 'deviceddValue') {
                setDeviceddValue(value);
            }
            tempDestinationObject[feild] = value;
            setDestinationObject(tempDestinationObject);
        };

    React.useEffect(() => {
        dispatch(bulkScanLoadingAction(false));
        setTagLoading(false);
    }, [rfidtag]);

        const handleTransferData = () => {
            let tempData = transferTableData?.data.filter((item) => item.tick).map((item) => item._id);
            let allIds = transferTableData?.data?.map((item) => item._id);

            let temp = {
                collectionName: 'transaction',
                validData: {
                    'refsku-multiple': tempData.length > 0 ? tempData : allIds,
                    transactionType: 'Received',
                    transactionStatus: 'Done',
                    // transactionStatus: 'Available',
                    clientId: hostialddValue?._id,
                    locationId: locationddValue?._id,
                    deviceId: deviceddValue?._id,
                    comments: transferComment
                }
            };

            if (temp) {
                let transactionStatus = {
                    collectionName: 'transaction',
                    validData: [
                        {
                            transactionStatus:
                                tempData.length === allIds.length || tempData.length === 0 ? 'Done' : 'Partially Pending',
                            _id: selectedVoucher
                        }
                    ]
                };
                dispatch(putFormData(transactionStatus));
            }

            dispatch(postTransferData(temp));
    };

    useEffect(() => {

        if (socket && currentPc) {

            socket?.on('ackStartScan', (data) => {
                console.log('ackStartScan', data);
                if (data.status === true && currentPc) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'success'
                        })
                    );
                    // setBulkScanLoading(false);
                    dispatch(bulkScanLoadingAction(false));
                    dispatch(socketStartStopScan(true));
                }
            });

            socket?.on('ackStartBatchScan', (data) => {
                console.log('ackStartBatchScan', data);
                if (data.status === true && currentPc) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'success'
                        })
                    );
                    // setBulkScanLoading(false);
                    dispatch(bulkScanLoadingAction(false));
                    dispatch(socketStartStopScan(true));
                }
            });

            socket?.on('ListenBatchTag', (data) => {
                console.log('listenBatchTag', data);
                if (data?.status === true && currentPc) {
                    let tempTagid = data?.data?.map((i) => i.tagId);
                    dispatch(passingAssociateProps(tempTagid));
                    dispatch(bulkScanLoadingAction(false));
                    dispatch(socketStartStopScan(true));
                }
            });


            socket?.on('ackStopScan', (data) => {
                console.log('ackStopScan', data);
                if (data.status && currentPc) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'success'
                        })
                    );
                    dispatch(socketStartStopScan(false));
                }
            });

            socket?.on('ackStopBatchScan', (data) => {
                console.log('ackStopBatchScan', data);
                if (data.status && currentPc) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'success'
                        })
                    );
                    dispatch(socketStartStopScan(false));
                }
            });

            socket.on('generic', (data) => {
                console.log('generic', data);
                if (data.status === false && currentPc) {
                    if (setSocketResponseSuccess) {
                        setSocketResponseSuccess(true);
                    }
                    dispatch(socketResponse(true));
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'error'
                        })
                    );
                }
            });
            socket.on('listenScannedData', (data) => {
                console.log('listenScannedData', data);
                console.log("Transfer Table Data ----------------------" + transferTableData?.data);
                if (data.status === true) {
                    //dispatch(SocketScanData(data.data));

                    let found = transferTableData?.data?.findIndex(
                        (item) =>
                            item?.rfidNumber?.split('-')?.join('')?.toLowerCase() === data?.data[0].rfidNumber)

                    if (found !== -1) {

                        let tempUnits = transferTableData?.data;
                        console.log("--------------" + tempUnits + "---------------");
                        const index = tempUnits.findIndex(ids => ids.rfidNumber === data?.data[0].rfidNumber);
                        let checkedUnit = { ...tempUnits[index], check: true, tick: true };
                        tempUnits.splice(index, 1, checkedUnit);
                        let tempTableData = { ...transferTableData, data: tempUnits };
                        setTransferTableData(tempTableData);
                        setAllowReceive(true);
                    }
                }
            });

            /*socket.on('reScan', (data) => {
                console.log('listenScannedData', data);
                console.log("PreEncode ----------------------" + preEncodeData);
                if (data.status === true) {
                    //dispatch(SocketScanData(data.data));

                    if (data?.data.length > 0) {
                        const index = assignData.findIndex(ids => ids.rfidNumber === data?.data[0].rfidNumber);
                        if (index === -1) {
                            console.log("Added");
                            assignData.push(data?.data[0]);
                        }
                        else {
                            assignData = assignData.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                            assignData.push(data?.data[0]);
                        }
                        //localPreEncode.push(data?.data[0]);  
                        console.log("-------assignData", assignData);
                        //dispatch(SocketScanData(data?.data));                 
                        dispatch(assignLocalDataAction(assignData));
                    }

                }
            });*/



            //ackWriteRecipient assign unit

            socket?.on('ackWriteRecipient', (data) => {
                console.log('ackWriteRecipient', data);
                if (data.status === true) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'success',
                            alertDuration: 10000
                        })
                    );
                    console.log('Rescan Triggered', data);
                    // Rescan functionality added
                    genericEmit({
                        userName: userInfo?.data?.user?.username,
                        deviceToken: token,
                        method: 'E129',
                        payload: {
                            userName: userInfo.data.user.username,
                            method: 'E129',
                            type: 'Associate'
                        }
                    });
                    // handleBack();
                    dispatch(assignWriteRecipientAction(data));
                } else {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'error',
                            alertDuration: 10000
                        })
                    );
                    dispatch(assignWriteRecipientAction(data));
                }
            });

            socket?.on('assignUnitRecipient', (data) => {
                console.log('assignUnitRecipient', data);
                if (data.status === true) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'success',
                            alertDuration: 10000
                        })
                    );
                    console.log('Rescan Triggered', data);   
                    // Rescan functionality added
                    genericEmit({
                        userName: userInfo?.data?.user?.username,
                        deviceToken: token,
                        method: 'E129',
                        payload: {
                            userName: userInfo.data.user.username,
                            method: 'E129',
                            type: 'Associate'
                        }
                    });

                    // handleBack();
                    dispatch(assignWriteRecipientAction(data));
                } else {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'error',
                            alertDuration: 10000
                        })
                    );
                    dispatch(assignWriteRecipientAction(data));
                }
            });
        }

        // if (selectedDevicesValue) {
        socket?.on('userConnected', (data) => {
            console.log('userConnected', data);
            if (data.status === true) {

                if (data.deviceStatus === "DS_InScan") {
                    dispatch(socketStartStopScan(true));
                }
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: data.message,
                        alertType: 'success'
                    })

                );
                dispatch(socketDeviceConnection(true));
                // Autoscan functionality added
                /*genericEmit({
                    userName: userInfo?.data?.user?.username,
                    deviceToken: token,
                    method: 'E129',
                    payload: {
                        userName: userInfo.data.user.username,
                        method: 'E129',
                        type: 'Associate'
                    }
                });*/
            } else {
                dispatch(socketDeviceConnection(false));
            }
        });
        // }
    }, [socket, currentPc, preEncodeData]);

        useEffect(() => {
            if (transferDataSuccess && transferDataSuccess.status && transferTableData?.data?.length > 0) {
                showSnackbar(true, 'Receive Success', 'success');
                setOpenTransferDialog(false);
                setTransferTableData({});
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

        const formContainer = (
            <Grid container spacing={2}>
                <Grid item xs={6} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>Select Hospital*</InputLabel>

                    <AutoComplete
                        id="hospital"
                        options={options?.data || []}
                        value={hostialddValue}
                        onChange={(e, value) => onChangeAutoComplete(e, value, 'hostialddValue')}
                        fullWidth
                        name="name"
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={6} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>Select Location</InputLabel>

                    <AutoComplete
                        id="location"
                        options={options2?.data || []}
                        value={locationddValue}
                        onChange={(e, value) => onChangeAutoComplete(e, value, 'locationddValue')}
                        fullWidth
                        name="name"
                        //disabled={selectedLocation && selectedLocation?.length !== 0}
                    />
                </Grid>
                {/*<Grid item xs={6} className={classes.inputField}>*/}
                {/*    <InputLabel className={classes.inputLabel}>Select Device</InputLabel>*/}

                {/*    <AutoComplete*/}
                {/*        id="device"*/}
                {/*        options={options3?.data || []}*/}
                {/*        value={locationddValue && deviceddValue}*/}
                {/*        onChange={(e, value) => onChangeAutoComplete(e, value, 'deviceddValue')}*/}
                {/*        fullWidth*/}
                {/*        name="name"*/}
                {/*        disabled={disableDevice}*/}
                {/*    />*/}
                {/*</Grid>*/}
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
            </Grid>
        );

        const updateAction = () => {
            const postData = { collectionName: 'activity' };
            let tempData = transferTableData?.data.filter((item) => item.tick).map((item) => item._id);
            postData['validData'] = tempData?.map((ele) => {
                return {
                    refskuId: ele?._id,
                    'track-code': selectedStatus,
                    comments: comments
                };
            });

            dispatch(putHeaderAction(postData, undefined, selectedStatus));
        };

        const onCloseCommentDialog = () => {
            setOpenAdd(false);
            setComments('');
        };

        const openCommentsPopup = (value) => {
            setOpenAdd(true);
            setUpdateStatus(value);
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

        const voucherMap = [
            { key: 'Vouche Number', value: 'voucherNumber' },
            { key: 'Transaction Status', value: 'transactionStatus' },
            { key: 'Transaction Type', value: 'transactionType' },
            { key: 'Units Issued', value: 'unitCounts' },
            { key: 'Branch', value: 'clientId[0].name' }
        ];

        const capitalize = (expression) => expression.charAt(0).toUpperCase() + expression.slice(1);
        const handleClearVoucher = () => {
            history.goBack();
    };
        const handleEmptyDevices = () => {
            if (activeDevices?.length === 0) {
                console.log("activedevices--", activeDevices)
                dispatch(get8thDropdown('devices', undefined, 'associate'));
            }
    };

/*const handleSelect = (selRecords, flag) => {
        setSelectedRecords(selRecords);
        setSelectedAllRecordsFlag(flag);
    console.log("selrecords----", selRecords);
    console.log(selectedRecords.length)
    console.log("flag------", flag);

    if (selectedRecords.length>0) {
        setAllowReceive(true);
    }
        // setSelectedRow([...rows]);
        // console.log(selRecords);
};*/

    const handleSelect = (selRecords, flag, unSelected, againSelected) => {
        if (againSelected === true) {
            setSelectedRecords([...selRecords, unSelected]);
        } else if (unSelected !== undefined) {
            setSelectedRecords([...selRecords.filter((item) => item !== unSelected)]);
        } else {
            setSelectedRecords(selRecords);
        }
        setSelectedAllRecordsFlag(flag);
        setSelectedData(selRecords.length)
        console.log("---------------" + selectedRecords.length);
        console.log("selrecords----", selRecords);
        console.log("flag------", flag);

    };

        return (
            <>
                {' '}
                <Paper elevation={0} className={classes.paper}>
                    <Grid container>
                        <Grid xs={1} item className={classes.buttonGrid}>
                            <CustomButton variant="outlined" color="primary" onClick={handleClearVoucher}>
                                {CONSTANTS.BACK}
                            </CustomButton>
                        </Grid>
                        <Grid item xs={3} lg={4}>
                            <>
                                <InputLabel className={classes.inputLabel}>Search / Scan </InputLabel>
                                <CustomSearch
                                    value={unitsearch}
                                    size="md"
                                    placeholder={'Search / Scan'}
                                    handleChange={(e) =>
                                        e.target.value !== ' ' ? handleUnitSearch(e.target.value?.trim()) : null
                                    }
                                    handleSearchDelete={handleUnitSearchDelete}
                                    loader={unitsearch.length > 2 && getReceiveUnitsLoading}
                                />
                            </>
                        </Grid>
                        <Grid lg={3}></Grid>
                        <>
                            {tabList &&
                                tabList.map((item, index) => {
                                    <Tab
                                        key={index}
                                        label={item}
                                        {...a11yProps(index)}
                                        onClick={() => {
                                            // setRfidTag && setFlipped(!flipped);
                                            if (item === 'Pre-encoded' || item === 'Associate-Batch') {
                                                setRfidTag(true);
                                                setShow(true);
                                            } else {
                                                setShow(true);
                                                if (localPreEncode?.length === 0 && item !== 'Barcode') {
                                                    setRfidTag(false);
                                                } else if (!local2DBarcode?.gtinNumber) {
                                                    setRfidTag(false);
                                                }
                                            }
                                        }}
                                    />
                                })}
                            <Grid item>
                                <Grid container spacing={2} alignItems="center">
                                    <DeviceSelection />
                                </Grid>
                                </Grid>
                        </>
                        <Grid item xs={2} lg={2}>
                            <HeaderIcons showIcons={[]} />
                        </Grid>
                    </Grid>
                </Paper>
                {transferTableData?.data?.length > 0 ? (
                    <>
                        <Paper elevation={0} className={classes.paper}>
                            <Grid container className={classes.countContainer}>
                                <Grid xs={3}>
                                    <Typography variant="h6" color="primary" style={{ display: 'flex' }}>
                                        <Box fontWeight="500">
                                            {CurrentSubMenu ? `Units: ${transferTableData?.data?.length}` : null}
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid xs={7} className="filterChips"></Grid>
                                <Grid xs={2} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                    <DisplayConfig
                                        response={getReceiveUnitsSuccess?.displayConfigData}
                                        urlEndPoint={urlEndPoint}
                                        pageSize={pageSize}
                                    />
                                    {recivedUnitData.length > 0 ? (
                                        <IconButton disabled={!allowReceive} onClick={handleOpenTransefer}>
                                            <Tooltip title="Receive">
                                                <i
                                                    className={'fa fa-sign-in'}
                                                    style={{
                                                        fontSize: 24,
                                                        color: !allowReceive ? null : theme.palette.primary.main,
                                                        transform: 'rotate(180deg)'
                                                    }}
                                                    aria-hidden="true"
                                                />
                                            </Tooltip>
                                        </IconButton>
                                    ) : null}
                                    <Tooltip title="Trigger LED">
                                        <IconButton disabled={selectedRecords.length === 0}
                                            onClick={() => {
                                                LedTrigger.current = !LedTrigger.current;
                                                console.log(LedTrigger)
                                                if (LedTrigger.current) {
                                                    openCommentsPopup('BS-TR-5114');
                                                }
                                                else {
                                                    LedTrigger.current = false;
                                                    // Stop Scan
                                                    if (socket && currentPc) {
                                                        genericEmit({
                                                            userName: userInfo?.data?.user?.username,
                                                            deviceToken: token,
                                                            method: 'E105',
                                                            payload: {
                                                                userName: userInfo?.data?.user?.username,
                                                                method: 'E105',
                                                                acknOn: 'ackStopScan'
                                                            }
                                                        });
                                                        dispatch(socketAssociateBulkData());
                                                        dispatch(assignLocalDataAction([]));
                                                    }
                                                } 
                                            }}
                                           
                                        >
                                            <FlareIcon color={LedTrigger.current ? '#DD0004' : selectedRecords.length > 0 ? 'primary' : ''} />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    {getReceiveUnitsLoading ? (
                                        <div className={classes.loaderDivStyles}>
                                            <Loader />
                                        </div>
                                    ) : transferTableData?.data?.length > 0 ? (
                                        <CustomTable
                                            //response={transferTableData}
                                            //    rowsPerPage={pageSize}
                                            //selectedSearch={null}
                                            //setRowData={setRowData}
                                            //handleDialog={handleDialog}
                                            //tableHandleChange={tableHandleChange}
                                            //history={history}
                                            //currentLocation={url}
                                            //deleteRowAccess={accessableCodes?.includes('BS-MO-1059')}
                                            //pageNum={pageNum}
                                            //isAction={headerActionsLoading}
                                            //transferUnit={recivedUnitData.length > 0 ? false : true}
                                            //reciveUnit={recivedUnitData.length > 0}
                                            //    module={'reports'}
                                            //    isRequestUnit={true }
                                            //selectionAccess={true}
                                                //selectedData={selectedData}
                                                //setSelectedData={setSelectedData}
                                                //selectedRecords={selectedRecords}
                                                //selectAllRecords={selectAllRecords}
                                                //handleSelect={handleSelect}
                                                response={transferTableData}
                                                rowsPerPage={pageSize}
                                                selectedSearch={null}
                                                setRowData={setRowData}
                                                //setResultsCount={setResultsCount}
                                                handleDialog={handleDialog}
                                                //handleEditDialog={handleEditDialog}
                                                //setInitialData={setInitialData}
                                                tableHandleChange={tableHandleChange}
                                                //sortOperation={sortOperation}
                                                sort={sortValue}
                                                history={history}
                                                setSelectedData={setSelectedData}
                                                selectedData={selectedData}
                                                currentLocation={url}
                                                rowChecked={rowChecked}
                                                detailViewAccess={accessableCodes?.includes('BS-ACO-1028')}
                                                //selectionAccess={accessableCodes?.includes('BS-ACO-1026')}
                                                selectionAccess={true}
                                                sequenceChangeAccess={accessableCodes?.includes('BS-ACO-1025')}
                                                selectAllAccess={accessableCodes?.includes('BS-ACO-1027')}
                                                handleSelect={handleSelect}
                                                selectedRecords={selectedRecords}
                                                pageNum={pageNum}
                                                selectAllRecords={selectAllRecords}
                                                isAction={headerActionsLoading}
                                                setUnchecked={setUnchecked}
                                                unchecked={unchecked}
                                                isRequestUnit={true}
                                                triggeredLedList={triggeredLedList}
                                                
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
                        <ConfirmationDialog
                            deleteLabel
                            handleDialogClose={handleDialogClose}
                            dialogOpen={openAssignWarning}
                            title={CONSTANTS.ASSIGNWARNING}
                            type={'warning'}
                            error={errorMessage}
                        >
                            <Grid container spacing={2} className={classes.deleteDialog} justify="center">
                                <Grid item>
                                    <CustomButton variant="outlined" color="primary" onClick={handleDialogClose}>
                                        {CONSTANTS.CANCEL}
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </ConfirmationDialog>
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
                        <CustomDialog
                            title={`Received Units`}
                            open={openTransferdialog}
                            // onClose={onCloseCommentDialog}
                            onCancelClick={() => closeTransferDialog('clickAway')}
                            onSaveClick={handleTransferData}
                            // isSave
                            // error={"errorMessage"}
                            // loading={postLoading}
                            // disabled={userGroupName?.length === 0}
                            tabIndex={1}
                            loading={headerActionsLoading}
                        >
                            {formContainer}
                        </CustomDialog>
                        {alertOpen2 && (
                            <Alert
                                open={alertOpen2}
                                message={putResponse?.status === true && `${label} updated successfully.`}
                                duration={2000}
                                onClose={() => setAlertOpen2(false)}
                                vertical={'bottom'}
                                horizontal={'center'}
                                severity="success"
                                actions={false}
                            />
                        )}

                        {openSnackbar && (
                            <Alert
                                open={openSnackbar}
                                message={snackbarMessage}
                                duration={100}
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
                        {openSnackbar && (
                            <Alert
                                open={openSnackbar}
                                message={snackbarMessage}
                                duration={500}
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

export default ReceiveUnit;
