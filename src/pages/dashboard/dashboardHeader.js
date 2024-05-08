import React, { useEffect, useState } from 'react';
import moment from 'moment';
import SelectOption from 'components/select';
import JRuleType from '../../JSON/JRuleType';
import { useStyles } from './style';
import { Card, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getDropDown } from 'redux/actions/manage/manageFieldsAction';
import { getDashboard } from 'redux/actions/dashboard/dashboardActions';
import { useLocation } from 'react-router-dom';
import { set } from 'date-fns';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";


const DashboardHeader = ({
    data,
    userAccessData,
    loading,
    setHospitalId,
    setHospitalFilters,
    hospital,
    setHospital,
    setDeviceId,
    device,
    setDevice,
}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    let remoteInfo = JSON.parse(localStorage.getItem('remoteInfo'));

    const { options } = useSelector((state) => state.getDropDown);
    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));
    const [date1, setDate1] = React.useState();
    const [filterAccess, setFilterAccess] = React.useState([]);
    const classes = useStyles();

    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        let tempAccessCodes = [];
        if (userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1002') {
            tempAccessCodes = ['BS-ACO-1002'];
        } else {
            let manageAccessCodes =
                userInfo?.data?.userAccess
                    ?.filter((item) => item['drawer-code'] === 'BS-DR-0001')
                    ?.map((subMenu) => subMenu?.menuId)
                    ?.flat()[0] || [];
            let keysOfObject = Object.keys(manageAccessCodes);
            let tempAccessCodes = [];
            keysOfObject.forEach((item) => {
                if (Array.isArray(manageAccessCodes[item])) {
                    manageAccessCodes[item][0] === '1' && tempAccessCodes.push(manageAccessCodes[item][1]);
                }
            });
        }
        setFilterAccess(tempAccessCodes);
    }, [location]);

    // React.useEffect(() => {
    //     interval();
    //     if (userAccessData) {
    //         userAccessData?.data[0]?.moduleId?.map((item) => {
    //             if (item.code === 'BS-MO-1002') {
    //                 setFilterAccess(true);
    //                 return;
    //             }
    //         });
    //     }
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [userAccessData]);

    const onHospitalChange = (e) => {
        if (!e.target.value) {
            setHospital('All Hospital');
            setHospitalId('');
            return;
        }
        setHospital(e.target.value);

        if (e.target.value) {
            const temp = data?.clientIds[0]?.clientId.filter((val) => val.name === e.target.value);
            const dashFilter = [
                {
                    key: 'clientId',
                    value: temp[0]._id
                }
            ];
            if (devDeviceId.length > 0) {
                dashFilter.push({ key: 'deviceId', value: devDeviceId?._id });
            }

            setHospitalId(JSON.stringify(dashFilter));
        }       
    };

    const onDeviceChange = (e) => {

        console.log("onDeviceChange")
        if (!e.target.value) {
            setDevice('All Device');
            setDeviceId('');
            return;
        }
        setDevice(e.target.value);

        if (e.target.value) {           
            const devices = data?.deviceIds[0]?.deviceId.filter((val) => val.name === e.target.value);    
            if (devices.length > 0) {
                const dashFilter = [
                    {
                        key: 'deviceId',
                        value: devices[0]._id
                    }
                ];
                setHospitalId(JSON.stringify(dashFilter));
            }
            else{
                setHospitalId(JSON.stringify([]));
            }
        }
    };

    // React.useEffect(() => {
    //     if (hospital !== 'All Hospitals') {
    //         const temp = data?.clientIds[0].clientId.filter((val) => val.name === hospital);
    //         console.log(temp);

    //         const dashFilter = [
    //             {
    //                 key: 'clientId',
    //                 value: temp[0]._id
    //             }
    //         ];
    //         setHospitalFilters({
    //             key: 'clientId._id',
    //             value: temp[0]._id
    //         });
    //         setHospitalId(JSON.stringify(dashFilter));
    //     }
    // }, [hospital]);
    // React.useEffect(() => {
    //     setHospital('All Hospital');

    // }, []);

    const interval = () =>
        setInterval(() => {
            const date = moment(Date.now()).format('MMMM DD, YYYY, h:mm:ss A');
            setDate1(date);
        }, 1000);
    return (
        data?.totalUnitsInStock === 0 && data?.totalUnitsInBatches === 0 && data?.totalTransfused===0 ? (
            <Grid></Grid>
        ) :(
        <Grid
            style={{ display: loading && 'none', gap: '20px' }}
            container
            spacing={3}
            justify="flex-end"
            alignItems="center"
        >

            <Grid item>
                <Typography className={classes.resolution} variant="subtitle1">
                    {date1}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Card className={classes.boxShadow}>
                    <SelectOption
                        options={data?.clientIds?.[0]?.clientId}
                        onChange={onHospitalChange}
                        value={hospital}
                        label="All Hospitals"
                        name="Dashboard"
                        onLabelClick={() => dispatch(getDashboard())}
                        disabled={!filterAccess.includes('BS-ACO-1002')}
                    />
                </Card>
                    </Grid>
                    {
                        remoteInfo &&  remoteInfo?.remoteLogin === "FALSE" ? <Grid item xs={2}>
                            <Card className={classes.boxShadow}>
                                <SelectOption
                                    options={data?.deviceIds?.[0]?.deviceId}
                                    onChange={onDeviceChange}
                                    value={device}
                                    label="All Devices"
                                    name="Dashboard"
                                    onLabelClick={() => dispatch(getDashboard())}
                                    disabled={remoteInfo.remoteLogin === "TRUE"}
                                />
                            </Card>
                        </Grid>:("")
                    }
                   
        </Grid>
    ));
};

export default DashboardHeader;
