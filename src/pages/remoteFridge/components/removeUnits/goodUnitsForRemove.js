import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
    Button,
    TextField,
    Paper,
    Chip,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    Switch,
    Radio,
    RadioGroup,
    Typography,
    Checkbox,
    Link,
    CardHeader,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    useMediaQuery,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputLabel,
    List, Box, Stepper, Step, StepButton
} from '@material-ui/core';
//import { Document, Page } from 'react-pdf';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './goodUnitsStyles';
import { tabStyle } from 'components/tab/tab.style';
import { CustomButton, DatePicker } from 'common';
import { useHistory, useLocation, useParams } from 'react-router';
import { compatabilityPdfSlip } from 'redux/actions/manage/scManageActions';
import BarcodeValidation from '../barcodevalidation';
import RfidValidation from '../rfidvalidation';
import CONSTANTS from 'common/constants';
import { CancelOutlined } from '@material-ui/icons';
import CustomInput from 'components/inputfeild';
import { AutoComplete } from 'components';
import { validationSlipUpdate } from 'redux/actions/manage/scManageActions';
import bloodunit from 'assets/bloodunit.jpg';
import unitid from 'assets/unitid.gif';
import productcode from 'assets/productcode.gif';
import compatibilityslip from 'assets/compatibilityslip.gif';
//import PDFViewer from 'pdf-viewer-reactjs';
//import PropTypes from 'prop-types';
//import { PDFViewer, Document } from '@react-pdf-viewer/core';

const steps = ['Compatibility slip', 'PDF file', 'Confirmation','Validation'];

function TabPanel(props) {
    const { children, value, index, isDeviceAccess, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

//const Base64PdfViewer = ({ base64String }) => {
//    return (
//        <div style={{ width: '100%', height: '800px' }}>
//            <PDFViewer width="100%" height="100%">
//                <Document
//                    file={{
//                        data: base64String,
//                    }}
//                />
//            </PDFViewer>
//        </div>
//    );
//};

const GoodUnits = ({
    goodUnits,
    redirectCounter,
    goodUnitsHeight,
    grayUnits,
    removeunit,
    goodBatchData,
    selectedBatchProduct,
    stillBatchExist,
    getDate,
}) => {
    const { compatabilityPdfSlipdata } = useSelector((state) => state.compatabilityPdfSlip)
    console.log('compatabilityPdfSlip', compatabilityPdfSlip)
    const { options } = useSelector((state) => state.getDropDown);
    let basepdf = compatabilityPdfSlipdata?.data?.PDFBase64;
    console.log('height---', goodUnitsHeight)
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { dateFormat } = useSelector((state) => state.dateFormat);
    const [pdfOpen, setPdfOpen] = useState(false);
    const [printedUnits, setPrintedUnits] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [wholePopOpen, setWholePopOpen] = useState(false);
    const [tick, setTick] = useState(null)
    console.log('tick', setTick);
    const [scanValue, setScanValue] = useState();
    const [productCodeOpen, setProductCodeOpen] = useState(false);
    const [productCode, setProductCode] = useState(null);
    console.log('product---', productCode)
    const [unitId, setUnitId] = useState('');
    console.log('id---', unitId);
    const [scanOpen, setScanOpen] = useState(false)
    const [disableProductCode, setDisableProductCode] = useState(false);
    const [comments, setComments] = useState('');
    const [sequenceNo, setSequenceNo] = useState('');
    console.log('sequence', sequenceNo);

    const handlePrintCompatability = () => {
        history.push('/dashboard/compatability-slip')
    }

    const handleCompatabilityPDF = (unit) => {
        console.log('pdffff---', unit)
        setWholePopOpen(true);
        let pdf = {
            recipientId: unit?.refSku?.recipientId,
            refskuId: unit?.refSku?._id
        }
        dispatch(compatabilityPdfSlip(pdf))
        setPdfOpen(true)
        setPrintedUnits(prevState => [...prevState, unit?.refSku?._id])
    }
    const handleWholeClose = () => {
        setPdfOpen(false)
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});


    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        //setActiveStep(0)
        setWholePopOpen(false)
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = (unit) => {
        console.log('unit---',unit)
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
        let pdf = {
            recipientId: unit?.refSku?.recipientId,
            refskuId: unit?.refSku?._id
        }
        dispatch(compatabilityPdfSlip(pdf))
        setPdfOpen(true)
        setPrintedUnits(prevState => [...prevState, unit?.refSku?._id])

    };

    const openPDF = (url) => {
       
        window.location.href = url;
       
    };

    const handlePrintButtonClick = () => {
        if (activeStep === 1) {
           
            //openPDF('https://arxiv.org/pdf/quant-ph/0410100.pdf');
        }
    };



    const handleOkNext = (e) => {
        if (e === 'yes') {
            const newActiveStep =
                isLastStep() && !allStepsCompleted()
                    ? // It's the last step, but not all steps have been completed, 
                    // find the first step that has been completed
                    steps.findIndex((step, i) => !(i in completed))
                    : activeStep + 1;
            setActiveStep(newActiveStep);
        }
        else if (e === 'no') {
            setActiveStep(0)
        }
        console.log('eee',e)
    };
    const handlePrintNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed, 
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    }

    const handleConfirmNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed, 
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    }
    const handleBack = () => {
        if (showVerifyInput === true) {
            setShowUnitIdInput(true)
            setShowVerifyInput(false)
            setScanValue('')
            setActiveStep(3)
        }
        else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const classesTab = tabStyle();
    const socket = useSelector((state) => state.socketReducer.socket);
    const [activeTab, setActiveTab] = useState(0);
    const [faulty, setFaulty] = useState()
    //const dispatch = useDispatch();
    console.log('soooooo', socket)
    const tabList = ['RFID-Barcode validation', 'Barcode-Barcode validation'];
    const [tabPanelItem, setTabPanelItem] = useState([]);
    const [socketData, setSocketData] = useState();
    useEffect(() => {
        socket?.on('deviceActivity', (data) => {
            setSocketData(data);
            console.log("data--", data)
            let sessionData = data?.sessionData?.faulty?.find((obj) => obj.type)
            setFaulty(sessionData?.type)
            console.log('sess---', sessionData)
            //setWholePopOpen(true)

        });

    }, [socket]);

    useEffect(() => {
        if (socketData?.goodData?.length > 0) {
            setWholePopOpen(true);
        }
    }, [socket])
    const handlePopupButton = () => {
        setWholePopOpen(true)
    }
    console.log('faulty---', faulty)

    useEffect(() => {
        if (faulty === 'load') {
            setActiveTab(0);
        } else if (faulty === 'unload') {
            setActiveTab(1);
        }
    }, [faulty]);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleDialogOpen = () => {
        setScanOpen(true);
        setShowCompatibilityInput(false);
        setShowProductCodeInput(false);
        setShowUnitIdInput(true);
    }

    const handleClose = () => {
        setWholePopOpen(false)
        setScanOpen(false);
        setTick(null);
    }
    const handleSaveClick = () => {
        setScanOpen(false)
    }

    const [scanSplitted, setScanSplitted] = useState('')
    console.log('scanSplitted---', scanSplitted)
    const handleAddSave = () => {
        setWholePopOpen(false);
        setActiveStep(0);
        setShowUnitIdInput(true)
        setShowVerifyInput(false)

        if (unitId === scanSplitted[6] && productCode === scanSplitted[7]) {
            let slipId = compatabilityPdfSlipdata?.data?.slipData?._id
            dispatch(validationSlipUpdate('verified', slipId));
            setUnitId('')
            setProductCode('')
            setScanValue('')
        }
        else {
            let slipId = compatabilityPdfSlipdata?.data?.slipData?._id
            dispatch(validationSlipUpdate('NotMatched', slipId));
            setScanOpen(false);
            setUnitId('')
            setProductCode('')
        }
    }

    const handlePaste = (e) => {
        setScanValue(e);
        setShowCompatibilityInput(false)
        setShowVerifyInput(true);
        const pastedValue = e;
        const splittedValues = pastedValue.split('|');
        console.log('eeeeeee', e)
        console.log('splittedValues--', splittedValues)
        setScanSplitted(splittedValues)
        if (unitId === splittedValues[6] && productCode === splittedValues[7]) {
            setTick(true);
            
        }
        else {
            setTick(false);
        }

    };
    const [showUnitIdInput, setShowUnitIdInput] = useState(true);
    const [showProductCodeInput, setShowProductCodeInput] = useState(false);
    const [showCompatibilityInput, setShowCompatibilityInput] = useState(false);
    const [showVerifyInput, setShowVerifyInput] = useState(false);

    const handleNextButtonClick = () => {
        // Logic to handle next button click
        setShowProductCodeInput(true);
        setShowUnitIdInput(false);
        setShowCompatibilityInput(false)
    };
    const handleNextProductButtonClick = () => {
        setShowCompatibilityInput(true);
        setShowProductCodeInput(false);
        setShowUnitIdInput(false);
    }
    const handleClickAway = () => {
        setProductCodeOpen(false);
    };

    return (
        <>
            
              <Grid container direction="column">
            <Grid item xs={12}>
               {/*<Grid style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '50px' }}>*/}
               {/*     <CustomButton*/}
               {/*         //disabled={!accessableCodes.includes('BS-ACO-1043') || patientMRN === null}*/}
               {/*         onClick={handlePrintCompatability}*/}
               {/*         variant="contained"*/}
               {/*         color="primary"*/}
               {/*     >*/}
               {/*         Validate Compatability Slip & Unit*/}
               {/*     </CustomButton>*/}
               {/*     </Grid>*/}
                
                <Grid item xs={12} style={{ display: 'flex', marginBottom: '2px' }}>
                    <Grid item xs={6}>
                        <Paper elevation={0} style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                           
                            <CheckCircleOutlineIcon fontSize="small" className={classes.tickIcon} />{' '}
                            {removeunit ? (
                                <Typography variant="body1" className={classes.successText}>
                                    Units to be removed are still in Device.
                                </Typography>
                            ) : stillBatchExist ? (
                                <Typography variant="body1" className={classes.successText}>
                                    Batch Related tags to be removed are still in Device.
                                </Typography>
                            ) : (
                                
                                
                                <Typography variant="body1" className={classes.successText}>
                                    {goodUnits?.length} Units has been removed from the Device.
                                </Typography>
                              
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={0} style={{ padding: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <AccessTimeIcon fontSize="small" className={classes.tickIcon} />{' '}
                            {goodUnitsHeight ? (
                                <Typography variant="body1" className={classes.successText}>
                                    Door Locks in {redirectCounter} seconds.
                                </Typography>
                            ) : (
                                <Typography variant="body1" className={classes.successText}>
                                    Redirecting to Dashboard screen in {redirectCounter} seconds.
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>

                <Paper
                    style={{
                        borderRadius: '10px',
                        padding: 25,
                        height: '71vh',
                        overflow: 'auto',
                        maxHeight: '62vh'
                    }}
                    elevation={0}
                >
                    <Grid container style={{ padding: 3 }} spacing={4}>
                        {goodUnits?.map((unit) => (
                            <List key={unit.id} item xs={6}>
                                {console.log('print---',unit)} 
                                <Card className={printedUnits.includes(unit?.refSku?._id) ? classes.cardRootGreen : (unit.check ? classes.cardRoot : classes.cardRootGray)}>
                                    <table>
                                        <tr>
                                            <td className={classes.cardHead}>Unit ID :</td>
                                            <td className={classes.cardDetail}>
                                                {unit.check ? unit?.refSku?.donationCode : unit?.donationCode}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={classes.cardHead}>Blood Group :</td>
                                            <td className={classes.cardDetail}>
                                                {unit.check
                                                    ? unit?.refSku?.bloodgroup?.name
                                                    : unit.bloodgroupId?.[0]?.name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={classes.cardHead}>Product Code :</td>
                                            <td className={classes.cardDetail}>
                                                {unit.check
                                                    ? unit?.refSku?.productcode?.isbtcode
                                                    : unit?.productcodeId?.[0]?.code}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={classes.cardHead}>Product Group :</td>
                                            <td className={classes.cardDetail}>
                                                {unit.check
                                                    ? unit?.refSku?.productgroup?.name
                                                    : unit?.productgroupId?.[0]?.name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={classes.cardHead}>Expiration Date :</td>
                                            <td className={classes.cardDetail}>
                                                {unit.check
                                                    ? unit?.refSku?.expiryDateAndTime
                                                        ? moment(unit?.refSku?.expiryDateAndTime).format(dateFormat)
                                                        : '-'
                                                    : moment(unit?.expiryDateAndTime).format(dateFormat)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={classes.cardHead}>Dereservation Date :</td>
                                            <td className={classes.cardDetail}>
                                                {unit.check
                                                    ? unit?.refSku?.dereservationDate
                                                        ? moment(unit?.refSku?.dereservationDate).format(dateFormat)
                                                        : '-'
                                                    : moment(unit?.dereservationDate).format(dateFormat)}
                                            </td>
                                        </tr>
                                    </table>
                                    <Grid>
                                        <CustomButton
                                            //disabled={!accessableCodes.includes('BS-ACO-1043') || patientMRN === null}
                                            onClick={() => handleCompatabilityPDF(unit)}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Compatibility Slip review
                                        </CustomButton>
                                    </Grid>
                                </Card>
                            </List>
                        ))}
                    </Grid>
                </Paper>
            </Grid>
            </Grid>


            {/*   <Dialog
                maxWidth="lg"
                PaperProps={{
                    style: {
                        borderRadius: '10px',
                        //backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                        padding: 20,
                        width: '500px'
                    }
                }}
                open={pdfOpen}
                onClose={handleClose}
            >
                <DialogTitle>PDF Slip</DialogTitle>
                <DialogContent>
                    <Grid item xs={12} style={{ display: 'flex' }}>
                        <Grid item lg={6} className={classes.inputField}>
                           
                        </Grid>

                       
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', padding: '15px' }}>
                            <CustomButton variant="contained" onClick={handleClose}>
                                Cancel
                            </CustomButton>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
                            <CustomButton variant="contained" color="primary"
                                ///onClick={handleSaveClick}
                            >
                                Print
                            </CustomButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            */}

            <Dialog
              
                maxWidth="lg"
                PaperProps={{
                    style: {
                        borderRadius: '10px',
                        //backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                        padding: 20,
                        width: '1200px'
                    }
                }}
                fullWidth 
                open={wholePopOpen}
                onClose={handleWholeClose}
            >
                 <DialogContent>
         
            {/*<Box sx={{ width: '100%' }}>*/}
            {/*    <Stepper nonLinear activeStep={activeStep}>*/}
            {/*        {steps.map((label, index) => (*/}
            {/*            <Step key={label} completed={completed[index]}>*/}
            {/*                <StepButton color="inherit" onClick={() => handleStep(index)}>*/}
            {/*                    {label}*/}
            {/*                </StepButton>*/}
            {/*            </Step>*/}
            {/*        ))}*/}
            {/*    </Stepper>*/}
                <div>
                    {activeStep === 1 && (
                        <React.Fragment>
                            {/* Step 1 Content */}
                                <Grid>
                                    <Grid container>
                                        <Grid item style={{ alignItems: 'center', marginLeft: '450px' }}>
                                            <Typography variant="h6" color="primary">
                                                Compatibility slip print
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{ alignItems: 'center', marginLeft: '370px' }}>
                                        <Typography variant="h5" style={{ marginTop: 20, fontWeight: '50px', alignItems: 'center' }}>
                                                Did the compatibility slip printed ok ?
                                            </Typography>
                                        </Grid>
                                            <Grid container>
                                              
                                                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', padding: '15px' }}>
                                                    <CustomButton variant="contained" onClick={(e)=>handleOkNext('no')}>
                                                        No
                                                    </CustomButton>
                                                </Grid>
                                                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
                                                    <CustomButton variant="contained" color="primary"
                                                        onClick={(e) => handleOkNext("yes")}
                                                    >
                                                        Yes
                                                    </CustomButton>
                                                </Grid>
                                                </Grid>
                                    </Grid>
                                </Grid>
                        </React.Fragment>
                    )}
                        {activeStep === 2 && (
                            <React.Fragment>
                                {/* Step 1 Content */}
                                <Grid>
                                    <Grid container justifyContent="center">
                                        <Grid item style={{ marginBottom: '30px', alignItems: 'center' }}>
                                            <Typography variant="h6" color="primary">
                                                Please attach the compatibility slip to the unit
                                            </Typography>
                                        </Grid>
                                            <Typography variant="h5" style={{ marginTop: 10, fontWeight: '40px' }}>
                                                Make sure to attach the printed compatibility slip without hiding other barcodes on the blood label!
                                            </Typography>
                                        <Typography variant="h5" style={{ marginTop: 10, marginBottom: '30px', fontWeight: '30px' }}>
                                               Click on Confirm after attaching the slip to the current unit....
                                            </Typography>
                                            <Grid container style={{ marginLeft: '470px' }}>
                                                <CustomButton 
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.dialogButton}
                                                    onClick={handleConfirmNext}
                                                >
                                                    CONFIRM
                                                </CustomButton>
                                            </Grid>
                                            {/* Place your compatibility slip content here */}
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        )}
                    {activeStep === 0 && (
                        <React.Fragment>
                            <Typography variant="body1">
                                PDF Slip
                            </Typography>
                            <Grid container>
                                <embed src={`data:application/pdf;base64,${basepdf}`} width="100%" height="500px" />
                               {/* <iframe src="https://arxiv.org/pdf/quant-ph/0410100.pdf" width="100%" height="500px"></iframe>*/}
                                {/*<Base64PdfViewer base64String={base64String} />*/}
                                {/*<Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>*/}
                                {/*</Document>*/}
                                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', padding: '15px' }}>
                                    <CustomButton variant="contained" onClick={handleClose}>
                                        Cancel
                                    </CustomButton>
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
                                    <CustomButton variant="contained" color="primary"
                                        //onClick={handlePrintButtonClick }
                                        onClick={handlePrintNext}
                                    >
                                        Print
                                    </CustomButton>
                                </Grid>
                                
                            </Grid>
                        </React.Fragment>
                    )}
                    {activeStep === 3 && (
                        <React.Fragment>
                           
                                    <Grid container item xs={12} lg={12} md={12} spacing={2}>
                                        {showUnitIdInput && (
                                        <Grid item>
                                            <Grid item style={{ marginLeft: '300px', marginBottom: '30px', alignItems: 'center' }}>
                                                <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>
                                                    Verify if the compatibility slip is attached on the correct unit
                                                </Typography>
                                            </Grid>
                                            <Grid style={{ display: 'flex' }}>
                                                <Grid style={{ marginLeft: '100px' }}>
                                                    <img src={unitid} className={classes.bloodIcon} style={{ width: '350px', marginTop: '20px', height: '400px' }} />
                                                    <Typography variant="body2" color="textSecondary" align="center">
                                                        Make sure to scan the barcode of the unit number on the blood label.
                                                    </Typography>
                                                </Grid>

                                                <Grid style={{marginLeft:'25px'}}
                                                ></Grid>

                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={12} style={{ marginLeft: '100px' }}>
                                                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                                                            <Typography variant="h6" color="primary">
                                                               Step : 1
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} style={{ marginBottom: '30px' }}>
                                                        <Typography variant="h6" color="primary">
                                                            Please scan the barcode of the unit number
                                                            </Typography>
                                                            </Grid>
                                                        <Typography className={classes.labelColor}>
                                                            Unit ID :
                                                        </Typography>
                                                        <Grid item style={{ marginTop: '20px' }}>
                                                        <CustomInput
                                                            //error={unitIdError}
                                                            //helperText={unitIdError && unitIdErrorText}
                                                            bgColor="white"
                                                            variant="outlined"
                                                            fullWidth
                                                            textTransform="uppercase"
                                                            value={unitId}
                                                            onChange={(e) => setUnitId(e.target.value)}
                                                            focus={true}
                                                            //inputRef={unitIdRef}
                                                        />
                                                        </Grid>
                                                
                                                    <Grid item style={{ marginLeft: '430px', marginTop: '30px' }}>
                                                        <CustomButton
                                                            variant="contained"
                                                            color="primary"

                                                            onClick={handleNextButtonClick}
                                                        >
                                                            Next
                                                        </CustomButton>
                                                    </Grid>
                                                    </Grid>
                                                </Grid>
                                                </Grid>
                                                <Grid
                                                    container
                                                    alignItems="center"
                                                    className={classes.margTop}
                                                    item
                                                    lg={12}
                                                    md={12}
                                                ></Grid> <Grid
                                                    container
                                                    alignItems="center"
                                                    className={classes.margTop}
                                                    item
                                                    lg={12}
                                                    md={12}
                                                ></Grid>
                                            </Grid>
                                        )}
                                    {showProductCodeInput && (

                                        <Grid item>
                                            <Grid item style={{ marginLeft: '300px', marginBottom: '30px', alignItems: 'center' }}>
                                                <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>
                                                    Verify if the compatibility slip is attached on the correct unit
                                                </Typography>
                                            </Grid>
                                            <Grid style={{ display: 'flex' }}>
                                                <Grid style={{ marginLeft: '100px' }}>
                                                    <img src={productcode} className={classes.bloodIcon} style={{ width: '350px', marginTop: '30px', height: '400px' }} />
                                                    <Typography variant="body2" color="textSecondary" align="center">
                                                        Make sure to scan the barcode of the product code on the blood label.
                                                    </Typography>
                                                </Grid>

                                                <Grid style={{ marginLeft: '25px' }}
                                                ></Grid>

                                            <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={12} style={{ marginLeft: '100px' }}>
                                                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                                                            <Typography variant="h6" color="primary">
                                                                Step : 2
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} style={{ marginBottom: '30px' }}>
                                                            <Typography variant="h6" color="primary">
                                                                Please scan the barcode of the unit number
                                                            </Typography>
                                                        </Grid>
                                                    <Typography className={classes.addUnitsDialogLabels}>
                                                        Product code :
                                                    </Typography>
                                                  <Grid item style={{ marginTop: '20px' }}>
                                                    <CustomInput
                                                            //error={unitIdError}
                                                            //helperText={unitIdError && unitIdErrorText}
                                                            bgColor="white"
                                                            variant="outlined"
                                                            fullWidth
                                                            textTransform="uppercase"
                                                            value={productCode}
                                                            onChange={(e) => setProductCode(e.target.value)}
                                                            focus={true}
                                                            //inputRef={unitIdRef}
                                                        />
                                                        
                                                </Grid>
                                                        <Grid item style={{ marginLeft: '430px', marginTop: '30px' }}>
                                                            <CustomButton
                                                                variant="contained"
                                                                color="primary"

                                                                onClick={handleNextProductButtonClick}
                                                            >
                                                                Next
                                                            </CustomButton>
                                                        </Grid>
                                                </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                container
                                                alignItems="center"
                                                className={classes.margTop}
                                                item
                                                lg={12}
                                                md={12}
                                            ></Grid> <Grid
                                                container
                                                alignItems="center"
                                                className={classes.margTop}
                                                item
                                                lg={12}
                                                md={12}
                                            ></Grid>
                                        </Grid>
                                        )}
                                </Grid>


                                {showCompatibilityInput && (

                                    <Grid item>
                                       <Grid item style={{ marginLeft: '300px', marginBottom: '30px', alignItems: 'center' }}>
                                            <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>
                                                    Verify if the compatibility slip is attached on the correct unit
                                                </Typography>
                                            </Grid>
                                        <Grid style={{ display: 'flex' }}>
                                            <Grid style={{ marginLeft: '100px' }}>
                                                <img src={compatibilityslip} className={classes.bloodIcon} style={{ width: '350px', marginTop: '30px', height: '400px' }} />
                                                <Typography variant="body2" color="textSecondary" align="center">
                                                    Make sure to scan the 2D barcode of the compatibility slip.
                                                </Typography>
                                            </Grid>

                                            <Grid style={{ marginLeft: '25px' }}
                                            ></Grid>
                                        <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12} style={{ marginLeft: '100px' }}>
                                                    <Grid item xs={12} style={{ marginBottom: '10px' }}>
                                                        <Typography variant="h6" color="primary">
                                                            Step : 3
                                                        </Typography>
                                                    </Grid>
                                                        <Grid item xs={12} style={{ marginBottom: '30px' }}>
                                                            <Typography variant="h6" color="primary">
                                                              Please scan the 2D barcode of the compatibility  slip
                                                            </Typography>
                                                        </Grid>
                                                <Typography className={classes.addUnitsDialogLabels}>
                                                    Compatibility Slip :
                                                </Typography>
                                                    <Grid item style={{ marginTop: '20px' }}>
                                                <CustomInput
                                                    value={scanValue}
                                                    onChange={(e) => handlePaste(e.target.value)}
                                                    variant="outlined"
                                                    bgColor="white"
                                                    color="primary"
                                                    focus={true}
                                                    fullWidth

                                                />
                                                    </Grid>

                                                        {/*<Grid style={{ marginLeft: '210px', marginTop: '30px' }}>*/}
                                                        {/*    <CustomButton*/}
                                                        {/*        variant="contained"*/}
                                                        {/*        color="primary"*/}

                                                        {/*        onClick={handleAddSave}*/}
                                                        {/*    >*/}
                                                        {/*        Save*/}
                                                        {/*    </CustomButton>*/}
                                                        {/*</Grid>*/}

                                                </Grid>
                                            </Grid>
                                            </Grid>
                                            
                                    </Grid>
                                )}
                                {showVerifyInput && ( 
                                <Grid style={{ height: '500px' }}>
                                    { tick === true  ?
                                            <Grid container alignItems="center">
                                                <Grid item style={{ marginLeft: '300px', marginBottom: '30px', alignItems: 'center' }}>
                                                    <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>
                                                        Verify if the compatibility slip is attached on the correct unit
                                                    </Typography>
                                                </Grid>
                                            <CheckCircleOutlineIcon
                                                style={{
                                                    color: 'green',
                                                    width: '5em',
                                                    height: '5em',
                                                    alignItems: 'center',
                                                    marginLeft: '500px',
                                                    marginTop: '130px'
                                                }}
                                            />
                                                <Typography style={{ color: '#218c74', fontSize: '26px', marginTop: '50px', marginLeft: '200px', textAlign: 'center' }} variant="h6" color="green" width='50px'>
                                                    Compatibility slip is attached on the correct unit!<br />
                                                    You have successfully allocated the unit to the recipient.
                                                </Typography>
                                                {/*<Typography variant="h6" color="error" width='50px' style={{ fontSize: '22px', marginTop: '30px', textAlign: 'center' }}>*/}
                                                {/*    Compatibility slip must be attached to all the units<br />*/}
                                                {/*    Please proceed to print compatibility slip for the next unit.*/}
                                                {/*    <Button onClick={completedSteps} variant="contained" color="primary" style={{ marginLeft: '20px' }}>Next</Button>*/}
                                                {/*</Typography>*/}
                                        </Grid>
                                            : tick === false ?
                                                <Grid container alignItems="center">
                                                    <Grid item style={{ marginLeft: '300px', marginBottom: '30px', alignItems: 'center' }}>
                                                        <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>
                                                            Verify if the compatibility slip is attached on the correct unit
                                                        </Typography>
                                                    </Grid>
                                            <CancelOutlined
                                                style={{
                                                    color: 'red',
                                                    width: '5em',
                                                    height: '5em',
                                                    alignItems: 'center',
                                                    marginLeft: '500px',
                                                    marginTop: '130px'
                                                }}
                                            />
                                                    <Typography variant="h6" color="error" width='50px' style={{ fontSize: '26px', marginTop: '50px', marginLeft: '270px', textAlign: 'center' }}>
                                                        Compatibility slip is attached on the wrong unit!<br />
                                                        Please go back and attach the correct unit
                                            </Typography>
                                        </Grid>
                                                : null}
                                    </Grid>
                                    )}
                        </React.Fragment>
                    )}
                    {activeStep === 4 && (
                        <React.Fragment>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid item>
                                    <Tabs onChange={(e, value) => setActiveTab(value)} value={activeTab}>
                                        {tabList.map((tab, index) =>
                                            <Tab key={index} {...a11yProps(index)} label={tab} value={index} className={activeTab === index ? classesTab.tab1 : classesTab.tab2} />)}
                                    </Tabs>
                                    <TabPanel index={0} value={activeTab}>
                                        <List dense={false}>
                                            <Grid container direction="row" justify="space-between" alignItems="center">
                                                <RfidValidation printedUnits={printedUnits} />
                                            </Grid>
                                        </List>
                                    </TabPanel>
                                    <TabPanel index={1} value={activeTab}>
                                        <List dense={false}>
                                            <Grid container direction="row" justify="space-between" alignItems="center">
                                                <BarcodeValidation  />
                                            </Grid>
                                        </List>
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                        )}


                        {showVerifyInput && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <CustomButton
                            variant="contained"
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </CustomButton>

                        <Box sx={{ flex: '1 1 auto' }} />

                                <CustomButton variant="contained" onClick={handleAddSave} color="primary" disabled={ tick === false }>
                                    Completed
                        </CustomButton>
                        </Box>
                        )}

                </div>

            </DialogContent>
        </Dialog>
        </>

    );
};

export default GoodUnits;
