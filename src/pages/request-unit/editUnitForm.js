import { Grid, InputLabel, useMediaQuery } from '@material-ui/core';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './editUnitStyle.js';
import DateTimePicker from '../../components/date-time-picker/date-time-picker.container';
//import EventIcon from '@material-ui/icons/Event';
import CONSTANTS from './../../common/constants';
import { CustomButton } from 'common';
import { AutoComplete } from 'components';
import CustomInput from 'components/inputfeild/index.js';
import Autocomplete from '../../components/autoComplete/index';
import { useSelector } from 'react-redux';

//import { createFilterOptions } from '@material-ui/lab/Autocomplete'
const EditUnit = (props) => {
    const maxWidth959 = useMediaQuery('(max-width:1280px)');
    const maxWidth800 = useMediaQuery('(max-width:800px)');
    const {
        unitId,
        handleUnitId,
        userRoleData,
        checkValue,
        handleCheck,
        //  CheckUnitIdCheck,
        setBloodGroupOpen,
        bloodGroupOpen,
        handleClickAway,
        bloodGroup,
        productCode,
        handleAutoCompleteChange,
        setProductCodeOpen,
        productCodeOpen,
        handleExpiryDateChange,
        collectionDate,
        handleCollectionDateChange,
        expiryDate,

        testingValue,
        bloodGroupValue,
        handleTestingChange,

        setDimensions,
        dimension,
        isPreEncoded,
        specialTestingHelperText,
        unitIdHelperText,
        checkChar,
        setBloodGroupValue,
        specialTestingRef,
        donationUdRef,
        checkRef,
        blooGroupRef,
        phenytypeRef,
        specialCheck,
        specialCheckRef,
        phenotype,
        handleSpecialCheck,
        unitIdblur,
        testingValueblur,
        productCodeValue,
        setProductCodeValue,
        productCodeRef,
        marg,
        handleAssociateUnit,
        onChangeAutoComplete,
        associateButtonAccess,
        associateDevice,
        tagId,
        handleTagId,
        disableCheck,
        tagIdRef,
        expiryDateRef,
        collectionDateRef,
        dimensionsRef,
        genericValues,
        locationddValue,
        deviceddValue,
        hostialddValue,
        customAutoComplete,
        userRole,
        response,
        rowData
    } = props;
    console.log('hostialddValue', hostialddValue)
    console.log('locationddValue', locationddValue)
    console.log('ro----', rowData?.isEditable)
    console.log('genericValues', genericValues)
    const classes = useStyles();
    const { options4 } = useSelector((state) => state.get4thDropdown);
    const { options5 } = useSelector((state) => state.get5thDropdown);
    const { options6 } = useSelector((state) => state.get6thDropdown);
    const [manualDate, setManualDate] = React.useState('');
    const customDateCheck = (e) => {
        setManualDate(e);
    };
    
    console.log(" userRole ", userRole);
    console.log(" User Role ", userRoleData?.data[0]?.useraccessroleId[0]?.name)
    console.log("setUnitIdHelperText", unitIdHelperText)
    console.log("setSpecialtestHelperText", specialTestingHelperText)

    return (
        <Grid item xs={12}>
            <Grid container alignItems="center" spacing={3} direction={maxWidth800 && 'column'}>
                <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                    <Grid container spacing={2}>
                        <Grid item xs={10} className={classes.inputField}>
                            <InputLabel className={classes.inputLabel}>{CONSTANTS.UNIT_ID}</InputLabel>
                            <CustomInput
                                value={genericValues['donationCode']}
                                onChange={(e) =>
                                    handleUnitId ? handleUnitId(e?.target?.value, undefined, 'donationCode') : null
                                }
                                size="lg"
                                fullWidth
                                helperText={unitIdHelperText}
                                error={unitIdHelperText !== undefined && unitIdHelperText.length > 0 ? true : false}
                                focus={true}
                                inputRef={donationUdRef ? donationUdRef : null}
                                onBlur={unitIdblur}
                                disabled={rowData.isEditable === true ? false :true }
                            />
                        </Grid>

                        <Grid item className={classes.inputRow} xs={2}>
                            <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_CHECK}</InputLabel>
                            <CustomInput
                               // value={genericValues['checkChar']}
                               // onChange={(e) => handleUnitId(e?.target?.value, undefined, 'checkChar')}
                                // onEnterPress={checkChar ? checkChar : null}
                                size="lg"
                                 fullWidth
                                 inputRef={checkRef}
                                //disabled={disableCheck}
                                disabled={rowData.isEditable === true ? false : true}
                                value={genericValues['check']}
                                onChange={(e) =>
                                    handleUnitId ? handleUnitId(e?.target?.value, undefined, 'check') : null
                                }
                               //onChange={handleCheck ? handleCheck : null}
                               onEnterPress={checkChar ? checkChar : null}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_BLOODGROUP}</InputLabel>

                    <AutoComplete
                        id="product"
                        options={bloodGroup || []}
                        label={'enter'}
                        // autoCOmpleteOpen={bloodGroupOpen}
                        
                        value={bloodGroupValue}
                        onChange={(e, value) => onChangeAutoComplete(e, value, 'bloodGroup')}
                        handleAutoCompleteChange={(e) =>
                            e && e.target && e.target.value && e?.target?.value?.match(/[&}=><%]/g)
                                ? handleUnitId(e?.target?.value, undefined, 'bloodGroup')
                                : handleAutoCompleteChange(e?.target?.value, 'bloodGroup')
                        }
                        handleClickAway={handleClickAway}
                        fullWidth
                        title={'code'}
                        description={'name'}
                        disabled={rowData.isEditable === true ? false : true}
                    />
                </Grid>
                <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_TAGID}</InputLabel>
                    <CustomInput
                        id="tagId"
                        value={genericValues['rfidNumber']}
                        className={classes.lg}
                        fullWidth
                        //disabled={true}
                        disabled={rowData.isEditable === true ? false : true}
                    />
                </Grid>
            </Grid>
            <Grid container justify="space-between" spacing={3}>
                <Grid item xs={12} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_PRODUCTCODE}</InputLabel>

                    <AutoComplete
                        id="product"
                        options={productCode || []}
                        // autoCOmpleteOpen={productCodeOpen}
                        value={productCodeValue}
                        onChange={(e, value) => onChangeAutoComplete(e, value, 'productCode')}
                        handleAutoCompleteChange={(e) =>
                            e && e.target && e.target.value && e?.target?.value?.match(/[&}=><%]/g)
                                ? handleUnitId(e?.target?.value, undefined, 'productCode')
                                : handleAutoCompleteChange(e?.target?.value, 'productCode')
                        }
                        //handleClickAway={handleClickAway}
                        fullWidth
                        title={'isbtcode'}
                        description={'isbtdescription'}
                        disabled={rowData.isEditable === true ? false : true}
                    />
                </Grid>
            </Grid>
            <Grid container direction={maxWidth800 ? 'column' : 'row'} spacing={3}>
                <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_EXPIRYDATE}</InputLabel>
                    <DateTimePicker
                        width="100%"
                        inputVariant={'outlined'}
                        size="small"
                        format="dd-MMM-yyyy HH:mm"
                        value={genericValues['expiryDateAndTime'] ? genericValues['expiryDateAndTime'] : null}
                        handleDate={(e, x) => handleUnitId(e, x, 'expiryDateAndTime')}
                        inputRef={expiryDateRef}
                        julianDate={true}
                        padding={'5px'}
                        //disabled={!userRoleData?.data && userRoleData?.data[0]?.useraccessroleId?.some((val) => val.name === 'Super Admin')}
                        ///disabled={userRoleData?.data[0]?.useraccessroleId[0]?.name === 'Super Admin' ? false : true}
                        disabled={rowData.isEditable === true ? false : true}
                    />
                </Grid>
                <Grid item xs={maxWidth800 ? 12 : 8}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} className={classes.inputField}>
                            <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_SPECIALTESTING}</InputLabel>
                            <CustomInput
                                value={genericValues['testnumber']}
                                onChange={(e) =>
                                    handleUnitId ? handleUnitId(e?.target?.value, undefined, 'testnumber') : null
                                }
                                size="lg"
                                fullWidth
                                helperText={specialTestingHelperText}
                                error={specialTestingHelperText!==undefined && specialTestingHelperText.length>0 ? true : false}
                                focus={testingValue ? true : false}
                                inputRef={specialTestingRef}
                                onBlur={testingValueblur}
                                disabled={rowData.isEditable === true ? false : true}
                            />
                        </Grid>
                        <Grid item xs={1} className={classes.inputField}>
                            <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_CHECK}</InputLabel>
                            <CustomInput
                                size="lg"
                               // value={genericValues['specialCheckChar']}
                               //onChange={(e) => handleUnitId(e?.target?.value, undefined, 'specialCheckChar')}
                                onChange={handleSpecialCheck }
                                //fullWidth
                                inputRef={specialCheckRef}
                                
                                value={specialCheck}
                                //onChange={(e) => handleSpecialCheck(e?.target?.value, undefined, 'specialCheckChar')}
                                //onChange={handleSpecialCheck}
                                fullWidth
                                disabled={rowData.isEditable === true ? false : true}
                            />
                        </Grid>
                        <Grid item xs={7} className={classes.inputField}>
                            <InputLabel className={classes.inputLabel}>Phenotype</InputLabel>
                            <CustomInput
                                size="lg"
                                //inputRef={phenytypeRef}
                                //value={genericValues['phenotypeResult']}
                                inputRef={phenytypeRef}
                                value={phenotype}
                                //onChange={(e) => handleUnitId(e?.target?.value, undefined, 'phenotypeResult')}
                                fullWidth
                                disabled={rowData.isEditable === true ? false : true}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="flex-end" className={classes.test}>
                <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_COLLECTIONDATE} </InputLabel>
                    <DateTimePicker
                        width="100%"
                        inputVariant={'outlined'}
                        size="small"
                        format="dd/MM/yyyy hh:mm:ss"
                        value={genericValues['collectionDateAndTime'] ? genericValues['collectionDateAndTime'] : null}
                        handleDate={(e, x) => handleUnitId(e, x, 'collectionDateAndTime')}
                        inputRef={collectionDateRef}
                        // refuse={'/^(?:&>)(?:[0-9]{10})/gi'}
                        // mask={'____________________'}
                        padding={'5px'}
                        disableFuture={true} 
                        disabled={rowData.isEditable === true ? false : true}
                    />
                </Grid>
                <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_DIMENSION}</InputLabel>
                    <CustomInput
                        size="lg"
                        value={genericValues['dimensions']}
                        onChange={(e) => handleUnitId(e?.target?.value, undefined, 'dimensions')}
                        fullWidth
                        inputRef={dimensionsRef}
                        disabled={rowData.isEditable === true ? false : true}
                    />
                </Grid>
                <Grid item xs />
            </Grid>
            {rowData.isAssigned === 1 ? 
            <Grid container direction={maxWidth800 ? 'column' : 'row'} spacing={3}>
                <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                        <InputLabel className={classes.inputLabel}>Recipient name *</InputLabel>
                    <CustomInput
                            fullWidth
                            size="lg"
                            value={genericValues['recipientName']}
                            onChange={(e) => handleUnitId(e?.target?.value, undefined, 'recipientName')}
                            
                            //disabled={!userRole.some((val) => val.name === 'Super Admin' || val.name === 'Admin Access')}
                            //disabled={!userRoleData?.data && userRoleData?.data[0]?.useraccessroleId?.some((val) => val.name === 'Super Admin')}
                            disabled={rowData.isEditable === true ? false : true}
                    />
                </Grid>
                    <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                   
                        <InputLabel className={classes.inputLabel}>MRN Number *</InputLabel>
                            <CustomInput
                            value={genericValues['mrnNumber']}
                            size="lg"
                            fullWidth
                            onChange={(e) => handleUnitId(e?.target?.value, undefined, 'mrnNumber')}
                            disabled={rowData.isEditable === true ? false : true}
                            //disabled= {! userRoleData?.data && userRoleData?.data[0]?.useraccessroleId?.some((val) => val.name === 'Super Admin')}
                            />
                      
                </Grid>
                <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                        <InputLabel className={classes.inputLabel}>Deservation Date</InputLabel>
                    <DateTimePicker
                            width="100%"
                            inputVariant={'outlined'}
                            size="small"
                            format="dd/MM/yyyy hh:mm:ss"
                            value={genericValues['dereservationDate']}
                            handleDate={(e, x) => handleUnitId(e, x, 'dereservationDate')}
                            //inputRef={expiryDateRef}
                            julianDate={true}
                            padding={'5px'}
                            // disabled={userRoleData?.data[0]?.useraccessroleId[0]?.name === 'Super Admin' ? false :true}
                            disabled={rowData.isEditable === true ? false : true}
                    />
                </Grid>
                </Grid>:null}
            <Grid
                container
                direction={maxWidth800 ? 'column' : 'row'}
                spacing={maxWidth800 ? 5 : 3}
                alignItems="flex-end"
                className={classes.test}
            >
                <Grid item xs={4} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>Select Hospital *</InputLabel>
                    <Autocomplete
                        id="branch"
                        options={options6?.data || []}
                        value={hostialddValue}
                        onChange={(e, value) => customAutoComplete(e, value, 'hostialddValue')}
                        handleClickAway={handleClickAway}
                        fullWidth
                        name="name"
                        disabled={rowData.isEditable === true ? false : true}
                    />
                </Grid>
                <Grid item xs={4} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>Select Location *</InputLabel>
                    <Autocomplete
                        id="location"
                        options={options4?.data || []}
                        value={locationddValue  }
                        onChange={(e, value) => customAutoComplete(e, value, 'locationddValue')}
                        handleClickAway={handleClickAway}
                        fullWidth
                        name="name"
                        disabled={rowData.isEditable === true ? false :true }
                        //disabled={!options4?.data?.length > 0}
                    />
                </Grid>
                <Grid item xs={4} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>Select Device</InputLabel>

                    <Autocomplete
                        id="device"
                        options={options5?.data || []}
                        value={hostialddValue && deviceddValue}
                        onChange={(e, value) => customAutoComplete(e, value, 'deviceddValue')}
                        handleClickAway={handleClickAway}
                        fullWidth
                        name="name"
                       // disabled={!options5?.data?.length > 0}
                        disabled={rowData.isEditable === true ? false : true}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EditUnit;
