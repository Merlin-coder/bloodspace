import React, { useEffect } from 'react';
import { Grid, Card, Typography } from '@material-ui/core';
import OpacityIcon from '@material-ui/icons/Opacity';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { getDashCount } from 'redux/actions';
import { useStyles } from './style';

const UnitDashboard = () => {
    const bloodTypes = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
    const classes = useStyles();
    const dispatch = useDispatch();
    const bloodCounts = useSelector(state => state.bloodCounts);
      console.log("bloodCounts:", bloodCounts)
    useEffect(() => {
        dispatch(getDashCount());
    }, [dispatch]);

    const bloodCountMap = {};
    bloodCounts?.data?.forEach(({ symbol, count }) => {
        bloodCountMap[symbol] = count;
    });

    return (
        <Grid container spacing={2}>
            {bloodTypes.map((bloodType, index) => (
                <Grid item xs={3} key={index}>
                    <Card style={{ height: '170px', width: '340px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <table className="table">
                                    <Typography className={classes.iconValue} color="error">
                                        <CountUp start={0} end={bloodCountMap[bloodType] || 0} duration={3} />
                                    </Typography>
                                </table>
                            </div>
                            <div>
                                <table className="table">
                                    <tr style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
                                        <td style={{ fontSize: '30px' }}>{bloodType}</td>
                                        <OpacityIcon color="error" style={{ width: '30px', height: '30px' }} />
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default UnitDashboard;
