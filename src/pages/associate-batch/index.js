import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    InputLabel,
    Paper,
    Tooltip,
    Typography,
    Switch,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@material-ui/core';
import { CONSTANTS, CustomButton, DatePicker, Checkbox } from 'common';
import { AutoComplete, CustomDialog, CustomInput } from 'components';
import React, { useState, useRef, useEffect } from 'react';
import { useStyles } from './style';
import { useHistory } from 'react-router-dom';
import ConvertToDBDate from './../../components/add-unit/add-unit-form/julianDateConverter';
import moment from 'moment';
import { batch, useDispatch, useSelector } from 'react-redux';
import { createAlert, associateBatchAction, passingAssociateProps, socketResponse } from 'redux/actions';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import TagIdReader from 'components/TagIdReader';
import DeviceSelection from 'components/socketDeviceSelection/socketDeviceSelection';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddAutoComplete from './autoComplete';
import { getCollectionDropdown } from 'redux/actions/manage/manageFieldsAction';
import {
    get2ndDropdown,
    getDropDown,
    get4thDropdown,
    get5thDropdown,
    get6thDropdown
} from 'redux/actions/manage/manageFieldsAction';
import VerticalDivider from 'components/verticalDivider';
import CheckboxComponent from 'components/checkbox/checkbox.component';
import { getUnitSearch, clearUnitIdSearch } from 'redux/actions/assignUnit/unitIdSearchAction';
import { clearAssociateForm } from 'redux/actions/associateBatch';
import { set } from 'date-fns';

import {
    associateBatchStateAction,
    bulkScanLoadingAction,
    socketStartStopScan,
    socketDeviceStatus
} from 'redux/actions/socketAction';
const initialState = {
    gtinNumber: '',
    batchNumber: '',
    serialNumber: '',
    expiryDate: ''
};

const AssociateBatch = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const gtinNumberRef = useRef();
    const batchNumberRef = useRef();
    const history = useHistory();
    const serialNumberRef = useRef();
    const expiryDateRef = useRef();
    const batchProductRef = useRef();
    const tagIdRef = useRef();
    const additionalInfoRef = useRef();
    const [barcodeNumber, setBarcodeNumber] = useState('');
    const [recursiveUpdate, setRecursiveUpdate] = useState(initialState);
    console.log('recursive----', recursiveUpdate);
    const [localDescription, setLocalDescription] = useState({});
    const [currentInputFeild, setCurrentInputFeild] = useState('');
    const [tagCount, setTagCount] = useState(0);
    const [addProductDesc, setAddProductDesc] = useState('');
    const [formData, setFormData] = useState({ batchProduct: '' });
    const { associateBatchResponse, associateBatchError } = useSelector((state) => state.associateBatch);
    console.log('asso---', associateBatchResponse);
    const socket = useSelector((state) => state.socketReducer.socket);
    const { collectionData } = useSelector((state) => state.getCollectionDropdown);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
    const { deviceWriteTagValidation } = useSelector((state) => state.deviceWriteTag);
    const { options } = useSelector((state) => state.getDropDown);
    const { userInfo } = useSelector((state) => state.userLogin);
    const [batchProductId, setBatchProductId] = useState('');
    // const [tagIds, setTagIds] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [tagIdList, setTagIdList] = useState([]);
    const { scanStatus } = useSelector((state) => state.getSocketStartStopScan);
    const [loadingAssociateBatch, setLoadingAssociateBatch] = useState(false);
    const [clearForms, setClearForm] = useState(false);
    const [tagIdDialog, setTagIdDialog] = useState(false);
    const [gtinSearch, setGtinSearch] = useState(false);
    const { untiIdLoading, unitIdData } = useSelector((state) => state.getUnitIdSearch);
    console.log('un---', unitIdData);
    let { lisenbatchData } = useSelector((state) => state.passingAssociatePropStore);
    const socketResponseStore = useSelector((state) => state.socketResponseStore);
    const associateDevice = useSelector((state) => state.getSocketDeviceConnection);
    const currentPc = useSelector((state) => state.currentPcStore);
    const bulkScanLoading = useSelector((state) => state.bulkScanLoadingStore);
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    console.log('settttttttttttt', settingsData);
    const { options4 } = useSelector((state) => state.get4thDropdown);
    const { devicestatus } = useSelector((state) => state.getSocketDeviceStatus);
    console.log('devicestatusbatch', devicestatus);
    const [deviceddValue, setDeviceddValue] = useState(null);
    console.log('options4', options4?.data);
    const [LinearCode, setLinearCode] = useState('');
    const [QRcode, setQRCode] = useState('');
    const [tagCountValue, setTagCountValue] = useState(0);

    const barcodeOptions = [
        { name: 'Linear', value: 'Linear' },
        { name: 'QR', value: 'QR' }
    ];
    const [barcodeScanning, setBarcodeScanning] = useState('QR');
    // const { clearForms } = useSelector((state) => state.clearAssociateBatchForm);
    // const [socketReponseSuccess, setSocketResponseSuccess] = useState(false);

    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        console.log('eventttttt', event)
        setChecked(event.target.checked);
    };
    console.log('checked--', checked)


    const handleDialog = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleInRecursiveWay = (e, barCodeObject) => {
        //if (e?.startsWith('01') && e?.length >= 16) {
        //    barCodeObject['gtinNumber'] = e?.substring(2, 16);
        //    let tempE = e.substr(16);
        //    if (tempE?.length > 7) {
        //        handleInRecursiveWay(tempE, barCodeObject);
        //    } else {
        //        setRecursiveUpdate(barCodeObject);
        //        return barCodeObject;
        //    }
        //}

        /*else if (e?.startsWith('21') && e?.length >= 14) {
            barCodeObject['serialNumber'] = e.substring(2, 14);
            let tempE = e.substring(14);
            if (tempE?.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        }*/

        if (e?.startsWith('17') && e?.length >= 8) {
            let julianDate = moment(new Date(`${e.substring(4, 6)}-${e.substring(6, 8)}-${e.substring(2, 4)}`)).format(
                'YYYY-MM-DD'
            );
            // let julianDate = moment(new Date('05-11-18')).format('YY/MM/DD');
            barCodeObject['expiryDate'] = julianDate;
            let tempE = e?.substring(8);
            if (tempE?.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        } else if (e?.startsWith('10') && e?.length >= 12) {
            barCodeObject['batchNumber'] = e.substring(2, 12);
            let tempE = e.substring(12);
            if (tempE?.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        }
    };

    const handleBatchInput = (e, text, feild) => {
        console.log('feild', feild);
        console.log('Length' + e?.length);
        console.log(e, text, text?.length, feild, ' text, feild', 'inside handle input');
        let tempRecurseiveUpdate = { ...recursiveUpdate };
        if (feild === 'expiryDate') {
            let date = moment(e).format('YYYY-MM-DD');
            tempRecurseiveUpdate[feild] = date;
        } else if (feild === 'batchNumber') {
            let data = unitIdData?.data?.filter((item) => {
                return item.batchNumber === e;
            });
            tempRecurseiveUpdate[feild] = e;
            tempRecurseiveUpdate['expiryDate'] = data && data.length > 0 ? data[0]?.expiryDate : null;
        } else {
            tempRecurseiveUpdate[feild] = e;
        }

        setRecursiveUpdate(tempRecurseiveUpdate);
    };

    const handleBatchInputCompleted = () => {
        let tempRecurseiveUpdate = { ...recursiveUpdate };
        let e = tempRecurseiveUpdate['gtinNumber'];

        if (barcodeScanning === 'QR') {
            console.log('scanningQRcode', e);
            console.log('length of Input' + e?.length);

            if (e?.includes('(01)') && e?.includes('(17)') && e?.includes('(10)')) {
                console.log('2D Data');
                console.log('lengths---', e?.length);

                console.log('39----');
                let gin = e.substring(4, 18);
                setGtinSearch(false);

                const regex = /\(\d+\)/g;
                const result = e.split(regex);
                console.log('splited', result);

                let batchstr = e?.substring(32, e?.length);
                let expiry = e?.substring(22, 28);
                console.log('gtin', gin);
                console.log('batch', batchstr);
                console.log('expiry', expiry);
                let expiryDate =
                    '20' + expiry.substring(0, 2) + '-' + expiry.substring(2, 4) + '-' + expiry.substring(4, 6);
                console.log('expiryDate', expiryDate);
                let julianDate = moment(expiryDate).format('YYYY-MM-DD');
                console.log('expiry date format', julianDate);

                tempRecurseiveUpdate['gtinNumber'] = gin;
                tempRecurseiveUpdate['batchNumber'] = batchstr;
                tempRecurseiveUpdate['expiryDate'] = julianDate;

                setRecursiveUpdate(tempRecurseiveUpdate);
            }
        } else if (barcodeScanning === 'Linear') {
            console.log('scanningLinear', e);
            let str = e;

            // if (e.length === 18) {
            console.log('1D Data linear');
            //console.log("length" + e.length)

            console.log('length of Input' + e?.length);

            str = e.substring(4, e.length);
            setGtinSearch(false);

            // setCurrentInputFeild(str);

            let tempRecurseiveUpdate = { ...recursiveUpdate };
            console.log('recur', recursiveUpdate);
            tempRecurseiveUpdate['gtinNumber'] = str;
            setRecursiveUpdate(tempRecurseiveUpdate);
            //}

            if (typeof e === 'string' && e?.length === 50) {
                setCurrentInputFeild('');
                setBarcodeNumber(e);
                let temp2DObject = {};
                handleInRecursiveWay(e, temp2DObject);
            } else if (typeof e === 'string' && e?.length < 50) {
                setBarcodeNumber(e);
            }
        }
    };

    const handleLocalDescription = (e, feild) => {
        let tempLocalDescription = { ...localDescription };
        tempLocalDescription[feild] = e;
        setLocalDescription(tempLocalDescription);
    };

    useEffect(() => {
        handleClearForm();
    }, [barcodeScanning]);

    useEffect(() => {
        socket?.on('ackWriteBatchTag', (data) => {
            console.log('ackWriteBatchTag', data, 'in socket device');
            if (data.status === true && currentPc) {
                dispatch(socketResponse({ write: true, data }));
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: data.message,
                        alertType: 'success'
                    })
                );
                setBarcodeNumber('');
                setTagIdList([]);
                setAddProductDesc('');
                setFormData({ ...formData, batchProduct: '' });
                setRecursiveUpdate({});
                setLocalDescription({ ...localDescription, localDescription: '' });
                setGtinSearch(false);
                dispatch(passingAssociateProps([]));
            }
        });

        socket?.on('associateBatchTag', (data) => {
            setLoadingAssociateBatch(false);
            console.log('associateBatchTag', data, 'in socket device');

            if (data.status === true) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: data.message,
                        alertType: 'success'
                    })
                );
                setBarcodeNumber('');
                setTagIdList([]);
                setAddProductDesc('');
                setFormData({ ...formData, batchProduct: '' });
                setRecursiveUpdate({});
                setLocalDescription({ ...localDescription, localDescription: '' });
                setGtinSearch(false);
                dispatch(passingAssociateProps([]));
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

        if (associateBatchResponse?.status) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'Associate Batch Successfull',
                    alertType: 'success'
                })
            );
            setBarcodeNumber('');
            setTagIdList([]);
            setAddProductDesc('');
            setFormData({ ...formData, batchProduct: '' });
            setRecursiveUpdate({});
            setLocalDescription({ ...localDescription, localDescription: '' });
            dispatch(passingAssociateProps(Array.from(new Set([]))));
            setGtinSearch(false);
        }
        if (associateBatchError?.errorMessage) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: associateBatchError?.errorMessage,
                    alertType: 'error'
                })
            );
            setGtinSearch(false);
        }

        socket?.on('deviceStatus', (data) => {
            console.log('dev---', data);
            dispatch(socketDeviceStatus(data));
            console.log('appdata---', data);
            console.log('devicests', data?.deviceStatus);
        });
    }, [associateBatchResponse, associateBatchError, socket]);

    useEffect(() => {
        if (collectionData?.data?.length > 0) {
            let tempData =
                collectionData?.data?.length > 0
                    ? collectionData.data?.map((d) => {
                          return { _id: d._id, name: d };
                      })
                    : [];
            setAddProductDesc(tempData);
        }
    }, [collectionData]);

    useEffect(() => {
        dispatch(getDropDown('batchproducts'));
    }, []);

    const onFormChange = (e) => {
        setFormData({ ...formData, batchProduct: e.target.value });
        // handleValidation();
    };

    const getExpiryDate = (batchNumber) => {
        let data = unitIdData?.data?.filter((item) => {
            return item.batchNumber === batchNumber;
        });
        console.log('----- Expiry date ----- ' + data.length > 0 ? data[0]?.expiryDate : '');

        let tempRecursiveUpdate = { ...recursiveUpdate };

        tempRecursiveUpdate['expiryDate'] = data.length > 0 ? data[0]?.expiryDate : null;

        //setRecursiveUpdate(tempRecursiveUpdate);
        return data.length > 0 ? data[0]?.expiryDate : null;
    };

    const genericEmit = (data) => {
        if (data) {
            console.log(' -- Write Batch --' + data);
            socket?.emit('generic', data);
        }
    };
    useEffect(() => {
        let deviceddValue;
        if (options4) {
            console.log('Device Selected Token ' + token);
            deviceddValue = options4?.data?.map((item) => item?._id);

            console.log('Selected Device' + deviceddValue);
        }
    }, []);

    const handleTagCountChange = (event) => {
        const newValue = event.target.value;
        setTagCountValue(newValue);
    };
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [severity, setSeverity] = useState(false);

    const handleManualAssociate = () => {
        let deviceddValue;
        let deviceId = '';
        if (options4) {
            console.log('Device Selected Token ' + token);
            deviceddValue = options4?.data?.filter((item) => item && item?.token === token);
            console.log('devi------', deviceddValue)
            deviceId = deviceddValue[0]?._id;
        }
        let manualbatch = [
            {
                deviceId: deviceId,
                tagCount: tagCountValue,
                ...recursiveUpdate,
                batchProductId: batchProductId,
                isEmergency: checked,
            }
        ];

        socket.emit('manualAssociateBatch', {
            payload: {
                status: true,
                userName: userInfo.data.user.username,
                data: manualbatch
            }
        });
        console.log('manualbatch', manualbatch);
        socket.on('manualAssociateBatch', (data) => {
            console.log('ack data--', data);
            if (data.status === true) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: data.message,
                        alertType: 'success'
                    })
                );
                setSeverity(true);
                setBarcodeNumber('');
                setTagIdList([]);
                setTagCountValue('');
                setAddProductDesc('');
                setFormData({ ...formData, batchProduct: '' });
                setRecursiveUpdate({});
                setLocalDescription({ ...localDescription, localDescription: '' });
                setGtinSearch(false);
                //setAssociateLoading(false);
                gtinNumberRef?.current?.focus();
            } else if (data.status === false) {
                //setAssociateLoading(false);
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: data.message,
                        alertType: 'error'
                    })
                );
            }
        });
    };

    const handleAssociateBatch = () => {
        let deviceddValue;
        let deviceId = '';
        if (options4) {
            console.log('Device Selected Token ' + token);
            deviceddValue = options4?.data?.filter((item) => item?.status == 1 && item?.token === token);
            deviceId = deviceddValue[0]?._id;
        }

        genericEmit({
            userName: userInfo?.data?.user?.username,
            deviceToken: token,
            method: 'E119',
            payload: {
                userName: userInfo?.data?.user?.username,
                acknOn: 'ackStopBatchScan'
            }
        });

        console.log('Tags list' + tagIdList?.map((i) => i.rfidNumber));

        if (tagIdList.length > 0) {
            handleDialogClose();
            if (settingsData?.general?.features?.includes('Write') === 'E121') {
                setLoadingAssociateBatch(true);
            }
            setCurrentInputFeild('');
            genericEmit({
                userName: userInfo?.data?.user?.username,
                deviceToken: token,
                method: settingsData?.general?.features?.includes('Write') ? 'E121' : 'E136',
                payload: {
                    status: true,
                    userName: userInfo.data.user.username,
                    message: 'write on this tag',
                    data: [
                        {
                            deviceId: deviceId,
                            tagNumbers: tagIdList?.map((i) => i.rfidNumber),
                            ...recursiveUpdate,
                            batchProductId,
                            isEmergency: checked,
                        }
                    ]
                }
            });
        }
    };

    const handleBackClick = () => {
        if (history.location.pathname === '/dashboard/associate-batch') {
            history.goBack();
        } else {
            history.push('/dashboard');
        }
    };

    useEffect(() => {
        console.log('Update batch Product Id');
        if (formData?.batchProduct) {
            let tempBatchId =
                options?.data?.filter((item) => item?.name === formData?.batchProduct)[0]?._id ||
                formData?.batchProduct;
            setBatchProductId(tempBatchId);
        }
    }, [formData]);

    useEffect(() => {
        //console.log('tagsFromDeviceSelection', tagsFromDeviceSelection, currentPc);
        // if (currentPc) {
        console.log('Update Tag Count');
        //let NewData = lisenbatchData.filter((item) => item.rfidNumber !== '');
        setTagIdList(lisenbatchData);
        //dispatch(passingAssociateProps([]));
        // if (!scanStatus) {
        //   dispatch(socketStartStopScan(true));
        // }
    }, [lisenbatchData]);

    // console.log(clearForms, 'inAssociateBatch');

    const handleClearForm = (e) => {
        setBarcodeNumber('');
        setTagIdList([]);
        setAddProductDesc('');
        setFormData({ ...formData, batchProduct: '' });
        setRecursiveUpdate({});
        setLocalDescription({ ...localDescription, localDescription: '' });
        setGtinSearch(false);
        gtinNumberRef?.current?.focus();
    };
    const handleScanCountDialog = () => {
        setTagIdDialog(!tagIdDialog);
    };

    useEffect(() => {
        console.log('reser' + recursiveUpdate?.batchNumber);
        console.log('gtinSearch', gtinSearch);
        if ((recursiveUpdate?.gtinNumber?.length === 14 || recursiveUpdate?.batchNumber) && !gtinSearch) {
            console.log('IFFFFFFFF');
            let filterKey = [];
            if (recursiveUpdate?.gtinNumber) {
                console.log('r---', recursiveUpdate?.gtinNumber);
                filterKey.push({ key: 'gtinNumber', value: recursiveUpdate?.gtinNumber });
            }
            if (recursiveUpdate?.batchNumber) {
                filterKey.push({ key: 'batchNumber', value: recursiveUpdate?.batchNumber });
            }
            console.log('filter----', filterKey);
            //if (recursiveUpdate?.gtinNumber && recursiveUpdate?.batchNumber) {
            //}
            setGtinSearch(true);
            if (recursiveUpdate?.gtinNumber || recursiveUpdate?.batchNumber) {
                dispatch(getUnitSearch('batch', JSON.stringify(filterKey)));
            }
        }

        if (recursiveUpdate?.gtinNumber?.length === 0) {
            setGtinSearch(true);
        }
        console.log('recursiveUpdate?.gtinNumber', recursiveUpdate?.gtinNumber);
        dispatch(associateBatchStateAction(recursiveUpdate));
    }, [recursiveUpdate]);

    const updateBatchWithGtinSearch = (data) => {
        console.log('recursiveUpdate', recursiveUpdate);
        let tempRecursiveUpdate = { ...recursiveUpdate };
        console.log('tempRecursiveUpdate', tempRecursiveUpdate);
        if (recursiveUpdate?.batchNumber?.length === 10) {
            tempRecursiveUpdate['batchNumber'] = data.batchNumber;
        }
        if (recursiveUpdate?.serialNumber?.length !== 12) {
            tempRecursiveUpdate['serialNumber'] = data.serialNumber;
        }
        if (recursiveUpdate?.batchNumber?.length === 10) {
            tempRecursiveUpdate['expiryDate'] = data.expiryDate;
        }
        batchProductRef.current.value = data?.batchProductId?.[0]?.name;
        setBatchProductId(data?.batchProductId?.[0]?._id);
        setFormData({ ...formData, batchProduct: data?.batchProductId?.[0]?.name });
        setRecursiveUpdate(tempRecursiveUpdate);
    };
    useEffect(() => {
        if (unitIdData?.data?.length > 0 && recursiveUpdate?.gtinNumber?.length === 14) {
            if (unitIdData?.data?.[0]?.availableCount == 0) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: 'no tags are available to assign',
                        alertType: 'error'
                    })
                );
            }
            updateBatchWithGtinSearch(unitIdData?.data?.[0]);
        }

        if (unitIdData?.data?.length > 0 && recursiveUpdate?.batchNumber) {
            let temp = { ...recursiveUpdate };
            temp['expiryDate'] = unitIdData?.data && unitIdData?.data[0]?.expiryDate;
            setRecursiveUpdate(temp);
        }
    }, [unitIdData]);

    // console.log(clearForms)

    useEffect(() => {
        if (associateDevice.status) {
            gtinNumberRef?.current?.focus();
        }
    }, [associateDevice.status]);

    useEffect(() => {
        if (socketResponseStore?.write && clearForms) {
            expiryDateRef.current.value = null;
            gtinNumberRef.current.value = '';
            serialNumberRef.current.value = '';
            batchNumberRef.current.value = '';
            batchProductRef.current.value = '';
            additionalInfoRef.current.value = '';
            setTagIdList([]);
            setGtinSearch(false);
            setRecursiveUpdate(null);
            setFormData({ ...formData, batchProduct: '' });
            dispatch(socketResponse(false));
            setLoadingAssociateBatch(false);
        } else if (socketResponseStore?.write) {
            console.log('failed tags in associate batch', socketResponseStore?.data?.data?.[0]?.failedTags);
            if (socketResponseStore?.data?.data?.[0]?.failedTags?.length > 0) {
                setTagIdList([...socketResponseStore?.data?.data?.[0]?.failedTags]);
            } else {
                setTagIdList([]);
            }
            setLoadingAssociateBatch(false);
            dispatch(socketResponse(false));
        }
    }, [socketResponseStore]);
    console.log('recursiveUpdate', recursiveUpdate);
    const onFormCheck = (e) => {
        setLinearCode(e.target.checked);
    };
    console.log('LinearCode', LinearCode);
    const onQRFormCheck = (e) => {
        setQRCode(e.target.checked);
    };
    console.log('QRcode', QRcode);
    console.log('barcodescanning', barcodeScanning);
    return (
        <Grid xs={12} item>
            {/* <Grid
                container
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    marginBottom: 5
                }}
            >
                <DeviceSelection
                    setTagIds={setTagIds}
                    associateBatch={true}
                    setDialogOpen={setDialogOpen}
                    setSocketResponseSuccess={setSocketResponseSuccess}
                />
            </Grid> */}
            <Paper style={{ padding: 30, display: 'flex' }}>
                {/*<Grid item xs={1} className={classes.backButton}>*/}
                {/*    <CustomButton variant="outlined" onClick={handleBackClick}>*/}
                {/*        Back*/}
                {/*    </CustomButton>*/}
                {/*</Grid>*/}
                <Grid item xs={9}>
                    <Grid xs={12} item style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Grid container item xs={8}>
                            {/*<Grid item xs={12}>*/}
                            {/*    <Grid item xs={6}  className={classes.inputField}>*/}
                            {/*    <InputLabel className={classes.inputLabel}>Linear Barcode</InputLabel>*/}
                            {/*    <Switch*/}
                            {/*        color="primary"*/}
                            {/*        name="LinearCode"*/}
                            {/*        checked={LinearCode ?? false}*/}
                            {/*        onChange={onFormCheck}*/}
                            {/*    />*/}

                            {/*</Grid>*/}
                            {/*<Grid item xs={6} className={classes.inputField}>*/}
                            {/*    <InputLabel className={classes.inputLabel}>QR Code</InputLabel>*/}
                            {/*    <Switch*/}
                            {/*        color="primary"*/}
                            {/*        name="QRcode"*/}
                            {/*       checked={QRcode ?? false}*/}
                            {/*        onChange={onQRFormCheck}*/}
                            {/*    />*/}

                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                            <Grid item xs={4}>
                                <InputLabel className={classes.inputLabels}>Scanning type</InputLabel>
                                <FormControl
                                    component="fieldset"
                                    //disabled={resData !== undefined && resData?.data?.length !== 0 ? true : false}
                                >
                                    <RadioGroup
                                        aria-label="api"
                                        name="barcodeScanning"
                                        value={barcodeScanning}
                                        row={true}
                                        className={classes.radioBtns}
                                        onChange={(e) => setBarcodeScanning(e.target.value)}
                                    >
                                        {barcodeOptions.map((option) => (
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
                            <Grid container item xs={12} justify="space-between" spacing={6}>
                                <Grid item xs={6}>
                                    <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>{'GTIN Number *'}</InputLabel>
                                    <CustomInput
                                        fullWidth
                                        value={
                                            currentInputFeild === 'gtinNumber'
                                                ? barcodeNumber
                                                : recursiveUpdate?.gtinNumber
                                                ? recursiveUpdate?.gtinNumber
                                                : ''
                                        }
                                        onChange={(e) => handleBatchInput(e?.target?.value, undefined, 'gtinNumber')}
                                        onEnterPress={handleBatchInputCompleted}
                                        focus={true}
                                        inputRef={gtinNumberRef}
                                        size="lg"
                                        // disabled={unitIdData?.data?.length > 0}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>
                                        {'Batch Number *'}
                                    </InputLabel>
                                    <CustomInput
                                        fullWidth
                                        value={
                                            //currentInputFeild === 'batchNumber'
                                            //    ? barcodeNumber
                                            //    :
                                            recursiveUpdate?.batchNumber ? recursiveUpdate?.batchNumber : ''
                                        }
                                        onChange={(e) => handleBatchInput(e?.target?.value, undefined, 'batchNumber')}
                                        inputRef={batchNumberRef}
                                        //disabled={unitIdData?.data?.length > 0}
                                        //disabled={recursiveUpdate?.batchNumber.length === 0}
                                        placeholder={untiIdLoading ? 'loading....' : ''}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} justify="space-between" spacing={6} style={{ marginTop: 5 }}>
                                <Grid item xs={6}>
                                    <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>{'Expiry Date *'}</InputLabel>
                                    <DatePicker
                                        inputVariant={'outlined'}
                                        handleDate={(e, x) => handleBatchInput(e, x, 'expiryDate')}
                                        value={
                                            unitIdData?.data?.length > 0 &&
                                            recursiveUpdate?.batchNumber?.length > 0 &&
                                            getExpiryDate(recursiveUpdate?.batchNumber) //&& recursiveUpdate?.expiryDate
                                                ? getExpiryDate(recursiveUpdate?.batchNumber) //unitIdData?.data?.[0]?.expiryDate
                                                : recursiveUpdate?.expiryDate && recursiveUpdate?.expiryDate?.length > 0
                                                ? recursiveUpdate?.expiryDate
                                                : null
                                        }
                                        //format="dd/MM/yyyy"
                                        //placeholder={untiIdLoading ? 'loading....' : ' '}
                                        width="100%"
                                        padding={'5px'}
                                        size="small"
                                        //allowKeyboardControl={true}
                                        //inputRef={expiryDateRef ?? null}
                                        //refuse={'/^(?:&>)(?:[0-9]{10})/gi'}

                                        //mask={'________'}

                                        format={'dd/MM/yyyy'}
                                        placeholder="DD/MM/YYYY"
                                        allowKeyboardControl={true}
                                        disablePast={true}
                                        disabled={
                                            unitIdData?.data?.length > 0 &&
                                            recursiveUpdate?.batchNumber?.length > 0 &&
                                            getExpiryDate(recursiveUpdate?.batchNumber)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6} container>
                                    <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>
                                        {'Product Description *'}
                                    </InputLabel>
                                    <AddAutoComplete
                                        options={options?.data || []}
                                        onChange={onFormChange}
                                        value={formData?.batchProduct ?? ''}
                                        name="batchProduct"
                                        id="id"
                                        formData={formData}
                                        setFormData={setFormData}
                                        noLabel
                                        fullWidth
                                        currentPlaceHolder={untiIdLoading ? 'loading...' : 'Batch Product Description'}
                                        batchProduct={true}
                                        inputRef={batchProductRef}
                                        disabled={unitIdData?.data?.length > 0}
                                    />
                                </Grid>
                                {/*<Grid item xs={6}>*/}
                                {/*    <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>*/}
                                {/*        {'Serial Number *'}*/}
                                {/*    </InputLabel>*/}
                                {/*    <CustomInput*/}
                                {/*        fullWidth*/}
                                {/*        value={*/}
                                {/*            currentInputFeild === 'serialNumber'*/}
                                {/*                ? barcodeNumber*/}
                                {/*                : recursiveUpdate?.serialNumber*/}
                                {/*                ? recursiveUpdate?.serialNumber*/}
                                {/*                : ''*/}
                                {/*        }*/}
                                {/*        onChange={(e) => handleBatchInput(e?.target?.value, undefined, 'serialNumber')}*/}
                                {/*        inputRef={serialNumberRef}*/}
                                {/*        disabled={unitIdData?.data?.length > 0}*/}
                                {/*        placeholder={untiIdLoading ? 'loading....' : ''}*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                            </Grid>
                        </Grid>
                        {settingsData?.general?.deviceType === 'Manual' ? (
                            <Grid item xs={4}>
                                <Grid item xs={6} style={{ marginLeft: 60 }}>
                                    <span>
                                        <InputLabel style={{ fontSize: 14, marginBottom: 4 }}>{'Tag Count'}</InputLabel>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                border: 'lightGray 1px solid',
                                                borderRadius: 10,
                                                height: 150
                                                // cursor: tagIdList?.length > 0 ? 'pointer' : ''
                                            }}
                                        >
                                            <input
                                                //type="number"
                                                variant="h1"
                                                color="primary"
                                                value={tagCountValue}
                                                onChange={handleTagCountChange}
                                                style={{
                                                    color: 'lightGray',
                                                    width: '100px',
                                                    textAlign: 'center',
                                                    fontSize: '50px',
                                                    border: 'none',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>
                                    </span>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid item xs={4}>
                                <Grid item xs={6} style={{ marginLeft: 60 }}>
                                    <span>
                                        <InputLabel style={{ fontSize: 14, marginBottom: 4 }}>{'Tag Count'}</InputLabel>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                border: 'lightGray 1px solid',
                                                borderRadius: 10,
                                                height: 150,
                                                cursor: tagIdList?.length > 0 ? 'pointer' : ''
                                            }}
                                        >
                                            <Typography
                                                variant="h1"
                                                color="primary"
                                                onClick={tagIdList?.length > 0 ? handleScanCountDialog : null}
                                                    style={{
                                                        color: tagIdList?.length === 0 ? 'lightGray' : '',
                                                        width: '100px',
                                                        textAlign: 'center',
                                                        fontSize: '50px',
                                                        border: 'none',
                                                        outline: 'none'
                                                    }}
                                            >
                                                {tagIdList?.length}
                                            </Typography>
                                        </div>
                                        <CustomDialog
                                            title={`Scanned Tags`}
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
                                                        <Typography
                                                            variant="body1"
                                                            color="primary"
                                                            style={{ fontWeight: 'bold' }}
                                                        >
                                                            {' '}
                                                            {index + 1}
                                                        </Typography>
                                                        .<span style={{ marginLeft: 6 }}>{item.rfidNumber}</span>
                                                    </Typography>
                                                ))}
                                            </Grid>
                                        </CustomDialog>
                                    </span>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>

                    <Grid container style={{ display: 'flex', justifyContent: 'start', marginTop: 20 }}>
                        <Grid item xs={12}>
                            <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>
                                {'Additional Information'}
                            </InputLabel>
                            <CustomInput
                                fullWidth
                                value={localDescription.localDescription}
                                inputRef={additionalInfoRef}
                                onChange={(e) => handleLocalDescription(e?.target?.value, 'localDescription')}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                        <Checkbox
                            color="primary"
                            checked={checked}
                            handleChange={handleChange}
                        />
                        <InputLabel className={classes.inputLabel} style={{ marginRight: 4, fontSize: 16, marginTop: 6 }}>Emergency Batch</InputLabel>
                    </Grid>


                    <Grid style={{ marginTop: 30 }} container justify="space-between" alignItems="center">
                        <Grid item xs={5}>
                            <CustomButton variant="outlined" onClick={handleClearForm}>
                                Clear All
                            </CustomButton>
                        </Grid>

                        <Grid item>
                            {settingsData?.general?.deviceType === 'Manual' ? (
                                <CustomButton
                                    color="primary"
                                    variant="contained"
                                    disabled={
                                        //tagIdList?.length === 0 ||
                                        formData?.batchProduct?.length === 0 ||
                                        !recursiveUpdate?.gtinNumber ||
                                        recursiveUpdate?.gtinNumber?.length === 0 ||
                                        !recursiveUpdate?.batchNumber ||
                                        recursiveUpdate?.batchNumber?.length === 0 ||
                                        !recursiveUpdate?.expiryDate ||
                                        recursiveUpdate?.expiryDate?.length === 0 ||
                                        devicestatus?.deviceStatus === 'DISCONNECTED:1'
                                            ? true
                                            : false
                                    }
                                    onClick={handleManualAssociate}
                                >
                                    Associate Batch
                                </CustomButton>
                            ) : (
                                <CustomButton
                                    color="primary"
                                    variant="contained"
                                    disabled={
                                        tagIdList?.length === 0 ||
                                        formData?.batchProduct?.length === 0 ||
                                        !recursiveUpdate?.gtinNumber ||
                                        recursiveUpdate?.gtinNumber?.length === 0 ||
                                        !recursiveUpdate?.batchNumber ||
                                        recursiveUpdate?.batchNumber?.length === 0 ||
                                        !recursiveUpdate?.expiryDate ||
                                        recursiveUpdate?.expiryDate?.length === 0 ||
                                        devicestatus?.deviceStatus === 'DISCONNECTED:1'
                                            ? true
                                            : false
                                    }
                                    onClick={handleDialog}
                                >
                                    Associate Batch
                                </CustomButton>
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={1} style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Divider variant="fullWidth" orientation="vertical" />
                </Grid>
                <Grid item xs={2} className={classes.tips1}>
                    <Grid container direction="column" justify="space-between">
                        <Typography variant="h5" className={classes.tips}>
                            {CONSTANTS.LABEL_TIPS}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.body}>
                            {CONSTANTS.LABEL_PLEASE} <span className={classes.span}>{CONSTANTS.LABEL_SCAN}</span>{' '}
                            {CONSTANTS.LABEL_THE}
                            <span className={classes.span}>{CONSTANTS.LABEL_BARCODE}</span> on the blood bags, so
                            {CONSTANTS.LABEL_AUTOMATICALLY}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.or}>
                            {CONSTANTS.LABEL_OR}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.body}>
                            {CONSTANTS.LABEL_YOUCANALSO}
                            <span className={classes.span}> {CONSTANTS.LABEL_INPUT}</span> {CONSTANTS.LABEL_THEM}
                            <span className={classes.span}>{CONSTANTS.LABEL_MANUALLY}</span> {CONSTANTS.LABEl_FIELDS}
                        </Typography>
                        <Typography variant="subtitle1" className={`${classes.body} ${classes.butt}`}>
                            {CONSTANTS.LABEL_REQUIREDFIELD}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="md"
                PaperProps={{
                    style: {
                        padding: 20,
                        borderRadius: '10px',
                        backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                        overflowY: 'unset',
                        minWidth: '700px'
                    }
                }}
            >
                <>
                    <DialogTitle color="primary" id="simple-dialog-title">
                        <Typography color="primary" variant="h6" style={{ fontWeight: 'bold' }}>
                            Confirmation
                        </Typography>
                    </DialogTitle>
                    <Divider variant="fullWidth" orientation="horizontal" />

                    <DialogContent>
                        <Grid style={{ marginTop: 30 }}>
                            <>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>&bull;</span> Please make
                                    sure all items on the reader are the{' '}
                                    <span
                                        style={{
                                            color: '#004372',
                                            fontWeight: 'bold',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {formData?.batchProduct}
                                    </span>{' '}
                                    from the same batch.
                                </Typography>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>&bull;</span> There are
                                    <span style={{ color: '#004372', fontWeight: 'bold' }}>
                                        {' '}
                                        {tagIdList?.length}
                                    </span>{' '}
                                    items on the reader.
                                </Typography>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>&bull;</span>{' '}
                                    <span style={{ color: '#004372', fontWeight: 'bold' }}>{tagIdList?.length}</span>{' '}
                                    items will associated once the process is complete.
                                </Typography>
                            </>
                        </Grid>
                        <Divider variant="fullWidth" orientation="horizontal" style={{ marginTop: 30 }} />
                    </DialogContent>

                    <DialogActions style={{ marginRight: 20 }}>
                        <CustomButton variant="outlined" color="primary" onClick={handleDialogClose}>
                            Cancel
                        </CustomButton>
                        <CustomButton variant="contained" color="primary" onClick={handleAssociateBatch}>
                            Confirm
                        </CustomButton>
                    </DialogActions>
                </>
            </Dialog>
            <Dialog
                open={loadingAssociateBatch}
                maxWidth="md"
                onBackdropClick={null}
                PaperProps={{
                    style: {
                        padding: 20,
                        borderRadius: '10px',
                        backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                        overflowY: 'unset',
                        minWidth: '400px'
                    }
                }}
            >
                <>
                    <DialogContent style={{ display: 'flex', gap: 5, paddingTop: 15 }}>
                        <span>
                            <CircularProgress color="primary" />
                        </span>
                        <Typography variant="body1" color="primary" style={{ marginleft: 10, paddingTop: 10 }}>
                            Please wait writing information on tag...
                        </Typography>
                    </DialogContent>
                </>
            </Dialog>
        </Grid>
    );
};

export default AssociateBatch;
