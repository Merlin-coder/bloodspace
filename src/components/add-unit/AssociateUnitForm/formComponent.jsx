import { Grid, IconButton, Button, InputLabel, Tooltip, Typography, useMediaQuery, TextField } from '@material-ui/core';
import CustomInput from '../../inputfeild';
import React, { useRef } from 'react';
import Autocomplete from '../../autoComplete';
import { useStyles } from './styles.js';
import DateTimePicker from '../../date-time-picker/date-time-picker.container';
import CONSTANTS from '../../../common/constants';
import { CustomButton, Checkbox } from 'common';
import Loader from 'components/loader/loader.container';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import TagIdReader from 'components/TagIdReader';
import CheckboxComponent from 'components/checkbox/checkbox.component';
import { socketDeviceStatus } from 'redux/actions/socketAction';
const FormComponent = (props) => {
    const maxWidth959 = useMediaQuery('(max-width:1280px)');
    const maxWidth800 = useMediaQuery('(max-width:800px)');
    const unitTextRef = useRef();
    const {
        handleUnitId,
        checkValue,
        associateLoading,
        handleCheck,
        bloodGroup,
        productCode,
        handleAutoCompleteChange,
        testingValue,
        bloodGroupValue,
        isPreEncoded,
        specialTestingHelperText,
        unitIdHelperText,
        checkChar,
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
        productCodeRef,
        marg,
        handleAssociateUnit,
        handlePreEncodedAssociateUnit,
        onChangeAutoComplete,
        associateButtonAccess,
        associateDevice,
        disableCheck,
        tagIdRef,
        expiryDateRef,
        collectionDateRef,
        dimensionsRef,
        genericValues,
        locationddValue,
        deviceddValue,
        hostialddValue,
        options6,
        options4,
        options5,
        oneTimeScan,
        tagIdLoading,
        branchRef,
        disableAssociateBtn,
        bloodGroupErrortxt,
        productCodeErrortxt,
        bloodGroupOpen,
        productCodeOpen,
        collectionDateErrorTxt,
        expiryDateErrorTxt,
        handleClearAllinputs,
        clearForms,
        setClearForm,
        setAlert,
        setSeverity,
        setAlertMessage,
        devicestatus,
        handleManualAssociateUnit,
        handleChange,
        checked
    } = props;
    console.log('devic----', devicestatus?.deviceStatus);
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    const { status } = useSelector((state) => state.getSocketDeviceConnection);
    const { lfDeviceStatus } = useSelector((state) => state.getLFConnectionStatus);
    const { Lf_Hf_TagValidation } = useSelector((state) => state.lfTag);
    let { settingsData } = useSelector((state) => state.settingsLocalDataStore);

    React.useEffect(() => {
        donationUdRef.current && count === 0 && donationUdRef.current.focus();
        setCount(count + 1);
    }, [bloodGroupValue, testingValue, productCodeValue]);
    const { deviceWriteTagValidation } = useSelector((state) => state.deviceWriteTag);
    //console.log(genericValues['collectionDate'],"genericValues['collectionDate']",genericValues['expiryDate']);
    const focusUnit = () => {
        if (donationUdRef?.current) {
            donationUdRef?.current?.focus();
        } else {
            unitTextRef?.current?.focus();
        }
    };
   
    console.log('checked--', checked)
    return (
        <>
            <Grid item xs={(isPreEncoded && 12) || maxWidth959 ? 12 : 9} style={{ marginTop: marg && '-15px' }}>
                {productCode?.length > 0 || isPreEncoded ? (
                    <>
                        <Grid
                            container
                            alignItems="center"
                            spacing={maxWidth800 ? 5 : 7}
                            direction={maxWidth800 ? 'column' : 'row'}
                        >
                            <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                                <Grid container spacing={2}>
                                    <Grid item xs={10}>
                                        <InputLabel className={classes.inputLabel}>{CONSTANTS.UNIT_ID}</InputLabel>

                                        <CustomInput
                                            value={genericValues['unitId']}
                                            onChange={(e) =>
                                                handleUnitId
                                                    ? handleUnitId(e?.target?.value, undefined, 'unitId')
                                                    : null
                                            }
                                            size="lg"
                                            fullWidth
                                            helperText={unitIdHelperText}
                                            error={unitIdHelperText ? true : false}
                                            focus={true}
                                            inputRef={donationUdRef ? donationUdRef : unitTextRef}
                                            onBlur={unitIdblur}
                                            disabled={isPreEncoded}
                                        />
                                    </Grid>

                                    <Grid item className={classes.inputRow} xs={2}>
                                        <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_CHECK}</InputLabel>
                                        <CustomInput
                                            value={checkValue}
                                            onChange={handleCheck ? handleCheck : null}
                                            onEnterPress={checkChar ? checkChar : null}
                                            size="lg"
                                            fullWidth
                                            inputRef={checkRef}
                                            disabled={disableCheck || isPreEncoded}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                                <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_BLOODGROUP}</InputLabel>

                                {isPreEncoded ? (
                                    <CustomInput
                                        id="blood"
                                        value={
                                            bloodGroupValue
                                                ? `${bloodGroupValue?.name} | ${bloodGroupValue?.isbtcode}`
                                                : ''
                                        }
                                        className={classes.lg}
                                        fullWidth
                                        disabled={isPreEncoded}
                                    />
                                ) : (
                                    <Autocomplete
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
                                        fullWidth
                                        title={'code'}
                                        inputRef={blooGroupRef}
                                        description={'name'}
                                        errorText={bloodGroupErrortxt}
                                        autoCompleteError={bloodGroupErrortxt ? true : false}
                                    />
                                )}
                            </Grid>
                            <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                                <Grid container justify="center" alignItems="center">
                                    <Grid
                                        item
                                        xs={
                                            isPreEncoded ||
                                            (Array.isArray(Lf_Hf_TagValidation) &&
                                                Lf_Hf_TagValidation?.includes('manual'))
                                                ? 12
                                                : 9
                                        }
                                    >
                                        {/*  <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_TAGID}</InputLabel>
                                         */}
                                        {/*   <CustomInput
                                            id="tagId"
                                            value={genericValues['tagId']}
                                            onChange={(e) => handleUnitId(e?.target?.value, undefined, 'tagId')}
                                            className={classes.lg}
                                            fullWidth
                                            inputRef={tagIdRef}
                                           
                                            disabled={true}
                                        />*/}
                                    </Grid>
                                    {/*{!isPreEncoded &&(*/}

                                    {/*        <TagIdReader*/}
                                    {/*        setAlert={setAlert}*/}
                                    {/*        setSeverity={setSeverity}*/}
                                    {/*        setAlertMessage={setAlertMessage}*/}
                                    {/*        value={genericValues['tagId']}*/}
                                    {/*        focusUnit={focusUnit }*/}
                                    {/*        />*/}

                                    {/*    )}*/}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="space-between" spacing={7}>
                            <Grid item xs={12}>
                                <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_PRODUCTCODE}</InputLabel>
                                {isPreEncoded ? (
                                    <CustomInput
                                        id="blood"
                                        value={
                                            productCodeValue?.isbtcode
                                                ? `${productCodeValue?.isbtcode} | ${productCodeValue.ausdescription}`
                                                : ''
                                        }
                                        className={classes.lg}
                                        fullWidth
                                        disabled={isPreEncoded}
                                    />
                                ) : (
                                    <Autocomplete
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
                                        fullWidth
                                        title={'isbtcode'}
                                        description={'isbtdescription'}
                                        inputRef={productCodeRef}
                                        errorText={productCodeErrortxt}
                                        autoCompleteError={productCodeErrortxt ? true : false}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <Grid container direction={maxWidth800 ? 'column' : 'row'} spacing={maxWidth800 ? 5 : 7}>
                            <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                                <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_EXPIRYDATE}</InputLabel>
                                <DateTimePicker
                                    width="100%"
                                    inputVariant={'outlined'}
                                    size="small"
                                    format="dd/MM/yyyy hh:mm:ss a"
                                    //format={'dd/MM/yyyy'}
                                    value={genericValues['expiryDate'] ? genericValues['expiryDate'] : null}
                                    handleDate={(e, x) => handleUnitId(e, x, 'expiryDate')}
                                    inputRef={expiryDateRef}
                                    julianDate={true}
                                    refuse={'/^(?:&>)(?:[0-9]{10})/gi'}
                                    //inputFormat="DD/MM/YYYY hh:mm:ss"
                                    mask={'____________________'}
                                    //ampm={false}
                                    //disableMaskedInput={false}
                                    //ampmInClock={false}
                                    padding={'5px'}
                                    disabled={isPreEncoded}
                                    disablePast={true}
                                    error={expiryDateErrorTxt ? true : false}
                                    helperTextLabel={expiryDateErrorTxt}
                                />
                            </Grid>
                            <Grid item xs={maxWidth800 ? 12 : 8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <InputLabel className={classes.inputLabel}>
                                            {CONSTANTS.LABEL_SPECIALTESTING}
                                        </InputLabel>
                                        <CustomInput
                                            value={genericValues['testingValue']}
                                            onChange={(e) =>
                                                handleUnitId
                                                    ? handleUnitId(e?.target?.value, undefined, 'testingValue')
                                                    : null
                                            }
                                            size="lg"
                                            fullWidth
                                            helperText={specialTestingHelperText}
                                            error={specialTestingHelperText ? true : false}
                                            focus={testingValue ? true : false}
                                            inputRef={specialTestingRef}
                                            onBlur={testingValueblur}
                                            disabled={isPreEncoded}
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_CHECK}</InputLabel>
                                        <CustomInput
                                            size="lg"
                                            inputRef={specialCheckRef}
                                            value={specialCheck}
                                            onChange={handleSpecialCheck}
                                            fullWidth
                                            disabled={!genericValues['testingValue'] || isPreEncoded}
                                        />
                                    </Grid>
                                    <Grid item xs={7}>
                                        <InputLabel className={classes.inputLabel}>Phenotype</InputLabel>
                                        <CustomInput
                                            size="lg"
                                            inputRef={phenytypeRef}
                                            value={phenotype}
                                            fullWidth
                                            //{/*disabled={!specialCheck || specialTestingHelperText || isPreEncoded}*/}
                                            disabled={isPreEncoded}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            direction={maxWidth800 ? 'column' : 'row'}
                            spacing={maxWidth800 ? 5 : 7}
                            alignItems="flex-end"
                            className={classes.test}
                        >
                            <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                                <InputLabel className={classes.inputLabel}>
                                    {CONSTANTS.LABEL_COLLECTIONDATE}{' '}
                                </InputLabel>
                                <DateTimePicker
                                    width="100%"
                                    inputVariant={'outlined'}
                                    size="small"
                                    format="dd/MM/yyyy hh:mm:ss a"
                                    value={genericValues['collectionDate'] ? genericValues['collectionDate'] : null}
                                    handleDate={(e, x) => handleUnitId(e, x, 'collectionDate')}
                                    inputRef={collectionDateRef}
                                    refuse={'/^(?:&>)(?:[0-9]{10})/gi'}
                                    disabled={isPreEncoded}
                                    mask={'____________________'}
                                    padding={'5px'}
                                    disableFuture={true}
                                    error={collectionDateErrorTxt ? true : false}
                                    helperTextLabel={collectionDateErrorTxt}
                                />
                            </Grid>
                            <Grid item className={classes.inputRow} xs={maxWidth800 ? 12 : 4}>
                                <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_DIMENSION}</InputLabel>
                                <CustomInput
                                    size="lg"
                                    value={genericValues['dimension']}
                                    onChange={(e) => handleUnitId(e?.target?.value, undefined, 'dimension')}
                                    fullWidth
                                    inputRef={dimensionsRef}
                                    disabled={isPreEncoded}
                                />
                            </Grid>

                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', marginTop: '-30px' }}>
                                <Checkbox
                                    color="primary"
                                    checked={checked}
                                    handleChange={handleChange}
                                />
                                <InputLabel className={classes.inputLabel} style={{ marginRight: 4, fontSize: 16, marginTop: 6 }}>Emergency Unit</InputLabel>
                            </Grid>

                           

                            <Grid container justifyContent="space-between">
                                <Grid item className={classes.buttonGri}>
                                    {!isPreEncoded && (
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleClearAllinputs()}
                                            checked={clearForms}
                                        >
                                            Clear All
                                        </Button>
                                    )}
                                </Grid>
                                <Grid item className={classes.buttonGrid}>
                                    {isPreEncoded ? (
                                        <CustomButton
                                            color="primary"
                                            variant="contained"
                                            width="200px"
                                            disabled={
                                                !genericValues.unitId ||
                                                genericValues.isAssociated ||
                                                !bloodGroupValue ||
                                                !productCodeValue ||
                                                !genericValues.tagId ||
                                                !genericValues.expiryDate ||
                                                String(genericValues.expiryDate) === 'Invalid Date' ||
                                                devicestatus?.deviceStatus === 'DISCONNECTED:1'
                                            }
                                            fullWidth={true}
                                            onClick={handlePreEncodedAssociateUnit}
                                        >
                                            {genericValues.isAssociated ? (
                                                <span> Already Associated </span>
                                            ) : genericValues.isAssigned ? (
                                                <span> Already Assigned </span>
                                            ) : (
                                                <span> Associate Unit </span>
                                            )}
                                        </CustomButton>
                                    ) : settingsData?.general?.deviceType === 'Manual' ? (
                                        <CustomButton
                                            color="primary"
                                            width="200px"
                                            disabled={
                                                disableAssociateBtn ||
                                                    tagIdLoading ||
                                                    devicestatus?.deviceStatus === 'DISCONNECTED:1'
                                                    ? true
                                                    : false
                                            }
                                            variant={!associateLoading ? 'contained' : 'outlined'}
                                            fullWidth={true}
                                            onClick={handleManualAssociateUnit}
                                        >
                                            {associateLoading ? <CircularProgress size={20} /> : <span> Associate </span>}
                                        </CustomButton>
                                    ) : (
                                        <CustomButton
                                            color="primary"
                                            width="200px"
                                            disabled={
                                                disableAssociateBtn ||
                                                    tagIdLoading ||
                                                    devicestatus?.deviceStatus === 'DISCONNECTED:1'
                                                    ? true
                                                    : false
                                            }
                                            variant={!associateLoading ? 'contained' : 'outlined'}
                                            fullWidth={true}
                                            onClick={handleAssociateUnit}
                                        >
                                            {associateLoading ? (
                                                <CircularProgress size={20} />
                                            ) : (
                                                <span> Associate Unit </span>
                                            )}
                                        </CustomButton>
                                    )}
                                </Grid>
                            </Grid>

                        </Grid>
                    </>
                ) : (
                    <Grid item style={{}}>
                        <Loader />
                    </Grid>
                )}
               
            </Grid>
        </>
    );
};

export default FormComponent;
