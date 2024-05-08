import React from 'react';
import ManagePage from '../../pages/manage/manage.container';

import { CONSTANTS, CustomButton } from 'common';
import { CustomDialog } from '../../components/index';
import { useStyles } from '../../pages/manage/style';
import { Grid, InputLabel } from '@material-ui/core';
import CustomInput from 'components/inputfeild';
import SelectOption from 'components/select';

const DeviceComponent = (props) => {
    const classes = useStyles();
    const {
        response,
        openAddDevice,
        handleOpenAddDevice,
        editDialogOpen,
        handleCloseAddDevice,
        handleEditDialogClose,
        setRowData,
        values,
        errors,
        bindField,
        handleEditDialog,
        setInitialData,
        handleNextButtonClick,
        isValid,
        device,
        hospitals,
        locations,
        handleCompleteButtonClick,
        error,
        isEdit
    } = props;

    const formContainer = (
        <Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.LABELS_LOCATION}</InputLabel>
                    <SelectOption
                        label="Select Location"
                        options={locations.data}
                        // value={}
                        name="locationId"
                        // error={userRoleError}
                        {...bindField('locationId')}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.NAME_HOSPITAL}</InputLabel>
                    <SelectOption
                        label="Select Hospital"
                        options={hospitals.data}
                        // value={}
                        name="clientId"
                        // error={userRoleError}
                        {...bindField('clientId')}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_SERIAL_NUMBER}</InputLabel>
                    <CustomInput
                        name="serialNumber"
                        value={values.serialNumber}
                        error={errors.serialNumber}
                        helperText={errors.serialNumber && CONSTANTS.ERROR_SERIAL_NUMBER}
                        autoFocus
                        fullWidth
                        style={{ width: 300 }}
                        className={classes.textField}
                        size="lg"
                        variant="outlined"
                        {...bindField('serialNumber')}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_IP_ADDRESS}</InputLabel>
                    <CustomInput
                        name="ipAddress"
                        value={values.ipAddress}
                        error={errors.ipAddress}
                        helperText={errors.ipAddress && CONSTANTS.ERROR_IP_ADDRESS}
                        autoFocus
                        fullWidth
                        style={{ width: 300 }}
                        className={classes.textField}
                        size="lg"
                        variant="outlined"
                        {...bindField('ipAddress')}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.LABELS_DEVICE_TYPE}</InputLabel>
                    {/* {console.log(values.deviceTypeId[0].name)} */}
                    <SelectOption
                        label="Select Device Type"
                        options={device.data}
                        // value={rowData === undefined ? '' : values.deviceTypeId[0].name}
                        name="deviceTypeId"
                        // error={userRoleError}
                        {...bindField('deviceTypeId')}
                    />
                </Grid>
                {!isEdit && (
                    <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                        <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_COMMENT}</InputLabel>
                        <CustomInput
                            name="comment"
                            value={values.comment}
                            autoFocus
                            fullWidth
                            style={{ width: 300 }}
                            className={classes.textField}
                            size="lg"
                            variant="outlined"
                            {...bindField('comment')}
                        />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
    return (
        <>
            <ManagePage
                response={response}
                handleOpenAddDevice={handleOpenAddDevice}
                name={CONSTANTS.NAME_DEVICES}
                edit={handleEditDialog}
                setRowData={setRowData}
                setInitialData={setInitialData}
            >
                <CustomButton variant="contained" color="primary" onClick={handleOpenAddDevice}>
                    {CONSTANTS.ADD_DEVICE}
                </CustomButton>
            </ManagePage>
            <CustomDialog
                title={CONSTANTS.ADD_DEVICE}
                open={openAddDevice}
                onClose={handleCloseAddDevice}
                onCancelClick={handleCloseAddDevice}
                onNextClick={handleNextButtonClick}
                onCompleteClick={handleCompleteButtonClick}
                disabled={error}
            >
                {formContainer}
            </CustomDialog>
            <CustomDialog
                title={CONSTANTS.EDIT + ' ' + CONSTANTS.NAME_DEVICE}
                open={editDialogOpen}
                onClose={handleEditDialogClose}
                onCancelClick={handleEditDialogClose}
                onSaveClick={handleCompleteButtonClick}
                disabled={!isValid()}
                isSave
            >
                {formContainer}
            </CustomDialog>
        </>
    );
};

export default DeviceComponent;
