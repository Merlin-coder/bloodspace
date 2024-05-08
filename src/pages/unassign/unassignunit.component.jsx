import React, { useState, useEffect, useRef } from 'react';

import {
    Button,
    Grid,
    TextField,
    useTheme,
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
    Card,
    TableHead,
    CircularProgress
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { UnassignUnitStyles } from './unassignunit.style';
import ErrorIcon from '@material-ui/icons/Error';
import DateTimePicker from '../../components/date-time-picker/date-time-picker.container';
import CustomInput from '../../components/inputfeild';
import CustomButton from '../../components/button';
import CONSTANTS from '../../common/constants';
import CheckboxComponent from '../../components/checkbox/checkbox.container';
import moment from 'moment';
import { Alert } from 'common';
import DeviceSelection from 'components/socketDeviceSelection/socketDeviceSelection';
import { AutoComplete } from 'components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useSelector } from 'react-redux';
const ReceipientPageComponent = (props) => {
    const { deviceWriteTagValidation } = useSelector((state) => state.deviceWriteTag);
    const { Lf_Hf_TagValidation } = useSelector((state) => state.lfTag);
    const history = useHistory();
    // console.log(scanStatus, bulkScanLoading, 'SOCKET_BULK_SCAN_STATUS');
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
        productCode,
        handleDeresrvationDate,
        feildNames,
        handleDate,
        tableDRdate,
        handleTableDate,
        handleSequenceChange,
        unitIdAssigned,
        setUnitIdAssigned,
        setCheckedRows,
        checkedRows,
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
        setTableDRdateError,
        onCancelDialog,
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
        handleCancleAssign,
        alert,
        setAlert,
        postUnitResponse,
        handleAlert,
        unitIdErrorText,
        setUnitIdErrorText,
        emergencyDialogOpen,
        setEmergencyDialogOpen,
        postUnitLoading,
        handleAssignedCount,
        disableCheck,
        commentRef,
        unitIdRef,
        options,
        onChangeAutoComplete,
        handleAutoCompleteChange,
        handleClickAway,
        setProductCodeError,
        productCodeError,
        productCodeOpen,
        disableProductCode,
        setDisableProductCode,
        productCodeRef,
        successTags,
        failedTags,
        isAssigned,
        assignable,
        handleTableCheck,
        assignLoading,
        unique,
        handleClear,
        handleTableCheckAll,
        selectedRecords,
        checkAll,
        recipientId,
        expiryDateAndTime,
        sequenceNo,
        setSequenceNo,
        devicestatus,
    } = props;
    // console.log(productCode, 'product code');
    const classes = UnassignUnitStyles();
    const theme = useTheme();
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    const { recipientCount } = useSelector((state) => state.getRecipientCount);
    console.log('recipient--', recipientCount)
    const maxWidth1280 = useMediaQuery('(max-width:1280px)');
    const maxWidth1040 = useMediaQuery('(max-width:1280px)');
    const maxWidth600 = useMediaQuery('(max-width:600px)');
    const handleOpen = () => {
        setScanOrManualOpen(true);
        setEmergencyDialogOpen(true);
        setDisableProductCode(false);
    };
    const [sequenceError, setSequenceError] = useState('')


    const handleBackClick = () => {
        if (history.location.pathname === '/dashboard/assign-unit') {
            history.goBack();
        } else {
            history.push('/dashboard');
        }
    };

    const handleSequence = (e, indexm) => {
        setSequenceNo(e.target.value)
        if (indexm > sequenceNo) {
            setSequenceError("enter valid Sequence No")
        }

        console.log("in----", indexm)
        console.log("sequenceNo", sequenceNo)
    }
    console.log("error---", sequenceError)
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
                            <Typography className={classes.colorIndication} color="primary">
                                <FiberManualRecordIcon style={{ color: '#ff4d4d' }} /> Not Associated
                            </Typography>
                        </Grid>

                        <Grid container item xs={5} justify="flex-end" alignItems="center">
                            <DeviceSelection unitScan={true} />
                        </Grid>
                    </Grid>

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
                                        {CONSTANTS.PLEASE_SCAN_BAR_CODE_OR_ENTER_MANUALLY}
                                    </Typography>
                                </DialogTitle>
                                <DialogContent>
                                    <Grid container item xs={12} lg={12} md={12} spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={10}>
                                                    <Typography className={classes.labelColor}>
                                                        {CONSTANTS.UNIT_ID_NUMBER} *
                                                    </Typography>
                                                    <CustomInput
                                                        error={unitIdError}
                                                        helperText={unitIdError && unitIdErrorText}
                                                        bgColor="white"
                                                        variant="outlined"
                                                        fullWidth
                                                        textTransform="uppercase"
                                                        value={unitId}
                                                        onChange={handleUnitId}
                                                        onFocus={() => {
                                                            setUnitIdError(false);
                                                        }}
                                                        onBlur={
                                                            (unitId?.length < 15 && check?.length === 0) ||
                                                                (unitId?.includes(' ') && check?.length === 0)
                                                                ? () => {
                                                                    setUnitIdError(true);
                                                                    setUnitIdErrorText(
                                                                        'Invalid Unit ID, Length Should Be Minimum 15 Charecters'
                                                                    );
                                                                }
                                                                : null
                                                        }
                                                        focus={true}
                                                        inputRef={unitIdRef}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography className={classes.labelColor}>
                                                        {CONSTANTS.LABEL_CHECK} *
                                                    </Typography>
                                                    <CustomInput
                                                        error={unitIdError}
                                                        inputRef={checkRef}
                                                        bgColor="white"
                                                        variant="outlined"
                                                        fullWidth
                                                        textTransform="uppercase"
                                                        value={check}
                                                        onChange={handleCheck}
                                                        onFocus={() => setUnitIdError(false)}
                                                        disabled={disableCheck}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item container xs={12}>
                                            <Typography className={classes.addUnitsDialogLabels}>
                                                {CONSTANTS.PRODUCT_CODE} *
                                            </Typography>

                                            <AutoComplete
                                                options={options || []}
                                                freeSolo
                                                productCodeOpen={productCodeOpen}
                                                value={productCode}
                                                description={'isbtdescription'}
                                                title={'code'}
                                                label={'enter'}
                                                onChange={(e, value) => onChangeAutoComplete(e, value)}
                                                handleAutoCompleteChange={handleAutoCompleteChange}
                                                handleClickAway={handleClickAway}
                                                onFocus={() => setProductCodeError(false)}
                                                errorText={productCodeError ?? productCodeError}
                                                autoCompleteError={productCodeError}
                                                fullWidth
                                                disabled={disableProductCode}
                                                inputRef={productCodeRef}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        container
                                        alignItems="center"
                                        className={classes.margTop}
                                        item
                                        lg={12}
                                        md={12}
                                    ></Grid>
                                    <Grid item xs={12} className={classes.commentsGrid}>
                                        <Typography className={classes.addUnitsDialogLabels}>
                                            {CONSTANTS.COMMENTS}
                                        </Typography>

                                        <CustomInput
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                            fullWidth
                                            inputRef={commentRef}
                                        />
                                    </Grid>
                                </DialogContent>
                                <DialogActions className={classes.action}>
                                    <CustomButton onClick={onCancelDialog} variant="outlined" color="primary">
                                        {CONSTANTS.CANCEL}
                                    </CustomButton>
                                    <CustomButton
                                        variant="contained"
                                        color="primary"
                                        disabled={
                                            unitIdError ||
                                                check === '' ||
                                                productCode === null ||
                                                settingsData?.general?.barCodeFormat === 'AUSTRALIAN'
                                                ? unitId?.length < 13
                                                : unitId?.length < 15
                                        }
                                        onClick={openAndSave}
                                    >
                                        {CONSTANTS.NEXT}
                                    </CustomButton>
                                    <CustomButton
                                        variant="contained"
                                        color="primary"
                                        disabled={
                                            unitIdError ||
                                                check === '' ||
                                                productCode === null ||
                                                settingsData?.general?.barCodeFormat === 'AUSTRALIAN'
                                                ? unitId?.length < 13
                                                : unitId?.length < 15
                                        }
                                        onClick={closeAndsave}
                                    >
                                        {CONSTANTS.COMPLETE}
                                    </CustomButton>
                                </DialogActions>
                            </Dialog>
                        </Grid>

                       

                    <Grid item container xs={11} md={12} lg={12}>
                        {unitsTable.length > 0 ? (
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
                                                CONSTANTS.UNIT_ID,
                                                'Blood Group',
                                                CONSTANTS.PRODUCT_CODE,
                                                'Product Description',
                                                'Expiry Date Time',
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
                                        {unitsTable
                                            ?.map((currentUnit, indexm) => (
                                                <>
                                                    <TableRow
                                                        style={{
                                                            backgroundColor: successTags?.includes(currentUnit?.rfidNumber)
                                                                ? '#cafccc'
                                                                : failedTags?.includes(currentUnit?.rfidNumber)
                                                                    ? '#faf296'
                                                                    : // : selectedItem?.['bloodgroupId']?.[0]?.name?.toLowerCase() !==}*/}
                                                                    //   currentUnit['bloodGroup']?.toLowerCase()}*/}
                                                                    // ? '#ffd4d5'   -- uncomment for bloodGroup Validation}*/}
                                                                    currentUnit?.assigned //#8091fa
                                                                        ? currentUnit?.recipientId === recipientId ? '#cafccc' : null
                                                                        : !currentUnit?.associated ? '#ff4d4d' : null
                                                        }}
                                                        key={indexm}
                                                    >
                                                        <TableCell width={'1%'} className={classes.checkBoxComponent}>
                                                            <CheckboxComponent
                                                                color="primary"
                                                                checked={ true }
                                                                handleChange={(e) =>
                                                                    handleTableCheck(e, indexm, currentUnit)
                                                                }
                                                            />
                                                        </TableCell>
                                                        {[
                                                            'unitId',
                                                            'bloodGroup',
                                                            'productCode',
                                                            'description',
                                                            'expiryDateAndTime',
                                                            'tableDRdate',
                                                            'sequenceNo',

                                                        ].map
                                                            ((item, index) => (
                                                                <TableCell
                                                                    key={index}
                                                                    style={{
                                                                        fontSize: 17,
                                                                        width: item === 'productCode' ? '9%' : null,
                                                                        padding: 1
                                                                    }}
                                                                >

                                                                    {item === 'productCode' ? (
                                                                        currentUnit[item]
                                                                    ) : item === 'expiryDateAndTime' ?
                                                                        (
                                                                            currentUnit[item] === null ? "" : moment(currentUnit[item]).format('DD-MM-YYYY HH:mm')
                                                                        ) : item === 'tableDRdate' ? (
                                                                            currentUnit[item] == null || currentUnit[item] === undefined ? '-' :
                                                                                isNaN(new Date(currentUnit[item])) ? '-' :
                                                                                    new Date(currentUnit[item]).toLocaleDateString('en-GB')
                                                                        ) : currentUnit[item]}
                                                                </TableCell>
                                                            ))}
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
                                                </>
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
                                        disabled={unitsTable.length === 0}
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
                                        disabled={unitsTable.length === 0}
                                        variant="contained"
                                        fullWidth
                                        size="medium"
                                        onClick={unitsTable.length > 0 ? () => checkCommonUnitIds() : handleAssign}
                                        color="primary"
                                    >
                                        {unitsTable.length > 1
                                            ? `${CONSTANTS.UNASSIGN} ${unitsTable.length} ${CONSTANTS.UNITS}`
                                            : CONSTANTS.UNASSIGN}
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
                                {`${CONSTANTS.ARE_YOU_SURE_WANT_TO_UNASSIGN} ${unitsTable.length}   ${unitsTable.length > 1 ? CONSTANTS.UNITS : CONSTANTS.DIALOG_UNIT_TEXT
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
                                    {assignLoading ? (
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
                        {alert && (
                            <Alert
                                open={alert}
                                message={postUnitResponse?.status === true ? postUnitResponse?.message : error}
                                duration={1500}
                                onClose={handleAlert}
                                vertical={'bottom'}
                                horizontal={'center'}
                                severity={postUnitResponse?.status === true ? 'success' : 'error'}
                                actions={false}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReceipientPageComponent;
