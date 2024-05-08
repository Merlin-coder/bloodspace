import React, {  useEffect, useState } from 'react';
import { getDashboard, getTemperature, getTemperatureGraph, getDashboardEuo, getDashboardEuoUnitsIncomplete, getDashboardEuoBatchIncomplete } from 'redux/actions/dashboard/dashboardActions';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, DatePicker } from 'common';
import { CustomInput } from 'components';
import { CONSTANTS } from 'common';
import { SelectOption } from 'components';
import axios from 'axios';
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
import { useStyles } from './style';
import moment from 'moment';
import hours_48_From_Now from 'common/services/FourtyEightHours';
import { postAssignBatch } from 'redux/actions/assignBatch';
import { clearResponseData, getResData } from 'redux/actions/scGenericApiCalls';
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
import {
    createAlert,
    createErrorDialog,
    clearRefreshPullOutData,
    requestPulloutDialogOpen,
    requestPullOutId
} from 'redux/actions';

const dashboardEuoBatch = () => {

    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [batchUserError, setBatchUserError] = useState(false)
    const [openform, setOpenForm] = useState(false)
    const [tableform, setTableForm] = useState("")
    console.log('tableform--',tableform)
    const [batch, setBatch] = useState();
    const [form, setForm] = useState("");
    const [user, setUser] = useState('')
    const [mrn, setMrn] = useState('');
    const [firstName, setFirstName] = useState('');
    console.log('firstname', firstName)
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [dobError, setDobError] = useState(false);
    console.log('doberror', dobError)
    const [gender, setGender] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [recepientId, setRecepientId] = useState('');
    const [selectBoolean, setSelectBoolean] = useState('Incomplete')
    const [referenceNo, setReferenceNo] = useState('');
    console.log('reference', referenceNo)

    const genderOptions = [
        { name: 'Male', value: 'Male' },
        { name: 'Female', value: 'Female' },
        { name: 'Other', value: 'Other' }
    ];
    const selectOptions = [
        { name: 'Incomplete', value: true },
        { name: 'Complete', value: false},

    ];

    const { userRoleData } = useSelector((state) => state.getUserAccessId);
    console.log("uuuuuuuu", userRoleData)

    const { options4 } = useSelector((state) => state.get4thDropdown);
    console.log("options4", options4)
    const { resLoading, resData } = useSelector((state) => state.getResponseData);
    console.log('resdata--', resData)
    const { postLoading, postResponse, postError } = useSelector((state) => state.postFormFields);
    const {incompleteBatchEuo} = useSelector((state) => state.getDashboardEuoBatchIncomplete);
    console.log('incompleteUnitsEuo--', incompleteBatchEuo)
    const { putResponse, putError } = useSelector((state) => state.putFormFields) || {};
    const { userInfo } = useSelector((state) => state.userLogin);

    console.log('putresponse----', putResponse)
    console.log('putError----', putError)

    const handleopenForm = (e, data) => {
        console.log('name---',data)
        setOpenForm(true)
        //setBatch(deviceBatchSuccess?.data?.batchData)
        setUser(data.userName ? data.userName : user);
        setFirstName(data.recipientInfo.firstName ? data.recipientInfo.firstName : firstName);
        setMrn(data.recipientInfo.mrnNumber ? data.recipientInfo.mrnNumber : mrn);
        setLastName(data.recipientInfo.lastName ? data.recipientInfo.lastName : lastName);
        setDob(data.recipientInfo.dob ? data.recipientInfo.dob : dob);
        setGender(data?.recipientInfo?.gender ? data?.recipientInfo?.gender?.charAt(0)?.toUpperCase() + data?.recipientInfo?.gender?.slice(1)?.toLowerCase() : gender);
        setBloodGroup('');
        setTableForm(data)
        console.log('d---', data.recipientInfo.dob)
    }
  
    

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

    const handleUserChange = (e) => {
        console.log(e.target.value)
        const user = options4?.data?.find(dat => dat.name === e.target.value);
        console.log("user", user);
        setUser(user.name)
        //setUserId(user._id)
        // console.log('userId', userId)
    }

    const handleformClose = () => {
      
        setOpenForm(false)
        setUser('');
        setRecepientId('');
        setBloodGroup('');
        setGender('');
        setDob(null);
        setLastName('');
        setFirstName('');
        setMrn('');
        setDobError(false);
    }
    console.log('formmm----', tableform?.userName)

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
            setFirstName(tableform?.recipientInfo?.firstName)
            setLastName(tableform?.recipientInfo?.lastName);
            setDob(tableform?.recipientInfo?.dob);
            setGender(tableform?.recipientInfo?.gender?.charAt(0)?.toUpperCase() + tableform?.recipientInfo?.gender?.slice(1)?.toLowerCase());
        }
    }, [resData]);
    const handleDateChange = (date) => {
        setDob(date);
        setDobError(false)
    }
    useEffect(() => {
        console.log('userrrr')
        dispatch(get4thDropdown('user', undefined,));
       // setUserAccess(userRoleData?.data?.[0]?._id);
    }, []);
    useEffect(() => {
        dispatch(getDashboardEuoBatchIncomplete());
    },[])



    const handleBatchSave = async (batch, rfidNumber) => {
        console.log("batchid", batch)
        console.log("rfidNumber", rfidNumber)
        if (putError?.status === false) {
            let batchSave = []
            batchSave.push(
                {
                    //batchId: batch,
                    firstName: firstName,
                    lastName: lastName,
                    mrnNumber: mrn,
                    dob: dob,
                    gender: gender,
                    _id: tableform?.recipientInfo?._id,
                    isInCompletedData: selectBoolean == "Incomplete" ? true : false,
                    // rfidNumber: rfidNumber,
                    // dereservationDateAndTime: hours_48_From_Now(),
                    //userName: tableform?.userName ? tableform?.userName : user,
                    userName: user,

                });
            let FormObject = {};
            FormObject.collectionName = 'recipient';
            //FormObject.isInCompletedData = selectBoolean;
            FormObject.validData = batchSave;

            let json = JSON.stringify(FormObject);

            dispatch(putFormData(json));
            setOpenForm(true);
        }
        else {
            let batchSave = []
            batchSave.push(
                {
                    //batchId: batch,
                    firstName: firstName,
                    lastName: lastName,
                    mrnNumber: mrn,
                    dob: dob,
                    gender: gender,
                    _id: tableform?.recipientInfo?._id,
                    isInCompletedData: selectBoolean == "Incomplete" ? true : false,
                    // rfidNumber: rfidNumber,
                    // dereservationDateAndTime: hours_48_From_Now(),
                    //userName: tableform?.userName ? tableform?.userName : user,
                    userName: user,

                });
            let FormObject = {};
            FormObject.collectionName = 'recipient';
            //FormObject.isInCompletedData = selectBoolean;
            FormObject.validData = batchSave;

            let json = JSON.stringify(FormObject);
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
                setOpenForm(false);
                setUser('');
                setRecepientId('');
                setBloodGroup('');
                setGender('');
                setDob(null);
                setLastName('');
                setFirstName('');
                setMrn('');
                setDobError(false);
            }
            else {
                dispatch({
                    type: CONSTANTS.PUT_FIELDS_ERROR,
                    payload: data
                });
            }
           // dispatch(putFormData(json));
          
            // window.location.reload(true)
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
    
    return (
        <>
            <Paper elevation={0} className={classes.paper}>
            <Grid item xs={12} >
                <Card className={classes.detailCard} style={{
                    minWidth: '100%',
                    minHeight: "70vh"
                }}>
                    <Grid container style={{ marginBottom: '0px' }}>
                        <Typography color="primary" className={classes.smalldetailTitle}
                            style={{ fontSize: '20px', fontWeight: "bold" }}>
                            Batches
                        </Typography>
                    </Grid>
                    <Grid className={classes.content}>
                        <Grid>
                            <TableContainer >
                                <Table size="small">
                                    <TableHead style={{ height: '50px' }}>
                                        <TableRow>
                                            {[
                                                'Gtin Number',
                                                    'Batch Number',
                                                    'First Name',
                                                    'Last Name',
                                                'Description',
                                                    'Expiry Date',
                                                'Status',
                                                CONSTANTS.ACTIONS
                                            ].map((item, index) => (
                                                <TableCell key={index} className={classes.tableHeadCel} style={{ fontSize: '16px', textAlign: 'center' }}>
                                                    {item === '#' ? '' : item}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {incompleteBatchEuo && incompleteBatchEuo.map && incompleteBatchEuo?.map((item, index) => (

                                            <TableRow key={index} style={{ height: '50px' }} >

                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.gtinNumber}</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.batchNumber}</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.recipientInfo?.firstName ? item.recipientInfo.firstName : '-'}</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.recipientInfo?.lastName ? item.recipientInfo.lastName : '-'}</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.batchProductId?.name}</TableCell>

                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.expiryDate
                                                    ? moment(item?.expiryDate).format('DD-MM-YYYY HH:mm')
                                                    : '-'
                                                }</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.trackId?.name}</TableCell>

                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>
                                                    <img src={EditNotepad} style={{ width: 20, cursor: 'pointer' }}
                                                        onClick={(e) => handleopenForm(e, item)} />

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
                open={openform}
                onClose={handleformClose}
            >
                <Paper elevation={0} style={{ padding: 10, width: '100%', height: '25%', borderRadius: '10px' }}>
                    <Grid container style={{ padding: 10, height: '25%' }}>
                        <Grid item style={{ marginTop: 0 }}>
                            <Grid container style={{ marginBottom: 20 }}>
                                
                                <Grid item xs={12} >
                                        <Typography variant="h6" color="primary">
                                            Enter the Recipient Information
                                    </Typography>
                                   
                                        <Grid item xs={8} style={{ display: 'flex' }}>

                                        <Grid item style={{ paddingTop: '20px' }}>
                                            <Typography className={classes.inputLabel} variant="subtitle1">Username</Typography>
                                            <SelectOption
                                                label="Select User"
                                                onChange={handleUserChange}
                                                value={user}
                                                minWidth={250}
                                                noLabel={true}
                                                options={options4?.data || []}
                                                placeHolder="Select User"
                                            />

                                            {batchUserError && (
                                                <Typography style={{ fontSize: '0.75rem' }} color="error" variant="subtitle1">
                                                    User is required
                                                </Typography>
                                            )}
                                            </Grid>
                                        <Grid item xs={12} style={{ paddingLeft: '63%', paddingTop: '30px' }}>
                                          
                                            <Grid item xs={12} style={{justifyContent: 'space-between' }}>
                                                <InputLabel className={classes.inputLabel}>Temporary Recipient Number</InputLabel>
                                                <CustomInput
                                                    name="referenceNo"
                                                    value={tableform?.recipientInfo?.referenceNo ? tableform?.recipientInfo?.referenceNo : referenceNo}
                                                    onChange={(e) => setReferenceNo(e.target.value)}
                                                    autoFocus={true}
                                                    width="250px"
                                                    focus={true}
                                                //disabled={!accessableCodes.includes('BS-ACO-1043')}
                                                />
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
                                        value={lastName}
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
                                    //disabled={resData !== undefined && resData?.data?.length !== 0 ? true : false}
                                    />
                                    {/* {dobError && <span style={{ color: 'red' }}>Invalid date</span>}*/}
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel className={classes.inputLabel}>Gender</InputLabel>
                                    <FormControl
                                        component="fieldset"
                                    //disabled={resData !== undefined && resData?.data?.length !== 0 ? true : false}
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
                                            onChange={(e) => setSelectBoolean(e.target.value)}
                                            
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
                            </Grid>

                        </Grid>
                    </Grid>
                </Paper>

                <Divider color="#004372" variant="middle" sx={{ height: 25, padding: '50px' }} />

                <Grid item xs={12} direction="row">
                    <div style={{ display: 'flex', marginTop: 25 }}>

                    <Card
                        key={tableform?.rfidNumber}
                        style={{ padding: '5px', width: '330px' }}
                            className={
                                tableform?.status === 'Expired' ||
                                    tableform?.status === 'Unassociated' ||
                                    tableform.status === 'Dereservation' ||
                                    tableform.status === 'Wasted' ||
                                    tableform.status === 'Quarantine' ||
                                    tableform.status === 'Fated' ||
                                    tableform.status === 'Quarantine unit'
                                    ? classes.smalldetailCardError
                                    : tableform.deviceStatus === 'Move Out'
                                        ? classes.smalldetailCardMoveout
                                        : tableform?.trackId?.name === 'Assigned' ||
                                            tableform?.trackId?.name === 'Move In' ||
                                            tableform?.trackId?.name === 'Associate' ||
                                            tableform?.trackId?.name === 'Reactivated'
                                            ? classes.smalldetailCardAvailable
                                            : classes.smalldetailCard
                            }
                    >
                        <table style={{ padding: '25px' }}>
                            <tr>
                                <td style={{
                                    color: 'black', fontWeight: 'bold',
                                    fontSize: '15px', width: '100%'
                                }}>
                                    {tableform?.batchProductId?.name}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <hr style={{ borderTop: '1px solid black', margin: '10px 0' }} />
                                </td>
                            </tr>

                            <tr>
                                <td style={{ color: 'black', fontWeight: 'bold' }}>
                                    Batch number :
                                </td>
                                <td>{tableform?.batchNumber}</td>
                            </tr>
                            <tr>
                                <td style={{ color: 'black', fontWeight: 'bold' }}>
                                    GTIN number :
                                </td>
                                <td>{tableform?.gtinNumber}</td>
                            </tr>
                                <tr>
                                    <td style={{ color: 'black', fontWeight: 'bold' }}>
                                        Expiry Date :
                                    </td>
                                    <td>
                                        {tableform?.expiryDate
                                            ? moment(tableform?.expiryDate).format('DD-MM-YYYY HH:mm')
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
                                      {tableform?.trackId?.name ? tableform?.trackId?.name : '-'}
                                    </Typography>
                                </td>
                            </tr>
                        </table>
                        </Card>
                    </div>
                </Grid>


                <Grid item xs={12} container spacing={2} direction="row">
                    <Grid item xs={10} style={{ marginTop: 25 }}>
                        <CustomButton onClick={handleformClose} color="secondary" variant="contained">
                            {postLoading ? <CircularProgress color="white" size="20px" /> : 'Cancel'}
                        </CustomButton>
                    </Grid>
                    <Grid item style={{ marginTop: 25 }}>
                        <CustomButton onClick={() => {
                            if (!user && !tableform?.userName) {
                                setBatchUserError(true);
                            } else {
                                handleBatchSave(tableform.batchId == undefined ? tableform?._id : tableform.batchId, tableform.rfidNumber);
                                setBatchUserError(false); // Clear the error if the user is selected
                            }
                        }}
                            color="primary"
                            variant="contained">
                            Save
                        </CustomButton>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )
}
export default dashboardEuoBatch;