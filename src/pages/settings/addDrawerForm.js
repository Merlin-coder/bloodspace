import { FormControl, FormControlLabel, Grid, InputLabel, Radio, RadioGroup } from '@material-ui/core';
import { CustomInput, SelectOption } from 'components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrawer } from 'redux/actions';
import { getCollectionDropdown, getDropDown } from 'redux/actions/manage/manageFieldsAction';
import AddAutoComplete from './components/autoComplete';
import { useSettingsStyles } from './style';

const AddDrawerForm = ({ formData, setFormData, formDataValidation, handleValidation }) => {
    const classes = useSettingsStyles();
    const dispatch = useDispatch();
    const { collectionData } = useSelector((state) => state.getCollectionDropdown);
    const { drawerResponse } = useSelector((state) => state.getDrawer);
    const { options } = useSelector((state) => state.getDropDown);
    console.log(formDataValidation);

    console.log(drawerResponse, 'in setttings screen');
    let mdrawerResponse = [];
    let mCollectionArray = [];
    drawerResponse?.data?.map((d, i) => mdrawerResponse.push({ ...d, _id: d.name }));
    collectionData?.data?.map((d, i) => mCollectionArray.push({ _id: d, name: d }));
    useEffect(() => {
        dispatch(getCollectionDropdown());
        dispatch(getDrawer());
        dispatch(getDropDown('useraccessrole'));
    }, []);
    const uiTypes = [
        { name: 'Manage', value: 'manage' },
        { name: 'Report', value: 'reports' }
    ];
    const mainMenu = [
        { name: 'Yes', value: '1' },
        { name: 'No', value: '2' }
    ];
    useEffect(() => {
        return () => {
            dispatch(getCollectionDropdown());
            //    cleanup
        };
    }, []);
    const onFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        handleValidation();
    };
    console.log('formData', formData);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
                <InputLabel className={classes.InputLabel}>Drawer Name</InputLabel>
                <CustomInput
                    onChange={onFormChange}
                    name="name"
                    value={formData.name}
                    autoFocus
                    fullWidth
                    style={{ width: 300 }}
                    error={formDataValidation?.name && true}
                    helperText={formDataValidation?.name && 'Drawer Name is required'}
                    // className={classes.textField}
                    size="lg"
                />

                {/* {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )} */}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <InputLabel className={classes.InputLabel}>Database table name</InputLabel>
                <AddAutoComplete
                    options={mCollectionArray}
                    onChange={onFormChange}
                    value={formData.collectionName}
                    name="collectionName"
                    id="id"
                    formData={formData}
                    setFormData={setFormData}
                    noLabel
                />
                {/* {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )} */}
            </Grid>
            <Grid
                item
                xs={12}
                md={3}
                lg={3}
                className={classes.inputField}
                style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 5 }}
            >
                <InputLabel className={classes.InputLabel}>UI Type</InputLabel>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="api"
                        name="type"
                        value={formData.type}
                        className={classes.radioBtns}
                        onChange={onFormChange}
                    >
                        {uiTypes.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                label={option.name}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid
                item
                xs={12}
                md={3}
                lg={3}
                className={classes.inputField}
                style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 5 }}
            >
                <InputLabel className={classes.InputLabel}>Main Menu</InputLabel>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="api"
                        name="level"
                        value={formData.level}
                        className={classes.radioBtns}
                        onChange={onFormChange}
                    >
                        {mainMenu.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
                                label={option.name}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Grid>
            {formData.level === '1' && (
                <Grid item xs={12} md={6} lg={6}>
                    <InputLabel className={classes.InputLabel}>Icon</InputLabel>
                    <CustomInput
                        onChange={onFormChange}
                        name="icon"
                        value={formData.icon}
                        autoFocus
                        fullWidth
                        style={{ width: 300 }}
                        // className={classes.textField}
                        size="lg"
                    />
                    {/* {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )} */}
                </Grid>
            )}
            {formData.level === '2' && (
                <Grid item xs={12} md={6} lg={6}>
                    <InputLabel className={classes.InputLabel}>Main Menu</InputLabel>
                    <SelectOption
                        options={mdrawerResponse}
                        onChange={onFormChange}
                        value={formData.component}
                        name="component"
                        id="id"
                        calName
                        noLabel
                    />
                    {/* {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )} */}
                </Grid>
            )}
            {formData.level === '1' && (
                <Grid item xs={12} md={6} lg={6}>
                    <InputLabel className={classes.InputLabel}>Sequence</InputLabel>
                    <CustomInput
                        onChange={onFormChange}
                        name="sequence"
                        value={formData.sequence}
                        type="number"
                        required
                        autoFocus
                        fullWidth
                        style={{ width: 300 }}
                        // className={classes.textField}
                        size="lg"
                    />
                    {/* {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )} */}
                </Grid>
            )}
            <Grid item xs={12} md={6} lg={6}>
                <InputLabel className={classes.InputLabel}>User Role Access</InputLabel>
                <SelectOption
                    options={options?.data}
                    onChange={onFormChange}
                    value={formData.useraccessroleId}
                    name="useraccessroleId"
                    id="id"
                    noLabel
                />
                {/* {input.alert && (
                    <div className={classes.selectAlert}>
                        {input.label} {input.alert}
                    </div>
                )} */}
            </Grid>
        </Grid>
    );
};

export default AddDrawerForm;
