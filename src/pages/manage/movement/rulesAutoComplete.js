/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import factsResponse from './responseWithFacts.json';
import { useSelector, useDispatch } from 'react-redux';
import { getCondition, getAll } from 'redux/actions/manage/rulePageAction';
import PersonIcon from '@material-ui/icons/Person';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import StopIcon from '@material-ui/icons/Stop';
import GroupIcon from '@material-ui/icons/Group';

export default function Grouped({ name, value, onChange }) {
    const [factTypes, setFactTypes] = React.useState([]);
    const [conditions, setConditions] = React.useState([]);
    const { allData } = useSelector((state) => state.getAll);
    const { condition } = useSelector((state) => state.rulePageReducer);
    const { notificationType, notifyBy, emailTemplate, error } = useSelector(
        (state) => state.getNotificationType.notification
    );
    // console.log(error);
    const [user, setUser] = React.useState([]);
    const [product, setProduct] = React.useState([]);
    const [device, setDevice] = React.useState([]);
    const dispatch = useDispatch();
    const collection = {
        factTypes: factTypes,
        factConditions: condition?.data,
        users: factsResponse.data.users.usersCollection,
        products: factsResponse.data.product.refskusCollection,
        devices: factsResponse.data.devices.devicegroupsCollection,
        notificationTypes: notificationType.data,
        notifyData: notifyBy.data,
        emailTemplate: emailTemplate.data,
        smsTemplate: smsTemplate,
        popupTemplate: popupTemplate,
        resolutionTypes: resolutionTypes,
        selectedFact: selectedFact,
        selectedNotification: selectedNotification,
        selectedResolution: selectedResolution
    };

    const setData = () => {
        // let deviceTemp = allData?.data?.devices?.devicegroupsCollection
        // let productTemp = allData?.data?.product?.productgroupsCollection
        // let userTemp = allData?.data?.users?.usergroupsCollection
        // setUser(allData?.data?.devices?.devicesCollection)
        // setProduct(allData?.data?.refskusCollection)
        // setDevice(allData?.data?.devicesCollection)
        //  const tempData = allData.data.slice(0)
        setFactTypes(allData?.data);
    };
    React.useEffect(() => {
        if (allData) {
            setData();
        }
    }, []);

    return (
        <Autocomplete
            options={collection[name]}
            groupBy={(option) => name !== 'factConditions' && option.type}
            getOptionLabel={(option) =>
                option?.name === undefined ? option?.title : option?.name ? option?.name : 'undefined'
            }
            renderOption={(option) => (
                <>
                    {option.collectionName === 'users' && name === 'factTypes' ? (
                        <PersonIcon style={{ marginRight: '10px', opacity: '0.9' }} fontSize="small" color="primary" />
                    ) : option.collectionName === 'devices' && name === 'factTypes' ? (
                        <ViewModuleIcon
                            style={{ marginRight: '10px', opacity: '0.9' }}
                            fontSize="small"
                            color="primary"
                        />
                    ) : option.collectionName === 'usergroups' && name === 'factTypes' ? (
                        <GroupIcon style={{ marginRight: '10px', opacity: '0.9' }} fontSize="small" color="primary" />
                    ) : (
                        name === 'factTypes' && (
                            <StopIcon
                                style={{ marginRight: '10px', opacity: '0.9' }}
                                fontSize="small"
                                color="primary"
                            />
                        )
                    )}
                    {option?.name === undefined ? option?.title : option?.name ? option?.name : 'undefined'}
                </>
            )}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            onChange={(e, value) => onChange(e, value)}
            value={value}
        />
    );
}

const selectedFact = [{ title: 'Selected Fact', type: 'fact' }];
const selectedNotification = [{ title: 'Selected Notification', type: 'Notification' }];
const selectedResolution = [{ title: 'Selected Resolution', type: 'Resolution' }];

const resolutionTypes = [
    { title: 'Remove Unit', type: 'Resolution Type' },
    { title: 'Check Temperature of Device', type: 'Resolution Type' }
];

const smsTemplate = [
    { title: 'Message 1', type: 'sms' },
    { title: 'Message 2', type: 'sms' },
    { title: 'Message 3', type: 'sms' }
];
const popupTemplate = [
    { title: 'Popup 1', type: 'popup' },
    { title: 'Popup 2', type: 'popup' },
    { title: 'Popup 3', type: 'popup' }
];

const factConditions = [
    {
        title: 'Is preparation required',
        type: 'Product Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Allowed in devices',
        type: 'Product Condition',
        selectType: 'dropDown',
        selectName: 'devices',
        label: 'Device || Device Group'
    },
    {
        title: 'Allowed timeout',
        type: 'Product Condition',
        selectType: 'input',
        selectName: 'timeMins',
        label: 'Duration'
    },
    {
        title: 'Can have minimum temperature',
        type: 'Product Condition',
        selectType: 'input',
        selectName: 'min',
        label: 'Temprature'
    },
    {
        title: 'Can have maximum temperature',
        type: 'Product Condition',
        selectType: 'minMax',
        selectName: 'minMax',
        label: 'Temprature'
    },
    {
        title: 'Reactivation Time',
        type: 'Product Condition',
        selectType: 'input',
        selectName: 'timeMins',
        label: 'Duration in Minutes'
    },
    {
        title: 'Expiry change allowed',
        type: 'Product Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Nearest expiry alert',
        type: 'Product Condition',
        selectType: 'input',
        selectName: 'timeMins',
        label: 'Duration in Minutes'
    },
    {
        title: 'Allowed to use after expired',
        type: 'Product Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Authorised user can use expired ',
        type: 'Product Condition',
        selectType: 'dropDown',
        selectName: 'devices',
        label: 'User || User Group'
    },
    {
        title: 'Dereservation date mandatory',
        type: 'Product Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Default dereservation',
        type: 'Product Condition',
        selectType: 'input',
        selectName: 'timeMins',
        label: 'Duration in Days'
    },
    {
        title: 'Amendment default dereservation',
        type: 'Product Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Deservation for amendment alert',
        type: 'Product Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Deservation for user access for amendment',
        type: 'Product Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Out of order alert',
        type: 'Product Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Product group assignment',
        type: 'Product Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Fated of unit user can access',
        type: 'Product Condition',
        selectType: 'dropDown',
        selectName: 'users',
        label: 'User || User Group'
    },
    {
        title: 'Fated of unit alert',
        type: 'Product Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Can hold Product',
        type: 'Storage Condition',
        selectName: 'products',
        selectType: 'dorpDown',
        label: 'Product'
    },
    {
        title: 'Can not hold Product',
        type: 'Storage Condition',
        selectName: 'products',
        selectType: 'dorpDown',
        label: 'Product'
    },
    {
        title: 'Can hold unassigned Product',
        type: 'Storage Condition',
        selectName: 'products',
        selectType: 'dorpDown',
        label: 'Product'
    },
    {
        title: 'Can have maximum temperature',
        type: 'Temperature Condition',
        selectType: 'input',
        selectName: 'max',
        label: 'Max Value'
    },
    {
        title: 'Can have minimum temperature',
        type: 'Temperature Condition',
        selectType: 'input',
        selectName: 'min',
        label: 'Min Value'
    },
    {
        title: 'Can have temperature between',
        type: 'Temperature Condition',
        selectType: 'minMax',
        selectName: 'minMax',
        label: 'Min and Max Values'
    },
    {
        title: 'Door can be open for maximum minutes',
        type: 'Access Condition',
        selectName: 'timeMins',
        selectType: 'input',
        label: 'Duration'
    },
    {
        title: 'Allowed access to Users',
        type: 'Access Condition',
        selectType: 'dropDown',
        selectName: 'users',
        label: 'User Group'
    },
    {
        title: 'Allowed access in emergency',
        type: 'Access Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Allowed access by recepient Name only',
        type: 'Access Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    },
    {
        title: 'Allowed access by recepient Name and DOB only',
        type: 'Access Condition',
        selectType: 'yesNo',
        selectName: 'switch',
        label: 'Option'
    }
];

const products = [
    { title: 'Red Cell', type: 'product' },
    { title: 'All Product', type: 'product' },
    { title: 'Product 1', type: 'product' },
    { title: 'Product 2', type: 'product' }
];
