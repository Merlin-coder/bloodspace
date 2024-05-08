import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputLabel,
    makeStyles,
    Typography
} from '@material-ui/core';
import { CONSTANTS, CustomButton } from 'common';
import React, { useState } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import { useDispatch } from 'react-redux';
import { postFormData } from 'redux/actions';
import { CustomInput } from 'components';

const NewUserAccessRole = (props) => {
    const dispatch = useDispatch();
    const { open, error, handleAddUserRole } = props;

    const useStyles = makeStyles(() => ({
        typoGraphy: {
            fontWeight: 600,
            textTransform: 'capitalize',
            marginBottom: 10,
            fontSize: 18
        },
        content: {
            minHeight: 140
        },
        errorContainer: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 204, 204,0.4)',
            marginLeft: 20,
            padding: 5,
            borderRadius: 5
        },
        errorIcon: {
            color: '#b33939',
            fontSize: 'small'
        },
        errorMessage: {
            color: '#b33939',
            marginLeft: 10,
            fontWeight: 500
        }
    }));

    const classes = useStyles();

    const [userRoleName, setUserRoleName] = useState('');
    const [userRoleDescription, setUserRoleDescription] = useState('');

    const handleSaveUserRole = () => {
        let newValidData = userRoleDescription
            ? { name: userRoleName, description: userRoleDescription }
            : { name: userRoleName };

        let requestBody = {
            collectionName: 'useraccessrole',
            validData: newValidData
        };
        dispatch(postFormData(requestBody));
    };

    return (
        <Dialog
            open={open}
            maxWidth="lg"
            style={{ marginTop: 30 }}
            PaperProps={{
                style: {
                    borderRadius: '10px',
                    backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                    padding: 15,
                    width: '50%'
                }
            }}
        >
            <DialogTitle color="primary">
                <Grid container justify="space-between">
                    <Typography color="primary" variant="h5" className={classes.typoGraphy}>
                        {' '}
                        Add User Role{' '}
                    </Typography>
                </Grid>
            </DialogTitle>

            <DialogContent className={classes.content}>
                <Grid>
                    <Grid container spacing={2} direction={'row'}>
                        <Grid item xs={12} md={6} lg={6}>
                            <InputLabel style={{ marginBottom: 10 }}>Name</InputLabel>
                            <CustomInput
                                value={userRoleName}
                                onChange={(e) => setUserRoleName(e.target.value)}
                                fullWidth
                                style={{ width: 300 }}
                                size="lg"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <InputLabel style={{ marginBottom: 10 }}>Description</InputLabel>
                            <CustomInput
                                value={userRoleDescription}
                                onChange={(e) => setUserRoleDescription(e.target.value)}
                                fullWidth
                                style={{ width: 300 }}
                                size="lg"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <CustomButton variant="outlined" color="primary" onClick={handleAddUserRole}>
                    {'Cancel'}
                </CustomButton>
                <CustomButton variant="contained" disabled={!userRoleName} color="primary" onClick={handleSaveUserRole}>
                    {'Save'}
                </CustomButton>
            </DialogActions>
        </Dialog>
    );
};

export default NewUserAccessRole;
