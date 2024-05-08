import { Grid, IconButton, ListItemAvatar, Paper, Tooltip, Typography } from '@material-ui/core';
import { Checkbox, CONSTANTS, CustomButton, CustomSearch, Filter } from 'common';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { clearVoucher, getVoucherResponse } from 'redux/actions/manage/scManageViewActions';
import { useStyles } from './style';
import moment from 'moment';
// import voucherData from '../../JSON/sampleVoucherData.json';
import { CustomDialog, CustomTable } from 'components';
import CustomIcon from '../../components/iconButton';
import samplePdf from '../../common/samplePdf.pdf';
import sampleExcel from '../../common/sampleExcel.xlsx';
import IconPDF from '../../assets/pdfIcon.svg';
import IconExcel from '../../assets/excelIcon.svg';
import SkeletonTable from 'components/loader/loaderNew.container';
import Skeleton from 'components/loader/loader.container';

import NoData from 'components/no data';
import { getVoucherRowData } from 'redux/actions/voucherDisplayConf';
import { AddAlertRounded } from '@material-ui/icons';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import VerticalDivider from 'components/verticalDivider';
import { putDisplayConfigData } from 'redux/actions/manage/manageFieldsAction';
import CustomInput from 'components/inputfeild';
import EditIcon from '@material-ui/icons/Edit';
import { clearData, getData } from 'redux/actions/scGenericApiCalls';
import DisplayConfig from 'components/displayConfig';

const TransactionVoucher = () => {
    const classes = useStyles();
    const [pageSize, setPageSize] = useState(10);
    const location = useLocation();

    const [voucherMap, setVoucherMap] = useState([]);
    const [loader, setLoader] = useState(true);

    const { dateFormat } = useSelector((state) => state.dateFormat);

    const [voucherData, setVoucherData] = useState({});
    console.log("vouchData",voucherData)
    const [voucherLoading, setVoucherLoading] = useState(false);

    const { voucherRow } = useSelector((state) => state.voucherRowData);

    const mangeModule = JSON.parse(localStorage.getItem('mangeModule'));

    const dispatch = useDispatch();

    const history = useHistory();

    const staticDConf = [
        {
            _id: '60effa2795c6755be89bdf76',
            code: 'BS-CM-31001',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'donationCode',
            label: 'Unit ID',
            sequence: 1,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.275Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf77',
            code: 'BS-CM-31002',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'productcodeId[0].isbtcode',
            label: 'Product Code',
            sequence: 3,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.276Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf78',
            code: 'BS-CM-31003',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'productcodeId[0].isbtdescription',
            label: 'Product Description',
            sequence: 4,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.276Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf79',
            code: 'BS-CM-31004',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'dereservationDate',
            label: 'Dereservation Date',
            sequence: 5,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.277Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf7a',
            code: 'BS-CM-31005',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'deviceId[0].name',
            label: 'Device',
            sequence: 6,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.278Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf7b',
            code: 'BS-CM-31006',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'locationId[0].name',
            label: 'Location',
            sequence: 7,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.278Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf7c',
            code: 'BS-CM-31007',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'recipientId[0].name',
            label: 'Recipient Name',
            sequence: 8,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.279Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf7d',
            code: 'BS-CM-31008',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'recipientId[0].mrnNumber',
            label: 'MRN Number',
            sequence: 9,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.280Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf7e',
            code: 'BS-CM-31009',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'recipientId[0].dob',
            label: 'DOB',
            sequence: 10,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.280Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf7f',
            code: 'BS-CM-31010',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'collectionDateAndTime',
            label: 'Collection Date and Time',
            sequence: 11,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.281Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf80',
            code: 'BS-CM-31011',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'productiontionDateAndTime',
            label: 'Production Date and Time',
            sequence: 12,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.282Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf81',
            code: 'BS-CM-31012',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'expiryDateAndTime',
            label: 'Expiry Date and Time',
            sequence: 13,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.282Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf82',
            code: 'BS-CM-31013',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'authorityId[0].name',
            label: 'Authority',
            sequence: 14,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.283Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf83',
            code: 'BS-CM-31014',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'clientId[0].name',
            label: 'Hospital',
            sequence: 15,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.284Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf84',
            code: 'BS-CM-31015',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'bloodgroupId[0].name',
            label: 'Blood Group',
            sequence: 16,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.284Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf85',
            code: 'BS-CM-31016',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'trackId[0].name',
            label: 'Status',
            sequence: 17,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.285Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf86',
            code: 'BS-CM-31017',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'createdBy[0].firstName',
            label: 'Created By',
            sequence: 18,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.286Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf87',
            code: 'BS-CM-31018',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'createdAt',
            label: 'Created At',
            sequence: 19,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.286Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        },
        {
            _id: '60effa2795c6755be89bdf88',
            code: 'BS-CM-31019',
            createdBy: '60ed2e4814faf16c01fa9031',
            updatedBy: '60ed2e4814faf16c01fa9031',
            dbProperty: 'rfidNumber',
            label: 'RFID Number',
            sequence: 2,
            isVisible: 1,
            mref: 'refskus',
            childDataTable: null,
            isClickable: null,
            isActive: 1,
            createdAt: '2021-07-15T09:04:39.287Z',
            updatedAt: '2021-07-15T09:06:30.150Z'
        }
    ];

     const keyFine = (key, row) => {
         let keys = key.split('.');
         if (row && keys[0]?.includes('[0]')) {
             keys[0] = keys?.[0]?.substr(0, keys?.[0]?.indexOf('['));
         }
         if (keys[0] === 'skuId') {
             if (keys[2] === 'expiryDate') {
                 return row[keys[0]]?.[keys[1]]?.[0]?.[keys[2]];
             }
             if (keys[2] === 'collectionDate') {
                 return row[keys[0]]?.[keys[1]]?.[0]?.[keys[2]];
             }
             return row[keys[0]]?.['rfidNumber'];
         }
         if (keys[0] === 'clientId') {
             if (keys[1] === 'name') {
                 if (row[keys[0]]?.[keys[1]] !== undefined) return row[keys[0]]?.[keys[1]];
                 else if (row[keys[0]]?.[0] !== undefined && row[keys[0]]?.[0]?.[keys[1]] !== undefined)
                     return row[keys[0]]?.[0][keys[1]];
                 else return '-';
             }
             if (keys[1] === 'code') {
                 return row[keys[0]]?.[keys[1]];
             }
         }
         if (keys[0] === 'locationTypeId') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 if (keys[1] === 'name') {
                     if (row[keys[0]]?.[keys[1]] !== undefined) {
                         return row[keys[0]]?.[keys[1]];
                     }
                     if (row[keys[0]]?.[0] !== undefined && row[keys[0]]?.[0]?.[keys[1]] !== undefined)
                         return row[keys[0]]?.[0]?.[keys[1]];
                     else return '-';
                 }
             }
         }

         if (keys[0] === 'locationId') {
             if (keys[1] === 'name') {
                 if (row[keys[0]]?.[0] !== undefined && row[keys[0]]?.[0]?.[keys[1]] !== undefined)
                     return row[keys[0]]?.[0]?.[keys[1]];
                 else return '-';
             }
         }
         if (keys[0] === 'deviceTypeId') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 if (keys[1] === 'name') {
                     if (row[keys[0]]?.[0] !== undefined && row[keys[0]]?.[0]?.[keys[1]] !== undefined)
                         return row[keys[0]]?.[0]?.[keys[1]];
                     else return '-';
                 }
             }
         }

         if (keys[0] === 'labsId') {
             return row[keys[0]]?.[0]?.[keys[1]];
         }

         if (keys[0] === 'createdBy') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 if (row[keys[0]]?.[0]?.[keys[1]] === 'undefined') {
                     return row[keys[0]]?.[0]?.[keys[1]];
                 } else {
                     return 'admin';
                 }
             }
         }
         if (keys[0] === 'updatedBy') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 if (row[keys[0]]?.[0]?.[keys[1]] === 'undefined') {
                     return row[keys[0]]?.[0]?.[keys[1]];
                 } else {
                     return 'admin';
                 }
             }
         }

         if (keys[0] === 'authorityId') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 return row[keys[0]]?.[0]?.[keys[1]];
             }
         }
         if (keys[0] === 'actionId') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 return row[keys[0]]?.[0]?.[keys[1]];
             }
         }
         if (keys[0] === 'conditionId') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 return row[keys[0]]?.[0]?.[keys[1]];
             }
         }
         if (keys[0] === 'userroleId') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 return row[keys[0]]?.[0]?.[keys[1]];
             }
         }
         if (keys[0] === 'refskuId') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 return row[keys[0]]?.[0]?.[keys[1]];
             }
         }
         if (keys[0] === 'deviceId') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 return row[keys[0]]?.[0]?.[keys[1]];
             }
         }
         if (keys[0] === 'userId') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 return row[keys[0]]?.[0]?.[keys[1]];
             }
         }
         if (keys[0] === 'trackId') {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 return row[keys[0]]?.[0]?.[keys[1]];
             }
         } else {
             let hasOwnProp = row && Object.keys(row).some((item) => item === keys[0]);
             if (hasOwnProp) {
                 return row[keys[0]]?.[0]?.[keys[1]];
             }
         }
     };

    const handleVoucherDisplayDate = (row) => {

         let voucherDeatils = staticDConf
             .filter((item) => item.dbProperty !== '#' && item.dbProperty !== '@' && item.dbProperty !== 'name')
             .map((item) => {
                 let valueOfItem;
                 if (item.dbProperty.includes('.')) {
                     let keyFineValue = keyFine(item.dbProperty, row);
                     valueOfItem = keyFineValue;
                     if (item.dbProperty === 'refskuId[0].expiryDateAndTime') {
                         valueOfItem = moment(valueOfItem).format(dateFormat);
                     }
                     if (item.dbProperty === 'refskuId[0].productiontionDateAndTime') {
                         valueOfItem = moment(valueOfItem).format(dateFormat);
                     }
                 } else {
                     valueOfItem = row?.[item?.dbProperty];
                 }
                 if (item.dbProperty === 'createdAt') {
                     return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                 }
                 if (item.dbProperty === 'collectionDateAndTime') {
                     return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                 }
                 if (item.dbProperty === 'productiontionDateAndTime') {
                     return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                 }
                 if (item.dbProperty === 'expiryDateAndTime') {
                     return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                 }
                 if (item.dbProperty === 'expiry') {
                     return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                 }
                 if (item.dbProperty === 'date') {
                     return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                 }
                 if (item.dbProperty === 'dob') {
                     return { key: item.label, value: moment(valueOfItem).format(dateFormat) };
                 }
                 return { key: item.label, value: valueOfItem };
             });
        setLoader(false);
        console.log("voucherdetails---", voucherDeatils)
         voucherDeatils !== 'undefined' ? setVoucherMap([...voucherDeatils]) : setVoucherMap([]);
         return voucherDeatils;
     };

    const handleClearVoucher = () => {
        let previousRowName = JSON.parse(localStorage.getItem('previousRowName'));

        localStorage.setItem('currentRowName', JSON.stringify(previousRowName));
        dispatch(clearVoucher());
        history.goBack();
    };

    const capitalize = (expression) => expression.charAt(0).toUpperCase() + expression.slice(1);

    const handleVoucher = (row, displayConfig, name) => {
        let childDataTable;
        if (displayConfig) {
            childDataTable = displayConfig;
        } else {
            childDataTable = row.childDataTable;
        }
        let rowName;
        if (name) {
            rowName = name;
        } else {
            rowName = row.name;
        }
        localStorage.setItem('currentRowName', JSON.stringify(rowName));
        let filterdUrl = currentPath.slice(0, currentPath.length - 3).join('/');
        if (row.name) {
            history.push(`${filterdUrl}/${row.name.toLowerCase()}/${childDataTable}/${lastThreeItems[0]}/${row._id}`);
        }
    };

    let currentPath = location.pathname.split('/');
    let lastThreeItems = currentPath.slice(currentPath.length - 3, currentPath.length);

    //Changes for displayConfig
    const [displayConfigOpen, setDisplayConfigOpen] = useState(false);
    const [dChecked, setDchecked] = useState(voucherRow?.displayConfigData);
    const [tabIndex, setTabIndex] = useState(0);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { displayConfigloading, putDisplayConfigResponse } = useSelector((state) => state.putDisplayConfig);
    const [editLabel, setEditLabel] = useState('');
    const [noChildDataTalbe, setNoChilDataTable] = useState(false);

    const handledisplayConfigClose = () => {
        setDisplayConfigOpen(false);
        setDchecked(voucherRow?.displayConfigData);
    };
    const handledisplayConfigOpen = () => {
        setDisplayConfigOpen(true);
    };
    const submitDisplayConfigCallback = (e) => {
        let object = {};
        object.collectionName = 'column';
        object.validData = dChecked;
        let json = JSON.stringify(object);
        dispatch(putDisplayConfigData(json));
        setDisplayConfigOpen(false);
    };
    useEffect(() => {
        // displayConfigloading === false && setAlertOpen1(true);
        putDisplayConfigResponse?.status === true && dispatch(getVoucherRowData(lastThreeItems[1]));
        // setTimeout(() => {
        //     putDisplayConfigResponse?.status && dispatch(clearFormData());
        // }, 4000);
    }, [displayConfigloading, putDisplayConfigResponse]);
    useEffect(() => {
        setDchecked(voucherRow?.displayConfigData);
    }, [voucherRow]);

    const onDChange = (row, e) => {
        const name = e.target.name;
        const value = name === 'isVisible' ? (e.target.checked === true ? 1 : 0) : e.target.value;
        const { _id } = row;
        const newRows = dChecked.map((row) => {
            if (row._id === _id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setDchecked(newRows);
    };

    //Changes for displayConfig

    // useEffect(() => {
    //     let removeUnnecessary = lastThreeItems[1].includes('-')
    //         ? lastThreeItems[1].split('-').join('')
    //         : lastThreeItems[1];

    //     dispatch(getVoucherRowData(removeUnnecessary)); //forVoucheDetails
    //     if (lastThreeItems[0] === 'undefined' || lastThreeItems[0] === 'null') {
    //         // dispatch(clearVoucher());
    //         setLoader(false);
    //         setNoChilDataTable(true);
    //     } else {
    //         dispatch(getVoucherResponse(lastThreeItems[0], lastThreeItems[2], lastThreeItems[1])); //forTable
    //         setLoader(true);
    //     }
    //     // on Every location change this will call api to get Data
    //     // 0 index if for childData Table, 1 index is for parentTable's childDataTable name, and 2 is for id of the row
    // }, [location]);

    let voucherRowConf = voucherRow && voucherRow.data.filter((item) => item._id === lastThreeItems[2])[0];

    let voucherRowDisplay =
        (voucherRow && voucherRow?.displayConfigData) || voucherRow?.displayConfigData?.displayConfig;

    React.useEffect(() => {
        if (voucherRowConf && voucherRowDisplay) {
            // handleVoucherDisplayDate(voucherRowConf, voucherRowDisplay);
        }
    }, [voucherRow]);

    // Search Box Changes
    const [searchKey, setSearchKey] = useState('');
    const handleSearchDelete = () => {
        setSearchKey('');
        dispatch(getVoucherResponse(lastThreeItems[0], lastThreeItems[2], lastThreeItems[1]));
    };

    const handleSearch = (searchKey) => {
        setSearchKey(searchKey);
        if (searchKey.length > 2) {
            dispatch(clearData());
            dispatch(
                getVoucherResponse(lastThreeItems[0], lastThreeItems[2], lastThreeItems[1], JSON.stringify(searchKey))
            );
        } else if (searchKey === '') {
            dispatch(getVoucherResponse(lastThreeItems[0], lastThreeItems[2], lastThreeItems[1]));
        }
    };

    const staticRow = [
        { key: 'Vouche Number', value: 'voucherNumber' },
        { key: 'Transaction Status', value: 'transactionStatus' },
        { key: 'Transaction Type', value: 'transactionType' },
        { key: 'Units Issued', value: 'unitCounts' },
        { key: 'Branch', value: 'clientId[0].name' }
    ];

    const staticVoucherRow = location?.state?.row;

    useState(() => {
        let tempResponse = {
            status: true,
            error: null,
            displayConfigData: staticDConf,
            message: 'Fetch Successful',
            data: location?.state?.data,
            page: {
                hasNextPage: location?.state?.data?.length > pageSize ? true : false,
                currentPage: 1,
                filterCount: location?.state?.data?.length,
                totalCount: location?.state?.data?.length
            }
        };
        setVoucherData(tempResponse);
        console.log("tempresponse", tempResponse)
        // handleVoucherDisplayDate(location?.state?.row);
    }, [location]);

    return (
        <>
            {voucherLoading === true && searchKey === '' ? (
                <div className={classes.formLoader}>
                    <Skeleton type="table" />
                </div>
            ) : (
                <>
                    <Grid xs={12} item className={classes.buttonGrid}>
                        <CustomButton variant="outlined" color="primary" onClick={handleClearVoucher}>
                            {CONSTANTS.BACK}
                        </CustomButton>
                    </Grid>
                    <Grid>
                        <Paper elevation={0} className={classes.paper}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container>
                                        {staticRow?.map((item, index) => {
                                            if (item.value) {
                                                return (
                                                    <Grid
                                                        item
                                                        key={index.toString()}
                                                        className={classes.contentGrid}
                                                        spacing={2}
                                                        xs={4}
                                                    >
                                                        <Typography color="primary" className={classes.itemLabel}>
                                                            {capitalize(item.key)}
                                                        </Typography>
                                                        <Typography className={classes.colonClass}>{' : '}</Typography>
                                                        <Typography className={classes.voucherValue}>
                                                            {item.value === 'clientId[0].name'
                                                                ? staticVoucherRow?.['clientId']?.[0]?.name
                                                                : staticVoucherRow[item.value]}
                                                        </Typography>
                                                    </Grid>
                                                );
                                            }
                                        })}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        {noChildDataTalbe ? null : (
                            <Paper elevation={0} className={classes.tablePaper}>
                                <Grid>
                                    <Grid container style={{ padding: 5 }}>
                                        {/* <Grid item xs={5}>
                                            <CustomSearch
                                                value={searchKey}
                                                size="md"
                                                placeholder={'Search'}
                                                handleChange={(e) =>
                                                    e.target.value !== ' ' ? handleSearch(e.target.value) : null
                                                }
                                                handleSearchDelete={handleSearchDelete}
                                                loader={
                                                    searchKey && searchKey.length < 3
                                                        ? true
                                                        : searchKey && voucherLoading
                                                }
                                            />
                                        </Grid> */}
                                        {/* <Grid xs={7} item style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <DisplayConfig
                                                response={voucherRow?.displayConfigData}
                                                urlEndPoint={lastThreeItems[0]}
                                                pageSize={pageSize}
                                            />
                                        </Grid> */}
                                    </Grid>
                                    {voucherData?.data?.length > 0 ? (
                                        <Grid>
                                            <CustomTable
                                                response={voucherData}
                                                handleVoucher={handleVoucher}
                                                history={history}
                                                rowsPerPage={pageSize}
                                                module={mangeModule}
                                            />
                                        </Grid>
                                    ) : (
                                        <NoData />
                                    )}
                                </Grid>
                            </Paper>
                        )}
                    </Grid>
                </>
            )}
        </>
    );
};

export default TransactionVoucher;
