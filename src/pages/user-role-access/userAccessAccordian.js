import { Grid, Paper, makeStyles } from '@material-ui/core';
import React from 'react';
import UserAccessTable from './userAccessTable';

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
});
const UserAccessAccordian = (props) => {
    const classes = useStyles();
    const { columns, rows, handleCheckBox, label, handlefullMenuCheck } = props;

    return (
        <Paper
            elevation={0}
            className={classes.root}
            style={{
                marginTop: 15,
                padding: '20px 40px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19)'
            }}
        >
            <Grid container spacing={8} direction={'column'}>
                <Grid item xs>
                    <Grid container item spacing={2} direction={'column'}>
                        <Grid item xs>
                            <UserAccessTable
                                rows={rows}
                                columns={columns}
                                handleCheckBox={handleCheckBox}
                                label={label}
                                handlefullMenuCheck={handlefullMenuCheck}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserAccessAccordian;
