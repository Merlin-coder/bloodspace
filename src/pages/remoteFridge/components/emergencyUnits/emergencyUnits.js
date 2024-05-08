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
import lockIcon from '../../../../assets/lockIcon3.png';
import WarningIcon from '@material-ui/icons/Warning';
import ExpandableCard from '../expandableCard';
import { CustomButton, DatePicker } from 'common';
import { useStyles } from './style';
import { CustomInput, SelectOption } from 'components';
import TimerIcon from '@material-ui/icons/Timer';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { units } from './data';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
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

const EmergencyUnits = (props) => {
    const { handleDeviceExit, accessableCodes, lfDeviceEvent } = props;
    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    let deviceName = JSON.parse(localStorage.getItem('accessDeviceName'))?.toUpperCase();
    const [screen, setScreen] = useState(0);
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
    console.log('res---',resData)
    const { postLoading, postResponse, postError } = useSelector((state) => state.postFormFields);
    const [isGoodUnits, setIsGoodUnits] = useState(false);
    const [isErrorUnits, setIsErrorUnits] = useState(false);
    const [isDoorLocked, setIsDoorLocked] = useState(false);
    const [errorRows, setErrorRows] = useState();
    const [redirectCounter, setRedirectCounter] = useState(5);
    const [goodUnits, setGoodUnits] = useState([]);
    const [badUnits, setBadUnits] = useState([]);
    const socket = useSelector((state) => state.socketReducer.socket);
    const { dateFormat } = useSelector((state) => state.dateFormat);


    const redirectTORDashBoard = () => {
        if (postResponse?.status) {
            dispatch(clearPostResponse());
        }
        if (postError) {
            dispatch(clearPostResponse());
        }
        handleDeviceExit();
        setStartCounter(false);
        dispatch(deviceLogout());
        setGoodUnits([]);
        setBadUnits([]);
        setIsErrorUnits(false);
        setIsGoodUnits(false);
        setIsDoorLocked(false);
        history?.push('/dashboard/remote-dashboard');
    };

    useEffect(() => {
        isGoodUnits && redirectCounter > 0 && setTimeout(() => setRedirectCounter(redirectCounter - 1), 1000);
        isErrorUnits && setRedirectCounter(5);
        if (isDoorLocked && redirectCounter > 0) {
            setTimeout(() => setRedirectCounter(redirectCounter - 1), 1000);
        }
        if (redirectCounter === 0) {
            redirectTORDashBoard();
        }
    }, [redirectCounter, isErrorUnits, isGoodUnits, isDoorLocked]);

    useEffect(() => {
        if (badUnits?.length === 0 && isErrorUnits) {
            setIsErrorUnits(false);
            setIsDoorLocked(true);
        }
    }, [goodUnits, badUnits]);

    useEffect(() => {
        dispatch(getDropDown('bloodGroup'));
        return () => {
            dispatch(clearData());
            dispatch(clearPostResponse());
            dispatch(clearDropDown());
        };
    }, []);

    const [resetBoolean, setResetBoolean] = useState(false);
    const [startCounter, setStartCounter] = useState(false);

    const handleDecrimentCounter = () => {
        if (resetBoolean) {
            setResetBoolean(false);
            setCounter(40);
        } else {
            setCounter(counter - 1);
        }
    };

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

    const handleCompleteButtonClick = () => {
        setScreen(1);
    };

    const handleSkipButtonClick = () => {
        setStartCounter(true);
        setScreen(2);
    };

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
        if (resData !== undefined && resData?.data?.length !== 0) {
            setMrn(resData?.data?.[0]?.mrnNumber);
            setFirstName(resData?.data?.[0]?.firstName);
            setLastName(resData?.data?.[0]?.lastName);
            setDob(resData?.data?.[0]?.dob);
            setGender(resData?.data?.[0]?.gender?.charAt(0)?.toUpperCase() + resData?.data?.[0]?.gender?.slice(1));
            setBloodGroup(resData?.data?.[0]?.bloodgroupId?.[0]?._id);
            setRecepientId(resData?.data?.[0]?._id);
        }
    }, [resData]);

    const handleContinueClick = () => {
            if (postError) {
                dispatch(clearPostResponse());
            }
            setStartCounter(true);
            if (resData?.data?.length !== 0 && mrn?.length > 3) {
                setScreen(2);
            } else {
                let formObj = {};
                formObj.mrnNumber = mrn;
                formObj.firstName = firstName;
                formObj.lastName = lastName;
                formObj.gender = gender;
                formObj.dob = dob;
                formObj.bloodgroupId = bloodGroup;
                let FormObject = {};
                FormObject.collectionName = 'recipient';
                FormObject.validData = formObj;
                let json = JSON.stringify(FormObject);
                if (accessableCodes.includes('BS-ACO-1053')) {
                    dispatch(postFormData(json));
                }
            }
    };
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
        if (postError) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: postError?.errorMessage,
                    alertType: 'error'
                })
            );
        }
    }, [postError, postResponse]);

    useEffect(() => {
        socket?.on('deviceActivity', (data) => {
            dispatch(socketSessionIdAction({ _id: data?.sessionData?._id }));
            console.log('My Socket >> deviceActivity>>> emergency unit', data);
            if (data?.badData?.length > 0) {
                setResetBoolean(true);
                setIsErrorUnits(true);
                setIsGoodUnits(false);
            } else if (data?.goodData?.length > 0 && data?.badData?.length === 0) {
                setGoodUnits(data?.goodData);
                setIsErrorUnits(false);
                setIsGoodUnits(true);
            }
            setBadUnits(data?.badData);
            setGoodUnits(data?.goodData);
        });
    }, [socket]);

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

    console.log(goodUnits, badUnits, isDoorLocked, isErrorUnits, 'good tags in emergency units ');

    return (
        <>
            {screen === 0 ? (
                <Paper elevation={0} style={{ padding: 20, width: '100%', height: '72vh', borderRadius: '10px' }}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={8}
                        style={{ width: '100%', height: '72vh' }}
                    >
                        <Grid item>
                            <Typography className={classes.returnText} variant="h4">
                                Can you complete recipient data now?
                            </Typography>
                        </Grid>
                        <Grid item>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <CustomButton
                                    onClick={handleCompleteButtonClick}
                                    disabled={!accessableCodes.includes('BS-ACO-1053')}
                                    color="primary"
                                    variant="outlined"
                                >
                                    Yes, complete
                                </CustomButton>
                                <CustomButton
                                    onClick={handleSkipButtonClick}
                                    color="primary"
                                    variant="contained"
                                    disabled={!accessableCodes.includes('BS-ACO-1054')}
                                >
                                    No, Skip
                                </CustomButton>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            ) : screen === 1 ? (
                <Paper elevation={0} style={{ padding: 20, width: '100%', height: '72vh', borderRadius: '10px' }}>
                    <Grid container style={{ padding: 30, height: '72vh' }}>
                        <Grid item style={{ marginTop: 5 }}>
                            <Grid container style={{ marginBottom: 15 }}>
                                <Grid item>
                                    <Typography variant="h6" color="primary">
                                        RECIPIENT DATA
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={4}>
                                    <InputLabel className={classes.inputLabel}>Recipient MRN Number</InputLabel>
                                    <CustomInput
                                        name="mrn"
                                        value={mrn}
                                        onChange={handleMRNChange}
                                        autoFocus={true}
                                        width="330px"
                                        focus={true}
                                        disabled={!accessableCodes.includes('BS-ACO-1043')}
                                        />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel className={classes.inputLabel}>Recipient Name</InputLabel>
                                    <CustomInput
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        autoFocus={true}
                                        width="330px"
                                        disabled={
                                            !accessableCodes.includes('BS-ACO-1042')
                                                ? true
                                                : resData?.data?.length !== 0 && mrn?.length > 3 && firstName
                                        }
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel className={classes.inputLabel}>Recipient Surname</InputLabel>
                                    <CustomInput
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        autoFocus={true}
                                        width="330px"
                                        disabled={resData?.data?.length !== 0 && mrn?.length > 3 && lastName}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel className={classes.inputLabel}>Gender</InputLabel>
                                    <FormControl
                                        component="fieldset"
                                        disabled={resData?.data?.length !== 0 && mrn?.length > 3 && gender}
                                    >
                                        <RadioGroup
                                            aria-label="api"
                                            name="gender"
                                            value={gender}
                                            className={classes.radioBtns}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            {genderOptions.map((option) => (
                                                <FormControlLabel
                                                    key={option.value}
                                                    value={option.value}
                                                    control={
                                                        <Radio
                                                            classes={{
                                                                root: classes.radio,
                                                                checked: classes.checked
                                                            }}
                                                        />
                                                    }
                                                    label={option.name}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel className={classes.inputLabel}>Date of Birth</InputLabel>
                                    <DatePicker
                                        inputVariant="outlined"
                                        handleDate={(date) => setDob(date)}
                                        maxDate={new Date()}
                                        value={dob}
                                        format="dd/MM/yyyy"
                                        placeholder="DD/MM/YYYY"
                                        fullWidth
                                        width={'100%'}
                                        height={45}
                                        disabled={resData?.data?.length !== 0 && mrn?.length > 3 && dob}
                                    />
                                </Grid>
                                {/*<Grid item xs={4}>*/}
                                {/*    <InputLabel className={classes.inputLabel}>Blood Group</InputLabel>*/}
                                {/*    <SelectOption*/}
                                {/*        // label="Select Location Type"*/}
                                {/*        options={options?.data}*/}
                                {/*        onChange={(e) => setBloodGroup(e.target.value)}*/}
                                {/*        value={bloodGroup}*/}
                                {/*        name="bloodGroup"*/}
                                {/*        id="id"*/}
                                {/*        disabled={resData?.data?.length !== 0 && mrn?.length > 3 && bloodGroup}*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                            </Grid>
                            <Grid item style={{ marginTop: 25 }}>
                                <CustomButton onClick={handleContinueClick} color="primary" variant="contained">
                                    {postLoading ? <CircularProgress color="white" size="20px" /> : 'Continue'}
                                </CustomButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            ) : isDoorLocked ? (
                <Paper elevation={0} style={{ width: '100%', height: '72vh', borderRadius: '10px' }}>
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
            ) : screen === 2 && isErrorUnits ? (
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
                                {badUnits?.length > 0 ? (
                                    <Grid item xs={4}>
                                        <Paper className={classes.errorSmallPaper} elevation={0}>
                                            <Typography className={classes.cardWarningText}>
                                                {badUnits?.length} out of {badUnits?.length + goodUnits?.length} units
                                                needs to be returned
                                            </Typography>
                                            {badUnits?.map((unit) => (
                                                <Grid key={unit.id} item xs={4}>
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
                                ) : null}

                                <Grid item xs={8}>
                                    <Grid
                                        container
                                        spacing={3}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        style={{ padding: 20, lineHeight: 1 }}
                                    >
                                        <Grid item>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                                    <Typography align="center" className={classes.returnErrorText}>
                                                        Please return the listed units on the left
                                                    </Typography>
                                                    <Typography align="center" className={classes.returnErrorText}>
                                                        to {deviceName}
                                                    </Typography>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
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
            ) : screen === 2 && !isGoodUnits ? (
                <>
                    <Paper elevation={0} style={{ padding: 20, width: '100%', height: '73vh', borderRadius: '10px' }}>
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
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h4" align="center" className={classes.returnText}>
                                        Remove the required number of Emergency Use Only Units
                                    </Typography>
                                    <Typography variant="h4" align="center" className={classes.returnText}>
                                        from {deviceName}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h6" align="center" className={classes.returnText}>
                                        Please open {deviceName} door.
                                    </Typography>
                                    <Typography variant="h6" align="center" className={classes.returnText}>
                                        You have 40 seconds to perform this action
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
            ) : isGoodUnits ? (
                <GoodUnits goodUnits={goodUnits} redirectCounter={redirectCounter} />
            ) : (
                ''
            )}
        </>
    );
};

export default EmergencyUnits;
