import React from 'react';
import {
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    TextField,
    useMediaQuery
} from '@material-ui/core';
import DatePicker from '../../components/date-picker/date-picker.container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import bloodGroup from './bloodGroup.json';
import { useStyles } from './add-recepient.style';
import CustomInput from '../../components/inputfeild';
import CustomButton from '../../components/button';
import CONSTANTS from '../../common/constants';

const AddReceipientComponent = (props) => {
    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        gender,
        setGender,
        dob,
        receipientId,
        setReceipientId,
        handleDate,
        handleBloodGroup,
        handleAutoCompleteChange,
        setBloodGroupOpen,
        bloodGroupOpen,
        handleCancel,
        handleClickAway,
        validation,
        setFirstNameError,
        firstNameError,
        lastNameError,
        setLastNameError,
        dobError,
        setDobError,
        receipientIdError,
        setReceipientIdError,
        bloodGroupError,
        setBloodGroupError
    } = props;

    const classes = useStyles();
    const maxWidth600 = useMediaQuery('(max-width:600px)');
    const maxWidth1350 = useMediaQuery('(max-width:1350px)');
    const maxWidth960 = useMediaQuery('(max-width:960px)');

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} md={8} lg={8} container spacing={maxWidth600 ? 1 : 5}>
                <Grid item xs={12} md={6} lg={6}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.FIRST_NAME}</InputLabel>
                    <CustomInput
                        error={firstNameError}
                        helperText={firstNameError && CONSTANTS.INVALID_FIRST_NAME}
                        fullWidth
                        style={{ width: maxWidth1350 ? 300 : null }}
                        className={classes.textField}
                        size="lg"
                        variant="outlined"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        onFocus={() => setFirstNameError(false)}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.LAST_NAME}</InputLabel>
                    <CustomInput
                        error={lastNameError}
                        helperText={lastNameError && CONSTANTS.INVALID_LAST_NAME}
                        fullWidth
                        style={{ width: maxWidth1350 ? 300 : null }}
                        className={classes.textField}
                        size="lg"
                        variant="outlined"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        onFocus={() => setLastNameError(false)}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.DOB}</InputLabel>
                    <DatePicker
                        helperText={CONSTANTS.DOB}
                        error={dobError}
                        fullWidth
                        height={45}
                        size={'small'}
                        allowKeyboardControl={true}
                        value={dob}
                        handleDate={handleDate}
                        disablePast={false}
                        format="dd/MM/yyyy"
                        disableFuture={true}
                        disableToolbar={false}
                        width={'100%'}
                        inputVariant={'outlined'}
                        onFocus={() => setDobError(false)}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={6} className={maxWidth600 ? classes.fieldNamesXs12 : classes.fieldNames}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.BLOOD_GROUP}</InputLabel>
                    <Autocomplete
                        onInputChange={handleAutoCompleteChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setBloodGroupOpen(false);
                            }
                        }}
                        open={bloodGroupOpen}
                        id="blood"
                        onChange={(e, value) => handleBloodGroup(e, value)}
                        options={bloodGroup.data_array}
                        getOptionLabel={(option) => `${option.desc}`}
                        className={classes.lg}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={bloodGroupError}
                                helperText={bloodGroupError && CONSTANTS.SELECT_BLOOD_GROUP}
                                variant="outlined"
                            />
                        )}
                        onBlur={handleClickAway}
                        autoHighlight
                        autoSelect
                        ListboxProps={{
                            style: {
                                maxHeight: '200px'
                            }
                        }}
                        onFocus={() => setBloodGroupError(false)}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={6} className={maxWidth600 ? classes.fieldNamesXs12 : classes.fieldNames}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.RECIPIENT_ID}</InputLabel>
                    <CustomInput
                        error={receipientIdError}
                        helperText={receipientIdError && CONSTANTS.INVALID_RECIPIENT_ID}
                        fullWidth
                        size="lg"
                        variant="outlined"
                        onChange={(e) => setReceipientId(e.target.value)}
                        value={receipientId}
                        onFocus={() => setReceipientIdError(false)}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    container
                    className={maxWidth600 ? classes.fieldNamesXs12 : classes.fieldNames}
                >
                    <Grid item xs={1} md={12} lg={12}>
                        <InputLabel className={classes.genderLable} style={{ marginTop: maxWidth960 ? 15 : null }}>
                            {CONSTANTS.GENDER}
                        </InputLabel>
                    </Grid>
                    <Grid item xs={11} md={12} lg={12}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label={CONSTANTS.GENDER}
                                name={CONSTANTS.GENDER}
                                className={classes.radioBtns}
                                style={{ paddingLeft: maxWidth960 ? 50 : null }}
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <FormControlLabel
                                    value="Male"
                                    className={classes.male}
                                    control={
                                        <Radio
                                            disableRipple
                                            classes={{ root: classes.radio, checked: classes.checked }}
                                        />
                                    }
                                    label={CONSTANTS.MALE}
                                />
                                <FormControlLabel
                                    value="Female"
                                    className={classes.female}
                                    control={
                                        <Radio
                                            disableRipple
                                            classes={{ root: classes.radio, checked: classes.checked }}
                                        />
                                    }
                                    label={CONSTANTS.FEMALE}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify={maxWidth600 ? 'space-evenly' : 'flex-end'} style={{ marginTop: 10 }} spacing={3}>
                <Grid item xs={maxWidth960 ? (maxWidth600 ? 5 : 3) : 2}>
                    <CustomButton
                        variant="outlined"
                        fullWidth
                        color="primary"
                        onClick={handleCancel}
                        className={classes.saveButton}
                    >
                        {CONSTANTS.CANCEL}
                    </CustomButton>
                </Grid>

                <Grid item xs={maxWidth960 ? (maxWidth600 ? 5 : 3) : 2}>
                    <CustomButton
                        variant="contained"
                        fullWidth
                        disabled={firstName === ''}
                        color="primary"
                        onClick={validation}
                    >
                        {CONSTANTS.SAVE}
                    </CustomButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddReceipientComponent;
