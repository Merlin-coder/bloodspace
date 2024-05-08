import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard, getTemperature } from 'redux/actions/dashboard/dashboardActions';
import { useStyles } from './remotestyle';
import CustomIcon from '../../components/iconButton';
import {
    Card,
    Grid,
    Typography,
    Tabs,
    Tab,
    Divider,
    Button,
    Hidden,
    ButtonGroup,
    Dialog,
    DialogTitle,
    IconButton,
    CloseIcon
} from '@material-ui/core';
import OpacityIcon from '@material-ui/icons/Opacity';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import WarningIcon from '@material-ui/icons/Warning';
import { useTheme } from '@material-ui/core';
import CountUp from 'react-countup';
import BarChart from '../dashboard/BarChart';
//const BarChart = lazy(() => import('./BarChart'));
import { getDropDown } from 'redux/actions/manage/manageFieldsAction';
import { clearDeviceLoginState, deviceLogin } from 'redux/actions/auth/authActions';

import { CustomButton } from 'common';
import { Link, useHistory } from 'react-router-dom';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';
import { getApplyFilters } from 'redux/actions/filters/globalFilterAction';
import NoDashboardData from 'components/404Page/noDataDashboard';
import ManulaDevice from '../../assets/manualDevice.png';
import ActiveStatusIcon from '../../assets/active.png';
import InActiveStatusIcon from '../../assets/inactive.png';
import { Loader, LoginPopup } from 'components';
import DeviceLogin from './deviceLogin';
import { createAlert, remoteDBAccessDeviceAction, deviceAccessDetails } from 'redux/actions';
import ComboBox from 'components/comboBox';
import LineChart from 'pages/dashboard/LineChart';
import moment from 'moment';
import NoData from 'components/no data';
import AvTimerIcon from '@material-ui/icons/AvTimer';

const RemoteDashboardPage = () => {
    const [selectedDevice, setSelectedDevice] = useState(null);
    console.log("sele------------", selectedDevice);
    const [selectedUser, setSelectedUser] = useState({});
    const [open, setOpen] = React.useState(false);
    const [accessDetails, setAccessDetails] = useState({});
    const socket = useSelector((state) => state.socketReducer.socket);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { deviceUserInfo } = useSelector((state) => state.deviceLogin);   
    const { token } = useSelector((state) => state.getSocketDeviceToken);

    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [barLabels, setBarLabels] = React.useState([]);
    const [barValues, setBarValues] = React.useState([]);
    const [deviceLoginn, setDeviceLogin] = React.useState(false);
    const comboBoxRef = useRef();

    const { data, loading } = useSelector((state) => state.getDashboard);
    const { licenseInfo, licenseError } = useSelector((state) => state.getLicense);
    const [hospitalId, setHospitalId] = React.useState();
    const { userAccessLoading, userAccessData } = useSelector((state) => state.getUserAccess);
    const history = useHistory();
    const [hospitalFilters, setHospitalFilters] = React.useState();
    const remoteDBAccessDeviceId = useSelector((state) => state.remoteDBAccessDeviceStore);
    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));
    console.log("device---", devDeviceId)

    const [batchLabels, setBatchLabels] = React.useState([]);
    const [batchValues, setBatchValues] = React.useState([]);
    const [dateBar, setDateBar] = React.useState([]);
    const [tempBar, setTempBar] = React.useState([]);
    const { temp } = useSelector((state) => state.getDashboardTemperature);
    const [minTemp, setMinTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(32);
    const [activeButton, setActiveButton] = useState('2H');
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
    let remoteInfo = JSON.parse(localStorage.getItem('remoteInfo'));

    const genericEmit = (data) => {
        if (data) {
            socket?.emit('generic', data);
        }
    };

    useEffect(() => {
        socket?.on('accessOnDevices', (data) => {
            console.log('My Socket >> accessOnDevices ', data);
            dispatch(deviceAccessDetails(data));
           
                dispatch(deviceLogin(undefined, undefined, data?.accessBadge, data?.serialNumber));
                setAccessDetails(data);
          
        });
        socket?.on('deviceActivity', (data) => {
            console.log('My Socket >> deviceActivity ', data);
           // window.location.reload();
        });

        socket?.on('refresh', (data) => {   
            //window.location.reload()
            let deviceFilter = JSON.stringify([{ key: 'deviceId', value: devDeviceId?._id }]);
            dispatch(getDashboard(deviceFilter));
            dispatch(remoteDBAccessDeviceAction(selectedDevice || ''));
            dispatch(getTemperature(devDeviceId ? devDeviceId._id : selectedDevice, daysNumber, tempratureType));
            setActiveButton('2H');
            setDaysNumber(2);
            setTempratureType("hours");
        });
       
    }, [socket]);

   

    React.useEffect(() => {
        let deviceFilter = JSON.stringify([{ key: 'deviceId', value: devDeviceId?._id }]);
        dispatch(getDashboard(deviceFilter));
        dispatch(remoteDBAccessDeviceAction(selectedDevice || ''));
        dispatch(getTemperature(devDeviceId ? devDeviceId._id : selectedDevice, daysNumber, tempratureType));
        setActiveButton('2H');
        setDaysNumber(2);
        setTempratureType("hours");
    }, [selectedDevice]);

    React.useEffect(() => {
        dispatch(getTemperature(devDeviceId ? devDeviceId._id : selectedDevice, daysNumber, tempratureType));
    }, [activeButton])

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
        } else {
            setBarValues([]);
            setBarLabels([]);
        }
    }, [data]);

    const [batchNum, setBatchNumber] = useState('');
    React.useEffect(() => {
        if (data?.batchgroupGraph?.length > 0) {
            let gValue = data?.batchgroupGraph
                .map((value) => value.name && value.value)
                .filter((val) => val !== undefined);
            let glabel = data?.batchgroupGraph
                .flatMap((v) => [v.name]);
            //?.map((value) => value.name && value.name)
            //.filter((val) => val !== undefined);
            let gNum = data?.batchgroupGraph
                ?.map((value) => value.batchNumber && value.batchNumber)
                .filter((val) => val !== undefined);
            setBatchValues(gValue);
            setBatchLabels(glabel);
            setBatchNumber(gNum)
        }
    }, [data]);

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

    const handleDashboardFiltter = (key, value, name) => {
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

        filtersData1 = [{ key: key, value: refineValue }, { key: 'deviceId._id', value: devDeviceId?._id }, hospitalFilters];
        let filtersData = filtersData1.filter((val) => val);
        chipData = [name];

        let chipNameAndId = {
            name: name,
            id: value
        };
        let filterKeysObjects = {};

        let newFiltersObject = {
            chipNameAndId,
            chipData,
            filtersData,
            filterKeysObjects,
            staticFilters: true
        };
        dispatch(getApplyFilters(newFiltersObject));
        history.push('/dashboard/request-unit');
    };

    const handleDashboardbatches = (key, value, name, screen) => {
        localStorage.setItem('title', screen)
        console.log("value onclick---------", value);
        console.log("name--------", name)
        console.log("key----", key)
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

        filtersData1 = [{ key: key, value: refineValue }, { key: 'deviceId._id', value: devDeviceId?._id }, hospitalFilters];
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

        console.log("chipData", chipData);
        dispatch(getApplyFilters(newFiltersObject));
        history.push('/dashboard/request-batch')
    }

    const handleDashboardAletsFiltter = (key1, key2, value1, value2, name, screen) => {
        console.log('screen---',screen)
        localStorage.setItem('title', screen)
        console.log("filter---", key1, key2, value1,"--", value2, name)
        if (value1 === undefined || value1 === null || value2 === undefined) {
            return;
        }
        dispatch(setScreeenIndex(1));
        let filtersData1;
        let chipData = [];

        filtersData1 = [{ key: key1, value: value1 }, { key: key2, value: value2 }, { key: 'deviceId._id', value: devDeviceId?._id }, hospitalFilters];
        let filtersData = filtersData1.filter((val) => val);
        chipData = [name];

        let chipNameAndId = {
            name: name,
            id: value1
        };
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

                        let chipNameAndId = {
                            name: data?.bloodgroupGraph[config.dataPointIndex].name,
                            id: data?.bloodgroupGraph[config.dataPointIndex]._id
                        };
                        let filterKeysObjects = {};

                        let newFiltersObject = {
                            chipNameAndId,
                            chipData,
                            filtersData,
                            filterKeysObjects,
                            staticFilters: true
                        };
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
                        console.log("Graph click")
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
                        console.log(newFiltersObject, 'calling dashboard filters')
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
            },

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
            temp[0]?.Date?.filter((item, index) => {
                let [yearFromArray, dateFromArray] = item?.split('-');
                if (item?.split('-')[1]?.includes(currentMonth)) {
                    // filterDateArray.push(moment(item).format('MMMM Do YYYY, h:mm:ss a'));
                    // filterTimeArray.push(temp[0]?.Temparature[index]);

                    combinedData.push({ x: new Date(item).getTime(), y: temp[0]?.Temparature[index] });
                }
            });
        } else {
            toDate.setDate(toDate.getDate() - d);
            temp[0]?.Date?.filter((item, index) => {
                if (item?.split('T')[0] > toDate?.toJSON()?.split('T')[0]) {
                    // filterDateArray.push(moment(item).format('MMMM Do YYYY, h:mm:ss a'));
                    // filterTimeArray.push(temp[0]?.Temparature[index]);
                    combinedData.push({ x: new Date(item).getTime(), y: temp[0]?.Temparature[index] });
                }
            });
        }
        // console.log(combinedData,'combinedData');
        let color = [];
        const maxTemp = temp[0]?.['Max Temparature'];
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

        let tempFill = { ...lineChartGraphData?.options?.fill };
        let tempGradient = { ...tempFill['gradient'] };
        tempGradient['colorStops'] = color;
        tempFill['gradient'] = tempGradient;

        // let tempCategories = { ...lineChartGraphData?.options?.xaxis };
        // tempCategories['categories'] = filterDateArray;
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

        setLineChartGraphData(tempLineChartData);
        setDateBar(combinedData);
        setTempBar(combinedData);
    };

    const handleChangeDate = (value, number, type) => {
        console.log("VALUE--", value);
        
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

    const handleClose = () => {
        setOpen(false);
    };

    const handleScan = () => {
        setOpen(true);
        console.log(localStorage.getItem('isLoggedIn'));
        console.log(localStorage.getItem('userInfo'));
    };


    return (
        <>
            {loading || userAccessLoading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <Dialog open={open}>
                        <Grid
                            container
                            style={{
                                width: '200px',
                                height: '100px'
                            }}
                        >
                            <Button onClick={handleClose}>Close</Button>
                        </Grid>
                    </Dialog>
                    <Grid container spacing={3}>
                       

                        <Grid item xs={9} className={classes.firstDiv}>
                                <Grid container spacing={3}>

                                    <Grid
                                        item
                                        xs={12}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row-reverse',
                                        }}
                                    >
                                        <ComboBox
                                            inputRef={comboBoxRef}
                                            setSelectedDevice={setSelectedDevice}
                                            disabled={remoteInfo?.remoteLogin === "TRUE" ? true : false}
                                            name="device"
                                            placeholder={devDeviceId?.name ? devDeviceId?.name : 'Select Device'}
                                        />

                                        <IconButton >
                                            <img src={devDeviceId?.status === 1 || devDeviceId?.status === "1" ? ActiveStatusIcon : InActiveStatusIcon} style={{ width: "25px", height: "25px" }} alt={''} />
                                        </IconButton>
                                    </Grid>

                                <Grid item className={classes.cardMainTextBox} xs={6}>
                                    <Grid container direction="column" spacing={3}>
                                        <Grid item xs={12}>
                                            <Card className={classes.detailCard}>
                                                <Grid container direction="column" spacing={4}>
                                                    <Grid item className={classes.cardMainTextBox}>
                                                        <Typography className={classes.cardMainText}>
                                                            Units in stock
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item style={{ maxHeight: '158px' }}>
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
                                                            <Grid item xs={6}>
                                                                <Grid container spacing={2} direction="column">
                                                                    <Grid item>
                                                                        <Grid container justify={'space-between'}>
                                                                            <Grid item>
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
                                                                                             'Assigned'
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
                                                                            <Grid item>
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
                                                                                            'Available'
                                                                                        )
                                                                                   }
                                                                                    >{console.log("d--",data) }
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
                                                                                    In transfer
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
                                                                                    // onClick={() =>
                                                                                    //     data?.inTransferCount?.length >
                                                                                    //         0 &&
                                                                                    //     handleDashboardFiltter(
                                                                                    //         'trackId._id',
                                                                                    //         data.inTransferCount[0].id,
                                                                                    //         'Move Out'
                                                                                    //     )
                                                                                    // }
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
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                    </Grid>

                                    <Grid item className={classes.cardMainTextBox} xs={6}>
                                        <Grid container direction="column" spacing={3}>
                                            <Grid item xs={12}>
                                                <Card className={classes.detailCard} style={{ maxHeight: '158px' }}>
                                        <Grid container direction="column" spacing={4}>
                                            <Grid item className={classes.cardMainTextBox}>
                                                <Typography className={classes.cardMainText} >
                                                    Batch Products in stock
                                                </Typography>
                                            </Grid>
                                                        <Grid item style={{ maxHeight: '158px' }}>
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
                                                                                    data?.totalUnitsInBatches || 0
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
                                                        <Grid container spacing={2} direction="column" style={{ paddingTop: '20px' }}>
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
                                                                                    data?.assignedBatches?.length >
                                                                                    0 && 'pointer'
                                                                            }}
                                                                            onClick={() =>
                                                                                data?.assignedBatches?.length > 0 &&
                                                                                handleDashboardbatches(
                                                                                    'isAssigned',
                                                                                    1,
                                                                                    'Assigned',
                                                                                    "Assigned Batches"
                                                                                )
                                                                            }
                                                                        >
                                                                            {data?.assignedBatches?.length > 0
                                                                                ? data.assignedBatches[0].isAssigned
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
                                                                                    data?.availableBatches?.length >
                                                                                    0 && 'pointer'
                                                                            }}
                                                                            onClick={() =>
                                                                                data?.availableBatches?.length > 0 &&
                                                                                handleDashboardbatches(
                                                                                    'isAssigned',
                                                                                    0,
                                                                                    'Available'
                                                                                )
                                                                            }
                                                                        >{console.log("dat---", data)}
                                                                            {data?.availableBatches?.length > 0
                                                                                ? data.availableBatches[0].available
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
                                                                                data?.batchinTransferCount?.length >
                                                                                0 &&
                                                                                handleDashboardbatches(
                                                                                    'deviceTrackId.name',
                                                                                    'Move Out',
                                                                                    'Move Out',
                                                                                    'Intransit batches'
                                                                                )
                                                                            }
                                                                        >
                                                                            {data?.batchinTransferCount?.length > 0
                                                                                ? data?.batchinTransferCount[0]
                                                                                    ?.count
                                                                                : '-'}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Divider />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>


                                    <Grid item className={classes.cardMainTextBox} xs={3}>
                                        <Grid container direction="column" spacing={3}>
                                            <Grid item xs={12}>
                                                <Card className={data?.expiringIn24Hours?.count && data?.expiringIn24Hours?.count !== 0 || data?.expiringIn48Hours?.count && data?.expiringIn48Hours?.count !== 0 ? classes.smalldetailCardError : classes.smalldetailCard}>
                                                    <Grid container direction="column" spacing={3}>
                                                        <Grid item className={classes.cardMainTextBox}>
                                                            <Typography className={classes.cardMainText}>
                                                                Units nearby expiry
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item style={{ maxHeight: '158px' }}>
                                                            <Grid container alignItems="center" justify="space-between">
                                                                <Grid item>
                                                                    <Grid container direction="column">
                                                                        <Grid item>
                                                                            <Grid container spacing={2} alignItems="center">
                                                                                <Grid item className={classes.iconContainer}>
                                                                                    <AvTimerIcon className={classes.cardIcon} color="error" />
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography className={classes.iconValue} color="error">
                                                                                        <CountUp
                                                                                            start={0}
                                                                                            end={data?.expiringIn24Hours?.count + data?.expiringIn48Hours?.count}
                                                                                            duration={3}
                                                                                        />
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item sm={12} md={12} lg={6}>
                                                                    <Grid container spacing={2} direction="column">
                                                                        <Grid item sm={12} md={12} lg={12}>
                                                                            <Grid container justify={'space-between'}>
                                                                                <Grid item>
                                                                                    <Typography className={classes.cardSubText}>
                                                                                        In 24 hours
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.numberSpan}
                                                                                        style={{ cursor: data?.expiringIn24Hours?.count !== 0 && 'pointer' }}
                                                                                        onClick={() => data?.expiringIn24Hours?.count !== 0 && handleDashboardFiltter('_id', data?.expiringIn24Hours?.id, 'Expiring in 24hrs')}
                                                                                    >
                                                                                        {data?.expiringIn24Hours?.count !== 0 ? data?.expiringIn24Hours?.count : '-'}
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Grid container justify={'space-between'}>
                                                                                <Grid item>
                                                                                    <Typography className={classes.cardSubText}>
                                                                                        In 48 hours
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.numberSpan}
                                                                                        style={{ cursor: data?.expiringIn48Hours?.count !== 0 && 'pointer' }}
                                                                                        onClick={() => data?.expiringIn48Hours?.count !== 0 && handleDashboardFiltter('_id', data?.expiringIn48Hours?.id, 'Expiring in 48hrs')}
                                                                                    >
                                                                                        {data?.expiringIn48Hours?.count !== 0 ? data?.expiringIn48Hours?.count : '-'}
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






                                    <Grid item className={classes.cardMainTextBox} xs={3}>
                                        <Grid container direction="column" spacing={3}>
                                            <Grid item xs={12}>
                                                <Card style={{ marginBottom: '15px' }} className={data?.expiringIn48Hours?.count && data?.expiringIn48Hours?.count > 0 || data?.expiringIn48HoursBatches?.count && data?.expiringIn48HoursBatches?.count > 0 ? classes.smalldetailCardError : classes.smalldetailCard}>
                                                    <Grid container direction="column" spacing={3}>
                                                        <Grid item className={classes.cardMainTextBox}>
                                                            <Typography className={classes.cardMainText}>
                                                                Batch nearby expiry
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container alignItems="center" justify="space-between">
                                                                <Grid item>
                                                                    <Grid container direction="column">
                                                                        <Grid item>
                                                                            <Grid container spacing={2} alignItems="center">
                                                                                <Grid item className={classes.iconContainer}>
                                                                                    <AvTimerIcon className={classes.cardIcon} color="error" />
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography className={classes.iconValue} color="error">
                                                                                        <CountUp
                                                                                            start={0}
                                                                                            end={data?.expiringIn24HoursBatches?.count + data?.expiringIn48HoursBatches?.count}
                                                                                            duration={3}
                                                                                        />
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item sm={12} md={12} lg={6}>
                                                                    <Grid container spacing={2} direction="column">
                                                                        <Grid item sm={12} md={12} lg={12}>
                                                                            <Grid container justify={'space-between'}>
                                                                                <Grid item>
                                                                                    <Typography className={classes.cardSubText}>
                                                                                        In 24 hours
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.numberSpan}
                                                                                        style={{ cursor: data?.expiringIn24HoursBatches?.count !== 0 && 'pointer' }}
                                                                                        onClick={() => data?.expiringIn24HoursBatches?.count !== 0 && handleDashboardbatches('_id', data?.expiringIn24HoursBatches?.id, 'Expiring in 24hrs')}
                                                                                    >
                                                                                        {data?.expiringIn24HoursBatches?.count !== 0 ? data?.expiringIn24HoursBatches?.count : '-'}
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Grid container justify={'space-between'}>
                                                                                <Grid item>
                                                                                    <Typography className={classes.cardSubText}>
                                                                                        In 48 hours
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.numberSpan}
                                                                                        style={{ cursor: data?.expiringIn48HoursBatches?.count !== 0 && 'pointer' }}
                                                                                        onClick={() => data?.expiringIn48HoursBatches?.count !== 0 && handleDashboardbatches('_id', data?.expiringIn48HoursBatches?.id, 'Expiring in 48hrs')}
                                                                                    >
                                                                                        {data?.expiringIn48HoursBatches?.count !== 0 ? data?.expiringIn48HoursBatches?.count : '-'}
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






                                    <Grid item className={classes.cardMainTextBox} xs={3}>
                                        <Grid container direction="column" spacing={3}>
                                            <Grid item xs={12}>
                                                <Card className={data?.notify2?.length > 0 && data?.notify2[0]?.alertUnresolved > 0 ? classes.smalldetailCardMainError : classes.smalldetailCardMain}>
                                                    <Grid container direction="column" spacing={3}>
                                                        <Grid item className={classes.cardMainTextBox}>
                                                            <Typography className={classes.cardMainText}>
                                                                General Alert
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item style={{ maxHeight: '158px' }}>
                                                            <Grid container alignItems="center" justify="space-between">
                                                                <Grid item className={classes.gridItem}>
                                                                    <Grid container direction="column">
                                                                        <Grid item>
                                                                            <Grid container spacing={1} alignItems="center">
                                                                                <Grid item className={classes.iconContainer}>
                                                                                    <OfflineBoltIcon className={`${classes.smallCardIcon} ${classes.warning}`} color="error" />
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography className={classes.iconValue} color="error">
                                                                                        <CountUp
                                                                                            start={0}
                                                                                            end={data?.notify2?.length > 0 ? data?.notify2[0]?.alertUnresolved : '0'}
                                                                                            duration={3}
                                                                                        />
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item sm={12} md={12} lg={6}>
                                                                    <Grid container spacing={2} direction="column" style={{ paddingTop: '20px' }}>
                                                                        <Grid item sm={12} md={12} lg={12}>
                                                                            <Grid container justify={'space-between'}>
                                                                                <Grid item sm={6} md={6} lg={6}>
                                                                                    <Typography className={classes.cardSubText}>
                                                                                        Unresolved
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.numberSpan}
                                                                                        color="error"
                                                                                        style={{ cursor: data?.notify2?.length > 0 && 'pointer' }}
                                                                                        onClick={() => data?.notify2?.length > 0 && handleDashboardAletsFiltter('status', 'type', 'Unresolved', 'General Alert', 'Alerts Unresolved', 'Alerts Unresolved')}
                                                                                    >
                                                                                        {data?.notify2?.length > 0 ? data?.notify2[0]?.alertUnresolved : '-'}
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Grid container justify={'space-between'}>
                                                                                <Grid item sm={6} md={6} lg={6}>
                                                                                    <Typography className={classes.cardSubText}>
                                                                                        Resolved
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.numberSpan}
                                                                                        style={{ cursor: data?.notify?.length > 0 && 'pointer' }}
                                                                                        onClick={() => data?.notify?.length > 0 && data.notify[0]?.alertResolved && handleDashboardAletsFiltter('status', 'type', 'Resolved', 'General Alert', 'Alerts Resolved', 'Alerts Resolved')}
                                                                                    >
                                                                                        {data?.notify?.length > 0 ? data?.notify[0]?.alertResolved : '-'}
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

                                     




                                    <Grid item className={classes.cardMainTextBox} xs={3}>
                                        <Grid container direction="column" spacing={3}>
                                            <Grid item xs={12}>
                                                <Card style={{ marginBottom: '15px' }} className={data?.notify4?.length > 0 && data?.notify4[0]?.warningUnresolved > 0 ? classes.smalldetailCardMainError : classes.smalldetailCardMain}>
                                                    <Grid container direction="column" spacing={3}>
                                                        <Grid item className={classes.cardMainTextBox}>
                                                            <Typography className={classes.cardMainText}>
                                                                Critical Alert
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item style={{ maxHeight: '158px' }}>
                                                            <Grid container alignItems="center" justify="space-between">
                                                                <Grid item className={classes.gridItem}>
                                                                    <Grid container direction="column">
                                                                        <Grid item>
                                                                            <Grid container spacing={1} alignItems="center">
                                                                                <Grid item className={classes.iconContainer}>
                                                                                    <WarningIcon className={`${classes.smallCardIcon} ${classes.warning}`} color="error" />
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography className={classes.iconValue} color="error">
                                                                                        <CountUp
                                                                                            start={0}
                                                                                            end={data?.notify4?.length > 0 ? data?.notify4[0]?.warningUnresolved : '0'}
                                                                                            duration={3}
                                                                                        />
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item sm={12} md={12} lg={6}>
                                                                    <Grid container spacing={2} direction="column" style={{ paddingTop: '20px' }}>
                                                                        <Grid item sm={12} md={12} lg={12}>
                                                                            <Grid container justify={'space-between'}>
                                                                                <Grid item sm={6} md={6} lg={6}>
                                                                                    <Typography className={classes.cardSubText}>
                                                                                        Unresolved
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.numberSpan}
                                                                                        color="error"
                                                                                        style={{ cursor: data?.notify4?.length > 0 && 'pointer' }}
                                                                                        onClick={() => data?.notify4?.length > 0 && handleDashboardAletsFiltter('status', 'type', 'Unresolved', 'Critical Alert', 'Critical Unresolved', 'Critical Unresolved')}
                                                                                    >
                                                                                        {data?.notify4?.length > 0 ? data?.notify4[0]?.warningUnresolved : '-'}
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Grid container justify={'space-between'}>
                                                                                <Grid item sm={6} md={6} lg={6}>
                                                                                    <Typography className={classes.cardSubText}>
                                                                                        Resolved
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Typography
                                                                                        className={classes.numberSpan}
                                                                                        style={{ cursor: data?.notify3?.length > 0 && 'pointer' }}
                                                                                        onClick={() => data?.notify3?.length > 0 && handleDashboardAletsFiltter('status', 'type', 'Resolved', 'Critical Alert', 'Critical resolved', 'Critical resolved')}
                                                                                    >
                                                                                        {data?.notify3?.length > 0 ? data?.notify3[0]?.warningResolved : '-'}
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
                                <Grid container spacing={3} style={{ marginTop: 15 }}>
                                     

                                    <Grid item xs={12} style={{ display: 'flex' }} >
                                        <Grid item xs={12}>
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
                                        <Grid item xs={12} >
                                            <Card className={classes.detailCard}>
                                                <Grid container style={{ marginBottom: '0px' }} >
                                                    <Typography color="primary" className={classes.smalldetailTitle}>
                                                        Batch products
                                                    </Typography>
                                                </Grid>
                                                {data && <BarChart data={batchBarChart} />}
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            <Grid item className={classes.cardMainTextBox} xs={12}>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={3}>
                                            <Grid item xs={12}>
                                                <Card className={classes.bigDetailCard}>
                                                    <Grid
                                                        container
                                                        direction="column"
                                                        spacing={3}
                                                        style={{ paddingTop: '28px' }}
                                                    >
                                                        <Grid
                                                            container
                                                            alignItems="center"
                                                            className={classes.cardMainTextBox}
                                                        >
                                                            <Grid item xs={5}>
                                                                <Typography className={classes.cardMainText}>
                                                                    Temperature
                                                                </Typography>
                                                            </Grid>
                                                            {/* {tempBar.length && dateBar.length ? ( */}
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
                                                                        onClick={() => handleChangeDate("2H", 2, "hours")}
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
                                                                        onClick={() => handleChangeDate('4H', 4, "hours")}
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
                                                                        onClick={() => handleChangeDate('8H', 8 , "hours")}
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
                                                                        onClick={() => handleChangeDate('12H', 12 , "hours")}
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
                                                                    onClick={() => handleChangeDate('1D', 1 , "days")}
                                                                >
                                                                    1D
                                                                </Button>
                                                                <Button
                                                                    onClick={() => handleChangeDate('5D', 5 ,"days")}
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
                                                                    onClick={() => handleChangeDate('15D', 15 ,"days")}
                                                                >
                                                                    15D
                                                                </Button>
                                                                {/*<Button*/}
                                                                {/*     color={activeButton === '30D' ? 'primary' : ''}*/}
                                                                {/*    className={*/}
                                                                {/*        activeButton === '30D'*/}
                                                                {/*            ? classes.selectedButtonGroup*/}
                                                                {/*            : ''*/}
                                                                {/*    }*/}
                                                                {/*    onClick={() => handleChangeDate('30D', 30 ,"days")}*/}
                                                                {/*>*/}
                                                                {/*    30D*/}
                                                                {/*</Button>*/}
                                                                {/*<Button*/}
                                                                {/*    onClick={() => handleChangeDate('1M', 1 , "month")}*/}
                                                                {/*    className={*/}
                                                                {/*        activeButton === '1M'*/}
                                                                {/*            ? classes.selectedButtonGroup*/}
                                                                {/*            : ''*/}
                                                                {/*    }*/}
                                                                {/*    color={activeButton === '1M' ? 'primary' : ''}*/}
                                                                {/*>*/}
                                                                {/*    1M*/}
                                                                {/*</Button>*/}
                                                                {/*<Button*/}
                                                                {/*    onClick={() => handleChangeDate('1Y', 1 , "years")}*/}
                                                                {/*    className={*/}
                                                                {/*        activeButton === '1Y'*/}
                                                                {/*            ? classes.selectedButtonGroup*/}
                                                                {/*            : ''*/}
                                                                {/*    }*/}
                                                                {/*    color={activeButton === '1Y' ? 'primary' : ''}*/}
                                                                {/*>*/}
                                                                {/*    1Y*/}
                                                                {/*</Button>*/}
                                                            </ButtonGroup>
                                                            {/* ) : null} */}
                                                        </Grid>

                                                        {tempBar.length && dateBar.length ? (
                                                            <Grid item>
                                                                <LineChart data={lineChartGraphData} />
                                                            </Grid>
                                                        ) : (
                                                            <Grid item>
                                                                <NoData />{' '}
                                                            </Grid>
                                                        )}
                                                    </Grid>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            </Grid>
                            {
                                devDeviceId?.isBadgeAccessAllowed === "1" ? (
                                    <Grid item className={classes.sideBar}>
                                        <Grid
                                            container
                                            justify="center"
                                            style={{ marginTop: '30px' }}
                                            spacing={2}
                                            direction="column"
                                        >
                                            <Grid item>
                                                <Typography style={{ fontWeight: 300 }} variant="h5" className={classes.tipsTypo}>
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
                                                    disabled={!devDeviceId}
                                                >
                                                    Access Device
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>) : (
                                        <Grid item>
                                        </Grid>)
                            }
                    </Grid>
                </>
            )}
            <DeviceLogin comboBoxRef={comboBoxRef} open={deviceLoginn} setOpenLogin={setDeviceLogin} noAuth={false} />
        </>
    );
};

export default RemoteDashboardPage;
