import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Tooltip,
    Typography,
    useTheme
} from '@material-ui/core';
import { CONSTANTS, CustomButton } from 'common';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import ErrorIcon from '@material-ui/icons/Error';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

const CustomDialog = (props) => {
    const {
        open,
        onClose,
        title,
        children,
        onCancelClick,
        onNextClick,
        onCompleteClick,
        onSaveClick,
        isSave,
        disabled,
        editDetails,
        setInputDisabled,
        inputDisabled,
        tabIndex,
        isDisplayConfig,
        loading,
        ruleType,
        error,
        nextClick,
        minWidth,
        isDelete,
        isOk,
        isClose,
        isInfo,
        headerIcon,
        screen
    } = props;
    const theme = useTheme();

    const useStyles = makeStyles(() => ({
        typoGraphy: {
            fontWeight: 600,
            textTransform: 'capitalize',
            marginBottom: 10
        },
        content: {
            minHeight: 100
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
            maxWidth="md"
            PaperProps={{
                style: {
                    borderRadius: '10px',
                    backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                    padding: 20,
                    minWidth: minWidth || '950px'
                }
            }}
            onClose={onClose}
        >
            <DialogTitle>
                <Grid container direction={'row'}>
                    <Typography color="primary" variant="h5" className={classes.typoGraphy}>
                        {headerIcon === 'actionRequired' ? (
                            <IconButton color="primary">
                                {' '}
                                <SubdirectoryArrowRightIcon />
                            </IconButton>
                        ) : null}
                        {title}
                    </Typography>
                </Grid>
                {isClose && <Divider variant="fullWidth" orientation="horizontal" />}
            </DialogTitle>
            <DialogContent className={isDelete || classes.content}>{children}</DialogContent>
            {isInfo ? null : tabIndex !== 1 ? (
                <>
                    {isDisplayConfig ? (
                        <>
                            <DialogActions style={{ marginTop: 15, marginRight: 20 }}>
                                <CustomButton onClick={onCancelClick} variant="outlined" color="primary">
                                    {CONSTANTS.CANCEL}
                                </CustomButton>
                                <CustomButton
                                    disabled={disabled}
                                    variant="contained"
                                    color="primary"
                                    onClick={onSaveClick}
                                >
                                    {loading ? <CircularProgress color="white" size="20px" /> : 'Apply'}
                                </CustomButton>
                            </DialogActions>
                        </>
                    ) : (
                        <DialogActions style={{ marginTop: isDelete || 10, marginRight: 20 }}>
                            <CustomButton onClick={onCancelClick} variant="outlined" color="primary">
                                {CONSTANTS.CANCEL}
                            </CustomButton>

                            {isSave || isOk ? null : (
                                <CustomButton
                                    disabled={disabled}
                                    variant="contained"
                                    color="primary"
                                    onClick={onNextClick}
                                >
                                    {ruleType ? (
                                        `Next ${ruleType}`
                                    ) : loading && nextClick ? (
                                        <CircularProgress color="white" size="20px" />
                                    ) : (
                                        CONSTANTS.NEXT_RECORD
                                    )}
                                </CustomButton>
                            )}
                            {isSave ? (
                                <CustomButton
                                    disabled={disabled}
                                    variant="contained"
                                    color={isDelete ? '#d11a2a' : 'primary'}
                                    onClick={onSaveClick}
                                    type="submit"
                                >
                                    {isDelete ? (
                                        <Typography style={{ color: '#ffffff' }}>Delete</Typography>
                                    ) : loading ? (
                                        <CircularProgress color="white" size="20px" />
                                    ) : (
                                        CONSTANTS.SAVE
                                    )}
                                </CustomButton>
                            ) : (
                                <CustomButton
                                    disabled={disabled}
                                    variant="contained"
                                    color="primary"
                                    onClick={onCompleteClick}
                                >
                                    {loading && !nextClick ? (
                                        <CircularProgress color="white" size="20px" />
                                    ) : (
                                        CONSTANTS.COMPLETE
                                    )}
                                </CustomButton>
                            )}
                        </DialogActions>
                    )}
                </>
            ) : isOk ? (
                <>
                    <DialogActions style={{ marginTop: 7, marginRight: 20 }}>
                        <CustomButton disabled={disabled} variant="contained" color="primary" onClick={onSaveClick}>
                            {'OK'}
                        </CustomButton>
                    </DialogActions>
                </>
            ) : isClose ? (
                <>
                    <DialogActions style={{ marginTop: 7, marginRight: 130 }}>
                        <CustomButton disabled={disabled} variant="contained" color="primary" onClick={onClose}>
                            {'OK'}
                        </CustomButton>
                    </DialogActions>
                </>
            ) : (
                <>
                    <DialogActions style={{ marginTop: 7, marginRight: 20 }}>
                        {!isOk && (
                            <CustomButton onClick={onCancelClick} variant="outlined" color="primary">
                                {CONSTANTS.CANCEL}
                            </CustomButton>
                        )}
                        <CustomButton disabled={disabled} variant="contained" color="primary" onClick={onSaveClick}>
                            {loading ? <CircularProgress color="white" size="20px" /> : isOk ? 'Ok' : CONSTANTS.SAVE}
                        </CustomButton>
                    </DialogActions>
                </>
            )}
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

export default CustomDialog;
