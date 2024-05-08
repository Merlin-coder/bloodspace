import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Grid,
    TextField,
    Paper,
    Typography,
    InputLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Modal,
    useMediaQuery,
    FormControl
} from '@material-ui/core';
import { useAssignPageStyles } from './assign-page.style';
import CustomButton from 'components/button';
import { CONSTANTS, CustomSearch, Index, DatePicker } from 'common';
import CustomInput from 'components/inputfeild';
import Autocomplete from '@material-ui/lab/Autocomplete';
import bloodGroup from '../../../JSON/bloodGroup.json';
import { Link } from 'react-router-dom';
import { clearData, getData } from 'redux/actions/scGenericApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import pluralize from 'pluralize';
import useForm from 'hooks/useForm';
import SelectOption from 'components/select';
import { CustomDialog } from 'components';
import { Alert, Checkbox } from 'common';
import {
    getDropDown,
    getFields,
    postFormData,
    putFormData,
    clearPostResponse
} from 'redux/actions/manage/manageFieldsAction';
import moment from 'moment';
import Loader from 'components/loader/loader.container';
import { createAlert } from 'redux/actions';

const AssignBatchComponent = (props) => {
    const { userInfo } = useSelector((state) => state.userLogin);
    const location = useLocation();
    const dispatch = useDispatch();

    const data = location?.state?.data || [];
    console.log('datatat',data)
    const classes = useAssignPageStyles();
    const [openAdd, setOpenAdd] = useState(false);
    const [nextClick, setNextClick] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const formFields = useSelector((state) => state.getFormFields);
    const { options } = useSelector((state) => state.getDropDown);
    const { postLoading, postResponse, postError } = useSelector((state) => state.postFormFields);
    const { fieldsLoading, fields } = formFields;
    const [searchDate, setSearchDate] = useState(null);
    const [matchedList, setMatchedList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const apiResponse = useSelector((state) => state.getData);
    const { loading, responseData } = apiResponse;
    localStorage.setItem('recipientData', JSON.stringify(responseData));
    console.log('respooooo',responseData)
    const { history } = props;
    console.log('history',history)
    const maxWidth960 = useMediaQuery('(max-width:960px)');

    const { userAccessData, userAccessLoading } = useSelector((state) => state.getUserAccess);
    const [accessableCodes, setAccessableCodes] = useState([]);
    const [codesAndDescription, setCodesAndDescription] = useState({});

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
    useEffect(() => {
        dispatch(getFields('BS-DR-0011'));
        dispatch(clearPostResponse());
    }, []);

    const submitCallback = (e) => {
        let object = {};
        sortedFieldSequence?.map((m) => {
            if (m.name === 'firstName' || m.name === 'gender' || m.name === 'lastName') {
                object[m.name] = m.value.charAt(0).toUpperCase() + m.value.substr(1);
            } else if (m.value) {
                object[m.name] = m.value;
            }
        });
        let FormObject = {};
        FormObject.collectionName = 'recipient';

        FormObject.validData = object;

        let json = JSON.stringify(FormObject);

        dispatch(postFormData(json));

        if (!nextClick) {
            postError?.errorMessage ? setOpenAdd(true) : setOpenAdd(false);
        }
        resetFormData();
    };

    useEffect(() => {
        postLoading === false && setAlertOpen(true);
        if (postResponse?.status === true) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'Recipient Added Successfully',
                    alertType: 'success'
                })
            );
        }
        if (postError?.status === false) {
            dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'Failed to Add Recipient',
                    alertType: 'error'
                })
            );
        }
        setTimeout(() => {
            postResponse?.status && dispatch(clearPostResponse());
        }, 4000);
    }, [postLoading, postResponse]);

    const [rowData, setRowData] = useState({});

    const [inputs, onFormChange, handleEditChange, setSubmit, resetFormData, handleDateChange] = useForm(
        sortedFieldSequence,
        submitCallback,
        rowData,
        setRowData,
        setNextClick
    );
    console.log('rwow--',rowData)
    const handleOpenAdd = () => {
        dispatch(getDropDown('bloodGroup'));

        setOpenAdd(true);
        setRowData({});
    };

    const handleCompleteButtonClick = () => {
        setSubmit(nextClick);
    };

    const handleNextClick = () => {
        setNextClick(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
        resetFormData();
    };

    const genderOptions = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' }
    ];

    const renderInput = (input) => {
        return input['fieldtype-code'] === 'SC-FT-001' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <CustomInput
                    key={input.name}
                    onChange={onFormChange}
                    name={input.name}
                    value={input.value}
                    type={input.type}
                    autoFocus
                    fullWidth
                    style={{ width: 300 }}
                    className={classes.textField}
                    size="lg"
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : input['fieldtype-code'] === 'SC-FT-003' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>

                <SelectOption
                    // label="Select Location Type"
                    options={options?.data}
                    onChange={onFormChange}
                    value={input.value}
                    name={input.name}
                    id="id"
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : input['fieldtype-code'] === 'SC-FT-004' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="api"
                        name={input.name}
                        value={input.value}
                        className={classes.radioBtns}
                        onChange={onFormChange}
                    >
                        {genderOptions.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={
                                    <Radio
                                        classes={{
                                            root: classes.radio,
                                            checked: classes.checked
                                        }}
                                    />
                                }
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
        ) : input['fieldtype-code'] === 'SC-FT-005' ? (
            <Grid item xs={12} md={6} lg={6} className={classes.inputField} key={input.name}>
                <InputLabel className={classes.inputLabel}>{input.label}</InputLabel>
                <DatePicker
                    inputVariant={'outlined'}
                    handleDate={(date) => handleDateChange(input.name, date)}
                    value={input.value}
                    format="MM/dd/yyyy"
                    disableFuture={true}
                    fullWidth
                    width={'100%'}
                    height={45}
                />
                {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )}
            </Grid>
        ) : null;
    };

    const formContainer = (
        <Grid>
            <Grid container spacing={2}>
                {inputs?.map((input) => renderInput(input))}
            </Grid>
        </Grid>
    );

    useEffect(() => {
        nextClick && setSubmit(nextClick);
    }, [nextClick]);

    useEffect(() => {
        let userRoleCode = 'useraccessrole-code';
        let tempAccessCodes = [];
        if (userInfo?.data?.user?.[userRoleCode] === 'BS-UAR-1002') {
            tempAccessCodes = ['BS-ACO-1012', 'BS-ACO-1013', 'BS-ACO-1014', 'BS-ACO-1009', 'BS-ACO-1010'];
        } else {
            let manageAccessCodes =
                userInfo?.data?.userAccess
                    ?.filter((item) => item['drawer-code'] === 'BS-DR-0003')
                    ?.map((subMenu) => subMenu?.menuId)
                    ?.flat()[0] || [];
            let keysOfObject = Object.keys(manageAccessCodes);
            keysOfObject.forEach((item) => {
                if (Array.isArray(manageAccessCodes[item])) {
                    manageAccessCodes[item][0] === '1' && tempAccessCodes.push(manageAccessCodes[item][1]);
                }
            });
        }
        setAccessableCodes(tempAccessCodes);
    }, [location]);

    const handleSearchDelete = () => {
        setSearchKey('');
        setSearchDate(null);
        setMatchedList([]);
        dispatch(clearData());
    };

    const handleSearch = (searchKey) => {
        setSearchKey(searchKey);
        if (searchKey.length > 2) {
            dispatch(clearData());
            if (accessableCodes?.includes('BS-ACO-1011')) {
                let DOB;
                let invalidDate = String(searchDate);
                if (typeof searchDate?.getMonth === 'function' && searchKey && invalidDate !== 'Invalid Date') {
                    DOB = [
                        {
                            key: 'dob',
                            value: [moment(searchDate).format('DD/MM/YYYY'), moment(searchDate).format('DD/MM/YYYY')]
                        }
                    ];
                    dispatch(
                        getData(
                            'recipient',
                            100000,
                            1,
                            searchKey.trim(),
                            DOB,
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                           
                        )
                    );
                }
            } else {
                dispatch(
                    getData(
                        'recipient',
                        100000,
                        1,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        searchKey.trim(),
                    )
                );
            }
        } else if (searchKey === '') {
            dispatch(clearData());
        }
    };

    const handleSearchDate = (e) => {
        setSearchDate(e);
        let invalidDate = String(e);

        let DOB;
        if (typeof e?.getMonth === 'function' && searchKey && invalidDate !== 'Invalid Date') {
            DOB = [
                {
                    key: 'dob',
                    value: [moment(e).format('YYYY-MM-DD'), moment(e).format('YYYY-MM-DD')]
                }
            ];
            dispatch(getData('recipient', 30, 1, searchKey, DOB));
        }
    };

    useEffect(() => {
        if (responseData && responseData.data && accessableCodes?.includes('BS-ACO-1011')) {
            let list = responseData.data.filter(
                (item) => moment(item.dob).format('DD/MM/YYYY') === moment(searchDate).format('DD/MM/YYYY')
            );
            setMatchedList(list);
        }
    }, [responseData]);

    return (
        <>
            {userAccessLoading && accessableCodes.length === 0 ? (
                <Loader />
            ) : (
                <Grid container spacing={1}>
                    <Grid container spacing={1} justify="space-between" className={classes.searchContainer}>
                        <Grid item xs={12} md={6} lg={5} style={{ display: 'flex' }}>
                            <Grid item xs={8} style={{ paddingLeft: 10 }}>
                                {searchKey.length > 0 ? (
                                    <Typography className={classes.addUnitsDialogLabels}>
                                        {accessableCodes?.includes('BS-ACO-1012')
                                            ? 'Search by MRN / NAME '
                                            : accessableCodes?.includes('BS-ACO-1010') &&
                                              accessableCodes?.includes('BS-ACO-1011')
                                            ? 'Search by NAME '
                                            : accessableCodes?.includes('BS-ACO-1010')
                                            ? 'Search by MRN'
                                            : accessableCodes?.includes('BS-ACO-1009') ||
                                              accessableCodes?.includes('BS-ACO-1011')
                                            ? 'Search by Name'
                                            : 'Search'}
                                    </Typography>
                                ) : null}
                                <CustomSearch
                                    value={searchKey}
                                    size="md"
                                    placeholder={
                                        accessableCodes?.includes('BS-ACO-1012')
                                            ? 'Search by MRN / NAME'
                                            : accessableCodes?.includes('BS-ACO-1010') &&
                                              accessableCodes?.includes('BS-ACO-1011')
                                            ? 'Search by NAME '
                                            : accessableCodes?.includes('BS-ACO-1010')
                                            ? 'Search by MRN'
                                            : accessableCodes?.includes('BS-ACO-1011') ||
                                              accessableCodes?.includes('BS-ACO-1011')
                                            ? 'Search by Name'
                                            : 'Search'
                                    }
                                    handleChange={(e) => (e.target.value !== ' ' ? handleSearch(e.target.value) : null)}
                                    handleSearchDelete={handleSearchDelete}
                                    loader={searchKey && searchKey.length < 3 ? true : searchKey && loading}
                                    disabled={
                                        !(
                                            accessableCodes?.includes('BS-ACO-1012') ||
                                            accessableCodes?.includes('BS-ACO-1011') ||
                                            accessableCodes?.includes('BS-ACO-1012')
                                        )
                                    }
                                />
                            </Grid>
                            {accessableCodes ? (
                                <Grid item xs={4} style={{ paddingLeft: 10 }}>
                                    {String(searchDate) === 'Invalid Date' ? (
                                        <Typography className={classes.addUnitsDialogLabels}>
                                            {'Search by DOB'}
                                        </Typography>
                                    ) : null}
                                    <DatePicker
                                        inputVariant="outlined"
                                        height={45}
                                        handleDate={handleSearchDate}
                                        value={searchDate}
                                        disableFuture
                                        format={'dd/MM/yyyy'}
                                        placeholder="DD/MM/YYYY"
                                        allowKeyboardControl={true}
                                        disabled={
                                            !(
                                                accessableCodes?.includes('BS-ACO-1012') ||
                                                accessableCodes?.includes('BS-ACO-1011')
                                            )
                                        }
                                    />
                                </Grid>
                            ) : null}
                        </Grid>
                        <Grid item container xs={12} md={12} lg={7}>
                            <Grid item xs={4} ms={3} lg={4}>
                                {responseData?.data?.length > 0
                                    ? searchKey && (
                                          <Typography className={classes.showingResults}>
                                              {CONSTANTS.SHOWING}{' '}
                                              <span className={classes.spanBold}> {responseData?.data?.length} </span>{' '}
                                              {CONSTANTS.RESULTS}
                                          </Typography>
                                      )
                                    : null}
                            </Grid>
                            <Grid item xs={9} md={9} lg={8} className={classes.buttons}>
                                <Grid container spacing={1} justify="flex-end">
                                    <Grid item className={classes.margAuto}>
                                        <CustomButton
                                            className={classes.margAuto}
                                            onClick={handleOpenAdd}
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                            fontsize="14px"
                                            width="230px"
                                            disabled={!accessableCodes?.includes('BS-ACO-1013')}
                                        >
                                            {CONSTANTS.ADD_NEW_RECIPIENT}
                                        </CustomButton>
                                    </Grid>
                                    {/* <Grid item>
                                        <Link to="/dashboard/assign-unit/r/emergency" className={classes.anchor}>
                                            <CustomButton
                                                // className={classes.margAuto}
                                                className={classes.assignBtn}
                                                size="medium"
                                                variant="contained"
                                                color="primary"
                                                fontsize="14px"
                                                width="230px"
                                                disabled={!accessableCodes?.includes('BS-ACO-1014')}
                                            >
                                                {CONSTANTS.EMERGENCY_STOCK_ASSIGN}
                                            </CustomButton>
                                        </Link>
                                    </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                        {data.length > 0 && (
                            <Grid item container xs={12} md={12} style={{ paddingLeft: 15 }}>
                                <InputLabel className={classes.inputLabel}>
                                    {`Selected ${data.length} ${data.length === 1 ? ' record' : ' records'} for assign`}
                                </InputLabel>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {searchKey ? (
                            <Paper className={classes.intelligence}>
                                <Grid container item lg={12} md={12} justify="space-around">
                                    {accessableCodes?.includes('BS-ACO-1012') &&
                                    responseData &&
                                    responseData?.data?.length > 0 &&
                                    searchKey.length > 2 ? (
                                        <Index
                                            response={responseData}
                                            assignBatch={searchKey}
                                            history={history}
                                            module="reports"
                                            data={data}
                                        />
                                    ) : accessableCodes?.includes('BS-ACO-1011') && matchedList?.length > 0 ? (
                                        <Index
                                            response={responseData}
                                            // searchKey={searchKey}
                                            history={history}
                                            module="reports"
                                            data={data}
                                            assignBatch={searchKey}
                                        />
                                    ) : (
                                        <>
                                            {accessableCodes?.includes('BS-ACO-1011') && !responseData.status ? (
                                                <Typography className={classes.resultSuggestions}>
                                                    {accessableCodes?.includes('BS-ACO-1012')
                                                        ? 'Search by MRN / NAME / DOB'
                                                        : accessableCodes?.includes('BS-ACO-1010')
                                                        ? 'Search by MRN'
                                                        : accessableCodes?.includes('BS-ACO-1011')
                                                        ? 'Enter Name and DOB'
                                                        : 'Search'}
                                                </Typography>
                                            ) : (
                                                <Typography>{CONSTANTS.NOT_FOUND}</Typography>
                                            )}
                                        </>
                                    )}
                                </Grid>
                            </Paper>
                        ) : null}
                    </Grid>
                </Grid>
            )}
            <CustomDialog
                title={`Add Recipient`}
                open={openAdd}
                onClose={handleCloseAdd}
                onCancelClick={handleCloseAdd}
                onNextClick={handleNextClick}
                onCompleteClick={handleCompleteButtonClick}
                loading={postLoading}
            >
                {formContainer}
            </CustomDialog>
        </>
    );
};

export default AssignBatchComponent;
