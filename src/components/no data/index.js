import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import noData from '../../assets/nodata.png';
import { useStyles } from './style';

const NoData = () => {
    const classes = useStyles();
    return (
        <Grid align="center" className={classes.container}>
            <img src={noData} className={classes.img} />
            <Typography color="primary" variant="subtitle1" className={classes.typography}>
                No records found.
            </Typography>
        </Grid>
    );
};

export default NoData;
