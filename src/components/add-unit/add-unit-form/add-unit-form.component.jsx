import { Divider, Grid, Typography, useMediaQuery } from '@material-ui/core';
import specialTesingCheck from './specialTestingService';

import React from 'react';

import Hidden from '@material-ui/core/Hidden';
import FormContainer from '../AssociateUnitForm/formContainer';

import { useStyles } from './add-unit-form.style';

import CONSTANTS from '../../../common/constants';
import { getPhenotypeReport } from './speciaTNService';
import { Alert } from 'common';
import { useDispatch, useSelector } from 'react-redux';
import ConvertToDBDate from './julianDateConverter';
import { clearAddSkuData } from 'redux/actions/associateUnit/addSkuActtions';

const AddUnitFormComponent = (props) => {
    const maxWidth959 = useMediaQuery('(max-width:1280px)');
    //    const maxWidth1420 = useMediaQuery('(max-width:1420px)');

    const {
        unitId,
        handleUnitId,
        check,
        handleCheck,
        checkError,
        unitIdHelperText,
        checkChar,
        productCodeOpen,
        setProductCodeOpen,
        bloodGroupOpen,
        setBloodGroupOpen,
        collectionDate,
        setCollectionDate,
        expiryDate,
        setExpiryDate,
        specialTestingHelperText,
        setSpecialTestingHelperText,
        testingValue,
        setTestingValue,
        setBloodGroupValue,
        bloodGroupValue,
        specialTestingRef,
        donationUdRef,
        checkRef,
        blooGroupRef,
        setPhenotype,
        specialCheck,
        setSpecialCheck,
        phenotype,
        phenytypeRef,
        specialCheckRef,
        productCodeValue,
        setProductCodeValue,
        productCodeRef,
        bloodGroupReponse,
        productCodesReponse,
        handleAssociateUnit,
        handleManualAssociateUnit,
        alert,
        skuData,
        skuError,
        setAlert,
        setSeverity,
        setAlertMessage,
        associateDevice,
        tagId,
        handleTagId,
        disableCheck,
        tagIdRef,
        onChangeAutoComplete,

        handleAutoCompleteChange,
        expiryDateRef,
        collectionDateRef,
        dimensionsRef,
        alertMessage,
        genericValues,
        locationddValue,
        deviceddValue,
        hostialddValue,
        options6,
        options4,
        options5,
        customAutoComplete,
        handleClickAway,
        handleSpecialCheck,
        severity,
        oneTimeScan,
        associateLoading,
        tagIdLoading,
        branchRef,
        disableAssociateBtn,
        bloodGroupErrortxt,
        productCodeErrortxt,
        expiryDateErrorTxt,
        collectionDateErrorTxt,
        handleClearAllinputs,
        clearForms,
        setClearForm,
        devicestatus,
        checked ,
        handleChange 
    } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleExpiryDateChange = (date, y) => {
        if (y?.includes('&>') && !y?.includes('_')) {
            let newJDate = ConvertToDBDate(y.substr(2));
            if (newJDate) {
                setExpiryDate(newJDate);
                specialTestingRef.current.focus();
            }
        } else {
            setExpiryDate(date);
            if (typeof date?.getMonth === 'function') {
                String(date) === 'Invalid Date' && y?.includes('_') ? null : specialTestingRef.current.focus();
            }
        }
    };
    const handleCollectionDateChange = (date, y) => {
        if (y?.includes('&}') && !y?.includes('_')) {
            let newJDate = ConvertToDBDate(y.substr(2));
            if (newJDate) {
                setCollectionDate(newJDate);
                dimensionsRef.current.focus();
            }
        } else {
            setCollectionDate(date);
            if (typeof date?.getMonth === 'function') {
                String(date) === 'Invalid Date' && y?.includes('_') ? null : dimensionsRef.current.focus();
            }
        }
    };

    const handleTestingChange = (e) => {
        if (e.target.value === '') {
            setPhenotype('');
            setSpecialCheck('');
        }
        const val = e.target.value;
        setSpecialTestingHelperText('');
        if (val.startsWith('=\\') ? val.length < 21 : val.length < 19) setTestingValue(val);
        let isnum = /^\d+$/.test(val);

        if (val.length === 18 && isnum) {
            specialCheckRef.current.focus();
        } else if (val.length === 20 && val.startsWith('=\\')) {
            const subVal = val.substring(2);
            setTestingValue(subVal);
            const speicalCheckVal = specialTesingCheck(subVal);
            const phenoVal = getPhenotypeReport(subVal);
            setSpecialCheck(speicalCheckVal);
            collectionDateRef.current.focus();
            setPhenotype(phenoVal);
        }
    };

    const [associateButtonAccess, setAssociateButtonAccess] = React.useState(false);
    const { userAccessData, userAccessLoading } = useSelector((state) => state.getUserAccess);
    const [codesAndDescription, setCodesAndDescription] = React.useState({});

    React.useEffect(() => {
        if (userAccessData) {
            userAccessData?.data[0]?.moduleId?.map((item) => {
                if (item.code == 'BS-MO-1008') {
                    setAssociateButtonAccess(true);
                }
            });
            let currentMoudleDatObject = userAccessData.data[0]?.moduleId
                .filter((item) => item['drawer-code'].includes('BS-MO-1008'))
                .map((item) => {
                    let { code, name, description } = item;
                    return { code, name, description };
                });
            setCodesAndDescription(currentMoudleDatObject);
        }
    }, [userAccessData]);

    return (
        <Grid container wrap="nowrap">
            <form className={classes.form}>
                <Grid
                    container
                    wrap="nowrap"
                    className={classes.root}
                    direction={maxWidth959 ? 'column' : 'row'}
                    spacing={8}
                >
                    <FormContainer
                        checked={checked}
                        handleChange={handleChange}
                        isPreEncoded={false}
                        genericValues={genericValues}
                        unitId={unitId}
                        productCodeOpen={productCodeOpen}
                        handleUnitId={handleUnitId}
                        checkError={checkError}
                        checkValue={check}
                        handleCheck={handleCheck}
                        setBloodGroupOpen={setBloodGroupOpen}
                        bloodGroupOpen={bloodGroupOpen}
                        productCode={productCodesReponse}
                        handleClickAway={handleClickAway}
                        bloodGroup={bloodGroupReponse}
                        handleAutoCompleteChange={handleAutoCompleteChange}
                        setProductCodeOpen={setProductCodeOpen}
                        expiryDate={expiryDate}
                        handleExpiryDateChange={handleExpiryDateChange}
                        collectionDate={collectionDate}
                        handleCollectionDateChange={handleCollectionDateChange}
                        testingValue={testingValue}
                        handleTestingChange={handleTestingChange}
                        specialTestingHelperText={specialTestingHelperText}
                        unitIdHelperText={unitIdHelperText}
                        checkChar={checkChar}
                        setBloodGroupValue={setBloodGroupValue}
                        bloodGroupValue={bloodGroupValue}
                        donationUdRef={donationUdRef}
                        specialTestingRef={specialTestingRef}
                        checkRef={checkRef}
                        blooGroupRef={blooGroupRef}
                        specialCheck={specialCheck}
                        setSpecialCheck={setSpecialCheck}
                        phenotype={phenotype}
                        setPhenotype={setPhenotype}
                        phenytypeRef={phenytypeRef}
                        specialCheckRef={specialCheckRef}
                        handleSpecialCheck={handleSpecialCheck}
                        productCodeValue={productCodeValue}
                        setProductCodeValue={setProductCodeValue}
                        productCodeRef={productCodeRef}
                        marg
                        handleAssociateUnit={handleAssociateUnit}
                        handleManualAssociateUnit={handleManualAssociateUnit}
                        onChangeAutoComplete={onChangeAutoComplete}
                        associateButtonAccess={associateButtonAccess}
                        associateDevice={associateDevice}
                        tagId={tagId}
                        handleTagId={handleTagId}
                        disableCheck={disableCheck}
                        tagIdRef={tagIdRef}
                        expiryDateRef={expiryDateRef}
                        collectionDateRef={collectionDateRef}
                        dimensionsRef={dimensionsRef}
                        hostialddValue={hostialddValue}
                        deviceddValue={deviceddValue}
                        locationddValue={locationddValue}
                        options6={options6}
                        options4={options4}
                        options5={options5}
                        oneTimeScan={oneTimeScan}
                        customAutoComplete={customAutoComplete}
                        associateLoading={associateLoading}
                        tagIdLoading={tagIdLoading}
                        branchRef={branchRef}
                        disableAssociateBtn={disableAssociateBtn}
                        bloodGroupErrortxt={bloodGroupErrortxt}
                        productCodeErrortxt={productCodeErrortxt}
                        expiryDateErrorTxt={expiryDateErrorTxt}
                        collectionDateErrorTxt={collectionDateErrorTxt}
                        handleClearAllinputs={handleClearAllinputs}
                        clearForms={clearForms}
                        setClearForm={setClearForm}
                        setAlert={setAlert}
                        setSeverity={setSeverity}
                        setAlertMessage={setAlertMessage}
                        devicestatus={devicestatus}
                    />

                    <Hidden mdDown>
                        <Grid item>
                            <Divider variant="fullWidth" className={classes.margLeft} orientation="vertical" />
                        </Grid>
                    </Hidden>
                    <Hidden mdDown>
                        <Grid item xs={2} className={classes.tips1}>
                            <Grid container direction="column" justify="space-between">
                                <Typography variant="h5" className={classes.tips}>
                                    {CONSTANTS.LABEL_TIPS}
                                </Typography>
                                <Typography variant="subtitle1" className={classes.body}>
                                    {CONSTANTS.LABEL_PLEASE}{' '}
                                    <span className={classes.span}>{CONSTANTS.LABEL_SCAN}</span> {CONSTANTS.LABEL_THE}
                                    <span className={classes.span}>{CONSTANTS.LABEL_BARCODE}</span> on the blood bags,
                                    so
                                    {CONSTANTS.LABEL_AUTOMATICALLY}
                                </Typography>
                                <Typography variant="subtitle1" className={classes.or}>
                                    {CONSTANTS.LABEL_OR}
                                </Typography>
                                <Typography variant="subtitle1" className={classes.body}>
                                    {CONSTANTS.LABEL_YOUCANALSO}
                                    <span className={classes.span}> {CONSTANTS.LABEL_INPUT}</span>{' '}
                                    {CONSTANTS.LABEL_THEM}
                                    <span className={classes.span}>{CONSTANTS.LABEL_MANUALLY}</span>{' '}
                                    {CONSTANTS.LABEl_FIELDS}
                                </Typography>
                                <Typography variant="subtitle1" className={`${classes.body} ${classes.butt}`}>
                                    {CONSTANTS.LABEL_REQUIREDFIELD}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Hidden>
                </Grid>
            </form>
            {alert && (
                <Alert
                    open={alert}
                    message={alertMessage}
                    duration={4000}
                    onClose={() => {
                        setAlert(false), dispatch(clearAddSkuData());
                    }}
                    vertical={'bottom'}
                    horizontal={'center'}
                    severity={skuData?.status === true ? 'success' : severity ? 'success' : 'error'}
                    actions={false}
                />
            )}
        </Grid>
    );
};

export default AddUnitFormComponent;
