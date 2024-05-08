import AddUnitFormComponent from './add-unit-form.component';
import React, { useState, useRef, useEffect } from 'react';
import { checkTextSum } from './unitIdService';
import { getPhenotypeReport } from './speciaTNService';
import { useSelector, useDispatch } from 'react-redux';
import CONSTANTS from '../../../common/constants';
import {
    get2ndDropdown,
    getDropDown,
    get4thDropdown,
    get5thDropdown,
    get6thDropdown
} from '../../../redux/actions/manage/manageFieldsAction';
import { addSkuAction, clearAddSkuData } from 'redux/actions/associateUnit/addSkuActtions';
import { getData } from 'redux/actions/scGenericApiCalls';
import ConvertToDBDate from './julianDateConverter';
import specialTesingCheck from './specialTestingService';
import { useLocation } from 'react-router-dom';
import { oneTimeScanAction, oneTimeScanERROR, socketDeviceToken, socketDeviceStatus } from 'redux/actions/socketAction';
import { createAlert, getSettings } from 'redux/actions';
import moment from 'moment';

const AddUnitForm = () => {
    //state values of form
    const [productCodeOpen, setProductCodeOpen] = useState(false);
    const [severity, setSeverity] = useState(false);
    const [productCodeValue, setProductCodeValue] = useState('');
    const [bloodGroupOpen, setBloodGroupOpen] = useState(false);
    const [bloodGroupValue, setBloodGroupValue] = useState('');
    console.log('blood----', bloodGroupValue);
    const [collectionDate, setCollectionDate] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);
    const [specialTestingHelperText, setSpecialTestingHelperText] = useState('');
    const [specialCheck, setSpecialCheck] = useState('');
    const [phenotype, setPhenotype] = useState();
    const [testingValue, setTestingValue] = useState();
    const [check, setCheck] = useState('');
    const [hostialddValue, setHospitalddvalue] = useState(null);
    const [locationddValue, setLocationddValue] = useState(null);
    const [deviceddValue, setDeviceddValue] = useState(null);
    const [disableCheck, setDisableCheck] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [genericValues, setGenericValues] = useState({
        unitId: '',
        testingValue: '',
        collectionDate: '',
        expiryDate: '',
        tagId: '',
        dimension: ''
    });
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    const [genericInput, setGenericInput] = useState({});
    const [unitIdHelperText, setUnitIdHelperText] = useState('');
    const [associateLoading, setAssociateLoading] = useState(false);
    const [tagIdLoading, setTagIdLoading] = useState(false);
    const [disableAssociateBtn, setDisableAssociateBtn] = useState(true);
    const [bloodGroupErrortxt, setBloodGroupErrortxt] = useState('');
    const [productCodeErrortxt, setProductCodeErrortxt] = useState('');
    const [collectionDateErrorTxt, setCollectionDateErrorTxt] = useState('');
    const [expiryDateErrorTxt, setExpiryDateErrorTxt] = useState('');

    //ref values to handle focus
    const donationIdRef = useRef();
    const specialTestingRef = useRef();
    const specialRef = useRef();
    const blooGroupRef = useRef();
    const productCodeRef = useRef();
    const checkRef = useRef();
    const phenytypeRef = useRef();
    const specialCheckRef = useRef();
    const dimensionsRef = useRef();
    const tagIdRef = useRef();
    const expiryDateRef = useRef();
    const collectionDateRef = useRef();
    const branchRef = useRef();

    //Global Store Values
    const dispatch = useDispatch();
    const socket = useSelector((state) => state.socketReducer.socket);
    const { device } = useSelector((state) => state.getSocketDevice);
    const { responseData } = useSelector((state) => state.getData);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { validationRequired } = useSelector((state) => state.associateValidation);
    const { options } = useSelector((state) => state.getDropDown);
    const { options2 } = useSelector((state) => state.get2ndDropdown);
    const { options6 } = useSelector((state) => state.get6thDropdown);
    const { options4 } = useSelector((state) => state.get4thDropdown);
    const { options5 } = useSelector((state) => state.get5thDropdown);
    const { skuData, skueError, error } = useSelector((state) => state.addSkuUnit);
    const associateDevice = useSelector((state) => state.getSocketDeviceConnection);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
    const { oneTimeScanTag } = useSelector((state) => state.getSocketScanData);
    const { deviceWriteTagValidation } = useSelector((state) => state.deviceWriteTag);
    const { lfDevice } = useSelector((state) => state.getLFDevice);
    const [expirytimeSelected, setexpirytimeSelected] = useState(0);
    const location = useLocation();
    const { devicestatus } = useSelector((state) => state.getSocketDeviceStatus);
    console.log('devicestatus barcode', devicestatus);

    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        console.log('eventttttt', event)
        setChecked(event.target.checked);
    };
    console.log('checked--', checked)

    useEffect(() => {
        dispatch(getSettings('setting'));
    }, []);
    //for response to dropdowns
    useEffect(() => {
        dispatch(getDropDown('bloodgroups'));
        dispatch(get2ndDropdown('productcodes'));
        // dispatch(get6thDropdown('clients'));
    }, [location]);

    useEffect(() => {
        socket?.on('deviceStatus', (data) => {
            console.log('dev---', data);
            dispatch(socketDeviceStatus(data));
            console.log('appdata---', data);
            console.log('devicests', data?.deviceStatus);
        });
    }, [socket]);

    //to get available devices response
    /* useEffect(() => {
        let filters = JSON.stringify([{ key: 'status', value: 1 }]);
        let collectionName = 'device';
        let pageSize = 1000;
        let pageNum = 1;
        dispatch(getData(collectionName, pageSize, pageNum, undefined, filters));
    }, []);*/

    //function for all the barcoded or manual entry values to save in the form except brach,device and location
    const handleUnitId = (e, text, feild) => {
        console.log('Handle Barcode');
        console.log(e + '------' + text + '-------' + feild);
        let tempGenericValue = { ...genericValues };
        let expiryDate = '';
        if (feild === 'unitId') {
            e = e.toUpperCase();
            console.log(e + 'Converted to Upper Case' + text + '-------' + feild);
        }
        if (feild === 'expiryDate' && e) {
            let date = new Date(e);
            console.log('Expiry Hours' + date.getHours());

            if (expirytimeSelected == 0) {
                console.log('Expiry Default Date Time');
                date.setHours(23, 59, 59, 999);
            } else {
                expiryDate = date?.toString();
            }
            expiryDate = date?.toString();
            if (date instanceof Date && !isNaN(date.valueOf())) {
                setexpirytimeSelected(expirytimeSelected + 1);
            }
        }
        console.log('expiryDate', expiryDate);
        tempGenericValue[feild] =
            feild === 'expiryDate' ? expiryDate : feild !== 'collectionDate' ? e.trim() : e?.toString();
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
                setDisableAssociateBtn(false);
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
    //function to docus on unit id when device is selected

    useEffect(() => {
        if (associateDevice.status) {
            donationIdRef?.current?.focus();
        }
    }, [associateDevice.status]);

    //function for all the barcoded or manual entry values to save in the form except brach,device and location
    useEffect(() => {
        let keys = Object.keys(genericInput);
        tempUnitId(genericInput[keys[0]], keys[1], keys[0]);
    }, [genericInput]);

    useEffect(() => {
        console.log('Validate Data');
        if (
            validationRequired === false &&
            genericValues.unitId &&
            bloodGroupValue &&
            productCodeValue &&
            //genericValues.tagId &&
            genericValues.expiryDate
        ) {
            setDisableAssociateBtn(false);
        } else if (
            validationRequired === true &&
            genericValues?.unitId?.length >= 13 &&
            //genericValues.tagId &&
            productCodeValue &&
            bloodGroupValue &&
            genericValues.expiryDate &&
            check
        ) {
            if (
                genericValues.collectionDate &&
                new Date(genericValues.collectionDate)?.getTime() > new Date(genericValues.expiryDate)?.getTime()
            ) {
                setDisableAssociateBtn(true);
            } else if (genericValues && genericValues.testingValue) {
                if (genericValues.testingValue?.length < 18) {
                    setDisableAssociateBtn(true);
                } else if (!genericValues.testingValue?.match(/^[a-zA-Z0-9]+$/)) {
                    setDisableAssociateBtn(true);
                } else if (genericValues.testingValue.length === 18 && (phenotype === '' || phenotype === undefined)) {
                    setDisableAssociateBtn(true);
                } else if (
                    genericValues.testingValue.length === 18 &&
                    (specialCheck === '' || specialCheck === undefined)
                ) {
                    setDisableAssociateBtn(true);
                } else {
                    setDisableAssociateBtn(false);
                }
            } else if (
                genericValues.collectionDate &&
                new Date(genericValues.collectionDate)?.getTime() < new Date(genericValues.expiryDate)?.getTime()
            ) {
                setDisableAssociateBtn(false);
            } else {
                setDisableAssociateBtn(false);
            }
        } else if (bloodGroupValue === null || bloodGroupValue === undefined) {
            setDisableAssociateBtn(true);
        } else if (productCodeValue === null || productCodeValue === undefined) {
            setDisableAssociateBtn(true);
        } else if (genericValues['tagId'] === '') {
            setDisableAssociateBtn(true);
        } else if (genericValues['unitId'] === '') {
            setDisableAssociateBtn(true);
        } else if (check === '') {
            setDisableAssociateBtn(true);
        } else if (unitIdHelperText) {
            setDisableAssociateBtn(true);
        }
        let tempDate = new Date(genericValues['expiryDate']);
        if (isNaN(tempDate?.getTime())) {
            setDisableAssociateBtn(true);
        }
    }, [
        genericInput,
        productCodeValue,
        bloodGroupValue,
        phenotype,
        specialCheck,
        genericValues,
        check,
        unitIdHelperText
    ]);
    let scanCount = 0;
    let tagList = [];

    React.useEffect(() => {
        if (lfDevice) {
            lfDevice.on('scancompleted', function () {
                lfDevice.getLastInventory(function () {
                    // the inventory (resulting from the scan) is ready
                    console.log('Scan completed');
                    setTagIdLoading(false);
                    if (tagList.length > 1) {
                        dispatch(oneTimeScanERROR());
                        setAlertMessage('Multiple  Tags Detected');
                        setAlert(true);
                        setSeverity(false);
                    } else {
                        dispatch(oneTimeScanAction(tagList[0]));
                    }
                    console.log(tagList);
                });
            });
            lfDevice.on('tagadded', function (tagUid) {
                if (tagUid) {
                    scanCount++;
                    //AddItems(list, tag,tag)
                }
                tagList[scanCount - 1] = tagUid;
                // setTotalCount(count);

                console.log('Tag scanned: ' + tagUid);
                // dispatch(lfScanData({ rfidNumber: tagUid }));
            });
            //   function stopRf() {
            //     if (scanning) {
            //       lfDevice.stopScan();
            //       setScanning(false);
            //     }
            //   }
        }
    }, [lfDevice]);

    const tempUnitId = (e, text, feild) => {
        let tempGenericValue = { ...genericValues };

        if (feild === 'unitId' && check) {
            //if unitId  have an error
            setUnitIdHelperText('');
            setCheck('');
            setDisableCheck(false);
        }

        if (feild === 'testingValue' && specialTestingHelperText) {
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
        } else if (e?.lastIndexOf('=') === 0 && e?.substr(1).match(/^[a-zA-Z0-9]+$/)) {
            // Need to Validate the Barcode Format whether it is ISBT Standard or Australia Standard.

            console.log(' ----- Barcode Scan  ----------- ' + settingsData?.general?.barCodeFormat);
            if (settingsData?.general?.barCodeFormat === 'AUSTRALIAN') {
                if (e?.length === 14) {
                    let checkval = checkTextSum(e.substr(1, 13));
                    setCheck(checkval);
                    setDisableCheck(true);
                    tempGenericValue['unitId'] = e.substr(1, 14);
                    if (feild === 'unitId') {
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
                    tempGenericValue['unitId'] = e.substr(1, 16);
                    if (feild === 'unitId') {
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
        } else if (check && feild === 'unitId' && e.length < 13) {
            setCheck('');
            setUnitIdHelperText('');
            setDisableCheck(false);
        } else if (feild === 'unitId' && e?.match(/^[a-zA-Z0-9]+$/) && validationRequired) {
            console.log(' ----- Manual Enter  ----------- ' + settingsData?.general?.barCodeFormat);

            if (settingsData?.general?.barCodeFormat === 'AUSTRALIAN') {
                if (e?.length === 13) {
                    console.log('Shift Focus 13 Digit');
                    checkRef.current.focus();
                }
            } else {
                if (e?.length === 15) {
                    console.log('Shift Focus 15 digit');
                    checkRef.current.focus();
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
            const subVal = e.substring(2);
            const speicalCheckVal = specialTesingCheck(subVal);
            const phenoVal = getPhenotypeReport(subVal);
            setSpecialCheck(speicalCheckVal);
            setPhenotype(phenoVal);
            if (feild === 'testingValue') {
                tempGenericValue['testingValue'] = subVal;
                shiftFocus(feild);
            } else {
                tempGenericValue[feild] = '';
                tempGenericValue['testingValue'] = subVal;
            }
            removeFoucsFromDropDown(feild);
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
        } else if (specialCheck && phenotype && feild === 'testingValue' && e.length < 18) {
            setSpecialTestingHelperText('');
            setSpecialCheck('');
            setPhenotype('');
        } else if (feild === 'testingValue' && e.length === 18 && !e?.startsWith('=\\')) {
            specialCheckRef.current.focus();
        }
        setGenericValues(tempGenericValue);
    };

    const shiftFocus = (feild, value) => {
        console.log('Shift Focus');
        if (genericValues['unitId'] === '') {
            donationIdRef.current.focus();
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
            expiryDateRef.current.focus();
        } else if (genericValues['testingValue'] === '') {
            specialTestingRef.current.focus();
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

    useEffect(() => {
        console.log('----------------' + socket);
        if (socket) {
            socket.on('generic', (data) => {
                console.log('generic', data);
                if (!data.status) {
                    setAssociateLoading(false);
                    setSeverity(false);
                    setAlert(true);
                    setAlertMessage(data.message);
                }
            });
        }

        console.log('----------------' + oneTimeScanTag);
        if (oneTimeScanTag) {
            setGenericValues({
                ...genericValues,
                tagId: oneTimeScanTag || ''
            });
            handleAssociateUnit(oneTimeScanTag);
        }
    }, [oneTimeScanTag]);

    //in barcode entry focus will not be removed automatically from dropdowns this helper function(removeFoucsFromDropDown) will remove it
    const removeFoucsFromDropDown = (feild) => {
        if (feild === 'productCode') {
            productCodeRef.current.blur();
            productCodeRef.current.focus();
        } else if (feild === 'bloodGroup') {
            blooGroupRef.current.blur();
            blooGroupRef.current.focus();
        }
    };

    const handleClearAllinputs = () => {
        console.log('Clearform clicked');
        dispatch(oneTimeScanAction(''));
        setexpirytimeSelected(0);
        setDisableCheck(false);
        setGenericValues({
            unitId: '',
            testingValue: '',
            collectionDate: '',
            expiryDate: '',
            tagId: '',
            dimension: ''
        });
        setProductCodeValue(null);
        setBloodGroupValue(null);
        setCheck('');
        setSpecialCheck('');
        setPhenotype('');
        donationIdRef.current.focus();
        //setAlertMessage(skuData.message);
        //setDisableAssociateBtn(true);
    };

    // to store the check value
    const handleCheck = (e) => {
        if (e.target.value.length <= 1 && e.target.value !== ' ') {
            const val = e.target.value;
            if (validationRequired) {
                let flag = checkChar(val.toUpperCase());

                if (settingsData?.general?.barCodeFormat === 'AUSTRALIAN') {
                    if (genericValues['unitId'].length < 13) {
                        setUnitIdHelperText('Enter 13 digit value');
                        setCheck(val.toUpperCase());
                        return;
                    } else if (flag) {
                        blooGroupRef.current.focus();
                    }
                } else {
                    if (genericValues['unitId'].length < 15) {
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
    const oneTimeScan = () => {
        console.log('oneTimeScan Initiated');

        socket?.on('oneTimeScan', (data) => {
            console.log('oneTimeScan --- ' + data);

            if (data.status) {
                console.log('oneTimeScan --- ' + 'Success');
                dispatch(oneTimeScanAction(data.data[0]?.rfidNumber));
            } else {
                setTagIdLoading(false);
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: data.message,
                        alertType: 'error'
                    })
                );
            }
        });

        if (lfDevice) {
            setTagIdLoading(true);
            lfDevice.connect();
            if (lfDevice.isInitialized()) {
                lfDevice.requestScan();
            }
        } else if (associateDevice.status) {
            setTagIdLoading(true);
            console.log('triggered');
            socket.emit('generic', {
                method: 'E114',
                deviceToken: token,
                payload: {
                    status: true,
                    userName: userInfo.data.user.username,
                    message: 'onTimeSessionScan'
                }
            });
            setTimeout(() => {
                setTagIdLoading(false);
            }, 10000);
        }
    };

    const handleSpecialCheck = (e) => {
        if (e.target.value.length === 1) {
            const val = e.target.value;
            if (genericValues['testingValue']?.length < 18) {
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
        let value = specialTesingCheck(genericValues['testingValue']);

        if (value && value === val) {
            setSpecialTestingHelperText('');
            if (genericValues['collectionDate'] === '') {
                collectionDateRef.current.focus();
            } else {
                shiftFocus();
            }
            const phenoVal = getPhenotypeReport(genericValues['testingValue']);
            setPhenotype(phenoVal);
        } else {
            setSpecialTestingHelperText('Enter a valid special testing number');
        }
        console.log('value--', value);
        console.log('val---', val);
    };

    const checkChar = (val) => {
        let value = '';

        if (settingsData?.general?.barCodeFormat === 'AUSTRALIAN') {
            value = checkTextSum(genericValues['unitId']?.substr(0, 13));
        } else {
            value = checkTextSum(genericValues['unitId']?.substr(0, 15));
        }

        if (value && value === val) {
            setUnitIdHelperText('');
            return 1;
            //  blooGroupRef.current.focus();
        } else {
            setUnitIdHelperText(CONSTANTS.ERROR_UNIT_ID_MATCH);
            return 0;
        }
    };

    //after getting response to clear input feilds
    useEffect(() => {
        if (skuData && skuData.status) {
            setAlert(true);
            setAssociateLoading(false);
            donationIdRef.current.focus();
            setexpirytimeSelected(0);
            setDisableCheck(false);
            setGenericValues({
                unitId: '',
                testingValue: '',
                collectionDate: '',
                expiryDate: '',
                tagId: '',
                dimension: ''
            });
            setProductCodeValue(null);
            setBloodGroupValue(null);
            setCheck('');
            setSpecialCheck('');
            setPhenotype('');

            setAlertMessage(skuData.message);
            setDisableAssociateBtn(true);
        }

        //return () => setAlert(false);
        return () => {
            setAlert(false);
            dispatch(oneTimeScanAction(''));
            setexpirytimeSelected(0);
            setDisableCheck(false);
            setGenericValues({
                unitId: '',
                testingValue: '',
                collectionDate: '',
                expiryDate: '',
                tagId: '',
                dimension: ''
            });
            setProductCodeValue(null);
            setBloodGroupValue(null);
            setCheck('');
            setSpecialCheck('');
            setPhenotype('');
        };
    }, [skuData]);

    //to show the error while associating unit
    useEffect(() => {
        if (error) {
            setAlertMessage(skueError.errorMessage);
            setAssociateLoading(false);

            setAlert(true);
        }
    }, [skueError]);

    useEffect(() => {
        if (settingsData?.general?.deviceType === 'Manual') {
            dispatch(get4thDropdown('devices', undefined,));
        }
        else {
            dispatch(get4thDropdown('devices', undefined, 'associate'));
        }
    }, []);

    const handleManualAssociateUnit = () => {
        console.log('console');
        let deviceddValue;
        if (options4) {
            console.log('Device Selected Token ' + token);
            deviceddValue = options4?.data?.filter((item) => item && item?.token === token);

            console.log('Selected Device' + deviceddValue);
        }
        if (settingsData?.general?.deviceType === 'Manual') {
            let validData = [
                {
                    rfidNumber: null,
                    donationCode: genericValues.unitId?.toUpperCase(),
                    bloodgroupId: bloodGroupValue?.['_id'],
                    expiryDateAndTime: genericValues?.expiryDate,
                    collectionDateAndTime: genericValues?.collectionDate,
                    dimension: genericValues?.dimension || '',
                    deviceId: (deviceddValue && deviceddValue[0]?._id) || '',
                    locationId: (deviceddValue && deviceddValue[0]?.locationId[0]?._id) || '',
                    clientId: (deviceddValue && deviceddValue[0]?.clientId[0]?._id) || '',
                    check: check,
                    productcodeId: productCodeValue?.['_id'],
                    specialTesting: {
                        phenotypeResult: phenotype,
                        testnumber: genericValues?.testingValue,
                        checkChar: specialCheck
                    },
                    isEmergency: checked
                }
            ];

            socket.emit('manualAssociateUnit', {
                payload: {
                    status: true,
                    userName: userInfo.data.user.username,
                    data: validData
                }
            });
            console.log('manual---', validData);
            socket.on('manualAssociateUnit', (data) => {
                console.log('ack data--', data);
                if (data.status === true) {
                    setAlert(true);
                    setAlertMessage(data.message);
                    setSeverity(true);
                    setGenericValues({
                        unitId: '',
                        testingValue: '',
                        collectionDate: '',
                        expiryDate: '',
                        tagId: '',
                        dimension: ''
                    });
                    setProductCodeValue(null);
                    setBloodGroupValue(null);
                    setCheck('');
                    setSpecialCheck('');
                    setPhenotype('');

                    setAssociateLoading(false);
                    donationIdRef.current.focus();
                } else if (data.status === false) {
                    setAssociateLoading(false);
                    setSeverity(false);
                    setAlert(true);
                    setAlertMessage(data.message);
                }
            });
        }
    };

    const handleAssociateUnit = (rfidNumber) => {
        let deviceddValue;
        if (options4) {
            console.log('Device Selected Token ' + token);
            deviceddValue = options4?.data?.filter((item) => item?.status == 1 && item?.token === token);

            console.log('Selected Device' + deviceddValue);
        }

        if (genericValues.unitId && genericValues.expiryDate && bloodGroupValue && productCodeValue) {
            let collectionName = 'sku';
            let postData = [
                {
                    rfidNumber: rfidNumber,
                    donationCode: genericValues.unitId?.toUpperCase(),
                    bloodgroupId: bloodGroupValue?.['_id'],
                    productcodeId: productCodeValue?.['_id'],
                    locationId: deviceddValue[0]?.locationId[0]?._id || '',
                    deviceId: deviceddValue[0]?._id || '',
                    clientId: deviceddValue[0]?.clientId[0]?._id || '',
                    specialTesting: {
                        phenotypeResult: phenotype,
                        testnumber: genericValues?.testingValue,
                        checkChar: specialCheck
                    },
                    check: check,
                    expiryDateAndTime: genericValues?.expiryDate,
                    collectionDateAndTime: genericValues?.collectionDate,
                    dimension: genericValues?.dimension || '',
                    isEmergency : checked
                }
            ];
            let validData = postData;
            const body = {
                collectionName,
                validData
            };

            console.log('associate data', settingsData?.general?.features?.includes('Write'));
            if (settingsData?.general?.features?.includes('Write')) {
                if (associateDevice.status) {
                    console.log('asso', associateDevice);
                    socket.emit('generic', {
                        method: 'E107',
                        deviceToken: token,
                        payload: {
                            status: true,
                            userName: userInfo.data.user.username,
                            message: 'write on this tag',
                            data: postData
                        }
                    });
                    console.log('token--', {
                        method: 'E107',
                        deviceToken: token,
                        payload: {
                            status: true,
                            userName: userInfo.data.user.username,
                            message: 'write on this tag',
                            data: postData
                        }
                    });
                    setAssociateLoading(true);
                }
                console.log('postdata---', postData);
            } else {
                dispatch(addSkuAction(JSON.stringify(body), false));
                setAssociateLoading(true);
            }
            socket.on('ackWriteTag', (data) => {
                console.log('ack data--', data);
                if (data.status === true) {
                    setAlert(true);
                    setAlertMessage(data.message);
                    setSeverity(true);
                    setGenericValues({
                        unitId: '',
                        testingValue: '',
                        collectionDate: '',
                        expiryDate: '',
                        tagId: '',
                        dimension: ''
                    });
                    setProductCodeValue(null);
                    setBloodGroupValue(null);
                    setCheck('');
                    setSpecialCheck('');
                    setPhenotype('');

                    setAssociateLoading(false);
                    donationIdRef.current.focus();
                } else if (data.status === false) {
                    setAssociateLoading(false);
                    setSeverity(false);
                    setAlert(true);
                    setAlertMessage(data.message);
                }
            });
        }
    };

  

    const onChangeAutoComplete = (e, value, feild) => {
        if (feild === 'bloodGroup') {
            setBloodGroupErrortxt('');
            setBloodGroupValue(value);
            setBloodGroupOpen(false);
            value && value.isbtcode && productCodeRef.current.focus();
        }
        if (feild === 'productCode') {
            setProductCodeErrortxt('');
            setProductCodeValue(value);
            setProductCodeOpen(false);
            value && value.isbtcode && expiryDateRef.current.focus();
        }
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
            if (deviceddValue && deviceddValue._id) {
                setDeviceddValue(null);
            }
        }
        if (feild === 'deviceddValue') {
            setDeviceddValue(value);
        }
    };

    const handleAutoCompleteChange = (e, feild) => {
        if (feild === 'bloodGroup') {
            e?.length > 2 && !e?.includes('=%') ? setBloodGroupOpen(true) : setBloodGroupOpen(false);
            if (e && e?.includes('=%')) {
                let values = options?.data?.find((item) => item.isbtcode.toLowerCase() === e?.substr(2).toLowerCase());
                if (values) {
                    let tempGenericValue = { ...genericValues };
                    tempGenericValue[feild] = values;
                    setBloodGroupErrortxt('');
                    setGenericValues(tempGenericValue);
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
                    setProductCodeErrortxt('');
                    values && values.isbtcode && expiryDateRef.current.focus();
                }
            }
        }
    };

    //const handleClearAllinputs = () => {
    //    console.log("Clearform clicked")
    //    setGenericValues({
    //        unitId: '',
    //        testingValue: '',
    //        collectionDate: '',
    //        expiryDate: '',
    //        tagId: '',
    //        dimension: ''
    //    });
    //    setProductCodeValue(null);
    //    setBloodGroupValue(null);
    //    setCheck('');
    //    setSpecialCheck('');
    //    setPhenotype('');

    //    setAlertMessage(skuData.message);
    //    setDisableAssociateBtn(true);
    //}

  

    
    return (
        <AddUnitFormComponent
            checked={checked}
            handleChange={handleChange}
            handleClearAllinputs={handleClearAllinputs}
            handleUnitId={handleUnitId}
            check={check}
            handleCheck={handleCheck}
            unitIdHelperText={unitIdHelperText}
            checkChar={checkChar}
            productCodeOpen={productCodeOpen}
            setProductCodeOpen={setProductCodeOpen}
            bloodGroupOpen={bloodGroupOpen}
            setBloodGroupOpen={setBloodGroupOpen}
            collectionDate={collectionDate}
            setCollectionDate={setCollectionDate}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            specialTestingHelperText={specialTestingHelperText}
            setSpecialTestingHelperText={setSpecialTestingHelperText}
            testingValue={testingValue}
            setTestingValue={setTestingValue}
            bloodGroupValue={bloodGroupValue}
            setBloodGroupValue={setBloodGroupValue}
            donationUdRef={donationIdRef}
            specialTestingRef={specialTestingRef}
            checkRef={checkRef}
            blooGroupRef={blooGroupRef}
            specialRef={specialRef}
            specialCheck={specialCheck}
            setSpecialCheck={setSpecialCheck}
            phenotype={phenotype}
            setPhenotype={setPhenotype}
            phenytypeRef={phenytypeRef}
            specialCheckRef={specialCheckRef}
            productCodeValue={productCodeValue}
            setProductCodeValue={setProductCodeValue}
            productCodeRef={productCodeRef}
            productCodesReponse={options2?.data}
            bloodGroupReponse={options?.data}
            handleAssociateUnit={oneTimeScan}
            handleManualAssociateUnit={handleManualAssociateUnit}
            skuError={skueError}
            skuData={skuData}
            setAlert={setAlert}
            alert={alert}
            associateDevice={associateDevice}
            disableCheck={disableCheck}
            tagIdRef={tagIdRef}
            onChangeAutoComplete={onChangeAutoComplete}
            handleAutoCompleteChange={handleAutoCompleteChange}
            expiryDateRef={expiryDateRef}
            collectionDateRef={collectionDateRef}
            dimensionsRef={dimensionsRef}
            alertMessage={alertMessage}
            genericValues={genericValues}
            hostialddValue={hostialddValue}
            deviceddValue={deviceddValue}
            locationddValue={locationddValue}
            options6={options6}
            options4={options4}
            options5={options5}
            handleSpecialCheck={handleSpecialCheck}
            severity={severity}
            //oneTimeScan={oneTimeScan}
            associateLoading={associateLoading}
            tagIdLoading={tagIdLoading}
            branchRef={branchRef}
            disableAssociateBtn={disableAssociateBtn}
            bloodGroupErrortxt={bloodGroupErrortxt}
            productCodeErrortxt={productCodeErrortxt}
            expiryDateErrorTxt={expiryDateErrorTxt}
            collectionDateErrorTxt={collectionDateErrorTxt}
            devicestatus={devicestatus}
        />
    );
};

export default AddUnitForm;
