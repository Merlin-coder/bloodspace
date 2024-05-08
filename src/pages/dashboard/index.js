import React, { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard, getTemperature, getTemperatureGraph } from 'redux/actions/dashboard/dashboardActions';
import { useStyles } from './style';
import UnderConstruction from '../../components/UnderConstruction';
import { Card, Grid, Typography, Tabs, Tab, Divider, Button, Hidden, ButtonGroup } from '@material-ui/core';
import OpacityIcon from '@material-ui/icons/Opacity';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import WarningIcon from '@material-ui/icons/Warning';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import { CustomButton, DatePicker } from 'common';
import ManulaDevice from '../../assets/manualDevice.png';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from 'components/checkbox/checkbox.component';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
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
    CircularProgress
} from '@material-ui/core';
//import CheckboxComponent from 'components/checkbox/checkbox.component';
//import CheckboxComponent from '../../../components/checkbox/checkbox.container';
import CountUp from 'react-countup';
import BarChart from './BarChart';
import { CustomInput } from 'components';
//const BarChart = lazy(() => import('./BarChart'));
import { getDropDown } from 'redux/actions/manage/manageFieldsAction';

import DashboardTable from './table';
import BatchTable from './batchtable';
import product from './product.json';
import location from './location.json';
import { CONSTANTS } from 'common';
import DashboardHeader from './dashboardHeader';
import { Suspense } from 'react';
import Loader from 'components/loader/loader.container';
import { Link, useHistory } from 'react-router-dom';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';
import { getApplyFilters } from 'redux/actions/filters/globalFilterAction';
import NoDashboardData from 'components/404Page/noDataDashboard';
import LineChart from './LineChart';
import { SelectOption } from 'components';
import ComboBox from 'components/comboBox';
import moment from 'moment';
import NoData from 'components/no data';
import { getSettings } from 'redux/actions';
import {
    clearData,
    clearDropDown,
    clearPostResponse,
    createAlert,
    getData,
    postFormData,
    socketSessionIdAction
} from 'redux/actions';
import { clearResponseData, getResData } from 'redux/actions/scGenericApiCalls';

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
    {
        id: 'name',
        label: 'Group by name',
        minWidth: 80,
        align: 'left'
    },
    {
        id: 'batchNumber',
        label: 'Batch Number',
        minWidth: 80,
        align: 'left'
    },
    {
        id: 'expiryDate',
        label: 'Expiry Date',
        minWidth: 80,
        align: 'left'
    },
    {
        id: 'count',
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
    { id: 'name', label: 'Group by location', minWidth: 80 },

    {
        id: 'count',
        label: 'Total',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];

const deviceColumn = [
    { id: 'device', label: 'Group by device', minWidth: 80 },
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
    { id: 'name', label: 'Group by Device', minWidth: 80 },

    {
        id: 'count',
        label: 'Total',
        minWidth: 80,
        align: 'center',
        format: (value) => value.toFixed(2)
    }
];

const DashboardPage = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [barLabels, setBarLabels] = React.useState([]);
    const [barValues, setBarValues] = React.useState([]);
    const [batchLabels, setBatchLabels] = React.useState([]);
    const [batchValues, setBatchValues] = React.useState([]);
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    const [screen, setScreen] = useState(0);
    const { data, loading } = useSelector((state) => state.getDashboard);
    console.log('data--', data);
    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));
    const [hospitalId, setHospitalId] = React.useState();
    const [deviceId, setDeviceId] = React.useState(
        devDeviceId !== undefined && devDeviceId !== null ? devDeviceId._id : ''
    );
    const [device, setDevice] = React.useState('All Devices');
    const { userAccessLoading, userAccessData } = useSelector((state) => state.getUserAccess);
    const history = useHistory();
    const [hospitalFilters, setHospitalFilters] = React.useState();
    const [hospital, setHospital] = React.useState('All Hospitals');
    const filterOption = [];
    const [units, setUnits] = React.useState([]);
    const socket = useSelector((state) => state.socketReducer.socket);
    const [deviceLoginn, setDeviceLogin] = React.useState(false);
    const [checklist, setCheckList] = useState([]);

    // const data = {};
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
    console.log('options', options);
    const { resLoading, resData } = useSelector((state) => state.getResponseData);
    const { postLoading, postResponse, postError } = useSelector((state) => state.postFormFields);
    const [storageDevice, setStorageDevice] = useState([]);
    console.log('storage--', storageDevice);
    const [accessableCodes, setAccessableCodes] = useState([]);
    const { temp, load } = useSelector((state) => state.getDashboardTemperature);
    const { GraphStatus } = useSelector((state) => state.getDashboardGraph);
    const [isSingleView, setIsSingleView] = React.useState('Product');
    const [groupBy, setGroupBy] = React.useState('Product');
    const [selectedDevice, setSelectedDevice] = useState('622b295123481e3ee86cb4a0'); //'61309fef67be2141b7b069ae'
    console.log('sel---', selectedDevice);

    const [dateBar, setDateBar] = React.useState([]);
    const [tempBar, setTempBar] = React.useState([]);
    console.log('tempbar', tempBar);
    console.log('dateBar', dateBar);
    const { userInfo } = useSelector((state) => state.userLogin);
    const [value, setValue] = useState('Theater Fridge'); //'Remote Fridge'
    console.log('valueeee', value);
    const [minTemp, setMinTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(32);
    const [recipientDialog, setRecipientDialog] = useState(false);
    const [activeButton, setActiveButton] = useState('2H');
    const [token, setToken] = useState('');
    let remoteInfo = JSON.parse(localStorage.getItem('remoteInfo'));

    const [tempratureType, setTempratureType] = useState('hours');
    const [daysNumber, setDaysNumber] = useState(2);

    const [lineChartGraphData, setLineChartGraphData] = useState({
        options: {
            tooltip: {
                enabled: true
            },
            // colors: ['#00FF00', '#FF0000'],

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
                curve: 'smooth'
            }
        },
        series: [
            {
                name: 'Temperature',
                data: []
            }
        ]
    });

    //new api(gettemperaturegraph) new graph
    //const [lineChartGraphData, setLineChartGraphData] = useState({
    //    options: {
    //        tooltip: {
    //            enabled: true
    //        },
    //        style: {
    //            cursor: 'pointer'
    //        },
    //        dataLabels: {
    //            style: {
    //                fontSize: '14px',
    //                colors: ['#304758']
    //            }
    //        },
    //        chart: {
    //            // id: 'chart2',
    //            type: 'line',
    //            stacked: 'false',
    //            zoom: {
    //                type: 'x',
    //                enabled: true
    //            },
    //            toolbar: {
    //                autoSelected: 'zoom'
    //            },
    //            events: {
    //                dataPointMouseEnter: function (event) {
    //                    if (event?.path) {
    //                        event.path[0].style.cursor = 'pointer';
    //                    }
    //                }
    //            }
    //        },
    //        yaxis: {
    //            title: {
    //                text: 'Temperature'
    //            },
    //            min: -10,
    //            max: 32,
    //            tickAmount: 7
    //        },
    //        xaxis: {
    //            categories: [],
    //            tooltip: {
    //                enabled: true
    //            }
    //            // range: 35
    //        },
    //        fill: {
    //            type: 'gradient',
    //            gradient: {
    //                type: 'vertical',
    //                shadeIntensity: 1,
    //                opacityFrom: 0.7,
    //                opacityTo: 0.9,
    //                colorStops: []
    //            }
    //        },
    //        stroke: {
    //            width: 2,
    //            curve: 'straight'
    //        }
    //    },
    //    series: [
    //        {
    //            name: 'Temperature',
    //            data: []
    //        },
    //        {
    //            name: 'deviceName',
    //            data: []
    //        }
    //    ]
    //});

    React.useEffect(() => {
        dispatch(getDashboard(hospitalId, deviceId));
    }, [hospital]);

    React.useEffect(() => {
        dispatch(getDashboard(hospitalId, deviceId));
    }, [device]);

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
    const [batchNum, setBatchNumber] = useState('');

    React.useEffect(() => {
        if (data?.batchgroupGraph?.length > 0) {
            let gValue = data?.batchgroupGraph
                .map((value) => value.name && value.value)
                .filter((val) => val !== undefined);
            let glabel = data?.batchgroupGraph.flatMap((v) => [v.name]);
            //?.map((value) => value.name && value.name)
            //.filter((val) => val !== undefined);
            let gNum = data?.batchgroupGraph
                ?.map((value) => value.batchNumber && value.batchNumber)
                .filter((val) => val !== undefined);
            setBatchValues(gValue);
            setBatchLabels(glabel);
            setBatchNumber(gNum);
        }
    }, [data]);
    console.log('batchLabels', batchLabels);
    console.log('batchnum', batchNum);

    // useEffect(() => {
    //     dispatch(getTemperatureGraph(selectedDevice, daysNumber, tempratureType));
    //    setActiveButton('24H');
    //    setDaysNumber(2);
    //    setTempratureType("hours");
    //}, [selectedDevice]);

    //useEffect(() => {
    //    dispatch(getTemperatureGraph(selectedDevice, daysNumber, tempratureType));
    //}, [activeButton])

    //useEffect(() => {
    //    dispatch(getTemperatureGraph(checklist === '' ? '' : checklist, daysNumber, tempratureType));
    //}, [activeButton, checklist]);

    useEffect(() => {
        socket?.on('refresh', (data) => {
            //window.location.reload()
            dispatch(getDashboard(hospitalId));
            /*if (data.isEmergency) {
                console.log(" -- units --" + data.skuData)
                setUnits(data.skuData);
                setToken(data.token);
                setRecipientDialog(true);
            }*/
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

    const handleCompleteButtonClick = () => {
        setScreen(1);
        setFirstName('');
        setLastName('');
        setDob(null);
        setGender('');
        setBloodGroup('');
        setMrn('');
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

    const handleAssignClick = () => {
        let Units = [];
        units.map((i) => {
            Units.push({
                firstName: firstName,
                lastName: lastName,
                mrnNumber: mrn,
                dob: dob,
                gender: gender,
                userName: userInfo?.data?.user?.username,
                message: 'Assign Tag',
                totalTags: [i?.rfidNumber],
                recipientId: recepientId,
                dereservationDate: getDreservationDatetime(i?.productgroupId),
                'track-code': 'BS-TR-5103',
                comments: ''
            });
        });

        console.log('---------------Units ------------' + Units);

        genericEmit({
            method: 'E128',
            deviceToken: token,
            payload: {
                status: true,
                data: Units,
                message: 'Units Assigned Successfully'
            }
        });

        setRecipientDialog(false);
    };

    function getDreservationDatetime(productgroupId, dt = new Date()) {
        console.log('set---', settingsData);
        let datas = settingsData?.dereservation?.filter((obj) => obj.productgroupId === productgroupId);

        if (datas.length > 0) {
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
    }, [postError, postResponse]);

    useEffect(() => {
        let tempAccessCodes = [];
        let manageAccessCodes = userInfo?.data?.userAccess
            ?.filter((item) => item['name'] === 'Remote Fridge')
            ?.map((subMenu) => subMenu?.menuId)
            ?.flat();

        manageAccessCodes?.forEach((itemA) => {
            if (itemA.fullAccess !== 0) {
                tempAccessCodes.push(itemA?.label);
            }
            let keysOfObject = Object.keys(itemA);
            keysOfObject?.forEach((item) => {
                if (Array.isArray(itemA[item])) {
                    itemA[item][0] === '1' && tempAccessCodes?.push(itemA[item][1]);
                }
            });
        }, []);
        setAccessableCodes(tempAccessCodes);
    }, []); /*
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

            */

    //new Api new graph
    //useEffect(() => {
    //    console.log('GraphStatus' + JSON.stringify(GraphStatus));

    //    if (Array.isArray(GraphStatus) && GraphStatus.length) {
    //        let series = [];

    //        if (
    //            GraphStatus.map((devicetemp) => {
    //                if (
    //                    devicetemp?.data.map((temp) => {
    //                        let dateArray = [];

    //                        temp?.Date?.map((obj) => {
    //                            // dateArray.push(moment(obj).format('MMMM Do YYYY, h:mm:ss a'));
    //                            dateArray.push(new Date(obj).getTime());
    //                        });
    //                        let data = [];
    //                        dateArray.map((ele, index) => {
    //                            console.log('ele---', ele);
    //                            data?.push({ x: ele, y: temp?.Temperature[index] });
    //                        });

    //                        series.push({
    //                            name: devicetemp?.deviceName,
    //                            data: data
    //                        });
    //                        console.log('series', series);
    //                        setDateBar(dateArray);
    //                        setTempBar(temp?.Temperature);
    //                        // setMinTemp(temp[0]?.['Min Temperature']);
    //                        // setMaxTemp(temp[0]?.['Max Temperature']);
    //                        const maxTemp1 = temp?.['Max Temperature'];
    //                        let tempBarData = temp?.Temperature;
    //                        const maxTempInsideDate = tempBarData.filter((x) => x >= maxTemp1);

    //                        let colorStops;
    //                        let tempLineChart;

    //                        if (maxTempInsideDate.length > 0) {
    //                            colorStops = [
    //                                {
    //                                    offset: 0,
    //                                    color: 'red',
    //                                    opacity: 1
    //                                },
    //                                {
    //                                    offset: 55,
    //                                    color: 'green',
    //                                    opacity: 1
    //                                }
    //                            ];
    //                            tempLineChart = {
    //                                options: {
    //                                    style: {
    //                                        cursor: 'pointer'
    //                                    },
    //                                    dataLabels: {
    //                                        // offsetY: -20,
    //                                        style: {
    //                                            fontSize: '14px',
    //                                            colors: ['#304758']
    //                                        }
    //                                    },
    //                                    chart: {
    //                                        // id: 'chart2',
    //                                        type: 'line',
    //                                        stacked: 'false',
    //                                        animation: {
    //                                            enabled: 'false'
    //                                        },
    //                                        zoom: {
    //                                            type: 'x',
    //                                            enabled: true
    //                                            // autoScaleYaxis: true
    //                                        },
    //                                        toolbar: {
    //                                            autoSelected: 'zoom'
    //                                        },
    //                                        events: {
    //                                            dataPointMouseEnter: function (event) {
    //                                                if (event?.path) {
    //                                                    event.path[0].style.cursor = 'pointer';
    //                                                }
    //                                            }
    //                                        }
    //                                    },
    //                                    yaxis: {
    //                                        title: {
    //                                            text: 'Temperature'
    //                                        },
    //                                        min: -10,
    //                                        max: 32,
    //                                        tickAmount: 7
    //                                    },
    //                                    xaxis: {
    //                                        tooltip: {
    //                                            type: 'datetime',
    //                                            enabled: true
    //                                        },
    //                                        // range: 35,
    //                                        tickAmount: 6,
    //                                        labels: {
    //                                            show: true,
    //                                            formatter: function (value) {
    //                                                return moment(value).format('MMMM Do YYYY, h:mm a').split(',');
    //                                            }
    //                                        }
    //                                    },
    //                                    fill: {
    //                                        type: 'gradient',
    //                                        gradient: {
    //                                            type: 'vertical',
    //                                            shadeIntensity: 1,
    //                                            opacityFrom: 0.7,
    //                                            opacityTo: 0.9,
    //                                            colorStops: colorStops
    //                                        }
    //                                    },
    //                                    stroke: {
    //                                        width: 3,
    //                                        curve: 'straight'
    //                                    },
    //                                    annotations: {
    //                                        yaxis: [
    //                                            {
    //                                                y: temp[0]?.['Min Temperature'],
    //                                                borderColor: '#FF0000',
    //                                                label: {
    //                                                    show: true,
    //                                                    text: `Min Temp ${temp[0]?.['Min Temperature']}`,
    //                                                    style: {
    //                                                        color: '#fff',
    //                                                        background: '#FF0000'
    //                                                    }
    //                                                }
    //                                            },
    //                                            {
    //                                                y: temp[0]?.['Max Temperature'],
    //                                                borderColor: '#FF0000',
    //                                                label: {
    //                                                    show: true,
    //                                                    text: `Max Temp ${temp[0]?.['Max Temperature']}`,
    //                                                    style: {
    //                                                        color: '#fff',
    //                                                        background: '#FF0000'
    //                                                    }
    //                                                }
    //                                            }
    //                                        ]
    //                                    }
    //                                },
    //                                series: [
    //                                    {
    //                                        name: 'Temperature',
    //                                        data: data
    //                                    }
    //                                ]
    //                            };
    //                        } else {
    //                            colorStops = [
    //                                {
    //                                    offset: 55,
    //                                    color: 'green',
    //                                    opacity: 1
    //                                }
    //                            ];
    //                            tempLineChart = {
    //                                options: {
    //                                    tooltip: {
    //                                        enabled: true
    //                                    },

    //                                    style: {
    //                                        cursor: 'pointer'
    //                                    },
    //                                    dataLabels: {
    //                                        // offsetY: -20,
    //                                        style: {
    //                                            fontSize: '14px',
    //                                            colors: ['#304758']
    //                                        }
    //                                    },
    //                                    chart: {
    //                                        // id: 'chart2',
    //                                        type: 'line',
    //                                        stacked: 'false',
    //                                        zoom: {
    //                                            type: 'x',
    //                                            enabled: true
    //                                            // autoScaleYaxis: true
    //                                        },
    //                                        toolbar: {
    //                                            autoSelected: 'zoom'
    //                                        },
    //                                        events: {
    //                                            dataPointMouseEnter: function (event) {
    //                                                if (event?.path) {
    //                                                    event.path[0].style.cursor = 'pointer';
    //                                                }
    //                                            }
    //                                        }
    //                                    },
    //                                    yaxis: {
    //                                        title: {
    //                                            text: 'Temperature'
    //                                        },
    //                                        min: -10,
    //                                        max: 32,
    //                                        tickAmount: 7
    //                                    },
    //                                    xaxis: {
    //                                        tooltip: {
    //                                            type: 'datetime',
    //                                            enabled: true
    //                                        },
    //                                        // range: 35,
    //                                        tickAmount: 6,
    //                                        labels: {
    //                                            show: true,
    //                                            formatter: function (value) {
    //                                                return moment(value).format('MMMM Do YYYY, h:mm:ss a').split(',');
    //                                            }
    //                                        }
    //                                    },
    //                                    fill: {
    //                                        type: 'gradient',
    //                                        gradient: {
    //                                            type: 'vertical',
    //                                            shadeIntensity: 1,
    //                                            opacityFrom: 0.7,
    //                                            opacityTo: 0.9
    //                                            //colorStops: colorStops
    //                                        }
    //                                    },
    //                                    stroke: {
    //                                        width: 3,
    //                                        curve: 'straight'
    //                                    }
    //                                },
    //                                series: series
    //                            };
    //                        }
    //                        setLineChartGraphData(tempLineChart);
    //                    })
    //                );
    //            })
    //        );
    //    } else {
    //        setDateBar([]);
    //        setTempBar([]);
    //    }
    //}, [GraphStatus]);



    useEffect(() => {
        if (Array.isArray(temp) && temp.length) {
            let dateArray = [];
            temp[0]?.Date?.map((obj) => {
                // dateArray.push(moment(obj).format('MMMM Do YYYY, h:mm:ss a'));
                dateArray.push(new Date(obj).getTime());
            });
            let data = [];
            dateArray.map((ele, index) => {
                data?.push({ x: ele, y: temp[0]?.Temperature[index] });
            });
            setDateBar(dateArray);
            setTempBar(temp[0]?.Temperature);
            // setMinTemp(temp[0]?.['Min Temparature']);
            // setMaxTemp(temp[0]?.['Max Temparature']);
            const maxTemp1 = temp[0]?.['Max Temperature'];
            let tempBarData = temp[0]?.Temperature;
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
                            tickAmount: 5,
                            labels: {
                                show: true,
                                rotate: 0,
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
                    },
                    {
                        offset: 55,
                        color: 'blue',
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
                            tickAmount: 5,
                            labels: {
                                show: true,
                                rotate: 0,
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
                        }
                    },
                    series: [
                        {
                            name: 'Temperature',
                            data: data
                        }
                    ]
                };
            }
            setLineChartGraphData(tempLineChart);
        } else {
            setDateBar([]);
            setTempBar([]);
        }
    }, [temp]);

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
                const filterData = data?.data?.filter((ele) => ele?.deviceTypeId[0]?.name === 'Blood Fridge');
                setStorageDevice(filterData);
                console.log('Devices' + filterData);
                //if (filterData.length > 0) {
                //    setSelectedDevice(filterData[0]._id);
                //}
            });
    };

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

        filtersData1 = [{ key: key1, value: value1 }, { key: key2, value: value2 }, hospitalFilters];
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

    const handleTransfusedUnits = () => {
        history.push('/dashboard/reports/transfused-units');
    };
    const handleTransfusedBatch = () => {
        history.push('/dashboard/reports/transfused-batch');
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
                        console.log("newFiltersObject:", newFiltersObject);
                        console.log("chipNameAndId:", chipNameAndId);
                        console.log("chipData:", chipData);
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
                        console.log('Graph click');
                        filtersData1 = [
                            {
                                key: 'batchNumber',
                                value: [data?.batchgroupGraph[config.dataPointIndex].batchNumber]
                            },
                            hospitalFilters
                        ];
                        let filtersData = filtersData1.filter((val) => val);

                        chipData = [data?.batchgroupGraph[config.dataPointIndex].name];

                        let chipNameAndId = {};
                        chipNameAndId[data?.batchgroupGraph[config?.dataPointIndex].name] =
                            data?.batchgroupGraph[config?.dataPointIndex].batchNumber;

                        let filterKeysObjects = {};

                        let newFiltersObject = {
                            chipNameAndId,
                            chipData,
                            filtersData,
                            filterKeysObjects,
                            staticFilters: true
                        };
                        console.log("newFiltersObject:", newFiltersObject);
                        console.log("chipNameAndId:", chipNameAndId);
                        console.log("chipData:", chipData);
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
        console.log('tempLineChartData', tempLineChartData);
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

    //const onSorageDeviceChange = (e) => {
    //    const name = storageDevice.map((ele) => ele.name);
    //    console.log('Devices' + name);
    //    setValue(e.target.value);
    //    setSelectedDevice(e.target.value);

    //    //call api for get Temperature
    //};

    //const onSorageDeviceChange = (e) => {
    //    const name = storageDevice.map((ele) => ele.name);
    //    setValue(e.target.value);
    //    if (name.includes(e.target.value)) {
    //        storageDevice.filter((ele) => {
    //            if (ele.name === e.target.value) {
    //                localStorage.setItem('storageDevice', JSON.stringify({ key: e.target.value, id: ele._id }));
    //                setSelectedDevice(ele._id);
    //            }
    //        });
    //    }
    //};

    const onSorageDeviceChange = (e) => {
        const selectedName = e.target.value;
        setValue(selectedName);

        // Find the device object corresponding to the selected name
        const selectedDevice = storageDevice.find(device => device.name === selectedName);

        // If the device is found, set the selected device ID
        if (selectedDevice) {
            localStorage.setItem('storageDevice', JSON.stringify({ key: selectedName, id: selectedDevice._id }));
            setSelectedDevice(selectedDevice._id);
        }
    };

    // Send default device ID if available
    useEffect(() => {
        // Find the default device object corresponding to the default name
        const defaultDevice = storageDevice.find(device => device.name === value);

      
        if (defaultDevice) {
            
            dispatch(getTemperature(defaultDevice._id, daysNumber, tempratureType));
            console.log('Default device ID:', defaultDevice._id);
        }
        else {
            dispatch(getTemperature(selectedDevice, daysNumber, tempratureType));
        }
    }, [storageDevice, value, activeButton, selectedDevice]);


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

    const handleSelectCheck = (e, name) => {
        console.log(e.target.checked);
        console.log('n----', name);
        setCheckList(name);
        //let array = [...checklist]
        //if (array.includes(name)) {
        //    let index = array.indexOf(name);
        //    array.splice(index, 1);
        //    setCheckList(array)
        //}
        //else {
        //    array.push(name)

        //    setCheckList(array)
        //}
        // array.push(name)
        //setCheckList(array)
    };
    console.log('checklist', checklist);
    return (
        <>
            <Hidden xsUp={loading}>
                <Grid className={classes.firstDiv}>
                    <DashboardHeader
                        userAccessData={userAccessData}
                        data={data}
                        loading={loading}
                        setHospitalId={setHospitalId}
                        setHospitalFilters={setHospitalFilters}
                        hospital={hospital}
                        setHospital={setHospital}
                        setDeviceId={setDeviceId}
                        device={device}
                        setDevice={setDevice}
                    />
                </Grid>
            </Hidden>
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
                                <Grid item xs={12} style={{ marginBottom: '5px' }}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={3}>
                                                        <Card className={classes.detailCard}>
                                                            <Grid container direction="column" spacing={4}>
                                                                <Grid item className={classes.cardMainTextBox}>
                                                                    <Typography className={classes.cardMainText}>
                                                                        Units EDQ
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid
                                                                        container
                                                                        alignItems="center"
                                                                        justify="space-between"
                                                                    >
                                                                        <Grid item>
                                                                            <Grid container direction="column">
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        style={{ marginTop: '-15px' }}
                                                                                        spacing={2}
                                                                                        alignItems="center"
                                                                                    >
                                                                                        <Grid
                                                                                            item
                                                                                            className={
                                                                                                classes.iconContainer
                                                                                            }
                                                                                        >
                                                                                            <OpacityIcon
                                                                                                className={
                                                                                                    classes.cardIcon
                                                                                                }
                                                                                                color="error"
                                                                                            />
                                                                                        </Grid>

                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.iconValue
                                                                                                }
                                                                                                color="error"
                                                                                            >
                                                                                                <CountUp
                                                                                                    start={0}
                                                                                                    end={
                                                                                                        data?.totalEDQsUnits ||
                                                                                                        0
                                                                                                    }
                                                                                                    duration={3}
                                                                                                />
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item sm={12} md={12} lg={12}>
                                                                            <Grid
                                                                                container
                                                                                spacing={2}
                                                                                direction="column"
                                                                            >
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        justify={'space-between'}
                                                                                    >
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.cardSubText
                                                                                                }
                                                                                            >
                                                                                                Expired units
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.numberSpan
                                                                                                }
                                                                                                style={{
                                                                                                    cursor:
                                                                                                        data
                                                                                                            ?.totalexpiredUnit
                                                                                                            ?.count !==
                                                                                                            0 &&
                                                                                                        'pointer'
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    data
                                                                                                        ?.totalexpiredUnit
                                                                                                        ?.count !== 0 &&
                                                                                                    handleDashboardFiltter(
                                                                                                        '_id',
                                                                                                        data
                                                                                                            ?.totalexpiredUnit
                                                                                                            ?.id,
                                                                                                        'Expired Units',
                                                                                                        'Expired Units'
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {data?.totalexpiredUnit
                                                                                                    ?.count !== 0
                                                                                                    ? data
                                                                                                          ?.totalexpiredUnit
                                                                                                          ?.count
                                                                                                    : '-'}
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>

                                                                                <Divider />
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        justify={'space-between'}
                                                                                    >
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.cardSubText
                                                                                                }
                                                                                            >
                                                                                                Dereservation units
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.numberSpan
                                                                                                }
                                                                                                style={{
                                                                                                    cursor:
                                                                                                        data
                                                                                                            ?.totaldereservedUnit
                                                                                                            ?.count !==
                                                                                                            0 &&
                                                                                                        'pointer'
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    data
                                                                                                        ?.totaldereservedUnit
                                                                                                        ?.count !== 0 &&
                                                                                                    handleDashboardFiltter(
                                                                                                        '_id',
                                                                                                        data
                                                                                                            ?.totaldereservedUnit
                                                                                                            .id,
                                                                                                        'Dereservation Units',
                                                                                                        'Dereservation Units'
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {data
                                                                                                    ?.totaldereservedUnit
                                                                                                    ?.count !== 0
                                                                                                    ? data
                                                                                                          ?.totaldereservedUnit
                                                                                                          ?.count
                                                                                                    : '-'}
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Divider />
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        justify={'space-between'}
                                                                                    >
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.cardSubText
                                                                                                }
                                                                                            >
                                                                                                Quarantine units
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.numberSpan
                                                                                                }
                                                                                                style={{
                                                                                                    cursor:
                                                                                                        data
                                                                                                            ?.totalquarantinedUnit
                                                                                                            ?.count !==
                                                                                                            0 &&
                                                                                                        'pointer'
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    data
                                                                                                        ?.totalquarantinedUnit
                                                                                                        ?.count !== 0 &&
                                                                                                    handleDashboardFiltter(
                                                                                                        '_id',
                                                                                                        data
                                                                                                            ?.totalquarantinedUnit
                                                                                                            .id,
                                                                                                        'Quarantine units',
                                                                                                        'Quarantine Units'
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {data
                                                                                                    ?.totalquarantinedUnit
                                                                                                    ?.count !== 0
                                                                                                    ? data
                                                                                                          ?.totalquarantinedUnit
                                                                                                          ?.count
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
                                                        <Card className={classes.detailCard}>
                                                            <Grid container direction="column" spacing={4}>
                                                                <Grid item className={classes.cardMainTextBox}>
                                                                    <Typography className={classes.cardMainText}>
                                                                        Batch products EDQ
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid
                                                                        container
                                                                        alignItems="center"
                                                                        justify="space-between"
                                                                    >
                                                                        <Grid item>
                                                                            <Grid container direction="column">
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        style={{ marginTop: '-15px' }}
                                                                                        spacing={2}
                                                                                        alignItems="center"
                                                                                    >
                                                                                        <Grid
                                                                                            item
                                                                                            className={
                                                                                                classes.iconContainer
                                                                                            }
                                                                                        >
                                                                                            <OpacityIcon
                                                                                                className={
                                                                                                    classes.cardIcon
                                                                                                }
                                                                                                color="error"
                                                                                            />
                                                                                        </Grid>

                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.iconValue
                                                                                                }
                                                                                                color="error"
                                                                                            >
                                                                                                <CountUp
                                                                                                    start={0}
                                                                                                    end={
                                                                                                        data?.totalEDQsBatches ||
                                                                                                        0
                                                                                                    }
                                                                                                    duration={3}
                                                                                                />
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item sm={12} md={12} lg={12}>
                                                                            <Grid
                                                                                container
                                                                                spacing={2}
                                                                                direction="column"
                                                                            >
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        justify={'space-between'}
                                                                                    >
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.cardSubText
                                                                                                }
                                                                                            >
                                                                                                Expired units
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.numberSpan
                                                                                                }
                                                                                                style={{
                                                                                                    cursor:
                                                                                                        data
                                                                                                            ?.totalexpiredBatches
                                                                                                            ?.count !==
                                                                                                            0 &&
                                                                                                        'pointer'
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    data
                                                                                                        ?.totalexpiredBatches
                                                                                                        ?.count !== 0 &&
                                                                                                    handleDashboardbatches(
                                                                                                        '_id',
                                                                                                        data
                                                                                                            ?.totalexpiredBatches
                                                                                                            ?.id,
                                                                                                        'Expired Units',
                                                                                                        'Expired Units'
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {data
                                                                                                    ?.totalexpiredBatches
                                                                                                    ?.count !== 0
                                                                                                    ? data
                                                                                                          ?.totalexpiredBatches
                                                                                                          ?.count
                                                                                                    : '-'}
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>

                                                                                <Divider />
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        justify={'space-between'}
                                                                                    >
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.cardSubText
                                                                                                }
                                                                                            >
                                                                                                Dereservation units
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.numberSpan
                                                                                                }
                                                                                                style={{
                                                                                                    cursor:
                                                                                                        data
                                                                                                            ?.totaldereservedBatches
                                                                                                            ?.count !==
                                                                                                            0 &&
                                                                                                        'pointer'
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    data
                                                                                                        ?.totaldereservedBatches
                                                                                                        ?.count !== 0 &&
                                                                                                    handleDashboardbatches(
                                                                                                        '_id',
                                                                                                        data
                                                                                                            ?.totaldereservedBatches
                                                                                                            .id,
                                                                                                        'Dereservation Units',
                                                                                                        'Dereservation Units'
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {data
                                                                                                    ?.totaldereservedBatches
                                                                                                    ?.count !== 0
                                                                                                    ? data
                                                                                                          ?.totaldereservedBatches
                                                                                                          ?.count
                                                                                                    : '-'}
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Divider />
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        justify={'space-between'}
                                                                                    >
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.cardSubText
                                                                                                }
                                                                                            >
                                                                                                Quarantine units
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.numberSpan
                                                                                                }
                                                                                                style={{
                                                                                                    cursor:
                                                                                                        data
                                                                                                            ?.totalquarantinedBatches
                                                                                                            ?.count !==
                                                                                                            0 &&
                                                                                                        'pointer'
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    data
                                                                                                        ?.totalquarantinedBatches
                                                                                                        ?.count !== 0 &&
                                                                                                    handleDashboardbatches(
                                                                                                        '_id',
                                                                                                        data
                                                                                                            ?.totalquarantinedBatches
                                                                                                            .id,
                                                                                                        'Quarantine units',
                                                                                                        'Quarantine Units'
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {data
                                                                                                    ?.totalquarantinedBatches
                                                                                                    ?.count !== 0
                                                                                                    ? data
                                                                                                          ?.totalquarantinedBatches
                                                                                                          ?.count
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
                                                        <Card
                                                            style={{ marginBottom: '15px' }}
                                                            className={
                                                                (data?.expiringIn24Hours?.count &&
                                                                    data?.expiringIn24Hours?.count) ||
                                                                (data?.expiringIn48Hours?.count &&
                                                                    data?.expiringIn48Hours?.count !== 0)
                                                                    ? classes.smalldetailCardError
                                                                    : classes.smalldetailCard
                                                            }
                                                        >
                                                            <Grid container direction="column" spacing={2}>
                                                                <Grid item>
                                                                    <Typography
                                                                        color="primary"
                                                                        className={classes.smalldetailTitle}
                                                                    >
                                                                        Units nearby expiry
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid container justify="space-between">
                                                                        <Grid item>
                                                                            <Grid container alignItems="center">
                                                                                <Grid item>
                                                                                    <AvTimerIcon
                                                                                        className={
                                                                                            classes.smallCardIcon
                                                                                        }
                                                                                        color="error"
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        color="error"
                                                                                        className={
                                                                                            classes.smallIconValue
                                                                                        }
                                                                                    >
                                                                                        <CountUp
                                                                                            start={0}
                                                                                            end={
                                                                                                data?.expiringIn24Hours
                                                                                                    ?.count +
                                                                                                data?.expiringIn48Hours
                                                                                                    ?.count
                                                                                            }
                                                                                            duration={3}
                                                                                        />
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Grid container direction="column">
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.cardSubText}
                                                                                    >
                                                                                        In 24 hours
                                                                                        <span
                                                                                            className={
                                                                                                classes.numberSpan
                                                                                            }
                                                                                            style={{
                                                                                                cursor:
                                                                                                    data
                                                                                                        ?.expiringIn24Hours
                                                                                                        ?.count !== 0 &&
                                                                                                    'pointer'
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                data?.expiringIn24Hours
                                                                                                    ?.count !== 0 &&
                                                                                                handleDashboardFiltter(
                                                                                                    '_id',
                                                                                                    data
                                                                                                        ?.expiringIn24Hours
                                                                                                        ?.id,
                                                                                                    'Expiring in 24hrs'
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {data?.expiringIn24Hours
                                                                                                ?.count !== 0
                                                                                                ? data
                                                                                                      ?.expiringIn24Hours
                                                                                                      ?.count
                                                                                                : '-'}
                                                                                        </span>
                                                                                    </Typography>
                                                                                </Grid>

                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.cardSubText}
                                                                                    >
                                                                                        In 48 hours
                                                                                        <span
                                                                                            className={
                                                                                                classes.numberSpan
                                                                                            }
                                                                                            style={{
                                                                                                cursor:
                                                                                                    data
                                                                                                        ?.expiringIn48Hours
                                                                                                        ?.count !== 0 &&
                                                                                                    'pointer'
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                data?.expiringIn48Hours
                                                                                                    ?.count !== 0 &&
                                                                                                handleDashboardFiltter(
                                                                                                    '_id',
                                                                                                    data
                                                                                                        ?.expiringIn48Hours
                                                                                                        ?.id,
                                                                                                    'Expiring in 48hrs'
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {data?.expiringIn48Hours
                                                                                                ?.count !== 0
                                                                                                ? data
                                                                                                      ?.expiringIn48Hours
                                                                                                      ?.count
                                                                                                : '-'}
                                                                                        </span>
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Card>
                                                        <Card
                                                            className={
                                                                data?.notify2?.length > 0
                                                                    ? classes.smalldetailCardError
                                                                    : classes.smalldetailCard
                                                            }
                                                        >
                                                            <Grid container direction="column" spacing={2}>
                                                                <Grid item>
                                                                    <Typography
                                                                        color="primary"
                                                                        className={classes.smalldetailTitle}
                                                                    >
                                                                        General alert
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid container justify="space-between">
                                                                        <Grid item>
                                                                            <Grid
                                                                                container
                                                                                spacing={1}
                                                                                alignItems="center"
                                                                            >
                                                                                <Grid item>
                                                                                    <OfflineBoltIcon
                                                                                        className={
                                                                                            classes.smallCardIcon
                                                                                        }
                                                                                        color="error"
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        color="error"
                                                                                        className={
                                                                                            classes.smallIconValue
                                                                                        }
                                                                                    >
                                                                                        <CountUp
                                                                                            start={0}
                                                                                            //end={data?.alertTotal || 0}
                                                                                            end={
                                                                                                data?.notify2?.length >
                                                                                                0
                                                                                                    ? data?.notify2[0]
                                                                                                          ?.alertUnresolved
                                                                                                    : '0'
                                                                                            }
                                                                                            duration={3}
                                                                                        />
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item style={{ marginLeft: '10px' }}>
                                                                            <Grid container direction="column">
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        spacing={1}
                                                                                        justify="space-between"
                                                                                    >
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.resolution
                                                                                                }
                                                                                            >
                                                                                                Unresolved
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.resolutionRed
                                                                                                }
                                                                                                color="error"
                                                                                                style={{
                                                                                                    cursor:
                                                                                                        data?.notify2
                                                                                                            ?.length >
                                                                                                            0 &&
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
                                                                                                {data?.notify2?.length >
                                                                                                0
                                                                                                    ? data?.notify2[0]
                                                                                                          ?.alertUnresolved
                                                                                                    : '-'}
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        spacing={2}
                                                                                        justify="space-between"
                                                                                    >
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.resolution
                                                                                                }
                                                                                            >
                                                                                                Resolved
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                // color="sucess"
                                                                                                className={
                                                                                                    classes.resolutionValue
                                                                                                }
                                                                                                style={{
                                                                                                    cursor:
                                                                                                        data?.notify
                                                                                                            ?.length >
                                                                                                            0 &&
                                                                                                        'pointer'
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    data?.notify
                                                                                                        ?.length > 0 &&
                                                                                                    data.notify[0]
                                                                                                        ?.alertResolved &&
                                                                                                    handleDashboardAletsFiltter(
                                                                                                        'type',
                                                                                                        'status',
                                                                                                        'General Alert',
                                                                                                        'Resolved',
                                                                                                        'Alerts Resolved',
                                                                                                        'Alerts Resolved'
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {data?.notify?.length >
                                                                                                0
                                                                                                    ? data?.notify[0]
                                                                                                          ?.alertResolved
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
                                                    <Grid item xs={3} spacing={3}>
                                                        <Card
                                                            style={{ marginBottom: '15px' }}
                                                            className={
                                                                (data?.expiringIn24HoursBatches?.count &&
                                                                    data?.expiringIn24HoursBatches?.count) ||
                                                                (data?.expiringIn48HoursBatches?.count &&
                                                                    data?.expiringIn48HoursBatches?.count !== 0)
                                                                    ? classes.smalldetailCardError
                                                                    : classes.smalldetailCard
                                                            }
                                                        >
                                                            <Grid container direction="column" spacing={2}>
                                                                <Grid item>
                                                                    <Typography
                                                                        color="primary"
                                                                        className={classes.smalldetailTitle}
                                                                    >
                                                                        Batch nearby expiry
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid container justify="space-between">
                                                                        <Grid item>
                                                                            <Grid container alignItems="center">
                                                                                <Grid item>
                                                                                    <AvTimerIcon
                                                                                        className={
                                                                                            classes.smallCardIcon
                                                                                        }
                                                                                        color="error"
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        color="error"
                                                                                        className={
                                                                                            classes.smallIconValue
                                                                                        }
                                                                                    >
                                                                                        <CountUp
                                                                                            start={0}
                                                                                            end={
                                                                                                data
                                                                                                    ?.expiringIn24HoursBatches
                                                                                                    ?.count +
                                                                                                data
                                                                                                    ?.expiringIn48HoursBatches
                                                                                                    ?.count
                                                                                            }
                                                                                            duration={3}
                                                                                        />
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Grid container direction="column">
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.cardSubText}
                                                                                    >
                                                                                        In 24 hours
                                                                                        <span
                                                                                            className={
                                                                                                classes.numberSpan
                                                                                            }
                                                                                            style={{
                                                                                                cursor:
                                                                                                    data
                                                                                                        ?.expiringIn24HoursBatches
                                                                                                        ?.count !== 0 &&
                                                                                                    'pointer'
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                data
                                                                                                    ?.expiringIn24HoursBatches
                                                                                                    ?.count !== 0 &&
                                                                                                handleDashboardbatches(
                                                                                                    '_id',
                                                                                                    data
                                                                                                        ?.expiringIn24HoursBatches
                                                                                                        ?.id,
                                                                                                    'Expiring in 24hrs'
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {data
                                                                                                ?.expiringIn24HoursBatches
                                                                                                ?.count !== 0
                                                                                                ? data
                                                                                                      ?.expiringIn24HoursBatches
                                                                                                      ?.count
                                                                                                : '-'}
                                                                                        </span>
                                                                                    </Typography>
                                                                                </Grid>

                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.cardSubText}
                                                                                    >
                                                                                        In 48 hours
                                                                                        <span
                                                                                            className={
                                                                                                classes.numberSpan
                                                                                            }
                                                                                            style={{
                                                                                                cursor:
                                                                                                    data
                                                                                                        ?.expiringIn48HoursBatches
                                                                                                        ?.count !== 0 &&
                                                                                                    'pointer'
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                data
                                                                                                    ?.expiringIn48HoursBatches
                                                                                                    ?.count !== 0 &&
                                                                                                handleDashboardbatches(
                                                                                                    '_id',
                                                                                                    data
                                                                                                        ?.expiringIn48HoursBatches
                                                                                                        ?.id,
                                                                                                    'Expiring in 48hrs'
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {data
                                                                                                ?.expiringIn48HoursBatches
                                                                                                ?.count !== 0
                                                                                                ? data
                                                                                                      ?.expiringIn48HoursBatches
                                                                                                      ?.count
                                                                                                : '-'}
                                                                                        </span>
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Card>

                                                        <Card
                                                            className={
                                                                data?.notify4?.length > 0
                                                                    ? classes.smalldetailCardError
                                                                    : classes.smalldetailCard
                                                            }
                                                        >
                                                            <Grid container direction="column" spacing={2}>
                                                                <Grid item>
                                                                    <Typography
                                                                        color="primary"
                                                                        className={classes.smalldetailTitle}
                                                                    >
                                                                        Critical alert
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid container justify="space-between">
                                                                        <Grid item>
                                                                            <Grid
                                                                                container
                                                                                spacing={1}
                                                                                alignItems="center"
                                                                            >
                                                                                <Grid item>
                                                                                    <WarningIcon
                                                                                        className={`${classes.smallCardIcon} ${classes.warning}`}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={
                                                                                            classes.smallIconValue
                                                                                        }
                                                                                        color="error"
                                                                                    >
                                                                                        <CountUp
                                                                                            start={0}
                                                                                            end={
                                                                                                data?.notify4?.length >
                                                                                                0
                                                                                                    ? data?.notify4[0]
                                                                                                          ?.warningUnresolved
                                                                                                    : '0'
                                                                                            }
                                                                                            duration={3}
                                                                                        />
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item style={{ marginLeft: '10px' }}>
                                                                            <Grid container direction="column">
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        spacing={2}
                                                                                        justify="space-between"
                                                                                    >
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.resolution
                                                                                                }
                                                                                            >
                                                                                                Unresolved
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.resolutionRed
                                                                                                }
                                                                                                color="error"
                                                                                                style={{
                                                                                                    cursor:
                                                                                                        data?.notify4
                                                                                                            ?.length >
                                                                                                            0 &&
                                                                                                        'pointer'
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    data?.notify4
                                                                                                        ?.length > 0 &&
                                                                                                    handleDashboardAletsFiltter(
                                                                                                        'type',
                                                                                                        'status',
                                                                                                        'Critical Alert',
                                                                                                        'Unresolved',
                                                                                                        'Critical Unresolved',
                                                                                                        'Critical Unresolved'
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {data?.notify4?.length >
                                                                                                0
                                                                                                    ? data?.notify4[0]
                                                                                                          ?.warningUnresolved
                                                                                                    : '-'}
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Grid
                                                                                        container
                                                                                        spacing={2}
                                                                                        justify="space-between"
                                                                                    >
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                className={
                                                                                                    classes.resolution
                                                                                                }
                                                                                            >
                                                                                                Resolved
                                                                                            </Typography>
                                                                                        </Grid>
                                                                                        <Grid item>
                                                                                            <Typography
                                                                                                // color="sucess"
                                                                                                className={
                                                                                                    classes.resolutionValue
                                                                                                }
                                                                                                style={{
                                                                                                    cursor:
                                                                                                        data?.notify3
                                                                                                            ?.length >
                                                                                                            0 &&
                                                                                                        'pointer'
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    data?.notify3
                                                                                                        ?.length > 0 &&
                                                                                                    handleDashboardAletsFiltter(
                                                                                                        'type',
                                                                                                        'status',
                                                                                                        'Critical Alert',
                                                                                                        'Resolved',
                                                                                                        'Critical Resolved',
                                                                                                        'Critical Resolved'
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {data?.notify3?.length >
                                                                                                0
                                                                                                    ? data?.notify3[0]
                                                                                                          ?.warningResolved
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
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} style={{ marginBottom: '5px' }}>
                                    <Grid container direction="row" spacing={3}>
                                        <Grid item xs={6}>
                                            <Card className={classes.detailCard} style={{ minHeight: '395px' }}>
                                                <Grid container direction="column" spacing={1}>
                                                    <Grid item className={classes.cardMainTextBox}>
                                                        <Typography
                                                            className={classes.cardMainText}
                                                            style={{ paddingTop: '25px' }}
                                                        >
                                                            Units in stock
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item style={{ maxHeight: 'fit-content' }}>
                                                        <Grid container alignItems="center" justify="space-between">
                                                            <Grid item>
                                                                <Grid container direction="column">
                                                                    <Grid item>
                                                                        <Grid container spacing={2} alignItems="center">
                                                                            <Grid
                                                                                item
                                                                                className={classes.iconContainer}
                                                                            >
                                                                                <OpacityIcon
                                                                                    className={classes.cardIcon}
                                                                                    color="error"
                                                                                />
                                                                            </Grid>

                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.iconValue}
                                                                                    color="error"
                                                                                >
                                                                                    <CountUp
                                                                                        start={0}
                                                                                        end={
                                                                                            data?.totalUnitsInStock || 0
                                                                                        }
                                                                                        duration={2}
                                                                                    />
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item sm={12} md={12} lg={6}>
                                                                <Grid
                                                                    container
                                                                    spacing={2}
                                                                    direction="column"
                                                                    style={{ paddingTop: '20px' }}
                                                                >
                                                                    <Grid item sm={12} md={12} lg={12}>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item sm={6} md={6} lg={6}>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    Assigned
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.assigned?.length >
                                                                                                0 && 'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.assigned?.length > 0 &&
                                                                                        handleDashboardFiltter(
                                                                                            'isAssigned',
                                                                                            1,
                                                                                            'Assigned',
                                                                                            'Assigned Units'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {data?.assigned?.length > 0
                                                                                        ? data.assigned[0].isAssigned
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Divider />

                                                                    <Grid item>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item sm={6} md={6} lg={6}>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    Unassigned
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.available?.length >
                                                                                                0 && 'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.available?.length > 0 &&
                                                                                        handleDashboardFiltter(
                                                                                            'isAssigned',
                                                                                            0,
                                                                                            'Available',
                                                                                            'Available Units'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {console.log('dat---', data)}
                                                                                    {data?.available?.length > 0
                                                                                        ? data.available[0].available
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Divider />
                                                                    <Grid item>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    In transit
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.inTransferCount
                                                                                                ?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.inTransferCount?.length >
                                                                                            0 &&
                                                                                        handleDashboardFiltter(
                                                                                            'deviceTrackId.name',
                                                                                            'Move Out',
                                                                                            'Move Out',
                                                                                            'Intransit Units'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {data?.inTransferCount?.length > 0
                                                                                        ? data?.inTransferCount[0]
                                                                                              ?.count
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Divider />
                                                                    <Grid item sm={12} md={12} lg={12}>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    External transfer
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.issuesCount?.length >
                                                                                                0 && 'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.issuesCount?.length > 0 &&
                                                                                        handleDashboardFiltter(
                                                                                            'trackId.name',
                                                                                            'Issued',
                                                                                            'Issued',
                                                                                            'External Transfer Units'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {data?.issuesCount?.length > 0
                                                                                        ? data.issuesCount[0].count
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

                                                <Grid container direction="column" spacing={1}>
                                                    <Grid item className={classes.cardMainTextBox}>
                                                        <Typography
                                                            className={classes.cardMainText}
                                                            style={{ paddingTop: '25px' }}
                                                        >
                                                            Transfused units
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item style={{ maxHeight: 'fit-content' }}>
                                                        <Grid container alignItems="center" justify="space-between">
                                                            <Grid item>
                                                                <Grid container direction="column">
                                                                    <Grid item>
                                                                        <Grid container spacing={2} alignItems="center">
                                                                            <Grid
                                                                                item
                                                                                className={classes.iconContainer}
                                                                            >
                                                                                <OpacityIcon
                                                                                    className={classes.cardIcon}
                                                                                    color="error"
                                                                                />
                                                                            </Grid>

                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.iconValue}
                                                                                    color="error"
                                                                                >
                                                                                    <CountUp
                                                                                        start={0}
                                                                                        end={
                                                                                            data?.totalUnitsTransfused ||
                                                                                            0
                                                                                        }
                                                                                        duration={2}
                                                                                    />
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item sm={12} md={12} lg={6}>
                                                                <Grid
                                                                    container
                                                                    spacing={2}
                                                                    direction="column"
                                                                    style={{ paddingTop: '20px' }}
                                                                >
                                                                    <Grid item sm={12} md={12} lg={12}>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item sm={6} md={6} lg={6}>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    Transfused
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                    onClick={handleTransfusedUnits}
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.transfusedCount
                                                                                                ?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                >
                                                                                    {data?.transfusedCount?.length > 0
                                                                                        ? data.transfusedCount[0].count
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Divider />

                                                                    <Grid item>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    In progress
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.inTransferCount
                                                                                                ?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                >
                                                                                    {'-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Divider />
                                                                    <Grid item>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    Presume transfused
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                >
                                                                                    {'-'}
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

                                        <Grid item xs={6}>
                                            <Card className={classes.detailCard} style={{ minHeight: '395px' }}>
                                                <Grid container direction="column" spacing={1}>
                                                    <Grid item className={classes.cardMainTextBox}>
                                                        <Typography
                                                            className={classes.cardMainText}
                                                            style={{ paddingTop: '25px' }}
                                                        >
                                                            Batch Products in stock
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item style={{ maxHeight: 'fit-content' }}>
                                                        <Grid container alignItems="center" justify="space-between">
                                                            <Grid item>
                                                                <Grid container direction="column">
                                                                    <Grid item>
                                                                        <Grid container spacing={2} alignItems="center">
                                                                            <Grid
                                                                                item
                                                                                className={classes.iconContainer}
                                                                            >
                                                                                <OpacityIcon
                                                                                    className={classes.cardIcon}
                                                                                    color="error"
                                                                                />
                                                                            </Grid>

                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.iconValue}
                                                                                    color="error"
                                                                                >
                                                                                    <CountUp
                                                                                        start={0}
                                                                                        end={
                                                                                            data?.totalUnitsInBatches ||
                                                                                            0
                                                                                        }
                                                                                        duration={2}
                                                                                    />
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item sm={12} md={12} lg={6}>
                                                                <Grid
                                                                    container
                                                                    spacing={2}
                                                                    direction="column"
                                                                    style={{ paddingTop: '20px' }}
                                                                >
                                                                    <Grid item sm={12} md={12} lg={12}>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item sm={6} md={6} lg={6}>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    Assigned
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.assignedBatches
                                                                                                ?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.assignedBatches?.length >
                                                                                            0 &&
                                                                                        handleDashboardbatches(
                                                                                            'isAssigned',
                                                                                            1,
                                                                                            'Assigned',
                                                                                            'Assigned Batches'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {data?.assignedBatches?.length > 0
                                                                                        ? data.assignedBatches[0]
                                                                                              .isAssigned
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Divider />

                                                                    <Grid item>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item sm={6} md={6} lg={6}>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    Unassigned
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.availableBatches
                                                                                                ?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.availableBatches?.length >
                                                                                            0 &&
                                                                                        handleDashboardbatches(
                                                                                            'isAssigned',
                                                                                            0,
                                                                                            'Available',
                                                                                            'Available Batches'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {console.log('dat---', data)}
                                                                                    {data?.availableBatches?.length > 0
                                                                                        ? data.availableBatches[0]
                                                                                              .available
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Divider />
                                                                    <Grid item>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    In transit
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.batchinTransferCount
                                                                                                ?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.batchinTransferCount
                                                                                            ?.length > 0 &&
                                                                                        handleDashboardbatches(
                                                                                            'deviceTrackId.name',
                                                                                            'Move Out',
                                                                                            'Move Out',
                                                                                            'Intransit batches'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {data?.batchinTransferCount
                                                                                        ?.length > 0
                                                                                        ? data?.batchinTransferCount[0]
                                                                                              ?.count
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Divider />
                                                                    <Grid item sm={12} md={12} lg={12}>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    External transfer
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.batchissuesCount
                                                                                                ?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        data?.batchissuesCount?.length >
                                                                                            0 &&
                                                                                        handleDashboardbatches(
                                                                                            'trackId.name',
                                                                                            'Issued',
                                                                                            'Issued',
                                                                                            'External Transfer Batches'
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {data?.batchissuesCount?.length > 0
                                                                                        ? data.batchissuesCount[0].count
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

                                                <Grid container direction="column" spacing={1}>
                                                    <Grid item className={classes.cardMainTextBox}>
                                                        <Typography
                                                            className={classes.cardMainText}
                                                            style={{ paddingTop: '25px' }}
                                                        >
                                                            Transfused batch products
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item style={{ maxHeight: 'fit-content' }}>
                                                        <Grid container alignItems="center" justify="space-between">
                                                            <Grid item>
                                                                <Grid container direction="column">
                                                                    <Grid item>
                                                                        <Grid container spacing={2} alignItems="center">
                                                                            <Grid
                                                                                item
                                                                                className={classes.iconContainer}
                                                                            >
                                                                                <OpacityIcon
                                                                                    className={classes.cardIcon}
                                                                                    color="error"
                                                                                />
                                                                            </Grid>

                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.iconValue}
                                                                                    color="error"
                                                                                >
                                                                                    <CountUp
                                                                                        start={0}
                                                                                        end={
                                                                                            data?.totalBatchsTransfused ||
                                                                                            0
                                                                                        }
                                                                                        duration={2}
                                                                                    />
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item sm={12} md={12} lg={6}>
                                                                <Grid
                                                                    container
                                                                    spacing={2}
                                                                    direction="column"
                                                                    style={{ paddingTop: '20px' }}
                                                                >
                                                                    <Grid item sm={12} md={12} lg={12}>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item sm={6} md={6} lg={6}>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    Transfused
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                    onClick={handleTransfusedBatch}
                                                                                    style={{
                                                                                        cursor:
                                                                                            data?.transfusedBatchesCount
                                                                                                ?.length > 0 &&
                                                                                            'pointer'
                                                                                    }}
                                                                                >
                                                                                    {data?.transfusedBatchesCount
                                                                                        ?.length > 0
                                                                                        ? data.transfusedBatchesCount[0]
                                                                                              .count
                                                                                        : '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Divider />

                                                                    <Grid item>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    In progress
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                >
                                                                                    {'-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Divider />
                                                                    <Grid item>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.cardSubText}
                                                                                >
                                                                                    Presume transfused
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Typography
                                                                                    className={classes.numberSpan}
                                                                                >
                                                                                    {'-'}
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
                                <Grid item xs={12} style={{ marginBottom: '18px' }}>
                                    <Card className={classes.detailCard}>
                                        <Grid container spacing={2} direction="column">
                                            {load ? (
                                                <Loader />
                                            ) : (
                                                <>
                                                    <Grid item>
                                                        <Grid container alignItems="center">
                                                            <Grid item xs={5}>
                                                                <Typography
                                                                    color="primary"
                                                                    className={classes.smalldetailTitle}
                                                                >
                                                                    Temperature
                                                                </Typography>
                                                            </Grid>

                                                            {/* {tempBar.length && dateBar.length ? ( */}
                                                            <Grid item className={classes.buttonGroup}>
                                                                <ButtonGroup
                                                                    // color="primary"
                                                                    variant="outlined"
                                                                    aria-label="outlined primary button group"
                                                                >
                                                                    <Button
                                                                        color={activeButton === '2H' ? 'primary' : ''}
                                                                        className={
                                                                            activeButton === '2H'
                                                                                ? classes.selectedButtonGroup
                                                                                : ''
                                                                        }
                                                                        onClick={() =>
                                                                            handleChangeDate('2H', 2, 'hours')
                                                                        }
                                                                    >
                                                                        2H
                                                                    </Button>
                                                                    <Button
                                                                        color={activeButton === '4H' ? 'primary' : ''}
                                                                        className={
                                                                            activeButton === '4H'
                                                                                ? classes.selectedButtonGroup
                                                                                : ''
                                                                        }
                                                                        onClick={() =>
                                                                            handleChangeDate('4H', 4, 'hours')
                                                                        }
                                                                    >
                                                                        4H
                                                                    </Button>
                                                                    <Button
                                                                        color={activeButton === '8H' ? 'primary' : ''}
                                                                        className={
                                                                            activeButton === '8H'
                                                                                ? classes.selectedButtonGroup
                                                                                : ''
                                                                        }
                                                                        onClick={() =>
                                                                            handleChangeDate('8H', 8, 'hours')
                                                                        }
                                                                    >
                                                                        8H
                                                                    </Button>
                                                                    <Button
                                                                        color={activeButton === '12H' ? 'primary' : ''}
                                                                        className={
                                                                            activeButton === '12H'
                                                                                ? classes.selectedButtonGroup
                                                                                : ''
                                                                        }
                                                                        onClick={() =>
                                                                            handleChangeDate('12H', 12, 'hours')
                                                                        }
                                                                    >
                                                                        12H
                                                                    </Button>
                                                                    <Button
                                                                        color={activeButton === '1D' ? 'primary' : ''}
                                                                        className={
                                                                            activeButton === '1D'
                                                                                ? classes.selectedButtonGroup
                                                                                : ''
                                                                        }
                                                                        onClick={() =>
                                                                            handleChangeDate('1D', 1, 'days')
                                                                        }
                                                                    >
                                                                        1D
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleChangeDate('5D', 5, 'days')
                                                                        }
                                                                        className={
                                                                            activeButton === '5D'
                                                                                ? classes.selectedButtonGroup
                                                                                : ''
                                                                        }
                                                                        color={activeButton === '5D' ? 'primary' : ''}
                                                                    >
                                                                        5D
                                                                    </Button>
                                                                    <Button
                                                                        color={activeButton === '15D' ? 'primary' : ''}
                                                                        className={
                                                                            activeButton === '15D'
                                                                                ? classes.selectedButtonGroup
                                                                                : ''
                                                                        }
                                                                        onClick={() =>
                                                                            handleChangeDate('15D', 15, 'days')
                                                                        }
                                                                    >
                                                                        15D
                                                                    </Button>
                                                                    {/*<Button*/}
                                                                    {/*    color={*/}
                                                                    {/*        activeButton === '30D' ? 'primary' : ''*/}
                                                                    {/*    }*/}
                                                                    {/*    className={*/}
                                                                    {/*        activeButton === '30D'*/}
                                                                    {/*            ? classes.selectedButtonGroup*/}
                                                                    {/*            : ''*/}
                                                                    {/*    }*/}
                                                                    {/*    onClick={() => handleChangeDate('30D', 30 , "days")}*/}
                                                                    {/*>*/}
                                                                    {/*    30D*/}
                                                                    {/*</Button>*/}
                                                                    {/*<Button*/}
                                                                    {/*    onClick={() => handleChangeDate('1M', 1 ,"month")}*/}
                                                                    {/*    className={*/}
                                                                    {/*        activeButton === '1M'*/}
                                                                    {/*            ? classes.selectedButtonGroup*/}
                                                                    {/*            : ''*/}
                                                                    {/*    }*/}
                                                                    {/*    color={*/}
                                                                    {/*        activeButton === '1M' ? 'primary' : ''*/}
                                                                    {/*    }*/}
                                                                    {/*>*/}
                                                                    {/*    1M*/}
                                                                    {/*</Button>*/}
                                                                    {/*<Button*/}
                                                                    {/*    onClick={() => handleChangeDate('1Y', 1, "years")}*/}
                                                                    {/*    className={*/}
                                                                    {/*        activeButton === '1Y'*/}
                                                                    {/*            ? classes.selectedButtonGroup*/}
                                                                    {/*            : ''*/}
                                                                    {/*    }*/}
                                                                    {/*    color={*/}
                                                                    {/*        activeButton === '1Y' ? 'primary' : ''*/}
                                                                    {/*    }*/}
                                                                    {/*>*/}
                                                                    {/*    1Y*/}
                                                                    {/*</Button>*/}
                                                                </ButtonGroup>
                                                            </Grid>
                                                            {/* ) : null} */}
                                                            <Grid item xs />
                                                            <Grid item>
                                                                {/*<InputLabel id="demo-multiple-checkbox-label">Fridges</InputLabel>*/}

                                                                {/*<FormControl*/}
                                                                {/*    variant="outlined"*/}
                                                                {/*    style={{ minWidth: 180 }}*/}
                                                                {/*>*/}
                                                                {/*    <InputLabel id="demo-multiple-checkbox-label">*/}
                                                                {/*        Fridge*/}
                                                                {/*    </InputLabel>*/}
                                                                {/*    <Select*/}
                                                                {/*        labelId="demo-multiple-checkbox-label"*/}
                                                                {/*        id="demo-multiple-checkbox"*/}
                                                                {/*        // multiple*/}
                                                                {/*        value={value}*/}
                                                                {/*        onChange={onSorageDeviceChange}*/}
                                                                {/*        input={<OutlinedInput label="Fridges" />}*/}
                                                                {/*        //renderValue={(selected) => selected.length +" Fridges Selected "}*/}
                                                                {/*    >*/}
                                                                {/*        {storageDevice.map((device) => (*/}
                                                                {/*            <MenuItem*/}
                                                                {/*                key={device._id}*/}
                                                                {/*                value={device}*/}
                                                                {/*                onClick={(e) =>*/}
                                                                {/*                    handleSelectCheck(e, device._id)*/}
                                                                {/*                }*/}
                                                                {/*            >*/}
                                                                {/*                */}{/*<Checkbox*/}
                                                                {/*                */}{/*    checked={selectedDevice.map((x) => x._id === device._id ? true : false)}*/}
                                                                {/*                */}{/*    //handleChange={(e)=>handleSelectCheck(e,device._id)}*/}
                                                                {/*                */}{/*/>*/}
                                                                {/*                <ListItemText primary={device.name} />*/}
                                                                {/*            </MenuItem>*/}
                                                                {/*        ))}*/}
                                                                {/*    </Select>*/}
                                                                {/*</FormControl>*/}

                                                                {/*<SelectOption*/}
                                                                {/*    input={<OutlinedInput label="Fridges" />}*/}
                                                                {/*    options={storageDevice}*/}
                                                                {/*    onChange={onSorageDeviceChange}*/}
                                                                {/*    value={value}*/}
                                                                {/*    minWidth={'170px'}*/}
                                                                            {/*/>*/}

                                                                            <SelectOption
                                                                                options={storageDevice}
                                                                                onChange={onSorageDeviceChange}
                                                                                value={value}
                                                                                minWidth={'170px'}
                                                                            />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {tempBar.length && dateBar.length ? (
                                                        <Grid item xs>
                                                            <LineChart data={lineChartGraphData} />
                                                        </Grid>
                                                    ) : (
                                                        <Grid item>
                                                            <NoData />{' '}
                                                        </Grid>
                                                    )}{' '}
                                                </>
                                            )}
                                        </Grid>
                                    </Card>
                                </Grid>

                                <Grid container spacing={2} style={{ padding: '10px' }} justify="space-between">
                                    <Grid item xs={12}>
                                        <Card className={classes.detailCard}>
                                            <Grid container spacing={3} direction="column">
                                                <Grid item>
                                                    <Grid container alignItems="center">
                                                        <Grid item>
                                                            <Typography
                                                                color="primary"
                                                                className={classes.smalldetailTitle}
                                                            >
                                                                Units - Grouped By {groupBy}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs />
                                                        <Grid item>
                                                            <Grid container>
                                                                <Grid item>
                                                                    <Button
                                                                        variant="outlined"
                                                                        disableRipple
                                                                        disableElevation
                                                                        color="primary"
                                                                        className={
                                                                            isSingleView === 'Product'
                                                                                ? classes.selectedButton
                                                                                : classes.disabledButton
                                                                        }
                                                                        onClick={() => {
                                                                            setIsSingleView('Product'),
                                                                                setGroupBy('Product');
                                                                        }}
                                                                    >
                                                                        Product
                                                                    </Button>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button
                                                                        variant="outlined"
                                                                        disableRipple
                                                                        disableElevation
                                                                        color="primary"
                                                                        onClick={() => {
                                                                            setIsSingleView('Location'),
                                                                                setGroupBy('Location');
                                                                        }}
                                                                        className={
                                                                            isSingleView === 'Location'
                                                                                ? classes.selectedButton
                                                                                : classes.disabledButton
                                                                        }
                                                                    >
                                                                        Location
                                                                    </Button>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button
                                                                        variant="outlined"
                                                                        disableRipple
                                                                        disableElevation
                                                                        color="primary"
                                                                        onClick={() => {
                                                                            setIsSingleView('Device'),
                                                                                setGroupBy('Device');
                                                                        }}
                                                                        className={
                                                                            isSingleView === 'Device'
                                                                                ? classes.selectedButton
                                                                                : classes.disabledButton
                                                                        }
                                                                    >
                                                                        Device
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    {data && (
                                                        <DashboardTable
                                                            columns={
                                                                groupBy == 'Product'
                                                                    ? columns
                                                                    : groupBy == 'Location'
                                                                    ? locationColumn
                                                                    : deviceColumn
                                                            }
                                                            response={
                                                                groupBy == 'Product'
                                                                    ? data?.bloodgroupWithProductCount?.length > 0 &&
                                                                      data?.bloodgroupWithProductCount?.sort((a, b) => {
                                                                          if (a.product.value !== 'Total') {
                                                                              return a.product.value.localeCompare(
                                                                                  b.product.value
                                                                              );
                                                                          }
                                                                      })
                                                                    : groupBy == 'Location'
                                                                    ? data?.bloodgroupWithLocationCount?.length > 0 &&
                                                                      data?.bloodgroupWithLocationCount?.sort(
                                                                          (a, b) => {
                                                                              if (a.location.value !== 'Total') {
                                                                                  return a.location.value.localeCompare(
                                                                                      b.location.value
                                                                                  );
                                                                              }
                                                                          }
                                                                      )
                                                                    : data?.bloodgroupWithDeviceCount?.length > 0 &&
                                                                      data?.bloodgroupWithDeviceCount?.sort((a, b) => {
                                                                          if (a.device.value !== 'Total') {
                                                                              return a.device.value.localeCompare(
                                                                                  b.device.value
                                                                              );
                                                                          }
                                                                      })
                                                            }
                                                            total={data?.totalUnitsInStock}
                                                            hospitalFilters={hospitalFilters}
                                                            groupBy={groupBy}
                                                        />
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={12} style={{ display: 'flex' }}>
                                        <Grid item xs={6}>
                                            <Card className={classes.detailCard}>
                                                <Grid container style={{ marginBottom: '0px' }}>
                                                    <Typography color="primary" className={classes.smalldetailTitle}>
                                                        Stock
                                                    </Typography>
                                                </Grid>
                                                {data && <BarChart data={firstBarChart} />}
                                            </Card>
                                        </Grid>
                                        <Grid style={{ margin: '5px' }} />
                                        <Grid item xs={6}>
                                            <Card className={classes.detailCard}>
                                                <Grid container style={{ marginBottom: '0px' }}>
                                                    <Typography color="primary" className={classes.smalldetailTitle}>
                                                        Batch products
                                                    </Typography>
                                                </Grid>
                                                {data && <BarChart data={batchBarChart} />}
                                            </Card>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} style={{ display: 'flex' }}>
                                        <Grid item xs={12}>
                                            <Card className={classes.detailCard}>
                                                <Grid container spacing={3} direction="column">
                                                    <Grid item>
                                                        <Grid container alignItems="center">
                                                            <Grid item>
                                                                <Typography
                                                                    color="primary"
                                                                    className={classes.smalldetailTitle}
                                                                >
                                                                    Batch Products - Grouped By {groupBy}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs />
                                                            <Grid item>
                                                                <Grid container>
                                                                    <Grid item>
                                                                        <Button
                                                                            variant="outlined"
                                                                            disableRipple
                                                                            disableElevation
                                                                            color="primary"
                                                                            className={
                                                                                isSingleView === 'Product'
                                                                                    ? classes.selectedButton
                                                                                    : classes.disabledButton
                                                                            }
                                                                            onClick={() => {
                                                                                setIsSingleView('Product'),
                                                                                    setGroupBy('Product');
                                                                            }}
                                                                        >
                                                                            Product
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Button
                                                                            variant="outlined"
                                                                            disableRipple
                                                                            disableElevation
                                                                            color="primary"
                                                                            onClick={() => {
                                                                                setIsSingleView('Location'),
                                                                                    setGroupBy('Location');
                                                                            }}
                                                                            className={
                                                                                isSingleView === 'Location'
                                                                                    ? classes.selectedButton
                                                                                    : classes.disabledButton
                                                                            }
                                                                        >
                                                                            Location
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Button
                                                                            variant="outlined"
                                                                            disableRipple
                                                                            disableElevation
                                                                            color="primary"
                                                                            onClick={() => {
                                                                                setIsSingleView('Device'),
                                                                                    setGroupBy('Device');
                                                                            }}
                                                                            className={
                                                                                isSingleView === 'Device'
                                                                                    ? classes.selectedButton
                                                                                    : classes.disabledButton
                                                                            }
                                                                        >
                                                                            Device
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs>
                                                        {data && (
                                                            <BatchTable
                                                                columns={
                                                                    groupBy == 'Product'
                                                                        ? batchcolumns
                                                                        : groupBy == 'Location'
                                                                        ? batchlocationColumn
                                                                        : batchdeviceColumn
                                                                }
                                                                response={
                                                                    groupBy == 'Product'
                                                                        ? data?.batchProductWithProductCount
                                                                        : //    ?.length > 0 &&
                                                                        //data?.batchProductWithProductCount?.sort((a, b) => {
                                                                        //    if (a?.product?.value !== 'Total') {
                                                                        //        return a?.product?.value?.localeCompare(
                                                                        //            b?.product?.value
                                                                        //        );
                                                                        //    }
                                                                        //})
                                                                        groupBy == 'Location'
                                                                        ? data?.batchProductWithLocationCount
                                                                        : //    ?.length > 0 &&
                                                                          //data?.batchProductWithLocationCount?.sort(
                                                                          //    (a, b) => {
                                                                          //        if (a.location.value !== 'Total') {
                                                                          //            return a.location.value.localeCompare(
                                                                          //                b.location.value
                                                                          //            );
                                                                          //        }
                                                                          //    }
                                                                          //)
                                                                          data?.batchProductWithDeviceCount
                                                                    /*?.length > 0 &&
                                                                                    data?.batchProductWithDeviceCount?.sort((a, b) => {
                                                                                        if (a.device.value !== 'Total') {
                                                                                            return a.device.value.localeCompare(
                                                                                                b.device.value
                                                                                            );
                                                                                        }
                                                                                    })*/
                                                                }
                                                                total={data?.totalUnitsInStock}
                                                                hospitalFilters={hospitalFilters}
                                                                groupBy={groupBy}
                                                            />
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {remoteInfo && remoteInfo?.remoteLogin === 'TRUE' ? (
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <Grid item className={classes.sideBar}>
                                    <Grid
                                        container
                                        justify="center"
                                        style={{ marginTop: '30px' }}
                                        spacing={2}
                                        direction="column"
                                    >
                                        <Grid item>
                                            <Typography
                                                style={{ fontWeight: 300 }}
                                                variant="h5"
                                                className={classes.tipsTypo}
                                            >
                                                Tips
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5" className={classes.tipsTypoBlue}>
                                                Access Device
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5" className={classes.tipsTypo}>
                                                Automatic Access
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5" className={classes.tipsTypoSmall}>
                                                Present ID badge to access device automatically.
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <img src={ManulaDevice} style={{ width: 180, marginTop: 10 }} />
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center">
                                                <Grid item xs>
                                                    <Divider />
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="h5"
                                                        style={{ margin: '0 8px' }}
                                                        className={classes.tipsTypoSmall}
                                                    >
                                                        or
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs>
                                                    <Divider />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5" className={classes.tipsTypo}>
                                                Manual Access
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5" className={classes.tipsTypoSmall}>
                                                Simply click on Access Device button to manually login and access device
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <CustomButton
                                                onClick={() => setDeviceLogin(true)}
                                                variant="contained"
                                                fullWidth
                                                color="primary"
                                                disabled={deviceId === undefined || deviceId?.length === 0}
                                            >
                                                Access Device
                                            </CustomButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : (
                            ''
                        )}
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
                                                                    disabled={!accessableCodes.includes('BS-ACO-1043')}
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
                                                                    handleDate={(date) => setDob(date)}
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
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <InputLabel className={classes.inputLabel}>
                                                                    Blood Group
                                                                </InputLabel>
                                                                <SelectOption
                                                                    // label="Select Location Type"
                                                                    options={options?.data}
                                                                    onChange={(e) => setBloodGroup(e.target.value)}
                                                                    value={bloodGroup}
                                                                    name="bloodGroup"
                                                                    id="id"
                                                                    disabled={
                                                                        resData !== undefined &&
                                                                        resData?.data?.length !== 0
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                            </Grid>
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
                                                                                    {getDate(unit?.expiryDateAndTime)}
                                                                                </td>
                                                                            </tr>
                                                                        </>
                                                                    </table>
                                                                </Card>
                                                            </Grid>
                                                        ))}

                                                        <Grid item style={{ marginTop: 25 }}>
                                                            <CustomButton
                                                                onClick={handleAssignClick}
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
                </>
            )}
        </>
    );
};

export default DashboardPage;
