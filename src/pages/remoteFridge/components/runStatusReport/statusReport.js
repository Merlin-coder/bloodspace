import React, { useEffect, useState } from 'react';
import { useStyles } from './style';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Divider, Grid, Paper, Typography, useTheme } from '@material-ui/core';
import CustomButton from '../../../../components/button';
import BarChart from '../../../dashboard/BarChart';
import { getStatusReport, handleBredcrumbsNameAction } from '../../../../redux/actions/remoteDashboardActions';
import statusReport from './data.js';
import { getApplyFilters } from 'redux/actions/filters/globalFilterAction';

const cards = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' }
];

const StatusReport = (props) => {
    const { handleDeviceExit, handleCardClick, handleremoveEdqbatchClick } = props;
    const history = useHistory();

    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const { data, loading } = useSelector((state) => state.getStatusReport);
    console.log('d-----', data);
    // For Bar chart
    const [avlBarLabels, setAvlBarLabels] = React.useState([]);
    const [avlBarValues, setAvlBarValues] = React.useState([]);
    const [asgnBarLabels, setAsgnBarLabels] = React.useState([]);
    const [asgnBarValues, setAsgnBarValues] = React.useState([]);
    const [totalBarLabels, setTotalBarLabels] = React.useState([]);
    const [totalBarValues, setTotalBarValues] = React.useState([]);

    const [avlbatchBarLabels, setAvlbatchBarLabels] = React.useState([]);
    const [avlbatchBarValues, setAvlbatchBarValues] = React.useState([]);
    const [asgnbatchBarLabels, setAsgnbatchBarLabels] = React.useState([]);
    const [asgnbatchBarValues, setAsgnbatchBarValues] = React.useState([]);
    const [totalbatchBarLabels, setTotalbatchBarLabels] = React.useState([]);
    const [totalbatchBarValues, setTotalbatchBarValues] = React.useState([]);

    const [assignedUnits, setAssignedUnits] = React.useState([]);
    const [assignedBatches, setAssignedBatches] = React.useState([]);
    const [availableUnits, setAvailableUnits] = React.useState([]);
    const [availableBatches, setAvailableBatches] = React.useState([]);
    const [totalUnits, setTotalUnits] = React.useState([]);
    const [totalBatches, setTotalBatches] = React.useState([]);
    const [edqCountsUnits, setEdqCountsUnits] = React.useState([]);
    const [edqCountsBatch, setEdqCountsBatch] = React.useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [barDataType, setBarDataType] = useState(0);
    const [isDetailsView, setIsDetailsView] = useState(false);
    const [countExp24Hr, setCountExp24Hr] = useState(0);
    const [countExp48Hr, setCountExp48Hr] = useState(0);
    const [countExp72Hr, setCountExp72Hr] = useState(0);
    const [batchcountExp24Hr, setBatchCountExp24Hr] = useState(0);
    const [batchcountExp48Hr, setBatchCountExp48Hr] = useState(0);
    const [batchcountExp72Hr, setBatchCountExp72Hr] = useState(0);


    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));

    const [stackAvlValues, setStackAvlValues] = React.useState([]);
    const [stackAsgnValues, setStackAsgnValues] = React.useState([]);

    const [stackAvlbatchValues, setStackAvlbatchValues] = React.useState([]);
    const [stackAsgnbatchValues, setStackAsgnbatchValues] = React.useState([]);

    console.log('devDeviceId', devDeviceId);
    React.useEffect(() => {
        let deviceId = devDeviceId?._id;
        console.log('device Id', deviceId);
        if (deviceId !== undefined) {
            dispatch(getStatusReport(deviceId));
        }
    }, []);

    /* *************************** data from Sample json starts here *************************** */
    /*React.useEffect(() => {
        setAvailableUnits(statusReport.availableUnits);
        setAssignedUnits(statusReport.assignedUnits);
        setTotalUnits(statusReport.totalUnitsInStock);
        setEdqCounts(statusReport.edqCount);
        setCountExp24Hr(statusReport.expiringIn24Hours);
        setCountExp48Hr(statusReport.expiringIn48Hours);
        setCountExp72Hr(statusReport.expiringIn72Hours);
        let totalGLabel = [];
        let assignArr, avlArr;
        let tempAsgnLabels, tempAsgnValues, tempAvlLabels, tempAvlValues;

        //TODO: Array of all the Available label-values
        if (statusReport?.available?.length > 0) {
            avlArr = statusReport?.available;
            tempAvlValues = statusReport?.available
                .map((value) => value.name && value.count)
                .filter((val) => val !== undefined);
            tempAvlLabels = statusReport?.available
                ?.map((value) => value.name && value.name)
                .filter((val) => val !== undefined);

            setAvlBarValues(tempAvlValues);
            setAvlBarLabels(tempAvlLabels);
        }
        //TODO: Array of all the Assigned label-values
        if (statusReport?.assigned?.length > 0) {
            assignArr = statusReport?.assigned;
            tempAsgnValues = statusReport?.assigned
                .map((value) => value.name && value.count)
                .filter((val) => val !== undefined);
            tempAsgnLabels = statusReport?.assigned
                ?.map((value) => value.name && value.name)
                .filter((val) => val !== undefined);

            setAsgnBarValues(tempAsgnValues);
            setAsgnBarLabels(tempAsgnLabels);
        }
        //TODO: Array of all the labels for total units in stock
        if (tempAsgnLabels !== undefined && tempAvlLabels !== undefined) {
            const totalGLabel2 = new Set([...tempAsgnLabels, ...tempAvlLabels]);
            totalGLabel = Array.from(totalGLabel2);
            setTotalBarLabels(totalGLabel);
        } else if (tempAsgnLabels !== undefined) {
            totalGLabel = tempAsgnLabels;
            setTotalBarLabels(tempAsgnLabels);
        } else if (tempAvlLabels !== undefined) {
            totalGLabel = tempAvlLabels;
            setTotalBarLabels(tempAvlLabels);
        }
        // console.log('===== totalGLabel ===== ', totalGLabel);

        //TODO: Array of total values for all the labels for total units in stock
        let gValue = [];
        for (let i = 0, l = avlArr.length; i < l; i++) {
            let isFound = false;
            for (let j = 0, ll = assignArr.length; j < ll; j++) {
                if (avlArr[i].name === assignArr[j].name) {
                    let count = assignArr[j].count + avlArr[i].count;
                    gValue.push(count);
                    isFound = true;
                    break;
                }
            }
            if (!isFound) gValue.push(avlArr[i].count);
        }
        setTotalBarValues(gValue);
        // console.log('===== total values ===== ', gValue);

        //TODO: Array of all the Assigned values for total units in stock
        let finalAsnValues = [];
        for (let i = 0, l = totalGLabel.length; i < l; i++) {
            let isFound = false;
            for (let j = 0, ll = assignArr.length; j < ll; j++) {
                if (assignArr[j].name === undefined) {
                    finalAsnValues.push(0);
                    isFound = true;
                    break;
                } else if (assignArr[j].name !== undefined && totalGLabel[i] === assignArr[j].name) {
                    finalAsnValues.push(assignArr[j].count);
                    isFound = true;
                    break;
                }
            }
            if (!isFound) finalAsnValues.push(0);
        }
        setStackAsgnValues(finalAsnValues);

        //TODO: Array of all the Available values for total units in stock
        let finalAvlValues = [];
        for (let i = 0, l = totalGLabel.length; i < l; i++) {
            let isFound = false;
            for (let j = 0, ll = avlArr.length; j < ll; j++) {
                if (avlArr[j].name === undefined) {
                    finalAvlValues.push(0);
                    isFound = true;
                    break;
                } else if (avlArr[j].name !== undefined && totalGLabel[i] === avlArr[j].name) {
                    finalAvlValues.push(avlArr[j].count);
                    isFound = true;
                    break;
                }
            }
            if (!isFound) finalAvlValues.push(0);
        }
        setStackAvlValues(finalAvlValues);

        // console.log('Calculated final finalAsnValues -- ', finalAsnValues);
        // console.log('Calculated final finalAvlValues -- ', finalAvlValues);
    }, [statusReport]);*/
    /* *************************** data from Sample json ends here *************************** */

    React.useEffect(() => {
        setAvailableUnits(data?.availableUnits);
        setAssignedUnits(data?.assignedUnits);
        setTotalUnits(data?.totalUnitsInStock);
        setTotalBatches(data?.totalUnitsInBatches);
        setAssignedBatches(data?.assignedBatches);
        setAvailableBatches(data?.availableBatches);
        if (devDeviceId?._id) {
            setEdqCountsUnits(data?.unitEDQs);
            setEdqCountsBatch(data?.batchEDQs);
        } else {
            setEdqCountsUnits('Please Select Device');
            setEdqCountsBatch('Please Select Device');
        }
        setCountExp24Hr(data?.expiringIn24Hours);
        setCountExp48Hr(data?.expiringIn48Hours);
        setCountExp72Hr(data?.expiringIn72Hours);
        setBatchCountExp24Hr(data?.expiringIn24HoursBatch);
        setBatchCountExp48Hr(data?.expiringIn48HoursBatch);
        setBatchCountExp72Hr(data?.expiringIn72HoursBatch);


        let totalGLabel = [];
        let assignArr = [],
            avlArr = [];
        let tempAsgnLabels, tempAsgnValues, tempAvlLabels, tempAvlValues;

        //TODO: Array of all the Available label-values
        if (data?.available?.length > 0) {
            avlArr = data?.available;
            tempAvlValues = data?.available
                .map((value) => value.name && value.count)
                .filter((val) => val !== undefined);
            tempAvlLabels = data?.available
                ?.map((value) => value.name && value.name)
                .filter((val) => val !== undefined);

            setAvlBarValues(tempAvlValues);
            setAvlBarLabels(tempAvlLabels);
        }
        //TODO: Array of all the Assigned label-values
        if (data?.assigned?.length > 0) {
            assignArr = data?.assigned;
            tempAsgnValues = data?.assigned
                .map((value) => value.name && value.count)
                .filter((val) => val !== undefined);
            tempAsgnLabels = data?.assigned
                ?.map((value) => value.name && value.name)
                .filter((val) => val !== undefined);

            setAsgnBarValues(tempAsgnValues);
            setAsgnBarLabels(tempAsgnLabels);
        }
        //TODO: Array of all the labels for total units in stock
        if (tempAsgnLabels !== undefined && tempAvlLabels !== undefined) {
            const totalGLabel2 = new Set([...tempAsgnLabels, ...tempAvlLabels]);
            totalGLabel = Array.from(totalGLabel2);
            setTotalBarLabels(totalGLabel);
        } else if (tempAsgnLabels !== undefined) {
            totalGLabel = tempAsgnLabels;
            setTotalBarLabels(tempAsgnLabels);
        } else if (tempAvlLabels !== undefined) {
            totalGLabel = tempAvlLabels;
            setTotalBarLabels(tempAvlLabels);
        }
        // console.log('===== totalGLabel ===== ', totalGLabel);

        //TODO: Array of total values for all the labels for total units in stock
        let gValue = [];
        for (let i = 0, l = avlArr.length; i < l; i++) {
            let isFound = false;
            for (let j = 0, ll = assignArr.length; j < ll; j++) {
                if (avlArr[i].name === assignArr[j].name) {
                    let count = assignArr[j].count + avlArr[i].count;
                    gValue.push(count);
                    isFound = true;
                    break;
                }
            }
            if (!isFound) gValue.push(avlArr[i].count);
        }
        setTotalBarValues(gValue);
        // console.log('===== total values ===== ', gValue);

        //TODO: Array of all the Assigned values for total units in stock
        let finalAsnValues = [];
        for (let i = 0, l = totalGLabel.length; i < l; i++) {
            let isFound = false;
            for (let j = 0, ll = assignArr.length; j < ll; j++) {
                if (assignArr[j].name === undefined) {
                    finalAsnValues.push(0);
                    isFound = true;
                    break;
                } else if (assignArr[j].name !== undefined && totalGLabel[i] === assignArr[j].name) {
                    finalAsnValues.push(assignArr[j].count);
                    isFound = true;
                    break;
                }
            }
            if (!isFound) finalAsnValues.push(0);
        }
        setStackAsgnValues(finalAsnValues);

        //TODO: Array of all the Available values for total units in stock
        let finalAvlValues = [];
        for (let i = 0, l = totalGLabel.length; i < l; i++) {
            let isFound = false;
            for (let j = 0, ll = avlArr.length; j < ll; j++) {
                if (avlArr[j].name === undefined) {
                    finalAvlValues.push(0);
                    isFound = true;
                    break;
                } else if (avlArr[j].name !== undefined && totalGLabel[i] === avlArr[j].name) {
                    finalAvlValues.push(avlArr[j].count);
                    isFound = true;
                    break;
                }
            }
            if (!isFound) finalAvlValues.push(0);
        }
        setStackAvlValues(finalAvlValues);
    }, [data]);


    useEffect(() => {
        let totalbatchGLabel = [];
        let assignBatchArr = [],
            avlBatchArr = [];
        let tempAsgnbatchLabels, tempAsgnbatchValues, tempAvlbatchLabels, tempAvlbatchValues;
        console.log('batchbar')
        //TODO: Array of all the Available label-values
        if (data?.batchAvailable?.length > 0) {
            avlBatchArr = data?.batchAvailable;
            tempAvlbatchValues = data?.batchAvailable
                .map((value) => value.name && value.count)
                .filter((val) => val !== undefined);
            tempAvlbatchLabels = data?.batchAvailable
                ?.map((value) => value.name && value.name)
                .filter((val) => val !== undefined);

            setAvlbatchBarValues(tempAvlbatchValues);
            setAvlbatchBarLabels(tempAvlbatchLabels);
        }
        //TODO: Array of all the Assigned label-values
        if (data?.batchAssigned?.length > 0) {
            assignBatchArr = data?.batchAssigned;
            tempAsgnbatchValues = data?.batchAssigned
                .map((value) => value.name && value.count)
                .filter((val) => val !== undefined);
            tempAsgnbatchLabels = data?.batchAssigned
                ?.map((value) => value.name && value.name)
                .filter((val) => val !== undefined);

            setAsgnbatchBarValues(tempAsgnbatchValues);
            setAsgnbatchBarLabels(tempAsgnbatchLabels);
        }
        //TODO: Array of all the labels for total units in stock
        if (tempAsgnbatchLabels !== undefined && tempAvlbatchLabels !== undefined) {
            const totalbatchGLabel2 = new Set([...tempAsgnbatchLabels, ...tempAvlbatchLabels]);
            totalbatchGLabel = Array.from(totalbatchGLabel2);
            setTotalbatchBarLabels(totalbatchGLabel);
        } else if (tempAsgnbatchLabels !== undefined) {
            totalbatchGLabel = tempAsgnbatchLabels;
            setTotalbatchBarLabels(tempAsgnbatchLabels);
        } else if (tempAvlbatchLabels !== undefined) {
            totalbatchGLabel = tempAvlbatchLabels;
            setTotalbatchBarLabels(tempAvlbatchLabels);
        }
        // console.log('===== totalGLabel ===== ', totalGLabel);

        //TODO: Array of total values for all the labels for total units in stock
        let gbatchValue = [];
        for (let i = 0, l = avlBatchArr.length; i < l; i++) {
            let isFound = false;
            for (let j = 0, ll = assignBatchArr.length; j < ll; j++) {
                if (avlBatchArr[i].name === assignBatchArr[j].name) {
                    let count = assignBatchArr[j].count + avlBatchArr[i].count;
                    gbatchValue.push(count);
                    isFound = true;
                    break;
                }
            }
            if (!isFound) gbatchValue.push(avlBatchArr[i].count);
        }
        setTotalbatchBarValues(gbatchValue);
        // console.log('===== total values ===== ', gValue);

        //TODO: Array of all the Assigned values for total units in stock
        let finalAsnbatchValues = [];
        for (let i = 0, l = totalbatchGLabel.length; i < l; i++) {
            let isFound = false;
            for (let j = 0, ll = assignBatchArr.length; j < ll; j++) {
                if (assignBatchArr[j].name === undefined) {
                    finalAsnbatchValues.push(0);
                    isFound = true;
                    break;
                } else if (assignBatchArr[j].name !== undefined && totalbatchGLabel[i] === assignBatchArr[j].name) {
                    finalAsnbatchValues.push(assignBatchArr[j].count);
                    isFound = true;
                    break;
                }
            }
            if (!isFound) finalAsnbatchValues.push(0);
        }
        setStackAsgnbatchValues(finalAsnbatchValues);

        //TODO: Array of all the Available values for total units in stock
        let finalAvlbatchValues = [];
        for (let i = 0, l = totalbatchGLabel.length; i < l; i++) {
            let isFound = false;
            for (let j = 0, ll = avlBatchArr.length; j < ll; j++) {
                if (avlBatchArr[j].name === undefined) {
                    finalAvlbatchValues.push(0);
                    isFound = true;
                    break;
                } else if (avlBatchArr[j].name !== undefined && totalbatchGLabel[i] === avlBatchArr[j].name) {
                    finalAvlbatchValues.push(avlBatchArr[j].count);
                    isFound = true;
                    break;
                }
            }
            if (!isFound) finalAvlbatchValues.push(0);
        }
        setStackAvlbatchValues(finalAvlbatchValues);
    },[data])

    /*  const redirectTORDashBoard = () => {
          handleDeviceExit();
          dispatch(clearDeviceBatchesResponse());
          dispatch(clearData());
          dispatch(deviceLogout());
          history.push('/dashboard/remote-dashboard');
      };*/

    const handlePrintReportClick = () => {};

    const handleViewDetailsClick = () => {
        // setIsDetailsView(true);
        handleCardClick('removeEDQs');
       
    };
    const handleViewBatchDetailsClick = () => {
        handleCardClick('removeEDQs');
    }

    const handleTotalBatchClick = (key, value, name, screen) => {
        setBarDataType(0);
       
        localStorage.setItem('title', screen);
        console.log('value onclick---------', value);
        console.log('name--------', name);
        console.log('key----', key);
        if (value === undefined || value === null) {
            return;
        }
        //dispatch(setScreeenIndex(1));
        let filtersData1;
        let chipData = [];
        let refineValue;
        if (value.isArray) {
            refineValue = [...value];
        } else {
            refineValue = value;
        }

        filtersData1 = [{ key: key, value: refineValue }, { key: 'deviceId._id', value: devDeviceId?._id }];
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

    const handleTotalUnitsClick = (key, value, name, screen) => {
        setBarDataType(0);

        localStorage.setItem('title', screen);
        console.log('value onclick---------', value);
        console.log('name--------', name);
        console.log('key----', key);
        if (value === undefined || value === null) {
            return;
        }
        //dispatch(setScreeenIndex(1));
        let filtersData1;
        let chipData = [];
        let refineValue;
        if (value.isArray) {
            refineValue = [...value];
        } else {
            refineValue = value;
        }

        filtersData1 = [{ key: key, value: refineValue }, { key: 'deviceId._id', value: devDeviceId?._id }];
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
        history.push('/dashboard/request-unit');
    };

    const handleAvailableClick = (key, value, name, screen) => {
        setBarDataType(1);
        let filtersData1;
        let chipData = [];
        let refineValue;
        if (value.isArray) {
            refineValue = [...value];
        } else {
            refineValue = value;
        }
        filtersData1 = [{ key: key, value: refineValue }, { key: 'deviceId._id', value: devDeviceId?._id }];
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
    const handleAssignedClick = (key, value, name, screen) => {
        setBarDataType(2);
        let filtersData1;
        let chipData = [];
        let refineValue;
        if (value?.isArray) {
            refineValue = [...value];
        } else {
            refineValue = value;
        }
        filtersData1 = [{ key: key, value: refineValue }, { key: 'deviceId._id', value: devDeviceId?._id }];
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
        //dispatch(setScreeenIndex(1));
        let filtersData1;
        let chipData = [];
        let refineValue;
        if (value.isArray) {
            refineValue = [...value];
        } else {
            refineValue = value;
        }

        filtersData1 = [{ key: key, value: refineValue }, { key: 'deviceId._id', value: devDeviceId?._id }];
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

    const avlBarChart = {
        options: {
            tooltip: {
                enabled: false
            },
            yaxis: {
                tickAmount: Math.max.apply(Math, avlBarValues) < 4 ? 2 : 4,
                max:
                    Math.max.apply(Math, avlBarValues) < 4
                        ? Math.max.apply(Math, avlBarValues) + Math.max.apply(Math, avlBarValues) * 1
                        : Math.max.apply(Math, avlBarValues) + Math.max.apply(Math, avlBarValues) * 0.2,
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
                        /*dispatch(setScreeenIndex(1));
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
                         history.push('/dashboard/request-unit');*/
                    }
                }
            },
            xaxis: {
                categories: avlBarLabels,
                tooltip: {
                    enabled: false
                }
            }
        },
        series: [
            {
                name: 'series-1',
                data: avlBarValues
            }
        ]
    };

    const avlbatchBarChart = {
        options: {
            tooltip: {
                enabled: false
            },
            yaxis: {
                tickAmount: Math.max.apply(Math, avlBarValues) < 4 ? 2 : 4,
                max:
                    Math.max.apply(Math, avlBarValues) < 4
                        ? Math.max.apply(Math, avlBarValues) + Math.max.apply(Math, avlBarValues) * 1
                        : Math.max.apply(Math, avlBarValues) + Math.max.apply(Math, avlBarValues) * 0.2,
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
                        /*dispatch(setScreeenIndex(1));
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
                         history.push('/dashboard/request-unit');*/
                    }
                }
            },
            xaxis: {
                categories: avlbatchBarLabels,
                tooltip: {
                    enabled: false
                }
            }
        },
        series: [
            {
                name: 'series-1',
                data: avlbatchBarValues
            }
        ]
    };

    const asgnBarChart = {
        options: {
            tooltip: {
                enabled: false
            },
            yaxis: {
                tickAmount: Math.max.apply(Math, asgnBarValues) < 4 ? 2 : 4,
                max:
                    Math.max.apply(Math, asgnBarValues) < 4
                        ? Math.max.apply(Math, asgnBarValues) + Math.max.apply(Math, asgnBarValues) * 1
                        : Math.max.apply(Math, asgnBarValues) + Math.max.apply(Math, asgnBarValues) * 0.2,
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
            colors: ['#a2c6e0'],
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
                    dataPointSelection: function (event, chartContext, config, selectedDataPoints) {}
                }
            },
            xaxis: {
                categories: asgnBarLabels,
                tooltip: {
                    enabled: false
                }
            }
        },
        series: [
            {
                name: 'series-1',
                data: asgnBarValues
            }
        ]
    };

    const asgnbatchBarChart = {
        options: {
            tooltip: {
                enabled: false
            },
            yaxis: {
                tickAmount: Math.max.apply(Math, asgnBarValues) < 4 ? 2 : 4,
                max:
                    Math.max.apply(Math, asgnBarValues) < 4
                        ? Math.max.apply(Math, asgnBarValues) + Math.max.apply(Math, asgnBarValues) * 1
                        : Math.max.apply(Math, asgnBarValues) + Math.max.apply(Math, asgnBarValues) * 0.2,
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
            colors: ['#a2c6e0'],
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
                    dataPointSelection: function (event, chartContext, config, selectedDataPoints) { }
                }
            },
            xaxis: {
                categories: asgnbatchBarLabels,
                tooltip: {
                    enabled: false
                }
            }
        },
        series: [
            {
                name: 'series-1',
                data: asgnbatchBarValues
            }
        ]
    };

    const totalBarChart = {
        options: {
            tooltip: {
                enabled: false
            },
            yaxis: {
                tickAmount: Math.max.apply(Math, totalBarValues) < 4 ? 2 : 4,
                max:
                    Math.max.apply(Math, totalBarValues) < 4
                        ? Math.max.apply(Math, totalBarValues) + Math.max.apply(Math, totalBarValues) * 1
                        : Math.max.apply(Math, totalBarValues) + Math.max.apply(Math, totalBarValues) * 0.2,
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
            colors: ['#a2c6e0', theme.palette.primary.main],
            style: {
                cursor: 'pointer'
            },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                    fontSize: '14px',
                    colors: ['#b6b6b6', '#304758']
                    // colors: ['#fff', '#304758']
                }
            },
            chart: {
                id: 'basic-bar',
                stacked: true,
                events: {
                    dataPointMouseEnter: function (event) {
                        if (event?.path) {
                            event.path[0].style.cursor = 'pointer';
                        }
                    },
                    dataPointSelection: function (event, chartContext, config, selectedDataPoints) {}
                }
            },
            xaxis: {
                categories: totalBarLabels,
                tooltip: {
                    enabled: false
                }
            }
        },
        series: [
            {
                name: 'Assigned',
                data: stackAsgnValues
            },
            {
                name: 'Unassigned',
                data: stackAvlValues
            }
        ]
    };

    const totalbatchBarChart = {
        options: {
            tooltip: {
                enabled: false
            },
            yaxis: {
                tickAmount: Math.max.apply(Math, totalBarValues) < 4 ? 2 : 4,
                max:
                    Math.max.apply(Math, totalBarValues) < 4
                        ? Math.max.apply(Math, totalBarValues) + Math.max.apply(Math, totalBarValues) * 1
                        : Math.max.apply(Math, totalBarValues) + Math.max.apply(Math, totalBarValues) * 0.2,
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
            colors: ['#a2c6e0', theme.palette.primary.main],
            style: {
                cursor: 'pointer'
            },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                    fontSize: '14px',
                    colors: ['#b6b6b6', '#304758']
                    // colors: ['#fff', '#304758']
                }
            },
            chart: {
                id: 'basic-bar',
                stacked: true,
                events: {
                    dataPointMouseEnter: function (event) {
                        if (event?.path) {
                            event.path[0].style.cursor = 'pointer';
                        }
                    },
                    dataPointSelection: function (event, chartContext, config, selectedDataPoints) { }
                }
            },
            xaxis: {
                categories: totalbatchBarLabels,
                tooltip: {
                    enabled: false
                }
            }
        },
        series: [
            {
                name: 'Assigned',
                data: stackAsgnbatchValues
            },
            {
                name: 'Unassigned',
                data: stackAvlbatchValues
            }
        ]
    };

    console.log(edqCountsUnits, 'edqCounts');

    return (
        <>
            {!isDetailsView ? (
                <Grid container spacing={2}>
                    <Grid md={8} xs={12} container direction="column" spacing={2} style={{ padding: 20 }}>
                        <Paper elevation={0} style={{ padding: 20 }}>
                            <Grid container style={{ marginBottom: 20 }} className={classes.xs4Grid}>
                                <Grid container>
                                    <Grid item>
                                        <Typography variant="h6" color="primary">
                                            UNITS STATUS REPORT
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Grid container direction="row-reverse">
                                            <Grid item>
                                                <CustomButton
                                                    onClick={handlePrintReportClick}
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Print Report
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginTop: 20 }}>
                                    <Grid item lg={4} md={12} sm={12} xs={12}
                                        style={{
                                            cursor:
                                                data?.
                                                    totalUnitsInStock !== 0 && 'pointer'
                                        }}
                                        onClick={() => handleTotalUnitsClick(
                                            'deviceId._id',
                                            '622b295123481e3ee86cb4a0',
                                            'Theater Fridge'
                                        )}
                                        >
                                        <Card className={barDataType == 0 ? classes.cardSelected : classes.cardNormal}>
                                            <Grid container direction="column" spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Typography className={classes.cardMainText}>
                                                        UNITS IN STOCK
                                                    </Typography>
                                                    <Typography className={classes.cardValueText}>
                                                        {totalUnits}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12} xs={12}
                                        style={{
                                            cursor:
                                                data?.available?.length >
                                                0 && 'pointer'
                                        }}
                                        onClick={() => handleAvailableClick(
                                        'isAssigned',
                                        0,
                                        'Available',
                                        'Available Units')}>
                                        <Card className={barDataType == 1 ? classes.cardSelected : classes.cardNormal}>
                                            <Grid container direction="column" spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Typography color="primary" className={classes.smalldetailTitle}>
                                                        {/*<i*/}
                                                        {/*    className={'fa-square'}*/}
                                                        {/*    style={{ fontSize: 20, color: theme.palette.primary.main }}*/}
                                                        {/*    aria-hidden="true"*/}
                                                        {/*/>{' '}*/}
                                                        UNASSIGNED
                                                    </Typography>
                                                    <Typography className={classes.cardValueText}>
                                                        {availableUnits}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12} xs={12}
                                        style={{
                                            cursor:
                                                data?.assigned?.length >
                                                0 && 'pointer'
                                        }}
                                        onClick={() => handleAssignedClick(
                                        'isAssigned',
                                        1,
                                        'Assigned',
                                        'Assigned Units')}>
                                        <Card className={barDataType == 2 ? classes.cardSelected : classes.cardNormal}>
                                            <Grid container direction="column" spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Typography color="primary" className={classes.smalldetailTitle}>
                                                        ASSIGNED
                                                    </Typography>
                                                    <Typography className={classes.cardValueText}>
                                                        {assignedUnits}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                </Grid>

                                {/*Grid for graph starts here*/}
                                <Grid item xs style={{ marginTop: 20 }}>
                                    <Divider
                                        variant="fullWidth"
                                        orientation="horizontal"
                                        style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 50 }}
                                    />

                                    {data && (
                                        <BarChart
                                            data={
                                                barDataType == 2
                                                    ? asgnBarChart
                                                    : barDataType == 1
                                                    ? avlBarChart
                                                    : totalBarChart
                                            }
                                        />
                                    )}
                                </Grid>
                                {/*Grid for graph ends here*/}
                            </Grid>
                            {/*Grid for counts starts here*/}
                            <Grid item xs style={{ marginTop: 20 }}>
                                <Divider
                                    variant="fullWidth"
                                    orientation="horizontal"
                                    style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10 }}
                                />

                                <Grid container spacing={3}>
                                    <Grid item md={4} xs={4}>
                                        <Grid container direction="column" spacing={2} align="center">
                                            <Grid item justify="center">
                                                <Typography variant="h6" style={{ color: theme.palette.primary.main }}>
                                                    Units expiring in 24 hours
                                                </Typography>
                                                <Typography
                                                    variant="h4"
                                                    style={{
                                                        color: theme.palette.primary.main,
                                                        marginTop: 10,
                                                        cursor: data?.expiringIn24Hours?.count !== 0 && 'pointer'
                                                    }}

                                                    onClick={() => data?.expiringIn24Hours?.count !== 0 && handleAssignedClick('_id', data?.expiringIn24Hours?.id, 'Expiring in 24hrs')}

                                                >
                                                    {countExp24Hr === 0 ? '-' : countExp24Hr}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={4} xs={4}>
                                        <Grid container direction="column" spacing={2} align="center">
                                            <Grid item justify="center">
                                                <Typography variant="h6" style={{ color: theme.palette.primary.main }}>
                                                    Units expiring in 48 hours
                                                </Typography>
                                                <Typography
                                                    variant="h4"
                                                    style={{
                                                        color: theme.palette.primary.main,
                                                        marginTop: 10,
                                                        cursor: data?.expiringIn48Hours?.count !== 0 && 'pointer'
                                                    }}

                                                    onClick={() => data?.expiringIn48Hours?.count !== 0 && handleAssignedClick('_id', data?.expiringIn48Hours?.id, 'Expiring in 48hrs')}

                                                >
                                                    {countExp48Hr === 0 ? '-' : countExp48Hr}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={4} xs={4}>
                                        <Grid container direction="column" spacing={2} align="center">
                                            <Grid item justify="center">
                                                <Typography variant="h6" style={{ color: theme.palette.primary.main }}>
                                                    Units expiring in 72 hours
                                                </Typography>
                                                <Typography
                                                    variant="h4"
                                                    style={{
                                                        color: theme.palette.primary.main,
                                                        marginTop: 10,
                                                        cursor: data?.expiringIn72Hours?.count !== 0 && 'pointer'
                                                    }}
                                                    
                                                    onClick={() => data?.expiringIn72Hours?.count !== 0 && handleAssignedClick('_id', data?.expiringIn72Hours?.id, 'Expiring in 72hrs')}
                                                >
                                                    {countExp72Hr === 0 ? '-' : countExp72Hr}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Divider
                                variant="fullWidth"
                                orientation="horizontal"
                                style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 50 }}
                            />

                            <Grid container>
                                <Grid item>
                                    <Typography variant="h6" color="primary">
                                        BATCHES STATUS REPORT
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Grid container direction="row-reverse">
                                        <Grid item>
                                            <CustomButton
                                                onClick={handlePrintReportClick}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Print Report
                                            </CustomButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{ marginTop: 20 }}>
                                <Grid item lg={4} md={12} sm={12} xs={12}
                                    style={{
                                        cursor:
                                            data?.
                                                totalUnitsInBatches !== 0 && 'pointer'
                                    }}
                                    onClick={() => handleTotalBatchClick(
                                    'deviceId._id',
                                    '622b295123481e3ee86cb4a0',
                                   'Theater Fridge'
                                )}>
                                    <Card className={barDataType == 0 ? classes.cardSelected : classes.cardNormal}>
                                        <Grid container direction="column" spacing={2} alignItems="center">
                                            <Grid item>
                                                <Typography className={classes.cardMainText}>
                                                    BATCHES IN STOCK
                                                </Typography>
                                                <Typography className={classes.cardValueText}>
                                                    {totalBatches}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item lg={4} md={12} sm={12} xs={12}
                                    style={{
                                        cursor:
                                            data?.batchAvailable
                                                ?.length > 0 &&
                                            'pointer'
                                    }}
                                    onClick={() =>
                                        data?.batchAvailable?.length >
                                        0 &&
                                        handleDashboardbatches(
                                            'isAssigned',
                                            0,
                                            'Available',
                                            'Available Batches'
                                        )
                                    }>
                                    <Card className={barDataType == 1 ? classes.cardSelected : classes.cardNormal}>
                                        <Grid container direction="column" spacing={2} alignItems="center">
                                            <Grid item>
                                                <Typography color="primary" className={classes.smalldetailTitle}>
                                                    {/*<i*/}
                                                    {/*    className={'fa-square'}*/}
                                                    {/*    style={{ fontSize: 20, color: theme.palette.primary.main }}*/}
                                                    {/*    aria-hidden="true"*/}
                                                    {/*/>{' '}*/}
                                                    UNASSIGNED
                                                </Typography>
                                                <Typography className={classes.cardValueText}>
                                                    {availableBatches}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item lg={4} md={12} sm={12} xs={12}
                                    style={{
                                        cursor:
                                            data?.batchAssigned
                                                ?.length > 0 &&
                                            'pointer'
                                    }}
                                    onClick={() =>
                                        data?.batchAssigned?.length >
                                        0 &&
                                        handleDashboardbatches(
                                            'isAssigned',
                                            1,
                                            'Assigned',
                                            'Assigned Batches'
                                        )
                                    }>
                                    <Card className={barDataType == 2 ? classes.cardSelected : classes.cardNormal}>
                                        <Grid container direction="column" spacing={2} alignItems="center">
                                            <Grid item>
                                                <Typography color="primary" className={classes.smalldetailTitle}>
                                                    ASSIGNED
                                                </Typography>
                                                <Typography className={classes.cardValueText}>
                                                    {assignedBatches}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                            {/*Grid for counts ends here*/}
                            <Grid item xs style={{ marginTop: 20 }}>
                                <Divider
                                    variant="fullWidth"
                                    orientation="horizontal"
                                    style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10 }}
                                />
                                       
                                        {data && (
                                            <BarChart
                                                data={
                                                    barDataType == 2
                                                        ? asgnbatchBarChart
                                                        : barDataType == 1
                                                            ? avlbatchBarChart
                                                            : totalbatchBarChart
                                                }
                                            />
                                        )}
                                </Grid>


                            <Grid item xs style={{ marginTop: 20 }}>
                            <Divider
                                variant="fullWidth"
                                orientation="horizontal"
                                style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 50 }}
                            />

                            <Grid container spacing={3}>
                                <Grid item md={4} xs={4}>
                                    <Grid container direction="column" spacing={2} align="center">
                                        <Grid item justify="center">
                                            <Typography variant="h6" style={{ color: theme.palette.primary.main }}>
                                                Batch expiring in 24 hours
                                            </Typography>
                                            <Typography
                                                variant="h4"
                                                    style={{
                                                        color: theme.palette.primary.main,
                                                        marginTop: 10,
                                                        cursor: data?.expiringIn24HoursBatch?.count !== 0 && 'pointer'
                                                    }}

                                                    onClick={() => data?.expiringIn24HoursBatch?.count !== 0 && handleDashboardbatches('_id', data?.expiringIn24HoursBatch?.id, 'Expiring in 24hrs')}

                                            >
                                                {batchcountExp24Hr === 0 ? '-' : batchcountExp24Hr}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={4} xs={4}>
                                    <Grid container direction="column" spacing={2} align="center">
                                        <Grid item justify="center">
                                            <Typography variant="h6" style={{ color: theme.palette.primary.main }}>
                                                Batch expiring in 48 hours
                                            </Typography>
                                            <Typography
                                                variant="h4"
                                                    style={{
                                                        color: theme.palette.primary.main,
                                                        marginTop: 10,
                                                        cursor: data?.
                                                            expiringIn48HoursBatch?.count !== 0 && 'pointer'
                                                    }}

                                                    onClick={() => data?.
                                                        expiringIn48HoursBatch?.count !== 0 && handleDashboardbatches('_id', data?.
                                                            expiringIn48HoursBatch?.id, 'Expiring in 48hrs')}

                                            >
                                                {batchcountExp48Hr === 0 ? '-' : batchcountExp48Hr}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={4} xs={4}>
                                    <Grid container direction="column" spacing={2} align="center">
                                        <Grid item justify="center">
                                            <Typography variant="h6" style={{ color: theme.palette.primary.main }}>
                                                Batch expiring in 72 hours
                                            </Typography>
                                            <Typography
                                                variant="h4"
                                                    style={{
                                                        color: theme.palette.primary.main,
                                                        marginTop: 10,
                                                        cursor: data?.
                                                            expiringIn72HoursBatch?.count !== 0 && 'pointer'
                                                    }}

                                                    onClick={() => data?.
                                                        expiringIn72HoursBatch?.count !== 0 && handleDashboardbatches('_id', data?.expiringIn72HoursBatch?.id, 'Expiring in 72hrs')}

                                            >
                                                {batchcountExp72Hr === 0 ? '-' : batchcountExp72Hr}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                    <Grid md={4} xs={12} container direction="row" spacing={2} style={{ padding: 20, display: 'flex' }}>
                        <Paper
                            className={edqCountsUnits === 0 ? classes.noDataPaper : classes.warningPaper}
                            elevation={0}
                            style={{ padding: 20, height: '50%' }}
                        >
                            <Grid item style={{ marginBottom: 20, height: '100%' }}>
                                <Grid container style={{ height: '100%' }}>
                                    <Grid item style={{ width: '100%' }}>
                                        <Typography variant="h6" color={edqCountsUnits === 0 ? 'primary' : 'secondary'}>
                                            EDQs Unit
                                        </Typography>
                                        <Grid
                                            container
                                            direction="column"
                                            item
                                            align="center"
                                            style={{ height: '100%', display: 'flex', justifyContent: 'center' }}
                                        >
                                            {edqCountsUnits === 'Please Select Device' ? (
                                                <Grid
                                                    item
                                                    container
                                                    className={classes.centerColumn}
                                                    direction="column"
                                                    justify="center"
                                                >
                                                    <Typography variant="h5" style={{ color: 'white' }}>
                                                        Please Select Device on Remote Dashbord Login Screen
                                                    </Typography>
                                                </Grid>
                                            ) : edqCountsUnits === 0 ? (
                                                <Grid
                                                    item
                                                    container
                                                    className={classes.centerColumn}
                                                    direction="column"
                                                    justify="center"
                                                >
                                                    <Typography variant="h5" color="primary">
                                                        No Passed Dereservation, Expired or Quarantine units.
                                                    </Typography>
                                                </Grid>
                                            ) : (
                                                <>
                                                    <Grid
                                                        item
                                                        container
                                                        className={classes.centerColumn}
                                                        direction="column"
                                                        justify="center"
                                                    >
                                                        <Typography variant="h2" color="secondary">
                                                            {' '}
                                                            {edqCountsUnits}{' '}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        container
                                                        className={classes.centerColumn}
                                                        direction="column"
                                                        justify="center"
                                                    >
                                                        <Typography variant="h5" color="secondary">
                                                            {' '}
                                                            Units need to be removed from this Fridge.{' '}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid
                                                        item
                                                        container
                                                        className={classes.centerColumn}
                                                        direction="row"
                                                        alignItems="flex-end"
                                                        justify="center"
                                                    >
                                                        <CustomButton
                                                            className={classes.warningButton}
                                                            onClick={handleViewDetailsClick}
                                                            variant="contained"
                                                            fontColor={'#ff0000'}
                                                            color="secondary"
                                                            bgColor="#eee"
                                                        >
                                                            VIEW DETAILS
                                                        </CustomButton>
                                                    </Grid>
                                                </>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper
                            className={edqCountsBatch === 0 ? classes.noDataPaper : classes.warningPaper}
                            elevation={0}
                            style={{ padding: 20, height: '50%' }}
                        >
                            <Grid item style={{ marginBottom: 20, height: '100%' }}>
                                <Grid container style={{ height: '100%' }}>
                                    <Grid item style={{ width: '100%' }}>
                                        <Typography variant="h6" color={edqCountsBatch === 0 ? 'primary' : 'secondary'}>
                                            EDQs Batch
                                        </Typography>
                                        <Grid
                                            container
                                            direction="column"
                                            item
                                            align="center"
                                            style={{ height: '100%', display: 'flex', justifyContent: 'center' }}
                                        >
                                            {edqCountsBatch === 'Please Select Device' ? (
                                                <Grid
                                                    item
                                                    container
                                                    className={classes.centerColumn}
                                                    direction="column"
                                                    justify="center"
                                                >
                                                    <Typography variant="h5" style={{ color: 'white' }}>
                                                        Please Select Device on Remote Dashbord Login Screen
                                                    </Typography>
                                                </Grid>
                                            ) : edqCountsBatch === 0 ? (
                                                <Grid
                                                    item
                                                    container
                                                    className={classes.centerColumn}
                                                    direction="column"
                                                    justify="center"
                                                >
                                                    <Typography variant="h5" color="primary">
                                                        No Passed Dereservation, Expired or Quarantine Batches.
                                                    </Typography>
                                                </Grid>
                                            ) : (
                                                <>
                                                    <Grid
                                                        item
                                                        container
                                                        className={classes.centerColumn}
                                                        direction="column"
                                                        justify="center"
                                                    >
                                                        <Typography variant="h2" color="secondary">
                                                            {' '}
                                                                    {edqCountsBatch}{' '}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        container
                                                        className={classes.centerColumn}
                                                        direction="column"
                                                        justify="center"
                                                    >
                                                        <Typography variant="h5" color="secondary">
                                                            {' '}
                                                            Batches need to be removed from this Fridge.{' '}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid
                                                        item
                                                        container
                                                        className={classes.centerColumn}
                                                        direction="row"
                                                        alignItems="flex-end"
                                                        justify="center"
                                                    >
                                                        <CustomButton
                                                            className={classes.warningButton}
                                                            onClick={handleViewBatchDetailsClick}
                                                            variant="contained"
                                                            fontColor={'#ff0000'}
                                                            color="secondary"
                                                            bgColor="#eee"
                                                        >
                                                            VIEW DETAILS
                                                        </CustomButton>
                                                    </Grid>
                                                </>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            ) : (
                <></>
            )}
        </>
    );
};

export default StatusReport;
