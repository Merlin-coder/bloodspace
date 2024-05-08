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
    Typography
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
//import { checkTextSum } from '.././../../components/add-unit/add-unit-form/unitIdService';
import { checkTextSum } from '../../components/add-unit/add-unit-form/unitIdService';
import FlareIcon from '@material-ui/icons/Flare';
import EjectIcon from '@material-ui/icons/Eject';
import DoneIcon from '@material-ui/icons/Done';
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
import {
    clearFilterCriteria,
    getFilterCriteria,
    getFilter,
    getRequestBatchFilter
} from 'redux/actions/filters/filtersActions';

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
    postWastedUnit,
    postTransfusedUnits
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
import { socketAssociateBulkData, assignLocalDataAction } from 'redux/actions/socketAction';

import { oneTimeScanAction, oneTimeScanERROR, socketDeviceToken } from 'redux/actions/socketAction';
import { getPhenotypeReport } from '../../components/add-unit/add-unit-form/speciaTNService';
//import ConvertToDBDate from './julianDateConverter';
import specialTesingCheck from '../../components/add-unit/add-unit-form/specialTestingService';

let totalPageCount;
const RequestUnit = (props) => {
    const param = useLocation();
   // const location = useLocation();
    const selectedItem = param?.state?.selectedItem;
    console.log('browseselected--',selectedItem)
    const classes = useStyles();
    const history = useHistory();
    const {
        data,
        refFilters,
        setIndex,
        setRefFilters,
        chipsNames,
        setFilters4,
        dashboardRoute,
        setAllSelected1,
        setAllSelected2,
        setAllSelected3
    } = props;
    console.log('dataaaaa', data);
    const [initialData, setInitialData] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [alertOpen2, setAlertOpen2] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [resultsCount, setResultsCount] = useState('');
    const [rowData, setRowData] = useState({});
    console.log('row--', rowData);
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

    const dispatch = useDispatch();
    const apiResponse = useSelector((state) => state.getData);
    const { userRoleData } = useSelector((state) => state.getUserAccessId);
    console.log('uuuuuuuu', userRoleData);
    let { filterCriteria } = useSelector((state) => state.getFiltersCriteria);
    console.log('==========', filterCriteria);
    let { filtersNewData } = useSelector((state) => state.getFilter);
    console.log('==========', filtersNewData);
    const { loading, responseData } = apiResponse;
    console.log('r==', responseData);

    let remoteInfo = JSON.parse(localStorage.getItem('remoteInfo'));
    console.log('remoteInfo', remoteInfo);

    const [batchUserError, setBatchUserError] = useState(false);
    const [users, setUsers] = useState('');
    console.log('userrr', users);
    const [userId, setUserId] = useState('');

    const handleUserChange = (e) => {
        console.log(e.target.value);
        const user = options4?.data?.find((dat) => dat.name === e.target.value);
        console.log('user', user);
        setUsers(user.name);
        setUserId(user._id);
        setUserError(false);
        console.log('userId', userId);
    };

    const mData = data.length > 1 ? data[1] : data[0];
    const label = mData.label;
    let breadScrumbLebel = data[0]?.label;
    const urlEndPoint = mData.urlEndPoint;
    const CurrentSubMenu = label.indexOf('ed') === -1 && label !== 'Request Unit' ? pluralize.plural(label) : label;
    let url = props.path.split('/').slice(2).join('/');
    const [filterChips, setFilterChips] = useState();
    const [searchDate, setSearchDate] = useState(null);
    const [accessableCodes, setAccessableCodes] = useState([]);
    const subMenuCode = mData.code;
    const [unitsearch, setUnitSearch] = useState('');
    const [selectedRecords, setSelectedRecords] = useState([]);
    console.log('selectedddddd', selectedRecords);
    const [selectedRowObj, setSelectedRowObj] = useState({});
    console.log('selectedRowObj--', selectedRowObj)
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
    const [hostialddValue, setHospitalddvalue] = useState(null);
    const [locationddValue, setLocationddValue] = useState(null);
    const [deviceddValue, setDeviceddValue] = useState(null);
    console.log('devddddd',deviceddValue)
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
    const { wastedUnitResponse, wastedUnitLoading, wastedUnitError } = useSelector((state) => state.postWastedUnit);
    console.log('responsewasted', wastedUnitResponse);
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
    const { token } = useSelector((state) => state.getSocketDeviceToken);
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
    const [filterKeysObject, setFilterKeysObject] = useState([]);
    // const [LedTrigger, setLedTrigger] = useState(false);
    const LedTrigger = useRef(false);
    const currentPc = useSelector((state) => state.currentPcStore);
    const { refreshPUlloutLoading, refreshPullOutSuccess, refreshPullOutError } = useSelector(
        (state) => state.refreshPullOut
    );
    const [user, setUser] = useState({});
    const [screens, setScreens] = useState('');
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    const { validationRequired } = useSelector((state) => state.associateValidation);
    const [userError, setUserError] = useState(false);
    const { userInfo } = useSelector((state) => state.userLogin);
    console.log('userInfo', userInfo);

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
        dispatch(getUserAccessId('user', 0, 1, undefined, [{ key: '_id', value: [userInfo?.data?.user?._id] }]));
    }, []);

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

    //useEffect(() => {
    //    getUserData();
    //}, []);

    //const getUserData = async () => {
    //    const user = await dispatch(getData('user', 0, 1, undefined, [{ key: '_id', value: [userInfo?.data?.user?._id] }]));
    //    if (user) {
    //        console.log("userrr", user);
    //        setUser(user.data[0]);
    //    } else {
    //        console.log("Failed to fetch user details");
    //    }
    //}

    const [genericValues, setGenericValues] = useState({
        donationCode: '',
        testnumber: '',
        collectionDateAndTime: '',
        expiryDateAndTime: '',
        dimensions: '',
        dereservationDate: '',
        mrnNumber: '',
        recipientName: ''
    });
    const onCarrierChange = (e) => {
        setCarrierType(e.target.value);
    };
    useEffect(() => {
        socket?.on('triggeredLeds', (data) => {
            setTriggerLedList([...data.data]);
        });
        socket?.on('triggerLedOff', (data) => {
            setTriggerLedList([]);
        });
        socket?.on('refresh', (data) => {
            if (window.location.pathname === '/dashboard/request-unit' && urlEndPoint === 'refsku') {
                console.log('request===');
                dispatch(
                    getData(
                        'refsku',
                        pageSize * 3,
                        1,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        remoteInfo?.emergencyLogin === true ? emergencyId : undefined
                    )
                );
            }
        });
    }, [socket]);

    useEffect(() => {
        dispatch(getFilter(remoteInfo?.emergencyLogin === 'TRUE' ? '6320991b7d29280d14a57145' : undefined));
    }, [emergencyId,options8]);

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
                'BS-MO-1053',
                'BS-ACO-1017',
                'BS-ACO-1018',
                'BS-ACO-1019'
            ];
        } else {
            let manageAccessCodes =
                userInfo?.data?.userAccess
                    ?.filter((item) => item['drawer-code'] === 'BS-DR-0045')
                    ?.map((subMenu) => subMenu?.menuId)
                    ?.flat()
                    ?.filter((item) => item['drawer-code'] === subMenuCode)[0] || [];
            let keysOfObject = Object.keys(manageAccessCodes);
            keysOfObject.forEach((item) => {
                if (Array.isArray(manageAccessCodes[item])) {
                    manageAccessCodes[item][0] === '1' && tempAccessCodes.push(manageAccessCodes[item][1]);
                }
            });
        }
        setAccessableCodes(tempAccessCodes);
    }, [param]);

    //const handleUnitId = (e, text, feild) => {
    //    let tempGenericValue = { ...genericValues };
    //    tempGenericValue[feild] = e;
    //    setGenericValues(tempGenericValue);
    //};

    const [check, setCheck] = useState('');
    const [unitIdHelperText, setUnitIdHelperText] = useState('');
    const [disableCheck, setDisableCheck] = useState(false);
    const [specialTestingHelperText, setSpecialTestingHelperText] = useState('');
    const [specialCheck, setSpecialCheck] = useState('');
    const [phenotype, setPhenotype] = useState();

    const donationIdRef = useRef();
    const specialTestingRef = useRef();
    const specialRef = useRef();

    const checkRef = useRef();
    const phenytypeRef = useRef();
    const specialCheckRef = useRef();
    const dimensionsRef = useRef();
    const tagIdRef = useRef();

    const branchRef = useRef();

   


    const removeFoucsFromDropDown = (feild) => {
        if (feild === 'productCode') {
            productCodeRef.current.blur();
            productCodeRef.current.focus();
        } else if (feild === 'bloodGroup') {
            blooGroupRef.current.blur();
            blooGroupRef.current.focus();
        }
    };

    useEffect(() => {
        console.log('genericInput' + JSON.stringify(genericInput));
        let keys = Object.keys(genericInput);
        console.log('keys' + genericInput[keys[0]]);
        console.log('keys' + genericInput[keys[1]]);
        console.log('keys' + genericInput[keys[2]]);
        tempUnitId(genericInput[keys[0]], keys[1], keys[0]);
    }, [genericInput]);

    //const tempUnitId = (e, text, feild) => {
    //    console.log('eevent',e)
    //    let tempGenericValue = { ...genericValues };

    //    if (feild === 'donationCode' && check) {
    //        //if unitId  have an error
    //        setUnitIdHelperText('');
    //        setCheck('');
    //        setDisableCheck(false);
    //    }

    //    if (feild === 'testnumber' && specialTestingHelperText) {
    //        //if special testing have an error
    //        setSpecialTestingHelperText('');
    //        setSpecialCheck('');
    //        setPhenotype('');
    //    }

    //    if (feild === 'dimension') {
    //        tempGenericValue['dimension'] = e;
    //    } else if (feild === 'tagId') {
    //        tempGenericValue['tagId'] = e;
    //        dispatch(oneTimeScanERROR());
    //    } else if (e?.lastIndexOf('=') === 0 && e?.substr(1).match(/^[a-zA-Z0-9]+$/)) {
    //        // Need to Validate the Barcode Format whether it is ISBT Standard or Australia Standard.

    //        console.log(" ----- Barcode Scan  ----------- " + settingsData?.general?.barCodeFormat);
    //        if (settingsData?.general?.barCodeFormat === "AUSTRALIAN") {

    //            if (e?.length === 14) {
    //                let checkval = checkTextSum(e.substr(1, 13));
    //                setCheck(checkval);
    //                setDisableCheck(true);
    //                tempGenericValue['donationCode'] = e.substr(1, 14);
    //                if (feild === 'donationCode') {
    //                    shiftFocus(feild);
    //                } else {
    //                    tempGenericValue[feild] = '';
    //                }
    //                removeFoucsFromDropDown(feild);
    //            } else {
    //                if (feild !== 'expiryDate' && feild !== 'collectionDate') tempGenericValue[feild] = e;
    //            }
    //        }
    //        else {
    //            if (e?.length === 16) {
    //                let checkval = checkTextSum(e.substr(1, 15));
    //                setCheck(checkval);
    //                setDisableCheck(true);
    //                tempGenericValue['donationCode'] = e.substr(1, 16);
    //                if (feild === 'donationCode') {
    //                    shiftFocus(feild);
    //                } else {
    //                    tempGenericValue[feild] = '';
    //                }
    //                removeFoucsFromDropDown(feild);
    //            } else {
    //                if (feild !== 'expiryDate' && feild !== 'collectionDate') tempGenericValue[feild] = e;
    //            }
    //        }

    //        setUnitIdHelperText('');
    //    } else if (check && feild === 'donationCode' && e.length < 13) {
    //        setCheck('');
    //        setUnitIdHelperText('');
    //        setDisableCheck(false);
    //    } else if (feild === 'donationCode' && e?.match(/^[a-zA-Z0-9]+$/) && validationRequired) {
    //        console.log(" ----- Manual Enter  ----------- " + settingsData?.general?.barCodeFormat);

    //        if (settingsData?.general?.barCodeFormat === "AUSTRALIAN") {
    //            if (e?.length === 13) {
    //                console.log("Shift Focus 13 Digit")
    //                checkRef.current.focus();
    //            }
    //        }
    //        else {
    //            if (e?.length === 15) {
    //                console.log("Shift Focus 15 digit")
    //                checkRef.current.focus();
    //            }
    //        }

    //    } else if (e?.lastIndexOf('=%') === 0 && e?.substr(2)?.match(/^[a-zA-Z0-9]+$/)) {
    //        let tempbloodGroupValue = options?.data?.find(
    //            (item) => item.isbtcode.toLowerCase() === e?.substr(2).toLowerCase()
    //        );
    //        if (tempbloodGroupValue !== undefined) {
    //            setBloodGroupErrortxt('');
    //            setBloodGroupOpen(false);
    //            setBloodGroupValue(tempbloodGroupValue);
    //            feild === 'bloodGroup' ? shiftFocus(feild, tempbloodGroupValue) : removeFoucsFromDropDown(feild);
    //            tempGenericValue[feild] = '';
    //        } else if (e?.length === 6) {
    //            setBloodGroupValue(null);
    //            setBloodGroupErrortxt('Invalid Bood Group');
    //            removeFoucsFromDropDown(feild);
    //            tempGenericValue[feild] = '';
    //        } else {
    //            feild !== 'expiryDate' ? (feild !== 'collectionDate' ? (tempGenericValue[feild] = e) : null) : null;
    //        }
    //    } else if (e?.lastIndexOf('=<') === 0 && e?.substr(2)?.match(/^[a-zA-Z0-9]+$/)) {
    //        let productCodeValue = options2?.data?.find(
    //            (item) => item.isbtcode.toLowerCase() === e?.substr(2).toLowerCase()
    //        );
    //        if (productCodeValue !== undefined) {
    //            setProductCodeErrortxt('');
    //            setProductCodeValue(productCodeValue);
    //            feild === 'productCode' ? shiftFocus(feild) : removeFoucsFromDropDown(feild);
    //            tempGenericValue[feild] = '';
    //        } else if (e?.length === 10) {
    //            setProductCodeValue(null);
    //            setProductCodeErrortxt('Invalid Product Code');
    //            removeFoucsFromDropDown(feild);
    //            tempGenericValue[feild] = '';
    //        } else {
    //            tempGenericValue[feild] = e;
    //        }
    //    } else if (e?.startsWith('=\\') &&  e?.length === 20) {

    //        const subVal = e.substring(2);
    //        const speicalCheckVal = specialTesingCheck(subVal);
    //        const phenoVal = getPhenotypeReport(subVal);
    //        setSpecialCheck(speicalCheckVal);
    //        console.log("sub val"+subVal);
    //        console.log(speicalCheckVal);
    //        console.log(phenoVal);

    //        setPhenotype(phenoVal);
    //        if (feild === 'testnumber') {
    //            tempGenericValue['testnumber'] = subVal;
    //            shiftFocus(feild);
    //        } else {
    //            tempGenericValue[feild] = '';
    //            tempGenericValue['testnumber'] = subVal;
    //        }
    //        removeFoucsFromDropDown(feild);
    //    } else if (specialCheck && phenotype && feild === 'testnumber' && e.length < 18) {
    //        setSpecialTestingHelperText('');
    //        setSpecialCheck('');
    //        setPhenotype('');
    //    } else if (feild === 'testnumber' && e.length === 18 && !e?.startsWith('=\\')) {
    //        specialCheckRef.current.focus();
    //    }
    //    setGenericValues(tempGenericValue);
    //};

    const tempUnitId = (e, text, feild) => {
        let tempGenericValue = { ...genericValues };
        console.log('Barcode Value =' + feild + '--' + e);
        console.log('temp');
        tempGenericValue[feild] = e;
        console.log(e?.lastIndexOf('='));
        if (feild === 'donationCode' && check) {
            //if unitId  have an error
            setUnitIdHelperText('');
            setCheck('');
            setDisableCheck(false);
        }

        if (feild === 'testnumber' && specialTestingHelperText) {
            //if special testing have an error
            setSpecialTestingHelperText('');
            setSpecialCheck('');
            setPhenotype('');
        }

        if (feild === 'dimension') {
            tempGenericValue['dimension'] = e;
        } else if (feild === 'tagId') {
            tempGenericValue['tagId'] = e;
            dispatch(oneTimeScanERROR());
        } else if (e?.lastIndexOf('=') === 0 && feild === 'donationCode') {
            // Need to Validate the Barcode Format whether it is ISBT Standard or Australia Standard.

            console.log(' ----- Barcode Scan  ----------- ' + settingsData?.general?.barCodeFormat);
            if (settingsData?.general?.barCodeFormat === 'AUSTRALIAN') {
                if (e?.length === 14) {
                    let checkval = checkTextSum(e.substr(1, 13));
                    setCheck(checkval);
                    setDisableCheck(true);
                    tempGenericValue['check'] = checkval;
                    tempGenericValue['check'] = checkval;
                    tempGenericValue['donationCode'] = e.substr(1, 14);
                    if (feild === 'donationCode') {
                        shiftFocus(feild);
                    } else {
                        tempGenericValue[feild] = '';
                    }
                    removeFoucsFromDropDown(feild);
                } else {
                    if (feild !== 'expiryDate' && feild !== 'collectionDate') tempGenericValue[feild] = e;
                }
            } else {
                if (e?.length === 16) {
                    let checkval = checkTextSum(e.substr(1, 15));
                    setCheck(checkval);
                    setDisableCheck(true);
                    tempGenericValue['donationCode'] = e.substr(1, 16);
                    if (feild === 'donationCode') {
                        shiftFocus(feild);
                    } else {
                        tempGenericValue[feild] = '';
                    }
                    removeFoucsFromDropDown(feild);
                } else {
                    if (feild !== 'expiryDate' && feild !== 'collectionDate') tempGenericValue[feild] = e;
                }
            }

            setUnitIdHelperText('');
        } else if (check && feild === 'donationCode' && e.length < 13) {
            setCheck('');
            setUnitIdHelperText('');
            setDisableCheck(false);
        } else if (feild === 'donationCode' && e?.match(/^[a-zA-Z0-9]+$/) && validationRequired) {
            console.log(' ----- Manual Enter  ----------- ' + settingsData?.general?.barCodeFormat);

            if (settingsData?.general?.barCodeFormat === 'AUSTRALIAN') {
                if (e?.length === 13) {
                    console.log('Shift Focus 13 Digit');
                    checkRef?.current?.focus();
                }
            } else {
                if (e?.length === 15) {
                    console.log('Shift Focus 15 digit');
                    checkRef?.current?.focus();
                }
            }
        } else if (e?.lastIndexOf('=%') === 0 && e?.substr(2)?.match(/^[a-zA-Z0-9]+$/)) {
            let tempbloodGroupValue = options?.data?.find(
                (item) => item.isbtcode.toLowerCase() === e?.substr(2).toLowerCase()
            );
            if (tempbloodGroupValue !== undefined) {
                setBloodGroupErrortxt('');
                setBloodGroupOpen(false);
                setBloodGroupValue(tempbloodGroupValue);
                feild === 'bloodGroup' ? shiftFocus(feild, tempbloodGroupValue) : removeFoucsFromDropDown(feild);
                tempGenericValue[feild] = '';
            } else if (e?.length === 6) {
                setBloodGroupValue(null);
                setBloodGroupErrortxt('Invalid Bood Group');
                removeFoucsFromDropDown(feild);
                tempGenericValue[feild] = '';
            } else {
                feild !== 'expiryDate' ? (feild !== 'collectionDate' ? (tempGenericValue[feild] = e) : null) : null;
            }
        } else if (e?.lastIndexOf('=<') === 0 && e?.substr(2)?.match(/^[a-zA-Z0-9]+$/)) {
            let productCodeValue = options2?.data?.find(
                (item) => item.isbtcode.toLowerCase() === e?.substr(2).toLowerCase()
            );
            if (productCodeValue !== undefined) {
                setProductCodeErrortxt('');
                setProductCodeValue(productCodeValue);
                feild === 'productCode' ? shiftFocus(feild) : removeFoucsFromDropDown(feild);
                tempGenericValue[feild] = '';
            } else if (e?.length === 10) {
                setProductCodeValue(null);
                setProductCodeErrortxt('Invalid Product Code');
                removeFoucsFromDropDown(feild);
                tempGenericValue[feild] = '';
            } else {
                tempGenericValue[feild] = e;
            }
        } else if (e?.startsWith('=\\') && e?.substr(2)?.match(/^[a-zA-Z0-9]+$/) && e?.length === 20) {
            console.log('Special Testing');
            const subVal = e.substring(2);
            const speicalCheckVal = specialTesingCheck(subVal);
            const phenoVal = getPhenotypeReport(subVal);
            setSpecialCheck(speicalCheckVal);
            setPhenotype(phenoVal);
            if (feild === 'testnumber') {
                tempGenericValue['testnumber'] = subVal;
                shiftFocus(feild);
            } else {
                tempGenericValue[feild] = '';
                tempGenericValue['testnumber'] = subVal;
            }
            removeFoucsFromDropDown(feild);
        } else if (feild === 'expiryDateAndTime' && !e?.startsWith('&')) {
            tempGenericValue[feild] = e;
        } else if (e?.startsWith('&') && e?.substr(2)?.match(/^[0-9]+$/) && e?.length === 12) {
            let julianDate = e;
            console.log('newj--', e);
            //let newJDate = [moment(e).format('YYYY-MM-DD'), moment(e).format('YYYY-MM-DD')];
            let newJDate = ConvertToDBDate(julianDate.substr(2));
            if (newJDate === undefined) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: 'Invalid Date',
                        alertType: 'error'
                    })
                );
                tempGenericValue[feild] = '';
            } else if (julianDate.includes('&>')) {
                if (genericValues['collectionDate'] !== '') {
                    let tempCollectionDate = new Date(genericValues.collectionDate)?.getTime();
                    let tempExpiryDate = new Date(newJDate)?.getTime();
                    if (tempExpiryDate < tempCollectionDate) {
                        setExpiryDateErrorTxt('Should not be less than collection Date');
                    } else if (tempExpiryDate === tempCollectionDate) {
                        setExpiryDateErrorTxt('Should not be equal to collection Date');
                    } else {
                        setExpiryDateErrorTxt('');
                    }
                }
                tempGenericValue['expiryDate'] = newJDate;
                feild !== 'expiryDate' ? (tempGenericValue[feild] = '') : shiftFocus(feild);
            } else if (julianDate.includes('&}')) {
                if (genericValues['expiryDate'] !== '') {
                    let tempExpiryDate = new Date(genericValues.expiryDate)?.getTime();
                    let tempCollectionDate = new Date(newJDate)?.getTime();
                    if (tempCollectionDate > tempExpiryDate) {
                        setCollectionDateErrorTxt('Should not be grater than expiry Date');
                    } else if (tempExpiryDate === tempCollectionDate) {
                        setCollectionDateErrorTxt('Should not be equal to expiry Date');
                    } else {
                        setCollectionDateErrorTxt('');
                    }
                }
                tempGenericValue['collectionDate'] = newJDate;
                feild !== 'collectionDate' ? (tempGenericValue[feild] = '') : shiftFocus(feild);
            } else {
                tempGenericValue[feild] = e;
            }
            removeFoucsFromDropDown(feild);
        } else if (specialCheck && phenotype && feild === 'testnumber' && e.length < 18) {
            setSpecialTestingHelperText('');
            setSpecialCheck('');
            setPhenotype('');
        } else if (feild === 'testnumber' && e.length === 18 && !e?.startsWith('=\\')) {
            specialCheckRef?.current?.focus();
        }

        setGenericValues(tempGenericValue);
    };

    const shiftFocus = (feild, value) => {
        console.log('Shift Focus');
        if (genericValues['donationCode'] === '' || feild === 'donationCode') {
            checkRef.current.focus();
        } else if (
            (bloodGroupValue === undefined && feild !== 'bloodGroup') ||
            (bloodGroupValue === null && feild !== 'bloodGroup')
        ) {
            blooGroupRef.current.focus();
        } else if (
            (productCodeValue === undefined && feild !== 'productCode') ||
            (productCodeValue === null && feild !== 'productCode')
        ) {
            productCodeRef.current.focus();
        } else if (genericValues['expiryDate'] === '' || genericValues['expiryDate'] === undefined) {
            //expiryDateRef.current.focus();
        } else if (genericValues['testnumber'] === '' || feild === 'testnumber') {
            specialCheckRef.current.focus();
        } else if (genericValues['specialCheckChar'] === '' || feild === 'specialCheckChar') {
            phenytypeRef.current.focus();
        } else if (genericValues['collectionDate'] === '') {
            collectionDateRef.current.focus();
        } else {
            expiryDateRef.current.blur();
            collectionDateRef.current.blur();
            specialTestingRef.current.blur();
            donationIdRef.current.blur();
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'Inputs Received',
                    alertType: 'success'
                })
            );
        }
    };

    const [bloodGroupErrortxt, setBloodGroupErrortxt] = useState('');
    const [productCodeErrortxt, setProductCodeErrortxt] = useState('');
    const [collectionDateErrorTxt, setCollectionDateErrorTxt] = useState('');
    const [expiryDateErrorTxt, setExpiryDateErrorTxt] = useState('');

    const handleSpecialCheck = (e) => {
        if (e.target.value.length === 1) {
            const val = e.target.value;
            if (genericValues['testnumber']?.length < 18) {
                setSpecialTestingHelperText('Enter 18 digit value');
                setSpecialCheck(val.toUpperCase());
                return;
            }
            setSpecialCheck(val.toUpperCase());
            checkSpecialChar(val.toUpperCase());
        } else if (e.target.value === '') {
            setPhenotype('');
            setSpecialCheck('');
        }
    };

    const checkSpecialChar = (val) => {
        let value = specialTesingCheck(genericValues['testnumber']);

        if (value && value === val) {
            setSpecialTestingHelperText('');
            if (genericValues['collectionDateAndTime'] === '') {
                collectionDateRef.current.focus();
            } else {
                shiftFocus();
            }
            const phenoVal = getPhenotypeReport(genericValues['testnumber']);
            setPhenotype(phenoVal);
        } else {
            setSpecialTestingHelperText('Enter a valid special testing number');
        }
        console.log('value--', value);
        console.log('val---', val);
    };

    const checkChar = (val) => {
        console.log('val----', val);
        let value = '';

        if (settingsData?.general?.barCodeFormat === 'AUSTRALIAN') {
            value = checkTextSum(genericValues['donationCode']?.substr(0, 13));
        } else {
            value = checkTextSum(genericValues['donationCode']?.substr(0, 15));
        }

        console.log('value---', value);
        //if (value && value === val) {
        //    setUnitIdHelperText('');
        //    return 1;
        //    //  blooGroupRef.current.focus();
        //} else {
        //    setUnitIdHelperText(CONSTANTS.ERROR_UNIT_ID_MATCH);
        //    return 0;
        //}
    };

    const handleUnitId = (e, text, feild) => {
        console.log('Handle Barcode');
        console.log(e + '------' + text + '-------' + feild);
        let tempGenericValue = { ...genericValues };
        let expiryDate = '';
        let dereservationDate = '';

        if (feild === 'donationCode') {
            e = e.toUpperCase();
            console.log(e + 'Converted to Upper Case' + text + '-------' + feild);
            tempGenericValue['check'] = '';
        }
        if (feild === 'check') {
            if (tempGenericValue['donationCode'] !== undefined && tempGenericValue['donationCode'].length > 0) {
                if (e !== checkTextSum(tempGenericValue['donationCode'])) {
                    setUnitIdHelperText('Invalid Unit Id');
                } else {
                    setUnitIdHelperText('');
                }
            }
        }
        if (feild === 'testnumber') {
            // tempGenericValue['specialCheckChar'] = "";
        }
        if (feild === 'specialCheckChar') {
            if (tempGenericValue['testnumber'] !== undefined && tempGenericValue['testnumber'].length > 0) {
                if (e !== specialTesingCheck(tempGenericValue['testnumber'])) {
                    setSpecialTestingHelperText('Invalid testing number');
                    console.log('Invalid testing number');
                } else {
                    setSpecialTestingHelperText('');
                }
            }
        }
        if (feild === 'expiryDate' && e) {
            let date = new Date(e);
            console.log('Expiry Hours' + date.getHours());
            let currentdate = new Date();
            if (date.getHours() !== currentdate.getHours() || date.getMinutes() !== currentdate.getMinutes()) {
                expiryDate = date?.toString();
            } else {
                console.log('Expiry Date Time Differs');
                date.setHours(23, 59, 59, 999);
            }
            expiryDate = date?.toString();
            tempGenericValue[feild] =
                feild === 'expiryDate' ? expiryDate : feild !== 'collectionDate' ? '' : e?.toString();
            console.log('expiryDate', expiryDate);
        }
        if (feild === 'dereservationDate' && e) {
            let date = new Date(e);

            dereservationDate = date?.toString();
            tempGenericValue[feild] = feild === 'dereservationDate' ? dereservationDate : '';
        }

        // console.log("trim",e?.trim())
        //tempGenericValue[feild] = feild !== 'expiryDate' && feild !== 'collectionDate' ? e.trim() : e?.toString();
        let tempGenericInput = {};

        if (feild === 'dimension') {
            if (e.match(/\w+/g)) {
                tempGenericInput[feild] = e;
            } else if (e !== '') {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: 'Invalid Entry',
                        alertType: 'error'
                    })
                );
                tempGenericInput[feild] = '';
            }
        } else if (feild === 'collectionDate' && genericValues['expiryDate'] !== '' && !text?.match(/[&}=><%]/g)) {
            let tempExpiryDate = new Date(genericValues.expiryDate)?.getTime();
            let tempCollectionDate = new Date(e)?.getTime();
            if (tempCollectionDate > tempExpiryDate) {
                setCollectionDateErrorTxt('Should not be grater than expiry Date');
            } else if (tempExpiryDate === tempCollectionDate) {
                setCollectionDateErrorTxt('Should not be equal to expiry Date');
            } else {
                setCollectionDateErrorTxt('');
                //setDisableAssociateBtn(false);
            }
            if (isNaN(tempCollectionDate)) {
                tempGenericValue[feild] = '';
                tempGenericInput[feild] = '';
                setCollectionDateErrorTxt('Invalid Entry');
            }
        } else if (feild === 'expiryDate' && genericValues['collectionDate'] !== '' && !text?.match(/[&}=><%]/g)) {
            let tempCollectionDate = new Date(genericValues.collectionDate)?.getTime();
            let tempExpiryDate = new Date(e)?.getTime();
            console.log('tempExpiryDate', tempExpiryDate);
            if (tempExpiryDate < tempCollectionDate) {
                setExpiryDateErrorTxt('Should not be less than collection Date');
            } else if (tempExpiryDate === tempCollectionDate) {
                setExpiryDateErrorTxt('Should not be equal to collection Date');
            } else {
                setExpiryDateErrorTxt('');
            }
            if (isNaN(tempExpiryDate)) {
                tempGenericValue[feild] = '';
                tempGenericInput[feild] = '';
                setExpiryDateErrorTxt('Invalid Entry');
            }
        } else {
            console.log(feild + '---------' + e);
            tempGenericInput[feild] =
                String(e) === 'Invalid Date' ? text?.replace(/_/g, '')?.trim() : e?.toString()?.trim();
        }

        console.log('tempGenericValue', JSON.stringify(tempGenericValue));
        console.log('tempGenericInput', JSON.stringify(tempGenericInput));
        setGenericInput(tempGenericInput);
        setGenericValues(tempGenericValue);
    };

    const handleCheck = (e) => {
        console.log('handlecheck');
        if (e.target.value.length <= 1 && e.target.value !== ' ') {
            const val = e.target.value;
            if (validationRequired) {
                let flag = checkChar(val.toUpperCase());

                if (settingsData?.general?.barCodeFormat === 'AUSTRALIAN') {
                    if (genericValues['donationCode'].length < 13) {
                        setUnitIdHelperText('Enter 13 digit value');
                        setCheck(val.toUpperCase());
                        return;
                    } else if (flag) {
                        blooGroupRef.current.focus();
                    }
                } else {
                    if (genericValues['donationCode'].length < 15) {
                        setUnitIdHelperText('Enter 15 digit value');
                        setCheck(val.toUpperCase());
                        return;
                    } else if (flag) {
                        blooGroupRef.current.focus();
                    }
                }
            }
            setCheck(val?.toUpperCase());
        }
    };

    //const handleCheck = (e) => {
    //    console.log(" ---- Handle check ---- " + unitId)
    //    setProductCode(null);
    //    const checkVal = checkTextSum(unitId);
    //    console.log("----" + checkVal + "----");
    //    if (e.target.value.toUpperCase() === checkVal) {
    //        console.log("Unit Id & check are matching")
    //        setUnitIdError(false);
    //        productCodeRef?.current?.focus();
    //    } else if (validationRequired) {
    //        setUnitIdError(true);
    //        setUnitIdErrorText('Enter A Valid Unit ID');
    //    }
    //     setCheck(e.target.value.toUpperCase());
    //};
    const handleEditUnit = () => {
        let tempGenericValue = {
            ...genericValues,
            productcodeId: productCodeValue?._id,
            bloodgroupId: bloodGroupValue?._id,
            clientId: hostialddValue?._id || '',
            locationId: locationddValue?._id || '',
            deviceId: deviceddValue?._id || ''
        };
        console.log('editdata' + tempGenericValue);

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

    console.log('getStaticFilters', getStaticFilters);
    //let screenName = url.split('/').pop();
    console.log('screen', screen);
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

    const handleBackClick = () => {
        if (history.location.pathname === '/dashboard/request-unit') {
            history.goBack();
        } else {
            history.push('/dashboard');
        }
    };

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
        console.log('donation');
        putResponse?.status === true && setAlertOpen2(true);
        putResponse?.status === true && setEditDialogOpen(false);
        if (pageNum === 0 && putResponse?.status === true) {
            if (unitsearch?.length > 2 && sortValue?.key && showFilters?.length > 0) {
                let UnitIdFilters = [{ key: 'donationCode', value: [unitsearch] }, ...showFilters];
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, UnitIdFilters, sortValue));
            } else if (unitsearch?.length > 2 && sortValue?.key) {
                let UnitIdFilters = [{ key: 'donationCode', value: [unitsearch] }];
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, UnitIdFilters, sortValue));
            } else if (unitsearch?.length > 0) {
                //let UnitIdFilters = [{ key: 'donationCode', value: [unitsearch] }];
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, unitsearch, undefined));
            } else if (sortValue && Object?.keys(sortValue)?.length > 0 && showFilters?.length > 0) {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, showFilters, sortValue));
            } else if (sortValue && sortValue?.length > 0) {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, undefined, sortValue));
            } else {
                dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey));
            }
        } else if (putResponse?.status === true) {
            if (unitsearch?.length > 2 && sortValue?.key && showFilters?.length > 0) {
                let UnitIdFilters = [{ key: 'donationCode', value: [unitsearch] }, ...showFilters];
                dispatch(getData(urlEndPoint, pageSize * (pageNum + 3), pageNum, undefined, UnitIdFilters, sortValue));
            } else if (unitsearch?.length > 2 && sortValue?.key) {
                let UnitIdFilters = [{ key: 'donationCode', value: [unitsearch] }];
                dispatch(getData(urlEndPoint, pageSize * (pageNum + 3), pageNum, undefined, UnitIdFilters, sortValue));
            } else if (unitsearch?.length > 2) {
                let UnitIdFilters = [{ key: 'donationCode', value: [unitsearch] }];
                dispatch(getData(urlEndPoint, pageSize * (pageNum + 3), pageNum, undefined, UnitIdFilters));
            } else if (sortValue && Object?.keys(sortValue)?.length > 0 && showFilters?.length > 0) {
                dispatch(getData(urlEndPoint, pageSize * (pageNum + 3), pageNum, searchKey, showFilters, sortValue));
            } else if (sortValue && Object?.keys(sortValue)?.length > 0) {
                dispatch(getData(urlEndPoint, pageSize * (pageNum + 3), pageNum, searchKey, undefined, sortValue));
            } else {
                dispatch(getData(urlEndPoint, pageSize * (pageNum + 3), pageNum, searchKey));
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
    console.log('inputs', inputs);

    useEffect(() => {
        dispatch(clearData());
        setScreens(screen);

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

        if (refFilters?.length > 0) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, refFilters));

            setRefFilterChips(chipsNames.map((item) => item.name));
            // setShowFilters(refFilters);
        } else if (getStaticFilters.staticFilters) {
            dispatch(
                getData(
                    urlEndPoint,
                    pageSize * 3,
                    1,
                    undefined,
                    filtersData,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    screens
                )
            );
            // ghfgh
        } else {
            // const filters = remoteInfo?.emergencyLogin === 'TRUE' ? filtersDataDevice : filtersData;
            dispatch(
                getData(
                    urlEndPoint,
                    pageSize * 3,
                    1,
                    undefined,
                    //remoteInfo?.emergencyLogin === 'TRUE'
                    //    ? filtersDataDevice
                    //    : remoteInfo?.remoteLogin === 'TRUE'
                    //    ? filtersRemote
                    //    : filtersData,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    screens
                )
            );
        }

        //dispatch(getFilterCriteria(urlEndPoint));
        dispatch(getFilter());
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
    console.log('s--------', screens);
    useEffect(() => {
        refFilters?.length === 0 && dispatch(getData(urlEndPoint, pageSize * 3, 1));
    }, [refFilters]);

    useEffect(() => {
        console.log('filterCriteria');
        if (filtersNewData?.status && param.state) {
            setDashboardFilter();
            return () => dispatch(clearFilterCriteria());
        }
    }, [filtersNewData]);
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
        let url = `${CONSTANTS.BASEURL}index/export?collectionName=${urlEndPoint}&screen=${screen}`;
        url = `${url}&pageSize=${100000}`;
        url = `${url}&pageNumber=${1}`;
        if (searchKey !== undefined && searchKey.length > 0) url = `${url}&search=${JSON.stringify(searchKey)}`;
        if (showFilters !== undefined && showFilters?.length > 0) url = `${url}&filters=${JSON.stringify(showFilters)}`;
        if (sortValue !== undefined && Object.keys(sortValue).length > 0)
            url = `${url}&sort=${JSON.stringify(sortValue)}`;
        // let url = `${CONSTANTS.BASEURL}index/export?collectionName=${urlEndPoint}&pageSize=100000&pageNumber=1`;
        await axios.get(url, config).then((response) => {
            FileDownload(response.data, urlEndPoint + '_' + new Date().getTime().toString() + '.xlsx');
        });
    };

    const handleFilters = (filterData, dashboardFilter) => {
        console.log('handleFilters');
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
            if (showFilters?.length > 0) {
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
            console.log('dashboardfilter');
            console.log('dashboardFilter -', dashboardFilter);
            setShowFilters(dashboardFilter);
            dispatch(getData(tempCollectionName, pageSize * 3, 1, undefined, dashboardFilter, screen));
        } else {
            /* console.log('filters -', filters);
            console.log('search key -', searchKey);
            console.log('sort option -', sortValue);
            console.log('unitId filters -', unitIdFilter);
*/
            console.log('updatedFilters');
            let updatedFilters = [...unitIdFilter, ...filters];

            setShowFilters(updatedFilters);
            dispatch(getData(tempCollectionName, pageSize * 3, 1, searchKey, updatedFilters));
            if (searchKey?.length > 2 && sortValue?.key) {
                dispatch(getData(tempCollectionName, pageSize * 3, 1, searchKey, updatedFilters, sortValue, screen));
            } else if (searchKey?.length > 2) {
                dispatch(getData(tempCollectionName, pageSize * 3, 1, searchKey, updatedFilters, screen));
            } else if (showFilters?.length > 0) {
                dispatch(getData(tempCollectionName, 0, 1, searchKey, updatedFilters, undefined));
            } else if (sortValue?.key) {
                dispatch(getData(tempCollectionName, pageSize * 3, 1, undefined, updatedFilters, sortValue, screen));
            } else {
                dispatch(getData(tempCollectionName, pageSize * 3, 1, undefined, updatedFilters, screen));
            }
            //TODO: commented old code to fix search , filter combination
            /*setShowFilters(filters);
            dispatch(getData(tempCollectionName, pageSize * 3, 1, undefined, filters));*/
        }
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
        if (sortValue?.key) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey, undefined, sortValue));
        } else if (searchKey) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey));
        } else {
            dispatch(getData(urlEndPoint, pageSize * 3, 1));
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
        if (unitsearch?.length > 2 && showFilters?.length > 0) {
            let UnitIdFilters = [{ key: 'donationCode', value: [unitsearch] }, ...showFilters];
            dispatch(getData(urlEndPoint, pageSize * (pageNum + 3), pageNum, undefined, UnitIdFilters, sort));
        } else if (unitsearch?.length > 2) {
            let UnitIdFilters = [{ key: 'donationCode', value: [unitsearch] }];
            dispatch(getData(urlEndPoint, pageSize * (pageNum + 3), pageNum, undefined, UnitIdFilters, sort));
        } else if (searchKey?.length > 2 && showFilters?.length > 0) {
            dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, showFilters, sort));
        } else if (searchKey?.length > 2) {
            dispatch(getData(urlEndPoint, pageSize * 3, pageNum, searchKey, undefined, sort));
        } else if (showFilters?.length > 0) {
            dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, showFilters, sort));
        } else {
            dispatch(getData(urlEndPoint, pageSize * 3, pageNum, undefined, undefined, sort));
        }
    };

    const handleSearchDelete = () => {
        setSearchKey('');
        if (accessableCodes?.includes('BS-ACO-1012')) {
            // dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters));
            if (unitsearch?.length > 2 && sortValue?.key) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, unitIdFilter, sortValue));
            } else if (unitsearch?.length > 2) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, unitIdFilter));
            } else if (showFilters?.length > 0 && sortValue?.key) {
                // setIsInitCall(false);
                dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters, sortValue));
            } else if (filterChips?.length > 0) {
                // setIsInitCall(false);
                dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters));
            } else if (sortValue?.key) {
                // setIsInitCall(false);
                dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, undefined, sortValue));
            } else {
                // setIsInitCall(true)
                dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, undefined));
            }
        } else if (!accessableCodes?.includes('BS-ACO-1012')) {
            setAccessToTable(false);
        }
    };

    const handleSearch = (searchKey) => {
        console.log('search--');
        console.log('unitsearch--', unitsearch);
        setSearchKey(searchKey);
        if (searchKey.length > 2) {
            console.log('IFFFFFF')
            dispatch(clearData());
            if (accessableCodes?.includes('BS-ACO-101')) {
                console.log('includes')
                let DOB = [
                    {
                        key: 'dob',
                        value: [moment(searchDate).format('YYYY-MM-DD'), moment(searchDate).format('YYYY-MM-DD')]
                    },
                    ...showFilters
                ];
                if (typeof searchDate?.getMonth === 'function') {
                    console.log('function')
                    if (sortValue?.key) {
                        dispatch(getData(urlEndPoint, 0, 1, searchKey.trim(), DOB, sortValue));
                    } else {
                        dispatch(getData(urlEndPoint, 0, 1, searchKey.trim(), DOB));
                    }
                }
                // ? dispatch(getData(urlEndPoint, 0, 1, searchKey.trim(), DOB))
                // : null;
            } else {
                console.log('elseee');
                 
                if (unitsearch.length > 2 && sortValue?.key && showFilters?.length > 0) {
                    dispatch(
                        getData(urlEndPoint, pageSize * 3, 1, undefined, unitIdFilter, sortValue, searchKey?.trim())
                    );
                } else if (showFilters?.length > 0 && sortValue?.key) {
                    dispatch(
                        getData(urlEndPoint, 0, 1, undefined, showFilters, sortValue, undefined, searchKey?.trim())
                    );
                } else if (showFilters?.length > 0) {
                    dispatch(getData(urlEndPoint, 0, 1, searchKey?.trim(), showFilters, undefined));
                } else if (filterChips?.length > 0) {
                    dispatch(
                        getData(urlEndPoint, 0, 1, undefined, showFilters, undefined, undefined, searchKey?.trim())
                    );
                } else if (sortValue?.key) {
                    dispatch(getData(urlEndPoint, 0, 1, undefined, undefined, sortValue, undefined, searchKey?.trim()));
                } else {
                    dispatch(
                        getData(urlEndPoint, 0, 1, undefined, showFilters, undefined, undefined, searchKey?.trim())
                    );
                }
            }
        } else if (searchKey === '') {
            console.log('elseeifff');
            // dispatch(getData(urlEndPoint, pageSize * 3, 1));
            if (!accessableCodes?.includes('BS-ACO-1012')) {
                setAccessToTable(false);
            } else {
                if (unitsearch.length > 2 && sortValue?.key && showFilters?.length > 0) {
                    dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, unitIdFilter, sortValue));
                } else if (showFilters?.length > 0 && sortValue?.key) {
                    dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters, sortValue));
                } else if (filterChips?.length > 0) {
                    dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters));
                } else if (sortValue?.key) {
                    dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, undefined, sortValue));
                } else {
                    dispatch(getData(urlEndPoint, pageSize * 3, 1));
                }
            }
        }
    };

    const setDashboardFilter = () => {
        console.log('setDashboardFilter');
        filtersNewData?.data[0]?.['trac kId-name']?.map((val) => {
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
        const result = responseData.data?.find(item => selectedRecords?.includes(item._id));
        setSelectedRowObj(result)
        console.log('result--',result);
    }, [selectedRecords])

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
            console.log('dummyyyyy',selectedDummyRecords)
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

        if (filterChips?.length === 1) {
            setFilterChips([]);
            setShowFilters([]);
            if (sortValue?.key && unitsearch?.length > 2) {
                dispatch(getData('refsku', undefined, 0, searchKey, unitIdFilter, sortValue));
            } else if (sortValue?.key) {
                dispatch(getData('refsku', undefined, 0, searchKey, undefined, sortValue));
            } else if (unitsearch?.length > 2) {
                dispatch(getData('refsku', undefined, 0, searchKey, unitIdFilter));
            } else if (searchKey) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey));
            } else {
                dispatch(getData(urlEndPoint, pageSize * 3, 1));
            }
        } else {
            let value = [];
            //Checkbox will come here to reset
            filterChips?.forEach((chip) => {
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
                setShowFilters([...Object.values(tempFilterKeys)]);
            } else {
                let currentKey = filterKeysObject.filter((nextItem) => chipToDelete.includes(nextItem.label))[0]?.name;

                if (currentKey) {
                    showFilters.forEach((item) => {
                        if (item.key !== currentKey) {
                            tempFilterKeys[item.key] = item;
                        }
                    });
                    setShowFilters([Object.values(tempFilterKeys)]);
                }
            }

            setFilterChips(value);
            let tempUrlPoint = urlEndPoint.includes('&') ? urlEndPoint.split('&')[0] : urlEndPoint;
            if (
                tempFilterKeys &&
                Object.values(tempFilterKeys)[0] !== null &&
                Object.values(tempFilterKeys).length > 0
            ) {
                if (sortValue?.key) {
                    dispatch(getData(tempUrlPoint, 30, pageNum, searchKey, Object.values(tempFilterKeys), sortValue));
                } else {
                    dispatch(getData(tempUrlPoint, 30, pageNum, searchKey, Object.values(tempFilterKeys)));
                }
            } else if (value?.length === 0) {
                if (sortValue?.key) {
                    dispatch(getData(tempUrlPoint, 30, pageNum, searchKey, undefined, sortValue));
                } else {
                    dispatch(getData(tempUrlPoint, 30, pageNum, searchKey));
                }
            } else if (value?.length !== 0) {
                if (sortValue?.key) {
                    dispatch(getData(tempUrlPoint, 30, pageNum, searchKey, Object.values(tempFilterKeys), sortValue));
                } else {
                    dispatch(getData(tempUrlPoint, 30, pageNum, searchKey, Object.values(tempFilterKeys)));
                }
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
        //     String(e) === 'Invalid Date' ? null : ///dispatch(getData(urlEndPoint, 30, 1, undefined, JSON.stringify(DOB)));
        // }
    };

    //let screenNum = localStorage.getItem('drawerScreen');

    //function handleBackClick() {
    //    if (refFilters) {
    //        setRefFilters(null);
    //        setFilters4([]);
    //        setAllSelected1(true);
    //        setAllSelected2(true);
    //        setAllSelected3(true);
    //    }
    //    dispatch(resetFilters());
    //    param.pathname === '/dashboard/request-unit'
    //        ? history.goBack()
    //        : screenNum === 'true'
    //        ? dispatch(setScreeenIndex(2))
    //        : dispatch(setScreeenIndex(0));
    //}
    //useEffect(() => {
    //    return () => {
    //        dispatch(resetFilters());
    //        screenNum === 'true' ? dispatch(setScreeenIndex(2)) : dispatch(setScreeenIndex(0));
    //    };
    //}, []);

    const handleUnitSearch = (e) => {
        console.log('E------', e);
        setUnitSearch(e);
        if (e?.match(/[&}><%]/g)) {
            dispatch(createAlert({ showAlert: true, alertMessage: 'Please Scan Unit Id', alertType: 'error' }));
        }
        if (e?.length === 16 || e?.length === 14) {
            setUnitSearch(e?.substr(1)?.trim());
            let UnitIdFilters = [{ key: 'donationCode', value: [e?.substr(1)?.trim()] }, ...showFilters];
            setUnitIdFilter(UnitIdFilters);
            if (sortValue?.key) {
                dispatch(getData('refsku', undefined, 0, searchKey, UnitIdFilters, sortValue));
            } else {
                dispatch(getData('refsku', undefined, 0, searchKey, UnitIdFilters));
            }
        } else if (e.length > 1 && e !== ' ') {
            // let UnitIdFilters = [{ key: 'donationCode', value: [e.trim()] }, ...showFilters];
            //setUnitIdFilter(UnitIdFilters);
            /*console.log('UnitIdFilters - ', UnitIdFilters);
            console.log('showFilters - ', showFilters);*/
            if (sortValue?.key) {
                dispatch(getData('refsku', pageSize * 3, 0, e, undefined, sortValue));
            } else {
                dispatch(getData('refsku', pageSize * 3, 0, e, undefined));
            }
            //dispatch(getData(urlEndPoint, 30, 1, JSON.stringify(e)));
        } else if (e === '') {
            if (sortValue?.key && showFilters?.length > 0) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey, showFilters, sortValue));
            } else if (showFilters?.length > 0) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey, showFilters));
            } else if (searchKey) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey));
            } else {
                dispatch(getData(urlEndPoint, pageSize * 3, 1));
            }
        }
    };
    const handleUnitSearchDelete = () => {
        setUnitSearch('');
        setUnitIdFilter([]);
        if (showFilters.length > 0 && sortValue?.key) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey, showFilters, sortValue));
        } else if (sortValue?.key) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey, undefined, sortValue));
        } else if (showFilters?.length > 0) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey, showFilters));
        } else if (searchKey) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey));
        } else {
            dispatch(getData(urlEndPoint, pageSize * 3, 1));
        }
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

    const dropDownData = urlEndPoint === 'refsku' ? 'productcode' : null;
    useEffect(() => {
        urlEndPoint === 'refsku' && setSecondDropdown('locations');
        urlEndPoint === 'refsku' && setThirdDropdown('devices');
        urlEndPoint === 'refsku' && setFourthDropdown('recipient');
        urlEndPoint === 'refsku' && setFifthDropdown('track');
    }, [urlEndPoint]);
    const handleEditDialog = () => {
        // dispatch(getDropDown(dropDownData));
        // dispatch(get2ndDropdown(secondDropdown));
        // dispatch(get3rdDropdown(thirdDropdown));
        // dispatch(get4thDropdown(fourthDropdown));
        // dispatch(get5thDropdown(fifthDropdown));
        dispatch(get4thDropdown('locations'));
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
        if (headerActions && headerActions.status === true) {
            setComments('');
            setUserId('');
            setSelectedRecords([])
            setSelectedAllRecordsFlag(false);
            setAnchorEl(null);
            if (showFilters) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters));
            } else if (sortValue && sortValue?.key) {
                dispatch(getData(urlEndPoint, pageSize, pageNum, undefined, undefined, sortValue));
            } else if (searchKey) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey));
            } else {
                dispatch(getData(urlEndPoint, pageSize * 3, 1));
            }
            showSnackbar(true, headerActions.message, 'success');
        } else if (headerActionsError) {
            showSnackbar(true, headerActionsError.errorMessage, 'error');
        }
        if (wastedUnitResponse && wastedUnitResponse.status === true) {
            setComments('');
            setUserId('');
            setSelectedRecords([])
            setSelectedAllRecordsFlag(false);
            setAnchorEl(null);
            if (showFilters) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters));
            } else if (sortValue && sortValue?.key) {
                dispatch(getData(urlEndPoint, pageSize, pageNum, undefined, undefined, sortValue));
            } else if (searchKey) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey));
            } else {
                dispatch(getData(urlEndPoint, pageSize * 3, 1));
            }
            showSnackbar(true, wastedUnitResponse.message, 'success');
        } else if (wastedUnitError) {
            showSnackbar(true, wastedUnitError.errorMessage, 'error');
        }
        if (headerLed && headerLed.status === true) {
            setComments('');
            setUserId('');
            setSelectedRecords([])
            setSelectedAllRecordsFlag(false);
            if (showFilters) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, undefined, showFilters));
            } else if (sortValue && sortValue?.key) {
                dispatch(getData(urlEndPoint, pageSize, pageNum, undefined, undefined, sortValue));
            } else if (searchKey) {
                dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey));
            } else {
                dispatch(getData(urlEndPoint, pageSize * 3, 1));
            }
            showSnackbar(true, headerLed.message, 'success');
        } else if (headerLedError) {
            showSnackbar(true, headerLedError.errorMessage, 'error');
        }

        return () => {
            setTimeout(() => {
                dispatch(clearDeleteResponse());
            }, 4000);
            setTimeout(() => {
                dispatch(clearheaderActionsResponse());
            }, 4000);
        };
    }, [
        deleteResponse,
        deleteError,
        headerActions,
        headerActionsError,
        headerLed,
        headerLedError,
        wastedUnitResponse,
        wastedUnitError
    ]);

    const showSnackbar = (isopen, message, severity) => {
        setSnackbarMessage(`${message}`);
        setSnackbarSeverity(severity);
        setOpenSnackbar(isopen);
    };

    const customAutoComplete = (e, value, feild) => {
        console.log('e', e);
        console.log('e', e);
        console.log('feild', feild);
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
                        urlEndPoint === 'refsku' && input.name === 'locationId'
                            ? options2?.data
                            : urlEndPoint === 'refsku' && input.name === 'deviceId'
                            ? options3?.data
                            : urlEndPoint === 'refsku' && input.name === 'recipientId'
                            ? options4?.data
                            : urlEndPoint === 'refsku' && input.name === 'trackId'
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
        console.log('valllll' + value);

        if (!users && remoteInfo?.emergencyLogin === 'TRUE') {
            setUserError(true);
            return;
        } else {
            setUserError(false);
        }

        console.log(' ----- Status ---' + value);
        const postData = { collectionName: 'activity' };
        if (value !== 'BS-TR-5110' && value !== 'BS-TR-5119') {
            if (selectAllRecords) {
                postData['comments'] = comments;
            } 
            else {
                postData['validData'] = selectedRecords.map((ele) => {
                    console.log('eleeee', ele);

                    return {
                        refskuId: ele,
                        'track-code': value,
                        userId: remoteInfo?.emergencyLogin === 'TRUE' ? userId : userRoleData?.data?.[0]?._id,
                        comments: comments,
                        deviceId: selectedRowObj.deviceId?.[0]?._id,
                        locationId: selectedRowObj.locationId?.[0]?._id,
                        recipientId: selectedRowObj.recipientId ? selectedRowObj.recipientId?.[0]?._id : "",
                    };
                });
            }
            dispatch(putHeaderAction(postData, selectAllRecords, value, showFilters));
        } else if (value == 'BS-TR-5110') {
            const wastedUnits = selectedRecords.map((ele) => ele);
            console.log('wasttttt', wastedUnits);
            const ref = {
                refskuId: wastedUnits,
                userId: remoteInfo?.emergencyLogin === 'TRUE' ? userId : userRoleData?.data?.[0]?._id,
                comments: comments,
                deviceId: selectedRowObj.deviceId?.[0]?._id,
                locationId: selectedRowObj.locationId?.[0]?._id,
                recipientId: selectedRowObj.recipientId ? selectedRowObj.recipientId?.[0]?._id : "",
            };
            dispatch(postWastedUnit(ref));
            setUserId('');
            setSelectedRecords([])
            setOpenAdd(false);
        } else if (value == 'BS-TR-5119') {
            const transfusedUnits = selectedRecords.map((ele) => ele);
            console.log('transfusedUnits', transfusedUnits);
            const ref = {
                refskuId: transfusedUnits,
                userId: remoteInfo?.emergencyLogin === 'TRUE' ? userId : userRoleData?.data?.[0]?._id,
                comments: comments,
                deviceId: selectedRowObj.deviceId?.[0]?._id,
                locationId: selectedRowObj.locationId?.[0]?._id,
                recipientId: selectedRowObj.recipientId ? selectedRowObj.recipientId?.[0]?._id : "",
            };
            dispatch(postTransfusedUnits(ref));
            setUserId('');
            setSelectedRecords([])
            setOpenAdd(false);
        }
    };

    const onCloseCommentDialog = () => {
        setOpenAdd(false);
        setComments('');
        setSelectedRecords([]);
        setUserId('');
    };

    const openCommentsPopup = (value) => {
        console.log('vvvvvv', value);

        setOpenAdd(true);
        setUpdateStatus(value);
        //updateAction(value);
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

    const moveToAssign = (value) => {
        const selectedRecordsAssign = responseData.data.filter((ele) => selectedRecords.includes(ele._id));

        const selectedStatus = selectedRecordsAssign.map((ele) => ele.isAssigned);
        console.log('selectedRecordsAssign', selectedRecordsAssign)
        if (selectedStatus.includes(1)) {
            setOpenWarningAssign(true);
        } else {
            localStorage.setItem('moverecipient', JSON.stringify(selectedRecordsAssign));
            history.push({
                pathname: `/dashboard/assign-unit`,
                state: {
                    data: responseData.data.filter((ele) => selectedRecords.includes(ele._id))
                   
                }
            });
        }
    };

    const handleBrowseAssign = () => {
        const selectedRecordsAssign = responseData.data.filter((ele) => selectedRecords.includes(ele._id));

        const selectedStatus = selectedRecordsAssign.map((ele) => ele.isAssigned);
        console.log('selectedRecordsAssign', selectedRecordsAssign)
        if (selectedStatus.includes(1)) {
            setOpenWarningAssign(true);
        } else {
            localStorage.setItem('moverecipient', JSON.stringify(selectedRecordsAssign));
            history.push({
                pathname: `/dashboard/assign-unit/r/${selectedItem?._id}`,
                state: {
                    data: responseData.data.filter((ele) => selectedRecords.includes(ele._id)),
                    row: selectedItem
                }
            });
        }
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

    const genericEmit = (data) => {
        console.log(data, 'genericEmit method in device selection');
        if (data) {
            socket?.emit('generic', data);
        }
    };

    useEffect(() => {
        let tempGeneicValues = genericValues;
        tempGeneicValues['_id'] = rowData?._id;
        tempGeneicValues['donationCode'] = rowData?.donationCode;
        tempGeneicValues['expiryDateAndTime'] = rowData?.expiryDateAndTime;
        tempGeneicValues['testnumber'] = rowData?.specialtesting?.testnumber;
        tempGeneicValues['rfidNumber'] = rowData?.rfidNumber;
        tempGeneicValues['collectionDateAndTime'] = rowData?.collectionDateAndTime;
        tempGeneicValues['dimensions'] = rowData?.dimensions;
        tempGeneicValues['specialCheckChar'] =
            rowData?.specialtesting?.testnumber !== undefined && rowData?.specialtesting?.testnumber?.length > 0
                ? specialTesingCheck(rowData?.specialtesting?.testnumber)
                : '';
        tempGeneicValues['check'] =
            rowData?.donationCode !== undefined && rowData?.donationCode.length > 0
                ? checkTextSum(rowData?.donationCode)
                : '';
        tempGeneicValues['phenotypeResult'] = rowData?.specialtesting?.phenotypeResult;
        tempGeneicValues['mrnNumber'] =
            rowData?.recipientId != undefined && rowData?.recipientId.length > 0
                ? rowData?.recipientId[0]?.mrnNumber
                : '';
        tempGeneicValues['dereservationDate'] = rowData?.dereservationDate;
        tempGeneicValues['recipientName'] =
            rowData?.recipientId != undefined && rowData?.recipientId.length > 0 ? rowData?.recipientId[0].name : '';

        setBloodGroupValue(rowData?.bloodgroupId?.[0]);
        setGenericValues(tempGeneicValues);
        setProductCodeValue(rowData?.productcodeId?.[0]);
        setHospitalddvalue(rowData.clientId?.[0]);
        if (rowData.clientId?.[0]) {
            dispatch(get4thDropdown('locations'));
        }
        if (rowData.locationId?.[0]) {
            dispatch(get5thDropdown('devices'));
        }
        setLocationddValue(rowData?.locationId?.[0]);
        setDeviceddValue(rowData?.deviceId?.[0]);
    }, [rowData]);

    const addCommentsForm = (
        <Grid>
            <Grid container spacing={2}>
                <Grid item spacing={2}>
                    {remoteInfo?.emergencyLogin === 'TRUE' ?
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
                        : null}
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
                                <Grid item xs={1} className={classes.backButton}>
                                    <CustomButton variant="outlined" onClick={handleBackClick}>
                                        Back
                                    </CustomButton>
                                </Grid>
                            <Grid item xs={3}>
                                {accessableCodes?.includes('BS-ACO-1020') || accessableCodes.includes('BS-ACO-1012') ? (
                                    <>
                                        <InputLabel className={classes.inputLabel}>Search</InputLabel>
                                        <CustomSearch
                                            value={unitsearch}
                                            size="md"
                                            placeholder={'Search'}
                                            handleChange={(e) =>
                                                e.target.value !== ' ' ? handleUnitSearch(e?.target?.value) : null
                                            }
                                            handleSearchDelete={handleUnitSearchDelete}
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
                            <Grid item xs={3}>
                                <InputLabel className={classes.inputLabel}>
                                    {accessableCodes?.includes('BS-ACO-1012')
                                        ? 'Search by MRN / NAME '
                                        : accessableCodes?.includes('BS-ACO-1010') &&
                                          accessableCodes?.includes('BS-ACO-1011')
                                        ? 'Search by MRN / Name'
                                        : accessableCodes?.includes('BS-ACO-1010')
                                        ? 'Search by MRN'
                                        : accessableCodes?.includes('BS-ACO-1009')
                                        ? 'Search by Name'
                                        : 'Search'}
                                </InputLabel>
                                <CustomSearch
                                    value={searchKey}
                                    size="md"
                                    placeholder={
                                        accessableCodes?.includes('BS-ACO-1012')
                                            ? 'Search by MRN / NAME'
                                            : accessableCodes?.includes('BS-ACO-1010') &&
                                              accessableCodes?.includes('BS-ACO-1011')
                                            ? 'Search by MRN / Name'
                                            : accessableCodes?.includes('BS-ACO-1009')
                                            ? 'Search by Name'
                                            : accessableCodes?.includes('BS-ACO-1010')
                                            ? 'Search by MRN'
                                            : 'Search'
                                    }
                                    handleChange={(e) => (e.target.value !== ' ' ? handleSearch(e.target.value) : null)}
                                    handleSearchDelete={handleSearchDelete}
                                    loader={
                                        responseData && responseData.data
                                            ? false
                                            : accessableCodes?.includes('BS-ACO-1011')
                                            ? searchKey && searchKey.length > 2 && String(searchDate) === 'Invalid Date'
                                                ? true
                                                : searchKey && loading
                                            : searchKey && searchKey.length > 2
                                            ? true
                                            : searchKey && loading
                                    }
                                    disabled={
                                        accessableCodes.includes('BS-ACO-1009')
                                            ? false
                                            : accessableCodes.includes('BS-ACO-1012')
                                            ? false
                                            : accessableCodes.includes('BS-ACO-1011')
                                            ? false
                                            : accessableCodes.includes('BS-ACO-1010')
                                            ? false
                                            : true
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel className={classes.inputLabel}>Search By DOB</InputLabel>

                                <DatePicker
                                    inputVariant="outlined"
                                    height={45}
                                    handleDate={handleSearchDate}
                                    value={searchDate}
                                    disableFuture
                                    format={'dd/MM/yyyy'}
                                    placeholder={'DD/MM/YYYY'}
                                    disabled={
                                        !(
                                            accessableCodes?.includes('BS-ACO-1012') ||
                                            accessableCodes?.includes('BS-ACO-1011')
                                        )
                                    }
                                />
                            </Grid>

                            <Grid item xs={2} className={classes.Icons1}>
                                <HeaderIcons
                                    showIcons={['excell', 'filters']}
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
                                    isRequestUnit={true}
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
                                                    ? `Units : ${
                                                          totalCount
                                                              ? totalCount
                                                              : responseData?.page?.totalCount
                                                              ? responseData?.page?.totalCount
                                                              : 0
                                                      }`
                                                    : null}
                                            </Box>
                                            <Box fontWeight="500" style={{ marginLeft: 5 }}>
                                                {CurrentSubMenu
                                                    ? `${
                                                          refFilters?.length === 0
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
                                                            {`Selected ${selectedRecords.length} ${
                                                                selectedRecords.length === 1 ? ' record' : ' records'
                                                            }`}
                                                        </InputLabel>
                                                    </Box>
                                                )
                                            )}
                                        </Typography>
                                    </Grid>

                                    <Grid xs={5} className="filterChips">
                                        <CustomChip
                                            module={'manage'}
                                            dataArray={filterChips}
                                            handleDelete={handleChipDelete}
                                        />
                                    </Grid>
                                    <Grid xs={2} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                        {console.log('displayconfig---', screen)}
                                        {accessableCodes?.includes('BS-ACO-1024') ? (
                                            <DisplayConfig
                                                userRole={user?.useraccessroleId}
                                                screens={screens}
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

                                        <IconButton
                                            disabled={
                                                accessableCodes?.includes('BS-ACO-1018')
                                                    ? isSelected
                                                        ? false
                                                        : true
                                                    : true
                                            }
                                            onClick={() => {
                                                openPullOutDialog();
                                            }}
                                        >
                                            <Tooltip title="Pull out request">
                                                <EjectIcon color={isSelected ? 'primary' : ''} />
                                            </Tooltip>
                                        </IconButton>
                                        <IconButton
                                            disabled={
                                                accessableCodes?.includes('BS-ACO-1019')
                                                    ? isSelected
                                                        ? false
                                                        : true
                                                    : true
                                            }
                                            onClick={() => {
                                                LedTrigger.current = !LedTrigger.current;
                                                console.log(LedTrigger);
                                                if (LedTrigger.current) {
                                                    openCommentsPopup('BS-TR-5114');
                                                } else {
                                                    LedTrigger.current = false;
                                                    // Stop Scan
                                                    if (socket && currentPc) {
                                                        genericEmit({
                                                            userName: userInfo?.data?.user?.username,
                                                            deviceToken: token,
                                                            method: 'E105',
                                                            payload: {
                                                                userName: userInfo?.data?.user?.username,
                                                                method: 'E105',
                                                                acknOn: 'ackStopScan'
                                                            }
                                                        });
                                                        dispatch(socketAssociateBulkData());
                                                        dispatch(assignLocalDataAction([]));
                                                    }
                                                }
                                            }}
                                        >
                                            <Tooltip title="Trigger LED">
                                                <>
                                                    <FlareIcon
                                                        color={
                                                            LedTrigger.current ? '#DD0004' : isSelected ? 'primary' : ''
                                                        }
                                                    />
                                                    {headerLedLoading && (
                                                        <CircularProgress size="20px" style={{ marginLeft: '10px' }} />
                                                    )}
                                                </>
                                            </Tooltip>
                                            </IconButton>

                                            <IconButton
                                                disabled={
                                                    accessableCodes?.includes('BS-ACO-1018')
                                                        ? isSelected
                                                            ? false
                                                            : true
                                                        : true
                                                }
                                                onClick={ 
                                                    handleBrowseAssign
                                                }
                                            >
                                                <Tooltip title="Assign">
                                                    <DoneIcon color={isSelected ? 'primary' : ''} />
                                                </Tooltip>
                                            </IconButton>

                                            {/*<CustomButton*/}
                                            {/*    onClick={handleBrowseAssign}*/}
                                            {/*    variant="contained" color="primary" >*/}
                                            {/*    Assign*/}
                                            {/*</CustomButton>*/}
                                            {/*<Grid style={{ alignItems: 'center', }}>*/}
                                            {/*    <CheckCircleOutlineIcon*/}
                                            {/*        style={{*/}
                                            {/*            color: 'green',*/}
                                            {/*            width: '3em',*/}
                                            {/*            height: '3em',*/}
                                            {/*            alignItems: 'center',*/}
                                            {/*            marginLeft: '140px'*/}
                                            {/*        }}*/}
                                            {/*        onClick={handleBrowseAssign}*/}

                                            {/*    />*/}

                                            {/*</Grid>*/}

                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={headerActionsLoading || wastedUnitLoading ? null : handleClose}
                                            getContentAnchorEl={null}
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                                        >
                                            {!selectAllRecords && (
                                                <MenuItem
                                                    className={classes.simpleMenu}
                                                    onClick={() => {
                                                        moveToAssign('BS-TR-5103');
                                                    }}
                                                        disabled={headerActionsLoading || remoteInfo?.emergencyLogin === 'TRUE'}
                                                >
                                                    Move to Assign
                                                    {headerActionsLoading && selectedStatus === 'BS-TR-5103' && (
                                                        <CircularProgress size="20px" style={{ marginLeft: '10px' }} />
                                                    )}
                                                </MenuItem>
                                            )}
                                            <MenuItem
                                                className={classes.simpleMenu}
                                                onClick={() => {
                                                    openCommentsPopup('BS-TR-5101');
                                                }}
                                                disabled={headerActionsLoading}
                                            >
                                                Mark as Fated
                                                {headerActionsLoading && selectedStatus === 'BS-TR-5101' && (
                                                    <CircularProgress size="20px" style={{ marginLeft: '10px' }} />
                                                )}
                                            </MenuItem>
                                            <MenuItem
                                                className={classes.simpleMenu}
                                                onClick={() => {
                                                    openCommentsPopup('BS-TR-5110');
                                                }}
                                                disabled={wastedUnitLoading}
                                            >
                                                Mark as Wasted
                                                {wastedUnitLoading && selectedStatus === 'BS-TR-5110' && (
                                                    <CircularProgress size="20px" style={{ marginLeft: '10px' }} />
                                                )}
                                            </MenuItem>
                                            {/*<MenuItem*/}
                                            {/*    className={classes.simpleMenu}*/}
                                            {/*    onClick={() => {*/}
                                            {/*        openCommentsPopup('BS-TR-5102');*/}
                                            {/*    }}*/}
                                            {/*    disabled={headerActionsLoading}*/}
                                            {/*>*/}
                                            {/*    Mark as Dereserve*/}
                                            {/*    {headerActionsLoading && selectedStatus === 'BS-TR-5102' && (*/}
                                            {/*        <CircularProgress size="20px" style={{ marginLeft: '10px' }} />*/}
                                            {/*    )}*/}
                                            {/*</MenuItem>*/}
                                            <MenuItem
                                                className={classes.simpleMenu}
                                                onClick={() => {
                                                    openCommentsPopup('BS-TR-5111');
                                                }}
                                                disabled={headerActionsLoading}
                                            >
                                                Mark as Reserved
                                                {headerActionsLoading && selectedStatus === 'BS-TR-5111' && (
                                                    <CircularProgress size="20px" style={{ marginLeft: '10px' }} />
                                                )}
                                            </MenuItem>
                                            <MenuItem
                                                className={classes.simpleMenu}
                                                onClick={() => {
                                                    openCommentsPopup('BS-TR-5112');
                                                }}
                                                disabled={headerActionsLoading}
                                            >
                                                Mark as Unassign
                                                {headerActionsLoading && selectedStatus === 'BS-TR-5112' && (
                                                    <CircularProgress size="20px" style={{ marginLeft: '10px' }} />
                                                )}
                                            </MenuItem>
                                            <MenuItem
                                                className={classes.simpleMenu}
                                                onClick={() => {
                                                    openCommentsPopup('BS-TR-5113');
                                                }}
                                                disabled={headerActionsLoading}
                                            >
                                                Mark as Emergency
                                                {headerActionsLoading && selectedStatus === 'BS-TR-5113' && (
                                                    <CircularProgress size="20px" style={{ marginLeft: '10px' }} />
                                                )}
                                            </MenuItem>

                                            <MenuItem
                                                className={classes.simpleMenu}
                                                onClick={() => {
                                                    openCommentsPopup('BS-TR-5115');
                                                }}
                                                disabled={headerActionsLoading}
                                            >
                                                Mark as Quarantined
                                                {headerActionsLoading && selectedStatus === 'BS-TR-5115' && (
                                                    <CircularProgress size="20px" style={{ marginLeft: '10px' }} />
                                                )}
                                            </MenuItem>

                                            <MenuItem
                                                className={classes.simpleMenu}
                                                onClick={() => {
                                                    openCommentsPopup('BS-TR-5118');
                                                }}
                                                disabled={headerActionsLoading}
                                            >
                                                Mark as Reactivated
                                                {headerActionsLoading && selectedStatus === 'BS-TR-5118' && (
                                                    <CircularProgress size="20px" style={{ marginLeft: '10px' }} />
                                                )}
                                            </MenuItem>
                                            <MenuItem
                                                className={classes.simpleMenu}
                                                onClick={() => {
                                                    openCommentsPopup('BS-TR-5119');
                                                }}
                                                disabled={wastedUnitLoading}
                                            >
                                                Mark as Transfused
                                                {wastedUnitLoading && selectedStatus === 'BS-TR-5119' && (
                                                    <CircularProgress size="20px" style={{ marginLeft: '10px' }} />
                                                )}
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
                                                isAction={headerActionsLoading}
                                                setUnchecked={setUnchecked}
                                                unchecked={unchecked}
                                                isRequestUnit={true}
                                                triggeredLedList={triggeredLedList}
                                            />
                                        ) : (
                                            <NoData />
                                        )}
                                    </Grid>
                                </Grid>
                            </Paper>

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
                                onSaveClick={() => updateAction(selectedStatus)}
                                // isSave
                                // error={"errorMessage"}
                                // loading={postLoading}
                                // disabled={userGroupName?.length === 0}
                                tabIndex={1}
                                loading={headerActionsLoading}
                            >
                                {addCommentsForm}
                            </CustomDialog>
                            <UnitEditDialog
                                title={`Edit Unit`}
                                open={editDialogOpen}
                                onCancelClick={handleEditDialogClose}
                                onClose={handleEditDialogClose}
                                onSaveClick={() => handleEditUnit()}
                                tabIndex={1}
                                disabled={
                                    !genericValues.donationCode ||
                                    !productCodeValue ||
                                    !bloodGroupValue ||
                                    !genericValues.expiryDateAndTime
                                }
                                error={errorMessage}
                                loading={putLoading}
                            >
                                {
                                    <EditUnit
                                        userRoleData={userRoleData}
                                        //handleCheck={handleCheck}
                                        checkChar={checkChar}
                                        phenotype={phenotype}
                                        specialTestingHelperText={specialTestingHelperText}
                                        unitIdHelperText={unitIdHelperText}
                                        specialCheck={specialCheck}
                                        handleSpecialCheck={handleSpecialCheck}
                                        response={responseData}
                                        rowData={rowData}
                                        userRole={user?.useraccessroleId}
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
                                        checkRef={checkRef}
                                        phenytypeRef={phenytypeRef}
                                        specialCheckRef={specialCheckRef}
                                        hostialddValue={hostialddValue}
                                        locationddOpen={locationddOpen}
                                        deviceddOpen={deviceddOpen}
                                        locationddValue={locationddValue}
                                        deviceddValue={deviceddValue}
                                    />
                                }
                            </UnitEditDialog>
                            {pullOutSuccess?.status && (
                                <PullOutDialog
                                    open={pullOutDialogOpen}
                                    response={pullOutData}
                                    displayConfig={responseData.displayConfigData}
                                    triggeredLedList={triggeredLedList}
                                    pullOutIdStatic={pullOutIdStatic?.id}
                                    pullOutResponse={pullOutSuccess}
                                />
                            )}
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
                                    message={`Unit updated successfully.`}
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
};

export default RequestUnit;
