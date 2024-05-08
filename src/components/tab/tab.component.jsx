import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { useStyles, tabStyle } from './tab.style';
import { CircularProgress, IconButton, Paper, Tooltip, DialogContent, DialogContentText, Dialog, DialogTitle, } from '@material-ui/core';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import CONSTANTS from 'common/constants';
import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import SpaceCode from '../../common/sdk/spacecode';
import CloseIcon from "@material-ui/icons/Close";
import {
    bulkScanLoadingAction,
    clearPreEncodedDataAction,
    currentPcAction,
    lFConnection,
    lFDeviceMethod,
    preEncodedLocalDataAction,
    socketAction,
    socketAssociateBulkData,
    socketDevice,
    socketDeviceSerialnumber,
    socketDeviceStatus,
    socketDeviceConnection,
    socketDeviceToken,
    socketStartStopScan,
    assignLocalDataAction,
} from '../../redux/actions/socketAction';
import { get8thDropdown } from 'redux/actions/manage/manageFieldsAction';
import SelectOption from 'components/select';
import { Alert, CustomButton } from 'common';

import { oneTimeScanAction, oneTimeScanERROR } from 'redux/actions/socketAction';
import { getLFDevice } from 'redux/reducers/socketReducer';
import DeviceSelection from 'components/socketDeviceSelection/socketDeviceSelection';
import { createAlert, passingAssociateProps, socketResponse, getSettings, } from 'redux/actions';
import ConfirmationDialog from 'components/confirmations/confirmation.container';
import { preEncodeData } from '../../pages/assign/assign-page/DummyData';

const LIVE_URL = window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2];

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

const MovableTabComponent = (props) => {
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
        handleDialogClose,
        handleSwitchTab,
        setRfidTag,
        rfidtag,
        handleCancelDialog,
        pleaseWait,
        dialogOkButtonLoader
    } = props;
    //tabList => Item which display on tab bar it should be array
    //tabPanelItem => pass as a prop name of component in array
    //tabPanelItemObj => pass component as a object
    //if any doudt please check add unit page
    const { localPreEncode } = useSelector((state) => state.preEncodedLocalDataStore);
    const { local2DBarcode } = useSelector((state) => state.associateBatchState);

    // const [flipped, setFlipped] = React.useState(false);
    const [socketTrue, setSocketTrue] = React.useState(false);
    const [socketMethods, setSocketMethods] = React.useState();
    const [lFIPAddress, setLFIPAddress] = React.useState('');
    const classes = useStyles();
    const dispatch = useDispatch();
    const socket = useSelector((state) => state.socketReducer.socket);
    const [socketAccess, setSocketAccess] = React.useState(false);
    const { userAccessData, userAccessLoading } = useSelector((state) => state.getUserAccess);
    let { lisenbatchData } = useSelector((state) => state.passingAssociatePropStore);
    const { options8, options8loading } = useSelector((state) => state.get8thDropdown);
    console.log("options8", options8);
    const [activeDevices, setActiveDevices] = React.useState([]);
    const [selectedDevicesValue, setSelectedDevicesValue] = React.useState();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { device } = useSelector((state) => state.getSocketDevice);
    console.log("device---", device);
    const { serial } = useSelector((state) => state.getSocketDeviceSerialnumber);
    console.log("serial", serial)
    const { devicestatus } = useSelector((state) => state.getSocketDeviceStatus)
    console.log("socketdevice", devicestatus);
    const [alert, setAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [tagLoading, setTagLoading] = React.useState(false);
    const [severity, setSeverity] = React.useState(false);
    // const [bulkScanLoading, setBulkScanLoading] = React.useState(false);
    const { scanStatus } = useSelector((state) => state.getSocketStartStopScan);
    console.log("scan-------", scanStatus);
    const { status } = useSelector((state) => state.getSocketDeviceConnection);
    console.log("sts---", status);

    const data = useSelector((state) => state.getSocketDeviceConnection);
    console.log("sts---", data);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
    const { oneTimeScanTag } = useSelector((state) => state.getSocketScanData);
    const { lfDeviceStatus } = useSelector((state) => state.getLFConnectionStatus);
    const [lfDeviceRequest, setLfDeviceRequest] = React.useState(false);
    const { lfDevice } = useSelector((state) => state.getLFDevice);
    console.log("lfDevice",lfDevice)
    const [show, setShow] = React.useState(true);
    const [showAssociate, setShowAssociate] = React.useState(true);
    const currentPc = useSelector((state) => state.currentPcStore);
    const bulkScanLoading = useSelector((state) => state.bulkScanLoadingStore);
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    console.log('manual-----', settingsData)


    useEffect(() => {
        dispatch(getSettings('setting'));
    }, []);


    const tokenRef = useRef();
    tokenRef.current = token;
    const [connected, setConnected] = React.useState(false);

    const handleAlert = () => {
        setAlert(false);
        setAlertMessage('');
    };

  
    useEffect(() => {
        let filters = JSON.stringify([{ key: 'userId._id', value: userInfo?.data?.user?._id }]);
        dispatch(getSettings('setting', filters));
    }, [])

    useEffect(() => {
        if (settingsData?.general?.deviceType === 'Manual') {
            dispatch(get8thDropdown('devices', undefined,));
        }
        else {
            dispatch(get8thDropdown('devices', undefined, ));
        }
    }, []);

    const genericEmit = (data) => {
        console.log('========================================');
        console.log('generic ', JSON.stringify(data));
        console.log('========================================');
        if (data && data.deviceToken) {
            socket?.emit('generic', data);
        }
    };

    // console.log(currentPc, 'currentPc');

    React.useEffect(() => {
        if (scanStatus) {
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: 'E119',
                payload: {
                    userName: userInfo?.data?.user?.username,
                    acknOn: 'ackStopBatchScan'
                }
            });
            dispatch(socketDeviceConnection(false));
            dispatch(socketAssociateBulkData());
            dispatch(socketDevice(undefined));
        }
    }, []);

    React.useEffect(() => {
        if (userAccessData) {
            userAccessData?.data[0]?.moduleId?.map((item) => {
                if (item.code === 'BS-MO-1007') {
                    setSocketAccess(true);
                }
            });
        }
    }, [userAccessData]);
    //React.useEffect(() => {
    //    if (options8) {


    //        const serialNumber = options8?.data?.filter((item) => item.status == 1);
    //        console.log("item", options8?.data)
    //        setActiveDevices(serialNumber);
    //        dispatch(socketDeviceSerialnumber(serialNumber?.[0]?.serialNumber))
    //        console.log("ser---", serialNumber?.[0]?.serialNumber)
    //    }
    //},[options8])
    React.useEffect(() => {
        if (options8 && settingsData?.general?.deviceType === 'Manual') {
            const active = options8?.data?.filter((item) => item);
            setActiveDevices(active);
            console.log('acttttt', active)
            dispatch(socketDevice(active?.length > 0 ? active[0].name : ""))
            setSelectedDevicesValue(active?.[0]);
            dispatch(socketDeviceToken(active?.[0]?.token));

            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: active?.[0]?.token,
                method: 'E111',
                payload: {
                    userName: userInfo.data.user.username,
                    message: 'connected'
                }
            });
        }
       else if (options8) {
            console.log("--------------- Load Devices")

            const active = options8?.data?.filter((item) => item.status == 1);
            setActiveDevices(active);
            console.log('acttttt', active)
            dispatch(socketDevice(active?.length > 0 ? active[0].name : ""))
            setSelectedDevicesValue(active?.[0]);
            dispatch(socketDeviceToken(active?.[0]?.token));
           
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: active?.[0]?.token,
                method: 'E111',
                payload: { 
                    userName: userInfo.data.user.username,
                    message: 'connected'
                }
            });
        }
    }, [options8]);

    const handleDeviceChange = (e) => {
        //
        console.log("Device Change")

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

    /*const [alertPopupOpen, setAlertPopupOpen] = useState(false);
    console.log("alertPopupOpen---", alertPopupOpen)

    const handleClose = () => {
        setAlertPopupOpen(false)
    }*/


    useEffect(() => {
        if (socket) {
           /* genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: 'E135',
                payload: {
                    serial: serial,
                    deviceStatus: devicestatus === 1 ? 'CONNECTED' : "DISCONNECTED",
                }
            });
            console.log("genericserial--", genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: 'E135',
                payload: {
                    serial: serial,
                    deviceStatus: devicestatus === 1 ? 'CONNECTED' : "DISCONNECTED",
                }
            }))*/

           /* socket.on('deviceStatus', (data) => {
                console.log("dev---", data)
                dispatch(socketDeviceStatus(data?.deviceStatus));
                console.log("devicests", data?.deviceStatus)
                if (data?.deviceStatus === "CONNECTED") {
                    setAlertPopupOpen(false);
                } else if (data?.deviceStatus === "DISCONNECTED" ) {
                    setAlertPopupOpen(true)
                }
                else if (data?.deviceStatus === "REBOOT") {
                    setAlertPopupOpen(true)
                }
            });*/
        }
      
    }, []);

    React.useEffect(() => {
        dispatch(bulkScanLoadingAction(false));
        setTagLoading(false);
    }, [rfidtag]);

    const handleSocketAlert = (severity, message) => {
        setSeverity(severity);
        setAlert(true);
        setAlertMessage(message);
    };
    if (lfDevice) {
        lfDevice?.on('connected', function () {
            dispatch(lFConnection(true));
            handleSocketAlert(
                true,
                'Connected to Device: ' + lfDevice.getDeviceType() + ' (' + lfDevice.getSerialNumber() + ')'
            );
        });
    }

  


    React.useEffect(() => {
        if (!device) { 
        console.log(" get8thDropdown ------------------------")
        //dispatch(get8thDropdown('devices', undefined, 'associate'));
        console.log(options8+"-------------" + activeDevices);
           
                if (options8 && settingsData?.general?.deviceType === 'Manual') {
                    const active = options8.data.filter((item) => item);
                    setActiveDevices(active);
                    console.log('acttttt', activeDevices)
                }
               else if (options8) {
                    const active = options8.data.filter((item) => item.status == 1);
                    setActiveDevices(active);
                    console.log('elseacttttt', activeDevices)
                }
            console.log("Active  Devices -------------" + activeDevices);
        
        } 
    }, [options8]);


    React.useEffect(() => {
        if (socket) {
            socket.on('ackStartScan', (data) => {
                if (data.status === true) {
                    handleSocketAlert(true, data.message);
                    dispatch(socketStartStopScan(true));
                    dispatch(bulkScanLoadingAction(false));
                }
            });

            socket.on('ackStopScan', (data) => {
                if (data.status) {
                    handleSocketAlert(true, data.message);
                    dispatch(socketStartStopScan(false));
                    if (tabsDialog) {
                        handleDialogClose();
                    }
                }
            });

            socket.on('userConnected', (data) => {
                console.log('userConnected', data);
                if (data.status === true) {
                    handleSocketAlert(true, data.message);
                    dispatch(socketDeviceConnection(true));
                    if (data.deviceStatus === "DS_InScan")
                    {
                        //dispatch(socketStartStopScan(true));
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
                    /*else if (data.deviceStatus === "DS_Ready") { 
                        
                    }*/
                    // Autoscan functionality added
                   /* genericEmit({
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

            socket?.on('ackStartBatchScan', (data) => {
                if (data.status === true) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'success'
                        })
                    );
                    dispatch(bulkScanLoadingAction(false));
                    dispatch(socketStartStopScan(true));
                }
            });

            /*socket?.on('ListenBatchTag', (data) => {
                console.log(data, 'listenBatchtag');
                if (data?.status === true) {
                    let tempTagid = data?.data?.map((i) => i.tagId);
                    dispatch(passingAssociateProps(tempTagid));
                    dispatch(bulkScanLoadingAction(false));
                    dispatch(socketStartStopScan(true));
                }
            });*/

            socket?.on('ListenBatchTag', (data) => {
                console.log('listenBatchTag', data);

                if (data?.status === true) {

                    //let newdata = lisenbatchData;

                    if (data?.data.length > 0) {
                        let index = lisenbatchData.findIndex(ids => ids.rfidNumber === data?.data[0].rfidNumber);
                        if (index === -1) {
                            console.log("Batch Added");
                            lisenbatchData.push(data?.data[0]);
                        }
                        else {
                            console.log("Batch Removed")
                            lisenbatchData = lisenbatchData.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                            lisenbatchData.push(data?.data[0]);
                        }
                        //localPreEncode.push(data?.data[0]);  
                        console.log("-------lisenbatchData", Array.from(new Set(lisenbatchData)));
                        //dispatch(SocketScanData(data?.data));                 
                        dispatch(passingAssociateProps(Array.from(new Set(lisenbatchData))));
                    }
                    dispatch(bulkScanLoadingAction(false));
                    dispatch(socketStartStopScan(true));
                }
            });

            socket.on('RemoveScanTag', (data) => {
                console.log('RemoveBatchScanTag----', data);

                if (data.status === true && data?.data.length > 0) {
                    //if (tagsFromDeviceSelection?.lisenbatchData?.length > 0) {
                    console.log(lisenbatchData);
                    lisenbatchData = lisenbatchData.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber && item.rfidNumber !== '');
                    console.log("Remove Tag" + lisenbatchData.length)
                    //lisenbatchData = taglist;
                    // tagsFromDeviceSelection = taglist;
                    //setTagIdList(lisenbatchData);
                    dispatch(passingAssociateProps(lisenbatchData));
                    /* if (!scanStatus) {
                         dispatch(socketStartStopScan(true));
                     }*/
                    //}
                }
            });

            socket?.on('ackWriteBatchTag', (data) => {
                console.log('ackWriteBatchTag', data, 'in tab');
                if (data.status === true) {
                    dispatch(socketResponse({ write: true, data }));
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'success'
                        })
                    );
                    dispatch(currentPcAction(false));
                }
            });
            socket?.on('ackStopBatchScan', (data) => {
                console.log("ackStopBatchScan",data)
                if (data.status) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'success'
                        })
                    );
                    if (tabsDialog) {
                        handleDialogClose();
                    }
                    lisenbatchData = [];
                    dispatch(passingAssociateProps([]));
                    dispatch(socketStartStopScan(false));
                }
            });

            socket?.on('deviceStatus', (data) => {
                console.log("dev---", data)
                dispatch(socketDeviceStatus(data));
                console.log('appdata---', data)
                console.log("devicests", data?.deviceStatus)

            });
        }
    }, [socket, tempTabValue, tabsDialog]);

    //React.useEffect(() => {
    //    socket?.on('oneTimeScan', (data) => {
    //        console.log("One Time Scan Tab Component")
    //        setTagLoading(false);
    //        if (data.status) {
    //            dispatch(oneTimeScanAction(data.data[0]?.rfidNumber));
    //        } else {
    //            dispatch(oneTimeScanERROR());
    //            handleSocketAlert(false, data.message);
    //        }
    //    });
    //}, [oneTimeScanTag]);

    React.useEffect(() => {
        if (lfDevice) {
            if (!lfDevice.isConnected()) {
                lfDevice.connect();
            }
        }
    }, [lfDevice]);


    React.useEffect(() =>
    {
        console.log("-- Before lisenbatchData --" + lisenbatchData.length);
        if (lisenbatchData.length == 0) {
            lisenbatchData = []
        }
        console.log("-- After lisenbatchData --" + lisenbatchData.length);
    }, [lisenbatchData]);
    

    const startScanStop = (e) => {
        console.log('clicked', e?.target?.textContent);
        if (tabPanelItem[value] === 'AssociateBatch') {
            if (e?.target.textContent === 'Start') {
                dispatch(currentPcAction(true));
                dispatch(bulkScanLoadingAction(true));
                genericEmit({
                    userName: userInfo?.data?.user?.username,                                              
                    deviceToken: token,
                    method: 'E117',
                    payload: {
                        userName: userInfo?.data?.user?.username,
                        acknOn: 'ackStartBatchScan'
                    }
                });
            } else if (e?.target.textContent === 'Stop') {
                dispatch(currentPcAction(false));
                //
                console.log(" Local data Length " + preEncodeData.length);

                let data = [];
                dispatch(preEncodedLocalDataAction(data));
                console.log(" Local data Length "+preEncodeData.length);
                genericEmit({
                    userName: userInfo?.data?.user?.username,
                    deviceToken: token,
                    method: 'E119',
                    payload: {
                        userName: userInfo?.data?.user?.username,
                        acknOn: 'ackStopBatchScan'
                    }
                });
            }
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
                    console.log(" Local data Length " + preEncodeData.length);

                    dispatch(preEncodedLocalDataAction(data));
                    console.log(" Local data Length " + preEncodeData.length);

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

    const classesTab = tabStyle();

    const handleEmptyDevices = () => {
        if (activeDevices?.length === 0) {
            console.log("activedevices--", activeDevices)
            dispatch(get8thDropdown('devices', undefined, 'associate'));
        }
    };

    return (
        <>
            <Grid>
            {!userAccessLoading && (
                <div className={classes.root} style={{ backgroundColor: 'transparent' }}>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <Tabs
                                value={value}
                                onChange={onChangeTab}
                                aria-label="scrollable auto tabs example"
                                variant="scrollable"
                                scrollButtons="auto"
                                // stickyheader
                            >
                                {tabList &&
                                    tabList.map((item, index) => {
                                        return (
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
                                                className={value === index ? classesTab.tab1 : classesTab.tab2}
                                            />
                                        );
                                    })}
                            </Tabs>
                        </Grid>
                        {associate && show ? (
                            <>
                                <Grid item>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <SelectOption
                                                label="Select Device"
                                                onChange={handleDeviceChange}
                                                value={device}
                                                minWidth={250}
                                                noLabel={true}
                                                options={activeDevices}
                                                placeHolder="Select Device"
                                                onOpen={handleEmptyDevices}
                                                loading={options8loading}
                                            />
                                        </Grid>
                                        <Grid item>
                                            {rfidtag && (
                                                <CustomButton
                                                    variant={tagLoading || bulkScanLoading ? 'outlined' : 'contained'}
                                                    color="primary"
                                                    width="100px"
                                                    onClick={startScanStop}
                                                        disabled={!status || devicestatus?.deviceStatus === "DISCONNECTED:1"}
                                                >
                                                    {bulkScanLoading && device ? (
                                                        <CircularProgress size={15} />
                                                        ) : scanStatus && device  ?  (
                                                        'Stop'
                                                    ) : (
                                                        'Start'
                                                    )}
                                                </CustomButton>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            associate && (
                                <>
                                    <DeviceSelection
                                        // setTagIds={setTagIds}
                                        associateBatch={true}
                                        // setDialogOpen={setDialogOpen}
                                        // setSocketResponseSuccess={socketRes}
                                    />
                                </>
                            )
                        )}
                    </Grid>
                    {alert && (
                        <Alert
                            open={alert}
                            message={alertMessage}
                            duration={2000}
                            onClose={handleAlert} 
                            vertical={'bottom'}
                            horizontal={'center'}
                            severity={severity ? 'success' : 'error'}
                            actions={false}
                        />
                    )}

                    {tabPanelItem.map((item, index) => {
                        return item === 'ReturnUnits' || item === 'EmergencyUnits' ? (
                            <div
                                key={index}
                                elevation={0}
                                style={{
                                    borderRadius: '0.3%',
                                    width: 'inherit'
                                }}
                            >
                                <TabPanel index={index} value={value}>
                                    <List dense={false}>
                                        <Grid container direction="row" justify="space-between" alignItems="center">
                                            {tabPanelItemObj[item]}
                                        </Grid>
                                    </List>
                                </TabPanel>
                            </div>
                        ) : (
                            <>
                                <Paper
                                    key={index}
                                    elevation={0}
                                    style={{
                                        borderRadius: '0.3%',
                                        width: 'inherit'
                                    }}
                                >
                                    <TabPanel index={index} value={value}>
                                        <List dense={false}>
                                            <Grid container direction="row" justify="space-between" alignItems="center">
                                                {tabPanelItemObj[item]}
                                            </Grid>
                                        </List>
                                    </TabPanel>
                                </Paper>
                                <ConfirmationDialog
                                    handleDialogClose={handleDialogClose}
                                    dialogOpen={tabsDialog}
                                    title={'Are You Sure'}
                                    type={'warning'}
                                >
                                    <Grid>
                                        <Grid item>
                                            <Typography>
                                                Device Scan will be stopped and you will loose current filled data
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row-reverse',
                                                marginTop: 30,
                                                justifyContent: 'space-around'
                                            }}
                                        >
                                            <CustomButton variant="contained" color="primary" onClick={handleSwitchTab}>
                                                {/* {pleaseWait ? 'Please wait...' : CONSTANTS.OK} */}
                                                {dialogOkButtonLoader ? (
                                                    <CircularProgress color="white" size="20px" />
                                                ) : (
                                                    CONSTANTS.OK
                                                )}
                                            </CustomButton>
                                            <CustomButton
                                                variant="outlined"
                                                color="primary"
                                                onClick={handleCancelDialog}
                                            >
                                                {CONSTANTS.CANCEL}
                                            </CustomButton>
                                        </Grid>
                                    </Grid>
                                </ConfirmationDialog>
                            </>
                        );
                    })}
                </div>
            )}
            </Grid>
           
        </>
    );
};

export default MovableTabComponent;
