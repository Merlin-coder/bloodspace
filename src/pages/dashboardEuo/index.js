import React, { lazy, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getDashboard,
    getTemperature,
    getTemperatureGraph,
    getDashboardEuo,
    getDashboardEuoUnitsIncomplete,
    getDashboardEuoBatchIncomplete,
    ackNotifyEuoSave,
    alertsEuo,
    alertsavEuo
} from 'redux/actions/dashboard/dashboardActions';
import { useStyles } from './style';
import UnderConstruction from '../../components/UnderConstruction';
import { Card, Grid, Typography, Tabs, Tab, Divider, Button, Hidden, IconButton, ButtonGroup } from '@material-ui/core';
import OpacityIcon from '@material-ui/icons/Opacity';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import WarningIcon from '@material-ui/icons/Warning';
import warningIcon from '../../assets/warningIcon.svg';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import { CustomButton, DatePicker } from 'common';
import ManulaDevice from '../../assets/manualDevice.png';
import EditNotepad from '../../assets/editNotepad.png';
import CloseCard from '../../assets/closeCard.png';
import TimerIcon from '@material-ui/icons/Timer';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { postAssignBatch, postAssignUnits, postMultipleAssign } from 'redux/actions/assignBatch';
import hours_48_From_Now from 'common/services/FourtyEightHours';
import { clearPostUnitResponse, postAddUnitData } from 'redux/actions/assignUnit/addUnitsRecipientActions';

import {
    useTheme,
    Dialog,
    DialogActions,
    DialogContent,
    InputLabel,
    DialogTitle,
    Paper,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    CircularProgress,
    Table,
    Switch,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead
} from '@material-ui/core';
import { settingsRemoteLoginPageAction } from 'redux/actions/socketAction';
import axios from 'axios';
import CountUp from 'react-countup';
import BarchartEuo from './BarchartEuo';
import { CustomInput } from 'components';
//const BarChart = lazy(() => import('./BarChart'));
import { getDropDown } from 'redux/actions/manage/manageFieldsAction';

import EuoDashboardTable from './tableEuo';
import EuoDashboardBatchTable from './batchtableEuo';
//import product from './product.json';
//import location from './location.json';
import { CONSTANTS } from 'common';
import DashboardEuoHeader from './dashboardEuoHeader';
import { Suspense } from 'react';
import Loader from 'components/loader/loader.container';
import { Link, useHistory } from 'react-router-dom';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';
import { getApplyFilters } from 'redux/actions/filters/globalFilterAction';
import NoDashboardData from 'components/404Page/noDataDashboard';
//import LineChart from './LineChart';
import { SelectOption } from 'components';
import ComboBox from 'components/comboBox';
import moment from 'moment';
import NoData from 'components/no data';
import { getSettings, get4thDropdown, settingSwapoutEmail, get8thDropdown } from 'redux/actions';
import {
    clearData,
    clearDropDown,
    clearPostResponse,
    createAlert,
    getData,
    postFormData,
    postSwapOutData,
    putSwapoutData,
    putSwapOutCancel,
    socketSessionIdAction
} from 'redux/actions';
import { clearResponseData, getResData } from 'redux/actions/scGenericApiCalls';
import { clearDeviceBatchesResponse, getBatchesByDeviceAction } from 'redux/actions/remoteDashboardActions';

// import { getUserAccessData } from 'redux/actions/userAccessAction';
const columns = [
    { id: 'product', label: 'Group by products', minWidth: 80 },
    { id: 'A-', label: 'A-', minWidth: 80, align: 'center' },
    {
        id: 'A+',
        label: 'A+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'B-',
        label: 'B-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'B+',
        label: 'B+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'AB+',
        label: 'AB+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'AB-',
        label: 'AB-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'Oh-',
        label: 'Oh-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'Oh+',
        label: 'Oh+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'O-',
        label: 'O-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'O+',
        label: 'O+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'Total',
        label: 'Total',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];
const batchcolumns = [
    { id: 'product', label: 'Group by products', minWidth: 80 },
    //{
    //    id: 'batchNumber',
    //    label: 'Batch Number',
    //    minWidth: 80,
    //    align: 'center',
    //    format: (value) => value.toFixed(2)
    //},
    {
        id: 'Total',
        label: 'Total',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];
const locationColumn = [
    { id: 'location', label: 'Group by location', minWidth: 80 },
    { id: 'A-', label: 'A-', minWidth: 80, align: 'center' },
    {
        id: 'A+',
        label: 'A+ ',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'B-',
        label: 'B-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'B+',
        label: 'B+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'AB+',
        label: 'AB+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'AB-',
        label: 'AB-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'Oh-',
        label: 'Oh-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'Oh+',
        label: 'Oh+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'O-',
        label: 'O-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'O+',
        label: 'O+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'Total',
        label: 'Total',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];

const batchlocationColumn = [
    { id: 'location', label: 'Group by location', minWidth: 80 },

    {
        id: 'Total',
        label: 'Total',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];

const deviceColumn = [
    { id: 'device', label: 'Group by Device', minWidth: 80 },
    { id: 'A-', label: 'A-', minWidth: 80, align: 'center' },
    {
        id: 'A+',
        label: 'A+ ',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'B-',
        label: 'B-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'B+',
        label: 'B+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'AB+',
        label: 'AB+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'AB-',
        label: 'AB-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'Oh-',
        label: 'Oh-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'Oh+',
        label: 'Oh+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'O-',
        label: 'O-',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'O+',
        label: 'O+',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'Total',
        label: 'Total',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];

const batchdeviceColumn = [
    { id: 'device', label: 'Group by Device', minWidth: 80 },

    {
        id: 'Total',
        label: 'Total',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];

const dashboardEUO = (props) => {
    console.log('propsss',props)
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [barLabels, setBarLabels] = React.useState([]);
    const [barValues, setBarValues] = React.useState([]);
    const [batchLabels, setBatchLabels] = React.useState([]);
    const [batchValues, setBatchValues] = React.useState([]);
    const emergencyRef = React.useRef();
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    console.log('set---', settingsData);
    const [screen, setScreen] = useState(0);
    const { data, loading } = useSelector((state) => state.getDashboard);
    console.log('data--', data);
    const { incompleteUnitsEuo } = useSelector((state) => state.getDashboardEuoUnitsIncomplete);
    console.log('incompleteUnitsEuo--', incompleteUnitsEuo);
    const { dataEuo } = useSelector((state) => state.getDashboardEuo);
    console.log('dataEuo--', dataEuo);
    const { alertsunderstoodEuo } = useSelector((state) => state.alertsEuo);
    console.log('aleEuooooo', alertsunderstoodEuo);
    const { alertsavunderstoodEuo } = useSelector((state) => state.alertsavEuo);
    console.log('aleavEuooooo', alertsavunderstoodEuo);
    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));
    console.log('devDeviceId', devDeviceId);
    const { assignUnisResponse, assignUnitsError } = useSelector((state) => state.assignUnitsStore);
    console.log('assignunitsresponse', assignUnisResponse);
    const { assignBatchResponse } = useSelector((state) => state.assignBatchStore);
    const { multipleAssignResponse } = useSelector((state) => state.multipleAssignStore);
    const { ackNotifyEuoSaveResponse } = useSelector((state) => state.ackNotifyEuoSaveStore);
    console.log('assignBatchResponse', assignBatchResponse);
    const { emailSuccess } = useSelector((state) => state.swapoutEmailSettingsStore);
    console.log('emailsuccess', emailSuccess?.data?.swapOut);
    const [hospitalId, setHospitalId] = React.useState();
    const [deviceId, setDeviceId] = React.useState(
        devDeviceId !== undefined && devDeviceId !== null ? devDeviceId._id : ''
    );
    console.log('deviceid---', deviceId);
    const [device, setDevice] = React.useState('All Devices');
    console.log('device-----', device);
    const { userAccessLoading, userAccessData } = useSelector((state) => state.getUserAccess);
    const history = useHistory();
    const [hospitalFilters, setHospitalFilters] = React.useState();
    const [hospital, setHospital] = React.useState('All Hospitals');
    const filterOption = [];
    const [units, setUnits] = React.useState([]);
    const socket = useSelector((state) => state.socketReducer.socket);
    const [deviceLoginn, setDeviceLogin] = React.useState(false);
    let [emergency, setEmergency] = useState('');

    const { dateFormat } = useSelector((state) => state.dateFormat);
    //const { token } = useSelector((state) => state.getSocketDeviceToken);
    // const data = {};
    const genderOptions = [
        { name: 'Male', value: 'Male' },
        { name: 'Female', value: 'Female' },
        { name: 'Other', value: 'Other' }
    ];
    const [mrn, setMrn] = useState('');
    const [referenceNo, setReferenceNo] = useState('');
    console.log('reference', referenceNo);
    const [firstName, setFirstName] = useState('');
    console.log('firstname', firstName);
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(null);
    console.log('dob---', dob);
    const [dobError, setDobError] = useState(false);
    console.log('doberror', dobError);
    const [dateerror, SetDateError] = useState(false);
    const [gender, setGender] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [recepientId, setRecepientId] = useState('');
    const [selectBoolean, setSelectBoolean] = useState('Incomplete');
    console.log('selectboolean', selectBoolean);
    const { options } = useSelector((state) => state.getDropDown);
    const { resLoading, resData } = useSelector((state) => state.getResponseData);
    console.log('resdata--', resData);
    const { postLoading, postResponse, postError } = useSelector((state) => state.postFormFields);
    const { deviceBatchLoading, deviceBatchSuccess, deviceBatchError } = useSelector(
        (state) => state?.getBatchesByDeviceStore
    );
    const { userRoleData } = useSelector((state) => state.getUserAccessId);
    console.log('uuuuuuuu', userRoleData);

    const { options4 } = useSelector((state) => state.get4thDropdown);
    console.log('options4', options4);

    const { options8 } = useSelector((state) => state.get8thDropdown);

    const formatBloodGroup = (bloodGroup) => {
        if (bloodGroup && bloodGroup.toLowerCase().includes('positive')) {
            const bloodType = bloodGroup.replace('Positive', '').trim();
            return `${bloodType}+`;
        }

        if (bloodGroup && bloodGroup.toLowerCase().includes('negative')) {
            const bloodType = bloodGroup.replace('Negative', '').trim();
            return `${bloodType}-`;
        }
        return '-';
    };

    const selectOptions = [
        { name: 'Incomplete', value: true },
        { name: 'Complete', value: false }
    ];
    const [accessableCodes, setAccessableCodes] = useState([]);
    const { temp, load } = useSelector((state) => state.getDashboardTemperature);
    const { GraphStatus } = useSelector((state) => state.getDashboardGraph);
    const [isSingleView, setIsSingleView] = React.useState('Product');
    const [groupBy, setGroupBy] = React.useState('Product');
    const [selectedDevice, setSelectedDevice] = useState(''); //'61309fef67be2141b7b069ae'
    const [storageDevice, setStorageDevice] = useState(null);
    const [counter, setCounter] = useState(0);
    const [open, setOpen] = useState(false);
    const [openform, setOpenForm] = useState(false);
    //batch
    const [tableform, setTableForm] = useState([]);
    const [timer, setTimer] = useState();
    const [form, setForm] = useState([]);
    console.log('form------', form);
    console.log('tableeee---', tableform);
    const [batch, setBatch] = useState([]);
    const [dateBar, setDateBar] = React.useState([]);
    const [tempBar, setTempBar] = React.useState([]);
    const { userInfo } = useSelector((state) => state.userLogin);
    const [value, setValue] = useState('Stock Fridge'); //'Remote Fridge'
    const [minTemp, setMinTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(32);
    const [recipientDialog, setRecipientDialog] = useState(false);
    const [activeButton, setActiveButton] = useState('2H');
    const [user, setUser] = useState('');
    console.log('us-----', user);
    const [userId, setUserId] = useState('');
    const [userAccess, setUserAccess] = useState('');
    const [token, setToken] = useState('');
    let remoteInfo = JSON.parse(localStorage.getItem('remoteInfo'));
    const [comments, setComments] = useState('');
    const [isStartClicked, setIsStartClicked] = useState(false);

    const [tempratureType, setTempratureType] = useState('hours');
    const [daysNumber, setDaysNumber] = useState(2);
    const [lineChartGraphData, setLineChartGraphData] = useState({
        options: {
            tooltip: {
                enabled: true
            },
            style: {
                cursor: 'pointer'
            },
            dataLabels: {
                style: {
                    fontSize: '14px',
                    colors: ['#304758']
                }
            },
            chart: {
                // id: 'chart2',
                type: 'line',
                stacked: 'false',
                zoom: {
                    type: 'x',
                    enabled: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                },
                events: {
                    dataPointMouseEnter: function (event) {
                        if (event?.path) {
                            event.path[0].style.cursor = 'pointer';
                        }
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Temperature'
                },
                min: -10,
                max: 32,
                tickAmount: 7
            },
            xaxis: {
                categories: [],
                tooltip: {
                    enabled: true
                }
                // range: 35
            },
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    colorStops: []
                }
            },
            stroke: {
                width: 2,
                curve: 'straight'
            }
        },
        series: [
            {
                name: 'Temperature',
                data: []
            },
            {
                name: 'deviceName',
                data: []
            }
        ]
    });

    React.useEffect(() => {
        dispatch(getDashboard(hospitalId, deviceId));
    }, [hospital]);

    React.useEffect(() => {
        dispatch(getDashboard(hospitalId, deviceId));
    }, [device]);

    //React.useEffect(() => {
    //    dispatch(getDashboardEuo(device === 'All Devices' ? deviceId : emergencyRef.current));
    //}, [deviceId]);

    React.useEffect(() => {
        if (data?.bloodgroupGraph?.length > 0) {
            let gValue = data?.bloodgroupGraph
                .map((value) => value.name && value.value)
                .filter((val) => val !== undefined);
            let glabel = data?.bloodgroupGraph
                ?.map((value) => value.name && value.name)
                .filter((val) => val !== undefined);

            setBarValues(gValue);
            setBarLabels(glabel);
        }
    }, [data]);

    React.useEffect(() => {
        if (data?.batchgroupGraph?.length > 0) {
            let gValue = data?.batchgroupGraph
                .map((value) => value.name && value.value)
                .filter((val) => val !== undefined);
            let glabel = data?.batchgroupGraph
                ?.map((value) => value.name && value.name)
                .filter((val) => val !== undefined);

            setBatchValues(gValue);
            setBatchLabels(glabel);
        }
    }, [data]);

    /* useEffect(() => {
         dispatch(getTemperature(selectedDevice, daysNumber, tempratureType));
         setActiveButton('24H');
         setDaysNumber(2);
         setTempratureType("hours");
     }, [selectedDevice]);
 
     useEffect(() => {
         dispatch(getTemperature(selectedDevice, daysNumber, tempratureType));
     }, [activeButton])*/

    useEffect(() => {
        dispatch(getTemperatureGraph(daysNumber, tempratureType));
    }, [activeButton]);

    useEffect(() => {
        socket?.on('refresh', (data) => {
            console.log('refreshdata', data);
            dispatch(alertsEuo(emergencyRef.current));
            dispatch(getDashboardEuo(emergencyRef.current));
            if (data.isEmergency) {
                console.log(' -- units --' + data?.removedData);

                //setUnits(data.skuData);
                if (
                    data?.removedData?.donationCode !== undefined &&
                    data?.removedData?.donationCode !== null &&
                    data?.removedData?.trackId?.code !== 'BS-TR-5101' &&
                    data?.removedData?.trackId?.code !== 'BS-TR-5110' &&
                    data?.removedData?.trackId?.code !== 'BS-TR-5105' &&
                    data?.removedData?.trackId?.code !== 'BS-TR-5115' &&
                    data?.removedData?.trackId?.code !== 'BS-TR-5121' &&
                    data?.removedData?.bloodgroup?.name == 'O Negative'
                ) {
                    let units = form;
                    const index = units.findIndex((ids) => ids.rfidNumber === data?.removedData.rfidNumber);
                    if (index === -1 && data?.isMoveOut) {
                        console.log('Added');
                        units.push(data.removedData);
                    } else {
                        //units = units.filter((item) => item.rfidNumber !== data?.removedData.rfidNumber);
                        //units.push(data.removedData);
                        const duplicateUnits = units.find((ids) => ids.rfidNumber === data?.removedData.rfidNumber);
                        units.pop(duplicateUnits);
                    }

                    //setForm(prevForm => [...prevForm, units]);

                    setForm(units);
                    if (units.length > 0) {
                        setOpen(true);
                    }
                }
                //else if (data?.removedData?.donationCode === undefined || data?.removedData?.donationCode=== null) {
                //    setOpen(false);
                //}
                else if (
                    data?.removedData?.gtinNumber !== undefined &&
                    data?.removedData?.gtinNumber !== null &&
                    data?.removedData?.trackId?.code !== 'BS-TR-5101' &&
                    data?.removedData?.trackId?.code !== 'BS-TR-5110' &&
                    data?.removedData?.trackId?.code !== 'BS-TR-5105' &&
                    data?.removedData?.trackId?.code !== 'BS-TR-5115' &&
                    data?.removedData?.trackId?.code !== 'BS-TR-5121'
                ) {
                    //let removeBatchdata = batch.push(data?.removedData);
                    //setBatch(removeBatchdata)
                    setBatch(data?.removedData);

                    let batches = tableform;
                    const index = batches.findIndex((ids) => ids.rfidNumber === data?.removedData.rfidNumber);
                    if (index === -1 && data?.isMoveOut) {
                        console.log('Added');
                        batches.push(data.removedData);
                    } else {
                        const duplicateBatch = batches.find((ids) => ids.rfidNumber === data?.removedData.rfidNumber);
                        batches.pop(duplicateBatch);
                    }

                    //setTableForm(prevForm => [...prevForm, batches])
                    setTableForm(batches);
                    if (batches.length > 0) {
                        setOpen(true);
                    }
                    //setOpenForm(true);
                }

                //else if (data?.removedData?.gtinNumber !== undefined && data?.removedData?.gtinNumber !== null) {
                //    let removeBatchdata = batch.push(data?.removedData);
                //    setBatch(removeBatchdata)
                //    setTableForm(removeBatchdata)
                //    setOpenForm(true);
                //}

                if (tableform.length === 0 && form.length === 0) {
                    setOpen(false);
                    //setUser('');
                    setForm([]);
                    setTableForm([]);
                    setRecepientId('');
                    setBloodGroup('');
                    setGender('');
                    setDob(null);
                    setLastName('');
                    setFirstName('');
                    setSelection('');
                    setMrn('');
                    setDobError(false);
                    setReferenceNo('');
                    //setUser('')
                    //this.handleClose();
                }

                setToken(data.token);
                //setRecipientDialog(true);
            }
        });

        socket?.on('assignUnitRecipient', (data) => {
            console.log('assignUnitRecipient', data);
            if (data.status) {
                setRecipientDialog(false);
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: data.message,
                        alertType: 'success'
                    })
                );
            } else {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: data.message,
                        alertType: 'error'
                    })
                );
            }
        });
    }, [socket]);

    console.log('unitsform', form);

    const handleCompleteButtonClick = () => {
        setScreen(1);
        setFirstName('');
        setLastName('');
        setDob(null);
        setGender('');
        setBloodGroup('');
        setMrn('');
        setReferenceNo('');
        setSelection('');
    };

    const handleSkipButtonClick = () => {
        setRecipientDialog(false);
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

            setFirstName('');
            setLastName('');
            setDob(null);
            setGender('');
            setBloodGroup('');
        }
    }, [resData]);

    const handleContinueClick = () => {
        if (postError) {
            dispatch(clearPostResponse());
        }

        if (resData !== undefined && resData?.data?.length !== 0 && mrn?.length > 3) {
            setScreen(2);
        } else {
            console.log(' -- MRN --' + mrn);
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

    const genericEmit = (data) => {
        if (data) {
            socket?.emit('generic', data);
        }
    };

    useEffect(() => {
        let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));
        console.log(devDeviceId, 'asdfasdfasdf');
        dispatch(getBatchesByDeviceAction(JSON.stringify(devDeviceId?._id)));
    }, []);
    console.log('userrr--', user);
    const [batchUserError, setBatchUserError] = useState(false);
    console.log('batcherror', batchUserError);
    const [assign, setAssign] = useState(false);

    const handleBatchAssign = (batch, rfidNumber) => {
        console.log('da----', dob);
        const currentDate = new Date();
        const selectedDate = new Date(dob);
        if (dob === null || dob === '') {
            setDobError(false);
        }
        if (selectedDate >= currentDate) {
            setDobError(true);
            return;
        }
        if (isNaN(selectedDate.getTime())) {
            setDobError(true);
            console.log('Invalid date of birth');
            return;
        }
        console.log('batchid', batch);
        console.log('rfidNumber', rfidNumber);

        //let rfidnumbers = tableform?.map((rfid) => rfid?.rfidNumber);
        //let batchId = tableform.find((batch) => batch?._id)
        //console.log('batchhhhh',batchId)
        //console.log('batchrfid',rfidnumbers)
        //const remoteAssignData = [
        //    {
        //        status: true,
        //        batchId: batchId?._id,
        //        firstName: firstName,
        //        lastName: lastName,
        //        name: firstName +" "+ lastName,
        //        mrnNumber: mrn,
        //        dob: dob,
        //        gender: gender,
        //        recipientId: resData?.data?.[0]?._id,
        //        'track-code': 'BS-TR-5103',
        //        rfidNumber: rfidnumbers,
        //        dereservationDateAndTime: hours_48_From_Now(),
        //        userName: user,
        //        isInCompletedData: selectBoolean == "Incomplete" ? true : false,
        //        deviceId: emergency,
        //        comments: '',
        //        referenceNo: referenceNo
        //    }]
        const remoteAssignData = [];
        for (let i = 0; i < tableform.length; i++) {
            const dataItem = tableform[i];
            console.log('dddddd---', dataItem);
            const newDataObject = {
                status: true,
                batchId: dataItem?._id ? dataItem?._id : dataItem?.batchId,
                firstName: firstName,
                lastName: lastName,
                name: firstName + ' ' + lastName,
                mrnNumber: mrn,
                dob: dob,
                gender: gender,
                recipientId: resData?.data?.[0]?._id,
                'track-code': 'BS-TR-5103',
                rfidNumber: dataItem.rfidNumber,
                dereservationDateAndTime: hours_48_From_Now(),
                userName: user,
                isInCompletedData: selectBoolean === 'Incomplete' ? true : false,
                deviceId: emergency,
                comments: '',
                referenceNo: referenceNo
            };

            remoteAssignData.push(newDataObject);
        }
        console.log('remote', remoteAssignData);

        dispatch(postAssignBatch(remoteAssignData));
        setOpenForm(false);
        setUser('');
        setRecepientId('');
        setBloodGroup('');
        setGender('');
        setDob(null);
        setLastName('');
        setFirstName('');
        setSelection('');
        setMrn('');
        setReferenceNo('');
        setDobError(false);
        setTableForm([]);
        window.location.reload(true);
    };
    console.log('batchsform', tableform);

    /*useEffect(() => 
     {
         let intervalsec = 5000;
        if (settingsData !== undefined && settingsData?.swapOut!==undefined && settingsData?.swapOut?.fillFormUnitsOrMerger!==0) {
             intervalsec = settingsData?.swapOut?.fillFormUnitsOrMerger *1000;
         }
        const interval = setInterval(() => {
 
             setForm([]);
             setTableForm([])
             console.log("Interval")
             
         }, intervalsec);
         
         return () => clearInterval(interval);
    }, [settingsData]);*/

    const handleAssignClick = (rfid) => {
        //setDobError(validateDateOfBirth(dob));
        console.log('da----', dob);
        const currentDate = new Date();
        const selectedDate = new Date(dob);
        let rfidnumbers = form?.map((rfid) => rfid?.rfidNumber);

        console.log('rrrrrrrrrr', rfidnumbers);
        if (dob === null || dob === '' || !dob) {
            setDobError(false);
        }

        if (selectedDate >= currentDate) {
            setDobError(true);
            return;
        }
        if (isNaN(selectedDate.getTime())) {
            setDobError(true);
            console.log('Invalid date of birth');
            return;
        }
        console.log('rfid', rfid);

        const remoteAssignUnitsData = {
            status: true,
            message: 'write on this tag',
            firstName: firstName,
            lastName: lastName,
            name: firstName + ' ' + lastName,
            mrnNumber: mrn,
            dob: dob,
            gender: gender,
            recipientId: recepientId,
            'track-code': 'BS-TR-5103',
            totalTags: rfidnumbers,
            dereservationDate: hours_48_From_Now(),
            userName: user,
            isInCompletedData: selectBoolean == 'Incomplete' ? true : false,
            deviceId: emergency,
            comments: '',
            referenceNo: referenceNo
        };
        dispatch(postAssignUnits(remoteAssignUnitsData));

        //let Units = [];

        //        Units.push({
        //            firstName: firstName,
        //            lastName: lastName,
        //            userName: user,
        //            mrnNumber: mrn,
        //            dob: dob,
        //            gender: gender,
        //            message: 'Assign Tag',
        //            totalTags: [rfid],
        //            recipientId: recepientId,
        //            dereservationDate: hours_48_From_Now(),
        //            'track-code': 'BS-TR-5103',
        //            comments: ''
        //        });

        //console.log("Units------------" + Units);

        //genericEmit({
        //    method: 'E128',
        //    deviceToken: token,
        //    payload: {
        //        status: true,
        //        data: Units,
        //        message: 'Units Assigned Successfully',
        //    }
        //});

        //console.log("assignunit", genericEmit({
        //    method: 'E128',
        //    deviceToken: token,
        //    payload: {
        //        status: true,
        //        data: Units,
        //        message: 'Units Assigned Successfully',
        //    }
        //}))

        //const remoteAssignData = [
        //    {
        //        batchId: batch?.batchId?.[0],
        //        recipientId: resData?.data?.[0]?._id,
        //        'track-code': 'BS-TR-5103',
        //       // count: selectedCount,
        //       // dereservationDateAndTime: hours_48_From_Now(),
        //        comments: ''
        //    }]
        //    //console.log('remote', remoteAssignDatas)

        //dispatch(postAssignBatch(remoteAssignData));
        setRecipientDialog(false);
        setOpen(false);
        setUser('');
        setRecepientId('');
        setBloodGroup('');
        setGender('');
        setDob(null);
        setLastName('');
        setFirstName('');
        setSelection('');
        setReferenceNo('');
        setMrn('');
        setDobError(false);
        setForm([]);
        window.location.reload(true);
    };

    console.log('batid', batch?.batchId);

    const handleClick = () => {
        if (tableform.length > 0 && form.length > 0) {
            handleAssignClick();
            handleBatchAssign();
        } else if (form.length > 0) {
            if (!user) {
                setBatchUserError(true);
            } else {
                handleAssignClick();
                setBatchUserError(false);
            }
        } else if (tableform.length > 0) {
            handleBatchAssign();
        }
    };

    const handleMultipleAssign = () => {
        if (!user) {
            setBatchUserError(true);
            return;
        } else {
            setBatchUserError(false);
        }

        let rfidnumberUnits = form?.map((rfid) => rfid?.rfidNumber);
        let rfidnumberBatchs = tableform?.map((rfid) => rfid?.rfidNumber);
        const multipleAssignData = {
            status: true,
            message: 'write on this tag',
            firstName: firstName,
            lastName: lastName,
            name: firstName + ' ' + lastName,
            mrnNumber: mrn,
            dob: dob,
            gender: gender,
            'track-code': 'BS-TR-5103',
            totalUnitTags: rfidnumberUnits,
            totalBatchTags: rfidnumberBatchs,
            //dereservationDate: hours_48_From_Now(),
            userName: user,
            isInCompletedData: selectBoolean == 'Incomplete' ? true : false,
            deviceId: emergency,
            comments: '',
            referenceNo: referenceNo
        };
        const headers = {
            'Content-type': 'application/json;charset=UTF-8',
            Authorization: userInfo?.data?.token
        };
        console.log(' -- Multiple Assign -- ' + multipleAssignData);
        dispatch(postMultipleAssign(multipleAssignData, headers));
    };

    useEffect(() => {
        if (multipleAssignResponse?.status === true) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'Recipient Assigned Successfully',
                    alertType: 'success'
                })
            );
            window.location.reload(true);
        } else if (multipleAssignResponse?.status === false) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'Please try again later',
                    alertType: 'error'
                })
            );
        }
    }, [multipleAssignResponse]);

    const handleDateChange = (date) => {
        setDob(date);
        setDobError(false);
    };

    useEffect(() => {
        console.log('userrrr');
        dispatch(get4thDropdown('user', undefined));
        setUserAccess(userRoleData?.data?.[0]?._id);
    }, []);
    console.log('userAccess', userAccess);
    const [selection, setSelection] = useState('');
    console.log('selection', selection);

    const handleUserChange = (e) => {
        console.log(e.target.value);
        const user = options4?.data?.find((dat) => dat.name === e.target.value);
        setSelection(user);
        console.log('user', user);

        setUser(user.name);
        setBatchUserError(false);
        setUserId(user._id);
        // console.log('userId', userId)
    };

    function getDreservationDatetime(productgroupId, dt = new Date()) {
        console.log('set---', settingsData);
        let datas = settingsData?.dereservation?.filter((obj) => obj.productgroupId === productgroupId);

        if (datas?.length > 0) {
            // dt.setHours(dt.getHours + datas[0].dereservationTime.Hours);
            console.log(dt);

            //dt.setMinutes(dt.getMinutes + datas[0].dereservationTime.Minutes);
            console.log(dt);
            const date = moment()
                .add(datas[0].dereservationTime.Hours, 'hour')
                .add(datas[0].dereservationTime.Minutes, 'minute');
            console.log(date);

            return date;
        } else {
            return new Date(dt.setDate(dt.getDate() + 2));
        }
    }

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
    }, [
        postError,
        postResponse
    ]); /*
    console.log("linechart", tempLineChart)
    setLineChartGraphData(tempLineChart);
}

}, [GraphStatus]);*/ /*if (maxTempInsideDate.length > 0) {
        colorStops = [
            {
                offset: 0,
                color: 'red',
                opacity: 1
            },
            {
                offset: 55,
                color: 'green',
                opacity: 1
            }
        ];
        tempLineChart = {
            options: {
                style: {
                    cursor: 'pointer'
                },
                dataLabels: {
                    offsetY: -20,
                    style: {
                        fontSize: '14px',
                        colors: ['#304758']
                    }
                },
                chart: {
                    id: 'chart2',
                    type: 'line',
                    stacked: 'false',
                    animation: {
                        enabled: 'false'
                    },
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    },
                    events: {
                        dataPointMouseEnter: function (event) {
                            if (event?.path) {
                                event.path[0].style.cursor = 'pointer';
                            }
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: 'Temperature'
                    },
                    min: -10,
                    max: 32,
                    tickAmount: 7
                },
                xaxis: {
                    tooltip: {
                        type: 'datetime',
                        enabled: true
                    },
                    range: 35,
                    tickAmount: 6,
                    labels: {
                        show: true,
                        formatter: function (value) {
                            return moment(value).format('MMMM Do YYYY, h:mm a').split(',');
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        type: 'vertical',
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        colorStops: colorStops
                    }
                },
                stroke: {
                    width: 3,
                    curve: 'straight'
                },
                */ /*annotations: {
        yaxis: [
            {
                y: temp[0]?.['Min Temperature'],
                borderColor: '#FF0000',
                label: {
                    show: true,
                    text: `Min Temp ${temp[0]?.['Min Temperature']}`,
                    style: {
                        color: '#fff',
                        background: '#FF0000'
                    }
                }
            },
            {
                y: GraphStatus[0]?.['Max Temperature'],
                borderColor: '#FF0000',
                label: {
                    show: true,
                    text: `Max Temp ${GraphStatus[0]?.['Max Temperature']}`,
                    style: {
                        color: '#fff',
                        background: '#FF0000'
                    }
                }
            }
        ]
    }*/ /*
},
series: GraphStatus
};
} else {*/ /*
        colorStops = [
            {
                offset: 55,
                color: 'green',
                opacity: 1
            }
        ];
        tempLineChart = {
            options: {
                tooltip: {
                    enabled: true
                },

                style: {
                    cursor: 'pointer'
                },
                dataLabels: {
                    offsetY: -20,
                    style: {
                        fontSize: '14px',
                        colors: ['#304758']
                    }
                },
                chart: {
                    id: 'chart2',
                    type: 'line',
                    stacked: 'false',
                    zoom: {
                        type: 'x',
                        enabled: true,
                         autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    },
                    events: {
                        dataPointMouseEnter: function (event) {
                            if (event?.path) {
                                event.path[0].style.cursor = 'pointer';
                            }
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: 'Temperature'
                    },
                    min: -10,
                    max: 32,
                    tickAmount: 7
                },
                xaxis: {
                    tooltip: {
                        type: 'datetime',
                        enabled: true
                    },
                    range: 35,
                    tickAmount: 6,
                    labels: {
                        show: true,
                        formatter: function (value) {
                            return moment(value).format('MMMM Do YYYY, h:mm:ss a').split(',');
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        type: 'vertical',
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        colorStops: colorStops
                    }
                },
                stroke: {
                    width: 3,
                    curve: 'straight'
                }
            },
            series: GraphStatus
        };
   // }

    */ /*if (GraphStatus!==null && Array.isArray(GraphStatus) && GraphStatus.length) {
        colorStops = [
            {
                offset: 55,
                color: 'red',
                opacity: 1
            }
        ];
        tempLineChart = {
            options: {
                tooltip: {
                    enabled: true
                },
 
                style: {
                    cursor: 'pointer'
                },
                dataLabels: {
                    // offsetY: -20,
                    style: {
                        fontSize: '14px',
                        colors: ['#304758']
                    }
                },
                chart: {
                    // id: 'chart2',
                    type: 'line',
                    stacked: 'false',
                    zoom: {
                        type: 'x',
                        enabled: true
                        // autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    },
                    events: {
                        dataPointMouseEnter: function (event) {
                            if (event?.path) {
                                event.path[0].style.cursor = 'pointer';
                            }
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: 'Temperature'
                    },
                    min: -10,
                    max: 32,
                    tickAmount: 7
                },
                xaxis: {
                    tooltip: {
                        type: 'datetime',
                        enabled: false
                    },
                    // range: 35,
                    tickAmount: 6,
                    labels: {
                        show: true,
                        formatter: function (value) {
                            console.log(" -- Date Value -- "+value)
                            return moment(value).format('MMMM Do YYYY, h:mm:ss a').split(',');
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        type: 'vertical',
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        colorStops: colorStops
                    }
                },
                stroke: {
                    width: 3,
                    curve: 'straight'
                }
            },
            series: GraphStatus
        };
 
        console.log("linechart", tempLineChart)
        setLineChartGraphData(tempLineChart);
    }*/

    //useEffect(() => {
    //    let tempAccessCodes = [];
    //    let manageAccessCodes = userInfo?.data?.userAccess
    //        ?.filter((item) => item['name'] === 'Remote Fridge')
    //        ?.map((subMenu) => subMenu?.menuId)
    //        ?.flat();

    //    manageAccessCodes?.forEach((itemA) => {
    //        if (itemA.fullAccess !== 0) {
    //            tempAccessCodes.push(itemA?.label);
    //        }
    //        let keysOfObject = Object.keys(itemA);
    //        keysOfObject.forEach((item) => {
    //            if (Array.isArray(itemA[item])) {
    //                itemA[item][0] === '1' && tempAccessCodes.push(itemA[item][1]);
    //            }
    //        });
    //    }, []);
    //    setAccessableCodes(tempAccessCodes);
    //}, []);

    /*useEffect(() => {

        console.log("GraphStatus" + GraphStatus + "----");
        let colorStops;
        let tempLineChart;

        if (GraphStatus !== null && Array.isArray(GraphStatus) && GraphStatus.length) {
            let dateArray = [];
            GraphStatus[0]?.Date?.map((obj) => {
                dateArray.push(moment(obj).format('MMMM Do YYYY, h:mm:ss a'));
                dateArray.push(new Date(obj).getTime());
            });
            let data = [];
            dateArray.map((ele, index) => {
                data?.push({ x: ele, y: temp[0]?.Temperature[index] });
            });
            setDateBar(dateArray);
            setTempBar(GraphStatus[0]?.Temperature);
            setMinTemp(GraphStatus[0]?.['Min Temperature']);
            setMaxTemp(GraphStatus[0]?.['Max Temperature']);
            const maxTemp1 = GraphStatus[0]?.['Max Temperature'];
            let tempBarData = GraphStatus[0]?.Temperature;
           // const maxTempInsideDate = tempBarData.filter((x) => x >= maxTemp1);

            let colorStops;
            let tempLineChart;

            */ useEffect(() => {
        console.log('GraphStatus' + GraphStatus);

        if (Array.isArray(GraphStatus) && GraphStatus.length) {
            let series = [];

            if (
                GraphStatus.map((devicetemp) => {
                    if (
                        devicetemp?.data.map((temp) => {
                            let dateArray = [];

                            temp?.Date?.map((obj) => {
                                // dateArray.push(moment(obj).format('MMMM Do YYYY, h:mm:ss a'));
                                dateArray.push(new Date(obj).getTime());
                            });
                            let data = [];
                            dateArray.map((ele, index) => {
                                data?.push({ x: ele, y: temp?.Temperature[index] });
                            });

                            series.push({
                                name: devicetemp?.deviceName,
                                data: data
                            });
                            setDateBar(dateArray);
                            setTempBar(temp?.Temperature);
                            // setMinTemp(temp[0]?.['Min Temperature']);
                            // setMaxTemp(temp[0]?.['Max Temperature']);
                            const maxTemp1 = temp?.['Max Temperature'];
                            let tempBarData = temp?.Temperature;
                            const maxTempInsideDate = tempBarData.filter((x) => x >= maxTemp1);

                            let colorStops;
                            let tempLineChart;

                            if (maxTempInsideDate.length > 0) {
                                colorStops = [
                                    {
                                        offset: 0,
                                        color: 'red',
                                        opacity: 1
                                    },
                                    {
                                        offset: 55,
                                        color: 'green',
                                        opacity: 1
                                    }
                                ];
                                tempLineChart = {
                                    options: {
                                        style: {
                                            cursor: 'pointer'
                                        },
                                        dataLabels: {
                                            // offsetY: -20,
                                            style: {
                                                fontSize: '14px',
                                                colors: ['#304758']
                                            }
                                        },
                                        chart: {
                                            // id: 'chart2',
                                            type: 'line',
                                            stacked: 'false',
                                            animation: {
                                                enabled: 'false'
                                            },
                                            zoom: {
                                                type: 'x',
                                                enabled: true
                                                // autoScaleYaxis: true
                                            },
                                            toolbar: {
                                                autoSelected: 'zoom'
                                            },
                                            events: {
                                                dataPointMouseEnter: function (event) {
                                                    if (event?.path) {
                                                        event.path[0].style.cursor = 'pointer';
                                                    }
                                                }
                                            }
                                        },
                                        yaxis: {
                                            title: {
                                                text: 'Temperature'
                                            },
                                            min: -10,
                                            max: 32,
                                            tickAmount: 7
                                        },
                                        xaxis: {
                                            tooltip: {
                                                type: 'datetime',
                                                enabled: true
                                            },
                                            // range: 35,
                                            tickAmount: 6,
                                            labels: {
                                                show: true,
                                                formatter: function (value) {
                                                    return moment(value).format('MMMM Do YYYY, h:mm a').split(',');
                                                }
                                            }
                                        },
                                        fill: {
                                            type: 'gradient',
                                            gradient: {
                                                type: 'vertical',
                                                shadeIntensity: 1,
                                                opacityFrom: 0.7,
                                                opacityTo: 0.9,
                                                colorStops: colorStops
                                            }
                                        },
                                        stroke: {
                                            width: 3,
                                            curve: 'straight'
                                        },
                                        annotations: {
                                            yaxis: [
                                                {
                                                    y: temp[0]?.['Min Temperature'],
                                                    borderColor: '#FF0000',
                                                    label: {
                                                        show: true,
                                                        text: `Min Temp ${temp[0]?.['Min Temperature']}`,
                                                        style: {
                                                            color: '#fff',
                                                            background: '#FF0000'
                                                        }
                                                    }
                                                },
                                                {
                                                    y: temp[0]?.['Max Temperature'],
                                                    borderColor: '#FF0000',
                                                    label: {
                                                        show: true,
                                                        text: `Max Temp ${temp[0]?.['Max Temperature']}`,
                                                        style: {
                                                            color: '#fff',
                                                            background: '#FF0000'
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    series: [
                                        {
                                            name: 'Temperature',
                                            data: data
                                        }
                                    ]
                                };
                            } else {
                                colorStops = [
                                    {
                                        offset: 55,
                                        color: 'green',
                                        opacity: 1
                                    }
                                ];
                                tempLineChart = {
                                    options: {
                                        tooltip: {
                                            enabled: true
                                        },

                                        style: {
                                            cursor: 'pointer'
                                        },
                                        dataLabels: {
                                            // offsetY: -20,
                                            style: {
                                                fontSize: '14px',
                                                colors: ['#304758']
                                            }
                                        },
                                        chart: {
                                            // id: 'chart2',
                                            type: 'line',
                                            stacked: 'false',
                                            zoom: {
                                                type: 'x',
                                                enabled: true
                                                // autoScaleYaxis: true
                                            },
                                            toolbar: {
                                                autoSelected: 'zoom'
                                            },
                                            events: {
                                                dataPointMouseEnter: function (event) {
                                                    if (event?.path) {
                                                        event.path[0].style.cursor = 'pointer';
                                                    }
                                                }
                                            }
                                        },
                                        yaxis: {
                                            title: {
                                                text: 'Temperature'
                                            },
                                            min: -10,
                                            max: 32,
                                            tickAmount: 7
                                        },
                                        xaxis: {
                                            tooltip: {
                                                type: 'datetime',
                                                enabled: true
                                            },
                                            // range: 35,
                                            tickAmount: 6,
                                            labels: {
                                                show: true,
                                                formatter: function (value) {
                                                    return moment(value).format('MMMM Do YYYY, h:mm:ss a').split(',');
                                                }
                                            }
                                        },
                                        fill: {
                                            type: 'gradient',
                                            gradient: {
                                                type: 'vertical',
                                                shadeIntensity: 1,
                                                opacityFrom: 0.7,
                                                opacityTo: 0.9,
                                                colorStops: colorStops
                                            }
                                        },
                                        stroke: {
                                            width: 3,
                                            curve: 'straight'
                                        }
                                    },
                                    series: series
                                };
                            }
                            setLineChartGraphData(tempLineChart);
                        })
                    );
                })
            );
        } else {
            setDateBar([]);
            setTempBar([]);
        }
    }, [GraphStatus]);

    const getData = () => {
        fetch('/api/v1/index?collectionName=device&pageSize=0&pageNumber=1', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
                Authorization: userInfo?.data?.token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('dddd===', data);

                const filterData = data?.data?.filter((ele) => ele?.deviceTypeId[0]?.name === 'Emergency Device');
                setStorageDevice(filterData);
                console.log('filterdata', filterData);
                if (filterData.length > 0) {
                    setDevice(filterData[0].name);
                    setSelectedDevice(filterData[0]);
                    dispatch(getDashboardEuo(filterData[0]._id));
                    dispatch(alertsEuo(filterData[0]._id));
                    setEmergency(filterData[0]._id);
                    emergencyRef.current = filterData[0]._id;
                }

                //   let emergencyId= data?.data?.find((obj) => obj.name === "Emergency Device" )
                // setEmergency(emergencyId._id)

                /*if (emergencyId) {
                    dispatch(getDashboardEuo(emergencyId._id))
                    setEmergency(emergencyId._id)
                }*/
            });
    };
    console.log('emergency', emergency);
    console.log('emergency-----', emergencyRef);

    React.useEffect(() => {
        getData();
    }, []);

    const handleDashboardFiltter = (key, value, name, screen) => {
        localStorage.setItem('title', screen);
        console.log('value onclick---------', value);
        console.log('name--------', name);
        console.log('key----', key);
        if (value === undefined || value === null) {
            return;
        }
        dispatch(setScreeenIndex(1));
        let filtersData1;
        let chipData = [];
        let refineValue;
        if (value.isArray) {
            refineValue = [...value];
        } else {
            refineValue = value;
        }
        console.log('refi', refineValue);

        filtersData1 = [{ key: key, value: refineValue },hospitalFilters];
        let filtersData = filtersData1.filter((val) => val);
        chipData = [name];

        let chipNameAndId = {};
        chipNameAndId[name] = value;
        let filterKeysObjects = {};

        let newFiltersObject = {
            chipNameAndId,
            chipData,
            filtersData,
            filterKeysObjects,
            staticFilters: true,
            screen
        };
        console.log('chipData', chipData);
        console.log('newFiltersObject', newFiltersObject);
        dispatch(getApplyFilters(newFiltersObject));
        history.push('/dashboard/request-unit');
    };

    const handleDashboardbatches = (key, value, name, screen) => {
        localStorage.setItem('title', screen);
        console.log('value onclick---------', value);
        console.log('name--------', name);
        console.log('key----', key);
        if (value === undefined || value === null) {
            return;
        }
        dispatch(setScreeenIndex(1));
        let filtersData1;
        let chipData = [];
        let refineValue;
        if (value.isArray) {
            refineValue = [...value];
        } else {
            refineValue = value;
        }

        filtersData1 = [{ key: key, value: refineValue }, hospitalFilters];
        let filtersData = filtersData1.filter((val) => val);
        chipData = [name];

        let chipNameAndId = {};
        chipNameAndId[name] = value;
        let filterKeysObjects = {};

        let newFiltersObject = {
            chipNameAndId,
            chipData,
            filtersData,
            filterKeysObjects,
            staticFilters: true,
            screen
        };

        console.log('chipData', chipData);
        dispatch(getApplyFilters(newFiltersObject));
        history.push('/dashboard/request-batch');
    };
    const handleDashboardAletsFiltter = (key1, key2, value1, value2, name, screen) => {
        localStorage.setItem('title', screen);
        if (value1 === undefined || value1 === null || value2 === undefined) {
            return;
        }
        dispatch(setScreeenIndex(1));
       
            let filtersData1;
            let chipData = [];

            filtersData1 = [{ key: key1, value: value1 }, { key: key2, value: value2 },
            {
                key: 'deviceId._id',
                value: ['6320991b7d29280d14a57145']
            },
                hospitalFilters];
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
                staticFilters: true,
                screen
            };
            dispatch(getApplyFilters(newFiltersObject));
     
        history.push('/dashboard/reports/notifications');
    };

    const firstBarChart = {
        options: {
            tooltip: {
                enabled: false
            },
            yaxis: {
                tickAmount: Math.max.apply(Math, barValues) < 4 ? 2 : 4,
                max:
                    Math.max.apply(Math, barValues) < 4
                        ? Math.max.apply(Math, barValues) + Math.max.apply(Math, barValues) * 1
                        : Math.max.apply(Math, barValues) + Math.max.apply(Math, barValues) * 0.2,
                labels: {
                    formatter: function (val) {
                        return Math.floor(val);
                    }
                }
            },

            plotOptions: {
                bar: {
                    borderRadius: 5,
                    dataLabels: {
                        position: 'top'
                        // top, center, bottom
                    },
                    columnWidth: '63%',
                    barHeight: '8%'
                }
            },
            colors: theme.palette.primary.main,
            style: {
                cursor: 'pointer'
            },
            dataLabels: {
                enabled: true,

                offsetY: -20,
                style: {
                    fontSize: '14px',
                    colors: ['#304758']
                }
            },
            chart: {
                id: 'basic-bar',
                events: {
                    dataPointMouseEnter: function (event) {
                        if (event?.path) {
                            event.path[0].style.cursor = 'pointer';
                        }
                    },
                    dataPointSelection: function (event, chartContext, config, selectedDataPoints) {
                        dispatch(setScreeenIndex(1));
                        let filtersData1;
                        let chipData = [];

                        filtersData1 = [
                            {
                                key: 'bloodgroupId._id',
                                value: [data?.bloodgroupGraph[config.dataPointIndex]._id]
                            },
                            hospitalFilters
                        ];
                        let filtersData = filtersData1.filter((val) => val);

                        chipData = [data?.bloodgroupGraph[config.dataPointIndex].name];

                        let chipNameAndId = {};
                        chipNameAndId[data?.bloodgroupGraph[config?.dataPointIndex].name] =
                            data?.bloodgroupGraph[config?.dataPointIndex]._id;

                        let filterKeysObjects = {};

                        let newFiltersObject = {
                            chipNameAndId,
                            chipData,
                            filtersData,
                            filterKeysObjects,
                            staticFilters: true
                        };
                        // console.log(newFiltersObject,'calling dashboard filters')
                        dispatch(getApplyFilters(newFiltersObject));
                        history.push('/dashboard/request-unit');
                    }
                }
            },
            xaxis: {
                categories: barLabels,
                tooltip: {
                    enabled: false
                }
            }
        },
        series: [
            {
                name: 'series-1',
                data: barValues
            }
        ]
    };

    const batchBarChart = {
        options: {
            tooltip: {
                enabled: false
            },
            yaxis: {
                tickAmount: Math.max.apply(Math, barValues) < 4 ? 2 : 4,
                max:
                    Math.max.apply(Math, barValues) < 4
                        ? Math.max.apply(Math, barValues) + Math.max.apply(Math, barValues) * 1
                        : Math.max.apply(Math, barValues) + Math.max.apply(Math, barValues) * 0.2,
                labels: {
                    formatter: function (val) {
                        return Math.floor(val);
                    }
                }
            },

            plotOptions: {
                bar: {
                    borderRadius: 5,
                    dataLabels: {
                        position: 'top'
                        // top, center, bottom
                    },
                    columnWidth: '63%',
                    barHeight: '8%'
                }
            },
            colors: theme.palette.primary.main,
            style: {
                cursor: 'pointer'
            },
            dataLabels: {
                enabled: true,

                offsetY: -20,
                style: {
                    fontSize: '14px',
                    colors: ['#304758']
                }
            },
            chart: {
                id: 'basic-bar',
                events: {
                    dataPointMouseEnter: function (event) {
                        if (event?.path) {
                            event.path[0].style.cursor = 'pointer';
                        }
                    },
                    dataPointSelection: function (event, chartContext, config, selectedDataPoints) {
                        dispatch(setScreeenIndex(1));
                        let filtersData1;
                        let chipData = [];

                        filtersData1 = [
                            {
                                key: 'batchProductId._id',
                                value: [data?.batchgroupGraph[config.dataPointIndex]._id]
                            },
                            hospitalFilters
                        ];
                        let filtersData = filtersData1.filter((val) => val);

                        chipData = [data?.batchgroupGraph[config.dataPointIndex].name];

                        let chipNameAndId = {};
                        chipNameAndId[data?.batchgroupGraph[config?.dataPointIndex].name] =
                            data?.batchgroupGraph[config?.dataPointIndex]._id;

                        let filterKeysObjects = {};

                        let newFiltersObject = {
                            chipNameAndId,
                            chipData,
                            filtersData,
                            filterKeysObjects,
                            staticFilters: true
                        };
                        console.log(newFiltersObject, 'calling dashboard filters');
                        dispatch(getApplyFilters(newFiltersObject));
                        history.push('/dashboard/request-batch');
                    }
                }
            },
            xaxis: {
                categories: batchLabels,
                tooltip: {
                    enabled: false
                }
            }
        },
        series: [
            {
                name: 'series-1',
                data: batchValues
            }
        ]
    };

    const dayWiseData = (d) => {
        var fromDate = new Date(); // this is today's date
        var toDate = new Date(); // this will be the date - 1D,15D..etc
        const filterDateArray = [];
        const filterTimeArray = [];
        const combinedData = [];
        if (d === '1M') {
            const currentMonth = fromDate.getMonth() + 1;
            temp[0]?.Date.filter((item, index) => {
                let [yearFromArray, dateFromArray] = item.split('-');
                if (item.split('-')[1].includes(currentMonth)) {
                    // filterDateArray.push(moment(item).format('MMMM Do YYYY, h:mm:ss a'));
                    // filterTimeArray.push(temp[0]?.Temparature[index]);

                    combinedData.push({ x: new Date(item).getTime(), y: temp[0]?.Temperature[index] });
                }
            });
        } else {
            toDate.setDate(toDate.getDate() - d);
            temp[0]?.Date.filter((item, index) => {
                if (item.split('T')[0] > toDate.toJSON().split('T')[0]) {
                    // filterDateArray.push(moment(item).format('MMMM Do YYYY, h:mm:ss a'));
                    // filterTimeArray.push(temp[0]?.Temparature[index]);
                    combinedData.push({ x: new Date(item).getTime(), y: temp[0]?.Temperature[index] });
                }
            });
        }
        // console.log(combinedData,'combinedData');
        let color = [];
        const maxTemp = temp[0]?.['Max Temperature'];
        const maxTempInsideDate = combinedData?.filter((x) => x?.y >= maxTemp);
        if (maxTempInsideDate.length > 0) {
            color = [
                {
                    offset: 0,
                    color: 'red',
                    opacity: 1
                },
                {
                    offset: 55,
                    color: 'green',
                    opacity: 1
                }
            ];
        } else {
            color = [
                {
                    offset: 55,
                    color: 'green',
                    opacity: 1
                }
            ];
        }
        // let label ;
        // if(d === 1){
        //     console.log('1D', d);
        //     label = {
        //         show: true,
        //         formatter: function (value) {
        //             return moment(value).format('LT');
        //         }
        //     }
        // }else {
        //     console.log('else days',d);
        //     label= {
        //         show: true,
        //         formatter: function (value) {
        //             return moment(value).format('MMMM Do YYYY, h:mm:ss a').split(',');
        //         }
        //     }
        // }

        let tempFill = { ...lineChartGraphData?.options?.fill };
        let tempGradient = { ...tempFill['gradient'] };
        tempGradient['colorStops'] = color;
        tempFill['gradient'] = tempGradient;

        // let tempCategories = { ...lineChartGraphData?.options?.xaxis };
        // tempCategories['labels'] = label;
        let tempOptions = { ...lineChartGraphData.options };
        // tempOptions['xaxis'] = { ...tempCategories };
        tempOptions['fill'] = { ...tempFill };

        let tempChartYaxisData = { ...lineChartGraphData?.series[0] };
        tempChartYaxisData['data'] = combinedData;
        let tempLineChartData = {
            ...lineChartGraphData,
            options: { ...tempOptions },
            series: [{ ...tempChartYaxisData }]
        };
        console.log(tempLineChartData, 'tempLineChartData');
        setLineChartGraphData(tempLineChartData);
        setDateBar(combinedData);
        setTempBar(combinedData);
    };

    const handleChangeDate = (value, number, type) => {
        console.log('value', value);
        setDaysNumber(number);
        setTempratureType(type);
        setActiveButton(value);
        //if (value === '1D') {
        //    setActiveButton(value);
        //    dayWiseData(1);
        //}
        //if (value === '5D') {
        //    setActiveButton(value);
        //    dayWiseData(5);

        // toDate.setDate(toDate.getDate() - 5);
        // console.log(toDate.toJSON());
        // // const data = temp[0]?.Date.filter(x=> x)

        // temp[0]?.Date.filter((item, index) => {
        //     if (item.split('T')[0] > toDate.toJSON().split('T')[0]) {
        //         filterDateArray.push(moment(item).format('MMMM Do YYYY, h:mm:ss a'));
        //         filterTimeArray.push(temp[0]?.Temparature[index]);
        //     }
        // });
        // console.log(filterDateArray, 'filterDateArray', filterTimeArray);
        // setDateBar(filterDateArray);
        // setTempBar(filterTimeArray);
        //}
        //if (value === '15D') {
        //    setActiveButton(value);
        //    dayWiseData(15);
        //}
        //if (value === '30D') {
        //    setActiveButton(value);
        //    dayWiseData(30);
        //}
        //if (value === '1M') {
        //    setActiveButton(value);
        //    dayWiseData('1M');
        //}
        //if (value === 'YTD') {
        //    setActiveButton(value);
        //    dayWiseData(365);
        //}
    };

    const onSorageDeviceChange = (e) => {
        const name = storageDevice.map((ele) => ele.name);
        console.log('Devices' + name);
        setValue(e.target.value);
        if (name.includes(e.target.value)) {
            storageDevice.filter((ele) => {
                if (ele.name === e.target.value) {
                    localStorage.setItem('storageDevice', JSON.stringify({ key: e.target.value, id: ele._id }));
                    setSelectedDevice(ele._id);
                }
            });
        }
    };

    useEffect(() => {
        console.log('----Setting Data---------' + settingsData);
        if (settingsData === undefined || settingsData.length == 0) {
            console.log('----Setting Data---------' + JSON.stringify(settingsData));
            let filters = JSON.stringify([{ key: 'userId._id', value: userInfo?.data?.user?._id }]);
            dispatch(getSettings('setting', filters));
        }
    }, []);

    const getDate = (d) => {
        let date = new Date(d);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let hours = date.getHours();
        let min = date.getMinutes();

        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        console.log(year + '-' + month + '-' + dt);
        return dt + '-' + month + '-' + year + ' ' + hours + ':' + min;
    };

    useEffect(() => {
        dispatch(getDropDown('bloodGroup'));
        return () => {
            dispatch(clearData());
            dispatch(clearPostResponse());
            dispatch(clearDropDown());
        };
    }, []);

    const recipientDialogClose = () => {
        dispatch(getDashboard(hospitalId));
        setRecipientDialog(false);
    };

    const handleClose = () => {
        form.length = 0;
        tableform.length = 0;
        setOpen(false);
        setUser('');
        setForm([]);
        setTableForm([]);
        setRecepientId('');
        setBloodGroup('');
        setGender('');
        setDob(null);
        setLastName('');
        setFirstName('');
        setSelection('');
        setMrn('');
        setDobError(false);
        setReferenceNo('');
        setUser('');
    };
    const handleformClose = () => {
        clearTimeout(timer);
        setOpenForm(false);
        setUser('');
        setRecepientId('');
        setBloodGroup('');
        setGender('');
        setDob(null);
        setLastName('');
        setFirstName('');
        setSelection('');
        setMrn('');
        setDobError(false);
        setReferenceNo('');
    };
    const handleopenForm = (e, data) => {
        setOpen(true);
        setBatch(deviceBatchSuccess?.data?.batchData);
        setTableForm([data]);
    };
    console.log('tableform', tableform);

    const handleOpenForm = (e, name) => {
        console.log('name---', name);
        console.log(name);
        setForm([name]);
        setOpen(true);
    };
    const handleDummyOpenForm = (e, name) => {
        // setForm(name);
        setOpen(true);
    };

    const [openSwapout, setOpenSwapout] = useState(false);

    const handleSwapout = () => {
        console.log('user----', user);
        setOpenSwapout(true);
        setCounter(0);
        setUser(user);
    };
    const [start, setStart] = useState();
    const [swapcomplete, setSwapComplete] = useState('');
    console.log('swapcomplete', swapcomplete);
    const handleStartSwapout = (e) => {
        console.log('eeeeeeeee', e);
        setStart(e);
        setCounter(60);
        let obj = {
            deviceId: emergency
        };
        dispatch(postSwapOutData(obj));
    };
    const handleSwapoutClose = () => {
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhh');
        setOpenSwapout(false);
        //setCounter(0)
        clearTimeout(timer);
        if (counter === 0) {
            let obj = {
                deviceId: emergency,
                userName: userId
            };
            dispatch(putSwapoutData(obj));
        }
        setComments('');
        setStart('');
        setSelection('');
        setUser('');
        setIsStartClicked('');
    };
    const cancelSwapout = () => {
        setOpenSwapout(false);
        //setCounter(0)
        clearTimeout(timer);
        let obj = {
            deviceId: emergency
        };
        dispatch(putSwapOutCancel(obj));
        setUser('');
        setStart('');
        setSelection('');
        setComments('');
        setIsStartClicked('');
    };

    useEffect(() => {
        if (counter > 0) {
            const timers = setTimeout(() => setCounter(counter - 1), 1000);
            setTimer(timers);
        }
        if (counter === 0) {
            setSelection('');
            setStart('');
            setComments('');
            //setCounter(0)
            clearTimeout(timer);
            setIsStartClicked('');
            setOpenSwapout(false);
        }
        if (counter === 0 && swapcomplete !== 'swapcomplete') {
            let obj = {
                deviceId: emergency,
                userName: user
            };
            dispatch(putSwapoutData(obj));
            setSelection('');
            setUser('');
            setStart('');
            setComments('');
        }
    }, [counter]);

    const handleExtendsecs = () => {
        clearTimeout(timer);
        const timers = setTimeout(() => setCounter(counter + 60), 1000);
        setTimer(timers);
    };
    const handleSwapoutComplete = (e) => {
        clearTimeout(timer);
        let obj = {
            deviceId: emergency,
            userName: userId,
            comments: comments
        };
        dispatch(putSwapoutData(obj));
        setSwapComplete(e);
        setOpenSwapout(false);
        setUser('');
        setSelection('');
        setStart('');
        setComments('');
        //setCounter(0)
        clearTimeout(timer);
        setIsStartClicked('');
    };

    //useEffect(() => {

    //    const config = {
    //        headers: {
    //            'Content-Type': 'application/json'
    //        }
    //    };
    //    let url = `${CONSTANTS.BASEURL}setting/config`;

    //    axios.get(url, config).then((resdata) => {

    //        console.log("-----------------" + resdata.status);
    //        if (resdata.status) {
    //            dispatch(settingsRemoteLoginPageAction(resdata.data.data));

    //            localStorage.setItem('remoteInfo', JSON.stringify(resdata.data.data));
    //            if (resdata.data.data.emergencyLogin === "TRUE") {
    //                // Remote Login Redirect
    //                console.log("Redirected to Remote Login")
    //                //window.history.replaceState(null, '', "/remotelogin");
    //                history.push('dashboard/dashboard-euo');
    //            }
    //            else {
    //                // Redirect to  Login Page
    //                console.log("Redirected to Login")
    //                history.push('/login');
    //                //window.history.replaceState(null, '', "/login");
    //            }

    //        }
    //    })
    //}, []);
    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let url = `${CONSTANTS.BASEURL}setting/config`;

        axios.get(url, config).then((resdata) => {
            console.log('configsetting----' + resdata.status);

            localStorage.setItem('remoteInfo', JSON.stringify(resdata.data.data));
        });
    }, []);

    useEffect(() => {
        if (emergency) {
            dispatch(getDashboardEuo(emergencyRef.current));
        }
    }, [emergency]);

    const handleDashboardUnitsIncomplete = (key, value, name, screen) => {
        //console.log("value onclick---------", value);
        //console.log("name--------", name)
        //console.log("key----", key)
        //if (value === undefined || value === null) {
        //    return;
        //}
        //dispatch(setScreeenIndex(1));
        //let filtersData1;
        //let chipData = [];
        //let refineValue;
        //if (value.isArray) {
        //    refineValue = [...value];
        //} else {
        //    refineValue = value;
        //}
        //console.log('refi', refineValue)

        //filtersData1 = [{ key: key, value: refineValue }, hospitalFilters];
        //let filtersData = filtersData1.filter((val) => val);
        //chipData = [name];

        //let chipNameAndId = {};
        //chipNameAndId[name] = value;
        //let filterKeysObjects = {};

        //let newFiltersObject = {
        //    chipNameAndId,
        //    chipData,
        //    filtersData,
        //    filterKeysObjects,
        //    staticFilters: true,
        //    screen
        //};
        //console.log("chipData", chipData);
        //console.log("newFiltersObject", newFiltersObject)

        dispatch(getDashboardEuoUnitsIncomplete());
        history.push('/dashboard/dashboard-euo/recipientUnits');
    };

    const handleDashboardbatchIncomplete = () => {
        dispatch(getDashboardEuoBatchIncomplete());
        history.push('/dashboard/dashboard-euo/recipientBatchproducts');
    };

    useEffect(() => {
        dispatch(settingSwapoutEmail());
    }, []);

    const handleDeleteCardUnit = (index) => {
        const updatedForm = [...form];
        updatedForm.splice(index, 1);
        setForm(updatedForm);
        console.log('updateddd', updatedForm);
        if (updatedForm.length <= 0) {
            setOpen(false);
        }
    };

    const handleDeleteCardBatch = (index) => {
        const updatedForm = [...tableform];
        updatedForm.splice(index, 1);
        setTableForm(updatedForm);
        if (updatedForm.length <= 0) {
            setOpen(false);
        }
    };

    const [cards, setCards] = useState([
        {
            gtinNumber: '123456789',
            productGroup: 'HUMAN ALBUMIN 10g/50ml',
            reason: 'Batch product cannot hold expiry product',
            status: 'critical'
        },
        {
            gtinNumber: '123456789',
            productGroup: 'HUMAN ALBUMIN 10g/50ml',
            reason: 'Batch product cannot hold expiry product',
            status: 'general'
        },
        {
            unitId: 'Z123456789102',
            productGroup: 'Fresh Frozen Plasma',
            reason: 'Unit Other than O Negative Removed',
            status: 'critical'
        },
        {
            unitId: 'Z123456789102',
            productGroup: 'Fresh Frozen Plasma',
            reason: 'Unit Other than O Negative Removed',
            status: 'general'
        }
    ]);

    useEffect(() => {
        dispatch(get8thDropdown('devices'));
    }, []);
    const [emergencyId, setEmergencyId] = useState();
    const [remoteId, setRemoteId] = useState();
    console.log('remoteId', remoteId);

    React.useEffect(() => {
        if (options8) {
            let emergencyId = options8?.data?.find((obj) => obj?.name === 'Emergency Device');
            console.log('emergencyId---', emergencyId);
            setEmergencyId(emergencyId?._id);
            let remoteDevice = options8?.data?.find((obj) => obj?.name === 'Theater Fridge');
            setRemoteId(remoteDevice?._id);
        }
    }, [options8, emergencyId, remoteId]);

    console.log('emer---', emergencyId);

    const removeCard = (index) => {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1);
        setCards(updatedCards);
    };

    const [isDefault, setIsDefault] = useState('');
    const defaulCheck = (e) => {
        setIsDefault(e.target.checked);
    };
    console.log('ccccc', isDefault);

    useEffect(() => {
        if (
            emergencyRef.current !== undefined &&
            emergencyRef.current != 'undefined' &&
            emergencyRef.current.length > 0
        ) {
            dispatch(alertsEuo(emergencyRef.current));
        }
        console.log('start useEffect...', alertsEuo);
    }, [alertsEuo]);

    const [dialogOpen, setDialogOpen] = useState('');
    const [understood, setUnderstood] = useState();
    const [understoodCard, setUnderstoodCard] = useState();

    const handleDialogClose = () => {
        setDialogOpen(false);
        setUser('');
        setUserId('');
        setComments('');
    };
    const handleUnderstood = (message, card) => {
        console.log('carddddddddddd', card);
        console.log('cardmessageee', message);
        setUnderstood(message);
        setUnderstoodCard(card);
        setDialogOpen(true);
    };

    const handleMoreInfo = () => {
        history.push('/dashboard/reports/notifications');
    };

    const [alerts, setAlerts] = useState();

    useEffect(() => {
        console.log('under----', understood);

        if (alertsunderstoodEuo?.length > 0) {
            let messageType = alertsunderstoodEuo?.flatMap((message) => {
                console.log('mmmmm', message);
                return message?.messageBody.filter((msg) => {
                    return msg?.reason === message?.factId?.description;
                });
            });

            console.log('message------', messageType);
            setAlerts(messageType);
        } else if (alertsunderstoodEuo?.length === 0) {
            if (
                emergencyRef.current !== undefined &&
                emergencyRef.current != 'undefined' &&
                emergencyRef.current.length > 0
            ) {
                dispatch(alertsavEuo(emergencyRef.current));
            }
        }
    }, [alertsunderstoodEuo]);

    useEffect(() => {
        if (
            alertsavunderstoodEuo &&
            (alertsavunderstoodEuo.unitList?.length > 0 || alertsavunderstoodEuo.batchList?.length > 0)
        ) {
            setForm(alertsavunderstoodEuo.unitList);
            setTableForm(alertsavunderstoodEuo.batchList);

            setOpen(true);
        }
    }, [alertsavunderstoodEuo]);

    const handleAckSaveClick = () => {
        if (!user) {
            setBatchUserError(true);
            return;
        } else {
            setBatchUserError(false);
        }

        let ackForm = {
            notificationId: understood?._id,
            ackStatus: true,
            ackComments: comments,
            ackUserId: userId
        };
        console.log('cardunder', understoodCard);
        dispatch(ackNotifyEuoSave(ackForm));
        setDialogOpen(false);
        setComments('');
        setUserId('');
        setUser('');
        dispatch(alertsEuo(emergencyRef.current));
        //window.location.reload(true)
    };
    console.log('Update Successful-----', ackNotifyEuoSaveResponse);
    useEffect(() => {
        if (ackNotifyEuoSaveResponse?.status === true) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'Update Successful',
                    alertType: 'success'
                })
            );
            window.location.reload(true);
        } else if (ackNotifyEuoSaveResponse?.status === false) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'Please try again later',
                    alertType: 'error'
                })
            );
        }
    }, [ackNotifyEuoSaveResponse]);

    return (
        <>
            <Hidden xsUp={loading}>
                <Grid className={classes.firstDiv}>
                    <DashboardEuoHeader
                        userAccessData={userAccessData}
                        data={storageDevice}
                        loading={loading}
                        setHospitalId={setHospitalId}
                        setHospitalFilters={setHospitalFilters}
                        hospital={hospital}
                        setHospital={setHospital}
                        setToken={setToken}
                        setDeviceId={setDeviceId}
                        device={device}
                        setDevice={setDevice}
                    />
                </Grid>
            </Hidden>
            <Grid style={{ marginTop: '12px' }} />
            {loading || userAccessLoading ? (
                <>
                    <Loader />
                </>
            ) : data?.totalUnitsInStock === 0 && data?.totalUnitsInBatches === 0 && data?.totalTransfused === 0 ? (
                <NoDashboardData />
            ) : (
                <>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={remoteInfo && remoteInfo?.remoteLogin === 'TRUE' ? 10 : 12}
                            sm={remoteInfo && remoteInfo?.remoteLogin === 'TRUE' ? 10 : 12}
                            md={remoteInfo && remoteInfo?.remoteLogin === 'TRUE' ? 10 : 12}
                            lg={remoteInfo && remoteInfo?.remoteLogin === 'TRUE' ? 10 : 12}
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={2}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} style={{ marginBottom: '5px' }}>
                                                            <Grid container spacing={2} direction="row">
                                                                <Grid item xs={9}>
                                                                    <Grid container spacing={2} direction="row">
                                                                        <Grid item xs={12}>
                                                                            <Grid item xs={12} direction="row">
                                                                                <Grid container spacing={2}>
                                                                                    <Grid
                                                                                        item
                                                                                        xs={12}
                                                                                        style={{ marginBottom: '5px' }}
                                                                                    >
                                                                                        <Grid
                                                                                            container
                                                                                            spacing={2}
                                                                                            direction="row"
                                                                                        >
                                                                                            <Grid item xs={2}>
                                                                                                <Card
                                                                                                    className={
                                                                                                        classes.smalldetailCard
                                                                                                    }
                                                                                                    style={{
                                                                                                        height: '100%'
                                                                                                    }}
                                                                                                >
                                                                                                    <Grid
                                                                                                        container
                                                                                                        direction="row"
                                                                                                        spacing={1}
                                                                                                        alignItems="center"
                                                                                                    >
                                                                                                        <Grid item>
                                                                                                            <Grid
                                                                                                                container
                                                                                                                spacing={
                                                                                                                    1
                                                                                                                }
                                                                                                                alignItems="center"
                                                                                                            >
                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    style={{
                                                                                                                        paddingLeft:
                                                                                                                            '18px'
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <OpacityIcon
                                                                                                                        className={
                                                                                                                            classes.smallCardIcon
                                                                                                                        }
                                                                                                                        color="error"
                                                                                                                    />
                                                                                                                </Grid>
                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    style={{
                                                                                                                        paddingLeft:
                                                                                                                            '20px'
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <Typography
                                                                                                                        color="error"
                                                                                                                        className={
                                                                                                                            classes.smallIconValue
                                                                                                                        }
                                                                                                                        style={{
                                                                                                                            cursor:
                                                                                                                                dataEuo?.totalUnitsInStock !==
                                                                                                                                0 &&
                                                                                                                                'pointer'
                                                                                                                        }}
                                                                                                                                onClick={() =>
                                                                                                                                    dataEuo?.totalUnitsInStock !==
                                                                                                                                    0 &&
                                                                                                                            handleDashboardFiltter(
                                                                                                                                'deviceId._id',

                                                                                                                                [
                                                                                                                                    emergencyRef.current
                                                                                                                                ],

                                                                                                                                device,
                                                                                                                                device
                                                                                                                            )
                                                                                                                        }
                                                                                                                    >
                                                                                                                        {dataEuo?.totalUnitsInStock
                                                                                                                            ? dataEuo?.totalUnitsInStock
                                                                                                                            : 0}
                                                                                                                    </Typography>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                        </Grid>
                                                                                                        <Grid
                                                                                                            item
                                                                                                            style={{
                                                                                                                paddingLeft:
                                                                                                                    '50px'
                                                                                                            }}
                                                                                                        >
                                                                                                            <Typography
                                                                                                                color="primary"
                                                                                                                className={
                                                                                                                    classes.smalldetailTitle
                                                                                                                }
                                                                                                            >
                                                                                                                Blood
                                                                                                                units
                                                                                                            </Typography>
                                                                                                        </Grid>
                                                                                                    </Grid>
                                                                                                </Card>
                                                                                            </Grid>

                                                                                            <Grid item xs={2}>
                                                                                                <Card
                                                                                                    className={
                                                                                                        classes.smalldetailCard
                                                                                                    }
                                                                                                    style={{
                                                                                                        height: '100%'
                                                                                                    }}
                                                                                                >
                                                                                                    <Grid
                                                                                                        container
                                                                                                        direction="row"
                                                                                                        spacing={1}
                                                                                                        alignItems="center"
                                                                                                    >
                                                                                                        <Grid item>
                                                                                                            <Grid
                                                                                                                container
                                                                                                                spacing={
                                                                                                                    1
                                                                                                                }
                                                                                                                alignItems="center"
                                                                                                            >
                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    style={{
                                                                                                                        paddingLeft:
                                                                                                                            '18px'
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <OpacityIcon
                                                                                                                        className={
                                                                                                                            classes.smallCardIcon
                                                                                                                        }
                                                                                                                        color="error"
                                                                                                                    />
                                                                                                                </Grid>
                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    style={{
                                                                                                                        paddingLeft:
                                                                                                                            '20px'
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <Typography
                                                                                                                        color="error"
                                                                                                                        className={
                                                                                                                            classes.smallIconValue
                                                                                                                        }
                                                                                                                        style={{
                                                                                                                            cursor:
                                                                                                                                dataEuo?.totalUnitsInBatches !==
                                                                                                                                0 &&
                                                                                                                                'pointer'
                                                                                                                        }}
                                                                                                                                onClick={() =>
                                                                                                                                    dataEuo?.totalUnitsInBatches !==
                                                                                                                                    0 &&
                                                                                                                            handleDashboardbatches(
                                                                                                                                'deviceId._id',

                                                                                                                                [
                                                                                                                                    emergencyRef.current
                                                                                                                                ],

                                                                                                                                device,
                                                                                                                                device
                                                                                                                            )
                                                                                                                        }
                                                                                                                    >
                                                                                                                        {dataEuo?.totalUnitsInBatches
                                                                                                                            ? dataEuo?.totalUnitsInBatches
                                                                                                                            : 0}
                                                                                                                    </Typography>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                        </Grid>
                                                                                                        <Grid
                                                                                                            item
                                                                                                            style={{
                                                                                                                paddingLeft:
                                                                                                                    '30px'
                                                                                                            }}
                                                                                                        >
                                                                                                            <Typography
                                                                                                                color="primary"
                                                                                                                className={
                                                                                                                    classes.smalldetailTitle
                                                                                                                }
                                                                                                            >
                                                                                                                Batch
                                                                                                                products
                                                                                                            </Typography>
                                                                                                        </Grid>
                                                                                                    </Grid>
                                                                                                </Card>
                                                                                            </Grid>

                                                                                            <Grid item xs={4}>
                                                                                                <Card
                                                                                                    className={
                                                                                                        classes.smalldetailCard
                                                                                                    }
                                                                                                    style={{
                                                                                                        height: '100%'
                                                                                                    }}
                                                                                                >
                                                                                                    <Grid
                                                                                                        container
                                                                                                        direction="row"
                                                                                                        spacing={1}
                                                                                                        alignItems="center"
                                                                                                    >
                                                                                                        <Grid
                                                                                                            item
                                                                                                            xs={6}
                                                                                                        >
                                                                                                            <Grid
                                                                                                                container
                                                                                                                spacing={
                                                                                                                    1
                                                                                                                }
                                                                                                                alignItems="center"
                                                                                                            >
                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    style={{
                                                                                                                        paddingLeft:
                                                                                                                            '25px'
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <OpacityIcon
                                                                                                                        className={
                                                                                                                            classes.smallCardIcon
                                                                                                                        }
                                                                                                                        color="error"
                                                                                                                    />
                                                                                                                </Grid>
                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    style={{
                                                                                                                        paddingLeft:
                                                                                                                            '20px'
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <Typography
                                                                                                                        color="error"
                                                                                                                        className={
                                                                                                                            classes.smallIconValue
                                                                                                                        }
                                                                                                                        style={{
                                                                                                                            cursor:
                                                                                                                                dataEuo?.inCompletedUnitData !==
                                                                                                                                    0 &&
                                                                                                                                'pointer'
                                                                                                                        }}
                                                                                                                        onClick={() =>
                                                                                                                            dataEuo?.inCompletedUnitData !==
                                                                                                                                0 &&
                                                                                                                            handleDashboardUnitsIncomplete()
                                                                                                                        }
                                                                                                                    >
                                                                                                                        {dataEuo?.inCompletedUnitData
                                                                                                                            ? dataEuo?.inCompletedUnitData
                                                                                                                            : 0}
                                                                                                                    </Typography>
                                                                                                                </Grid>
                                                                                                            </Grid>

                                                                                                            <Typography
                                                                                                                style={{
                                                                                                                    paddingLeft:
                                                                                                                        '30px'
                                                                                                                }}
                                                                                                                color="primary"
                                                                                                                className={
                                                                                                                    classes.resolution
                                                                                                                }
                                                                                                            >
                                                                                                                Blood
                                                                                                                units
                                                                                                            </Typography>
                                                                                                        </Grid>

                                                                                                        <Grid
                                                                                                            item
                                                                                                            xs={1}
                                                                                                        >
                                                                                                            <Divider
                                                                                                                style={{
                                                                                                                    backgroundColor:
                                                                                                                        'lightgrey',
                                                                                                                    width:
                                                                                                                        '2px',
                                                                                                                    height:
                                                                                                                        '50px'
                                                                                                                }}
                                                                                                                orientation="vertical"
                                                                                                                flexItem
                                                                                                            />
                                                                                                        </Grid>

                                                                                                        <Grid
                                                                                                            item
                                                                                                            xs={5}
                                                                                                        >
                                                                                                            <Grid
                                                                                                                container
                                                                                                                spacing={
                                                                                                                    1
                                                                                                                }
                                                                                                                alignItems="center"
                                                                                                            >
                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    style={{
                                                                                                                        paddingLeft:
                                                                                                                            '10px'
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <OpacityIcon
                                                                                                                        className={
                                                                                                                            classes.smallCardIcon
                                                                                                                        }
                                                                                                                        color="error"
                                                                                                                    />
                                                                                                                </Grid>
                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    style={{
                                                                                                                        paddingLeft:
                                                                                                                            '20px'
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <Typography
                                                                                                                        color="error"
                                                                                                                        className={
                                                                                                                            classes.smallIconValue
                                                                                                                        }
                                                                                                                        style={{
                                                                                                                            cursor:
                                                                                                                                dataEuo?.inCompletedBatchData !==
                                                                                                                                    0 &&
                                                                                                                                'pointer'
                                                                                                                        }}
                                                                                                                                onClick={() =>
                                                                                                                                    dataEuo?.inCompletedBatchData !==
                                                                                                                                    0 &&
                                                                                                                            handleDashboardbatchIncomplete()
                                                                                                                        }
                                                                                                                    >
                                                                                                                        {dataEuo?.inCompletedBatchData
                                                                                                                            ? dataEuo?.inCompletedBatchData
                                                                                                                            : 0}
                                                                                                                    </Typography>
                                                                                                                </Grid>
                                                                                                            </Grid>

                                                                                                            <Typography
                                                                                                                className={
                                                                                                                    classes.resolution
                                                                                                                }
                                                                                                                color="primary"
                                                                                                                style={{
                                                                                                                    paddingLeft:
                                                                                                                        '5px'
                                                                                                                }}
                                                                                                            >
                                                                                                                Batch
                                                                                                                products
                                                                                                            </Typography>
                                                                                                        </Grid>

                                                                                                        <Grid
                                                                                                            item
                                                                                                            style={{
                                                                                                                paddingLeft:
                                                                                                                    '50px'
                                                                                                            }}
                                                                                                        >
                                                                                                            <Typography
                                                                                                                color="primary"
                                                                                                                className={
                                                                                                                    classes.smalldetailTitle
                                                                                                                }
                                                                                                            >
                                                                                                                Recipient
                                                                                                                data
                                                                                                                incomplete
                                                                                                            </Typography>
                                                                                                        </Grid>
                                                                                                    </Grid>
                                                                                                </Card>
                                                                                            </Grid>

                                                                                            <Grid item xs={4}>
                                                                                                <Card
                                                                                                    color="primary"
                                                                                                    style={{
                                                                                                        borderRadius:
                                                                                                            '10px',
                                                                                                        height: '100%',
                                                                                                        width: '100%'
                                                                                                    }}
                                                                                                >
                                                                                                    {emailSuccess?.data
                                                                                                        ?.swapOut
                                                                                                        ?.swap ===
                                                                                                    true ? (
                                                                                                        <Button
                                                                                                            style={{
                                                                                                                height:
                                                                                                                    '100%',
                                                                                                                width:
                                                                                                                    '100%'
                                                                                                            }}
                                                                                                            onClick={
                                                                                                                handleSwapout
                                                                                                            }
                                                                                                            color="primary"
                                                                                                            variant="contained"
                                                                                                        >
                                                                                                            Click here
                                                                                                            to proceed
                                                                                                            swapout
                                                                                                            process
                                                                                                        </Button>
                                                                                                    ) : (
                                                                                                        ''
                                                                                                    )}
                                                                                                </Card>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>

                                                                        {/*<Grid item xs={2}>*/}

                                                                        {/*    <Grid item xs={12}>*/}
                                                                        {/*        <Card color="primary" style={{ borderRadius: '10px', height: '100%', width: '100%', }}>*/}
                                                                        {/*            {emailSuccess?.data?.swapOut?.swap === true ?*/}
                                                                        {/*                <Button style={{height:"100%"}} onClick={handleSwapout} color="primary" variant="contained" >*/}
                                                                        {/*                        Click here to proceed swapout process*/}
                                                                        {/*                    </Button>*/}

                                                                        {/*                : ''}*/}
                                                                        {/*        </Card>*/}
                                                                        {/*    </Grid>*/}
                                                                        {/*</Grid>*/}
                                                                    </Grid>

                                                                    {/**Units & batches**/}

                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        style={{
                                                                            marginBottom: '5px',
                                                                            marginTop: '10px'
                                                                        }}
                                                                    >
                                                                        <Grid container spacing={2} direction="row">
                                                                            <Grid item xs={12} spacing={2}>
                                                                                {dataEuo?.unitData?.length > 0 && (
                                                                                    <Grid item xs={12}>
                                                                                        <Paper
                                                                                            style={{
                                                                                                borderRadius: '10px',
                                                                                                padding: 20,
                                                                                                Width: '100%',
                                                                                                minHeight: '20vh'
                                                                                            }}
                                                                                        >
                                                                                            <Grid
                                                                                                item
                                                                                                xs={12}
                                                                                                style={{
                                                                                                    display: 'flex'
                                                                                                }}
                                                                                            >
                                                                                                <Grid
                                                                                                    item
                                                                                                    xs={12}
                                                                                                    container
                                                                                                    spacing={1}
                                                                                                >
                                                                                                    <>
                                                                                                        <Grid
                                                                                                            container
                                                                                                            style={{
                                                                                                                marginBottom:
                                                                                                                    '0px'
                                                                                                            }}
                                                                                                        >
                                                                                                            <Typography
                                                                                                                color="primary"
                                                                                                                className={
                                                                                                                    classes.smalldetailTitle
                                                                                                                }
                                                                                                            >
                                                                                                                Blood Units
                                                                                                            </Typography>
                                                                                                        </Grid>
                                                                                                        <Grid
                                                                                                            container
                                                                                                            spacing={1}
                                                                                                        >
                                                                                                            {dataEuo?.unitData?.map(
                                                                                                                (
                                                                                                                    obj,
                                                                                                                    index
                                                                                                                ) => (
                                                                                                                    <Grid
                                                                                                                        item
                                                                                                                        key={
                                                                                                                            index
                                                                                                                        }
                                                                                                                        style={{
                                                                                                                            padding:
                                                                                                                                '5px',
                                                                                                                            paddingTop:
                                                                                                                                '10px'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <Card
                                                                                                                            style={{
                                                                                                                                padding:
                                                                                                                                    '5px',
                                                                                                                                width:
                                                                                                                                    '380px'
                                                                                                                            }}
                                                                                                                            className={
                                                                                                                                obj?.status ===
                                                                                                                                    'Expired' ||
                                                                                                                                obj?.status ===
                                                                                                                                    'Unassociated' ||
                                                                                                                                obj.status ===
                                                                                                                                    'Dereservation' ||
                                                                                                                                obj.status ===
                                                                                                                                    'Quarantine' ||
                                                                                                                                obj.status ===
                                                                                                                                    'Fated' ||
                                                                                                                                obj.status ===
                                                                                                                                    'Wasted' ||
                                                                                                                                obj.status ===
                                                                                                                                    'Quarantine unit'
                                                                                                                                    ? classes.smalldetailCardError
                                                                                                                                    : obj.deviceStatus ===
                                                                                                                                      'Move Out'
                                                                                                                                    ? classes.smalldetailCardMoveout
                                                                                                                                    : obj.status ===
                                                                                                                                          'Assigned' ||
                                                                                                                                      obj.status ===
                                                                                                                                          'Unassigned' ||
                                                                                                                                      obj.status ===
                                                                                                                                          'Move In' ||
                                                                                                                                      obj.status ===
                                                                                                                                          'Associate' ||
                                                                                                                                      obj.status ===
                                                                                                                                          'Reactivated'
                                                                                                                                    ? classes.smalldetailCardAvailable
                                                                                                                                    : classes.smalldetailCard
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <table
                                                                                                                                style={{
                                                                                                                                    padding:
                                                                                                                                        '25px'
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <tr>
                                                                                                                                    <td style={{
                                                                                                                                        color: 'black', fontWeight: 'bold',
                                                                                                                                        fontSize: '40px', paddingLeft: '80px'
                                                                                                                                    }}>
                                                                                                                                        {formatBloodGroup(obj?.bloodgroups)}
                                                                                                                                    </td>

                                                                                                                                    {obj.deviceStatus ===
                                                                                                                                        'Move Out' &&
                                                                                                                                        obj.status !==
                                                                                                                                        'Wasted' &&
                                                                                                                                        obj.status !==
                                                                                                                                        'Expired' &&
                                                                                                                                        obj.status !==
                                                                                                                                        'Quarantine' &&
                                                                                                                                        obj.status !==
                                                                                                                                        'Fated' &&
                                                                                                                                        obj.status !==
                                                                                                                                        'Unassociated' &&
                                                                                                                                        obj.status !==
                                                                                                                                        'Dereservation' ? (
                                                                                                                                        <td
                                                                                                                                            style={{
                                                                                                                                                width:
                                                                                                                                                    '20px'
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <img
                                                                                                                                                src={
                                                                                                                                                    EditNotepad
                                                                                                                                                }
                                                                                                                                                style={{
                                                                                                                                                    width:
                                                                                                                                                        '30px',
                                                                                                                                                    marginLeft:
                                                                                                                                                        '90px',
                                                                                                                                                    cursor:
                                                                                                                                                        'pointer'
                                                                                                                                                }}
                                                                                                                                                onClick={(
                                                                                                                                                    e
                                                                                                                                                ) =>
                                                                                                                                                    handleOpenForm(
                                                                                                                                                        e,
                                                                                                                                                        obj
                                                                                                                                                    )
                                                                                                                                                }
                                                                                                                                                />
                                                                                                                                                <div style={{ marginLeft: '85px' }}>Form</div>
                                                                                                                                        </td>
                                                                                                                                    ) : (
                                                                                                                                        ''
                                                                                                                                    )}
                                                                                                                                </tr>

                                                                                                                               

                                                                                                                                <tr>
                                                                                                                                    <td colSpan="2">
                                                                                                                                        <hr style={{ borderTop: '1px solid black', margin: '10px 0' }} />
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        style={{ 
                                                                                                                                            color:
                                                                                                                                                'black',
                                                                                                                                            fontWeight:
                                                                                                                                                'bold',
                                                                                                                                            fontSize: '18px'
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        Unit
                                                                                                                                        Id
                                                                                                                                        :
                                                                                                                                    </td>
                                                                                                                                    <td style={{
                                                                                                                                        color: 'black',
                                                                                                                                        fontSize: '18px'
                                                                                                                                    }}>
                                                                                                                                        {obj?.donationCode
                                                                                                                                            ? obj?.donationCode
                                                                                                                                            : '-'}
                                                                                                                                    </td>
                                                                                                                                </tr>

                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        style={{
                                                                                                                                            color:
                                                                                                                                                'black',
                                                                                                                                            fontWeight:
                                                                                                                                                'bold',
                                                                                                                                            fontSize: '18px'
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        Blood
                                                                                                                                        Group
                                                                                                                                        :
                                                                                                                                    </td>
                                                                                                                                    <td style={{
                                                                                                                                        color: 'black', 
                                                                                                                                        fontSize: '18px'
                                                                                                                                    }}>
                                                                                                                                        {obj?.bloodgroups
                                                                                                                                            ? obj?.bloodgroups
                                                                                                                                            : '-'}
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        style={{
                                                                                                                                            color:
                                                                                                                                                'black',
                                                                                                                                            fontWeight:
                                                                                                                                                'bold',
                                                                                                                                            fontSize: '18px'
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        Product
                                                                                                                                        Group
                                                                                                                                        :
                                                                                                                                    </td>
                                                                                                                                    <td style={{
                                                                                                                                        color: 'black', 
                                                                                                                                        fontSize: '18px'
                                                                                                                                    }}>
                                                                                                                                        {obj?.productgroups
                                                                                                                                            ? obj?.productgroups
                                                                                                                                            : '-'}
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        style={{
                                                                                                                                            color:
                                                                                                                                                'black',
                                                                                                                                            fontWeight:
                                                                                                                                                'bold',
                                                                                                                                            fontSize: '18px'
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        Expiry
                                                                                                                                        Date
                                                                                                                                        :
                                                                                                                                    </td>
                                                                                                                                    <td style={{
                                                                                                                                        color: 'black', 
                                                                                                                                        fontSize: '18px'
                                                                                                                                    }}>
                                                                                                                                        {obj?.expiryDateAndTime
                                                                                                                                            ? moment(
                                                                                                                                                  obj?.expiryDateAndTime
                                                                                                                                              ).format(
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
                                                                                                                                                'bold',
                                                                                                                                            fontSize: '18px'
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        Status
                                                                                                                                        :
                                                                                                                                    </td>
                                                                                                                                    <td>
                                                                                                                                        <Typography
                                                                                                                                            color="primary"
                                                                                                                                            className={
                                                                                                                                                classes.smalldetailTitle
                                                                                                                                            }
                                                                                                                                            alignItems="center"
                                                                                                                                        >
                                                                                                                                            {(obj.deviceStatus ===
                                                                                                                                                'Move Out' &&
                                                                                                                                                obj.status ===
                                                                                                                                                    'Fated') ||
                                                                                                                                            (obj.deviceStatus ===
                                                                                                                                                'Move Out' &&
                                                                                                                                                obj.status ===
                                                                                                                                                    'Quarantine') ||
                                                                                                                                            (obj.deviceStatus ===
                                                                                                                                                'Move Out' &&
                                                                                                                                                obj.status ===
                                                                                                                                                    'Expired') ||
                                                                                                                                            (obj.deviceStatus ===
                                                                                                                                                'Move Out' &&
                                                                                                                                                obj.status ===
                                                                                                                                                    'Dereservation')
                                                                                                                                                ? obj.status +
                                                                                                                                                  ' (Removed)'
                                                                                                                                                : (obj.deviceStatus ===
                                                                                                                                                      'Move In' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                          'Reactivated') ||
                                                                                                                                                  (obj.deviceStatus ===
                                                                                                                                                      'Move In' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                          'Associate') ||
                                                                                                                                                  (obj.deviceStatus ===
                                                                                                                                                      'Move In' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                        'Assigned') ||
                                                                                                                                                    (obj.deviceStatus ===
                                                                                                                                                        'Move In' &&
                                                                                                                                                        obj.status ===
                                                                                                                                                        'Unassigned') 
                                                                                                                                                 
                                                                                                                                                ? 'Available'
                                                                                                                                                : (obj.deviceStatus ===
                                                                                                                                                      'Move Out' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                          'Reactivated') ||
                                                                                                                                                  (obj.deviceStatus ===
                                                                                                                                                      'Move Out' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                          'Associate') ||
                                                                                                                                                  (obj.deviceStatus ===
                                                                                                                                                      'Move Out' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                            'Assigned') ||
                                                                                                                                                        (obj.deviceStatus ===
                                                                                                                                                            'Move Out' &&
                                                                                                                                                            obj.status ===
                                                                                                                                                            'Unassigned')
                                                                                                                                                ? 'Removed'
                                                                                                                                                : obj.status}
                                                                                                                                        </Typography>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </table>
                                                                                                                        </Card>
                                                                                                                    </Grid>
                                                                                                                )
                                                                                                            )}
                                                                                                        </Grid>
                                                                                                    </>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </Paper>
                                                                                    </Grid>
                                                                                )}

                                                                                {dataEuo?.batchData?.length > 0 && (
                                                                                    <Grid item xs={12}>
                                                                                        <Grid
                                                                                            item
                                                                                            xs={12}
                                                                                            style={{
                                                                                                display: 'flex',
                                                                                                marginTop: '25px'
                                                                                            }}
                                                                                        >
                                                                                            <Grid
                                                                                                item
                                                                                                xs={12}
                                                                                                container
                                                                                                spacing={1}
                                                                                            >
                                                                                                <Paper
                                                                                                    style={{
                                                                                                        borderRadius:
                                                                                                            '10px',
                                                                                                        padding: 20,
                                                                                                        minWidth:
                                                                                                            '100%',
                                                                                                        minHeight:
                                                                                                            '20vh'
                                                                                                    }}
                                                                                                >
                                                                                                    <>
                                                                                                        <Grid
                                                                                                            container
                                                                                                            style={{
                                                                                                                marginBottom:
                                                                                                                    '0px'
                                                                                                            }}
                                                                                                        >
                                                                                                            <Typography
                                                                                                                color="primary"
                                                                                                                className={
                                                                                                                    classes.smalldetailTitle
                                                                                                                }
                                                                                                            >
                                                                                                                Batch Products
                                                                                                            </Typography>
                                                                                                        </Grid>
                                                                                                        <Grid
                                                                                                            container
                                                                                                            spacing={1}
                                                                                                        >
                                                                                                            {dataEuo?.batchData?.map(
                                                                                                                (
                                                                                                                    obj,
                                                                                                                    index
                                                                                                                ) => (
                                                                                                                    <Grid
                                                                                                                        item
                                                                                                                        key={
                                                                                                                            index
                                                                                                                        }
                                                                                                                        style={{
                                                                                                                            padding: '5px',
                                                                                                                            paddingTop: '10px'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <Card
                                                                                                                            style={{
                                                                                                                                padding: '5px',
                                                                                                                                width: '380px'
                                                                                                                            }}
                                                                                                                            className={
                                                                                                                                obj?.status ===
                                                                                                                                    'Expired' ||
                                                                                                                                obj?.status ===
                                                                                                                                    'Unassociated' ||
                                                                                                                                obj.status ===
                                                                                                                                    'Dereservation' ||
                                                                                                                                obj.status ===
                                                                                                                                    'Quarantine' ||
                                                                                                                                obj.status ===
                                                                                                                                    'Fated' ||
                                                                                                                                obj.status ===
                                                                                                                                    'Wasted' ||
                                                                                                                                obj.status ===
                                                                                                                                    'Quarantine unit'
                                                                                                                                    ? classes.smalldetailCardError
                                                                                                                                    : obj.deviceStatus ===
                                                                                                                                      'Move Out'
                                                                                                                                    ? classes.smalldetailCardMoveout
                                                                                                                                    : obj.status ===
                                                                                                                                          'Assigned' ||
                                                                                                                                      obj.status ===
                                                                                                                                          'Unassigned' ||
                                                                                                                                      obj.status ===
                                                                                                                                          'Move In' ||
                                                                                                                                      obj.status ===
                                                                                                                                          'Associate' ||
                                                                                                                                      obj.status ===
                                                                                                                                            'Reactivated' ||
                                                                                                                                            (obj.status === 'Swap Out'
                                                                                                                                            && obj.deviceStatus === 
                                                                                                                                            'Move In')
                                                                                                                                    ? classes.smalldetailCardAvailable
                                                                                                                                    : classes.smalldetailCard
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <table
                                                                                                                                style={{
                                                                                                                                    padding:
                                                                                                                                        '25px'
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <tr>
                                                                                                                                    <td style={{
                                                                                                                                        color: 'black', fontWeight: 'bold',
                                                                                                                                        fontSize: '16px'
                                                                                                                                    }}>
                                                                                                                                        {obj?.batchProduct
                                                                                                                                            ? obj?.batchProduct
                                                                                                                                            : '-'}
                                                                                                                                    </td>

                                                                                                                                    {obj.deviceStatus ===
                                                                                                                                        'Move Out' &&
                                                                                                                                    obj.status !==
                                                                                                                                        'Wasted' &&
                                                                                                                                    obj.status !==
                                                                                                                                        'Expired' &&
                                                                                                                                    obj.status !==
                                                                                                                                        'Quarantine' &&
                                                                                                                                    obj.status !==
                                                                                                                                        'Fated' &&
                                                                                                                                    obj.status !==
                                                                                                                                        'Unassociated' &&
                                                                                                                                    obj.status !==
                                                                                                                                        'Dereservation' ? (
                                                                                                                                        <td
                                                                                                                                            style={{
                                                                                                                                                width:
                                                                                                                                                    '20px'
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <img
                                                                                                                                                src={
                                                                                                                                                    EditNotepad
                                                                                                                                                }
                                                                                                                                                    style={{
                                                                                                                                                        width:
                                                                                                                                                            '30px',
                                                                                                                                                        marginLeft:
                                                                                                                                                            '95px',
                                                                                                                                                        cursor:
                                                                                                                                                            'pointer'
                                                                                                                                                    }}
                                                                                                                                                onClick={(
                                                                                                                                                    e
                                                                                                                                                ) =>
                                                                                                                                                    handleopenForm(
                                                                                                                                                        e,
                                                                                                                                                        obj
                                                                                                                                                    )
                                                                                                                                                }
                                                                                                                                                />
                                                                                                                                                <div style={{ marginLeft: '90px' }}>Form</div>
                                                                                                                                        </td>
                                                                                                                                    ) : (
                                                                                                                                        ''
                                                                                                                                    )}
                                                                                                                                </tr>

                                                                                                                                <tr>
                                                                                                                                    <td colSpan="2">
                                                                                                                                        <hr style={{ borderTop: '1px solid black', margin: '10px 0' }} />
                                                                                                                                    </td>
                                                                                                                                </tr>

                                                                                                                                <tr>
                                                                                                                                <td
                                                                                                                                    style={{
                                                                                                                                        color:
                                                                                                                                            'black',
                                                                                                                                        fontWeight:
                                                                                                                                                'bold',
                                                                                                                                            fontSize: '18px'
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    GTINNumber :
                                                                                                                                </td>
                                                                                                                                <td style={{
                                                                                                                                    color: 'black',
                                                                                                                                        fontSize: '18px'
                                                                                                                                }}>
                                                                                                                                    {obj.gtinNumber
                                                                                                                                        ? obj.gtinNumber
                                                                                                                                        : '-'}
                                                                                                                                </td>
                                                                                                                                </tr>

                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        style={{
                                                                                                                                            color:
                                                                                                                                                'black',
                                                                                                                                            fontWeight:
                                                                                                                                                'bold',
                                                                                                                                            fontSize: '18px'
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        BatchNo :
                                                                                                                                    </td>
                                                                                                                                    <td style={{
                                                                                                                                        color: 'black', 
                                                                                                                                        fontSize: '18px'
                                                                                                                                    }}>
                                                                                                                                        {obj?.batchNumber
                                                                                                                                            ? obj?.batchNumber
                                                                                                                                            : '-'}
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                {/*<tr>*/}
                                                                                                                                {/*    <td*/}
                                                                                                                                {/*        style={{*/}
                                                                                                                                {/*            color:*/}
                                                                                                                                {/*                'black',*/}
                                                                                                                                {/*            fontWeight:*/}
                                                                                                                                {/*                'bold'*/}
                                                                                                                                {/*        }}*/}
                                                                                                                                {/*    >*/}
                                                                                                                                {/*        Product*/}
                                                                                                                                {/*        Description*/}
                                                                                                                                {/*        :*/}
                                                                                                                                {/*    </td>*/}
                                                                                                                                {/*    <td style={{*/}
                                                                                                                                {/*        color: 'black', fontWeight: 'bold',*/}
                                                                                                                                {/*        fontSize: '12px'*/}
                                                                                                                                {/*    }}>*/}
                                                                                                                                {/*        {obj?.batchProduct*/}
                                                                                                                                {/*            ? obj?.batchProduct*/}
                                                                                                                                {/*            : '-'}*/}
                                                                                                                                {/*    </td>*/}
                                                                                                                                {/*</tr>*/}
                                                                                                                                <tr>
                                                                                                                                    <td
                                                                                                                                        style={{
                                                                                                                                            color:
                                                                                                                                                'black',
                                                                                                                                            fontWeight:
                                                                                                                                                'bold',
                                                                                                                                            fontSize: '18px'
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        ExpiryDate :
                                                                                                                                    </td>
                                                                                                                                    <td style={{
                                                                                                                                        color: 'black',
                                                                                                                                        fontSize: '18px'
                                                                                                                                    }}>
                                                                                                                                        {obj?.expiryDate
                                                                                                                                            ? moment(
                                                                                                                                                  obj?.expiryDate
                                                                                                                                              ).format(
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
                                                                                                                                                'bold',
                                                                                                                                            fontSize: '18px'
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        Status :
                                                                                                                                    </td>
                                                                                                                                    <td>
                                                                                                                                        <Typography
                                                                                                                                            color="primary"
                                                                                                                                            className={
                                                                                                                                                classes.smalldetailTitle
                                                                                                                                            }
                                                                                                                                            alignItems="center"
                                                                                                                                        >
                                                                                                                                            {(obj.deviceStatus ===
                                                                                                                                                'Move Out' &&
                                                                                                                                                obj.deviceStatus ===
                                                                                                                                                    'Move Out' &&
                                                                                                                                                obj.status ===
                                                                                                                                                    'Fated') ||
                                                                                                                                            (obj.deviceStatus ===
                                                                                                                                                'Move Out' &&
                                                                                                                                                obj.status ===
                                                                                                                                                    'Quarantine') ||
                                                                                                                                            (obj.deviceStatus ===
                                                                                                                                                'Move Out' &&
                                                                                                                                                obj.status ===
                                                                                                                                                    'Expired') ||
                                                                                                                                            (obj.deviceStatus ===
                                                                                                                                                'Move Out' &&
                                                                                                                                                obj.status ===
                                                                                                                                                    'Dereservation')
                                                                                                                                                ? obj.status +
                                                                                                                                                  ' (Removed)'
                                                                                                                                                : (obj.deviceStatus ===
                                                                                                                                                      'Move In' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                          'Reactivated') ||
                                                                                                                                                  (obj.deviceStatus ===
                                                                                                                                                      'Move In' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                          'Associate') ||
                                                                                                                                                 
                                                                                                                                                  (obj.deviceStatus ===
                                                                                                                                                      'Move In' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                        'Assigned') ||
                                                                                                                                                    (obj.deviceStatus ===
                                                                                                                                                        'Move In' &&
                                                                                                                                                        obj.status ===
                                                                                                                                                        'Unassigned')
                                                                                                                                                    || (obj.deviceStatus ===
                                                                                                                                                        'Move In' &&
                                                                                                                                                        obj.status ===
                                                                                                                                                        'Swap Out')
                                                                                                                                                ? 'Available'
                                                                                                                                                : (obj.deviceStatus ===
                                                                                                                                                      'Move Out' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                          'Reactivated') ||
                                                                                                                                                  (obj.deviceStatus ===
                                                                                                                                                      'Move Out' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                          'Associate') ||
                                                                                                                                                  (obj.deviceStatus ===
                                                                                                                                                      'Move Out' &&
                                                                                                                                                      obj.status ===
                                                                                                                                                            'Assigned') ||
                                                                                                                                                        (obj.deviceStatus ===
                                                                                                                                                            'Move Out' &&
                                                                                                                                                            obj.status ===
                                                                                                                                                            'Unassigned')
                                                                                                                                                ? 'Removed'
                                                                                                                                                : obj.status}
                                                                                                                                        </Typography>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </table>
                                                                                                                        </Card>
                                                                                                                    </Grid>
                                                                                                                )
                                                                                                            )}
                                                                                                        </Grid>
                                                                                                    </>
                                                                                                </Paper>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                )}
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={3}>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        style={{
                                                                            minHeight: '50%',
                                                                            backgroundColor: '#fff',

                                                                            borderRadius: 10,
                                                                            padding: '10px',
                                                                            margin: '0 auto',
                                                                            alignItems: 'stretch'

                                                                            // marginTop: '20px'
                                                                        }}
                                                                    >
                                                                        <Grid>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={6}>
                                                                                    <Card
                                                                                        className={
                                                                                            classes.smalldetailCard
                                                                                        }
                                                                                    >
                                                                                        <Grid
                                                                                            container
                                                                                            direction="row"
                                                                                            spacing={1}
                                                                                            alignItems="center"
                                                                                        >
                                                                                            <Grid item>
                                                                                                <Grid
                                                                                                    container
                                                                                                    spacing={1}
                                                                                                    alignItems="center"
                                                                                                >
                                                                                                    <Grid
                                                                                                        item
                                                                                                        alignItems="center"
                                                                                                        style={{
                                                                                                            paddingLeft:
                                                                                                                '20px'
                                                                                                        }}
                                                                                                    >
                                                                                                        <WarningIcon
                                                                                                            className={
                                                                                                                classes.smallCardIcon
                                                                                                            }
                                                                                                            color="error"
                                                                                                        />
                                                                                                    </Grid>
                                                                                                    <Grid
                                                                                                        item
                                                                                                        alignItems="center"
                                                                                                        style={{
                                                                                                            paddingLeft:
                                                                                                                '15px'
                                                                                                        }}
                                                                                                    >
                                                                                                        <Typography
                                                                                                            color="error"
                                                                                                            className={
                                                                                                                classes.smallIconValue
                                                                                                            }
                                                                                                            style={{
                                                                                                                cursor:
                                                                                                                    'pointer'
                                                                                                            }}
                                                                                                            onClick={() =>
                                                                                                                handleDashboardAletsFiltter(
                                                                                                                    'type',
                                                                                                                    'status',
                                                                                                                    'Critical Alert',
                                                                                                                    'Unresolved',
                                                                                                                    'Alerts Unresolved',
                                                                                                                    'Alerts Unresolved'
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            {dataEuo?.warningTotal
                                                                                                                ? dataEuo?.warningTotal
                                                                                                                : 0}
                                                                                                        </Typography>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                item
                                                                                                style={{
                                                                                                    paddingLeft: '50px'
                                                                                                }}
                                                                                            >
                                                                                                <Typography
                                                                                                    color="primary"
                                                                                                    className={
                                                                                                        classes.smalldetailTitle
                                                                                                    }
                                                                                                >
                                                                                                    Critical
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Card>
                                                                                </Grid>
                                                                                <Grid item xs={6}>
                                                                                    <Card
                                                                                        className={
                                                                                            classes.smalldetailCard
                                                                                        }
                                                                                    >
                                                                                        <Grid
                                                                                            container
                                                                                            direction="row"
                                                                                            spacing={1}
                                                                                            alignItems="center"
                                                                                            style={{
                                                                                                alignItems: 'center'
                                                                                            }}
                                                                                        >
                                                                                            <Grid item>
                                                                                                <Grid
                                                                                                    container
                                                                                                    spacing={2}
                                                                                                    alignItems="center"
                                                                                                >
                                                                                                    <Grid
                                                                                                        item
                                                                                                        style={{
                                                                                                            paddingLeft:
                                                                                                                '20px'
                                                                                                        }}
                                                                                                    >
                                                                                                        <OfflineBoltIcon
                                                                                                            className={
                                                                                                                classes.smallCardIcon
                                                                                                            }
                                                                                                            color="error"
                                                                                                        />
                                                                                                    </Grid>
                                                                                                    <Grid
                                                                                                        item
                                                                                                        style={{
                                                                                                            paddingLeft:
                                                                                                                '15px'
                                                                                                        }}
                                                                                                    >
                                                                                                        <Typography
                                                                                                            color="error"
                                                                                                            className={
                                                                                                                classes.smallIconValue
                                                                                                            }
                                                                                                            style={{
                                                                                                                cursor:
                                                                                                                    'pointer'
                                                                                                            }}
                                                                                                            onClick={() =>
                                                                                                                handleDashboardAletsFiltter(
                                                                                                                    'type',
                                                                                                                    'status',
                                                                                                                    'General Alert',
                                                                                                                    'Unresolved',
                                                                                                                    'Alerts Unresolved',
                                                                                                                    'Alerts Unresolved'
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            {dataEuo?.alertTotal
                                                                                                                ? dataEuo?.alertTotal
                                                                                                                : 0}
                                                                                                        </Typography>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                            <Grid
                                                                                                item
                                                                                                style={{
                                                                                                    paddingLeft: '50px'
                                                                                                }}
                                                                                            >
                                                                                                <Typography
                                                                                                    color="primary"
                                                                                                    className={
                                                                                                        classes.smalldetailTitle
                                                                                                    }
                                                                                                >
                                                                                                    General
                                                                                                </Typography>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Card>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid container justifyContent="center">
                                                                                <Grid
                                                                                    item
                                                                                    container
                                                                                    style={{ marginTop: '15px' }}
                                                                                    justifyContent="center"
                                                                                >
                                                                                    <Typography
                                                                                        color="error"
                                                                                        className={
                                                                                            classes.smallIconValue
                                                                                        }
                                                                                        style={{
                                                                                            marginLeft: '10px'
                                                                                        }}
                                                                                    >
                                                                                        {alertsunderstoodEuo &&
                                                                                        alertsunderstoodEuo?.length > 0
                                                                                            ? alertsunderstoodEuo?.length
                                                                                            : ''}
                                                                                    </Typography>
                                                                                </Grid>

                                                                                <Grid
                                                                                    item
                                                                                    style={{ marginTop: '15px' }}
                                                                                >
                                                                                    <Typography
                                                                                        color="primary"
                                                                                        className={
                                                                                            classes.smalldetailTitle
                                                                                        }
                                                                                    >
                                                                                        Alerts awaiting response
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>

                                                                            {alertsunderstoodEuo &&
                                                                            alertsunderstoodEuo?.length > 0 ? (
                                                                                alertsunderstoodEuo?.map(
                                                                                    (message, index) => (
                                                                                        <>
                                                                                            <Grid
                                                                                                style={{
                                                                                                    marginBottom: '0px',
                                                                                                    marginTop: '15px'
                                                                                                }}
                                                                                            >
                                                                                                {message.messageBody &&
                                                                                                    message.messageBody?.map(
                                                                                                        (
                                                                                                            card,
                                                                                                            index
                                                                                                        ) => (
                                                                                                            <Card
                                                                                                                key={
                                                                                                                    index
                                                                                                                }
                                                                                                                style={{
                                                                                                                    padding:
                                                                                                                        '10px',
                                                                                                                    borderLeft:
                                                                                                                        '9px solid #E59740',
                                                                                                                    marginBottom:
                                                                                                                        '10px'
                                                                                                                }}
                                                                                                                className={
                                                                                                                    classes.smalldetailCard
                                                                                                                }
                                                                                                            >
                                                                                                                <table
                                                                                                                    style={{
                                                                                                                        padding:
                                                                                                                            '10px'
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    color: 'black', fontWeight: 'bold', fontSize: '18px'
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                {
                                                                                                                                    card.reason
                                                                                                                                }
                                                                                                                            </td>

                                                                                                                            <td style={{ width: '20px', cursor: 'pointer' }}>
                                                                                                                                {message.type === 'General Alert' ? (
                                                                                                                                    <span aria-label="General Alert Icon" style={{ marginLeft: '85px' }}>
                                                                                                                                        <OfflineBoltIcon
                                                                                                                                            className={`${classes.smallCardIcon} ${classes.blink}`}
                                                                                                                                            color="error"
                                                                                                                                        />
                                                                                                                                        <div style={{ marginLeft: '73px' }}>General</div>
                                                                                                                                    </span>
                                                                                                                                ) : (
                                                                                                                                    <span aria-label="Warning Icon" style={{ marginLeft: '85px' }}>
                                                                                                                                        <WarningIcon
                                                                                                                                            className={`${classes.smallCardIcon} ${classes.blink}`}
                                                                                                                                            color="error"
                                                                                                                                            />
                                                                                                                                            <div style={{ marginLeft: '73px' }}>Critical</div>
                                                                                                                                    </span>
                                                                                                                                )}
                                                                                                                            </td>

                                                                                                                            <tr>
                                                                                                                                <td colSpan="2">
                                                                                                                                    <hr style={{ borderTop: '1px solid black', margin: '10px 0' }} />
                                                                                                                                </td>
                                                                                                                            </tr>

                                                                                                                        </tr>

                                                                                                                        <tr>
                                                                                                                            <td colSpan="2">
                                                                                                                                <hr style={{ borderTop: '1px solid black', margin: '10px 0' }} />
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                   
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    color:
                                                                                                                                        'black',
                                                                                                                                    fontWeight:
                                                                                                                                        'bold', fontSize: '18px'
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                {card.gtinNumber
                                                                                                                                    ? 'GTIN Number :'
                                                                                                                                    : 'Unit ID :'}
                                                                                                                            </td>
                                                                                                                            <td style={{
                                                                                                                                color: 'black',
                                                                                                                                fontSize: '18px'
                                                                                                                            }}>
                                                                                                                                {card.gtinNumber
                                                                                                                                    ? card.gtinNumber
                                                                                                                                    : card.unitId
                                                                                                                                    ? card.unitId
                                                                                                                                    : ''}
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td
                                                                                                                                style={{
                                                                                                                                    color:
                                                                                                                                        'black',
                                                                                                                                    fontWeight:
                                                                                                                                        'bold', fontSize: '18px'
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                {card.batchProduct
                                                                                                                                    ? 'Batch Product :'
                                                                                                                                    : ' Product Group :'}
                                                                                                                            </td>
                                                                                                                            <td style={{
                                                                                                                                        color: 'black',
                                                                                                                                        fontSize: '18px'
                                                                                                                                    }}>
                                                                                                                                {card.batchProduct
                                                                                                                                    ? card.batchProduct
                                                                                                                                    : card.productGroup}
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                                <Grid
                                                                                                                    style={{
                                                                                                                        display:
                                                                                                                            'flex',
                                                                                                                        justifyContent:
                                                                                                                            'center',
                                                                                                                        marginTop: 10
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <CustomButton
                                                                                                                        variant="outlined"
                                                                                                                        color="primary"
                                                                                                                        onClick={(
                                                                                                                            e
                                                                                                                        ) =>
                                                                                                                            handleUnderstood(
                                                                                                                                message,
                                                                                                                                card
                                                                                                                            )
                                                                                                                        }
                                                                                                                    >
                                                                                                                        Understood
                                                                                                                    </CustomButton>
                                                                                                                </Grid>
                                                                                                            </Card>
                                                                                                        )
                                                                                                    )}
                                                                                            </Grid>
                                                                                        </>
                                                                                    )
                                                                                )
                                                                            ) : (
                                                                                <Grid
                                                                                    container
                                                                                    justifyContent="center"
                                                                                    style={{
                                                                                        marginBottom: '0px',
                                                                                        marginTop: '10px'
                                                                                    }}
                                                                                >
                                                                                    <Typography
                                                                                        color="primary"
                                                                                        className={classes.resolution}
                                                                                    >
                                                                                        No data available
                                                                                    </Typography>
                                                                                </Grid>
                                                                            )}
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    {/*<Card color="primary" style={{ borderRadius: '10px', width: '97%', }}>*/}
                                                    {/*{emailSuccess?.data?.swapOut?.swap === true ?*/}
                                                    {/*    <Grid item xs={12} style={{ height: '100px', }}>*/}
                                                    {/*            <Button onClick={handleSwapout} color="primary" variant="contained" style={{ height: '100px', width: '100%', }}>*/}
                                                    {/*            Click here to proceed swapout process*/}
                                                    {/*        </Button>*/}
                                                    {/*    </Grid> */}
                                                    {/*    : ''}*/}
                                                    {/*        */}
                                                    {/*<Grid container direction="column" spacing={1} alignItems="center" style={{ paddingTop: '10px' }}>*/}
                                                    {/*        */}
                                                    {/*    <Grid item>*/}
                                                    {/*        */}
                                                    {/*        <Grid container spacing={1} alignItems="center" >*/}

                                                    {/*        */}
                                                    {/*            <Grid item>*/}

                                                    {/*        */}
                                                    {/*                <Typography*/}
                                                    {/*        */}
                                                    {/*                    color="primary"*/}
                                                    {/*        */}
                                                    {/*                    className={classes.smalldetailTitle}*/}
                                                    {/*        */}
                                                    {/*                    onClick={handleSwapout}*/}
                                                    {/*        */}
                                                    {/*                    style={{cursor:'pointer'} }*/}
                                                    {/*        */}
                                                    {/*                >*/}
                                                    {/*        */}
                                                    {/*                    Click here to proceed*/}
                                                    {/*        */}
                                                    {/*                </Typography>*/}
                                                    {/*        */}
                                                    {/*            </Grid>*/}
                                                    {/*        */}
                                                    {/*        </Grid>*/}
                                                    {/*        */}
                                                    {/*    </Grid>*/}
                                                    {/*        */}
                                                    {/*    <Grid item>*/}
                                                    {/*        */}
                                                    {/*        <Typography*/}
                                                    {/*        */}
                                                    {/*            color="primary"*/}
                                                    {/*        */}
                                                    {/*            className={classes.smalldetailTitle}*/}
                                                    {/*        */}
                                                    {/*        >*/}
                                                    {/*        */}
                                                    {/*            Swap out process*/}
                                                    {/*        */}
                                                    {/*        </Typography>*/}
                                                    {/*        */}
                                                    {/*    </Grid>*/}

                                                    {/*        */}
                                                    {/*</Grid>*/}

                                                    {/*  </Card>*/}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/*{*/}
                        {/*            remoteInfo && remoteInfo?.remoteLogin === "TRUE" ?*/}
                        {/*        <Grid item xs={2} sm={2} md={2} lg={2}>*/}
                        {/*            <Grid item className={classes.sideBar}>*/}
                        {/*                <Grid*/}
                        {/*                    container*/}
                        {/*                    justify="center"*/}
                        {/*                    style={{ marginTop: '30px' }}*/}
                        {/*                    spacing={2}*/}
                        {/*                    direction="column"*/}
                        {/*                >*/}
                        {/*                    <Grid item>*/}
                        {/*                        <Typography style={{ fontWeight: 300 }} variant="h5" className={classes.tipsTypo}>*/}
                        {/*                            Tips*/}
                        {/*                        </Typography>*/}
                        {/*                    </Grid>*/}
                        {/*                    <Grid item>*/}
                        {/*                        <Typography variant="h5" className={classes.tipsTypoBlue}>*/}
                        {/*                            Access Device*/}
                        {/*                        </Typography>*/}
                        {/*                    </Grid>*/}
                        {/*                    <Grid item>*/}
                        {/*                        <Typography variant="h5" className={classes.tipsTypo}>*/}
                        {/*                            Automatic Access*/}
                        {/*                        </Typography>*/}
                        {/*                    </Grid>*/}
                        {/*                    <Grid item>*/}
                        {/*                        <Typography variant="h5" className={classes.tipsTypoSmall}>*/}
                        {/*                            Present ID badge to access device automatically.*/}
                        {/*                        </Typography>*/}
                        {/*                    </Grid>*/}
                        {/*                    <Grid item>*/}
                        {/*                        <img src={ManulaDevice} style={{ width: 180, marginTop: 10 }} />*/}
                        {/*                    </Grid>*/}
                        {/*                    <Grid item>*/}
                        {/*                        <Grid container alignItems="center">*/}
                        {/*                            <Grid item xs>*/}
                        {/*                                <Divider />*/}
                        {/*                            </Grid>*/}
                        {/*                            <Grid item>*/}
                        {/*                                <Typography*/}
                        {/*                                    variant="h5"*/}
                        {/*                                    style={{ margin: '0 8px' }}*/}
                        {/*                                    className={classes.tipsTypoSmall}*/}
                        {/*                                >*/}
                        {/*                                    or*/}
                        {/*                                </Typography>*/}
                        {/*                            </Grid>*/}
                        {/*                            <Grid item xs>*/}
                        {/*                                <Divider />*/}
                        {/*                            </Grid>*/}
                        {/*                        </Grid>*/}
                        {/*                    </Grid>*/}
                        {/*                    <Grid item>*/}
                        {/*                        <Typography variant="h5" className={classes.tipsTypo}>*/}
                        {/*                            Manual Access*/}
                        {/*                        </Typography>*/}
                        {/*                    </Grid>*/}
                        {/*                    <Grid item>*/}
                        {/*                        <Typography variant="h5" className={classes.tipsTypoSmall}>*/}
                        {/*                            Simply click on Access Device button to manually login and access device*/}
                        {/*                        </Typography>*/}
                        {/*                    </Grid>*/}
                        {/*                    <Grid item xs>*/}
                        {/*                        <CustomButton*/}
                        {/*                            onClick={() => setDeviceLogin(true)}*/}
                        {/*                            variant="contained"*/}
                        {/*                            fullWidth*/}
                        {/*                            color="primary"*/}
                        {/*                            disabled={deviceId === undefined || deviceId?.length === 0}>*/}

                        {/*                            Access Device*/}
                        {/*                        </CustomButton>*/}
                        {/*                    </Grid>*/}
                        {/*                </Grid>*/}
                        {/*            </Grid>*/}
                        {/*        </Grid> : ("")*/}
                        {/*}*/}
                    </Grid>

                    <Dialog
                        open={recipientDialog}
                        //onClose={recipientDialogClose}
                        maxWidth="md"
                        PaperProps={{
                            style: {
                                padding: 20,
                                borderRadius: '10px',
                                backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                                overflowY: 'unset',
                                minWidth: '950px'
                            }
                        }}
                    >
                        <>
                            <DialogTitle color="primary" id="simple-dialog-title">
                                <Typography color="primary" variant="h6" style={{ fontWeight: 'bold' }}>
                                    Emergency Assign -{' '}
                                    {screen === 0
                                        ? 'Action Required'
                                        : screen === 1
                                        ? 'Recipient Information'
                                        : 'Units Information'}
                                </Typography>
                            </DialogTitle>
                            <Divider variant="fullWidth" orientation="horizontal" />

                            <DialogContent>
                                <Grid style={{ marginTop: 10 }}>
                                    <>
                                        {screen === 0 ? (
                                            <Paper
                                                elevation={0}
                                                style={{
                                                    padding: 20,
                                                    width: '100%',
                                                    height: '55%',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justify="center"
                                                    alignItems="center"
                                                    spacing={8}
                                                    style={{ width: '100%', height: '55%' }}
                                                >
                                                    <Grid item style={{ marginBottom: 20, marginTop: 20 }}>
                                                        <Typography className={classes.returnText} variant="h5">
                                                            Can you complete recipient data now?
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                            <CustomButton
                                                                onClick={handleCompleteButtonClick}
                                                                color="primary"
                                                                variant="outlined"
                                                            >
                                                                Yes, complete
                                                            </CustomButton>
                                                            <CustomButton
                                                                onClick={handleSkipButtonClick}
                                                                color="primary"
                                                                variant="contained"
                                                            >
                                                                No , Skip Now
                                                            </CustomButton>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        ) : screen === 1 ? (
                                            <Paper
                                                elevation={0}
                                                style={{
                                                    padding: 10,
                                                    width: '100%',
                                                    height: '25%',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                <Grid container style={{ padding: 10, height: '25%' }}>
                                                    <Grid item style={{ marginTop: 0 }}>
                                                        {/* <Grid container style={{ marginBottom: 20 }}>
                                                         */}
                                                        {/*<Grid item>*/}
                                                        {/*
                                                         */}
                                                        {/*    <Typography variant="h6" color="primary">*/}
                                                        {/*
                                                         */}
                                                        {/*            Step 1 : Enter the Recipient Information*/}
                                                        {/*
                                                         */}
                                                        {/*    </Typography>*/}
                                                        {/*
                                                         */}
                                                        {/*</Grid>*/}
                                                        {/*
                                                                </Grid>*/}
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
                                                                    width="250px"
                                                                    focus={true}
                                                                    //disabled={!accessableCodes.includes('BS-ACO-1043')}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <InputLabel className={classes.inputLabel}>
                                                                    Recipient Firstname
                                                                </InputLabel>
                                                                <CustomInput
                                                                    name="firstName"
                                                                    value={firstName}
                                                                    onChange={(e) => setFirstName(e.target.value)}
                                                                    autoFocus={true}
                                                                    width="250px"
                                                                    disabled={
                                                                        resData !== undefined &&
                                                                        resData?.data?.length !== 0
                                                                            ? true
                                                                            : false
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
                                                                    width="250px"
                                                                    disabled={
                                                                        resData !== undefined &&
                                                                        resData?.data?.length !== 0
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <InputLabel className={classes.inputLabel}>
                                                                    Gender
                                                                </InputLabel>
                                                                <FormControl
                                                                    component="fieldset"
                                                                    disabled={
                                                                        resData !== undefined &&
                                                                        resData?.data?.length !== 0
                                                                            ? true
                                                                            : false
                                                                    }
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
                                                                <InputLabel className={classes.inputLabel}>
                                                                    Date of Birth
                                                                </InputLabel>
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
                                                                    disabled={
                                                                        resData !== undefined &&
                                                                        resData?.data?.length !== 0
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                                {dobError && (
                                                                    <span style={{ color: 'red' }}>Invalid date</span>
                                                                )}
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
                                                            {/*        disabled={resData !== undefined && resData?.data?.length !== 0 ? true : false}*/}
                                                            {/*    />*/}
                                                            {/*</Grid>*/}
                                                        </Grid>
                                                        <Grid item style={{ marginTop: 25 }}>
                                                            <CustomButton
                                                                onClick={handleContinueClick}
                                                                color="primary"
                                                                variant="contained"
                                                            >
                                                                {postLoading ? (
                                                                    <CircularProgress color="white" size="20px" />
                                                                ) : (
                                                                    'Next'
                                                                )}
                                                            </CustomButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        ) : screen === 2 ? (
                                            <Paper
                                                style={{
                                                    borderRadius: '10px',
                                                    padding: 20,
                                                    height: '30%',
                                                    overflow: 'auto',
                                                    maxHeight: '62vh'
                                                }}
                                                elevation={0}
                                            >
                                                <Grid
                                                    container
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns:
                                                            units?.length === 1 ? '100%' : '33% 33% 33%'
                                                    }}
                                                    spacing={2}
                                                >
                                                    <Grid item style={{ marginTop: 5 }}>
                                                        {/*  <Grid container style={{ marginBottom: 15 }}>
                                                                        <Grid item>
                                                                            <Typography variant="h6" color="primary">
                                                                                Step 2 : Verify the Units
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>*/}

                                                        {units?.map((unit) => (
                                                            <Grid key={unit.id} item xs={6}>
                                                                <Card
                                                                    className={
                                                                        unit.check
                                                                            ? classes.cardRoot
                                                                            : classes.cardRootGray
                                                                    }
                                                                >
                                                                    <table className="table">
                                                                        <tr>
                                                                            <td className={classes.cardHead}>
                                                                                Unit ID# :
                                                                            </td>
                                                                            <td className={classes.cardDetail}>
                                                                                {unit?.donationCode}
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td className={classes.cardHead}>
                                                                                Product Group :
                                                                            </td>
                                                                            <td className={classes.cardDetail}>
                                                                                {unit?.productgroup?.name}
                                                                            </td>
                                                                        </tr>

                                                                        <>
                                                                            <tr>
                                                                                <td className={classes.cardHead}>
                                                                                    Blood Group :
                                                                                </td>
                                                                                <td className={classes.cardDetail}>
                                                                                    {unit.bloodgroup?.name}
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td className={classes.cardHead}>
                                                                                    Dereservation Date :
                                                                                </td>
                                                                                <td className={classes.cardDetail}>
                                                                                    {unit?.dereservationDate !=
                                                                                    undefined
                                                                                        ? getDate(
                                                                                              unit?.dereservationDate
                                                                                          )
                                                                                        : ' - '}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className={classes.cardHead}>
                                                                                    Expiry Date :
                                                                                </td>
                                                                                <td className={classes.cardDetail}>
                                                                                    {unit.expiryDateAndTime
                                                                                        ? moment(
                                                                                              unit.expiryDateAndTime
                                                                                          ).format('DD-MM-YYYY HH:mm')
                                                                                        : '-'}
                                                                                </td>
                                                                            </tr>
                                                                        </>
                                                                    </table>
                                                                </Card>
                                                            </Grid>
                                                        ))}

                                                        <Grid item style={{ marginTop: 25 }}>
                                                            <CustomButton
                                                                onClick={handleMultipleAssign}
                                                                color="primary"
                                                                variant="contained"
                                                            >
                                                                Assign
                                                            </CustomButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        ) : (
                                            ''
                                        )}
                                    </>
                                </Grid>
                            </DialogContent>
                        </>
                    </Dialog>

                    {/* For Units*/}

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
                        <Paper
                            elevation={0}
                            style={{ padding: 10, width: '100%', height: '25%', borderRadius: '10px' }}
                        >
                            <Grid container style={{ padding: 10, height: '25%' }}>
                                <Grid item style={{ marginTop: 0 }}>
                                    <Grid container style={{ marginBottom: 20 }}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" color="primary">
                                                Enter the Recipient Information
                                            </Typography>

                                            <Grid item xs={8} style={{ display: 'flex' }}>
                                                <Grid item style={{ paddingTop: '20px' }}>
                                                    <Typography className={classes.inputLabel} variant="subtitle1">
                                                        Username
                                                    </Typography>
                                                    <SelectOption
                                                        label="Select User"
                                                        onChange={handleUserChange}
                                                        value={user}
                                                        minWidth={250}
                                                        noLabel={true}
                                                        options={options4?.data || []}
                                                        placeHolder="Select User"
                                                        //onOpen={handleEmptyDevices}
                                                        //loading={options8loading}
                                                    />
                                                    {batchUserError && (
                                                        <Typography
                                                            style={{ fontSize: '0.75rem', display: 'flex' }}
                                                            color="error"
                                                            variant="subtitle1"
                                                        >
                                                            User is required
                                                        </Typography>
                                                    )}
                                                </Grid>

                                                <Grid item style={{ paddingLeft: '63%', paddingTop: '30px' }}>
                                                    <InputLabel className={classes.inputLabel}>
                                                        Temporary Recipient Number
                                                    </InputLabel>
                                                    <CustomInput
                                                        name="referenceNo"
                                                        value={referenceNo}
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
                                        </Grid>
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.inputLabel}>
                                                Recipient Given Name(s)
                                            </InputLabel>
                                            <CustomInput
                                                name="firstName"
                                                value={firstName}
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
                                                disabled={
                                                    resData !== undefined && resData?.data?.length !== 0 ? true : false
                                                }
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
                                                disabled={
                                                    resData !== undefined && resData?.data?.length !== 0 ? true : false
                                                }
                                            />
                                            {dobError && <span style={{ color: 'red' }}>Invalid date</span>}
                                        </Grid>
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.inputLabel}>Gender</InputLabel>
                                            <FormControl
                                                component="fieldset"
                                                disabled={
                                                    resData !== undefined && resData?.data?.length !== 0 ? true : false
                                                }
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
                                                        console.log('On Radio Change ' + e.target.value);
                                                        setSelectBoolean(e.target.value);
                                                    }}
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
                            <div style={{ display: 'flex', marginTop: 15 }}>
                                <Grid item xs={6} md={6}>
                                    <Typography
                                        variant="h6"
                                        color="primary"
                                        style={{ fontSize: '17px', marginBottom: 15 }}
                                    >
                                        Units
                                    </Typography>

                                    {form &&
                                        form?.map((unit, index) => (
                                            <Card
                                                key={unit.rfidNumber}
                                                style={{ padding: '5px', width: '380px' }}
                                                className={
                                                    unit?.status === 'Expired' ||
                                                    unit?.status === 'Unassociated' ||
                                                    unit.status === 'Dereservation' ||
                                                    unit.status === 'Wasted' ||
                                                    unit.status === 'Quarantine' ||
                                                    unit.status === 'Fated' ||
                                                    unit.status === 'Quarantine unit'
                                                        ? classes.smalldetailCardError
                                                        : unit.deviceStatus === 'Move Out'
                                                        ? classes.smalldetailCardMoveout
                                                        : unit.status === 'Assigned' ||
                                                          unit.status === 'Move In' ||
                                                          unit.status === 'Associate' ||
                                                          unit.status === 'Reactivated'
                                                        ? classes.smalldetailCardAvailable
                                                        : unit.trackId?.name === 'Assigned' ||
                                                          unit.trackId?.name === 'Reactivated' ||
                                                          unit.trackId?.name === 'Associate'
                                                        ? classes.smalldetailCardAvail
                                                        : classes.smalldetailCard
                                                }
                                            >
                                                <table style={{ padding: '25px' }}>
                                                    <tr>
                                                        <td style={{
                                                            color: 'black', fontWeight: 'bold',
                                                            fontSize: '40px', paddingLeft: '100px'
                                                        }}>
                                                            {unit.bloodgroups ? formatBloodGroup(unit?.bloodgroups) : (unit.bloodgroup && unit.bloodgroup?.symbol)}
                                                        </td>
                                                        <td style={{
                                                            width:
                                                                '20px'
                                                        }}>
                                                            <img
                                                                src={CloseCard}
                                                                style={{
                                                                    width:
                                                                        '40px',
                                                                    'margin-left':
                                                                        '95px',
                                                                    cursor:
                                                                        'pointer'
                                                                }}
                                                                onClick={() => handleDeleteCardUnit(index)}
                                                            />
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
                                                    <td>{unit.donationCode}</td>
                                                    <tr>
                                                        <td style={{ color: 'black', fontWeight: 'bold' }}>
                                                            Product Group :
                                                        </td>
                                                        <td>
                                                            {unit.productgroups === undefined
                                                                ? unit?.productgroup?.name
                                                                : unit.productgroups}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ color: 'black', fontWeight: 'bold' }}>
                                                            Expiry Date :
                                                        </td>
                                                        <td>
                                                            {unit.expiryDateAndTime
                                                                ? moment(unit.expiryDateAndTime).format(
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
                                                                {unit.trackId?.name === 'Assigned' ||
                                                                    unit.status === 'Assigned' ||
                                                                    unit.trackId?.name === 'Reactivated' ||
                                                                    unit.status === 'Reactivated' ||
                                                                    unit.trackId?.name === 'Associate' ||
                                                                     unit.status === 'Associate'
                                                                    ? 'Available'
                                                                    : (unit.status || (unit.trackId && unit.trackId?.name))}
                                                            </Typography>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </Card>
                                        ))}
                                </Grid>

                                <Grid item xs={6} md={6} style={{ paddingLeft: '20px' }}>
                                    <Typography
                                        variant="h6"
                                        color="primary"
                                        style={{ fontSize: '17px', marginBottom: 15 }}
                                    >
                                        Batch Products
                                    </Typography>

                                    {tableform &&
                                        tableform?.map((batch, index) => (
                                            <Card
                                                key={batch.rfidNumber}
                                                style={{ padding: '5px', width: '380px' }}
                                                className={
                                                    batch?.status === 'Expired' ||
                                                    batch?.status === 'Unassociated' ||
                                                    batch.status === 'Dereservation' ||
                                                    batch.status === 'Wasted' ||
                                                    batch.status === 'Quarantine' ||
                                                    batch.status === 'Fated' ||
                                                    batch.status === 'Quarantine unit'
                                                        ? classes.smalldetailCardError
                                                        : batch.deviceStatus === 'Move Out'
                                                        ? classes.smalldetailCardMoveout
                                                        : batch.status === 'Assigned' ||
                                                          batch.status === 'Move In' ||
                                                          batch.status === 'Associate' ||
                                                          batch.status === 'Unassigned' ||
                                                          batch.status === 'Reactivated'
                                                        ? classes.smalldetailCardAvailable
                                                        : batch.trackId?.name === 'Assigned' ||
                                                          batch.trackId?.name === 'Unassigned' ||
                                                          batch.trackId?.name === 'Reactivated' ||
                                                          batch.trackId?.name === 'Associate'
                                                        ? classes.smalldetailCardAvail
                                                        : classes.smalldetailCard
                                                }
                                            >
                                                <table style={{ padding: '25px' }}>
                                                    <tr>
                                                        <td style={{
                                                            color: 'black', fontWeight: 'bold',
                                                            fontSize: '15px'
                                                        }}>
                                                            {batch?.batchProduct == undefined
                                                                ? batch?.batchProductId?.name
                                                                : batch?.batchProduct}
                                                        </td>
                                                        <td style={{ width: '20px' }}>
                                                            <img
                                                                src={CloseCard}
                                                                style={{
                                                                    width: '40px',
                                                                    'margin-left': '95px',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={() => handleDeleteCardBatch(index)}
                                                            />
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
                                                        <td>{batch?.batchNumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ color: 'black', fontWeight: 'bold' }}>
                                                            Expiry Date :
                                                        </td>
                                                        <td>
                                                            {batch?.expiryDate
                                                                ? moment(batch?.expiryDate).format('DD-MM-YYYY HH:mm')
                                                                : '-'}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ color: 'black', fontWeight: 'bold' }}>
                                                            GTIN number :
                                                        </td>
                                                        <td>{batch?.gtinNumber}</td>
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
                                                            {batch.trackId?.name === 'Assigned' ||
                                                                    batch.status === 'Assigned' ||
                                                            batch.trackId?.name === 'Unassigned' ||
                                                                    batch.status === 'Unassigned' ||
                                                            batch.trackId?.name === 'Reactivated' ||
                                                                    batch.status === 'Reactivated' ||
                                                            batch.trackId?.name === 'Associate' ||
                                                                    batch.status === 'Associate'
                                                                ? 'Available'
                                                                : (batch.status || (batch.trackId && batch.trackId?.name))}
                                                        </Typography>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </Card>
                                        ))}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={12} container spacing={2} direction="row">
                                    <Grid item style={{ marginTop: 25 }}>
                                        <CustomButton onClick={handleClose} color="secondary" variant="contained">
                                            {postLoading ? <CircularProgress color="white" size="2 0px" /> : 'Cancel'}
                                        </CustomButton>
                                    </Grid>
                                    <Grid item xs={10} style={{ marginTop: 25 ,paddingLeft:'72%'}}>
                                        <CustomButton
                                            //onClick={() => handleAssignClick(form.rfidNumber)}

                                            onClick={handleMultipleAssign}
                                            color="primary"
                                            variant="contained"
                                        >
                                            Assign
                                        </CustomButton>
                                    </Grid>
                        </Grid>
                    </Dialog>

                    {/*For Batch*/}

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
                        <Paper
                            elevation={0}
                            style={{ padding: 10, width: '100%', height: '25%', borderRadius: '10px' }}
                        >
                            <Grid container style={{ padding: 10, height: '25%' }}>
                                <Grid item style={{ marginTop: 0 }}>
                                    <Grid container style={{ marginBottom: 20 }}>
                                        <Grid container style={{ marginBottom: 20 }}>
                                            <Grid item xs={12}>
                                                <Typography variant="h6" color="primary">
                                                    Enter the Recipient Information
                                                </Typography>
                                                <Grid item xs={8} style={{ display: 'flex' }}>
                                                    <Grid item style={{ paddingTop: '20px' }}>
                                                        <Typography className={classes.inputLabel} variant="subtitle1">
                                                            Username
                                                        </Typography>
                                                        <Grid item>
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
                                                                <Typography
                                                                    style={{ fontSize: '0.75rem', display: 'flex' }}
                                                                    color="error"
                                                                    variant="subtitle1"
                                                                >
                                                                    User is required
                                                                </Typography>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        style={{ paddingLeft: '63%', paddingTop: '30px' }}
                                                    >
                                                        <InputLabel className={classes.inputLabel}>
                                                            Temporary Recipient Number
                                                        </InputLabel>
                                                        <CustomInput
                                                            name="referenceNo"
                                                            value={referenceNo}
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
                                        </Grid>
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.inputLabel}>
                                                Recipient Given Name(s)
                                            </InputLabel>
                                            <CustomInput
                                                name="firstName"
                                                value={firstName}
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
                                                disabled={
                                                    resData !== undefined && resData?.data?.length !== 0 ? true : false
                                                }
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
                                                disabled={
                                                    resData !== undefined && resData?.data?.length !== 0 ? true : false
                                                }
                                            />
                                            {dobError && <span style={{ color: 'red' }}>Invalid date</span>}
                                        </Grid>
                                        <Grid item xs={4}>
                                            <InputLabel className={classes.inputLabel}>Gender</InputLabel>
                                            <FormControl
                                                component="fieldset"
                                                disabled={
                                                    resData !== undefined && resData?.data?.length !== 0 ? true : false
                                                }
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
                                                        console.log('On Radio Change ' + e.target.value);
                                                        setSelectBoolean(e.target.value);
                                                    }}
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
                                </Grid>
                            </Grid>
                        </Paper>

                        <Grid item xs={8} style={{ padding: '10px' }}>
                            {tableform &&
                                tableform?.map((batch) => (
                                    <Card key={batch.batchNumber}>
                                        <table className="table">
                                            <tr>
                                                <td style={{ color: 'black', fontWeight: 'bold' }}>
                                                    Product description :
                                                </td>
                                                <td>
                                                    {batch?.batchProduct == undefined
                                                        ? batch?.batchProductId?.name
                                                        : batch?.batchProduct}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: 'black', fontWeight: 'bold' }}>Batch number :</td>
                                                <td>{batch?.batchNumber}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: 'black', fontWeight: 'bold' }}>Expiry Date :</td>
                                                <td>
                                                    {batch?.expiryDate
                                                        ? moment(batch?.expiryDate).format('DD-MM-YYYY HH:mm')
                                                        : '-'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ color: 'black', fontWeight: 'bold' }}>GTIN number :</td>
                                                <td>{batch?.gtinNumber}</td>
                                            </tr>
                                            {/*<tr>*/}
                                            {/*    <td style={{ color: 'black', fontWeight: 'bold' }}>Status :</td>*/}
                                            {/*    <td >{tableform.deviceStatus === 'Move Out' ? 'Removed' : tableform.deviceStatus}</td>*/}
                                            {/*</tr>*/}

                                            {/*<Grid item alignItems="center">*/}
                                            {/*    <Typography*/}
                                            {/*        color="primary"*/}
                                            {/*        className={classes.smalldetailTitle}*/}
                                            {/*        alignItems="center"*/}
                                            {/*    >*/}
                                            {/*        {tableform.deviceStatus === 'Move Out' ? 'Removed' : tableform.deviceStatus}*/}
                                            {/*    </Typography>*/}
                                            {/*</Grid>*/}
                                        </table>
                                    </Card>
                                ))}
                        </Grid>
                        <Grid item xs={12} container spacing={2} direction="row">
                            <Grid item xs={10} style={{ marginTop: 25, paddingLeft: '12px' }}>
                                <CustomButton
                                    onClick={() => {
                                        if (!user) {
                                            setBatchUserError(true);
                                        } else {
                                            setBatchUserError(false);
                                            handleMultipleAssign(
                                                tableform.batchId == undefined ? tableform?._id : tableform.batchId,
                                                tableform.rfidNumber
                                            );
                                            // Clear the error if the user is selected
                                        }
                                    }}
                                    color="primary"
                                    variant="contained"
                                >
                                    Assign
                                </CustomButton>
                            </Grid>
                            <Grid item style={{ marginTop: 25 }}>
                                <CustomButton onClick={handleformClose} color="secondary" variant="contained">
                                    {postLoading ? <CircularProgress color="white" size="20px" /> : 'Cancel'}
                                </CustomButton>
                            </Grid>
                        </Grid>
                    </Dialog>

                    {/* Swapout process*/}

                    <Dialog
                        maxWidth="lg"
                        PaperProps={{
                            style: {
                                borderRadius: '10px',
                                backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                                padding: 20,
                                width: '900px'
                            }
                        }}
                        open={openSwapout}
                        onClose={handleSwapoutClose}
                        disableBackdropClick="true"
                    >
                        <Paper
                            elevation={0}
                            style={{ padding: 20, width: '100%', height: 'fit-content', borderRadius: '10px' }}
                        >
                            <Grid
                                container
                                spacing={12}
                                //direction="column"
                                // alignItems="center"
                                className={classes.returnMainGrid}
                            >
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h6" align="center" className={classes.returnText}>
                                            Time left to complete swapout process
                                        </Typography>
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Grid item xs={3}>
                                            <Grid item>
                                                <Typography className={classes.inputLabel} variant="subtitle1">
                                                    Username
                                                </Typography>
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
                                                    <Typography
                                                        style={{ fontSize: '0.75rem', display: 'flex' }}
                                                        color="error"
                                                        variant="subtitle1"
                                                    >
                                                        User is required
                                                    </Typography>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 5
                                        }}
                                    >
                                      <TimerIcon style={{ fontSize: '55px' }} />
                                                <Typography variant="body1">TIME LEFT:
                                                    <span style={{ fontSize: '14px' }}>(In secs)</span>
                                                </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography color={counter < 11 ? 'error' : 'initial'} className={classes.counter}>
                                        {counter === 0 ? 60 : counter}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel className={classes.inputLabel}>Comments</InputLabel>
                                    <CustomInput
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                        fullWidth
                                        style={{ width: 600 }}
                                        className={classes.textField}
                                        size="lg"
                                        autoFocus={true}
                                        // width="250px"
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={12} container spacing={1} direction="row">
                                    <Grid item xs={4} style={{ marginTop: 25 }}>
                                        <CustomButton onClick={cancelSwapout} color="secondary" variant="contained">
                                            {postLoading ? <CircularProgress color="white" size="20px" /> : 'Cancel'}
                                        </CustomButton>
                                    </Grid>
                                    {isStartClicked ? (
                                                <Grid item xs={4} style={{ marginTop: 25, paddingLeft: '7%' }}>
                                            <CustomButton
                                                onClick={handleExtendsecs}
                                                color="primary"
                                                variant="contained"
                                                disabled={start === 'start' ? false : true}
                                            >
                                                Extend (60 secs)
                                            </CustomButton>
                                        </Grid>
                                    ) : null}
                                   
                                        {isStartClicked ? (
                                                <Grid item xs={4} style={{ marginTop: 25, paddingLeft: '18%', display: 'block' }}>
                                            <CustomButton
                                                color="primary"
                                                variant="contained"
                                                disabled={!user}
                                                onClick={(e) => {
                                                    if (!user) {
                                                        setBatchUserError(true);
                                                    } else {
                                                        setBatchUserError(false);
                                                        handleSwapoutComplete('swapcomplete');
                                                    }
                                                }}
                                            >
                                                Complete
                                                    </CustomButton>
                                                    </Grid>
                                            ) : (
                                            <Grid item xs={4} style={{ marginTop: 25, paddingLeft: '55%', display: 'block' }}>
                                            <CustomButton
                                                onClick={(e) => {
                                                    handleStartSwapout('start');
                                                    setIsStartClicked(true);
                                                }}
                                                color="primary"
                                                variant="contained"
                                                 disabled={!user || isStartClicked}
                                            >
                                                Start
                                                </CustomButton>
                                            </Grid>
                                        )}
                                          
                                </Grid>
                            </Grid>
                        </Paper>
                    </Dialog>

                    <Dialog
                        open={dialogOpen}
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
                        }}
                    >
                        <Grid container justify="center">
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <img src={warningIcon} alt="warning" style={{ marginTop: -50 }} />
                                <Typography variant="h5" className={classes.typographyGray}>
                                    Warning
                                </Typography>
                            </div>
                        </Grid>

                        <DialogContent>
                            <Grid style={{ marginTop: 10 }}>
                                <>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {/*{understood?.messageBody && understood?.messageBody?.map((card, index) => (*/}
                                        {/*    <>*/}

                                        <Grid className={classes.content}>
                                            <Grid>
                                                <TableContainer className={classes.tableContainer}>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableCell>
                                                                {understoodCard?.unitId ? 'Unit ID' : 'Gtin Number '}
                                                            </TableCell>
                                                            <TableCell>Product Group</TableCell>

                                                            <TableCell>Reason</TableCell>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>
                                                                    {understoodCard?.unitId
                                                                        ? understoodCard?.unitId
                                                                        : understoodCard?.gtinNumber}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {' '}
                                                                    {understoodCard?.productGroup
                                                                        ? understoodCard?.productGroup
                                                                        : understoodCard?.batchProduct}
                                                                </TableCell>
                                                                <TableCell> {understoodCard?.reason}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                        </Grid>

                                        {/*     </>*/}
                                        {/*) )}*/}
                                    </div>
                                </>

                                <Grid item xs={12} style={{ display: 'flex', marginTop: '13px' }}>
                                    <Grid item xs={3}>
                                        <Typography className={classes.inputLabel} variant="subtitle1">
                                            Username
                                        </Typography>
                                        <SelectOption
                                            label="Select User"
                                            onChange={handleUserChange}
                                            value={user}
                                            minWidth={250}
                                            noLabel={true}
                                            options={options4?.data || []}
                                            placeHolder="Select User"
                                            //onOpen={handleEmptyDevices}
                                            //loading={options8loading}
                                        />
                                        {batchUserError && (
                                            <Typography
                                                style={{ fontSize: '0.75rem', display: 'flex' }}
                                                color="error"
                                                variant="subtitle1"
                                            >
                                                User is required
                                            </Typography>
                                        )}
                                    </Grid>
                                    {/*<Grid item xs={12} className={classes.inputField} style={{paddingLeft:'180px',marginTop:'13px'} }>*/}
                                    {/*    <InputLabel className={classes.inputLabel}>Acknowledgement Status</InputLabel>*/}
                                    {/*    <Switch*/}
                                    {/*        color="primary"*/}
                                    {/*        name="status"*/}
                                    {/*        checked={isDefault ?? false}*/}
                                    {/*        onChange={defaulCheck}*/}
                                    {/*    />*/}
                                    {/*</Grid>*/}
                                </Grid>
                                <Grid item xs={12} style={{ marginTop: '13px' }}>
                                    <InputLabel className={classes.inputLabel}>Comments</InputLabel>
                                    <CustomInput
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                        fullWidth
                                        style={{ width: 600 }}
                                        className={classes.textField}
                                        size="lg"
                                        autoFocus={true}
                                        // width="250px"
                                        multiline
                                    />
                                </Grid>

                                <Grid item style={{ marginTop: '13px' }}>
                                    <Link
                                        //component="button"
                                        color="primary"
                                        variant="caption"
                                        underline="none"
                                        onClick={handleMoreInfo}
                                        //onClose={handleDialog}
                                        style={{
                                            alignSelf: 'flex-start',
                                            marginTop: 5,
                                            textDecoration: 'underline',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        View Notification
                                    </Link>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                            <Grid style={{ margin: 5 }}>
                                <CustomButton variant="outlined" color="primary" onClick={(e) => handleAckSaveClick()}>
                                    Save
                                </CustomButton>
                            </Grid>
                        </Grid>
                    </Dialog>
                </>
            )}
        </>
    );
};

export default dashboardEUO;
