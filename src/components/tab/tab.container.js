import MovableTabComponent from './tab.component';
import React, { useEffect, useState } from 'react';
import { getRuleType } from 'redux/actions/manage/rulePageAction';
import { useDispatch, useSelector } from 'react-redux';
import {
    bulkScanLoadingAction,
    associateBarcodeStateAction,
    clearAssociateBatchStateAction,
    clearAssociteSocketResponse,
    clearPreEncodedDataAction,
    preEncodedLocalDataAction,
    socketDeviceConnection,
    socketStartStopScan
} from 'redux/actions/socketAction';

const MovableTab = (props) => {
    const [plaseWait, setPleaseWait] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector((state) => state.ruleType);
    const { scanStatus } = useSelector((state) => state.getSocketStartStopScan);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { localPreEncode } = useSelector((state) => state.preEncodedLocalDataStore);

    const {
        tabList,
        tabPanelItem,
        tabPanelItemObj,
        page,
        socketRef,
        setData,
        associate,
        setAssociateDevice,
        tabSwitch,
        isDeviceAccess
    } = props;
    const [value, setValue] = useState(0);
    const socket = useSelector((state) => state.socketReducer.socket);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
    const [tempTabValue, setTempTabValue] = useState(0);
    const [tabsDialog, setTabsDialog] = useState(false);
    const { oneTimeScanTag } = useSelector((state) => state.getSocketScanData);
    const { local2DBarcode } = useSelector((state) => state.associateBatchState);
    const { barcoded } = useSelector((state) => state.associateBarcodeState);
    const [rfidtag, setRfidTag] = React.useState(false);
    const bulkScanLoading = useSelector((state) => state.bulkScanLoadingStore);
    const tabNumber = localStorage.getItem('TabNumber');
    const [dialogOkButtonLoader, setdialogOkButtonLoader] = useState(false);
    const handleDialogClose = () => {
        setPleaseWait(false);
        console.log('close dialog', 'newValue');
        setTabsDialog(false);
        dispatch(socketStartStopScan(false));
        setValue(tempTabValue);
        // setTempTabValue(null);
    };

    useEffect(() => {
        if (value === 0 && !tabsDialog) {
            setRfidTag(false);
        }
    }, [value]);

    const handleCancelDialog = () => {
        setTabsDialog(false);
        setValue(Number(tabNumber));
        Number(tabNumber) === 0 && setRfidTag(false);
        Number(tabNumber) === 1 && setRfidTag(true);
        setTempTabValue(Number(tabNumber));
        dispatch(socketStartStopScan(false));
    };

   

    const genericEmit = (data) => {
        console.log('========================================');
        console.log(data, 'genericEmit method in device selection');
        console.log('========================================');
        if (data) {
            socket?.emit('generic', data);
        }
    };

    const onChangeTab = (event, newValue, dialog) => {
        if (newValue === 1) {
            dispatch(preEncodedLocalDataAction([]));
            dispatch(clearPreEncodedDataAction());
            setTempTabValue(1);
        }

        if (newValue === 0) {
            tabsDialog && setRfidTag(false);
            dispatch(associateBarcodeStateAction(false));
            setTempTabValue(0);
        }

        if (bulkScanLoading) {
            dispatch(bulkScanLoadingAction(false));
        }
        if (scanStatus === false) {
            handleDialogClose();
            setdialogOkButtonLoader(false);
        }
        if (newValue === 2) {
            setTempTabValue(2);
        }

        if (parseInt(dialog) >= 0) {
            if (value === 2 && local2DBarcode?.gtinNumber && scanStatus && tabList.includes('Associate-Batch')) {
                genericEmit({
                    userName: userInfo?.data?.user?.username,
                    deviceToken: token,
                    method: 'E119',
                    payload: {
                        userName: userInfo?.data?.user?.username,
                        acknOn: 'ackStopBatchScan'
                    }
                });
                if (newValue === 0) {
                    setRfidTag(false);
                }
            } else if (value === 1 && scanStatus && localPreEncode?.length > 0) {
                if (newValue === 0) {
                    setRfidTag(false);
                }
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
            }
        } else if (value === 2 && local2DBarcode?.gtinNumber && tabList.includes('Associate-Batch')) {
            setTempTabValue(newValue);
            setTabsDialog(true);
            localStorage.setItem('TabNumber', 2);
        } else if (value === 2 && scanStatus && tabList.includes('Associate-Batch')) {
            dispatch(socketStartStopScan(false));
            setValue(newValue);
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: 'E119',
                payload: {
                    userName: userInfo?.data?.user?.username,
                    acknOn: 'ackStopBatchScan'
                }
            });
        } else if (value === 1 && localPreEncode?.length > 0 && tabList.includes('Associate-Batch')) {
            if (newValue === 0) {
                setRfidTag(false);
            }
            setTempTabValue(newValue);
            setTabsDialog(true);
            localStorage.setItem('TabNumber', 1);
        } else if (value === 1 && scanStatus) {
            dispatch(socketStartStopScan(false));
            setValue(newValue);
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
        } else if (value === 0 && barcoded && tabList.includes('Associate-Batch')) {
            setTempTabValue(newValue);
            setTabsDialog(true);
            localStorage.setItem('TabNumber', 0);
        } else {
            if (page === 'rule') {
                dispatch(getRuleType(tabPanelItem[newValue]));
            } else {
                dispatch(clearAssociteSocketResponse());
            }
            setValue(newValue);
        }
    };

    const handleSwitchTab = () => {
        setPleaseWait(true);
        onChangeTab(true, tempTabValue, tempTabValue);
        setdialogOkButtonLoader(true);
    };

    useEffect(() => {
        if (tabSwitch === 1) {
            setValue(1);
        } else if (tabSwitch === 0) {
            setValue(0);
        }
        if (page === 'return') {
            setValue(0);
        } else if (page === 'remove') {
            setValue(1);
        } else if (page === 'emergency') {
            setValue(2);
        } else if (page === 'batch') {
            setValue(3);
        }
    }, [props]);
    return (
        <MovableTabComponent
            value={page === 'rule' ? tabPanelItem.indexOf(state) : value}
            onChangeTab={tabSwitch ? onChangeTab : null}
            tabList={tabList}
            tabPanelItem={tabPanelItem}
            tabPanelItemObj={tabPanelItemObj}
            socketRef={socketRef}
            setData={setData}
            associate={associate}
            setAssociateDevice={setAssociateDevice}
            isDeviceAccess={isDeviceAccess}
            setValue={setValue}
            tempTabValue={tempTabValue}
            setTempTabValue={setTempTabValue}
            tabsDialog={tabsDialog}
            setTabsDialog={setTabsDialog}
            handleDialogClose={handleDialogClose}
            handleSwitchTab={handleSwitchTab}
            setRfidTag={setRfidTag}
            rfidtag={rfidtag}
            handleCancelDialog={handleCancelDialog}
            plaseWait={plaseWait}
            dialogOkButtonLoader={dialogOkButtonLoader}
        />
    );
};

export default MovableTab;
