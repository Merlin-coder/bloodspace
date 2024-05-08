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
import { useReceipientPageStyles } from './recepient-page.style';
import ErrorIcon from '@material-ui/icons/Error';
import DateTimePicker from '../../../components/date-time-picker/date-time-picker.container';
import CustomInput from '../../../components/inputfeild';
import CustomButton from '../../../components/button';
import CONSTANTS from '../../../common/constants';
import CheckboxComponent from '../../../components/checkbox/checkbox.container';
import moment from 'moment';
import { Alert } from 'common';
import DeviceSelection from 'components/socketDeviceSelection/socketDeviceSelection';
import { AutoComplete } from 'components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useSelector,useDispatch } from 'react-redux';
import { getApplyFilters } from 'redux/actions/filters/globalFilterAction';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';
const ReceipientPageComponent = (props) => {
    console.log('props--',props)
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
    console.log(assignable, 'assignable--');
    const classes = useReceipientPageStyles();
    const theme = useTheme();
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    const { recipientCount } = useSelector((state) => state.getRecipientCount);
    console.log('recipient--',recipientCount)
    const maxWidth1280 = useMediaQuery('(max-width:1280px)');
    const maxWidth1040 = useMediaQuery('(max-width:1280px)');
    const maxWidth600 = useMediaQuery('(max-width:600px)');
    const handleOpen = () => {
        setScanOrManualOpen(true);
        setEmergencyDialogOpen(true);
        setDisableProductCode(false);
    };
    const dispatch = useDispatch();
    const handleBrowse = (key1,value1, name) => {
       history.push({
           pathname: '/dashboard/request-unit',
            state: { selectedItem: selectedItem }
       });
             if (value1 === undefined || value1 === null ) {
            return;
        }
        dispatch(setScreeenIndex(1));
        let filtersData1;
        let chipData = [];

        filtersData1 = [
            { key: key1, value: value1 },


        ];
        let filtersData = filtersData1.filter((val) => val);
        // console.log(filtersData1, 'filtersData1 += filtersData ', filtersData);
        chipData = [name];

        let chipNameAndId = {};
        chipNameAndId[name] = value1;
        let filterKeysObjects = {};
        let newFiltersObject = {
            chipNameAndId,
            chipData,
            filtersData,
            filterKeysObjects,
            staticFilters: true
        };
        console.log(chipNameAndId, 'chipNameAndId', name, chipData);
        dispatch(getApplyFilters(newFiltersObject));
    //    history.push('/dashboard/simulation');
    }

    const [sequenceError, setSequenceError] = useState('')


    const handleBackClick = () => {
        if (history.location.pathname === '/dashboard/assign-unit') {
            history.goBack();
        } else {
            history.push('/dashboard/assign-unit');
        }
    };

    const handleSequence = (e,indexm) => {
        setSequenceNo(e.target.value)
        if (indexm > sequenceNo) {
            setSequenceError("enter valid Sequence No")
        }
       
       console.log("in----",indexm)
        console.log("sequenceNo", sequenceNo)
    }
    console.log("error---", sequenceError)
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
                                <DeviceSelection unitScan={true} />
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
                                Assigned Units
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} md={12} lg={12}>
                        <TableContainer className={classes.tableContainer}>
                            <Table>
                                <TableHead style={{ height: '50px' }}>
                                    <TableRow>
                                        {[
                                            CONSTANTS.UNIT_ID,
                                            'Blood Group',
                                            CONSTANTS.PRODUCT_CODE,
                                            'Product Description',
                                            'Expiry Date Time',
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
                                    {recipientCount?.data && recipientCount.data?.unitAssignedData?.length > 0 ? (
                                        recipientCount.data.unitAssignedData.map((item, index) => (
                                            <TableRow key={index} style={{ height: '50px' }}>
                                                {[
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.donationCode}</TableCell>,
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.bloodgroupId?.name}</TableCell>,
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.productcodeId?.isbtcode}</TableCell>,
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>{item?.productcodeId?.isbtdescription}</TableCell>,
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>
                                                        {item?.expiryDateAndTime
                                                            ? moment(item?.expiryDateAndTime).format('DD-MM-YYYY HH:mm')
                                                            : '-'
                                                        }
                                                    </TableCell>,
                                                    <TableCell style={{ textAlign: 'center', padding: '6px 24px 6px 2px' }} key={index}>
                                                        {item?.dereservationDate
                                                            ? moment(item?.dereservationDate).format('DD-MM-YYYY HH:mm')
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
                            {unitsTable?.length > 0 ? (
                                <Typography className={classes.tableResultCount} color="primary">
                                    {unitsTable?.length} {unitsTable?.length > 1 ? CONSTANTS.RESULTS : CONSTANTS.RESULT}
                                </Typography>
                            ) : null}
                        </Grid>
                        <Grid container style={{ marginBottom: '0px' }}>
                            <Typography color="primary" className={classes.smalldetailTitle}
                                style={{ fontSize: '20px', fontWeight: "bold" }}
                            >
                                Scanned Units
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
                            <Grid style={{marginLeft:'25px'} }></Grid>
                            <Grid item lg={3} xs={4}>
                                <CustomButton fullWidth variant="contained" color="primary" onClick={() => handleBrowse('deviceId._id',
                                    "622b295123481e3ee86cb4a0",
                                    'Theater Fridge'
                                )}>
                                   
                                    Browse
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
                                                            (unitId.length < 15 && check?.length === 0) ||
                                                            (unitId.includes(' ') && check?.length === 0)
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
                                                {/* <Grid>
                                                    {deviceWriteTagValidation ? <TagIdReader value={''} /> : null}
                                                </Grid> */}
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

                                      {/*  <Grid item container xs={12}>
                                            <Typography className={classes.addUnitsDialogLabels}>
                                                {CONSTANTS.DERESERVATION_DATE + ' & Time'} *
                                            </Typography>
                                            <DateTimePicker
                                                value={tableDRdate}
                                                handleDate={handleDate}
                                                disablePast={true}
                                                format="dd/MM/yyyy hh:mm"
                                                disableFuture={false}
                                                disableToolbar={false}
                                                inputVariant={'outlined'}
                                                bgColor="white"
                                                size="small"
                                                width={'100%'}
                                                error={tableDRdateError}
                                                helperTextLabel={CONSTANTS.DERESERVATION_DATE}
                                                onFocus={() => setTableDRdateError(false)}
                                            />
                                        </Grid>*/}
                                    </Grid>
                                    <Grid
                                        container
                                        alignItems="center"
                                        className={classes.margTop}
                                        item
                                        lg={12}
                                        md={12}
                                    >
                                       {/* <Grid item>
                                            <CheckboxComponent
                                                className={classes.margTop}
                                                color="primary"
                                                handleChange={(e) => handleDeresrvationDate(e)}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <Typography variant="subtitle2" className={classes.fontSize16Check}>
                                                {CONSTANTS.SAME_DERESERVATION_DATE}
                                            </Typography>
                                        </Grid>*/}
                                    </Grid>
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
                                        disabled={
                                            unitIdError || check === '' || productCode === null || settingsData?.general?.barCodeFormat === "AUSTRALIAN" ? unitId?.length < 13 : unitId?.length < 15
                                        }
                                        color="primary"
                                        onClick={openAndSave}
                                    >
                                        {CONSTANTS.NEXT}
                                    </CustomButton>
                                    <CustomButton
                                        variant="contained"
                                        disabled={
                                            unitIdError || check === '' || productCode === null || settingsData?.general?.barCodeFormat === "AUSTRALIAN" ? unitId?.length < 13 : unitId?.length < 15
                                        }
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
                        {unitsTable?.length > 0 ? (
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
                                                            checked={checkAll }
                                                           // checked={!unitsTable.some(ele => !ele.check && !ele?.assigned && ele?.unitId) }
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
                                                                        ? currentUnit?.recipientId === recipientId ? '#cafccc' :'#8091fa'
                                                                        : !currentUnit?.associated ? '#ff4d4d' : null//red
                                                        }}
                                                    key={indexm}
                                                >
                                                    <TableCell width={'1%'} className={classes.checkBoxComponent}>
                                                        <CheckboxComponent
                                                          
                                                                checked={
                                                                    successTags?.includes(currentUnit?.rfidNumber)
                                                                        ? false
                                                                        : currentUnit?.assigned ? false : !currentUnit?.associated ? false : currentUnit?.check
                                                                }
                                                                //checked={selectedRecords.includes(currentUnit.rfidNumber) && currentUnit?.associated}
                                                                disabled={
                                                                    currentUnit?.assigned || !currentUnit?.associated
                                                                        ? true : false
                                                                }
                                                                //checked={currentUnit?.assigned || !currentUnit?.unitId ?  false: currentUnit.check}
                                                                //disabled={currentUnit?.assigned || !currentUnit?.unitId ? true : false}
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
                                                                {item === 'tableDRdate' ? (

                                                                    <DateTimePicker
                                                                        size="small"
                                                                        value={currentUnit[item]}

                                                                        handleDate={(e) => handleTableDate(e, currentUnit)}
                                                                        disablePast={true}
                                                                        format="dd/MM/yyyy HH:mm"
                                                                        disableFuture={false}
                                                                        disableToolbar={false}
                                                                        // size={'small'}
                                                                        width={200}
                                                                        inputVariant={'outlined'}
                                                                        disabled={
                                                                            currentUnit?.assigned
                                                                                ? true
                                                                                : successTags?.includes(
                                                                                    currentUnit?.rfidNumber
                                                                                )
                                                                                    ? true :
                                                                                    !currentUnit?.unitId ? true
                                                                                        : null
                                                                        }
                                                                    />
                                                                ) : item === 'productCode' ? (
                                                                    currentUnit[item]
                                                                ) : item === 'expiryDateAndTime' ?
                                                                    (
                                                                        currentUnit[item] === null ? "" : moment(currentUnit[item]).format('DD-MM-YYYY HH:mm')
                                                                    ) : currentUnit[item]}
                                                              
                                                            </TableCell>
                                                        ))}
                                                        <TableCell width={'10%'}  key={indexm }>
                                                            <CustomInput
                                                                value={currentUnit.sequenceNo}
                                                                onChange={(e) => handleSequenceChange(e, indexm)}
                                                                disabled={currentUnit?.assigned || !currentUnit?.associated
                                                                    ? true : false }
                                                                //fullWidth
                                                            /><Grid style={{color : 'red'} }>
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
                                    disabled={unitsTable?.length === 0}
                                    fullWidth
                                    size="medium"
                                    onClick={handleClear}
                                    color="secondary"
                                >
                                    Clear All
                                </CustomButton>
                            </Grid>
                        <Grid item lg={2} xs={4} style={{ marginLeft: '16px' }}>
                                <CustomButton
                                    disabled={!unitsTable?.some(ele => !ele.assigned && ele.check) || devicestatus?.deviceStatus === "DISCONNECTED:1" ? true : false}
                                    variant="contained"
                                    fullWidth
                                    size="medium"
                                    onClick={assignable?.length > 0 ? () => checkCommonUnitIds() : handleAssign}
                                    color="primary"
                                >
                                    {assignable?.length > 1
                                        ? `${CONSTANTS.ASSIGN} ${assignable?.length} ${CONSTANTS.UNITS}`
                                        : CONSTANTS.ASSIGN}
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
                                {`${CONSTANTS.ARE_YOU_SURE_WANT_TO_ASSIGN} ${assignable?.length}   ${
                                    assignable?.length > 1 ? CONSTANTS.UNITS : CONSTANTS.DIALOG_UNIT_TEXT
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
                    {/*<Paper>*/}
                    {/*    <TextField label='username' placeholder='enter your name' variant='outlined'></TextField>*/}
                    {/*</Paper>*/}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReceipientPageComponent;
