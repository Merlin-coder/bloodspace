import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Grid,
    TextField,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Dialog,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    DialogTitle,
    IconButton,
    useMediaQuery,
    Tooltip,
    TableHead,
    CircularProgress
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from './style';
import { unitTable } from './../assign/DummyData';
import ErrorIcon from '@material-ui/icons/Error';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { clearBatchIdSearch, getBatchSearch } from '../../redux/actions/assignUnit/unitIdSearchAction';
import DateTimePicker from '../../components/date-time-picker/date-time-picker.container';
import CustomInput from '../../components/inputfeild';
import CustomButton from '../../components/button';
import unitIdResponse from '../../JSON/unitIdResponse.json';
import CONSTANTS from '../../common/constants';
import CheckboxComponent from '../../components/checkbox/checkbox.container';
import deviceGroupType from '../../JSON/JDeviceGroup.json';
import SelectOption from 'components/select';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createAlert, getDropDown, get4thDropdown, getSettings } from 'redux/actions';
import { Alert, DatePicker } from 'common';
import TagIdReader from 'components/TagIdReader';
import DeviceSelection from 'components/socketDeviceSelection/socketDeviceSelection';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import { postAssignBatch } from 'redux/actions/assignBatch';
import { clearAssociateBatchPost } from 'redux/actions/associateBatch';
import {
    assignLocalDataAction, socketAssociateBulkData, socketDevice,
    socketDeviceValue,
    socketDeviceConnection,
    lFDeviceMethod,
    SocketScanData,
    socketDeviceToken,
    socketDeviceStatus
} from 'redux/actions/socketAction';
import { sortDropdown } from 'common/services/compare';
import AddAutoComplete from 'pages/associate-batch/autoComplete';

const Batch = (props) => {
    const { deviceWriteTagValidation } = useSelector((state) => state.deviceWriteTag);
    const [activeDevices, setActiveDevices] = useState([]);
    const [selectedDevicesValue, setSelectedDevicesValue] = useState('');

    const {
        feilds,
        feildNames,
        handleTableDate,
        unitIdAssigned,
        setUnitIdAssigned,
        check,
        checkRef,
        handleUnitId,
        handleCheck,
        error,
        alert,
        setAlert,
        postUnitResponse,
        postUnitLoading,
        handleAssignedCount,
        disableCheck,
        handleDeleteCount,
        handleAddCount,
        batchError,
        seriesError,
        disabled,
        recipientId
    } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const [assignable, setAssignable] = useState([]);
    console.log('assignable', assignable);

    const maxWidth1280 = useMediaQuery('(max-width:1280px)');
    const maxWidth1040 = useMediaQuery('(max-width:1280px)');
    const maxWidth600 = useMediaQuery('(max-width:600px)');
    const location = useLocation();
    const history = useHistory();
    const [successTags, setSuccessTags] = useState([]);
    const [gtinTable, setGtinTable] = useState([]);
    console.log('g----', gtinTable);
    const [barcodeNumber, setBarcodeNumber] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [recursiveUpdate, setRecursiveUpdate] = useState({});
    const [currentInputFeild, setCurrentInputFeild] = useState('');
    const [batchNumberFeild, setBatchNumberFeild] = useState('');
    //const [availableCount, setAvailableCount] = useState(0);
    const [checkedRows, setCheckedRows] = useState(['All']);
    const [enableNext, setEnableNext] = useState(false);
    const [rfidSearch, setRfidSearch] = useState(false);
    const [gtinSearch, setGtinSearch] = useState(false);
    const [assignLoading, setAssignLoading] = useState(false);
    const rfidNumberRef = useRef();
    const gtinNumberRef = useRef();
    const expiryDateRef = useRef();
    const tableDRdateRef = useRef();
    const batchNumberRef = useRef();
    const serialNumberRef = useRef();
    //const countRef = useRef();
    const commentRef = useRef();
    const unitIdRef = useRef();
    let currentItem = JSON.parse(localStorage.getItem('recipientData'));
    const userData =
        currentItem?.data && currentItem?.data?.find((item) => item['_id'] === location.pathname.split('/').pop());
    const headerData = userData && Object.keys(userData).includes('recipientId') ? userData.recipientId[0] : userData;
    const [selectedItem, setSelectedItem] = useState(headerData || []);
    const [gtinError, setGtinError] = useState('');
    const [unitId_id, setUnitId_id] = useState('');
    const [gtinNumber, setGtinNumber] = useState('');
    const [batchNumber, setBatchNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [batchProductId, setBatchProductId] = useState('');
    const [sequenceNo, setSequenceNo] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [tableDRdate, setTableDRdate] = useState('');
    const { token } = useSelector((state) => state.getSocketDeviceToken);
    const [unitIdErrorText, setUnitIdErrorText] = useState('');
    const [manualEntry, setManualEntery] = useState(true);
    //const [count, setCount] = useState(0);
    //const [countError, setCountError] = useState(false);
    //const [countErrorText, setCountErrorText] = useState('');
    const [tableDRdateError, setTableDRdateError] = useState(false);
    const [sameDereservation, setSameDereservation] = useState(false);
    const [dereservationDate, setDereservationDate] = useState(null);
    const [productCodeOpen, setProductCodeOpen] = useState(false);
    const [unitId, setUnitId] = useState('');
    const [productCode, setProductCode] = useState(null);
    const [productCodeError, setProductCodeError] = useState(false);
    const [formData, setFormData] = useState({ batchProduct: '' });
    const { options } = useSelector((state) => state.getDropDown);
    const [comments, setComments] = useState('');
    const { device } = useSelector((state) => state.getSocketDevice);
    const { value } = useSelector((state) => state.getSocketDeviceValue);
    const [unitIdError, setUnitIdError] = useState(false);
    const [deviceGroup, setDeviceGroup] = useState('');
    const [emergencyDialogOpen, setEmergencyDialogOpen] = useState(true);
    const { assignBatchLoading, assignBatchResponse, assignBatchError } = useSelector(
        (state) => state.assignBatchStore
    );
    const { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    const socket = useSelector((state) => state.socketReducer.socket);
    const { devicestatus } = useSelector((state) => state.getSocketDeviceStatus);
    console.log('devicestatusAssibnbatch', devicestatus);
    const { userInfo } = useSelector((state) => state.userLogin);
    let { lisenbatchData } = useSelector((state) => state.passingAssociatePropStore);
    const { options4 } = useSelector((state) => state.get4thDropdown);
    console.log('options4---', options4);

    const { batchIdLoading, batchIdData } = useSelector((state) => state.getBatchIdSearch);
    console.log('data____', batchIdData);


    const data = location?.state?.data || [];
    const tableData =
        data?.length > 0
            ? data?.map((ele) => {
                  console.log('ele----', ele);
                  return {
                      gtinNumber: ele?.gtinNumber,
                      batchNumber: ele?.batchNumber || 'No Batch',
                      serialNumber: ele?.serialNumber || 'No Serial Number',
                      expiryDate: ele?.expiryDate,
                      tableDRdate: ele?.dereservationDateAndTime,
                      rfidNumber: ele?.rfidNumber,
                      sequenceNo: ele?.sequenceNo,
                      refskuId: ele?._id
                  };
              })
            : [];
    console.log('tableData', tableData);
    const [scanOrManualOpen, setScanOrManualOpen] = useState(false);
    const [unitsTable, setUnitsTable] = useState(tableData);
    console.log('unitstable', unitsTable);
    const [commonUnitId, setCommonUnitId] = useState([]);

    const apiResponse = useSelector((state) => state.getData);
    const { loading, responseData } = apiResponse;
    const [checkAll, setCheckAll] = useState(true);
    const onFormChange = (e) => {
        setFormData({ ...formData, batchProduct: e.target.value });
    };

    useEffect(() => {
        if (formData?.batchProduct) {
            let tempBatchId =
                options?.data?.filter((item) => item?.name === formData?.batchProduct)[0]?._id ||
                formData?.batchProduct;
            setBatchProductId(tempBatchId);
            console.log("FormData:", formData);
        }
    }, [formData]);

    useEffect(() => {
        dispatch(getSettings('setting'));
    }, []);

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const checkCommonUnitIds = () => {
        const currentUnitIds = unitTable.map((item) => item.unitId);
        const assignedUnitIds = unitIdResponse.data_array.map((item) => item.unitId);
        let matcheIds = assignedUnitIds.filter((assigned) => currentUnitIds.includes(assigned));
        if (matcheIds.length > 0) {
            setCommonUnitId(matcheIds[0]);
            setUnitIdAssigned(true);
        } else {
            setDialogOpen(true);
        }
    };

    const id = location.pathname.split('/')[4];

    function hours_48_From_Now(dt = new Date()) {
        return new Date(dt.setDate(dt.getDate() + 2));
    }

    //function getDreservationDatetime(productgroupId, dt = new Date()) {
    //    //console.log("set---", settingsData)
    //    let datas = settingsData?.batchDereservation?.filter((obj) => obj.productgroupId === productgroupId);
    //    console.log('datas', datas);
    //    if (datas?.length > 0) {
    //        console.log(dt);
    //        console.log(dt);
    //        const date = moment()
    //            .add(datas[0].dereservationTime.Hours, 'hour')
    //            .add(datas[0].dereservationTime.Minutes, 'minute');
    //        console.log(date);

    //        return date;
    //    } else {
    //        return new Date(dt.setDate(dt.getDate() + 2));
    //    }
    //}

    const handleBack = () => {
        history.push('/dashboard/barcodeentry');
    };
    const handleDelete = (index) => {
        gtinTable.splice(index, 1);
        setGtinTable([...gtinTable]);
    };

    const handleChangeSelect = (e) => {
        setDeviceGroup(e.target.value);
    };

    const handleOpen = () => {
        setScanOrManualOpen(true);
        setEmergencyDialogOpen(true);
        setGtinNumber('');
        setBatchNumber('');
        setBatchProductId('');
        setExpiryDate('');
        setRecursiveUpdate({});
        setTableDRdate('');
        setTableDRdateError(false);
    };

    const onCancelDialog = () => {
        setRfidSearch(false);
        setGtinSearch(false);
        setCurrentInputFeild('');
        setUnitId('');
        //setFormData('');
        setBatchNumber('');
        setGtinNumber('');
        setTableDRdate('');
        setBatchProductId('');
        setExpiryDate('');
        setUnitIdError(false);
        setTableDRdateError(false);
        setGtinError('');
        setRecursiveUpdate(null);
        //setAvailableCount(0);
        setScanOrManualOpen(false);
        setEmergencyDialogOpen(false);
    };

    const { dateFormat } = useSelector((state) => state.dateFormat);

    const handleInRecursiveWay = (e, barCodeObject) => {
        if (e?.startsWith('01') && e.length >= 1) {
            barCodeObject['rfidNumber'] = e.substring(2, 16);

            let tempE = e.substr(16);
            if (tempE.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        } else if (e?.startsWith('01') && e.length >= 16) {
            barCodeObject['gtinNumber'] = e.substring(2, 16);

            let tempE = e.substr(16);
            if (tempE.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        } else if (e?.startsWith('21') && e.length >= 14) {
            barCodeObject['serialNumber'] = e.substring(2, 14);
            let tempE = e.substring(14);
            if (tempE.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        } else if (e?.startsWith('17') && e.length >= 8) {
            let julianDate = moment(new Date(`${e.substring(4, 6)}-${e.substring(6, 8)}-${e.substring(2, 4)}`)).format(
                'YYYY-MM-DD'
            );
            // let julianDate = moment(new Date('05-11-18')).format('YY/MM/DD');
            barCodeObject['expiryDate'] = julianDate;
            let tempE = e.substring(8);
            if (tempE.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        } else if (e?.startsWith('10') && e.length >= 12) {
            barCodeObject['batchNumber'] = e.substring(2, 12);
            let tempE = e.substring(12);
            if (tempE.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        }
    };

    const handleBackClick = () => {
        if (history.location.pathname === '/dashboard/batch-barcode-entry') {
            history.goBack();
        } else {
            history.push('/dashboard');
        }
    };

    const handleActionChange = (event) => {
        setSelectedAction(event.target.value);
    };

    const genericEmit = (data) => {
        console.log(data, 'genericEmit method in device selection');
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

    useEffect(() => {
        if (assignBatchResponse?.status) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: assignBatchResponse.message,
                    alertType: 'success'
                })
            );
            setDialogOpen(false);
            console.log('Rescan Triggered', data);
            // Rescan functionality added
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: 'E129',
                payload: {
                    userName: userInfo.data.user.username,
                    method: 'E129',
                    type: 'Associate'
                }
            });
        } else {
            dispatch(clearAssociateBatchPost());
        }
        if (assignBatchError) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: assignBatchError?.error || assignBatchError?.errorMessage,
                    alertType: 'error'
                })
            );
            setDialogOpen(false);
            dispatch(clearAssociateBatchPost());
        }
        return () => {
            dispatch(clearAssociateBatchPost());
        };
    }, [assignBatchResponse, assignBatchError]);

    const handleAssign = () => {
        let newTable = [...gtinTable];

        newTable = newTable?.map((item) => {
            console.log('item===', item);
            if (id === 'emergency') {
                return {
                    refskuId: item?.refskuId,
                    dereservationDateAndTime: moment(item?.tableDRdate).format('yyyy/MM/DD hh:mm'),
                    'track-code': 'BS-TR-5113',
                    comments: item?.comment ? item?.comment : 'No comments',
                    name: 'Emergency Assigned'
                };
            } else if (item.check) {
                console.log('ellseSequence', item);
                return {
                    recipientId: location.pathname.split('/').pop(),
                    batchId: item?._id,
                    gtinNumber: item?.gtinNumber,
                    //count: parseInt(item?.count),
                    dereservationDateAndTime: moment(item.tableDRdate).format('yyyy/MM/DD hh:mm'),
                    'track-code': 'BS-TR-5103',
                    comments: item?.comment ?? 'No comments',
                    sequenceNo: item?.sequenceNo
                };
            }
        });

        let validData = newTable?.filter((item) => item);
        let formData = JSON.stringify(validData);

        dispatch(postAssignBatch(formData));
    };

    const handleBatchInput =async (e, field) => {
        let filterKey = [{ key: 'rfidNumber', value: e }];
        if (field !== currentInputFeild) {
           
            setCurrentInputFeild(field);
        }
       
        if (field === 'rfidNumber' && e.length <= 20) {
            dispatch(getBatchSearch('assignBatches', JSON.stringify(filterKey)));
            setRecursiveUpdate((prev) => ({
                ...prev, [field]: e
               
            }));
        }
        console.log(`${field}:`, e);
    };


    //const handleSave = () => {
    //    // confirm("called")
    //    sameDereservation ? handleDeresrvationDate(sameDereservation) : null;
    //    rfidNumberRef.current.value = '';
    //    gtinNumberRef.current.value = '';
    //    // batchNu.current.value=""
    //    batchNumberRef.current.value = '';
    //    serialNumberRef.current.value = '';
    //    //countRef.current.value = '';
    //    setRecursiveUpdate(null);
    //    //setAvailableCount(0);
    //};

    //const handleDeresrvationDate = (e) => {
    //    const checked = e?.target ? e.target.checked : e;
    //    const dateNtime = tableDRdate ? tableDRdate : unitsTable[0]?.tableDRdate;
    //    const newunitsTable = unitsTable.map((i) => ({ ...i, tableDRdate: dateNtime }));
    //    checked === true ? unitsTable.splice(0, unitsTable.length, ...newunitsTable) : null;
    //    checked === true ? setUnitsTable([...unitsTable]) : null;
    //    e?.target ? setSameDereservation(!sameDereservation) : null;
    //};

    //const handleDate = (e) => {
    //    if (!(e?.getTime() < new Date().getTime())) {
    //        setTableDRdate(e);
    //        setTableDRdateError(false);
    //    }
    //};

    const handleSequence = (e) => {
        setSequenceNo(e.target.value);
        console.log('sequenceNo', sequenceNo);
    };

    useEffect(() => {
        let tempAssignable = [];

        tempAssignable = unitsTable?.filter(
            (item) => item.check === true && item.associated === true && item.assigned === false
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


    const handleSequenceChange = (e, index) => {
        console.log(' handleSequenceChange ' + e);

        let sequenceNoExists = false;
        gtinTable[index].sequenceError = false;
        gtinTable.map((i) => {
            if (i.sequenceNo === e.target.value) {
                sequenceNoExists = true;
            }
        });

        if (sequenceNoExists) {
            gtinTable[index].sequenceError = true;
        }
        gtinTable[index].sequenceNo = e.target.value;
        setGtinTable([...gtinTable]);

        setUnitId('');
        setBatchProductId('');
        setBatchNumber('');
        setGtinNumber('');
        setTableDRdate('');
        setExpiryDate('');

    };

    const closeAndsave = () => {
        // Update state values to reflect the input fields
        setScanOrManualOpen(false);
        setRfidSearch(false);
        setGtinSearch(false);

        rfidNumberRef.current.focus();
        gtinNumberRef.current.focus();

        if (recursiveUpdate?.rfidNumber === undefined || recursiveUpdate?.rfidNumber === null || recursiveUpdate?.rfidNumber === '') {
            setUnitIdError('RFID Number Required');
            return;
        } else {
            setUnitIdError(null);
        }

        if (gtinNumber === undefined || gtinNumber === null || gtinNumber === '') {
            setGtinError('GTIN Number Required');
            return;
        } else {
            setGtinError(null);
        }

        const newGtinEntry = {
            rfidNumber: recursiveUpdate.rfidNumber,
            gtinNumber: gtinNumber,
            batchNumber: batchNumber,
            expiryDate: expiryDate,
            batchProductId: batchProductId,
            tableDRdate: tableDRdate,
        };

        if (gtinTable?.findIndex((item) => item?.gtinNumber === gtinNumber) !== -1) {
            setGtinError('GTIN Number Exists in Table');
            return;
        }

        setGtinTable([...gtinTable, newGtinEntry]);

        setFormData({ ...formData, batchProductId: '' });
        //setGtinNumber('');
        //setBatchNumber('');
        //setBatchProductId('');
        //setExpiryDate('');
        //setRecursiveUpdate({})
        //setTableDRdate('');
        //setTableDRdateError(false);
    };

    useEffect(() => {
        if (recursiveUpdate?.gtinNumber) {
            setGtinError('');
            console.log("recursiveUpdate:", recursiveUpdate);
        }
    }, [recursiveUpdate]);

    //const openAndSave = () => {
    //    setGtinSearch(false);
    //    setCurrentInputFeild(false);
    //    gtinNumberRef.current.focus();

    //    if (gtinTable?.findIndex((item) => item?.gtinNumber === recursiveUpdate?.gtinNumber) !== -1) {
    //        setGtinError('GTIN Number Exists in Table');
    //    } else if (
    //        recursiveUpdate?.gtinNumber === undefined ||
    //        recursiveUpdate?.gtinNumber === null ||
    //        recursiveUpdate?.gtinNumber === ''
    //    ) {
    //        setGtinError('GTIN Number Required');
    //    } else {
    //        let tempGtinTable = [...gtinTable, { ...recursiveUpdate, tableDRdate, batchId: unitId_id }];
    //        setGtinTable(tempGtinTable);
    //        setRecursiveUpdate({ gtinNumber: '', batchNumber: '', serialNumber: '', count: '' });

    //        let invalidDate = String(tableDRdate);

    //        invalidDate !== 'Invalid Date' && tableDRdate?.getTime() > new Date().getTime()
    //            ? handleSave()
    //            : setTableDRdateError(true);
    //    }
    //    setFormData({ ...formData, batchProduct: '' });
    //    dispatch(clearUnitIdSearch());
    //};

    useEffect(() => {
        console.log(' -- Lisen Batch Data --' + lisenbatchData);

        let tempUnits = lisenbatchData.map((i) => {
            console.log('iiiii', i);
            return {
                _id: i?._id,
                gtinNumber: i?.gtinNumber,
                batchNumber: i?.batchNumber,
                serialNumber: i?.serialNumber,
                expiryDate: i?.expiryDate,
                tableDRdate: i?.dereservationDateAndTime,
                rfidNumber: i?.rfidNumber,
                recipientId: i?.recipientId,
                description: i?.description,
                assigned: i?.isAssigned,
                associated: i?.associated,
                sequenceNo: i?.sequenceNo,
                check: true
            };
        });
        //.filter((i) => i?.unitId);
        console.log('----------Gtin Table--', gtinTable);
        console.log('--------------' + tempUnits + '---------------');

        setGtinTable([...tempUnits]);
    }, [lisenbatchData]);

   

    useEffect(() => {
        if (batchIdData?.data && batchIdData.data.length > 0) {
            const firstBatch = batchIdData.data[0];
            if (firstBatch) {
                setBatchNumber(firstBatch.batchNumber);
                console.log("BatchNumber:", firstBatch.batchNumber);
                setGtinNumber(firstBatch.gtinNumber);
                setExpiryDate(firstBatch.expiryDate);
                console.log("expiry:", firstBatch.expiryDate);
                setBatchProductId(firstBatch.batchProductId?.[0]?.name);
                console.log("BatchName:", firstBatch.batchProductId?.[0]?.name);
                const dereservationDate = (firstBatch.dereservationDateAndTime === null || firstBatch.dereservationDateAndTime === '-') ? '-' : firstBatch.dereservationDateAndTime;
                setTableDRdate(dereservationDate);
                console.log("dereserv:", firstBatch.dereservationDateAndTime);
            }
        }
    }, [batchIdData]);

    useEffect(() => {
        if (
            //availableCount === 0 ||
            recursiveUpdate?.gtinNumber === undefined ||
            recursiveUpdate?.batchNumber === undefined ||
            recursiveUpdate?.serialNumber === undefined ||
            //recursiveUpdate?.count === undefined ||
            recursiveUpdate?.expiryDate === undefined ||
            recursiveUpdate?.tableDRdate === undefined ||
            recursiveUpdate?.formData === undefined ||
            //availableCount === undefined ||
            //recursiveUpdate?.count < 1 ||
            //!recursiveUpdate?.count?.match(/^[0-9]*$/) ||
            //parseInt(recursiveUpdate?.count) > availableCount ||
            recursiveUpdate?.rfidNumber?.length < 20 ||
            recursiveUpdate?.serialNumber?.length < 12 ||
            recursiveUpdate?.batchNumber?.length < 10
        ) {
            setEnableNext(false);
        } else {
            setEnableNext(true);
        }

        if (
            gtinTable?.findIndex((item) => item?.rfidNumber === recursiveUpdate?.rfidNumber) === -1 &&
            !rfidSearch &&
            recursiveUpdate?.rfidNumber?.length === 14
        ) {
            let filterKey = [{ key: 'rfidNumber', value: recursiveUpdate?.rfidNumber }];
            if (recursiveUpdate?.rfidNumber) {
                setRfidSearch(true);
                dispatch(getBatchSearch('assignBatches', JSON.stringify(filterKey)));
                setUnitId_id('');
            }
        } else {
            setRfidSearch(false);
            setGtinSearch(false);
            // setUnitIdError(true);
            // setUnitIdErrorText('Unit is Available in Table');
        }
    }, [recursiveUpdate]);

    useEffect(() => {

        console.log("--------------")
        if (options4 && settingsData?.general?.deviceType === 'Manual') {
            const active = options4?.data?.filter((item) => item);
            const sortedData = sortDropdown(active, 'name');
            setActiveDevices(sortedData);

            console.log('sor------',active);
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

            console.log('elsesor---',active);
            // setActiveDevices(active) --- device dropdown was not sorted
            console.log(sortedData.length + " Active Devices -------------")
            if (window.location.pathname === '/dashboard/batch-barcode-entry' || window.location.pathname === '/dashboard/batch-barcode-entry') {
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

    useEffect(() => {
        dispatch(getDropDown('batchproducts'));
    }, []);

    const updateBatchWithRfidSearch = (data) => {
        let tempRecursiveUpdate = { ...recursiveUpdate };
        if (recursiveUpdate?.batchNumber?.length !== 10) {
            tempRecursiveUpdate['batchNumber'] = data.batchNumber;
        }
        if (recursiveUpdate?.serialNumber?.length !== 12) {
            tempRecursiveUpdate['serialNumber'] = data.serialNumber;
        }
        if (recursiveUpdate?.expiryDate?.length !== 10) {
            tempRecursiveUpdate['expiryDate'] = data.expiryDate;
        }
        if (recursiveUpdate?.dereservationDateAndTime?.length !== 10) {
            tempRecursiveUpdate['dereservationDateAndTime'] = data.dereservationDateAndTime;
        }
        setRecursiveUpdate(tempRecursiveUpdate);
        setFormData({ ...formData, batchProduct: data?.batchProductId?.[0]?.name });
    };

    useEffect(() => {
        if (batchIdData?.data?.length === 0) {
            setUnitIdError(true);
            setUnitIdErrorText('No tags associated with this RFID number');
        } else if (batchIdData?.data?.length > 0 && recursiveUpdate?.rfidNumber?.length === 20) {
            setUnitId_id(batchIdData?.data?.[0]?._id);
            setUnitIdError(false);
            setUnitIdErrorText('');
            updateBatchWithRfidSearch(batchIdData?.data?.[0]);
        }
    }, [batchIdData]);

    useEffect(() => {
        if (checkedRows.includes('All')) {
            let tempCheckedRows = gtinTable.map((i) => i.rfidNumber);
            setCheckedRows([...tempCheckedRows, 'All']);
        }
    }, [gtinTable]);

    const handleTableCheck = (e, indexm, unit) => {
        console.log('unit', unit);
        console.log('e--', e);
        console.log('indexm--', indexm);

        gtinTable[indexm].check = e.target.checked ? true : false;
        console.log(gtinTable[indexm]);

        let tempUnitsTable = [...gtinTable];
        tempUnitsTable[indexm].check = e.target.checked ? true : false;

        console.log('tempUnitsTable', tempUnitsTable);
        setGtinTable(tempUnitsTable);
    };

    useEffect(() => {
        if (socket) {
            socket?.on('assignBatchRecipient', (data) => {
                console.log('assignBatchRecipient', data);
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

    const handleTableCheckAll = (e) => {
        let localdata = [];

        gtinTable.forEach((data) => {
            console.log('dta--', data);
            console.log('Is Checked ----------------', data.check);
            if (data?.assigned || !data?.gtinNumber) {
                data.check = true;
            } else {
                data.check = e.target.checked ? true : false;
            }
            localdata.push(data);
        });
        let val = gtinTable.filter((item) => item.check === true);
        if (val.length > 0) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
        console.log('localdata---', localdata);
        setGtinTable(localdata);
    };

    const handleClear = () => {
        genericEmit({
            userName: userInfo?.data?.user?.username,
            deviceToken: token,
            method: 'E119',
            payload: {
                userName: userInfo?.data?.user?.username,
                acknOn: 'ackStopBatchScan'
            }
        });
        setGtinTable([]);
    };

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

    const handleCancleAssign = () => {
        setAssignLoading(false);
        setDialogOpen(false);
    };

    const handleCompleteMoveIn = () => {
        console.log('handleCompleteMoveIn function called');
        let moveInData = [];
        console.log('moveInData:', moveInData);

            socket.emit('generic', {
                method: 'E103',
                token: value?.token,
                payload: {
                    status: true,
                    userName: userInfo.data.user.username,
                    message: 'listen Scanned Data',
                    data: moveInData
                }
            });
            let bloodBag = [];
                bloodBag.push({
                    tagId: recursiveUpdate?.rfidNumber || '',
                    gtinNumber: gtinNumber || '',
                    batchNumber: batchNumber || '',
                    expiryDate: expiryDate,
                    batchProductId: formData?.batchProduct || '',
                    dereservationDate: tableDRdate,
                });
            console.log('Blood Bag:', bloodBag);


            const events = [
                {
                    EventType: 'IN',
                    BloodBags: [],
                    BatchProducts: bloodBag,

                },
                {
                    EventType: 'OUT',
                    BloodBags: [],
                    BatchProducts: bloodBag,
                },
                {
                    EventType: 'INVENTORY',
                    BloodBags: [],
                    BatchProducts: bloodBag,
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
        setUnitId('');
        //setCheck();
        //setDisableCheck(false);
        setProductCode(null);
        /// setTableDRdate(hours_48_From_Now());
        setUnitIdError(false);
        setTableDRdateError(false);
        setProductCodeError(false);
        setScanOrManualOpen(false);
        setGtinTable([]);
    };


    return (
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
                    xs={2}
                    style={{
                        paddingLeft: 25,
                        marginTop: 30,
                    }}
                >
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="action-select-label">Choose an Action</InputLabel>
                        <Select
                            labelId="action-select-label"
                            id="action-select"
                            value={selectedAction}
                            onChange={handleActionChange}
                            label="Choose an Action"
                            minWidth={250}
                            style={{ backgroundColor: 'white', height: '50px' }}
                            inputProps={{
                                style: { backgroundColor: 'white', height: '50px' }
                            }}
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="MOVEIN">MOVE IN</MenuItem>
                            <MenuItem value="MOVEOUT">MOVE OUT</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={2}
                    style={{
                        marginRight: 20,
                        marginTop: 30,
                    }}
                >
                    <SelectOption
                        label="Select Device"
                        onChange={handleDeviceChange}
                        value={device}
                        minWidth={250}
                        disabledLabel={true}
                        options={window.location.pathname === '/dashboard/batch-barcode-entry' ?
                            (Array.isArray(activeDevices) ? activeDevices.filter((dev) => dev?.name !== "Associate Device") : []) :
                            activeDevices}
                        //options={window.location.pathname === '/dashboard/batch-barcode-entry' ? activeDevices?.filter((dev) => dev.name !== "Associate Device") : activeDevices}
                        onOpen={handleOptions}
                        placeHolder={'Select Device'}
                    />
                </Grid>
            </Grid>
            
            <Grid container item xs={12} md={12} lg={12}></Grid>
            <Grid container item className={classes.tableGrid}>
                <Grid container item xs={12} lg={12} md={12} className={classes.minHeight}>
                    <Grid container item>

                        <Grid container item xs={7} style={{ display: 'flex', justifyContent: 'space-evenly' }}></Grid>

                        <Grid item xs={5} className={classes.addUnitsButton}>
                            <Grid item lg={3} xs={4}>
                                <CustomButton fullWidth variant="contained" color="primary" onClick={handleOpen}>
                                    {CONSTANTS.ADD}
                                </CustomButton>
                            </Grid>
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
                                        {'Please scan Batch ID Barcode(s)'}
                                    </Typography>
                                </DialogTitle>
                                <DialogContent>
                                    <Grid container item xs={12} lg={12} md={12} spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1} alignItems="center">

                                                <Grid item xs={12}>
                                                    <Typography className={classes.labelColor}>
                                                        {'Rfid Number'} *
                                                    </Typography>
                                                    <CustomInput
                                                        fullWidth
                                                        error={unitIdError}
                                                        helperText={unitIdError && unitIdErrorText}
                                                        value={currentInputFeild === 'rfidNumber' ? recursiveUpdate.rfidNumber || '' : barcodeNumber || ''}
                                                        onChange={(e) => handleBatchInput(e.target.value, 'rfidNumber')}
                                                        focus={true}
                                                        size="lg"
                                                        inputRef={rfidNumberRef}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography className={classes.labelColor}>
                                                        {'Gtin Number'} *
                                                    </Typography>
                                                    <CustomInput
                                                        fullWidth
                                                        value={gtinNumber}
                                                        onChange={(e) => setGtinNumber(e.target.value)}
                                                        size="lg"
                                                        inputRef={gtinNumberRef}
                                                        disabled={true}
                                                    />
                                                </Grid>

                                            </Grid>
                                        </Grid>

                                        <Grid item container xs={12}>
                                            <Typography className={classes.addUnitsDialogLabels}>
                                                {'Batch Number'} *
                                            </Typography>
                                            <CustomInput
                                                fullWidth
                                                value={batchNumber}
                                                onChange={(e) => setBatchNumber(e.target.value)}
                                                inputRef={batchNumberRef}
                                                disabled={true}
                                            />
                                        </Grid>

                                        <Grid item container xs={12}>
                                            <Typography className={classes.addUnitsDialogLabels}>
                                                {'Expiry Date'} *
                                            </Typography>
                                            <DatePicker
                                                inputVariant={'outlined'}
                                                onChange={(e) => setExpiryDate(e.target.value)}
                                                value={expiryDate}
                                                format="yyyy/MM/dd"
                                                placeholder={batchIdLoading ? 'loading...' : ' '}
                                                width="100%"
                                                padding={'5px'}
                                                size="small"
                                                inputRef={expiryDateRef ?? null}
                                                refuse={'/^(?:&>)(?:[0-9]{10})/gi'}
                                                disablePast={true}
                                                disabled={true}
                                            />
                                        </Grid>

                                        <Grid item container xs={12}>
                                            <Typography className={classes.addUnitsDialogLabels}>
                                                {'Batch Product'} *
                                            </Typography>
                                            <CustomInput
                                                options={options?.data || []}
                                                onChange={(e) => setBatchProductId(e.target.value)}
                                                value={batchProductId}
                                                name="batchProduct"
                                                id="id"
                                                formData={formData}
                                                setFormData={setFormData}
                                                noLabel
                                                fullWidth
                                                currentPlaceHolder="Batch Product Description"
                                                batchProduct={true}
                                                disabled={true}
                                            />
                                        </Grid>

                                        <Grid item container xs={12}>
                                            <Typography className={classes.addUnitsDialogLabels}>
                                                {CONSTANTS.DERESERVATION_DATE + ' & Time'}
                                            </Typography>
                                            <DateTimePicker
                                                inputVariant={'outlined'}
                                                onChange={(e) => setTableDRdate(e.target.value)}
                                                value={tableDRdate}
                                                format="yyyy/MM/dd"
                                                //placeholder={batchIdLoading ? 'loading...' : ' '}
                                                width="100%"
                                                padding={'5px'}
                                                size="small"
                                                inputRef={tableDRdateRef ?? null}
                                                refuse={'/^(?:&>)(?:[0-9]{10})/gi'}
                                                disablePast={true}
                                                disabled={true}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/*<Grid*/}
                                    {/*    container*/}
                                    {/*    alignItems="center"*/}
                                    {/*    className={classes.margTop}*/}
                                    {/*    item*/}
                                    {/*    lg={12}*/}
                                    {/*    md={12}*/}
                                    {/*>*/}
                                    {/*    <Grid item>*/}
                                    {/*        <CheckboxComponent*/}
                                    {/*            className={classes.margTop}*/}
                                    {/*            color="primary"*/}
                                    {/*            handleChange={(e) => handleDeresrvationDate(e)}*/}
                                    {/*        />*/}
                                    {/*    </Grid>*/}

                                    {/*    <Grid item>*/}
                                    {/*        <Typography variant="subtitle2" className={classes.fontSize16Check}>*/}
                                    {/*            {CONSTANTS.SAME_DERESERVATION_DATE}*/}
                                    {/*        </Typography>*/}
                                    {/*    </Grid>*/}
                                    {/*</Grid>*/}

                                    {/*<Grid item xs={12} className={classes.commentsGrid}>*/}
                                    {/*    <Typography className={classes.addUnitsDialogLabels}>*/}
                                    {/*        {CONSTANTS.COMMENTS}*/}
                                    {/*    </Typography>*/}

                                    {/*    <CustomInput*/}
                                    {/*        value={comments}*/}
                                    {/*        onChange={(e) => setComments(e.target.value)}*/}
                                    {/*        fullWidth*/}
                                    {/*        inputRef={commentRef}*/}
                                    {/*    />*/}
                                    {/*</Grid>*/}
                                </DialogContent>
                                <DialogActions className={classes.action}>
                                    <CustomButton onClick={onCancelDialog} variant="outlined" color="primary">
                                        {CONSTANTS.CANCEL}
                                    </CustomButton>
                                    {/*<CustomButton*/}
                                    {/*    variant="contained"*/}
                                    {/*    //disabled={enableNext}*/}
                                    {/*    color="primary"*/}
                                    {/*    onClick={openAndSave}*/}
                                    {/*>*/}
                                    {/*    {CONSTANTS.NEXT}*/}
                                    {/*</CustomButton>*/}
                                    <CustomButton
                                        variant="contained"
                                        //disabled={!enableNext}
                                        color="primary"
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
                                            <>
                                                <TableCell>
                                                    <CheckboxComponent
                                                        label
                                                        handleChange={handleTableCheckAll}
                                                        checked={checkAll}
                                                    />
                                                </TableCell>
                                            </>,
                                            'Rfid Number',
                                            'Gtin Number',
                                            'Batch Number',
                                            'Description',
                                            'Expiry Date',
                                            CONSTANTS.DERESERVATION_DATE,
                                            CONSTANTS.ACTIONS
                                        ].map((item, index) => (
                                            <TableCell key={index} className={classes.tableHeadCell}>
                                                {item === '#' ? '' : item}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gtinTable?.map((currentUnit, indexm) => (
                                        <TableRow
                                            
                                            key={indexm}
                                        >
                                            <TableCell width={'1%'}>
                                                <CheckboxComponent
                                                    color="primary"
                                                    checked={checkAll}
                                                    //checked={selectedRecords.includes(currentUnit.gtinNumber) && currentUnit?.associated}
                                                   
                                                    handleChange={(e) => handleTableCheck(e, indexm, currentUnit)}
                                                />
                                            </TableCell>
                                            {[
                                                'rfidNumber',
                                                'gtinNumber',
                                                'batchNumber',
                                                'batchProductId',
                                                'expiryDate',
                                                'tableDRdate'
                                            ].map((item, index) => (
                                                <>
                                                    <TableCell
                                                        key={index}
                                                        style={{
                                                            fontSize: 17,
                                                            width: item === 'productCode' ? '9%' : null,
                                                            padding: 0
                                                        }}
                                                    >
                                                        {item === 'expiryDate' ? (
                                                            currentUnit[item] === null ? (
                                                                ''
                                                            ) : (
                                                                moment(currentUnit[item]).format('DD-MM-YYYY')
                                                            )
                                                        ) : item === 'tableDRdate' ? (
                                                            currentUnit[item] === null || isNaN(new Date(currentUnit[item])) ? '-' :
                                                                new Date(currentUnit[item]).toLocaleDateString('en-GB')
                                                        ) : currentUnit[item]}
                                                    </TableCell>
                                                </>
                                            ))}
                                            {/*<TableCell width={'10%'} key={indexm}>*/}
                                            {/*    <CustomInput*/}
                                            {/*        fullWidth*/}
                                            {/*        value={currentUnit.sequenceNo}*/}
                                            {/*        onChange={(e) => handleSequenceChange(e, indexm)}*/}
                                            {/*        size="lg"*/}
                                            {/*        disabled={*/}
                                            {/*            currentUnit?.assigned || !currentUnit?.associated ? true : false*/}
                                            {/*        }*/}
                                            {/*    />*/}
                                            {/*    <Grid style={{ color: 'red' }}>*/}
                                            {/*        {currentUnit?.sequenceError === true ? 'Already exists' : ''}*/}
                                            {/*    </Grid>*/}
                                            {/*</TableCell>*/}
                                            <TableCell>
                                                <Grid className={classes.actions}>
                                                    <IconButton
                                                        className={classes.deleteIcon}
                                                        onClick={() => handleDelete(indexm)}
                                                    >
                                                        <DeleteIcon className={classes.delectIconColor} />
                                                    </IconButton>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Grid container item xs={12} lg={12} md={12}>
                    <Grid item container className={classes.assignAndBackBtns}>
                            <Grid item lg={1} xs={4}>
                                <CustomButton
                                    variant="contained"
                                    disabled={gtinTable.length === 0}
                                    fullWidth
                                    size="medium"
                                    onClick={handleClear}
                                    color="secondary"
                                >
                                    ClearAll
                                </CustomButton>
                            </Grid>
                            <Grid item lg={1} xs={4} style={{ marginLeft: '16px' }}>
                                <CustomButton
                                    disabled={gtinTable.length === 0}
                                    variant="contained"
                                    fullWidth
                                    size="medium"
                                    onClick={handleCompleteMoveIn}
                                    color="primary"
                                >
                                    Submit
                                </CustomButton>
                            </Grid>

                        <Dialog
                            open={dialogOpen}
                            className={classes.dialogZindex}
                            PaperProps={{
                                style: {
                                    padding: 30,
                                    paddingBottom: 10,
                                    width: 450,
                                    borderRadius: 10
                                }
                            }}
                        >
                            <DialogContent className={classes.asignConfirmation}>
                                {`${CONSTANTS.ARE_YOU_SURE_WANT_TO_ASSIGN} ${
                                    gtinTable?.filter((element) => element.check === true).length
                                }   ${
                                    gtinTable?.filter((element) => element.check === true).length > 1
                                        ? 'Batches'
                                        : 'Batch'
                                }?`}
                            </DialogContent>
                            <DialogActions className={classes.dialogActions}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.dialogButton}
                                    onClick={handleCancleAssign}
                                >
                                    {CONSTANTS.CANCEL}
                                </Button>
                                <Button
                                    variant="contained"
                                    className={classes.dialogButton}
                                    color="primary"
                                    onClick={handleAssign}
                                    disabled={error}
                                >
                                    {postUnitLoading ? (
                                        <>
                                            {CONSTANTS.ASSIGN}
                                            <CircularProgress color="white" size="20px" />{' '}
                                        </>
                                    ) : (
                                        CONSTANTS.ASSIGN
                                    )}
                                </Button>
                            </DialogActions>
                            {error && (
                                <div className={classes.errorContainer}>
                                    <ErrorIcon className={classes.assignError} />
                                    <Typography variant="body2" className={classes.errorMessage}>
                                        {error}
                                    </Typography>
                                </div>
                            )}
                        </Dialog>
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
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Batch;
