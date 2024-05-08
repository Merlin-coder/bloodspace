import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';

// or
import { DialogTitle, Grid, makeStyles, Typography } from '@material-ui/core';
import { CONSTANTS } from 'common';
import ErrorIcon from '@material-ui/icons/Error';

//import { CustomButtonStyles } from '../button/style';

const ConfirmationDialog = ({
    dialogOpen,
    handleDialogClose,
    children,
    title,
    deleteLabel,
    error,
    titleColor,
    noPadding
}) => {
    //const classes = CustomButtonStyles();

    const useStyles = makeStyles((theme) => ({
        typographyRed: {
            fontWeight: 400,
            textAlign: 'center',
            color: theme.palette.colors.red
        },
        typographyGray: {
            fontWeight: 400,
            textAlign: 'center',
            color: theme.palette.colors.gray.veryDarkGray
        },
        errorContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 204, 204,0.4)',
            marginLeft: 30,
            padding: 5,
            borderRadius: 5,
            width: 500
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
            open={dialogOpen}
            onClose={handleDialogClose}
            maxWidth="sm"
            PaperProps={{
                style: {
                    borderRadius: '10px',
                    backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                    padding: !noPadding && '20px 0px'
                }
            }}
        >
            <DialogTitle>
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <Typography
                            variant="h5"
                            className={deleteLabel ? classes.typographyRed : classes.typographyGray}
                            style={{ color: titleColor ? titleColor : null }}
                        >
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>

            <DialogContent>{children}</DialogContent>
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

export default ConfirmationDialog;
