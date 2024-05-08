import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';

// or
import { Card, DialogTitle, Grid, makeStyles, Typography } from '@material-ui/core';
import { CONSTANTS } from 'common';
import ErrorIcon from '@material-ui/icons/Error';

//import { CustomButtonStyles } from '../button/style';

const ReportFilter = ({ pageFilter, setPageFilter }) => {
    const useStyles = makeStyles((theme) => ({
        typography: {
            fontWeight: 500,
            textAlign: 'center',
            color: theme.palette.primary.main
        },
        typographySelected: {
            fontWeight: 500,
            textAlign: 'center',
            color: '#fff'
        },
        box: {
            width: 100,
            // backgroundColor: theme.palette.
            height: 10
        },
        root: {
            width: 80,
            height: 40,
            padding: 10,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            cursor: 'pointer',
            border: `1px solid ${theme.palette.primary.main}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        selectedRoot: {
            width: 80,
            height: 40,
            padding: 10,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            cursor: 'pointer',
            border: `1px solid ${theme.palette.primary.main}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.primary.main
        }
    }));
    const classes = useStyles();
    return (
        <Grid container justify="flex-end" alignItems="center">
            {/*<Grid item className={classes.box}>*/}
            {/*    <Card*/}
            {/*        className={pageFilter === 'All' ? classes.selectedRoot : classes.root}*/}
            {/*        onClick={() => {*/}
            {/*            setPageFilter('All');*/}
            {/*            localStorage.setItem('page', 'All');*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <Typography className={pageFilter === 'All' ? classes.typographySelected : classes.typography}>*/}
            {/*            All*/}
            {/*        </Typography>*/}
            {/*    </Card>*/}
            {/*</Grid>*/}
            <Grid item className={classes.box}>
                <Card
                    onClick={() => {
                        setPageFilter('Unit');
                        localStorage.setItem('page', 'Unit');
                    }}
                    className={pageFilter === 'Unit' ? classes.selectedRoot : classes.root}
                >
                    <Typography className={pageFilter === 'Unit' ? classes.typographySelected : classes.typography}>
                        Units
                    </Typography>
                </Card>
            </Grid>
            <Grid item className={classes.box}>
                <Card
                    onClick={() => {
                        setPageFilter('Batch');
                        localStorage.setItem('page', 'Batch');
                    }}
                    className={pageFilter === 'Batch' ? classes.selectedRoot : classes.root}
                >
                    <Typography className={pageFilter === 'Batch' ? classes.typographySelected : classes.typography}>
                        Batches
                    </Typography>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ReportFilter;
