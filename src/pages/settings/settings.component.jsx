import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Chip,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    Switch,
    Radio,
    RadioGroup,
    Typography,
    Checkbox,
    Link,
    CardHeader,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    useMediaQuery,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    InputLabel
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DateTimePicker from '../../components/date-time-picker/date-time-picker.container';
import { CustomTable } from 'components';
import { useDispatch, useSelector } from 'react-redux';
//import { getData } from '../../redux/actions/scGenericApiCalls';
import { useHistory } from 'react-router-dom';
import { getData } from '../../redux/actions';
import { useSettingsStyles } from './style';
import { Alert, CONSTANTS, CustomButton } from 'common';
import {
    apiResponseType,
    clearNotificationSettingsResponse,
    dateFormatSelection,
    deviceWriteTag,
    lfTagAction
} from '../../redux/actions/settings/settingsActions';
import io from 'socket.io-client';
import AddDrawerForm from './addDrawerForm';

import moment from 'moment';
import UploadFile from './uploadFile';
import useForm from 'hooks/useForm';
import TextInput from './components/TextInput';
import RadioInput from './components/RadioInput';
import SelectInput from './components/SelectInput';
import DateInput from './components/DateInput';
import CheckboxInput from './components/CheckboxInput';
import PasswordInput from './components/PasswordInput';
import CustomInput from 'components/inputfeild';
import { CustomDialog } from 'components';
import { flushZebraAction } from 'redux/actions/zebraActions/flushZebraAction';
import { clearAddDrawer, getAddDrawer } from 'redux/actions/settings/drawerAddAction';
import { SatelliteSharp } from '@material-ui/icons';
import {
    createAlert,
    getDropDown,
    getSettings,
    getBatchSettings,
    getRemote,
    notificationSettingsAction,
    dereservationSettingAction,
    dereservationBatchSettingAction,
    settingSwapoutEmail
} from 'redux/actions';
import { getSettingsTableData } from '../../redux/actions/manage/manageFieldsAction';
const SettingsPage = ({ props, handleAssociateUnitValidaion, associateUnitValidation }) => {
    const { userInfo } = useSelector((state) => state.userLogin);
    const { option1Loading, options } = useSelector((state) => state.getDropDown);
    console.log('options--', options);
    const { nsLoading, nsSuccess, nsError } = useSelector((state) => state.notificationSettingsStore);
    console.log('nssuccesss', nsSuccess, nsError);
    const { settingsTableLoading, settingsTableResponse, settingsTableError } = useSelector(
        (state) => state.settingsTable
    );
    console.log('settingsTableResponse', settingsTableResponse);
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    console.log('settingsssss', settingsData);
    let { settingsBatchData } = useSelector((state) => state.settingsBatchDataStore);
    console.log('settingbatchhhh', settingsData);
    let { settingsRemote } = useSelector((state) => state.settingsLocalDataStore);
    const { data } = props;
    const classes = useSettingsStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [alertOpen, setAlertOpen] = useState(false);
    const [connect, setConnect] = useState(false);
    const { apiBehavior } = useSelector((state) => state.changeResponse);
    const { dateFormat } = useSelector((state) => state.dateFormat);
    console.log('dattttt', dateFormat)
    const { loading, file } = useSelector((state) => state.uploadexcelFile);
    //const user = useSelector((state) => state.getData);
    const { responseData } = useSelector((state) => state.getData);
    console.log('redux---response', responseData);
    const [drawerFormOpen, setDrawerFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [state, setState] = useState({ message: '', name: '' });
    const [chat, setChat] = useState([]);
    const [inputValue, setIpnutValue] = useState('');
    const { versionData, versionError, versionLoading } = useSelector((state) => state.getAppVersion);
    const [password, setPassword] = useState('');
    const [passHelper, setPassHelper] = useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [severity, setSnackbarSeverity] = React.useState('');
    const [flushDataOpen, setFlushDataOpen] = useState(false);
    const { flushDataSuccess, flushDataError } = useSelector((state) => state.flushZebraData);
    const { deviceWriteTagValidation } = useSelector((state) => state.deviceWriteTag);
    const [deviceValidation, setDeviceValidation] = useState(deviceWriteTagValidation);
    const { addDrawerSucess, addDrawerError } = useSelector((state) => state.getAddDrawer);
    //const { options } = useSelector((state) => state.getDropDown);
    console.log('optionsbatch', options);
    const [errorMessage, setErrorMessage] = useState('');
    const [drawerAlert, setDrawerAlert] = useState(false);
    const [drawerNameVal, setDrawerNameVal] = useState(false);
    const [email, setEmail] = useState('');
    const [valid, setValid] = useState(true);
    console.log('valid', valid);
    const [error, setError] = useState('');
    const [errorbatch, setErrorBatch] = useState('');
    const [initialRender, setInitialRender] = useState(true);
    //const [submittedEmails, setSubmittedEmails] = useState([]);
    //console.log("submittedEmails", submittedEmails)
    const [emailValidated, setEmailValidated] = useState(false);
    console.log('emailValidated', emailValidated);

    const { emailSuccess } = useSelector((state) => state.swapoutEmailSettingsStore);
    console.log('emailsuccess', emailSuccess?.data?.swapOut);

    let [notificationState, setNotificationState] = useState({
        popup: {
            productRuleBreak: true,
            deviceRuleBreak: true,
            userRuleBreak: true
        },
        email: {
            productRuleBreak: true,
            deviceRuleBreak: true,
            userRuleBreak: true
        },
        general: {
            associateUnitValidation: true,
            deviceType: 'HF',
            features: ['Led'],
            barCodeFormat: 'ISBT'
        }
    });
    const { Lf_Hf_TagValidation } = useSelector((state) => state.lfTag);
    const [lfTag, setLfTag] = useState([]);
    const [lfFeature, setLfFeature] = useState([]);
    const [tempbarcode, setTempBarcode] = useState('');
    console.log('lfTag---', lfTag);
    console.log('lfFeature---', lfFeature);
    useEffect(() => {
        if (Array.isArray(Lf_Hf_TagValidation)) {
            setLfTag([...Lf_Hf_TagValidation]);
        }
    }, [Lf_Hf_TagValidation]);

    function showSnackbar(isopen, message, severity) {
        setSnackbarMessage(`${message}`);
        setSnackbarSeverity(severity);
        setOpenSnackbar(isopen);
    }
    const handleDEviceValidation = (e) => {
        setDeviceValidation(!e);
        dispatch(deviceWriteTag(!e));
    };

    const handleLFtag = (e, info) => {
        console.log('handleLFtag');
        setInitialRender(false);
        let tempLfTag = [...lfTag];
        let validFeature = [...lfFeature];

        if (info.includes('LF') && e) {
            tempLfTag = tempLfTag.filter((i) => i !== 'Manual' && i !== 'HF');
            validFeature = validFeature.filter((i) => i !== 'hfWrite' && i !== 'hfLed');

            if (!tempLfTag.includes(info)) {
                tempLfTag = [...tempLfTag, info];
            }
        } else if (info.includes('LF')) {
            tempLfTag = [];
        }
        if (info.includes('HF') && e) {
            tempLfTag = tempLfTag.filter((i) => i !== 'Manual' && i !== 'LF');
            validFeature = validFeature.filter((i) => i !== 'lfWrite' && i !== 'lfLed');

            setLfFeature([]);
            if (!tempLfTag.includes(info)) {
                tempLfTag = [...tempLfTag, info];
            }
        } else if (info.includes('HF')) {
            tempLfTag = [];
        }
        if (info.includes('Manual') && e) {
            tempLfTag = [info];
            validFeature = validFeature.filter(
                (i) => i !== 'hfWrite' && i !== 'hfLed' && i !== 'lfWrite' && i !== 'lfLed'
            );
        } else if (info.includes('Manual')) {
            tempLfTag = [];
        }
        setLfTag([...tempLfTag]);

        let deviceType = [...tempLfTag].toString();
        let barCodeFormat = info;
        setTempBarcode(barCodeFormat);

        let features = [...validFeature];
        features = [...new Set(features)];
        let general = { ...notificationState?.['general'], deviceType, features };
        let genSettings = { ...notificationState, general };

        setNotificationState(genSettings);

        if (genSettings?._id === undefined) {
            console.log('POST');
            genSettings['userId'] = userInfo?.data?.user?._id;
            dispatch(notificationSettingsAction(genSettings));
        } else {
            genSettings['_id'] = options?.data?.[0]?._id;
            genSettings['userId'] = userInfo?.data?.user?._id;
            console.log('PUT');
            dispatch(notificationSettingsAction(genSettings, 'put'));
        }
    };

    const handleFeatures = (e, info) => {
        console.log('Features');
        setInitialRender(false);
        console.log(info);
        let tempLfFeature = [...lfFeature];
        let validDevice = [...lfTag];

        if (info === 'lfWrite') {
            tempLfFeature = tempLfFeature.filter((i) => i !== 'hfWrite' && i !== 'hfLed');
            validDevice = validDevice.filter((i) => i !== 'HF' && i !== 'Manual');
            validDevice = ['LF'];

            if (e) {
                if (!tempLfFeature.includes(info)) {
                    tempLfFeature = [...tempLfFeature, 'Write'];
                }
            } else {
                tempLfFeature = tempLfFeature.filter((i) => i !== 'Write');
            }
        }
        if (info === 'lfLed') {
            //tempLfFeature = tempLfFeature.filter((i) => i !== 'hfWrite' && i !== 'hfLed');
            //validDevice = validDevice.filter((i) => i !== 'HF' && i !== 'Manual');
            validDevice = ['LF'];

            if (e) {
                if (!tempLfFeature.includes(info)) {
                    tempLfFeature = [...tempLfFeature, 'Led'];
                }
            } else {
                tempLfFeature = tempLfFeature.filter((i) => i !== 'Led');
            }
        }
        if (info === 'hfWrite') {
            //tempLfFeature = tempLfFeature.filter((i) => i !== 'lfWrite' && i !== 'lfLed');
            //validDevice = validDevice.filter((i) => i !== 'LF' && i !== 'Manual');
            validDevice = ['HF'];

            if (e) {
                if (!tempLfFeature.includes(info)) {
                    tempLfFeature = [...tempLfFeature, 'Write'];
                }
            } else {
                tempLfFeature = tempLfFeature.filter((i) => i !== 'Write');
            }
        }
        if (info === 'hfLed') {
            //tempLfFeature = tempLfFeature.filter((i) => i !== 'lfWrite' && i !== 'lfLed');
            //validDevice = validDevice.filter((i) => i !== 'LF' && i !== 'Manual');
            validDevice = ['HF'];

            if (e) {
                if (!tempLfFeature.includes(info)) {
                    tempLfFeature = [...tempLfFeature, 'Led'];
                }
            } else {
                tempLfFeature = tempLfFeature.filter((i) => i !== 'Led');
            }
        }
        if (info.includes('manual') && e) {
            tempLfFeature = [info];
        } else if (info.includes('manual')) {
            tempLfFeature = [];
        }
        setLfFeature([...tempLfFeature]);

        let features = [...tempLfFeature];
        features = [...new Set(tempLfFeature)];

        let deviceType = [...validDevice].toString();
        let general = { ...notificationState?.['general'], deviceType, features };
        let genSettings = { ...notificationState, general };

        setNotificationState(genSettings);
        console.log('-----------' + settingsData + '--------------');
        if (options?.data?.length === 0) {
            genSettings['userId'] = userInfo?.data?.user?._id;

            dispatch(notificationSettingsAction(genSettings));
        } else {
            console.log('ID---------------' + settingsData?.data?.[0]?._id);
            genSettings['_id'] = settingsData?.data?.[0]?._id;
            genSettings['userId'] = userInfo?.data?.user?._id;
            dispatch(notificationSettingsAction(genSettings, 'put'));
        }
    };

    const handleBarcodeFormat = (e, info) => {
        console.log('handleBarcodeFormat');
        setInitialRender(false);
        let tempLfTag = [...lfTag];
        let validFeature = [...lfFeature];
        setLfTag([...tempLfTag]);

        let deviceType = [...tempLfTag].toString();
        let barCodeFormat = info;

        let features = [...validFeature];
        features = [...new Set(features)];
        let general = { ...notificationState?.['general'], barCodeFormat };
        let genSettings = { ...notificationState, general };

        setNotificationState(genSettings);

        if (genSettings?._id === undefined) {
            console.log('POST');
            genSettings['userId'] = userInfo?.data?.user?._id;
            dispatch(notificationSettingsAction(genSettings));
        } else {
            genSettings['_id'] = options?.data?.[0]?._id;
            genSettings['userId'] = userInfo?.data?.user?._id;
            console.log('PUT');
            dispatch(notificationSettingsAction(genSettings, 'put'));
        }
    };

    useEffect(() => {
        if (file?.status === true) setAlertOpen(true);
    }, [file]);
    const [formData, setFormData] = useState({
        name: '',
        collectionName: '',
        type: '',
        level: '1',
        component: '',
        sequence: '',
        icon: '',
        useraccessroleId: '',
        path: ``
    });
    const [formDataValidation, setFormDataValidation] = useState({
        name: '',
        collectionName: '',
        type: '',
        level: '',
        component: '',
        sequence: '',
        icon: '',
        useraccessroleId: '',
        path: ``
    });
    useEffect(() => {
        setFormData({
            ...formData,
            path: `/dashboard${formData?.component && '/' + formData?.component?.toLowerCase()}/${
                formData?.name?.includes(' ')
                    ? formData?.name?.replace(' ', '-').toLocaleLowerCase()
                    : formData?.name.toLocaleLowerCase()
            }`
        });
    }, [formData.component, formData.name]);
    useEffect(() => {
        if (flushDataSuccess) {
            showSnackbar(true, 'Data Flushed', 'success');
        }
        if (flushDataError) {
            showSnackbar(true, 'Request Failed', 'error');
        }
    }, [flushDataSuccess, flushDataError]);
    useEffect(() => {
        if (formData.level === '1') {
            setFormData({ ...formData, component: '' });
        } else if (formData.level === '2') {
            setFormData({ ...formData, sequence: '', icon: '' });
        }
    }, [formData.level]);

    const handleChange = (event) => {
        if (event.target.name === 'dateFormat') {
            dispatch(dateFormatSelection(event.target.value));
        }

        if (event.target.name === 'api') {
            dispatch(apiResponseType(event.target.value));
        }
    };
    const resetFormData = () => {
        setFormData({
            name: '',
            collectionName: '',
            type: '',
            level: '1',
            component: '',
            sequence: '',
            icon: '',
            useraccessroleId: '',
            path: ``
        });
    };
    const handleValidation = () => {
        setFormDataValidation({
            name: '',
            collectionName: '',
            type: '',
            level: '',
            component: '',
            sequence: '',
            icon: '',
            useraccessroleId: '',
            path: ``
        });
    };

    useEffect(() => {
        addDrawerSucess?.status === true && setDrawerAlert(true);

        if (addDrawerSucess?.status === true) {
            handleValidation();
            handleDrawerClose();
            resetFormData();
            setDrawerAlert(true);
            handleValidation();
        }
        addDrawerError?.status === false && setErrorMessage(addDrawerError?.error?.errorMessage);
        addDrawerError?.errorMessage && dispatch(clearAddDrawer());

        setTimeout(() => {
            dispatch(clearAddDrawer());
        }, 3000);
    }, [addDrawerSucess, addDrawerError]);

    const DateFormatExample = ({ label }) => (
        <Grid className={classes.dateMargin}>
            <Typography variant="subtitle2" color={label === dateFormat ? 'primary' : 'default'}>
                {label}
            </Typography>
            <Typography
                variant={label === dateFormat ? 'h6' : 'subtitle1'}
                color={label === dateFormat ? 'primary' : 'default'}
            >
                {moment(new Date()).format(label)}
            </Typography>
        </Grid>
    );
    const renderChat = () => {
        <Card>
            {chat.map(({ name, message }, index) => (
                <div key={index}>
                    <h3>
                        {name}: <span>{message}</span>
                    </h3>
                </div>
            ))}
        </Card>;
    };

    const handleFlushData = () => {
        setPassHelper('');
        setPassword('');
        setFlushDataOpen(!flushDataOpen);
    };
    const handleDrawerClose = () => {
        setDrawerFormOpen(false);
        handleValidation();
        setErrorMessage('');
        resetFormData();
    };
    const handleAddDrawer = () => {

        if (formData.name === '') {
            setFormDataValidation({ ...formDataValidation, name: true });
            return;
        }

        let object = {};
        Object.keys(formData).forEach((k) => {
            if (formData[k] == false) delete formData[k];
            if (k === 'level') {
                formData[k] = formData[k] * 1;
            }
            if (k === 'sequence') {
                formData[k] = formData[k] * 1;
            }
        });
        object.validData = formData;

        dispatch(getAddDrawer(JSON.stringify(object)));
        setInitialRender(false);
    };
    const handleDeleteData = (e) => {
        if (password === 'Spacecode@9686') {
            handleFlushData();
            dispatch(flushZebraAction());
            setInitialRender(false);
        } else {
            setPassHelper('Incorrect Password');
        }
    };

    const flushDialogChild = (
        <Grid container alignItems="center">
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

    useEffect(() => {
        //console.log("----Setting Data---------" + JSON.stringify(settingsData))
        //let filters = JSON.stringify([{ key: 'userId._id', value: userInfo?.data?.user?._id }]);
        //dispatch(getSettings('setting', filters));
        if (!initialRender) {
            if (nsSuccess?.status) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: 'settings update successful',
                        alertType: 'success'
                    })
                );
                let filters = JSON.stringify([{ key: 'userId._id', value: userInfo?.data?.user?._id }]);
                dispatch(getSettings('setting', filters));
            }
            if (nsError) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: 'settings update failed',
                        alertType: 'error'
                    })
                );
            }
        }
    }, [nsSuccess, nsError]);

    useEffect(() => {
        console.log('----Setting Data---------' + settingsData);
        if (settingsData === undefined || settingsData.length == 0) {
            console.log('----Setting Data---------' + JSON.stringify(settingsData));
            let filters = JSON.stringify([{ key: 'userId._id', value: userInfo?.data?.user?._id }]);
            dispatch(getSettings('setting', filters));
        }
    }, []);

    //useEffect(() => {
    //    getSettingsData();
    //}, []);

    //useEffect(() => {
    //    dispatch(getBatchSettings());
    //}, []);

    const getSettingsData = async () => {
        dispatch(getSettings('setting'));
    };

    const handleBackClick = () => {
        if (history.location.pathname === '/dashboard/settings') {
            history.goBack();
        } else {
            history.push('/dashboard');
        }
    };

    useEffect(() => {
        console.log('----Setting Data---------' + settingsData);
        dispatch(getData('productgroup'));
    }, [settingsData]);

    useEffect(() => {
        console.log('batchproducts----');
        dispatch(getDropDown('batchproducts'));
    }, []);

    //useEffect(() => {
    //    console.log('batchproducts----' + JSON.stringify(settingsData));
    //    dispatch(getData('batchproducts'));
    //}, [settingsData]);

    useEffect(() => {
        //console.log("----Setting Remote---------" + JSON.stringify(settingsRemote))
        //let filters = JSON.stringify([{ key: 'userId._id', value: userInfo?.data?.user?._id }]);
        //dispatch(getRemote('setting', filters));
        if (!initialRender) {
            if (nsSuccess?.status) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: 'settings update successful',
                        alertType: 'success'
                    })
                );
                let filters = JSON.stringify([{ key: 'userId._id', value: userInfo?.data?.user?._id }]);
                dispatch(getRemote('setting', filters));
            }
            if (nsError) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: 'settings update failed',
                        alertType: 'error'
                    })
                );
            }
        }
    }, [nsSuccess, nsError]);

    useEffect(() => {
        console.log('----Setting Remote---------' + settingsRemote);
        if (settingsRemote === undefined || settingsRemote.length == 0) {
            console.log('----Setting Remote---------' + JSON.stringify(settingsRemote));
            let filters = JSON.stringify([{ key: 'userId._id', value: userInfo?.data?.user?._id }]);
            dispatch(getRemote('setting', filters));
        }
    }, [settingsRemote]);

    useEffect(() => {
        console.log('----------Setting---------' + options?.data);
        if (options?.data?.length > 0) {
            if (options?.data?.[0]?.userId?.[0]?._id === userInfo?.data?.user?._id) {
                let tempData = options?.data?.[0];
                let tempNS = {
                    _id: tempData?._id,
                    email: tempData?.email,
                    popup: tempData?.popup,
                    general: tempData?.general,
                    dereservation: tempData?.dereservation,
                    batchDereservation: tempData?.batchDereservation
                };
                setNotificationState(tempNS);
            }
        }
        if (nsSuccess?.status || nsError) {
            dispatch(clearNotificationSettingsResponse());
        }
    }, [options]);

    const handleNotificationSettings = (e) => {
        setInitialRender(false);
        let tempSettings = { ...notificationState };
        if (e?.target?.name === 'pproductRuleBreak') {
            let productRuleBreak = e?.target?.checked;
            let popup = { ...notificationState?.['popup'], productRuleBreak };
            tempSettings = { ...tempSettings, popup };
        }
        if (e?.target?.name === 'pdeviceRuleBreak') {
            let deviceRuleBreak = e?.target?.checked;
            let popup = { ...notificationState?.['popup'], deviceRuleBreak };
            tempSettings = { ...tempSettings, popup };
        }
        if (e?.target?.name === 'puserRuleBreak') {
            let userRuleBreak = e?.target?.checked;
            let popup = { ...notificationState?.['popup'], userRuleBreak };
            tempSettings = { ...tempSettings, popup };
        }
        if (e?.target?.name === 'eproductRuleBreak') {
            let productRuleBreak = e?.target?.checked;
            let email = { ...notificationState?.['email'], productRuleBreak };
            tempSettings = { ...tempSettings, email };
        }
        if (e?.target?.name === 'edeviceRuleBreak') {
            let deviceRuleBreak = e?.target?.checked;
            let email = { ...notificationState?.['email'], deviceRuleBreak };
            tempSettings = { ...tempSettings, email };
        }
        if (e?.target?.name === 'euserRuleBreak') {
            let userRuleBreak = e?.target?.checked;
            let email = { ...notificationState?.['email'], userRuleBreak };
            tempSettings = { ...tempSettings, email };
        }
        setNotificationState(tempSettings);
        if (options?.data?.length === 0) {
            tempSettings['userId'] = userInfo?.data?.user?._id;
            dispatch(notificationSettingsAction(tempSettings));
        } else {
            tempSettings['_id'] = options?.data?.[0]?._id;
            tempSettings['userId'] = userInfo?.data?.user?._id;
            dispatch(notificationSettingsAction(tempSettings, 'put'));
        }
    };

    const maxWidth959 = useMediaQuery('(max-width:1280px)');

    const [open, setOpen] = useState(false);
    // const [hr, setHr] = useState('-')
    // const [minutes, setMinutes] = useState('-')
    const [time, setTime] = useState('');
    const [mins, setMins] = useState('');
    console.log('ti', time);
    const [form, setForm] = useState({});

    const [swapmins, setSwapmins] = useState('');
    const [unitsmerger, setUnitsMerger] = useState('');
    const [escalationTime, setEscalationTime] = useState('');

    const [openBatch, setOpenBatch] = useState(false);
    // const [hr, setHr] = useState('-')
    // const [minutes, setMinutes] = useState('-')
    const [batchtime, setBatchTime] = useState('');
    const [batchmins, setBatchMins] = useState('');
    console.log('ti', batchtime);
    const [batchform, setBatchForm] = useState({});

    const handleClickOpen = (ele) => {
        setForm(ele);
        setOpen(true);
        console.log('form---', form);
        console.log('el---', ele);
        let hrs = getHours(ele._id);
        setTime(hrs === '-' ? '' : hrs);
        console.log('hrs', hrs);
        let minutes = getMins(ele._id);
        setMins(minutes === '-' ? '' : minutes);
        console.log('minutes', minutes);
    };

    const handleClickBatchOpen = (ele) => {
        setBatchForm(ele);
        setOpenBatch(true);
        console.log('form---', batchform);
        console.log('el---', ele);
        let hrs = getBatchHours(ele._id);
        setBatchTime(hrs === '-' ? '' : hrs);
        console.log('hrs', hrs);
        let minutes = getBatchMins(ele._id);
        setBatchMins(minutes === '-' ? '' : minutes);
        console.log('minutes', minutes);
    };

    const handleClose = () => {
        setOpen(false);
        setTime('');
        setMins('');
        setError('');
    };

    const handleBatchClose = () => {
        setOpenBatch(false);
        setBatchTime('');
        setBatchMins('');
        setErrorBatch('');
    };

    const handleSaveClick = () => {
        let obj = {
            productgroupId: form._id,
            dereservationTime: {
                Hours: time,
                Minutes: mins
            }
        };
        // let obj = form
        //obj.hour = time
        //obj.minutes = mins
        console.log('save---', obj);
        setOpen(false);
        dispatch(dereservationSettingAction(obj));
        setInitialRender(false);
    };

    const handleBatchSaveClick = () => {
        let obj = {
            batchProductId: batchform._id,
            dereservationTime: {
                Hours: batchtime,
                Minutes: batchmins
            }
        };
        console.log('save---', obj);
        setOpenBatch(false);
        dispatch(dereservationBatchSettingAction(obj));
        setInitialRender(false);
    };

    const getHours = (productgroupId) => {
        console.log('------------' + productgroupId + '-----------');

        console.log(settingsData, 'noti---------');

        let data = settingsData?.dereservation?.filter((obj) => obj.productgroupId === productgroupId);

        if (data && data.length > 0) {
            console.log('dada--', data[0]);

            return data[0]?.dereservationTime?.Hours;
        } else {
            return '-';
        }
    };

    const getBatchHours = (batchProductId) => {
        console.log('------------' + batchProductId + '-----------');

        console.log(settingsData, 'noti---------');

        let data = settingsData?.batchDereservation?.filter((obj) => obj.batchProductId === batchProductId);
        console.log('daaaadaaa--', data);
        if (data && data.length > 0) {
            console.log('daaaadaaa--', data);
            return data[0]?.dereservationTime?.Hours;
        } else {
            return '-';
        }
    };

    const getMins = (productgroupId) => {
        console.log('------------' + productgroupId + '-----------');

        console.log(settingsData, 'noti---------');

        let data = settingsData?.dereservation?.filter((obj) => obj.productgroupId === productgroupId);

        if (data && data.length > 0) {
            console.log(data);
            return data[0]?.dereservationTime?.Minutes;
        } else {
            return '-';
        }
    };

    const getBatchMins = (batchProductId) => {
        console.log('------------' + batchProductId + '-----------');

        console.log(settingsData, 'noti---------');

        let data = settingsData?.batchDereservation?.filter((obj) => obj.batchProductId === batchProductId);

        if (data && data.length > 0) {
            console.log(data);
            return data[0]?.dereservationTime?.Minutes;
        } else {
            return '-';
        }
    };

    // const [switchs, setSwitchs] = useState()

    const [enable, setEnable] = useState();
    useEffect(() => {
        dispatch(settingSwapoutEmail());
    }, []);

    useEffect(() => {
        if (emailSuccess?.data?.swapOut?.swap !== undefined) {
            setEnable(emailSuccess.data.swapOut.swap);
            setSwapmins(emailSuccess.data.swapOut.fillFormTimeOut);
            setUnitsMerger(emailSuccess.data.swapOut.fillFormUnitsOrMerger);
            setEscalationTime(emailSuccess.data?.swapOut?.incompleteRecipientEscalationAlert);
            setEmails(emailSuccess?.data?.swapOut?.email);
        }
    }, [emailSuccess]);
    console.log('unitsmerger', unitsmerger);
    useEffect(() => {
        if (settingsData?.DateTimeSetting !== undefined) {
            setactivityDateTimeFormat(settingsData?.DateTimeSetting?.ActivityDateTimeFormat);
            setbatchDereservedDateTimeFormat(settingsData?.DateTimeSetting?.BatchDereservedDateTimeFormat);
            setbatchExpiryDateFormat(settingsData?.DateTimeSetting?.BatchExpiryDateFormat);
            setunitDereservedDateTimeFormat(settingsData?.DateTimeSetting?.UnitDereservedDateTimeFormat);
            setunitExpiryDateTimeFormat(settingsData?.DateTimeSetting?.UnitExpiryDateTimeFormat);
        }
    }, [settingsData]);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = (event) => {
        setInitialRender(false);
        event.preventDefault();
        if (emailRegex.test(email)) {
            setEmails([...emails, email]);
            setEmail('');
            setEmailValidated(true);
        } else {
            setValid(false);
            setEmailValidated(false);
        }
    };

    const handleEmailChange = (event) => {
        setInitialRender(false);
        setEmail(event.target.value);
        setValid(true);
        setEmailValidated(false);
    };
    console.log('ssssssssss', emailSuccess?.data?.swapOut?.swap);

    const [activityDateTimeFormat, setactivityDateTimeFormat] = useState();
    const [batchDereservedDateTimeFormat, setbatchDereservedDateTimeFormat] = useState();
    const [batchExpiryDateFormat, setbatchExpiryDateFormat] = useState();
    const [unitDereservedDateTimeFormat, setunitDereservedDateTimeFormat] = useState();
    const [unitExpiryDateTimeFormat, setunitExpiryDateTimeFormat] = useState();
    const [datesFormat, setDatesFormat] = useState();

    const handleDateFormat = (event) => {
        setDatesFormat(event.target.value);
    }
    console.log('date-----', datesFormat)

    //const handleDateAddButtonClick = () => {
        
    //    setDisplayedValues([datesFormat]);
    //   // setDatesFormat('');
    //};

    const onFormCheck = (e) => {
        setInitialRender(false);
        setEnable(e.target.checked);
    };
    console.log('enable--', enable);

    const handleswapSubmit = () => {
        setInitialRender(false);
        const minsValue = parseInt(swapmins, 10);
        const merger = parseInt(unitsmerger, 10);
        const escalationAlertTime = parseInt(escalationTime, 10);
        let SwapoutEmail = {
            email: emails,
            swap: enable,
            fillFormTimeOut: minsValue,
            fillFormUnitsOrMerger: merger,
            incompleteRecipientEscalationAlert: escalationAlertTime,
        };
        console.log('swapsubmit', SwapoutEmail);
        dispatch(settingSwapoutEmail(SwapoutEmail));
        console.log('-------swap-------');

        //setSubmittedEmails([]);
    };

    //const handleDeleteChip = (index) => {

    //    console.log("Delete chip" + index);
    //    setSubmittedEmails((prevSubmittedEmails) => prevSubmittedEmails.filter((_, i) => i !== index));
    //};

    const [emails, setEmails] = useState([]);
    const handleDelete = (index) => {
        setInitialRender(false);
        let updatedEmails = [...emails];
        updatedEmails = updatedEmails.filter((_, i) => i !== index);
        console.log('updatedEmails', updatedEmails);
        // updatedEmails.splice(index, 1);

        setEmails(updatedEmails);
    };
    console.log('emails--', emails);

    const handleMinutesChange = (ev) => {
        const newValue = ev.target.value;
        if (!isNaN(newValue) && newValue >= 0 && newValue <= 60) {
            setMins(newValue);
            setError(''); // Clear any previous error message
        } else {
            setMins('');
            setError('Invalid value. Please enter a number between 0 and 60.');
        }
    };

    const handleBatchMinutesChange = (ev) => {
        const newValue = ev.target.value;
        if (!isNaN(newValue) && newValue >= 0 && newValue <= 60) {
            setBatchMins(newValue);
            setErrorBatch(''); // Clear any previous error message
        } else {
            setBatchMins('');
            setErrorBatch('Invalid value. Please enter a number between 0 and 60.');
        }
    };

    const handleDateFormatSave = () => {
        setInitialRender(false);
        let dates = {
            userId: userInfo?.data?.user?._id,
            DateTimeSetting: {
                ActivityDateTimeFormat: activityDateTimeFormat,
                BatchDereservedDateTimeFormat: batchDereservedDateTimeFormat,
                BatchExpiryDateFormat: batchExpiryDateFormat,
                UnitDereservedDateTimeFormat: unitDereservedDateTimeFormat,
                UnitExpiryDateTimeFormat: unitExpiryDateTimeFormat
            }
        };

        dispatch(notificationSettingsAction(dates))
            .then(response => {
                if (response && response.status && response.message) {
                    console.log(response.message);
                    setTimeout(() => {
                        console.log('Message will be cleared after 2 seconds');
                    }, 2000);
                } else {
                    console.error('Unexpected response:', response);
                }
            })
            .catch(error => {
                console.error('Error occurred:', error);
            });

        setactivityDateTimeFormat('');
        setbatchDereservedDateTimeFormat('');
        setbatchExpiryDateFormat('');
        setunitDereservedDateTimeFormat('');
        setunitExpiryDateTimeFormat('');
    };



    return (
        <>
            <Grid container direction="row" alignItems="stretch" >
                <Grid item spacing xs={4}>
                    <Card xs={5} className={classes.dateFormatCard} style={{ height: '85%', paddingBottom: '30px', marginTop: '40px' }}>
                        <CardHeader
                            style={{ margin: 0 }}
                            title={
                                <Typography style={{ display: 'flex', margin: 0 }} variant="h4" color="primary">
                                    Notification
                                </Typography>
                            }
                        ></CardHeader>
                        <CardContent>
                            <Typography style={{ display: 'flex', margin: 0 }} variant="h5" color="primary">
                                Popup
                            </Typography>
                            <Grid className={classes.content}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            onClick={handleNotificationSettings}
                                            name={'pproductRuleBreak'}
                                            checked={notificationState?.popup?.productRuleBreak}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                            {CONSTANTS.PRODUCT_RULE_BREAK}
                                        </Typography>
                                    }
                                />
                            </Grid>
                            <Grid className={classes.content}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            onClick={handleNotificationSettings}
                                            name={'puserRuleBreak'}
                                            checked={notificationState?.popup?.userRuleBreak}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                            {CONSTANTS.USER_RULE_BREAK}
                                        </Typography>
                                    }
                                />
                            </Grid>
                            <Grid className={classes.content}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            onClick={handleNotificationSettings}
                                            name={'pdeviceRuleBreak'}
                                            checked={notificationState?.popup?.deviceRuleBreak}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                            {CONSTANTS.DEVICE_RULE_BREAK}
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </CardContent>
                        <CardContent>
                            <Typography style={{ display: 'flex', margin: 0 }} variant="h5" color="primary">
                                Email
                            </Typography>
                            <Grid className={classes.content}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            onClick={handleNotificationSettings}
                                            name={'eproductRuleBreak'}
                                            checked={notificationState?.email?.productRuleBreak}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                            {' '}
                                            {CONSTANTS.PRODUCT_RULE_BREAK}
                                        </Typography>
                                    }
                                />
                            </Grid>
                            <Grid className={classes.content}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            name={'euserRuleBreak'}
                                            onClick={handleNotificationSettings}
                                            checked={notificationState?.email?.userRuleBreak}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                            {' '}
                                            {CONSTANTS.USER_RULE_BREAK}
                                        </Typography>
                                    }
                                />
                            </Grid>
                            <Grid className={classes.content}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            onClick={handleNotificationSettings}
                                            name={'edeviceRuleBreak'}
                                            checked={notificationState?.email?.deviceRuleBreak}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                            {CONSTANTS.DEVICE_RULE_BREAK}
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/*<Grid item spacing={1} xs={4} alignItems="stretch">*/}
                {/*     <Grid item xs={12} md={6} lg={3}>*/}
                {/*        <Card className={classes.dateFormatCard}>*/}
                {/*            <CardContent className={classes.content}>*/}
                {/*                <Typography variant="subtitle1" style={{ paddingRight: 20 }}>*/}
                {/*                    {CONSTANTS.LABEL_SAMPLE_DATA}*/}
                {/*                </Typography>*/}
                {/*                <UploadFile loading={loading} file={file} />*/}
                {/*            </CardContent>*/}
                {/*        </Card>*/}
                {/*    </Grid> */}
                {/*      <Grid item xs={12} md={6} lg={3}>*/}
                {/*        <Card className={classes.dateFormatCard}>*/}
                {/*            <CardContent className={classes.content}>*/}
                {/*                <Typography variant="subtitle1" style={{ paddingRight: 20 }}>*/}
                {/*                    {CONSTANTS.LABLE_DOWNLOAD_EXCEL}*/}
                {/*                </Typography>*/}
                {/*                <Button variant="contained" color="primary" size="small">*/}
                {/*                    Download*/}
                {/*                </Button>*/}
                {/*            </CardContent>*/}
                {/*        </Card>*/}
                {/*    </Grid>*/}

                {/*     <Grid item xs={12} md={6} lg={3}>*/}
                {/*        <Card className={classes.dateFormatCard}>*/}
                {/*            <CardContent className={classes.content}>*/}
                {/*                <Typography variant="subtitle1" style={{ paddingRight: 20 }}>*/}
                {/*                    {'Flush Zebra Data'}*/}
                {/*                </Typography>*/}
                {/*                <Button*/}
                {/*                    variant="contained"*/}
                {/*                    className={classes.deleteButton}*/}
                {/*                    onClick={handleFlushData}*/}
                {/*                    size="small"*/}
                {/*                >*/}
                {/*                    Delete*/}
                {/*                </Button>*/}
                {/*            </CardContent>*/}
                {/*        </Card>*/}
                {/*    </Grid> */}

                {/*</Grid>*/}

                <Grid item spacing xs={4}>
                    <Card xs={5} style={{ height: '85%', marginBottom: '30px', marginTop: '40px' }} className={classes.dateFormatCard}>
                        <CardHeader
                            style={{ margin: 0 }}
                            title={
                                <Typography style={{ display: 'flex', margin: 0 }} variant="h4" color="primary">
                                    General
                                </Typography>
                            }
                        ></CardHeader>
                        <CardContent>
                            {/*<Grid >*/}
                            {/*    <FormControlLabel*/}
                            {/*        control={*/}
                            {/*            <Checkbox*/}
                            {/*                color="primary"*/}
                            {/*                onClick={() => handleAssociateUnitValidaion(associateUnitValidation)}*/}
                            {/*                // name={associateUnitValidation}*/}
                            {/*                checked={settingsData.associateUnitValidation}*/}
                            {/*            />*/}
                            {/*        }*/}
                            {/*        label={*/}
                            {/*            <Typography variant="subtitle1" style={{ paddingTop: 2 }}>*/}
                            {/*                {CONSTANTS.ASSOCIATE_UNIT_VALIDATION_LABEL}*/}
                            {/*            </Typography>*/}
                            {/*        }*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            {/* <Grid className={classses.content}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            onClick={() => handleDEviceValidation(deviceValidation)}
                                            // name={deviceValidation}
                                            checked={deviceValidation}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                            {CONSTANTS.DEVICE_WRTIE_TAG}{' '}
                                        </Typography>
                                    }
                                />
                            </Grid> */}

                            <Grid>
                                <Typography
                                    style={{ display: 'flex', margin: 0, paddingTop: 20 }}
                                    variant="h5"
                                    color="primary"
                                >
                                    Barcode
                                </Typography>
                            </Grid>
                            <Grid style={{ display: 'flex' }}>
                                <Grid style={{ width: '50px' }}></Grid>
                                <Grid>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                onClick={(e) => handleBarcodeFormat(e?.target?.checked, 'ISBT')}
                                                //name={deviceValidation}
                                                checked={settingsData?.general?.barCodeFormat === 'ISBT'}
                                            />
                                        }
                                        label={
                                            <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                                {'ISBT '}
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid style={{ display: 'flex' }}>
                                <Grid style={{ width: '50px' }}></Grid>
                                <Grid>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                onClick={(e) => handleBarcodeFormat(e?.target?.checked, 'AUSTRALIAN')}
                                                // name={deviceValidation}
                                                checked={settingsData?.general?.barCodeFormat === 'AUSTRALIAN'}
                                            />
                                        }
                                        label={
                                            <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                                {'Australian'}
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <Grid style={{ paddingTop: 20 }}>
                                <Typography style={{ display: 'flex', margin: 0 }} variant="h5" color="primary">
                                    Technology
                                </Typography>
                            </Grid>

                            <Grid>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            onClick={(e) => handleLFtag(e?.target?.checked, 'LF')}
                                            // name={'lf'}
                                            // name={deviceValidation}
                                            checked={settingsData?.general?.deviceType === 'LF'}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1" color="primary" style={{ paddingTop: 2 }}>
                                            {'LF'}
                                        </Typography>
                                    }
                                />
                            </Grid>
                            <Grid style={{ display: 'flex' }}>
                                <Grid style={{ width: '50px' }}></Grid>
                                <Grid>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                onClick={(e) => handleFeatures(e?.target?.checked, 'lfLed')}
                                                // name={deviceValidation}
                                                checked={
                                                    settingsData?.general?.deviceType === 'LF' &&
                                                    settingsData?.general?.features.includes('Led')
                                                }
                                            />
                                        }
                                        label={
                                            <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                                {'LED Trigger '}
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid style={{ display: 'flex' }}>
                                <Grid style={{ width: '50px' }}></Grid>
                                <Grid>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                onClick={(e) => handleFeatures(e?.target?.checked, 'lfWrite')}
                                                // name={deviceValidation}
                                                checked={
                                                    settingsData?.general?.deviceType === 'LF' &&
                                                    settingsData?.general?.features.includes('Write')
                                                }
                                            />
                                        }
                                        label={
                                            <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                                {'Write Tag '}
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            onClick={(e) => handleLFtag(e?.target?.checked, 'HF')}
                                            // name={deviceValidation}
                                            checked={settingsData?.general?.deviceType === 'HF'}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                            {'HF'}
                                        </Typography>
                                    }
                                />
                            </Grid>
                            <Grid style={{ display: 'flex' }}>
                                <Grid style={{ width: '50px' }}></Grid>
                                <Grid>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                onClick={(e) => handleFeatures(e?.target?.checked, 'hfLed')}
                                                // name={deviceValidation}
                                                checked={
                                                    settingsData?.general?.deviceType === 'HF' &&
                                                    settingsData?.general?.features.includes('Led')
                                                }
                                            />
                                        }
                                        label={
                                            <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                                {'LED Trigger '}
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid style={{ display: 'flex' }}>
                                <Grid style={{ width: '50px' }}></Grid>
                                <Grid>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                onClick={(e) => handleFeatures(e?.target?.checked, 'hfWrite')}
                                                // name={deviceValidatsion}
                                                checked={
                                                    settingsData?.general?.deviceType === 'HF' &&
                                                    settingsData?.general?.features.includes('Write')
                                                }
                                            />
                                        }
                                        label={
                                            <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                                {'Write Tag '}
                                            </Typography>
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            onClick={(e) => handleLFtag(e?.target?.checked, 'Manual')}
                                            // name={deviceValidation}
                                            checked={settingsData?.general?.deviceType === 'Manual'}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1" style={{ paddingTop: 2 }}>
                                            {'Manual'}
                                        </Typography>
                                    }
                                />
                            </Grid>
                                {/*<Grid style={{ margin: 20 }}>*/}
                                {/*    <CustomButton*/}
                                {/*        onClick={() => setDrawerFormOpen(true)}*/}
                                {/*        color="primary"*/}
                                {/*        variant="outlined"*/}
                                {/*    >*/}
                                {/*        <Typography varaint="h5">Add Drawer</Typography>*/}
                                {/*    </CustomButton>*/}
                                {/*</Grid>*/}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item spacing xs={4}>
                <Card xs={5} style={{ height: '85%', marginBottom: '30px', marginTop: '40px' }} className={classes.dateFormatCard}>
                    <CardHeader
                        style={{ margin: 0 }}
                        title={
                            <Typography style={{ display: 'flex', margin: 0 }} variant="h4" color="primary">
                                Dereservation Units
                            </Typography>
                        }
                    ></CardHeader>
                    <CardContent>
                        <Grid className={classes.content}>
                            <Grid>
                                <TableContainer className={classes.tableContainer}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Hours</TableCell>
                                            <TableCell>Minutes</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            {responseData?.data?.map((ele, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{ele.name}</TableCell>

                                                    <TableCell>{getHours(ele._id)}</TableCell>

                                                    <TableCell>{getMins(ele._id)}</TableCell>

                                                    <TableCell>
                                                        <IconButton>
                                                            <EditIcon
                                                                onClick={() => handleClickOpen(ele)}
                                                                style={{ fontSize: 'big' }}
                                                            />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex' }}>
                <Grid item spacing xs={4}>
                        <Card xs={5} style={{ height: '95%', marginBottom: '30px', marginTop: '10px' }} className={classes.dateFormatCard}>
                            <CardHeader
                                style={{ margin: 0 }}
                            title={
                                <Typography variant="h4" color="primary">
                                    Dereservation Batches
                                </Typography>
                            }
                        ></CardHeader>
                        <CardContent>
                            <Grid className={classes.content}>
                                <Grid>
                                    <TableContainer className={classes.tableContainer}>
                                        <Table size="small">
                                            <TableHead>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Hours</TableCell>
                                                <TableCell>Minutes</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableHead>
                                            <TableBody>
                                                {options?.data?.map((ele, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{ele.name}</TableCell>

                                                        <TableCell>{getBatchHours(ele._id)}</TableCell>

                                                        <TableCell>{getBatchMins(ele._id)}</TableCell>

                                                        <TableCell>
                                                            <IconButton>
                                                                <EditIcon
                                                                    onClick={() => handleClickBatchOpen(ele)}
                                                                    style={{ fontSize: 'big' }}
                                                                />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                    <Grid ></Grid>
                <Grid item spacing xs={4}>
                        <Card xs={5} className={classes.dateFormatCard} style={{ marginBottom: '30px', marginTop: '10px', height: '95%' }}>
                            <CardHeader
                                style={{ margin: 0 }}
                                title={
                                    <Typography variant="h4" color="primary">
                                        EUO Settings
                                    </Typography>
                                }
                            ></CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <Grid
                                        item
                                        xs={3}
                                        className={classes.inputField}
                                        style={{ display: 'flex', paddingTop: '10px' }}
                                    >
                                        <InputLabel className={classes.inputLabel} style={{ paddingTop: '10px' }}>
                                            Swapout
                                        </InputLabel>
                                        <div style={{ paddingLeft: '200px' }}>
                                            <Switch
                                                color="primary"
                                                name="enable"
                                                checked={enable ?? false}
                                                onChange={onFormCheck}
                                            />
                                        </div>
                                    </Grid>
                                    <TextField
                                        style={{ paddingLeft: '90px' }}
                                        label="Email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        error={!valid}
                                        helperText={!valid ? 'Please enter a valid email.' : ''}
                                    />

                                    <Button type="submit" variant="contained" color="primary">
                                        Add
                                    </Button>
                                </form>

                                {/*<table className="table">*/}
                                {/*    {valid && (*/}
                                {/*    <>*/}
                                {/*    {submittedEmails.map((submittedEmail, index) => (*/}
                                {/*        <Chip*/}
                                {/*            key={index}*/}
                                {/*            label={submittedEmail}*/}
                                {/*            onDelete={() => handleDeleteChip(index)}*/}
                                {/*            color="primary"*/}
                                {/*            variant="outlined"*/}
                                {/*            style={{ margin: '5px' }}*/}
                                {/*        />*/}
                                {/*    ))*/}
                                {/*            }*/}
                                {/*        </>)}*/}
                                {/*</table>*/}

                                <Grid item xs={4} style={{ padding: '5px' }}>
                                    {emails?.map((email, index) => (
                                        <Grid item key={index} style={{ padding: '5px' }}>
                                            <Chip label={email} onDelete={() => handleDelete(index)} />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Grid item xs={12} style={{ padding: '15px' }}>
                                    <Grid item lg={12} className={classes.inputField}>
                                        <TextField
                                            label="Fill form timeout (Mins)"
                                            inputProps={{
                                                min: 0,
                                                max: 60
                                            }}
                                            onChange={(ev) => setSwapmins(ev.target.value)}
                                            value={swapmins}
                                            style={{ width: '90%' }}
                                        />
                                    </Grid>
                                </Grid>
                                    <Grid item xs={12} style={{ padding: '15px' }}>
                                    <Grid item lg={12} className={classes.inputField}>
                                        <TextField
                                            label="Fill form units merger (Sec)"
                                            inputProps={{
                                                min: 0,
                                                max: 60
                                            }}
                                            onChange={(ev) => setUnitsMerger(ev.target.value)}
                                            value={unitsmerger}
                                            style={{ width: '90%' }}
                                        />
                                        </Grid>
                                    </Grid>
                                        <Grid item xs={12} style={{ padding: '15px' }}>
                                <Grid item lg={12} className={classes.inputField}>
                                    <TextField
                                        label="Incomplete recipient escalation alert"
                                        inputProps={{
                                            min: 0,
                                            max: 60
                                        }}
                                        onChange={(ev) => setEscalationTime(ev.target.value)}
                                        value={escalationTime}
                                        style={{ width: '90%' }}
                                    />
                                    </Grid>
                                </Grid>

                                <Grid style={{ marginTop: '12px' }} />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    //disabled={submittedEmails?.length > 0 ? false : true}
                                    onClick={handleswapSubmit}
                                >
                                    Submit
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid ></Grid>
                  
                <Grid item spacing xs={4}>
                        <Card xs={5} className={classes.dateFormatCard} style={{ marginBottom: '30px', marginTop: '10px', height: '95%' }}>
                            <CardHeader
                                style={{ margin: 0 }}
                                title={
                                    <Typography variant="h4" color="primary">
                                       Date & Time Setting
                                    </Typography>
                                }
                            ></CardHeader>
                            <CardContent>

                                <Grid container spacing={3}>
                                <Grid item lg={12} className={classes.inputField}>
                                    <TextField
                                        label="Activity Date Format"
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{
                                            min: 0,
                                            max: 60
                                        }}
                                        onChange={(e) => setactivityDateTimeFormat(e.target.value)}
                                        value={activityDateTimeFormat}
                                        style={{ width: '80%' }}
                                    />
                                    </Grid>

                                <Grid item lg={12} className={classes.inputField}>
                                <TextField
                                        label="Batch Dereserved Date Format"
                                        InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        min: 0,
                                        max: 60
                                    }}
                                        onChange={(e) => setbatchDereservedDateTimeFormat(e.target.value)}
                                        value={batchDereservedDateTimeFormat}
                                        style={{ width: '80%' }}
                                />
                                </Grid>

                                <Grid item lg={12} className={classes.inputField}>
                                <TextField
                                        label="Batch Expiry Date Format"
                                        InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        min: 0,
                                        max: 60
                                    }}
                                        onChange={(e) => setbatchExpiryDateFormat(e.target.value)}
                                        value={batchExpiryDateFormat}
                                        style={{ width: '80%' }}
                                    />
                                </Grid>

                                <Grid item lg={12} className={classes.inputField}>
                                    <TextField
                                        label="Unit Dereserved Date Format"
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{
                                            min: 0,
                                            max: 60
                                        }}
                                        onChange={(e) => setunitDereservedDateTimeFormat(e.target.value)}
                                        value={unitDereservedDateTimeFormat}
                                        style={{ width: '80%' }}
                                    />
                                </Grid>

                                    <Grid item lg={12} className={classes.inputField}>
                                <TextField
                                        label="Unit Expiry Date Format"
                                        InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        min: 0,
                                        max: 60
                                    }}
                                        onChange={(e) => setunitExpiryDateTimeFormat(e.target.value)}
                                        value={unitExpiryDateTimeFormat}
                                        style={{ width: '80%' }}
                                    />
                                    </Grid>
                                </Grid>

                                <Grid style={{ marginTop: '15px' }} />

                                {/*<Button type="submit" variant="contained" color="primary" onClick={handleDateAddButtonClick}>*/}
                                {/*    Add*/}
                                {/*</Button>*/}
                                <Button type="submit" variant="contained" color="primary" onClick={handleDateFormatSave}>
                                    Save
                                </Button>
                               

                                
                                    {/*<div>*/}
                                    {/*    <Typography variant="h6">Entered Values:</Typography>*/}
                                    {/*    <ul>*/}
                                            
                                    {/*    <li>{ settingsData.DateTimeSetting?.DateTimeFormat}</li>*/}
                                           
                                    {/*    </ul>*/}
                                    {/*</div>*/}
                               

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>

                <Grid container xs={12} style={{ display: 'block' }}>
                    <Grid className={classes.lastUpdateText}>
                        <Typography variant={'body2'} className={classes.lastUpdate} align={'right'}>
                            Version: {`${versionData?.data?.version}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
           

            <Dialog
                maxWidth="lg"
                PaperProps={{
                    style: {
                        borderRadius: '10px',
                        backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                        padding: 20,
                        width: '500px'
                    }
                }}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Edit Hours and Minutes</DialogTitle>
                <DialogContent>
                    <Grid item xs={12} style={{ display: 'flex' }}>
                        <Grid item lg={6} className={classes.inputField}>
                            <TextField
                                label="Hours"
                                inputProps={{
                                    min: 0,
                                    max: 60
                                }}
                                onChange={(ev) => setTime(ev.target.value)}
                                value={time}
                            />
                        </Grid>

                        <Grid item lg={6} className={classes.inputField}>
                            <TextField
                                label="Minutes"
                                inputProps={{
                                    min: 0,
                                    max: 60
                                }}
                                onChange={handleMinutesChange}
                                value={mins}
                                error={Boolean(error)}
                                helperText={error}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', padding: '15px' }}>
                            <CustomButton variant="contained" onClick={handleClose}>
                                Cancel
                            </CustomButton>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
                            <CustomButton variant="contained" color="primary" onClick={handleSaveClick}>
                                Save
                            </CustomButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <Dialog
                maxWidth="lg"
                PaperProps={{
                    style: {
                        borderRadius: '10px',
                        backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                        padding: 20,
                        width: '500px'
                    }
                }}
                open={openBatch}
                onClose={handleBatchClose}
            >
                <DialogTitle>Edit Hours and Minutes</DialogTitle>
                <DialogContent>
                    <Grid item xs={12} style={{ display: 'flex' }}>
                        <Grid item xs={6} className={classes.inputField}>
                            <TextField
                                label="Hours"
                                inputProps={{
                                    min: 0,
                                    max: 60
                                }}
                                onChange={(ev) => setBatchTime(ev.target.value)}
                                value={batchtime}
                            />
                        </Grid>

                        <Grid item xs={6} className={classes.inputField}>
                            <TextField
                                label="Minutes"
                                inputProps={{
                                    min: 0,
                                    max: 60
                                }}
                                onChange={handleBatchMinutesChange}
                                error={Boolean(errorbatch)}
                                helperText={errorbatch}
                                value={batchmins}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', padding: '15px' }}>
                            <CustomButton variant="contained" onClick={handleBatchClose}>
                                Cancel
                            </CustomButton>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
                            <CustomButton variant="contained" color="primary" onClick={handleBatchSaveClick}>
                                Save
                            </CustomButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            
            {/* <CustomDialog
                title={`Flush Zebra Data`}
                open={flushDataOpen}
                onClose={handleFlushData}
                onCancelClick={handleFlushData}
                onSaveClick={handleDeleteData}
                isSave
                isDelete
                minWidth="460px"
            >
                {flushDialogChild}
            </CustomDialog> */}
            <CustomDialog
                title={`Add Drawer`}
                open={drawerFormOpen}
                onClose={handleDrawerClose}
                onCancelClick={handleDrawerClose}
                onSaveClick={handleAddDrawer}
                isSave
                error={errorMessage}
                isEdit
            >
                <AddDrawerForm
                    formData={formData}
                    handleValidation={handleValidation}
                    setFormData={setFormData}
                    formDataValidation={formDataValidation}
                />
            </CustomDialog>
            {alertOpen && (
                <Alert
                    open={alertOpen}
                    message={file.message}
                    duration={1500}
                    onClose={() => setAlertOpen(false)}
                    vertical={'bottom'}
                    horizontal={'center'}
                    severity={'success'}
                    actions={false}
                />
            )}
            {openSnackbar && (
                <Alert
                    open={openSnackbar}
                    message={snackbarMessage}
                    duration={2000}
                    onClose={() => setOpenSnackbar(false)}
                    vertical={'bottom'}
                    horizontal={'center'}
                    severity={severity === 'success' ? 'success' : 'error'}
                    actions={false}
                />
            )}
            {/* {openSnackbar && (
                <Alert
                    open={openSnackbar}
                    message={snackbarMessage}
                    duration={2000}
                    onClose={() => setOpenSnackbar(false)}
                    vertical={'bottom'}
                    horizontal={'center'}
                    severity={severity === 'success' ? 'success' : 'success'}
                    actions={false}
                />
            )} */}
            {drawerAlert && (
                <Alert
                    open={drawerAlert}
                    message={'Added Successful'}
                    duration={2000}
                    onClose={() => setDrawerAlert(false)}
                    vertical={'bottom'}
                    horizontal={'center'}
                    severity={'success'}
                    actions={false}
                />
            )}
        </>
    );
};

export default SettingsPage;
