import React from 'react';
import moment from 'moment';
import { Grid, Paper, Typography, Card } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './style';

const GoodBatchCompo = ({
    goodUnits,
    redirectCounter,
    goodUnitsHeight,
    grayUnits,
    removeunit,
    goodBatchData,
    selectedBatchProduct,
    getDate,
    showTimer,
    isGoodUnits,
    onlyGoodBatch
}) => {
    const classes = useStyles();
    const { dateFormat } = useSelector((state) => state.dateFormat);
    console.log('inside GoodBatchCompo', goodBatchData);

    var uniq = {};
    const arrFiltered = goodBatchData.filter((obj) => !uniq[obj.batch._id] && (uniq[obj.batch._id] = true));
    console.log('arrFiltered', arrFiltered, uniq);
    return (
        <Grid container direction="column">
            <Grid item xs={12}>
                <Grid item xs={12} style={{ display: 'flex', marginBottom: '2px' }}>
                    <Grid item xs={onlyGoodBatch ? 6 : 12}>
                        <Paper elevation={0} style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <CheckCircleOutlineIcon fontSize="small" className={classes.tickIcon} />{' '}
                            {removeunit ? (
                                <Typography variant="body1" className={classes.successText}>
                                    Batch to be removed are still in Device.
                                </Typography>
                            ) : isGoodUnits && goodBatchData?.length === 0 ? (
                                <Typography variant="body1" className={classes.successText}>
                                    {goodBatchData?.length} Batch product has been added successfully.
                                </Typography>
                            ) : (
                                <Typography variant="body1" className={classes.successText}>
                                    {goodBatchData?.length} Batch product has been unloaded.
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                    {onlyGoodBatch && (
                        <Grid item xs={6}>
                            <Paper elevation={0} style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <AccessTimeIcon fontSize="small" className={classes.tickIcon} />{' '}
                                <Typography variant="body1" className={classes.successText}>
                                    Redirecting to Dashboard screen in {redirectCounter} seconds.
                                </Typography>
                            </Paper>
                        </Grid>
                    )}
                </Grid>

                <Paper
                    style={{
                        borderRadius: '10px',
                        padding: 25,
                        height: '71vh',
                        overflow: 'auto',
                        maxHeight: '62vh'
                    }}
                    elevation={0}
                >
                    <Grid container style={{ padding: 5, display: 'block' }} spacing={4}>
                        {arrFiltered?.map((unit) => (
                            <Grid key={unit._id} item xs={4}>
                                {isGoodUnits ? (
                                    <Card className={classes.cardRoot}>
                                        <table className="table">
                                            <tr>
                                                <td className={classes.cardHead}>GTIN # :</td>
                                                <td className={classes.cardDetail}>{unit?.batch?.gtinNumber}</td>
                                            </tr>
                                            {/*<tr>*/}
                                            {/*    <td className={classes.cardHead}>Serial # :</td>*/}
                                            {/*    <td className={classes.cardDetail}>{unit?.batch?.serialNumber}</td>*/}
                                            {/*</tr>*/}
                                            <tr>
                                                <td className={classes.cardHead}>Batch # :</td>
                                                <td className={classes.cardDetail}>{unit?.batch?.batchNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className={classes.cardHead}>Expires On :</td>
                                                <td className={classes.cardDetail}>
                                                    {unit.check
                                                        ? unit?.batch?.expiryDate
                                                            ? moment(unit?.batch?.expiryDate).format(dateFormat)
                                                            : '-'
                                                        : moment(unit?.batch?.expiryDate).format(dateFormat)}
                                                </td>
                                            </tr>
                                            {/*<tr>*/}
                                            {/*    <td className={classes.cardHead}>Available :</td>*/}
                                            {/*    <td className={classes.cardDetail}>{unit?.batch?.tagNumbers?.length}</td>*/}
                                            {/*</tr>*/}
                                        </table>
                                    </Card>
                                ) : (
                                    <Card className={unit.check ? classes.cardRoot : classes.cardRootGray}>
                                        <table className="table">
                                            <tr>
                                                <td className={classes.cardHead}>GTIN # :</td>
                                                <td className={classes.cardDetail}>{unit?.batch?.gtinNumber}</td>
                                            </tr>
                                            {/*<tr>*/}
                                            {/*    <td className={classes.cardHead}>Serial # :</td>*/}
                                            {/*    <td className={classes.cardDetail}>{unit?.batch?.serialNumber}</td>*/}
                                            {/*</tr>*/}
                                            <tr>
                                                <td className={classes.cardHead}>Batch # :</td>
                                                <td className={classes.cardDetail}>{unit?.batch?.batchNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className={classes.cardHead}>Expires On :</td>
                                                <td className={classes.cardDetail}>
                                                    {unit.check
                                                        ? unit?.batch?.expiryDate
                                                            ? moment(unit?.batch?.expiryDate).format(dateFormat)
                                                            : '-'
                                                        : moment(unit?.batch?.expiryDate).format(dateFormat)}
                                                </td>
                                            </tr>
                                            {/*<tr>*/}
                                            {/*    <td className={classes.cardHead}>Available :</td>*/}
                                            {/*    <td className={classes.cardDetail}>{unit?.batch?.tagNumbers?.length}</td>*/}
                                            {/*</tr>*/}
                                        </table>
                                    </Card>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default GoodBatchCompo;
