import { Button, Card, CardContent, CardMedia, Divider, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './style';
import timer from './timer.svg';
const Subscription = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={4}>
            <Grid container justify="center">
                <Grid className={classes.leftPaper}>
                    <Grid
                        container
                        spacing={1}
                        className={classes.coontetnContainer}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography variant="subtitle2" className={classes.number}>
                                1
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" className={classes.description}>
                                Account
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        className={classes.coontetnContainer}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography variant="subtitle2" className={classes.number}>
                                2
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" className={classes.description}>
                                Confirmation
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        className={classes.coontetnContainer}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography variant="subtitle2" className={classes.number}>
                                3
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" className={classes.description}>
                                Choose Plan
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
            <Grid container className={classes.textContainer}>
                <Grid container justify="center">
                    <Typography color="primary" className={classes.choosePlan} variant="h5">
                        Choose your plan
                    </Typography>

                    <Grid container justify="center">
                        <Typography className={classes.choosePlanDesc} variant="subtitle1">
                            Select one of our option from below for peice of mind of your own
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container justify="center">
                <div className={classes.priceCardContainer}>
                    <Paper elevation={0} className={classes.card}>
                        <CardMedia className={classes.media} image={timer} />
                        <CardContent className={classes.content}>
                            <Typography className={'MuiTypography--heading'} variant={'h6'} gutterBottom>
                                Pay as you go
                            </Typography>
                            <Grid item className={classes.priceMin}>
                                <Typography color="primary" display="inline" variant="h5">
                                    50$
                                </Typography>
                                <Typography className={classes.description} display="inline" variant="subtitle1">
                                    /30 min
                                </Typography>
                            </Grid>
                            <Grid item className={classes.features}>
                                <Typography className={classes.featuresText}>No Subscription Required</Typography>
                                <Divider className={classes.textDivider} />
                                <Typography className={classes.featuresText}>First Available Trainer</Typography>
                            </Grid>
                            <Button color="primary" variant="contained" className={classes.button}>
                                Pick Plan
                            </Button>
                        </CardContent>
                    </Paper>
                    <Paper elevation={0} className={classes.card}>
                        <CardMedia className={classes.media} image={timer} />
                        <CardContent className={classes.content}>
                            <Typography className={'MuiTypography--heading'} variant={'h6'} gutterBottom>
                                Pay as you go
                            </Typography>
                            <Grid item className={classes.priceMin}>
                                <Typography color="primary" display="inline" variant="h5">
                                    50$
                                </Typography>
                                <Typography className={classes.featuresText} display="inline" variant="subtitle1">
                                    /30 min
                                </Typography>
                            </Grid>
                            <Grid item className={classes.features}>
                                <Typography className={classes.featuresText}>No Subscription Required</Typography>
                                <Divider className={classes.textDivider} />
                                <Typography className={classes.featuresText}>First Available Trainer</Typography>
                            </Grid>
                            <Button color="primary" variant="contained" className={classes.button}>
                                Pick Plan
                            </Button>
                        </CardContent>
                    </Paper>
                    <Paper elevation={0} className={classes.card}>
                        <CardMedia className={classes.media} image={timer} />
                        <CardContent className={classes.content}>
                            <Typography className={'MuiTypography--heading'} variant={'h6'} gutterBottom>
                                Pay as you go
                            </Typography>
                            <Grid item className={classes.priceMin}>
                                <Typography color="primary" display="inline" variant="h5">
                                    50$
                                </Typography>
                                <Typography className={classes.description} display="inline" variant="subtitle1">
                                    /30 min
                                </Typography>
                            </Grid>
                            <Grid item className={classes.features}>
                                <Typography className={classes.featuresText}>No Subscription Required</Typography>
                                <Divider className={classes.textDivider} />
                                <Typography className={classes.featuresText}>First Available Trainer</Typography>
                            </Grid>
                            <Button color="primary" variant="contained" className={classes.button}>
                                Pick Plan
                            </Button>
                        </CardContent>
                    </Paper>
                </div>
            </Grid>
        </Grid>
    );
};

export default Subscription;
