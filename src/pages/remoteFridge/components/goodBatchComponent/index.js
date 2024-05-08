import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './style';
import './style1.css';
const GoodBatchComponent = ({ deviceBatchSuccess, getDate, isError2, isGoodUnits }) => {
    const classes = useStyles();
    console.log('deviceBatchSuccess', deviceBatchSuccess)
    // const arrFiltered = deviceBatchSuccess.filter((obj) => !uniq[obj.batch._id] && (uniq[obj.batch._id] = true));
    return (
        <Grid item>
            {isGoodUnits ? (
                <Grid container style={{ display: 'flex', flexDirection: 'column' }} spacing={2}>
                    {deviceBatchSuccess?.map((unit) => (
                        <Grid className="cardGrid1" key={unit?._id} item xs={4}>
                            <div className={isError2 ? 'badCard1' : 'card1'}>
                                {/* <div className="card-edge-top-right"></div>
                            <div className="card-edge-bottom-right"></div> */}
                                <table className="table1">
                                    <tr>
                                        <td className="card-name1">{unit?.batch?.batchProductId?.name}</td>
                                    </tr>
                                    <tr>
                                        <td className={classes.cardHead}>GTIN # :</td>
                                        <td className={classes.cardDetail}>{unit?.batch?.gtinNumber}</td>
                                    </tr>

                                    <tr>
                                        <td className={classes.cardHead}>Batch # :</td>
                                        <td className={classes.cardDetail}>{unit?.batch?.batchNumber}</td>
                                    </tr>
                                    {/* {isGoodUnits && ( */}
                                    <>
                                        <tr>
                                            <td className={classes.cardHead}>Serial # :</td>
                                            <td className={classes.cardDetail}>{unit?.batch?.serialNumber}</td>
                                        </tr>
                                        <tr>
                                            <td className={classes.cardHead}>Expire On :</td>
                                            <td className={classes.cardDetail}>{getDate(unit?.batch?.expiryDate)}</td>
                                        </tr>
                                        <tr>
                                            <td className={classes.cardHead}>Available :</td>
                                            <td className={classes.cardDetail}>{unit?.batch?.availableCount}</td>
                                        </tr>
                                    </>
                                    {/* )} */}

                                    {/* <td className={classes.cardHeadReason}>Reason :</td> */}
                                    {/* <td className={classes.cardHeadReason}>{unit?.error}</td> */}
                                    {isError2 && (
                                        <div className={classes.errorContainer} style={{ width: '200%' }}>
                                            <Typography className={classes.errorMessage}>Reason :</Typography>
                                            <Typography className={classes.errorMessage}>{unit?.error}</Typography>
                                        </div>
                                    )}
                                </table>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid container style={{ display: 'flex', flexDirection: 'column', margiTop: '19%' }} spacing={2}>
                    {deviceBatchSuccess?.map((unit) => (
                        <Grid className="cardGrid1" key={unit?._id} item xs={4}>
                            <div className={isError2 ? 'badCard1' : 'card'}>
                                {/* <div className="card-edge-top-right"></div>
                            <div className="card-edge-bottom-right"></div> */}
                                <table className="table1">
                                    <tr>
                                        <td className="card-name1">{unit?.batch?.batchProductId?.name}</td>
                                    </tr>
                                    <tr>
                                        <td className={classes.cardHead}>GTIN # :</td>
                                        <td className={classes.cardDetail}>{unit?.batch?.gtinNumber}</td>
                                    </tr>

                                    <tr>
                                        <td className={classes.cardHead}>Batch # :</td>
                                        <td className={classes.cardDetail}>{unit?.batch?.batchNumber}</td>
                                    </tr>
                                    {/* {isGoodUnits && (
                                        <>
                                            <tr>
                                                <td className={classes.cardHead}>Serial # :</td>
                                                <td className={classes.cardDetail}>{unit?.batch?.serialNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className={classes.cardHead}>Expire On :</td>
                                                <td className={classes.cardDetail}>
                                                    {getDate(unit?.batch?.expiryDate)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={classes.cardHead}>Available :</td>
                                                <td className={classes.cardDetail}>{unit?.batch?.availableCount}</td>
                                            </tr>
                                        </>
                                    )} */}

                                    {/* <td className={classes.cardHeadReason}>Reason :</td> */}
                                    {/* <td className={classes.cardHeadReason}>{unit?.error}</td> */}
                                    {isError2 && unit?.error && (
                                        <div className={classes.errorContainer} style={{ width: '200%' }}>
                                            <Typography className={classes.errorMessage}>Reason :</Typography>
                                            <Typography className={classes.errorMessage}>{unit?.error}</Typography>
                                        </div>
                                    )}
                                </table>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    );
};

export default GoodBatchComponent;
