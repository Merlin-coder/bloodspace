import React, { useEffect, useState } from 'react';
import {
    Card,
    Box,
    Grid,
    InputLabel,
    makeStyles,
    Paper,
    Typography,
    DialogActions,
    CircularProgress,
    Switch,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent
} from '@material-ui/core';
import './style.css';
import WarningIcon from '@material-ui/icons/Warning';
import { CancelOutlined } from '@material-ui/icons';
import { CustomDialog, CustomInput } from 'components';
import { CustomButton, DatePicker, CONSTANTS } from 'common';
import Grouped from '../../../manage/movement/GenericRulesAutoComplete';
import warningIcon from '../../../../assets/warningIcon.svg';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
    clearData,
    createAlert,
    clearUnitBatchData,
    getData,
    getRemoteAccessDevice,
    socketSessionIdAction,
    getRemoteAssignAction,
    ledSelection,
    postUserRoleAction,
    clearPostUserRoleAction
} from 'redux/actions';
import {
    getCondition,
    getAll,
    getResolutionType,
    getnotificationTypes,
    postNotification,
    putRulesData,
    getResolutionSubType,
    getAllCondition
} from 'redux/actions/manage/rulePageAction';
import { getDropDown } from '../../../../redux/actions/manage/manageFieldsAction';
import moment from 'moment';
import { units } from './data';
import { useStyles } from './style';
import TimerIcon from '@material-ui/icons/Timer';
import RemoveCard from './Card';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { getUnitBatch } from 'redux/actions/scGenericApiCalls';
import { pullOutAction, requestRemoteAllocation } from 'redux/actions/manage/scManageActions';
import { deviceLogout } from 'redux/actions/auth/authActions';
import lockIcon from '../../../../assets/lockIcon3.png';
import { useHistory } from 'react-router-dom';
import ExpandableCard from '../expandableCard';
import GoodUnits from './goodUnitsForRemove';
import beep from 'common/services/beepSound';
import { clearDeviceBatchesResponse, getBatchesByDeviceAction } from 'redux/actions/remoteDashboardActions';
import hours_48_From_Now from 'common/services/FourtyEightHours';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const RemoveUnits = (props) => {
    const { handleDeviceExit, accessableCodes, lfDeviceEvent } = props;
    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));
    //const { Lf_Hf_TagValidation } = useSelector((state) => state.lfTag);
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    const { userInfo } = useSelector((state) => state.userLogin);
    let accessDeviceName = JSON.parse(localStorage.getItem('accessDeviceName'))?.toUpperCase();
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    let deviceName = JSON.parse(localStorage.getItem('deviceName'))?.toUpperCase();
    // console.log(deviceName,'deviceName', accessDeviceName, props);
    const [patientMRN, setPatientMRN] = useState('');
    const [patientSurname, setPatientSurname] = useState(null);
    const [patientDOB, setPatientDOB] = useState(null);
    const [screen, setScreen] = useState(0);
    console.log('screen----', screen);
    const [factData, setFactData] = useState({});
    console.log('fact---', factData);
    const { allData } = useSelector((state) => state.getAll);
    console.log('all---', allData);
    const [factNo, setFactNo] = useState(1);
    const [mutlipleRulesObject, setMultipleRulesObject] = useState([]);
    const [subTypeFlag, setSubTypeFlag] = React.useState(false);
    const [count, setCount] = useState(null);
    const [open, setOpen] = useState(false);
    const { loading, responseData } = useSelector((state) => state.getData);
    console.log('responseeee', responseData);
    const { dataResponse, dataLoading } = useSelector((state) => state.getUnitBatch);
    console.log('loading---', dataLoading);
    const [rows, setRows] = useState([]);
    const [counter, setCounter] = useState(40);
    console.log(counter, 'count--');
    const [resetBoolean, setResetBoolean] = useState(false);
    const [goodUnits, setGoodUnits] = useState([]);
    console.log('good===', goodUnits);
    const [badUnits, setBadUnits] = useState([]);
    const [isGoodUnits, setIsGoodUnits] = useState(false);
    console.log('isGoodUnits', isGoodUnits);
    const [isErrorUnits, setIsErrorUnits] = useState(false);
    const [isUnitsRemoved, setisUnitsRemoved] = useState(false);
    const [isDoorLocked, setIsDoorLocked] = useState(false);
    const [errorRows, setErrorRows] = useState();
    const [redirectCounter, setRedirectCounter] = useState(5);
    console.log(redirectCounter);
    const socket = useSelector((state) => state.socketReducer.socket);
    const { pullOutLoading, pullOutSuccess, pullOutError } = useSelector((state) => state.postPullOutReducer);
    const [pullOutId, setPullOutId] = useState('');
    const { dateFormat } = useSelector((state) => state.dateFormat);
    const [searchCLicked, setSearchClicked] = useState(false);
    const remoteDBAccessDeviceId = useSelector((state) => state.remoteDBAccessDeviceStore);
    const [grayUnits, setGrayUnits] = useState([]);
    const [addBatchProducts, setAddBatchProducts] = useState(false);
    const { deviceBatchLoading, deviceBatchSuccess, deviceBatchError } = useSelector(
        (state) => state?.getBatchesByDeviceStore
    );
    const [selectedBatchProduct, setSelectedBatchProduct] = useState({});
    const [moreCountDialog, setMoreCountDialog] = useState(false);
    const [formScreen, setFormScreen] = useState(false);
    const [countError, setCountError] = useState('');
    const [selectedCount, setSelectedCount] = useState(0);

    const [selectedBatchId, setSelectedBatchId] = useState(null);
    const [selectedUnitsState, setSelectedUnitsState] = useState([]);
    const [unSelectedUnitsState, setUnSelectedUnitState] = useState([]);
    const [selectedUnits, setSelectedUnits] = useState([]);
    const [allocationNoAccess, setAllocationNoAccess] = useState(false);
    const [allocationRequest, setAllocationRequest] = useState(false);
    const [comments, setComments] = useState();
    const [allocationNum, setAllocationNum] = useState('1');
    const [incrementcounter, setIncrementCounter] = useState(0);
    console.log('ocation---', allocationNum);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const { requestRemoteAllocationdata, requestRemoteAllocationError } = useSelector(
        (state) => state.requestRemoteAllocation
    );
    console.log('requestRemoteAllocation---', requestRemoteAllocationdata, requestRemoteAllocationError);
    console.log('requestRemoteAllocationerror---', requestRemoteAllocationError);
    const [loadingOpen, setLoadingOpen] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState('');

    const { deviceLoading, deviceError, deviceUserInfo } = useSelector((state) => state.deviceLogin);
    // let prefix = deviceUserInfo?.data?.userData?.prefix;

    const [goodBatchData, setGoodBatchData] = useState([]);
    const [badBatchData, setBadBatchData] = useState([]);

    const [prefixValue, setPrefixValue] = useState('');

    const { postUserRoleAccessLoading, postUserRoleAccessSuccess, postUserRoleAccessError } = useSelector(
        (state) => state.postUserRoleAccessStore
    );
    console.log('postUserRoleAccessSuccess--', postUserRoleAccessSuccess);
    const genericEmit = (method, type) => {
        let data = {
            token: devDeviceId?.token,
            method: method,
            payload: {
                userName: userInfo.data.user.username
            }
        };
        if (data) {
            socket?.emit('generic', data);
            console.log(data);
        }
    };

    const handleSelectNumber = (number) => {
        console.log('SettingallocationNum:', number);
        setAllocationNum(number);
        setSelectedNumber(number);
    };

    const handleAssignBatchClick = () => {
        if (responseData?.data?.length !== 0 && (patientMRN > 3 || patientDOB !== null || patientSurname !== null)) {
            const remoteAssignData = [
                {
                    batchId: selectedBatchProduct?._id ? selectedBatchProduct?._id : [],
                    recipientId: responseData?.data?.[0]?._id,
                    'track-code': 'BS-TR-5103',
                    count: Number(selectedCount),
                    dereservationDateAndTime: hours_48_From_Now(),
                    comments: ''
                }
            ];
            dispatch(getRemoteAssignAction(remoteAssignData));
        }
    };
    const handleRequestPulloutAPi = (tempSelectedData, batchCount, put) => {
        console.log('handleRequestPulloutAPi-----------' + put);
        setSearchClicked(true);
        setResetBoolean(true);
        let data;

        if (put) {
            data = {
                _id: pullOutId,
                recipientId: responseData?.data?.[0]?._id,
                requestListToPullOut: tempSelectedData,
                batchId: [],
                batchCount: 0
            };
        } else {
            data = {
                recipientId: responseData?.data?.[0]?._id,
                requestListToPullOut: tempSelectedData,
                batchId: [],
                batchCount: 0
            };
        }
        if (batchCount) {
            // handleAssignBatchClick();
            data = {
                _id: pullOutId,
                batchId: selectedBatchProduct?._id ? selectedBatchProduct?._id : [],
                batchCount: batchCount ? batchCount : 0,
                recipientId: responseData?.data?.[0]?._id,
                requestListToPullOut: tempSelectedData
            };
        }
        let tempValidData = tempSelectedData.map((ele) => {
            return { refskuId: ele, 'track-code': 'BS-TR-5114', comments: 'trigger' };
        });
        let formData = {
            collectionName: 'activity',
            validData: tempValidData
        };
        if (settingsData?.general?.features?.includes('Led')) {
            dispatch(ledSelection(formData, true));
        }
        if (put) {
            dispatch(pullOutAction(data, true));
        } else {
            dispatch(pullOutAction(data));
        }
    };

    const handleDialogCount = (e) => {
        if (addBatchProducts) {
            setSelectedCount(e?.target?.value);
        } else {
            if (e.target.value > rows.length) {
                setCountError(`count should be grater than 4 and less than ${rows?.length}`);
            } else {
                let tempSelectedUnits = [];
                let tempSelectedData = rows.map((i, index) => {
                    if (index < parseInt(e.target.value)) {
                        tempSelectedUnits.push({ ...i, isSelected: true });
                        return { ...i, isSelected: true };
                    } else {
                        return i;
                    }
                });
                setCount(e.target.value);
                setSelectedUnits(tempSelectedUnits);
                setSelectedUnitsState(tempSelectedData);
            }
        }
    };

    const handleExpandClick = (id) => {
        setResetBoolean(true);
        let tempRows = [];
        if (id?.isSelected) {
            let tempSelectedUnits = selectedUnitsState.filter((i) => i?._id !== id?._id);
            let tempSelected = selectedUnitsState.map((i, index) => {
                if (id._id === i._id) {
                    return { ...i, isSelected: false };
                } else {
                    if (i.isSelected) {
                        tempRows.push(i?._id);
                    }
                    return i;
                }
            });
            setCount(count - 1);
            setSelectedUnits(tempSelectedUnits);
            setSelectedUnitsState(tempSelected);
        } else {
            let tempSelectedUnits = [...selectedUnits];
            let tempSelected = selectedUnitsState.map((i, index) => {
                if (id._id === i._id) {
                    tempRows.push(i?._id);
                    tempSelectedUnits.push({ ...i, isSelected: true });
                    return { ...i, isSelected: true };
                } else {
                    if (i.isSelected) {
                        tempRows.push(i?._id);
                    }
                    return i;
                }
            });
            setCount(count + 1);
            setSelectedUnits(tempSelectedUnits);
            setSelectedUnitsState(tempSelected);
        }
        let data = {
            _id: pullOutId,
            recipientId: responseData?.data?.[0]?._id,
            requestListToPullOut: tempRows
        };
        dispatch(pullOutAction(data, true));
    };

    useEffect(() => {
        if (deviceUserInfo?.data?.userData?.prefix) {
            setPrefixValue(deviceUserInfo?.data?.userData?.prefix);
        }
    }, [deviceUserInfo]);

    const handlePreFixValue = (e) => {
        setPrefixValue(e.target.value?.toUpperCase());
    };

    const handlePatientMRN = (e) => {
        if (e?.target?.value?.includes('-')) {
            // YH-968655
            let tempPreMrt = e?.target?.value?.split('-');
            setPatientMRN(tempPreMrt[1]?.toUpperCase());
            setPrefixValue(tempPreMrt[0]?.toUpperCase());
        } else {
            setPatientMRN(e.target.value);
        }
    };
    const handlePatientSurname = (e) => {
        setPatientSurname(e.target.value);
    };

    const handleDecrimentCounter = () => {
        if (resetBoolean) {
            setResetBoolean(false);
            if (counter === 40) {
                setCounter(39);
            } else {
                setCounter(counter - 1);
            }
        } else {
            setCounter(counter - 1);
        }
    };
    useEffect(() => {
        counter > 0 && searchCLicked && !isGoodUnits && setTimeout(() => handleDecrimentCounter(), 1000);
        if (counter === 39 && devDeviceId?.deviceTypeId?.[0]?.name?.toLowerCase()?.includes('lf')) {
            lfDeviceEvent();
        }
        if (counter === 0) {
            setScreen(2);
            setAddBatchProducts(false);
            setIsGoodUnits(false);
            setIsErrorUnits(false);
            setIsDoorLocked(true);
            setSearchClicked(true);
            setRedirectCounter(5);
            // setTimeout(() => redirectTORDashBoard(), 5000);
        }
    }, [counter, searchCLicked]);

    const redirectTORDashBoard = () => {
        history?.push('/dashboard/remote-dashboard');
    };

    useEffect(() => {
        redirectCounter > 0 && searchCLicked && setTimeout(() => setRedirectCounter(redirectCounter - 1), 1000);
        if (isDoorLocked && redirectCounter > 0) {
            setTimeout(() => setRedirectCounter(redirectCounter - 1), 1000);
        }
        if (redirectCounter === 0) {
            //redirectTORDashBoard();
            //handleAssignBatchClick();
        }
    }, [redirectCounter, isDoorLocked, isGoodUnits]);
    // console.log(redirectCounter,'redirectCounter');
    //const redirectTORDashBoard = () => {
    //    handleDeviceExit();
    //    setSearchClicked(false);
    //    dispatch(clearUnitBatchData());
    //    dispatch(clearData());
    //    dispatch(deviceLogout());
    //    history.push('/dashboard/remote-dashboard');
    //};

    const cards = [
        { id: 0, name: '1' },
        { id: 1, name: '2' },
        { id: 2, name: '3' },
        { id: 3, name: '4' }
    ];
    const handleSearchClick = () => {
        // prefix
        let mrnFilter = [];
        if (patientSurname?.length > 0) {
            let lastnameSearch = String(patientSurname?.trim());
            dispatch(
                getData(
                    'recipient',
                    1,
                    1,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    lastnameSearch
                )
            );
        } else {
            //     prefixValue?.trim().length > 0 ? prefixValue?.trim() + '-' + patientMRN?.trim() : patientMRN?.trim();
            if (patientMRN?.length > 0) {
                mrnFilter = [...mrnFilter, { key: 'mrnNumber', value: patientMRN?.trim() }];
            }
            if (prefixValue?.length > 0) {
                mrnFilter = [...mrnFilter, { key: 'prefix', value: prefixValue?.trim() }];
            }
            //if (patientSurname?.length > 0) {
            //    mrnFilter = [...mrnFilter, { key: 'lastName', value: patientSurname?.trim() }];
            //}
            const DOB = patientDOB?.split('T')[0];
            console.log(DOB, 'DOB');
            if (patientDOB?.length > 0) {
                mrnFilter = [...mrnFilter, { key: 'dob', value: [DOB?.trim(), DOB.trim()] }];
            }
            console.log(mrnFilter, 'mrnFilter');
            dispatch(getData('recipient', 1, 1, undefined, mrnFilter));
        }
    };

    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        // Function to call the API
    }, []);

    useEffect(() => {
        setRows(dataResponse?.unitData);
    }, [dataResponse]);

    useEffect(() => {
        console.log('--------------Units length ------------- ' + responseData?.data?.length);
        if (isGoodUnits) {
            setScreen(2);
        } else {
            responseData?.data?.length > 0 && setScreen(1);
        }
    }, [responseData, isGoodUnits]);

    useEffect(() => {
        // to do make device id dynamic
        //setLoadingOpen(false);
        screen === 1 &&
            responseData?.data?.length > 0 &&
            dispatch(
                getUnitBatch(
                    JSON.stringify([
                        { key: 'deviceId', value: devDeviceId?._id },
                        { key: 'recipientId', value: responseData?.data?.[0]?._id }
                    ])
                )
            );
    }, [screen]);

    // const selectedUnits = selectedUnitsState?.filter((row) => row.isSelected);

    const handleBatchCount = (id) => {
        setSearchClicked(true);
        setResetBoolean(true);
        setSelectedCount(id);
        console.log('handleBatchCount');
        let tempRows = selectedUnitsState.filter((i) => i.isSelected).map((i) => i._id);
        handleRequestPulloutAPi(tempRows, parseInt(id), true);
        setScreen(4);
    };

    const handleCountClick = (name) => {
        //setCounter(40);
        console.log('CON----', counter);
        genericEmit('E130', 'Remove Unit');
        setSearchClicked(true);
        if (rows.length > 0) {
            let tempRows = [];
            let tempSelectedUnits = [];
            let tempSelectedData = rows.map((i, index) => {
                if (index < parseInt(name)) {
                    tempRows.push(i?._id);
                    tempSelectedUnits.push({ ...i, isSelected: true });
                    return { ...i, isSelected: true };
                } else {
                    return i;
                }
            });
            console.log('handleCountClick');
            handleRequestPulloutAPi(tempRows);
            setSelectedUnits(tempSelectedUnits);
            setSelectedUnitsState(tempSelectedData);
        }
        setCount(parseInt(name));
        setScreen(4);
    };

    const handleResetCounter = () => {
        setResetBoolean(true);
    };

    useEffect(() => {
        // console.log((badUnits?.length > 0 || badBatchData.length > 0) && isErrorUnits && searchCLicked);
        if (
            badUnits?.length === 0 &&
            badBatchData.length === 0 &&
            goodUnits?.length === 0 &&
            isErrorUnits &&
            goodBatchData?.length === 0 &&
            searchCLicked
        ) {
            setIsErrorUnits(false);
            setScreen(4);
            console.log('no bad units');
        }
        if (badUnits?.length > 0 || badBatchData.length > 0) {
            setIsErrorUnits(true);
            setScreen(2);
            console.log('bad units');
            console.log('My Socket >> deviceActivity>>> return  unit Unlock Event Fired');
            //genericEmit("E130", 'Return Unit');
        }

        if (
            selectedUnits?.length === goodUnits?.length &&
            goodUnits?.length > 0 &&
            parseInt(selectedCount) === 0 &&
            badUnits?.length === 0 &&
            badBatchData?.length === 0 &&
            searchCLicked &&
            !addBatchProducts
        ) {
            setGrayUnits([]);
            setRedirectCounter(5);
            setIsDoorLocked(true);
        } else if (
            selectedUnits?.length === goodUnits?.length &&
            goodUnits?.length > 1 &&
            parseInt(selectedCount) > 0 &&
            parseInt(selectedCount) == goodBatchData?.length &&
            badUnits?.length === 0 &&
            badBatchData?.length === 0 &&
            searchCLicked
        ) {
            setGrayUnits([]);
            setRedirectCounter(5);
            setIsDoorLocked(true);
        } else if (goodUnits?.length < selectedUnits?.length && searchCLicked) {
            setResetBoolean(true);
            let tempGrayUnits = [];
            selectedUnits.forEach((item) => {
                if (goodUnits.findIndex((i) => i.refSku._id === item._id) === -1) {
                    tempGrayUnits.push(item);
                }
            });
            setGrayUnits([...goodUnits, ...tempGrayUnits]);
        }
    }, [goodUnits, badUnits, badBatchData, goodBatchData]);
    useEffect(() => {
        socket?.on('deviceActivity', (data) => {
            if (data?.sessionData?._id) {
                dispatch(socketSessionIdAction({ _id: data?.sessionData?._id }));
            }
            console.log('My Socket >> deviceActivity>>> remove unit', searchCLicked, data);
            if (!isDoorLocked && (data?.badData?.length > 0 || data?.badBatchData?.length > 0)) {
                beep();
                setScreen(2);
                setResetBoolean(true);
                setIsErrorUnits(true);
                setIsGoodUnits(false);
                console.log('My Socket >> deviceActivity>>> return  unit Unlock Event Fired', searchCLicked, data);
                //genericEmit("E130", 'Return Unit');
            } else if (
                (data?.goodData?.length > 0 || data?.goodBatchData?.length > 0) &&
                (data?.badData?.length === 0 || data?.badBatchData?.length === 0)
            ) {
                setScreen(2);
                setIsErrorUnits(false);
                setIsGoodUnits(true);
            }
            setBadUnits(data?.badData ?? []);
            setGoodUnits(data?.goodData ?? []);
            setBadBatchData(data?.badBatchData ?? []);
            setGoodBatchData(data?.goodBatchData ?? []);
            setisUnitsRemoved(data?.unitsRemoved);
        });
    }, [socket]);

    useEffect(() => {
        if (pullOutSuccess?.status) {
            setPullOutId(pullOutSuccess?.data?._id);
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: pullOutSuccess?.message,
                    alertType: 'success'
                })
            );
        }
        if (pullOutError) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: pullOutError?.errorMessage,
                    alertType: 'error'
                })
            );
        }
    }, [pullOutSuccess, pullOutError]);

    const handleOkClick = () => {
        setLoadingOpen(false);
    };
    const handleBackClick = () => {
        setScreen(0);
        setPatientMRN('');
        setPatientDOB(null);
    };

    const handleSwitch = () => {
        if (addBatchProducts) {
            setResetBoolean(true);
        } else {
            setScreen(2);
            setSearchClicked(false);
            let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));
            dispatch(getBatchesByDeviceAction(JSON.stringify(devDeviceId?._id)));
            setResetBoolean(true);
        }

        setAddBatchProducts(!addBatchProducts);
    };

    const handleCardClick = (batchProduct) => {
        setSelectedBatchProduct(batchProduct);
        setScreen(3);
    };

    const getDate = (d) => {
        let date = new Date(d);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        console.log(year + '-' + month + '-' + dt);
        return dt + '-' + month + '-' + year;
    };

    const handlMoreCountDialog = () => {
        console.log('handlMoreCountDialog');

        if (
            addBatchProducts &&
            moreCountDialog &&
            selectedCount > 4 &&
            selectedCount <= selectedBatchProduct?.deviceBatches?.count
        ) {
            let tempRows = selectedUnitsState.filter((i) => i.isSelected).map((i) => i?._id);
            handleRequestPulloutAPi(tempRows, selectedCount, true);
            setSearchClicked(true);
            setResetBoolean(true);
            setCountError('');
            setMoreCountDialog(false);
            setScreen(4);
        } else if (moreCountDialog && count > 4 && count <= rows?.length) {
            let tempRows = selectedUnitsState.filter((i) => i.isSelected).map((i) => i?._id);
            handleRequestPulloutAPi(tempRows);
            setSearchClicked(true);
            setResetBoolean(true);
            setCountError('');
            setMoreCountDialog(false);
            setScreen(4);
        } else if (!moreCountDialog) {
            setMoreCountDialog(true);
        }
    };

    const handleBadUnitsExpandClick = (id) => {
        let tempBadUnits = [];
        if (id.isExpanded) {
            tempBadUnits = badUnits.map((i) => {
                if (i?.refSku?.donationCode === id?.refSku?.donationCode) {
                    return { ...id, isExpanded: false };
                } else {
                    return i;
                }
            });
        } else {
            tempBadUnits = badUnits.map((i) => {
                if (i?.refSku?.donationCode === id?.refSku?.donationCode) {
                    return { ...id, isExpanded: true };
                } else {
                    return i;
                }
            });
        }
        setBadUnits(tempBadUnits);
    };

    const [product, setProduct] = useState();
    const [productCodeId, setProductCodeId] = useState();
    const handleDataSelect = (e, value, feild, i) => {
        console.log('value', value);
        setProduct(value?.name);
        setProductCodeId(value?._id);
        //setFacTypeText('');
        //setResolutionTypeText('');
        //setNotificationTypeText('');
        if (feild === 'factTypes') {
            setFactData({});
        }
        if (feild === `condition${i}`) {
            if (factData[`condition${i}`] !== 'Select' && value?.name === 'Select') {
                return;
            }

            if (
                (value?.name !== 'Select' && factData[`condition${i}`] === null) ||
                factData[`condition${i}`] == '' ||
                factData[`condition${i}`] === undefined
            ) {
                setFactNo((prev) => prev + 1);
            }
        }

        let tempFactData = { ...factData };
        tempFactData[feild] = value;
        if (feild.includes(`condition${i}`)) {
            let tempMultipleFacts = [...mutlipleRulesObject];
            tempMultipleFacts[i] = {
                conditionIndex: i,
                conditionType: value?.name,
                selectedResolution: factData[`selectedResolution${i}`]?._id,
                selectedFact: factData[`selectedFact${i}`]?._id
            };
            setMultipleRulesObject(tempMultipleFacts);
        }
        if (feild === 'factTypes') {
            delete tempFactData['options'];
            delete tempFactData['DurationInMin'];
            delete tempFactData['DurationInSec'];
            delete tempFactData['Maximum'];
            delete tempFactData['Minimum'];
            delete tempFactData['factConditions'];
        }
        if (feild === 'factConditions') {
            delete tempFactData['options'];
            delete tempFactData['DurationInMin'];
            delete tempFactData['DurationInSec'];
            delete tempFactData['Maximum'];
            delete tempFactData['Minimum'];
        }
        if (feild === 'notifyData') {
            delete tempFactData['selectedNotify'];
            delete tempFactData['NotificationMessage'];
        }
        setFactData(tempFactData);
    };

    useEffect(() => {
        setFactData({ ...factData, ResolutionSubType: null });
    }, [subTypeFlag]);

    useEffect(() => {
        setScreen(0);
        return () => setScreen(0);
    }, []);

    useEffect(() => {
        dispatch(getAll());
    }, []);

    // console.log(
    //     {
    //         isGoodUnits,
    //         goodUnits,
    //         grayUnits,
    //         selectedUnits,
    //         goodBatchData,
    //         badUnits,
    //         badBatchData,
    //         isErrorUnits,
    //         selectedUnitsState
    //     },
    //     'check'
    // );

    const handleDateChange = (name, date) => {
        console.log('date---------', date);
        if (date) {
            let Date = moment.utc(date?.toLocaleString()).format();
            console.log('date----', Date);
            setPatientDOB(Date);
        } else {
            setPatientDOB(null);
        }
    };

    const handleAllocationRequest = () => {
        //if (responseData?.data[0]?.remoteAllocation === 'true') {
        //    setAllocationRequest(true)
        //}
        //else {
        //    setAllocationNoAccess(true)
        //}
        setAllocationRequest(true);
    };

    const handleSaveAllocationRequest = (e) => {
        console.log('requesttt', e);
        setAllocationRequest(false);
        setLoadingRequest(e);
        if (responseData?.data[0]?.remoteAllocation === 'true') {
            let requestAllocation = {
                recipientId: responseData?.data[0]?._id,
                comments: comments,
                numberOfUnits: allocationNum,
                deviceId: devDeviceId?._id,
                productcodeId: productCodeId,
                status: 'request'
            };

            genericEmit('LISAssignedUnitList', {
                LISRequestId: responseData?.data[0]?._id,
                numberOfUnits: allocationNum,
                comments: comments
            });

            dispatch(requestRemoteAllocation(requestAllocation));

            setAllocationRequest(false);
        }

        setLoadingOpen(true);
    };

    const [displayText, setDisplayText] = useState('Processing your request...');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log('increment' + incrementcounter);
        console.log(responseData);

        if (incrementcounter === 120) {
            if (responseData?.data?.[0]?.remoteAllocation === 'false') {
                console.log('intervalId' + intervalId);
                //setLoadingOpen(false);
                //setAllocationNoAccess(true);
                clearInterval(intervalId);
            }
        }
    }, [responseData, incrementcounter]);

    useEffect(() => {
        console.log('Request');
        /*const displayMessages = () => {
            setDisplayText('Processing your request...');
            setTimeout(() => {
                setDisplayText('Checking eligibility for allocation...');
                setTimeout(() => {
                    setDisplayText('');
                }, 3000); // Display empty message for 3 seconds
            }, 3000); // Display "Processing your request..." for 3 seconds
        };*/
        if (dataResponse?.unitData?.length > 0) {
            //setLoadingOpen(false)
            clearInterval(intervalId);
        } else if (loadingRequest === 'request') {
            setIncrementCounter(incrementcounter + 1);

            if (incrementcounter === 20) {
                setDisplayText('Processing your request...');
            } else if (incrementcounter > 40) {
                setDisplayText('Checking recipient eligibility  for electronic cross match');
            }

            console.log(responseData);

            //if (responseData?.data?.[0]?.remoteAllocation === 'true') {
            //displayMessages();
            const fetchData = () => {
                dispatch(
                    getUnitBatch(
                        JSON.stringify([
                            { key: 'deviceId', value: devDeviceId?._id },
                            { key: 'recipientId', value: responseData?.data?.[0]?._id }
                        ])
                    )
                );
                let mrnFilter = [];
                if (patientSurname?.length > 0) {
                    let lastnameSearch = String(patientSurname?.trim());
                    dispatch(
                        getData(
                            'recipient',
                            1,
                            1,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            lastnameSearch
                        )
                    );
                } else {
                    //     prefixValue?.trim().length > 0 ? prefixValue?.trim() + '-' + patientMRN?.trim() : patientMRN?.trim();
                    if (patientMRN?.length > 0) {
                        mrnFilter = [...mrnFilter, { key: 'mrnNumber', value: patientMRN?.trim() }];
                    }
                    if (prefixValue?.length > 0) {
                        mrnFilter = [...mrnFilter, { key: 'prefix', value: prefixValue?.trim() }];
                    }
                    //if (patientSurname?.length > 0) {
                    //    mrnFilter = [...mrnFilter, { key: 'lastName', value: patientSurname?.trim() }];
                    //}
                    const DOB = patientDOB?.split('T')[0];
                    console.log(DOB, 'DOB');
                    if (patientDOB?.length > 0) {
                        mrnFilter = [...mrnFilter, { key: 'dob', value: [DOB?.trim(), DOB.trim()] }];
                    }
                    console.log(mrnFilter, 'mrnFilter');
                    dispatch(getData('recipient', 1, 1, undefined, mrnFilter));
                }
            };
            fetchData();
            const id = setInterval(fetchData, 5000);
            setIntervalId(id);
            return () => clearInterval(id);
            // }
        }
    }, [dataResponse, loadingRequest]);

    //const handleSaveAllocationRequest = () => {
    //    if (responseData?.data[0]?.remoteAllocation === 'true') {
    //        let requestAllocation = {
    //            recipientId: responseData?.data[0]?._id,
    //            comments: comments,
    //            numberOfUnits: allocationNum,
    //        }
    //        dispatch(requestRemoteAllocation(requestAllocation))

    //        setAllocationRequest(false)
    //    }
    //}

    useEffect(() => {
        if (requestRemoteAllocationdata?.status) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: requestRemoteAllocationdata?.message,
                    alertType: 'success'
                })
            );
        }
        if (requestRemoteAllocationError?.status == false) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: requestRemoteAllocationError?.error?.errorMessage,
                    alertType: 'error'
                })
            );
        }
    }, [requestRemoteAllocationdata, requestRemoteAllocationError]);

    const handleClose = () => {
        setAllocationNoAccess(false);
        setAllocationRequest(false);
    };

    const handleLoadingClose = () => {
        setLoadingOpen(false);
    };
    return (
        <>
            <Grid container spacing={2} direction="column" className={classes.returnMainGrid}>
                <Paper elevation={0} style={{ padding: 20 }}>
                    {screen !== 2 && (
                        <Grid item style={{ marginBottom: 20 }}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant="h6" color="primary">
                                        RECIPIENT DATA
                                    </Typography>
                                </Grid>
                                {screen == 4 || screen === 0 ? null : (
                                    <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                        {console.log(screen, 'screen')}
                                        <CustomButton variant="outlined" color="primary" onClick={handleBackClick}>
                                            Back{' '}
                                        </CustomButton>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    )}

                    {screen === 0 ? (
                        <>
                            <Grid item style={{ marginTop: 23 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={1.5}>
                                        <InputLabel className={classes.inputLabel}>PREFIX</InputLabel>
                                        <CustomInput
                                            name="patientMRN"
                                            value={prefixValue}
                                            onChange={handlePreFixValue}
                                            autoFocus={true}
                                            width="70px"
                                            placeholder="Prefix"
                                            focus={true}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <InputLabel className={classes.inputLabel}>Recipient MRN Number</InputLabel>
                                        <CustomInput
                                            name="patientMRN"
                                            value={patientMRN}
                                            onChange={handlePatientMRN}
                                            autoFocus={true}
                                            width="260px"
                                            placeholder="Enter or scan Patient MRN"
                                            focus={true}
                                            disabled={!accessableCodes.includes('BS-ACO-1043')}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <div className={classes.surnameLabel}>
                                            <InputLabel className={classes.inputLabel}>Recipient Surname</InputLabel>
                                            {/* <InputLabel className={classes.inputLabel}>Optional</InputLabel> */}
                                        </div>
                                        <CustomInput
                                            name="patientSurname"
                                            value={patientSurname}
                                            onChange={handlePatientSurname}
                                            width="260px"
                                            placeholder="Enter first 4 characters"
                                            disabled={!accessableCodes.includes('BS-ACO-1042')}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <InputLabel className={classes.inputLabel}>Recipient DOB</InputLabel>
                                        <DatePicker
                                            inputVariant={'outlined'}
                                            handleDate={(date) => handleDateChange(name, date)}
                                            value={patientDOB}
                                            format="MM/dd/yyyy"
                                            disableFuture={true}
                                            fullWidth
                                            width={'100%'}
                                            height={45}
                                        />
                                    </Grid>
                                    <Grid item xs={2} style={{ marginTop: 23 }}>
                                        <CustomButton
                                            disabled={!accessableCodes.includes('BS-ACO-1043') || patientMRN === null}
                                            onClick={handleSearchClick}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Search
                                        </CustomButton>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {responseData && responseData?.data?.length === 0 && (
                                <Grid item style={{ margin: 30 }}>
                                    <Paper className={classes.notFound} elevation={0}>
                                        <Typography variant="body1" color="error">
                                            MRN Not Found
                                        </Typography>
                                    </Paper>
                                </Grid>
                            )}
                        </>
                    ) : screen === 1 ? (
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <Paper elevation={0} className={classes.paper}>
                                        <table style={{ width: '100%' }}>
                                            <tr>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    className={classes.paperLabel}
                                                                    variant="body2"
                                                                >
                                                                    MRN:
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    variant="h6"
                                                                    className={classes.patientDetails}
                                                                >
                                                                    {responseData?.data?.[0]?.mrnNumber}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    className={classes.paperLabel}
                                                                    variant="body2"
                                                                >
                                                                    First Name:
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    variant="h6"
                                                                    className={classes.patientDetails}
                                                                >
                                                                    {responseData?.data?.[0]?.firstName}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    className={classes.paperLabel}
                                                                    variant="body2"
                                                                >
                                                                    Last Name:
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    variant="h6"
                                                                    className={classes.patientDetails}
                                                                >
                                                                    {responseData?.data?.[0]?.lastName}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    className={classes.paperLabel}
                                                                    variant="body2"
                                                                >
                                                                    DOB:
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    variant="h6"
                                                                    className={classes.patientDetails}
                                                                >
                                                                    {moment(responseData?.data?.[0]?.dob).format(
                                                                        'DD/MM/YYYY'
                                                                    )}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    className={classes.paperLabel}
                                                                    variant="body2"
                                                                >
                                                                    Gender:
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    variant="h6"
                                                                    className={classes.patientDetails}
                                                                >
                                                                    {responseData?.data?.[0]?.gender}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>

                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    className={classes.paperLabel}
                                                                    variant="body2"
                                                                >
                                                                    Blood Group:
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Typography
                                                                    variant="h6"
                                                                    className={classes.patientDetails}
                                                                >
                                                                    {responseData?.data?.[0]?.bloodgroupId?.[0]?.symbol}
                                                                </Typography>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </Paper>
                                </Grid>
                                <Grid item style={{ marginTop: 20 }}>
                                    <Grid container>
                                        <Grid item>
                                            <Typography variant="h6" color="primary">
                                                UNITS
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    {rows?.length > 0 ? (
                                        <Typography variant="body1" color="primary">
                                            Please select number of units you want to remove
                                        </Typography>
                                    ) : dataLoading ? (
                                        <Grid item style={{ margin: 30 }}>
                                            <Paper elevation={0}>
                                                <Typography variant="body1" color="primary">
                                                    Loading....
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ) : (
                                        <Grid>
                                            <Grid item style={{ margin: 30 }}>
                                                <Paper className={classes.notFound} elevation={0}>
                                                    <Typography variant="body1" color="error">
                                                        No Units available in {accessDeviceName}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                                <Grid item style={{ marginTop: 20 }}>
                                    <Grid container spacing={4}>
                                        {cards?.map(
                                            (card, index) =>
                                                index < rows?.length && (
                                                    <Grid item key={card.id}>
                                                        <Card
                                                            className={
                                                                count === card.name
                                                                    ? classes.selectedRoot
                                                                    : classes.root
                                                            }
                                                            onClick={() => handleCountClick(card.name)}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    marginTop: '35px'
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="h4"
                                                                    className={
                                                                        count === card.name
                                                                            ? classes.selectedCardTitle
                                                                            : classes.cardTitle
                                                                    }
                                                                >
                                                                    {card.name}
                                                                </Typography>
                                                            </div>
                                                        </Card>
                                                    </Grid>
                                                )
                                        )}
                                        <Grid item xs={4} style={{ marginTop: 40, marginLeft: 'auto' }}>
                                            <CustomButton
                                                disabled={!accessableCodes.includes('BS-ACO-1057')}
                                                onClick={handleAllocationRequest}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Request for Remote Allocation
                                            </CustomButton>
                                        </Grid>
                                        {rows?.length > 4 && (
                                            <Grid item>
                                                <Card
                                                    className={
                                                        count === 'more'
                                                            ? classes.selectedMoreUnitroot
                                                            : classes.moreUnitroot
                                                    }
                                                    onClick={handlMoreCountDialog}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            marginTop: '40px'
                                                        }}
                                                    >
                                                        <Typography
                                                            className={
                                                                count === 'more'
                                                                    ? classes.selectedMoreUnits
                                                                    : classes.moreUnits
                                                            }
                                                        >
                                                            More Units
                                                        </Typography>
                                                    </div>
                                                </Card>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : screen === 2 && isGoodUnits ? (
                        <>
                            {console.log(
                                redirectCounter,
                                'redirectCounter',
                                counter,
                                selectedUnits?.length,
                                goodUnits?.length
                            )}
                            {goodBatchData.length > 0 && goodUnits.length > 0 ? (
                                <Grid
                                    style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}
                                >
                                    <Paper
                                        style={{
                                            borderRadius: '10px',
                                            display: 'grid',
                                            width: '70%'
                                        }}
                                        elevation={0}
                                    >
                                        <GoodUnits
                                            goodUnits={
                                                selectedUnits?.length === goodUnits?.length ? goodUnits : grayUnits
                                            }
                                            goodUnitsHeight={
                                                selectedUnits?.length === goodUnits?.length
                                                    ? false
                                                    : grayUnits.length > 0
                                            }
                                            redirectCounter={
                                                selectedUnits?.length === goodUnits?.length ? redirectCounter : counter
                                            }
                                            removeunit={selectedUnits?.length === goodUnits?.length ? false : true}
                                            allGoodUnits={selectedUnits?.length === goodUnits?.length}
                                            goodBatchData={goodBatchData?.length > 0}
                                            selectedBatchProduct={selectedBatchProduct}
                                            stillBatchExist={selectedCount > 0 && goodBatchData?.length < selectedCount}
                                            getDate={getDate}
                                            setScreen={setScreen}
                                        />
                                    </Paper>
                                    <Paper
                                        style={{
                                            borderRadius: '10px',
                                            width: '30%',
                                            paddingLeft: 20
                                        }}
                                        elevation={0}
                                    >
                                        {goodBatchData?.length > 0 ? (
                                            <>
                                                <Typography style={{ marginTop: 20 }} color="primary">
                                                    {' '}
                                                    Selected Batch
                                                </Typography>
                                                <Grid style={{ maringTop: 10, position: 'relative', height: '30vh' }}>
                                                    <div className={classes.tableDiv}>
                                                        <table className={classes.table}>
                                                            <tr>
                                                                <td style={{ fontSize: '16px', fontWeight: 500 }}>
                                                                    {selectedBatchProduct?.name}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className={classes.cardHead}>GTIN # :</td>
                                                                <td className={classes.cardDetail}>
                                                                    {selectedBatchProduct?.gtinNumber}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className={classes.cardHead}>Serial # :</td>
                                                                <td className={classes.cardDetail}>
                                                                    {selectedBatchProduct?.serialNumber}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className={classes.cardHead}>Batch # :</td>
                                                                <td className={classes.cardDetail}>
                                                                    {selectedBatchProduct?.batchNumber}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className={classes.cardHead}>Expire On :</td>
                                                                <td className={classes.cardDetail}>
                                                                    {getDate(selectedBatchProduct?.expiryDate)}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className={classes.cardHead}>Available :</td>
                                                                <td className={classes.cardDetail}>
                                                                    {selectedBatchProduct?.deviceBatches?.count}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </Grid>
                                            </>
                                        ) : null}
                                    </Paper>
                                </Grid>
                            ) : (
                                <Paper
                                    style={{
                                        borderRadius: '10px',
                                        padding: 25,
                                        display: 'grid'
                                    }}
                                    elevation={0}
                                >
                                    <GoodUnits
                                        goodUnits={selectedUnits?.length === goodUnits?.length ? goodUnits : grayUnits}
                                        goodUnitsHeight={
                                            selectedUnits?.length === goodUnits?.length ? false : grayUnits.length > 0
                                        }
                                        redirectCounter={
                                            selectedUnits?.length === goodUnits?.length ? redirectCounter : counter
                                        }
                                        removeunit={selectedUnits?.length === goodUnits?.length ? false : true}
                                        allGoodUnits={selectedUnits?.length === goodUnits?.length}
                                        goodBatchData={goodBatchData?.length > 0}
                                        selectedBatchProduct={selectedBatchProduct}
                                        stillBatchExist={selectedCount > 0 && goodBatchData?.length < selectedCount}
                                        getDate={getDate}
                                        isGoodUnits
                                    />
                                </Paper>
                            )}
                        </>
                    ) : screen === 2 && isErrorUnits ? (
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs={12}>
                                <Paper
                                    elevation={0}
                                    style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}
                                >
                                    <WarningIcon fontSize="large" className={classes.warningIcon} />{' '}
                                    <Typography variant="h5" className={classes.successText}>
                                        WARNING: SOMETHING WENT WRONG
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.warningPaper} elevation={0}>
                                    <Grid container spacing={2}>
                                        {badUnits?.length > 0 ? (
                                            <Grid item xs={4}>
                                                <Paper className={classes.errorSmallPaper} elevation={0}>
                                                    <Typography className={classes.cardWarningText}>
                                                        {badUnits?.length} out of {badUnits?.length + goodUnits?.length}{' '}
                                                        {!isUnitsRemoved
                                                            ? 'units needs to be removed'
                                                            : 'units needs to be returned'}
                                                    </Typography>
                                                    {badUnits?.map((unit) => (
                                                        <Grid key={unit.id} item xs={4}>
                                                            <ExpandableCard
                                                                setRows={setErrorRows}
                                                                rows={errorRows}
                                                                unit={unit}
                                                                isError
                                                                handleExpandClick={handleBadUnitsExpandClick}
                                                            />
                                                        </Grid>
                                                    ))}
                                                </Paper>
                                            </Grid>
                                        ) : null}

                                        {badBatchData?.length > 0 ? (
                                            <Grid item xs={4}>
                                                <Paper className={classes.errorSmallPaper} elevation={0}>
                                                    <Typography className={classes.cardWarningText}>
                                                        {badBatchData?.length} out of{' '}
                                                        {badUnits?.length + badBatchData?.length + goodUnits?.length}{' '}
                                                        {!isUnitsRemoved
                                                            ? 'units needs to be removed'
                                                            : 'units needs to be returned'}
                                                    </Typography>
                                                    {badBatchData?.map((unit) => (
                                                        <Grid key={unit.id} item xs={4}>
                                                            <ExpandableCard
                                                                setRows={setErrorRows}
                                                                rows={errorRows}
                                                                unit={unit}
                                                                isError
                                                                handleExpandClick={handleBadUnitsExpandClick}
                                                                batch
                                                            />
                                                        </Grid>
                                                    ))}
                                                </Paper>
                                            </Grid>
                                        ) : null}

                                        <Grid item xs={badBatchData?.length > 0 && badUnits?.length > 0 ? 4 : 8}>
                                            <Grid
                                                container
                                                spacing={3}
                                                direction="column"
                                                alignItems="center"
                                                justifyContent="center"
                                                style={{ padding: 20, lineHeight: 1 }}
                                            >
                                                <Grid item>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                                        <div
                                                            style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
                                                        >
                                                            <Typography
                                                                align="center"
                                                                className={classes.returnErrorText}
                                                            >
                                                                Please {!isUnitsRemoved ? 'remove' : 'return'} the
                                                                listed units on the left
                                                            </Typography>
                                                            <Typography
                                                                align="center"
                                                                className={classes.returnErrorText}
                                                            >
                                                                to {accessDeviceName}
                                                            </Typography>
                                                        </div>
                                                        <div
                                                            style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
                                                        >
                                                            <Typography
                                                                align="center"
                                                                className={classes.returnErrorNextText}
                                                            >
                                                                The door has been released…
                                                            </Typography>
                                                            <Typography
                                                                align="center"
                                                                className={classes.returnErrorNextText}
                                                            >
                                                                You have 40 seconds to perform this action
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <TimerIcon style={{ color: '#fff' }} />
                                                        <Typography style={{ color: '#fff' }} variant="body1">
                                                            TIME LEFT:
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        color={counter < 11 ? 'error' : 'initial'}
                                                        className={classes.errorCounter}
                                                    >
                                                        {counter}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : screen === 2 && addBatchProducts ? (
                        <Grid container direction="column" spacing={2} style={{ padding: 20 }}>
                            <Paper
                                elevation={0}
                                style={{
                                    padding: 20,
                                    borderRadius: 10,
                                    overflow: 'auto',
                                    position: 'relative',
                                    height: '80vh'
                                }}
                            >
                                <Grid item style={{ marginBottom: 10 }}>
                                    <Typography variant="h6" color="primary">
                                        BATCH PRODUCT{' '}
                                        {deviceBatchLoading ? 'loading...' : deviceBatchSuccess?.data?.length}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={2}>
                                        {deviceBatchSuccess?.data?.batchData?.map((batchProduct) => (
                                            <Grid className="cardGrid" key={batchProduct?.id} item xs={4}>
                                                <div className="card" onClick={() => handleCardClick(batchProduct)}>
                                                    <div className="card-edge-top-right"></div>
                                                    <div className="card-edge-bottom-right"></div>
                                                    <table className="table">
                                                        <tr>
                                                            <td className="card-name">
                                                                {batchProduct?.batchProductId?.[0]?.name}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className={classes.cardHead}>GTIN # :</td>
                                                            <td className={classes.cardDetail}>
                                                                {batchProduct?.gtinNumber}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className={classes.cardHead}>Serial # :</td>
                                                            <td className={classes.cardDetail}>
                                                                {batchProduct?.serialNumber}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className={classes.cardHead}>Batch # :</td>
                                                            <td className={classes.cardDetail}>
                                                                {batchProduct?.batchNumber}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className={classes.cardHead}>Expire On :</td>
                                                            <td className={classes.cardDetail}>
                                                                {getDate(batchProduct?.expiryDate)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className={classes.cardHead}>Available :</td>
                                                            <td className={classes.cardDetail}>
                                                                {batchProduct?.availableCount}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    ) : screen === 3 && selectedBatchProduct ? (
                        <Grid container direction="column" spacing={2} style={{ padding: 30 }}>
                            <Paper elevation={0} style={{ padding: 20, borderRadius: 10, height: '80vh' }}>
                                <Grid item>
                                    <Grid container direction="column">
                                        <Grid item style={{ marginBottom: 12 }}>
                                            <Typography variant="h6" color="primary">
                                                {/* {selectedBatchProduct?.batchProductId[0]?.name} */}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Paper elevation={0} className={classes.paper}>
                                                <table style={{ width: '70%' }}>
                                                    <tr>
                                                        <td>
                                                            <table>
                                                                <tr>
                                                                    <td>
                                                                        <Typography
                                                                            className={classes.paperLabel}
                                                                            variant="body2"
                                                                        >
                                                                            GTIN #:
                                                                        </Typography>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Typography
                                                                            variant="h6"
                                                                            className={classes.patientDetails}
                                                                        >
                                                                            {selectedBatchProduct?.gtinNumber}
                                                                        </Typography>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td>
                                                            <table>
                                                                <tr>
                                                                    <td>
                                                                        <Typography
                                                                            className={classes.paperLabel}
                                                                            variant="body2"
                                                                        >
                                                                            Batch #:
                                                                        </Typography>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Typography
                                                                            variant="h6"
                                                                            className={classes.patientDetails}
                                                                        >
                                                                            {selectedBatchProduct?.batchNumber}
                                                                        </Typography>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td>
                                                            <table>
                                                                <tr>
                                                                    <td>
                                                                        <Typography
                                                                            className={classes.paperLabel}
                                                                            variant="body2"
                                                                        >
                                                                            Expiration Date:
                                                                        </Typography>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Typography
                                                                            variant="h6"
                                                                            className={classes.patientDetails}
                                                                        >
                                                                            {getDate(selectedBatchProduct?.expiryDate)}
                                                                        </Typography>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td>
                                                            <table>
                                                                <tr>
                                                                    <td>
                                                                        <Typography
                                                                            className={classes.paperLabel}
                                                                            variant="body2"
                                                                        >
                                                                            Available units:
                                                                        </Typography>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <Typography
                                                                            variant="h6"
                                                                            className={classes.patientDetails}
                                                                        >
                                                                            {selectedBatchProduct?.deviceBatches?.count}
                                                                        </Typography>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </Paper>
                                        </Grid>

                                        <>
                                            <Grid item style={{ marginTop: 20 }}>
                                                <Grid container>
                                                    <Grid item>
                                                        <Typography variant="h6" color="primary">
                                                            BATCH PRODUCT
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {selectedBatchProduct?.deviceBatches?.count > 0 ? (
                                                <Grid item>
                                                    <Typography variant="body1" color="primary">
                                                        How many do you want to take?
                                                    </Typography>
                                                </Grid>
                                            ) : (
                                                <Grid item>
                                                    <Typography variant="body1" color="primary">
                                                        No Tags
                                                    </Typography>
                                                </Grid>
                                            )}

                                            <Grid item style={{ marginTop: 20 }}>
                                                <Grid container spacing={4}>
                                                    {cards?.map(
                                                        (card, index) =>
                                                            index < selectedBatchProduct?.deviceBatches?.count && (
                                                                <Grid item key={card.id}>
                                                                    <Card
                                                                        className={classes.root}
                                                                        onClick={() => handleBatchCount(card.name)}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                display: 'flex',
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center',
                                                                                marginTop: '35px'
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                variant="h4"
                                                                                className={classes.cardTitle}
                                                                            >
                                                                                {card.name}
                                                                            </Typography>
                                                                        </div>
                                                                    </Card>
                                                                </Grid>
                                                            )
                                                    )}

                                                    <Grid item>
                                                        {selectedBatchProduct?.deviceBatches?.count > 4 && (
                                                            <Card
                                                                className={classes.moreUnitroot}
                                                                onClick={handlMoreCountDialog}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        marginTop: '40px'
                                                                    }}
                                                                >
                                                                    <Typography className={classes.moreUnits}>
                                                                        More Units
                                                                    </Typography>
                                                                </div>
                                                            </Card>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    ) : screen === 2 && isDoorLocked ? (
                        <Paper elevation={0} style={{ width: '100%', height: '72vh', borderRadius: '10px' }}>
                            <Grid
                                container
                                spacing={4}
                                direction="column"
                                alignItems="center"
                                className={classes.returnMainGrid}
                            >
                                <Grid item>
                                    <div className={classes.lockContainer}>
                                        <img src={lockIcon} alt="door" />
                                        <Typography variant="h4" color="primary">
                                            Door Locked
                                        </Typography>
                                    </div>
                                </Grid>

                                <Grid item>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h4" align="center" className={classes.returnText}>
                                            <span style={{ color: '#046474e', fontWeight: 'bold' }}>Time over.</span>{' '}
                                            The door was automatically locked.
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 5
                                        }}
                                    >
                                        <Typography variant="body1">
                                            You will be redirected to Home Screen in {redirectCounter} seconds.
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    ) : screen === 4 ? (
                        <Grid container style={{ width: '100%' }}>
                            <Grid item xs={5}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Typography className={classes.cardWarningText}>
                                            <InfoOutlinedIcon color="primary" /> {count} Units to be removed
                                        </Typography>
                                    </Grid>
                                    <Grid item style={{ overflow: 'auto', height: '80vh' }}>
                                        <Paper
                                            className={
                                                addBatchProducts ? classes.addBatchRemovePaper : classes.removePaper
                                            }
                                            elevation={0}
                                        >
                                            {selectedUnitsState?.map((unit) => (
                                                <Grid key={unit.id} item xs={4}>
                                                    <RemoveCard
                                                        unit={unit}
                                                        isError={false}
                                                        handleExpandClick={handleExpandClick}
                                                    />
                                                </Grid>
                                            ))}
                                        </Paper>
                                        {addBatchProducts ? (
                                            <Paper
                                                className={
                                                    addBatchProducts ? classes.addBatchRemovePaper : classes.removePaper
                                                }
                                                elevation={0}
                                            >
                                                <Typography className={classes.cardWarningText}>
                                                    <InfoOutlinedIcon color="primary" /> {selectedCount} tags to be
                                                    removed
                                                </Typography>
                                                {selectedBatchProduct && (
                                                    <Grid className="cardGrid" key={selectedBatchProduct?.id} item>
                                                        <div className="card">
                                                            <div className="card-edge-top-right"></div>
                                                            <div className="card-edge-bottom-right"></div>
                                                            <table className="table">
                                                                {/* <tr>
                                                                    <td className="card-name">
                                                                        {
                                                                            selectedBatchProduct?.batchProductId?.[0]
                                                                                ?.name
                                                                        }
                                                                    </td>
                                                                </tr> */}
                                                                <tr>
                                                                    <td className={classes.cardHead}>Type :</td>
                                                                    <td className={classes.cardDetail}>
                                                                        {/* {selectedBatchProduct?.type} */}
                                                                        {
                                                                            selectedBatchProduct?.batchProductId?.[0]
                                                                                ?.name
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className={classes.cardHead}>Batch # :</td>
                                                                    <td className={classes.cardDetail}>
                                                                        {selectedBatchProduct?.batchNumber}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className={classes.cardHead}>
                                                                        Expiration Date :
                                                                    </td>
                                                                    <td className={classes.cardDetail}>
                                                                        {moment(
                                                                            selectedBatchProduct?.expiryDate
                                                                        ).format(dateFormat)}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className={classes.cardHead}>Available :</td>
                                                                    <td className={classes.cardDetail}>
                                                                        {selectedBatchProduct?.deviceBatches?.count}
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </Grid>
                                                )}
                                            </Paper>
                                        ) : null}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={7}>
                                <Grid
                                    container
                                    spacing={3}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    style={{ padding: 16, width: '100%' }}
                                >
                                    <Grid container className={classes.actionGrid}>
                                        <Grid
                                            item
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: 5
                                            }}
                                        >
                                            <Typography style={{ fontSize: 16 }}>
                                                {' '}
                                                <SubdirectoryArrowRightIcon />{' '}
                                            </Typography>
                                            <Typography style={{ fontSize: 16 }}>ACTION REQUIRED</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        container
                                        spacing={4}
                                        direction="column"
                                        alignItems="center"
                                        className={classes.returnMainGrid}
                                    >
                                        <Grid item>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                <Typography variant="h4" align="center" className={classes.returnText}>
                                                    Remove the listed units on the left from {accessDeviceName}
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant="h6" align="center" className={classes.returnText}>
                                                    Please open {accessDeviceName} door.
                                                </Typography>
                                                <Typography variant="h6" align="center" className={classes.returnText}>
                                                    You have 40 seconds to perform this action
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 5
                                                }}
                                            >
                                                <TimerIcon />
                                                <Typography variant="body1">TIME LEFT:</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                color={counter < 11 ? 'error' : 'initial'}
                                                className={classes.counter}
                                            >
                                                {counter}
                                            </Typography>
                                        </Grid>
                                        {/*<Grid item>*/}
                                        {/*    <div*/}
                                        {/*        style={{*/}
                                        {/*            display: 'flex',*/}
                                        {/*            justifyContent: 'center',*/}
                                        {/*            alignItems: 'center',*/}
                                        {/*            gap: 10*/}
                                        {/*        }}*/}
                                        {/*    >*/}
                                        {/*        <Typography variant="h6" className={classes.returnText}>*/}
                                        {/*            Do you need to add Batch products?*/}
                                        {/*        </Typography>*/}
                                        {/*        <Switch*/}
                                        {/*            color="primary"*/}
                                        {/*            checked={addBatchProducts}*/}
                                        {/*            onChange={handleSwitch}*/}
                                        {/*            disabled={!accessableCodes.includes('BS-ACO-1044')}*/}
                                        {/*        />*/}
                                        {/*    </div>*/}
                                        {/*</Grid>*/}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : null}
                </Paper>
            </Grid>
            <CustomDialog
                title={`Enter Count`}
                open={moreCountDialog}
                onSaveClick={handlMoreCountDialog}
                onClose={handlMoreCountDialog}
                isSave
                isClose
                tabIndex={1}
                minWidth="400px"
            >
                <>
                    <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                        <CustomInput onChange={handleDialogCount} className={classes.moreUnits} />
                    </Grid>
                    <div
                        style={{
                            marginTop: 5,
                            display: 'flex',
                            justifyContent: 'center',
                            color: 'red'
                        }}
                    >
                        {countError}
                    </div>
                </>
            </CustomDialog>

            <Dialog
                open={allocationNoAccess}
                onClose={handleClose}
                maxWidth="md"
                PaperProps={{
                    style: {
                        borderRadius: '10px',
                        backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                        padding: '20px 15px',
                        borderTop: '9px solid #E59740',
                        overflowY: 'unset',
                        maxWidth: '900px'
                    }
                }}
            >
                <Grid container justify="center">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <img src={warningIcon} alt="warning" style={{ marginTop: -50 }} />
                        <Typography variant="h5" className={classes.typographyGray}>
                            Warning
                        </Typography>
                    </div>
                </Grid>

                <DialogContent>
                    <Grid style={{ marginTop: 10 }}>
                        <Grid item xs={12}>
                            <Grid item className={classes.inputField}>
                                <Typography variant="h6" color="error">
                                    Recipient is not eligible for electronic cross match
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item className={classes.inputField}>
                                <Typography variant="h6" color="error">
                                    Please contact laboratory admin.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                    <Grid style={{ margin: 5 }}>
                        <CustomButton variant="outlined" color="primary" onClick={handleClose}>
                            Understood
                        </CustomButton>
                    </Grid>
                </Grid>
            </Dialog>

            <Dialog
                maxWidth="lg"
                PaperProps={{
                    style: {
                        borderRadius: '10px',
                        padding: 20,
                        width: '800px'
                    }
                }}
                open={allocationRequest}
                onClose={handleClose}
            >
                <DialogTitle variant="h1">
                    <Typography color="primary" component="span" variant="h5" style={{ fontWeight: 'bold' }}>
                        Enter details and submit your request
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <InputLabel className={classes.inputLabel}>Select product type :</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grouped
                                name={'factTypes'}
                                onChange={(e, value) => handleDataSelect(e, value, 'factTypes')}
                                value={factData['factTypes']}
                                collection={allData?.data.filter((item) => item?.name || item?.title)}
                                //nextClick={nextClick}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <InputLabel className={classes.inputLabel}>Select number of units :</InputLabel>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                {[1, 2, 3, 4].map((number) => (
                                    <Grid key={number} item xs={3}>
                                        <Card
                                            className={classes.card}
                                            onClick={() => handleSelectNumber(number)}
                                            style={{
                                                backgroundColor: selectedNumber === number ? '#1976d2' : 'inherit'
                                            }}
                                        >
                                            <CardContent>
                                                <Typography variant="h6" component="h2" align="center">
                                                    {number}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid style={{ marginBottom: '25px' }}></Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <InputLabel className={classes.inputLabel}>Comments :</InputLabel>
                        </Grid>
                        <CustomInput
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            fullWidth
                            className={classes.textField}
                            size="lg"
                            multiline
                        />
                    </Grid>

                    <Grid container>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', padding: '25px' }}>
                            <CustomButton variant="contained" onClick={handleClose}>
                                Cancel
                            </CustomButton>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', padding: '25px' }}>
                            <CustomButton
                                variant="contained"
                                color="primary"
                                onClick={(e) => handleSaveAllocationRequest('request')}
                            >
                                Submit
                            </CustomButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <Dialog
                open={loadingOpen}
                className={classes.dialogZindex}
                PaperProps={{
                    style: {
                        padding: 30,
                        paddingBottom: 10,
                        width: 750,
                        borderRadius: 10
                    }
                }}
            >
                <>
                    {errorMessage && <div style={{ textAlign: 'center', marginTop: '15px' }}>{errorMessage}</div>}

                    {loadingRequest === 'request' && (
                        <>
                            <DialogTitle variant="h1">
                                <Typography
                                    color="primary"
                                    component="span"
                                    variant="h6"
                                    style={{ fontWeight: 'bold' }}
                                >
                                    {'You have requested ' + allocationNum + 'units of ' + factData['factTypes'].name}
                                </Typography>
                            </DialogTitle>

                            <DialogContent
                                variant="h5"
                                className={classes.asignConfirmation}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '15px',
                                    marginBottom: '25px',
                                    justifyContent: 'center',
                                    fontWeight: '50px'
                                }}
                            >
                                {dataResponse?.unitData?.length > 0 ? (
                                    <>
                                        <div
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <CheckCircleOutlineIcon
                                                style={{ color: 'green', width: '3em', height: '3em' }}
                                            />
                                        </div>
                                    </>
                                ) : responseData?.data?.[0]?.remoteAllocation === 'false' ? (
                                    <>
                                        <div
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <CancelOutlined style={{ color: 'red', width: '3em', height: '3em' }} />
                                        </div>
                                    </>
                                ) : (
                                    displayText
                                )}
                            </DialogContent>

                            <DialogContent
                                variant="h5"
                                className={classes.asignConfirmation}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '15px',
                                    marginBottom: '25px',
                                    justifyContent: 'center',
                                    fontWeight: '50px'
                                }}
                            >
                                {dataResponse?.unitData?.length > 0 ? (
                                    <>
                                        <div
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Typography
                                                style={{ fontSize: '20px', textAlign: 'center', marginTop: '15px' }}
                                                variant="h6"
                                            >
                                                {selectedNumber} Unit(s) have been successfully reserved for
                                                the recipient.
                                            </Typography>
                                        </div>
                                    </>
                                ) : responseData?.data?.[0]?.remoteAllocation === 'false' ? (
                                    <>
                                        <div
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Typography
                                                style={{ fontSize: '20px', textAlign: 'center', marginTop: '15px' }}
                                                variant="h6"
                                            >
                                                Recipient is not eligible for electronic cross match.Please contact
                                                laboratory admin.
                                            </Typography>
                                        </div>
                                    </>
                                ) : (
                                    <CircularProgress />
                                )}
                            </DialogContent>

                            <Grid style={{ textAlign: 'right', marginTop: '25px' }}>
                                <CustomButton variant="contained" color="primary" onClick={handleOkClick}>
                                    {' '}
                                    Ok
                                </CustomButton>
                            </Grid>
                        </>
                    )}
                </>
            </Dialog>
        </>
    );
};

export default RemoveUnits;
