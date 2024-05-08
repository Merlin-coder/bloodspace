
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ManulaDevice from '../../../assets/manualDevice.png';
import {
    Grid,
    Typography,
} from '@material-ui/core';
//import { useStyles } from './RemoteLoginStyle';
import { useLoginPageStyles } from '../remotelogin/login-page.style';
import { CustomButton } from 'common';
import { useHistory } from 'react-router-dom';
import DeviceLogin from '../../../pages/remoteFridge/deviceLogin';
import { createAlert, remoteDBAccessDeviceAction, deviceAccessDetails } from 'redux/actions';
import Socket from '../../../Socket';
import { clearDeviceLoginState, remoteLogin } from 'redux/actions/auth/authActions';
import { getDrawer, getLicense } from 'redux/actions/settings/drawerActions';
import { getUserAccessDrawerCodes } from 'redux/actions/userAccessRoutingActions';
import { getDeviceStatus } from 'redux/actions/scGenericApiCalls';
import CONSTANTS from '../../../common/constants';
import axios from 'axios';
import {
    settingsRemoteLoginPageAction
} from 'redux/actions/socketAction';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { CancelOutlined } from '@material-ui/icons';
const RemoteLoginPage = () => {
    const classes = useLoginPageStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    let remoteInfo = JSON.parse(localStorage.getItem('remoteInfo'));
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { isLoggedInDevice } = useSelector((state) => state.isDeviceLoggedIn);
    const [deviceLoginn, setDeviceLogin] = React.useState(false);
    const handleBadgeAccess = () => {
        dispatch(remoteLogin(undefined, undefined, accessDetails?.accessBadge, accessDetails?.serialNumber));
        console.log("accessdetails", accessDetails);
    };
    const [accessDetails, setAccessDetails] = useState({});
    let { remotesettingsData } = useSelector((state) => state.settingsRemoteLoginPageStore);
    const socket = useSelector((state) => state.socketReducer.socket);
    const userLogin = useSelector((state) => state.userLogin);
    const { otpLoading, getOtpSuccess, getOtpError } = useSelector((state) => state.otpRequest);

    const { drawerResponse, drawerError } = useSelector((state) => state.getDrawer);
    const { loading, error, userInfo } = userLogin;

    const [otp, setOtp] = useState('');

    const { responseData } = useSelector((state) => state.getData);
    console.log("res--", responseData.data)
    const { deviceStatus } = useSelector((state) => state.getDeviceStatus)

    console.log("devicestatus", deviceStatus);

    useEffect(() => {

       
        socket?.on('accessOnDevices', (data) => {
            console.log("remoteInfo---  " + remoteInfo)
            console.log('My Socket >> accessOnDevices ', data);
            dispatch(deviceAccessDetails(data));
            dispatch(remoteLogin(undefined, undefined, data?.accessBadge, remoteInfo.serialNumber));
            setAccessDetails(data);
        });
    }, [socket]);


    useEffect(() => {
        console.log("UserInfo" + JSON.stringify(userInfo));
        let manageAccessCodes =
            userInfo?.data?.userAccess?.filter((item) => item?.isVisible === 1)?.map((item) => item?.['drawer-code']) ||
            [];
        let obj = drawerResponse?.data?.filter((item) => manageAccessCodes?.some((x) => x === item.code));
        let arrayOfPaths = obj?.filter((item) => item?.path).map((item) => item.path);

        if (userInfo?.data?.status) {
            console.log('initial drawer api call and get license call');
            dispatch(getLicense());
            dispatch(getDrawer(userInfo?.data?.user?.['useraccessrole-code']));
            dispatch(getUserAccessDrawerCodes([]));
            userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1008'
                ? history.push('/dashboard/remote-dashboard')
                : Array.isArray(arrayOfPaths) &&
                arrayOfPaths?.length &&
                history.push(arrayOfPaths[arrayOfPaths?.length - 1]);

            if (isLoggedInDevice) {
                if (remoteInfo.serialNumber === accessDetails?.serialNumber) {
                    history.push('/dashboard/access-device');
                }
            }
        }
    }, [userInfo, error, isLoggedInDevice]);

    React.useEffect(() => {
        console.log("Is Logged In Event", isLoggedInDevice)
       /* if (isLoggedInDevice) {
            if (remoteInfo.serialNumber === accessDetails?.serialNumber) {
                history.push('/dashboard/access-device');
            }
        }*/
    }, [isLoggedInDevice]);

    //const [serial, setSerial] = useState('')
    //console.log("ser---",serial)
   
   
   //let sts = responseData?.data?.map((obj)=>obj.status)
   // console.log("st---", sts)
    

   React.useEffect(() => {
       
       let ser = remoteInfo.serialNumber
     
       dispatch(getDeviceStatus(ser));
    }, []);
  


    return (
                <Grid item className={classes.sideBar}>
            <Grid
                container  
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: '20px', marginBottom: '20px' }}    
                spacing={4}    
                direction="column"  
            >        
                <Grid item>
                    <Typography variant="h3" className={classes.tipsTypo}>
                        Automatic Access
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5" className={classes.tipsTypoSmall}>
                        Present ID badge to access device automatically.
                    </Typography>
                </Grid>
                <Grid item>
                    <img src={ManulaDevice} style={{ width: 180, marginTop: 10 }} />
                </Grid>
                {/*<Grid item>*/}
                {/*    <CustomButton*/}
                {/*        variant="contained"*/}
                {/*        color="primary"*/} 
                {/*        onClick={() => handleBadgeAccess(true)}*/}
                {/*    >*/}
                {/*        Access Device*/}
                {/*    </CustomButton>*/}
                {/*</Grid>*/}
                {/*<Typography variant="h5" color="primary">
                    Access Device
                </Typography>*/}
                
                    {
                    deviceStatus?.data?.status === 1 || deviceStatus?.data?.status === "1" ?
                        <Grid style={{ display: 'flex', alignItems: 'center'  }}>
                            <CheckCircleOutlineIcon
                                style={{
                                    color: 'green',
                                    width: '3em',
                                    height: '3em'
                                }}
                            />
                        <Typography style={{ color: '#218c74', fontSize: '39px' }} variant="h5" color="green" width= '60px'>
                                Device is Online </Typography>
                        </Grid>
                        :
                        <Grid style={{ display: 'flex', alignItems: 'center'}}>
                            <CancelOutlined
                                style={{
                                    color: '#e6555c',
                                    width: '3em',
                                    height: '3em'
                                }} />
                            <Typography variant="h5" color="error" width='60px' style={{ fontSize: '39px' } }>
                                Device is Offline </Typography>
                            </Grid>
                            


                    }
               
            </Grid>
            </Grid>
    )
};
export default RemoteLoginPage;