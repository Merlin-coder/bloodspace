import React from 'react';
import { Typography, Card, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import moment from 'moment';
import './style.css';
const useStyles = makeStyles((theme) => ({
    root: {
        width: 220,
        minHeight: 240,
        padding: 10,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    },

    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    returnMainGrid: {
        padding: 50
    },
    cardTitle: {
        fontWeight: 400,
        fontSize: 19
    },
    warningPaper: {
        backgroundColor: '#CC1414',
        padding: '20px',
        margin: '5px 0',
        width: '100%',
        height: '450px',
        borderRadius: '10px'
    },
    warningIcon: {
        color: '#CC1414'
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: '50%',
        width: 50,
        height: 50
    },
    actionGrid: {
        margin: 20
    },
    returnText: {
        color: '#4d4d4d'
    },
    returnErrorText: {
        color: '#fff',
        fontSize: 28
    },
    returnErrorNextText: {
        color: '#fff',
        fontSize: 20
    },
    counter: {
        fontSize: '65px',
        fontWeight: 500
    },
    errorCounter: {
        fontSize: '65px',
        fontWeight: 500,
        color: '#fff'
    },
    tickIcon: {
        color: '#008000'
    },
    successText: {
        // fontWeight: 500,
        color: '#6f6f6f'
    },

    cardRootError: {
        width: 372,
        padding: 15,
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        borderRadius: 10,
        borderLeft: '13px solid #CC1414',
        cursor: 'pointer',
        marginBottom: '10px'
    },
    cardRootSelected: {
        width: 372,
        padding: 15,
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        borderRadius: 10,
        borderLeft: '13px solid #0e6cad',
        cursor: 'pointer',
        marginBottom: '10px'
    },
    cardRoot: {
        width: 372,
        padding: 15,
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        borderRadius: 10,
        borderLeft: '13px solid #b5b5b5',
        cursor: 'pointer',
        marginBottom: '10px'
    },
    cardHead: {
        color: '#b5b5b5'
    },
    cardDetail: {
        color: '#6f6f6f'
    },
    errorSmallPaper: {
        padding: 20,
        width: 410,
        maxHeight: 410,
        height: 445,
        borderRadius: 10,
        overflowY: 'auto'
    },
    cardWarningText: {
        color: '#CC1414',
        fontWeight: 'bold',
        padding: 10
    },
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 204, 204,0.4)',
        padding: 8,
        borderRadius: 10,
        border: '1px solid #CC1414'
    },
    // errorIcon: {
    //     color: '#b33939',
    //     fontSize: 'small'
    // },
    errorMessage: {
        color: '#b33939',
        fontWeight: 500,
        fontSize: '14px'
    },
    lockContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10
    }
}));

const RemoveCard = ({ unit, isError, handleExpandClick }) => {
    const classes = useStyles();
    const { dateFormat } = useSelector((state) => state.dateFormat);

    return (
        <>
            <Card
                className={
                    isError ? classes.cardRootError : unit?.isSelected ? classes.cardRootSelected : classes.cardRoot
                }
                onClick={() => handleExpandClick(unit)}
            >
                <div style={{ minHeight: 0, height: 'auto' }}>
                    <table style={{ width: '100%' }}>
                        <tr>
                            <td className={classes.cardHead}>Unit ID# :</td>
                            <td className={classes.cardDetail}>{unit?.donationCode}</td>
                        </tr>
                        <tr>
                            <td className={classes.cardHead}>Product Group :</td>
                            <td className={classes.cardDetail}>{unit?.productgroupId?.[0]?.name}</td>
                        </tr>
                        <tr>
                            <td className={classes.cardHead}>Blood Group :</td>
                            <td className={classes.cardDetail}>{unit?.bloodgroupId?.[0]?.name}</td>
                        </tr>
                        <tr>
                            <td className={classes.cardHead}>Product Code :</td>
                            <td className={classes.cardDetail}>{unit?.productcodeId?.[0]?.isbtcode}</td>
                        </tr>

                        <tr>
                            <td className={classes.cardHead}>Expiration Date :</td>
                            <td className={classes.cardDetail}>{moment(unit?.expiryDateAndTime).format(dateFormat)}</td>
                        </tr>
                        <tr>
                            <td className={classes.cardHead}>Dereservation Date :</td>
                            <td className={classes.cardDetail}>{moment(unit?.dereservationDate).format(dateFormat)}</td>
                        </tr>
                    </table>
                </div>

                {isError && (
                    <div className={classes.errorContainer}>
                        <Typography className={classes.errorMessage}>Error reason :</Typography>
                        <Typography className={classes.errorMessage}>
                            Something went wrong. Something went wrong. Something went wrong.
                        </Typography>
                    </div>
                )}
            </Card>
        </>
    );
};

export default RemoveCard;
