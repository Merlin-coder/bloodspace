import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';

// or
import { DialogTitle, Divider, Grid, Link, makeStyles, Typography, TableContainer, Table, TableBody, TableCell, TableRow,TableHead } from '@material-ui/core';
import { CONSTANTS, CustomButton } from 'common';
import ErrorIcon from '@material-ui/icons/Error';
import warningIcon from '../../assets/warningIcon.svg';
import tipIcon from '../../assets/tip-icon.svg';
//import { CustomButtonStyles } from '../button/style';
import { useHistory } from 'react-router-dom';
import {
    getData,

} from '../../redux/actions';
import { getApplyFilters } from 'redux/actions/filters/globalFilterAction';
import { useDispatch, useSelector } from 'react-redux';
const WarningDialog = ({
    dialogOpen,
    handleDialog,
    handleDialogClose,
    children,
    title,
    deleteLabel,
    error,
    titleColor,
    socketMessage
}) => {
    //const classes = CustomButtonStyles();
    const dispatch = useDispatch();
    const useStyles = makeStyles((theme) => ({
        typographyRed: {
            fontWeight: 400,
            textAlign: 'center',
            color: theme.palette.colors.red
        },
        typographyGray: {
            fontWeight: 400,
            textAlign: 'center',
            color: '#000',
            marginTop: 15
        },
        errorContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 204, 204,0.4)',
            marginLeft: 30,
            padding: 5,
            borderRadius: 5,
            width: 500
        },
        errorIcon: {
            color: '#b33939',
            fontSize: 'small'
        },
        errorMessage: {
            color: '#b33939',
            marginLeft: 10,
            fontWeight: 500
        }
    }));
    const classes = useStyles();
    const history = useHistory();

    const handleMoreInfo = (key,value,name,screen) => {
        console.log('value onclick---------', value);
        console.log('name--------', name);
        console.log('key----', key);
        if (value === undefined || value === null) {
            return;
        }
        //dispatch(setScreeenIndex(1));
        let filtersData1;
        let chipData = [];
        let refineValue;
        if (value.isArray) {
            refineValue = [...value];
        } else {
            refineValue = value;
        }

        filtersData1 = [{ key: key, value: refineValue }, ];
        let filtersData = filtersData1.filter((val) => val);
        chipData = [name];

        let chipNameAndId = {};
        chipNameAndId[name] = value;
        let filterKeysObjects = {};

        let newFiltersObject = {
            chipNameAndId,
            chipData,
            filtersData,
            filterKeysObjects,
            staticFilters: true,
            screen
        };

        console.log('chipData', chipData);
        dispatch(getApplyFilters(newFiltersObject));
        history.push('/dashboard/reports/notifications');
        dispatch(getData())
     
    }



    let warning = socketMessage?.alerts?.find((data) => data?.alertData.gtinNumber);
    console.log('warning',warning)
    const handleUnitId = () => {
        handleDialog();
        history.push('/dashboard/request-unit');
    }

    let notifyAlerts = socketMessage?.alerts?.map((ary)=> ary?.alertData?._id)
    console.log('notifyalerts',notifyAlerts)
    return (
        <>{console.log("alerts---", socketMessage) }
            {socketMessage?.alerts?.length > 0 && socketMessage?.alerts !== undefined &&
            socketMessage?.alerts ?
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
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
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                    >
                        <img src={warningIcon} alt="warning" style={{ marginTop: -50 }} />
                        <Typography variant="h5" className={classes.typographyGray}>
                            {title}
                        </Typography>
                    </div>
                </Grid>

                <DialogContent>
                    {console.log("socket---", socketMessage?.alerts)}

                    <Grid style={{ marginTop: 10 }}>
                        <>
                          

                                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                                            
                                                <Grid className={classes.content}>
                                                    <Grid>
                                                        <TableContainer className={classes.tableContainer}>
                                                <Table size="small">
                                                    <TableHead >
                                                        <TableCell>{warning?.alertData?.gtinNumber || warning?.alertData?.gtinNumber=== null ? 'GTIN Number': 'Unit Id'}</TableCell>
                                                        <TableCell>{warning?.alertData?.batchProduct ? 'Batch Product' : 'Product Group'}</TableCell>
                                                                    <TableCell>Device</TableCell>
                                                                    <TableCell>Reason</TableCell>

                                                    </TableHead>
                                                                <TableBody>
                                                                
                                                                {socketMessage?.alerts?.map((data, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell
                                                                            style={{ cursor: 'pointer' }}
                                                                            onClick={() => { handleUnitId() }}
                                                                        > {data?.alertData?.unitId ? data?.alertData?.unitId : data?.alertData?.gtinNumber ? data?.alertData?.gtinNumber : '-'}</TableCell>
                                                                        <TableCell> {data?.alertData?.productGroup ? data?.alertData?.productGroup : data?.alertData?.batchProduct ? data?.alertData?.batchProduct : '-'}</TableCell>
                                                                        <TableCell> {data?.alertData?.deviceName}</TableCell>
                                                                        <TableCell> {data?.alertData?.reason}</TableCell>

                                                                    </TableRow>
                                                                     
                                                                ))}

                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                  
                                                </Grid>
                                          

                                        </div>
                                       {/* {socketMessage?.alerts?.length > 1 && (
                                            <Divider variant="middle" style={{ margin: 20 }} />
                                        )}*/}
                                    </>
                              
                            <Link
                                component="button"
                                variant="caption"
                                underline="none"
                                onClick={() => { handleMoreInfo('_id', notifyAlerts,'Notification'); handleDialog() }}
                                //onClose={handleDialog}
                                style={{ alignSelf: 'flex-start', marginTop: 5, color: '#d0d0d0' }}
                            >
                                View Notification
                            </Link>
                        
                    </Grid>
                </DialogContent>
                <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                    <Grid style={{ margin: 5 }}>
                        <CustomButton variant="outlined" color="primary" onClick={handleDialog}>
                            Understood
                        </CustomButton>
                    </Grid>
                </Grid>
            </Dialog> : null}
        </>
    );
};
 
export default WarningDialog;
