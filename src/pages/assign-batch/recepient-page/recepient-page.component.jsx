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
import { useHistory } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import { useReceipientPageStyles } from './recepient-page.style';
import { unitTable } from './../../assign/DummyData';
import ErrorIcon from '@material-ui/icons/Error';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DateTimePicker from '../../../components/date-time-picker/date-time-picker.container';
import CustomInput from '../../../components/inputfeild';
import CustomButton from '../../../components/button';
import CONSTANTS from '../../../common/constants';
import CheckboxComponent from '../../../components/checkbox/checkbox.container';
import deviceGroupType from '../../../JSON/JDeviceGroup.json';
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
    const history = useHistory();
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
        unitsTable,
        checkCommonUnitIds,
        scanOrManualOpen,
        setScanOrManualOpen,
        closeAndsave,
        openAndSave,
        setUnitIdError,
        unitIdError,
        tableDRdateError,
        handleBatchInput,
        setTableDRdateError,
        onCancelDialog,
        handleInRecursiveWay,
        check,
        //  setCheck,
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
        batchIdLoading,
        handleCancleAssign,
        alert,
        setAlert,
        postUnitResponse,
        gtinNumber,
        setGtinNumber,
        batchNumber,
        setBatchNumber,
        setExpiryDate,
        batchProductId,
        setBatchProductId,
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
        rfidNumberRef,
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
        handleOpen,
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
        devicestatus
    } = props;
    
    let checkNum = checkedRows?.filter((d) => d !== 'All');
    const classes = useReceipientPageStyles();

    const dispatch = useDispatch();

    const maxWidth1280 = useMediaQuery('(max-width:1280px)');
    const maxWidth1040 = useMediaQuery('(max-width:1280px)');
    const maxWidth600 = useMediaQuery('(max-width:600px)');


    const { dateFormat } = useSelector((state) => state.dateFormat);
  

    const handleSequence = (e) => {
        setSequenceNo(e.target.value)
        console.log("sequenceNo",sequenceNo)
    }

    const handleBackClick = () => {
       
        history.push('/dashboard/assign-unit');
        
    };
  /*  const handleSelectRows = (e, all) => {
        let tempCheckedRows;
        if (all === 'all') {
            if (e) {
                tempCheckedRows = gtinTable.map((i) => i?.rfidNumber);
                setCheckedRows([...tempCheckedRows, 'All']);
            } else {
                setCheckedRows([]);
            }
        } else {
            if (e) {
                tempCheckedRows = [...checkedRows, all];
                let allRows = gtinTable?.every((i) => tempCheckedRows.includes(i?.rfidNumber));
                if (allRows) {
                    tempCheckedRows.push('All');
                }
            } else {
                tempCheckedRows = checkedRows.filter((i) => i !== all && i !== 'All');
            }
            setCheckedRows(tempCheckedRows);
        }
    };*/

   


    return (
        <Grid item container className={classes.resultGrid}>
            {id == 'emergency' ? (
                <>
                    <Grid container className={classes.infoGrid}>
                        <Grid container className={classes.emergrency}>
                            <Grid item /*xs={4}*/>
                                <Typography variant="h5" color="error">
                                    {CONSTANTS.EMERGENCY_ASSIGN}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <Grid container item xs={12} className={classes.infoGrid}>
                    {loading ? (
                        <Grid
                            item
                            xs={12}
                            container
                            className={classes.leftInfo}
                            style={{ marginLeft: maxWidth1280 ? 42 : null, marginBottom: maxWidth1280 ? 1 : null }}
                        >
                            {'loading....'}
                        </Grid>
                    ) : (
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    className={classes.leftInfo}
                                    style={{ marginLeft: maxWidth1280 ? 42 : null, marginBottom: maxWidth1280 ? 1 : null }}
                                >
                                    <Grid item xs={1} className={classes.backButton}>
                                        <CustomButton variant="outlined" onClick={handleBackClick}>
                                            Back
                                        </CustomButton>
                                    </Grid>
                                    <Grid item xs={7} container>
                                        {feilds?.length > 0 &&
                                            feilds.map((field, index) => (
                                                <Grid key={index} item xs={3} md={3} container spacing={2}>
                                                    { console.log('selectedItem?.[field]', selectedItem)} 
                                                    <Grid item xs={12} md={12} className={classes.infoLabels}>
                                                        <Typography className={classes.labelColor}>
                                                            {feildNames[field] + ':'}
                                                        </Typography>
                                                        <Typography
                                                            className={classes.feildNames}
                                                            style={{
                                                                textTransform: field === 'name' ? 'capitalize' : null
                                                            }}
                                                            color="primary"
                                                        >
                                                            {field === 'dob' ? (
                                                                moment(selectedItem?.[field]).format('DD-MM-YYYY')
                                                            ) : field === 'bloodgroupId' ? (
                                                                selectedItem?.[field]?.[0]?.name
                                                            ) : field === 'assignedCountUnit' ? (
                                                                <span
                                                                    onClick={
                                                                        selectedItem?.[field]
                                                                            ? handleAssignedCount
                                                                            : null
                                                                    }
                                                                    style={{
                                                                        cursor: selectedItem?.[field] ? 'pointer' : null
                                                                    }}
                                                                >
                                                                    {recipientCount?.data && recipientCount.data?.unitAssignedData?.length}
                                                                </span>
                                                            ) : selectedItem?.[field] ? (
                                                                selectedItem?.[field]
                                                            ) : (
                                                                '-'
                                                            )}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                    </Grid>

                                    <Grid
                                        item
                                        xs={4}
                                        style={{
                                            paddingRight: 25,
                                            marginTop: 30,
                                            display: 'flex',
                                            flexDirection: 'row-reverse'
                                        }}
                                    >
                                        <DeviceSelection unitScan={false} associateBatch={true } />
                                    </Grid>
                                </Grid>
                    )}
                </Grid>
            )}






            <Grid container item xs={12} md={12} lg={12}></Grid>
            <Grid container item className={classes.tableGrid}>
                <Grid container item xs={12} lg={12} md={12} className={classes.minHeight}>
                    <Grid container item>
                        <Grid container style={{ marginBottom: '0px' }}>
                            <Typography color="primary" className={classes.smalldetailTitle}
                                style={{ fontSize: '20px', fontWeight: "bold" }}
                            >
                                Assigned Batch
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} md={12} lg={12}>
                        <TableContainer className={classes.tableContainer}>
                            <Table>
                                <TableHead style={{ height: '50px' }}>
                                    <TableRow>
                                        {[
                                            'Gtin Number',
                                            'Batch Number',
                                            'Description',
                                            'Expiry Date',
                                            CONSTANTS.DERESERVATION_DATE,
                                            'Usage Order'
                                        ].map((item, index) => (
                                            <TableCell key={index} className={classes.tableHeadCel} style={{ fontSize: '14px' }}>
                                                {item === '#' ? '' : item}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>


                                <TableBody>
                                    {recipientCount?.data && recipientCount.data?.batchAssignedData?.length > 0 ? (
                                        recipientCount.data.batchAssignedData.map((item, index) => (
                                            <TableRow key={index} style={{ height: '50px' }}>
                                                {[
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.gtinNumber}</TableCell>,
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.batchNumber}</TableCell>,
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.batchProductId?.name}</TableCell>,
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>
                                                        {item?.expiryDate
                                                            ? moment(item?.expiryDate).format('DD-MM-YYYY HH:mm')
                                                            : '-'
                                                        }
                                                    </TableCell>,
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>
                                                        {item?.dereservationDateAndTime
                                                            ? moment(item?.dereservationDateAndTime).format('DD-MM-YYYY HH:mm')
                                                            : '-'
                                                        }
                                                    </TableCell>,
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.sequenceNo}</TableCell>
                                                ]}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={10} style={{ textAlign: 'center' }}>
                                                <Typography color="primary" textAlign="center" className={classes.resolution}>
                                                    No data available
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                                {console.log("Recipient Count Data:", recipientCount?.data)}
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>

          


            <Grid container item xs={12} md={12} lg={12}></Grid>
            <Grid container item className={classes.tableGrid}>
                <Grid container item xs={12} lg={12} md={12} className={classes.minHeight}>
                    <Grid container item>
                        <Grid container item xs={1}>
                            {gtinTable?.length > 0 ? (
                                <Typography className={classes.tableResultCount} color="primary">
                                    {gtinTable?.length} {gtinTable?.length > 1 ? CONSTANTS.RESULTS : CONSTANTS.RESULT}
                                </Typography>
                            ) : null}
                        </Grid>

                        <Grid container style={{ marginBottom: '0px' }}>
                            <Typography color="primary" className={classes.smalldetailTitle}
                                style={{ fontSize: '20px', fontWeight: "bold" }}
                            >
                                Scanned Batch
                            </Typography>
                        </Grid>
                        <Grid container item xs={7} style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                            <Typography className={classes.colorIndication} color="primary">
                                <FiberManualRecordIcon style={{ color: '#faf296' }} /> Write Failed
                            </Typography>
                            <Typography className={classes.colorIndication} color="primary">
                                <FiberManualRecordIcon style={{ color: '#cafccc' }} /> Assigned
                            </Typography>
                            <Typography className={classes.colorIndication} color="primary">
                                <FiberManualRecordIcon style={{ color: '#8091fa' }} /> Assigned To Others
                            </Typography>
                            <Typography className={classes.colorIndication} color="primary">
                                <FiberManualRecordIcon style={{ color: '#ff4d4d' }} /> Not Associated
                            </Typography>
                        </Grid>

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
                                                {CONSTANTS.DERESERVATION_DATE + ' & Time'}
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
                                                inputRef={tableDRdateRef ?? tableDRdate}
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
                                                            ? currentUnit?.recipientId === recipientId ? '#cafccc' : '#8091fa'
                                                            : !currentUnit?.associated ? '#ff4d4d' : null
                                                               
                                                }}
                                                key={indexm}>
                                                <TableCell width={'1%'}>
                                                    <CheckboxComponent
                                                        color="primary"
                                                        checked={currentUnit?.assigned ? false : !currentUnit?.associated ? false : currentUnit?.check}
                                                        //checked={selectedRecords.includes(currentUnit.rfidNumber) && currentUnit?.associated}
                                                        disabled={
                                                            currentUnit?.assigned || !currentUnit?.associated
                                                                ? true : false
                                                        }
                                                        handleChange={(e) =>
                                                            handleTableCheck(e, indexm, currentUnit)
                                                        }
                                                    />
                                                </TableCell>
                                                {[
                                                    'gtinNumber',
                                                    'batchNumber',
                                                    'description',     
                                                    'expiryDate',
                                                    'tableDRdate',
                                                   
                                                ].map((item, index) => (
                                                    <>
                                                    <TableCell
                                                        key={index}
                                                        style={{
                
                                                            fontSize: 17,
                                                            width: item === 'productCode' ? '9%' : null,
                                                            padding: 0,
                                                           
                                                        }}
                                                    >
                                                            {item === 'tableDRdate' ? (
                                                                <DateTimePicker
                                                                    value={currentUnit[item]}
                                                                    // value={!currentUnit?.associated ? currentUnit[item] : tableDRdate}
                                                                    // value={tableDRdate}
                                                                    handleDate={(e) => handleTableDate(e, indexm)}
                                                                    disablePast={false}
                                                                    format="dd/MM/yyyy hh:mm"
                                                                    disableFuture={false}
                                                                    disableToolbar={false}
                                                                    size='small'
                                                                    width={200}
                                                                    inputVariant={'outlined'}
                                                                    disabled={currentUnit?.assigned || !currentUnit?.associated
                                                                        ? true : false}
                                                                />
                                                            ) : item === 'productCode' ? (
                                                                    currentUnit[item]
                                                                ) : item === 'expiryDate' ? (
                                                                        currentUnit[item] === null ? '' :
                                                                            moment(currentUnit[item]).format('DD-MM-YYYY')
                                                                    ) : currentUnit[item]}
                                                    </TableCell>
                                                   
                                                    </>
                                                    
                                                ))}
                                                <TableCell width={'10%'} key={indexm}>
                                                    <CustomInput
                                                        fullWidth
                                                        value={currentUnit.sequenceNo}
                                                        onChange={(e) => handleSequenceChange(e, indexm)}
                                                        size="lg"
                                                        disabled={currentUnit?.assigned || !currentUnit?.associated
                                                            ? true : false }
                                                    />
                                                    <Grid style={{ color: 'red' }}>
                                                        {currentUnit?.sequenceError === true ? "Already exists" : ""}
                                                    </Grid>
                                                </TableCell>
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
                                    fullWidth
                                    disabled={gtinTable.length === 0}
                                    onClick={handleClear}
                                    size="medium"
                                    variant="contained"
                                    color="secondary"
                                >
                                     Clear All
                                </CustomButton>
                            </Grid>

                              <Grid item lg={2} xs={4} style={{ marginLeft: '16px' }}>
                                <CustomButton
                                    disabled={!gtinTable.some(ele => !ele.assigned && ele.check) || devicestatus?.deviceStatus === "DISCONNECTED:1" ? true : false}
                                    variant="contained"
                                    fullWidth
                                    size="medium"
                                    onClick={gtinTable.length > 0 ? () => checkCommonUnitIds() : handleAssign}
                                    color="primary"
                                >
                                    {gtinTable.filter(element => element.check === true).length > 1
                                        ? `${CONSTANTS.ASSIGN} ${gtinTable.filter(element => element.check===true).length} Batches`
                                        :
                                        `${CONSTANTS.ASSIGN}`
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
                                {`${CONSTANTS.ARE_YOU_SURE_WANT_TO_ASSIGN} ${gtinTable.filter(element => element.check === true).length}   ${
                                    gtinTable.filter(element => element.check === true).length > 1 ? 'Batches' : 'Batch'
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
                                            {CONSTANTS.ASSIGN}
                                            <CircularProgress color="white" size="20px" />{' '}
                                        </>
                                    ) : (
                                        CONSTANTS.ASSIGN
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

                        {/*<Dialog*/}
                        {/*    maxWidth="lg"*/}
                        {/*    PaperProps={{*/}
                        {/*        style: {*/}
                        {/*            borderRadius: '10px',*/}
                        {/*            backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,*/}
                        {/*            padding: 20,*/}
                        {/*            width: '500px'*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*    open={open}*/}
                        {/*    onClose={handleClose}*/}
                        {/*>*/}
                        {/*    <DialogTitle>Edit Hours and Minutes</DialogTitle>*/}
                        {/*    <DialogContent>*/}
                        {/*        <Typography variant="body2" className={classes.errorMessage}>*/}
                        {/*           Unit is expired soon*/}
                        {/*        </Typography>*/}
                        {/*        <Grid item lg={3} xs={4} style={{ paddingRight: '5px' }} >*/}
                        {/*                <CustomButton fullWidth variant="contained" color="primary" onClick={handleClose} >*/}
                        {/*                    Cancel*/}
                        {/*                </CustomButton>*/}

                        {/*            </Grid>*/}
                               
                        {/*    </DialogContent>*/}
                        {/*</Dialog>*/}

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReceipientPageComponent;
