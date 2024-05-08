import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import { CONSTANTS, CustomButton } from 'common';
import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';

const UnitEditDialog = (props) => {
    const { open, onClose, title, children, onCancelClick, onSaveClick, disabled, loading, error, isBatch } = props;

    const useStyles = makeStyles(() => ({
        typoGraphy: {
            fontWeight: 600,
            textTransform: 'capitalize',
            marginBottom: 10
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
                    minWidth: isBatch ? '900px' : '1250px',
                    height: isBatch ? '500px' : '640px'
                }
            }}
            onClose={onClose}
        >
            <DialogTitle>
                <Grid container justify="space-between">
                    <Typography color="primary" variant="h5" className={classes.typoGraphy}>
                        {title}
                    </Typography>
                </Grid>
            </DialogTitle>
            <DialogContent className={classes.content}>{children}</DialogContent>

            <DialogActions style={{ marginTop: 7, marginRight: 20 }}>
                <CustomButton onClick={onCancelClick} variant="outlined" color="primary">
                    {CONSTANTS.CANCEL}
                </CustomButton>
                <CustomButton disabled={disabled} variant="contained" color="primary" onClick={onSaveClick}>
                    {loading ? <CircularProgress color="white" size="20px" /> : CONSTANTS.SAVE}
                </CustomButton>
            </DialogActions>

            {error && (
                <div className={classes.errorContainer}>
                    <ErrorIcon className={classes.errorIcon} />
                    <Typography variant="body2" className={classes.errorMessage}>
                        {error}
                    </Typography>
                </div>
            )}
        </Dialog>
    );
};

export default UnitEditDialog;
