import { useForm } from 'unused-code/useForm2';
import React, { useState } from 'react';
import DeviceComponent from './device.component';
import device from './deviceType.json';
import locations from './locations.json';
import hospitals from './clients.json';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices } from './service';
import responseJson from './device.json';

const Device = () => {
    const dispatch = useDispatch();
    const [openAddDevice, setOpenAddDevice] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [rowData, setRowData] = React.useState({});
    const [initialData, setInitialData] = React.useState({});
    const [isEdit, setIsEdit] = React.useState(false);

    const { loading, devices } = useSelector((state) => state.getDevices);

    // const deviceTypeList = useSelector((state) => state.deviceTypeList);
    // const { deviceType } = deviceTypeList;

    // const locationTypeList = useSelector((state) => state.locationTypeList);
    // const { locationType } = locationTypeList;

    // const clientList = useSelector((state) => state.clientList);
    // const { client } = clientList;

    const { apiBehavior } = useSelector((state) => state.changeResponse);

    const handleSubmit = () => {
        // console.log('values', values);
    };
    React.useEffect(() => {
        dispatch(getDevices());
    }, []);

    const { values, errors, bindField, isValid, setErrors, setValues, error } = useForm({
        validations: {
            locationId: {
                pattern: {
                    value: /^[^\s]+(\s+[^\s]+)*$/
                }
            },
            clientId: {
                pattern: {
                    value: /^[^\s]+(\s+[^\s]+)*$/
                }
            },
            serialNumber: {
                pattern: {
                    value: /^[^\s]+(\s+[^\s]+)*$/
                }
            },
            ipAddress: {
                pattern: {
                    value: /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/
                }
            },
            deviceTypeId: {
                pattern: {
                    value: /^[^\s]+(\s+[^\s]+)*$/
                }
            }
        },
        initialValues: rowData
    });

    const handleEditDialog = () => {
        setEditDialogOpen(true);
        setIsEdit(true);
    };
    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
        setValues(initialData);
        setErrors({});
        setIsEdit(false);
    };

    const handleOpenAddDevice = () => {
        setOpenAddDevice(true);
        setRowData({});
    };

    const handleNextButtonClick = () => {
        setValues({});
    };
    const handleCompleteButtonClick = () => {
        setOpenAddDevice(false);
        setEditDialogOpen(false);
        handleSubmit();
    };
    const handleCloseAddDevice = () => {
        setOpenAddDevice(false);
        setErrors({});
    };

    return (
        <DeviceComponent
            response={apiBehavior === 'static' ? responseJson : responseJson}
            openAddDevice={openAddDevice}
            handleOpenAddDevice={handleOpenAddDevice}
            handleCloseAddDevice={handleCloseAddDevice}
            setOpenAddDevice={setOpenAddDevice}
            handleNextButtonClick={handleNextButtonClick}
            handleCompleteButtonClick={handleCompleteButtonClick}
            editDialogOpen={editDialogOpen}
            handleEditDialog={handleEditDialog}
            setRowData={setRowData}
            rowData={rowData}
            handleEditDialogClose={handleEditDialogClose}
            handleSubmit={handleSubmit}
            values={values}
            errors={errors}
            bindField={bindField}
            setErrors={setErrors}
            setInitialData={setInitialData}
            isValid={isValid}
            device={device}
            locations={locations}
            hospitals={hospitals}
            error={error}
            loading={loading}
            isEdit={isEdit}
        />
    );
};

export default Device;
