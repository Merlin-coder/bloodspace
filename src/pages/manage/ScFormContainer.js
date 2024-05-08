import React, { useState, useEffect } from 'react';
import { useStyles } from './style';
import {
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    Switch,
    Typography,
    TextField,
    IconButton, Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
 
} from '@material-ui/core';
import ManulaDevice from '../../assets/manualDevice.png';
import { Alert, CONSTANTS, CustomButton } from 'common';
import DeviceSelection from 'components/socketDeviceSelection/socketDeviceSelection';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import TagIdReader from 'components/TagIdReader';
import MultipleSelect from 'components/multiSelection';
import { DatePicker } from 'common';
import CustomInput from 'components/inputfeild';
import SelectOption from 'components/select';
import { useDispatch, useSelector } from 'react-redux';
import { sortDropdown } from 'common/services/compare';
import AutoComplete from '../../components/autoComplete/index';
import {
    bulkScanLoadingAction,
    clearPreEncodedDataAction,
    currentPcAction,
    lFConnection,
    lFDeviceMethod,
    preEncodedLocalDataAction,
    socketAction,
    socketAssociateBulkData,
    socketDevice,
    socketDeviceSerialnumber,
    socketDeviceStatus,
    socketDeviceConnection,
    socketDeviceToken,
    socketStartStopScan,
    assignLocalDataAction,
    socketDeviceValue,
    SocketScanData
} from '../../redux/actions/socketAction';

import { createAlert, getDrawer,  } from 'redux/actions';
//import { assignUnitDeviceAction, get8thDropdown, passingAssociateProps, socketResponse, getSettings } from 'redux/actions';
import { get8thDropdown, getCollectionDropdown, getDropDown } from 'redux/actions/manage/manageFieldsAction';


const ScFormContainer = (props) => {
    const classes = useStyles();
    const {
        inputs,
        urlEndPoint,
        isEdit,
        isClone,
        onFormChange,
        handleEditChange,
        handleDateChange,
        rowData,
        handleChangeAutocomplete,
        handleEditChangeAutocomplete
    } = props;
    console.log('inputs', isEdit)
    console.log('urlenddddd---',urlEndPoint)
    //const [showAlert, setShoeAleart] = useState(false);
    const showAlert = false;

    const [openDialog,setOpenDialog] = useState(false)

    const { options } = useSelector((state) => state.getDropDown);
    const { options2 } = useSelector((state) => state.get2ndDropdown);
    const { options3 } = useSelector((state) => state.get3rdDropdown);
    const { options4 } = useSelector((state) => state.get4thDropdown);
    const { options5 } = useSelector((state) => state.get5thDropdown);
    const { options6 } = useSelector((state) => state.get6thDropdown);
    const { options7 } = useSelector((state) => state.get7thDropdown);
    const { options8 } = useSelector((state) => state.get8thDropdown);
    console.log('opt---', options)
    console.log('opt2---', options2)
    console.log('opt3---', options3)
    console.log('opt4---', options4)
    console.log('opt5---', options5)
    console.log('opt6---', options6)
    console.log('opt7---', options7)
    console.log('opt8---', options8)
    const { collectionData } = useSelector((state) => state.getCollectionDropdown);
    const { devicestatus } = useSelector((state) => state.getSocketDeviceStatus)
    console.log("devicestatusscanning", devicestatus);
    const { userInfo } = useSelector((state) => state.userLogin);
    const dispatch = useDispatch();

    const { device } = useSelector((state) => state.getSocketDevice);
    const { value } = useSelector((state) => state.getSocketDeviceValue);
    console.log('vvvvvvvvvv', device)
    const [selectedDevicesValue, setSelectedDevicesValue] = useState('');
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    console.log('manual-----', settingsData)

   
    const { drawerResponse } = useSelector((state) => state.getDrawer);

    console.log(drawerResponse, 'in setttings screen');
    let mdrawerResponse = [];
  
    drawerResponse?.data?.map((d, i) => mdrawerResponse.push({ ...d, _id: d.name }));
  
    useEffect(() => {
        dispatch(getCollectionDropdown());
        dispatch(getDrawer());
        if (urlEndPoint === 'drawer') {
            dispatch(getDropDown('useraccessrole'));
        }
        

    }, []);
    const [userRole,setUserRole] = useState()
    useEffect(() => {
        const userRolename = options?.data?.find((obj) => obj.name)
        setUserRole(userRolename?.name);
    }, [options])
    console.log('userRole', userRole)
    const genderOptions = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' },
        { name: 'Other', value: 'other' }
    ];
    const uiTypeOptions = [
        { name: 'Manage', value: 'manage' },
        { name: 'Reports', value: 'reports' },
    ];
    const mainMenuOptions = [
        { name: 'Yes', value: 'yes' },
        { name: 'No', value: 'no' },
    ];
    const behaviourOptions = [
        { name: 'Associate', value: 'isAssociated' },
        { name: 'Emergency', value: 'isEmergency' },
        { name: 'Fridges', value: 'isFridges' },
        { name: 'Freezer', value: 'isFreezer' },
        { name: 'Agitator', value: 'isAgitator' },
    ];
    const loginTypeOptions = [
        { name: 'Web', value: 'web' },
        { name: 'App', value: 'app' },
        { name: 'Both', value: 'both' },
    ];
    const characteristicOptions = [
        { name: 'With temperature', value: 'withTemperature' },
        { name: 'Without temperature', value: 'withoutTemperature' },
    ];
    const remoteAllocationOptions = [
        { name: 'Yes', value: "true" },
        { name: 'No', value: 'false' },
    ];

    let selectedBranch;
    let selectedAuthority;
    const { status } = useSelector((state) => state.getSocketDeviceConnection);

    if (urlEndPoint === 'device') {
        selectedBranch = options3?.data?.filter((item) => item?._id === userInfo?.data?.user?.clientId)[0];
    } else if (urlEndPoint === 'location') {
        selectedBranch = options2?.data?.filter((item) => item?._id === userInfo?.data?.user?.clientId)[0];
    } else if (urlEndPoint === 'user') {
        selectedAuthority = options2?.data?.filter((item) => item?._id === userInfo?.data?.user?.authorityId)[0];
        selectedBranch = options3?.data?.filter((item) => item?._id === userInfo?.data?.user?.clientId)[0];
    }
    const rfidbadgeNoRef = React.useRef();
    
    const [statusValue, setStatusValue] = useState(rowData?.status === undefined ? 0 : parseInt(rowData?.status));
    const [remoteAllocationValue, setRemoteAllocationValue] = useState(
        rowData?.isRemoteAllocationAllowed === undefined ? 0 : parseInt(rowData?.isRemoteAllocationAllowed)
    );
    const [BadgeAccessValue, setBadgeAccessValue] = useState(
        rowData?.isBadgeAccessAllowed === undefined ? 0 : parseInt(rowData?.isBadgeAccessAllowed)
    );
    const [temperatureAccessValue, setTemperatureAccessValue] = useState(
        rowData?.isTemperatureAllowed === undefined ? 0 : parseInt(rowData?.isTemperatureAllowed)
    );
    const [emergencyAccessValue, setEmergencyAccessValue] = useState(
        rowData?.isEmergencyAccessAllowed === undefined ? 0 : parseInt(rowData?.isEmergencyAccessAllowed)
    );
    const [deviceScanValue, setDeviceScanValue] = useState(
        rowData?.isDeviceScanAutomated === undefined ? 0 : parseInt(rowData?.isDeviceScanAutomated)
    );

    const handleSwitchChange = (e) => {
        console.log('switcheeeee',e)
        if (e.target.name === 'status') {
            setStatusValue(e.target.checked === true ? 1 : 0);
            localStorage.setItem('status', e.target.checked === true ? 1 : 0);
        }
        if (e.target.name === 'isDeviceScanAutomated') {
            setDeviceScanValue(e.target.checked === true ? 1 : 0);
            localStorage.setItem('isDeviceScanAutomated', e.target.checked === true ? 1 : 0);
        }
        if (e.target.name === 'isRemoteAllocationAllowed') {
            setRemoteAllocationValue(e.target.checked === true ? 1 : 0);
            localStorage.setItem('isRemoteAllocationAllowed', e.target.checked === true ? 1 : 0);
        }
        if (e.target.name === 'isEmergencyAccessAllowed') {
            setEmergencyAccessValue(e.target.checked === true ? 1 : 0);
            localStorage.setItem('isEmergencyAccessAllowed', e.target.checked === true ? 1 : 0);
        }
        if (e.target.name === 'isBadgeAccessAllowed') {
            setBadgeAccessValue(e.target.checked === true ? 1 : 0);
            localStorage.setItem('isBadgeAccessAllowed', e.target.checked === true ? 1 : 0);
        }
        if (e.target.name === 'isTemperatureAllowed') {
            setTemperatureAccessValue(e.target.checked === true ? 1 : 0);
            localStorage.setItem('isTemperatureAllowed', e.target.checked === true ? 1 : 0);
        }
    };
    let mArray = [];

    if (urlEndPoint === 'drawer') {
        options?.data?.forEach((d) => d.drawerId?.map((v) => mArray.push(v)));
    }
    let mCollectionArray = [];
    if (urlEndPoint === 'drawer') {
        collectionData?.data?.map((d, i) => mCollectionArray.push({ _id: i, name: d }));
    }
    console.log(mCollectionArray, 'in setttings screen');
    useEffect(() => {
        localStorage.setItem('status', statusValue);
        localStorage.setItem('isDeviceScanAutomated', deviceScanValue);
        localStorage.setItem('isRemoteAllocationAllowed', remoteAllocationValue);
        localStorage.setItem('isEmergencyAccessAllowed', emergencyAccessValue);
        localStorage.setItem('isBadgeAccessAllowed', BadgeAccessValue )
        localStorage.setItem('isTemperatureAllowed', temperatureAccessValue)
    }, [statusValue, deviceScanValue, remoteAllocationValue, emergencyAccessValue, BadgeAccessValue,temperatureAccessValue]);

    const onChangeAutoComplete = (e, value, urlEndPoint, name, input) => {
        if (urlEndPoint === 'client' && name === 'authorityId') {
            isEdit
                ? handleEditChangeAutocomplete(e, value, urlEndPoint, name)
                : isClone
                ? handleEditChangeAutocomplete(e, value, urlEndPoint, name)
                : handleChangeAutocomplete(e, value, urlEndPoint, name);
        }
    };

    const socket = useSelector((state) => state.socketReducer.socket);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
    console.log('token-------', token)
    const { serial } = useSelector((state) => state.getSocketDeviceSerialnumber);
    console.log("serial", serial)
    const [activeDevices, setActiveDevices] = React.useState([]);

    useEffect(() => {
        dispatch(get8thDropdown('devices', undefined, 'associate'));
    },[options8])


    

    useEffect(() => {
        console.log("EventLisenser")
        rfidbadgeNoRef?.current?.addEventListener("onChange",isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange);
    }, []);

    React.useEffect(() => {

        //genericEmit("E130", 'Bulk Load')

        if (socket) {
           
            socket.on('ackwriteAccessBadge', (data) => {

                console.log("ackwriteAccessBadge" + JSON.stringify(data))
                if (data?.data.length > 0) {
                    //setRfidBadgeNo(data?.data[0]?.tagId);
                    console.log("rfidref"+rfidbadgeNoRef.current);
                    rfidbadgeNoRef.current.value = data?.data[0]?.tagId;
                   
                    rfidbadgeNoRef.current.dispatchEvent(
                        new Event('onChange', { bubbles: true })
                    );
                    rfidbadgeNoRef.current.dispatchEvent(
                        new Event('onFormChange', { bubbles: true })
                    );
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: "Access Badge is Created Successfully",
                            alertType: 'success'
                        })
                    );
                }
                else {
                    dispatch(
                        createAlert({
                            showAlert: true,
                            alertMessage: data.data.message,
                            alertType: 'error'
                        })
                    );
                }
            });

            socket?.on('deviceStatus', (data) => {
                console.log("dev---", data)
                dispatch(socketDeviceStatus(data));
                console.log('appdata---', data)
                console.log("devicests", data?.deviceStatus)

            });
        }

    }, [socket]);

    React.useEffect(() => {

        //genericEmit("E130", 'Bulk Load')

        if (socket) {

            socket.on('writeAccessBadge', (data) => {

                console.log("writeAccessBadge" + JSON.stringify(data))


            });
        }
    }, [socket]);

    

     React.useEffect(() => {
        if (options8) {

            const serialNumber = options8?.data?.filter((item) => item.status == 1);
            console.log("item", options8?.data)
           
            dispatch(socketDeviceSerialnumber(serialNumber?.[0]?.serialNumber))
            console.log("ser---", serialNumber?.[0]?.serialNumber)

            dispatch(socketDeviceToken(serialNumber?.[0]?.token));
        }
    },[options8])


    const genericEmit = (data) => {
        console.log('========================================');
        console.log('generic ', JSON.stringify(data));
        console.log('========================================');
        if (data) {
            socket?.emit('generic', data);
        }
    };

    const handleScan = () => {
        genericEmit({
            userName: userInfo?.data?.user?.username,
            deviceToken: token,
            method: 'E137',
           
        });
    }

   // const { options8 } = useSelector((state) => state.get8thDropdown);
    const handleOptions = () => {
      
            dispatch(get8thDropdown('devices', undefined, 'associate'));
        
    };

    useEffect(() => {
        if (options8) {
            const active = options8?.data?.filter((item) => item.name == 'Associate Device');
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
    }, [])

    const handleDeviceChange = (e) => {
        console.log('eeee', e)
        dispatch(socketDevice(e?.target?.value));
        dispatch(socketDeviceConnection(false));
        dispatch(socketStartStopScan(false));
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

    const handleDialogOpen = () => {
        setOpenDialog(true)
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
        
    };

    const renderInput = (input, index) => {
        console.log('na----', input)
        console.log('alert--',input.alert)
        return input?.fieldtypeId[0]?.code === 'SC-FT-001' ? (
            input.code === 'SC-FM-10007' || input.code === 'SC-FM-10006' || input.name === 'gtinNumber' ? (
                <Grid item className={classes.inputField} key={input.name}>
                    <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                    <CustomInput
                        key={input.name}
                        onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                        name={input.name}
                        value={input.value}
                        type={
                            input.name === 'phone'
                                ? ''
                                : isEdit && input.name === 'password'
                                ? 'password'
                                : 'text'
                        }
                        autoFocus
                        // fullWidth
                        width={input.code === 'SC-FM-10007' ? '75px' : '335px'}
                        // style={{ width: '10px' }}
                        // className={classes.textField}
                        focus={index === 0}
                    />
                    {input.alert && (
                        <div className={classes.selectAlert}>
                            {input.label} {input.alert}
                        </div>
                    )}
                </Grid>
            ) : input.name === 'badgeNo' ? (
                    <Grid
                        container
                    item
                    xs={12}
                    md={6}
                    className={classes.inputField}
                        key={input.name}
                        row >
                    <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                        <Grid
                            item
                            xs={10}
                            md={10}>
                        <CustomInput
                        key={input.name}
                        onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                        name={input.name}
                                inputRef={rfidbadgeNoRef}
                                value={(rfidbadgeNoRef?.current === undefined || rfidbadgeNoRef?.current===null) ? input.value : rfidbadgeNoRef?.current?.value}
                        //value={rfidBadgeNo == null ? input.value : rfidBadgeNo}
                        //disabled
                        type={
                            input.name === 'phone'
                                ? ''
                                : isEdit && input.name === 'password'
                                    ? 'password'
                                    : 'text'
                        }
                        fullWidth
                        style={{ width: 300 }}
                        className={classes.textField}
                                size="lg"
                           
                        focus={index === 0}
                            />
                        </Grid>
                            <Grid item xs={2}
                                md={2}>
                            <IconButton
                                onClick={handleDialogOpen}
                            >
                                <Tooltip title="Scan Badge">
                                    <WifiTetheringIcon

                                        color={status || devicestatus?.deviceStatus === "CONNECTED" ? 'primary' : 'disabled'}
                                    />
                                </Tooltip>
                            </IconButton>
                        </Grid>
                        
                {/*        {input.name !== 'badgeNo' && showAlert && input.alert !=='is Required' ? (*/}
                {/*        < div className={classes.selectAlert}>*/}
                {/*    {input.label} {input.alert}*/}
                {/*</div>*/}
                {/*        ):null}*/}



                        {input.alert && (
                            <div className={classes.selectAlert}>
                                {input.label} {input.alert}
                            </div>
                        )}
                    
                </Grid>
                )
                    : (
                    <Grid  
                    item
                    xs={12}
                    md={input.name === 'token' || input.name === 'machineNumber' ? 12 : 6}
                    className={classes.inputField}
                    key={input.name}
                >
                        <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                        <CustomInput 
                            key={input.name}
                            onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                            name={input.name}
                            value={input.value}
                            type={
                                input.name === 'phone'
                                    ? ''
                                    : isEdit && input.name === 'password'
                                        ? 'password'
                                        : 'text'
                            }
                            // autoFocus={index === 0}
                            fullWidth
                            style={{ width: 300 }}
                            //width={input.name === 'badgeNo' ? 250 : 300}
                            className={classes.textField}
                            size="lg"
                            focus={index === 0}
                            //display={input.name === 'badgeNo' ? 'flex' : null }
                    />
                    {input.alert && (
                        <div className={classes.selectAlert}>
                            {input.label} {input.alert}
                        </div>
                        )}
                        {/*{input.name === 'badgeNo' ?*/}
                          
                        {/*    <Grid item >*/}
                        {/*        <IconButton*/}
                        {/*            onClick={handleScan}*/}
                        {/*        >*/}
                        {/*            <Tooltip title="Scan Badge Id">*/}
                        {/*                <WifiTetheringIcon*/}
                        {/*                    //className={tagIdLoading && classes.rotate}*/}
                        {/*                    //color={status || value ? 'primary' : 'disabled'}*/}
                        {/*                />*/}
                        {/*            </Tooltip>*/}
                        {/*        </IconButton>*/}
                        {/*    </Grid>*/}
                        {/*    : null}*/}
                    </Grid>

            )
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-003' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                {/* {console.log('urlEndPoints', urlEndPoint, input.name)} */}
                {urlEndPoint !== 'client' && name !== 'authorityId' ? (
                    <SelectOption
                        options={
                            urlEndPoint === 'location' && input.name === 'clientId'
                                ? sortDropdown(options2?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'locationId'
                                ? sortDropdown(options8?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'clientId'
                                ? sortDropdown(options3?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'devicegroupId'
                                ? sortDropdown(options4?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'functionalgroupId'
                                ? sortDropdown(options5?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'storagetypeId'
                                ? sortDropdown(options6?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'devicetrackId'
                                ? sortDropdown(options7?.data, 'name')
                                : urlEndPoint === 'field' && input.name === 'validatorId'
                                ? options2?.data
                                : urlEndPoint === 'field' && input.name === 'drawerId'
                                ? options3?.data
                                : urlEndPoint === 'useraccess' && input.name === 'userId'
                                ? options2?.data
                                : urlEndPoint === 'useraccess' && input.name === 'usergroupId'
                                ? options3?.data
                                : urlEndPoint === 'rcondition' && input.name === 'rconditionfieldtypeId'
                                ? options2?.data
                                : urlEndPoint === 'resolutionsubtype' && input.name === 'resolutionfieldtypeId'
                                ? options2?.data
                                : urlEndPoint === 'user' && input.name === 'authorityId'
                                ? sortDropdown(options2?.data, 'name')
                                : urlEndPoint === 'user' && input.name === 'clientId'
                                ? sortDropdown(options3?.data, 'name')
                                : urlEndPoint === 'user' && input.name === 'useraccessroleId'
                                ? sortDropdown(options4?.data, 'name')
                                : urlEndPoint === 'user' && input.name === 'locationId'
                                ? sortDropdown(options8?.data, 'name')
                                : urlEndPoint === 'displayconfig' && input.name === 'collectionName'
                                ? mCollectionArray
                                : sortDropdown(options?.data, 'name')
                        }
                        onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                        value={input.value}
                        name={input.name}
                        id="id"
                        // focus = {index===0}
                        urlEndPoint={urlEndPoint}
                        noLabel
                        isAlert={urlEndPoint === 'field' && input.name === 'validatorId' ? true : false}
                    />
                ) : (
                    <AutoComplete
                        id="scManageDropDowns"
                        options={
                            urlEndPoint === 'location' && input.name === 'clientId'
                                ? sortDropdown(options2?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'locationId'
                                ? sortDropdown(options8?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'clientId'
                                ? sortDropdown(options3?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'devicegroupId'
                                ? sortDropdown(options4?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'functionalgroupId'
                                ? sortDropdown(options5?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'storagetypeId'
                                ? sortDropdown(options6?.data, 'name')
                                : urlEndPoint === 'device' && input.name === 'devicetrackId'
                                ? sortDropdown(options7?.data, 'name')
                                : urlEndPoint === 'field' && input.name === 'validatorId'
                                ? options2?.data
                                : urlEndPoint === 'field' && input.name === 'drawerId'
                                ? options3?.data
                                : urlEndPoint === 'useraccess' && input.name === 'userId'
                                ? options2?.data
                                : urlEndPoint === 'useraccess' && input.name === 'usergroupId'
                                ? options3?.data
                                : urlEndPoint === 'rcondition' && input.name === 'rconditionfieldtypeId'
                                ? options2?.data
                                : urlEndPoint === 'resolutionsubtype' && input.name === 'resolutionfieldtypeId'
                                ? options2?.data
                                : urlEndPoint === 'user' && input.name === 'authorityId'
                                ? sortDropdown(options2?.data, 'name')
                                : urlEndPoint === 'user' && input.name === 'clientId'
                                ? sortDropdown(options3?.data, 'name')
                                : urlEndPoint === 'user' && input.name === 'useraccessroleId'
                                ? sortDropdown(options4?.data, 'name')
                                : urlEndPoint === 'user' && input.name === 'locationId'
                                ? sortDropdown(options8?.data, 'name')
                                : urlEndPoint === 'displayconfig' && input.name === 'collectionName'
                                ? mCollectionArray
                                : sortDropdown(options?.data, 'name')
                        }
                        // value = {inputValue}
                        value={options?.data?.filter((x) => x?._id === input.value)[0]}
                        onChange={(e, value) => onChangeAutoComplete(e, value, urlEndPoint, input.name)}
                        isAlert={urlEndPoint === 'field' && input.name === 'validatorId' ? true : false}
                        collection="scFormGroup"
                    />
                )}
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
            ) : input?.fieldtypeId[0]?.code === 'SC-FT-004' && input?.name === 'gender' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="api"
                        name={input.name}
                        value={input.value?.toLowerCase()}
                        className={classes.radioBtns}
                        //onChange={ onFormChange}
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
                </FormControl>
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
                ) : input?.fieldtypeId[0]?.code === 'SC-FT-004' && input?.name === 'behaviourProperties' ? (
                    <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                        <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="api"
                                name={input.name}
                                value={input.value}
                                className={classes.radioBtns}
                                onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                            >
                                    {behaviourOptions.map((option) => (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                        label={option.name}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        {input.alert && (
                            <div className={classes.selectAlert}>
                                {input.label} {input.alert}
                            </div>
                        )}
                    </Grid>
                    ) : input?.fieldtypeId[0]?.code === 'SC-FT-004' && input?.name === 'loginType' ? (
                    <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                        <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="api"
                                name={input.name}
                                value={input.value}
                                className={classes.radioBtns}
                                onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                            >
                                    {loginTypeOptions.map((option) => (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                        label={option.name}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        {input.alert && (
                            <div className={classes.selectAlert}>
                                {input.label} {input.alert}
                            </div>
                        )}
                    </Grid>
                    ) :input?.fieldtypeId[0]?.code === 'SC-FT-004' && input?.name === 'characteristic' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="api"
                        name={input.name}
                        value={input.value?.toLowerCase()}
                        className={classes.radioBtns}
                        onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                    >
                         {characteristicOptions.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                label={option.name}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
                        )
                            : input?.fieldtypeId[0]?.code === 'SC-FT-004' && input?.name === 'type' && input?.label === 'UI Type' ? (
                                <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                                    <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="api"
                                            name={input.name}
                                            value={input.value?.toLowerCase()}
                                            className={classes.radioBtns}
                                            //onChange={ onFormChange}
                                            onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                                        >
                                            {uiTypeOptions.map((option) => (
                                                <FormControlLabel
                                                    key={option.value}
                                                    value={option.value}
                                                    control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                                    label={option.name}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    {input.alert && (
                                        <div className={classes.selectAlert}>
                                            {input.label} {input.alert}
                                        </div>
                                    )}
                                </Grid>
                            ) : input?.fieldtypeId[0]?.code === 'SC-FT-004' && input?.name === 'mainMenu' ? (
    <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
        <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
        <FormControl component="fieldset">
            <RadioGroup
                aria-label="api"
                name={input.name}
                value={input.value?.toLowerCase()}
                className={classes.radioBtns}
                //onChange={ onFormChange}
                onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
            >
                {mainMenuOptions.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                        label={option.name}
                    />
                ))}
            </RadioGroup>
        </FormControl>
        {input.alert && (
            <div className={classes.selectAlert}>
                {input.label} {input.alert}
            </div>
        )}
    </Grid>
                                    ) : input?.fieldtypeId[0]?.code === 'SC-FT-004' && input?.name === 'remoteAllocation' ? (
                                        <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                                            <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    aria-label="api"
                                                    name={input.name}
                                                    value={input.value?.toLowerCase()}
                                                    className={classes.radioBtns}
                                                    //onChange={ onFormChange}
                                                    onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                                                >
                                                    {remoteAllocationOptions.map((option) => (
                                                        <FormControlLabel
                                                            key={option.value}
                                                            value={option.value}
                                                            control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                                            label={option.name}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            {input.alert && (
                                                <div className={classes.selectAlert}>
                                                    {input.label} {input.alert}
                                                </div>
                                            )}
                                        </Grid>
                                        ): input?.fieldtypeId[0]?.code === 'SC-FT-005' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <DatePicker
                    inputVariant="outlined"
                    handleDate={(date) => handleDateChange(input.name, date)}
                    value={input.value ?? null}
                    format="dd/MM/yyyy"
                    placeholder="DD/MM/YYYY"
                    // allowKeyboardControl={true}
                    disablePast={urlEndPoint === 'recipient' ? false : true}
                    disableFuture={urlEndPoint === 'recipient' && true}
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
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-006' && !isEdit && !isClone ? (
            <div className={classes.checkBoxContainer}>
                <label htmlFor={input.name} className={classes.checkBoxlabel}>
                    {input.label}:
                </label>

                <Switch color="primary" name={input.name} checked={input.value ?? false} onChange={onFormChange} />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </div>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-006' && (isEdit || isClone) && input.name === 'status' ? (
            <div className={classes.checkBoxContainer}>
                <label htmlFor={input.name} className={classes.checkBoxlabel}>
                    Status:
                </label>
                <Switch
                    color="primary"
                    name="status"
                    checked={statusValue === 0 ? false : true}
                    onChange={handleSwitchChange}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </div>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-006' &&
          (isEdit || isClone) &&
          input.name === 'isDeviceScanAutomated' ? (
            <div className={classes.checkBoxContainer}>
                <label htmlFor={input.name} className={classes.checkBoxlabel}>
                    Device Scan Automation:
                </label>
                <Switch
                    color="primary"
                    name="isDeviceScanAutomated"
                    checked={deviceScanValue}
                    onChange={handleSwitchChange}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </div>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-006' &&
          (isEdit || isClone) &&
          input.name === 'isEmergencyAccessAllowed' ? (
            <div className={classes.checkBoxContainer}>
                <label htmlFor={input.name} className={classes.checkBoxlabel}>
                    Emergency Access:
                </label>
                <Switch
                    color="primary"
                    name="isEmergencyAccessAllowed"
                    checked={emergencyAccessValue}
                    onChange={handleSwitchChange}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </div>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-006' &&
          (isEdit || isClone) &&
          input.name === 'isRemoteAllocationAllowed' ? (
            <div className={classes.checkBoxContainer}>
                <label htmlFor={input.name} className={classes.checkBoxlabel}>
                    Remote Allocation:
                </label>
                <Switch
                    color="primary"
                    name="isRemoteAllocationAllowed"
                    checked={remoteAllocationValue}
                    onChange={handleSwitchChange}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </div>
          ) : input?.fieldtypeId[0]?.code === 'SC-FT-006' &&
                  (isEdit || isClone) &&
             input.name === 'isBadgeAccessAllowed' ? (
                 <div className={classes.checkBoxContainer}>
                <label htmlFor={input.name} className={classes.checkBoxlabel}>
                         Badge Access:
                 </label>
                 <Switch
                     color="primary"
                    name="isBadgeAccessAllowed"
                   checked={BadgeAccessValue}
                    onChange={handleSwitchChange}
                />
             {input.alert && (
            <div className={classes.selectAlert}>
                {input.label} {input.alert}
            </div>
             )}
             </div>
            ): input?.fieldtypeId[0]?.code === 'SC-FT-006' &&
                  (isEdit || isClone) &&
             input.name === 'isTemperatureAllowed' ? (
                 <div className={classes.checkBoxContainer}>
                <label htmlFor={input.name} className={classes.checkBoxlabel}>
                         Temperature Controlled:
                 </label>
                 <Switch
                     color="primary"
                    name="isTemperatureAllowed"
                   checked={temperatureAccessValue}
                    onChange={handleSwitchChange}
                />
             {input.alert && (
            <div className={classes.selectAlert}>
                {input.label} {input.alert}
            </div>
             )}
             </div>   ) : input?.fieldtypeId[0]?.code === 'SC-FT-007' && input?.name === 'useraccessroleId'  ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <MultipleSelect
                    options={
                        urlEndPoint === 'drawer'
                            ? options?.data
                            : options2?.data
                    }
                    value={
                        input.value === undefined
                            ? []
                            : input.value === null
                            ? []
                            : input.value === ''
                            ? []
                            : input.value
                    }
                    onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                    name={input.name}
                    isColumn={input.name === 'column-multiple'}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
            )  : input?.fieldtypeId[0]?.code === 'SC-FT-004' && input?.name === 'databaseTableName' ? (
                <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                    <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                    <MultipleSelect
                        options={
                           mCollectionArray
                        }
                        value={
                            input.value === undefined
                                ? []
                                : input.value === null
                                    ? []
                                    : input.value === ''
                                        ? []
                                        : input.value
                        }
                        onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                        name={input.name}
                        isColumn={input.name === 'column-multiple'}
                    />
                    {input.alert && (
                        <div className={classes.selectAlert}>
                            {input.label} {input.alert}
                        </div>
                    )}
                </Grid>
            ) :
              input?.fieldtypeId[0]?.code === 'SC-FT-007' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>

                <MultipleSelect
                    options={
                        urlEndPoint === 'displayconfig'
                            ? options2?.data?.[0]?.columnId
                            : urlEndPoint === 'drawer'
                            ? mArray
                            : urlEndPoint === 'usergroup'
                            ? options?.data
                            : options2?.data
                    }
                    value={
                        input.value === undefined
                            ? []
                            : input.value === null
                            ? []
                            : input.value === ''
                            ? []
                            : input.value
                    }
                    onChange={isEdit ? handleEditChange : isClone ? handleEditChange : onFormChange}
                    name={input.name}
                    isColumn={input.name === 'column-multiple'}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : null;
    };
    return (
        <Grid>
            <Grid container spacing={2}>
                {inputs?.length === 0 ? (
                    <Typography variant="body2" className={classes.nofields}>
                        No Fields Available.
                    </Typography>
                ) : (
                    inputs?.map((input, index) => renderInput(input, index))
                )}
            </Grid>
            <Dialog
                maxWidth="lg"
                PaperProps={{
                    style: {
                        borderRadius: '30px',
                        backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                        padding: 20,
                        width: '600px'
                    }
                }}
                open={openDialog}
                onClose={handleDialogClose}
            >
                <DialogContent>
                    <Grid item xs={12} style={{ display: 'flex' }}>
                        <Grid item className={classes.sideBar}>
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                                style={{ marginTop: '5px', marginBottom: '5px' }}
                                spacing={4}
                                direction="column"
                            >
                                <Grid item>
                                    <Typography variant="h3" className={classes.tipsTypo}>
                                        Badge Access Scan
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5" className={classes.tipsTypoSmall}>
                                        Place Your Tag on the Reader
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <img src={ManulaDevice} style={{ width: 180, marginTop: 10 }} />
                                </Grid>

                                
                                   
                                        <Grid item>
                                            <SelectOption
                                                label="Select Device"
                                                onChange={handleDeviceChange}
                                                value={device}
                                                minWidth={250}
                                                disabledLabel={true}
                                                options={window.location.pathname === '/dashboard/barcode-entry/movein' ? activeDevices.filter((dev) => dev.name !== "Associate Device") : activeDevices}
                                                onOpen={handleOptions}
                                                placeHolder={'Select Device'}
                                            />
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Grid item xs={6} >
                                        <CustomButton variant="contained"
                                            onClick={handleDialogClose}
                                        >
                                            Cancel
                                        </CustomButton>
                                    </Grid>
                                    <Grid item xs={6} style={{ marginLeft:'300px'} }> 
                                            <CustomButton
                                                variant={'contained'}
                                                // disabled={!status || devicestatus?.deviceStatus === "DISCONNECTED:1" ? true : false}
                                                color="primary"
                                                width="100px"
                                                onClick={handleScan}
                                            >
                                                Scan

                                            </CustomButton>
                                        </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    {/*    <Grid item xs={6} className={classes.inputField}>*/}
                    {/*        <Grid item>*/}
                    {/*            <SelectOption*/}
                    {/*                label="Select Device"*/}
                    {/*                onChange={handleDeviceChange}*/}
                    {/*                value={device}*/}
                    {/*                minWidth={250}*/}
                    {/*                disabledLabel={true}*/}
                    {/*                options={window.location.pathname === '/dashboard/barcode-entry/movein' ? activeDevices.filter((dev) => dev.name !== "Associate Device") : activeDevices}*/}
                    {/*                onOpen={handleOptions}*/}
                    {/*                placeHolder={'Select Device'}*/}
                    {/*            />*/}
                    {/*        </Grid>*/}
                    {/*        <Grid item>*/}
                    {/*            <CustomButton*/}
                    {/*                variant={'contained'}*/}
                    {/*               // disabled={!status || devicestatus?.deviceStatus === "DISCONNECTED:1" ? true : false}*/}
                    {/*                color="primary"*/}
                    {/*                width="100px"*/}
                    {/*                onClick={handleScan}*/}
                    {/*            >*/}
                    {/*                Scan*/}
                                    
                    {/*            </CustomButton>*/}
                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                    {/*<Grid container>*/}
                    {/*    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', padding: '15px' }}>*/}
                    {/*        <CustomButton variant="contained"*/}
                    {/*            onClick={handleDialogClose}*/}
                    {/*        >*/}
                    {/*            Close*/}
                    {/*        </CustomButton>*/}
                    {/*    </Grid>*/}
                        {/*<Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>*/}
                        {/*    <CustomButton variant="contained" color="primary"*/}
                        {/*    //onClick={handleBatchSaveClick}*/}
                        {/*    >*/}
                        {/*        Save*/}
                        {/*    </CustomButton>*/}
                        {/*</Grid>*/}
                    </Grid>
                </DialogContent>
            </Dialog>
           
        </Grid>



    );
};

export default ScFormContainer;
