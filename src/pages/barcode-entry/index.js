import { Card, Grid, Paper, Typography } from '@material-ui/core';
import { CustomButton } from 'common';
import React, { useEffect, useState } from 'react';
import { useStyles } from './style';
import MoveIn from '../movein';
import Batch from '../batch';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, useHistory, Route } from 'react-router-dom';
import CountUp from 'react-countup';

const BarcodeEntry = (props) => {
    const history = useHistory();
    const [isHoveredUnits, setIsHoveredUnits] = useState(false);
    const [isHoveredBatch, setIsHoveredBatch] = useState(false);
    const [isHoveredMoveIn, setIsHoveredMoveIn] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isHoveredMoveOut, setIsHoveredMoveOut] = useState(false);
    const classes = useStyles();

    //const handleCardClick = () => {
    //    history.push('/dashboard/barcode-entry/movein');
    //};

    //const handleCardClic = () => {
    //    history.push('/dashboard/barcode-entry/batch');
    //};

    const handleOptionSelect = (option) => {
        console.log('optttt',option)
        setSelectedOption(option);
    };

    const handleCardClick = (value) => {
        console.log('value---',value)
        if (selectedOption === 'Units' && value === 'movein' ) {
            history.push('/dashboard/barcode-entry/movein');
        }
        else if (selectedOption === 'Units' && value === 'moveout') {
            history.push('/dashboard/barcode-entry/moveout');
        }
        else if (selectedOption === 'Batch') {
            history.push('/dashboard/barcode-entry/batch');
        }
        else {
            alert('Please choose UNIT or BATCH');
        }
    };

    return (
        <>
            <Grid
                container
                style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', alignItems: 'center' }}
            >
                <Grid item xs={4}>
                    <Paper elevation={3} style={{ backgroundColor: 'lightblue' }}>
                        <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="h4">
                            PLEASE SELECT UNIT OR BATCH
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4} className={classes.firstDiv}>
                    <Card
                        className={`${classes.smalldetailCardMain} ${isHoveredUnits ? classes.hoveredCard : ''}`}
                        onMouseEnter={() => setIsHoveredUnits(true)}
                        onMouseLeave={() => setIsHoveredUnits(false)}
                        onClick={()=>handleOptionSelect('Units')}
                    >
                        <div
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                        >
                            <Typography style={{ paddingTop: '110px' }} variant="h5">
                                UNITS
                            </Typography>
                        </div>
                    </Card>
                </Grid>

                <Grid item xs={4} className={classes.firstDiv}>
                    <Card
                        className={`${classes.smalldetailCardMain} ${isHoveredBatch ? classes.hoveredCard : ''}`}
                        onMouseEnter={() => setIsHoveredBatch(true)}
                        onMouseLeave={() => setIsHoveredBatch(false)}
                        onClick={()=>handleOptionSelect("Batch")}
                    >
                        <div
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                        >
                            <Typography style={{ paddingTop: '110px' }} variant="h5">
                                BATCHES
                            </Typography>
                        </div>
                    </Card>
                </Grid>
            </Grid>

            <Grid
                container
                style={{ display: 'flex', paddingTop: '20px', justifyContent: 'center', alignItems: 'center' }}
            >
                <Grid item xs={4}>
                    <Paper elevation={3} style={{ backgroundColor: 'lightblue' }}>
                        <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="h4">
                            PLEASE SELECT AN ACTION
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4} className={classes.firstDiv}>
                    <Card
                        className={`${classes.smalldetailCardMain} ${isHoveredMoveIn ? classes.hoveredCard : ''}`}
                        onMouseEnter={() => setIsHoveredMoveIn(true)}
                        onMouseLeave={() => setIsHoveredMoveIn(false)}
                        onClick={()=>handleCardClick('movein')}
                       
                    >
                        <div
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                        >
                            <Typography style={{ paddingTop: '110px' }} variant="h5">
                                MOVE IN
                            </Typography>
                        </div>
                    </Card>
                </Grid>

                <Grid item xs={4} className={classes.firstDiv}>
                    <Card
                        className={`${classes.smalldetailCardMain} ${isHoveredMoveOut ? classes.hoveredCard : ''}`}
                        onMouseEnter={() => setIsHoveredMoveOut(true)}
                        onMouseLeave={() => setIsHoveredMoveOut(false)}
                        onClick={() => handleCardClick('moveout')}
                    >
                        <div
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                        >
                            <Typography style={{ paddingTop: '110px' }} variant="h5">
                                MOVE OUT
                            </Typography>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default BarcodeEntry;
