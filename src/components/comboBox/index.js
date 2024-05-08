import * as React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remoteDBAccessDeviceAction } from 'redux/actions';

export default function ComboBox(props) {
    const { setSelectedDevice, selectedDevice, placeholder, name, inputRef, disabled } = props;
    const dispatch = useDispatch();
    const [allDevices, setAllDevices] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const { userInfo } = useSelector((state) => state.userLogin);
    const remoteDBAccessDeviceId = useSelector((state) => state.remoteDBAccessDeviceStore);

    const handleOnChange = async (event, value) => {
        // console.log('selected device id  ', value?._id);
        if (value?.name) {
            localStorage.setItem('remoteDevDevice', JSON.stringify(value));
        }
        setSelectedDevice(value);
    };

    const getData = () => {
        fetch('/api/v1/index?collectionName=' + name + '&pageSize=0&pageNumber=1', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
                Authorization: userInfo?.data?.token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (name === 'device') {
                    const remoteDevice = data.data.filter((device) => !device.name.includes('Associate'));
                    setAllDevices(remoteDevice);
                } else setAllUsers(data.data);
            });
    };

    React.useEffect(() => {
        getData();
    }, []); // <-- Have to pass in [] here!

    return (
        <Autocomplete
            style={{
                width: 300,
                backgroundColor: '#fff'
            }}
            onChange={handleOnChange} // prints the selected value
            disablePortal
            disabled={disabled}
            id="combo-box-demo"
            options={name === 'device' ? allDevices : allUsers}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
                <TextField {...params} inputRef={inputRef} variant="outlined" placeholder={placeholder} />
            )}
        />
    );
}
