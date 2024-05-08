import { Card, Grid, Paper, Typography } from '@material-ui/core';
import { CustomButton } from 'common';
import React, { useEffect, useState } from 'react';
import BatchProducts from './components/batchProducts/batchProducts';
import EmergencyUnits from './components/emergencyUnits/emergencyUnits';
import RemoveUnits from './components/removeUnits/removeUnits';
import ReturnUnits from './components/returnUnits/returnUnits';
import { useStyles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { clearData, clearPullOutData, clearSocketSessionId, handleBredcrumbsNameAction } from 'redux/actions';
import { clearDeviceLoginState, deviceLogout, logout } from 'redux/actions/auth/authActions';
import { useHistory, Route } from 'react-router-dom';
import BulkUnload from './components/bulkUnload/bulkUnload';
import BulkLoading from './components/bulkLoading';
import StatusReport from './components/runStatusReport/statusReport';
import EdqsUnits from './components/edqsUnits/edqsUnits';
import EdqsBatch from './components/edqsBatch/index';
import { getDashboard } from 'redux/actions/dashboard/dashboardActions';
import BulkLoadAndUnload from './components/bulkLoadAndUnload';
import { createAlert } from 'redux/actions';
import CountUp from 'react-countup';
import WarningIcon from '@material-ui/icons/Warning';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { getApplyFilters } from 'redux/actions/filters/globalFilterAction';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';

const AccessDevicePage = (props) => {
    const { userInfo } = useSelector((state) => state.userLogin);
    console.log('useinfo--',userInfo)
    const [accessableCodes, setAccessableCodes] = useState([]);
    console.log('access----', accessableCodes);
    const { deviceLoading, deviceError, deviceUserInfo } = useSelector((state) => state.deviceLogin);
    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));
    let remoteInfo = JSON.parse(localStorage.getItem('remoteInfo'));
    const [isErrorUnits, setIsErrorUnits] = useState(false);
    useEffect(() => {
        let tempAccessCodes = [];
        let manageAccessCodes = userInfo?.data?.userAccess
            ?.filter((item) => item['name'] === 'Remote Fridge')
            ?.map((subMenu) => subMenu?.menuId)
            ?.flat();

        manageAccessCodes.forEach((itemA) => {
            if (itemA.fullAccess !== 0) {
                tempAccessCodes.push(itemA?.label);
            }
            let keysOfObject = Object.keys(itemA);
            keysOfObject.forEach((item) => {
                if (Array.isArray(itemA[item])) {
                    itemA[item][0] === '1' && tempAccessCodes.push(itemA[item][1]);
                }
            });
        }, []);
        setAccessableCodes(tempAccessCodes);
    }, []);

    const socketSessionIdStore = useSelector((state) => state.socketSessionIdStore);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const cards = [
        { id: 0, name: 'Return Units', page: 'return' },
        { id: 1, name: 'Remove Units', page: 'remove' },
        { id: 2, name: 'Emergency Use Only Units', page: 'emergency' },
        { id: 3, name: 'Batch Products', page: 'batch' },
        { id: 4, name: 'Run Status Report', page: 'statusReport' },
        { id: 5, name: 'Bulk Load', page: 'BulkLoading' },
        { id: 6, name: 'Bulk Unload', page: 'bulkUnload' },
        { id: 7, name: 'Bulk Load + Unload', page: 'bulkLoadUnload' },
        { id: 8, name: 'Remove EDQs', page: 'removeEDQs' },
       /* { id: 8, name: 'Remove EDQs Batch', page: 'removeEDQsBatch' }*/
    ];
    const [currentPage, setCurrentPage] = useState('All');
    const { isLoggedInDevice } = useSelector((state) => state.isDeviceLoggedIn);
    const deviceAccessDetailsStore = useSelector((state) => state.deviceAccessDetailsStore);
    console.log('deviceAccess', deviceAccessDetailsStore);
    const socket = useSelector((state) => state.socketReducer.socket);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const { data } = useSelector((state) => state.getDashboard);
    const clearSocketSession = () => {
        dispatch(clearSocketSessionId());
    };

    const genericUnlockEmit = (method, type) => {
        let data = {
            token: devDeviceId?.token,
            method: method,
            payload: {
                userName: userInfo.data.user.username
            }
        };
        if (data) {
            socket?.emit('generic', data);
            console.log(data);
        }
    };

    const genericEmit = (method, data, clear) => {
        console.log({ method, data, deviceAccessDetailsStore }, 'socketEmit');
        console.log(JSON.stringify(data), 'string');
        if (data) {
            socket?.emit(method, data);
        }
        if (clear) {
            clear();
        }
    };

    const lfDeviceEvent = () => {
        let tempData = { badgeNo: deviceAccessDetailsStore?.accessBadge, deviceToken: devDeviceId?.token };
        // genericEmit('inventoryLF', tempData);
        socket?.emit('inventoryLF', tempData, (confirmMessage) => {
            console.log(confirmMessage, 'socket callBack');
            if (confirmMessage?.status) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: 'LF device connected',
                        alertType: 'success'
                    })
                );
            } else {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: 'LF device not connected',
                        alertType: 'error'
                    })
                );
            }
        });
    };

    React.useEffect(() => {
        //genericEmit("E130", 'Bulk Load')

        if (socket) {
            socket?.on('deviceActivity', (data) => {
                //if (currentPage === 'removeEDQs') setIsUnlocked(true);

                if (data?.badData?.length > 0 || data?.badBatchData?.length > 0) {
                    setIsErrorUnits(true);
                } else if (
                    (data?.goodData?.length > 0 || data?.goodBatchData?.length > 0) &&
                    (data?.badData?.length === 0 || data?.badBatchData?.length === 0)
                ) {
                    setIsErrorUnits(false);
                }
            });

            socket.on('ackunlockDevice', (data) => {
                console.log('ackunlockDevice----', data);
            });
        }
    }, [socket]);

    const handleDeviceExit = (noRedirect) => {
        let deviceFilter = JSON.stringify([{ key: 'deviceId', value: devDeviceId?._id }]);
        dispatch(getDashboard(deviceFilter));
        dispatch(clearData());
        dispatch(clearPullOutData());
        dispatch(deviceLogout());
        !noRedirect && history.push('/dashboard/remote-dashboard');
        if (socketSessionIdStore?._id) genericEmit('E132', socketSessionIdStore, clearSocketSession);
        //genericEmit("E132",'LockDevice');
        if (deviceUserInfo?.status) {
            dispatch(clearDeviceLoginState());
        }
    };

    /*const handleCardClick = (page) => {
        console.log(page, 'current Page');

        if (page === 'return') {
            if (accessableCodes.includes('Return Units')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Return Unit'));
                genericEmit("E130", 'Return Unit');
            }
        } else if (page === 'remove') {
            if (accessableCodes.includes('Remove Units')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Remove Unit'));
                //genericEmit("E130",'Remove Unit');
            }
        } else if (page === 'emergency') {
            if (accessableCodes.includes('Emergency Use Only Units')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Emergency Unit'));
                genericEmit("E130",'Emergency Unit');
            }
        } else if (page === 'batch') {
            if (accessableCodes.includes('Batch Products')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Batch'));
                genericEmit("E130",'Batch Unit');
            }
        } else if (page === 'bulkUnload') {
            if (accessableCodes.includes('Bulk Unload')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Bulk Unload'));
                genericEmit("E130",'Bulk Unload');
            }
        } else if (page === 'BulkLoading') {
            if (accessableCodes.includes('Bulk Load')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Bulk Load'));
                genericEmit("E130", 'Bulk Load');
            }
        } else if (page === 'statusReport') {
            if (accessableCodes.includes('Run Status Report')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Status Report'));
                genericEmit("E130",'Status Report');
            }
        } else if (page === 'removeEDQs') {
            if (accessableCodes.includes('Remove EDQs')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('EDQs Units'));
                genericEmit("E130", 'EDQs Units');
            }
        } else if (page === 'bulkLoadUnload') {
            if (accessableCodes.includes('Bulk Load + Unload')) {
                dispatch(handleBredcrumbsNameAction('Bulk Load + Unload'));
                setCurrentPage(page);
                genericEmit("E130",'Bulk Load + Unload');
            }
        }
    };*/

    document.addEventListener('mousemove', () => {
        localStorage.setItem('lastActvity', new Date());
    });
    document.addEventListener('click', () => {
        localStorage.setItem('lastActvity', new Date());
    });

    const handleCardClick = (page) => {
        console.log(page, 'current Page');

        if (page === 'return') {
            if (accessableCodes.includes('Return Units')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Return Unit'));
                genericEmit('remoteSession', { type: 'Return Unit', count: 0, ...deviceAccessDetailsStore });
            }
        } else if (page === 'remove') {
            if (accessableCodes.includes('Remove Units')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Remove Unit'));
                genericEmit('remoteSession', { type: 'Remove Unit', count: 0, ...deviceAccessDetailsStore });
            }
        } else if (page === 'emergency') {
            if (accessableCodes.includes('Emergency Use Only Units')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Emergency Unit'));
                genericEmit('remoteSession', { type: 'Emergency Unit', count: 0, ...deviceAccessDetailsStore });
            }
        } else if (page === 'batch') {
            if (accessableCodes.includes('Batch Products')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Batch'));
                genericEmit('remoteSession', { type: 'Batch Unit', count: 0, ...deviceAccessDetailsStore });
            }
        } else if (page === 'bulkUnload') {
            if (accessableCodes.includes('Bulk Unload')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Bulk Unload'));
                genericEmit('remoteSession', { type: 'Bulk Unload', count: 0, ...deviceAccessDetailsStore });
            }
        } else if (page === 'BulkLoading') {
            if (accessableCodes.includes('Bulk Load')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Bulk Load'));
                genericEmit('remoteSession', { type: 'Bulk Load', count: 0, ...deviceAccessDetailsStore });
            }
        } else if (page === 'statusReport') {
            if (accessableCodes.includes('Run Status Report')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('Status Report'));
                genericEmit('remoteSession', { type: 'Status Report', count: 0, ...deviceAccessDetailsStore });
            }
        } else if (page === 'removeEDQs') {
            if (accessableCodes.includes('Remove EDQs')) {
                setCurrentPage(page);
                dispatch(handleBredcrumbsNameAction('EDQs Units and Batches'));
                genericEmit('remoteSession', { type: 'EDQs Units and Batches', count: 0, ...deviceAccessDetailsStore });
            }
        }
        //else if (page === 'removeEDQsBatch') {
        //    if (accessableCodes.includes('Remove EDQs')) {
        //        setCurrentPage(page);
        //        dispatch(handleBredcrumbsNameAction('EDQs Batch'));
        //        genericEmit('remoteSession', { type: 'EDQs Batch', count: 0, ...deviceAccessDetailsStore });
        //    }
        //}
        else if (page === 'bulkLoadUnload') {
            if (accessableCodes.includes('Bulk Load + Unload')) {
                dispatch(handleBredcrumbsNameAction('Bulk Load + Unload'));
                setCurrentPage(page);
                genericEmit('remoteSession', { type: 'Bulk Load + Unload', count: 0, ...deviceAccessDetailsStore });
            }
        }
    };

 

    const handleUnlockFridgeClick = () => {
        genericEmit('remoteSession', { type: 'Return Unit', count: 0, ...deviceAccessDetailsStore });
        genericUnlockEmit('E130', 'Unlock Fridge');
    };

    //setTimeout(function () {
    //    window.location.replace('remotelogin');
    //}, 120000);
    //function onUserNavigate() {
    //    let idleTime = getCurrentTime() - getPreviousNavTime();
    //    storeCurrentNavTime();
    //    if (idleTime > ALLOWED_IDLE_TIME)
    //        window.location.href = '/RemoteLoginPage';
    //}

    const handleDashboardAletsFiltter = (key1, key2, value1, value2, name) => {
        if (value1 === undefined || value1 === null || value2 === undefined) {
            return;
        }
        dispatch(setScreeenIndex(1));
        let filtersData1;
        let chipData = [];

        filtersData1 = [
            { key: key1, value: value1 },
            { key: key2, value: value2 },
            { key: 'deviceId._id', value: devDeviceId?._id }
        ];
        let filtersData = filtersData1.filter((val) => val);
        // console.log(filtersData1, 'filtersData1 += filtersData ', filtersData);
        chipData = [name];

        let chipNameAndId = {};
        chipNameAndId[name] = value1;
        let filterKeysObjects = {};
        let newFiltersObject = {
            chipNameAndId,
            chipData,
            filtersData,
            filterKeysObjects,
            staticFilters: true
        };
        console.log(chipNameAndId, 'chipNameAndId', name, chipData);
        dispatch(getApplyFilters(newFiltersObject));
        history.push('/dashboard/reports/notifications');
    };

    //const handleRequestFiltter = (key1, key2, value1, value2, name) => {
    //    if (value1 === undefined || value1 === null || value2 === undefined) {
    //        return;
    //    }
    //    dispatch(setScreeenIndex(1));
    //    let filtersData1;
    //    let chipData = [];

    //    filtersData1 = [
    //        { key: key1, value: value1 },


    //    ];
    //    let filtersData = filtersData1.filter((val) => val);
    //    // console.log(filtersData1, 'filtersData1 += filtersData ', filtersData);
    //    chipData = [name];

    //    let chipNameAndId = {};
    //    chipNameAndId[name] = value1;
    //    let filterKeysObjects = {};
    //    let newFiltersObject = {
    //        chipNameAndId,
    //        chipData,
    //        filtersData,
    //        filterKeysObjects,
    //        staticFilters: true
    //    };
    //    console.log(chipNameAndId, 'chipNameAndId', name, chipData);
    //    dispatch(getApplyFilters(newFiltersObject));
    //    history.push('/dashboard/simulation');
    //};

    const handleRequestFiltter = () => {
        history.push('/dashboard/simulation');
    };

    if (remoteInfo.remoteLogin === 'TRUE') {
        let timeInterval = setInterval(() => {
            let lastAcivity = localStorage.getItem('lastActvity');
            var diffMs = Math.abs(new Date(lastAcivity) - new Date()); // milliseconds between now & last activity
            var seconds = Math.floor(diffMs / 1000);
            var minute = Math.floor(seconds / 60);
            console.log(seconds + ' sec and ' + minute + ' min since last activity');
            if (minute === 2) {
                console.log('No activity from last 2 minutes... Logging Out');
                clearInterval(timeInterval);
                dispatch(logout());
                dispatch(deviceLogout());
                history.push('/remotelogin');
            }
        }, 5000);
    }

    !isLoggedInDevice && history.push('/dashboard/remote-dashboard');
    // useEffect(() => {
    //     return () => handleDeviceExit('noRedirect');
    // }, []);

    return (
        <>
            <Grid container spacing={2}>
                {currentPage === 'All' ? (
                    <Grid item xs={9} className={classes.firstDiv}>
                        <Paper elevation={0} className={classes.paper}>
                            <Grid container spacing={4} direction="column" className={classes.returnMainGrid}>
                                <Grid item>
                                    <Grid container>
                                        <Grid
                                            item
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: 5
                                            }}
                                        >
                                            <Typography color="primary" variant="h6">
                                                PLEASE SELECT AN ACTION
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item direction="row" xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <Card className={classes.smalldetailCardMain}>
                                                <Grid container direction="column" spacing={1}>
                                                    <Grid item>
                                                        <Grid container direction="column" justify="space-between">
                                                            <Grid item>
                                                                <Grid container spacing={1} alignItems="center">
                                                                    <Grid item>
                                                                        <OfflineBoltIcon
                                                                            className={classes.smallCardIcon}
                                                                            color="error"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Typography className={classes.cardMainText}>
                                                                            General
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container direction="column">
                                                                    <Grid item>
                                                                        <Grid
                                                                            container
                                                                            spacing={1}
                                                                            justify="space-between"
                                                                        >
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.resolution}
                                                                                >
                                                                                    Unresolved
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.resolutionRed}
                                                                                    color="error"
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.notify2?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.notify2?.length > 0 &&
                                                                                        handleDashboardAletsFiltter(
                                                                                            'status',
                                                                                            'type',
                                                                                            'Unresolved',
                                                                                            'General Alert',
                                                                                            'Alerts Unresolved'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {data?.notify2?.length > 0
                                                                                        ? data?.notify2[0]
                                                                                              ?.alertUnresolved
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Card className={classes.smalldetailCardMain}>
                                                <Grid container direction="column" spacing={1}>
                                                    <Grid item>
                                                        <Grid container direction="column" justify="space-between">
                                                            <Grid item>
                                                                <Grid container spacing={1} alignItems="center">
                                                                    <Grid item>
                                                                        <WarningIcon
                                                                            className={`${classes.smallCardIcon} ${classes.warning}`}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Typography className={classes.cardMainText}>
                                                                            Critical
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid
                                                                    container
                                                                    justify="space-between"
                                                                    direction="column"
                                                                >
                                                                    <Grid item>
                                                                        <Grid
                                                                            container
                                                                            spacing={2}
                                                                            justify="space-between"
                                                                        >
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.resolution}
                                                                                >
                                                                                    Unresolved
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.resolutionRed}
                                                                                    color="error"
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.notify4?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.notify4?.length > 0 &&
                                                                                        handleDashboardAletsFiltter(
                                                                                            'status',
                                                                                            'type',
                                                                                            'Unresolved',
                                                                                            'Critical Alert',
                                                                                            'Critical Unresolved'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {data?.notify4?.length > 0
                                                                                        ? data?.notify4[0]
                                                                                              ?.warningUnresolved
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Card className={classes.smalldetailCardMain}>
                                                <Grid container direction="column" spacing={1}>
                                                    <Grid item>
                                                        <Grid container direction="column" justify="space-between">
                                                            <Grid item>
                                                                <Grid container spacing={1} alignItems="center">
                                                                    <Grid item>
                                                                        <OfflineBoltIcon
                                                                            className={classes.smallCardIcon}
                                                                            color="error"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Typography className={classes.cardMainText}>
                                                                            Remote allocation
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container direction="column">
                                                                    <Grid item>
                                                                        <Grid
                                                                            container
                                                                            spacing={1}
                                                                            justify="space-between"
                                                                        >
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.resolution}
                                                                                >
                                                                                    Request
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.resolutionRed}
                                                                                    color="error"
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.LISRequestCount?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.LISRequestCount?.length > 0 &&
                                                                                        handleRequestFiltter()
                                                                                    }
                                                                                >
                                                                                    {data?.LISRequestCount?.length > 0
                                                                                        ? data?.LISRequestCount[0]
                                                                                            ?.LISRequest
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Card className={classes.smalldetailCardMain}>
                                                <Grid container direction="column" spacing={1}>
                                                    <Grid item>
                                                        <Grid container direction="column" justify="space-between">
                                                            <Grid item>
                                                                <Grid container spacing={1} alignItems="center">
                                                                    <Grid item>
                                                                        <OfflineBoltIcon
                                                                            className={classes.smallCardIcon}
                                                                            color="error"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Typography className={classes.cardMainText}>
                                                                            Remote assign
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container direction="column">
                                                                    <Grid item>
                                                                        <Grid
                                                                            container
                                                                            spacing={1}
                                                                            justify="space-between"
                                                                        >
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.resolution}
                                                                                >
                                                                                    Assigned
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.resolutionRed}
                                                                                    color="error"
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.LISAssignedCount?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.LISAssignedCount?.length > 0 &&
                                                                                        handleRequestFiltter(
                                                                                            'status',
                                                                                            'type',
                                                                                            'Assigned',
                                                                                            'Assigned',
                                                                                            'Assigned'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {data?.LISAssignedCount?.length > 0
                                                                                        ? data?.LISAssignedCount[0]
                                                                                            ?.LISAssigned
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item lg={12} md={12} xs={12} style={{ marginTop: 10 }}>
                                    <Grid container spacing={4}>
                                        {cards?.map((card) => (
                                            <Grid
                                                item
                                                lg={card.name === 'Run Status Report' ? 12 : 3}
                                                md={card.name === 'Run Status Report' ? 12 : 6}
                                                sm={card.name === 'Run Status Report' ? 12 : 6}
                                                xs={card.name === 'Run Status Report' ? 12 : 12}
                                                key={card.id}
                                            >
                                                <Card
                                                    className={
                                                        card.name === 'Run Status Report'
                                                            ? classes.rootCard3
                                                            : accessableCodes?.length > 0 &&
                                                              accessableCodes?.includes(card.name)
                                                            ? classes.root
                                                            : classes.rootDisabled
                                                    }
                                                    onClick={() => handleCardClick(card.page)}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        alignContent: 'center'
                                                    }}
                                                >
                                                    <Grid container spacing={6}>
                                                        <Grid item xs={12}>
                                                            <Typography
                                                                variant="h6"
                                                                color={'primary'}
                                                                align="center"
                                                                className={classes.cardTitle}
                                                            >
                                                                {card.name}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ) : currentPage === 'return' ? (
                    <Grid item xs={9} className={classes.firstDiv}>
                        <ReturnUnits
                            // lfDeviceEvent={lfDeviceEvent}
                            accessableCodes={accessableCodes}
                            handleDeviceExit={handleDeviceExit}
                        />
                    </Grid>
                ) : currentPage === 'BulkLoading' ? (
                    <Grid item xs={9} className={classes.firstDiv}>
                        <BulkLoading
                            // lfDeviceEvent={lfDeviceEvent}
                            accessableCodes={accessableCodes}
                            handleDeviceExit={handleDeviceExit}
                        />
                    </Grid>
                ) : currentPage === 'remove' ? (
                    <Grid item xs={9} className={classes.firstDiv}>
                        <RemoveUnits
                            lfDeviceEvent={lfDeviceEvent}
                            accessableCodes={accessableCodes}
                            handleDeviceExit={handleDeviceExit}
                        />
                    </Grid>
                ) : currentPage === 'batch' ? (
                    <Grid item xs={9} className={classes.firstDiv}>
                        <BatchProducts
                            lfDeviceEvent={lfDeviceEvent}
                            accessableCodes={accessableCodes}
                            handleDeviceExit={handleDeviceExit}
                        />
                    </Grid>
                ) : currentPage === 'emergency' ? (
                    <Grid item xs={9} className={classes.firstDiv}>
                        <EmergencyUnits
                            lfDeviceEvent={lfDeviceEvent}
                            accessableCodes={accessableCodes}
                            handleDeviceExit={handleDeviceExit}
                        />
                    </Grid>
                ) : currentPage === 'bulkUnload' ? (
                    <Grid item xs={9} className={classes.firstDiv}>
                        <BulkUnload
                            // lfDeviceEvent={lfDeviceEvent}
                            accessableCodes={accessableCodes}
                            handleDeviceExit={handleDeviceExit}
                        />
                    </Grid>
                ) : currentPage === 'statusReport' ? (
                    <Grid item xs={9} className={classes.firstDiv}>
                        <StatusReport
                            lfDeviceEvent={lfDeviceEvent}
                            accessableCodes={accessableCodes}
                            handleDeviceExit={handleDeviceExit}
                            handleCardClick={handleCardClick}
                        />
                    </Grid>
                ) : currentPage === 'removeEDQs' ? (
                    <Grid item xs={9} className={classes.firstDiv}>
                        <EdqsUnits
                            lfDeviceEvent={lfDeviceEvent}
                            accessableCodes={accessableCodes}
                            handleDeviceExit={handleDeviceExit}
                        />
                    </Grid>
                                                ) : currentPage === 'removeEDQsBatch' ? (
                                                    <Grid item xs={9} className={classes.firstDiv}>
                                                        <EdqsBatch
                                                            lfDeviceEvent={lfDeviceEvent}
                                                            accessableCodes={accessableCodes}
                                                            handleDeviceExit={handleDeviceExit}
                                                        />
                                                    </Grid>
                                                ) 
                                                    : currentPage === 'bulkLoadUnload' ? (
                    <Grid item xs={9} className={classes.firstDiv}>
                        <BulkLoadAndUnload
                            lfDeviceEvent={lfDeviceEvent}
                            accessableCodes={accessableCodes}
                            handleDeviceExit={handleDeviceExit}
                        />
                    </Grid>
                ) : (
                    ''
                )}
                <Grid item className={classes.sideBar}>
                    <Grid container justify="center" style={{ marginTop: '25px' }} spacing={2} direction="column">
                        <Grid item sm={12} md={12} lg={12}>
                            <Grid item>
                                <Typography style={{ fontWeight: 300 }} variant="h5" className={classes.tipsTypo}>
                                    TIPS
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" className={classes.tipsTypoBlue}>
                                    {currentPage === 'remove'
                                        ? 'Remove Unit'
                                        : currentPage === 'return'
                                        ? 'Return Unit'
                                        : currentPage === 'emergency'
                                        ? 'Emergency Unit'
                                        : currentPage === 'batch'
                                        ? 'Batch Products'
                                        : currentPage === 'bulkUnload'
                                        ? 'Bulk Unload'
                                        : currentPage === 'BulkLoading'
                                        ? 'Bulk Load'
                                        : currentPage === 'bulkLoadUnload'
                                        ? 'Bulk Load & Unload'
                                        : currentPage === 'statusReport'
                                        ? 'Status Report'
                                        : currentPage === 'removeEDQs'
                                        ? 'EDQs Units and Batches'
                                        : 'Select Action'}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" className={classes.tipsTypo}>
                                    {currentPage === 'remove'
                                        ? 'Enter MRN Number of Receipant & choose no of units & Remove the Listed Units on the left side'
                                        : currentPage === 'return'
                                        ? 'Return the Units'
                                        : currentPage === 'emergency'
                                        ? 'Emergency Unit'
                                        : currentPage === 'batch'
                                        ? 'Batch Products'
                                        : currentPage === 'bulkUnload'
                                        ? 'Unload the required units'
                                        : currentPage === 'BulkLoading'
                                        ? 'Load the units'
                                        : currentPage === 'bulkLoadUnload'
                                        ? 'Bulk Load & Unload'
                                        : currentPage === 'statusReport'
                                        ? 'Status Report'
                                        : currentPage === 'removeEDQs'
                                        ? 'EDQs Units and Batches'
                                        : 'Select Any one of the Actions'}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" className={classes.tipsTypo}></Typography>
                            </Grid>
                            {isErrorUnits ? (
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        marginTop: 40,
                                        marginBottom: -30
                                    }}
                                >
                                    <CustomButton
                                        width="100%"
                                        onClick={handleUnlockFridgeClick}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Unlock Fridge
                                    </CustomButton>
                                    {/*<Route path="/" onEnter={onUserNavigate} onChange={onUserNavigate}>*/}
                                    {/*</Route>*/}
                                </Grid>
                            ) : (
                                <></>
                            )}
                            <Grid item xs={12}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginTop: 40
                                    }}
                                >
                                    <CustomButton
                                        width="290%"
                                        onClick={handleDeviceExit}
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Exit
                                    </CustomButton>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* {!isLoggedInDevice && <DeviceLogin open={deviceLogin} setOpenLogin={setDeviceLogin} noAuth={true} />} */}
        </>
    );
};

export default AccessDevicePage;
