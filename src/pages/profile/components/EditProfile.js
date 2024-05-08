import {
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    Typography
} from '@material-ui/core';
import { Alert, CONSTANTS, CustomButton, DatePicker } from 'common';
import CustomInput from 'components/inputfeild';
import React, { useState, useEffect } from 'react';
import { useStyles } from '../style';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileDetails } from 'redux/actions/profileDeatils/profileDetails';
import {
    clearPutResponse,
    get2ndDropdown,
    get3rdDropdown,
    get4thDropdown,
    getDropDown,
    getFields,
    putFormData
} from 'redux/actions/manage/manageFieldsAction';
import useForm from 'hooks/useForm';
import SelectOption from 'components/select';
import { getData } from 'redux/actions/scGenericApiCalls';
import Loader from 'components/loader/loader.container';
import CustomPassword from 'components/password';

const EdirProfile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [rowData, setRowData] = useState({});
    const [fLoading, setFloadinng] = useState(true);
    const formFields = useSelector((state) => state.getFormFields);
    const { options } = useSelector((state) => state.getDropDown);
    const { options2 } = useSelector((state) => state.get2ndDropdown);
    const { options3 } = useSelector((state) => state.get3rdDropdown);
    const { options4 } = useSelector((state) => state.get4thDropdown);
    const { putLoading, putResponse, putError } = useSelector((state) => state.putFormFields);
    const { userInfo } = useSelector((state) => state.userLogin);
    console.log('userinfo',userInfo)
    const { fieldsLoading, fields } = formFields;
    const apiResponse = useSelector((state) => state.getData);
    console.log('api---',apiResponse)
    const { loading, responseData } = apiResponse;
    useEffect(() => {
        dispatch(getData('user', 0, 1, undefined, [{ key: '_id', value: [userInfo?.data?.user?._id] }]));
        dispatch(getFields('BS-DR-0009'));
        dispatch(getDropDown('userRoles'));
        dispatch(get2ndDropdown('authorities'));
        dispatch(get3rdDropdown('clients'));
        dispatch(get4thDropdown('useraccessrole'));
        return () => {
            setErrorMessage('');
            setAlertOpen(false);
        };
    }, []);

    useEffect(() => {
        console.log('row data', responseData, responseData?.data?.[0]);
        if (responseData?.data) {
            console.log('row data', responseData, responseData?.data?.[0]);
            setRowData(responseData?.data[0]);
        }
    }, [responseData]);
    function compare_sequence(a, b) {
        // a should come before b in the sorted order
        if (a.sequence < b.sequence) {
            return -1;
            // a should come after b in the sorted order
        } else if (a.sequence > b.sequence) {
            return 1;
            // a and b are the same
        } else {
            return 0;
        }
    }

    let sortedFieldSequence = fields.data?.sort(compare_sequence);
    console.log(rowData, 'rowData');
    sortedFieldSequence?.forEach((field) => {
        let fieldValue = rowData?.[field?.name];
        if (Array.isArray(fieldValue)) {
            field.value = fieldValue.map((v) => v._id).toString();
        } else {
            field.value = rowData?.[field?.name];
        }
    });

    const submitCallback = (e) => {
        let object = {};
        sortedFieldSequence?.map((m) => (object[m.name] = m.value));
        {
            object._id = rowData._id;
        }
        let FormObject = {};
        FormObject.collectionName = 'user';
        {
            FormObject.validData = [object];
        }
        let json = JSON.stringify(FormObject);

        dispatch(putFormData(json));
    };
    useEffect(() => {
        putResponse?.status === true && setAlertOpen(true);
        // putResponse?.status === true && dispatch(getData(urlEndPoint, pageSize * 3, 1));
        putError?.errorMessage && setErrorMessage(putError?.errorMessage);
        putResponse?.status === true && resetFormData();
        putError?.errorMessage && dispatch(clearPutResponse());
        setTimeout(() => {
            dispatch(clearPutResponse());
        }, 3000);
    }, [putResponse, putError]);

    const [inputs, onFormChange, handleEditChange, setSubmit, resetFormData, handleDateChange] = useForm(
        sortedFieldSequence,
        submitCallback,
        rowData,
        setRowData
    );

    const genderOptions = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' },
        { name: 'Other', value: 'other' }
    ];
    let nextClick = false;
    const handleCompleteButtonClick = () => {
        setSubmit(nextClick);
    };

    useEffect(() => {
        setTimeout(() => {
            setFloadinng(false);
        }, 1000);
    }, []);
    const renderInput = (input) => {
        return input?.fieldtypeId[0]?.code === 'SC-FT-001' && input.name !== 'password' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <CustomInput
                    key={input.name}
                    onChange={handleEditChange}
                    name={input.name}
                    value={input.value}
                    type={input.type}
                    autoFocus
                    fullWidth
                    style={{ width: 300 }}
                    className={classes.textField}
                    size="lg"
                    disabled={input.name === 'badgeNo'}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-003' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <SelectOption
                    options={
                        input.name === 'authorityId'
                            ? options2?.data
                            : input.name === 'clientId'
                            ? options3?.data
                            : input.name === 'useraccessroleId'
                            ? options4?.data
                            : options?.data
                    }
                    onChange={handleEditChange}
                    value={input.value}
                    name={input.name}
                    id="id"
                    noLabel
                    disabled={true}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-004' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="api"
                        name={input.name}
                        value={input.value?.toLowerCase()}
                        className={classes.radioBtns}
                        onChange={handleEditChange}
                    >
                        {genderOptions.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                label={option.name}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : input?.fieldtypeId[0]?.code === 'SC-FT-005' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <DatePicker
                    inputVariant={'outlined'}
                    handleDate={(date) => handleDateChange(input.name, date)}
                    value={input.value}
                    format="MM/dd/yyyy"
                    disablePast={true}
                    fullWidth
                    width={'100%'}
                    height={45}
                    disabled
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : null;
    };

    console.log(inputs, 'inputs');
    const formContainer = (
        <Grid>
            {fLoading ? (
                <div className={classes.profileLoader}>
                    <Loader />
                </div>
            ) : (
                <Grid>
                    <Grid container spacing={2}>
                        {inputs?.length === 0 ? (
                            <Typography variant="body2" className={classes.nofields}>
                                No Fields Available.
                            </Typography>
                        ) : (
                            inputs?.map((input) => renderInput(input))
                        )}
                    </Grid>
                    <div className={classes.submitBtn}>
                        <CustomButton onClick={handleCompleteButtonClick} variant="contained" color="primary">
                            {putLoading ? <CircularProgress color="white" size="20px" /> : 'Submit'}
                        </CustomButton>
                    </div>
                </Grid>
            )}
        </Grid>
    );
    return (
        <>
            <section className={classes.container}>
                {formContainer}

                {alertOpen && (
                    <Alert
                        open={alertOpen}
                        message={`Profile updated successfully.`}
                        duration={2000}
                        onClose={() => setAlertOpen(false)}
                        vertical={'bottom'}
                        horizontal={'center'}
                        severity="success"
                        actions={false}
                    />
                )}
            </section>
        </>
    );
};

export default EdirProfile;
