import React from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { alertStyles } from './alert.style';
import {
    Cancel as CancelIcon,
    Info as InfoIcon,
    Error as ErrorIcon,
    Warning as WarningIcon,
    CheckCircle as CheckCircleIcon
} from '@material-ui/icons';

function Alert(props) {
    return <MuiAlert elevation={6} {...props} />;
}

const AlertComponent = (props) => {
    const { open, onClose, message, duration, vertical, horizontal, color, bgColor, severity, actions } = props;

    const classes = alertStyles();
    return (
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={duration} onClose={onClose}>
            <Alert
                style={{ fontWeight: 'bold', color: color, backgroundColor: bgColor, padding: 10 }}
                icon={
                    severity === 'success' ? (
                        <CheckCircleIcon className={classes.iconClass} />
                    ) : severity === 'warning' ? (
                        <WarningIcon className={classes.iconClass} />
                    ) : severity === 'error' ? (
                        <ErrorIcon className={classes.iconClass} />
                    ) : severity === 'info' ? (
                        <InfoIcon className={classes.iconClass} />
                    ) : null
                }
                severity={severity}
                action={
                    actions ? (
                        <IconButton
                            className={classes.closeIcon}
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            <CancelIcon fontSize="inherit" />
                        </IconButton>
                    ) : (
                        ''
                    )
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertComponent;
