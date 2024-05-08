import React, { useState, useEffect } from 'react';
import { useStyles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearDisplayConfigPutResponse,
    getCollectionDropdown,
    putDisplayConfigData,
    deleteDisplayconfig
} from 'redux/actions/manage/manageFieldsAction';
import { Grid, IconButton, Tooltip, Typography, Card } from '@material-ui/core';
import { SelectOption } from 'components';
import Skeleton from 'components/loader/loaderNew.container';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomInput from 'components/inputfeild';
import { Alert, Checkbox, CustomButton } from 'common';
import CustomDialog from 'components/dialog';
import { getData, getUserAccessId } from 'redux/actions/scGenericApiCalls';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import AddNewDCDialog from './addNewDisplayConfig';
import { useLocation } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import AddNewDialog from './addNew';
import pluralize from 'pluralize';

const DisplayConfig = (props) => {
    console.log('displayconfig', props);
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const [displayConfigOpen, setDisplayConfigOpen] = useState(false);
    const [newDisplayConfigOpen, setNewDisplayConfigOpen] = useState(false);
    const [addDisplayCon, setAddDisplayCon] = useState(false);
    const [editLabel, setEditLabel] = useState('');
    const [editOpen, setEditOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [dChecked, setDchecked] = useState(props?.response);
    const [isDefault, setIsDefault] = useState(props.response);

    const [formData, setFormData] = useState({
        dbProperty: '',
        label: '',
        childDataTable: '',
        sequence: '',
        isVisible: true,
        isClickable: false
    });
    //const {
    //    screen } = props;

    // const [tempChecked, setTempDchecked] = useState([]);
    const { displayConfigloading, putDisplayConfigResponse, displayConfigError } = useSelector(
        (state) => state.putDisplayConfig
    );
    if (localStorage.getItem('page') === null) {
        localStorage.setItem('page', 'Unit');
    }

    let type = localStorage.getItem('page');

    console.log('typeconfig---', type);

    const { userRoleData } = useSelector((state) => state.getUserAccessId);
    console.log('uuuuuuuu', userRoleData);

    const submitDisplayConfigCallback = async (row, e) => {
        console.log('submitDisplayConfigCallback');
        let object = {};
        object.collectionName = 'column';
        object.type = type;
        console.log('Screen ' + props?.screens);
        const newRows = dChecked.map((row) => {
            return { ...row, screen: props.screens };
        });
        setDchecked(newRows);
        object.validData = dChecked;
        let json = JSON.stringify(object);
        dispatch(putDisplayConfigData(json));
        setDisplayConfigOpen(false);
        try {
            // Delete the display configuration
            let Deleteconfig = {
                _id: row._id
            };
            await dispatch(deleteDisplayconfig(Deleteconfig));

            // Fetch updated data after deletion
            await dispatch(getData(props?.urlEndPoint));
        } catch (error) {
            console.error('Error deleting display configuration:', error);
        }
    };

    let tempChecked = JSON.parse(localStorage.getItem('tempDC'));
    tempChecked?.push({ label: 'CREATEDBY', dbProperty: 'createdBy', align: 'left' });

    useEffect(() => {
        console.log('propsfilters' + props?.showFilters);
        if (putDisplayConfigResponse && putDisplayConfigResponse.status) {
            putDisplayConfigResponse?.status && setAlertOpen(true);
            if (props?.urlEndPoint && putDisplayConfigResponse?.status) {
                dispatch(
                    getData(
                        props?.urlEndPoint,
                        props?.pageSize * 3,
                        props?.pageNum,
                        props?.searchKey ? props?.searchKey : undefined,
                        props?.showFilters?.length > 0
                            ? props?.showFilters
                            : props?.unitIdFilter?.length > 0
                            ? JSON.stringify(props?.unitIdFilter)
                            : undefined,
                        props?.sortValue?.key ? JSON.stringify(props?.sortValue) : undefined,
                        type ? type : 'Unit'
                    )
                );
            }
        }

        displayConfigError?.errorMessage && setErrorMessage(displayConfigError?.errorMessage);
    }, [putDisplayConfigResponse, displayConfigError]);

    const handledisplayConfigClose = () => {
        setDisplayConfigOpen(false);
        setDchecked(props.response);
    };
    const handledisplayConfigOpen = () => {
        setDisplayConfigOpen(true);
    };

    useEffect(() => {
        setDchecked(props.response);
        setIsDefault(props.response);
        setAlertOpen(false);
        setErrorMessage('');
    }, [props.response]);

    const onDChange = (row, e) => {
        console.log('onDChange', row);
        const name = e.target.name;
        const value = name === 'isVisible' ? e.target.checked : e.target.value;
        const { _id } = row;
        const newRows = dChecked.map((row) => {
            if (row._id === _id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setDchecked(newRows);
    };

    const handleDisplayconfigDelete = (row, e) => {
        console.log('configrowww', row._id);
        //let Deleteconfig = {
        //    _id: row._id,
        //}
        //dispatch(deleteDisplayconfig(Deleteconfig));
        //dispatch(getData(props?.urlEndPoint));
        submitDisplayConfigCallback(row);
    };

    const defaultChecked = (e, row) => {
        const name = e.target.name;
        const value = name === 'isDefault' ? e.target.checked : e.target.value;
        const { _id } = row;
        const newRows = dChecked.map((row) => {
            if (row._id === _id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setIsDefault(newRows);
    };

    const handleAddNew = () => {
        // dispatch(getCollectionDropdown());
        setDisplayConfigOpen(false);
        setNewDisplayConfigOpen(true);
    };
    const handleAdddisplayConfigClose = () => {
        setNewDisplayConfigOpen(false);
        setFormData({});
    };
    const handleAddNewButton = () => {
        // dispatch(getCollectionDropdown());
        // setDisplayConfigOpen(false);
        setAddDisplayCon(true);
    };
    const handleAdddisplayConClose = () => {
        setAddDisplayCon(false);
        setEditOpen(false);
        setFormData({});
    };

    //const { userInfo } = useSelector((state) => state.userLogin);
    //console.log("userInfo", userInfo);

    //useEffect(() => {
    //    setTimeout(() => {
    //        getUserData();
    //    },200)

    //}, []);

    //const getUserData = async () => {
    //    const user = await dispatch(getData('user', 0, 1, undefined, [{ key: '_id', value: [userInfo?.data?.user?._id] }]));
    //    if (user) {
    //        console.log("userrr", user);
    //        setUser(user.data[0]);
    //    } else {
    //        console.log("Failed to fetch user details");
    //    }
    //}
    const { userInfo } = useSelector((state) => state.userLogin);
    console.log('userInfo', userInfo);
    useEffect(() => {
        dispatch(getUserAccessId('user', 0, 1, undefined, [{ key: '_id', value: [userInfo?.data?.user?._id] }]));
    }, []);

    //const user = dispatch(getUserRoleReducer('user', 0, 1, undefined, [{ key: '_id', value: [userInfo?.data?.user?._id] }]));

    //const getDisplay = () => {

    //    fetch('/api/v1/index?collectionName=' + name + '&pageSize=0&pageNumber=1', {
    //        method: 'GET',
    //        headers: {
    //            'Content-type': 'application/json;charset=UTF-8',
    //            Authorization: userInfo?.data?.token
    //        }
    //    })
    //        .then((response) => response.json())
    //        .then((data) => {
    //            if (name === 'user') {
    //                const remoteDevice = data.data.filter((device) => !device.name.includes('Associate'));
    //                //setAllDevices(remoteDevice);
    //            }
    //        });
    //};
    //React.useEffect(() => {
    //    getDisplay();
    //}, []);

    const displayConfigContainer = (
        <Grid>
            <Grid container>
                {props.loading ? (
                    <div className={classes.formLoader}>
                        <Skeleton type="table" />
                    </div>
                ) : (
                    <Grid container>
                        {dChecked && dChecked.length > 0 ? (
                            dChecked?.map((displayConfig, index) => (
                                <Grid
                                    item
                                    key={displayConfig._id}
                                    xs={3}
                                    className={classes.displayConfigListContainer}
                                >
                                    <div className={classes.displayConfigList}>
                                        <div className={classes.checkboxAndListContainer}>
                                            <Checkbox
                                                checked={displayConfig.isVisible}
                                                name="isVisible"
                                                handleChange={(e) => onDChange(displayConfig, e)}
                                            />
                                            {editLabel === displayConfig._id ? (
                                                <CustomInput
                                                    onChange={(e) => onDChange(displayConfig, e)}
                                                    name="label"
                                                    value={displayConfig.label}
                                                    autoFocus
                                                    fullWidth
                                                    style={{ width: 300 }}
                                                    className={classes.textField}
                                                    size="sm"
                                                    standard
                                                />
                                            ) : (
                                                <Typography variant="body2">{displayConfig.label}</Typography>
                                            )}
                                        </div>

                                        <IconButton
                                            className={classes.listEditIcon}
                                            onClick={() => {
                                                setEditLabel(displayConfig._id);
                                                setFormData({
                                                    dbProperty: displayConfig.dbProperty,
                                                    label: displayConfig.label,
                                                    childDataTable: displayConfig.childDataTable,
                                                    sequence: displayConfig.sequence,
                                                    isVisible: displayConfig.isVisible,
                                                    isClickable: displayConfig.isClickable
                                                });
                                                setEditOpen(true);
                                            }}
                                        >
                                            <EditIcon style={{ fontSize: 'small' }} />
                                        </IconButton>

                                        <IconButton onClick={(e) => handleDisplayconfigDelete(displayConfig, e)}>
                                            <DeleteIcon style={{ fontSize: 'small' }} />
                                        </IconButton>
                                    </div>
                                </Grid>
                            ))
                        ) : (
                            <div className={classes.noDC}>
                                <Typography variant="h6" className={classes.nofields}>
                                    No Display Config Available.
                                </Typography>
                                <div className={classes.nofieldsButton}>
                                    <CustomButton variant="contained" color="primary" onClick={handleAddNew}>
                                        Click here to add new
                                    </CustomButton>
                                </div>
                            </div>
                        )}
                    </Grid>
                )}
                {dChecked && dChecked.length > 0 && (
                    <Grid item style={{ marginTop: 10 }}>
                        {/*  {userRoleData?.data && userRoleData?.data[0]?.useraccessroleId?.some((val) => val.name === 'Super Admin') ?*/}
                        <CustomButton
                            variant="outlined"
                            color="primary"
                            onClick={handleAddNewButton}
                            //disabled={props?.userRole?.some((val) => val.name === 'Super Admin' ? true : false)}
                        >
                            <AddIcon size="small" style={{ marginRight: 8, marginBottom: 5 }} />
                            Add New
                        </CustomButton>
                        {/*: null}*/}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );

    // console.log(props?.urlEndPoint, 'why');
    return (
        <>
            <IconButton onClick={handledisplayConfigOpen} disabled={props?.disabled}>
                <Tooltip title="Edit Column Display Options">
                    <ViewColumnIcon color={props?.disabled ? '' : 'primary'} />
                </Tooltip>
            </IconButton>

            <CustomDialog
                title="Edit Column Display Options"
                screen={screen}
                open={displayConfigOpen}
                onClose={handledisplayConfigClose}
                onCancelClick={handledisplayConfigClose}
                onSaveClick={submitDisplayConfigCallback}
                isDisplayConfig
                loading={displayConfigloading}
                error={errorMessage}
                disabled={dChecked?.length === 0}
            >
                {displayConfigContainer}
            </CustomDialog>
            <AddNewDCDialog
                title="Add Column Display Options"
                open={newDisplayConfigOpen}
                screen={screen}
                onClose={handleAdddisplayConfigClose}
                onCancelClick={handleAdddisplayConfigClose}
                data={tempChecked}
                setNewDisplayConfigOpen={setNewDisplayConfigOpen}
                breadScrumbLebel={props.breadScrumbLebel}
                collection={props?.urlEndPoint !== undefined ? pluralize(props?.urlEndPoint) : ''}
                urlEndPoint={props?.urlEndPoint}
            />
            <AddNewDialog
                title="Add Column Display Options"
                open={editOpen || addDisplayCon}
                isEdit={editOpen}
                editId={editLabel}
                screen={screen}
                onClose={handleAdddisplayConClose}
                onCancelClick={handleAdddisplayConClose}
                setNewDisplayConfigOpen={setAddDisplayCon}
                breadScrumbLebel={props.breadScrumbLebel}
                collection={props?.urlEndPoint !== undefined ? pluralize(props?.urlEndPoint) : ''}
                urlEndPoint={props?.urlEndPoint}
                formData={formData}
                setFormData={setFormData}
            />

            {alertOpen && (
                <Alert
                    open={alertOpen}
                    message={putDisplayConfigResponse?.status === true && putDisplayConfigResponse?.message}
                    duration={20000}
                    onClose={() => {
                        setAlertOpen(false), dispatch(clearDisplayConfigPutResponse());
                    }}
                    vertical={'bottom'}
                    horizontal={'center'}
                    severity="success"
                    actions={false}
                />
            )}
        </>
    );
};

export default DisplayConfig;
