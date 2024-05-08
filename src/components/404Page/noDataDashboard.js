import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import pageNotFoundImg from '../../assets/nodatadashboard.png';
import { CONSTANTS, CustomButton } from 'common';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { openDrawerAction } from 'redux/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: '60%',
        marginTop: '10%',
        margin: '0 auto',
        alignItems: 'center',
        'background-color':'dee2ed',
        gap: '-20px'
    },
    typoGraphy: {
        fontWeight: '390',
        color: theme.palette.primary.main,
        'letter-spacing':'0.090em',
        marginLeft: -95,
        marginTop: 10
    },
    typoGraphySub: {
        color: theme.palette.primary.main,
        fontWeight: '300',
        marginLeft: -95,
        marginTop: 50
    },
    image: {
        width: '160%',
        marginLeft: '20%'
    },
    mainHeading: {
        width: '65%'
    },
    gridImage: {
        width: '35%',
        marginLeft: 0
    },
    backBtn: {
        marginTop: 40,
        marginLeft: -120
    },
    callAccessBtn: {
        marginTop: 40
    },
    accessSub: {
        color: theme.palette.label.main,
        marginTop: 10
    }
}));
const NoDashboardData = () => {
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.mainContainer} >
                <Grid item className={classes.mainHeading}>
                    <Typography variant="h4" className={classes.typoGraphy}>
                        Not enough data to generate
                    </Typography>
                    <Typography variant="h4" className={classes.typoGraphy}>
                        graphs and Charts.
                    </Typography>
                    <Typography variant="h5" className={classes.typoGraphySub}>
                        Start associating units and come back later
                    </Typography>
                </Grid>
                <Grid item className={classes.gridImage} align="center">
                    <img src={pageNotFoundImg} alt="notFound" className={classes.image} />
                </Grid>
            </Grid>
        </>
    );
};

export default NoDashboardData;
