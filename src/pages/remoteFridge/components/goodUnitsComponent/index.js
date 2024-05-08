import React from 'react';
import moment from 'moment';
import { Grid, Paper, Typography, Card } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './style';

const GoodUnits = ({
    returnUnits,
    goodUnits,
    redirectCounter,
    goodUnitsHeight,
    grayUnits,
    removeunit,
    goodBatchData,
    selectedBatchProduct,
    isGoodUnits,
    deviceBatchSuccess,
    bulkLoad
}) => {
    const classes = useStyles();
    const { dateFormat } = useSelector((state) => state.dateFormat);
    console.log('goodload---',goodUnits)

    const getDate = (d) => {
        let date = new Date(d);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let hours = date.getHours();
        let min = date.getMinutes();

        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        console.log(year + '-' + month + '-' + dt);
        return dt + '-' + month + '-' + year + " " + hours + ":" + min;
    };

    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <Grid item xs={12} style={{ display: 'flex', marginBottom: '2px' }}>
                    <Grid item xs={6}>
                        <Paper elevation={0} style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <CheckCircleOutlineIcon fontSize="small" className={classes.tickIcon} />{' '}
                            {bulkLoad ? (
                                <Typography variant="body1" className={classes.successText}>
                                    {goodUnits?.length} Units has been Loaded.
                                </Typography>
                            ) : returnUnits ? (
                                <Typography variant="body1" className={classes.successText}>
                                    {goodUnits?.length} Units has been returned.
                                </Typography>
                            ) : removeunit ? (
                                <Typography variant="body1" className={classes.successText}>
                                    Units to be removed are still in Device.
                                </Typography>
                            ) : deviceBatchSuccess ? (
                                <Typography variant="body1" className={classes.successText}>
                                    {goodUnits?.length} Units + {deviceBatchSuccess?.length} Batch Added Successfully
                                </Typography>
                            ) : (
                                <Typography variant="body1" className={classes.successText}>
                                    {goodUnits?.length} Units has been unloaded.
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={0} style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <AccessTimeIcon fontSize="small" className={classes.tickIcon} />{' '}
                            {goodUnitsHeight ? (
                                <Typography variant="body1" className={classes.successText}>
                                    Door Locks in {redirectCounter} seconds.
                                </Typography>
                            ) : (
                                <Typography variant="body1" className={classes.successText}>
                                    Redirecting to Dashboard screen in {redirectCounter} seconds.
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
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
                    <Grid
                        container
                        style={{ display: 'grid', gridTemplateColumns: goodUnits?.length === 1 ? '100%' : '33% 33% 33%' }}
                        spacing={2}
                    >
                        {goodUnits?.map((unit) => (
                            <Grid key={unit.id} item xs={1}>
                                <Card className={unit.check ? classes.cardRoot : classes.cardRootGray}>
                                    <table className="table">
                                        <tr>
                                            <td className={classes.cardHead}>Unit ID :</td>
                                            <td className={classes.cardDetail}>
                                                {unit?.refSku?.donationCode ? unit?.refSku?.donationCode : unit?.donationCode }
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className={classes.cardHead}>Product Group :</td>
                                            <td className={classes.cardDetail}>
                                                {unit?.refSku?.productgroup?.name
                                                    ? unit?.refSku?.productgroup?.name
                                                    : unit?.productgroupId?.[0]?.name}
                                            </td>
                                        </tr>
                                        {isGoodUnits && (
                                            <>
                                                <tr>
                                                    <td className={classes.cardHead}>Blood Group :</td>
                                                    <td className={classes.cardDetail}>
                                                        {unit?.refSku?.bloodgroup?.name
                                                            ? unit?.refSku?.bloodgroup?.name
                                                            : unit.bloodgroupId?.[0]?.name}
                                                    </td>
                                                </tr>
                                                {unit?.refSku?.dereservationDate ?
                                                    <tr>
                                                        <td className={classes.cardHead}>Dereservation Date:</td>
                                                        <td className={classes.cardDetail}>
                                                            {getDate(unit?.refSku?.dereservationDate) ? getDate(unit?.refSku?.dereservationDate) : '-'}
                                                        </td>
                                                    </tr> : null}
                                                <tr>
                                                    <td className={classes.cardHead}>Expiration Date:</td>
                                                    <td className={classes.cardDetail}>
                                                        {getDate(unit?.refSku?.expiryDateAndTime)}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </table>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default GoodUnits;
