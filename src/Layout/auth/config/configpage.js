
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS from '../../../common/constants';
import axios from 'axios';
import {
    settingsRemoteLoginPageAction
} from 'redux/actions/socketAction';
import {
    login
} from '../../../redux/actions/auth/authActions';
import {
    Grid,
    CircularProgress,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getDrawer, getLicense } from 'redux/actions/settings/drawerActions';
import { getUserAccessDrawerCodes } from 'redux/actions/userAccessRoutingActions';


const ConfigPage = () => {
   
    const history = useHistory();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { otpLoading, getOtpSuccess, getOtpError } = useSelector((state) => state.otpRequest);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { drawerResponse, drawerError } = useSelector((state) => state.getDrawer);
    const { loading, error, userInfo } = userLogin;
    console.log("user-----", userInfo)

    useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let url = `${CONSTANTS.BASEURL}setting/config`;

        axios.get(url, config).then((resdata) => {

            console.log("config" + resdata.status);
            if (resdata.status) {
                dispatch(settingsRemoteLoginPageAction(resdata.data.data));
                let loginType = 'web'
                localStorage.setItem('remoteInfo', JSON.stringify(resdata.data.data));
                if (resdata.data.data.remoteLogin === "TRUE")
                {
                        // Remote Login Redirect
                        console.log("Redirected to Remote Login")
                        //window.history.replaceState(null, '', "/remotelogin");
                        history.push('/remotelogin');
                }
                else if (resdata.data.data.emergencyLogin==="TRUE")
                {
                    dispatch(login(resdata.data.data.emergencyUserName, resdata.data.data.emergencyPassword,undefined,loginType));
                }

                else {
                        // Redirect to  Login Page
                        console.log("Redirected to Login")
                        history.push('/login');
                        //window.history.replaceState(null, '', "/login");
                    }

                
            }
        })
    });

    useEffect(() => {
        let manageAccessCodes =
            userInfo?.data?.userAccess?.filter((item) => item?.isVisible === 1)?.map((item) => item?.['drawer-code']) ||
            [];

        console.log("manageAccessCodes:", manageAccessCodes);
        let obj = drawerResponse?.data?.filter((item) => manageAccessCodes?.some((x) => x === item.code));
        let arrayOfPaths = obj?.filter((item) => item?.path).map((item) => item.path);

        if (userInfo?.status) {
            console.log('initial drawer api call and get license call');
            dispatch(getLicense());
            //dispatch(getDrawer());
            dispatch(getDrawer(userInfo?.data?.user?.['useraccessrole-code']));
            console.log("userAccessRoleCode:", userInfo?.data?.user?.['useraccessrole-code']);
            dispatch(getUserAccessDrawerCodes([]));
            /*userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1008'
                ? history.push('/dashboard/remote-dashboard')
                : Array.isArray(arrayOfPaths) &&
                arrayOfPaths?.length &&
                history.push(arrayOfPaths[arrayOfPaths?.length - 1]);*/

            history.push('/dashboard/dashboard-euo')

            //setUserName('');
            //setPassword('');
            //flipped ? setFrontScreen('mainLoginPart') : setBackScreen('mainLoginPart');
        }
        if (error) {
            //username && password && showSnackbar(true, error, 'error');
        }
        return () => {
            //dispatch(clearOtpState());
            //dispatch(clearLoginState());
            //dispatch(clearForgotPassowrdResponse());
        };
    }, [userInfo, error]);


    return (
        <Grid container
            justifyContent="center"
            alignItems="center"
            style={{
                minWidth: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}
            spacing={4}
            direction="column">
            <CircularProgress color="primary" justify="center" size={40} />
        </Grid>
    )
};
export default ConfigPage;