import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { unitTable, searchResults } from 'pages/assign/DummyData';
import UnassignBatchComponent from './unassignbatch.component';
import unitIdResponse from '../../JSON/unitIdResponse.json';
import CONSTANTS from 'common/constants';
import { checkTextSum } from '.././../components/add-unit/add-unit-form/unitIdService';
import { useDispatch, useSelector } from 'react-redux';
import { clearUnitIdSearch, getUnitSearch, getBatchSearch } from '../../redux/actions/assignUnit/unitIdSearchAction';
import { clearPostUnitResponse, postAddUnitData } from '../../redux/actions/assignUnit/addUnitsRecipientActions';
import moment from 'moment';
import { getApplyFilters } from '../../redux/actions/filters/globalFilterAction';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';
import { createAlert, getDropDown, getSettings } from 'redux/actions';
import { postAssignBatch } from 'redux/actions/assignBatch';
import { clearAssociateBatchPost } from 'redux/actions/associateBatch';
import { socketDeviceStatus, bulkScanLoadingAction, socketStartStopScan } from 'redux/actions/socketAction';
import { assignUnitDeviceAction, get4thDropdown, passingAssociateProps, socketResponse, getRecipientCount } from 'redux/actions';

function RecepientPage() {
    const [gtinTable, setGtinTable] = useState([]);
    console.log('g----', gtinTable)
    const [barcodeNumber, setBarcodeNumber] = useState('');
    const [recursiveUpdate, setRecursiveUpdate] = useState({});
    const [currentInputFeild, setCurrentInputFeild] = useState('');
    const [availableCount, setAvailableCount] = useState(0);
    const [checkedRows, setCheckedRows] = useState(['All']);
    const [enableNext, setEnableNext] = useState(false);
    const [gtinSearch, setGtinSearch] = useState(false);
    const [rfidSearch, setRfidSearch] = useState(false);
    const [rfidNumber, setRfidNumber] = useState('');
    const [gtinNumber, setGtinNumber] = useState('');
    const [batchNumber, setBatchNumber] = useState('');
    const [assignLoading, setAssignLoading] = useState(false);
    const gtinNumberRef = useRef();
    const tableDRdateRef = useRef();
    const rfidNumberRef = useRef();
    const expiryDateRef = useRef();
    const batchNumberRef = useRef();
    const serialNumberRef = useRef();
    const countRef = useRef();
    const [gtinError, setGtinError] = useState('');
    const [sequenceNo, setSequenceNo] = useState('');
    const { assignBatchLoading, assignBatchResponse, assignBatchError } = useSelector(
        (state) => state.assignBatchStore
    );
    const { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    // const { validationRequired } = useSelector((state) => state.associateValidation);
    const location = useLocation();
    const history = useHistory();
    const data = location?.state?.data || [];
    const tableData =
        data?.length > 0
            ? data?.map((ele) => {
                console.log('ele----', ele)
                return {
                    gtinNumber: ele?.gtinNumber,
                    batchNumber: ele?.batchNumber || 'No Batch',
                    serialNumber: ele?.serialNumber || 'No Serial Number',
                    expiryDate: ele?.expiryDate,
                    //tableDRdate: hours_48_From_Now(),
                    tableDRdate: ele?.isAssigned
                        ? ele?.dereservationDateAndTime
                        : '-',
                    sequenceNo: ele?.sequenceNo,
                    refskuId: ele?._id,
                    assigned: ele?.isAssigned,
                    check: ele?.isAssigned || ele?.isAssociated ? false : true
                };
            })
            : [];
    console.log('tableData', tableData)
    const [scanOrManualOpen, setScanOrManualOpen] = useState(false);
    const [unitsTable, setUnitsTable] = useState(tableData);
    console.log('unitstable', unitsTable)
    const [commonUnitId, setCommonUnitId] = useState([]);
    const [unitIdAssigned, setUnitIdAssigned] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sameDereservation, setSameDereservation] = useState(false);
    const [unitId, setUnitId] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [tableDRdate, setTableDRdate] = useState('');
    const [unitIdError, setUnitIdError] = useState(false);
    const [productCode, setProductCode] = useState(null);
    const [productCodeError, setProductCodeError] = useState(false);
    const [comments, setComments] = useState('');
    const [unitId_id, setUnitId_id] = useState('');
    const [unitIdErrorText, setUnitIdErrorText] = useState('');
    const [manualEntry, setManualEntery] = useState(true);
    const [count, setCount] = useState(0);
    const [countError, setCountError] = useState(false);
    const [countErrorText, setCountErrorText] = useState('');
    const [formData, setFormData] = useState({ batchProduct: '' });
    const [batchProductId, setBatchProductId] = useState('');
    const { options } = useSelector((state) => state.getDropDown);

    const [disableCheck, setDisableCheck] = useState(false);
    const commentRef = useRef();
    const unitIdRef = useRef();
    const socket = useSelector((state) => state.socketReducer.socket);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
    const { devicestatus } = useSelector((state) => state.getSocketDeviceStatus)
    console.log("devicestatusAssibnbatch", devicestatus);
    const { userInfo } = useSelector((state) => state.userLogin);
    let { lisenbatchData } = useSelector((state) => state.passingAssociatePropStore);
    let currentItem = JSON.parse(localStorage.getItem('recipientData'));
    const userData =
        currentItem?.data && currentItem?.data?.find((item) => item['_id'] === location.pathname.split('/').pop());
    const headerData = userData && Object.keys(userData).includes('recipientId') ? userData.recipientId[0] : userData;
    const [selectedItem, setSelectedItem] = useState(headerData || []);
    const [checkAll, setCheckAll] = useState(true);
    // const [selectedItem, setSelectedItem] = useState(
    //     currentItem.data && currentItem.data.find((item) => item['_id'] === location.pathname.split('/').pop())
    // );
    const onFormChange = (e) => {
        setFormData({ ...formData, batchProduct: e.target.value });
        // handleValidation();
    };

    useEffect(() => {
        setGtinTable(tableData)
    }, [selectedItem])

    useEffect(() => {
        if (formData?.batchProduct) {
            let tempBatchId =
                options?.data?.filter((item) => item?.name === formData?.batchProduct)[0]?._id ||
                formData?.batchProduct;
            setBatchProductId(tempBatchId);
        }
    }, [formData]);

    useEffect(() => {
        dispatch(getSettings('setting'));
    }, []);

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);

    };


    useEffect(() => {
        console.log("socket Initialisation")
        if (socket) {
            socket?.on('ListenBatchTag', (data) => {
                console.log('listenBatchTag', data);

                if (data?.status === true) {

                    let newdata = lisenbatchData;

                    if (data?.data.length > 0) {
                        const index = lisenbatchData.findIndex(ids => ids.rfidNumber === data?.data[0].rfidNumber);
                        if (index === -1) {
                            console.log("Batch Added");
                            newdata.push(data?.data[0]);
                        }
                        else {
                            console.log("Batch Removed")
                            newdata = newdata.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                            newdata.push(data?.data[0]);
                        }
                        //localPreEncode.push(data?.data[0]);  
                        console.log("-------lisenbatchData", Array.from(new Set(newdata)));
                        //dispatch(SocketScanData(data?.data));                 
                        dispatch(passingAssociateProps(Array.from(new Set(newdata))));
                    }
                    dispatch(bulkScanLoadingAction(false));
                    dispatch(socketStartStopScan(true));
                }
            });
        }

    }, []);


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
                    tagNumbers: gtinTable?.map((i) => i?.rfidNumber),
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
            method: 'E144',
            deviceToken: token,
            payload: {
                status: true,
                userName: userInfo?.data?.user?.username,
                message: 'write on this tag',
                tagNumbers: gtinTable.map((i) => i?.rfidNumber),
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
            currentItem?.data && currentItem?.data.find((item) => item['_id'] === location.pathname.split('/').pop());
        setAssignLoading(true);
        let Units = [];
        console.log('receipentdata', receipentdata);
        console.log('iiiieee', gtinTable);
        gtinTable.map((i) => {
            console.log('Dereservation Date - ' + i.rfidNumber);
            console.log('gtinta - ' + gtinTable);

            if ( gtinTable.length > 0 ) {
                Units.push({
                    userName: userInfo?.data?.user?.username,
                    totalTags: [i?.rfidNumber],
                });
            }
        });

        console.log('---------------Units ------------' + Units);

        genericEmit({
            method: 'E144',
            deviceToken: token,
            payload: {
                status: true,
                data: Units,
                message: 'Batches Unassigned Successfully'
            }
        });
        console.log('==units==', Units);

        setDialogOpen(false);
        setGtinTable([]);
    };

    useEffect(() => { 
        socket?.on('unAssignBatch', (data) => {
        
            console.log('unAssignBatch', data, );

        if (data.status === true) {
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
    },[])

    const handleAssignedCount = () => {
        if (selectedItem && selectedItem['assignedCountBatch'] > 0) {
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

    const [check, setCheck] = useState();
    const checkRef = React.useRef();

    const feilds = ['name', 'dob', 'gender', 'bloodgroupId', 'assignedCountBatch', 'usedCount', 'mrnNumber'];
    const feildNames = {
        name: 'Name',
        firstName: CONSTANTS.FIRST_NAME,
        lastName: CONSTANTS.LAST_NAME,
        // badgeNo: 'Badge Number',
        bloodgroupId: CONSTANTS.BLOOD_GROUP,
        gender: CONSTANTS.GENDER,
        dob: CONSTANTS.DOB,
        mrnNumber: 'MRN number',
        assignedCountBatch: 'Assigned batch',
        usedCount: 'Used count'
    };

    const [tableDRdateError, setTableDRdateError] = useState(false);
    const [dereservationDate, setDereservationDate] = useState(null);
    const [productCodeOpen, setProductCodeOpen] = useState(false);
    const [deviceGroup, setDeviceGroup] = useState('');
    const [emergencyDialogOpen, setEmergencyDialogOpen] = useState(true);

    // recipientData from api
    const apiResponse = useSelector((state) => state.getData);
    const { loading, responseData } = apiResponse;

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

    function getDreservationDatetime(productgroupId, dt = new Date()) {
        //console.log("set---", settingsData)
        let datas = settingsData?.batchDereservation?.filter((obj) => obj.productgroupId === productgroupId);
        console.log('datas', datas)
        if (datas?.length > 0) {


            // dt.setHours(dt.getHours + datas[0].dereservationTime.Hours); 
            console.log(dt);

            //dt.setMinutes(dt.getMinutes + datas[0].dereservationTime.Minutes);
            console.log(dt);
            const date = moment().add(datas[0].dereservationTime.Hours, 'hour').add(datas[0].dereservationTime.Minutes, "minute")
            console.log(date);

            return date;

        }
        else {
            return new Date(dt.setDate(dt.getDate() + 2));
        }
    }

    const handleDeresrvationDate = (e) => {
        const checked = e?.target ? e.target.checked : e;
        const dateNtime = tableDRdate ? tableDRdate : unitsTable[0]?.tableDRdate;
        const newunitsTable = unitsTable.map((i) => ({ ...i, tableDRdate: dateNtime }));
        checked === true ? unitsTable.splice(0, unitsTable.length, ...newunitsTable) : null;
        checked === true ? setUnitsTable([...unitsTable]) : null;
        e?.target ? setSameDereservation(!sameDereservation) : null;
    };

    const handleSave = () => {
        // confirm("called")
        sameDereservation ? handleDeresrvationDate(sameDereservation) : null;
        gtinNumberRef.current.value = '';
        // batchNu.current.value=""
        batchNumberRef.current.value = '';
        serialNumberRef.current.value = '';
        countRef.current.value = '';
        setRecursiveUpdate(null);
        setAvailableCount(0);
    };

    const handleBack = () => {
        history.push('/dashboard/assign-unit');
        // here i need to check
    };
    const handleDelete = (index) => {
        gtinTable.splice(index, 1);
        setGtinTable([...gtinTable]);
    };

    const handleChangeSelect = (e) => {
        setDeviceGroup(e.target.value);
    };

    const [alert, setAlert] = useState(false);

    const handleAlert = () => {
        setAlert(false);
        history.push('/dashboard/unassign-batch');
        // here i need to check
    };


    const closeAndsave = () => {

        setScanOrManualOpen(false);
        setRfidSearch(false);
        setGtinSearch(false);

        //rfidNumberRef.current.focus();
        //gtinNumberRef.current.focus();

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
            batchId: batchIdData?.data[0]?._id,
            description: batchIdData?.data[0]?.batchProductId[0]?.name,
            sequenceNo: sequenceNo,
            assigned: batchIdData?.data[0]?.isAssigned == 1 ? true : false,
            associated: batchIdData?.data[0]?.isAssigned == 0 ? true : false,
            check: batchIdData?.data[0]?.isAssigned || batchIdData?.data[0]?.isAssociated ? false : true
        };

        if (gtinTable?.findIndex((item) => item?.gtinNumber === gtinNumber) !== -1) {
            setGtinError('GTIN Number Exists in Table');
            return;
        }
        setGtinTable([...gtinTable, newGtinEntry]);
        setFormData({ ...formData, batchProductId: '' });
        setGtinNumber('');
        setBatchNumber('');
        setBatchProductId('');
        setExpiryDate('');
        setRecursiveUpdate({})
        setTableDRdate('');
        setTableDRdateError(false);
    };


    const genericEmit = (data) => {
        console.log(data, 'genericEmit method in device selection');
        if (data) {
            socket?.emit('generic', data);
        }
    };
    useEffect(() => {
        socket?.on('deviceStatus', (data) => {
            console.log("dev---", data)
            dispatch(socketDeviceStatus(data));
            console.log('appdata---', data)
            console.log("devicests", data?.deviceStatus)

        });
    }, [socket])

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
                method: 'E144',
                payload: {
                    userName: userInfo.data.user.username,
                    method: 'E144',
                    type: 'Associate'
                }
            });

            //handleBack();
            //dispatch(clearAssociateBatchPost());

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
            console.log("item===", item)
            if (id === 'emergency') {
                return {
                    refskuId: item?.refskuId,
                    dereservationDateAndTime: moment(item?.tableDRdate).format('yyyy/MM/DD hh:mm'),
                    'track-code': 'BS-TR-5113',
                    comments: item?.comment ? item?.comment : 'No comments',
                    name: 'Emergency Assigned'
                };
            } else if (item.check) {
                console.log("ellseSequence", item)
                return {
                    recipientId: location.pathname.split('/').pop(),
                    batchId: item?.batchId || item?._id,
                    rfidNumber: item?.rfidNumber,
                    count: parseInt(item?.count),
                    dereservationDateAndTime: moment(item?.tableDRdate).format('yyyy/MM/DD hh:mm'),
                    'track-code': 'BS-TR-5103',
                    comments: item?.comment ?? 'No comments',
                    sequenceNo: item?.sequenceNo
                };
            }
        });

        // let collectionName = 'activity';
        let validData = newTable?.filter((item) => item);
        let formData = JSON.stringify(validData);

        dispatch(postAssignBatch(formData));
    };


    const handleBatchInput = async (e, field) => {
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



    const handleDate = (e) => {
        if (!(e?.getTime() < new Date().getTime())) {
            setTableDRdate(e);
            setTableDRdateError(false);
        }
    };

    //const handleDeresrvationDate = (e) => {
    //    const checked = e?.target ? e.target.checked : e;
    //    const dateNtime = tableDRdate ? tableDRdate : unitsTable[0]?.tableDRdate;
    //    const newunitsTable = unitsTable.map((i) => ({ ...i, tableDRdate: dateNtime }));
    //    checked === true ? unitsTable.splice(0, unitsTable.length, ...newunitsTable) : null;
    //    checked === true ? setUnitsTable([...unitsTable]) : null;
    //    e?.target ? setSameDereservation(!sameDereservation) : null;
    //};

    const handleTableDate = (e, index) => {
        console.log(" handleTableDate " + e);
        let newData = [...gtinTable];

        newData[index].tableDRdate = e;
        setGtinTable(newData);
    }



    const handleSequenceChange = (e, index) => {
        console.log(" handleSequenceChange " + e);

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
    }


    useEffect(() => {
        if (recursiveUpdate?.gtinNumber) {
            setGtinError('');
            console.log("recursiveUpdate:", recursiveUpdate);
        }
    }, [recursiveUpdate]);


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

    const openAndSave = () => {
        setGtinSearch(false);
        setCurrentInputFeild(false);
        gtinNumberRef.current.focus();

        if (gtinTable?.findIndex((item) => item?.gtinNumber === recursiveUpdate?.gtinNumber) !== -1) {
            setGtinError('Gtin Number Exists in Table');
        } else if (
            recursiveUpdate?.gtinNumber === undefined ||
            recursiveUpdate?.gtinNumber === null ||
            recursiveUpdate?.gtinNumber === ''
        ) {
            setGtinError('GTIN Number Required');
        } else {
            let tempGtinTable = [...gtinTable, { ...recursiveUpdate, tableDRdate, batchId: unitId_id }];
            setGtinTable(tempGtinTable);
            setRecursiveUpdate({ gtinNumber: '', batchNumber: '', serialNumber: '', count: '' });

            let invalidDate = String(tableDRdate);

            invalidDate !== 'Invalid Date' && tableDRdate?.getTime() > new Date().getTime()
                ? handleSave()
                : setTableDRdateError(true);
        }
        setFormData({ ...formData, batchProduct: '' });
        dispatch(clearUnitIdSearch());
    };

    const onCancelDialog = () => {
        setRfidSearch(false);
        setGtinSearch(false);
        setCurrentInputFeild('');
        setUnitId('');
        setTableDRdate(hours_48_From_Now());
        setUnitIdError(false);
        setTableDRdateError(false);
        setGtinError('');
        //countRef.current.value = '';
        setRecursiveUpdate(null);
        //setAvailableCount(0);
        setScanOrManualOpen(false);
        setEmergencyDialogOpen(false);
        setGtinNumber('');
        setBatchNumber('');
        setBatchProductId('');
        setExpiryDate('');
        setRecursiveUpdate({})
        setTableDRdateError(false);
        setTableDRdate('');
    };

    const dispatch = useDispatch();

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
        console.log('----------Gtin Table--', gtinTable);
        console.log('--------------' + tempUnits + '---------------');

        setGtinTable([...tempUnits]);
    }, [lisenbatchData]);


    const { batchIdLoading, batchIdData } = useSelector((state) => state.getBatchIdSearch);
    console.log('data____', batchIdData);


    useEffect(() => {
        if (batchIdData?.data && batchIdData.data.length > 0) {
            const firstBatch = batchIdData.data[0];
            if (firstBatch) {
                setBatchNumber(firstBatch.batchNumber);
                console.log("BatchNumber:", firstBatch.batchNumber);
                setGtinNumber(firstBatch.gtinNumber);
                setExpiryDate(firstBatch.expiryDate);
                setBatchProductId(firstBatch.batchProductId?.[0]?.name);
                console.log("BatchName:", firstBatch.batchProductId?.[0]?.name);
                setTableDRdate(firstBatch.dereservationDateAndTime);
                setSequenceNo(firstBatch.sequenceNo ? firstBatch.sequenceNo : '-');
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
        }
    }, [recursiveUpdate]);

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
            let tempCheckedRows = gtinTable.map((i) => i?.gtinNumber);
            setCheckedRows([...tempCheckedRows, 'All']);
        }
    }, [gtinTable]);

    const handleTableCheck = (e, indexm, unit) => {
        console.log("unit", unit);
        console.log("e--", e);
        console.log("indexm--", indexm)

        gtinTable[indexm].check = e.target.checked ? true : false;
        console.log(gtinTable[indexm])

        let tempUnitsTable = [...gtinTable];
        tempUnitsTable[indexm].check = e.target.checked ? true : false;

        console.log("tempUnitsTable", tempUnitsTable);
        setGtinTable(tempUnitsTable);
    };

    const handleTableCheckAll = (e) => {

        let localdata = [];

        gtinTable.forEach((data) => {
            console.log("dta--", data);
            console.log("Is Checked ----------------", data.check);
            if (data?.assigned || !data?.gtinNumber) {
                data.check = true;
            } else {
                data.check = e.target.checked ? true : false;
            }
            localdata.push(data)
        });
        let val = gtinTable.filter((item) => item.check === true);
        if (val.length > 0) {
            setCheckAll(true);

        }
        else {
            setCheckAll(false);

        }
        console.log("localdata---", localdata);
        setGtinTable(localdata);

    }

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
        setGtinTable([])
    }
    const handleCancleAssign = () => {

        setAssignLoading(false);
        setDialogOpen(false);
    };


    return (
        <UnassignBatchComponent
            handleCancleAssign={handleCancleAssign}
            handleClear={handleClear}
            checkAll={checkAll}
            loading={loading}
            handleAssign={
                settingsData?.general?.features?.includes('Write') ? handleSocketWriteAssign : handleSocketAssign
            }
            handleBack={handleBack}
            handleDelete={handleDelete}
            handleSave={handleSave}
            feilds={feilds}
            feildNames={feildNames}
            unitId={unitId}
            expiryDate={expiryDate}
            setUnitId={setUnitId}
            productCode={productCode}
            setProductCode={setProductCode}
            selectedItem={selectedItem}
            handleDate={handleDate}
            handleBatchInput={handleBatchInput}
            setGtinNumber={setGtinNumber}
            tableDRdate={tableDRdate}
            dereservationDate={dereservationDate}
            setDereservationDate={setDereservationDate}
            sameDereservation={sameDereservation}
            setSameDereservation={setSameDereservation}
            setDialogOpen={setDialogOpen}
            dialogOpen={dialogOpen}
            productCodeOpen={productCodeOpen}
            unitIdAssigned={unitIdAssigned}
            setUnitIdAssigned={setUnitIdAssigned}
            commonUnitId={commonUnitId}
            unitsTable={unitsTable}
            checkCommonUnitIds={checkCommonUnitIds}
            handleTableDate={handleTableDate}
            scanOrManualOpen={scanOrManualOpen}
            setScanOrManualOpen={setScanOrManualOpen}
            closeAndsave={closeAndsave}
            openAndSave={openAndSave}
            handleOpen={handleOpen}
            productCodeError={productCodeError}
            setProductCodeError={setProductCodeError}
            unitIdError={unitIdError}
            setUnitIdError={setUnitIdError}
            tableDRdateError={tableDRdateError}
            setTableDRdateError={setTableDRdateError}
            onCancelDialog={onCancelDialog}
            check={check}
            setCheck={setCheck}
            batchIdLoading={batchIdLoading}
            batchProductId={batchProductId}
            gtinNumber={gtinNumber}
            batchNumber={batchNumber}
            setBatchNumber={setBatchNumber}
            checkRef={checkRef}
            handleUnitId={null}
            id={id}
            deviceGroup={deviceGroup}
            comments={comments}
            setComments={setComments}
            handleChangeSelect={handleChangeSelect}
            alert={alert}
            setAlert={setAlert}
            handleAlert={handleAlert}
            unitIdErrorText={unitIdErrorText}
            emergencyDialogOpen={emergencyDialogOpen}
            setEmergencyDialogOpen={setEmergencyDialogOpen}
            setUnitIdErrorText={setUnitIdErrorText}
            handleAssignedCount={handleAssignedCount}
            disableCheck={disableCheck}
            commentRef={commentRef}
            unitIdRef={unitIdRef}
            recursiveUpdate={recursiveUpdate}
            setRecursiveUpdate={setRecursiveUpdate}
            currentInputFeild={currentInputFeild}
            setCurrentInputFeild={setCurrentInputFeild}
            handleDeresrvationDate={handleDeresrvationDate}
            barcodeNumber={barcodeNumber}
            setBarcodeNumber={setBarcodeNumber}
            gtinNumberRef={gtinNumberRef}
            rfidNumberRef={rfidNumberRef}
            gtinError={gtinError}
            gtinTable={gtinTable}
            setCount={setCount}
            count={count}
            expiryDateRef={expiryDateRef}
            tableDRdateRef={tableDRdateRef}
            batchNumberRef={batchNumberRef}
            serialNumberRef={serialNumberRef}
            countRef={countRef}
            availableCount={availableCount}
            checkedRows={checkedRows}
            setCheckedRows={setCheckedRows}
            enableNext={enableNext}
            setEnableNext={setEnableNext}
            setFormData={setFormData}
            formData={formData}
            options={options}
            onFormChange={onFormChange}
            countError={countError}
            countErrorText={countErrorText}
            disabled={batchIdData?.data?.length > 0}
            handleTableCheck={handleTableCheck}
            handleTableCheckAll={handleTableCheckAll}
            recipientId={location.pathname.split('/').pop()}
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            sequenceNo={sequenceNo}
            setSequenceNo={setSequenceNo}
            handleSequenceChange={handleSequenceChange}
            devicestatus={devicestatus}
        />
    );
}

export default RecepientPage;
