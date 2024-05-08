import { Grid, IconButton, Tooltip } from '@material-ui/core';
import React from 'react';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { oneTimeScanAction, oneTimeScanERROR } from 'redux/actions/socketAction';
import { useStyles } from './style';
import { createAlert } from 'redux/actions';

const TagIdReader = ({ value, isAssign, setAlert, setSeverity, setAlertMessage, focusUnit }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { lfDevice } = useSelector((state) => state.getLFDevice);
    const socket = useSelector((state) => state.socketReducer.socket);
    const associateDevice = useSelector((state) => state.getSocketDeviceConnection);
    const [tagIdLoading, setTagIdLoading] = useState(false);
    const { status } = useSelector((state) => state.getSocketDeviceConnection);
    const { lfDeviceStatus } = useSelector((state) => state.getLFConnectionStatus);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
    const { userInfo } = useSelector((state) => state.userLogin);

    let scanCount = 0;
    let tagList = [];

    React.useEffect(() => {
        // lfDevice.on('scanstarted', function () {
        //     setStatus('Scanning');
        //     setScanning(true);

        //     console.log('Scan started.');
        // });

        if (lfDevice) {
            lfDevice?.on('scancompleted', function () {

                console.log("scancompleted")
                lfDevice?.getLastInventory(function () {
                    // the inventory (resulting from the scan) is ready
                    // console.log('Scan completed');
                    setTagIdLoading(false);
                    if (tagList.length > 1) {
                        dispatch(oneTimeScanERROR());
                        // console.log('Scan 34');
                        // setAlertMessage('Multiple  Tags Detected');
                        // setAlert(true);
                        // setSeverity(false);
                    } else {
                        dispatch(oneTimeScanAction(tagList[0]));
                        // console.log('Scan');
                    }
                    // console.log(tagList);
                });
            });
            lfDevice?.on('tagadded', function (tagUid) {
                if (tagUid) {
                    scanCount++;
                    //AddItems(list, tag,tag)
                }
                tagList[scanCount - 1] = tagUid;
                // setTotalCount(count);
                // console.log('Tag scanned: ' + tagUid);
                // dispatch(lfScanData({ rfidNumber: tagUid }));
            });
            // function stopRf() {
            //     if (scanning) {
            //         lfDevice.stopScan();
            //     }
            // }
        }
        socket?.on('oneTimeScan', (data) => {
            console.log("oneTimeScan --- "+data);
            setTagIdLoading(false);

            if (data.status) {
                console.log("oneTimeScan --- " + "Success");
                dispatch(oneTimeScanAction(data.data[0]?.rfidNumber));
            } else {
                //dispatch(oneTimeScanERROR());
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: data.message,
                        alertType: 'error'
                    })
                );              
               
            }
        });
    }, [lfDevice]);
    const oneTimeScan = () => {
        if (lfDevice) {
            setTagIdLoading(true);
            lfDevice?.connect();
            if (lfDevice?.isInitialized()) {
                lfDevice?.requestScan();
            }
        } else if (associateDevice.status) {
            setTagIdLoading(true);
            // console.log('triggered');
            socket.emit('generic', {
                method: 'E114',
                deviceToken: token,
                payload: {
                    status: true,
                    userName: userInfo.data.user.username,
                    message: 'onTimeSessionScan'
                }
            });
            setTimeout(() => {
                setTagIdLoading(false);
            }, 10000);
        }
        focusUnit();
    };
    return (
        <Grid item>
            <IconButton
                style={{ marginTop: '10px', marginLeft: isAssign ? '0px' : '10px' }}
                onClick={oneTimeScan}
                //disabled={lfDeviceStatus ? !lfDeviceStatus : !status || tagIdLoading || value}
            >
                <Tooltip title="Scan Tag Id">
                    <WifiTetheringIcon
                        className={tagIdLoading && classes.rotate}
                        color={status || value ? 'primary' : 'disabled'}
                    />
                </Tooltip>
            </IconButton>
        </Grid>
    );
};

export default TagIdReader;
