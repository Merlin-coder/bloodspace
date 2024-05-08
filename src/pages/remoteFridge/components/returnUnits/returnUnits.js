import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import WarningIcon from '@material-ui/icons/Warning';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import openDoor from '../../../../assets/openDoor.png';
import TimerIcon from '@material-ui/icons/Timer';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useStyles } from './style';
import { wrongUnits } from './data';
import lockIcon from '../../../../assets/lockIcon3.png';
import { useDispatch, useSelector } from 'react-redux';
import { deviceLogout } from 'redux/actions/auth/authActions';
import { useHistory } from 'react-router-dom';
import ExpandableCard from '../expandableCard';
import { getRemoteAccessDevice, socketSessionIdAction } from 'redux/actions';
import moment from 'moment';
import GoodUnits from '../goodUnitsComponent';
import beep from 'common/services/beepSound';
import GoodBatchComponent from '../goodBatchComponent';
import { dummyData } from './data';
import GoodBatchCompo from '../goodBatchCompo';

const ReturnUnits = (props) => {
    const { handleDeviceExit, lfDeviceEvent } = props;
    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    let accessDeviceName = JSON.parse(localStorage.getItem('accessDeviceName'))?.toUpperCase();

    const { dateFormat } = useSelector((state) => state.dateFormat);
    const [counter, setCounter] = useState(40);
    const [isGoodUnits, setIsGoodUnits] = useState(false);
    const [isErrorUnits, setIsErrorUnits] = useState(false);
    const [isDoorLocked, setIsDoorLocked] = useState(false);
    const [errorRows, setErrorRows] = useState();
    const [redirectCounter, setRedirectCounter] = useState(5);
    const [goodUnits, setGoodUnits] = useState([]);
    const [badUnits, setBadUnits] = useState([]);
    console.log('baddddd', badUnits)
    const socket = useSelector((state) => state.socketReducer.socket);
    const [resetBoolean, setResetBoolean] = useState(false);
    const [goodBatchData, setGoodBatchData] = useState([]);
    const [badBatchData, setBadBatchData] = useState([]);
    console.log('badbatchhhh', badBatchData)

    const handleDecrimentCounter = () => {
        if (resetBoolean) {
            setResetBoolean(false);
            setCounter(40);
        } else {
            setCounter(counter - 1);
        }
    };

    useEffect(() => {
        counter > 0 && !isDoorLocked && setTimeout(() => handleDecrimentCounter(), 1000);
        if (counter === 39 && devDeviceId?.deviceTypeId?.[0]?.name?.toLowerCase()?.includes('lf')) {
            //lfDeviceEvent();
        }
        if (!isDoorLocked && counter === 0) {
            isErrorUnits && setIsErrorUnits(false);
            setIsDoorLocked(true);
        }
    }, [counter]);

    const redirectTORDashBoard = () => {
        handleDeviceExit(); 0
        3 
        dispatch(deviceLogout());
        setGoodUnits([]);
        setBadUnits([]);
        setIsErrorUnits(false);
        setIsGoodUnits(false);
        setIsDoorLocked(false);
        // history?.push('/dashboard/remote-dashboard');
    };
    console.log('counter', counter);
    useEffect(() => {
        //isGoodUnits && redirectCounter > 0 && setTimeout(() => setRedirectCounter(redirectCounter - 1), 1000);
        if (isGoodUnits) {

            setCounter(0);
        }
        if (isErrorUnits) { setCounter(5); }
        // if (isErrorUnits) {
        //     setTimeout(() => {
        //         setIsErrorUnits(false);
        //         setIsGoodUnits(true);
        //     }, 40000);
        // }
        if (isDoorLocked && redirectCounter > 0) {
            setTimeout(() => setRedirectCounter(redirectCounter - 1), 1000);
        }
        if (redirectCounter === 0) {
            redirectTORDashBoard();
        }
    }, [redirectCounter, isErrorUnits, isGoodUnits, isDoorLocked]);

    const [unit, setUnit] = useState();
    console.log("unit------", unit)
    const [batch, setBatch] = useState();
    console.log('batch---', batch);

    useEffect(() => {
        socket?.on('deviceActivity', (data) => {
            console.log("data--", data)
            // const data = dummyData;
            // console.log('data>>>>>>>>>>>>>>>>', data);
            dispatch(socketSessionIdAction({ _id: data?.sessionData?._id }));
            setUnit(data?.badData?.map((item) => item?.ErrorTypeOfUnit));
            setBatch(data?.badBatchData?.map((item) => item?.ErrorTypeOfUnit));
            console.log('My Socket >> deviceActivity>>> bulk loading', data);
            if (data?.badData?.length > 0 || data?.badBatchData?.length > 0) {
                console.log('if>>>>>>>>>>');
                beep();
                console.log('badUnit>>>>>>>>>>>');
                setResetBoolean(true);
                setIsErrorUnits(true);
                setIsGoodUnits(false);
                setBadUnits(data?.badData);
                setRedirectCounter(60);
                // const uniqBadBatch = {};
                // const badBatchData = data?.badBatchData.filter(
                //     (obj) => !uniqBadBatch[obj.batch._id] && (uniqBadBatch[obj.batch._id] = true)
                // );
                setBadBatchData(data?.badBatchData);
                //setRedirectCounter(30);
            } else if (
                (data?.goodData?.length > 0 || data?.goodBatchData?.length > 0) &&
                (data?.badData?.length === 0 || data?.badBatchData?.length === 0)

            ) {
                console.log('else>>>>>>>>>>>');
                setIsErrorUnits(false);
                setIsGoodUnits(true);
                setRedirectCounter(60);
                //setGoodUnits(data?.goodData);
                //setGoodBatchData(data?.goodBatchData);
            }
            console.log('outside', data?.goodData, data?.goodBatchData, data?.badData, data?.badBatchData);
            console.log("Good  Units = " + data?.goodData);
            console.log("Bad  Units  = " + data?.badData);
            setBadUnits(data?.badData);
            setGoodUnits(data?.goodData);

            const uniqGoodBatch = {};
            const goodBatchData = data?.goodBatchData?.filter(
                (obj) => !uniqGoodBatch[obj?.batch?._id] && (uniqGoodBatch[obj?.batch?._id] = true)
            );
            setGoodBatchData(goodBatchData);
            const uniqBadBatch = {};
            const badBatchData = data?.badBatchData?.filter(
                (obj) => !uniqBadBatch[obj?.batch?._id] && (uniqBadBatch[obj?.batch?._id] = true)
            );
            setBadBatchData(badBatchData);
        });

        //socket.on('deviceDoorStatusUpdate', (data) => {
        //    console.log('deviceDoorStatusUpdate----', data);
        //    if (data.status === "CLOSE") {
        //        redirectTORDashBoard();
        //    }

        //});


    }, [socket]);

    useEffect(() => {
        console.log(badUnits, badBatchData, isErrorUnits, 'in the useEffect>>>>>>>>>>');
        if (badUnits?.length === 0 && badBatchData?.length === 0 && isErrorUnits) {
            // setIsErrorUnits(false);
            setIsDoorLocked(true);
        }
    }, [goodUnits, badUnits, badBatchData, goodBatchData]);

    // useEffect(() => {
    //     const data = dummyData;
    //     setBadUnits(data?.badData);
    //     setGoodUnits(data?.goodData);
    //     const uniqGoodBatch = {};
    //     const goodBatchData = data?.goodBatchData.filter(
    //         (obj) => !uniqGoodBatch[obj.batch._id] && (uniqGoodBatch[obj.batch._id] = true)
    //     );
    //     setGoodBatchData(data?.goodBatchData);

    //     const uniqBadBatch = {};
    //     const badBatchData = data?.badBatchData.filter(
    //         (obj) => !uniqBadBatch[obj.batch._id] && (uniqBadBatch[obj.batch._id] = true)
    //     );
    //     setBadBatchData(data?.badBatchData);
    // }, []);
    const handleExpandClick = (id) => {
        let tempBadUnits = [];
        if (id.isExpanded) {
            tempBadUnits = badUnits.map((i) => {
                if (i?.refSku?.donationCode === id?.refSku?.donationCode) {
                    return { ...id, isExpanded: false };
                } else {
                    return i;
                }
            });
        } else {
            tempBadUnits = badUnits.map((i) => {
                if (i?.refSku?.donationCode === id?.refSku?.donationCode) {
                    return { ...id, isExpanded: true };
                } else {
                    return i;
                }
            });
        }
        setBadUnits(tempBadUnits);
    };

    const getDate = (d) => {
        let date = new Date(d);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        console.log(year + '-' + month + '-' + dt);
        return dt + '-' + month + '-' + year;
    };


    return (
        <>
            {isGoodUnits && goodUnits?.length > 0 && goodBatchData?.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '66% 33%', backgroundColor: 'white' }}>
                    <GoodUnits
                        goodUnits={goodUnits}
                        redirectCounter={redirectCounter}
                        isGoodUnits
                        deviceBatchSuccess={goodBatchData}
                        bulkLoad={true}
                    />
                    <div style={{ marginTop: '5%' }}>
                        <GoodBatchComponent
                            deviceBatchSuccess={goodBatchData}
                            redirectCounter={redirectCounter}
                            getDate={getDate}
                            isGoodUnits
                            bulkLoad={true}
                        />
                    </div>
                </div>
            ) : isGoodUnits && goodBatchData?.length > 0 ? (
                <GoodBatchCompo
                    goodBatchData={goodBatchData}
                    redirectCounter={redirectCounter}
                    getDate={getDate}
                    isGoodUnits
                    bulkLoad={true}
                    onlyGoodBatch={true}
                />
            ) : isGoodUnits && goodUnits?.length > 0 ? (
                <>
                    {console.log('Load Good Units')}
                    <GoodUnits bulkLoad={true} goodUnits={goodUnits} redirectCounter={redirectCounter} isGoodUnits />
                </>
            ) : isErrorUnits && badUnits?.length > 0 && badBatchData?.length > 0 ? (
                <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={0} style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <WarningIcon fontSize="large" className={classes.warningIcon} />{' '}
                            <Typography variant="h5" className={classes.successText}>
                                WARNING: SOMETHING WENT WRONG
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.warningPaper} elevation={0}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Paper className={classes.errorSmallPaper} elevation={0}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Typography className={classes.cardWarningText}>
                                                    {badUnits?.length} out of {badUnits?.length + goodUnits?.length}{' '}
                                                    units needs to be removed
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                {badUnits?.map((unit) => (
                                                    <Grid key={unit.id} item xs={4} style={{}}>
                                                        <ExpandableCard
                                                            setRows={setErrorRows}
                                                            rows={errorRows}
                                                            unit={unit}
                                                            isError
                                                            handleExpandClick={handleExpandClick}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                <Grid item>
                                    <Paper className={classes.errorSmallPaper2} elevation={0}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Typography className={classes.cardWarningText}>
                                                    {badBatchData?.length} out of{' '}
                                                    {badBatchData?.length + goodBatchData?.length} batch product needs
                                                    to be removed
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid item xs={12}>
                                                    <GoodBatchComponent
                                                        deviceBatchSuccess={badBatchData}
                                                        redirectCounter={redirectCounter}
                                                        getDate={getDate}
                                                        isError2
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Grid item>
                                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40 }}>
                                            <Typography align="center" className={classes.returnErrorTextBulk}>
                                                Please remove listed unit(s)
                                            </Typography>
                                            <Typography align="center" className={classes.returnErrorTextBulk}>
                                                The door is being released
                                            </Typography>
                                            <Typography align="center" className={classes.returnErrorTextBulk}>
                                                remove Bad Units from
                                            </Typography>
                                            <Typography align="center" c className={classes.returnErrorTextBulk}>
                                                {accessDeviceName}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '10vh',
                                                width: '19vw'
                                            }}
                                        >
                                            <TimerIcon style={{ color: '#fff' }} />
                                            <Typography style={{ color: '#fff' }} variant="body1">
                                                TIME LEFT:
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Typography
                                            color={counter < 11 ? 'error' : 'initial'}
                                            className={classes.errorCounter}
                                        >
                                            {counter}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            ) : isErrorUnits && badUnits?.length > 0 ? (
                <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={0} style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <WarningIcon fontSize="large" className={classes.warningIcon} />{' '}
                            <Typography variant="h5" className={classes.successText}>
                                WARNING: SOMETHING WENT WRONG
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.warningPaper} elevation={0}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Paper className={classes.errorSmallPaper} elevation={0}>
                                        <Typography className={classes.cardWarningText}>
                                            {badUnits?.length} out of {badUnits?.length + goodUnits?.length} units needs
                                            to be {unit}
                                        </Typography>

                                        {badUnits?.map((unit) => (
                                            <Grid key={unit.id} item xs={4} style={{}}>
                                                <ExpandableCard
                                                    setRows={setErrorRows}
                                                    rows={errorRows}
                                                    unit={unit}
                                                    isError
                                                    handleExpandClick={handleExpandClick}
                                                />
                                            </Grid>
                                        ))}
                                    </Paper>
                                </Grid>
                                <Grid item xs={7}>
                                    <Grid
                                        container
                                        spacing={3}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        style={{ padding: 40, width: 800 }}
                                    >
                                        <Grid item>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 20
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 5
                                                    }}
                                                >
                                                    <Typography align="center" className={classes.returnErrorText}>
                                                        Please {unit} listed unit(s) on the left
                                                    </Typography>
                                                    <Typography align="center" className={classes.returnErrorText}>
                                                        from {accessDeviceName}
                                                    </Typography>
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 5
                                                    }}
                                                >
                                                    <Typography align="center" className={classes.returnErrorNextText}>
                                                        The door has been released…
                                                    </Typography>
                                                    <Typography align="center" className={classes.returnErrorNextText}>
                                                        You have 40 seconds to perform this action
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <TimerIcon style={{ color: '#fff' }} />
                                                <Typography style={{ color: '#fff' }} variant="body1">
                                                    TIME LEFT:
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                color={counter < 11 ? 'error' : 'initial'}
                                                className={classes.errorCounter}
                                            >
                                                {counter}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            ) : isErrorUnits && badBatchData?.length > 0 ? (
                <>
                    {console.log('we are at 390')}
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={0} style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <WarningIcon fontSize="large" className={classes.warningIcon} />{' '}
                                <Typography variant="h5" className={classes.successText}>
                                    WARNING: SOMETHING WENT WRONG
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.warningPaper} elevation={0}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                        <Paper
                                            className={classes.errorSmallPaper2}
                                            elevation={0}
                                            style={{ width: '150%' }}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography className={classes.cardWarningText}>
                                                        {badBatchData?.length} out of{' '}
                                                        {badBatchData?.length + goodBatchData?.length} batch product
                                                        needs to be {batch}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}
                                                >
                                                    {/* {badBatchData?.map((unit) => ( */}
                                                    <Grid item xs={12}>
                                                        <GoodBatchComponent
                                                            deviceBatchSuccess={badBatchData}
                                                            redirectCounter={redirectCounter}
                                                            getDate={getDate}
                                                            isError2
                                                        />
                                                    </Grid>
                                                    {/* ))} */}
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Grid
                                            container
                                            spacing={3}
                                            direction="column"
                                            alignItems="center"
                                            justifyContent="center"
                                            style={{ padding: 40, width: 980 }}
                                        >
                                            <Grid item>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 20
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 5
                                                        }}
                                                    >
                                                        <Typography align="center" className={classes.returnErrorText}>
                                                            Please {batch} listed unit(s) on the left
                                                        </Typography>
                                                        <Typography align="center" className={classes.returnErrorText}>
                                                            from {accessDeviceName}
                                                        </Typography>
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 5
                                                        }}
                                                    >
                                                        <Typography
                                                            align="center"
                                                            className={classes.returnErrorNextText}
                                                        >
                                                            The door has been released…
                                                        </Typography>
                                                        <Typography
                                                            align="center"
                                                            className={classes.returnErrorNextText}
                                                        >
                                                            You have 40 seconds to perform this action
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <TimerIcon style={{ color: '#fff' }} />
                                                    <Typography style={{ color: '#fff' }} variant="body1">
                                                        TIME LEFT:
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    color={counter < 11 ? 'error' : 'initial'}
                                                    className={classes.errorCounter}
                                                >
                                                    {counter}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </>
            ) : isDoorLocked ? (
                <Paper elevation={0} style={{ width: '100%', height: 'fit-content', borderRadius: '10px' }}>
                    <Grid
                        container
                        spacing={4}
                        direction="column"
                        alignItems="center"
                        className={classes.returnMainGrid}
                    >
                        <Grid item>
                            <div className={classes.lockContainer}>
                                <img src={lockIcon} alt="door" />
                                <Typography variant="h4" color="primary">
                                    Door Locked
                                </Typography>
                            </div>
                        </Grid>

                        <Grid item>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h4" align="center" className={classes.returnText}>
                                    <span style={{ color: '#046474e', fontWeight: 'bold' }}>Time over.</span> The door
                                    was automatically locked.
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                <Typography variant="body1">
                                    You will be redirected to Home Screen in {redirectCounter} seconds.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                <>
                    <Paper
                        elevation={0}
                        style={{ paddingTop: 20, width: '100%', height: 'fit-content', borderRadius: '10px' }}
                    >
                        <Grid container className={classes.actionGrid}>
                            <Grid
                                item
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}
                            >
                                <Typography variant="body1">
                                    {' '}
                                    <SubdirectoryArrowRightIcon />{' '}
                                </Typography>
                                <Typography variant="body1">ACTION REQUIRED</Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            spacing={4}
                            direction="column"
                            alignItems="center"
                            className={classes.returnMainGrid}
                        >
                            <Grid item>
                                <img src={openDoor} alt="door" />
                            </Grid>
                            <Grid item>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h4" align="center" className={classes.returnText}>
                                        The door is being released for you.
                                    </Typography>
                                    <Typography variant="h4" align="center" className={classes.returnText}>
                                        Please load unit(s) / batch(es) to the {accessDeviceName} and close the door.
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                    <TimerIcon />
                                    <Typography variant="body1">TIME LEFT:</Typography>
                                </div>
                            </Grid>
                            <Grid item>
                                <Typography color={counter < 11 ? 'error' : 'initial'} className={classes.counter}>
                                    {counter}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            )}
        </>
    );
};

export default ReturnUnits;
