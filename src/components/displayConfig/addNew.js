import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Card,
    IconButton,
    InputLabel,
    makeStyles,
    Switch,
    Tooltip,
    Typography,
    useTheme
} from '@material-ui/core';

import {Checkbox } from 'common';
import { Alert, CONSTANTS, CustomButton } from 'common';
import React, { useState ,useEffect} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import ErrorIcon from '@material-ui/icons/Error';
import { AutoComplete, CustomInput, SelectOption } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostResponse, get2ndDropdown, get4thDropdown, getData, postFormData, putEditData, getUserAccessId } from 'redux/actions';
import SelectNativeOption from 'components/select/nativeSelect';
//import { getData, getUserAccessId } from 'redux/actions/scGenericApiCalls';

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
    },
    inputLabel: {
        fontSize: '14px',
        marginBottom: 8
    },
    inputField: {
        marginBottom: 10,
        position: 'relative'
    },
    mainLabel: {
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 500
    }
}));

const AddNewDialog = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        open,
        onClose,
        title,
        children,
        onCancelClick,
        onSaveClick,
        disabled,
        editDetails,
        setInputDisabled,
        loading,
        error,
        minWidth,
        isDelete,
        isEdit,
        editId,
        isOk,
        urlEndPoint,
        pageSize,
        pageNum,
        setNewDisplayConfigOpen,
        data,
        breadScrumbLebel,
        formData,
        setFormData,
        collection,
        defaultChecked,
        screen
     
    } = props;
    const [alertOpen, setAlertOpen] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState('');
    // const { collectionData } = useSelector((state) => state.getCollectionDropdown);

    const { postLoading, postResponse, postError } = useSelector((state) => state.postFormFields);
    // let mCollectionArray = [];

    // collectionData?.data?.map((d, i) => mCollectionArray.push({ _id: i, name: d }));
    // const handleAutocompleteChnage = (e, newValue) => {
    //     setCollectionName(newValue);
    // };
    const [user,setUser]= useState("")
    const [userId, setUserId] = useState('')
    const [userAccess, setUserAccess] = useState('');

    const { userRoleData } = useSelector((state) => state.getUserAccessId);
    console.log("uuuuuuuu", userRoleData)

    const { options4 } = useSelector((state) => state.get4thDropdown);
    console.log("options4",options4)
    useEffect(() => {
        console.log('userrrr')
        setUserAccess(userRoleData?.data?.[0]?._id);
    }, [userRoleData]);

    useEffect(() => {
        console.log('userrrr')
        dispatch(get4thDropdown('user', undefined,));
       // setUserAccess(userRoleData?.data?.[0]?._id);
    }, []);
   

    const handleUserChange = (e) => {
        console.log(e.target.value)
        const user = options4?.data?.find(dat => dat.name === e.target.value);
        console.log("user", user);
        setUser(user.name)
        setUserId(user._id)
       
    }
   
    const [isDefault , setIsdefault] = useState(true)
    const handleStateChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onFormCheckboxChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
        console.log("eeeeeeeee", e.target.checked)
    };
    const onFormCheck = (e) => {
        setIsdefault( e.target.checked);
    };
    console.log("ddddd",isDefault)
   
   
    const submitCallback = (e) => {
        e.preventDefault();  
        console.log("------- Collection  Name -----" + collection)
        let object = {};
        object.collectionName = 'column';
        let type = localStorage.getItem('page');
        let formObj = [formData];
        object.screen = screen;
        object.isDefault = isDefault;
        object.type = type;
        //object.userId =  isDefault === false ?  userId : ""

        object.validData = formObj?.map((d) => ({ ...d, userId:  userAccess !== undefined ? userAccess : userId , mref: collection }));
        console.log('userId', userId)
        console.log("userAccess", userAccess)
        let json = object;
        console.log("isEdit", isEdit);
        if (isEdit) {
            json.id = editId;
            dispatch(putEditData(JSON.stringify(json), 'displayconfig'))
            console.log("edit api call", JSON.stringify(json));
            onClose()
        } else {
            dispatch(postFormData(JSON.stringify(json), 'displayconfig'));
        }
        dispatch(get4thDropdown('user', undefined,));
        setFormData({});
    };
    let type = localStorage.getItem('page');
    React.useEffect(() => {
        postResponse?.status === true && setAlertOpen(true);
        postResponse?.status === true && dispatch(getData(urlEndPoint, pageSize * 3, pageNum,undefined,undefined,undefined,type ? type : "Unit"));
        postResponse?.status === true && setNewDisplayConfigOpen(false);
        postResponse?.status === false && setNewDisplayConfigOpen(true);
        postError?.errorMessage && dispatch(clearPostResponse());
        postError?.errorMessage && setErrorMessage(postError?.errorMessage);
        setTimeout(() => {
            dispatch(clearPostResponse());
        }, 3000);
    }, [postResponse, postError]);

    return (
        <Dialog
            open={open}
            maxWidth="lg"
            PaperProps={{
                style: {
                    borderRadius: '10px',
                    backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN,
                    padding: 20,
                    width: '1200px'
                }
            }}
            onClose={onClose}
        >
            <form onSubmit={submitCallback}>
                <DialogTitle>
                    <Grid container direction={'row'} justify="space-between">
                        <Typography color="primary" variant="h5" className={classes.typoGraphy}>
                            {title}
                        </Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent className={isDelete || classes.content}>
                    <Grid>
                     
                        {collection && (
                            <>
                                <Typography color="primary" className={classes.mainLabel}></Typography>
                                <Grid container spacing={2}>
                                   
                                    <Grid item xs={3} className={classes.inputField}>
                                        <InputLabel className={classes.inputLabel}>DB Property</InputLabel>

                                        <CustomInput
                                            name="dbProperty"
                                            value={formData.dbProperty}
                                            onChange={handleStateChange}
                                            autoFocus
                                            fullWidth
                                            style={{ width: 300 }}
                                            className={classes.textField}
                                            size="sm"
                                            required={true}
                                           // disabled={true }
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.inputField}>
                                        <InputLabel className={classes.inputLabel}>Label</InputLabel>
                                        <CustomInput
                                            name="label"
                                            value={formData.label}
                                            onChange={handleStateChange}
                                            autoFocus
                                            fullWidth
                                            style={{ width: 300 }}
                                            className={classes.textField}
                                            size="sm"
                                            required={true}
                                        />
                                    </Grid>

                                    <Grid item xs={3} className={classes.inputField}>
                                        <InputLabel className={classes.inputLabel}>Child data table</InputLabel>
                                        <CustomInput
                                            name="childDataTable"
                                            value={formData.childDataTable}
                                            onChange={handleStateChange}
                                            autoFocus
                                            fullWidth
                                            style={{ width: 300 }}
                                            className={classes.textField}
                                            size="sm"
                                        />
                                    </Grid>
                                    <Grid item xs={1} className={classes.inputField}>
                                        <InputLabel className={classes.inputLabel}>Sequence</InputLabel>
                                        <CustomInput
                                            name="sequence"
                                            value={formData.sequence}
                                            onChange={handleStateChange}
                                            autoFocus
                                            fullWidth
                                            style={{ width: 300 }}
                                            className={classes.textField}
                                            size="sm"
                                            required={true}
                                        />
                                    </Grid>
                                    {userRoleData?.data && userRoleData?.data[0]?.useraccessroleId?.some((val) => val.name === 'Super Admin') ?
                                        <Grid item xs={1} className={classes.inputField}>
                                            <InputLabel className={classes.inputLabel}>Visible</InputLabel>
                                            <Switch
                                                color="primary"
                                                name="isVisible"
                                                checked={formData.isVisible ?? false}
                                                onChange={onFormCheckboxChange}
                                            />
                                        </Grid> : null}
   {/*                                 {userRoleData?.data && userRoleData?.data[0]?.useraccessroleId?.some((val) => val.name === 'Super Admin') ?*/}
                                        <Grid item xs={1} className={classes.inputField}>
                                            <InputLabel className={classes.inputLabel}>Clickable</InputLabel>
                                            <Switch
                                                color="primary"
                                                name="isClickable"
                                                checked={formData.isClickable ?? false}
                                                onChange={onFormCheckboxChange}
                                            />
                                    </Grid> 
                                   {/* : null}*/}
                                    {userRoleData?.data && userRoleData?.data[0]?.useraccessroleId?.some((val) => val.name === 'Super Admin') ?
                                        <Grid item xs={3} className={classes.inputField}>
                                            <InputLabel className={classes.inputLabel}>Default</InputLabel>
                                            <Switch
                                                color="primary"
                                                name="isDefault"
                                                checked={isDefault ?? false}
                                                onChange={onFormCheck}
                                            />

                                        </Grid> : null}
                                </Grid>{isDefault === false ?
                                    <Grid item style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <SelectOption
                                            label="Select User"
                                            onChange={handleUserChange}
                                            value={user}
                                            minWidth={250}
                                            noLabel={true}
                                            options={options4?.data || []}
                                            placeHolder="Select User"
                                        //onOpen={handleEmptyDevices}
                                        //loading={options8loading}
                                        />
                                    </Grid> : ""}

                            </>
                        )}
                    </Grid>
                </DialogContent>

                <>
                    <DialogActions style={{ marginTop: 7, marginRight: 20 }}>
                        {!isOk && (
                            <CustomButton onClick={onCancelClick} variant="outlined" color="primary">
                                {CONSTANTS.CANCEL}
                            </CustomButton>
                        )}
                        <CustomButton type="submit" disabled={disabled} variant="contained" color="primary">
                            {postLoading ? (
                                <CircularProgress color="white" size="20px" />
                            ) : isOk ? (
                                'Ok'
                            ) : (
                                CONSTANTS.SAVE
                            )}
                        </CustomButton>
                    </DialogActions>
                </>
            </form>
            {alertOpen && (
                <Alert
                    open={alertOpen}
                    message={postResponse?.status === true && 'Added successfully'}
                    duration={2000}
                    onClose={() => {
                        setAlertOpen(false), dispatch(clearPostResponse());
                    }}
                    vertical={'bottom'}
                    horizontal={'center'}
                    severity="success"
                    actions={false}
                />
            )}
            {errorMessage && (
                <div className={classes.errorContainer}>
                    <ErrorIcon className={classes.errorIcon} />
                    <Typography variant="body2" className={classes.errorMessage}>
                        {errorMessage}
                    </Typography>
                </div>
            )}
        </Dialog>
    );
};

export default AddNewDialog;
