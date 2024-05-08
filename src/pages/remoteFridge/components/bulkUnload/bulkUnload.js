import React, { useState, useEffect } from 'react';
import {
    Grid,
    InputLabel,
    Typography,
    Paper,
    Card,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    CircularProgress
} from '@material-ui/core';
import { CustomButton, DatePicker } from 'common';
import { useStyles } from './style';
import { CustomInput, SelectOption } from 'components';
import TimerIcon from '@material-ui/icons/Timer';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { units } from './data';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import lockIcon from '../../../../assets/lockIcon3.png';
import ExpandableCard from '../expandableCard';
import WarningIcon from '@material-ui/icons/Warning';
import GoodBatchComponent from '../goodBatchComponent';

import {
    clearData,
    clearDropDown,
    clearPostResponse,
    createAlert,
    getData,
    getDropDown,
    postFormData,
    socketSessionIdAction
} from 'redux/actions';
import { clearResponseData, getResData } from 'redux/actions/scGenericApiCalls';
import { deviceLogout } from 'redux/actions/auth/authActions';
import moment from 'moment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useHistory } from 'react-router-dom';
import GoodUnits from '../goodUnitsComponent';
import GoodBatchCompo from '../goodBatchCompo';
import { getDate } from 'date-fns';

const BulkUnload = (props) => {
    const { handleDeviceExit, lfDeviceEvent } = props;
    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    let accessDeviceName = JSON.parse(localStorage.getItem('accessDeviceName'))?.toUpperCase();
    console.log("access--", accessDeviceName);
    let deviceName = JSON.parse(localStorage.getItem('deviceName'))?.toUpperCase();
    const [screen, setScreen] = useState(2);
    const [counter, setCounter] = useState(40);
    const genderOptions = [
        { name: 'Male', value: 'Male' },
        { name: 'Female', value: 'Female' },
        { name: 'Other', value: 'Other' }
    ];
    const [mrn, setMrn] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [recepientId, setRecepientId] = useState('');
    const { options } = useSelector((state) => state.getDropDown);
    const { resLoading, resData } = useSelector((state) => state.getResponseData);
    const { postLoading, postResponse, postError } = useSelector((state) => state.postFormFields);
    const [isGoodUnits, setIsGoodUnits] = useState(false);
    console.log('isgoodunits', isGoodUnits)
    const [isErrorUnits, setIsErrorUnits] = useState(false);
    console.log("error------",isErrorUnits)
    const [isDoorLocked, setIsDoorLocked] = useState(false);
    console.log('isDoorLocked', isDoorLocked)
    const [errorRows, setErrorRows] = useState();
    const [redirectCounter, setRedirectCounter] = useState(5);
    const [goodUnits, setGoodUnits] = useState([]);
    const [badUnits, setBadUnits] = useState([]);
    console.log('badunitssss', badUnits?.length)
    const [goodBatchData, setGoodBatchData] = useState([]);
    const [badbatch, setBadBatch] = useState([]);
    const socket = useSelector((state) => state.socketReducer.socket);
    const { dateFormat } = useSelector((state) => state.dateFormat);
    const [resetBoolean, setResetBoolean] = useState(false);
    const [startCounter, setStartCounter] = useState(true);
    const [showTimer, setShowTimer] = useState(false);
    const [unit, setUnit] = useState();
    console.log("unit------", unit)
    const [batch, setBatch] = useState();
    console.log('batch----', batch)

    const redirectTORDashBoard = () => {
        handleDeviceExit();
        setStartCounter(false);
        dispatch(deviceLogout());
        setGoodUnits([]);
        setBadUnits([]);
        setIsErrorUnits(false);
        setIsGoodUnits(false);
        setIsDoorLocked(false);
       // history?.push('/dashboard/remote-dashboard');
    };

   

    useEffect(() => {
        if (badUnits?.length === 0 && isErrorUnits) {
            setIsErrorUnits(false);
            setIsDoorLocked(true);
        }
    }, [goodUnits, badUnits, goodBatchData]);

    useEffect(() => {
        dispatch(getDropDown('bloodGroup'));
        return () => {
            dispatch(clearData());
            dispatch(clearPostResponse());
            dispatch(clearDropDown());
        };
    }, []);

    const handleDecrimentCounter = () => {
        if (resetBoolean) {
            setResetBoolean(false);
            setCounter(40);
        } else {
            setCounter(counter - 1);
        }
    };
    console.log('counter--',counter)
    useEffect(() => {
        counter > 0 && startCounter && !isDoorLocked && setTimeout(() => handleDecrimentCounter(), 1000);
       
        if (counter === 39 && devDeviceId?.deviceTypeId?.[0]?.name?.toLowerCase()?.includes('lf')) {
            lfDeviceEvent();
        }
        if (!isDoorLocked && counter === 0) {
            isErrorUnits && setIsErrorUnits(false);
            setIsDoorLocked(true);
        }
    }, [counter, startCounter]);

    useEffect(() => {
        // isGoodUnits && redirectCounter > 0 && setTimeout(() => setRedirectCounter(redirectCounter - 1), 1000);
        //isErrorUnits && setRedirectCounter(5);
        if (isGoodUnits) {

            setCounter(0);
        }
        if (isErrorUnits) { setCounter(60); }
        if (isDoorLocked && redirectCounter > 0) {
            setTimeout(() => setRedirectCounter(redirectCounter - 1), 1000);
        }
        if (redirectCounter === 0) {
            redirectTORDashBoard();
        }
    }, [redirectCounter, isErrorUnits, isGoodUnits, isDoorLocked]);

    // const handleCompleteButtonClick = () => {
    //     setScreen(1);
    // };

    // const handleSkipButtonClick = () => {
    //     setStartCounter(true);
    //     setScreen(2);
    // };

    const handleMRNChange = (e) => {
        console.log(e.target.value, 'search mrn');
        setMrn(e.target.value);
    };
    useEffect(() => {
        console.log(mrn, 'in useEffect');
        if (mrn?.length > 3) {
            dispatch(getResData('recipient', JSON.stringify([{ key: 'mrnNumber', value: mrn }])));
        }
        if (mrn?.length === 0) {
            dispatch(clearResponseData());
            setMrn('');
            setFirstName('');
            setLastName('');
            setDob(null);
            setGender('');
            setBloodGroup('');
        }
    }, [mrn]);
    useEffect(() => {
        if (resData?.data?.length !== 0 && mrn?.length > 3) {
            setMrn(resData?.data?.[0]?.mrnNumber);
            setFirstName(resData?.data?.[0]?.firstName);
            setLastName(resData?.data?.[0]?.lastName);
            setDob(resData?.data?.[0]?.dob);
            setGender(resData?.data?.[0]?.gender?.charAt(0)?.toUpperCase() + resData?.data?.[0]?.gender?.slice(1));
            setBloodGroup(resData?.data?.[0]?.bloodgroupId?.[0]?._id);
            setRecepientId(resData?.data?.[0]?._id);
        }
    }, [resData]);

    // const handleContinueClick = () => {
    //     setStartCounter(true);
    //     if (resData?.data?.length !== 0 && mrn?.length > 3) {
    //         setScreen(2);
    //     } else {
    //         let formObj = {};
    //         formObj.mrnNumber = mrn;
    //         formObj.firstName = firstName;
    //         formObj.lastName = lastName;
    //         formObj.gender = gender;
    //         formObj.dob = dob;
    //         formObj.bloodgroupId = bloodGroup;
    //         let FormObject = {};
    //         FormObject.collectionName = 'recipient';
    //         FormObject.validData = formObj;
    //         let json = JSON.stringify(FormObject);
    //         dispatch(postFormData(json));
    //     }
    // };
    useEffect(() => {
        // postLoading === false && setAlertOpen(true);
        if (postResponse?.status === true) {
            setRecepientId(postResponse?.data?._id);
            setScreen(2);
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'Recipient Added Successfully',
                    alertType: 'success'
                })
            );
        }
        if (postError?.status === false) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'Failed to Add Recipient',
                    alertType: 'error'
                })
            );
        }
        setTimeout(() => {
            postResponse?.status && dispatch(clearPostResponse());
        }, 4000);
    }, [postError, postResponse]);


   

    useEffect(() => {
        socket?.on('deviceActivity', (data) => {
            console.log("datas----",data)
            dispatch(socketSessionIdAction({ _id: data?.sessionData?._id }));
            console.log('My Socket >> deviceActivity>>> bulk unload', data);
            setUnit(data?.badData?.map((item) => item.ErrorTypeOfUnit));
            setBatch(data?.badBatchData?.map((item) => item.ErrorTypeOfUnit))
            if (data?.badData?.length > 0 || data?.badBatchData?.length > 0) {
                console.log("bad>>>>>>>>>>>>")
                setBadUnits(data?.badData);
                setBadBatch(data?.badBatchData);
                setResetBoolean(true);
                setIsErrorUnits(true);
                setIsGoodUnits(false);
                setRedirectCounter(60);
            } else if ((badUnits.length === 0 && data?.goodData?.length > 0 || data?.goodBatchData?.length > 0) && data?.badData?.length === 0) {
                console.log('goodUnit>>>>>>>>>>>');
                setGoodUnits(data?.goodData);
                setGoodBatchData(data?.goodBatchData);
                setIsErrorUnits(false);
                setIsGoodUnits(true);
                setRedirectCounter(60);
            }
            setBadUnits(data?.badData);
            console.log("badData", data?.badData)
            setGoodUnits(data?.goodData);
            console.log("good", data?.goodData)
            setBadBatch(data?.badBatchData);
            console.log("badbatch", data?.badBatchData)
            setGoodBatchData(data?.goodBatchData);
            console.log("goodbatchdata", goodBatchData)

            const uniqBadBatch = {};
            const badBatchData = data?.badBatchData?.filter(
                (obj) => !uniqBadBatch[obj?.batch?._id] && (uniqBadBatch[obj?.batch?._id] = true)
            );
            setBadBatch(badBatchData);
        });
    }, [socket]);
    const handleExpandClick = (id) => {
        let tempBadUnits = [];
        if (id.isExpanded) {
            tempBadUnits = badUnits?.map((i) => {
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
    useEffect(() => {
        console.log(badUnits, badbatch, isErrorUnits, 'in the useEffect>>>>>>>>>>');
        if (badUnits?.length === 0 && badbatch?.length === 0 && isErrorUnits) {
            // setIsErrorUnits(false);
            setIsDoorLocked(true);
        }
    }, [goodUnits, badUnits, badbatch, goodBatchData]);

    
    return (
        <>
            
            {screen === 2 && !isGoodUnits && badUnits?.length === 0 && !isDoorLocked ? (
                <>
                    {console.log('we are at 310')}
                    <Paper
                        elevation={0}
                        style={{ padding: 20, width: '100%', height: 'fit-content', borderRadius: '10px' }}
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
                            // direction="column"
                            alignItems="center"
                            className={classes.returnMainGrid}
                        >
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h4" align="center" className={classes.returnText}>
                                        Remove the required number of Units & Batches
                                    </Typography>
                                    <Typography variant="h4" align="center" className={classes.returnText}>
                                        from {accessDeviceName}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h6" align="center" className={classes.returnText}>
                                        Please open {accessDeviceName} door.
                                    </Typography>
                                    <Typography variant="h6" align="center" className={classes.returnText}>
                                        You have 40 seconds to perform this action
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                    <TimerIcon />
                                    <Typography variant="body1">TIME LEFT:</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography color={counter < 11 ? 'error' : 'initial'} className={classes.counter}>
                                    {counter}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            ) : isErrorUnits && badbatch?.length > 0 ? (
                <>
                    {console.log('we are at 619')}
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
                                                        {badbatch?.length} out of{' '}
                                                        {badbatch?.length + goodBatchData?.length} batch product
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
                                                            deviceBatchSuccess={badbatch}
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
            ): isErrorUnits && badUnits?.length > 0 ? (
                    <Grid container direction="column" spacing={2}>
                        {console.log('we are at 374')}
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
            )  : isGoodUnits && badUnits?.length === 0 && !isErrorUnits && goodUnits?.length > 0 || goodBatchData?.length === 0 ? (
                        <GoodUnits goodUnits={goodUnits} redirectCounter={redirectCounter} isGoodUnits />
            ) : isGoodUnits && badUnits?.length === 0 && !isErrorUnits && goodUnits?.length === 0 || goodBatchData?.length > 0 ? (
                <>
                                <GoodBatchCompo
                                    isGoodUnits  
                        showTimer={true}
                        goodBatchData={goodBatchData}
                        redirectCounter={redirectCounter}
                        getDate={getDate}
                        onlyGoodBatch={true}
                    />
                </>
            ) : isGoodUnits && badUnits?.length === 0 && !isErrorUnits && goodUnits?.length > 0 || goodBatchData?.length > 0 ? (
                                <Grid style={{ display: 'flex', backgroundColor: 'white' }}>
                                    {console.log('we are at 495')}
                                    <GoodUnits goodUnits={goodUnits} redirectCounter={redirectCounter} isGoodUnits />
                                    <GoodBatchCompo
                                        isGoodUnits  
                        showTimer={false}
                        goodBatchData={goodBatchData}
                        redirectCounter={redirectCounter}
                        getDate={getDate}
                    />
                </Grid>
                            ) : isErrorUnits && badUnits?.length > 0 && badbatch?.length > 0 ? (
                                    <Grid container direction="column" spacing={2}>
                                        {console.log('we are at 506')}
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
                                                                        {badbatch?.length} out of{' '}
                                                                        {badbatch?.length + goodBatchData?.length} batch product needs
                                                                    to be removed
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Grid item xs={12}>
                                                                    <GoodBatchComponent
                                                                            deviceBatchSuccess={badbatch}
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
                            )  : isDoorLocked ? (
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

export default BulkUnload;
