import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import pageNotFoundImg from '../../assets/404.svg';
import warn from '../../assets/warning.png';
import { CONSTANTS, CustomButton } from 'common';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { openDrawerAction } from 'redux/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: '55%',
        margin: '0 auto',
        alignItems: 'center',
        gap: '-20px',
        marginLeft: 550,
        marginTop: 100
    },
    typoGraphy: {
        fontWeight: 'bold',
        color: theme.palette.primary.main
    },
    typoGraphySub: {
        color: theme.palette.label.main,
        //marginL: -120,
        marginTop: 10

    },
    image: {
        width: '180%',
        marginLeft: '100'
    },
    mainHeading: {
        width: '40%'
    },
    gridImage: {
        width: '55%',
        marginLeft: -150
    },
    backBtn: {
        marginTop: 40,
        //marginLeft: -120
    },
    callAccessBtn: {
        marginTop: 40
    },
    accessSub: {
        color: theme.palette.label.main,
        marginTop: 10
    }
}));
const PageNotFound = (props) => {
    const { userRoleAccess, callAdminAccess } = props;
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleClick = () => {
        history.push('/dashboard');
    };

    const handleDrawer = () => {
        dispatch(openDrawerAction(true));
    };
    return (
        <>
            <Grid container className={classes.mainContainer} align="center">
                <Grid item className={classes.mainHeading}>
                       <Grid>
                    <img src={warn} style={{ display: 'block', margin: 'auto', width: '300px', height: '250px' }} alt="warn" />
                </Grid>
                    <Typography variant="h3" className={classes.typoGraphy}>
                        {CONSTANTS.IS_EMPTY}
                    </Typography>
                    <Typography variant="body2" className={userRoleAccess ? classes.accessSub : classes.typoGraphySub}>
                        {userRoleAccess ? 'Change User Role / Give New Access' : CONSTANTS.IS_EMPTY_SUBHEADING}
                    </Typography>
                    {userRoleAccess ? (
                        <div className={classes.callAccessBtn}>
                            <CustomButton variant="outlined" color="primary" onClick={callAdminAccess}>
                                Click to give Access
                            </CustomButton>
                        </div>
                    ) : location.pathname === '/dashboard' ? (
                        <div className={classes.backBtn}>
                            <CustomButton variant="outlined" color="primary" onClick={handleDrawer}>
                                Open Drawer
                            </CustomButton>
                        </div>
                    ) : (
                        <div className={classes.backBtn}>
                            <CustomButton variant="outlined" color="primary" onClick={handleClick}>
                                Back to Dashboard
                            </CustomButton>
                        </div>
                    )}
                </Grid>
                {/*<Grid item className={classes.gridImage}>*/}
                {/*    <img src={pageNotFoundImg} alt="notFound" className={classes.image} />*/}
                {/*</Grid>*/}
             
            </Grid>
        </>
    );
};

export default PageNotFound;
