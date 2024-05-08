import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Divider, IconButton, Toolbar, AppBar, Drawer, List, Tooltip, Grid, Typography } from '@material-ui/core';
import { Notifications as NotificationsIcon, Refresh as RefreshIcon, History as HistoryIcon } from '@material-ui/icons';

// local imports
import { useDashboardStyles } from './style';
import AppRoutes from '../../routes/AppRoutes';
import Header from './components/Header/Header';
import SideBarList from './components/SideBar/SideBarList';
// import Alert from './components/alert/alert.container';
import logo2 from '../../assets/logo2.png';
import routes from './routes';
import { SimpleBreadcrumbs, Alert, CustomDialog } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, CONSTANTS } from 'common';
import 'font-awesome/css/font-awesome.min.css';
import { clearCollectionDataResponse, deleteCollection } from 'redux/actions/collectionDelete';
import CustomInput from 'components/inputfeild';
import { createAlert, openDrawerAction, removeAlert } from 'redux/actions';
import { useHistory, Link } from 'react-router-dom';
const Dashboard = () => {
    const location = useLocation();
    const classes = useDashboardStyles();
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [cloneDialogOpen, setCloneDialogOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [passHelper, setPassHelper] = useState('');
    const [alertMessagess, setAlertMessage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const response = useSelector((state) => state.deleteCollection);
    const { showAlert, alertMessage, alertType, alertDuration } = useSelector((state) => state.alertStore);
    const { drawerOpen } = useSelector((state) => state.drawerOpenState);
    const socket = useSelector((state) => state.socketReducer.socket);
    const { userInfo } = useSelector((state) => state.userLogin);
    let remoteInfo = JSON.parse(localStorage.getItem('remoteInfo'));
    //let title = localStorage.getItem('title');
    

    useEffect(() => {
        if (drawerOpen === true) {
            setOpen(true);
            dispatch(openDrawerAction(false));
        }
    }, [drawerOpen]);

    const handleCloneDialogClose = () => {
        setPassword('');
        setPassHelper('');
        setCloneDialogOpen(false);
    };
    let url = location.pathname.split('/');
    let filterUrl = url.filter((x, i) => i < 4);  
    let appBarUrl = filterUrl.join('/');
    // console.log(appBarUrl, 'klkl');
    useEffect(() => {
        if (response?.data?.status) {
            setAlertOpen(true);
            setAlertMessage(response?.data?.message);
            window.location.reload();
        } else {
            setAlertMessage('');
            setAlertOpen(false);
        }
    }, [response]);
    const handleDrawerOpen = () => {
        //if (remoteInfo.remoteLogin !== "TRUE") {
            setOpen(!open);
        //}
        
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const drawerNavigationKey = (e) => {
        const active = document.activeElement;
        if (e.keyCode === 40 && active.nextSibling) {
            active.nextSibling.focus();
        }
        if (e.keyCode === 38 && active.previousSibling) {
            active.previousSibling.focus();
        }
    };
    const drawerOpenCloseKey = (event) => {
        if (event.ctrlKey && event.keyCode === 68) {
            setOpen(!open);
            event.preventDefault();
            event.stopPropagation();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', drawerOpenCloseKey, true);
        open && document.addEventListener('keydown', drawerNavigationKey, true);
        return () => {
            document.removeEventListener('keydown', drawerOpenCloseKey, true);
            document.removeEventListener('keydown', drawerNavigationKey, true);
        };
    }, [open]);
    const drawerRoutes = routes();
    const drawer = (
        <>
            <List className={classes.list}>
                {drawerRoutes?.map((item, index) => (
                    <SideBarList
                        {...item}
                        key={index}
                        path={item.path}
                        open={open}
                        handleDrawerOpen={handleDrawerOpen}
                        handleDrawerClose={handleDrawerClose}
                        setOpen={setOpen}
                    />
                ))}
            </List>
        </>
    );

    const handleFlushData = () => {
        setPassHelper('');
        setPassword('');
        setCloneDialogOpen(!cloneDialogOpen);
    };
    const handleDeleteData = (e) => {
        if (password === 'Spacecode@9686') {
            handleFlushData();
            dispatch(deleteCollection());
            socket.emitEvent('deleteInventory', {
                userName: userInfo.data.user.username,
                status: true,
                message: 'delete Inventory and Rfid details'
            });
        } else {
            setPassHelper('Incorrect Password');
        }
    };

    useEffect(() => {
        if (socket) {
            socket?.on('ackDeleteInventory', (data) => {
                if (data?.status) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'success'
                        })
                    );
                }
            });
        }
    }, [socket]);

    const CheckBoxCollection = (
        <Grid container direction="row" alignItems="center">
            <Grid item style={{ paddingBottom: 15 }}>
                <CustomInput
                    width="367px"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    onEnterPress={handleDeleteData}
                    error={passHelper}
                    helperText={passHelper}
                />
            </Grid>
        </Grid>
    );

    function refreshPage() {
        setCloneDialogOpen(true);
    }
    // console.log('socket in app bar', socket);

    return (
        <>
            <div className={classes.root}>
                <AppBar elevation={0} position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.mainToolbar}>
                        <div onClick={handleDrawerOpen} className={classes.logoContainer}>
                            <img src={logo2} alt="logo" className={classes.logo} />
                        </div>

                        <div className={classes.breadcrumbs}>
                            <SimpleBreadcrumbs name={appBarUrl} />
                        </div>

                        <div>
                            <Typography className={classes.socketStatus}>
                                Socket : {socket?.connected ? 'Connected' : 'Disconnected'}
                            </Typography>
                            <Typography className={classes.socketStatus}>{'Socket id:' + socket?.id}</Typography>
                        </div>

                        {userInfo?.data?.user?.['useraccessrole-code'] !== 'BS-UAR-1008' && (
                            <>
                                <Tooltip title="Activity History">
                                    <IconButton onClick={() => history.push('/dashboard/reports/movements')}>
                                        <HistoryIcon className={classes.notificationsIcon} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Notifications">
                                    <IconButton onClick={() => history.push('/dashboard/reports/notifications')}>
                                        <NotificationsIcon className={classes.notificationsIcon} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Reset Data">
                                    <IconButton onClick={refreshPage}>
                                        <RefreshIcon className={classes.notificationsIcon} />
                                    </IconButton>
                                </Tooltip>{' '}
                            </>
                        )}

                        <Divider
                            orientation="vertical"
                            flexItem
                            className={classes.appBarDivider}
                            classes={{ root: classes.divider }}
                        />

                        <Header />
                    </Toolbar>

                    <Divider className={classes.appBarDividerBottom} />
                </AppBar>

                {showAlert && (
                    <Alert
                        open={showAlert}
                        message={alertMessage}
                        duration={alertDuration ? alertDuration : 3000}
                        onClose={() => dispatch(removeAlert())}
                        vertical={'bottom'}
                        horizontal={'center'}
                        severity={alertType}
                        actions={alertDuration ? true : false}
                    />
                )}
                <Drawer
                    variant="temporary"
                    className={classes.drawer}
                    onClose={handleDrawerOpen}
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    {drawer}
                </Drawer>

                <main onClick={handleDrawerClose} className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <AppRoutes />
                </main>
            </div>
            <CustomDialog
                title={`Reset Data`}
                open={cloneDialogOpen}
                onClose={handleCloneDialogClose}
                onCancelClick={handleCloneDialogClose}
                onSaveClick={handleDeleteData}
                isSave
                isDelete
                minWidth="460px"

                // loading={postLoading}
            >
                {CheckBoxCollection}
            </CustomDialog>
        </>
    );
};

export default Dashboard;
