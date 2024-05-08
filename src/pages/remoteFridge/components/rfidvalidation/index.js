import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Grid,
    TextField,
    Card,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Dialog,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    DialogContent,
    DialogActions,
    DialogTitle,
    IconButton, Tooltip,
    useMediaQuery,
    TableHead,
    CircularProgress,
    CheckRoundedIcon,
    Box,Stepper,Step,StepButton
} from '@material-ui/core';
import { SelectOption } from 'components';
import { getData } from 'redux/actions/scGenericApiCalls';
import {
    assignLocalDataAction, socketAssociateBulkData, socketDevice,
    socketDeviceValue,
    socketDeviceConnection,
    lFDeviceMethod,
    SocketScanData,
    socketDeviceToken,
    socketDeviceStatus
} from 'redux/actions/socketAction';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {CancelOutlined } from '@material-ui/icons';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { clearUnitIdSearch, getUnitSearch } from 'redux/actions/assignUnit/unitIdSearchAction';
import { clearPostUnitResponse, postAddUnitData } from 'redux/actions/assignUnit/addUnitsRecipientActions';
import DeleteIcon from '@material-ui/icons/Delete';
import { getApplyFilters } from 'redux/actions/filters/globalFilterAction';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';
//import unitIdResponse from '../../JSON/unitIdResponse.json';
import { clear4thDropDown } from 'redux/actions/manage/manageFieldsAction';
import { unitTable, searchResults } from 'pages/assign/DummyData';
import { useStyles } from './style';
import { useHistory, useLocation } from 'react-router-dom';
import ErrorIcon from '@material-ui/icons/Error';
import DateTimePicker from 'components/date-time-picker/date-time-picker.container';
import CustomInput from 'components/inputfeild';
import CustomButton from 'components/button';
import CONSTANTS from 'common/constants';
import { createAlert, get4thDropdown, getDropDown, getSettings } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { checkTextSum } from 'components/add-unit/add-unit-form/unitIdService';
import CheckboxComponent from 'components/checkbox/checkbox.container';
import moment from 'moment';
import { Alert } from 'common';
import DeviceSelection from 'components/socketDeviceSelection/socketDeviceSelection';
import { AutoComplete } from 'components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { sortDropdown } from 'common/services/compare';
import BarcodeValidation from '../barcodevalidation';
import { validationSlipUpdate } from 'redux/actions/manage/scManageActions';



const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const RfidValidation = (props) => {
    console.log('props---',props)
    const { deviceWriteTagValidation } = useSelector((state) => state.deviceWriteTag);
    const { Lf_Hf_TagValidation } = useSelector((state) => state.lfTag);
    const [activeDevices, setActiveDevices] = useState([]);
    const [selectedDevicesValue, setSelectedDevicesValue] = useState('');
    // console.log(scanStatus, bulkScanLoading, 'SOCKET_BULK_SCAN_STATUS');
    //Props
    const { error, recipientId } = props;
    const { options } = useSelector((state) => state.getDropDown);
    // console.log(productCode, 'product code');
    const classes = useStyles();
    const dispatch = useDispatch();
    const maxWidth1280 = useMediaQuery('(max-width:1280px)');
    const maxWidth1040 = useMediaQuery('(max-width:1280px)');
    const maxWidth600 = useMediaQuery('(max-width:600px)');
    const handleOpen = () => {
        setScanOrManualOpen(true);
        setEmergencyDialogOpen(true);
        setDisableProductCode(false);
    };
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAction, setSelectedAction] = useState('');
    const history = useHistory();
    const location = useLocation();
    const { device } = useSelector((state) => state.getSocketDevice);
    const { value } = useSelector((state) => state.getSocketDeviceValue);
    console.log('vvvvvvvvvv', value);
    const [selectedItem, setSelectedItem] = useState({});
    const [successTags, setSuccessTags] = useState([]);
    const [failedTags, setFailedTags] = useState([]);
    const [rfidNumber, setRfidNumber] = useState('');
    const [isAssigned, setisAssigned] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [assignable, setAssignable] = useState([]);
    console.log('assignable', assignable);
    const [assignLoading, setAssignLoading] = useState(false);
    const [socketReponse, setSocketResponse] = useState(false);
    const socket = useSelector((state) => state.socketReducer.socket);
    const { userInfo } = useSelector((state) => state.userLogin);
    console.log('userinfo---', userInfo);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
    const { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    console.log('settin', settingsData);
    const { validationRequired } = useSelector((state) => state.associateValidation);
    const data = location?.state?.data || [];
    const [scanOpen, setScanOpen] = useState(false)
    const [scanValue, setScanValue] = useState();
    const { compatabilityPdfSlipdata } = useSelector((state) => state.compatabilityPdfSlip)
    console.log('compatabilityPdfSlip', compatabilityPdfSlipdata)
    const tableData =
        data?.length > 0
            ? data.map((ele) => {
                console.log('tabledata', data);

                console.log(ele, 'ele===');
                return {
                    unitId: ele?.donationCode,
                    expiryDate: ele?.expiryDateAndTime,
                    sequenceNo: ele?.sequenceNo,
                    tableDRdate: ele?.isAssigned
                        ? ele?.dereservationDate
                        : '-',
                    refskuId: ele?._id,
                    rfidNumber: ele?.rfidNumber,
                    bloodGroup: ele?.bloodgroupId?.[0]?.name,
                    assigned: ele?.isAssigned,
                    check: ele?.isAssigned || ele?.isAssociated ? false : true //--- remove if we don't want 'autoselect' of checkboxes while assigning bloodgroup to receipient
                };
            })
            : [];
    const [scanOrManualOpen, setScanOrManualOpen] = useState(false);

    const uniqueId = [];
    const unique = unitTable?.filter((element) => {
        const index = uniqueId.findIndex((ids) => ids.unitId === element.unitId);
        if (index === -1) {
            uniqueId.push(element);
            return true;
        }
        return false;
    });

    const [unitsTable, setUnitsTable] = useState(uniqueId);
    console.log(unitsTable, 'unit--');
    const [commonUnitId, setCommonUnitId] = useState([]);
    const [unitIdAssigned, setUnitIdAssigned] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [tableDRdate, setTableDRdate] = useState([]);
    const [tableDRdateError, setTableDRdateError] = useState(false);
    const [sameDereservation, setSameDereservation] = useState(false);
    const [unitId, setUnitId] = useState('');
    console.log('id---', unitId);
    const [productCodeOpen, setProductCodeOpen] = useState(false);
    const [expiryDate, setExpiryDate] = useState('');
    const [unitIdError, setUnitIdError] = useState(false);
    const [productCode, setProductCode] = useState(null);
    const [deviceGroup, setDeviceGroup] = useState('');
    const [productCodeError, setProductCodeError] = useState(false);
    const [comments, setComments] = useState('');
    const [sequenceNo, setSequenceNo] = useState('');
    console.log('sequence', sequenceNo);
    const [unitId_id, setUnitId_id] = useState('');
    const [unitIdErrorText, setUnitIdErrorText] = useState('');
    const [manualEntry, setManualEntery] = useState(true);
    const [productCodeOptions, setProductCodeOptions] = useState([]);
    const [disableProductCode, setDisableProductCode] = useState(false);
    const [emergencyDialogOpen, setEmergencyDialogOpen] = useState(true);
    const [bloodGroup, setBloodGroup] = useState('');
    const [disableCheck, setDisableCheck] = useState(false);
    const [checkAll, setCheckAll] = useState(true);
    const [tempUnitId, settempUnitId] = useState({});
    console.log('temp------', tempUnitId)
    const commentRef = useRef();
    const unitIdRef = useRef();
    const productCodeRef = useRef();
    // localStorage.setItem('recipientData'
    let currentItem = JSON.parse(localStorage.getItem('recipientData'));
    const [check, setCheck] = useState();
    console.log('check--', check);
    const checkRef = React.useRef();
    const tagsFromDeviceSelection = useSelector((state) => state.passingAssociatePropStore);
    const assignWriteRecipient = useSelector((state) => state.assignWriteRecipientStore);
    let { assignData } = useSelector((state) => state.assignDataLocalDataStore);
    console.log('assignData', assignData);
    const { options4 } = useSelector((state) => state.get4thDropdown);
    console.log('options4---', options4);

    const genericEmit = (data) => {
        if (data) {
            socket?.emit('generic', data);
        }
    };

    useEffect(() => {
        socket?.on('deviceStatus', (data) => {
            console.log('dev---', data);
            dispatch(socketDeviceStatus(data));
            console.log('appdata---', data);
            console.log('devicests', data?.deviceStatus);
        });
    }, [socket]);

    const handleSocketWriteAssign = () => {
        setAssignLoading(true);
        console.log(
            {
                method: 'E125',
                deviceToken: token,
                payload: {
                    status: true,
                    userName: userInfo?.data?.user?.username,
                    message: 'write on this tag',
                    tagNumbers: assignable?.map((i) => i?.rfidNumber),
                    recipientId: location.pathname.split('/').pop(),
                    dereservationDate: tableDRdate,
                    'track-code': 'BS-TR-5103',
                    comments: comments ? comments : '',
                    sequenceNo: sequenceNo
                }
            },
            'socket assign unit emit method'
        );
        genericEmit({
            method: 'E125',
            deviceToken: token,
            payload: {
                status: true,
                userName: userInfo?.data?.user?.username,
                message: 'write on this tag',
                tagNumbers: assignable.map((i) => i?.rfidNumber),
                recipientId: location.pathname.split('/').pop(),
                dereservationDate: tableDRdate,
                'track-code': 'BS-TR-5103',
                comments: comments ? comments : '',
                sequenceNo: sequenceNo
            }
        });
    };

    const handleSocketAssign = () => {
        let receipentdata =
            currentItem.data && currentItem.data.find((item) => item['_id'] === location.pathname.split('/').pop());
        setAssignLoading(true);
        let Units = [];
        console.log('receipentdata', receipentdata);
        unitsTable.map((i) => {
            console.log('Dereservation Date - ' + i.tableDRdate);

            if (i?.check && !i.assigned && i.associated) {
                Units.push({
                    firstName: receipentdata.firstName,
                    lastName: receipentdata.lastName,
                    mrnNumber: receipentdata.mrnNumber,
                    dob: receipentdata.dob,
                    gender: receipentdata.gender,
                    userName: userInfo?.data?.user?.username,
                    message: 'Assign Tag',
                    totalTags: [i?.rfidNumber],
                    recipientId: location.pathname.split('/').pop(),
                    dereservationDate: i.tableDRdate,
                    'track-code': 'BS-TR-5103',
                    comments: comments ? comments : '',
                    sequenceNo: i.sequenceNo
                });
            }
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
        console.log('==units==', Units);
        // Rescan functionality added
        /* genericEmit({
             userName: userInfo?.data?.user?.username,
             deviceToken: token,
             method: 'E129',
             payload: {
                 userName: userInfo.data.user.username,
                 method: 'E129',
                 type: 'Associate'
             }
         });*/
    };

    const handleAssignedCount = () => {
        if (selectedItem && selectedItem['assignedCount'] > 0) {
            let recipientId = location.pathname.split('/').pop();
            let filtersData = [{ key: 'recipientId._id', value: [recipientId] }];
            let recipientName = selectedItem['name'];
            let chipData = [recipientName];
            let chipNameAndId = { name: recipientName, id: recipientId };
            let filterKeysObjects = {};

            let newFiltersObject = { chipNameAndId, chipData, filtersData, filterKeysObjects, staticFilters: true };
            dispatch(getApplyFilters(newFiltersObject));
            dispatch(setScreeenIndex(1));
            history.push('/dashboard/request-unit');
        }
    };

    const feilds = ['name', 'dob', 'gender', 'bloodgroupId', 'assignedCount', 'usedCount', 'mrnNumber'];
    const feildNames = {
        name: 'Name',
        firstName: CONSTANTS.FIRST_NAME,
        lastName: CONSTANTS.LAST_NAME,
        // badgeNo: 'Badge Number',
        bloodgroupId: CONSTANTS.BLOOD_GROUP,
        gender: CONSTANTS.GENDER,
        dob: CONSTANTS.DOB,
        mrnNumber: 'MRN Number',
        assignedCount: 'Assigned Unit',
        usedCount: 'Used Count'
    };

    // recipientData from api
    const apiResponse = useSelector((state) => state.getData);
    const { loading, responseData } = apiResponse;

    //const checkCommonUnitIds = () => {
    //    const currentUnitIds = unitTable.map((item) => item.unitId);
    //    const assignedUnitIds = unitIdResponse.data_array.map((item) => item.unitId);
    //    let matcheIds = assignedUnitIds.filter((assigned) => currentUnitIds.includes(assigned));
    //    if (matcheIds.length > 0) {
    //        setCommonUnitId(matcheIds[0]);
    //        setUnitIdAssigned(true);
    //    } else {
    //        setDialogOpen(true);
    //    }
    //};

    const id = location.pathname.split('/')[4];

    useEffect(() => {
        dispatch(getData('user', 0, 1, undefined, [{ key: '_id', value: [userInfo?.data?.user?._id] }]));
    }, [getData]);

    console.log('getdataaaa', apiResponse.responseData.data?.[0]?.badgeNo);

    useEffect(() => {
        dispatch(getSettings('setting'));
    }, []);
    
    useEffect(() => {

        console.log("--------------")
        if (options4 && settingsData?.general?.deviceType === 'Manual') {
            const active = options4?.data?.filter((item) => item);
            const sortedData = sortDropdown(active, 'name');
            setActiveDevices(sortedData);

            console.log(sortedData.length);
            // setActiveDevices(active) --- device dropdown was not sorted
            console.log(sortedData.length + " Active Devices -------------")
            if (window.location.pathname === '/dashboard/barcode-entry/movein' || window.location.pathname === '/dashboard/barcode-entry/moveout') {
                //  dispatch(socketDevice(""))
            }
            else {
                dispatch(socketDevice(sortedData.length > 0 ? sortedData[0].name : ""))
            }
            setSelectedDevicesValue(sortedData[0]);
            dispatch(socketDeviceToken(sortedData?.[0]?.token));
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: sortedData[0]?.token,
                method: 'E111',
                payload: {
                    userName: userInfo.data.user.username,
                    message: 'connected'
                }
            });
        }
        else if (options4) {
            const active = options4?.data?.filter((item) => item?.status == 1);
            const sortedData = sortDropdown(active, 'name');
            setActiveDevices(sortedData);

            console.log(sortedData.length);
            // setActiveDevices(active) --- device dropdown was not sorted
            console.log(sortedData.length + " Active Devices -------------")
            if (window.location.pathname === '/dashboard/barcode-entry/movein' || window.location.pathname === '/dashboard/barcode-entry/moveout') {
                //  dispatch(socketDevice(""))
            }
            else {
                dispatch(socketDevice(sortedData.length > 0 ? sortedData[0].name : ""))
            }
            setSelectedDevicesValue(sortedData[0]);
            dispatch(socketDeviceToken(sortedData?.[0]?.token));
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: sortedData[0]?.token,
                method: 'E111',
                payload: {
                    userName: userInfo.data.user.username,
                    message: 'connected'
                }
            });
        }
    }, [options4]);

    useEffect(() => {
        dispatch(get4thDropdown('devices',));
    }, []);

    function hours_48_From_Now(dt = new Date()) {
        return new Date(dt.setDate(dt.getDate() + 0));
    }

    function getDreservationDatetime(productgroupId, dt = new Date()) {
        console.log('productgroupid--', productgroupId);
        //console.log("set---", settingsData)
        let datas = settingsData?.dereservation?.filter((obj) => obj.productgroupId === productgroupId);
        console.log('datas', datas);
        console.log('dereservationproduct--', settingsData?.dereservation);
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
    const handleSave = () => {
        console.log(' -- Temp Unit Id ---' + tempUnitId);
        setBloodGroup(unitIdData?.data?.[0]?.bloodgroupId?.[0]?.name);
        if (tempUnitId !== undefined && tempUnitId !== null) {
            //sameDereservation ? handleDeresrvationDate(sameDereservation) : null;
            if (unitsTable.length === 0 && unitId.length > 11 && productCode?.isbtcode) {
                setUnitsTable([
                    {
                        unitId: unitId.toUpperCase(),
                        productCode: productCode.isbtcode,
                        description: productCode.isbtdescription,
                        //tableDRdate,
                        expiryDate: tempUnitId.expiryDateAndTime,
                        tableDRdate: tempUnitId?.isAssigned
                            ? tempUnitId?.dereservationDate
                            : '-',
                        //tableDRdate: getDreservationDatetime(tempUnitId.productcodeId?.productgroupId),
                        refskuId: unitId_id,
                        comment: comments,
                        sequenceNo: sequenceNo,
                        associated:
                            tempUnitId.rfidNumber !== undefined && tempUnitId.rfidNumber.length > 0 ? true : false,
                        assigned: tempUnitId.isAssigned === 0 ? false : true,
                        bloodGroup: tempUnitId.bloodgroupId[0]?.name,
                        rfidNumber: tempUnitId.rfidNumber,
                        check: true
                    }
                ]);
                setUnitId('');
                setProductCode(null);
                //setTableDRdate(hours_48_From_Now());
                setCheck('');
                setDisableCheck(false);
                setUnitIdError('');
                setComments('');
                setSequenceNo('');
            } else if (unitsTable.length > 0) {
                unitsTable.unshift({
                    /* unitId: unitId.toUpperCase(),
                     productCode: productCode.isbtcode,
                     description: productCode.isbtdescription,
                     //tableDRdate,
                     refskuId: unitId_id,
                     comment: comments,
                     bloodGroup: bloodGroup?.name,
                     rfidNumber: rfidNumber*/
                    unitId: unitId.toUpperCase(),
                    productCode: productCode.isbtcode,
                    description: productCode.isbtdescription,
                    expiryDate: tempUnitId.expiryDateAndTime,
                    //tableDRdate,
                    tableDRdate: tempUnitId?.isAssigned
                        ? tempUnitId?.dereservationDate
                        : '-',
                    //tableDRdate: getDreservationDatetime(tempUnitId.productcodeId?.productgroupId),
                    refskuId: unitId_id,
                    check: tempUnitId.isAssigned === 0 ? true : false,
                    comment: comments,
                    associated: tempUnitId.rfidNumber !== undefined && tempUnitId.rfidNumber.length > 0 ? true : false,
                    assigned: tempUnitId.isAssigned === 0 ? false : true,
                    bloodGroup: bloodGroup?.name,
                    rfidNumber: tempUnitId.rfidNumber,
                    sequenceNo: sequenceNo
                });
                setUnitsTable([...unitsTable]);
                setUnitId('');
                setProductCode(null);
                //setTableDRdate(hours_48_From_Now());
                setCheck('');
                setDisableCheck(false);
                setUnitIdError('');
                setComments('');
                setSequenceNo('');
            }
            setProductCodeOptions([]);
            setDisableProductCode(true);
        }
    };

   
    const handleDelete = (index) => {
        unitsTable.splice(index, 1);
        setUnitsTable([...unitsTable]);
    };

    const handleChangeSelect = (e) => {
        setDeviceGroup(e.target.value);
    };

    const { postUnitLoading, postUnitResponse, postUnitError } = useSelector((state) => state.addUnitRecipient);
    const [alert, setAlert] = useState(false);

    const handleAlert = () => {
        setAlert(false);
        // console.log(assignable, unitsTable);
        if (assignable?.length === unitsTable?.length) {
            history.push('/dashboard/assign-unit');
        }
    };

    useEffect(() => {
        console.log('Setting Data' + settingsData?.general?.features + '-----------');
        console.log('Recipent Data ------------' + JSON.stringify(currentItem));
        if (postUnitResponse?.status) {
            setAlert(true);
            setDialogOpen(false);
            setAssignLoading(false);
            if (assignable?.length !== unitsTable?.length) {
                let tempUnits = [...unitsTable];
                setAssignable([]);
                let tempSelectedTags = [...successTags];
                let tempUnitsTable = tempUnits.map((i) => {
                    if (i?.check === true) {
                        // console.log(i, 'inside map after assign');
                        tempSelectedTags.push(i?.rfidNumber);
                        return { ...i, check: false };
                    } else {
                        return i;
                    }
                });
                tempSelectedTags = tempSelectedTags.filter((i) => i);
                setUnitsTable(tempUnitsTable);
                setSuccessTags(tempSelectedTags);
            }
        }
    }, [postUnitResponse]);

    const handleDeviceChange = (e) => {
        console.log('eeee', e)
        dispatch(socketDevice(e?.target?.value));
        dispatch(socketDeviceConnection(false));
        dispatch(SocketScanData([]));
        dispatch(assignLocalDataAction([]));
        let selectedVal = activeDevices.filter((item) => item.name === e.target.value);
        console.log('selectedvalll', selectedVal)
        if (selectedVal[0]?.deviceTypeId?.[0]?.name.includes('SBLF')) {
            dispatch(lFDeviceMethod(selectedVal[0]?.ipAddress));
        }
        setSelectedDevicesValue(selectedVal[0]);
        dispatch(socketDeviceValue(selectedVal[0]))
        dispatch(socketDeviceToken(selectedVal?.[0]?.token));
        genericEmit({
            userName: userInfo?.data?.user?.username,
            deviceToken: selectedVal[0]?.token,
            method: 'E111',
            payload: {
                userName: userInfo.data.user.username,
                message: 'connected'
            }
        });
    };

    const handleOptions = () => {
        dispatch(get4thDropdown('devices',));
    };

    const handleBackClick = () => {
        if (history.location.pathname === '/dashboard/barcode-entry') {
            history.goBack();
        } else {
            history.push('/dashboard');
        }
    };

    const handleAssign = () => {
        console.log('handleAssign');
        setAssignLoading(false);
        let newTable = [...assignable];

        newTable = newTable.map((item) => {
            if (id === 'emergency') {
                return {
                    refskuId: item?.refskuId,
                    dereservationDate: item.tableDRdate,
                    'track-code': 'BS-TR-5113',
                    comments: item?.comment ? item?.comment : 'No comments',
                    name: 'Emergency Assigned'
                };
            } else {
                return {
                    recipientId: location.pathname.split('/').pop(),
                    refskuId: item?.refskuId,
                    dereservationDate: item.tableDRdate,
                    // dereservationDate: moment.utc(item.tableDRdate).format('yyyy/MM/DD HH:mm'),
                    'track-code': 'BS-TR-5103',
                    comments: item?.comment ? item?.comment : 'No comments'
                };
            }
        });

        let collectionName = 'activity';
        let validData = [...newTable];

        let formData = JSON.stringify({ collectionName, validData });

        dispatch(postAddUnitData(formData));
    };

    const handleDate = (e) => {
        if (!(e?.getTime() < new Date().getTime())) {
            setTableDRdate(e);
            setTableDRdateError(false);
        }
        // console.log(sameDereservation, 'same dereservation date');
    };

    const handleActionChange = (event) => {
        setSelectedAction(event.target.value);
    };

    const handleDeresrvationDate = (e) => {
        const checked = e?.target ? e.target.checked : e;
        const dateNtime = tableDRdate ? tableDRdate : unitsTable[0]?.tableDRdate;
        const newunitsTable = unitsTable.map((i) => ({ ...i, tableDRdate: dateNtime }));
        checked === true ? unitsTable.splice(0, unitsTable.length, ...newunitsTable) : null;
        checked === true ? setUnitsTable([...unitsTable]) : null;
        e?.target ? setSameDereservation(!sameDereservation) : null;
    };

    const handleTableDate = (e, data) => {
        console.log('e---', e);
        const newunitsTable = unitsTable.map((i) => {
            if (i.rfidNumber === data.rfidNumber) {
                return { ...i, tableDRdate: e };
            }
            return i;
        });

        setUnitsTable([...newunitsTable]);

        //const newunitsTable = unitsTable.map((i) => ({ ...i, tableDRdate: e }));
        //setUnitsTable([...newunitsTable]);
        //setTableDRdate(e);

        /* if (sameDereservation && !(e?.getTime() < new Date().getTime())) {
             let tempUnitsTable = [...unitsTable];
             let newTableDrDate = String(e);
             newTableDrDate !== 'Invalid Date'
                 ? tempUnitsTable[index] = {
                       unitId: tempUnitsTable[index]?.unitId,
                       productCode: tempUnitsTable[index]?.productCode,
                       description: tempUnitsTable[index]?.description,
                       expiryDateAndTime: tempUnitsTable[index]?.expiryDateAndTime,
                       sequenceNo: tempUnitsTable[index]?.sequenceNo,
                       tableDRdate: newTableDrDate,
                       associated: tempUnitsTable[index]?.associated,
                       refskuId: tempUnitsTable[index]?.refskuId,
                       bloodGroup: tempUnitsTable[index]?.bloodGroup,
                       rfidNumber: tempUnitsTable[index]?.rfidNumber,
                       check: tempUnitsTable[index]?.check,
                   }
                 : null;
             newTableDrDate !== 'Invalid Date' ? setUnitsTable([...tempUnitsTable]) : null;
         }
        */
    };

    const handleSequenceChange = (e, index) => {
        console.log(' handleSequenceChange ' + e);

        let sequenceNoExists = false;
        unitsTable[index].sequenceError = false;
        unitsTable.map((i) => {
            if (i.sequenceNo === e.target.value) {
                sequenceNoExists = true;
            }
        });

        if (sequenceNoExists) {
            unitsTable[index].sequenceError = true;
        }
        unitsTable[index].sequenceNo = e.target.value;
        setUnitsTable([...unitsTable]);
    };

    const closeAndsave = () => {
        console.log('Close & Save');
        //let tempUnitId = unitId.toUpperCase();

        if (unitIdData?.data === undefined || unitIdData?.data?.length === 0) {
            setUnitIdError(true);
            setUnitIdErrorText('Unit Id Not Found');
        } else if (tempUnitId === null || tempUnitId === undefined) {
            setProductCodeError('try with new product code or UNIT ID');
            productCodeRef?.current?.focus();
        } else if (check === null || check === undefined || check.length === 0) {
            setUnitIdError(true);
            setUnitIdErrorText('Please Enter Check Value');
        } else if (
            unitsTable.findIndex(
                (item) =>
                    item.unitId === tempUnitId?.donationCode?.toUpperCase() &&
                    item.productCode === tempUnitId.productcodeId[0]?.isbtcode
            ) !== -1
        ) {
            setUnitIdError(true);
            setUnitIdErrorText('Units Already added');
            setCheck('');
            setDisableCheck(false);
            setProductCodeOptions([]);
        } else if ((tempUnitId != null) & (tempUnitId !== undefined)) {
            setScanOrManualOpen(false);
            handleSave();
        } else {
            if (productCode === null) {
                setProductCodeError(true);
                return;
            }
            if (unitId === '' || unitId.length < 12) {
                setUnitIdError(true);
                // setUnitIdErrorText('Invalid Unit ID, Length Should Be Minimum 13 Charecters');
                return;
            }
        }

        dispatch(clearUnitIdSearch());
    };

    const openAndSave = () => {
        console.log('open And Save on next click');
        unitIdRef.current.focus();
        //let tempUnitId = unitId.toUpperCase();

        if (unitIdData?.data === undefined || unitIdData?.data?.length === 0) {
            setUnitIdError(true);
            setUnitIdErrorText('Unit Id Not Found');
        } else if (tempUnitId === null || tempUnitId === undefined) {
            setProductCodeError('try with new product code or UNIT ID');
            productCodeRef?.current?.focus();
        } else if (check === null || check === undefined || check.length === 0) {
            setUnitIdError(true);
            setUnitIdErrorText('Please Enter Check Value');
        } else if (
            unitsTable.findIndex(
                (item) =>
                    item.unitId === tempUnitId?.donationCode?.toUpperCase() &&
                    item.productCode === tempUnitId.productcodeId[0]?.isbtcode
            ) !== -1
        ) {
            setUnitIdError(true);
            setUnitIdErrorText('Units Already added');
            setCheck('');
            setDisableCheck(false);
            setProductCodeOptions([]);
        } else if (tempUnitId !== undefined && tempUnitId !== null) {
            if (unitId.length < 12) {
                setUnitIdError(true);
                // setUnitIdErrorText('Invalid Unit ID, Length Should Be Minimum 13 Charecters');
                return;
            }

            if (productCode === null) {
                setProductCodeError(true);
                return;
            }

            handleSave();

            /* if (tableDRdate === null) {
                 setTableDRdateError(true);
                 return;
             }
              else {
                 let invalidDate = String(tableDRdate);
 
                 invalidDate !== 'Invalid Date' && tableDRdate?.getTime() > new Date().getTime()
                     ? handleSave()
                     : setTableDRdateError(true);
             }*/
        }
        dispatch(clearUnitIdSearch());
    };

    const handleUnitId = (e) => {
        setProductCodeError('');
        setProductCodeOptions([]);
        setProductCode(null);
        let val = e?.target?.value;
        console.log(' ---- Unit Id ---', val);
        console.log(settingsData?.general?.barCodeFormat);
        console.log(val.length);

        if (val?.includes('=%') && val?.length >= 6) {
            setUnitId('');
            setUnitIdError(true);
            setUnitIdErrorText('Invalid Unit Id');
            return;
        }
        if (val?.includes('=<') && val?.length >= 10) {
            setUnitId('');
            setUnitIdError(true);
            setUnitIdErrorText('Invalid Unit Id');
            return;
        }
        if (val?.includes('=\\') && val?.length >= 20) {
            setUnitId('');
            setUnitIdError(true);
            setUnitIdErrorText('Invalid Unit Id');
            return;
        }

        /*if (val?.match(/[&}>=<=%]/g)) {
            setUnitIdError(true);
            setUnitIdErrorText('Invalid Unit Id');
        }
        else*/
        if (
            !val?.includes('=\\') &&
            val.startsWith('=') &&
            settingsData?.general?.barCodeFormat === 'AUSTRALIAN' &&
            val.length === 14
        ) {
            setManualEntery(false);
            console.log('Australian barcode Scan');
            const unit = val.substring(1, 14);
            setUnitId(unit);
            const check = checkTextSum(val.substring(1, 14));
            setCheck(check);
            productCodeRef?.current?.focus();
            setDisableCheck(true);
            setUnitIdError(false);
            setUnitIdErrorText('');
        } else if (
            !val?.includes('=\\') &&
            val.startsWith('=') &&
            settingsData?.general?.barCodeFormat === 'ISBT' &&
            val.length === 16
        ) {
            setManualEntery(false);
            console.log('ISBT barcode Scan');
            const unit = val.substring(1, 16);
            setUnitId(unit);
            const check = checkTextSum(val.substring(1, 14));
            setCheck(check);
            productCodeRef?.current?.focus();
            setDisableCheck(true);
            setUnitIdError(false);
            setUnitIdErrorText('');
        } else if (
            !val?.includes('=\\') &&
            val.length === 13 &&
            settingsData?.general?.barCodeFormat === 'AUSTRALIAN' &&
            val.match(/^[a-zA-Z0-9]+$/)
        ) {
            setManualEntery(true);
            console.log('Australian Manual Entry');
            setUnitId(val);
            checkRef.current && checkRef.current.focus();
            setUnitIdError(false);
            setUnitIdErrorText('');
        } else if (
            !val?.includes('=\\') &&
            val.length === 15 &&
            settingsData?.general?.barCodeFormat === 'ISBT' &&
            val.match(/^[a-zA-Z0-9]+$/)
        ) {
            setManualEntery(true);
            console.log('ISBT Manual Entry');
            setUnitId(val);
            checkRef.current && checkRef.current.focus();
            setUnitIdError(false);
            setUnitIdErrorText('');
        } else {
            setUnitIdError(true);
            setUnitIdErrorText('Invalid Unit Id');
            setUnitId(val);
            if (check) {
                setCheck('');
                setDisableCheck(false);
            }
        }
    };

    const handleCheck = (e) => {
        console.log(' ---- Handle check ---- ' + unitId);
        setProductCode(null);
        const checkVal = checkTextSum(unitId);
        console.log('----' + checkVal + '----');
        if (e.target.value.toUpperCase() === checkVal) {
            console.log('Unit Id & check are matching');
            setUnitIdError(false);
            productCodeRef?.current?.focus();
        } else if (validationRequired) {
            setUnitIdError(true);
            setUnitIdErrorText('Enter A Valid Unit ID');
        }
        setCheck(e.target.value.toUpperCase());
    };

    const onCancelDialog = () => {
        if (id === 'emergency') {
            setEmergencyDialogOpen(false);
        }
        setUnitId('');
        setCheck();
        setDisableCheck(false);
        setProductCode(null);
        /// setTableDRdate(hours_48_From_Now());
        setUnitIdError(false);
        setTableDRdateError(false);
        setProductCodeError(false);
        setScanOrManualOpen(false);
    };

    useEffect(() => {
        if (selectedItem?.newTable) {
            unitTable.push(...selectedItem.newTable);
            setUnitsTable([...unitTable]);
        }
        dispatch(get4thDropdown('devices'));
        dispatch(getDropDown('productcodes'));
        // setTableDRdate(hours_48_From_Now());
        setSelectedItem(location?.state?.row);
        localStorage.setItem('recipientName', `${location?.state?.row?.firstName} ${location?.state?.row?.lastName}`);
        setFailedTags([]);
        setSuccessTags([]);
        return () => {
            unitTable.length = 0;
            dispatch(clearUnitIdSearch());
            dispatch(clearPostUnitResponse());
            dispatch(clear4thDropDown());
        };
    }, []);

    const { unitIdData } = useSelector((state) => state.getUnitIdSearch);
    console.log('data____', unitIdData);

    // const unitIdSearchApi = () => {
    //     dispatch(getUnitSearch('refsku', unitId));
    // };

    useEffect(() => {
        if (socket) {
            socket?.on('assignUnitRecipient', (data) => {
                console.log('assignUnitRecipient', data);
                if (data.status) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.message,
                            alertType: 'success'
                        })
                    );
                    setAssignLoading(false);
                    setDialogOpen(false);
                }
            });
        }
    }, []);

    useEffect(() => {
        console.log('Check value Updated');

        let filterKey = [{ key: 'donationCode', value: unitId?.toUpperCase() }];
        if (unitId && unitId.length > 2 && check && !unitIdError) {
            dispatch(getUnitSearch('refsku', JSON.stringify(filterKey)));
            setUnitId_id('');
            setDisableProductCode(false);
        }

        if (check === '') {
            setCheck();
        }
    }, [check]);

    useEffect(() => {
        /*if (
            unitsTable.findIndex((item) => item.unitId === unitId?.toUpperCase()
                && item.productcodeId === tempUnitId.productcodeId) !== -1 &&
            unitIdData &&
            unitIdData.data &&
            unitIdData.data.length === 1 &&
            unitIdData.data?.[0]?.isAssigned === 0 &&
            unitIdData.data?.[0]?.trackId[0]?.name !== 'fated' &&
            unitIdData?.data?.[0]?.productcodeId?.[0]?.isbtcode !== undefined &&
            check
        ) {
            setUnitIdError(true);
            setUnitIdErrorText('Unit is Available in Table');
            setCheck('');
            setDisableCheck(false);
            setProductCodeOptions([]);
        } else*/
        if (unitIdData?.data?.length === 1 && unitIdData?.data?.[0]?.trackId[0]?.name === 'fated') {
            setUnitIdError(true);
            setUnitIdErrorText('Unit is Fated');
            setProductCodeOptions([]);
        } else if (unitIdData && unitIdData.data && unitIdData.data.length > 0 && check) {
            if (unitIdData?.data?.length > 1) {
                let tempProductCodeIds = unitIdData?.data
                    ?.filter(
                        (i) =>
                            i?.isAssigned === 0 &&
                            i?.trackId[0]?.name !== 'fated' &&
                            i?.productcodeId?.[0]?.isbtcode !== undefined &&
                            i?.donationCode === unitId &&
                            i?.expiryDateAndTime === expiryDate
                    )
                    .map((i) => i?.productcodeId?.[0]?._id);
                // console.log(unitsTable, tempProductCodeIds, 'current TABLE');

                let tempIsbtCOdes = unitsTable
                    ?.filter((item) => item.unitId === unitId?.toUpperCase())
                    ?.map((item) => item?.productCode);
                // console.log(tempIsbtCOdes, tempProductCodeIds, 'tempIsbtCOdes');
                let tempProductCodeOptions = options?.data
                    ?.filter((i) => tempProductCodeIds.includes(i?._id))
                    ?.filter((item) => !tempIsbtCOdes?.includes(item?.isbtcode));
                console.log('tempproduct---', tempProductCodeOptions);
                if (tempProductCodeIds?.length === 0) {
                    setUnitIdError(true);
                    setUnitIdErrorText('Unit is Already Assigned');
                    setDisableProductCode(true);
                    setDisableCheck(false);
                    setCheck('');
                    setProductCodeOptions([]);
                } else {
                    setDisableProductCode(false);
                    unitIdRef.current.blur();
                    setProductCodeOptions(tempProductCodeOptions);
                    productCodeRef?.current?.focus();
                }
            } else {
                let tempCode = options?.data?.filter((i) => i?._id === unitIdData?.data?.[0]?.productcodeId?.[0]?._id);
                setProductCodeOptions(tempCode);
                setDisableProductCode(false);
                unitIdRef.current.blur();
                productCodeRef?.current?.focus();
                setUnitId_id(unitIdData?.data?.[0]?._id);
                setRfidNumber(unitIdData?.data?.[0]?.rfidNumber);
                setisAssigned(unitIdData?.data?.[0]?.isAssigned);
            }
        } else if (unitIdData && unitIdData.data && unitIdData.data.length === 0 && check) {
            setUnitIdError(true);
            setUnitIdErrorText('UnitId Not Found');
            setCheck('');
            setDisableCheck(false);
            setProductCode(null);
            checkRef.current && checkRef.current.blur();
            setProductCodeOptions([]);
        }

        if (unitIdData?.data?.length > 0) {
            console.log(unitIdData?.data);
            setBloodGroup(unitIdData?.data?.[0]?.bloodgroupId?.[0]);
        }
    }, []);

    const handleCancleAssign = () => {
        if (postUnitError && postUnitError.errorMessage) {
            dispatch(clearPostUnitResponse());
        }
        setAssignLoading(false);
        setDialogOpen(false);
    };

    const onChangeAutoComplete = (e, value) => {
        console.log('onChangeAutoComplete');

        console.log(unitIdData);

        let tempIsbtCOdes = unitsTable
            ?.filter((item) => item.unitId === unitId?.toUpperCase())
            ?.map((item) => item?.productCode);

        let tempUnitId = unitIdData?.data?.filter((i) => i?.productcodeId?.[0]?._id === value?._id)[0];
        settempUnitId(tempUnitId);

        if (!tempIsbtCOdes.includes(value?.isbtcode)) {
            setUnitId_id(tempUnitId?._id);
            setProductCode(value);
            setBloodGroup(tempUnitId?.bloodgroupId[0]?.name);
            setRfidNumber(tempUnitId?.rfidNumber);
            setisAssigned(tempUnitId?.isAssigned);
            commentRef?.current?.focus();
            setExpiryDate(tempUnitId?.expiryDateAndTime);
        } else {
            setProductCodeError('Already exists in table');
            setProductCode(null);
            // commentRef?.current?.focus();
        }
        setProductCodeOpen(false);
    };

    const handleClickAway = () => {
        setProductCodeOpen(false);
    };

    const handleAutoCompleteChange = (e) => {
        console.log(' -- handleAutoCompleteChange --- ' + e?.target?.value);
        let tempUnitId;

        if (e && e?.target?.value?.match(/[&}>%]/g)) {
            setProductCodeError('Invalid Product code');

            setProductCode(null);
        }
        if (e && e?.target?.value?.includes('=%') && e?.target?.value?.length >= 6) {
            setProductCode(null);
            setProductCodeError('Invalid Product code');

            return;
        }

        if (e && e?.target?.value?.includes('=\\') && e?.target?.value?.length >= 20) {
            setProductCode(null);
            setProductCodeError('Invalid Product code');

            return;
        } else if (e && e?.target?.value?.includes('=<')) {
            let values = options?.data?.find(
                (item) => item.isbtcode.toLowerCase() === e?.target?.value?.substr(2).toLowerCase()
            );
            if (values) {
                console.log('values', values);
                let tempIsbtCOdes = unitsTable
                    ?.filter((item) => item.unitId === unitId?.toUpperCase())
                    ?.map((item) => item?.productCode);

                console.log(' ---- unitIdData --- ' + unitIdData);

                let tempUnitId = unitIdData?.data?.filter((i) => i?.productcodeId?.[0]?._id === values?._id)[0];
                console.log('Unit Id ---- ' + tempUnitId);
                settempUnitId(tempUnitId);
                console.log('Unit Id ---- ' + tempUnitId);
                if (tempIsbtCOdes?.includes(values?.isbtcode)) {
                    setProductCodeError('Already exists in table');
                    setProductCode(null);
                    setUnitIdError(true);
                    // productCodeRef?.current?.blur();
                }
                /*if (tempUnitId?.isAssigned === 1) {
                    setProductCodeError(`Product code ${e.target.value?.substr(2).toLowerCase()} is already assigned`);
                    // commentRef?.current?.focus();
                } else*/
                if (!tempIsbtCOdes?.includes(values?.isbtcode)) {
                    setUnitId_id(tempUnitId?._id);
                    setProductCode(values);
                    console.log('Blood Group' + tempUnitId?.bloodgroupId?.[0]?.name);
                    setBloodGroup(tempUnitId?.bloodgroupId?.[0]);
                    setProductCodeError('');
                    commentRef?.current?.focus();
                    setRfidNumber(tempUnitId?.rfidNumber);
                    setisAssigned(tempUnitId?.isAssigned);
                    // commentRef?.current?.focus();
                }

                setProductCode(values);
                //setBloodGroup(unitIdData?.data?.[0]?.bloodgroupId?.[0]);
                setProductCodeError('');
                setTimeout(() => commentRef?.current?.focus(), 500);
            }
        } else if (e?.target?.value?.length <= 10) {
            let values = options?.data?.find(
                (item) => item.isbtcode.toLowerCase() === e.target.value?.substr(2).toLowerCase()
            );

            console.log('---- Values ----- ' + values);
            if (values) {
                let tempIsbtCOdes = unitsTable
                    ?.filter((item) => item.unitId === unitId?.toUpperCase())
                    ?.map((item) => item?.productCode);
                // console.log(tempIsbtCOdes?.includes(values?.isbtcode), 'tempIsbtCOdes.includes(values.isbtcode');
                tempUnitId = unitIdData?.data?.filter((i) => i?.productcodeId?.[0]?._id === values?._id)[0];

                console.log('Unit Id ---- ' + tempUnitId);
                if (tempIsbtCOdes?.includes(values?.isbtcode)) {
                    setProductCodeError('Already exists in table');
                    setProductCode(null);
                    setUnitIdError(true);
                    // productCodeRef?.current?.blur();
                }
                /* if (tempUnitId?.isAssigned === 1) {
                     setProductCodeError(`Product code ${e.target.value?.substr(2).toLowerCase()} is already assigned`);
                     // commentRef?.current?.focus();
                 } else*/
                if (tempUnitId?.isAssigned === 0 && !tempIsbtCOdes?.includes(values?.isbtcode)) {
                    setUnitId_id(tempUnitId?._id);
                    setProductCode(values);
                    setBloodGroup(tempUnitId.bloodgroupId.name);
                    setProductCodeError('');
                    commentRef?.current?.focus();
                    setRfidNumber(tempUnitId?.rfidNumber);
                    setisAssigned(tempUnitId?.isAssigned);
                    setExpiryDate(tempUnitId?.expiryDateAndTime);
                    // commentRef?.current?.focus();
                } else if (!tempIsbtCOdes?.includes(values?.isbtcode)) {
                    setProductCodeError('Product code not matching');
                }
            } else {
                e?.target?.value && e.target.value.length > 2 ? setProductCodeOpen(true) : setProductCodeOpen(false);
            }
        } else {
            setProductCodeError('Invalid Product code');
            setProductCode(null);
        }
    };

    useEffect(() => {
        if (options?.data?.length > 0) setProductCodeOptions(options?.data);
    }, [options]);

    useEffect(() => {
        console.log('assignData data--', assignData);
        if (device !== '' && !assignLoading) {
            setSocketResponse(true);
            setSameDereservation(true);
            let tempUnits = assignData.map((i) => {
                return {
                    unitId: i?.donationCode,
                    productCode: i?.productcodeId?.isbtcode,
                    description: i?.productcodeId?.isbtdescription,
                    expiryDateAndTime: i?.expiryDateAndTime,
                    tableDRdate: i?.isAssigned
                        ? i?.dereservationDate
                        : '-',
                    rfidNumber: i?.rfidNumber,
                    recipientId: i?.recipientId,
                    bloodGroup: i?.bloodgroupId?.name,
                    assigned: i?.isAssigned,
                    associated: i?.isAssociated,
                    sequenceNo: i?.sequenceNo,
                    check: true
                };
            });
            //.filter((i) => i?.unitId);
            console.log('----------unitsTable--', unitsTable);
            console.log('--------------' + tempUnits + '---------------');

            setUnitsTable([...tempUnits]);
        }
    }, [assignData]);

    useEffect(() => {
        console.log('Page Refresh');
        console.log('Response ' + JSON.stringify(assignWriteRecipient));

        if (assignWriteRecipient?.status === false) {
            console.log('false status');
            setAssignLoading(false);
            setDialogOpen(false);
            console.log('assignwriterecipient', assignWriteRecipient);
        } else if (assignWriteRecipient?.status === true) {
            setAssignLoading(false);
            setDialogOpen(false);
            let tempFaildTags = [
                ...(assignWriteRecipient?.data?.[0]?.failedTags || []),
                ...failedTags.filter((i) => !assignWriteRecipient?.data?.[0]?.successTags?.includes(i))
            ];
            console.log('tempfailedtags--', tempFaildTags);
            let tempSuccessTags = assignWriteRecipient?.data?.[0]?.successTags || [];
            console.log('tempSuccessTags--', tempSuccessTags);
            let tempUnitsTable = unitsTable.map((i) => {
                if (assignWriteRecipient?.data?.[0]?.successTags?.includes(i?.rfidNumber)) {
                    return { ...i, check: false };
                } else {
                    return i;
                }
            });
            setUnitsTable(tempUnitsTable);
            console.log('tempUnitstable', tempUnitsTable);
            setSuccessTags([...successTags, ...tempSuccessTags]);
            setFailedTags([...tempFaildTags]);

            if (
                assignWriteRecipient?.data?.[0]?.totalTags?.length ===
                assignWriteRecipient?.data?.[0]?.successTags?.length &&
                assignWriteRecipient?.data?.[0]?.successTags?.length > 0
            ) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: 'Write Recipient Successful',
                        alertType: 'success',
                        alertDuration: 10000
                    })
                );
                setAssignLoading(false);
                setDialogOpen(false);
            } else if (assignWriteRecipient?.data?.[0]?.successTags?.length > 0) {
                setDialogOpen(false);
                setAssignLoading(false);
            }

            //Commented Temporarily

            //if (assignWriteRecipient?.[0]?.failedTags?.length > 0) {
            //    setDialogOpen(false);
            //    setAssignLoading(false);
            //    dispatch(
            //        createAlert({
            //            showAlert: true,
            //            alertMessage: 'Some Tags are not successfully written',
            //            alertType: 'error',
            //            alertDuration: 10000
            //        })
            //    );
            //}
        }
    }, [assignWriteRecipient]);

    console.log(
        { assignData, unitsTable, bloodGroup, tagsFromDeviceSelection, assignWriteRecipient },
        'assignWriteRecipient'
    );

    React.useEffect(() => {
        // console.log(socket && device !== '', socket, device);

        if (socket) {
            console.log('socket--', socket);

            socket.on('listenScannedData', (data) => {
                console.log('listenScannedData----', data);
                //  if (data.status === true && device && data?.data.length > 0) {
                if (data.status === true && data?.data.length > 0) {
                    const index = assignData.findIndex((ids) => ids.rfidNumber === data?.data[0].rfidNumber);
                    if (index === -1) {
                        console.log('Added');
                        assignData.push(data?.data[0]);
                    } else {
                        assignData = assignData.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                        assignData.push(data?.data[0]);
                    }
                    //localPreEncode.push(data?.data[0]);
                    console.log('-------localpreencode', assignData);

                    dispatch(assignLocalDataAction(assignData));
                }
            });
        }
    });

    useEffect(() => {
        let tempAssignable = [];

        tempAssignable = unitsTable.filter(
            (item) => item.check === true
        ); //else { //tempAssignable = [];

        /*if (unitsTable.some((i) => i?.check === true))
        {
           
            tempAssignable = unitsTable.filter(
                (i) => {
                    console.log("Assignable -> " + i.check)
                    // i?.bloodGroup?.toLowerCase() === selectedItem?.['bloodgroupId']?.[0]?.name?.toLowerCase() &&    //--- uncomment these line for bloodgroup validation
                    i?.check === true && !successTags?.includes(i?.rfidNumber)
                }
            );
        } */ // unitsTable.filter(
        //     (i) =>
        //         // i?.bloodGroup?.toLowerCase() === selectedItem?.['bloodgroupId']?.[0]?.name?.toLowerCase() &&  //--- uncomment these line for bloodgroup validation
        //         !successTags?.includes(i?.rfidNumber)
        // );
        //}

        console.log(tempAssignable, 'tempAssignable');
        setAssignable(tempAssignable);
        // console.log(unitsTable, successTags, 'unitsTable');
    }, [unitsTable, successTags]);

    const handleTableCheck = (e, indexm, unit) => {
        console.log('unit', unit);
        console.log('e--', e);
        console.log('indexm--', indexm);

        unitsTable[indexm].check = e.target.checked ? true : false;
        console.log(unitsTable[indexm]);

        let tempUnitsTable = [...unitsTable];
        tempUnitsTable[indexm].check = e.target.checked ? true : false;

        console.log('tempUnitsTable', tempUnitsTable);
        setUnitsTable(tempUnitsTable);
    };

    const handleTableCheckAll = (e) => {
        let localdata = [];

        unitsTable.forEach((data) => {
            console.log('dta--', data);
            console.log('Is Checked ----------------', data.check);
            if (data?.assigned || !data?.unitId) {
                data.check = true;
            } else {
                data.check = e.target.checked ? true : false;
            }
            localdata.push(data);
        });
        let val = unitsTable.filter((item) => item.check === true);
        if (val.length > 0) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
        console.log('localdata---', localdata);
        setUnitsTable(localdata);
    };

    useEffect(() => {
        if (Array.isArray(Lf_Hf_TagValidation) && Lf_Hf_TagValidation?.includes('hfWrite')) {
            setSocketResponse(true);
        } else {
            setSocketResponse(false);
        }
    }, [Lf_Hf_TagValidation]);

    const handleClear = () => {
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
        setUnitsTable([]);
        setSelectedRecords([]);
    };

    const handleCompleteMoveIn = () => {
        let moveInData = [];

        if (value && value?.[0]?.deviceTypeId?.[0]?.behaviourProperties === 'isAssociated' || value && value?.[0]?.deviceTypeId?.[0]?.behaviourProperties === 'isEmergency') {
            assignable.forEach((item) => {
                moveInData.push({
                    unitId: item.unitId || '',
                    productCode: item.productCode || '',
                    description: item.description || '',
                    expiryDate: expiryDate,
                    tagId: item.rfidNumber || '',
                    // recipientId: location.pathname.split('/').pop(),
                    dereservationDate: tableDRdate,
                    bloodGroup: item.bloodGroup || ''
                });
            });

            socket.emit('generic', {
                method: 'E103',
                token: value.token,
                payload: {
                    status: true,
                    userName: userInfo.data.user.username,
                    message: 'listen Scanned Data',
                    data: moveInData
                }
            });
        } else {
            let bloodBag = [];
            console.log("assignable" + assignable.length);
            assignable.forEach((item) => {
                bloodBag.push({
                    unitId: item.unitId || '',
                    productCode: item.productCode || '',
                    description: item.description || '',
                    expiryDate: expiryDate,
                    tagId: item.rfidNumber || '',
                    // recipientId: location.pathname.split('/').pop(),
                    dereservationDate: tableDRdate,
                    bloodGroup: item.bloodGroup || ''
                });
            });

            const events = [
                {
                    EventType: 'IN',
                    BloodBags: bloodBag,
                    BatchProducts: []
                },
                {
                    EventType: 'OUT',
                    BloodBags: bloodBag,
                    BatchProducts: []
                },
                {
                    EventType: 'INVENTORY',
                    BloodBags: [],
                    BatchProducts: []
                }
            ];

            let eventType;
            if (selectedAction === 'MOVEIN') {
                eventType = 'IN';
            } else if (selectedAction === 'MOVEOUT') {
                eventType = 'OUT';
            } else if (selectedAction === 'INVENTORY') {
                eventType = 'INVENTORY';
            } else {
                eventType = 'DEFAULT_EVENT_TYPE';
            }

            const selectedEvent = events.find(event => event.EventType === eventType);

            socket.emit('deviceActivity', {
                event_id: '',
                token: value?.token,
                timeStamp: '',
                user: apiResponse?.responseData?.data?.[0]?.badgeNo,
                reader: {
                    serial: value?.serialNumber,
                    drawer: "1"
                },
                events: [selectedEvent]
            });
        }
        setUnitId('');
        setCheck();
        setDisableCheck(false);
        setProductCode(null);
        /// setTableDRdate(hours_48_From_Now());
        setUnitIdError(false);
        setTableDRdateError(false);
        setProductCodeError(false);
        setScanOrManualOpen(false);
        setUnitsTable([]);
        setSelectedAction('');
        setSelectedDevicesValue('');
        setActiveDevices('');

    };
    const [wifiForm,setWifiForm] =useState()
    const handleDialogOpen = (e, data) => {
        console.log('openform',data)
        setScanOpen(true);
        setWifiForm(data);
	}

    const handleClose = () => {
        setScanOpen(false)
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    const [tick, setTick] = useState(null)
   
    console.log('scanvalue---', scanValue)
    console.log('tick---', tick)
    const [unitIds, setUnitIds] = useState('');
    const [bloodGroups, setBloodGroups] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [productName, setProductName] = useState('');
    const [expiry, setExpiry] = useState('');

    
    const handlePaste = (e) => {
        setScanValue(e)
        const pastedValue = e;
        const splittedValues = pastedValue.split('|');
        console.log('eeeeeee',e)
        console.log('splittedValues--', splittedValues)
        setUnitIds(splittedValues[6]);
        setBloodGroups(splittedValues[5]);
        setFirstName(splittedValues[2]);
        setLastName(splittedValues[1]);
        setExpiry(splittedValues[8]);
        if (wifiForm?.unitId === splittedValues[6] && wifiForm?.productCode === splittedValues[7]) {
            setTick(true);
        }
        else {
            setTick(false)
        }
    };

    const handleScanSaveClick = () => {
        if (tick === true) {
            let slipId = compatabilityPdfSlipdata?.data?.slipData?._id
            dispatch(validationSlipUpdate('verified', slipId))
            setScanOpen(false)
            setTick(null);
        }
        else {
            let slipId = compatabilityPdfSlipdata?.data?.slipData?._id
            dispatch(validationSlipUpdate('Not Match', slipId))
            setScanOpen(false)
        }
    }
    return (
        <>
        <Grid item container className={classes.resultGrid}>


            <Grid container xs={12} justifyContent="space-between">

                <Grid item style={{
                    marginLeft: 15,
                    marginTop: 30,
                }} xs={7} className={classes.backButton}>
                    <CustomButton variant="outlined" onClick={handleBackClick}>
                        Back
                    </CustomButton>
                </Grid>

               
                <Grid
                    item
                    xs={4}
                    style={{
                        paddingRight: 25,
                        marginTop: 30,
                        display: 'flex',
                        flexDirection: 'row-reverse'
                    }}
                >
                    <DeviceSelection unitScan={true} />
                </Grid>
            </Grid>

            <Grid container item xs={12} md={12} lg={12}></Grid>
            <Grid container item className={classes.tableGrid}>
                <Grid container item xs={12} lg={12} md={12} className={classes.minHeight}>
                    <Grid container item>

                        <Grid container item xs={7} style={{ display: 'flex', justifyContent: 'space-evenly' }}></Grid>
                        <Grid item xs={5} className={classes.addUnitsButton}>
                            {/*<Grid item lg={3} xs={4}>*/}
                            {/*    <CustomButton fullWidth variant="contained" color="primary" onClick={handleOpen}>*/}
                            {/*        {CONSTANTS.ADD}*/}
                            {/*    </CustomButton>*/}
                            {/*</Grid>*/}
                            <Dialog
                                open={id === 'emergency' ? emergencyDialogOpen : scanOrManualOpen}
                                maxWidth="sm"
                                PaperProps={{
                                    style: {
                                        borderRadius: 10,
                                        padding: 20
                                    }
                                }}
                            >
                                <DialogTitle>
                                    <Typography color="primary" component="span" variant="h5">
                                        {CONSTANTS.PLEASE_SCAN_BAR_CODE_OR_ENTER_MANUALLY}
                                    </Typography>
                                </DialogTitle>
                                <DialogContent>
                                    <Grid container item xs={12} lg={12} md={12} spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={10}>
                                                    <Typography className={classes.labelColor}>
                                                        {CONSTANTS.UNIT_ID_NUMBER} *
                                                    </Typography>
                                                    <CustomInput
                                                        error={unitIdError}
                                                        helperText={unitIdError && unitIdErrorText}
                                                        bgColor="white"
                                                        variant="outlined"
                                                        fullWidth
                                                        textTransform="uppercase"
                                                        value={unitId}
                                                        onChange={handleUnitId}
                                                        onFocus={() => {
                                                            setUnitIdError(false);
                                                        }}
                                                        onBlur={
                                                            (unitId?.length < 15 && check?.length === 0) ||
                                                                (unitId?.includes(' ') && check?.length === 0)
                                                                ? () => {
                                                                    setUnitIdError(true);
                                                                    setUnitIdErrorText(
                                                                        'Invalid Unit ID, Length Should Be Minimum 15 Charecters'
                                                                    );
                                                                }
                                                                : null
                                                        }
                                                        focus={true}
                                                        inputRef={unitIdRef}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography className={classes.labelColor}>
                                                        {CONSTANTS.LABEL_CHECK} *
                                                    </Typography>
                                                    <CustomInput
                                                        error={unitIdError}
                                                        inputRef={checkRef}
                                                        bgColor="white"
                                                        variant="outlined"
                                                        fullWidth
                                                        textTransform="uppercase"
                                                        value={check}
                                                        onChange={handleCheck}
                                                        onFocus={() => setUnitIdError(false)}
                                                        disabled={disableCheck}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item container xs={12}>
                                            <Typography className={classes.addUnitsDialogLabels}>
                                                {CONSTANTS.PRODUCT_CODE} *
                                            </Typography>

                                            <AutoComplete
                                                options={options?.data || []}
                                                freeSolo
                                                productCodeOpen={productCodeOpen}
                                                value={productCode}
                                                description={'isbtdescription'}
                                                title={'code'}
                                                label={'enter'}
                                                onChange={(e, value) => onChangeAutoComplete(e, value)}
                                                handleAutoCompleteChange={handleAutoCompleteChange}
                                                handleClickAway={handleClickAway}
                                                onFocus={() => setProductCodeError(false)}
                                                errorText={productCodeError ?? productCodeError}
                                                autoCompleteError={productCodeError}
                                                fullWidth
                                                disabled={disableProductCode}
                                                inputRef={productCodeRef}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        container
                                        alignItems="center"
                                        className={classes.margTop}
                                        item
                                        lg={12}
                                        md={12}
                                    ></Grid>
                                    <Grid item xs={12} className={classes.commentsGrid}>
                                        <Typography className={classes.addUnitsDialogLabels}>
                                            {CONSTANTS.COMMENTS}
                                        </Typography>

                                        <CustomInput
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                            fullWidth
                                            inputRef={commentRef}
                                        />
                                    </Grid>
                                </DialogContent>
                                <DialogActions className={classes.action}>
                                    <CustomButton onClick={onCancelDialog} variant="outlined" color="primary">
                                        {CONSTANTS.CANCEL}
                                    </CustomButton>
                                    <CustomButton
                                        variant="contained"
                                        color="primary"
                                        disabled={
                                            unitIdError ||
                                                check === '' ||
                                                productCode === null ||
                                                settingsData?.general?.barCodeFormat === 'AUSTRALIAN'
                                                ? unitId?.length < 13
                                                : unitId?.length < 15
                                        }
                                        onClick={openAndSave}
                                    >
                                        {CONSTANTS.NEXT}
                                    </CustomButton>
                                    <CustomButton
                                        variant="contained"
                                        color="primary"
                                        disabled={
                                            unitIdError ||
                                                check === '' ||
                                                productCode === null ||
                                                settingsData?.general?.barCodeFormat === 'AUSTRALIAN'
                                                ? unitId?.length < 13
                                                : unitId?.length < 15
                                        }
                                        onClick={closeAndsave}
                                    >
                                        {CONSTANTS.COMPLETE}
                                    </CustomButton>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>

                    <Grid item container xs={11} md={12} lg={12}>
                        <TableContainer className={classes.tableContainer}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {[
                                            CONSTANTS.UNIT_ID,
                                            'Blood Group',
                                           
                                                'Product Code',
                                            'Product Name',
                                            'Expiry Date Time',
                                           
                                            CONSTANTS.ACTIONS
                                        ].map((item, index) => (
                                            <TableCell key={index} className={classes.tableHeadCell} style={{ fontSize: '16px', textAlign: 'center' }}>
                                                {item }
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                  
                                        {/*  <>
                                            <TableRow  style={{ height: '50px' }}>

                                            <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }}>Z123456789456</TableCell>
                                            <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }}>O Negative</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }}>Robert</TableCell>
                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} >Smith</TableCell>
                                            <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }}>RED CELLS In SAG-M Leucocyte Depleted	</TableCell>


                                            <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} >11-Apr-2024 23:59</TableCell>
                                            <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} >Assigned</TableCell>

                                                <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} >

                                                  
                                                <Grid item xs={2}
                                                    md={2}>
                                                    <IconButton
                                                        onClick={handleDialogOpen}
                                                    >
                                                        <Tooltip title="Scan Badge">
                                                            <WifiTetheringIcon

                                                                color={ 'primary' }
                                                            />
                                                        </Tooltip>
                                                    </IconButton>
                                                </Grid>
                                                </TableCell>
                                            </TableRow>
                                       </>*/}
                                        {unitsTable?.map((currentUnit, indexm) => (
                                            <>
                                                <TableRow
                                                    key={indexm}
                                                >
                                                   
                                                    {[
                                                        'unitId',
                                                        'bloodGroup',
                                                        
                                                        'productCode',
                                                         'description',
                                                        'expiryDate',
                                                        //'tableDRdate'
                                                    ].map((item, index) => (
                                                        <TableCell
                                                            key={index}
                                                            style={{
                                                                fontSize: 17,
                                                                width: item === 'productCode' ? '9%' : null,
                                                                padding: 1
                                                            }}
                                                        >
                                                            {item === 'productCode' ? (
                                                                currentUnit[item]
                                                            ) : item === 'expiryDate' ? (
                                                                currentUnit[item] === null ? (
                                                                    ''
                                                                ) : (
                                                                    moment(currentUnit[item]).format('DD-MM-YYYY HH:mm')
                                                                )
                                                            ) : item === 'tableDRdate' ? (
                                                                currentUnit[item] === null || isNaN(new Date(currentUnit[item])) ? '-' :
                                                                    new Date(currentUnit[item]).toLocaleDateString('en-GB')
                                                            ) : currentUnit[item]}
                                                        </TableCell>
                                                    ))}

                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} >


                                                        <Grid item xs={2}
                                                            md={2}>
                                                            <IconButton
                                                                //onClick={handleDialogOpen}
                                                                onClick={(e) => handleDialogOpen(e, currentUnit)} 
                                                            >
                                                                <Tooltip title="Scan Badge">
                                                                    <WifiTetheringIcon

                                                                        color={'primary'}
                                                                    />
                                                                </Tooltip>
                                                            </IconButton>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Grid container item xs={12} lg={12} md={12}>
                    <Grid item container className={classes.assignAndBackBtns}>
                        {/*<Grid item lg={1} xs={4}>*/}
                        {/*    <CustomButton*/}
                        {/*        variant="contained"*/}
                        {/*        disabled={unitsTable.length === 0}*/}
                        {/*        fullWidth*/}
                        {/*        size="medium"*/}
                        {/*        onClick={handleClear}*/}
                        {/*        color="secondary"*/}
                        {/*    >*/}
                        {/*        ClearAll*/}
                        {/*    </CustomButton>*/}
                        {/*</Grid>*/}
                        {/*<Grid item lg={1} xs={4} style={{ marginLeft: '16px' }}>*/}
                        {/*    <CustomButton*/}
                        {/*        disabled={unitsTable.length === 0}*/}
                        {/*        variant="contained"*/}
                        {/*        fullWidth*/}
                        {/*        size="medium"*/}
                        {/*        onClick={handleCompleteMoveIn}*/}
                        {/*        color="primary"*/}
                        {/*    >*/}
                        {/*        Submit*/}
                        {/*    </CustomButton>*/}
                        {/*</Grid>*/}

                        <Dialog
                            open={unitIdAssigned}
                            className={classes.dialogZindex}
                            PaperProps={{
                                style: {
                                    paddingTop: 0,
                                    padding: 20,
                                    paddingBottom: 10,
                                    width: 550,
                                    borderRadius: 10,
                                    textAlign: 'center'
                                }
                            }}
                        >
                            <DialogContent className={classes.unitNotAvailable}>
                                <Grid className={classes.unitsNotAvailableTitle}>
                                    <ErrorIcon className={classes.errorIcon} />
                                </Grid>
                                {CONSTANTS.UNIT_NOT_AVAILABLE}
                            </DialogContent>
                            <DialogContent className={classes.fontSize16}>
                                <span>{CONSTANTS.UNIT} </span>
                                <span className={classes.assignedUnitColor}>{commonUnitId} </span>
                                <span> {CONSTANTS.HAS_ALREADY_ASSIGNED}</span>
                            </DialogContent>
                            <DialogActions className={classes.dialogActions}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.dialogButton}
                                    onClick={() => setUnitIdAssigned(false)}
                                >
                                    {CONSTANTS.UNDERSTOOD}
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {alert && (
                            <Alert
                                open={alert}
                                message={postUnitResponse?.status === true ? postUnitResponse?.message : error}
                                duration={1500}
                                onClose={handleAlert}
                                vertical={'bottom'}
                                horizontal={'center'}
                                severity={postUnitResponse?.status === true ? 'success' : 'error'}
                                actions={false}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
            </Grid>

            <Dialog
                maxWidth="lg"
                PaperProps={{
                    style: {
                        borderRadius: '10px',
                        //backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                        padding: 20,
                        width: '600px'
                    }
                }}
                open={scanOpen}
                onClose={handleClose}
            >
                <DialogTitle>
                    <Typography variant="contained" color="primary">
                        Scan Compatability slip here
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid item xs={12} >
                        {/*<Grid item lg={6} className={classes.inputField}>*/}
                        {/*    <TextField*/}
                        {/*        label="Scan Compatability slip here"*/}
                               
                        {/*    />*/}
                        {/*</Grid>*/}
                        <Grid
                            item
                            xs={12}
                            md={6}
                            className={classes.inputField}
                        //key={input.name}
                        >
                            <InputLabel className={classes.inputLabel}>Scan here</InputLabel>
                            <CustomInput
                                value={scanValue}
                                onChange={(e) => handlePaste(e.target.value)} 
                                fullWidth
                                style={{ width: 300 }}
                                className={classes.textField}
                                size="lg"
                            />

                        </Grid>
                        <Grid style={{marginTop:'25px'} }></Grid>
                        <Grid  >
                           
                                <table className="table">
                                    <tr>
                                        <td className={classes.cardHead}>
                                            Unit ID :
                                        </td>
                                        <td className={classes.cardDetail}>
                                        {unitIds}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className={classes.cardHead}>
                                            Product Group :
                                        </td>
                                        <td className={classes.cardDetail}>
                                            RED CELLS In SAG-M Leucocyte Depleted	
                                        </td>
                                    </tr>

                                    <>
                                        <tr>
                                            <td className={classes.cardHead}>
                                                Blood Group :
                                            </td>
                                            <td className={classes.cardDetail}>
                                            {bloodGroups }
                                            </td>
                                        </tr>

                                        {/*<tr>*/}
                                        {/*    <td className={classes.cardHead}>*/}
                                        {/*        Dereservation Date :*/}
                                        {/*    </td>*/}
                                        {/*    <td className={classes.cardDetail}>*/}
                                        {/*        11-Apr-2024 23:59*/}
                                        {/*    </td>*/}
                                        {/*</tr>*/}
                                        <tr>
                                            <td className={classes.cardHead}>
                                                Expiry Date :
                                            </td>
                                            <td className={classes.cardDetail}>
                                            {expiry}
                                            </td>
                                        </tr>
                                    </>
                                </table>
                          
                        </Grid>

                        <Grid style={{ marginLeft: '25px' }}></Grid>
                        {tick === true ?
                            <Grid style={{ alignItems: 'center', }}>
                                <CheckCircleOutlineIcon
                                    style={{
                                        color: 'green',
                                        width: '3em',
                                        height: '3em',
                                        alignItems: 'center',
                                        marginLeft: '140px'
                                    }}
                                />
                                <Typography style={{ color: '#218c74', fontSize: '39px' }} variant="h5" color="green" width='50px'>
                                    Compatibility slip matched </Typography>
                            </Grid>
                            : tick === false ? 
                            <Grid style={{ alignItems: 'center', }}>
                                <CancelOutlined
                                    style={{
                                        color: 'red',
                                        width: '3em',
                                        height: '3em',
                                        alignItems: 'center',
                                        marginLeft: '140px'
                                    }}
                                />
                                    <Typography variant="h5" color="error" width='60px' style={{ fontSize: '39px' }}>
                                        Compatibility slip not matched </Typography>
                                </Grid>
                                :null
                        }
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', padding: '15px' }}>
                            <CustomButton variant="contained" onClick={handleClose}>
                                Cancel
                            </CustomButton>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
                            <CustomButton variant="contained" color="primary"
                            onClick={handleScanSaveClick}
                            >
                                Save
                            </CustomButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>



            </>
    );
};

export default RfidValidation;
