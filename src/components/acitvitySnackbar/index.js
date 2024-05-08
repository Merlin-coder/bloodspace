import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import { IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiSnackbarContent-root': {
            color: '#31902D !important',
            backgroundColor: '#ECFAEC !important'
        }
    }
}));

function GrowTransition(props) {
    return <Grow {...props} />;
}

export default function ActivitySnackBar({ state, setState }) {
    const classes = useStyles();
    const handleClick = (Transition) => () => {
        setState({
            open: true,
            Transition: function SlideTransition(props) {
                return <Slide {...props} direction="up" />;
            },
            message: ''
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
            message: ''
        });
    };

    return (
        <div>
            <Snackbar
                open={state.open}
                className={classes.root}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                message={state.message}
                autoHideDuration={6000}
                key={state.Transition.name}
                // bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
                action={
                    <React.Fragment>
                        <IconButton aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}
