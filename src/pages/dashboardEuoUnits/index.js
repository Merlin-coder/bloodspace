import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConvertToDBDate from '../../components/add-unit/add-unit-form/julianDateConverter';
import {
    Box,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Tooltip,
    Typography,
    useTheme, Dialog,
        Table,
        TableBody,
        TableRow,
        TableCell,
        TableContainer,
        TableHead,
} from '@material-ui/core';
import { Card, Divider } from '@material-ui/core';
import EditNotepad from '../../assets/editNotepad.png';
//import { checkTextSum } from '.././../../components/add-unit/add-unit-form/unitIdService';
import { checkTextSum } from '../../components/add-unit/add-unit-form/unitIdService';
import CheckboxComponent from '../../components/checkbox/checkbox.container';
import FlareIcon from '@material-ui/icons/Flare';
import EjectIcon from '@material-ui/icons/Eject';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory, useLocation, useParams } from 'react-router';
import axios from 'axios';
import pluralize from 'pluralize';
import FileDownload from 'js-file-download';

import { useStyles } from './style';
import useForm from 'hooks/useForm';
import ConfirmationDialog from 'components/confirmations/confirmation.container';
import SelectOption from 'components/select';
import { Alert, Checkbox, CONSTANTS, CustomButton, CustomSearch, DatePicker } from 'common';
import { CustomDialog, CustomTable } from 'components';

import Loader from 'components/loader/loader.container';
import NoData from 'components/no data';
import HeaderIcons from 'components/header-button-and-icons';
import { clearFilterCriteria, getFilterCriteria, getFilter } from 'redux/actions/filters/filtersActions';

import { getData, clearData, getExportData, getUserAccessId } from '../../redux/actions/scGenericApiCalls';
import { getVoucherResponse } from 'redux/actions/manage/scManageViewActions';
import CustomChip from 'components/chip';
import DisplayConfig from 'components/displayConfig';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';
import moment from 'moment';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import {
    clear4thDropDown,
    clear5thDropDown,
    clearDeleteResponse,
    clearPutResponse,
    deleteFormData,
    get2ndDropdown,
    get3rdDropdown,
    get4thDropdown,
    get5thDropdown,
    get6thDropdown,
    getDropDown,
    getFields,
    putFormData
} from 'redux/actions/manage/manageFieldsAction';
import MultipleSelect from 'components/multiSelection';
import { Switch } from 'react-router-dom';
import CustomInput from 'components/inputfeild';
import {
    putHeaderAction,
    clearheaderActionsResponse,
    ledSelection,
    clearLedResponse
} from 'redux/actions/manage/headerActions';
import { resetFilters } from '../../redux/actions/filters/globalFilterAction';
import EditUnit from './editUnitForm';
import UnitEditDialog from 'components/dialog/requestUnitDialog';
import PullOutDialog from './pullOutRequest';
import { clearPullOutData, pullOutAction, pullOutCancelAction } from 'redux/actions/manage/scManageActions';
import { postPullOutReducer } from 'redux/reducers/manage/scManageReducers';
import {
    createAlert,
    createErrorDialog,
    clearRefreshPullOutData,
    requestPulloutDialogOpen,
    requestPullOutId
} from 'redux/actions';
import {

    socketAssociateBulkData,
    assignLocalDataAction
} from 'redux/actions/socketAction';

import { oneTimeScanAction, oneTimeScanERROR, socketDeviceToken } from 'redux/actions/socketAction';
import { getPhenotypeReport } from '../../components/add-unit/add-unit-form/speciaTNService';
//import ConvertToDBDate from './julianDateConverter';
import specialTesingCheck from '../../components/add-unit/add-unit-form/specialTestingService';
import { clearResponseData, getResData } from 'redux/actions/scGenericApiCalls';
import hours_48_From_Now from 'common/services/FourtyEightHours';
import { getDashboard, getTemperature, getTemperatureGraph, getDashboardEuo, getDashboardEuoUnitsIncomplete, getDashboardEuoBatchIncomplete } from 'redux/actions/dashboard/dashboardActions';


const dashboardEuoUnits = (props) => {
    const param = useLocation();

    const history = useHistory();
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState("");
    console.log('formmm', form)
    const [batchUserError, setBatchUserError] = useState(false)
    const genderOptions = [
        { name: 'Male', value: 'Male' },
        { name: 'Female', value: 'Female' },
        { name: 'Other', value: 'Other' }
    ];

    const [mrn, setMrn] = useState('');
    const [firstName, setFirstName] = useState('');
    console.log('firstname', firstName)
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [dobError, setDobError] = useState(false);
    console.log('doberror', dobError)
    const [gender, setGender] = useState('');
    const [selectBoolean, setSelectBoolean] = useState("Incomplete");
    console.log('selectboolean', selectBoolean)
    const [bloodGroup, setBloodGroup] = useState('');
    const [recepientId, setRecepientId] = useState('');
    const [user, setUser] = useState('')
    console.log('userrr', user)
    const [userId, setUserId] = useState('')
    const [userAccess, setUserAccess] = useState('');
    const [referenceNo, setReferenceNo] = useState('');
    console.log('reference', referenceNo)

    const selectOptions = [
        { name: 'Incomplete', value: true },
        { name: 'Complete', value: false },
    ];

    const { userRoleData } = useSelector((state) => state.getUserAccessId);
    console.log("uuuuuuuu", userRoleData)

    const { options4 } = useSelector((state) => state.get4thDropdown);
    console.log("options4", options4)
    const { resLoading, resData } = useSelector((state) => state.getResponseData);
    console.log('resdata--', resData)
    const { postLoading, postResponse, postError } = useSelector((state) => state.postFormFields);
    const { incompleteUnitsEuo } = useSelector((state) => state.getDashboardEuoUnitsIncomplete);
    console.log('incompleteUnitsEuo--', incompleteUnitsEuo)
    const { putResponse, putError } = useSelector((state) => state.putFormFields) || {};
    const { userInfo } = useSelector((state) => state.userLogin);

    console.log('putresponse----',putResponse)
    console.log('putError----', putError)
    const handleOpenForm = (e, data) => {
        console.log('name---', data)
        console.log(data)
        setForm(data);
        setUser(data.userName ? data.userName : user)
        setFirstName(data.recipientInfo.firstName ? data.recipientInfo.firstName : firstName );
        setMrn(data.recipientInfo.mrnNumber ? data.recipientInfo.mrnNumber : mrn);
        setLastName(data.recipientInfo.lastName ? data.recipientInfo.lastName : lastName );
        setDob(data.recipientInfo.dob ? data.recipientInfo.dob : dob);
        setGender(data?.recipientInfo?.gender ? data?.recipientInfo?.gender?.charAt(0)?.toUpperCase() + data?.recipientInfo?.gender?.slice(1)?.toLowerCase(): gender);
        setBloodGroup('');
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
        setUser('');
        setRecepientId('');
        setBloodGroup('');
        setGender('');
        setDob(null);
        setLastName('');
        setFirstName('');
        setMrn('');
        setDobError(false);
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
           
        }
        dispatch(clearPutResponse());
    };
    console.log('form----', form?.userName)

    useEffect(() => {
        console.log(resData, mrn?.length, 'after mrn search');
        if (resData !== undefined && resData?.data?.length !== 0) {
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
        } else {
            dispatch(clearResponseData());
            setFirstName(form?.recipientInfo?.firstName)
            setLastName(form?.recipientInfo?.lastName);
            setDob(form?.recipientInfo?.dob);
            setGender(form?.recipientInfo?.gender?.charAt(0)?.toUpperCase() + form?.recipientInfo?.gender?.slice(1)?.toLowerCase());
        }
    }, [resData]);


    const handleDateChange = (date) => {
        setDob(date);
        setDobError(false)
    }
    useEffect(() => {
        dispatch(getDashboardEuoUnitsIncomplete());
    },[])

    useEffect(() => {
        console.log('userrrr')
        dispatch(get4thDropdown('user', undefined,));
        //setUserAccess(userRoleData?.data?.[0]?._id);
    }, []);

    const handleSaveClick = async (rfid) => {
        if (putError?.status === false) {
            setOpen(true)
            let Units = [];
            Units.push({
                firstName: firstName,
                lastName: lastName,
                userName: user,
                mrnNumber: mrn,
                dob: dob,
                gender: gender,
                _id: form?.recipientInfo?._id,
                isInCompletedData: selectBoolean == "Incomplete" ? true : false,
                //dereservationDate: hours_48_From_Now(),
            });
            let FormObject = {};
            FormObject.collectionName = 'recipient';
            //FormObject.isInCompletedData = selectBoolean;
            FormObject.validData = Units;

            let json = JSON.stringify(FormObject);

            dispatch(putFormData(json));

            console.log("Units------------" + Units);
        }
        else {
    let Units = [];
    Units.push({
        firstName: firstName,
        lastName: lastName,
        userName: user,
        mrnNumber: mrn,
        dob: dob,
        gender: gender,
        _id: form?.recipientInfo?._id,
        isInCompletedData: selectBoolean == "Incomplete" ? true : false,
        //dereservationDate: hours_48_From_Now(),
    });
    let FormObject = {};
    FormObject.collectionName = 'recipient';
    //FormObject.isInCompletedData = selectBoolean;
    FormObject.validData = Units;

    let json = JSON.stringify(FormObject);

    //const data = await dispatch(putFormData(json));

    //        console.log("Units------------" + data);
    //        console.log("Units", putError);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: userInfo?.data.token
                }
            };

            let url = `${CONSTANTS.BASEURL}index`;

            const { data } = await axios.put(url, json, config);
            console.log("axios data", data);
            if (data.status) {
                dispatch({
                    type: CONSTANTS.PUT_FIELDS_SUCCESS,
                    payload: data
                });
                setOpen(false)
                setUser('');
                setRecepientId('');
                setBloodGroup('');
                setGender('');
                setDob(null);
                setLastName('');
                setFirstName('');
                setMrn('');
            } else {
                dispatch({
                    type: CONSTANTS.PUT_FIELDS_ERROR,
                    payload: data
                });
            }
    //window.location.reload(true)
}
    }

    useEffect(() => {
        if (putResponse?.status === true) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: putResponse.message,
                    alertType: 'success'
                })
            );
            window.location.reload(true);
        } else if (putResponse?.status === false) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: putError.message,
                    alertType: 'error'
                })
            );
        }
    }, [putResponse]);

    const handleUserChange = (e) => {
        console.log(e.target.value)
        const user = options4?.data?.find(dat => dat.name === e.target.value);
        console.log("user", user);
        setUser(user.name)
        //setUserId(user._id)
        // console.log('userId', userId)
    }

    return (
        <>
            <Paper elevation={0} className={classes.paper}>
            <Grid item xs={12}>
                <Card className={classes.detailCard} style={{
                    minWidth: '100%',
                    minHeight: "70vh"
                }}>
                    <Grid container style={{ marginBottom: '0px' }}>
                            <Typography color="primary" className={classes.smalldetailTitle}
                                style={{ fontSize: '20px', fontWeight: "bold" }}>
                          Units
                        </Typography>
                    </Grid>
                    <Grid className={classes.content}>
                        <Grid>
                            <TableContainer >
                                <Table size="small">
                                    <TableHead style={{ height: '50px' }}>
                                        <TableRow>
                                            {[
                                                CONSTANTS.UNIT_ID,
                                                'Blood Group',
                                                'First Name',
                                                'Last Name',
                                                'Product Description',
                                                'Expiry Date Time',
                                                'Status',
                                                CONSTANTS.ACTIONS
                                            ].map((item, index) => (
                                                <TableCell key={index} className={classes.tableHeadCell} style={{ fontSize: '16px', textAlign: 'center' }}>
                                                    {item === '#' ? '' : item}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {incompleteUnitsEuo && incompleteUnitsEuo?.map && incompleteUnitsEuo?.map((item, index) => (

                                            <TableRow key={index} style={{ height: '50px' }}>
                                               
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.donationCode}</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.bloodgroup?.name}</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.recipientInfo?.firstName ? item.recipientInfo.firstName :'-'}</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.recipientInfo?.lastName ? item.recipientInfo.lastName : '-'}</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.productgroup?.name}</TableCell>
                                               

                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.expiryDateAndTime
                                                    ? moment(item?.expiryDateAndTime).format('DD-MM-YYYY HH:mm')
                                                    : '-'
                                                }</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.trackId?.name}</TableCell>

                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>
                                                    
                                                        <img src={EditNotepad} style={{ width: 20, cursor: 'pointer' }}
                                                        onClick={(e) => handleOpenForm(e, item)} />
                                                        
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Card>
                </Grid>
            </Paper>

            <Dialog
                maxWidth="lg"
                PaperProps={{
                    style: {
                        borderRadius: '10px',
                        backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                        padding: 20,
                        width: '1000px'
                    }
                }}
                open={open}
                onClose={handleClose}
            >
                <Paper elevation={0} style={{ padding: 10, width: '100%', height: '25%', borderRadius: '10px' }}>
                    <Grid container style={{ padding: 10, height: '25%' }}>
                        <Grid item style={{ marginTop: 0 }}>
                            <Grid container style={{ marginBottom: 20 }}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" color="primary">
                                        Enter the Recipient Information
                                    </Typography>
                                    <Grid item xs={8} style={{ display: 'flex' }}>

                                        <Grid item style={{ paddingTop: '20px' }}>
                                            <Typography className={classes.inputLabel} variant="subtitle1">Username</Typography>
                                            <SelectOption
                                                label="Select User"
                                                onChange={handleUserChange}
                                                value={ user}
                                                minWidth={250}
                                                noLabel={true}
                                                options={options4?.data || []}
                                                placeHolder="Select User"
                                            //onOpen={handleEmptyDevices}
                                            //loading={options8loading}
                                            />{form?.userName ? null :
                                                <>
                                                    {batchUserError && (
                                                        <Typography style={{ fontSize: '0.75rem', display: 'flex' }} color="error" variant="subtitle1">
                                                            User is required
                                                        </Typography>
                                                    )}</>}
                                        </Grid>
                                        <Grid item xs={12} style={{ paddingLeft: '63%', paddingTop: '30px' }}>
                                            <InputLabel className={classes.inputLabel}>Temporary Recipient Number</InputLabel>
                                            <CustomInput
                                                name="referenceNo"
                                                value={form?.recipientInfo?.referenceNo ? form?.recipientInfo?.referenceNo : referenceNo}
                                                onChange={(e) => setReferenceNo(e.target.value)}
                                                autoFocus={true}
                                                width="250px"
                                                focus={true}
                                            //disabled={!accessableCodes.includes('BS-ACO-1043')}
                                            />
                                        <Grid item >
                                          
                                        </Grid>
                                    </Grid>
                                    </Grid>
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
                                        width="250px"
                                        focus={true}
                                    //disabled={!accessableCodes.includes('BS-ACO-1043')}
                                    />
                                    {putError?.error?.errorMessage && <p style={{ color: 'red' }}>{putError?.error?.errorMessage}</p>}
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel className={classes.inputLabel}>Recipient Given Name(s)</InputLabel>
                                    <CustomInput
                                        name="firstName"
                                        value={ firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        autoFocus={true}
                                        width="250px"
                                        disabled={

                                            resData !== undefined && resData?.data?.length !== 0 ? true : false
                                        }
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel className={classes.inputLabel}>Recipient Surname</InputLabel>
                                    <CustomInput
                                        name="lastName"
                                        value={ lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        autoFocus={true}
                                        width="250px"
                                        disabled={resData !== undefined && resData?.data?.length !== 0 ? true : false}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel className={classes.inputLabel}>Date of Birth</InputLabel>
                                    <DatePicker
                                        inputVariant="outlined"
                                        handleDate={(date) => handleDateChange(date)}
                                        maxDate={new Date()}
                                        value={dob}
                                        format="dd/MM/yyyy"
                                        placeholder="DD/MM/YYYY"
                                        fullWidth
                                        width={'100%'}
                                        height={45}
                                        disabled={resData !== undefined && resData?.data?.length !== 0 ? true : false}
                                    />
                                    {/* {dobError && <span style={{ color: 'red' }}>Invalid date</span>}*/}
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel className={classes.inputLabel}>Gender</InputLabel>
                                    <FormControl
                                        component="fieldset"
                                        disabled={resData !== undefined && resData?.data?.length !== 0 ? true : false}
                                    >
                                        <RadioGroup
                                            aria-label="api"
                                            name="gender"
                                            value={gender}
                                            row={true}
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
                                    <InputLabel className={classes.inputLabel}>Status</InputLabel>
                                    <FormControl
                                        component="fieldset"
                                    //disabled={resData !== undefined && resData?.data?.length !== 0 ? true : false}
                                    >
                                        <RadioGroup
                                            aria-label="api"
                                            name="selectBoolean"
                                            value={selectBoolean}
                                            row={true}
                                            className={classes.radioBtns}
                                            onChange={(e) => {
                                                console.log("On Radio Change " + e.target.value)
                                                setSelectBoolean(e.target.value)
                                                }
                                            }
                                            defaultValue={true}
                                        >
                                            {selectOptions.map((option) => (
                                                <FormControlLabel
                                                    key={option.name}                                                  
                                                    value={option.name}
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
                                {/*<Grid item xs={4}>*/}
                                {/*    <InputLabel className={classes.inputLabel}>Is Incompleted Data</InputLabel>*/}
                                {/*    <FormControl*/}
                                {/*        component="fieldset"*/}
                                {/*        disabled={resData !== undefined && resData?.data?.length !== 0 ? true : false}*/}
                                {/*    >*/}
                                {/*        <RadioGroup*/}
                                {/*            aria-label="api"*/}
                                {/*            name="selectBoolean"*/}
                                {/*            value={selectBoolean}*/}
                                {/*            row={true}*/}
                                {/*            className={classes.radioBtns}*/}
                                {/*            onChange={(e) => setSelectBoolean(e.target.value)}*/}
                                {/*        >*/}
                                {/*            {selectOptions.map((option) => (*/}
                                {/*                <FormControlLabel*/}
                                {/*                    key={option.value}*/}
                                {/*                    value={option.value}*/}
                                {/*                    control={*/}
                                {/*                        <Radio*/}
                                {/*                            classes={{*/}
                                {/*                                root: classes.radio,*/}
                                {/*                                checked: classes.checked*/}
                                {/*                            }}*/}
                                {/*                        />*/}
                                {/*                    }*/}
                                {/*                    label={option.name}*/}
                                {/*                />*/}
                                {/*            ))}*/}
                                {/*        </RadioGroup>*/}
                                {/*    </FormControl>*/}
                                {/*</Grid>*/}
                                {/*<Grid item xs={4}>*/}
                                {/*    <InputLabel className={classes.inputLabel}>Blood Group</InputLabel>*/}
                                {/*    <SelectOption*/}
                                {/*        // label="Select Location Type"*/}
                                {/*        options={options?.data}*/}
                                {/*        onChange={(e) => setBloodGroup(e.target.value)}*/}
                                {/*        value={bloodGroup}*/}
                                {/*        name="bloodGroup"*/}
                                {/*        id="id"*/}
                                {/*        disabled={resData !== undefined && resData?.data?.length !== 0 ? true : false}*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                            </Grid>
                            {/*<Grid item style={{ marginTop: 25 }}>*/}
                            {/*    <CustomButton onClick={handleContinueClick} color="primary" variant="contained">*/}
                            {/*        {postLoading ? <CircularProgress color="white" size="20px" /> : 'Next'}*/}
                            {/*    </CustomButton>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>
                </Paper>

                <Divider color="#004372" variant="middle" sx={{ height: 25, padding: '50px' }} />

                <Grid item xs={12} direction="row">
                    <div style={{ display: 'flex', marginTop: 25 }}>
                    <Card
                        key={form.rfidNumber}
                        style={{ padding: '5px', width: '330px' }}
                        className={
                            form?.status === 'Expired' ||
                                form?.status === 'Unassociated' ||
                                form.status === 'Dereservation' ||
                                form.status === 'Wasted' ||
                                form.status === 'Quarantine' ||
                                form.status === 'Fated' ||
                                form.status === 'Quarantine unit'
                                ? classes.smalldetailCardError
                                : form.deviceStatus === 'Move Out'
                                    ? classes.smalldetailCardMoveout
                                    : form?.trackId?.name === 'Assigned' ||
                                        form?.trackId?.name === 'Move In' ||
                                        form?.trackId?.name === 'Associate' ||
                                        form?.trackId?.name === 'Reactivated'
                                        ? classes.smalldetailCardAvailable
                                        : classes.smalldetailCard
                        }
                    >
                        <table style={{ padding: '15px' }}>
                            <tr>
                                <td style={{
                                    color: 'black', fontWeight: 'bold',
                                    fontSize: '40px', paddingLeft: '100px'
                                }}>
                                   {form?.bloodgroup?.symbol}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <hr style={{ borderTop: '1px solid black', margin: '10px 0' }} />
                                </td>
                            </tr>

                            <td style={{ color: 'black', fontWeight: 'bold' }}>
                                Unit ID :
                            </td>
                            <td>{form.donationCode}</td>
                            <tr>
                                <td style={{ color: 'black', fontWeight: 'bold' }}>
                                    Product Group :
                                </td>
                                <td>
                                        {form?.productgroup?.name}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ color: 'black', fontWeight: 'bold' }}>
                                    Expiry Date :
                                </td>
                                <td>
                                    {form.expiryDateAndTime
                                        ? moment(form.expiryDateAndTime).format(
                                            'DD-MM-YYYY HH:mm'
                                        )
                                        : '-'}
                                </td>
                            </tr>

                            <tr>
                                <td
                                    style={{
                                        color:
                                            'black',
                                        fontWeight:
                                            'bold'
                                    }}
                                >
                                    Status :
                                </td>
                                <td>
                                    <Typography
                                        color="primary"
                                        className={classes.smalldetailTitle}
                                        alignItems="center"
                                    >
                                            {form?.trackId?.name}
                                    </Typography>
                                </td>
                            </tr>
                        </table>
                        </Card>
                        </div>
                </Grid>


                <Grid item xs={12} container spacing={2} direction="row">
                    <Grid item xs={10} style={{ marginTop: 25 }}>
                        <CustomButton onClick={handleClose} color="secondary" variant="contained">
                            {postLoading ? <CircularProgress color="white" size="20px" /> : 'Cancel'}
                        </CustomButton>
                    </Grid>
                    <Grid item style={{ marginTop: 25 }}>
                        <CustomButton
                            //onClick={() => handleAssignClick(form.rfidNumber)}
                            onClick={() => {
                                if (!user && !form?.userName) {
                                    setBatchUserError(true);
                                } else {
                                    handleSaveClick(form.rfidNumber);
                                    setBatchUserError(false); // Clear the error if the user is selected
                                }
                            }}
                            color="primary" variant="contained">
                            Save
                        </CustomButton>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
};

export default dashboardEuoUnits;
