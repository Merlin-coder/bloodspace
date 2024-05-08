import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConvertToDBDate from '../../components/add-unit/add-unit-form/julianDateConverter';
import { resetFilters } from '../../redux/actions/filters/globalFilterAction';
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
    Typography
} from '@material-ui/core';
//import { checkTextSum } from '.././../../components/add-unit/add-unit-form/unitIdService';
import { checkTextSum } from '../../components/add-unit/add-unit-form/unitIdService';
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
import { clearFilterCriteria, getFilterCriteria, getFilter, getRequestBatchFilter } from 'redux/actions/filters/filtersActions';

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
    get8thDropdown,
    getDropDown,
    getFields,
    putFormData,
    getWastedUnits,
} from 'redux/actions/manage/manageFieldsAction';
import MultipleSelect from 'components/multiSelection';
import { Switch } from 'react-router-dom';
import CustomInput from 'components/inputfeild';
import {
    putHeaderAction,
    requestbatchHeaderAction,
    clearRequestbatchActions,
    declinedAction,
    clearheaderActionsResponse,
    ledSelection,
    clearLedResponse
} from 'redux/actions/manage/headerActions';

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


let totalPageCount;
const Remoteallocation = (props) => {

    const param = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const { data, refFilters, setIndex, setRefFilters, chipsNames, setFilters4, dashboardRoute } = props;
    console.log('daaaattaaa', props)
    const [initialData, setInitialData] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [alertOpen2, setAlertOpen2] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [resultsCount, setResultsCount] = useState('');
    const [rowData, setRowData] = useState({});
    const [pageSize, setPageSize] = useState(10);
    const [sortValue, setSortValue] = useState({});
    const [pageNum, setPageNum] = useState(0);
    const [totalCount, setTotalCount] = useState('');
    const [showFilters, setShowFilters] = useState('');
    const [selectedData, setSelectedData] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [rowSelected, setRowSelected] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [triggeredLedList, setTriggerLedList] = useState([]);
    const [pullOutIdStatic, setPullOutIdStatic] = useState({});
    const [tagIdDialog, setTagIdDialog] = useState(false);
    const [userError, setUserError] = useState(false)
    const [tagIdList, setTagIdList] = useState([]);
    const dispatch = useDispatch();
    const wastedUnits = useSelector((state) => state.getData);
    let { filterCriteria } = useSelector((state) => state.getFiltersCriteria);
    console.log("==========", filterCriteria)
    let { filtersNewData } = useSelector((state) => state.getFilter);
    console.log("filtersNewData====", filtersNewData)
    let { requestBatchfiltersData } = useSelector((state) => state.getRequestBatchFilter)
    console.log('requestbatch', requestBatchfiltersData)
    const { loading, responseData } = wastedUnits;
    const mData = data && data?.length > 1 ? data[1] : data[0];
    console.log('mdata--', mData)
    const label = mData.label;
    let breadScrumbLebel = data[0]?.label;
    const urlEndPoint = 'lisrequests';
    const CurrentSubMenu = label.indexOf('ed') === -1 && label !== 'Request Unit' ? pluralize.plural(label) : label;
    let url = props.path.split('/').slice(2).join('/');
    const [filterChips, setFilterChips] = useState();
    const [searchDate, setSearchDate] = useState(null);
    const [accessableCodes, setAccessableCodes] = useState([]);
    const subMenuCode = mData.code;
    const [unitsearch, setUnitSearch] = useState('');
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAllRecords, setSelectedAllRecordsFlag] = useState(false);
    const [accessToTable, setAccessToTable] = useState(false);
    const [secondDropdown, setSecondDropdown] = useState('');
    const [thirdDropdown, setThirdDropdown] = useState('');
    const [fourthDropdown, setFourthDropdown] = useState('');
    const [fifthDropdown, setFifthDropdown] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [refresh, doRefresh] = useState(0);
    const [deletedChip, setDeletedChip] = useState('');
    const [chipIdAndName, setChipIdAndName] = useState({});
    const [refFilterChips, setRefFilterChips] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowObj, setSelectedRowObj] = useState({});
    console.log('selectedRowObj--', selectedRowObj)
    const [hostialddValue, setHospitalddvalue] = useState(null);
    const [locationddValue, setLocationddValue] = useState(null);
    const [deviceddValue, setDeviceddValue] = useState(null);
    const [locationddOpen, setLocationddOpen] = useState(false);
    const [deviceddOpen, setDeviceddOpen] = useState(false);
    const formFields = useSelector((state) => state.getFormFields);
    const { options } = useSelector((state) => state.getDropDown);
    const { options2 } = useSelector((state) => state.get2ndDropdown);
    const { options3 } = useSelector((state) => state.get3rdDropdown);
    const { options4 } = useSelector((state) => state.get4thDropdown);
    const { options5 } = useSelector((state) => state.get5thDropdown);
    const { putLoading, putResponse, putError } = useSelector((state) => state.putFormFields);
    const { deleteResponse, deleteError, deleteLoading } = useSelector((state) => state.deleteField);
    const { headerActions, headerActionsLoading, headerActionsError } = useSelector(
        (state) => state.putHeaderActionResponse
    );
    const { requestbatchheaderActions, requestbatchActionsLoading, requestbatchheaderActionsError } = useSelector(
        (state) => state.requestbatchActionResponse
    )
    const { declinedheaderActions, declinedActionsLoading, declinedheaderActionsError } = useSelector(
        (state) => state.declinedAction
    )
    const { options8 } = useSelector((state) => state.get8thDropdown);
    const { screenIndex } = useSelector((state) => state.getStocksScreenSet);
    const { headerLed, headerLedLoading, headerLedError } = useSelector((state) => state.HeaderLedActionResponse);
    const { fieldsLoading, fields } = formFields;
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [severity, setSnackbarSeverity] = React.useState('');
    const [selectedStatus, setUpdateStatus] = React.useState('');
    const [openAssignWarning, setOpenWarningAssign] = React.useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [comments, setComments] = useState('');
    const getStaticFilters = useSelector((state) => state.getStaticFilters);
    const [genericInput, setGenericInput] = useState({});
    const [productCodeOpen, setProductCodeOpen] = React.useState(false);
    const [productCodeValue, setProductCodeValue] = React.useState();
    const [bloodGroupOpen, setBloodGroupOpen] = React.useState(false);
    const [bloodGroupValue, setBloodGroupValue] = React.useState();
    const blooGroupRef = React.useRef();
    const productCodeRef = React.useRef();
    const expiryDateRef = React.useRef();
    const collectionDateRef = React.useRef();
    const [unitIdFilter, setUnitIdFilter] = React.useState([]);
    const [response, setResponse] = useState({});
    const location = useLocation();
    const [openPullOut, setOpenPullOut] = useState(false);
    const [pullOutData, setPullOutData] = useState(false);
    const [carrierDialog, setCarrierDialog] = useState(false);
    const [carrierType, setCarrierType] = useState('');
    const [pullOutConfirmation, setPullOutConfirmation] = useState(false);
    const [pullOutTitle, setPullOutTitle] = useState('');
    const [pullOutComment, setPullOutComment] = useState(false);
    const { pullOutLoading, pullOutSuccess, pullOutError } = useSelector((state) => state.postPullOutReducer);
    const socket = useSelector((state) => state.socketReducer.socket);
    const { pullOutDialogOpen } = useSelector((state) => state.pulloutDialog);

    const { refreshPUlloutLoading, refreshPullOutSuccess, refreshPullOutError } = useSelector(
        (state) => state.refreshPullOut
    );
    const handleScanCountDialog = () => {
        setTagIdDialog(true);
    };

    let remoteInfo = JSON.parse(localStorage.getItem('remoteInfo'));
    console.log('remoteInfo', remoteInfo)

    const { userInfo } = useSelector((state) => state.userLogin);

    const [users, setUsers] = useState('')
    console.log('userrr', users)
    const [userId, setUserId] = useState('')

    const [genericValues, setGenericValues] = useState({
        gtinNumber: '',
        batchNumber: '',
        expiryDate: '',
        localDescription: '',
        gtinDescription: '',
        rfidNumber: '',
        serialNumber: ''
    });
    const onCarrierChange = (e) => {
        setCarrierType(e.target.value);
    };

    useEffect(() => {
        dispatch(getRequestBatchFilter());
    }, [])



    useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let url = `${CONSTANTS.BASEURL}setting/config`;

        axios.get(url, config).then((resdata) => {

            console.log("configsetting----" + resdata.status);

            localStorage.setItem('remoteInfo', JSON.stringify(resdata.data.data));
        })
    }, []);


    useEffect(() => {
        socket?.on('triggeredLeds', (data) => {
            setTriggerLedList([...data.data]);
        });
        socket?.on('triggerLedOff', (data) => {
            setTriggerLedList([]);
        });
        socket?.on('refresh', (data) => {
            if (window.location.pathname === '/dashboard/request-batch' && urlEndPoint === 'assignbatches') {
                dispatch(getData('assignbatches', pageSize * 3, 1));
            }
        });
    }, [socket]);

    const handleUserChange = (e) => {
        console.log(e.target.value)
        const user = options4?.data?.find(dat => dat.name === e.target.value);
        console.log("user", user);
        setUsers(user.name)
        setUserId(user._id)
        setUserError(false);
        console.log('userId', userId)
    }


    // console.log(triggeredLedList, 'triggerLedList');

    // useEffect(() => {
    //     if (refreshPullOutSuccess?.status && pullOutSuccess?.status) {
    //         setOpenPullOut(true);
    //     }
    // }, [refreshPullOutSuccess]);
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
                'BS-ACO-1024',
                'BS-ACO-1020',
                'BS-ACO-1012',
                'BS-ACO-1011',
                'BS-ACO-1010',
                'BS-ACO-1009',
                'BS-MO-1053',
                'BS-ACO-1017',
                'BS-ACO-1018',
                'BS-ACO-1019'
            ];
        } else {
            console.log(" -- Sub Menu Code -- " + subMenuCode);
            let manageAccessCodes =
                userInfo?.data?.userAccess
                    ?.filter((item) => item['drawer-code'] === 'BS-DR-0081')
                    ?.map((subMenu) => subMenu?.menuId)
                    ?.flat()
                    ?.filter((item) => item['drawer-code'] === subMenuCode)[0] || [];
            let keysOfObject = Object.keys(manageAccessCodes);

            console.log("-- manageAccessCodes -- " + manageAccessCodes);

            keysOfObject.forEach((item) => {
                if (Array.isArray(manageAccessCodes[item])) {
                    manageAccessCodes[item][0] === '1' && tempAccessCodes.push(manageAccessCodes[item][1]);
                }
            });
        }
        console.log("-- tempAccessCodes -- " + tempAccessCodes);

        setAccessableCodes(tempAccessCodes);
    }, [param]);


    const handleUnitId = (e, text, feild) => {
        let tempGenericValue = { ...genericValues };
        tempGenericValue[feild] = e;
        setGenericValues(tempGenericValue);
    };

    const handleEditUnit = () => {
        let tempGenericValue = {
            ...genericValues,
            rfidData: 'rfid Data',
            productcodeId: productCodeValue?._id,
            bloodgroupId: bloodGroupValue?._id,
            clientId: hostialddValue?._id || '',
            locationId: locationddValue?._id || '',
            deviceId: deviceddValue?._id || ''
        };

        let FormObject = {};
        FormObject.collectionName = urlEndPoint;
        {
            FormObject.validData = [tempGenericValue];
        }
        let json = JSON.stringify(FormObject);
        dispatch(putFormData(json));
        dispatch(clear4thDropDown());
        dispatch(clear5thDropDown());
    };

    useEffect(() => {
        dispatch(getDropDown('bloodgroups'));
        dispatch(get2ndDropdown('productcodes'));
        // let formData = {
        //     collectionName: 'requestpullouts',
        //     validData: [
        //         {
        //             _id: '61975e82d8c1c3650e4b1602',
        //             status: 'CANCEL'
        //         }
        //     ]
        // };
        // dispatch(pullOutCancelAction(JSON.stringify(formData)));
    }, [location]);

    const handleAutoCompleteChange = (e, feild) => {
        if (feild === 'bloodGroup') {
            e?.length > 2 && !e?.includes('=%') ? setBloodGroupOpen(true) : setBloodGroupOpen(false);
            if (e && e?.includes('=%')) {
                let values = options?.data?.find((item) => item.isbtcode.toLowerCase() === e?.substr(2).toLowerCase());
                if (values) {
                    let tempGenericValue = { ...genericValues };
                    tempGenericValue[feild] = values;
                    setGenericValues(tempGenericValue);
                    // setBloodGroupValue(values);
                    setBloodGroupOpen(false);
                    values && values.isbtcode && productCodeRef.current.focus();
                }
            }
        }
        if (feild === 'productCode') {
            e?.length > 2 && !e?.includes('=<') ? setProductCodeOpen(true) : setProductCodeOpen(false);
            if (e && e?.includes('=<')) {
                let values = options2?.data?.find((item) => item.isbtcode.toLowerCase() === e?.substr(2).toLowerCase());
                if (values) {
                    let tempGenericValue = { ...genericValues };
                    tempGenericValue[feild] = values;
                    setGenericValues(tempGenericValue);
                    // setProductCodeValue(values);
                    setProductCodeOpen(false);
                    values && values.isbtcode && expiryDateRef.current.focus();
                }
            }
        }
    };

    const handleClickAway = () => {
        setProductCodeOpen(false);
        setBloodGroupOpen(false);
    };

    const onChangeAutoComplete = (e, value, feild) => {
        if (feild === 'bloodGroup') {
            setBloodGroupValue(value);
            setBloodGroupOpen(false);
        }
        if (feild === 'productCode') {
            setProductCodeValue(value);
            setProductCodeOpen(false);
        }
    };

    const { chipNameAndId, chipData, filtersData, filterKeysObjects, staticFilters, screen } = getStaticFilters;
    let screenName = url.split('/').pop();

    const [unchecked, setUnchecked] = useState([]);

    useEffect(() => {
        if (chipData?.length > 0) {
            setFilterChips([...chipData]);
            setChipIdAndName({ ...chipNameAndId });
            setShowFilters([...filtersData]);
            dispatch(resetFilters());
        }
    }, [getStaticFilters]);
    useEffect(() => {
        if (filterChips?.length === 0) {
            setShowFilters('');
        }
    }, [filterChips]);

    useEffect(() => {
        selectedRecords.length > 0 ? setIsSelected(true) : setIsSelected(false);
    }, [selectedRecords]);
    function compare_sequence(a, b) {
        // a should come before b in the sorted order
        if (a.sequence < b.sequence) {
            return -1;
            // a should come after b in the sorted order
        } else if (a.sequence > b.sequence) {
            return 1;
            // a and b are the same
        } else {
            return 0;
        }
    }

    const codeForFields = mData.code;
    let sortedFieldSequence = fields.data?.sort(compare_sequence);
    sortedFieldSequence?.forEach((field) => {
        let fieldValue = rowData[field.name];
        if (Array.isArray(fieldValue)) {
            field.value = fieldValue.map((v) => v._id).toString();
        } else {
            field.value = rowData[field.name];
        }
    });

    const submitCallback = (e) => {
        let object = {};
        sortedFieldSequence?.map((m) => (object[m.name] = m.value));
        {
            object._id = rowData._id;
        }
        let FormObject = {};
        FormObject.collectionName = urlEndPoint;
        {
            FormObject.validData = [object];
        }
        let json = JSON.stringify(FormObject);

        dispatch(putFormData(json));
    };

    useEffect(() => {
        putResponse?.status === true && setAlertOpen2(true);
        putResponse?.status === true && setEditDialogOpen(false);
        if (pageNum === 0 && putResponse?.status === true) {
            if (sortValue && Object?.keys(sortValue)?.length > 0) {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, undefined, sortValue));
            } else {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey));
            }
        } else if (putResponse?.status === true) {
            if (sortValue && Object?.keys(sortValue)?.length > 0) {
                dispatch(
                    getData(
                        urlEndPoint,
                        pageSize * (pageNum + 3),
                        pageNum,
                        undefined,
                        undefined,
                        JSON.stringify(sortValue)
                    )
                );
            } else {
                dispatch(getData(urlEndPoint, pageSize * (pageNum + 3), pageNum));
            }
        }

        putResponse?.status === false && setEditDialogOpen(true);

        putError?.errorMessage && setErrorMessage(putError?.errorMessage);
        putResponse?.status === true && resetFormData();
        putError?.errorMessage && dispatch(clearPutResponse());
        setTimeout(() => {
            dispatch(clearPutResponse());
        }, 3000);
    }, [putResponse, putError]);
    useEffect(() => {
        putResponse?.status === true && setEditDialogOpen(false);
        putResponse?.status === true && setErrorMessage('');
    }, [putResponse]);
    const [inputs, onFormChange, handleEditChange, setSubmit, resetFormData, handleDateChange] = useForm(
        sortedFieldSequence,
        submitCallback,
        rowData,
        setRowData
    );

    useEffect(() => {
        dispatch(get8thDropdown('devices',));

    }, [])
    const [emergencyId, setEmergencyId] = useState()
    const [remoteId, setRemoteId] = useState()
    console.log('remoteId', remoteId)



    React.useEffect(() => {
        if (options8) {
            let emergencyId = options8?.data?.find((obj) => obj?.name === 'Emergency Device')
            console.log('emergencyId---', emergencyId)
            setEmergencyId(emergencyId?._id)
            let remoteDevice = options8?.data?.find((obj) => obj?.name === 'Theater Fridge')
            setRemoteId(remoteDevice?._id)
        }

        //return dispatch({
        //    type: 'GET_8TH_DROPDOWN_SUCCESS',
        //    payload: data
        //});;
    }, [options8, emergencyId, remoteId])


    console.log('emer---', emergencyId);

    useEffect(() => {
        dispatch(clearData());

        let filtersDataDevice
        filtersDataDevice = [
            {
                key: 'deviceId._id',
                value: ['6320991b7d29280d14a57145']
            },

        ];
        console.log('filter1--', filtersDataDevice)
        let filtersRemote
        filtersRemote = [
            {
                key: 'deviceId._id',
                value: [remoteId]
            },

        ];
        console.log('filter2--', filtersRemote)

        if (refFilters?.length > 0) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, refFilters));

            setRefFilterChips(chipsNames.map((item) => item.name));
            // setShowFilters(refFilters);
        } else if (getStaticFilters.staticFilters) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, filtersData, undefined, undefined, undefined, undefined, undefined, screen));
        } else {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, remoteInfo?.emergencyLogin === 'TRUE' ? filtersDataDevice : remoteInfo?.remoteLogin === 'TRUE' ? filtersRemote : filtersData, undefined));
        }

        //dispatch(getFilterCriteria(urlEndPoint));
        dispatch(getRequestBatchFilter(urlEndPoint));


        dispatch(getFields(codeForFields));

        return () => {
            setShowFilters('');
            setPageNum(0);
            dispatch(clearData());
            dispatch(clearFilterCriteria());
            setSearchKey('');
            dispatch(clearPutResponse());
            setAlertOpen2(false);
            dispatch(resetFilters());
            dispatch(clearPullOutData());
        };
    }, [urlEndPoint]);
    useEffect(() => {
        refFilters?.length === 0 && dispatch(getData(urlEndPoint, pageSize * 3, 1));
    }, [refFilters]);

    useEffect(() => {
        if (requestBatchfiltersData?.status && param.state) {
            setDashboardFilter();
            return () => dispatch(clearFilterCriteria());
        }
    }, [requestBatchfiltersData]);
    useEffect(() => {
        if (pullOutSuccess?.status) {
            showSnackbar(true, pullOutSuccess?.message, 'success');
            setErrorMessage('');
            setPullOutConfirmation(false);
            setOpenPullOut(true);
            dispatch(requestPulloutDialogOpen(true));
            let pullOutId = JSON.stringify(pullOutSuccess?.data?._id);
            dispatch(requestPullOutId(pullOutId));
            localStorage.setItem('selectionIdStatic', pullOutId);
            localStorage.setItem('pullOutSuccess', pullOutSuccess);
            setPullOutIdStatic(pullOutId);
        }

        return () => {
            setErrorMessage('');
        };
    }, [pullOutSuccess]);
    useEffect(() => {
        if (pullOutError?.errorMessage) {
            // setErrorMessage(pullOutError?.errorMessage);
            dispatch(createErrorDialog(pullOutError?.errorMessage));
            // showSnackbar(true, pullOutError?.errorMessage, 'error');
            // setPullOutConfirmation(false);
        }
        return () => {
            // setErrorMessage('');
            dispatch(clearPullOutData());
        };
    }, [pullOutError]);

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
        url = `${url}&pageNumber=${1}`;
        if (searchKey !== undefined && searchKey.length > 0) url = `${url}&search=${JSON.stringify(searchKey)}`;
        if (showFilters !== undefined && showFilters.length > 0) url = `${url}&filters=${JSON.stringify(showFilters)}`;
        if (sortValue !== undefined && Object.keys(sortValue).length > 0)
            url = `${url}&sort=${JSON.stringify(sortValue)}`;
        // let url = `${CONSTANTS.BASEURL}index/export?collectionName=${urlEndPoint}&pageSize=100000&pageNumber=1`;
        await axios.get(url, config).then((response) => {
            FileDownload(response.data, urlEndPoint + '_' + new Date().getTime().toString() + '.xlsx');
        });
    };

    const handleFilters = (filterData, dashboardFilter) => {
        let tempCollectionName;
        let filters;
        if (urlEndPoint?.includes('&')) {
            tempCollectionName = urlEndPoint.split('&')[0];
            let urlFilter = JSON.parse(urlEndPoint.split('=')[1]);
            if (urlFilter) {
                filters = [...urlFilter, ...filterData];
            }
        } else {
            tempCollectionName = urlEndPoint;
            if (showFilters.length > 0) {
                let mainFilterKeys = filterData?.map((item) => item.key);
                let tempShowFilters = showFilters?.filter((item) => !mainFilterKeys?.includes(item?.key));
                if (tempShowFilters?.length > 0) {
                    filters = [...tempShowFilters, ...filterData];
                } else {
                    filters = filterData;
                }
            } else {
                filters = filterData;
            }
        }

        setPageNum(0);

        dispatch(clearData());
        if (dashboardFilter) {
            setShowFilters(dashboardFilter);
            dispatch(getData(tempCollectionName, pageSize * 3, 1, undefined, dashboardFilter));
        } else {
            setShowFilters(filters);
            dispatch(getData(tempCollectionName, pageSize * 3, 1, undefined, filters));
        }
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
        showFilters ? dispatch(getData(urlEndPoint, pageSize * 3, pageNum)) : null;
        setShowFilters('');
        setFilterChips([]);
    };
    const tableHandleChange = (changeValue, pageNumberOrPageSizeFlag, ...rest) => {
        if (rest.length > 0) {
            //DoNothing
        } else {
            if (showFilters && pageNumberOrPageSizeFlag) {
                if (changeValue > pageNum) {
                    dispatch(getData(urlEndPoint, pageSize, changeValue + 3, undefined, showFilters));
                }
            } else if (showFilters && !pageNumberOrPageSizeFlag) {
                setPageSize(changeValue);
                setPageNum(0);
                dispatch(getData(urlEndPoint, changeValue * 3, pageNum, undefined, showFilters));
            } else if (searchKey && pageNumberOrPageSizeFlag) {
                if (changeValue > pageNum) {
                    dispatch(getData(urlEndPoint, pageSize, changeValue + 3, searchKey));
                }
            } else if (searchKey && !pageNumberOrPageSizeFlag) {
                setPageSize(changeValue);
                setPageNum(0);
                dispatch(getData(urlEndPoint, changeValue * 3, 1, searchKey));
            } else if (pageNumberOrPageSizeFlag) {
                if (sortValue && sortValue.key) {
                    dispatch(getData(urlEndPoint, pageSize, changeValue + 3, undefined, undefined, sortValue));
                } else if (changeValue > pageNum) {
                    dispatch(getData(urlEndPoint, pageSize, changeValue + 3));
                    // } else {
                    //     setPageNum(changeValue);
                }
            } else {
                setPageSize(changeValue);
                dispatch(getData(urlEndPoint, changeValue * 3, 1));
                setPageNum(0);
            }

            if (changeValue && pageNumberOrPageSizeFlag) {
                if (changeValue > pageNum) setPageNum(changeValue);
            }
        }
    };

    const sortOperation = (sort) => {
        setSortValue(sort);
        if (showFilters) {
            dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, showFilters, sort));
        } else {
            dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, undefined, sort));
        }
    };

    const handleSearchDelete = () => {
        setSearchKey('');
        if (accessableCodes?.includes('BS-ACO-1012')) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters));
        } else if (!accessableCodes?.includes('BS-ACO-1012')) {
            setAccessToTable(false);
        }
    };

    const handleSearch = (searchKey) => {
        setSearchKey(searchKey);
        if (searchKey.length > 2) {
            dispatch(clearData());
            dispatch(getData(urlEndPoint, 100000, 1, searchKey.trim()));
        } else if (searchKey === '') {
            dispatch(getData(urlEndPoint, pageSize * 3, 1));
        }
    };

    const setDashboardFilter = () => {
        requestBatchfiltersData?.data[0]?.['trackId-name'].map((val) => {
            if (val.name === param.state) {
                setChipIdAndName({ ...chipIdAndName, [val.name]: val._id });

                setFilterChips([...filterChips, val.name]);
                const dashboarFilter = [
                    {
                        key: 'trackId._id',
                        value: [val._id]
                    }
                ];
                handleFilters(dashboarFilter);

                //
            }
        });
    };

    useEffect(() => {
        if (!showFilters) {
            setTotalCount(responseData?.page?.totalCount);
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
        if (accessableCodes?.includes('BS-ACO-1012')) {
            setAccessToTable(true);
        } else if (searchKey !== '' && responseData?.data?.length > 0) {
            setAccessToTable(true);
        }
        totalPageCount = responseData?.page?.totalPage;
    }, [responseData]);

    const handleVoucher = (row, displayConfig, name) => {
        let childDataTable;
        if (displayConfig) {
            childDataTable = displayConfig;
        } else {
            childDataTable = row.childDataTable;
        }
        let rowName;
        if (name) {
            rowName = name;
        } else {
            rowName = row.name;
        }
        dispatch(getVoucherResponse(childDataTable, row._id, urlEndPoint));
        localStorage.setItem('currentRowName', JSON.stringify(rowName));
        localStorage.setItem('previousId&name', JSON.stringify([urlEndPoint, row._id]));
        localStorage.setItem('voucherConfig', JSON.stringify(displayConfig));
        history.push(`/dashboard/v/${url}/${row.name?.toLowerCase()}/${childDataTable}/${urlEndPoint}/${row._id}`);
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
    };

    useEffect(() => {
        let selectData = selectedRow.length > 0 && selectedRow.filter((row) => row.check === true);
    }, [selectedRow]);

    const handleChipDelete = (chipToDelete) => () => {
        // doRefresh((prev) => prev + 1);
        // setDeletedChip(chipToDelete);
        if (filterChips.length === 1) {
            setFilterChips([]);
            setShowFilters([]);
            dispatch(getData(urlEndPoint, 30, 1));
        } else {
            let value = [];
            //Checkbox will come here to reset
            filterChips.forEach((chip) => {
                if (chip !== chipToDelete) {
                    value.push(chip);
                }
            });
            let tempFilterKeys = {};
            if (chipToDelete in chipIdAndName) {
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
                dispatch(getData(tempUrlPoint, 30, pageNum, undefined, Object.values(tempFilterKeys)));
            } else if (value.length === 0) {
                dispatch(getData(tempUrlPoint, 30, pageNum));
            }
        }
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const rowChecked = (row) => {
        row ? setRowSelected(true) : setRowSelected(false);
    };

    const [filterKeysObject, setFilterKeysObject] = useState([]);

    const handleSearchDate = (e) => {
        setSearchDate(e);
        let invalidDate = String(e);

        let DOB;
        if (typeof e?.getMonth === 'function' && invalidDate !== 'Invalid Date') {
            DOB = [
                {
                    key: 'recipientId.dob',
                    value: [moment(e).format('YYYY-MM-DD'), moment(e).format('YYYY-MM-DD')]
                }
            ];
            // dispatch(getData('recipient', 30, 1, JSON.stringify(searchKey), JSON.stringify(DOB)));
        }
        if (searchKey) {
            String(e) === 'Invalid Date' ? null : dispatch(getData(urlEndPoint, 30, 1, searchKey, DOB));
        }
        // else {
        //     String(e) === 'Invalid Date' ? null : dispatch(getData(urlEndPoint, 30, 1, undefined, JSON.stringify(DOB)));
        // }
    };
    let screenNum = localStorage.getItem('drawerScreen');

    function handleBackClick() {
        if (refFilters) {
            setRefFilters(null);
            setFilters4([]);
        }
        dispatch(resetFilters());
        param.pathname === '/dashboard/request-unit'
            ? history.goBack()
            : screenNum === 'true'
                ? dispatch(setScreeenIndex(2))
                : dispatch(setScreeenIndex(0));
    }
    useEffect(() => {
        return () => {
            dispatch(resetFilters());
            screenNum === 'true' ? dispatch(setScreeenIndex(2)) : dispatch(setScreeenIndex(0));
        };
    }, []);
    const handleUnitSearch = (e) => {
        setUnitSearch(e);
        if (e.length > 2 && e !== ' ') {
            let UnitIdFilters = [{ key: 'batchNumber', value: [e.trim()] }, ...showFilters];
            setUnitIdFilter(UnitIdFilters);
            dispatch(getData('batch', undefined, 0, undefined, UnitIdFilters));
            // dispatch(getData(urlEndPoint, 30, 1, JSON.stringify(e)));
        } else if (e === '') {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters));
        }
    };
    const handleUnitSearchDelete = () => {
        setUnitSearch('');

        dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters));
    };
    const handleDialog = () => {
        setDialogOpen(!dialogOpen);
        setErrorMessage('');
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
        setErrorMessage('');
        setOpenWarningAssign(false);
    };

    const dropDownData = urlEndPoint === 'assignbatches' ? 'productcode' : null;
    useEffect(() => {
        urlEndPoint === 'assignbatches' && setSecondDropdown('locations');
        urlEndPoint === 'assignbatches' && setThirdDropdown('devices');
        urlEndPoint === 'assignbatches' && setFourthDropdown('recipient');
        urlEndPoint === 'assignbatches' && setFifthDropdown('track');
    }, [urlEndPoint]);
    const handleEditDialog = () => {
        // dispatch(getDropDown(dropDownData));
        // dispatch(get2ndDropdown(secondDropdown));
        // dispatch(get3rdDropdown(thirdDropdown));
        // dispatch(get4thDropdown(fourthDropdown));
        // dispatch(get5thDropdown(fifthDropdown));

        setEditDialogOpen(true);
    };
    const handleEditDialogClose = () => {
        setRowData('');
        setEditDialogOpen(false);
        resetFormData();
        setErrorMessage('');
        dispatch(clearPutResponse());
        dispatch(clear4thDropDown());
        dispatch(clear5thDropDown());
    };
    let nextClick = false;
    const handleCompleteButtonClick = () => {
        setSubmit(nextClick);
    };
    const handleDeleteButtonClick = () => {
        dispatch(deleteFormData(urlEndPoint, rowData._id));
    };
    const handlePulloutComment = (e) => {
        setPullOutComment(e);
    };
    useEffect(() => {
        if (deleteResponse && deleteResponse.status === true) {
            setDeleteAlert(true);
            // dispatch(getData(urlEndPoint, pageSize, pageNum));
            setDialogOpen(false);
        } else if (deleteError) {
            setErrorMessage(deleteError?.errorMessage);
            setDialogOpen(true);
        }
        setUpdateStatus('');
        setOpenAdd(false);
        if (requestbatchheaderActions && requestbatchheaderActions.status === true) {
            setComments('');
            setSelectedAllRecordsFlag(false);
            setAnchorEl(null);
            if (showFilters) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters));
            } else if (sortValue && sortValue.key) {
                dispatch(getData(urlEndPoint, pageSize, pageNum, undefined, undefined, sortValue));
            }
            showSnackbar(true, requestbatchheaderActions.message, 'success');
        } else if (requestbatchheaderActionsError) {
            showSnackbar(true, requestbatchheaderActionsError.errorMessage, 'error');
        }
        if (headerLed && headerLed.status === true) {
            setComments('');
            setSelectedAllRecordsFlag(false);
            if (showFilters) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters));
            } else if (sortValue && sortValue.key) {
                dispatch(getData(urlEndPoint, pageSize, pageNum, undefined, undefined, sortValue));
            }
            showSnackbar(true, headerLed.message, 'success');
        } else if (headerLedError) {
            showSnackbar(true, headerLedError.errorMessage, 'error');
        }

        return () => {
            setTimeout(() => {
                dispatch(clearDeleteResponse());
            }, 4000);

        };
    }, [deleteResponse, deleteError, requestbatchheaderActions, requestbatchheaderActionsError, headerLed, headerLedError]);

    const showSnackbar = (isopen, message, severity) => {
        setSnackbarMessage(`${message}`);
        setSnackbarSeverity(severity);
        setOpenSnackbar(isopen);
    };

    const customAutoComplete = (e, value, feild) => {
        // let tempDestinationObject = { ...destinationObject };
        if (feild === 'hostialddValue') {
            let filters = [{ key: 'clientId._id', value: value?._id }];
            dispatch(get4thDropdown('locations', JSON.stringify(filters)));
            setHospitalddvalue(value);

            if (deviceddValue && deviceddValue._id) {
                setDeviceddValue(null);
            }
            if (locationddValue && locationddValue._id) {
                setLocationddValue(null);
            }
        }
        if (feild === 'locationddValue') {
            let filters = [{ key: 'locationId._id', value: value?._id }];
            dispatch(get5thDropdown('devices', JSON.stringify(filters)));
            setDeviceddValue(null);
            setLocationddValue(value);
            setLocationddOpen(false);
            // setDisableDevice(false);
            if (deviceddValue && deviceddValue._id) {
                setDeviceddValue(null);
            }
        }
        if (feild === 'deviceddValue') {
            setDeviceddValue(value);
            setDeviceddOpen(false);
        }
    };

    useEffect(() => {
        dispatch(get6thDropdown('clients'));
    }, []);

    const renderInput = (input) => {
        return input?.fieldtypeId[0]?.code === 'SC-FT-001' ? (
            <Grid
                item
                xs={12}
                // md={input.name !== 'serverAddress' ? 6 : 12}
                // lg={input.name !== 'serverAddress' ? 6 : 12}
                className={classes.inputField}
                key={input.name}
            >
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <CustomInput
                    key={input.name}
                    onChange={handleEditChange}
                    name={input.name}
                    value={input.value}
                    type={input.type}
                    autoFocus
                    fullWidth
                    style={{ width: 600 }}
                    className={classes.textField}
                    size="lg"
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-003' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <SelectOption
                    // label="Select Location Type"

                    options={
                        urlEndPoint === 'assignbatches' && input.name === 'locationId'
                            ? options2?.data
                            : urlEndPoint === 'assignbatches' && input.name === 'deviceId'
                                ? options3?.data
                                : urlEndPoint === 'assignbatches' && input.name === 'recipientId'
                                    ? options4?.data
                                    : urlEndPoint === 'assignbatches' && input.name === 'trackId'
                                        ? options5?.data
                                        : options?.data
                    }
                    onChange={handleEditChange}
                    value={input.value}
                    name={input.name}
                    id="id"
                    noLabel
                    isbtCode={input.name === 'productcodeId'}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-004' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                {/* <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="api"
                        name={input.name}
                        value={input.value}
                        className={classes.radioBtns}
                        onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                    >
                        {genderOptions.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                label={option.name}
                            />
                        ))}
                    </RadioGroup>
                </FormControl> */}
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-005' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <DatePicker
                    inputVariant={'outlined'}
                    handleDate={(date) => handleDateChange(input.name, date)}
                    value={input.value}
                    format="MM/dd/yyyy"
                    fullWidth
                    width={'100%'}
                    height={45}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-006' ? (
            <div className={classes.checkBoxContainer}>
                <label htmlFor={input.name} className={classes.checkBoxlabel}>
                    {input.label}:
                </label>
                <Switch color="primary" name={input.name} checked={input.value} onChange={handleEditChange} />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </div>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-007' ? (
            <Grid
                item
                xs={12}
                md={input.name !== 'serverAddress' ? 6 : 12}
                lg={input.name !== 'serverAddress' ? 6 : 12}
                className={classes.inputField}
                key={input.name}
            >
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <MultipleSelect
                    options={options?.data}
                    value={[input.value]}
                    onChange={handleEditChange}
                    name={input.name}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : null;
    };

    const formContainer = (
        <Grid>
            <Grid container spacing={2}>
                {inputs?.length === 0 ? (
                    <Typography variant="body2" className={classes.nofields}>
                        No Fields Available.
                    </Typography>
                ) : (
                    inputs?.map((input) => renderInput(input))
                )}
            </Grid>
        </Grid>
    );

    const updateAction = (value) => {
        const postData = { collectionName: 'activity' };

        if (!users) {
            setUserError(true);
            return;
        } else {
            setUserError(false);
        }

        if (selectAllRecords) {
            postData['comments'] = comments;
        } else {
            postData['validData'] = selectedRecords.map((ele) => {
                return { assignbatcheId: ele, 'track-code': value, comments: comments, userId: userId, deviceId: '6320991b7d29280d14a57145' };
            });
        }
        dispatch(requestbatchHeaderAction(postData, selectAllRecords, value, showFilters));
    };

    const handleDeclined = () => {
        let selectedDeclined = selectedRecords.map((ele) => {
            return { _id: ele, comments: comments, status : 'declined'};
        }
    )
        dispatch(declinedAction(selectedDeclined));
        setOpenAdd(false);
    }

    const onCloseCommentDialog = () => {
        setOpenAdd(false);
        setComments('');
    };

    const openCommentsPopup = (value) => {
        setOpenAdd(true)
        //setUpdateStatus(value);
    };
    const pullOutPostRequest = () => {
        if (selectedRecords && selectedRecords.length > 0) {
            let tempPullOutData = responseData?.data
                ?.filter((ele) => selectedRecords?.includes(ele._id))
                ?.map((i) => i?._id);

            setPullOutData(tempPullOutData);
            // const recipientId = tempPullOutData?.[0]?.recipientId[0]?._id;
            const data = {
                // recipientId: recipientId,
                requestListToPullOut: selectedRecords,
                carrierTypeId: carrierType
            };
            const payload = data;
            dispatch(clearPullOutData());
            dispatch(clearRefreshPullOutData());
            dispatch(pullOutAction(payload));
        }
    };

    const openPullOutDialog = () => {
        // dispatch(get3rdDropdown('carriertypes'));
        // setCarrierDialog(true);

        // const data = responseData?.data?.filter((ele) => selectedRecords.includes(ele._id));
        // setPullOutData(data);
        // let arr = data.map((item) => item.donationCode);
        pullOutPostRequest();
        // setPullOutTitle(`Do you want to do pull request for the folloiwng unit id ${arr.join(',')}`);
        // setPullOutTitle(`Do you want to do pull request for the selected records`);
        // setPullOutConfirmation(true);
    };

    const pullOutCancel = () => {
        setPullOutConfirmation(false);
        dispatch(clearPullOutData());
        setPullOutData([]);
    };

    useEffect(() => {
        const result = responseData.data?.find(item => selectedRecords?.includes(item._id));
        setSelectedRowObj(result)
        console.log('result--', result);
    }, [selectedRecords])

    const moveToAssign = (value) => {
        const selectedRecordsAssign = responseData.data.filter((ele) => selectedRecords.includes(ele._id));
        const selectedStatus = selectedRecordsAssign.map((ele) => ele.isAssigned);

        if (selectedStatus.includes(1)) {
            setOpenWarningAssign(true);
        } else {
            localStorage.setItem('recipientData', JSON.stringify(responseData));
            history.push({
                pathname: `/dashboard/assign-unit`,
                // here i need to check 
                state: { data: responseData.data.filter((ele) => selectedRecords.includes(ele._id)) }
            });
        }
    };

    const handleMoveToAssign = () => {
        //const selectedRecordsAssign = responseData.data.filter((ele) => selectedRecords.includes(ele._id));

        //const selectedStatus = selectedRecordsAssign.map((ele) => ele.isAssigned);
        //console.log('selectedRecordsAssign', selectedRecordsAssign)
        let remote = selectedRowObj
        console.log('remote---',remote)
        //localStorage.setItem('moverecipient', JSON.stringify(selectedRecordsAssign));
        localStorage.setItem('remoteSelectedItem', JSON.stringify(remote));
        history.push({
            pathname: `/dashboard/assign-unit/r/${remote._id}`,
            //state: { data: responseData.data.filter((ele) => selectedRecords.includes(ele._id)) }
        });
    }

    const updateLEDSelection = () => {
        const postData = { collectionName: 'activity' };
        if (selectAllRecords) {
            postData['selectAll'] = selectAllRecords;
            // postData['track-code'] = value;
        } else {
            // postData['validData'] = selectedRecords.map((ele) => {
            //     return { refskuId: ele, //'track-code': value
            //         };
            // });
        }
        dispatch(ledSelection(postData));
    };

    useEffect(() => {
        if (options) {
            setResponse({ bloodGroups: options?.data, productCodes: options2?.data });
        }
        if (options2) {
            setResponse({ bloodGroups: options?.data, productCodes: options2?.data });
        }
    }, [options, options2]);

    useEffect(() => {
        let tempGeneicValues = genericValues;
        tempGeneicValues['_id'] = rowData?._id;
        tempGeneicValues['gtinNumber'] = rowData?.gtinNumber;
        tempGeneicValues['batchNumber'] = rowData?.batchNumber;
        tempGeneicValues['serialNumber'] = rowData?.serialNumber;
        // tempGeneicValues['testnumber'] = rowData?.specialtestingId?.[0]?.testnumber;
        tempGeneicValues['rfidNumber'] = rowData?.rfidNumber;
        tempGeneicValues['expiryDate'] = rowData?.expiryDate;
        tempGeneicValues['localDescription'] = rowData?.localDescription;
        tempGeneicValues['gtinDescription'] = rowData?.gtinDescription;
        tempGeneicValues['batchProduct'] = rowData?.batchProductId?.[0]?.name;
        // tempGeneicValues['phenotypeResult'] = rowData?.specialtestingId?.[0]?.phenotypeResult;
        setBloodGroupValue(rowData?.bloodgroupId?.[0]);
        setGenericValues(tempGeneicValues);
        setProductCodeValue(rowData?.productcodeId?.[0]);
        setHospitalddvalue(rowData.clientId?.[0]);
        // if (rowData.clientId?.[0]) {
        //     dispatch(get4thDropdown('locations'));
        // }
        // if (rowData.locationId?.[0]) {
        //     dispatch(get5thDropdown('devices'));
        // }
        setLocationddValue(rowData?.locationId?.[0]);
        setDeviceddValue(rowData?.deviceId?.[0]);
    }, [rowData]);



    const addCommentsForm = (
        <Grid>
            <Grid container spacing={2}>

                <Grid item spacing={2} >

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

    // useEffect(() => {
    //     if (refFilterChips?.length > 0) {
    //         setRefFilterChips([...filterChips, ...refFilterChips]);
    //     }
    // }, [filterChips]);
    const handleCarrierClose = () => {
        setCarrierDialog(false);
        setCarrierType('');
    };

    return (
        <>
            {loading && searchKey.length === 0 && unitsearch.length === 0 ? (
                <Loader />
            ) : (
                <>
                    <Paper elevation={0} className={classes.paper}>
                        <Grid container justify="space-between" spacing={2}>
                            {/*{screenIndex === 1 && (*/}
                            {/*    <Grid item xs={1} className={classes.backButton}>*/}
                            {/*        <CustomButton variant="outlined" onClick={handleBackClick}>*/}
                            {/*            Back*/}
                            {/*        </CustomButton>*/}
                            {/*    </Grid>*/}
                            {/*)}*/}
                            <Grid item xs={3}>
                                {accessableCodes?.includes('BS-ACO-1020') || accessableCodes.includes('BS-ACO-1012') ? (
                                    <>
                                        <InputLabel className={classes.inputLabel}>Search</InputLabel>
                                        <CustomSearch
                                            value={searchKey}
                                            size="md"
                                            placeholder={'Search'}
                                            handleChange={(e) =>
                                                e.target.value !== ' ' ? handleSearch(e?.target?.value) : null
                                            }
                                            handleSearchDelete={handleSearchDelete}
                                            loader={
                                                responseData && responseData.data
                                                    ? false
                                                    : unitsearch && unitsearch.length > 3
                                                        ? true
                                                        : unitsearch && loading
                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        {' '}
                                        <InputLabel className={classes.inputLabel}>Search By Unit</InputLabel>
                                        <CustomSearch size="md" placeholder={'No Access'} disabled={true} />
                                    </>
                                )}
                            </Grid>

                            <Grid item xs={2} className={classes.Icons1}>
                                <HeaderIcons
                                    showIcons={['excell', ]}
                                    label={label}
                                    handleFilters={handleFilters}
                                    setFilterKeys={() => null}
                                    handleResetFilters={handleResetFilters}
                                    response={responseData}
                                    handleDownloadData={handleDownloadData}
                                    selectedFilters={showFilters}
                                    chipIdAndName={chipIdAndName}
                                    remainingChips={filterChips}
                                    setChipIdAndName={setChipIdAndName}
                                    setFilterKeysObject={setFilterKeysObject}
                                    enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                                    enablePdf={accessableCodes?.includes('BS-MO-1053')}
                                    enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                                    deletedChip={deletedChip}
                                    isRequestBatch={true}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    {accessToTable ? (
                        <>
                            <Paper elevation={0} className={classes.paper}>
                                <Grid container className={classes.countContainer}>
                                    <Grid xs={3}>
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                            style={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            <Box fontWeight="500">
                                                {CurrentSubMenu
                                                    ? `LIS Simulation: ${totalCount
                                                        ? totalCount
                                                        : responseData?.page?.totalCount
                                                            ? responseData?.page?.totalCount
                                                            : 0
                                                    }`
                                                    : null}
                                            </Box>
                                            <Box fontWeight="500" style={{ marginLeft: 5 }}>
                                                {CurrentSubMenu
                                                    ? `${refFilters?.length === 0
                                                        ? ''
                                                        : showFilters ||
                                                            searchKey.length > 2 ||
                                                            responseData?.page?.filterCount !==
                                                            responseData?.page?.totalCount
                                                            ? loading
                                                                ? ''
                                                                : '(' + responseData?.page?.filterCount + ')'
                                                            : ''
                                                    }`
                                                    : null}
                                            </Box>
                                            {selectAllRecords ? (
                                                <Box style={{ marginLeft: 5, marginBottom: -10 }}>
                                                    <InputLabel className={classes.inputLabel}>
                                                        {`Selected All records`}
                                                    </InputLabel>
                                                </Box>
                                            ) : (
                                                selectedRecords.length > 0 && (
                                                    <Box style={{ marginLeft: 5, marginBottom: -10 }}>
                                                        <InputLabel className={classes.inputLabel}>
                                                            {`Selected ${selectedRecords.length} ${selectedRecords.length === 1 ? ' record' : ' records'
                                                                }`}
                                                        </InputLabel>
                                                    </Box>
                                                )
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={7} className="filterChips">
                                        <CustomChip
                                            module={'manage'}
                                            dataArray={filterChips}
                                            handleDelete={handleChipDelete}
                                        />
                                    </Grid>
                                    <Grid xs={2} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                        {accessableCodes?.includes('BS-ACO-1024') ? (
                                            <DisplayConfig
                                                response={responseData?.displayConfigData}
                                                urlEndPoint={urlEndPoint}
                                                pageSize={pageSize}
                                                showFilters={showFilters}
                                                searchKey={searchKey}
                                                pageNum={pageNum}
                                                sortValue={sortValue}
                                                unitsearch={unitsearch}
                                                unitIdFilter={unitIdFilter}
                                                breadScrumbLebel={breadScrumbLebel}
                                            />
                                        ) : (
                                            <IconButton disabled>
                                                <Tooltip title="Display Config">
                                                    <ViewColumnIcon />
                                                </Tooltip>
                                            </IconButton>
                                        )}
                                        <IconButton
                                            onClick={handleMenu}
                                            disabled={
                                                accessableCodes?.includes('BS-ACO-1017')
                                                    ? isSelected
                                                        ? false
                                                        : true
                                                    : true
                                            }
                                        >
                                            <Tooltip title="Actions">
                                                <CallToActionIcon color={isSelected ? 'primary' : ''} />
                                            </Tooltip>
                                        </IconButton>

                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={requestbatchActionsLoading ? null : handleClose}
                                            getContentAnchorEl={null}
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                                        >
                                            {!selectAllRecords && (
                                                <MenuItem
                                                    className={classes.simpleMenu}
                                                    onClick={() => {
                                                        handleMoveToAssign();
                                                    }}
                                                    disabled={requestbatchActionsLoading}
                                                >
                                                    Move to Assigned
                                                    {requestbatchActionsLoading && selectedStatus === 'BS-TR-5103' && (
                                                        <CircularProgress size="20px" style={{ marginLeft: '10px' }} />
                                                    )}
                                                </MenuItem>
                                            )}
                                            <MenuItem
                                                className={classes.simpleMenu}
                                                    onClick={() => {
                                                        openCommentsPopup();
                                                    }}
                                                disabled={requestbatchActionsLoading}
                                            >
                                                Mark as Declined
                                               
                                            </MenuItem>
                                           
                                        </Menu>
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
                                        ) : responseData?.data?.length > 0 ? (
                                            <CustomTable
                                                response={responseData}
                                                rowsPerPage={pageSize}
                                                selectedSearch={null}
                                                setRowData={setRowData}
                                                setResultsCount={setResultsCount}
                                                handleDialog={handleDialog}
                                                handleEditDialog={handleEditDialog}
                                                setInitialData={setInitialData}
                                                tableHandleChange={tableHandleChange}
                                                sortOperation={sortOperation}
                                                sort={sortValue}
                                                history={history}
                                                setSelectedData={setSelectedData}
                                                selectedData={selectedData}
                                                currentLocation={url}
                                                rowChecked={rowChecked}
                                                viewRowAccess={accessableCodes?.includes('BS-ACO-1030')}
                                                editRowAccess={accessableCodes?.includes('BS-ACO-1031')}
                                                deleteRowAccess={accessableCodes?.includes('BS-ACO-1033')}
                                                cloneRowAccess={accessableCodes?.includes('BS-ACO-1032')}
                                                detailViewAccess={accessableCodes?.includes('BS-ACO-1028')}
                                                selectionAccess={accessableCodes?.includes('BS-ACO-1026')}
                                                sequenceChangeAccess={accessableCodes?.includes('BS-ACO-1025')}
                                                selectAllAccess={accessableCodes?.includes('BS-ACO-1027')}
                                                handleSelect={handleSelect}
                                                selectedRecords={selectedRecords}
                                                pageNum={pageNum}
                                                selectAllRecords={selectAllRecords}
                                                isAction={requestbatchActionsLoading}
                                                setUnchecked={setUnchecked}
                                                unchecked={unchecked}
                                                setTagIdList={setTagIdList}
                                                handleScanCountDialog={handleScanCountDialog}

                                            // isRequestUnit={true}
                                            // triggeredLedList={triggeredLedList}
                                            />
                                        ) : (
                                            <NoData />
                                        )}
                                    </Grid>
                                </Grid>
                            </Paper>
                            <CustomDialog
                                title={`Total Tags`}
                                open={tagIdDialog}
                                onSaveClick={handleScanCountDialog}
                                onClose={() => setTagIdDialog(false)}
                                isSave
                                isClose
                                tabIndex={1}
                                minWidth="400px"
                            >
                                <Grid>
                                    {tagIdList?.map((item, index) => (
                                        <Typography key={index} style={{ display: 'flex' }}>
                                            <Typography variant="body1" color="primary" style={{ fontWeight: 'bold' }}>
                                                {' '}
                                                {index + 1}
                                            </Typography>
                                            .<span style={{ marginLeft: 6 }}>{item}</span>
                                        </Typography>
                                    ))}
                                </Grid>
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
                                        <CustomButton
                                            variant="contained"
                                            color="primary"
                                            onClick={handleDeleteButtonClick}
                                        >
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
                                handleDialogClose={handleDialogClose}
                                dialogOpen={openAssignWarning}
                                title={CONSTANTS.ASSIGNWARNING}
                                type={'warning'}
                                error={errorMessage}
                            >
                                <Grid container spacing={2} className={classes.deleteDialog} justify="center">
                                    <Grid item>
                                        <CustomButton variant="outlined" color="primary" onClick={handleDialogClose}>
                                            {CONSTANTS.CANCEL}
                                        </CustomButton>
                                    </Grid>
                                </Grid>
                            </ConfirmationDialog>
                            <CustomDialog
                                title={`Add Comments`}
                                open={openAdd}
                                // onClose={onCloseCommentDialog}
                                onCancelClick={onCloseCommentDialog}
                                onSaveClick={() => handleDeclined()}
                                // isSave
                                // error={"errorMessage"}
                                // loading={postLoading}
                                // disabled={userGroupName?.length === 0}
                                tabIndex={1}
                                loading={requestbatchActionsLoading}
                            >
                                {addCommentsForm}
                            </CustomDialog>
                            {/*  <UnitEditDialog
                                title={`Edit Batch`}
                                open={editDialogOpen}
                                onCancelClick={handleEditDialogClose}
                                onClose={handleEditDialogClose}
                                onSaveClick={() => handleEditUnit()}
                                tabIndex={1}
                                disabled={!genericValues.gtinNumber || !genericValues.expiryDate}
                                error={errorMessage}
                                loading={putLoading}
                                isBatch
                            >
                                {
                                    <EditUnit
                                        genericValues={genericValues}
                                        onChangeAutoComplete={onChangeAutoComplete}
                                        productCodeOpen={productCodeOpen}
                                        bloodGroupOpen={bloodGroupOpen}
                                        productCodeValue={productCodeValue}
                                        bloodGroupValue={bloodGroupValue}
                                        handleAutoCompleteChange={handleAutoCompleteChange}
                                        productCode={response?.productCodes}
                                        bloodGroup={response?.bloodGroups}
                                        handleClickAway={handleClickAway}
                                        handleUnitId={handleUnitId}
                                        customAutoComplete={customAutoComplete}
                                        // hospitalddOpen={hospitaldd/Open}
                                        hostialddValue={hostialddValue}
                                        locationddOpen={locationddOpen}
                                        deviceddOpen={deviceddOpen}
                                        locationddValue={locationddValue}
                                        deviceddValue={deviceddValue}
                                    />
                                }
                            </UnitEditDialog>*/}

                            <ConfirmationDialog
                                deleteLabel
                                handleDialogClose={pullOutCancel}
                                dialogOpen={pullOutConfirmation}
                                title={pullOutTitle}
                                type={'warning'}
                                error={errorMessage}
                            >
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container spacing={2} className={classes.deleteDialog} justify="center">
                                            <Grid item>
                                                <CustomButton
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => pullOutCancel()}
                                                >
                                                    {CONSTANTS.CANCEL}
                                                </CustomButton>
                                            </Grid>
                                            <Grid item>
                                                <CustomButton
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => pullOutPostRequest()}
                                                >
                                                    {'OK'}
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ConfirmationDialog>
                            <ConfirmationDialog
                                deleteLabel
                                handleDialogClose={() => handleCarrierClose()}
                                dialogOpen={carrierDialog}
                                // title="Select Carrier"
                                error={errorMessage}
                                noPadding
                            >
                                <Grid container direction="column" style={{ width: '300px' }}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={4} className={classes.deleteDialog} justify="center">
                                            <Grid item xs={12} className={classes.inputField}>
                                                <InputLabel className={classes.inputLabel}>Select Carrier</InputLabel>
                                                <SelectOption
                                                    options={options3?.data}
                                                    onChange={onCarrierChange}
                                                    value={carrierType}
                                                    name="carrierType"
                                                    isCarrier
                                                />
                                            </Grid>
                                            {/* <Grid item /> */}
                                            <Grid item>
                                                <CustomButton
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => pullOutPostRequest()}
                                                >
                                                    Next
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ConfirmationDialog>

                            {alertOpen2 && (
                                <Alert
                                    open={alertOpen2}
                                    message={`Batch updated successfully.`}
                                    duration={2000}
                                    onClose={() => setAlertOpen2(false)}
                                    vertical={'bottom'}
                                    horizontal={'center'}
                                    severity="success"
                                    actions={false}
                                />
                            )}
                            {deleteAlert && (
                                <Alert
                                    open={deleteAlert}
                                    message={'Record Deactivated Successfully.'}
                                    duration={2000}
                                    onClose={() => setDeleteAlert(false)}
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
                                    onClose={() => showSnackbar(false, '', '')}
                                    vertical={'bottom'}
                                    horizontal={'center'}
                                    severity={severity === 'success' ? 'success' : 'error'}
                                    actions={false}
                                />
                            )}
                        </>
                    ) : null}
                </>
            )}
        </>
    );
}; export default Remoteallocation;