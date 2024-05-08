import React, { useEffect, useState } from 'react';
import { MuiThemeProvider, CssBaseline, Grid, Typography, Divider, Link, Slide } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import { useHistory, useLocation } from 'react-router';

// local imports
import Routes from './routes/routes';
import { themeDark, themeGreen, themeMagenta, themePrimary, themePurple, themeRed } from 'common/themes';
import { CONSTANTS, CustomButton } from './common';
import { Loader, ConfirmationDialog, LoginPopup } from './components';
import {
    getDrawer,
    getVersion,
    getUserAccessDrawerCodes,
    clearDrawer,
    getAppLoader,
    getSubMenuDrawerCodes,
    getAccessblePaths,
    getAccessbleMenuModules,
    storeDrawerResponseAction,
    removeErrorDialog
} from './redux/actions';
import {  
    socketDeviceStatus,
} from './redux/actions/socketAction';
import { CircularProgress, IconButton, Paper, Tooltip, DialogContent, DialogContentText, Dialog, DialogTitle, } from '@material-ui/core';
import WarningDialog from 'components/warningDialog';
import ActivitySnackBar from 'components/acitvitySnackbar';
import loginResponse from './JSON/loginResponse.json';
import { Redirect } from 'react-router-dom'; 

function App() {
    const dispatch = useDispatch();
    //local state
    const [openLogin, setOpenLogin] = useState(false);
    const [socketMessage, setSocketMessage] = useState();
    const [loading, setLoading] = useState(false);
    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
        message: ''
    });

    //global state
    const { drawerError, drawerResponse } = useSelector((state) => state.getDrawer);
    const { devicestatus } = useSelector((state) => state.getSocketDeviceStatus)
    console.log("devicestatus",devicestatus)
    let remoteSerialNo = localStorage.getItem('remoteSerialNo');
    const { userInfo } = useSelector((state) => state.userLogin);
    const [dialogOpen, setDialogOpen] = useState(false);
    const socket = useSelector((state) => state.socketReducer.socket);
    const { themeColor } = useSelector((state) => state.themeSwitch);
    const { drawerCodes } = useSelector((state) => state.userAccessCodes);
    const { errorMessage } = useSelector((state) => state.errorDialogState);
    const location = useLocation();
    useEffect(() => {
        //to show loading while drawer menu get's ready
        if (userInfo?.data?.userAccess?.length === 0) {
            setLoading(false);
        } else if (drawerCodes?.length === 0 && userInfo?.data?.userAccess) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [drawerCodes, userInfo]);

    const [alertPopupOpen, setAlertPopupOpen] = useState(false);
   
    const handleClose = () => {
        setAlertPopupOpen(false);
    }

    useEffect(() => {
        //to show loading while drawer menu get's ready

        console.log("Menu Access")

        if (drawerResponse && drawerCodes?.length === 0) {
            let obj;

            let subMenuAccessCodes = [];
            if (userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1002') {
                obj = drawerResponse?.data;
            } else {
                let manageAccessCodes =
                    userInfo?.data?.userAccess
                        ?.filter((item) => item?.isVisible === 1)
                        ?.map((item) => item?.['drawer-code']) || [];
                console.log(" -- manageAccessCodes -- " + manageAccessCodes);
                subMenuAccessCodes =
                    userInfo?.data?.userAccess
                        ?.filter((item) => item?.menuId?.length > 1 && item?.isVisible === 1)
                        ?.map((item) => item?.menuId)
                        ?.flat()
                        ?.filter((item) => item?.pageView?.[0] === '1')
                        ?.map((item) => item?.['drawer-code']) || [];

                console.log(" -- subMenuAccessCodes -- " + subMenuAccessCodes);

                obj = drawerResponse?.data?.filter((item) => manageAccessCodes?.some((x) => x === item.code));
            }
            let arrayOfPaths = obj?.filter((item) => item?.path).map((item) => item.path);
            let arrayOfModuleNames = obj?.filter((item) => item?.path === null).map((item) => item.name.toLowerCase());
            if (drawerResponse) {
                dispatch(storeDrawerResponseAction(drawerResponse));
            }
            if (arrayOfModuleNames) {
                dispatch(getAccessbleMenuModules(arrayOfModuleNames));
            }
            if (arrayOfPaths) {
                dispatch(getAccessblePaths(arrayOfPaths));
            }
            if (subMenuAccessCodes?.length >= 0) {
                dispatch(getSubMenuDrawerCodes(subMenuAccessCodes));
            } else {
                dispatch(getSubMenuDrawerCodes([]));
            }
            if (obj) {
                dispatch(getUserAccessDrawerCodes(obj));
            } else {
                dispatch(getUserAccessDrawerCodes(['NoAccess']));
            }
            setLoading(false);
        }
        if (drawerError) {
            if (drawerError === 'Login Please') {
                setOpenLogin(true);
            }
            setLoading(false);
        }
    }, [drawerResponse, drawerError]);

    //socket initialization
    useEffect(() => {
        console.log("Socket initialization --->" + userInfo?.data?.user?.username + " --- " + socket)
        if (userInfo && socket) {
            console.log('socket join method', { userName: userInfo?.data?.user?.username });
            socket?.emit('join', JSON.stringify({ userName: userInfo?.data?.user?.username }));
            socket?.on('Welcome', (id) => {
                console.log(id, 'socket id');
                socket?.emit('join', JSON.stringify({ userName: userInfo?.data?.user?.username }));
                setSocketMessage({
                    type: 'WARNING',
                    msg: 'message',
                    color: 'red',
                    isCansalable: false
                });
                // setDialogOpen(true);
            });
            socket?.on('Message', (data) => {
                console.log("Show Alert Popup");
                console.log(data);
                if (!data.isEmergency)
                {
                    setSocketMessage(data);
                    setDialogOpen(true);
                }
            });
            socket?.on('refresh', (data) => {
                console.log(data, 'on refresh socket data');
                setState({
                    open: true,
                    Transition: function SlideTransition(props) {
                        return <Slide {...props} direction="up" />;
                    },
                    message: data?.msg
                });
            });

            socket.on('deviceStatus', (data) => {
                console.log("dev---", data)
                dispatch(socketDeviceStatus(data));
                console.log('appdata---',data)
                console.log("devicests", data?.deviceStatus)
                if (data?.deviceStatus === "CONNECTED") {
                    setAlertPopupOpen(false);
                } else if (data?.deviceStatus === "DISCONNECTED:1") {
                    setAlertPopupOpen(true)
                }
                else if (data?.deviceStatus === "REBOOT") {
                    setAlertPopupOpen(true)
                }
            });

        } else {
            socket?.emit('join', JSON.stringify({ userName: remoteSerialNo}));
        }
    }, [socket, userInfo]);

    useEffect(() => {
        if (userInfo) {
            dispatch(clearDrawer());
            if (drawerCodes?.length === 0) {
                dispatch(getDrawer(userInfo?.data?.user?.['useraccessrole-code']));
            }
            dispatch(getVersion());
        }
        if (!userInfo?.data?.userAccess) {
            setLoading(false);
        }
    }, [userInfo]);

    //theme color selection
    const themeConfig =
        themeColor === 'primary'
            ? themePrimary
            : themeColor === 'red'
            ? themeRed
            : themeColor === 'green'
            ? themeGreen
            : themeColor === 'magenta'
            ? themeMagenta
            : themeColor === 'purple'
            ? themePurple
            : themeColor === 'dark'
            ? themeDark
            : themePrimary;

    const handleDialog = () => {
        setDialogOpen(false);
        //window.location.reload(true)
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleErrorDialog = () => {
        dispatch(removeErrorDialog());
    };

    return (
        <>
            <MuiThemeProvider theme={themeConfig}>
                <CssBaseline />
                {loading ? <Loader /> : <Routes />}
                {/*<LoginPopup open={openLogin} setOpenLogin={setOpenLogin} />*/}
                {location?.pathname === '/dashboard/access-device'|| 
                    location?.pathname === '/remotelogin' ? null : (
                    <WarningDialog
                        dialogOpen={dialogOpen}
                        title={socketMessage?.type}
                        handleDialog={handleDialog}
                        socketMessage={socketMessage}
                    />
                )}
                {location?.pathname === '/dashboard/access-device' ||
                    location?.pathname === '/remotelogin' ? null : (
                    <>
                            <Grid>
                                {devicestatus?.deviceStatus === "CONNECTED" &&

                                <Dialog open={alertPopupOpen}
                                    onClose={handleDialogClose}
                                    maxWidth="md"
                                    PaperProps={{
                                        style: {
                                            borderRadius: '10px',
                                            backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                                            padding: '20px 15px',
                                            borderTop: '9px solid #E59740',
                                            overflowY: 'unset',
                                            maxWidth: '900px'
                                        }
                                    }} >
                                    <DialogTitle>

                                        <Typography variant="h4" justify="space-between" color="primary">
                                                {devicestatus.deviceName} is Connected
                                        </Typography>
                                        <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                                            <Grid style={{ margin: 5 }}>
                                                <CustomButton variant="outlined" color="primary" onClick={handleClose}>
                                                    Ok
                                                </CustomButton>
                                            </Grid>
                                        </Grid>

                                    </DialogTitle>
                                </Dialog>
                            }
                        </Grid>
                            <Grid>{devicestatus?.deviceStatus === "DISCONNECTED:1" &&
                            <Dialog open={alertPopupOpen}
                                onClose={handleDialogClose}
                                maxWidth="md"
                                PaperProps={{
                                    style: {
                                        borderRadius: '10px',
                                        backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                                        padding: '20px 15px',
                                        borderTop: '9px solid #E59740',
                                        overflowY: 'unset',
                                        maxWidth: '900px'
                                    }
                                }} >
                                <DialogTitle>
                                    <Typography variant="h4" justify="space-between" color="primary">
                                            {devicestatus.deviceName} is Disconnected
                                    </Typography>
                                    <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                                        <Grid style={{ margin: 5 }}>
                                            <CustomButton variant="outlined" color="primary" onClick={handleClose}>
                                                OK
                                            </CustomButton>
                                        </Grid>
                                    </Grid>
                                </DialogTitle>
                            </Dialog>}
                        </Grid>
                            <Grid>{devicestatus?.deviceStatus === "REBOOT" &&
                            <Dialog open={alertPopupOpen}
                                onClose={handleDialogClose}
                                maxWidth="md"
                                PaperProps={{
                                    style: {
                                        borderRadius: '10px',
                                        backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                                        padding: '20px 15px',
                                        borderTop: '9px solid #E59740',
                                        overflowY: 'unset',
                                        maxWidth: '900px'
                                    }
                                }} >
                                <DialogTitle>
                                    <Typography variant="h4" justify="space-between" color="primary">
                                            Please Reboot Your {devicestatus.deviceName} manually
                                    </Typography>
                                    <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                                        <Grid style={{ margin: 5 }}>
                                            <CustomButton variant="outlined" color="primary" onClick={handleClose}>
                                                OK
                                            </CustomButton>
                                        </Grid>
                                    </Grid>
                                </DialogTitle>
                            </Dialog>}
                        </Grid>
                    </>
                )}
                

       
                <ActivitySnackBar state={state} setState={setState} />

                {errorMessage ? (
                    <ConfirmationDialog dialogOpen={errorMessage} title={'Error'} titleColor={'red'}>
                        <Grid>
                            <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                            <Grid style={{ margin: 5 }}>
                                <CustomButton variant="contained" color="primary" onClick={handleErrorDialog}>
                                    {'OK'}
                                </CustomButton>
                            </Grid>
                        </Grid>
                    </ConfirmationDialog>
                ) : null}
            </MuiThemeProvider>
        </>
    );
}

export default App;
