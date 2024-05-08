import React, { useState } from 'react';
import {
    Button,
    Grid,
    Card,
    useTheme,
    TextField,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    IconButton,
    useMediaQuery,
    Tooltip,
    TableHead,
    CircularProgress
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import { UnassignBatchStyles } from './unassignbatch.style';
//import { unitTable } from './../assign/DummyData';
import ErrorIcon from '@material-ui/icons/Error';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DateTimePicker from '../../components/date-time-picker/date-time-picker.container';
import CustomInput from '../../components/inputfeild';
import CustomButton from '../../components/button';
import CONSTANTS from '../../common/constants';
import CheckboxComponent from '../../components/checkbox/checkbox.container';
import deviceGroupType from '../../JSON/JDeviceGroup.json';
import SelectOption from 'components/select';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, DatePicker } from 'common';
import TagIdReader from 'components/TagIdReader';
import DeviceSelection from 'components/socketDeviceSelection/socketDeviceSelection';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import { createAlert } from 'redux/actions';
import AddAutoComplete from 'pages/associate-batch/autoComplete';

const ReceipientPageComponent = (props) => {
    const { deviceWriteTagValidation } = useSelector((state) => state.deviceWriteTag);
    const { recipientCount } = useSelector((state) => state.getRecipientCount);
    console.log('recipient--', recipientCount)
    const theme = useTheme();
    //Props
    const {
        feilds,
        handleAssign,
        setDialogOpen,
        dialogOpen,
        handleBack,
        handleDelete,
        selectedItem,
        unitId,
        expiryDate,
        productCode,
        handleDeresrvationDate,
        feildNames,
        handleDate,
        tableDRdate,
        setTableDRdate,
        handleTableDate,
        unitIdAssigned,
        setUnitIdAssigned,
        commonUnitId,
        handleOpen,
        unitsTable,
        checkCommonUnitIds,
        scanOrManualOpen,
        setScanOrManualOpen,
        closeAndsave,
        openAndSave,
        setUnitIdError,
        rfidNumberRef,
        unitIdError,
        tableDRdateError,
        setTableDRdateError,
        onCancelDialog,
        check,
        handleBatchInput,
        checkRef,
        handleUnitId,
        handleCheck,
        id,
        deviceGroup,
        handleChangeSelect,
        loading,
        comments,
        setComments,
        error,
        handleCancleAssign,
        alert,
        setAlert,
        postUnitResponse,

        unitIdErrorText,
        setUnitIdErrorText,
        emergencyDialogOpen,
        setEmergencyDialogOpen,
        postUnitLoading,
        handleAssignedCount,
        disableCheck,
        commentRef,
        unitIdRef,
        recursiveUpdate,
        setRecursiveUpdate,
        currentInputFeild,
        setCurrentInputFeild,
        barcodeNumber,
        setBarcodeNumber,
        gtinNumberRef,
        gtinTable,
        count,
        setCount,
        handleDeleteCount,
        handleAddCount,
        expiryDateRef,
        tableDRdateRef,
        gtinError,
        batchError,
        seriesError,
        batchNumberRef,
        serialNumberRef,
        countRef,
        availableCount,
        setCheckedRows,
        checkedRows,
        enableNext,
        setEnableNext,
        setFormData,
        formData,
        onFormChange,
        options,
        disabled,
        countError,
        countErrorText,
        untiIdLoading,
        handleTableCheck,
        handleTableCheckAll,
        checkAll,
        recipientId,
        open,
        setOpen,
        handleClose,
        handleClear,
        sequenceNo,
        setSequenceNo,
        handleSequenceChange,
        gtinNumber,
        batchNumber,
        setGtinNumber,
        setBatchNumber,
        setExpiryDate,
        batchProductId,
        batchIdLoading,
        setBatchProductId,
        devicestatus
    } = props;

    let checkNum = checkedRows?.filter((d) => d !== 'All');
    const classes = UnassignBatchStyles();

    const dispatch = useDispatch();
    const maxWidth1280 = useMediaQuery('(max-width:1280px)');
    const maxWidth1040 = useMediaQuery('(max-width:1280px)');
    const maxWidth600 = useMediaQuery('(max-width:600px)');

    const { dateFormat } = useSelector((state) => state.dateFormat);

    const handleInRecursiveWay = (e, barCodeObject) => {
        if (e?.startsWith('01') && e.length >= 1) {
            barCodeObject['rfidNumber'] = e.substring(2, 16);

            let tempE = e.substr(16);
            if (tempE.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        } else if (e?.startsWith('01') && e.length >= 16) {
            barCodeObject['gtinNumber'] = e.substring(2, 16);

            let tempE = e.substr(16);
            if (tempE.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        } else if (e?.startsWith('21') && e.length >= 14) {
            barCodeObject['serialNumber'] = e.substring(2, 14);
            let tempE = e.substring(14);
            if (tempE.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        } else if (e?.startsWith('17') && e.length >= 8) {
            let julianDate = moment(new Date(`${e.substring(4, 6)}-${e.substring(6, 8)}-${e.substring(2, 4)}`)).format(
                'YYYY-MM-DD'
            );
            // let julianDate = moment(new Date('05-11-18')).format('YY/MM/DD');
            barCodeObject['expiryDate'] = julianDate;
            let tempE = e.substring(8);
            if (tempE.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        } else if (e?.startsWith('10') && e.length >= 12) {
            barCodeObject['batchNumber'] = e.substring(2, 12);
            let tempE = e.substring(12);
            if (tempE.length > 7) {
                handleInRecursiveWay(tempE, barCodeObject);
            } else {
                setRecursiveUpdate(barCodeObject);
                return barCodeObject;
            }
        }
    };

    //const handleBatchInput = async (e, field) => {
    //    let filterKey = [{ key: 'rfidNumber', value: e }];
    //    if (field !== currentInputFeild) {

    //        setCurrentInputFeild(field);
    //    }

    //    if (field === 'rfidNumber' && e.length <= 20) {
    //        dispatch(getBatchSearch('assignBatches', JSON.stringify(filterKey)));
    //        setRecursiveUpdate((prev) => ({
    //            ...prev, [field]: e

    //        }));
    //    }
    //    console.log(`${field}:`, e);
    //};


    const handleSequence = (e) => {
        setSequenceNo(e.target.value)
        console.log("sequenceNo", sequenceNo)
    }


    return (
        <Grid item container className={classes.resultGrid}>

            <Grid container item xs={12} md={12} lg={12}></Grid>
            <Grid container item className={classes.tableGrid}>
                <Grid container item xs={12} lg={12} md={12} className={classes.minHeight}>
                    <Grid container item xs={12}>

                        <Grid container item xs={7} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Typography className={classes.colorIndication} color="primary">
                                <FiberManualRecordIcon style={{ color: '#faf296' }} /> Write Failed
                            </Typography>
                            <Typography className={classes.colorIndication} color="primary">
                                <FiberManualRecordIcon style={{ color: '#cafccc' }} /> Assigned
                            </Typography>
                            {/*<Typography className={classes.colorIndication} color="primary">*/}
                            {/*    <FiberManualRecordIcon style={{ color: '#8091fa' }} /> Assigned To Others*/}
                            {/*</Typography>*/}
                            <Typography className={classes.colorIndication} color="primary">
                                <FiberManualRecordIcon style={{ color: '#ff4d4d' }} /> Not Associated
                            </Typography>
                        </Grid>

                        <Grid container item xs={5} justify="flex-end" alignItems="center">
                            <DeviceSelection unitScan={true} />
                        </Grid>
                    </Grid>

                    <Grid container item>
                        <Grid container item xs={7} style={{ display: 'flex', justifyContent: 'space-evenly' }}></Grid>
                    <Grid item xs={5} className={classes.addUnitsButton}>
                        <Grid item lg={3} xs={4}>
                            <CustomButton fullWidth variant="contained" color="primary" onClick={handleOpen}>
                                {CONSTANTS.ADD}
                            </CustomButton>
                        </Grid>
                        <Dialog
                            open={id === 'emergency' ? emergencyDialogOpen : scanOrManualOpen}
                            maxWidth="sm"
                            PaperProps={{
                                style: {
                                    borderRadius: 10,
                                    padding: 20
                                }
                            }}
                        >
                            <DialogTitle>
                                <Typography color="primary" component="span" variant="h5">
                                    {'Please scan Batch ID Barcode(s)'}
                                </Typography>
                            </DialogTitle>
                            <DialogContent>
                                <Grid container item xs={12} lg={12} md={12} spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1} alignItems="center">
                                                <Grid item xs={12}>
                                                    <Typography className={classes.labelColor}>
                                                        {'Rfid Number'} *
                                                    </Typography>
                                                    <CustomInput
                                                        fullWidth
                                                        error={unitIdError}
                                                        helperText={unitIdError && unitIdErrorText}
                                                        value={currentInputFeild === 'rfidNumber' ? recursiveUpdate.rfidNumber || '' : barcodeNumber || ''}
                                                        onChange={(e) => handleBatchInput(e.target.value, 'rfidNumber')}
                                                        focus={true}
                                                        size="lg"
                                                        inputRef={rfidNumberRef}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography className={classes.labelColor}>
                                                        {'Gtin Number'} *
                                                    </Typography>
                                                    <CustomInput
                                                        fullWidth
                                                        value={gtinNumber}
                                                        onChange={(e) => setGtinNumber(e.target.value)}
                                                        size="lg"
                                                        inputRef={gtinNumberRef}
                                                        disabled={true}
                                                    />
                                                </Grid>
                                        </Grid>
                                    </Grid>

                                        <Grid item container xs={12}>
                                            <Typography className={classes.addUnitsDialogLabels}>
                                                {'Batch Number'} *
                                            </Typography>
                                            <CustomInput
                                                fullWidth
                                                value={batchNumber}
                                                onChange={(e) => setBatchNumber(e.target.value)}
                                                inputRef={batchNumberRef}
                                                disabled={true}
                                            />
                                        </Grid>

                                        <Grid item container xs={12}>
                                            <Typography className={classes.addUnitsDialogLabels}>
                                                {'Expiry Date'} *
                                            </Typography>
                                            <DatePicker
                                                inputVariant={'outlined'}
                                                onChange={(e) => setExpiryDate(e.target.value)}
                                                value={expiryDate}
                                                format="yyyy/MM/dd"
                                                placeholder={batchIdLoading ? 'loading...' : ' '}
                                                width="100%"
                                                padding={'5px'}
                                                size="small"
                                                inputRef={expiryDateRef ?? null}
                                                refuse={'/^(?:&>)(?:[0-9]{10})/gi'}
                                                disablePast={true}
                                                disabled={true}
                                            />
                                        </Grid>

                                        <Grid item container xs={12}>
                                            <Typography className={classes.addUnitsDialogLabels}>
                                                {'Batch Product'} *
                                            </Typography>
                                            <CustomInput
                                                options={options?.data || []}
                                                onChange={(e) => setBatchProductId(e.target.value)}
                                                value={batchProductId}
                                                name="batchProduct"
                                                id="id"
                                                formData={formData}
                                                setFormData={setFormData}
                                                noLabel
                                                fullWidth
                                                currentPlaceHolder="Batch Product Description"
                                                batchProduct={true}
                                                disabled={true}
                                            />
                                        </Grid>

                                        <Grid item container xs={12}>
                                            <Typography className={classes.addUnitsDialogLabels}>
                                                {CONSTANTS.DERESERVATION_DATE + ' & Time'} *
                                            </Typography>
                                            <DateTimePicker
                                                inputVariant={'outlined'}
                                                onChange={(e) => setTableDRdate(e.target.value)}
                                                value={tableDRdate}
                                                format="yyyy/MM/dd"
                                                placeholder={batchIdLoading ? 'loading...' : ' '}
                                                width="100%"
                                                padding={'5px'}
                                                size="small"
                                                inputRef={tableDRdateRef ?? null}
                                                refuse={'/^(?:&>)(?:[0-9]{10})/gi'}
                                                disablePast={true}
                                                disabled={true}
                                            />
                                        </Grid>

                                </Grid>
                                </DialogContent>
                                <DialogActions className={classes.action}>
                                    <CustomButton onClick={onCancelDialog} variant="outlined" color="primary">
                                        {CONSTANTS.CANCEL}
                                    </CustomButton>
                                    <CustomButton
                                        variant="contained"
                                        //disabled={!enableNext}
                                        color="primary"
                                        onClick={closeAndsave}
                                    >
                                        {CONSTANTS.COMPLETE}
                                    </CustomButton>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>



                    <Grid item container xs={11} md={12} lg={12}>
                        {gtinTable?.length > 0 ? (
                            <TableContainer className={classes.tableContainer}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            {[
                                                <>
                                                    <TableCell>
                                                        <CheckboxComponent
                                                            label
                                                            handleChange={handleTableCheckAll}
                                                            checked={checkAll}
                                                        />
                                                    </TableCell>
                                                </>,
                                                'Rfid Number',
                                                'Gtin Number',
                                                'Batch Number',
                                                'Description',
                                                'Expiry Date',
                                                CONSTANTS.DERESERVATION_DATE,
                                                'Usage Order',
                                                CONSTANTS.ACTIONS
                                            ].map((item, index) => (
                                                <TableCell key={index} className={classes.tableHeadCell}>
                                                    {item === '#' ? '' : item}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {gtinTable?.map((currentUnit, indexm) => (
                                            <TableRow
                                                style={{
                                                    backgroundColor:
                                                        currentUnit?.assigned
                                                            ? currentUnit?.recipientId === recipientId ? '#cafccc' : null
                                                            : !currentUnit?.associated ? '#ff4d4d' : null

                                                }}
                                                key={indexm}>
                                                <TableCell width={'1%'}>
                                                    <CheckboxComponent
                                                        color="primary"
                                                        checked={true}
                                                        handleChange={(e) =>
                                                            handleTableCheck(e, indexm, currentUnit)
                                                        }
                                                    />
                                                </TableCell>
                                                {[
                                                    'rfidNumber',
                                                    'gtinNumber',
                                                    'batchNumber',
                                                    'description',
                                                    'expiryDate',
                                                    'tableDRdate',
                                                    'sequenceNo',

                                                ].map((item, index) => (
                                                    <>
                                                        <TableCell
                                                            key={index}
                                                            style={{
                                                                fontSize: 17,
                                                                width: item === 'productCode' ? '9%' : null,
                                                                padding: 0
                                                            }}
                                                        >
                                                            {item === 'expiryDate' ? (
                                                                currentUnit[item] === null ? (
                                                                    ''
                                                                ) : (
                                                                    moment(currentUnit[item]).format('DD-MM-YYYY')
                                                                )
                                                            ) : item === 'tableDRdate' ? (
                                                                currentUnit[item] === null || isNaN(new Date(currentUnit[item])) ? '-' :
                                                                        new Date(currentUnit[item]).toLocaleDateString('en-GB')
                                                            ) : currentUnit[item]}
                                                        </TableCell>
                                                    </>

                                                ))}
                                                {/*<TableCell width={'10%'} key={indexm}>*/}
                                                {/*    <CustomInput*/}
                                                {/*        fullWidth*/}
                                                {/*        value={currentUnit.sequenceNo}*/}
                                                {/*        onChange={(e) => handleSequenceChange(e, indexm)}*/}
                                                {/*        size="lg"*/}
                                                {/*        disabled={currentUnit?.assigned || !currentUnit?.associated*/}
                                                {/*            ? true : false}*/}
                                                {/*    />*/}
                                                {/*    <Grid style={{ color: 'red' }}>*/}
                                                {/*        {currentUnit?.sequenceError === true ? "Already exists" : ""}*/}
                                                {/*    </Grid>*/}
                                                {/*</TableCell>*/}
                                                <TableCell>
                                                    <Grid className={classes.actions}>
                                                        <IconButton
                                                            className={classes.deleteIcon}
                                                            onClick={() => handleDelete(indexm)}
                                                        >
                                                            <DeleteIcon className={classes.delectIconColor} />
                                                        </IconButton>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : null}
                    </Grid>
                </Grid>
                <Grid container item xs={12} lg={12} md={12}>
                    <Grid item container className={classes.assignAndBackBtns}>
                        <Grid item lg={2} xs={4}>
                                    <CustomButton
                                        variant="contained"
                                        disabled={gtinTable.length === 0}
                                        fullWidth
                                        size="medium"
                                        onClick={handleClear}
                                        color="secondary"
                                    >
                                        ClearAll
                                    </CustomButton>
                            </Grid>

                          <Grid item lg={2} xs={4}style={{ marginLeft: '16px' }}>
                                    <CustomButton
                                        disabled={gtinTable.length === 0}
                                        variant="contained"
                                        fullWidth
                                        size="medium"
                                        onClick={gtinTable.length > 0 ? () => checkCommonUnitIds() : handleAssign}
                                        color="primary"
                                    >
                                        {gtinTable.filter(element => element.check === true).length > 1
                                            ? `${CONSTANTS.UNASSIGN} ${gtinTable.filter(element => element.check === true).length} Batches`
                                            :
                                            `${CONSTANTS.UNASSIGN}`
                                        }
                                    </CustomButton>
                                </Grid>

                        <Dialog
                            open={dialogOpen}
                            className={classes.dialogZindex}
                            PaperProps={{
                                style: {
                                    padding: 30,
                                    paddingBottom: 10,
                                    width: 450,
                                    borderRadius: 10
                                }
                            }}
                        >
                            <DialogContent className={classes.asignConfirmation}>
                                {`${CONSTANTS.ARE_YOU_SURE_WANT_TO_UNASSIGN} ${gtinTable.length}   ${gtinTable.length > 1 ? 'Batches' : 'Batch'
                                    }?`}
                            </DialogContent>
                            <DialogActions className={classes.dialogActions}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.dialogButton}
                                    onClick={handleCancleAssign}
                                >
                                    {CONSTANTS.CANCEL}
                                </Button>
                                <Button
                                    variant="contained"
                                    className={classes.dialogButton}
                                    color="primary"
                                    onClick={handleAssign}
                                    disabled={error}
                                >
                                    {postUnitLoading ? (
                                        <>
                                            {CONSTANTS.UNASSIGN}
                                            <CircularProgress color="white" size="20px" />{' '}
                                        </>
                                    ) : (
                                        CONSTANTS.UNASSIGN
                                    )}
                                </Button>
                            </DialogActions>
                            {error && (
                                <div className={classes.errorContainer}>
                                    <ErrorIcon className={classes.assignError} />
                                    <Typography variant="body2" className={classes.errorMessage}>
                                        {error}
                                    </Typography>
                                </div>
                            )}
                        </Dialog>
                        <Dialog
                            open={unitIdAssigned}
                            className={classes.dialogZindex}
                            PaperProps={{
                                style: {
                                    paddingTop: 0,
                                    padding: 20,
                                    paddingBottom: 10,
                                    width: 550,
                                    borderRadius: 10,
                                    textAlign: 'center'
                                }
                            }}
                        >
                            <DialogContent className={classes.unitNotAvailable}>
                                <Grid className={classes.unitsNotAvailableTitle}>
                                    <ErrorIcon className={classes.errorIcon} />
                                </Grid>
                                {CONSTANTS.UNIT_NOT_AVAILABLE}
                            </DialogContent>
                            <DialogContent className={classes.fontSize16}>
                                <span>{CONSTANTS.UNIT} </span>
                                <span className={classes.assignedUnitColor}>{commonUnitId} </span>
                                <span> {CONSTANTS.HAS_ALREADY_ASSIGNED}</span>
                            </DialogContent>
                            <DialogActions className={classes.dialogActions}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.dialogButton}
                                    onClick={() => setUnitIdAssigned(false)}
                                >
                                    {CONSTANTS.UNDERSTOOD}
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReceipientPageComponent;
