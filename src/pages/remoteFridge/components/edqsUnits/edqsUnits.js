import React, { useState } from 'react';
import { useStyles } from './style';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Link, List, Paper, Typography, useTheme } from '@material-ui/core';
import { getStatusReport } from '../../../../redux/actions/remoteDashboardActions';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import ExpandableCard from '../expandableCard';
import { CustomDialog } from '../../../../components';
import { socketSessionIdAction } from 'redux/actions';
import { deviceLogout } from 'redux/actions/auth/authActions';

const cards = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' }
];

const EdqsUnits = (props) => {
    const { handleDeviceExit } = props;
    const history = useHistory();
    const socket = useSelector((state) => state.socketReducer.socket);
    const { dateFormat } = useSelector((state) => state.dateFormat);
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const { data, loading } = useSelector((state) => state.getStatusReport);
    const [counter, setCounter] = useState(0);
    // For Bar chart

    const [expiredUnit, setExpiredUnits] = React.useState([]);
    const [quarantinedUnit, setQuarantinedUnit] = React.useState([]);
    const [dereservedUnit, setDereservedUnit] = React.useState([]);
    const [expiredBatch, setExpiredBatch] = React.useState([]);
    const [quarantinedBatch, setQuarantinedBatch] = React.useState([]);
    const [dereservedBatch, setDereservedBatch] = React.useState([]);
    const [edqCountsBatch, setEdqCountsBatch] = React.useState([]);
    const [edqCounts, setEdqCounts] = React.useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [errorRows, setErrorRows] = useState();
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    let devDeviceId = JSON.parse(localStorage.getItem('remoteDevDevice'));
    console.log('devDeviceId', devDeviceId);
    React.useEffect(() => {
        let deviceId = devDeviceId?._id;
        console.log('device Id', deviceId);
        dispatch(getStatusReport(deviceId));
    }, [selectedDevice]);

    React.useEffect(() => {
        setEdqCounts(data?.EDQs);
        if (data?.EDQs === 0) setCounter(5);
        else {
            if (data?.expiredUnit?.length > 0) {
                setExpiredUnits(data.expiredUnit);
            }
            if (data?.dereservedUnit?.length > 0) {
                setDereservedUnit(data.dereservedUnit);
            }
            if (data?.quarantinedUnit?.length > 0) {
                setQuarantinedUnit(data.quarantinedUnit);
            }
        }
    }, [data]);

    React.useEffect(() => {
        setEdqCountsBatch(data?.batchEDQs);
        if (data?.batchEDQs === 0) setCounter(5);
        else {
            if (data?.expiredBatches?.length > 0) {
                setExpiredBatch(data.expiredBatches);
            }
            if (data?.dereservedBatches?.length > 0) {
                setDereservedBatch(data.dereservedBatches);
            }
            if (data?.quarantinedBatches?.length > 0) {
                setQuarantinedBatch(data.quarantinedBatches);
            }
        }
    }, [data]);

    React.useEffect(() => {
        socket?.on('deviceActivity', (data) => {
            console.log('device Activity -- ', data);
            dispatch(socketSessionIdAction({ _id: data?.sessionData?._id }));
            if (data?.badData?.length > 0) {
                setIsUnlocked(false);
            }
            if (data?.goodData?.length > 0) {
                setIsUpdating(true);
                setCounter(10);
            } else {
                setIsUnlocked(true);
                setCounter(10);
            }
        });
    }, [socket]);

    React.useEffect(() => {
        setTimeout(() => handleDecrementCounter(), 1000);
    }, [counter, isUnlocked, isUpdating, edqCounts]);

    const handleExpandDereservationClick = (id) => {
        let tempBadUnits = [];
        if (id.isExpanded) {
            tempBadUnits = dereservedUnit.map((i) => {
                if (i?.refSku?.donationCode === id?.refSku?.donationCode) {
                    return { ...id, isExpanded: false };
                } else {
                    return i;
                }
            });
        } else {
            tempBadUnits = dereservedUnit.map((i) => {
                if (i?.refSku?.donationCode === id?.refSku?.donationCode) {
                    return { ...id, isExpanded: true };
                } else {
                    return i;
                }
            });
        }
        setDereservedUnit(tempBadUnits);
    };

    const handleExpandDereservationbatchClick = (id) => {
        let tempBadUnits = [];
        if (id?.isExpanded) {
            tempBadUnits = dereservedBatch.map((i) => {
                if (i?.batchNumber === id?.batchNumber) {
                    return { ...id, isExpanded: false };
                } else {
                    return i;
                }
            });
        } else {
            tempBadUnits = dereservedBatch.map((i) => {
                if (i?.batchNumber === id?.batchNumber) {
                    return { ...id, isExpanded: true };
                } else {
                    return i;
                }
            });
        }
        setDereservedBatch(tempBadUnits);
    };

    const handleExpandExpiredClick = (id) => {
        let tempBadUnits = [];
        if (id.isExpanded) {
            tempBadUnits = expiredUnit.map((i) => {
                if (i?.refSku?.donationCode === id?.refSku?.donationCode) {
                    return { ...id, isExpanded: false };
                } else {
                    return i;
                }
            });
        } else {
            tempBadUnits = expiredUnit.map((i) => {
                if (i?.refSku?.donationCode === id?.refSku?.donationCode) {
                    return { ...id, isExpanded: true };
                } else {
                    return i;
                }
            });
        }
        setExpiredUnits(tempBadUnits);
    };

    const handleExpandExpiredbatchClick = (id) => {
        let tempBadUnits = [];
        if (id.isExpanded) {
            tempBadUnits = expiredBatch.map((i) => {
                if (i?.batchNumber === id?.batchNumber) {
                    return { ...id, isExpanded: false };
                } else {
                    return i;
                }
            });
        } else {
            tempBadUnits = expiredBatch.map((i) => {
                if (i?.batchNumber === id?.batchNumber) {
                    return { ...id, isExpanded: true };
                } else {
                    return i;
                }
            });
        }
        setExpiredBatch(tempBadUnits);
    };

    const handleExpandQuarantineClick = (id) => {
        let tempBadUnits = [];
        if (id.isExpanded) {
            tempBadUnits = quarantinedUnit.map((i) => {
                if (i?.refSku?.donationCode === id?.refSku?.donationCode) {
                    return { ...id, isExpanded: false };
                } else {
                    return i;
                }
            });
        } else {
            tempBadUnits = quarantinedUnit.map((i) => {
                if (i?.refSku?.donationCode === id?.refSku?.donationCode) {
                    return { ...id, isExpanded: true };
                } else {
                    return i;
                }
            });
        }
        setQuarantinedUnit(tempBadUnits);
    };

    const handleExpandQuarantinebatchClick = (id) => {
        let tempBadUnits = [];
        if (id.isExpanded) {
            tempBadUnits = quarantinedBatch.map((i) => {
                if (i?.batchNumber === id?.batchNumber) {
                    return { ...id, isExpanded: false };
                } else {
                    return i;
                }
            });
        } else {
            tempBadUnits = quarantinedBatch.map((i) => {
                if (i?.batchNumber === id?.batchNumber) {
                    return { ...id, isExpanded: true };
                } else {
                    return i;
                }
            });
        }
        setQuarantinedBatch(tempBadUnits);
    };


    const handleDecrementCounter = () => {
        console.log('my counter handleDecrementCounter --- ', counter + ' door is unlocked - ' + isUnlocked);
        if (isUnlocked || isUpdating || edqCounts === 0) {
            if (counter === 0) {
                setIsUnlocked(false);
                setIsUpdating(false);
                if (isUpdating) {
                    let deviceId = devDeviceId?._id;
                    dispatch(getStatusReport(deviceId));
                } else if (edqCounts === 0) redirectTORDashBoard();
            } else setCounter(counter - 1);
        } else {
            setIsUnlocked(false);
            setIsUpdating(false);
            setCounter(10);
        }
    };

    /*    React.useEffect(() => {
            counter > 0 && isUnlocked && setTimeout(() => setCounter(counter - 1), 1000);
            if (isUnlocked) {
                setCounter(counter - 1);
            } else {
                setIsUnlocked(false);
                setCounter(10);
            }
            console.log('my counter --- ', counter + ' door is unlocked - ' + isUnlocked);
        }, [counter]);*/

    /* useEffect(() => {
         console.log('my counter --- ', counter + ' door is unlocked - ' + isUnlocked);
         counter > 0 && isUnlocked && setTimeout(() => handleDecrimentCounter(), 1000);

         if (isUnlocked && counter === 0) {
             setIsUnlocked(false);
         }
     }, [counter]);*/

    /*React.useEffect(() => {

        setAvailableUnits(data?.availableUnits);
        setAssignedUnits(data?.assignedUnits);
        setTotalUnits(data?.totalUnitsInStock);
        setEdqCounts(data?.edqCount);
        if (data?.available?.length > 0) {
            let gValue = data?.available
                .map((value) => value.name && value.count)
                .filter((val) => val !== undefined);
            let glabel = data?.available
                ?.map((value) => value.name && value.name)
                .filter((val) => val !== undefined);

            setAvlBarValues(gValue);
            setAvlBarLabels(glabel);
        }
    }, [data]);*/

    const redirectTORDashBoard = () => {
        handleDeviceExit();
        dispatch(deviceLogout());
        history.push('/dashboard/remote-dashboard');
    };

    return (
        <>
            <Grid container spacing={2} direction="column">
                <Grid xs={24} container direction="column" spacing={2} style={{ padding: 20 }}>
                    <Paper elevation={0} style={{ padding: 20 }}>
                        <Grid container className={classes.xs4Grid}>
                            <Grid container>
                                <Grid item>
                                    <WarningRoundedIcon className={classes.smallCardIcon} color="error" />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" color="primary">
                                        EDQs: {edqCounts} Unit listed to be removed is still in the Fridge.
                                    </Typography>
                                </Grid>
                                {edqCounts == 1 ? (
                                    <Grid item xs>
                                        <Grid container direction="row-reverse">
                                            <Grid item>
                                                <Typography
                                                    variant="subtitle2"
                                                    component={Link}
                                                    className={classes.linkText}
                                                    onClick={redirectTORDashBoard}
                                                >
                                                    Skip this action
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <></>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid xs={24} container direction="column" spacing={2} style={{ padding: 20 }}>
                    <Paper className={classes.warningPaper} elevation={0}>
                        <Grid container className={classes.xs4Grid}>
                            <Grid container xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid item className={classes.cardHeader}>
                                    <Typography variant="h6" color="secondary">
                                        PASSED DERESERVATION UNITS (<>{dereservedUnit?.length}</>)
                                    </Typography>
                                </Grid>
                                <Grid item className={classes.cardNormal}>
                                    {dereservedUnit?.length === 0 ? (
                                        <Grid item xs={4} className={classes.emptyCard}>
                                            <Typography variavariant="h3" className={classes.tipsTypo}>
                                                No Dereservated Units to be removed
                                            </Typography>
                                        </Grid>
                                    ) : (
                                        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
                                            {dereservedUnit.map((unit) => (
                                                <Grid key={unit.id} item xs={4}>
                                                    <ExpandableCard
                                                        setRows={setErrorRows}
                                                        rows={errorRows}
                                                        unit={unit}
                                                        //isError2
                                                        //disabled
                                                        handleExpandClick={handleExpandDereservationClick}
                                                    />
                                                </Grid>
                                            ))}
                                        </List>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid item className={classes.cardHeader}>
                                    <Typography variant="h6" color="secondary">
                                        EXPIRED UNITS (<>{expiredUnit?.length }</>)
                                    </Typography>
                                </Grid>
                                <Grid item className={classes.cardNormal}>
                                    {expiredUnit?.length === 0 ? (
                                        <Grid item xs={4} className={classes.emptyCard}>
                                            <Typography variavariant="h3" className={classes.tipsTypo}>
                                                No Expired Units to be removed
                                            </Typography>
                                        </Grid>
                                    ) : (
                                        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
                                            {expiredUnit?.map((unit) => (
                                                <Grid key={unit.id} item xs={4} style={{}}>
                                                    <ExpandableCard
                                                        setRows={setErrorRows}
                                                        rows={errorRows}
                                                        unit={unit}
                                                        // isError2
                                                        //disabled
                                                        handleExpandClick={handleExpandExpiredClick}
                                                    />
                                                </Grid>
                                            ))}
                                        </List>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid item className={classes.cardHeader}>
                                    <Typography variant="h6" color="secondary">
                                        QUARANTINED UNITS (<>{quarantinedUnit?.length }</>)
                                    </Typography>
                                </Grid>
                                <Grid item className={classes.cardNormal}>
                                    {quarantinedUnit?.length === 0 ? (
                                        <Grid item xs={4} className={classes.emptyCard}>
                                            <Typography variavariant="h3" className={classes.tipsTypo}>
                                                No Quarantined Units to be removed
                                            </Typography>
                                        </Grid>
                                    ) : (
                                        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
                                            {quarantinedUnit?.map((unit) => (
                                                <Grid key={unit.id} item xs={4} style={{}}>
                                                    <ExpandableCard
                                                        setRows={setErrorRows}
                                                        rows={errorRows}
                                                        unit={unit}
                                                        //disabled
                                                        handleExpandClick={handleExpandQuarantineClick}
                                                    />
                                                    {/*isError2*/}
                                                </Grid>
                                            ))}
                                        </List>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid xs={24} container direction="column" spacing={2} style={{ padding: 20 }}>
                    <Paper elevation={0} style={{ padding: 20 }}>
                        <Grid container className={classes.xs4Grid}>
                            <Grid container>
                                <Grid item>
                                    <WarningRoundedIcon className={classes.smallCardIcon} color="error" />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" color="primary">
                                        BatchEDQs: Batch listed to be removed is still in the Fridge.
                                    </Typography>
                                </Grid>
                                {edqCountsBatch == 1 ? (
                                    <Grid item xs>
                                        <Grid container direction="row-reverse">
                                            <Grid item>
                                                <Typography
                                                    variant="subtitle2"
                                                    component={Link}
                                                    className={classes.linkText}
                                                    onClick={redirectTORDashBoard}
                                                >
                                                    Skip this action
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <></>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid xs={24} container direction="column" spacing={2} style={{ padding: 20 }}>
                    <Paper className={classes.warningPaper} elevation={0}>
                        <Grid container className={classes.xs4Grid}>
                            <Grid container xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid item className={classes.cardHeader}>
                                    <Typography variant="h6" color="secondary">
                                        PASSED DERESERVATION BATCH (<>{dereservedBatch?.length}</>)
                                    </Typography>
                                </Grid>
                                <Grid item className={classes.cardNormal}>
                                    {dereservedBatch?.length === 0 ? (
                                        <Grid item xs={4} className={classes.emptyCard}>
                                            <Typography variavariant="h3" className={classes.tipsTypo}>
                                                No Dereservated Batches to be removed
                                            </Typography>
                                        </Grid>
                                    ) : (
                                        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
                                            {dereservedBatch.map((batch) => (
                                                <Grid key={batch.id} item xs={4}>
                                                    <ExpandableCard
                                                        setRows={setErrorRows}
                                                        rows={errorRows}
                                                        batch={batch}
                                                        // isError2
                                                        //disabled
                                                        handleExpandClick={handleExpandDereservationbatchClick}
                                                    />
                                                </Grid>
                                            ))}
                                        </List>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid item className={classes.cardHeader}>
                                    <Typography variant="h6" color="secondary">
                                        EXPIRED BATCH (<>{expiredBatch?.length}</>)
                                    </Typography>
                                </Grid>
                                <Grid item className={classes.cardNormal}>
                                    {expiredBatch?.length === 0 ? (
                                        <Grid item xs={4} className={classes.emptyCard}>
                                            <Typography variavariant="h3" className={classes.tipsTypo}>
                                                No Expired Batches to be removed
                                            </Typography>
                                        </Grid>
                                    ) : (
                                        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
                                            {expiredBatch?.map((batch) => (
                                                <Grid key={batch.id} item xs={4} style={{}}>
                                                    <ExpandableCard
                                                        setRows={setErrorRows}
                                                        rows={errorRows}
                                                        batch={batch}
                                                        // isError2
                                                        //disabled
                                                        handleExpandClick={handleExpandExpiredbatchClick}
                                                    />
                                                </Grid>
                                            ))}
                                        </List>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid container xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid item className={classes.cardHeader}>
                                    <Typography variant="h6" color="secondary">
                                        QUARANTINED BATCH (<>{quarantinedBatch?.length}</>)
                                    </Typography>
                                </Grid>
                                <Grid item className={classes.cardNormal}>
                                    {quarantinedBatch?.length === 0 ? (
                                        <Grid item xs={4} className={classes.emptyCard}>
                                            <Typography variavariant="h3" className={classes.tipsTypo}>
                                                No Quarantined Batches to be removed
                                            </Typography>
                                        </Grid>
                                    ) : (
                                        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
                                            {quarantinedBatch?.map((batch) => (
                                                <Grid key={batch.id} item xs={4} style={{}}>
                                                    <ExpandableCard
                                                        setRows={setErrorRows}
                                                        rows={errorRows}
                                                        batch={batch}
                                                        //disabled
                                                        handleExpandClick={handleExpandQuarantinebatchClick}
                                                        
                                                    />
                                                    {/*isError2*/}
                                                </Grid>
                                            ))}
                                        </List>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {!isUpdating && edqCounts !== 0 && edqCounts !== undefined && isUnlocked && (
                    <CustomDialog
                        open={isUnlocked}
                        title="Action Required"
                        minWidth="200px"
                        headerIcon="actionRequired"
                        isInfo
                        // onClose={() => dispatch(removeAlert())}
                    >
                        <Typography variant="h5">
                            Please open the {devDeviceId?.name} and remove the listed units.
                        </Typography>
                    </CustomDialog>
                )}
                {isUpdating && (
                    <CustomDialog
                        open={isUpdating}
                        title="PLEASE WAIT...."
                        minWidth="200px"
                        headerIcon="actionRequired"
                        isInfo
                        // onClose={() => dispatch(removeAlert())}
                    >
                        <Typography variant="h5">Updating Status Report.</Typography>
                    </CustomDialog>
                )}
                {!isUpdating && edqCounts === 0 && (
                    <CustomDialog
                        open={edqCounts === 0}
                        title="No EDQs"
                        minWidth="200px"
                        isInfo
                        // onClose={() => dispatch(removeAlert())}
                    >
                        <Typography variant="h5">No Passed Dereservation, Expired or Quarantine units.</Typography>
                    </CustomDialog>
                )}
                {/*{!isUpdating && edqCountsBatch === 0 && (*/}
                {/*    <CustomDialog*/}
                {/*        open={edqCountsBatch === 0}*/}
                {/*        title="No EDQs"*/}
                {/*        minWidth="200px"*/}
                {/*        isInfo*/}
                {/*    // onClose={() => dispatch(removeAlert())}*/}
                {/*    >*/}
                {/*        <Typography variant="h5">No Passed Dereservation, Expired or Quarantine Batches.</Typography>*/}
                {/*    </CustomDialog>*/}
                {/*)}*/}
            </Grid>
        </>
    );
};

export default EdqsUnits;
