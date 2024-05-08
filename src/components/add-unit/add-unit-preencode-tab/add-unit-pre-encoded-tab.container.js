import { Divider, Grid, Typography, Button, useMediaQuery, InputLabel } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import StopIcon from '@material-ui/icons/Stop';
import ListIcon from '@material-ui/icons/List';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CustomButton from '../../button';
import Hidden from '@material-ui/core/Hidden';
import specialTestingCheck from '../add-unit-form/specialTestingService';
import { getPhenotypeReport } from '../add-unit-form/speciaTNService';
import { checkTextSum } from '../add-unit-form/unitIdService';
import { addSkuAction, clearAddSkuData } from 'redux/actions/associateUnit/addSkuActtions';
import CheckboxComponent from '../../../components/checkbox/checkbox.container';
import { useStyles } from './add-unit-pre-encoded-tab-style';
import DateTimePicker from '../../../components/date-time-picker/date-time-picker.container';
import React, { useState, useEffect } from 'react';
import { preEncodeData } from '../../../pages/assign/assign-page/DummyData';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomSearch from '../../../common/search';
import MTable from '../../scTable';
import moment from 'moment';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Tooltip,
    TableHead,
    CircularProgress
} from '@material-ui/core';
import FormContainer from '../AssociateUnitForm/formContainer';
import response from '../../scTable/Sample.json';
import CONSTANTS from '../../../common/constants';
import NoData from 'components/no data';
import { useDispatch, useSelector } from 'react-redux';
import { getBulkView } from 'redux/actions/bulkView';
import {
    clearAssociteSocketResponse,
    lfScanData,
    preEncodedLocalDataAction,
    assignLocalDataAction,
    clearPreEncodedDataAction,
    socketAssociateAddData,
    socketAssociateBulkData,
    bulkScanLoadingAction,
    socketDeviceStatus
} from 'redux/actions/socketAction';
import { Alert, Checkbox } from 'common';
import { set } from 'date-fns/esm';
import { useLocation } from 'react-router-dom';
// import userLoginResponse from 'common/tempUserAccess.json';
import { get4thDropdown, get5thDropdown, get6thDropdown } from 'redux/actions/manage/manageFieldsAction';

const PreEncodedTab = ({ socketRef, dataJson, associateDevice, props }) => {
    const location = useLocation();
    const { device } = useSelector((state) => state.getSocketDevice);

    const { scanStatus } = useSelector((state) => state.getSocketStartStopScan);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
    const classes = useStyles();
    const [isSingleView, setIsSingleView] = useState(true);
    const [disableAssociateBtn, setDisableAssociateBtn] = useState(true);
    const [checkAll, setcheckAll] = useState(true);
    const [data, setData] = useState();
    const [search, setSearch] = useState();
    const [selectedSearch, setSelectedSearch] = useState();
    let [count, setCount] = useState(1);
    const [unitId, setUnitId] = useState();
    const [check, setCheck] = useState();
    console.log('check--', check);
    const [bloodGroup, setBloodGroup] = useState();
    const [bloodGroupValue, setBloodGroupValue] = useState();
    const [dimension, setDimension] = useState();
    const [expiryDate, setExpiryDate] = useState(null);
    const [collecionDate, setCollecionDate] = useState(null);
    const [specialtesting, setSpecialTesting] = useState();
    const [productCode, setProductCode] = useState();
    const [specialCheck, setSpecialCheck] = useState();
    const [tagId, setTagId] = useState('');
    const [phenoType, setPhenoType] = useState();
    const dispatch = useDispatch();

    const [hostialddValue, setHospitalddvalue] = useState(null);
    const [locationddValue, setLocationddValue] = useState(null);
    const [deviceddValue, setDeviceddValue] = useState(null);

    const maxWidth959 = useMediaQuery('(max-width:1280px)');
    //  const maxWidth1420 = useMediaQuery('(max-width:1420px)');
    const donationUdRef = React.useRef();
    const specialTestingRef = React.useRef();
    const specialRef = React.useRef();
    const blooGroupRef = React.useRef();
    const checkRef = React.useRef();
    const [singleViewAccess, setSingleViewAccess] = useState(false);
    const [bulkViewAccess, setBulkViewAccess] = useState(false);
    const [associateButtonAccess, setAssociateButtonAccess] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const { userAccessData, userAccessLoading } = useSelector((state) => state.getUserAccess);
    //const { preEncodeData } = useSelector((state) => state.getSocketScanData);
    const socket = useSelector((state) => state.socketReducer.socket);
    const displayConfig = useSelector((state) => state.bulkViewReducer);
    const { validationRequired } = useSelector((state) => state.associateValidation);
    const { skuData, skueError, error, bulkView } = useSelector((state) => state.addSkuUnit);
    const [accessableCodes, setAccessableCodes] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [selectedUnits, setSelectedUnits] = useState([]);
    const [selectedData, setSelectedData] = useState(0);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectAllRecords, setSelectedAllRecordsFlag] = useState(false);
    const [unchecked, setUnchecked] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [preEncodeLocalState, setPreEncodeLocalState] = useState([]);
    let { localPreEncode } = useSelector((state) => state.preEncodedLocalDataStore);
    const [eventData, setEventData] = useState();

    console.log("localPreEncode", localPreEncode);
    let scanCount = 0;
    let tagList = [];

    const { options4 } = useSelector((state) => state.get4thDropdown);
    const { options5 } = useSelector((state) => state.get5thDropdown);
    const { options6 } = useSelector((state) => state.get6thDropdown);
    const { lfDevice } = useSelector((state) => state.getLFDevice);

    const [genericValues, setGenericValues] = useState({});
    const { userInfo } = useSelector((state) => state.userLogin);
    const { devicestatus } = useSelector((state) => state.getSocketDeviceStatus)
    console.log("devicestatus preencode", devicestatus);

    const [checked, setChecked] = React.useState();

    const handleChange = (event) => {
        console.log('eventttttt', event)
        setChecked(event.target.checked);
    };
    console.log('checked--', checked)


    //const {
    //    handleTableDate,
    //    successTags,
    //    handleDelete } = props;

    useEffect(() => {
        socket?.on('deviceStatus', (data) => {
            console.log("dev---", data)
            dispatch(socketDeviceStatus(data));
            console.log('appdata---', data)
            console.log("devicests", data?.deviceStatus)

        });
    }, [socket])

    useEffect(() => {
        dispatch(get6thDropdown('clients'));
        let tempAccessCodes = [];
        if (userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1002') {
            tempAccessCodes = ['BS-ACO-1005', 'BS-ACO-1006', 'BS-ACO-1008'];
        } else {
            // confirm('else part in associate');
            let manageAccessCodes =
                userInfo?.data?.userAccess
                    ?.filter((item) => item['drawer-code'] === 'BS-DR-0002')
                    ?.map((subMenu) => subMenu?.menuId)
                    ?.flat()[0] || [];

            let keysOfObject = Object.keys(manageAccessCodes);
            keysOfObject.forEach((item) => {
                if (Array.isArray(manageAccessCodes[item])) {
                    manageAccessCodes[item][0] === '1' && tempAccessCodes.push(manageAccessCodes[item][1]);
                }
            });
            // console.log('BS-ACO-1005', 'single view', keysOfObject, tempAccessCodes, 'BS-ACO-1006', 'bulk view');
        }
        if (tempAccessCodes.includes('BS-ACO-1005')) {
            setSingleViewAccess(true);
        } else {
            setIsSingleView(false);
        }
        if (tempAccessCodes.includes('BS-ACO-1006')) {
            setBulkViewAccess(true);
        }
        if (tempAccessCodes.includes('BS-ACO-1008')) {
            setAssociateButtonAccess(true);
        }

        setAccessableCodes(tempAccessCodes);
        return () => {
            dispatch(clearAssociteSocketResponse());
            //dispatch(socketAssociateBulkData());
            //dispatch(clearPreEncodedDataAction());
        };
    }, [location]);

    const onChangeAutoComplete = (e, value, feild) => {
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

    // const maxWidth1420 = useMediaQuery('(max-width:1420px)');

    const [resultsCount, setResultsCount] = useState('');

    const apiResponse = { data: [] };

    useEffect(() => {
        dispatch(get4thDropdown('devices', undefined, 'associate'));
    }, []);

    const handleCountPlus = () => {
        if (localPreEncode && count < localPreEncode.length) {
            count = count + 1;
            setCount(count);
            setValues(count-1);
        }
    };
    const handleCountMinus = () => {
        if (localPreEncode && count!=1) {
            count = count - 1;
            setCount(count);
            setValues(count-1);
        }
    };
    const { options } = useSelector((state) => state.getDropDown);
    const { options2 } = useSelector((state) => state.get2ndDropdown);

    // console.log(preEncodeData, count);

    const setValues = (index) => {
        if (localPreEncode!==undefined && localPreEncode.length > 0) {
            let tempData = {
                unitId: localPreEncode[index]?.donationCode || '',
                dimension: localPreEncode[index]?.dimension || '',
                expiryDate: localPreEncode[index]?.expiryDateAndTime || '',
                collectionDate: localPreEncode[index]?.collectionDateAndTime || '',
                testingValue: localPreEncode[index]?.specialTesting?.testnumber || '',
                tagId: localPreEncode[index]?.rfidNumber || '',
                isAssociated: localPreEncode[index]?.isAssociated || false,
                check: (localPreEncode[index]?.donationCode === null || localPreEncode[index]?.donationCode === undefined
                    || localPreEncode[index]?.donationCode.length==0) ? false :localPreEncode[index]?.isAssigned ? false : localPreEncode[index]?.isAssociated ? false : true
            };
            console.log('Set values ' + tempData);
            setGenericValues({ ...tempData });
            setPhenoType(localPreEncode[index]?.specialTesting?.phenotypeResult || '');
            //  setPhenoType(preEncodeData[index]?.specialTesting.phenotypeResult);
            console.log("Unit Id = " + localPreEncode[index]?.donationCode);
            const val = checkTextSum(localPreEncode[index]?.donationCode);
            console.log("Check Value " + val);
            setCheck(val);
            setBloodGroup(localPreEncode[index]?.bloodgroupId);
            setProductCode(localPreEncode[index]?.productcodeId);
        } else {
            setCheck("");
        }
    };

    useEffect(() => {
        console.log("New UsseEffect", localPreEncode)
        if (localPreEncode && eventData) {
            const index = localPreEncode.findIndex((ids) => ids.rfidNumber === eventData.rfidNumber);
            if (index === -1) {
                console.log('Added');
                localPreEncode.push(eventData);
            } else {
                localPreEncode = localPreEncode.filter((item) => item.rfidNumber !== eventData.rfidNumber);
                localPreEncode.push(eventData);
            }
            //localPreEncode.push(data?.data[0]);
            console.log('-------localpreencode', localPreEncode);
            //dispatch(SocketScanData(data?.data));
            dispatch(preEncodedLocalDataAction(localPreEncode));
            setEventData(undefined)
        }
    }, [eventData])

    React.useEffect(() => {
        // console.log(socket && device !== '', socket, device);

        if (socket) {
            console.log('socket--', socket);

            socket.on('listenScannedData', (data) => {
                console.log('listenScannedData----', data);
                //  if (data.status === true && device && data?.data.length > 0) {
                if (data.status === true && data?.data.length > 0) {
                    console.log("localPreEncode", localPreEncode);
                    console.log("Dataaa", data?.data);
                    setEventData(data?.data[0])
                    //const index = localPreEncode.findIndex((ids) => ids.rfidNumber === data?.data[0].rfidNumber);
                    //if (index === -1) {
                    //    console.log('Added');
                    //    localPreEncode.push(data?.data[0]);
                    //} else {
                    //    localPreEncode = localPreEncode.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                    //    localPreEncode.push(data?.data[0]);
                    //}
                    ////localPreEncode.push(data?.data[0]);
                    //console.log('-------localpreencode', localPreEncode);
                    ////dispatch(SocketScanData(data?.data));
                    
                    //dispatch(preEncodedLocalDataAction(localPreEncode));
                }
            });

            /* socket.on('reScan', (data) => {
                console.log('reScan----', data);
                if (data.status === true && device && data?.data.length > 0) {

                    const index = localPreEncode.findIndex(ids => ids.rfidNumber === data?.data[0].rfidNumber);
                    if (index === -1) {
                        console.log("Added");
                        localPreEncode.push(data?.data[0]);
                    }
                    else {
                        localPreEncode = localPreEncode.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                        localPreEncode.push(data?.data[0]);
                    }
                    //localPreEncode.push(data?.data[0]);  
                    console.log("-------localpreencode", localPreEncode);
                    //dispatch(SocketScanData(data?.data));                 

                    dispatch(preEncodedLocalDataAction(localPreEncode));
                }
            });*/

            socket.on('RemoveScanTag', (data) => {
                console.log('RemoveScanTag----', data);
                if (data.status === true && device && data?.data.length > 0) {
                    localPreEncode = localPreEncode.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                    console.log('local---', localPreEncode);
                    //dispatch(SocketScanData(data?.data));
                    dispatch(preEncodedLocalDataAction(localPreEncode));
                }
            });
        }

        // console.log(preEncodeData, 'preEncodeData');
        // Testing data
        //if (preEncodeLocalState?.length > 0) {
        //    console.log('preEncodeData', preEncodeLocalState);
        //    dispatch(preEncodedLocalDataAction(preEncodeLocalState));
        //    setSelectedData([]);
        //    setSelectedRecords([]);
        //    setSelectedAllRecordsFlag(false);
        //}
    }, [device]);
    React.useEffect(() => {
        // lfDevice.on("scanstarted", function () {
        //     setStatus("Scanning");
        //     setScanning(true);

        //     console.log("Scan started.");
        //   });

        if (lfDevice) {
            lfDevice.on('scancompleted', function () {
                lfDevice.getLastInventory(function () {
                    // the inventory (resulting from the scan) is ready
                    console.log('Scan completed.');
                    setRowData(tagList);
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
                dispatch(lfScanData({ rfidNumber: tagUid }));
            });
            //   function stopRf() {
            //     if (scanning) {
            //       lfDevice.stopScan();
            //       setScanning(false);
            //     }
            //   }
        }
    }, [lfDevice]);

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearch(val);
    };
    const handleSearchDelete = () => {
        setSearch('');
        setSelectedSearch('');
    };
    const handleSearchSet = () => {
        setSelectedSearch(search);
    };
    const setCheckVal = () => {
        if (unitId) {
            const val = checkTextSum(unitId);
            setCheck(val);
        }
    };
    const setPhenoVal = () => {
        if (specialtesting) {
            const val = specialTestingCheck(specialtesting);
            setSpecialCheck(val);
            const pheno = getPhenotypeReport(specialtesting);
            setPhenoType(pheno);
        }
    };
    useEffect(() => {
        if (localPreEncode.length > 0) {
            setValues(0);
            setCount(1);
            dispatch(getBulkView());
        }
        if (localPreEncode.length === 0) {
            setCount(0);
            setValues(1);
            let tempData = {
                unitId: '',
                dimension: '',
                expiryDate: '',
                collectionDate: '',
                testingValue: '',
                tagId: ''
            };
            setGenericValues({ ...tempData });
            setPhenoType('');
            //  setPhenoType(ting.phenotypeResult);

            setBloodGroup('');
            setProductCode('');
        }
    }, [localPreEncode]);

    useEffect(() => {
        if (skuData && skuData.status) {
            setAlert(true);
            // console.log(bulkView);

            if (bulkView) {
                dispatch(socketAssociateBulkData());
                setValues(1);
                // Rescan functionality added
                console.log('Rescan Triggered');
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
                localPreEncode[count - 1].isAssociated = true;
                dispatch(preEncodedLocalDataAction(localPreEncode));
                dispatch(socketAssociateAddData(localPreEncode[count]));
                if (localPreEncode && count < localPreEncode.length) {
                    console.log('--------------Increase-----------' + count + '-------------------------------');
                    handleCountPlus();
                } else {
                    console.log('--------------Reached-----------' + count - 1 + '-------------------------------');
                    setValues(count - 1);
                }
            }

            /*
            if (count !== 1) {
                handleCountMinus();
            } else if (count === 1) {
                setValues(1);
            }*/

            setAlertMessage(skuData.message);
        }

        return () => setAlert(false);
    }, [skuData]);

    //to show the error while associating unit
    useEffect(() => {
        if (error) {
            setAlertMessage(skueError.errorMessage);

            setAlert(true);
        }
    }, [skueError]);

    useEffect(() => {
        setCheckVal();
        setPhenoVal();
    }, [unitId, specialtesting]);
    const handlePreEncodedAssociateUnit = () => {
        let deviceddValue;
        if (options4) {
            console.log('Device Selected Token ' + token);
            deviceddValue = options4?.data?.filter((item) => item?.status == 1 && item?.token === token);

            console.log('Selected Device' + deviceddValue);
        }

        let collectionName = 'sku';
        console.log('handlePreEncodedAssociateUnit');
        let postData = [
            {
                rfidNumber: genericValues?.tagId,
                rfidData: 'rfid Data',
                donationCode: genericValues?.unitId?.toUpperCase()?.trim(),
                bloodgroupId: bloodGroup?.['_id'],
                productcodeId: productCode?.['_id'],
                locationId: deviceddValue[0]?.locationId[0]?._id || '',
                deviceId: deviceddValue[0]?._id || '',
                clientId: deviceddValue[0]?.clientId[0]?._id || '',
                specialTesting: {
                    phenotypeResult: phenoType,
                    testnumber: genericValues?.testingValue,
                    checkChar: specialCheck
                },
                check: check,
                expiryDateAndTime: genericValues?.expiryDate,
                collectionDateAndTime: genericValues?.collectionDate,
                dimension: genericValues?.dimension || '',
                isEmergency : checked,
            }
        ];
        let validData = postData;

        const body = {
            collectionName,
            validData
        };

        dispatch(addSkuAction(JSON.stringify(body), false));

        //dispatch(preEncodedLocalDataAction([]));
        //dispatch(clearPreEncodedDataAction());
        //dispatch(bulkScanLoadingAction(true));

        // } else if (count === preEncodeData.length) {
        //     setCount(preEncodeData.length);
        //     setValues(preEncodeData.length);
        // }
    };

    const genericEmit = (data) => {
        console.log(data, 'genericEmit method in device selection');
        if (data) {
            socket?.emit('generic', data);
        }
    };

    const handleBulkAssociate = () => {
        let collectionName = 'sku';
        let tempArray = [];
        let deviceddValue;
        if (options4) {
            console.log('Device Selected Token ' + token);
            deviceddValue = options4?.data?.filter((item) => item?.status == 1 && item?.token === token);

            console.log('Selected Device' + deviceddValue);
        }
        localPreEncode.forEach((data) => {
            console.log('Is Checked ----------------' + data?.check);
            if (!data.isAssociated && !data.isAssigned && data?.check && data?.donationCode != null && data?.donationCode.length>0) {
                tempArray.push({
                    rfidNumber: data?.rfidNumber,
                    //rfidData: 'rfid Data',
                    donationCode: data?.donationCode?.trim() ?? data?.donationCode?.toUpperCase()?.trim(),
                    bloodgroupId: data?.bloodgroupId?.['_id'],
                    productcodeId: data?.productcodeId?.['_id'],
                    locationId: deviceddValue[0]?.locationId[0]?._id || '',
                    deviceId: deviceddValue[0]?._id || '',
                    clientId: deviceddValue[0]?.clientId[0]?._id || '',
                    specialTesting: {
                        phenotypeResult: data?.specialTesting?.phenotypeResult,
                        testnumber: data?.specialTesting?.testnumber,
                        checkChar: data?.specialTesting?.checkChar
                    },
                    check: data?.check,
                    expiryDateAndTime: data?.expiryDateAndTime,
                    collectionDateAndTime: data?.collectionDateAndTime,
                    dimension: data?.dimension || '',
                    isEmergency: checked,
                });

                //if (!selectedRecords.includes(data.rfidNumber)) {
                //    selectedRecords.push(data.rfidNumber);
                //}
                //else {
                //    selectedRecords.pop(data.rfidNumber);
                //}
                //setSelectedRecords(selectedRecords);
            }
            console.log('temparray-----', tempArray)
        });

        //if (selectedRecords.length > 0) {
        //    tempArray = tempArray.filter((i) => selectedRecords.includes(i?.rfidNumber));
        //}

        if (tempArray.length > 0) {
            let validData = tempArray;
            const body = {
                collectionName,
                validData
            };
            console.log('temparray-----', tempArray)
            dispatch(addSkuAction(JSON.stringify(body), true));

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
        } else {
            setAlertMessage('No Units Selected.');

            setAlert(true);
        }
    };

    const handleSelect = (selRecords, flag, unSelected, againSelected) => {
        console.log(selRecords, flag, unSelected, againSelected, 'train');
        if (againSelected === true) {
            setSelectedRecords([...selRecords, unSelected]);
        } else if (unSelected !== undefined) {
            setSelectedRecords([...selRecords.filter((item) => item !== unSelected)]);
        } else {
            setSelectedRecords(selRecords);
        }
        setSelectedAllRecordsFlag(flag);
    };

    const tableHandleChange = (changeValue, pageNumberOrPageSizeFlag) => {
        if (changeValue && pageNumberOrPageSizeFlag) {
            if (changeValue > pageNum) setPageNum(changeValue);
        } else {
            setPageSize(changeValue);
            setPageNum(0);
        }
    };
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
        dispatch(clearPreEncodedDataAction())

    };

    const handleTableCheckAll = (e) => {
        let localdata = [];

        localPreEncode.forEach((data) => {
            console.log('dta--', data);
            console.log('Is Checked ----------------', data.check);
            if (data?.isAssociated || data?.isAssigned || !data?.donationCode) {
                data.check = false;
            } else {
                data.check = e.target.checked ? true : false;
            }
            localdata.push(data);
        });

        let val = localPreEncode.filter((item) => item.check === true);
        if (val.length > 0) {
            setcheckAll(true);
        } else {
            setcheckAll(false);
        }

        console.log('localdata---', localdata);
        //dispatch(SocketScanData(data?.data));
        dispatch(preEncodedLocalDataAction(localdata));
    };

    const handleTableCheck = (e, indexm, unit) => {
        console.log('unit', unit);
        console.log('e--', e);
        console.log('indexm--', indexm);

        let preEncodeTable = [...localPreEncode];
        preEncodeTable[indexm].check = e.target.checked ? true : false;

        //if (!selectedRecords.includes(unit.rfidNumber)) {
        //    selectedRecords.push(unit.rfidNumber);
        //}
        //else {
        //    selectedRecords.pop(unit.rfidNumber);
        //}
        //setSelectedRecords(selectedRecords);

        dispatch(preEncodedLocalDataAction(preEncodeTable));
        console.log('selecting----', selectedRecords);
    };

    return (
        <>
            <Grid container wrap="nowrap">
                <form className={classes.form}>
                    <Grid
                        container
                        wrap="nowrap"
                        className={classes.root}
                        direction={maxWidth959 ? 'column' : 'row'}
                        spacing={8}
                    >
                        <Grid item xs={(!isSingleView && 12) || maxWidth959 ? 12 : 9}>
                            <Grid container className={isSingleView ? classes.firstLine : classes.gridLine} spacing={1}>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        disableRipple
                                        disabled={!singleViewAccess}
                                        disableElevation
                                        color="primary"
                                        className={isSingleView ? classes.selectedButton : classes.disabledButton}
                                        onClick={() => setIsSingleView(true)}
                                    >
                                        <StopIcon fontSize="large" />
                                        {CONSTANTS.LABEL_SINGLEVIEW}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        disableRipple
                                        disableElevation
                                        disabled={!bulkViewAccess}
                                        color="primary"
                                        onClick={() => setIsSingleView(false)}
                                        className={isSingleView ? classes.disabledButton : classes.selectedButton}
                                    >
                                        <ListIcon fontSize="large" />
                                        {CONSTANTS.LABEL_BULKVIEW}
                                    </Button>
                                </Grid>
                                {isSingleView ? (
                                    <Grid item xs />
                                ) : (
                                    <Grid item className={classes.deviceNo}>
                                        <Typography color="primary" variant="h6" className={classes.typoDevice}>
                                            {search ? resultsCount : localPreEncode?.length}
                                            {search
                                                ? resultsCount === 1
                                                    ? CONSTANTS.LABEL_UNIT_ON_DEVICE
                                                    : CONSTANTS.LABEL_UNITON
                                                : CONSTANTS.LABEL_UNITON}
                                            {selectedRecords > 0 ? `      (${selectedRecords?.length} selected)` : null}
                                        </Typography>
                                    </Grid>
                                )}

                                {isSingleView && localPreEncode.length > 0 ? (
                                    <Grid item className={classes.countGrid}>
                                        <IconButton onClick={handleCountMinus}>
                                            {count > 1 ? <ArrowBackIosIcon color="primary" /> : <ArrowBackIosIcon />}
                                        </IconButton>
                                        <span className={classes.countSpan}>{count}</span>{' '}
                                        <span className={classes.normalSpan}>
                                            {CONSTANTS.LABEL_OF} {localPreEncode && localPreEncode.length}
                                        </span>
                                        <IconButton onClick={handleCountPlus}>
                                            {count === localPreEncode.length ? (
                                                <ArrowForwardIosIcon />
                                            ) : (
                                                <ArrowForwardIosIcon color="primary" />
                                            )}
                                        </IconButton>
                                    </Grid>
                                ) : isSingleView ? (
                                    <></>
                                ) : (
                                    <Grid item xs={3} className={classes.search}>
                                        {/* <CustomSearch
                                            placeholder="Search"
                                            value={search}
                                            size="lg"
                                            onEnterPress={handleSearchSet}
                                            handleChange={handleSearch}
                                            handleSearch={handleSearchSet}
                                            handleSearchDelete={handleSearchDelete}
                                            disabled={localPreEncode?.length === 0}
                                        /> */}
                                    </Grid>
                                )}
                            </Grid>
                            {isSingleView && <Divider className={classes.margBottom} />}
                            {isSingleView ? (
                                <Grid container>
                                    <FormContainer
                                        checked={checked}
                                        handleChange={handleChange}
                                        isPreEncoded
                                        unitId={unitId}
                                        bloodGroupValue={bloodGroup}
                                        dimension={dimension}
                                        collecionDate={collecionDate}
                                        testingValue={specialtesting}
                                        productCodeValue={productCode}
                                        expiryDate={expiryDate}
                                        donationUdRef={donationUdRef}
                                        specialTestingRef={specialTestingRef}
                                        checkRef={checkRef}
                                        blooGroupRef={blooGroupRef}
                                        specialRef={specialRef}
                                        checkValue={check}
                                        specialCheck={specialCheck}
                                        phenotype={phenoType}
                                        disableAssociateBtn={disableAssociateBtn}
                                        associateButtonAccess={associateButtonAccess}
                                        tagId={tagId}
                                        setTagId={setTagId}
                                        genericValues={genericValues}
                                        setBloodGroupValue={setBloodGroupValue}
                                        handlePreEncodedAssociateUnit={handlePreEncodedAssociateUnit}
                                        hostialddValue={hostialddValue}
                                        deviceddValue={deviceddValue}
                                        locationddValue={locationddValue}
                                        options6={options6}
                                        options4={options4}
                                        options5={options5}
                                        onChangeAutoComplete={onChangeAutoComplete}
                                    />
                                </Grid>
                            ) : (
                                <>
                                    <Grid
                                        container
                                        item
                                        xs={7}
                                        style={{ display: 'flex', padding: '20px', justifyContent: 'space-evenly' }}
                                    >
                                        <Typography className={classes.colorIndication} color="primary">
                                            <FiberManualRecordIcon style={{ color: '#cafccc' }} /> Associated
                                        </Typography>
                                        <Typography className={classes.colorIndication} color="primary">
                                            <FiberManualRecordIcon style={{ color: '#b1dffc' }} /> Already Assigned
                                        </Typography>
                                        <Typography className={classes.colorIndication} color="primary">
                                            <FiberManualRecordIcon style={{ color: '#ff4d4d' }} /> Invalid Data
                                        </Typography>
                                    </Grid>
                                    <Grid container direction="column">
                                        <Grid item xs={12} style={{ marginTop: 5 }}>
                                            {localPreEncode?.length > 0 ? (
                                                //<MTable
                                                //    selectedSearch={search || selectedSearch}
                                                //    setIsSingleView={setIsSingleView}
                                                //    setValues={setValues}
                                                //        response={{
                                                //            data: localPreEncode,
                                                //            displayConfigData: displayConfig?.data?.data[0]?.columnId,
                                                //            page: { filterCount: localPreEncode?.length }
                                                //    }}
                                                //    setResultsCount={setResultsCount}
                                                //    check={check}
                                                //    preEncoded={true}
                                                //    selectAllAccess={true}
                                                //    selectedRecords={selectedRecords}
                                                //    selectAllRecords={selectAllRecords}
                                                //    setUnchecked={setUnchecked}
                                                //    unchecked={unchecked}
                                                //    selectionAccess={true}
                                                //    setSelectedData={setSelectedData}
                                                //    selectedData={selectedData}
                                                //    handleSelect={handleSelect}
                                                //    pageNum={pageNum}
                                                //    pageSize={pageSize}
                                                //    tableHandleChange={tableHandleChange}
                                                ///>

                                                <TableContainer className={classes.tableContainer}>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                {[
                                                                    <>
                                                                        <CheckboxComponent
                                                                            label
                                                                            handleChange={handleTableCheckAll}
                                                                            checked={checkAll}
                                                                            //checked={!localPreEncode.some(ele =>  !ele.isAssigned && !ele.isAssociated && ele.check)}
                                                                        />
                                                                    </>,
                                                                    CONSTANTS.UNIT_ID_NUMBER,                                                                    
                                                                    'Blood Group',
                                                                    CONSTANTS.PRODUCT_CODE,
                                                                    'Expiry Date and Time',
                                                                    'PhenoType',
                                                                    'Collection Date and Time'
                                                                ].map((item, index) => (
                                                                    <TableCell
                                                                        key={index}
                                                                        className={classes.tableHeadCell}
                                                                    >
                                                                        {item === '#' ? '' : item}
                                                                    </TableCell>
                                                                ))}
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {localPreEncode?.map((currentUnit, indexm) => (
                                                                <>
                                                                   
                                                                    <TableRow
                                                                        style={{
                                                                            backgroundColor: currentUnit?.isAssigned
                                                                                ? '#b1dffc'
                                                                                : currentUnit?.isAssociated
                                                                                ? '#cafccc'
                                                                                : !currentUnit?.donationCode
                                                                                ? '#ff4d4d'
                                                                                : '#FFF'
                                                                        }}
                                                                        key={indexm}
                                                                    >
                                                                        <TableCell
                                                                            width={'1%'}
                                                                            className={classes.checkBoxComponent}
                                                                        >
                                                                            <CheckboxComponent
                                                                                label
                                                                                handleChange={(e) =>
                                                                                    handleTableCheck(
                                                                                        e,
                                                                                        indexm,
                                                                                        currentUnit
                                                                                    )
                                                                                }
                                                                                // checked={selectedRecords.includes(currentUnit.rfidNumber) && !currentUnit.isAssociated &&! currentUnit?.isAssigned}
                                                                                // disabled={currentUnit?.isAssociated || currentUnit?.isAssigned ? true : false}
                                                                                checked={
                                                                                    currentUnit?.isAssociated ||
                                                                                    !currentUnit?.donationCode ||
                                                                                    currentUnit?.isAssigned
                                                                                        ? false
                                                                                        : currentUnit.check
                                                                                }
                                                                                disabled={
                                                                                    currentUnit?.isAssociated ||
                                                                                    currentUnit?.isAssigned ||
                                                                                    !currentUnit?.donationCode
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                            />
                                                                            
                                                                        </TableCell>
                                                                        {[
                                                                            'donationCode',
                                                                            'bloodgroupId',
                                                                            'productcodeId',
                                                                            'expiryDateAndTime',
                                                                            'specialTesting',
                                                                            'collectionDateAndTime'
                                                                        ].map((item, index) => (
                                                                            <TableCell
                                                                                key={index}
                                                                                style={{
                                                                                    fontSize: 13,
                                                                                    width:
                                                                                        item === 'productCode'
                                                                                            ? '9%'
                                                                                            : null,
                                                                                    padding: 2
                                                                                }}
                                                                            >
                                                                                {/*{console.log(item)}*/}
                                                                                {/*{console.log(item)}*/}
                                                                                {console.log('curr----', currentUnit[item])}

                                                                                {index == 1
                                                                                    ? currentUnit[item]?.name
                                                                                    : index == 2
                                                                                        ? (currentUnit[item]?.isbtcode !== undefined && currentUnit[item]?.isbtdescription !== undefined)  ? currentUnit[item]?.isbtcode + " | " +currentUnit[item]?.isbtdescription:""
                                                                                    : index == 4
                                                                                            ? currentUnit[item]?.phenotypeResult
                                                                                            : item === 'expiryDateAndTime' ? (
                                                                                                currentUnit[item] === null ? '' :
                                                                                                moment(currentUnit[item]).format('DD-MM-YYYY HH:mm')
                                                                                            ) : item === 'collectionDateAndTime' ? (
                                                                                                currentUnit[item] === null ? '' :
                                                                                                    moment(currentUnit[item]).format('DD-MM-YYYY HH:mm')
                                                                                            )
                                                                                                : currentUnit[item]?.toString()}
                                                                               
                                                                                {/*{currentUnit[item]}*/}
                                                                            </TableCell>

                                                                        ))}
                                                                        {/*<TableCell>*/}
                                                                        {/*    <Grid className={classes.actions}>*/}
                                                                        {/*        <IconButton*/}
                                                                        {/*            className={classes.deleteIcon}*/}
                                                                        {/*            onClick={() => handleDelete(indexm)}*/}
                                                                        {/*        >*/}
                                                                        {/*            <DeleteIcon className={classes.delectIconColor} />*/}
                                                                        {/*        </IconButton>*/}
                                                                        {/*    </Grid>*/}
                                                                        {/*</TableCell>*/}
                                                                    </TableRow>
                                                                </>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            ) : null}
                                            </Grid>

                                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', paddingLeft: '16px' }}>
                                                <Checkbox
                                                    color="primary"
                                                    checked={checked}
                                                    handleChange={handleChange}
                                                />
                                                <InputLabel className={classes.inputLabel} style={{ marginRight: 4, fontSize: 16, marginTop: 6 }}>Emergency Unit</InputLabel>
                                            </Grid>

                                        <Grid className={classes.clear}>
                                            <Grid item container justify="flex-start" style={{ padding: '20px' }}>
                                                <CustomButton
                                                    color="secondary"
                                                    disabled={localPreEncode.length == 0}
                                                    onClick={handleClear}
                                                    variant="contained"
                                                >
                                                    Clear All
                                                </CustomButton>
                                            </Grid>

                                            <Grid item container justify="flex-end" style={{ padding: '20px' }}>
                                                <CustomButton
                                                    color="primary"
                                                    disabled={
                                                        !localPreEncode.some(
                                                            (ele) => !ele.isAssociated && !ele.isAssigned && ele.check
                                                        ) || devicestatus?.deviceStatus === "DISCONNECTED:1"

                                                    }
                                                    onClick={handleBulkAssociate}
                                                    variant="contained"
                                                >
                                                    {CONSTANTS.NAME_ASSOCIATE_UNIT}
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                        {isSingleView && (
                            <Hidden mdDown>
                                <Grid item>
                                    <Divider className={classes.margLeft} orientation="vertical" />
                                </Grid>
                            </Hidden>
                        )}
                        {isSingleView && (
                            <Hidden mdDown>
                                <Grid item xs={2}>
                                    <Grid container direction="column" justify="space-between">
                                        <Typography variant="h5" className={classes.tips}>
                                            {CONSTANTS.LABEL_TIPS}
                                        </Typography>
                                        <Typography variant="subtitle1" className={classes.body}>
                                            <span className={classes.span}>{CONSTANTS.LABEL_SINGLEVIEW}</span> <br />
                                            {CONSTANTS.LABEL_SINGLEVIEWTEXT}
                                        </Typography>

                                        <Typography variant="subtitle1" className={classes.or}></Typography>
                                        <Typography variant="subtitle1" className={classes.body}>
                                            <span className={classes.span}>{CONSTANTS.LABEL_LISTVIEW}</span> <br />
                                            {CONSTANTS.LABEL_LISTVIEWTEXT}
                                        </Typography>
                                        <Typography variant="subtitle1" className={`${classes.body} ${classes.butt}`}>
                                            {CONSTANTS.LABEL_REQUIREDFIELD}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Hidden>
                        )}
                    </Grid>
                </form>
                {alert && (
                    <Alert
                        open={alert}
                        message={alertMessage}
                        duration={1500}
                        onClose={() => {
                            setAlert(false), dispatch(clearAddSkuData());
                        }}
                        vertical={'bottom'}
                        horizontal={'center'}
                        severity={skuData?.status === true ? 'success' : 'error'}
                        actions={false}
                    />
                )}
            </Grid>
        </>
    );
};

export default PreEncodedTab;
