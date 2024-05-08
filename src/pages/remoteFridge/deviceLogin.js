import React, { useState, useEffect } from 'react';
import {
    Button,
    CircularProgress,
    Dialog,
    Divider,
    Grid,
    IconButton,
    InputLabel,
    Link,
    makeStyles,
    Typography
} from '@material-ui/core';
import { Alert, CONSTANTS, CustomButton } from 'common';
import { useHistory } from 'react-router-dom';
import CustomPassword from 'components/password';
import CustomInput from 'components/inputfeild';
import Logo from 'components/logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { clearDeviceLoginState, deviceLogin } from 'redux/actions/auth/authActions';
import ClearIcon from '@material-ui/icons/Clear';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Warn from '../../components/warn/Warn';
import CloseIcon from "@material-ui/icons/Close";

import { deviceLoginReducer } from 'redux/reducers/auth/userReducers';

import {
    createAlert,
    deviceAccessDetails,
    getRemoteAccessDevice,
    handleBredcrumbsNameAction,
    remoteDashboardSocketDataAction
} from 'redux/actions';
const useStyles = makeStyles((theme) => ({
    typoGraphy: {
        fontWeight: 600,
        textTransform: 'capitalize'
    },
    root: {
        width: 450,
        height: 540,
        borderRadius: '10px',
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main
    },
    logoContainer: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: '90px',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px'
    },
    inputLabel: {
        marginBottom: 5,
        fontSize: '14px',
        color: theme.palette.label.main
    },
    error: {
        color: theme.palette.colors.red,
        marginLeft: 80
    },
    submitBtn: {
        width: 285,
        marginTop: 15,
        padding: '15px'
    },
    signInGrid: {
        marginLeft: 310,
        marginTop: 8
    },
    loginCardGrid: {
        marginTop: 30
    },
    passwordInputBox: {
        marginTop: 35
    },
    loginBtnContainer: {
        marginTop: 25
    },
    copyrightText: {
        color: theme.palette.label.main,
        marginTop: 20,
        marginBottom: 15
    },
    sessionText: {
        marginTop: 40
    },
    title: {
        marginLeft: '80px',
        fontSize: 28,
        fontWeight: 600
    }
}));

const DeviceLogin = (props) => {
    const { open, setOpenLogin, noAuth, comboBoxRef } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));
    const { deviceLoading, deviceError, deviceUserInfo } = useSelector((state) => state.deviceLogin);
    console.log("deviceError", deviceError);
    deviceUserInfo?.data?.deviceData?.name &&
        localStorage.setItem('accessDeviceName', JSON.stringify(deviceUserInfo?.data?.deviceData?.name));
    deviceUserInfo?.data?.deviceData?.name && dispatch(handleBredcrumbsNameAction(devDeviceId?.name));
    const { isLoggedInDevice } = useSelector((state) => state.isDeviceLoggedIn);
    let invalidBadge = localStorage.getItem('InvalidBadge')
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPaswordError] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertPopupOpen, setAlertPopupOpen] = useState(false);
    console.log("alertPopupOpen---", alertPopupOpen)
    //let alertPopupOpen = useRef(false);
    const [AlertError, setAlertError] = useState("");
    const [userError, setUserError] = useState(null);
    const [accessDetails, setAccessDetails] = useState({});
    const socket = useSelector((state) => state.socketReducer.socket);

    useEffect(() => {
        socket?.on('accessOnDevices', (data) => {
            console.log('My Socket >> accessOnDevices ', data);
            dispatch(deviceAccessDetails(data));
            dispatch(deviceLogin(undefined, undefined, data?.accessBadge, data?.serialNumber));
            setAccessDetails(data);
            console.log(data.status);
            if (data.status === "false" || !data.status) {
                setAlertPopupOpen(true);
                setAlertError(data.msg);
            }
        });
        return () => {
            dispatch({
                type: 'DEVICE_LOGIN_FAIL',
                payload: false
            });
        }
    }, [socket]);

    const checkAtLeastLength = (expression, length) => expression && expression.trim().length >= length;
    const isValidFun = (expression) => checkAtLeastLength(expression, 0);
    const onSubmitLogin = () => {
        if (!isValidFun(username)) {
            //doNothing
        } else if (!isValidFun(password)) {
            //doNothing
        } else {
            dispatch(deviceLogin(username, password, undefined, devDeviceId?.serialNumber));
        }
    };
    const handleBadgeAccess = () => {
        dispatch(deviceLogin(undefined, undefined, accessDetails?.accessBadge, accessDetails?.serialNumber));
        console.log("accessdetails", accessDetails);
    };

    const validation = () => {
        username?.match(/[a-zA-Z0-9]+$/) ? null : setUserNameError(true);
        password?.match(/[a-zA-Z0-9]+$/) ? null : setPaswordError(true);
        onSubmitLogin();
    };

  
    const handleClose = () => {
        setAlertPopupOpen(false);
        setOpenLogin(false);
        setUserError(null);
        setUserNameError(null);
        setPaswordError(null);
        setUserName(null);
        setPassword(null);
        dispatch({
            type: 'DEVICE_LOGIN_FAIL',
            payload: false
        });
    };

    React.useEffect(() => {
        console.log('login----', devDeviceId?.serialNumber)
        if (isLoggedInDevice) {
            if (devDeviceId?.serialNumber === accessDetails?.serialNumber) {
                history.push('/dashboard/access-device');
            } else {
                if (!devDeviceId?.serialNumber) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: 'Please place badge on selected device',
                            alertType: 'error'
                        })
                    );
                } 
                    //else {
                //    dispatch(
                //        createAlert({
                //            showAlert: true,
                //            alertMessage: 'Please Select Device',
                //            alertType: 'error'
                //        })
                //    );
                //}

                comboBoxRef?.current?.focus();
            }

            //setUserName('');
            //setPassword('');
        }
        if (deviceError) {
            setAlertOpen(true);
        }
        if (deviceUserInfo?.data?.deviceData) {
            let data = {
                serialNumber: deviceUserInfo?.data?.deviceData?.serialNumber,
                accessBadge: deviceUserInfo?.data?.userData?.badgeNo
            };
            setAccessDetails(data);
            dispatch(deviceAccessDetails(data));
        }

      
        
        console.log("Badge Access ------------"+invalidBadge)
        if (invalidBadge==="true")
        {
            localStorage.setItem('InvalidBadge', false);
            console.log("Alert Open ------------" + invalidBadge)
            setAlertPopupOpen(true);
        }
        //dispatch(clearDeviceLoginState());
        // return () => {
        //     dispatch(clearDeviceLoginState());
        // };
        // setTimeout(() => {
        //     dispatch(clearDeviceLoginState());
        // }, 3000);
    }, [deviceUserInfo, deviceError, isLoggedInDevice]);
    function handleChangeUserName(e) {
        setUserNameError(false);
        setUserName(e.target.value);
    }
    function handleChangePassword(e) {
        setPaswordError(false);
        setPassword(e.target.value);
    }
    const onEnterPress = () => {
        onSubmitLogin();
    };
    const handleSubmit = () => {
        validation();
    };

    const [Open, setOpen, AlertPopupOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };

    return (
        
        <Dialog
            open={open}
            maxWidth="md"
            PaperProps={{
                style: {
                    overflowX: 'hidden',
                    borderRadius: '10px',
                    backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN
                }
            }}
        >
            <Grid container direction="row" alignItems="center" justify="center">
                <div className={classes.root}>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <IconButton disableFocusRipple disableRipple disabled={noAuth} onClick={handleClose}>
                                <ClearIcon
                                    color="primary"
                                    fontSize="large"
                                    style={{
                                        margin: '12px 15px',
                                        cursor: 'pointer'
                                    }}
                                />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography className={classes.title} variant="h4" color="primary">
                                Access Device
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.loginCardGrid}
                        justify="center"
                    >
                        <Grid item>
                            <InputLabel className={classes.inputLabel}>{CONSTANTS.USERNAME}</InputLabel>
                            <CustomInput
                                name="userName"
                                value={username}
                                size="md"
                                focus={true}
                                error={userNameError}
                                helperText={userNameError && `${CONSTANTS.ERROR_USERNAMES}`}
                                onChange={handleChangeUserName}
                            />
                        </Grid>
                        <Grid item className={classes.passwordInputBox}>
                            <InputLabel className={classes.inputLabel}>{CONSTANTS.PASSWORD}</InputLabel>
                            <CustomPassword
                                name="password"
                                size="md"
                                autoFocus
                                onChange={handleChangePassword}
                                error={passwordError}
                                helperText={passwordError && `${CONSTANTS.ERROR_PASSWORD}`}
                                onEnterPress={onEnterPress}
                            />
                        </Grid>

                        <Grid item className={classes.loginBtnContainer}>
                            <Button
                                disabled={userNameError && passwordError}
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                className={classes.submitBtn}
                            >
                                {deviceLoading ? <CircularProgress color="inherit" size={20} /> : 'Login'}
                            </Button>
                        </Grid>
                    </Grid>
                    {userError && (
                        <Grid item style={{ width: '25%', margin: '0 auto', marginTop: '15px' }}>
                            <Typography color="error" variant="body2">
                                {userError}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item>
                        <Divider style={{ width: '63%', margin: '0 auto', marginTop: '30px' }} />
                    </Grid>
                    {alertOpen && (
                        <Alert
                            open={alertOpen}
                            message={deviceError}
                            duration={2000}
                            onClose={() => setAlertOpen(false)}
                            vertical={'bottom'}
                            horizontal={'bottom'}
                            severity={'error'}
                            actions={false}
                        />
                  )}


                    <Grid
                        container
                        direction="column"
                        style={{ marginTop: '10px' }}
                        justify="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item>
                            <Typography variant="subtitle2" color="primary">
                                or
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="h6"
                                color="primary"
                                style={{ cursor: 'pointer' }}
                                //onClick={handleBadgeAccess}
                            >
                                PRESENT ID BADGE
                            </Typography>
                          {/*  <Dialog open={alertPopupOpen || deviceError} onClose={handleClose}>*/}
                          {/*    <DialogTitle>*/}
                          {/*          <Grid container*/}
                          {/*              style={{*/}
                          {/*                  width: '450px',*/}
                          {/*                  height: '180px',*/}
                          {/*                  marginTop: '10px auto'*/}
                          {/*              }}*/}
                          {/*              justify="space-between"*/}
                          {/*              >*/}
                                        
                          {/*              <Typography variant="h4" justify="space-between" color="primary">*/}
                          {/*                  Device*/}
                          {/*              </Typography>*/}
                          {/*              <IconButton onClick={() => handleClose(false)}>*/}
                          {/*                  <CloseIcon variant="h2" color="primary">*/}
                          {/*                      close*/}
                          {/*                      </CloseIcon>*/}
                          {/*              </IconButton>*/}
                          {/*        </Grid>*/}
                          {/*      </DialogTitle>*/}
                          {/*          <Warn />*/}
 
                          {/*      <DialogContent >*/}
                          {/*          <DialogContentText >*/}
                          {/*              <Typography*/}
                          {/*                  variant="h6"*/}
                          {/*                  color="primary"*/}
                                            
                          {/*              >*/}
                          {/*                  ACCESS DENIED*/}
                          {/*              </Typography>*/}
                                     
                          {/*        </DialogContentText>*/}
                          {/*    </DialogContent>*/}
                          {/*</Dialog>*/}
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Dialog>
    );
};

export default DeviceLogin;
