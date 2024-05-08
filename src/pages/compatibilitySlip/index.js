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
    InputLabel,
    List, Box, Stepper, Step, StepButton
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GoodUnit from '../compatibilitySlip/steps';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../../pages/compatibilitySlip/stepstyle';
import { tabStyle } from '../../../src/components/tab/tab.style';
import { CustomButton, DatePicker } from 'common';
import { useHistory, useLocation, useParams } from 'react-router';
import { compatabilityPdfSlip } from 'redux/actions/manage/scManageActions';
import BarcodeValidation from '../remoteFridge/components/barcodevalidation';
import RfidValidation from '../remoteFridge/components/rfidvalidation';


const steps = ['Compatibility slip', 'PDF file', 'Validation'];

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

const Compatibilityslip = ({
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
    console.log('height---', goodUnitsHeight)
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { dateFormat } = useSelector((state) => state.dateFormat);
    const [pdfOpen, setPdfOpen] = useState(false);
    const [printedUnits, setPrintedUnits] = useState([]);

    const handlePrintCompatability = () => {
        history.push('/dashboard/compatability-slip')
    }

    const handleCompatabilityPDF = (unit) => {
        console.log('pdffff---', unit)
        let pdf = {
            recipientId: unit?.refSku?.recipientId,
            refskuId: unit?.refSku?._id
        }
        dispatch(compatabilityPdfSlip(pdf))
        setPdfOpen(true)
        setPrintedUnits(prevState => [...prevState, unit?.refSku?._id])
    }
    const handleClose = () => {
        setPdfOpen(false)
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        setActiveStep(0)
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handlePrintNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps?.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        console.log('NewActive:', newActiveStep);
        setActiveStep(newActiveStep);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
    useEffect(() => {
        socket?.on('deviceActivity', (data) => {
            console.log("data--", data)
            let sessionData = data?.sessionData?.faulty?.find((obj) => obj.type)
            setFaulty(sessionData?.type)
            console.log('sess---', sessionData)


        });

    }, [socket]);

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
    return (
        <>


            <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={() => handleNext(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === 0 && (
                        <React.Fragment>
                           
                            <GoodUnit />

                        </React.Fragment>
                    )}

                    {activeStep === 1 && (
                        <React.Fragment>
                            <Typography variant="body1">
                                PDF Slip
                            </Typography>
                            <Grid container>
                                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', padding: '15px' }}>
                                    <CustomButton variant="contained" onClick={handleClose}>
                                        Cancel
                                    </CustomButton>
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
                                    <CustomButton variant="contained" color="primary"
                                        onClick={handlePrintNext}
                                    >
                                        Print
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )}
                    {activeStep === 2 && (
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
                                                <RfidValidation />
                                            </Grid>
                                        </List>
                                    </TabPanel>
                                    <TabPanel index={1} value={activeTab}>
                                        <List dense={false}>
                                            <Grid container direction="row" justify="space-between" alignItems="center">
                                                <BarcodeValidation />
                                            </Grid>
                                        </List>
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )}

                    {/*<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>*/}
                    {/*    <Button*/}
                    {/*        color="inherit"*/}
                    {/*        disabled={activeStep === 0}*/}
                    {/*        onClick={handleBack}*/}
                    {/*        sx={{ mr: 1 }}*/}
                    {/*    >*/}
                    {/*        Back*/}
                    {/*    </Button>*/}
                    {/*    <Box sx={{ flex: '1 1 auto' }} />*/}
                    {/*    */}{/*<Button onClick={handleNext} sx={{ mr: 1 }}>*/}
                    {/*    */}{/*    Next*/}
                    {/*    */}{/*</Button>*/}

                    {/*    <CustomButton onClick={completedSteps} variant="contained" color="primary" disabled={activeStep === 2 ? false : true}>*/}
                    {/*        Complete Step*/}
                    {/*    </CustomButton>*/}
                    {/*</Box>*/}

                </div>
            </Box>


        </>

    );
};

export default Compatibilityslip;
