import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { SelectOption } from 'components';
import { CustomButton } from 'common';
import { assignUnitDeviceAction, get8thDropdown, passingAssociateProps, socketResponse, getSettings } from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import {
    assignWriteRecipientAction,
    bulkScanLoadingAction,
    currentPcAction,
    lFConnection,
    lFDeviceMethod,
    socketAssociateBulkData,
    socketDevice,
    socketDeviceValue,
    socketDeviceConnection,
    socketDeviceToken,
    SocketScanData,
    socketStartStopScan,
    assignLocalDataAction,
    socketDeviceStatus
} from 'redux/actions/socketAction';
import { createAlert } from 'redux/actions';
import { sortDropdown } from 'common/services/compare';

const DeviceSelection = (props) => {
    console.log("props---",props)
    const { singleTag, associateBatch, setTagIds, setSocketResponseSuccess, unitScan, handleBack } = props;
    const [activeDevices, setActiveDevices] = useState([]);
    const [selectedDevicesValue, setSelectedDevicesValue] = useState('');
    const { preEncodeData } = useSelector((state) => state.getSocketScanData);
    let { assignData } = useSelector(state => state.assignDataLocalDataStore); 
    let { lisenbatchData } = useSelector((state) => state.passingAssociatePropStore);
    const { scanStatus } = useSelector((state) => state.getSocketStartStopScan);
    const { status } = useSelector((state) => state.getSocketDeviceConnection);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
   
    const { lfDevice } = useSelector((state) => state.getLFDevice);
    const { options8 } = useSelector((state) => state.get8thDropdown);
    console.log('transoptions8', options8)
    const socket = useSelector((state) => state.socketReducer.socket);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { device } = useSelector((state) => state.getSocketDevice);
    const { value } = useSelector((state) => state.getSocketDeviceValue);
    console.log('vvvvvvvvvv',device)
    // const [bulkScanLoading, setBulkScanLoading] = React.useState(false);
    const bulkScanLoading = useSelector((state) => state.bulkScanLoadingStore);
    const currentPc = useSelector((state) => state.currentPcStore);
    const { devicestatus } = useSelector((state) => state.getSocketDeviceStatus)
    console.log("devicestatusstart", devicestatus);
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    console.log('manual-----', settingsData)


    // const [currentPc, setCurrentPc] = useState(false);
    const dispatch = useDispatch();
    if (lfDevice) {
        lfDevice?.on('connected', function () {
            dispatch(lFConnection(true));
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage:
                        'Connected to Device: ' + lfDevice.getDeviceType() + ' (' + lfDevice.getSerialNumber() + ')',
                    alertType: 'success'
                })
            );
        });
    }

    const genericEmit = (data) => {
        console.log(data, 'genericEmit method in device selection');
        if (data) {
            socket?.emit('generic', data);
        }
    };

    useEffect(() => {
        dispatch(getSettings('setting'));
    }, []);

    useEffect(() => {
        dispatch(get8thDropdown('devices', undefined, 'associate' ));
    }, []);

    useEffect(() => {
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
            dispatch(passingAssociateProps([]));
            dispatch(socketDeviceConnection(false));
            dispatch(socketAssociateBulkData());
            dispatch(socketDevice(undefined));
        }
    }, []);

    useEffect(() =>
    {
      
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
                console.log('listenBatchTag', currentPc);
                if (data?.status === true && currentPc) {

                    let newdata = lisenbatchData;

                    if (data?.data.length > 0) {
                        const index = lisenbatchData.findIndex(ids => ids.rfidNumber === data?.data[0].rfidNumber);
                        if (index === -1) {
                            console.log("Batch Added");
                            newdata.push(data?.data[0]);
                        }
                        else {
                            console.log("Batch Removed")
                            newdata = newdata.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                            newdata.push(data?.data[0]);
                        }
                        //localPreEncode.push(data?.data[0]);  
                        console.log("-------lisenbatchData", Array.from(new Set(newdata)));
                        //dispatch(SocketScanData(data?.data));                 
                        dispatch(passingAssociateProps(Array.from(new Set(newdata))));
                    }

                    

                    //let tempTagid = data?.data?.map((i) => i.tagId);
                   
                    dispatch(bulkScanLoadingAction(false));
                    dispatch(socketStartStopScan(true));
                }
            });

            socket?.on('ackWriteBatchTag', (data) => {
                console.log('ackWriteBatchTag', data, 'in socket device');
                if (data.status === true && currentPc) {
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
                console.log("PreEncode ----------------------" + preEncodeData);
                if (data.status === true) {
                    //dispatch(SocketScanData(data.data));

                    let newdata = assignData;

                    if (data?.data.length > 0) {
                        const index = assignData.findIndex(ids => ids.rfidNumber === data?.data[0].rfidNumber);
                        if (index === -1) {
                            console.log("Added");
                            newdata.push(data?.data[0]);
                        }
                        else {
                            assignData = assignData.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                            newdata.push(data?.data[0]);
                        }
                        //localPreEncode.push(data?.data[0]);  
                        console.log("-------assignData", Array.from(new Set(newdata)));
                        //dispatch(SocketScanData(data?.data));                 
                        dispatch(assignLocalDataAction(Array.from(new Set(newdata))));
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

            

            socket.on('RemoveScanTag', (data) => {
                console.log('RemoveScanTag', data);
                if (data.status === true && device && data?.data.length > 0) {

                    console.log("--Remove RFID No--------------" + data?.data[0].rfidNumber);
                    assignData = assignData.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                    lisenbatchData = lisenbatchData.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                    //dispatch(SocketScanData(data?.data));
                    console.log("--New Assign data--------------" + JSON.stringify(assignData));
                    console.log("--New batch data--------------" + JSON.stringify(lisenbatchData));
                    dispatch(assignLocalDataAction(Array.from(assignData)));
                    dispatch(passingAssociateProps(Array.from(new Set(lisenbatchData))));
                }
            });

            //ackWriteRecipient assign unit

            socket?.on('ackWriteRecipient', (data) => {
                console.log('ackWriteRecipient',data);
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
                    dispatch(passingAssociateProps([]));
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

        socket?.on('deviceStatus', (data) => {
            console.log("dev---", data)
            dispatch(socketDeviceStatus(data));
            console.log('appdata---', data)
            console.log("devicests", data?.deviceStatus)

        });
        // }
    }, [socket, currentPc, preEncodeData]);

   
    useEffect(() => {

        console.log("--------------")
        if (options8 && settingsData?.general?.deviceType === 'Manual') {
          
            const active = options8?.data?.filter((item) => item);
            const sortedData = sortDropdown(active, 'name');
            setActiveDevices(sortedData);

            console.log(sortedData.length);
            // setActiveDevices(active) --- device dropdown was not sorted
            console.log(sortedData.length + " Active Devices -------------")
            if (window.location.pathname === '/dashboard/barcode-entry/movein' || window.location.pathname === '/dashboard/barcode-entry/moveout') {
                //  dispatch(socketDevice(""))
            }
            else {
                dispatch(socketDevice(sortedData.length > 0 ? sortedData[0].name : ""))
            }
            setSelectedDevicesValue(sortedData[0]);
            dispatch(socketDeviceToken(sortedData?.[0]?.token));
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: sortedData[0]?.token,
                method: 'E111',
                payload: {
                    userName: userInfo.data.user.username,
                    message: 'connected'
                }
            });
        }
        else if (options8) {
            const active = options8?.data?.filter((item) => item?.status == 1);
            const sortedData = sortDropdown(active, 'name');
            setActiveDevices(sortedData);

            console.log(sortedData.length);
            // setActiveDevices(active) --- device dropdown was not sorted
            console.log(sortedData.length + " Active Devices -------------")
            if (window.location.pathname === '/dashboard/barcode-entry/movein' || window.location.pathname === '/dashboard/barcode-entry/moveout' ) {
              //  dispatch(socketDevice(""))
            }
            else {
                 dispatch(socketDevice(sortedData.length > 0 ? sortedData[0].name : ""))
            }
            setSelectedDevicesValue(sortedData[0]);
            dispatch(socketDeviceToken(sortedData?.[0]?.token));
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: sortedData[0]?.token,
                method: 'E111',
                payload: {
                    userName: userInfo.data.user.username,
                    message: 'connected'
                }
            });
        }
    }, [options8]);

    useEffect(() => {
        if (unitScan || associateBatch) {
            dispatch(socketDevice(''));
        }
        return () => {
            dispatch(socketDevice('')); 
        };
    }, [unitScan, associateBatch]);

    // useEffect(() => {}, [device, status]);

    const handleDeviceChange = (e) => {
        console.log('eeee',e)
        dispatch(socketDevice(e?.target?.value));
        dispatch(socketDeviceConnection(false));
        dispatch(socketStartStopScan(false));
        dispatch(SocketScanData([]));
        dispatch(assignLocalDataAction([]));
        let selectedVal = activeDevices.filter((item) => item.name === e.target.value);
        console.log('selectedvalll', selectedVal )
        if (selectedVal[0]?.deviceTypeId?.[0]?.name.includes('SBLF')) {
            dispatch(lFDeviceMethod(selectedVal[0]?.ipAddress));
        }
        setSelectedDevicesValue(selectedVal[0]);
        dispatch(socketDeviceValue(selectedVal[0]))
        dispatch(socketDeviceToken(selectedVal?.[0]?.token));
        genericEmit({
            userName: userInfo?.data?.user?.username,
            deviceToken: selectedVal[0]?.token,
            method: 'E111',
            payload: {
                userName: userInfo.data.user.username,
                message: 'connected'
            }
        });
    };

    const startScanStop = (e) => {
        // setCurrentPc(true)
        dispatch(currentPcAction(true));
        if (unitScan && e?.target.textContent === 'Start') {
            // setBulkScanLoading(true);
            console.log("Unit Scan Start")
            dispatch(bulkScanLoadingAction(true));
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: 'E111',
                payload: {
                    userName: userInfo.data.user.username,
                    method: 'E111',
                    acknOn: 'ackStartScan',
                    type: 'Assign'
                }
            });
        }
        if (associateBatch && e?.target.textContent === 'Start') {
            console.log("Batch Scan Start")
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
        } else if (associateBatch && e?.target.textContent === 'Stop') {
           console.log("Batch Scan Stop")
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: 'E119',
                payload: {
                    userName: userInfo?.data?.user?.username,
                    acknOn: 'ackStopBatchScan'
                }
            });
            dispatch(passingAssociateProps([]));
            dispatch(assignLocalDataAction([]));

        } else {
            if (bulkScanLoading) {
                // setBulkScanLoading(false);
                dispatch(bulkScanLoadingAction(false));
            }
            if (lfDevice) {
                lfDevice?.connect();
                if (lfDevice?.isInitialized()) {
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
                            acknOn: 'ackStartScan'
                        }
                    });
                    // setBulkScanLoading(true);
                    dispatch(bulkScanLoadingAction(true));
                }
                if (scanStatus && e?.target.textContent === 'Stop') {

                    console.log("--------------------------Stop------------------");
                   
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
                    dispatch(passingAssociateProps([]));
                    dispatch(socketAssociateBulkData());
                    dispatch(assignLocalDataAction([]));
                }
            }
        }
    };

    const handleOptions = () => {
        if (options8 && settingsData?.general?.deviceType === 'Manual') {
            dispatch(get8thDropdown('devices',));
        } else {
            dispatch(get8thDropdown('devices', undefined, 'associate'));
        }
    };

    return (
        <Grid item>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <SelectOption
                        label="Select Device"
                        onChange={handleDeviceChange}
                        value={device}
                        minWidth={250}
                        disabledLabel={true}
                        options={window.location.pathname === '/dashboard/barcode-entry/movein' ? activeDevices.filter((dev) => dev.name !== "Associate Device") : activeDevices}
                        onOpen={handleOptions}
                        placeHolder={'Select Device'}
                    />
                </Grid>
                {singleTag ? null : (
                    <Grid item>
                        <CustomButton
                            variant={'contained'}
                            disabled={!status || devicestatus?.deviceStatus === "DISCONNECTED:1" ? true :false }
                            color="primary"
                            width="100px"
                            onClick={startScanStop}
                        >
                            {bulkScanLoading && device !== '' ? (
                                <CircularProgress style={{ color: 'white' }} size={15} />
                            ) : scanStatus || devicestatus?.deviceStatus === "DISCONNECTED:1"  ? (
                                'Stop'
                            ) : (
                                'Start'
                            )}
                        </CustomButton>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default DeviceSelection;
