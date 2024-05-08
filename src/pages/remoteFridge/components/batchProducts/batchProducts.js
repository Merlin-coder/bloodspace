import React, { useEffect, useState } from 'react';
import { useStyles } from './style';
import { units } from './data';
import {
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Paper,
    Radio,
    RadioGroup,
    Typography
} from '@material-ui/core';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import './style.css';
import { CustomInput, SelectOption, CustomDialog } from 'components';
import { CustomButton, DatePicker } from 'common';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import TimerIcon from '@material-ui/icons/Timer';
import { useDispatch, useSelector } from 'react-redux';
import { clearResponseData, getData, getReportData, getResData } from 'redux/actions/scGenericApiCalls';
import Loader from '../../../../components/loader/loaderNew.container';
import { postAssignBatch } from 'redux/actions/assignBatch';
import {
    clearData,
    clearDropDown,
    clearPostResponse,
    createAlert,
    getDropDown,
    postFormData,
    getRemoteAssignAction,
    socketSessionIdAction
} from 'redux/actions';
import hours_48_From_Now from 'common/services/FourtyEightHours';
import { clearDeviceBatchesResponse, getBatchesByDeviceAction } from 'redux/actions/remoteDashboardActions';
import { pullOutAction } from 'redux/actions/manage/scManageActions';
import { deviceLogout } from 'redux/actions/auth/authActions';
import { useHistory } from 'react-router-dom';
import beep from 'common/services/beepSound';
import GoodUnits from '../goodUnitsComponent';
import lockIcon from '../../../../assets/lockIcon3.png';
import WarningIcon from '@material-ui/icons/Warning';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const cards = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' }
];

const BatchProducts = (props) => {
    const { handleDeviceExit, lfDeviceEvent, accessableCodes } = props;
    const history = useHistory();
    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));

    const { dateFormat } = useSelector((state) => state.dateFormat);
    const [moreCountDialog, setMoreCountDialog] = useState(false);

    const dispatch = useDispatch();
    const classes = useStyles();
    let deviceName = JSON.parse(localStorage.getItem('deviceName'))?.toUpperCase();
    const getAPIData = useSelector((state) => state.getData);
    const [currentScreen, setCurrentScreen] = useState(0);
    const [formScreen, setFormScreen] = useState(false);
    const [selectedBatchProduct, setSelectedBatchProduct] = useState({});
    console.log("selected", selectedBatchProduct)
    const [selectedCount, setSelectedCount] = useState(0);
    const genderOptions = [
        { name: 'Male', value: 'Male' },
        { name: 'Female', value: 'Female' },
        { name: 'Other', value: 'Other' }
    ];
    const [isGoodUnits, setIsGoodUnits] = useState(false);
    const [isErrorUnits, setIsErrorUnits] = useState(false);
    const [isDoorLocked, setIsDoorLocked] = useState(false);
    const [mrn, setMrn] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [recepientId, setRecepientId] = useState('');
    const { options } = useSelector((state) => state.getDropDown);
    const { resLoading, resData } = useSelector((state) => state.getResponseData);
    console.log('resdata',resData)
    const { postLoading, postResponse, postError } = useSelector((state) => state.postFormFields);
    const { remoteAssignSuccess, remoteAssignError } = useSelector((state) => state?.remoteAssignStore);
    const { deviceBatchLoading, deviceBatchSuccess, deviceBatchError } = useSelector(
        (state) => state?.getBatchesByDeviceStore
    );
    const socket = useSelector((state) => state.socketReducer.socket);
    const [redirectCounter, setRedirectCounter] = useState(5);
    const [goodUnits, setGoodUnits] = useState([]);
    const [badUnits, setBadUnits] = useState([]);
    const [resetBoolean, setResetBoolean] = useState(false);
    const [countError, setCountError] = useState('');

    useEffect(() => {
        dispatch(getDropDown('bloodGroup'));
        return () => {
            dispatch(clearData());
            dispatch(clearPostResponse());
            dispatch(clearDropDown());
        };
    }, []);

    const [counter, setCounter] = useState(40);
    const [startTimer, setStartTimer] = useState(false);

    const redirectTORDashBoard = () => {
        if (postError) {
            dispatch(clearPostResponse());
        }
        if (postResponse?.status) {
            dispatch(clearPostResponse());
        }

        handleDeviceExit();
        setStartTimer(false);
        dispatch(clearDeviceBatchesResponse());
        dispatch(clearData());
        dispatch(deviceLogout());
        history.push('/dashboard/remote-dashboard');
    };

    const handlMoreCountDialog = () => {
        if (moreCountDialog && selectedCount > 4) {
            setCountError('');
            setMoreCountDialog(!moreCountDialog);
            setFormScreen(true);
        } else {
            setCountError('please enter a value grater than 4');
        }
    };

    const handleDecrimentCounter = () => {
        if (resetBoolean) {
            setResetBoolean(false);
            setCounter(40);
        } else {
            console.log('handle decriment counter', counter, resetBoolean);
            setCounter(counter - 1);
        }
    };

    useEffect(() => {
        console.log('strat timer', startTimer, counter);
        counter > 0 && startTimer && setTimeout(() => handleDecrimentCounter(), 1000);
        if (counter === 39 && devDeviceId?.deviceTypeId?.[0]?.name?.toLowerCase()?.includes('lf')) {
            lfDeviceEvent();
        }
        if (counter === 0) {
            setCurrentScreen(2);
            setIsGoodUnits(false);
            setIsErrorUnits(false);
            setIsDoorLocked(true);
            setRedirectCounter(5);
        }
    }, [counter, startTimer]);

    useEffect(() => {
        let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));
        console.log(devDeviceId, 'asdfasdfasdf');
        dispatch(getBatchesByDeviceAction(JSON.stringify(devDeviceId?._id)));
    }, []);

    const handleCardClick = (batchProduct) => {
        console.log('batchproduct----', deviceBatchSuccess?.data?.batchData)
        setSelectedBatchProduct(batchProduct);
        setCurrentScreen(1);
    };

    const handleCountClick = (count) => {
        console.log("count------", count)
        setSelectedCount(count+1);
        setFormScreen(true);
    };

    const handleMoreCount = (e) => {
        setMoreCountDialog(true);
    };
    const handleDialogCount = (e) => {
        setSelectedCount(e?.target?.value);
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

    const handleMRNChange = (e) => {
        setMrn(e.target.value.trim());
        if (e?.target?.value?.trim()?.length > 2) {
            dispatch(clearResponseData());
            dispatch(getResData('recipient', JSON.stringify([{ key: 'mrnNumber', value: e.target.value.trim() }])));
        }
        if (e.target.value === '') {
            dispatch(clearResponseData());
            setMrn('');
            setFirstName('');
            setLastName('');
            setDob(null);
            setGender('');
            setBloodGroup('');
        }
    };

    useEffect(() => {
        console.log(resData, mrn?.length, 'after mrn search');
        if (resData?.data?.length !== 0 && mrn?.length > 2 && resData?.data?.[0]?.mrnNumber) {
            setMrn(resData?.data?.[0]?.mrnNumber);
            setFirstName(resData?.data?.[0]?.firstName);
            setLastName(resData?.data?.[0]?.lastName);
            setDob(resData?.data?.[0]?.dob);
            setGender(
                resData?.data?.[0]?.gender?.charAt(0)?.toUpperCase() +
                    resData?.data?.[0]?.gender?.slice(1)?.toLowerCase()
            );
            setBloodGroup(resData?.data?.[0]?.bloodgroupId?.[0]?._id);
            setRecepientId(resData?.data?.[0]?._id);
        }
    }, [resData]);

    const handleRequestPullout = () => {
        const batchIds = [];
        for (let i = 0; i < selectedCount; i++) {
            batchIds.push(selectedBatchProduct?.id[i]);
        }
        
            let data = {
                recipientId: resData?.data?.[0]?._id,
                batchId: batchIds,
                batchCount: selectedCount
                // requestListToPullOut: rows.map((i) => i?._id)
            };
             dispatch(pullOutAction(data));
    };

    const handleAssignBatchClick = () => {
        console.log("handleAssignBatchClick")
        if (postError) {
            dispatch(clearPostResponse());
        }

        if (resData?.data?.length !== 0 && mrn?.length > 2) {
            handleRequestPullout();
            setCurrentScreen(2);
            setStartTimer(true);

            let remoteAssignDatas = [];

            for (let i = 0; i < selectedCount; i++)
            {
                remoteAssignDatas.push({
                    batchId: selectedBatchProduct.id[i],
                    recipientId: resData?.data?.[0]?._id,
                    'track-code': 'BS-TR-5103',
                    count: selectedCount,
                    dereservationDateAndTime: hours_48_From_Now(),
                    comments: ''
                });
            }

            
          
            console.log('remote',remoteAssignDatas)
            //const remoteAssignData = [
            //    {
            //        batchId: selectedBatchProduct?._id,
            //        recipientId: resData?.data?.[0]?._id,
            //        'track-code': 'BS-TR-5103',
            //        count: selectedCount,
            //        dereservationDateAndTime: hours_48_From_Now(),
            //        comments: ''
            //    },
            //    {
            //        batchId: selectedBatchProduct?._id,
            //        recipientId: resData?.data?.[0]?._id,
            //        'track-code': 'BS-TR-5103',
            //        count: selectedCount,
            //        dereservationDateAndTime: hours_48_From_Now(),
            //        comments: ''
            //    }
            //];
            dispatch(postAssignBatch(remoteAssignDatas));
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
            dispatch(postFormData(json)); 
        }
    };
    useEffect(() => {
        // postLoading === false && setAlertOpen(true);
        if (postResponse?.status === true) {
            setStartTimer(true);
            setCurrentScreen(2);
            setRecepientId(postResponse?.data?._id);
            handleRequestPullout();

            const remoteAssignData = [
                {
                    batchId: selectedBatchProduct?._id,
                    recipientId: postResponse?.data?._id,
                    'track-code': 'BS-TR-5103',
                    count: selectedCount,
                    dereservationDateAndTime: hours_48_From_Now(),
                    comments: ''
                }
            ];
            dispatch(getRemoteAssignAction(remoteAssignData));
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
        if (remoteAssignSuccess) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: remoteAssignSuccess?.message,
                    alertType: 'success'
                })
            );
        }
        if (remoteAssignError) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'Failed to Assign batch',
                    alertType: 'error'
                })
            );
        }
    }, [remoteAssignSuccess, remoteAssignError]);

    // useEffect(() => {}, [deviceBatchSuccess, deviceBatchError]);

    useEffect(() => {
        socket?.on('deviceActivity', (data) => {
            dispatch(socketSessionIdAction({ _id: data?.sessionData?._id }));
            console.log('My Socket >> deviceActivity>>> batch unit', data);
            console.log(data?.badBatchData, 'bad data');
            console.log(data?.goodBatchData, 'good Data');
            if (data?.badBatchData?.length > 0) {
                beep();
                setResetBoolean(true);
                console.log('badUnit>>>>>>>>>>>');
                setCurrentScreen(2);
                setIsErrorUnits(true);
                setIsGoodUnits(false);
            } else if (data?.goodBatchData?.length > 0 && data?.badBatchData?.length === 0) {
                console.log('goodUnit>>>>>>>>>>>');
                setCurrentScreen(2);
                setIsErrorUnits(false);
                setIsGoodUnits(true);
            } else if (data?.badBatchData && data?.badBatchData?.length == 0) {
                setIsErrorUnits(false);
                setResetBoolean(true);
            }

            setBadUnits([...(data?.badBatchData || [])]);
            setGoodUnits([...(data?.goodBatchData || [])]);
        });
    }, [socket]);

    useEffect(() => {
        console.log(redirectCounter, startTimer, 'redierct good units useeffectt');
        if (startTimer && selectedCount === goodUnits?.length && badUnits?.length === 0) {
            console.log(redirectCounter, startTimer, 'all good units useEffect');
            // setTimeout(() => redirectTORDashBoard(), 5000);
            setRedirectCounter(5);
        } else if (badUnits.length === 0 && isErrorUnits) {
            setIsErrorUnits(false);
            setResetBoolean(true);
        } else if (startTimer && selectedCount > goodUnits?.length && badUnits?.length === 0) {
            setResetBoolean(true);
        }
    }, [goodUnits, badUnits]);

    useEffect(() => {
        console.log(redirectCounter, startTimer, 'redierct useEffect');
        if (isGoodUnits) {
            console.log('good units ', 'redirect counter');
            redirectCounter > 0 && startTimer && setTimeout(() => setRedirectCounter(redirectCounter - 1), 1000);
        }
        if (isDoorLocked) {
            redirectCounter > 0 && startTimer && setTimeout(() => setRedirectCounter(redirectCounter - 1), 1000);
        }
        if (redirectCounter === 0) {
            redirectTORDashBoard();
        }
    }, [redirectCounter, isDoorLocked, startTimer, isGoodUnits]);
    console.log(
        { currentScreen, goodUnits, badUnits, isGoodUnits, isErrorUnits, isDoorLocked, startTimer },
        'selectedCount'
    );
    console.log(selectedCount, redirectCounter, 'selectedCount');
    return (
        <>
            {deviceBatchLoading?.loading ? (
                <Loader />
            ) : currentScreen === 0 ? (
                <Grid container direction="column" spacing={2} style={{ padding: 20 }}>
                    <Paper elevation={0} style={{ padding: 20, borderRadius: 10 }}>
                        <Grid item style={{ marginBottom: 10 }}>
                            <Typography variant="h6" color="primary">
                                BATCH PRODUCT {deviceBatchLoading ? 'loading...' : deviceBatchSuccess?.data?.length}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {deviceBatchSuccess?.data?.batchData?.length > 0 ? (
                                <Grid container spacing={2}>
                                    {deviceBatchSuccess?.data?.batchData?.map((batchProduct) => (
                                        <Grid className="cardGrid" key={batchProduct?.id} item xs={4}>
                                            <div className="card" onClick={() => handleCardClick(batchProduct)}>
                                                <div className="card-edge-top-right"></div>
                                                <div className="card-edge-bottom-right"></div>
                                                <table className="table">
                                                    <tr>
                                                        <td className="card-name">
                                                            {batchProduct?.name}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className={classes.cardHead}>GTIN :</td>
                                                        <td className={classes.cardDetail}>
                                                            {batchProduct?.gtinNumber}
                                                        </td>
                                                    </tr>
                                                    {/*<tr>*/}
                                                    {/*    <td className={classes.cardHead}>Serial :</td>*/}
                                                    {/*    <td className={classes.cardDetail}>*/}
                                                    {/*        {batchProduct?.serialNumber}*/}
                                                    {/*    </td>*/}
                                                    {/*</tr>*/}
                                                    <tr>
                                                        <td className={classes.cardHead}>Batch :</td>
                                                        <td className={classes.cardDetail}>
                                                            {batchProduct?.batchNumber}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className={classes.cardHead}>Expire On :</td>
                                                        <td className={classes.cardDetail}>
                                                            {getDate(batchProduct?.expiryDate)}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className={classes.cardHead}>Available :</td>
                                                        <td className={classes.cardDetail}>
                                                            {batchProduct?.count}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Grid>
                                    {deviceBatchLoading ? null : (
                                        <Typography color="primary" style={{ marginTop: 50 }}>
                                            Batch Products are not present in this device
                                        </Typography>
                                    )}
                                </Grid>
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            ) : currentScreen === 1 ? (
                <Grid container direction="column" spacing={2} style={{ padding: 30 }}>
                    <Paper elevation={0} style={{ padding: 20, borderRadius: 10, height: '80vh' }}>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item style={{ marginBottom: 12 }}>
                                    <Typography variant="h6" color="primary">
                                    {selectedBatchProduct?.batchProductId && selectedBatchProduct?.batchProductId[0]?.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Paper elevation={0} className={classes.paper}>
                                        <table style={{ width: '70%' }}>
                                            <tr>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    className={classes.paperLabel}
                                                                    variant="body2"
                                                                >
                                                                    GTIN :
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    variant="h6"
                                                                    className={classes.patientDetails}
                                                                >
                                                                    {selectedBatchProduct?.gtinNumber}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    className={classes.paperLabel}
                                                                    variant="body2"
                                                                >
                                                                    Batch :
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    variant="h6"
                                                                    className={classes.patientDetails}
                                                                >
                                                                    {selectedBatchProduct?.batchNumber}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    className={classes.paperLabel}
                                                                    variant="body2"
                                                                >
                                                                    Expiration Date:
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    variant="h6"
                                                                    className={classes.patientDetails}
                                                                >
                                                                    {getDate(selectedBatchProduct?.expiryDate)}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    className={classes.paperLabel}
                                                                    variant="body2"
                                                                >
                                                                    Available units:
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    variant="h6"
                                                                    className={classes.patientDetails}
                                                                >
                                                                    {selectedBatchProduct?.count}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </Paper>
                                </Grid>
                                {!formScreen ? (
                                    <>
                                        <Grid item style={{ marginTop: 20 }}>
                                            <Grid container>
                                                <Grid item>
                                                    <Typography variant="h6" color="primary">
                                                        BATCH PRODUCT
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                                {selectedBatchProduct?.count > 0 ? (
                                            <Grid item>
                                                <Typography variant="body1" color="primary">
                                                    How many do you want to take?
                                                </Typography>
                                            </Grid>
                                        ) : (
                                            <Grid item>
                                                <Typography variant="body1" color="primary">
                                                    No Tags
                                                </Typography>
                                            </Grid>
                                        )}

                                        <Grid item style={{ marginTop: 20 }}>
                                            <Grid container spacing={4}>
                                                {/*{cards?.map(*/}
                                                {/*    (card, index) =>*/}
                                                {/*                index < selectedBatchProduct?.availableCount && (*/}
                                                        {/*{deviceBatchSuccess?.data?.batchData[0].batchId.map((card,index)=>*/}

                                                        {Array.from(Array(selectedBatchProduct?.count).keys()).map((e, index) =>

                                                            <Grid item key={index }>
                                                                <Card
                                                                    className={classes.root}
                                                                    onClick={() => handleCountClick(index)}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            marginTop: '35px'
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="h4"
                                                                            className={classes.cardTitle}
                                                                        >
                                                                            {index + 1}
                                                                        </Typography>
                                                                    </div>
                                                                </Card>
                                                            </Grid>
                                                        )}
                                                {/*  )*/}
                                                {/*)}*/}

                                                <Grid item>
                                                    {selectedBatchProduct?.deviceBatches?.count > 4 && (
                                                        <Card
                                                            className={classes.moreUnitroot}
                                                            onClick={handleMoreCount}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    marginTop: '40px'
                                                                }}
                                                            >
                                                                <Typography className={classes.moreUnits}>
                                                                    More Units
                                                                </Typography>
                                                            </div>
                                                        </Card>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <CustomDialog
                                            title={`Enter Count`}
                                            open={moreCountDialog}
                                            onSaveClick={handlMoreCountDialog}
                                            onClose={handlMoreCountDialog}
                                            isSave
                                            isClose
                                            tabIndex={1}
                                            minWidth="400px"
                                        >
                                            <>
                                                <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <CustomInput
                                                        onChange={handleDialogCount}
                                                        className={classes.moreUnits}
                                                    />
                                                </Grid>
                                                <div
                                                    style={{
                                                        marginTop: 5,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        color: 'red'
                                                    }}
                                                >
                                                    {countError}
                                                </div>
                                            </>
                                        </CustomDialog>
                                    </>
                                ) : (
                                    <>
                                        <Grid item style={{ marginTop: 5 }}>
                                            <Grid container style={{ marginBottom: 15 }}>
                                                <Grid item>
                                                    <Typography variant="h6" color="primary">
                                                        ENTER RECIPIENT DATA
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={4}>
                                                <Grid item xs={4}>
                                                    <InputLabel className={classes.inputLabel}>
                                                        Recipient MRN Number
                                                    </InputLabel>
                                                    <CustomInput
                                                        name="mrn"
                                                        value={mrn}
                                                        onChange={handleMRNChange}
                                                        autoFocus={true}
                                                        width="330px"
                                                        focus={true}
                                                        disabled={!accessableCodes.includes('BS-ACO-1047')}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <InputLabel className={classes.inputLabel}>
                                                        Recipient Name
                                                    </InputLabel>
                                                    <CustomInput
                                                        name="firstName"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        autoFocus={true}
                                                        width="330px"
                                                        disabled={
                                                            resData?.data?.length !== 0 && mrn?.length > 3 && firstName
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <InputLabel className={classes.inputLabel}>
                                                        Recipient Surname
                                                    </InputLabel>
                                                    <CustomInput
                                                        name="lastName"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        autoFocus={true}
                                                        width="330px"
                                                        disabled={
                                                            resData?.data?.length !== 0 && mrn?.length > 3 && lastName
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <InputLabel className={classes.inputLabel}>Gender</InputLabel>
                                                    <FormControl
                                                        component="fieldset"
                                                        disabled={
                                                            resData?.data?.length !== 0 && mrn?.length > 3 && gender
                                                        }
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
                                                    <InputLabel className={classes.inputLabel}>
                                                        Date of Birth
                                                    </InputLabel>
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
                                                <Grid item xs={4}>
                                                    <InputLabel className={classes.inputLabel}>Blood Group</InputLabel>
                                                    <SelectOption
                                                        // label="Select Location Type"
                                                        options={options?.data}
                                                        onChange={(e) => setBloodGroup(e.target.value)}
                                                        value={bloodGroup}
                                                        name="bloodGroup"
                                                        id="id"
                                                        disabled={
                                                            resData?.data?.length !== 0 && mrn?.length > 3 && bloodGroup
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item style={{ marginTop: 25 }}>
                                                <CustomButton
                                                    onClick={handleAssignBatchClick}
                                                    color="primary"
                                                    variant="contained"
                                                    disabled={!accessableCodes.includes('BS-ACO-1048')}
                                                >
                                                    {postLoading ? (
                                                        <CircularProgress color="white" size="20px" />
                                                    ) : (
                                                        'Assign Batch Product'
                                                    )}
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            ) : currentScreen === 2 && isErrorUnits ? (
                <>
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
                                        <Paper className={classes.errorSmallPaper} elevation={0}>
                                            <Typography className={classes.cardWarningText}>
                                                {badUnits?.length} out of {badUnits?.length + goodUnits?.length} units
                                                needs to be removed
                                            </Typography>
                                            {badUnits.map((item) => (
                                                <Grid className="cardGrid" key={item?.batch?._id} item xs={4}>
                                                    <div className="badCard">
                                                        <table className="table">
                                                            <tr>
                                                                <td className={classes.cardHead}>Type :</td>
                                                                <td className={classes.cardDetail}>{'Batch'}</td>
                                                            </tr>

                                                            <tr>
                                                                <td className={classes.cardHead}>Batch :</td>
                                                                <td className={classes.cardDetail}>
                                                                    {item?.batch?.batchNumber}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className={classes.cardHead}>Expire On :</td>
                                                                <td className={classes.cardDetail}>
                                                                    {getDate(item?.batch?.expiryDate)}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </Grid>
                                            ))}
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
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                                        <Typography align="center" className={classes.returnErrorText}>
                                                            Please remove the listed units on the left
                                                        </Typography>
                                                        <Typography align="center" className={classes.returnErrorText}>
                                                            from {deviceName}
                                                        </Typography>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
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
            ) : currentScreen === 2 && isGoodUnits ? (
                <>
                    <Grid container direction="column">
                        <Grid item xs={12}>
                            <Grid item xs={12} style={{ display: 'flex', marginBottom: '2px' }}>
                                <Grid item xs={6}>
                                    <Paper
                                        elevation={0}
                                        style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}
                                    >
                                        <CheckCircleOutlineIcon fontSize="small" className={classes.tickIcon} />{' '}
                                        {goodUnits?.length < selectedCount ? (
                                            <Typography variant="body1" className={classes.successText}>
                                                {selectedCount - goodUnits?.length} Unit left in the Device to be
                                                removed
                                            </Typography>
                                        ) : (
                                            <Typography variant="body1" className={classes.successText}>
                                                {goodUnits?.length} Units assigned to {firstName}
                                            </Typography>
                                        )}
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper
                                        elevation={0}
                                        style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}
                                    >
                                        <AccessTimeIcon fontSize="small" className={classes.tickIcon} />{' '}
                                        <Typography variant="body1" className={classes.successText}>
                                            Redirecting to Dashboard screen in{' '}
                                            {goodUnits?.length < selectedCount ? counter : redirectCounter} seconds.
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Paper
                                style={{
                                    borderRadius: '10px',
                                    padding: 25,
                                    height: '71vh',
                                    maxHeight: '62vh',
                                    overflow: 'auto',
                                    display: 'flex',
                                    justifyContent: 'flex-start'
                                }}
                                elevation={0}
                            >
                                <Grid container style={{ padding: 5 }} spacing={4}>
                                    <Grid className="cardGrid" item>
                                        <div className="card">
                                            <div className="card-edge-top-right"></div>
                                            <div className="card-edge-bottom-right"></div>
                                            <table className="table">
                                                <tr>
                                                    <td className="card-name">{selectedBatchProduct?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td className={classes.cardHead}>GTIN :</td>
                                                    <td className={classes.cardDetail}>
                                                        {selectedBatchProduct?.gtinNumber}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={classes.cardHead}>Serial :</td>
                                                    <td className={classes.cardDetail}>
                                                        {selectedBatchProduct?.serialNumber}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={classes.cardHead}>Batch :</td>
                                                    <td className={classes.cardDetail}>
                                                        {selectedBatchProduct?.batchNumber}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={classes.cardHead}>Expire On :</td>
                                                    <td className={classes.cardDetail}>
                                                        {getDate(selectedBatchProduct?.expiryDate)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={classes.cardHead}>Available :</td>
                                                    <td className={classes.cardDetail}>
                                                        {selectedBatchProduct?.availableCount}
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </>
            ) : currentScreen === 2 && isDoorLocked ? (
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
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 5
                                }}
                            >
                                <Typography variant="body1">
                                    You will be redirected to Home Screen in {redirectCounter} seconds.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            ) : currentScreen === 2 ? (
                <Grid container style={{ width: '100%' }}>
                    <Grid item xs={5}>
                        <Paper className={classes.removePaper} elevation={0}>
                            <Typography className={classes.cardWarningText}>
                                <InfoOutlinedIcon color="primary" /> {selectedCount} tags to be removed
                            </Typography>
                            {selectedBatchProduct && (
                                <Grid className="cardGrid" key={selectedBatchProduct?.id} item>
                                    <div className="card">
                                        <div className="card-edge-top-right"></div>
                                        <div className="card-edge-bottom-right"></div>
                                        <table className="table">
                                            <tr>
                                                <td className="card-name">
                                                    {selectedBatchProduct?.name}
                                                </td>
                                            </tr>
                                            {/*<tr>*/}
                                            {/*    <td className={classes.cardHead}>Type :</td>*/}
                                            {/*    <td className={classes.cardDetail}>{selectedBatchProduct?.type}</td>*/}
                                            {/*</tr>*/}
                                                                    <tr>
                                                                        <td className={classes.cardHead}>Gtin Number :</td>
                                                                        <td className={classes.cardDetail}>
                                                                            {selectedBatchProduct?.gtinNumber}
                                                                        </td>
                                                                    </tr>
                                            <tr>
                                                <td className={classes.cardHead}>Batch :</td>
                                                <td className={classes.cardDetail}>
                                                    {selectedBatchProduct?.batchNumber}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={classes.cardHead}>Expiration Date :</td>
                                                <td className={classes.cardDetail}>
                                                   {getDate(selectedBatchProduct?.expiryDate)}
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={classes.cardHead}>Available :</td>
                                                <td className={classes.cardDetail}>
                                                    {selectedBatchProduct?.count}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </Grid>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid
                            container
                            spacing={3}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ padding: 16, width: '100%' }}
                        >
                            <Grid container className={classes.actionGrid}>
                                <Grid
                                    item
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 5
                                    }}
                                >
                                    <Typography style={{ fontSize: 16 }}>
                                        {' '}
                                        <SubdirectoryArrowRightIcon />{' '}
                                    </Typography>
                                    <Typography style={{ fontSize: 16 }}>ACTION REQUIRED</Typography>
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
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        <Typography variant="h4" align="center" className={classes.returnText}>
                                            Remove {selectedCount} units of the listed products on the left from{' '}
                                            {deviceName}
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
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 5
                                        }}
                                    >
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
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                ''
            )}
        </>
    );
};

export default BatchProducts;
