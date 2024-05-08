import React from 'react';
import { useStyles } from './style';
import { Typography, Card, Collapse } from '@material-ui/core';
import { useSelector } from 'react-redux';

import moment from 'moment';
const ExpandableCard = ({ unit, isError, handleExpandClick, isError2, disabled, batch }) => {
    const classes = useStyles();
    const { dateFormat } = useSelector((state) => state.dateFormat);
    console.log('batch---',batch)
    console.log('unit---', unit)
    return (
        <>
            <Card
                className={isError ? classes.cardRootError : isError2 ? classes.cardRootError2 : classes.cardRoot}
                onClick={!disabled && handleExpandClick && unit ? () => handleExpandClick(unit) : !disabled && handleExpandClick && batch ? ()=> handleExpandClick(batch) :null }
            >
                <div style={{ minHeight: 0, height: 'auto' }}>
                    <table style={{ width: '100%' }}>
                        {/* <tr>
                            <td className={classes.cardHead}>Unit ID# :</td>
                            <td className={classes.cardDetail}>
                                {unit?.refSku !== undefined ? unit?.refSku.donationCode : unit?.donationCode}
                            </td>
                        </tr> */}
                        <tr>
                            <td className={classes.cardHead}>{batch ? 'Gtin Number : ' : 'Unit ID : '}</td>
                            <td className={classes.cardDetail}>
                                {batch
                                    ? batch?.gtinNumber
                                    : unit?.refSku !== undefined
                                    ? unit?.refSku?.donationCode
                                    : unit?.donationCode}
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.cardHead}>{batch ? 'Batch Product : ' : 'Product Group : '}</td>
                            <td className={classes.cardDetail}>
                                {batch
                                    ? batch?.batchProductId?.name
                                    : unit?.refSku !== undefined
                                    ? unit?.refSku?.productgroup?.name
                                    : unit?.productgroupId?.name}
                            </td>
                        </tr>
                        {/* <tr>
                            {isError2 && (
                                <div className={classes.errorContainer} style={{ width: '100%' }}>
                                    <Typography className={classes.errorMessage}>Reason :</Typography>
                                    <Typography className={classes.errorMessage}>{unit?.error}</Typography>
                                </div>
                            )}
                        </tr> */}
                    </table>
                </div>
                {unit ? (
                    <Collapse in={unit?.isExpanded} timeout="auto" unmountOnExit>
                       
                            <div style={{ minHeight: 0, height: 'auto' }}>
                                <table style={{ width: '90%' }}>
                                    <tr>
                                        <td className={classes.cardHead}>Blood Group :</td>
                                        <td className={classes.cardDetail}>{unit?.refSku?.bloodgroup?.name || unit?.bloodgroupId?.name}</td>
                                    </tr>
                                    <tr>
                                        <td className={classes.cardHead}>Product Code :</td>
                                        <td className={classes.cardDetail}>{unit?.refSku?.productcode?.code || unit?.productcodeId?.code}</td>
                                    </tr>

                                    <tr>
                                        <td className={classes.cardHead}>Expiration Date :</td>
                                        <td className={classes.cardDetail}>
                                            {moment(unit?.refSku?.expiryDateAndTime).format(dateFormat)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.cardHead}>Dereservation Date :</td>
                                    <td className={classes.cardDetail}>{unit?.refSku?.dereservationDate ? moment(unit?.refSku?.dereservationDate).format(dateFormat) : '-'}</td>
                                    </tr>
                                </table>
                            </div>
                    
                        {isError && (
                            <div className={classes.errorContainer}>
                                <Typography className={classes.errorMessage}>Error reason :</Typography>
                                <Typography className={classes.errorMessage}>{unit?.error}</Typography>
                            </div>
                        )}
                    </Collapse>) : batch ? (
                        <Collapse in={batch?.isExpanded} timeout="auto" unmountOnExit>
                                <div style={{ minHeight: 0, height: 'auto' }}>
                                    <table style={{ width: '70%' }}>
                                    <tr>
                                        <td className={classes.cardHead}>Batch Number :</td>
                                        <td className={classes.cardDetail}>{batch?.batchNumber || null}</td>
                                    </tr>
                                        <tr>
                                            <td className={classes.cardHead}>Expiration Date :</td>
                                            <td className={classes.cardDetail}>
                                                {moment(batch?.expiryDate).format(dateFormat)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={classes.cardHead}>Dereservation Date :</td>
                                        <td className={classes.cardDetail}>{batch?.dereservationDateAndTime ? moment(batch?.dereservationDateAndTime).format(dateFormat) :  '-'}</td>
                                        </tr>
                                    </table>
                                </div>
                           
                            {isError && (
                                <div className={classes.errorContainer}>
                                    <Typography className={classes.errorMessage}>Error reason :</Typography>
                                    <Typography className={classes.errorMessage}>{unit?.error}</Typography>
                                </div>
                            )}
                        </Collapse>) : null}
            </Card>
        </>
    );
};

export default ExpandableCard;
