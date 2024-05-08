import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    InputLabel,
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    Menu,
    MenuItem
} from '@material-ui/core';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';
import pluralize from 'pluralize';
import FileDownload from 'js-file-download';
import { useStyles } from './style';
import useForm from 'hooks/useForm';
import ConfirmationDialog from 'components/confirmations/confirmation.container';
import { Alert, CONSTANTS, CustomButton, CustomSearch } from 'common';
import { Card, CustomDialog, CustomRadio, CustomTable, PageNotFound, SelectOption } from 'components';
import CustomInput from 'components/inputfeild';
import Loader from 'components/loader/loader.container';
import NoData from 'components/no data';
import HeaderIcons from 'components/header-button-and-icons';
import SkeletonTable from 'components/loader/loaderNew.container';
import {
    clearFilterCriteria,
    getFilterCriteria,
    getActivityUnitFilter,
    getActivityBatchFilter,
    getNotifyUnitFilter,
    getNotifyBatchFilter,
    getWastedUnitFilter,
    getWastedBatchFilter,
    getTransfusedUnitFilter,
    getTransfusedBatchFilter,
    getRecipientFilter, getUserFilter,
    getFilter
} from 'redux/actions/filters/filtersActions';

import {
    getDropDown,
    getFields,
    get2ndDropdown,
    postFormData,
    postSwapOutData,
    putFormData,
    get3rdDropdown,
    clearPutResponse,
    clearPostResponse,
    get4thDropdown,
    get5thDropdown,
    get6thDropdown,
    get7thDropdown,
    deleteFormData,
    clearDeleteResponse,
    get8thDropdown,
    clear2ndDropDown,
    clearDropDown,
    clear3rdDropDown,
    clear4thDropDown,
    clear5thDropDown,
    clear6thDropDown,
    clear7thDropDown,
    clear8thDropDown,
    getCollectionDropdown,
    clearCollectionDropDown,
    deleteSelectedRecords,
    deactivateSelectedRecords,
    getDeviceData,
    getWastedUnits,
    getWastedBatches,
    getWastedTransfusedUnit,
    getWastedTransfusedBatch,
} from 'redux/actions/manage/manageFieldsAction';
import { settingsRemoteLoginPageAction } from 'redux/actions/socketAction';
import {
    requestPullOutId,
    getData,
    clearData,
    getExportData,
    getAppLoader,
    createErrorDialog,
    requestPulloutDialogOpen,
    refreshPullOutData,
    errorReportData,
    clearErrorReportData,
    createAlert
} from '../../redux/actions';
import { getVoucherResponse } from 'redux/actions/manage/scManageViewActions';
import CustomChip from 'components/chip';
import DisplayConfig from 'components/displayConfig';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { postAddUserGroup, clearAddUserGroupResponse } from '../../redux/actions/manage/manageFieldsAction';
import ScFormContainer from './ScFormContainer';
import compareSequence from 'common/services/compare';
import { getReceivedUnits } from '../../redux/actions/transferUnitActions/transferUnitActions';
import { resetFilters } from 'redux/actions/filters/globalFilterAction';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';
import PullOutDialog from 'pages/request-unit/pullOutRequest';
import ReportFilter from 'components/reportFilters';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import moment from 'moment';
import CustomTableCell from 'components/scTable/scTableCell';
import { getTemperature, getTemperatureGraph, getDashboard } from 'redux/actions/dashboard/dashboardActions';
import LineChart from 'pages/dashboard/LineChart';
import { putAction } from 'redux/actions/manage/headerActions';
import { clearAddDrawer, getAddDrawer } from 'redux/actions/settings/drawerAddAction';
//import { getDashboard, getTemperature, getTemperatureGraph } from 'redux/actions/dashboard/dashboardActions';

const ScManage = (props) => {
    const { userInfo } = useSelector((state) => state.userLogin);
    const { data } = props;
    console.log('props', props);
    const param = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const mData = data.length > 1 ? data[1] : data[0];
    const label = mData.label;
    let urlEndPoint = mData.urlEndPoint;
    console.log('uuurrrlll',urlEndPoint)
    if (urlEndPoint === 'activity&filters=[{"key":"track-code","value":["BS-TR-5105","BS-TR-5101","BS-TR-5102","BS-TR-5104"]}]' && props?.history?.location?.pathname === '/dashboard/reports/expiry'){
         console.log(urlEndPoint,"inside");
        const urlSplit= urlEndPoint.split('=')
         urlEndPoint = urlSplit[0] + '=[{"key":"track-code","value":"BS-TR-5105"}]'
    }
    let fatedStatus = 'BS-TR-5101'
    let expiryStatus = 'BS-TR-5105'
    let assignStatus = 'BS-TR-5103'
    let dereservationStatus = 'BS-TR-5102'
    const subMenuCode = mData.code;
    const CurrentSubMenu = label.indexOf('ed') === -1 ? pluralize.plural(label) : label;
    let url = props.path.split('/').slice(2).join('/');
    let breadScrumbLebel = data[0]?.label;
    console.log('bread---', breadScrumbLebel)
    let screenName = url.split('/').pop();
    let mangeModule =
        url.split('/').includes('reports') ||
        url.split('/').includes('transactions') ||
        urlEndPoint === 'requestpullouts'
            ? 'reports'
            : '';
    localStorage.setItem('mangeModule', JSON.stringify(mangeModule));
    console.log('manage', mangeModule);
    // Local state
    const [remote, setRemote] = useState(JSON.parse(localStorage.getItem('remoteInfo')));
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [cloneDialogOpen, setCloneDialogOpen] = useState(false);
    const [rowData, setRowData] = useState({});
    const [initialData, setInitialData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [isClone, setIsClone] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [sortValue, setSortValue] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [totalCount, setTotalCount] = useState('');
    const [showFilters, setShowFilters] = useState('');
    console.log('shoefil---',showFilters)
    const [selectedData, setSelectedData] = useState(0);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertOpen2, setAlertOpen2] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [secondDropdown, setSecondDropdown] = useState('');
    const [thirdDropdown, setThirdDropdown] = useState('');
    const [fourthDropdown, setFourthDropdown] = useState('');
    const [fifthDropdown, setFifthDropdown] = useState('');
    const [sixthDropdown, setSixthDropdown] = useState('');
    const [eightDropdown, setEightDropdown] = useState('');
    const [seventhDropdown, setSeventhDropdown] = useState('');
    const [nextClick, setNextClick] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [accessableCodes, setAccessableCodes] = useState([]);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAllRecords, setSelectedAllRecordsFlag] = useState(false);
    const [filterChips, setFilterChips] = useState([]);
    const [selectedUserNames, setSelectedUserNames] = useState([]);
    const [refresh, doRefresh] = useState(0);
    const [deletedChip, setDeletedChip] = useState('');
    const [chipIdAndName, setChipIdAndName] = useState({});
    const [filterKeysObject, setFilterKeysObject] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [userGroupName, setuserGroupName] = useState('');
    const [userGroupDescription, setUserGroupDescription] = useState('');
    const [userGroupDialog, setUserGroupDialog] = useState(false);
    const [addUserGroupAlert, setAddUserGroupAlert] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [pullOutIdStatic, setPullOutIdStatic] = useState('');
    const [pageFilter, setPageFilter] = useState('Unit');
    console.log('pagefilter', pageFilter);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
    const { dateFormat } = useSelector((state) => state.dateFormat);
    const [voucherMap, setVoucherMap] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    // Global state
    const { loading, responseData } = useSelector((state) => state.getData);
    console.log('responsedata---', responseData);
    const { filterCriteria } = useSelector((state) => state.getFiltersCriteria);
    console.log('filtercrit---', filterCriteria)
    const { fields } = useSelector((state) => state.getFormFields);
    console.log('fields----', fields);
    const { postLoading, postResponse, postError } = useSelector((state) => state.postFormFields);
    const { putLoading, putResponse, putError } = useSelector((state) => state.putFormFields);
    const { deleteResponse, deleteError, deleteLoading } = useSelector((state) => state.deleteField);
    console.log('delete---', deleteResponse)
    const { deactivateResponse, deactivateError, deactivateLoading } = useSelector((state) => state.deactivateField);
    console.log('deactivateResponse---', deactivateResponse)
    const { userAccessData, userAccessLoading } = useSelector((state) => state.getUserAccess);
    const [columns, setColumns] = useState(responseData?.displayConfigData);
    const [searched, setSearched] = useState(false);
    const { postAdduserGroupLoading, postAddUserGroupResponse, postAddUserGroupError } = useSelector(
        (state) => state.addUserGroup
    );
    const { options4 } = useSelector((state) => state.get4thDropdown);

    const { putActionsLoading, putheaderActions, putheaderActionsError } = useSelector(
        (state) => state.putActionResponse
    );

    const { screenIndex } = useSelector((state) => state.getStocksScreenSet);

    const getStaticFilters = useSelector((state) => state.getStaticFilters);

    const [unchecked, setUnchecked] = useState([]);

    const { chipNameAndId, chipData, filtersData, filterKeysObjects, staticFilters, screen } = getStaticFilters;

    const [manageLoading, setManageLoading] = useState(true);
    const [openErrorDialog, SetOpenErrorDialog] = useState(false);
    const [actualTotalCount, setActualTotalCount] = useState('');
    const [isInitCall, setIsInitCall] = useState(false);
    const socket = useSelector((state) => state.socketReducer.socket);

    const { options8 } = useSelector((state) => state.get8thDropdown);

    const { pullOutDialogOpen } = useSelector((state) => state.pulloutDialog);
    const errorData = useSelector((state) => state.errorReportDataStore);
    const [errorDataResponse, setErrorDataResponse] = useState([]);

    const [view, setView] = useState(1);
    const radioOptions = [
        { name: 'Table', value: 1 },
        { name: 'Graph', value: 0 }
    ];
    const { deviceLoading, deviceResponse, deviceError } = useSelector((state) => state.getAllDeviceData);
    const [storageDevice, setStorageDevice] = useState(null);
    const filterData = deviceResponse?.filter((ele) => ele?.deviceTypeId[0]?.name === 'Blood Fridge');
    const [value, setValue] = useState('Theater Fridge'); //'Remote Fridge'
    const [selectedDevice, setSelectedDevice] = useState('622b295123481e3ee86cb4a0');
    const [minTemp, setMinTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(32); 
    const [dateBar, setDateBar] = React.useState([]);
    const [tempBar, setTempBar] = React.useState([]);
    console.log('tempbar', tempBar);
    console.log('dateBar', dateBar);
    const [activeButton, setActiveButton] = useState('2H');
    const { temp, load } = useSelector((state) => state.getDashboardTemperature);
    const { GraphStatus } = useSelector((state) => state.getDashboardGraph);
    const [userError, setUserError] = useState(false);
    const [tempratureType, setTempratureType] = useState('hours');
    const [daysNumber, setDaysNumber] = useState(2);
    let { remotesettingsData } = useSelector((state) => state.settingsRemoteLoginPageStore);
    console.log('remotesettingsData', remotesettingsData);
    const [drawerAlert, setDrawerAlert] = useState(false);
    const { addDrawerSucess, addDrawerError } = useSelector((state) => state.getAddDrawer);


    let { activityUnitfiltersLoading, activityUnitfiltersData } = useSelector((state) => state.getActivityUnitFilter);
    //console.log('requestbatch', activityUnitfiltersData)

    let { activityBatchfiltersLoading, activitybatchfiltersData } = useSelector(
        (state) => state.getActivityBatchFilter
    );
    console.log('requestbatch', activitybatchfiltersData);

    let { notifyUnitfiltersLoading, notifyUnitfiltersData } = useSelector((state) => state.getNotifyUnitFilter);
    console.log('notifyfilter', notifyUnitfiltersData);

    let { notifyBatchfiltersLoading, notifyBatchfiltersData } = useSelector((state) => state.getNotifyBatchFilter);
    console.log('notifybatchfilter', notifyBatchfiltersData);

    useEffect(() => {
        dispatch(getWastedUnits());
    }, []);

    useEffect(() => {
        dispatch(getWastedBatches());
    }, []);

    useEffect(() => {
        dispatch(getWastedTransfusedUnit());
    }, []);

    useEffect(() => {
        dispatch(getWastedTransfusedBatch());
    }, []);
    //useEffect (() => {
    //    dispatch(getNotifyBatchFilter());
    //},[])
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

    // old graph
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
    const handleUpdateRowData = (row) => {
        setRowData({ ...row });
    };

    const [batchUserError, setBatchUserError] = useState(false);
    const [users, setUsers] = useState('');
    console.log('userrr', users);
    const [userId, setUserId] = useState('');

    let remoteInfo = JSON.parse(localStorage.getItem('remoteInfo'));
    console.log('remoteInfo', remoteInfo);

    useEffect(() => {
        if (pageFilter === 'Batch') {
            dispatch(get4thDropdown('user'));
        }
    }, [pageFilter]);

    const handleUserChange = (e) => {
        console.log(e.target.value);
        const user = options4?.data?.find((dat) => dat.name === e.target.value);
        console.log('user', user);
        setUsers(user.name);
        setUserId(user._id);
        setUserError(false);
        console.log('userId', userId);
    };

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let url = `${CONSTANTS.BASEURL}setting/config`;

        axios.get(url, config).then((resdata) => {
            console.log('config' + resdata.status);
            dispatch(settingsRemoteLoginPageAction(resdata.data.data));
        });
    }, []);
    useEffect(() => {
        socket?.on('refresh', (data) => {
            const page = localStorage.getItem('page');
            const filter = localStorage.getItem('filter');
            const sortValue = localStorage.getItem('sort');
            const search = localStorage.getItem('search');
            if (window.location.pathname === '/dashboard/reports/movements') {
                dispatch(
                    getData(
                        'activity',
                        pageSize * 3,
                        1,
                        search !== null ? search : undefined,
                        filter !== null ? JSON.parse(filter) : undefined,
                        sortValue !== null ? JSON.parse(sortValue) : undefined,
                        page !== null ? page : pageFilter,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                       // remotesettingsData?.emergencyLogin === 'TRUE' ? "6320991b7d29280d14a57145" : undefined
                    )
                );
            }
            //window.location.reload()
        });
    }, [socket]);
    useEffect(() => {
        let tempAccessCodes = [];
        if (userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1002') {
            tempAccessCodes = [
                'BS-ACO-1030',
                'BS-ACO-1031',
                'BS-ACO-1032',
                'BS-ACO-1033',
                'BS-ACO-1025',
                'BS-ACO-1026',
                'BS-ACO-1027',
                'BS-ACO-1028',
                'BS-ACO-1022',
                'BS-ACO-1029',
                'BS-ACO-1023',
                'BS-ACO-1034',
                'BS-ACO-1024'
            ];
        } else if (urlEndPoint === 'requestpullouts') {
            let manageAccessCodes =
                userInfo?.data?.userAccess
                    ?.filter((item) => item['drawer-code'] === 'BS-DR-0080')
                    ?.map((subMenu) => subMenu?.menuId)
                    ?.flat()[0] || [];
            // .filter((item) => item['drawer-code'] === subMenuCode);
            let keysOfObject = Object.keys(manageAccessCodes);

            keysOfObject.forEach((item) => {
                if (Array.isArray(manageAccessCodes[item])) {
                    manageAccessCodes[item][0] === '1' && tempAccessCodes.push(manageAccessCodes[item][1]);
                }
            });
        } else {
            let manageAccessCodes =
                userInfo?.data?.userAccess
                    ?.filter((item) => item['drawer-code'] === mData.mainMenuCode)
                    ?.map((subMenu) => subMenu?.menuId)
                    ?.flat()
                    ?.filter((item) => item['drawer-code'] === subMenuCode)[0] || [];
            let keysOfObject = manageAccessCodes && Object.keys(manageAccessCodes);
            keysOfObject.forEach((item) => {
                if (Array.isArray(manageAccessCodes[item])) {
                    manageAccessCodes[item][0] === '1' && tempAccessCodes.push(manageAccessCodes[item][1]);
                }
            });
        }
        setAccessableCodes(tempAccessCodes);
        setManageLoading(false);
    }, [param]);

    // const handleGetDataApi = (search, filter, sort, pagefilter) => {
    //     dispatch(getData(urlEndPoint, pageSize * 3, 1, search, filter, sort, pagefilter));
    // };

    // useEffect(() => {
    //     // if (searchKey.length > 2 && showFilters.length > 0 && sortValue) {
    //     // } else if (searchKey?.length > 2 && showFilters.length > 0) {
    //     // } else if (searchKey?.length > 2 && sortValue && sortValue?.key) {
    //     // } else if (sortValue?.key && showFilters.length > 0) {
    //     // } else if (searchKey?.length > 2) {
    //     // } else if (showFilters.length > 0) {
    //     // } else if (sortValue) {
    //     // }
    // }, [searchKey, showFilters, sortValue]);
    useEffect(() => {
        setErrorDataResponse(errorData.data);
    }, [errorData]);

    useEffect(() => {
        // dispatch(getAppLoader(false));
        dispatch(clearData());
        if (urlEndPoint === 'requestpullouts') {
            setIsInitCall(false);
            dispatch(getData('requestpullouts', pageSize * 3, 1));
        } else if (getStaticFilters.staticFilters) {
            setIsInitCall(false);
            dispatch(
                getData(
                    urlEndPoint,
                    pageSize * 3,
                    1,
                    undefined,
                    filtersData,
                    undefined,
                    pageFilter,
                    undefined,
                    undefined,
                    undefined,
                    screen
                )
            );
        } else if (urlEndPoint !== 'activity' || refresh === 0) {
            //localStorage.removeItem('page');
            localStorage.removeItem('filter');
            localStorage.removeItem('sort');
            localStorage.removeItem('search');
        } else {
            setIsInitCall(true);
            // console.log(' =============== setIsInitCall ======================');
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, undefined, undefined, pageFilter));
        }
        pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/movements'
            ? dispatch(getActivityUnitFilter())
            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/movements'
            ? dispatch(getActivityBatchFilter())
            : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
            ? dispatch(getNotifyUnitFilter(urlEndPoint))
            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
            ? dispatch(getNotifyBatchFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/wasted-units'
            ? dispatch(getWastedUnitFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/wasted-batch'
            ? dispatch(getWastedBatchFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/transfused-units'
            ? dispatch(getTransfusedUnitFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/transfused-batch'
            ? dispatch(getTransfusedBatchFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/manage/recipient' || props?.history?.location?.pathname == '/dashboard/reports/recipient'
            ? dispatch(getRecipientFilter(urlEndPoint))
                                            : props?.history?.location?.pathname == '/dashboard/manage/user' || props?.history?.location?.pathname == '/dashboard/reports/user'
                                                ? dispatch(getUserFilter(urlEndPoint))
                                                : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                    ? dispatch(getActivityUnitFilter(fatedStatus))
                                                    : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                        ? dispatch(getActivityBatchFilter(fatedStatus))
                                                        : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                            ? dispatch(getActivityUnitFilter(expiryStatus))
                                                            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                                ? dispatch(getActivityBatchFilter(expiryStatus))
                                                                : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                    ? dispatch(getActivityUnitFilter(assignStatus))
                                                                    : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                        ? dispatch(getActivityBatchFilter(assignStatus))
                                                                        : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                            ? dispatch(getActivityUnitFilter(dereservationStatus))
                                                                            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                                ? dispatch(getActivityBatchFilter(dereservationStatus))
                                                                                : props?.history?.location?.pathname == '/dashboard/reports/unit'
                                                                                    ? dispatch(getFilter())
            : dispatch(getFilterCriteria(urlEndPoint));
        dispatch(getFields(codeForFields));
        dispatch(getFilterCriteria(urlEndPoint));

        return () => {
            setSearched(false);
            setSortValue(null);
            setShowFilters('');
            setPageNum(0);
            dispatch(clearData());
            dispatch(clearFilterCriteria());
            dispatch(clearPostResponse());
            dispatch(clearPutResponse());
            setSearchKey('');
            setIsEdit(false);
            setIsClone(false);
            setErrorMessage('');
            setAlertOpen(false);
            setAlertOpen2(false);
            dispatch(resetFilters());
            dispatch(setScreeenIndex(0));
            dispatch(clearDropDown());
            dispatch(clear2ndDropDown());
            dispatch(clear3rdDropDown());
            dispatch(clear4thDropDown());
            dispatch(clear5thDropDown());
            dispatch(clear6thDropDown());
            dispatch(clear7thDropDown());
            dispatch(clear8thDropDown());
            dispatch(clearCollectionDropDown());
            dispatch(clearAddUserGroupResponse());
        };
    }, [urlEndPoint, mangeModule, pageFilter]);
    const clearAllDropDowns = () => {
        dispatch(clearDropDown());
        dispatch(clear2ndDropDown());
        dispatch(clear3rdDropDown());
        dispatch(clear4thDropDown());
        dispatch(clear5thDropDown());
        dispatch(clear6thDropDown());
        dispatch(clear7thDropDown());
        dispatch(clear8thDropDown());
    };
    useEffect(() => {
        selectedRecords.length > 0 ? setIsSelected(true) : setIsSelected(false);
    }, [selectedRecords]);

    //useEffect(() => {
    //    dispatch(getTemperature(selectedDevice));
    //    setActiveButton('YTD');
    //}, [selectedDevice]);

    useEffect(() => {
        dispatch(getTemperature(selectedDevice, daysNumber, tempratureType));
    }, [activeButton, selectedDevice]);

    //old graph

    //useEffect(() => {
    //    console.log('GraphStatus' + GraphStatus);

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
    //                            data?.push({ x: ele, y: temp?.Temperature[index] });
    //                        });

    //                        series.push({
    //                            name: devicetemp?.deviceName,
    //                            data: data
    //                        });
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
    //                                            opacityTo: 0.9,
    //                                            colorStops: colorStops
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

    useEffect(() => {
        if (deviceResponse) {
            setStorageDevice(filterData);
        }
    }, [deviceResponse]);

    function setNewColumns(newColumns) {
        setColumns(newColumns);
    }
    const [fieldSequence, setFieldSequence] = useState(fields?.data);
    useEffect(() => {
        if (urlEndPoint === 'device') {
            fields.data?.filter((item) => {
                return (
                    responseData?.displayConfigData?.length > 0 &&
                    responseData?.displayConfigData.some((data) => {
                        if (item.label.includes(data.label)) {
                            return (item.sequence = data.sequence);
                        }
                    })
                );
            });
            fields.data?.filter((item) => {
                if (urlEndPoint === 'device') {
                    if (item.name === 'token') {
                        item.sequence = 18;
                    }
                    if (item.name === 'machineNumber') {
                        item.sequence = 19;
                    }
                    if (item.name === 'status') {
                        item.sequence = 20;
                    }
                    if (item.name === 'isDeviceScanAutomated') {
                        item.sequence = 21;
                    }
                    if (item.name === 'isRemoteAllocationAllowed') {
                        item.sequence = 22;
                    }
                    if (item.name === 'isEmergencyAccessAllowed') {
                        item.sequence = 23;
                    }
                    if (item.name === 'isBadgeAccessAllowed') {
                        item.sequence = 24;
                    }
                    if (item.name === 'isTemperatureAllowed') {
                        item.sequence = 25;
                    }
                }
            });
            fields?.data?.length > 0 && setFieldSequence(fields?.data);
        }
    }, [fields.data, urlEndPoint, responseData?.displayConfigData]);
    let sortedFieldSequence =
        urlEndPoint === 'device' ? fieldSequence?.sort(compareSequence) : fields?.data?.sort(compareSequence);
    isEdit &&
        sortedFieldSequence?.forEach((field) => {
            let fieldValue = rowData[field.name];
            if (Array.isArray(fieldValue) && field?.fieldtypeId[0]?.code !== 'SC-FT-007') {
                field.value = fieldValue.map((v) => v._id).toString();
            } else {
                field.value = rowData[field?.name];
            }
        });
    isClone &&
        sortedFieldSequence?.forEach((field) => {
            let fieldValue = rowData[field.name];
            if (Array.isArray(fieldValue) && field?.fieldtypeId[0]?.code !== 'SC-FT-007') {
                field.value = fieldValue.map((v) => v._id).toString();
            } else {
                field.value = rowData[field?.name];
            }
        });
    const emptyValuesFiltered =
        sortedFieldSequence?.length > 0 && sortedFieldSequence?.filter((v) => v.value !== undefined);

    const submitCallback = (e) => {
        let object = {};
        if (urlEndPoint === 'drawer') {
            emptyValuesFiltered?.map((m) => {
                if (m.name === 'level') {
                    object.level = parseInt(m.value);
                } else if (m.name === 'sequence') {
                    object.sequence = parseInt(m.value);
                } else {
                    object[m.name] = m.value;
                }
            });
        } else {
            emptyValuesFiltered?.forEach((m) => {
                if (m?.value !== '' && typeof m?.value === 'string') {
                    object[m.name] = m?.value?.trimEnd();
                } else if (m.value !== '') {
                    object[m.name] = m?.value;
                } else {
                    object[m.name] = m?.value;
                }
            });
        }
        if (isEdit) {
            if (urlEndPoint === 'device') {
                object._id = rowData._id;
                object.status = localStorage.getItem('status') ? localStorage.getItem('status') : 0;
                object.isDeviceScanAutomated = localStorage.getItem('isDeviceScanAutomated')
                    ? localStorage.getItem('isDeviceScanAutomated')
                    : 0;
                object.isBadgeAccessAllowed = localStorage.getItem('isBadgeAccessAllowed')
                    ? localStorage.getItem('isBadgeAccessAllowed')
                    : 0;
                object.isTemperatureAllowed = localStorage.getItem('isTemperatureAllowed')
                    ? localStorage.getItem('isTemperatureAllowed')
                    : 0;
                object.isRemoteAllocationAllowed = localStorage.getItem('isRemoteAllocationAllowed')
                    ? localStorage.getItem('isRemoteAllocationAllowed')
                    : 0;
                object.isEmergencyAccessAllowed = localStorage.getItem('isEmergencyAccessAllowed')
                    ? localStorage.getItem('isEmergencyAccessAllowed')
                    : 0;
            } else if (urlEndPoint === 'drawer') {
                object.level = parseInt(rowData?.level);
                object.sequence = parseInt(rowData?.sequence);
                object._id = rowData._id;
            } else {
                object._id = rowData._id;
            }
        }
        if (isClone) {
            if (urlEndPoint === 'device') {
                object.status = localStorage.getItem('status') ? localStorage.getItem('status') : 0;
                object.isDeviceScanAutomated = localStorage.getItem('isDeviceScanAutomated')
                    ? localStorage.getItem('isDeviceScanAutomated')
                    : 0;
                object.isRemoteAllocationAllowed = localStorage.getItem('isRemoteAllocationAllowed')
                    ? localStorage.getItem('isRemoteAllocationAllowed')
                    : 0;
                object.isEmergencyAccessAllowed = localStorage.getItem('isEmergencyAccessAllowed')
                    ? localStorage.getItem('isEmergencyAccessAllowed')
                    : 0;
                object.isBadgeAccessAllowed = localStorage.getItem('isBadgeAccessAllowed')
                    ? localStorage.getItem('isBadgeAccessAllowed')
                    : 0;
                object.isTemperatureAllowed = localStorage.getItem('isTemperatureAllowed')
                    ? localStorage.getItem('isTemperatureAllowed')
                    : 0;
            } else if (urlEndPoint === 'drawer') {
                object.level = parseInt(rowData.level);
                object.sequence = parseInt(rowData.sequence);
            }
        }
        let FormObject = {};
        FormObject.collectionName = urlEndPoint;
        if (isEdit ) {
            FormObject.validData = [object];
        }
       
        else {
            FormObject.validData = object;
        }
        let json = JSON.stringify(FormObject);
        
        if (isEdit && urlEndPoint === 'drawer') {
            //dispatch(getAddDrawer(json));
            dispatch(putFormData(json))
        }
        else if (isEdit) {
            dispatch(putFormData(json))
        }
        else if (urlEndPoint === 'drawer') {
            dispatch(getAddDrawer(json));
        }
        else {
            dispatch(postFormData(json));
}
    };

    useEffect(() => {
        addDrawerSucess?.status === true 

        if (addDrawerSucess?.status === true) {
           
            setOpenAdd(false);
        }
        addDrawerError?.status === false && setErrorMessage(addDrawerError?.error?.errorMessage);
        addDrawerError?.errorMessage && dispatch(clearAddDrawer());

        setTimeout(() => {
            dispatch(clearAddDrawer());
        }, 3000);
    }, [addDrawerSucess, addDrawerError]);

   

    useEffect(() => {
        postResponse?.status === true && setAlertOpen(true);
        postResponse?.status === true &&
            dispatch(
                getData(
                    urlEndPoint,
                    pageSize * 3,
                    pageNum,
                    searchKey !== '' ? JSON.stringify(searchKey) : undefined,
                    filtersData,
                    undefined,
                    pageFilter
                )
            ) &&
            setIsInitCall(false);
        pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/movements'
            ? postResponse?.status === true && dispatch(getActivityUnitFilter())
            : pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/movements'
            ? postResponse?.status === true && dispatch(getActivityBatchFilter())
            : pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
            ? postResponse?.status === true && dispatch(getNotifyUnitFilter(urlEndPoint))
            : pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
            ? postResponse?.status === true && dispatch(getNotifyBatchFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/wasted-units'
            ? postResponse?.status === true && dispatch(getWastedUnitFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/wasted-batch'
            ? postResponse?.status === true && dispatch(getWastedBatchFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/transfused-units'
            ? postResponse?.status === true && dispatch(getTransfusedUnitFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/transfused-batch'
            ? postResponse?.status === true && dispatch(getTransfusedBatchFilter(urlEndPoint))
                                        : props?.history?.location?.pathname == '/dashboard/manage/recipient' || props?.history?.location?.pathname == '/dashboard/reports/recipient'
            ? postResponse?.status === true && dispatch(getRecipientFilter(urlEndPoint))
                                            : props?.history?.location?.pathname == '/dashboard/manage/user' || props?.history?.location?.pathname == '/dashboard/reports/user'
                                                ? postResponse?.status === true && dispatch(getUserFilter(urlEndPoint))
                                                : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                    ? dispatch(getActivityUnitFilter(fatedStatus))
                                                    : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                        ? dispatch(getActivityBatchFilter(fatedStatus))
                                                        : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                            ? dispatch(getActivityUnitFilter(expiryStatus))
                                                            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                                ? dispatch(getActivityBatchFilter(expiryStatus))
                                                                : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                    ? dispatch(getActivityUnitFilter(assignStatus))
                                                                    : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                        ? dispatch(getActivityBatchFilter(assignStatus))
                                                                        : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                            ? dispatch(getActivityUnitFilter(dereservationStatus))
                                                                            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                                ? dispatch(getActivityBatchFilter(dereservationStatus))
                                                                                : props?.history?.location?.pathname == '/dashboard/reports/unit'
                                                                                    ? dispatch(getFilter())
            : null;
        if (!nextClick) {
            if (isClone) {
                postResponse?.status === false && setCloneDialogOpen(true);
            } else {
                postResponse?.status === false && setOpenAdd(true);
            }
        }
        postResponse?.status === true && resetFormData();
        postResponse?.status === true && setErrorMessage(null);
        postResponse?.status === true && setSearchKey('');
        postResponse?.status === true && clearAllDropDowns();
        // postError?.errorMessage && dispatch(clearPostResponse());
        postError?.errorMessage && setErrorMessage(postError?.errorMessage);
        setTimeout(() => {
            dispatch(clearPostResponse());
        }, 3000);
    }, [postResponse, postError, pageFilter]);

    useEffect(() => {
        if (!nextClick) {
            if (isClone) {
                postResponse?.status === true && setCloneDialogOpen(false);
                postResponse?.status === true && setIsClone(false);
                pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/movements'
                    ? postResponse?.status === true && dispatch(getActivityUnitFilter())
                    : pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/movements'
                    ? postResponse?.status === true && dispatch(getActivityBatchFilter())
                    : pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
                    ? postResponse?.status === true && dispatch(getNotifyUnitFilter(urlEndPoint))
                    : pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
                    ? postResponse?.status === true && dispatch(getNotifyBatchFilter(urlEndPoint))
                    : props?.history?.location?.pathname == '/dashboard/reports/wasted-units'
                    ? postResponse?.status === true && dispatch(getWastedUnitFilter(urlEndPoint))
                    : props?.history?.location?.pathname == '/dashboard/reports/wasted-batch'
                    ? postResponse?.status === true && dispatch(getWastedBatchFilter(urlEndPoint))
                    : props?.history?.location?.pathname == '/dashboard/reports/transfused-units'
                    ? postResponse?.status === true && dispatch(getTransfusedUnitFilter(urlEndPoint))
                    : props?.history?.location?.pathname == '/dashboard/reports/transfused-batch'
                    ? postResponse?.status === true && dispatch(getTransfusedBatchFilter(urlEndPoint))
                                                : props?.history?.location?.pathname == '/dashboard/manage/recipient' || props?.history?.location?.pathname == '/dashboard/reports/recipient'
                    ? postResponse?.status === true && dispatch(getRecipientFilter(urlEndPoint))
                                                    : props?.history?.location?.pathname == '/dashboard/manage/user' || props?.history?.location?.pathname == '/dashboard/reports/user'
                                                        ? postResponse?.status === true && dispatch(getUserFilter(urlEndPoint))
                                                        : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                            ? dispatch(getActivityUnitFilter(fatedStatus))
                                                            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                                ? dispatch(getActivityBatchFilter(fatedStatus))
                                                                : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                                    ? dispatch(getActivityUnitFilter(expiryStatus))
                                                                    : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                                        ? dispatch(getActivityBatchFilter(expiryStatus))
                                                                        : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                            ? dispatch(getActivityUnitFilter(assignStatus))
                                                                            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                                ? dispatch(getActivityBatchFilter(assignStatus))
                                                                                : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                                    ? dispatch(getActivityUnitFilter(dereservationStatus))
                                                                                    : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                                        ? dispatch(getActivityBatchFilter(dereservationStatus))
                                                                                        : props?.history?.location?.pathname == '/dashboard/reports/unit'
                                                                                            ? dispatch(getFilter())
                    : null;
                postResponse?.status === true && setErrorMessage(null);
            } else {
                postResponse?.status === true && setOpenAdd(false);
                pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/movements'
                    ? postResponse?.status === true && dispatch(getActivityUnitFilter())
                    : pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/movements'
                    ? postResponse?.status === true && dispatch(getActivityBatchFilter())
                    : pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
                    ? postResponse?.status === true && dispatch(getNotifyUnitFilter(urlEndPoint))
                    : pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
                    ? postResponse?.status === true && dispatch(getNotifyBatchFilter(urlEndPoint))
                    : props?.history?.location?.pathname == '/dashboard/reports/wasted-units'
                    ? postResponse?.status === true && dispatch(getWastedUnitFilter(urlEndPoint))
                    : props?.history?.location?.pathname == '/dashboard/reports/wasted-batch'
                    ? postResponse?.status === true && dispatch(getWastedBatchFilter(urlEndPoint))
                    : props?.history?.location?.pathname == '/dashboard/reports/transfused-units'
                    ? postResponse?.status === true && dispatch(getTransfusedUnitFilter(urlEndPoint))
                    : props?.history?.location?.pathname == '/dashboard/reports/transfused-batch'
                    ? postResponse?.status === true && dispatch(getTransfusedBatchFilter(urlEndPoint))
                                                : props?.history?.location?.pathname == '/dashboard/manage/recipient' || props?.history?.location?.pathname == '/dashboard/reports/recipient'
                    ? postResponse?.status === true && dispatch(getRecipientFilter(urlEndPoint))
                                                    : props?.history?.location?.pathname == '/dashboard/manage/user' || props?.history?.location?.pathname == '/dashboard/reports/user'
                                                        ? postResponse?.status === true && dispatch(getUserFilter(urlEndPoint))
                                                        : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                            ? dispatch(getActivityUnitFilter(fatedStatus))
                                                            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                                ? dispatch(getActivityBatchFilter(fatedStatus))
                                                                : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                                    ? dispatch(getActivityUnitFilter(expiryStatus))
                                                                    : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                                        ? dispatch(getActivityBatchFilter(expiryStatus))
                                                                        : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                            ? dispatch(getActivityUnitFilter(assignStatus))
                                                                            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                                ? dispatch(getActivityBatchFilter(assignStatus))
                                                                                : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                                    ? dispatch(getActivityUnitFilter(dereservationStatus))
                                                                                    : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                                        ? dispatch(getActivityBatchFilter(dereservationStatus))
                                                                                        : props?.history?.location?.pathname == '/dashboard/reports/unit'
                                                                                            ? dispatch(getFilter())
                    : null;
                postResponse?.status === true && setErrorMessage(null);
            }
        } else if (nextClick) {
            urlEndPoint === 'drawer'
                ? dispatch(getDropDown(dropDownData, JSON.stringify([{ key: 'drawerId.level', value: 2 }])))
                : dispatch(getDropDown(dropDownData));
            dispatch(get2ndDropdown(secondDropdown));
            label !== 'User' && dispatch(get3rdDropdown(thirdDropdown));
            dispatch(get4thDropdown(fourthDropdown));
            dispatch(get5thDropdown(fifthDropdown));
            dispatch(get6thDropdown(sixthDropdown));
            dispatch(get7thDropdown(seventhDropdown));
            // dispatch(get8thDropdown(eightDropdown));
            urlEndPoint === 'displayconfig' && dispatch(getCollectionDropdown());
        }
    }, [postResponse, pageFilter]);

    useEffect(() => {
        putResponse?.status === true && setAlertOpen2(true);
        if (putResponse?.status) {
            if (showFilters.length > 0 && searchKey?.length > 2 && sortValue?.key) {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, showFilters, sortValue, pageFilter));
            } else if (searchKey?.length > 2 && showFilters?.length > 0) {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, showFilters, undefined, pageFilter));
            } else if (searchKey?.length > 2 && sortValue?.key) {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, undefined, sortValue, pageFilter));
            } else if (showFilters?.length > 0 && sortValue?.key) {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, showFilters, sortValue, pageFilter));
            } else if (searchKey?.length > 2) {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, undefined, undefined, pageFilter));
            } else if (sortValue?.key) {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, undefined, sortValue, pageFilter));
            } else if (showFilters?.length > 0) {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, showFilters, undefined, pageFilter));
            } else {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, undefined, undefined, pageFilter));
            }
            setIsInitCall(false);
        }
        // putResponse?.status === true &&
        //     dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, undefined, undefined, pageFilter)) &&

        putResponse?.status === false && setEditDialogOpen(true);
        putError?.errorMessage && setErrorMessage(putError?.errorMessage);
        putError?.errorMessage && dispatch(createErrorDialog(putError?.errorMessage));
        putResponse?.status === true && setIsEdit(false);
        putResponse?.status === true && resetFormData();
        putResponse?.status === true && setErrorMessage(null);
        pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/movements'
            ? postResponse?.status === true && dispatch(getActivityUnitFilter())
            : pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/movements'
            ? postResponse?.status === true && dispatch(getActivityBatchFilter())
            : pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
            ? postResponse?.status === true && dispatch(getNotifyUnitFilter(urlEndPoint))
            : pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
            ? postResponse?.status === true && dispatch(getNotifyBatchFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/wasted-units'
            ? postResponse?.status === true && dispatch(getWastedUnitFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/wasted-batch'
            ? postResponse?.status === true && dispatch(getWastedBatchFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/transfused-units'
            ? postResponse?.status === true && dispatch(getTransfusedUnitFilter(urlEndPoint))
            : props?.history?.location?.pathname == '/dashboard/reports/transfused-batch'
            ? postResponse?.status === true && dispatch(getTransfusedBatchFilter(urlEndPoint))
                                        : props?.history?.location?.pathname == '/dashboard/manage/recipient' || props?.history?.location?.pathname == '/dashboard/reports/recipient'
            ? postResponse?.status === true && dispatch(getRecipientFilter(urlEndPoint))
                                            : props?.history?.location?.pathname == '/dashboard/manage/user' || props?.history?.location?.pathname == '/dashboard/reports/user'
                                                ? postResponse?.status === true && dispatch(getUserFilter(urlEndPoint))
                                                : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                    ? dispatch(getActivityUnitFilter(fatedStatus))
                                                    : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                        ? dispatch(getActivityBatchFilter(fatedStatus))
                                                        : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                            ? dispatch(getActivityUnitFilter(expiryStatus))
                                                            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                                ? dispatch(getActivityBatchFilter(expiryStatus))
                                                                : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                    ? dispatch(getActivityUnitFilter(assignStatus))
                                                                    : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                        ? dispatch(getActivityBatchFilter(assignStatus))
                                                                        : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                            ? dispatch(getActivityUnitFilter(dereservationStatus))
                                                                            : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                                ? dispatch(getActivityBatchFilter(dereservationStatus))
                                                                                : props?.history?.location?.pathname == '/dashboard/reports/unit'
                                                                                    ? dispatch(getFilter())
            : null;
        putError?.errorMessage && dispatch(clearPutResponse());
        putResponse?.status === true && clearAllDropDowns();

        // putError?.errorMessage && dispatch(clearPutResponse());
        setTimeout(() => {
            dispatch(clearPutResponse());
        }, 3000);
    }, [putResponse, putError, pageFilter]);
    useEffect(() => {
        putResponse?.status === true && setEditDialogOpen(false);
    }, [putResponse]);
    const [
        inputs,
        onFormChange,
        handleEditChange,
        setSubmit,
        resetFormData,
        handleDateChange,
        handleChangeAutocomplete,
        handleEditChangeAutocomplete
    ] = useForm(sortedFieldSequence, submitCallback, rowData, setRowData, setNextClick, userInfo);

    const handleDownloadData = async () => {
        const userLogin = localStorage?.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                type: 'Web',
                Authorization: userLogin.data.token
            },
            responseType: 'blob'
        };
        let url = `${CONSTANTS.BASEURL}index/export?collectionName=${urlEndPoint}&screenName=${screenName}`;
        url = `${url}&pageSize=${100000}`;
        // url = `${url}&type=${1}`;
        url = `${url}&type=${pageFilter}`;
        if (searchKey !== undefined && searchKey.length > 0) url = `${url}&search=${JSON.stringify(searchKey)}`;
        if (showFilters !== undefined && showFilters.length > 0) url = `${url}&filters=${JSON.stringify(showFilters)}`;
        if (sortValue !== undefined && sortValue !== null && Object.keys(sortValue)?.length > 0)
            url = `${url}&sort=${JSON.stringify(sortValue)}`;
        // let url = `${CONSTANTS.BASEURL}index/export?collectionName=${urlEndPoint}&screenName=${screenName}&pageSize=100000&pageNumber=1`;
        await axios.get(url, config).then((response) => {
            FileDownload(response?.data, screenName + '_' + new Date().getTime().toString() + '.xlsx');
        });
    };

    const handleDialog = () => {
        setDialogOpen(!dialogOpen);
        setErrorMessage('');
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
        setErrorMessage('');
    };
    const handleDeleteDialog = () => {
        setDeleteDialogOpen(!deleteDialogOpen);
        setErrorMessage('');
    };
    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setErrorMessage('');
    };

    const handleDeactivateDialog = () => {
        setDeactivateDialogOpen(!deactivateDialogOpen);
        setErrorMessage('');
    };
    const handleDeactivateDialogClose = () => {
        setDeactivateDialogOpen(false);
        setErrorMessage('');
    };
    const handleCloseCancelDialog = () => {
        SetOpenErrorDialog(false);
        // setErrorDataResponse([])
        dispatch(clearErrorReportData());
    };
    const codeForFields = mData.code;

    const dropDownData =
        urlEndPoint === 'client'
            ? 'authorities'
            : urlEndPoint === 'authority'
            ? 'clients'
            : urlEndPoint === 'location'
            ? 'locationTypes'
            : urlEndPoint === 'device'
            ? 'deviceTypes'
            : urlEndPoint === 'user'
            ? 'userRoles'
            : urlEndPoint === 'recipient'
            ? 'bloodGroups'
            : urlEndPoint === 'usergroup'
            ? 'users'
            : urlEndPoint === 'productGroup'
            ? 'userGroups'
            : urlEndPoint === 'storagegroup'
            ? 'storageType'
            : urlEndPoint === 'functionalgroup'
            ? 'functionalType'
            : urlEndPoint === 'processgroup'
            ? 'processType'
            : urlEndPoint === 'field'
            ? 'fieldType'
            : urlEndPoint === 'productcode'
            ? 'productGroup'
            : urlEndPoint === 'useraccess'
            ? 'module'
            : urlEndPoint === 'rcondition'
            ? 'rconditionType'
            : urlEndPoint === 'resolutionsubtype'
            ? 'resolutionmaintype'
            : urlEndPoint === 'drawer'
            ? 'drawer'
            : urlEndPoint === 'usergroup'
            ? 'user'
            : null;
    useEffect(() => {
        urlEndPoint === 'location' && setSecondDropdown('clients');
        urlEndPoint === 'device' && setSecondDropdown('locations');
        urlEndPoint === 'device' && setThirdDropdown('clients');
        urlEndPoint === 'device' && setFourthDropdown('deviceGroup');
        urlEndPoint === 'device' && setFifthDropdown('functionalGroup');
        urlEndPoint === 'device' && setSixthDropdown('storageType');
        urlEndPoint === 'device' && setEightDropdown('locations');
        urlEndPoint === 'device' && setSeventhDropdown('devicetracks');
        urlEndPoint === 'field' && setSecondDropdown('validator');
        urlEndPoint === 'field' && setThirdDropdown('drawer');
        urlEndPoint === 'useraccess' && setSecondDropdown('user');
        urlEndPoint === 'useraccess' && setThirdDropdown('userGroups');
        urlEndPoint === 'rcondition' && setSecondDropdown('rconditionFieldType');
        urlEndPoint === 'resolutionsubtype' && setSecondDropdown('resolutionfieldtype');
        urlEndPoint === 'user' && setSecondDropdown('authorities');
        urlEndPoint === 'user' && setThirdDropdown('clients');
        urlEndPoint === 'user' && setFourthDropdown('useraccessrole');
        urlEndPoint === 'user' && setEightDropdown('location');
        urlEndPoint === 'displayconfig' && setSecondDropdown('columns');
    }, [urlEndPoint]);

    useEffect(() => {
        dispatch(getDeviceData());
    }, []);

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
                    combinedData.push({
                        x: new Date(item).getTime(),
                        y: temp[0]?.[index]
                    });
                }
            });
        } else {
            toDate.setDate(toDate.getDate() - d);
            temp[0]?.Date?.filter((item, index) => {
                if (item.split('T')[0] > toDate.toJSON().split('T')[0]) {
                    combinedData.push({ x: new Date(item).getTime(), y: temp[0]?.Temparature[index] });
                }
            });
        }
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
        console.log('value', value);
        setDaysNumber(number);
        setTempratureType(type);
        setActiveButton(value);
    };

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
        const defaultDevice = storageDevice?.find(device => device.name === value);


        if (defaultDevice) {

            dispatch(getTemperature(defaultDevice._id, daysNumber, tempratureType));
            console.log('Default device ID:', defaultDevice._id);
        }
        else {
            dispatch(getTemperature(selectedDevice, daysNumber, tempratureType));
        }
    }, [storageDevice, value, activeButton, selectedDevice]);

    const handleEditDialog = (row) => {
        urlEndPoint === 'drawer'
            ? dispatch(getDropDown('drawer', JSON.stringify([{ key: 'drawerId.level', value: 2 }])))
            : dispatch(getDropDown(dropDownData));
        dispatch(get2ndDropdown(secondDropdown));
        let filters = [{ key: 'authorityId._id', value: row?.authorityId?.[0]?._id }];
        label === 'User'
            ? dispatch(get3rdDropdown(thirdDropdown, JSON.stringify(filters)))
            : dispatch(get3rdDropdown(thirdDropdown));
        dispatch(get4thDropdown(fourthDropdown));
        dispatch(get5thDropdown(fifthDropdown));
        dispatch(get6thDropdown(sixthDropdown));
        dispatch(get7thDropdown(seventhDropdown));
        let filter2 = [{ key: 'clientId._id', value: row?.clientId?.[0]?._id }];
        dispatch(get8thDropdown(eightDropdown, JSON.stringify(filter2)));
        // dispatch(get8thDropdown(eightDropdown));
        urlEndPoint === 'displayconfig' && dispatch(getCollectionDropdown());
        setEditDialogOpen(true);
        setIsEdit(true);
    };

    const handleCloneDialog = (row) => {
        urlEndPoint === 'drawer'
            ? dispatch(getDropDown(dropDownData, JSON.stringify([{ key: 'drawerId.level', value: 2 }])))
            : dispatch(getDropDown(dropDownData));

        dispatch(get2ndDropdown(secondDropdown));
        let filters = [{ key: 'authorityId._id', value: row?.authorityId?.[0]?._id }];
        label === 'User'
            ? dispatch(get3rdDropdown(thirdDropdown, JSON.stringify(filters)))
            : dispatch(get3rdDropdown(thirdDropdown));
        dispatch(get4thDropdown(fourthDropdown));
        dispatch(get5thDropdown(fifthDropdown));
        dispatch(get6thDropdown(sixthDropdown));
        dispatch(get7thDropdown(seventhDropdown));

        let filter2 = [{ key: 'clientId._id', value: row?.clientId?.[0]?._id }];
        dispatch(get8thDropdown(eightDropdown, JSON.stringify(filter2)));
        // dispatch(get8thDropdown(eightDropdown));
        urlEndPoint === 'displayconfig' && dispatch(getCollectionDropdown());
        setCloneDialogOpen(true);
        setIsClone(true);
        setNextClick(false);
    };
    const handleEditDialogClose = () => {
        setRowData(JSON.parse(localStorage.getItem('initialData')));
        setEditDialogOpen(false);
        setErrorMessage(null);
        setIsEdit(false);
        resetFormData();
        dispatch(clearPutResponse());
        clearAllDropDowns();
    };

    const handleCloneDialogClose = () => {
        setRowData(JSON.parse(localStorage.getItem('initialData')));
        setCloneDialogOpen(false);
        setErrorMessage(null);
        setIsClone(false);
        resetFormData();
        setErrorMessage('');
        dispatch(clearPostResponse());
        clearAllDropDowns();
    };

    const handleOpenAdd = () => {
        urlEndPoint === 'drawer'
            ? dispatch(getDropDown(dropDownData, JSON.stringify([{ key: 'drawerId.level', value: 2 }])))
            : dispatch(getDropDown(dropDownData));

        dispatch(get2ndDropdown(secondDropdown));
        label !== 'User' && dispatch(get3rdDropdown(thirdDropdown));
        dispatch(get4thDropdown(fourthDropdown));
        dispatch(get5thDropdown(fifthDropdown));
        dispatch(get6thDropdown(sixthDropdown));
        dispatch(get7thDropdown(seventhDropdown));
        // dispatch(get8thDropdown(eightDropdown));
        urlEndPoint === 'displayconfig' && dispatch(getCollectionDropdown());
        setOpenAdd(true);
        setRowData({});
    };

    const handleCompleteButtonClick = () => {
        setSubmit(nextClick);
    };
    const handleDeleteButtonClick = () => {
        dispatch(deleteFormData(urlEndPoint, rowData._id));
    };

    const handleDeleteSelected = () => {
        dispatch(deleteSelectedRecords(urlEndPoint, selectedRecords));
        setSelectedRecords([]);
    };

    const handleDeactivateSelected = () => {
        dispatch(deactivateSelectedRecords(urlEndPoint, selectedRecords));
        setSelectedRecords([]);
    };

    useEffect(() => {
        if (deleteResponse && deleteResponse.status === true) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: deleteResponse.message,
                    alertType: 'success'
                })
            );
            //setDeleteAlert(true);
            setIsInitCall(false);
            dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, undefined, undefined, pageFilter));
            pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/movements'
                ? dispatch(getActivityUnitFilter())
                : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/movements'
                ? dispatch(getActivityBatchFilter())
                : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
                ? dispatch(getNotifyUnitFilter(urlEndPoint))
                : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/notifications'
                ? dispatch(getNotifyBatchFilter(urlEndPoint))
                : props?.history?.location?.pathname == '/dashboard/reports/wasted-units'
                ? dispatch(getWastedUnitFilter(urlEndPoint))
                : props?.history?.location?.pathname == '/dashboard/reports/wasted-batch'
                ? dispatch(getWastedBatchFilter(urlEndPoint))
                : props?.history?.location?.pathname == '/dashboard/reports/transfused-units'
                ? dispatch(getTransfusedUnitFilter(urlEndPoint))
                : props?.history?.location?.pathname == '/dashboard/reports/transfused-batch'
                ? dispatch(getTransfusedBatchFilter(urlEndPoint))
                                            : props?.history?.location?.pathname == '/dashboard/manage/recipient' || props?.history?.location?.pathname == '/dashboard/reports/recipient'
                ? dispatch(getRecipientFilter(urlEndPoint))
                                                : props?.history?.location?.pathname == '/dashboard/manage/user' || props?.history?.location?.pathname == '/dashboard/reports/user'
                                                    ? dispatch(getUserFilter(urlEndPoint))
                                                    : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                        ? dispatch(getActivityUnitFilter(fatedStatus ))
                                                        : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                                            ? dispatch(getActivityBatchFilter(fatedStatus))
                                                            : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                                ? dispatch(getActivityUnitFilter(expiryStatus))
                                                                : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                                                    ? dispatch(getActivityBatchFilter(expiryStatus))
                                                                    : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                        ? dispatch(getActivityUnitFilter(assignStatus))
                                                                        : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                                                            ? dispatch(getActivityBatchFilter(assignStatus))
                                                                            : pageFilter === 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                                ? dispatch(getActivityUnitFilter(dereservationStatus))
                                                                                : pageFilter === 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/dereservation'
                                                                                    ? dispatch(getActivityBatchFilter(dereservationStatus))
                                                                                    : props?.history?.location?.pathname == '/dashboard/reports/unit'
                                                                                        ? dispatch(getFilter())
                : null;
            setDialogOpen(false);
            setDeleteDialogOpen(false);
            setDeactivateDialogOpen(false);
        } else if (deleteError) {
            setErrorMessage(deleteError?.errorMessage);
            // setDialogOpen(true);
        }
        return () => {
            setTimeout(() => {
                dispatch(clearDeleteResponse());
            }, 3000);
        };
    }, [deleteResponse, deleteError, pageFilter]);
    const handleNextClick = () => {
        setNextClick(true);
    };
    useEffect(() => {
        nextClick && setSubmit(nextClick);
    }, [nextClick]);

    const handleCloseAdd = () => {
        setOpenAdd(false);
        resetFormData();
        setErrorMessage('');
        dispatch(clearPostResponse());
        clearAllDropDowns();
    };
    const handleFilters = (filterData) => {
        console.log('handlefilters');
        let tempCollectionName;
        let filters;
        if (urlEndPoint.includes('&')) {
            console.log('&&&&&&&&');
            tempCollectionName = urlEndPoint.split('&')[0];
            let urlFilter = JSON.parse(urlEndPoint.split('=')[1]);
            console.log('urlfilter--',urlFilter)
            if (urlFilter) {
                filters = [...urlFilter, ...filterData];
            }
        } else {
            console.log('||||||||');
            tempCollectionName = urlEndPoint;
            filters = filterData;
            console.log('ffffff', filters);
        }
        setPageNum(0);
        console.log('urlll', urlEndPoint);
        dispatch(clearData());
        localStorage.setItem('filter', JSON.stringify(filters));
        setShowFilters(filters);

        setIsInitCall(false);
        if (searchKey.length > 2 && sortValue?.key) {
            dispatch(getData(tempCollectionName, pageSize * 3, 1, searchKey, filters, sortValue, pageFilter));
        } else if (searchKey?.length > 2) {
            dispatch(getData(tempCollectionName, pageSize * 3, 1, searchKey, filters, undefined, pageFilter));
        } else if (sortValue?.key) {
            dispatch(getData(tempCollectionName, pageSize * 3, 1, undefined, filters, sortValue, pageFilter));
        } else {
            dispatch(getData(tempCollectionName, pageSize * 3, 1, undefined, filters, undefined, pageFilter));
        }
    };

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
        dispatch(get8thDropdown('devices'));
    }, []);
    const [emergencyId, setEmergencyId] = useState();
    const [remoteId, setRemoteId] = useState();

    React.useEffect(() => {
        if (options8) {
            let emergencyId = options8?.data?.find((obj) => obj?.name === 'Emergency Device');
            console.log('emergencyId---', emergencyId);
            setEmergencyId(emergencyId?._id);
            let remotedevice = options8?.data?.find((obj) => obj?.name === 'Theater Fridge');
            setRemoteId(remotedevice?._id);
        }
    }, [options8, emergencyId, remoteId]);
    console.log('emer---', emergencyId);
    const [filters, setFilters] = useState();

    useEffect(() => {
        let filtersDataDevice;
        filtersDataDevice = [
            {
                key: 'deviceId._id',
                value: ['6320991b7d29280d14a57145']
            }
        ];
        console.log('filter1--', filtersDataDevice);
        let filtersRemote;
        filtersRemote = [
            {
                key: 'deviceId._id',
                value: [remoteId]
            }
        ];
        console.log('filter2--', filtersRemote);
        if (getStaticFilters.staticFilters) {
            setIsInitCall(false);
            //console.log('filter data on page filters change === ', JSON.stringify(filtersData));
            setFilters(filtersData);
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, filtersData, undefined, pageFilter));
        } else {
            // console.log('page filters === ', JSON.stringify(pageFilter));
            setIsInitCall(true);
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, filters, undefined, pageFilter));
        }
    }, [pageFilter]);
    console.log('fffddd', filters);
    const handleResetFilters = () => {
        if (showFilters && searchKey.length > 2) {
            setIsInitCall(false);
            dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey, undefined, undefined, pageFilter));
        } else if (showFilters) {
            setIsInitCall(true);
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, undefined, undefined, pageFilter));
        }

        setShowFilters('');
        setFilterChips([]);
    };
    const tableHandleChange = (changeValue, pageNumberOrPageSizeFlag, ...rest) => {
        if (rest.length > 0) {
            //DoNothing
        } else {
            if (showFilters && pageNumberOrPageSizeFlag) {
                if (changeValue > pageNum) {
                    setIsInitCall(false);
                    dispatch(
                        getData(urlEndPoint, pageSize, changeValue + 3, undefined, showFilters, undefined, pageFilter)
                    );
                }
            } else if (showFilters && !pageNumberOrPageSizeFlag) {
                setPageSize(changeValue);
                setPageNum(0);
                setIsInitCall(false);
                dispatch(getData(urlEndPoint, changeValue * 3, 1, undefined, showFilters, undefined, pageFilter));
            } else if (searchKey && pageNumberOrPageSizeFlag) {
                setIsInitCall(false);
                if (changeValue > pageNum) {
                    dispatch(
                        getData(urlEndPoint, pageSize, changeValue + 3, searchKey, undefined, undefined, pageFilter)
                    );
                }
            } else if (searchKey && !pageNumberOrPageSizeFlag) {
                setIsInitCall(false);
                setPageSize(changeValue);
                setPageNum(0);
                dispatch(getData(urlEndPoint, changeValue * 3, 1, searchKey, undefined, undefined, pageFilter));
            } else if (pageNumberOrPageSizeFlag) {
                if (sortValue && sortValue.key) {
                    setIsInitCall(false);
                    dispatch(
                        getData(urlEndPoint, pageSize, changeValue + 3, undefined, undefined, sortValue, pageFilter)
                    );
                } else if (changeValue > pageNum) {
                    setIsInitCall(false);
                    dispatch(
                        getData(urlEndPoint, pageSize, changeValue + 3, undefined, undefined, undefined, pageFilter)
                    );
                } else {
                    setPageNum(changeValue);
                }
            } else {
                // console.log('CAlling get data from else, page filter = ', JSON.stringify(pageFilter));
                setIsInitCall(false);
                setPageSize(changeValue);
                dispatch(getData(urlEndPoint, changeValue * 3, 1, undefined, undefined, undefined, pageFilter));
                setPageNum(0);
            }

            if (changeValue && pageNumberOrPageSizeFlag) {
                if (changeValue > pageNum) setPageNum(changeValue);
            }
        }
    };

    const sortOperation = (sort) => {
        setSortValue(sort);
        localStorage.setItem('sort', JSON.stringify(sort));
        if (showFilters.length > 0 && searchKey?.length > 2) {
            setIsInitCall(false);
            dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey, showFilters, sort, pageFilter));
        } else if (searchKey?.length > 2) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey, undefined, sort, pageFilter));
        } else if (showFilters?.length > 0) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters, sort, pageFilter));
        } else if (urlEndPoint.includes('&') && userInfo?.data?.user?.clientId) {
            // let clientFilter = { key: 'clientId._id', value: userInfo?.data?.user?.clientId };
            let urlEndFilter = urlEndPoint.split('=');
            let addfilter = JSON.parse(urlEndFilter[1]);
            // addfilter.push(clientFilter);
            urlEndFilter[1] = JSON.stringify(addfilter);
            let clientUrl = urlEndFilter.join('=');
            setIsInitCall(false);
            dispatch(getData(clientUrl, pageSize * 3, 1, undefined, undefined, sort, pageFilter));
        } else {
            setIsInitCall(false);
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, undefined, sort, pageFilter));
        }
    };

    const handleSearchDelete = () => {
        setIsInitCall(false);
        // if (showFilters?.length > 0 && sortValue?.key) {
        //     // setIsInitCall(false);
        //     dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters, sortValue, pageFilter));
        // } else if (filterChips?.length > 0) {
        //     // setIsInitCall(false);
        //     dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters, undefined, pageFilter));
        // } else if (sortValue?.key) {
        //     // setIsInitCall(false);
        //     dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, undefined, sortValue, pageFilter));
        // } else {
        //     // setIsInitCall(true)
        //     dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, undefined, undefined, pageFilter));
        // }
        setSearchKey('');
    };

    const handleSearch = (key) => {
        if (key.length >= 2) {
            if (!searched) {
                setSearched(true);
            }
            dispatch(clearData());
            setIsInitCall(false);
            if (showFilters.length > 0 && sortValue?.key) {
                dispatch(getData(urlEndPoint, 0, 1, key.trim(), showFilters, sortValue, pageFilter));
            } else if (sortValue?.key) {
                dispatch(getData(urlEndPoint, 0, 1, key.trim(), undefined, sortValue, pageFilter));
            } else if (showFilters?.length > 0) {
                dispatch(getData(urlEndPoint, 0, 1, key.trim(), showFilters, undefined, pageFilter));
            } else {
                dispatch(getData(urlEndPoint, 0, 1, key.trim(), undefined, undefined, pageFilter));
            }
        } else if (showFilters.length > 0 && sortValue?.key) {
            setIsInitCall(false);
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters, sortValue, pageFilter));
        } else if (filterChips.length > 0) {
            setIsInitCall(false);
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters, undefined, pageFilter));
        } else if (sortValue?.key) {
            setIsInitCall(false);
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, undefined, sortValue, pageFilter));
        } else if (searched) {
            setIsInitCall(true);
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, undefined, undefined, pageFilter));
        }
    };

    const handleSearchKey = (key) => {
        if (key?.includes('=') && (key?.length === 16 || key?.length === 14)) {
            key = key?.substr(1)?.trim();
        }
        localStorage.setItem('search', key);
        setSearchKey(key);
    };

    useEffect(() => {
        if (searchKey) {
            if (searchKey?.length > 2) {
                handleSearch(searchKey);
            }
            // const timeOutId = setTimeout(() => {

            // }, 500);
            // return () => {
            //     clearTimeout(timeOutId);
            // };
        } else if (searchKey === '') {
            handleSearch(searchKey);
        }
    }, [searchKey]);
    const [transactionResponse, setTransactionResponse] = useState({});

    useEffect(() => {
        // console.log(' =============== on response isInitCall ======================', isInitCall);
        if (
            searchKey.length === 0 &&
            filterChips.length === 0 &&
            responseData?.page?.filterCount < responseData?.page?.totalCount
        ) {
            setTotalCount(responseData?.page?.filterCount);
            // console.log('filter criteria ===== ', JSON.stringify(filtersData));
            if (isInitCall) {
                // console.log(' =============== is init call ======================', responseData?.page?.filterCount);
                setActualTotalCount(responseData?.page?.filterCount);
            }
        } else {
            // console.log('filter criteria ===== ', JSON.stringify(filtersData));
            setTotalCount(responseData?.page?.totalCount);
            if (isInitCall) {
                // console.log(' =============== is init call ======================', responseData?.page?.totalCount);
                setActualTotalCount(responseData?.page?.totalCount);
            }
            console.log('res data', responseData);
        }

        if (selectAllRecords) {
            let selectedDummyRecords = selectedRecords;
            responseData?.data?.map((ele) => {
                !selectedDummyRecords?.includes(ele._id) &&
                    !unchecked.includes(ele._id) &&
                    selectedDummyRecords.push(ele._id);
            });

            setSelectedRecords(selectedDummyRecords);
        }
        if (selectedRecords.length > 0) {
            let tempNames = responseData?.data?.map((item) => item.name);
            setSelectedUserNames(tempNames);
        }

        if (urlEndPoint === 'transaction') {
            let tempResponse =
                responseData &&
                responseData.data &&
                responseData?.data?.map((ele) => {
                    return { ...ele, unitCounts: ele?.refskuId?.length || '-' };
                });
            setTransactionResponse({ ...responseData, data: tempResponse || [] });
        }
    }, [responseData]);
    // console.log(actualTotalCount,'actualTotalCount line 1042', totalCount);
    const handleVoucher = (row, displayConfig, name) => {
        console.log('nameeee', name);
        console.log('display', displayConfig);
        let childDataTable;
        if (displayConfig !== undefined) {
            childDataTable = displayConfig;
        } else {
            childDataTable = row && row?.childDataTable;
        }
        console.log('child', row?.childDataTable);
        let rowName;
        if (name) {
            rowName = name;
        } else if (row.name) {
            rowName = row?.name;
        } else {
            rowName = 'Row Info';
        }
        console.log('row', row);
        // if (row && row.name !== undefined && childDataTable !== undefined) {
        dispatch(getVoucherResponse(urlEndPoint, row._id, ));
        localStorage.setItem('currentRowName', JSON.stringify(rowName));
        localStorage.setItem('previousId&name', JSON.stringify([urlEndPoint, row._id]));
        localStorage.setItem('voucherConfig', JSON.stringify(displayConfig));

        /*  let navData = responseData?.displayConfigData?.map((obj) => obj?.dbProperty === 'deviceId[0].name');
        console.log('nav--', navData)
        let clientdata = responseData?.displayConfigData?.map((obj) => obj?.dbProperty === "clientId[0].name");

        let recipientdata = responseData?.displayConfigData?.map((obj) => obj?.dbProperty === "recipientId[0].name");

        let createddata = responseData?.displayConfigData?.map((obj) => obj?.dbProperty === "createdBy[0].name");

        if (props.location.pathname === '/dashboard/reports/movements' && navData ) {
            console.log("if")
            history.push(`/dashboard/v/manage/device/${row?.deviceId[0].name}/activities/device/${row?.deviceId[0]?._id}`)
        }
        else if (props.location.pathname === '/dashboard/reports/movements' && recipientdata ) {
            history.push(`/dashboard/v/manage/recipient/${row?.recipientId[0].name}/${childDataTable ? childDataTable : null}/recipient/${row?.recipientId[0]?._id}`)
        }
        else if (props.location.pathname === '/dashboard/reports/movements' && clientdata) {
            history.push(`/dashboard/v/manage/hospital/${row?.clientId[0].name}/${childDataTable ? childDataTable : null}/client/${row?.clientId[0]?._id}`)
        }
        else if (props.location.pathname === '/dashboard/reports/movements' && createddata) {
            history.push(`/dashboard/v/manage/user/${row?.createdBy[0].name}/${childDataTable ? childDataTable : null}/user/${row?.createdBy[0]?._id}`)
        }
        else {
            history.push(
                `/dashboard/v/${url}/${row?.name?.toLowerCase()}/${childDataTable ? childDataTable : null}/${urlEndPoint}/${row._id}`
            );
        }*/
       
         //history.push({
         //    pathname: `/dashboard/v/${url}/${row?.name?.toLowerCase()}/${
         //        childDataTable ? childDataTable : null
         //    }/${urlEndPoint}/${row._id}`,
         //    state: { currentRowName: rowName, 'previousId&name': [urlEndPoint, row._id], voucherConfig: displayConfig }
         //});
    };
    useEffect(() => {
        if (filterChips?.length === 0) {
            setShowFilters('');
        }
    }, [filterChips]);
    const handleChipDelete = (chipToDelete) => () => {
        if (filterChips.length === 1) {
            setFilterChips([]);
            handleResetFilters();
        } else {
            doRefresh((prev) => prev + 1);
            setDeletedChip(chipToDelete);
            let value = [];
            //Checkbox will come here to reset
            filterChips.forEach((chip) => {
                if (chip !== chipToDelete) {
                    value.push(chip);
                }
            });
            console.log('urlfilter--', urlEndPoint)
            let tempFilterKeys = {};
            //pass track-code 
            let urlFilter = urlEndPoint?.split('=')[1];
           
            console.log('urlfilter--', urlFilter)
            let objToAdd = urlFilter ;
            let objectData = {};

           
            if (urlFilter?.length > 0) {
                objectData = urlFilter[0];
            }
            console.log('chatgpt--', objectData);
          
            tempFilterKeys[objectData] = objectData;
           

            if (chipToDelete in chipIdAndName === true) {
                let chipId = chipIdAndName[chipToDelete];
                showFilters?.forEach((chip) => {
                    if (chip && chip.value && chip.value.length > 0 && chip?.value?.includes(chipId)) {
                        let chipValue = chip?.value?.filter((item) => item !== chipId);
                        if (chipValue.length >= 1) {
                            tempFilterKeys[chip.key] = { key: chip.key, value: chipValue };
                        }
                    } else if (typeof chip === 'object') {
                        tempFilterKeys[chip.key] = chip;
                    }
                });
                // let tempFilterObjects = showFilters.filter((item) => typeof item === 'object');
                setShowFilters([...Object.values(tempFilterKeys)]);
                // setShowFilters([...tempFilterKeys]);
            } else {
                let currentKey = filterKeysObject.filter((nextItem) => chipToDelete.includes(nextItem.label))[0]?.name;

                // let toBeDeletedFilter = typeof chipToDelete !== 'number' ? chipToDelete.split(' ')[0] : chipToDelete;
                if (currentKey) {
                    showFilters.forEach((item) => {
                        if (item.key !== currentKey) {
                            tempFilterKeys[item.key] = item;
                        }
                    });
                    setShowFilters(Object.values(tempFilterKeys));
                }

                // setShowFilters([...tempFilterKeys]);
            }

            setFilterChips(value);
            let tempUrlPoint = urlEndPoint.includes('&') ? urlEndPoint.split('&')[0] : urlEndPoint;
            
            if (
                tempFilterKeys &&
                Object.values(tempFilterKeys)[0] !== null &&
                Object.values(tempFilterKeys).length > 0
            ) {
                setIsInitCall(false);
                if (searchKey.length > 2 && sortValue?.key) {
                    dispatch(
                        getData(tempUrlPoint, 30, 1, searchKey, Object.values(tempFilterKeys), sortValue, pageFilter)
                    );
                } else if (sortValue?.key) {
                    dispatch(
                        getData(tempUrlPoint, 30, 1, undefined, Object.values(tempFilterKeys), sortValue, pageFilter)
                    );
                } else if (searchKey?.length > 2) {
                    dispatch(
                        getData(tempUrlPoint, 30, 1, searchKey, Object.values(tempFilterKeys), undefined, pageFilter)
                    );
                } else {
                    dispatch(
                        getData(tempUrlPoint, 30, 1, undefined, Object.values(tempFilterKeys), undefined, pageFilter)
                    );
                }
            }
        }
    };

    const handleSelect = (selRecords, flag, unSelected, againSelected) => {
        if (againSelected === true) {
            setSelectedRecords([...selRecords, unSelected]);
        } else if (unSelected !== undefined) {
            setSelectedRecords([...selRecords.filter((item) => item !== unSelected)]);
        } else {
            setSelectedRecords(selRecords);
        }
        setSelectedAllRecordsFlag(flag);
        console.log('sel---------', selRecords);
    };

    useEffect(() => {
        if (chipData?.length > 0) {
            setFilterChips([...new Set(chipData)]);

            setChipIdAndName({ ...chipNameAndId });
            setShowFilters([...filtersData]);
            dispatch(resetFilters());
        }
        else if (chipData?.length == 0 && showFilters == '') {
            handleResetFilters()
        }
    }, [getStaticFilters]);

    useEffect(() => {
        if (postAddUserGroupResponse && postAddUserGroupResponse.status === true) {
            setAddUserGroupAlert(true);
            setUserGroupDialog(false);
        }
        postAddUserGroupError?.errorMessage && setErrorMessage(postError?.errorMessage);
        postAddUserGroupError?.errorMessage && dispatch(createErrorDialog(postError?.errorMessage));
    }, [postAddUserGroupResponse, postAddUserGroupError]);

    const handleUserGroupDialog = () => {
        setUserGroupDialog(!userGroupDialog);
        setuserGroupName('');
        setUserGroupDescription('');
    };

    const handleSaveUserGroup = () => {
        let newValidData = userGroupDescription
            ? { name: userGroupName, description: userGroupDescription, 'user-multiple': selectedRecords }
            : { name: userGroupName, 'user-multiple': selectedRecords };

        let requestBody = {
            collectionName: 'usergroup',
            validData: newValidData
        };
        dispatch(postAddUserGroup(JSON.stringify(requestBody)));
        // console.log('save button +requestBody+newValidData', requestBody, newValidData);
    };

    const addUserGroupCustomForm = (
        <Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>Name</InputLabel>
                    <CustomInput
                        value={userGroupName}
                        onChange={(e) => setuserGroupName(e.target.value)}
                        fullWidth
                        style={{ width: 300 }}
                        className={classes.textField}
                        size="lg"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>Description</InputLabel>
                    <CustomInput
                        value={userGroupDescription}
                        onChange={(e) => setUserGroupDescription(e.target.value)}
                        fullWidth
                        style={{ width: 300 }}
                        className={classes.textField}
                        size="lg"
                    />
                </Grid>
            </Grid>
        </Grid>
    );

    const handleReceived = (rowId) => {
        let tempFilters = responseData?.data.filter((item) => item._id === rowId._id);
        let unitIds = tempFilters[0].refskuId?.map((item) => item._id);
        let clientId = tempFilters[0]?.clientId[0]?._id;
        let voucherId = tempFilters?.[0]?._id;
        let deviceId = tempFilters?.[0]?.deviceId?.[0]?._id || tempFilters?.[0]?.deviceId;
        let locationId = tempFilters?.[0]?.locationId?.[0]?._id || tempFilters?.[0]?.locationId;

        // dispatch(getReceivedUnits({ unitIds, clientId, voucherId }));
        history.push({
            pathname: '/dashboard/receive-unit',
            state: { unitIds, clientId, voucherId, rowId, deviceId, locationId }
        });
    };
    const handleVoucherOrReceived = (row, displayConfig, name) => {
        if (row.transactionStatus === 'Done') {
            history.push({
                pathname: `/dashboard/transaction-voucher/${screenName}`,
                state: { data: [...row?.refskuId], row }
            });
        } else {
            handleReceived(row);
        }
    };

    function handleBackClick() {
        dispatch(resetFilters());
        history.goBack();
    }

    const handleRequestPullOutDialog = (row) => {
        dispatch(requestPulloutDialogOpen(true));
        localStorage.setItem('selectionIdStatic', row._id);
        dispatch(requestPullOutId(row._id));
        setPullOutIdStatic({ rowId: row._id, refskus: row.requestListToPullOut });
        dispatch(refreshPullOutData(row._id));
    };

    const handleErrorVoucherView = (row) => {
        dispatch(errorReportData(row._id));
        SetOpenErrorDialog(true);
    };
    // console.log('errorReportData', errorData.data, errorDataResponse);

    const onCloseOfPullOutDialog = () => {
        // dispatch(getData('requestpullouts', pageSize * 3, 1));
    };

    const handleUserAccessRoleVoucherView = (row) => {
        history.push({
            pathname: `/dashboard/user-access-control/voucher/${row?.name?.toLowerCase()} ${row?._id}`,
            state: { data: row, displayConf: responseData.displayConfigData }
        });
    };

    const changeViewOptions = (e) => {
        const {
            target: { value: _value }
        } = e;
        setView(Number(_value));
    };
    // console.log(loading, responseData, 'table response in manage', urlEndPoint,breadScrumbLebel);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const [comments, setComments] = useState('');
    console.log('comments', comments);

    const [selectedStatus, setUpdateStatus] = React.useState('');
    console.log('sts', selectedStatus);

    const [open, setOpen] = useState(false);

    const updateStatus = () => {
        if (!users) {
            setUserError(true);
            return;
        } else {
            setUserError(false);
        }

        if (selectedRecords.length > 0) {
            const formObj = {
                notificationId: selectedRecords,
                status: selectedStatus,
                userId: userId,
                //deviceId: '6320991b7d29280d14a57145',
                comments: comments
            };
            dispatch(putAction(formObj));
        }

        window.location.reload();
        setOpen(false);
        setComments('');
        setSelectedRecords([]);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const openCommentsPopup = (status) => {
        setOpen(true);
        setUpdateStatus(status);
    };

    const onCloseCommentDialog = () => {
        setOpen(false);
        setComments('');
        setSelectedRecords([]);
    };

    const addCommentsForm = (
        <Grid>
            <Grid container spacing={2}>
                <Grid item spacing={2}>
                    <Grid item xs={8} style={{ paddingBottom: '10px' }}>
                        <Typography className={classes.inputLabel} variant="subtitle1">
                            Username
                        </Typography>
                        <SelectOption
                            label="Select User"
                            onChange={handleUserChange}
                            value={users}
                            minWidth={250}
                            noLabel={true}
                            options={options4?.data || []}
                            placeHolder="Select User"
                            //onOpen={handleEmptyDevices}
                            //loading={options8loading}
                        />
                        {userError && (
                            <Typography
                                style={{ fontSize: '0.75rem', width: '100%', display: 'flex' }}
                                color="error"
                                variant="subtitle1"
                            >
                                User is required
                            </Typography>
                        )}
                    </Grid>

                    <InputLabel className={classes.inputLabel}>Comments</InputLabel>
                </Grid>
                <CustomInput
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    fullWidth
                    // style={{ width: 600 }}
                    className={classes.textField}
                    size="lg"
                    multiline
                />
            </Grid>
        </Grid>
    );

    return (
        <div>
            {manageLoading ? (
                <div className={classes.loaderDivStyles}>
                    <Loader />
                </div>
            ) : accessableCodes.length === 0 ? (
                <PageNotFound />
            ) : (
                <>
                    <Paper elevation={0} className={classes.paper}>
                        <Grid container justify="space-between" alignItems="center" spacing={screenIndex === 1 && 2}>
                            {screenIndex === 1 && (
                                <Grid item>
                                    <Grid item xs={1} className={classes.backButton}>
                                        <CustomButton variant="outlined" onClick={handleBackClick}>
                                            Back
                                        </CustomButton>
                                    </Grid>
                                </Grid>
                            )}
                            <Grid item xs={4}>
                                        {accessableCodes?.includes('BS-ACO-1022') && props?.history?.location?.pathname !== '/dashboard/reports/temperature-history' &&
                                    !url.split('/').includes('transactions') && (
                                        <CustomSearch
                                            value={searchKey}
                                            size="md"
                                            placeholder={'Search'}
                                            handleChange={(e) =>
                                                e.target.value !== ' ' ? handleSearchKey(e.target.value) : null
                                            }
                                            handleSearchDelete={handleSearchDelete}
                                            loader={searchKey && searchKey.length < 3 ? true : searchKey && loading}
                                            disabled={
                                                !accessableCodes?.includes('BS-ACO-1022') &&
                                                !url.split('/').includes('transactions')
                                            }
                                        />
                                    )}
                            </Grid>
                            {screenIndex !== 1 && <Grid item xs={2} />}

                            {mangeModule === 'reports' &&
                                ![
                                    'recipient',
                                    'user',
                                    'device',
                                    'refsku',
                                    'transfusions',
                                    'errorreports',
                                    'temperatures',
                                    'wastedbatches',
                                    'wastedunits',
                                    'transfusedunits',
                                    'transfusedbatches'
                                ]?.includes(urlEndPoint) && (
                                    <Grid item xs={4} style={{ marginTop: -25 }}>
                                        <ReportFilter setPageFilter={setPageFilter} pageFilter={pageFilter} />
                                    </Grid>
                                )}
                            {pageFilter === 'Unit' &&
                                        props?.history?.location?.pathname == '/dashboard/reports/movements'
                                        || pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                        || pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                        || pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                        || pageFilter == 'Unit' && props?.history?.location?.pathname == '/dashboard/reports/dereservation' ? (
                                <Grid item>
                                    <HeaderIcons
                                        showIcons={[
                                            url.split('/').includes('transactions') ? null : 'excell',
                                            url.split('/').includes('transactions') ? null : 'filters',
                                            mangeModule !== 'reports' ? 'addButton' : null
                                        ]}
                                        disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                        handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                        label={label}
                                        enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                        enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                        enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                        handleFilters={handleFilters}
                                        // setFilterKeys={setFilterChips}
                                        handleResetFilters={handleResetFilters}
                                        response={responseData}
                                        handleDownloadData={handleDownloadData}
                                        selectedFilters={showFilters}
                                        refresh={refresh}
                                        deletedChip={deletedChip}
                                        setChipIdAndName={setChipIdAndName}
                                        setFilterKeysObject={setFilterKeysObject}
                                        remainingChips={filterChips}
                                        urlEndPoint={urlEndPoint}
                                        isActivityUnit={true}
                                    />
                                </Grid>
                            ) : pageFilter == 'Batch' &&
                                            props?.history?.location?.pathname == '/dashboard/reports/movements'
                                            || pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/fated'
                                            || pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/expiry'
                                            || pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/assigned'
                                            || pageFilter == 'Batch' && props?.history?.location?.pathname == '/dashboard/reports/dereservation' ? (
                                <Grid item>
                                    <HeaderIcons
                                        showIcons={[
                                            url.split('/').includes('transactions') ? null : 'excell',
                                            url.split('/').includes('transactions') ? null : 'filters',
                                            mangeModule !== 'reports' ? 'addButton' : null
                                        ]}
                                        disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                        handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                        label={label}
                                        enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                        enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                        enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                        handleFilters={handleFilters}
                                        // setFilterKeys={setFilterChips}
                                        handleResetFilters={handleResetFilters}
                                        response={responseData}
                                        handleDownloadData={handleDownloadData}
                                        selectedFilters={showFilters}
                                        refresh={refresh}
                                        deletedChip={deletedChip}
                                        setChipIdAndName={setChipIdAndName}
                                        setFilterKeysObject={setFilterKeysObject}
                                        remainingChips={filterChips}
                                        urlEndPoint={urlEndPoint}
                                        isActivityBatch={true}
                                    />
                                </Grid>
                            ) : pageFilter == 'Unit' &&
                              props?.history?.location?.pathname == '/dashboard/reports/notifications' ? (
                                <Grid item>
                                    <HeaderIcons
                                        showIcons={[
                                            url.split('/').includes('transactions') ? null : 'excell',
                                            url.split('/').includes('transactions') ? null : 'filters',
                                            mangeModule !== 'reports' ? 'addButton' : null
                                        ]}
                                        disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                        handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                        label={label}
                                        enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                        enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                        enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                        handleFilters={handleFilters}
                                        // setFilterKeys={setFilterChips}
                                        handleResetFilters={handleResetFilters}
                                        response={responseData}
                                        handleDownloadData={handleDownloadData}
                                        selectedFilters={showFilters}
                                        refresh={refresh}
                                        deletedChip={deletedChip}
                                        setChipIdAndName={setChipIdAndName}
                                        setFilterKeysObject={setFilterKeysObject}
                                        remainingChips={filterChips}
                                        urlEndPoint={urlEndPoint}
                                        isNotifyUnit={true}
                                    />
                                </Grid>
                            ) : pageFilter == 'Batch' &&
                              props?.history?.location?.pathname == '/dashboard/reports/notifications' ? (
                                <Grid item>
                                    <HeaderIcons
                                        showIcons={[
                                            url.split('/').includes('transactions') ? null : 'excell',
                                            url.split('/').includes('transactions') ? null : 'filters',
                                            mangeModule !== 'reports' ? 'addButton' : null
                                        ]}
                                        disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                        handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                        label={label}
                                        enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                        enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                        enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                        handleFilters={handleFilters}
                                        // setFilterKeys={setFilterChips}
                                        handleResetFilters={handleResetFilters}
                                        response={responseData}
                                        handleDownloadData={handleDownloadData}
                                        selectedFilters={showFilters}
                                        refresh={refresh}
                                        deletedChip={deletedChip}
                                        setChipIdAndName={setChipIdAndName}
                                        setFilterKeysObject={setFilterKeysObject}
                                        remainingChips={filterChips}
                                        urlEndPoint={urlEndPoint}
                                        isNotifyBatch={true}
                                    />
                                </Grid>
                            ) : props?.history?.location?.pathname == '/dashboard/reports/wasted-units' ? (
                                <Grid item>
                                    <HeaderIcons
                                        showIcons={[
                                            url.split('/').includes('transactions') ? null : 'excell',
                                            url.split('/').includes('transactions') ? null : 'filters',
                                            mangeModule !== 'reports' ? 'addButton' : null
                                        ]}
                                        disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                        handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                        label={label}
                                        enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                        enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                        enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                        handleFilters={handleFilters}
                                        // setFilterKeys={setFilterChips}
                                        handleResetFilters={handleResetFilters}
                                        response={responseData}
                                        handleDownloadData={handleDownloadData}
                                        selectedFilters={showFilters}
                                        refresh={refresh}
                                        deletedChip={deletedChip}
                                        setChipIdAndName={setChipIdAndName}
                                        setFilterKeysObject={setFilterKeysObject}
                                        remainingChips={filterChips}
                                        urlEndPoint={urlEndPoint}
                                        isWastedUnit={true}
                                    />
                                </Grid>
                            ) : props?.history?.location?.pathname == '/dashboard/reports/wasted-batch' ? (
                                <Grid item>
                                    <HeaderIcons
                                        showIcons={[
                                            url.split('/').includes('transactions') ? null : 'excell',
                                            url.split('/').includes('transactions') ? null : 'filters',
                                            mangeModule !== 'reports' ? 'addButton' : null
                                        ]}
                                        disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                        handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                        label={label}
                                        enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                        enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                        enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                        handleFilters={handleFilters}
                                        // setFilterKeys={setFilterChips}
                                        handleResetFilters={handleResetFilters}
                                        response={responseData}
                                        handleDownloadData={handleDownloadData}
                                        selectedFilters={showFilters}
                                        refresh={refresh}
                                        deletedChip={deletedChip}
                                        setChipIdAndName={setChipIdAndName}
                                        setFilterKeysObject={setFilterKeysObject}
                                        remainingChips={filterChips}
                                        urlEndPoint={urlEndPoint}
                                        isWastedBatch={true}
                                    />
                                </Grid>
                            ) : props?.history?.location?.pathname == '/dashboard/reports/transfused-units' ? (
                                <Grid item>
                                    <HeaderIcons
                                        showIcons={[
                                            url.split('/').includes('transactions') ? null : 'excell',
                                            url.split('/').includes('transactions') ? null : 'filters',
                                            mangeModule !== 'reports' ? 'addButton' : null
                                        ]}
                                        disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                        handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                        label={label}
                                        enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                        enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                        enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                        handleFilters={handleFilters}
                                        // setFilterKeys={setFilterChips}
                                        handleResetFilters={handleResetFilters}
                                        response={responseData}
                                        handleDownloadData={handleDownloadData}
                                        selectedFilters={showFilters}
                                        refresh={refresh}
                                        deletedChip={deletedChip}
                                        setChipIdAndName={setChipIdAndName}
                                        setFilterKeysObject={setFilterKeysObject}
                                        remainingChips={filterChips}
                                        urlEndPoint={urlEndPoint}
                                        isTransfusedUnit={true}
                                    />
                                </Grid>
                            ) : props?.history?.location?.pathname == '/dashboard/reports/transfused-batch' ? (
                                <Grid item>
                                    <HeaderIcons
                                        showIcons={[
                                            url.split('/').includes('transactions') ? null : 'excell',
                                            url.split('/').includes('transactions') ? null : 'filters',
                                            mangeModule !== 'reports' ? 'addButton' : null
                                        ]}
                                        disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                        handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                        label={label}
                                        enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                        enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                        enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                        handleFilters={handleFilters}
                                        // setFilterKeys={setFilterChips}
                                        handleResetFilters={handleResetFilters}
                                        response={responseData}
                                        handleDownloadData={handleDownloadData}
                                        selectedFilters={showFilters}
                                        refresh={refresh}
                                        deletedChip={deletedChip}
                                        setChipIdAndName={setChipIdAndName}
                                        setFilterKeysObject={setFilterKeysObject}
                                        remainingChips={filterChips}
                                        urlEndPoint={urlEndPoint}
                                        isTransfusedBatch={true}
                                    />
                                </Grid>
                              ):
                              props?.history?.location?.pathname == '/dashboard/manage/recipient' 
                                                                        || props?.history?.location?.pathname == '/dashboard/reports/recipient' ? (
                                    <Grid item>
                                        <HeaderIcons
                                            showIcons={[
                                                url.split('/').includes('transactions') ? null : 'excell',
                                                url.split('/').includes('transactions') ? null : 'filters',
                                                mangeModule !== 'reports' ? 'addButton' : null
                                            ]}
                                            disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                            handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                            label={label}
                                            enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                            enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                            enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                            handleFilters={handleFilters}
                                            // setFilterKeys={setFilterChips}
                                            handleResetFilters={handleResetFilters}
                                            response={responseData}
                                            handleDownloadData={handleDownloadData}
                                            selectedFilters={showFilters}
                                            refresh={refresh}
                                            deletedChip={deletedChip}
                                            setChipIdAndName={setChipIdAndName}
                                            setFilterKeysObject={setFilterKeysObject}
                                            remainingChips={filterChips}
                                            urlEndPoint={urlEndPoint}
                                            isRecipient={true}
                                        />
                                    </Grid>
                                                                    ) : props?.history?.location?.pathname == '/dashboard/manage/user'
                                                                            || props?.history?.location?.pathname == '/dashboard/reports/user'  ? (
                                        <Grid item>
                                            <HeaderIcons
                                                showIcons={[
                                                    url.split('/').includes('transactions') ? null : 'excell',
                                                    url.split('/').includes('transactions') ? null : 'filters',
                                                    mangeModule !== 'reports' ? 'addButton' : null
                                                ]}
                                                disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                                handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                                label={label}
                                                enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                                enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                                enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                                handleFilters={handleFilters}
                                                // setFilterKeys={setFilterChips}
                                                handleResetFilters={handleResetFilters}
                                                response={responseData}
                                                handleDownloadData={handleDownloadData}
                                                selectedFilters={showFilters}
                                                refresh={refresh}
                                                deletedChip={deletedChip}
                                                setChipIdAndName={setChipIdAndName}
                                                setFilterKeysObject={setFilterKeysObject}
                                                remainingChips={filterChips}
                                                urlEndPoint={urlEndPoint}
                                                isUser={true}
                                            />
                                        </Grid>
                                    ) : props?.history?.location?.pathname == '/dashboard/reports/unit'
                                    ? (
                                    <Grid item>
                                        <HeaderIcons
                                            showIcons={[
                                                url.split('/').includes('transactions') ? null : 'excell',
                                                url.split('/').includes('transactions') ? null : 'filters',
                                                mangeModule !== 'reports' ? 'addButton' : null
                                            ]}
                                            disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                            handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                            label={label}
                                            enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                            enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                            enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                            handleFilters={handleFilters}
                                            // setFilterKeys={setFilterChips}
                                            handleResetFilters={handleResetFilters}
                                            response={responseData}
                                            handleDownloadData={handleDownloadData}
                                            selectedFilters={showFilters}
                                            refresh={refresh}
                                            deletedChip={deletedChip}
                                            setChipIdAndName={setChipIdAndName}
                                            setFilterKeysObject={setFilterKeysObject}
                                            remainingChips={filterChips}
                                            urlEndPoint={urlEndPoint}
                                            isRequestUnit={true}
                                        />
                                    </Grid>
                                    ) :
                                                                            (
                                <Grid item>
                                    <HeaderIcons
                                        showIcons={[
                                            url.split('/').includes('transactions') ? null : 'excell',
                                            url.split('/').includes('transactions') || props?.history?.location?.pathname === '/dashboard/reports/temperature-history' ? null : 'filters',
                                            mangeModule !== 'reports' ? 'addButton' : null
                                        ]}
                                        disabled={!accessableCodes?.includes('BS-ACO-1029')}
                                        handleOpenAdd={accessableCodes?.includes('BS-ACO-1029') ? handleOpenAdd : null}
                                        label={label}
                                        enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                        enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                        enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                        handleFilters={handleFilters}
                                        // setFilterKeys={setFilterChips}
                                        handleResetFilters={handleResetFilters}
                                        response={responseData}
                                        handleDownloadData={handleDownloadData}
                                        selectedFilters={showFilters}
                                        refresh={refresh}
                                        deletedChip={deletedChip}
                                        setChipIdAndName={setChipIdAndName}
                                        setFilterKeysObject={setFilterKeysObject}
                                        remainingChips={filterChips}
                                        urlEndPoint={urlEndPoint}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Paper>
                    <Paper elevation={0} className={classes.paper}>
                        <Grid container className={classes.countContainer}>
                            <Grid xs={3}>
                                <Typography variant="h6" color="primary" style={{ display: 'flex' }}>
                                    <Box fontWeight="500">
                                        {CurrentSubMenu
                                            ? `${CurrentSubMenu} : ${
                                                  actualTotalCount === totalCount &&
                                                  actualTotalCount !== undefined &&
                                                  totalCount !== undefined
                                                      ? actualTotalCount
                                                      : totalCount !== undefined
                                                      ? totalCount
                                                      : 0
                                              }`
                                            : null}
                                    </Box>
                                    <Box fontWeight="500" style={{ marginLeft: 5 }}>
                                        {CurrentSubMenu
                                            ? `${
                                                  showFilters ||
                                                  searchKey.length > 2 ||
                                                  pageFilter === 'Unit' ||
                                                  pageFilter === 'Batch'
                                                      ? loading
                                                          ? ''
                                                          : '(' + responseData?.page?.filterCount + ')'
                                                      : ''
                                              }`
                                            : null}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid xs={7} className="filterChips">
                                <CustomChip
                                    module={'manage'}
                                    dataArray={filterChips}
                                    tooltip={true}
                                    handleDelete={handleChipDelete}
                                />
                            </Grid>
                            <Grid xs={2} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                {breadScrumbLebel.includes('Reports') && urlEndPoint === 'temperatures' ? (
                                    <Grid item>
                                        <CustomRadio value={view} options={radioOptions} onChange={changeViewOptions} />
                                    </Grid>
                                ) : null}
                                        {breadScrumbLebel === 'Developer' || breadScrumbLebel === 'Masters' || breadScrumbLebel === 'Grouping' || breadScrumbLebel === 'Manage' ? (
                                    <>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                disabled={selectedRecords?.length === 0}
                                                size="medium"
                                                onClick={() => {
                                                    handleDeleteDialog();
                                                }}
                                                // color={props?.disabled ? '' : 'primary'}
                                            >
                                                <DeleteIcon
                                                    style={{
                                                        opacity: 0.7,
                                                        fontSize: 20,
                                                        padding: 0,
                                                        margin: 0
                                                    }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Deactivate">
                                            <IconButton
                                                disabled={selectedRecords?.length === 0}
                                                size="medium"
                                                onClick={() => {
                                                    handleDeactivateDialog();
                                                }}
                                                //  color={props?.disabled ? '' : 'primary'}
                                            >
                                                <NotInterestedIcon
                                                    style={{
                                                        opacity: 0.7,
                                                        fontSize: 20
                                                    }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                ) :null}
                                {accessableCodes?.includes('BS-ACO-1024') || url.split('/').includes('transactions') ? (
                                    <DisplayConfig
                                        response={responseData?.displayConfigData}
                                        urlEndPoint={urlEndPoint}
                                        pageSize={pageSize}
                                        showFilters={showFilters}
                                        searchKey={searchKey}
                                        pageNum={pageNum}
                                        sortValue={sortValue}
                                        breadScrumbLebel={breadScrumbLebel}
                                        deleteRecordConfirm={handleDeleteDialog}
                                        selectedRecords={selectedRecords}
                                        deactivateRecordConfirm={handleDeactivateDialog}
                                        pageFilter={pageFilter}
                                    />
                                ) : (
                                    <IconButton disabled>
                                        <Tooltip title="Display Config">
                                            <ViewColumnIcon style={{ fontSize: 'medium' }} />
                                        </Tooltip>
                                    </IconButton>
                                )}
                                        {props?.history?.location?.pathname == '/dashboard/reports/notifications' ?  (
                                    <IconButton onClick={handleMenu} disabled={isSelected ? false : true}>
                                        <Tooltip title="Actions">
                                            <CallToActionIcon color={isSelected ? 'primary' : ''} />
                                        </Tooltip>
                                    </IconButton>
                                ):null }

                                {urlEndPoint === 'user' && !mangeModule ? (
                                    <IconButton onClick={handleUserGroupDialog} disabled={isSelected ? false : true}>
                                        <Tooltip title="Grouping Users">
                                            <GroupAddIcon
                                                color={isSelected ? 'primary' : ''}
                                                style={{ fontSize: 'large' }}
                                            />
                                        </Tooltip>
                                    </IconButton>
                                ) : null}

                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                    transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                                >
                                    <MenuItem
                                        className={classes.simpleMenu}
                                        onClick={() => {
                                            openCommentsPopup('Resolved');
                                        }}
                                        disabled={putActionsLoading}
                                    >
                                        Mark as Resolved
                                    </MenuItem>

                                    <MenuItem
                                        className={classes.simpleMenu}
                                        onClick={() => {
                                            openCommentsPopup('Unresolved');
                                        }}
                                        disabled={putActionsLoading}
                                    >
                                        Mark as Unresolved
                                    </MenuItem>
                                </Menu>

                                {/* <Tooltip title="Delete">
                            <IconButton>
                                <DeleteIcon style={{ fontSize: 'medium' }} />
                            </IconButton>
                        </Tooltip> */}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                {loading ? (
                                    <div className={classes.loaderDivStyles}>
                                        <Loader />
                                    </div>
                                ) : totalCount && searchKey && responseData?.data?.length === 0 ? (
                                    <NoData />
                                ) : responseData?.data?.length > 0 && view === 1 ? (
                                    <CustomTable
                                        response={urlEndPoint === 'transaction' ? transactionResponse : responseData}
                                        handleSelect={handleSelect}
                                        rowsPerPage={pageSize}
                                        selectedSearch={null}
                                        handleDialog={handleDialog}
                                        handleEditDialog={handleEditDialog}
                                        handleCloneDialog={handleCloneDialog}
                                        setRowData={handleUpdateRowData}
                                        setInitialData={setInitialData}
                                        tableHandleChange={tableHandleChange}
                                        sortOperation={sortOperation}
                                        sort={sortValue}
                                        history={history}
                                        handleVoucher={
                                            urlEndPoint === 'requestpullouts'
                                                ? handleRequestPullOutDialog
                                                : urlEndPoint === 'errorreports'
                                                ? handleErrorVoucherView
                                                : urlEndPoint === 'useraccessroles'
                                                ? handleUserAccessRoleVoucherView
                                                : screenName === 'issued' || screenName === 'received'
                                                ? handleVoucherOrReceived
                                                : handleVoucher
                                        }
                                        setSelectedData={setSelectedData}
                                        selectedData={selectedData}
                                        currentLocation={url}
                                        module={mangeModule}
                                        setNewColumns={setNewColumns}
                                        viewRowAccess={accessableCodes?.includes('BS-ACO-1030')}
                                        editRowAccess={accessableCodes?.includes('BS-ACO-1031')}
                                        deleteRowAccess={accessableCodes?.includes('BS-ACO-1033')}
                                        cloneRowAccess={accessableCodes?.includes('BS-ACO-1032')}
                                        detailViewAccess={accessableCodes?.includes('BS-ACO-1028')}
                                        selectionAccess={accessableCodes?.includes('BS-ACO-1025')}
                                        sequenceChangeAccess={accessableCodes?.includes('BS-ACO-1025')}
                                        selectAllAccess={accessableCodes?.includes('BS-ACO-1027')}
                                        selectedRecords={selectedRecords}
                                        pageNum={pageNum}
                                        selectAllRecords={selectAllRecords}
                                        setUnchecked={setUnchecked}
                                        unchecked={unchecked}
                                    />
                                ) : responseData?.data?.length > 0 && view === 0 ? (
                                    <Grid item xs={12} style={{ marginTop: '18px' }}>
                                        <Grid item className={classes.detailCard}>
                                            <Grid container spacing={2} direction="column">
                                                {/* {load ? (
                                                    <Loader />
                                                ) : ( */}
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

                                                            {/*{tempBar.length && dateBar.length ? (*/}
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
                                                                        onClick={() =>
                                                                            handleChangeDate('4H', 4, 'hours')
                                                                        }
                                                                        className={
                                                                            activeButton === '4H'
                                                                                ? classes.selectedButtonGroup
                                                                                : ''
                                                                        }
                                                                        color={activeButton === '4H' ? 'primary' : ''}
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
                                                                        onClick={() =>
                                                                            handleChangeDate('1D', 1, 'days')
                                                                        }
                                                                        className={
                                                                            activeButton === '1D'
                                                                                ? classes.selectedButtonGroup
                                                                                : ''
                                                                        }
                                                                        color={activeButton === '1D' ? 'primary' : ''}
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
                                                                    {/*    onClick={() => handleChangeDate('YTD')}*/}
                                                                    {/*    className={*/}
                                                                    {/*        activeButton === 'YTD'*/}
                                                                    {/*            ? classes.selectedButtonGroup*/}
                                                                    {/*            : ''*/}
                                                                    {/*    }*/}
                                                                    {/*    color={activeButton === 'YTD' ? 'primary' : ''}*/}
                                                                    {/*>*/}
                                                                    {/*    1Y*/}
                                                                    {/*</Button>*/}
                                                                </ButtonGroup>
                                                            </Grid>
                                                            {/*) : null}*/}
                                                            <Grid item xs />
                                                            <Grid item>
                                                                <SelectOption
                                                                    options={storageDevice}
                                                                    onChange={onSorageDeviceChange}
                                                                    value={value}
                                                                    minWidth={'170px'}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {/*{tempBar.length && dateBar.length ? (*/}
                                                    <Grid item xs>
                                                        <LineChart data={lineChartGraphData} />
                                                    </Grid>
                                                    {/*) : (*/}
                                                    {/*    <Grid item>*/}
                                                    {/*        <NoData />{' '}*/}
                                                    {/*    </Grid>*/}
                                                    {/*)}{' '}*/}
                                                </>
                                                {/* )} */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <NoData />
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                    <CustomDialog
                        title={isEdit ? `Edit ${label}` : `Add ${label}`}
                        open={isEdit ? editDialogOpen : isClone ? cloneDialogOpen : openAdd}
                        onClose={isEdit ? handleEditDialogClose : isClone ? handleCloneDialogClose : handleCloseAdd}
                        onCancelClick={
                            isEdit ? handleEditDialogClose : isClone ? handleCloneDialogClose : handleCloseAdd
                        }
                        onNextClick={handleNextClick}
                        onCompleteClick={handleCompleteButtonClick}
                        onSaveClick={handleCompleteButtonClick}
                        isSave={isEdit || isClone ? true : false}
                        loading={isEdit ? putLoading : postLoading}
                        error={errorMessage}
                        nextClick={nextClick}
                        disabled={inputs?.length === 0}
                    >
                        <ScFormContainer
                            inputs={inputs}
                            urlEndPoint={urlEndPoint}
                            isEdit={isEdit}
                            isClone={isClone}
                            onFormChange={onFormChange}
                            handleEditChange={handleEditChange}
                            handleDateChange={handleDateChange}
                            rowData={rowData}
                            handleChangeAutocomplete={handleChangeAutocomplete}
                            handleEditChangeAutocomplete={handleEditChangeAutocomplete}
                        />
                    </CustomDialog>
                    <CustomDialog
                        title={`Add User Group`}
                        open={userGroupDialog}
                        onClose={handleUserGroupDialog}
                        onCancelClick={handleUserGroupDialog}
                        onSaveClick={handleSaveUserGroup}
                        isSave
                        loading={postAdduserGroupLoading}
                        error={errorMessage}
                        disabled={userGroupName?.length === 0}
                    >
                        {addUserGroupCustomForm}
                    </CustomDialog>

                    <ConfirmationDialog
                        deleteLabel
                        handleDialogClose={handleDialogClose}
                        dialogOpen={dialogOpen}
                        title={CONSTANTS.LABEL_ARE_YOU_SURE}
                        type={'warning'}
                        error={errorMessage}
                    >
                        <Grid container spacing={2} className={classes.deleteDialog} justify="center">
                            <Grid item>
                                <CustomButton variant="outlined" color="primary" onClick={handleDialogClose}>
                                    {CONSTANTS.CANCEL}
                                </CustomButton>
                            </Grid>
                            <Grid item>
                                <CustomButton variant="contained" color="primary" onClick={handleDeleteButtonClick}>
                                    {deleteLoading ? (
                                        <CircularProgress color="white" size="20px" />
                                    ) : (
                                        CONSTANTS.CONTINUE
                                    )}
                                </CustomButton>
                            </Grid>
                        </Grid>
                    </ConfirmationDialog>
                    <ConfirmationDialog
                        deleteLabel
                        handleDialogClose={handleDeleteDialogClose}
                        dialogOpen={deleteDialogOpen}
                        title={CONSTANTS.LABEL_ARE_YOU_SURE_DELETE}
                        type={'warning'}
                        error={errorMessage}
                    >
                        <Grid container spacing={2} className={classes.deleteDialog} justify="center">
                            <Grid item>
                                <CustomButton variant="outlined" color="primary" onClick={handleDeleteDialogClose}>
                                    {CONSTANTS.CANCEL}
                                </CustomButton>
                            </Grid>
                            {!errorMessage && (
                                <Grid item>
                                    <CustomButton variant="contained" color="primary" onClick={handleDeleteSelected}>
                                        {deleteLoading ? (
                                            <CircularProgress color="white" size="20px" />
                                        ) : (
                                            CONSTANTS.CONTINUE
                                        )}
                                    </CustomButton>
                                </Grid>
                            )}
                        </Grid>
                    </ConfirmationDialog>

                    <ConfirmationDialog
                        deactivateLabel
                        handleDeactivateDialogClose={handleDeactivateDialogClose}
                        dialogOpen={deactivateDialogOpen}
                        title={CONSTANTS.LABEL_ARE_YOU_SURE_DEACTIVATE}
                        type={'warning'}
                        error={errorMessage}
                    >
                        <Grid container spacing={2} className={classes.deleteDialog} justify="center">
                            <Grid item>
                                <CustomButton variant="outlined" color="primary" onClick={handleDeactivateDialogClose}>
                                    {CONSTANTS.CANCEL}
                                </CustomButton>
                            </Grid>
                            {!errorMessage && (
                                <Grid item>
                                    <CustomButton
                                        variant="contained"
                                        color="primary"
                                        onClick={handleDeactivateSelected}
                                    >
                                        {deleteLoading ? (
                                            <CircularProgress color="white" size="20px" />
                                        ) : (
                                            CONSTANTS.CONTINUE
                                        )}
                                    </CustomButton>
                                </Grid>
                            )}
                        </Grid>
                    </ConfirmationDialog>

                    <CustomDialog
                        title={`Add Comments`}
                        open={open}
                        onCancelClick={onCloseCommentDialog}
                        onSaveClick={() => updateStatus()}
                        tabIndex={1}
                        loading={putActionsLoading}
                    >
                        {addCommentsForm}
                    </CustomDialog>

                    {openErrorDialog && (
                        <Dialog
                            open={open}
                            maxWidth="lg"
                            style={{ marginTop: 30 }}
                            PaperProps={{
                                style: {
                                    borderRadius: '10px',
                                    backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                                    padding: 15,
                                    minWidth: '1250px',
                                    height: '640px'
                                }
                            }}
                        >
                            <DialogTitle>
                                <Grid container justify="space-between">
                                    <Grid item>
                                        <Grid container direction="column">
                                            <Grid item>
                                                <Typography color="primary" variant="h6" className={classes.typoGraphy}>
                                                    {/* {voucherMap?.[2].value} */}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </DialogTitle>
                            <DialogContent className={classes.content}>
                                <>
                                    <Grid container spacing={2} direction="column">
                                        <Grid item>
                                            {errorDataResponse === undefined ? (
                                                <div className={classes.voucherLoader}>
                                                    <SkeletonTable type="table" />
                                                </div>
                                            ) : (
                                                errorDataResponse?.length > 0 && (
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow
                                                                style={{
                                                                    position: 'sticky',
                                                                    top: 0,
                                                                    whiteSpace: 'nowrap',
                                                                    height: 5,
                                                                    backgroundColor: '#f2f2f2',
                                                                    zIndex: 1
                                                                }}
                                                            >
                                                                <CustomTableCell>Errors</CustomTableCell>
                                                                <CustomTableCell>Unit ID/GTIN Number </CustomTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {errorDataResponse?.map((row) => (
                                                                <>
                                                                    <TableRow key={row?.faulty?.error}>
                                                                        <CustomTableCell>
                                                                            {row?.faulty?.error}
                                                                        </CustomTableCell>
                                                                        <CustomTableCell>
                                                                            {row?.faulty?.refSku?.rfidNumber ??
                                                                                row?.faulty?.batch?.gtinNumber}
                                                                        </CustomTableCell>
                                                                    </TableRow>
                                                                </>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                )
                                            )}
                                        </Grid>
                                    </Grid>
                                </>
                            </DialogContent>

                            <DialogActions style={{ marginTop: 7, marginRight: 20 }}>
                                <CustomButton variant="outlined" color="primary" onClick={handleCloseCancelDialog}>
                                    {'Ok'}
                                </CustomButton>
                            </DialogActions>
                        </Dialog>
                    )}
                    {pullOutDialogOpen === true ? (
                        <PullOutDialog
                            response={pullOutIdStatic?.refskus}
                            // displayConfig={responseData.displayConfig}
                            open={pullOutDialogOpen}
                            pullOutIdStatic={pullOutIdStatic.rowId}
                            triggeredLedList={[]}
                            onCloseOfPullOutDialog={onCloseOfPullOutDialog}
                            requestHistory={true}
                        />
                    ) : null}
                    {alertOpen && (
                        <Alert
                            open={alertOpen}
                            message={`${label} added successfully.`}
                            duration={2000}
                            onClose={() => setAlertOpen(false)}
                            vertical={'bottom'}
                            horizontal={'center'}
                            severity="success"
                            actions={false}
                        />
                    )}
                    {alertOpen2 && (
                        <Alert
                            open={alertOpen2}
                            message={`${label} updated successfully.`}
                            duration={2000}
                            onClose={() => setAlertOpen2(false)}
                            vertical={'bottom'}
                            horizontal={'center'}
                            severity="success"
                            actions={false}
                        />
                    )}
                            {/*  {deleteAlert && (
                        <Alert
                            open={deleteAlert}
                            message={'Record deleted Successfully.'}
                            duration={2000}
                            onClose={() => setDeleteAlert(false)}
                            vertical={'bottom'}
                            horizontal={'center'}
                            severity={'success'}
                            actions={false}
                        />
                    )}*/}
                    {addUserGroupAlert &&
                        (postAddUserGroupResponse?.message || postAddUserGroupError?.errorMessage) && (
                            <Alert
                                open={addUserGroupAlert}
                                message={'User Group Added Successfully.'}
                                duration={2000}
                                onClose={() => setAddUserGroupAlert(false)}
                                vertical={'bottom'}
                                horizontal={'center'}
                                severity={postAddUserGroupResponse?.status === true ? 'success' : 'error'}
                                actions={false}
                            />
                                )}

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
            )}
        </div>
    );
};

export default ScManage;
