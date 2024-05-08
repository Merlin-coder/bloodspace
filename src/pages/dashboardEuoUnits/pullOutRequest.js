import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    makeStyles,
    Tooltip,
    Typography
} from '@material-ui/core';
import FlareIcon from '@material-ui/icons/Flare';
import { CONSTANTS, CustomButton } from 'common';
import React, { useEffect, useState } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import CustomChip from 'components/chip';
import { useDispatch, useSelector } from 'react-redux';
import {
    ledSelection,
    refreshPullOutData,
    clearPullOutData,
    clearRefreshPullOutData,
    requestPulloutDialogOpen,
    pullOutCancelAction
} from 'redux/actions';
import { getRefskuData } from 'redux/actions/manage/scManageActions';
import NoData from 'components/no data';
import Loader from 'components/loader/loader.container';
import PullOutDialogTable from 'components/pull-out-request-table';

let pulledStaticIds = [];
let extraPulledStaticIds = [];
const PullOutDialog = (props) => {
    const socket = useSelector((state) => state.socketReducer.socket);
    const { pullOutLoading, pullOutSuccess, pullOutError } = useSelector((state) => state.postPullOutReducer);

    const { refreshPUlloutLoading, refreshPullOutSuccess, refreshPullOutError } = useSelector(
        (state) => state.refreshPullOut
    );
    const { refskuDataLoading, refskuDataSuccess, refskuDataError } = useSelector((state) => state.refskuTableData);
    // let staticPullOutId = JSON.parse(localStorage.getItem('selectionIdStatic'));
    const { pulloutId } = useSelector((state) => state.requestPulloutIDStore);
    const dispatch = useDispatch();
    const {
        open,
        response,
        displayConfig,
        disabled,
        loading,
        error,
        triggeredLedList,
        pullOutIdStatic,
        onCloseOfPullOutDialog,
        pullOutResponse,
        requestHistory
    } = props;

    console.log(pullOutResponse, 'pullOutResponse');

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
    const [selectedResponse, setSelectedResponse] = useState([]);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectedAllRecordsFlag, setSelectedAllRecordsFlag] = useState(false);
    const [pulledOutIds, setPulledOutIds] = useState([]);
    const [extraIds, setExtraIds] = useState([]);

    const handleSelect = (selRecords, flag, unSelected, againSelected) => {
        if (againSelected === true) {
            setSelectedRecords([...selRecords, unSelected]);
        } else if (unSelected !== undefined) {
            setSelectedRecords([...selRecords.filter((item) => item !== unSelected)]);
        } else {
            setSelectedRecords(selRecords);
        }
        setSelectedAllRecordsFlag(flag);
    };

    useEffect(() => {
        setPulledOutIds([]);
        setExtraIds([]);
        setSelectedResponse(response);
    }, [response]);
    useEffect(() => {
        dispatch(getRefskuData('refsku', 30, 1));
    }, []);

    useEffect(() => {
        console.log(pullOutResponse, 'inside socked', 'pulloutresponse');
        if (pullOutResponse?.status) {
            socket?.on('refresh', (data) => {
                let staticId = JSON.parse(localStorage.getItem('selectionIdStatic'));
                dispatch(refreshPullOutData(staticId));
            });
        } else if (pulloutId) {
            socket?.on('refresh', (data) => {
                dispatch(refreshPullOutData(pulloutId));
            });
        }
    }, [socket]);

    // useEffect(() => {}, [pullOutSuccess]);

    useEffect(() => {
        if (refreshPullOutSuccess?.status) {
            pulledStaticIds = refreshPullOutSuccess?.data?.listPulledOut?.map((item) => item?._id);
            let pulledExtraIds = refreshPullOutSuccess?.data?.listOfExtra?.map((item) => item?.donationCode);
            setPulledOutIds(pulledStaticIds);
            setExtraIds(pulledExtraIds);
        }
    }, [refreshPullOutSuccess]);

    const handleTriggerLed = () => {
        let tempValidData = selectedRecords.map((ele) => {
            return { refskuId: ele, 'track-code': 'BS-TR-5114', comments: 'trigger' };
        });
        let formData = {
            collectionName: 'activity',
            validData: tempValidData
        };
        dispatch(ledSelection(formData, true));
    };

    const handleSaveClick = () => {
        if (selectedRecords.length > 0) {
            setSelectedRecords([]);
        }
        localStorage.setItem('selectionIdStatic', '');
        dispatch(clearPullOutData());
        dispatch(clearRefreshPullOutData());
        setPulledOutIds([]);
        setExtraIds([]);
        pulledStaticIds = [];
        extraPulledStaticIds = [];
        dispatch(requestPulloutDialogOpen(false));
        onCloseOfPullOutDialog ? onCloseOfPullOutDialog() : null;
    };

    const handleCancelClick = () => {
        let tempPulledOutId = '';
        if (pullOutResponse?.status) {
            tempPulledOutId = JSON.parse(localStorage.getItem('selectionIdStatic'));
        } else {
            tempPulledOutId = pullOutIdStatic;
        }
        let formData = {
            collectionName: 'requestpullouts',
            validData: [
                {
                    _id: tempPulledOutId,
                    status: 'CANCEL'
                }
            ]
        };
        dispatch(pullOutCancelAction(JSON.stringify(formData)));
        handleSaveClick();
    };

    const classes = useStyles();

    console.log(pulledOutIds, refreshPullOutSuccess, 'refskuDataSuccess');

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
                    minWidth: '1250px',
                    height: '640px'
                }
            }}
        >
            <DialogTitle>
                <Grid container justify="space-between">
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography color="primary" variant="h6" className={classes.typoGraphy}>
                                    {`Pull out request: ${refreshPullOutSuccess
                                            ? refreshPullOutSuccess?.data?.requestNo
                                            : pullOutSuccess?.data?.requestNo || ''
                                        }`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography color="primary" variant="h6" className={classes.typoGraphy}>
                            {`Status:  ${pullOutSuccess
                                    ? pullOutSuccess?.data?.status || ''
                                    : refreshPullOutSuccess?.data?.status || ''
                                }`}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            {requestHistory ? null : (
                <Grid container style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <IconButton onClick={handleTriggerLed} disabled={selectedRecords.length === 0}>
                        <Tooltip title="Trigger LED">
                            <FlareIcon color={selectedRecords.length > 0 ? 'primary' : ''} />
                        </Tooltip>
                    </IconButton>
                </Grid>
            )}
            <DialogContent className={classes.content}>
                <>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            {refskuDataLoading ? (
                                <div className={classes.loaderDivStyles}>
                                    <Loader />
                                </div>
                            ) : refskuDataSuccess?.data?.length === 0 ? (
                                <NoData />
                            ) : refskuDataSuccess?.data?.length > 0 ? (
                                <PullOutDialogTable
                                    requestedIds={response}
                                    pulledOutIds={pulledOutIds}
                                    requestHistory={requestHistory}
                                    setSelectedRecords={setSelectedRecords}
                                    selectedRecords={selectedRecords}
                                />
                            ) : (
                                <>null</>
                            )}
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} alignItems="center">
                                {refreshPullOutSuccess?.data?.listOfExtra?.length > 0 && (
                                    <>
                                        <Grid item>
                                            <Typography
                                                display="inline"
                                                color="primary"
                                                variant="h6"
                                                className={classes.typoGraphy}
                                            >
                                                Extra:
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <CustomChip dataArray={extraIds} module={'manage'} extra={'red'} />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            </DialogContent>

            <DialogActions style={{ marginTop: 7, marginRight: 20 }}>
                <CustomButton
                    variant="outlined"
                    color="primary"
                    disabled={
                        pullOutSuccess
                            ? pullOutSuccess?.data?.status?.toLowerCase() !== 'open'
                            : refreshPullOutSuccess?.data?.status?.toLowerCase() !== 'open'
                    }
                    onClick={handleCancelClick}
                >
                    {'Cancel'}
                </CustomButton>
                <CustomButton variant="contained" color="primary" onClick={handleSaveClick}>
                    {loading ? <CircularProgress color="white" size="20px" /> : 'Done'}
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

export default PullOutDialog;
