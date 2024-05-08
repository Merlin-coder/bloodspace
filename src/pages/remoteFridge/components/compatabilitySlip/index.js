import { Paper } from '@material-ui/core';
import { MovableTab } from 'common';
import React, { useEffect, useState } from 'react';
import RfidValidation from '../rfidvalidation';
import BarcodeValidation from '../barcodevalidation';
import { useDispatch, useSelector } from 'react-redux';
import { getRuleType } from 'redux/actions/manage/rulePageAction';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { useStyles, tabStyle } from 'components/tab/tab.style';

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

const CompatabilityslipValidation = ({ accessableCodes, handleDeviceExit }) => {
    //console.log('loadunload---', accessableCodes)
    //const classes = useStyles();
    //    const socket = useSelector((state) => state.socketReducer.socket);
    //const [activeTab, setActiveTab] = useState('Load');
    //const [faulty, setFaulty] = useState()
    //const dispatch = useDispatch();
    //console.log('soooooo', socket)
    //const tabList = ['Load', 'Un Load'];
    //const [tabPanelItem, setTabPanelItem] = useState([]);

    //const [isTabOpen, setIsTabOpen] = useState(false);
    //const [tabPosition, setTabPosition] = useState({ x: 20, y: window.innerHeight - 120 }); // Initial position
    //const [isLoaded, setIsLoaded] = useState(false);
    //const [isUnloaded, setIsUnloaded] = useState(false)


    //useEffect(() => {
    //    socket?.on('deviceActivity', (data) => {
    //        console.log("data--", data)
    //        let sessionData = data?.sessionData?.faulty?.find((obj) => obj.type)
    //        setFaulty(sessionData?.type)
    //        console.log('sess---', sessionData)


    //    });

    //}, [socket]);

    //console.log('faulty---', faulty)

    //useEffect(() => {
    //    if (faulty === 'load') {
    //        setIsLoaded(true);
    //    }
    //    else if (faulty === 'unload') {
    //        setIsUnloaded(true)
    //    }
    //}, [faulty]);


    //const toggleTab = () => {
    //    setIsTabOpen(!isTabOpen);
    //};

    //const handleDragStart = (event) => {
    //    event.dataTransfer.setData('text/plain', ''); // Required for Firefox to drag
    //};

    //const handleDrag = (event) => {
    //    setTabPosition({
    //        x: window.innerWidth - event.clientX,
    //        y: window.innerHeight - event.clientY
    //    });
    //};

    //const tabStyle = {
    //    right: `${tabPosition.x}px`,
    //    bottom: `${tabPosition.y}px`
    //};

    //const handleLoad = () => {
    //    setIsLoaded(true);
    //    setIsUnloaded(false);
    //};

    //const handleUnload = () => {
    //    setIsUnloaded(true);
    //    setIsLoaded(false);
    //};

    //let content;
    //useEffect(() => {

    //    if (isLoaded) {
    //        content = <LoadTab accessableCodes={accessableCodes} handleDeviceExit={handleDeviceExit} />;
    //    } else if (isUnloaded) {
    //        content = <BulkUnload accessableCodes={accessableCodes} handleDeviceExit={handleDeviceExit} />;
    //    }
    //}, [isLoaded, isUnloaded])


    //return (
    //    <div id="tabContainer" style={tabStyle}>
    //        <div id="tabHandle" draggable="true" onDragStart={handleDragStart} onDrag={handleDrag} onClick={toggleTab}>
    //            Tab
    //        </div>
    //        {isTabOpen && (
    //            <div id="tabActions">
    //                <button className={isLoaded ? classes.loaded : null} onClick={handleLoad}>Load</button>
    //                <button className={isUnloaded ? classes.unloaded : null} onClick={handleUnload}>Unload</button>
    //            </div>
    //        )}
    //        {content}
    //    </div>
    //);
    const classesTab = tabStyle();
    const classes = useStyles();
    const socket = useSelector((state) => state.socketReducer.socket);
    const [activeTab, setActiveTab] = useState(0);
    const [faulty, setFaulty] = useState()
    const dispatch = useDispatch();
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

    const tabPanelItemObj = {
        "Load": <RfidValidation accessableCodes={accessableCodes} handleDeviceExit={handleDeviceExit} />,
        "UnLoad": <BarcodeValidation accessableCodes={accessableCodes} handleDeviceExit={handleDeviceExit} />
    };

    //if (faulty === 'load') {
    //    tabPanelItemObj['Load'] = <BulkLoading accessableCodes={accessableCodes} handleDeviceExit={handleDeviceExit} />;
    //} else if (faulty === 'unload') {
    //    tabPanelItemObj['UnLoad'] = <BulkUnload accessableCodes={accessableCodes} handleDeviceExit={handleDeviceExit} />;
    //}

    return (
        <>
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    <Tabs onChange={(e, value) => setActiveTab(value)} value={activeTab}>
                        {tabList.map((tab, index) =>
                            <Tab key={index} {...a11yProps(index)} label={tab} value={index} className={activeTab === index ? classesTab.tab1 : classesTab.tab2} />)}
                    </Tabs>
                    <TabPanel index={0} value={activeTab}>
                        <List dense={false}>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <RfidValidation accessableCodes={accessableCodes} handleDeviceExit={handleDeviceExit} />
                            </Grid>
                        </List>
                    </TabPanel>
                    <TabPanel index={1} value={activeTab}>
                        <List dense={false}>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <BarcodeValidation accessableCodes={accessableCodes} handleDeviceExit={handleDeviceExit} />
                            </Grid>
                        </List>
                    </TabPanel>
                </Grid>
            </Grid>
        </>
    );
};

export default CompatabilityslipValidation;