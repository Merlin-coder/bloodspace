import React, { useState, useEffect } from 'react';
import { Grid, Paper, Table, TableHead, TableBody, InputLabel, Typography, makeStyles } from '@material-ui/core';
import { CustomButton, CONSTANTS } from 'common';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
    getData,
    clearData,
    getDropDown,
    postFormData,
    postUserRoleAction,
    clearPostUserRoleAction,
    clearDropDown,
    createAlert,
    clearPostResponse,
    get2ndDropdown,
    get3rdDropdown,
    getCurrentRoleActiveDevices,
    postRemoveEDQ
} from 'redux/actions';
import UserAccessAccordian from './userAccessAccordian';
import { CustomDialog, CustomInput, PageNotFound, SelectOption, Loader } from 'components';
import DeviceControlTable from './deviceControlTable';
import RemoveEdqTable from './removeEDQ';
import CheckboxComponent from 'components/checkbox/checkbox.component';
import NewUserAccessRole from './addUserAccessRoleDialog';
import moment from 'moment';
import keyFine from 'common/services/keyFineMethod';
import remoteDashboard from './userAccessJson.json';
import NewUserAccessScreen from './newUserAccessScreen';
const useStyles = makeStyles({
    root: {
        width: '100%'
    }
});

const UserRoleAccess = () => {
    const capitalize = (expression) => expression.charAt(0).toUpperCase() + expression.slice(1);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { loading, responseData } = useSelector((state) => state.getData);
    console.log("responsedata", responseData)
    const { options } = useSelector((state) => state.getDropDown);
    const [userRoleId, setUserRoleId] = useState('');
    const [userRoleCode, setUserRoleCode] = useState('');
    const [userRoleName, setUserRoleName] = useState('');
    const [userRoleDescription, setUserRoleDescription] = useState('');
    const [addUserRoleUp, setAddUserRoleUp] = useState(false);
    const [accessableCodes, setAccessbleCodes] = useState([]);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { options2 } = useSelector((state) => state.get2ndDropdown);
    const { currentActiveDevicesLoading, currentActiveDevicesSuccess, currentActiveDevicesError } = useSelector(
        (state) => state.accessRoleDevices
    );
    const { removeEdqResponse } = useSelector((state) => state.postRemoveEDQ)
    console.log("postRemoveEDQ", removeEdqResponse)
    const [postApiCall, setPostApiCall] = useState(false);

    const [moduleData, setModuleData] = useState([]);
    const [tempUserId, setTempUserId] = useState('');
  
    const [saveButton, setSaveButton] = useState(true);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [fullMenuAccess, setFullMenuAccess] = useState([]);
    const [voucherView, setVoucherView] = useState(false);
    const location = useLocation();
    const [voucherUserRole, setVoucherRole] = useState('');
    const [voucherMap, setVoucherMap] = useState([]);
    const { dateFormat } = useSelector((state) => state.dateFormat);
    useEffect(() => {
        if (location?.pathname?.includes('voucher')) {
            setVoucherView(true);
        }
    }, [location]);
    console.log('tempuser---', userRoleId)
    useEffect(() => {
        let TempObjectkeys = [];
        if (userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1002') {
            TempObjectkeys = ['BS-ACO-1029'];
        } else {
            let tempAccessbleCodes = userInfo?.data?.userAccess
                .filter((item) => item['drawer-code'] === 'BS-DR-0079')
                .map((i) => i.menuId)?.[0]?.[0];
            TempObjectkeys =
                tempAccessbleCodes &&
                Object?.keys(tempAccessbleCodes)
                    ?.filter((x) => Array.isArray(tempAccessbleCodes[x]))
                    .map((y) => tempAccessbleCodes[y][1]);
        }

        setAccessbleCodes(TempObjectkeys);
    }, [userInfo]);

    const { postLoading, postResponse, postError } = useSelector((state) => state.postFormFields);
    const { postUserRoleAccessLoading, postUserRoleAccessSuccess, postUserRoleAccessError } = useSelector(
        (state) => state.postUserRoleAccessStore
    );

    const callAdminAccess = () => {
        let filters = [{ key: 'useraccessroleId._id', value: tempUserId }];
        dispatch(getData('access', 0, undefined, undefined, filters));
    };

    const handleDropDown = (e) => {
        setSaveButton(true);
        dispatch(clearData());
        setUserRoleId(e?.target?.value);
        let tempUserRoleCode = options.data.filter((item) => item._id === e?.target?.value)[0].code;
        setUserRoleCode(tempUserRoleCode);
        let filters = [{ key: 'useraccessroleId._id', value: e?.target?.value }];
        dispatch(getData('access', 0, undefined, undefined, filters));
        dispatch(getCurrentRoleActiveDevices(JSON.stringify(filters)));
    };

    const handleCheckBox = (e, index, feild, moduleName, newUI, mainMenuIndex) => {
        console.log({ e, index, feild, moduleName, newUI, mainMenuIndex }, 'indexRows');
        saveButton === true ? setSaveButton(false) : null;
        let moduleIndex = moduleData.findIndex((item) => item.name === moduleName);
        let tempMOduleData = [...moduleData];
        let tempRows = tempMOduleData[moduleIndex]?.['menuId'];
        let accessable = e.target.checked ? '1' : '0';

        if (newUI === 'newUi' && !e.target.checked) {
            if (tempMOduleData[mainMenuIndex]['fullAccess'] === 1) {
                let tempRemoveFullmenuAccess = { ...tempMOduleData[mainMenuIndex], fullAccess: 0 };
                tempMOduleData[mainMenuIndex] = { ...tempRemoveFullmenuAccess };
            }
        }

        if (feild === 'pageView') {
            if (tempMOduleData[moduleIndex]?.menuId?.length === 1) {
                tempMOduleData[moduleIndex]['isVisible'] = parseInt(accessable);
            } else if (tempMOduleData[moduleIndex]?.menuId?.length > 1) {
                let pageViewAccess =
                    tempMOduleData[moduleIndex]?.menuId.filter((item) => item.pageView[0] === '1')?.length === 1;
                if (pageViewAccess) tempMOduleData[moduleIndex]['isVisible'] = parseInt(accessable);
                tempRows[index].isVisible = parseInt(accessable);
            }
            for (let key in tempRows[index]) {
                if (Array.isArray(tempRows[index][key])) {
                    tempRows[index][key][0] = accessable;
                }
            }
        } else {
            tempRows[index][feild] = tempRows[index][feild] ? [...tempRows[index][feild]] : [];
            tempRows[index][feild][0] = accessable;
            if (accessable === '0') {
                let tempArrayCount = 0;
                let tempNoAccessCount = 0;
                for (let key in tempRows[index]) {
                    if (Array.isArray(tempRows[index][key])) {
                        tempArrayCount += 1;
                        if (tempRows[index][key][0] === '0') {
                            tempNoAccessCount += 1;
                        }
                    }
                }

                if (tempNoAccessCount === 0) {
                    tempRows[index]['fullAccess'] = 1;
                } else if (tempArrayCount === tempNoAccessCount) {
                    tempRows[index]['fullAccess'] = 0;
                } else {
                    tempRows[index]['fullAccess'] = -1;
                }
            } else if (accessable === '1') {
                // let tempFullMenuAccess = 1;
                let tempArrayCount = 0;
                let tempNoAccessCount = 0;
                for (let key in tempRows[index]) {
                    if (Array.isArray(tempRows[index][key])) {
                        tempArrayCount += 1;
                        if (tempRows[index][key][0] === '0') {
                            tempNoAccessCount += 1;
                        }
                    }
                }

                if (tempNoAccessCount === 0) {
                    tempRows[index]['fullAccess'] = 1;
                } else if (tempArrayCount === tempNoAccessCount) {
                    tempRows[index]['fullAccess'] = 0;
                } else {
                    tempRows[index]['fullAccess'] = -1;
                }

                if (newUI === 'newUi') {
                    let tempfullCheck = tempRows.every((i) => i.fullAccess === 1);
                    if (tempMOduleData[mainMenuIndex]['fullAccess'] === 0 && tempfullCheck) {
                        let tempRemoveFullmenuAccess = { ...tempMOduleData[mainMenuIndex], fullAccess: 1 };
                        tempMOduleData[mainMenuIndex] = { ...tempRemoveFullmenuAccess };
                    }
                }
            }
        }

        let tempModuleObject = { ...tempMOduleData[moduleIndex], menuId: tempRows };
        tempMOduleData[moduleIndex] = tempModuleObject;
        setModuleData(tempMOduleData);
    };

    useEffect(() => {
        let TempAdminId;
        if (location?.pathname?.includes('voucher')) {
            TempAdminId = options?.data.filter((item) => item.code === location?.state?.data?.code)?.[0]?._id;
            setTempUserId(TempAdminId);
            setUserRoleCode(location?.state?.data?.code);
        } else {
            TempAdminId = options?.data?.[0]?._id;
            setTempUserId(TempAdminId);
            setUserRoleCode(options?.data?.[0]?.code);
        }

        // setUserRoleId(TempAdminId);
        if (TempAdminId) {
            let filters = [{ key: 'useraccessroleId._id', value: TempAdminId }];

            dispatch(getData('access', 0, undefined, undefined, filters));
            dispatch(getCurrentRoleActiveDevices(JSON.stringify(filters)));
        }
    }, [options]);

    useEffect(() => {
        if (responseData?.data) {
            if (responseData?.data?.length === 0) {
                setPostApiCall(true);
                let tempUserAccessCode = responseData?.data?.[0]?.useraccessroleId?.[0]?.code;
                if (userRoleCode !== tempUserAccessCode) {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: 'This is new User Acess Role, click on save',
                            alertType: 'success'
                        })
                    );
                    setSaveButton(true);
                }
            }
            setModuleData(responseData?.data);
        }
        if (userRoleId === '') {
            setUserRoleId(tempUserId);
        }
    }, [responseData]);

    const handleVoucherDisplayDate = (row, dbConf) => {
        let voucherDeatils = dbConf
            ?.filter((item) => item.dbProperty !== '#' && item.dbProperty !== '@' && item.dbProperty !== 'name')
            .map((item) => {
                let valueOfItem;
                if (item.dbProperty.includes('.')) {
                    let keyFineValue = keyFine(item.dbProperty, row);
                    valueOfItem = keyFineValue;
                    if (item.dbProperty === 'refskuId[0].expiryDateAndTime') {
                        valueOfItem = moment(valueOfItem).format(dateFormat);
                    }
                    if (item.dbProperty === 'refskuId[0].productiontionDateAndTime') {
                        valueOfItem = moment(valueOfItem).format(dateFormat);
                    }
                } else {
                    valueOfItem = row[item.dbProperty];
                }
                if (item.dbProperty === 'createdAt') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'collectionDateAndTime') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'productiontionDateAndTime') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'expiryDateAndTime') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'expiry') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'date') {
                    return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                }
                if (item.dbProperty === 'dob') {
                    return { key: item.label, value: moment(valueOfItem).format('DD-MMM-yyyy') };
                }
                return { key: item.label, value: valueOfItem };
            });
        voucherDeatils !== 'undefined' ? setVoucherMap([...voucherDeatils]) : setVoucherMap([]);
        return voucherDeatils;
    };

    useEffect(() => {
        if (location.pathname.includes('voucher')) {
            handleVoucherDisplayDate(location.state.data, location.state.displayConf);
            dispatch(getDropDown('useraccessrole'));
        } else {
            dispatch(getDropDown('useraccessrole'));
        }
        dispatch(get2ndDropdown('devices'));

        return () => {
            dispatch(clearDropDown());
            dispatch(clearData());
        };
    }, []);

    const handleFilteredModuleData = () => {
        let tempModuleData = moduleData.map((item) => {
            let { name, menuId, isVisible, fullAccess } = item;
            let tempMenuData;
            if (item.name === 'Remote Fridge') {
                tempMenuData = menuId.map((menuItem) => {
                    let keysOfMenuItem = Object.keys(menuItem);
                    let filterNonArrayItems = keysOfMenuItem.filter((filterItem) => {
                        return Array.isArray(menuItem[filterItem]);
                    });
                    let filterdMenuItems = {};
                    filterdMenuItems['drawer-code'] = menuItem['drawer-code'];
                    filterdMenuItems['name'] = menuItem['name'];
                    filterdMenuItems['label'] = menuItem['label'];
                    filterdMenuItems['fullAccess'] = menuItem['fullAccess'];
                    filterNonArrayItems.forEach((item) => {
                        if (typeof item === 'string') {
                            filterdMenuItems[item] = menuItem[item];
                        }
                    });
                    return filterdMenuItems;
                });

                return {
                    name,
                    useraccessroleId: userRoleCode,
                    menuId: tempMenuData,
                    fullAccess: fullAccess,
                    isVisible,
                    'drawer-code': item['drawer-code']
                };
            } else {
                tempMenuData = menuId.map((menuItem) => {
                    let keysOfMenuItem = Object.keys(menuItem);
                    let filterNonArrayItems = keysOfMenuItem.filter((filterItem) => {
                        return Array.isArray(menuItem[filterItem]);
                    });
                    let filterdMenuItems = {};
                    filterdMenuItems['drawer-code'] = menuItem['drawer-code'];
                    filterdMenuItems['name'] = menuItem['name'];
                    filterdMenuItems['label'] = menuItem['label'];
                    filterNonArrayItems.forEach((item) => {
                        if (typeof item === 'string') {
                            filterdMenuItems[item] = menuItem[item];
                        }
                    });
                    return filterdMenuItems;
                });
            }

            return {
                name,
                useraccessroleId: userRoleCode,
                menuId: tempMenuData,
                isVisible,
                'drawer-code': item['drawer-code']
            };
        });
        return tempModuleData;
    };

    const [removeEDQ, setRemoveEDQ] = useState()
    const [isChecked, setChecked] = useState();
   

    useEffect(() => {
        let remove = responseData.data?.find((obj) => obj.name === 'Remove EDQs');
        console.log('get---', remove);
        setRemoveEDQ(remove?.allowToRemoveEDQs)
        //setChecked(remove?.allowToRemoveEDQs);
    }, [responseData])
    console.log("ree---", removeEDQ)

    useEffect(() => {
        setChecked(removeEDQ);
    }, [removeEDQ]);

    const handleEdqCheckBox = (e) => {
        console.log('eeee', e)
        saveButton === true ? setSaveButton(false) : null;
        setChecked(e);
    };
    console.log('checkeddd---', isChecked)

    const handlePostApicall = () => {
        let tempValidData = handleFilteredModuleData();
        let newRoleData = {
            collectionName: 'access',
            validData: tempValidData,
            deviecAccess: {
                collectionName: 'deviceaccess',
                validData: [
                    {
                        'useraccessrole-code': userRoleCode,
                        devices: selectedDevices
                    }
                ]
            }
        };
        let removeEDQS = {
            name: 'Remove EDQs',
            useraccessroleId: userRoleId,
            allowToRemoveEDQs: isChecked
        }

        dispatch(postUserRoleAction(newRoleData));
        dispatch(postRemoveEDQ(removeEDQS))
    };

    useEffect(() => {
        if (postUserRoleAccessSuccess && postUserRoleAccessSuccess.status === true) {
            dispatch(
                createAlert({ showAlert: true, alertMessage: postUserRoleAccessSuccess.message, alertType: 'success' })
            );
            setSaveButton(true);
            dispatch(clearPostUserRoleAction());
        }
        if (postUserRoleAccessError) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: postUserRoleAccessError.errorMessage || postUserRoleAccessError.error,
                    alertType: 'error'
                })
            );
            dispatch(clearPostUserRoleAction());
        }
    }, [postUserRoleAccessSuccess, postUserRoleAccessError]);

    const addUserRolePopUp = (
        <Grid>
            <Grid container spacing={2} direction={'row'}>
                <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>Name</InputLabel>
                    <CustomInput
                        value={userRoleName}
                        onChange={(e) => setUserRoleName(e.target.value)}
                        fullWidth
                        style={{ width: 300 }}
                        className={classes.textField}
                        size="lg"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>Description</InputLabel>
                    <CustomInput
                        value={userRoleDescription}
                        onChange={(e) => setUserRoleDescription(e.target.value)}
                        fullWidth
                        style={{ width: 300 }}
                        className={classes.textField}
                        size="lg"
                    />
                </Grid>
            </Grid>
        </Grid>
    );

    const handleAddUserRole = () => {
        setUserRoleName('');
        setUserRoleDescription('');
        setAddUserRoleUp(!addUserRoleUp);
    };

    const handleSaveUserRole = () => {
        let newValidData = userRoleDescription
            ? { name: userRoleName, description: userRoleDescription }
            : { name: userRoleName };

        let requestBody = {
            collectionName: 'useraccessrole',
            validData: newValidData
        };
        dispatch(postFormData(requestBody));
    };

    useEffect(() => {
        if (postResponse && postResponse.status === true) {
            handleAddUserRole();
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: postResponse.message,
                    alertType: 'success'
                })
            );
            dispatch(clearPostResponse());
            dispatch(getDropDown('useraccessrole'));
        }
        if (postError) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: postError.error || postError.errorMessage,
                    alertType: 'error'
                })
            );
            dispatch(clearPostResponse());
        }
    }, [postResponse, postError]);

    React.useEffect(() => {
        window.onscroll = function () {
            myFunction();
        };

        var header = document.getElementById('myHeader');
        var sticky = header.offsetTop;

        function myFunction() {
            if (window.pageYOffset > sticky) {
                header.style.position = 'fixed';
                header.style.marginTop = '-40px';
                header.style.marginBottom = '20px';
                header.style.paddingBottom = '0px';
                header.style.width = '97%';
                header.style.zIndex = '100';
            } else {
                header.style.position = 'static';
                header.style.marginTop = 'unset';
                header.style.width = 'unset';
                header.style.zIndex = 'unset';
            }
        }
        return () => window.removeEventListener('scroll', myFunction);
    }, []);

    const handleDeviceCheckBox = (e, id) => {
        saveButton === true ? setSaveButton(false) : null;
        let tempSelectedDevices = [...selectedDevices];
        if (e) {
            tempSelectedDevices.push(id);
        } else {
            tempSelectedDevices = tempSelectedDevices.filter((i) => i !== id);
        }
        setSelectedDevices(tempSelectedDevices);
    };

    useEffect(() => {
        if (currentActiveDevicesSuccess?.data?.length > 0) {
            let tempSelectedDevices = currentActiveDevicesSuccess?.data?.[0]?.devices;
            setSelectedDevices(tempSelectedDevices);
        }
    }, [currentActiveDevicesSuccess]);

    const handlefullMenuCheck = (e, label, mainMenuIndex) => {
        saveButton === true ? setSaveButton(false) : null;
        let tempMOduleData = [...moduleData];
        let tempRows = tempMOduleData[mainMenuIndex]?.['menuId'];

        let tempFullMenu = [...fullMenuAccess];

        if (e) {
            tempFullMenu.push(label);
            if (label === 'Device Control') {
                let tempFUllDevices = options2.data.map((i) => i?._id);
                setSelectedDevices(tempFUllDevices);
            } else {
                if (tempMOduleData[mainMenuIndex]['fullAccess'] === 0) {
                    let tempRemoveFullmenuAccess = { ...tempMOduleData[mainMenuIndex], fullAccess: 1 };
                    tempMOduleData[mainMenuIndex] = { ...tempRemoveFullmenuAccess };
                }
                for (let i = 0; i < tempRows.length; i++) {
                    for (let key in tempRows[i]) {
                        if (Array.isArray(tempRows[i][key])) {
                            tempRows[i][key][0] = '1';
                        }
                    }
                    tempRows[i]['fullAccess'] = 1;
                    // tempRows[i]['drawer-code']=tempRows[i]['drawer-code']
                }
            }
        } else {
            tempFullMenu = tempFullMenu.filter((i) => i !== label);
            if (label === 'Device Control') {
                setSelectedDevices([]);
            } else {
                // console.log(tempMOduleData[mainMenuIndex]['fullAccess']===1,'')
                if (tempMOduleData[mainMenuIndex]['fullAccess'] === 1) {
                    let tempRemoveFullmenuAccess = { ...tempMOduleData[mainMenuIndex], fullAccess: 0 };
                    tempMOduleData[mainMenuIndex] = { ...tempRemoveFullmenuAccess };
                }
                for (let i = 0; i < tempRows.length; i++) {
                    for (let key in tempRows[i]) {
                        if (Array.isArray(tempRows[i][key])) {
                            tempRows[i][key][0] = 0;
                        }
                    }
                    tempRows[i]['fullAccess'] = 0;
                    // tempRows[i]['drawer-code']=tempRows[i]['drawer-code']
                }
            }
        }
        setFullMenuAccess(tempFullMenu);
        // let tempModuleObject = { ...tempMOduleData[moduleIndex], menuId: tempRows };
        // tempMOduleData[moduleIndex] = tempModuleObject;
        setModuleData(tempMOduleData);
    };

    const handleGoBack = () => {
        setModuleData([]);
        history.goBack();
    };

    const handleMenuCheck = (checked, rowName, mindex, label, mainMenuIndex) => {
        saveButton === true ? setSaveButton(false) : null;
        let tempModuleData = [...moduleData];
        let tempMenuData = [...moduleData?.[mainMenuIndex]?.menuId];
        if (checked) {
            tempMenuData = tempMenuData.map((item, index) => {
                if (index === mindex) {
                    let tempItem = { ...item, 'drawer-code': item['drawer-code'], fullAccess: 1 };
                    for (let i in tempItem) {
                        if (Array.isArray(tempItem[i])) {
                            tempItem[i][0] = '1';
                        }
                    }
                    return tempItem;
                } else {
                    return item;
                }
            });
            let tempfullCheck = tempMenuData.every((i) => i.fullAccess === 1);
            if (tempModuleData[mainMenuIndex]['fullAccess'] === 0 && tempfullCheck) {
                let tempRemoveFullmenuAccess = { ...tempModuleData[mainMenuIndex], fullAccess: 1 };
                tempModuleData[mainMenuIndex] = { ...tempRemoveFullmenuAccess };
            }
            tempModuleData[mainMenuIndex]['menuId'] = tempMenuData;
        } else {
            tempMenuData = tempMenuData.map((item, index) => {
                if (index === mindex) {
                    let tempItem = { ...item, 'drawer-code': item['drawer-code'], fullAccess: 0 };
                    for (let i in tempItem) {
                        if (Array.isArray(tempItem[i])) {
                            tempItem[i][0] = '0';
                        }
                    }
                    return tempItem;
                } else {
                    return item;
                }
            });
            if (tempModuleData[mainMenuIndex]['fullAccess'] === 1) {
                let tempRemoveFullmenuAccess = { ...tempModuleData[mainMenuIndex], fullAccess: 0 };
                tempModuleData[mainMenuIndex] = { ...tempRemoveFullmenuAccess };
            }
            tempModuleData[mainMenuIndex]['menuId'] = tempMenuData;
        }
        // console.log(tempMenuData, 'inRemote');
        setModuleData(tempModuleData);
    };

    console.log(moduleData, userRoleCode, 'tempModuleData');

  
    return (
        <Grid style={{ overflow: 'none ', marginBottom: 40 }}>
            <div id="myHeader" style={{ paddingTop: 20 }}>
                <Paper elevation={1}>
                    <Grid container spacing={2} style={{ padding: '10px 40px' }} justify="flex-start">
                        <Grid item xs={4}>
                            <InputLabel style={{ marginBottom: '5px' }}>{CONSTANTS.USER_ACCESS_ROLE}</InputLabel>
                            <Grid container direction={'row'} spacing={2}>
                                <Grid item xs={12} md={10}>
                                    <SelectOption
                                        name="role"
                                        options={(options && options.data) || []}
                                        id="id"
                                        onChange={handleDropDown}
                                        value={userRoleId || tempUserId}
                                        disabled={voucherView}
                                    />
                                </Grid>
                                <Grid item xs={4} md={2}>
                                    <CustomButton
                                        variant="contained"
                                        onClick={handlePostApicall}
                                        color="primary"
                                        disabled={saveButton}
                                    >
                                        {CONSTANTS.SAVE}
                                    </CustomButton>
                                </Grid>
                            </Grid>

                            <Typography
                                variant="subtitle1"
                                style={{
                                    marginTop: 10,
                                    cursor: accessableCodes?.includes('BS-ACO-1029') ? 'pointer' : '',
                                    display: 'inline-block'
                                }}
                            ></Typography>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        {voucherView === false ? (
                            <Grid item xs={4} style={{ display: 'flex', flexDirection: 'row-reverse', paddingTop: 25 }}>
                                <CustomButton
                                    variant="contained"
                                    color={accessableCodes?.includes('BS-ACO-1029') ? 'primary' : 'default'}
                                    onClick={accessableCodes?.includes('BS-ACO-1029') ? handleAddUserRole : null}
                                >
                                    {CONSTANTS.ADD_NEW_USER_ACCESS_ROLE}
                                </CustomButton>
                                {addUserRoleUp && (
                                    <NewUserAccessRole open={addUserRoleUp} handleAddUserRole={handleAddUserRole} />
                                )}
                            </Grid>
                        ) : (
                            <Grid item xs={4} style={{ display: 'flex', flexDirection: 'row-reverse', paddingTop: 25 }}>
                                <CustomButton
                                    variant="contained"
                                    color={accessableCodes?.includes('BS-ACO-1029') ? 'primary' : 'default'}
                                    onClick={accessableCodes?.includes('BS-ACO-1029') ? handleGoBack : null}
                                >
                                    {'Back'}
                                </CustomButton>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            </div>

            <div>
                {loading || userRoleId === '' ? (
                    <Loader />
                ) : moduleData?.length > 0 ? (
                    <>
                        {location?.pathname?.includes('voucher') && (
                            <Paper
                                elevation={0}
                                className={classes.root}
                                style={{
                                    marginTop: 15,
                                    padding: '20px 40px',
                                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)'
                                }}
                            >
                                <Grid container>
                                    {responseData?.data?.length > 0 &&
                                        voucherMap.map((item, index) => {
                                            if (item.value) {
                                                return (
                                                    <Grid
                                                        item
                                                        key={index.toString()}
                                                        style={{ display: 'flex', padding: 15 }}
                                                        xs={4}
                                                    >
                                                        <Typography
                                                            color="primary"
                                                            style={{ flex: 0.5, fontWeight: '500', fontSize: 'medium' }}
                                                        >
                                                            {capitalize(item.key)}
                                                        </Typography>
                                                        <Typography style={{ padding: '0 7px' }}>{':'}</Typography>
                                                        <Typography>{item.value}</Typography>
                                                    </Grid>
                                                );
                                            }
                                        })}
                                </Grid>
                            </Paper>
                        )}
                        <Paper
                            elevation={0}
                            className={classes.root}
                            style={{
                                marginTop: 15,
                                padding: '20px 40px',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)'
                            }}
                        >
                            {responseData?.data?.length > 0 && (
                                <DeviceControlTable
                                    rows={[1, 2, 3, 4, 5]}
                                    columns={options2?.data || []}
                                    handleCheckBox={handleDeviceCheckBox}
                                    label={'Device Control'}
                                    selectedDevices={selectedDevices}
                                    handlefullMenuCheck={handlefullMenuCheck}
                                    fullAccess={fullMenuAccess}
                                />
                            )}
                            </Paper>
                            <Paper
                                elevation={0}
                                className={classes.root}
                                style={{
                                    marginTop: 15,
                                    padding: '20px 40px',
                                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)'
                                }}
                            >
                                {responseData?.data?.length > 0 && (
                                    <RemoveEdqTable
                                        rows={[1, 2, 3, 4, 5]}
                                        columns={options2?.data || []}
                                        handleCheckBox={handleEdqCheckBox}
                                        label={'Remove EDQ'}
                                        selectedDevices={selectedDevices}
                                        handlefullMenuCheck={handlefullMenuCheck}
                                        fullAccess={fullMenuAccess}
                                        isChecked={isChecked}
                                    />
                                )}
                            </Paper>
                        {moduleData?.map((menuItem, indexy) => {
                            if (menuItem.name === 'Developer') {
                                if (userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1002') {
                                    return (
                                        <UserAccessAccordian
                                            key={indexy + 'y'}
                                            indexy={indexy}
                                            columns={menuItem?.accessconfigId}
                                            rows={menuItem?.menuId}
                                            handleCheckBox={handleCheckBox}
                                            label={menuItem?.name}
                                            fullAccess={menuItem.fullAccess}
                                            handlefullMenuCheck={handlefullMenuCheck}
                                        />
                                    );
                                }
                            } else if (menuItem.name === 'Remote Fridge' || menuItem.name === 'Remote Dashboard') {
                                return (
                                    <NewUserAccessScreen
                                        key={indexy + 'y'}
                                        mainMenuIndex={indexy}
                                        columns={menuItem?.accessconfigId}
                                        rows={menuItem?.menuId}
                                        handleCheckBox={handleCheckBox}
                                        label={menuItem?.name}
                                        fullAccess={menuItem.fullAccess}
                                        handlefullMenuCheck={handlefullMenuCheck}
                                        handleMenuCheck={handleMenuCheck}
                                    />
                                );
                            } else {
                                return (
                                    <UserAccessAccordian
                                        key={indexy + 'y'}
                                        indexy={indexy}
                                        columns={menuItem?.accessconfigId}
                                        rows={menuItem?.menuId}
                                        handleCheckBox={handleCheckBox}
                                        label={menuItem?.name}
                                        fullAccess={fullMenuAccess}
                                        handlefullMenuCheck={handlefullMenuCheck}
                                    />
                                );
                            }
                        })}
                    </>
                ) : (
                    <PageNotFound userRoleAccess={true} callAdminAccess={callAdminAccess} />
                )}
            </div>
        </Grid>
    );
};

export default UserRoleAccess;
