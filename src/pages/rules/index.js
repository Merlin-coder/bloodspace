import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, InputLabel, Paper, Switch, Typography, CircularProgress, Box, Select, FormControl, MenuItem } from '@material-ui/core';
import FlareIcon from '@material-ui/icons/Flare';
import 'font-awesome/css/font-awesome.min.css';
import { useHistory } from 'react-router';
import pluralize from 'pluralize';
import CustomChip from 'components/chip';
import ConfirmationDialog from 'components/confirmations/confirmation.container';
import { Alert, CONSTANTS, CustomButton, CustomSearch } from 'common';
//import { getData, clearData, getExportData } from '../../redux/actions/scGenericApiCalls';
import { CustomDialog, CustomTable } from 'components';
import { getData, clearData, getExportData } from '../../redux/actions/scGenericApiCalls';
import NoData from 'components/no data';
import DisplayConfig from 'components/displayConfig';
import AutoComplete from '../../components/autoComplete';
import CustomInput from 'components/inputfeild';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import { createAlert } from 'redux/actions';
import {
    get2ndDropdown,
    get3rdDropdown,
    getDropDown,
    changeLOcationData,
    clearChangeLocationData,
    clearGetTransactionData,
    getTransferData,
    postTransferData,
    putHeaderAction,
    clearheaderActionsResponse
} from 'redux/actions';
import {
    clear4thDropDown,
    clear5thDropDown,
    clearDeleteResponse,
    clearPutResponse,
    deleteFormData,
    get5thDropdown,
    get6thDropdown,
} from 'redux/actions/manage/manageFieldsAction';
import { useLocation } from 'react-router-dom';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import DeviceSelection from 'components/socketDeviceSelection/socketDeviceSelection';
import { SocketScanData } from 'redux/actions/socketAction';
//import { getData, clearData, getExportData } from '../../redux/actions/scGenericApiCalls';
import {

    socketAssociateBulkData,
    assignLocalDataAction
} from 'redux/actions/socketAction';
import ReportFilter from 'components/reportFilters';
import HeaderIcons from 'components/header-button-and-icons';
import axios from 'axios';
import fileDownload from 'js-file-download';
import {
    getCondition,
    getAll,
    getResolutionType,
    getnotificationTypes,
    postNotification,
    putRulesData,
    getResolutionSubType,
    clearRuleTypePost,
    getAllCondition
} from 'redux/actions/manage/rulePageAction';
import { getVoucherResponse } from 'redux/actions/manage/scManageViewActions';
import Grouped from '../../pages/manage/movement/GenericRulesAutoComplete';
import { SelectOption } from 'components';
import { getFilterCriteria } from 'redux/actions/filters/filtersActions';


const Rules = ({ type }) => {
    console.log('tyyyyyy',type)
    const { options } = useSelector((state) => state.getDropDown);
    console.log("options", options)
    const [bloodGroup, setBloodGroup] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
    const { allData } = useSelector((state) => state.getAll);
    console.log("all---", allData)
    const { condition } = useSelector((state) => state.rulePageReducer);
    console.log("cond-", condition)
    const { allCondition } = useSelector((state) => state.ruleAllPageReducer);
    const { resolutionType } = useSelector((state) => state.resolutionType);
    const { resolutionSubType } = useSelector((state) => state.getResolutionSubType);
    console.log("re---", resolutionSubType)
    const { factId } = useSelector((state) => state.factId);
    const { notificationId } = useSelector((state) => state.notificationId);
    const { resolutionId } = useSelector((state) => state.resolutionId);
    const { postRuleSuccess, postRuleError } = useSelector((state) => state.postRuleType);
    const { putRuleSuccess, putRuleError, putRuleTypeLoading } = useSelector((state) => state.putRuleResponse);
    const [callData, setCallData] = useState(false);
    const { notification } = useSelector((state) => state.getNotificationType);
    const { notificationType, emailTemplate, notifyBy } = { ...notification };
    const { loading, responseData } = useSelector((state) => state.getData);
    console.log("res----------", responseData)
    const [factData, setFactData] = useState({});
    console.log("fact---", factData)
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [alert, setAlert] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [timeError, setTimeError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formError, setFormError] = useState(false);
    const [rowData, setRowData] = useState({});
    console.log("row-", rowData);
    const [pageSize, setPageSize] = useState(10);
    const [showFilters, setShowFilters] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [filterChips, setFilterChips] = useState();
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectedUserNames, setSelectedUserNames] = useState([]);
    const [selectedData, setSelectedData] = useState(0);
    const getStaticFilters = useSelector((state) => state.getStaticFilters);

    const [selectAllRecords, setSelectedAllRecordsFlag] = useState(false);
    const [sortValue, setSortValue] = useState({});
    const [pageNum, setPageNum] = useState(0);
    const [cloneDialogOpen, setCloneDialogOpen] = useState(false);
    const [ruleBreakDialogOpen, setRuleBreakDialogOpen] = useState(false);
    const [apiType, setApiType] = useState('');
    const [check, setCheck] = useState(false);
    const { userAccessData, userAccessLoading } = useSelector((state) => state.getUserAccess);
    const [codesAndDescription, setCodesAndDescription] = useState({}); //to check codes related to this submenu
    const [accessableCodes, setAccessableCodes] = useState([]);
    console.log('accessableCodes', accessableCodes)
    const [resolutionSubTypeValue, setResolutionSubTypevalue] = useState(false);
    const [subTypeFlag, setSubTypeFlag] = React.useState(false);
    const [factNo, setFactNo] = useState(1);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [helperTextHr, setHelperTextHr] = useState('');
    const [helperTextMin, setHelperTextMin] = useState('');
    const [factTypeText, setFacTypeText] = useState('');
    const [notificationTypeText, setNotificationTypeText] = useState('');
    const [resolutionTypeText, setResolutionTypeText] = useState('');
    const [totalCount, setTotalCount] = useState('');
    const conditionRef = React.useRef();
    const { deleteResponse, deleteError, deleteLoading } = useSelector((state) => state.deleteField);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postAddError, setPostAddError] = useState('');
    const [mutlipleRulesObject, setMultipleRulesObject] = useState([]);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { chipNameAndId, chipData, filtersData, filterKeysObjects, staticFilters } = getStaticFilters;
    const [maxTimeMinErr, setMaxTimeMinErr] = useState('');
    const [maxTimeSecErr, setMaxTimeSecErr] = useState('');
    const [refresh, doRefresh] = useState(0);
    const [deletedChip, setDeletedChip] = useState('');
    const [chipIdAndName, setChipIdAndName] = useState({});
    const [filterKeysObject, setFilterKeysObject] = useState([]);
    const [nextClick, setNextClick] = useState('');
    const [completeClick, setCompleteClick] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    console.log('selectedOption', selectedOption)
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    
    //const dispatch = useDispatch();

    //const [accessableCodes, setAccessableCodes] = useState([]);
    //const [filterKeysObject, setFilterKeysObject] = useState([]);
    //const [chipIdAndName, setChipIdAndName] = useState({});
    //const [refresh, doRefresh] = useState(0);
    //const [deletedChip, setDeletedChip] = useState('');
    //const [pageSize, setPageSize] = useState(10);
    //const [showFilters, setShowFilters] = useState('');
    //const [searchKey, setSearchKey] = useState('');
    //const [filterChips, setFilterChips] = useState();
    //const [selectedRecords, setSelectedRecords] = useState([]);
    //const [sortValue, setSortValue] = useState({});
    //const [pageNum, setPageNum] = useState(0);
    //const [cloneDialogOpen, setCloneDialogOpen] = useState(false);
    //const [ruleBreakDialogOpen, setRuleBreakDialogOpen] = useState(false);
    //const [apiType, setApiType] = useState('');
    //const [selectAllRecords, setSelectedAllRecordsFlag] = useState(false);
    //const [factTypeText, setFacTypeText] = useState('');

    
    //const { loading, responseData } = useSelector((state) => state.getData);
    //console.log("res----------", responseData)
    //const { userInfo } = useSelector((state) => state.userLogin);
    //const { allData } = useSelector((state) => state.getAll);
    //console.log("all---", allData)
    //const getStaticFilters = useSelector((state) => state.getStaticFilters);

   

    useEffect(() => {
        dispatch(getData('rules', 30, 1));
    }, [])

    useEffect(() => {
        let tempAccessCodes = [];
        if (userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1002') {
            tempAccessCodes = [
                'BS-ACO-1030',
                'BS-ACO-1031',
                'BS-ACO-1032',
                'BS-ACO-1033',
                'BS-ACO-1025',
                'BS-ACO-1026',
                'BS-ACO-1027',
                'BS-ACO-1028',
                'BS-ACO-1022',
                'BS-ACO-1029',
                'BS-ACO-1023',
                'BS-ACO-1034',
                'BS-ACO-1024'
            ];
        } else {
            let manageAccessCodes = userInfo?.data?.userAccess
                ?.filter((item) => item['drawer-code'] === 'BS-DR-0012')?.[0]
                ?.menuId?.filter((item) => item['drawer-code'] === 'BS-DR-0010')?.[0];

            let keysOfObject = manageAccessCodes && Object.keys(manageAccessCodes);
            keysOfObject.forEach((item) => {
                if (Array.isArray(manageAccessCodes[item])) {
                    manageAccessCodes[item][0] === '1' && tempAccessCodes.push(manageAccessCodes[item][1]);
                }
            });
        }
        setAccessableCodes(tempAccessCodes);
    }, [userAccessData]);

    const handleSearch = (skey) => {
        setSearchKey(skey);
        if (skey.length >= 2) {
            dispatch(clearData());
            if (showFilters?.length > 0 && sortValue?.key) {
                dispatch(getData('rules', 0, 1, skey.trim(), showFilters, sortValue));
            } else if (sortValue?.key) {
                dispatch(getData('rules', 0, 1, skey.trim(), undefined, sortValue));
            } else if (showFilters?.length > 0) {
                dispatch(getData('rules', 0, 1, skey.trim(), showFilters));
            } else {
                dispatch(getData('rules', 0, 1, skey.trim()));
            }
        } else if (showFilters?.length > 0 && sortValue?.key) {
            dispatch(getData('rules', pageSize * 3, 1, undefined, showFilters, sortValue));
        } else if (filterChips?.length > 0) {
            dispatch(getData('rules', pageSize * 3, 1, undefined, showFilters));
        } else if (sortValue?.key) {
            dispatch(getData('rules', pageSize * 3, 1, undefined, undefined, sortValue));
        } else {
            dispatch(getData('rules', pageSize * 3, 1));
        }
    };

    const handleOpenAdd = () => {
        setFacTypeText('');
        setHelperTextMin('');
        setHelperTextHr('');
        setMaxTimeMinErr('');
        setMaxTimeSecErr('');
        setErrorMessage('');
        let tempFact = {};
        tempFact[`${type}Name`] = '';
        tempFact[`${type}Description`] = '';
        setFactData({ ...tempFact });
        // setFactNo(1);
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        // dispatch(getResolutionSubType());
        setErrorMessage('');
        setNameError(false);
        setFacTypeText('');
        setOpenAdd(false);
        setFactData({});
        setBloodGroup('')
    };
    const handleEditDialog = () => {
        dispatch(getResolutionSubType());
        setOpenEdit(true);
    };
    const handleEditDialogClose = () => {
        setErrorMessage('');
        setFactData({});
        setRowData({});
        setNameError(false);
        setOpenEdit(false);
        setFacTypeText('');
    };

    const handleSearchDelete = () => {
        if (showFilters.length > 0 && sortValue?.key) {
            dispatch(getData('rules', pageSize * 3, 1, undefined, showFilters, sortValue));
        } else if (filterChips.length > 0) {
            dispatch(getData('rules', pageSize * 3, 1, undefined, showFilters));
        } else if (sortValue?.key) {
            dispatch(getData('rules', pageSize * 3, 1, undefined, undefined, sortValue));
        } else {
            dispatch(getData('rules', pageSize * 3, 1));
        }
        setSearchKey('');
    };

    const handleDownloadData = async () => {
        let collectionName = '';
        
        if (type === 'Rule') {
            collectionName = 'rules';
        }
        const userLogin = localStorage?.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                type: 'Web',
                Authorization: userLogin.data.token
            },
            responseType: 'blob'
        };
        let url = `${CONSTANTS.BASEURL}index/export?collectionName=${collectionName}`;
        url = `${url}&pageSize=${100000}`;
        url = `${url}&pageNumber=${1}`;
        if (searchKey !== undefined && searchKey.length > 0) url = `${url}&search=${JSON.stringify(searchKey)}`;
        if (showFilters !== undefined && showFilters.length > 0) url = `${url}&filters=${JSON.stringify(showFilters)}`;
        if (sortValue !== undefined && Object.keys(sortValue).length > 0)
            url = `${url}&sort=${JSON.stringify(sortValue)}`;
        await axios.get(url, config).then((response) => {
            fileDownload(response.data, type + '_' + new Date().getTime().toString() + '.xlsx');
        });
    };

    const handleResetFilters = () => {
        showFilters ? dispatch(getData('rules', pageSize * 3, 1)) : null;
        setShowFilters('');
        setFilterChips([]);
    };
    const handleSelect = (selRecords, flag) => {
        setSelectedRecords(selRecords);
        setSelectedAllRecordsFlag(flag);
        // setSelectedRow([...rows]);
        // console.log(selRecords);
    };

    const sortOperation = (sort) => {
        setSortValue(sort);
        if (showFilters?.length > 0 && searchKey?.length > 2) {
            dispatch(getData(apiType, pageSize * 3, 1, searchKey, showFilters, sort));
        } else if (searchKey?.length > 2) {
            dispatch(getData(apiType, pageSize * 3, 1, searchKey, undefined, sort));
        } else if (showFilters?.length > 0) {
            dispatch(getData(apiType, pageSize * 3, 1, undefined, showFilters, sort));
        } else {
            dispatch(getData(apiType, pageSize * 3, 1, undefined, undefined, sort));
        }
    };

    const handleFilters = (filterData) => {
        setPageNum(0);
        dispatch(clearData());
        setShowFilters(filterData);
        if (searchKey?.length > 2 && sortValue?.key) {
            dispatch(getData('rules', pageSize * 3, 1, searchKey, filterData, sortValue));
        } else if (searchKey?.length > 2) {
            dispatch(getData('rules', pageSize * 3, 1, searchKey, filterData));
        } else if (sortValue?.key) {
            dispatch(getData('rules', pageSize * 3, 1, undefined, filterData, sortValue));
        } else {
            dispatch(getData('rules', pageSize * 3, 1, undefined, filterData));
        }
    };

    const handleChipDelete = (chipToDelete) => () => {
        doRefresh((prev) => prev + 1);
        setDeletedChip(chipToDelete);
        let value = [];
        //Checkbox will come here to reset
        filterChips.forEach((chip) => {
            if (chip !== chipToDelete) {
                value.push(chip);
            }
        });

        let tempFilterKeys = [];
        if (chipToDelete in chipIdAndName) {
            // console.log(chipToDelete, chipIdAndName, chipToDelete in chipIdAndName, 'chipToDelete');

            let chipId = chipIdAndName[chipToDelete];
            showFilters?.forEach((chip) => {
                if (chip && chip.value && chip.value.length > 0 && chip?.value?.includes(chipId)) {
                    let chipValue = chip?.value?.filter((item) => item !== chipId);
                    if (chipValue.length >= 1) {
                        tempFilterKeys[chip.key] = { key: chip.key, value: chipValue };
                    }
                } else if (typeof chip === 'object') {
                    tempFilterKeys[chip.key] = chip;
                }
            });
            // let tempFilterObjects = showFilters.filter((item) => typeof item === 'object');
            setShowFilters([...Object.values(tempFilterKeys)]);
            // let chipId = chipIdAndName[chipToDelete];
            // showFilters?.forEach((chip) => {
            //     if (chip && chip.value && chip.value.length > 0 && chip?.value?.includes(chipId)) {
            //         let chipValue = chip?.value?.filter((item) => item !== chipId);
            //         if (chipValue.length >= 1) {
            //             tempFilterKeys.push({ key: chip.key, value: chipValue });
            //         }
            //     }
            // });
            // let tempFilterObjects = showFilters.filter((item) => typeof item === 'object');
            // console.log(tempFilterKeys, tempFilterObjects, 'tempFilterKeys');

            // setShowFilters([...tempFilterKeys, ...tempFilterObjects]);
            // setShowFilters([...tempFilterKeys]);
        } else {
            let currentKey = filterKeysObject.filter((nextItem) => chipToDelete.includes(nextItem.label))[0]?.name;

            // let toBeDeletedFilter = typeof chipToDelete !== 'number' ? chipToDelete.split(' ')[0] : chipToDelete;
            if (currentKey) {
                tempFilterKeys = showFilters.filter((item) => item.key !== currentKey);
                // console.log(tempFilterKeys, 'tempFilterKeys');
                setShowFilters([...tempFilterKeys]);
            }

            // setShowFilters([...tempFilterKeys]);
        }
        // console.log(showFilters, 'showFilters<<<<<<<<<<<<');
        setFilterChips(value);
        let tempUrlPoint = apiType.includes('&') ? apiType.split('&')[0] : apiType;
        if (tempFilterKeys && Object.values(tempFilterKeys)[0] !== null && Object.values(tempFilterKeys).length > 0) {
            if (sortValue?.key) {
                dispatch(getData(tempUrlPoint, 30, 1, searchKey, Object.values(tempFilterKeys)), sortValue);
            } else {
                dispatch(getData(tempUrlPoint, 30, 1, searchKey, Object.values(tempFilterKeys)));
            }
        }
    };

    const handleCloneDialog = () => {
        setNameError(false);

        setCloneDialogOpen(true);
        // setIsClone(true);
    };
    const handleRowData = (data) => {
        console.log(data, 'before edit open');
        setRowData({ ...data });
    };
    const handleVoucher = (row, displayConfig, name) => {
        let childDataTable;
        if (displayConfig !== undefined) {
            childDataTable = displayConfig;
        } else {
            childDataTable = row && row?.childDataTable;
        }
        let rowName;
        if (name) {
            rowName = name;
        } else if (row && row.name) {
            rowName = row?.name;
        } else {
            rowName = 'Row Info';
        }
        // if (row && row.name !== undefined && childDataTable !== undefined) {
        dispatch(getVoucherResponse(childDataTable, row._id, type === 'Notification' ? 'rNotification' : type));
        localStorage.setItem('currentRowName', JSON.stringify(rowName));
        localStorage.setItem(
            'previousId&name',
            JSON.stringify([type === 'Notification' ? 'rNotification' : type, row?._id])
        );
        localStorage.setItem('voucherConfig', JSON.stringify(displayConfig));
        history.push(
            `/dashboard/v/${type === 'Notification' ? 'rNotification' : type}/${childDataTable ? childDataTable : null
            }/${type === 'Notification' ? 'rNotification' : type}/${row?._id}`
        );
        // }
        //  else {
        //     localStorage.setItem('currentRowName', JSON.stringify(rowName));
        //     history.push(`/dashboard/v/${url}/${row._id}`);
        // }
    };
    const handleDialog = () => {
        setDeleteDialogOpen(!deleteDialogOpen);
        setErrorMessage('');
    };
    const handleCheckData = () => {
        if (factData[`${type}Name`].trim()?.length > 3) {
            handleNextClick();
        } else {
            setNameError('Name Should not be empty');
        }
    };
    const handleCompleteClick = () => {
        if (factData[`${type}Name`].trim()?.length > 3) {
            setCompleteClick(true);

            handleNextClick();
        } else {
            setNameError('Name Should not be empty');
        }

        // setCallData(!callData);
    };

    const handleEditComplete = (id) => {
        // console.log(id, 'edit check');
        console.log("haha", factData);
        let factDataKeys = Object.values(factData);
        console.log("factdata--", factData)
        if (factDataKeys?.length > 2) {
            let body = {};

            
            if (type === 'Rule') {
                if (factData?.RuleName === undefined && factData?.selectedFact === undefined) {
                    setFacTypeText('Fact type is mandatory');
                    setNameError(true);
                    return;
                } else if (factData?.selectedFact === undefined) {
                    setFacTypeText('Fact type is mandatory');
                    return;
                } else if (factData?.RuleName === undefined) {
                    setNameError(true);
                }

                body = {
                    collectionName: 'rules',
                    validData: [
                        {
                            _id: id,

                            name: factData?.RuleName || '',
                            description: factData?.RuleDescription || '',
                            factId: factData?.selectedFact?._id || '',
                            resolutionId: factData?.selectedResolution?._id || '',
                            rnotificationId: factData?.selectedNotification?._id || '',
                            autoCheck: check ? 1 : 0
                        }
                    ]
                };
            }
            let o = Object.fromEntries(Object.entries(body?.validData?.[0]).filter(([_, v]) => v != null));
            delete body.validData;
            let filterBody = {
                collectionName: body.collectionName,
                validData: [o]
            };

            dispatch(putRulesData(filterBody));
            // setCallData(!callData);
            handleEditDialogClose();
        }
    };
    const handleNextClick = (call) => {
        if (nameError) {
            return;
        }
        let body = {};
       
        if (type === 'Rule') {
            let rulesValidData = {};
            if (
                (factData.RuleName === undefined && factData.selectedFact === undefined) ||
                factData.selectedFact === null ||
                factData.selectedFact === false ||
                factData?.selectedFact?.length === 0
            ) {
                setFacTypeText('Fact is mandatory');
                setNameError(true);
                return;
            } else if (mutlipleRulesObject.length > 0) {
                rulesValidData = { ...rulesValidData, multipleFacts: mutlipleRulesObject };
            } else if (
                factData.selectedFact === undefined ||
                factData.selectedFact === null ||
                factData.selectedFact === false ||
                factData?.selectedFact?.length === 0
            ) {
                setFacTypeText('Fact is mandatory');
                return;
            } else if (factData.RuleName === undefined) {
                setNameError(true);
            }


            if (factData.selectedNotification === undefined ||
                factData.selectedNotification === null ||
                factData.selectedNotification === false ||
                factData?.selectedNotification?.length === 0) {
                setNotificationTypeText('Notification is mandatory');
                return;
            }

            if (factData.selectedResolution === undefined ||
                factData.selectedResolution === null ||
                factData.selectedResolution === false ||
                factData?.selectedResolution?.length === 0) {
                setResolutionTypeText('Resolution is mandatory');
                return;
            }

            let resolutionId = factData?.selectedResolution?._id;
            let rnotificationId = factData?.selectedNotification?._id;
            rulesValidData = {
                ...rulesValidData,
                name: factData?.RuleName,
                description: (factData && factData.RuleDescription) || 'Rule Description',
                factId: factData?.selectedFact?._id,
                autoCheck: check ? 1 : 0
            };
            if (resolutionId !== '') {
                rulesValidData = { ...rulesValidData, resolutionId };
            }
            if (rnotificationId !== '') {
                rulesValidData = { ...rulesValidData, rnotificationId };
            }

            body = {
                collectionName: 'rules',
                validData: rulesValidData
            };
        }

        dispatch(postNotification(body));
        //setCallData(!callData);
    };
    const handleCloneDialogClose = () => {
        setErrorMessage('');
        setCloneDialogOpen(false);
        setRowData({});
        setNameError(false);
        dispatch(clearRuleTypePost());
        setFacTypeText('');

        // setIsClone(true);
    };
    const handleRuleBrealDialogClose = () => {
        setRuleBreakDialogOpen(false);
        setRowData({});
    };
    const handleDeleteButtonClick = () => {
        dispatch(deleteFormData(type === 'Notification' ? 'rnotifications' : type, rowData._id));
    };
    const handleRuleBrealDialogOpen = () => {
        setRuleBreakDialogOpen(true);
    };
    const handleAlert = () => {
        setAlert(false);
    };
    const handleDialogClose = () => {
        setDeleteDialogOpen(false);
        setErrorMessage('');
    };
    const handleInputChange = (e, feild) => {
        if (feild === 'DurationInHr' && e.target.value < 0) {
            setHelperTextHr('Enter Mins');
            return;
        } else if (feild === 'resolutionTimeInMin' && e.target.value < 0) {
            setHelperTextHr('Enter Mins');
            return;
        } else if (feild === 'maximumTimeOutInMin' && e.target.value < 0) {
            setMaxTimeMinErr('Enter Mins');
            return;
        } else if (feild === 'DurationInMin' && e.target.value > 60) {
            setHelperTextMin('Enter Seconds');
            return;
        } else if (feild === 'DurationInMin' && e.target.value < 0) {
            setHelperTextMin('Enter Seconds');
            return;
        } else if (feild === 'resolutionTimeInSec' && e.target.value < 0) {
            setHelperTextMin('Enter Seconds');
            return;
        } else if (feild === 'resolutionTimeInSec' && e.target.value > 60) {
            setHelperTextMin('Enter Seconds');
            return;
        } else if (feild === 'maximumTimeOutInSec' && e.target.value < 0) {
            setMaxTimeSecErr('Enter Seconds');
            return;
        } else if (feild === 'maximumTimeOutInSec' && e.target.value > 60) {
            setMaxTimeSecErr('Enter Seconds');
            return;
        }
        setMaxTimeMinErr('');
        setMaxTimeSecErr('');
        setHelperTextMin('');
        setHelperTextHr('');
        setNameError(false);
        setErrorMessage('');
        let tempFactData = { ...factData };
        tempFactData[feild] = e.target.value;
        setFactData(tempFactData);
    };
    useEffect(() => { 
    
        dispatch(getFilterCriteria('rules'));
       
    if (showFilters?.length > 0 && sortValue?.key) {
        dispatch(getData('rules', pageSize * 3, 1, searchKey, showFilters, sortValue));
    } else if (filterChips?.length > 0) {
        dispatch(getData('rules', pageSize * 3, 1, searchKey, showFilters));
    } else if (sortValue?.key) {
        dispatch(getData('rules', pageSize * 3, 1, searchKey, undefined, sortValue));
    } else {
        if (apiType && searchKey?.length > 2) {
            dispatch(getData('rules', pageSize * 3, 1, searchKey));
        } else if (apiType) {
            dispatch(getData('rules', pageSize * 3, 1));
        }
        }
    },[])

    const handleDataSelect = (e, value, feild, i) => {
        console.log("value", value);
        setFacTypeText('');
        setResolutionTypeText('');
        setNotificationTypeText('');
        if (feild === 'factTypes') {
            setFactData({});
        }
        if (feild === `condition${i}`) {
            if (factData[`condition${i}`] !== 'Select' && value?.name === 'Select') {
                return;
            }

            if (
                (value?.name !== 'Select' && factData[`condition${i}`] === null) ||
                factData[`condition${i}`] == '' ||
                factData[`condition${i}`] === undefined
            ) {
                setFactNo((prev) => prev + 1);
            }
        }

        let tempFactData = { ...factData };
        tempFactData[feild] = value;
        if (feild.includes(`condition${i}`)) {
            let tempMultipleFacts = [...mutlipleRulesObject];
            tempMultipleFacts[i] = {
                conditionIndex: i,
                conditionType: value?.name,
                selectedResolution: factData[`selectedResolution${i}`]?._id,
                selectedFact: factData[`selectedFact${i}`]?._id
            };
            setMultipleRulesObject(tempMultipleFacts);
        }
        if (feild === 'factTypes') {
            delete tempFactData['options'];
            delete tempFactData['DurationInMin'];
            delete tempFactData['DurationInSec'];
            delete tempFactData['Maximum'];
            delete tempFactData['Minimum'];
            delete tempFactData['factConditions'];
        }
        if (feild === 'factConditions') {
            delete tempFactData['options'];
            delete tempFactData['DurationInMin'];
            delete tempFactData['DurationInSec'];
            delete tempFactData['Maximum'];
            delete tempFactData['Minimum'];
        }
        if (feild === 'notifyData') {
            delete tempFactData['selectedNotify'];
            delete tempFactData['NotificationMessage'];
        }
        setFactData(tempFactData);
        if (feild === 'ResolutionMainType') {
            setResolutionSubTypevalue(true);
            setSubTypeFlag(!subTypeFlag);
        }
    };
    const handleSwitchChange = (e, feild) => {
        let tempFactData = { ...factData };
        tempFactData[feild] = e.target.checked;
        setFactData(tempFactData);
    };


    const RulesForm = (
        <Grid>

            <Grid xs={12} >
                <Grid item >
                    <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>{'Name *'}</InputLabel>
                    <CustomInput
                        fullWidth
                        focus={true}
                        error={nameError}
                        onChange={(e) => {
                            handleInputChange(e, `${type}Name`), setNameError(false);
                        }}
                        value={factData[`${type}Name`] ? factData[`${type}Name`] : ''}
                    />
                    {nameError && (
                        <Typography style={{ fontSize: '0.75rem' }} color="error" variant="subtitle1">
                            Name is required
                        </Typography>
                    )}
                </Grid>
                <Grid item >
                    <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>{'Description'}</InputLabel>
                    <CustomInput
                        multiline rows={3}
                        fullWidth
                        onChange={(e) => handleInputChange(e, `${type}Description`)}
                        value={factData[`${type}Description`] ? factData[`${type}Description`] : ''}
                    />
                </Grid>
            </Grid>
            {/* <Grid xs={12} style={{ marginTop: 10 }}>
                    {formFeilds[type].map((item) => {
                        if (item.feild === 'dropDown') {
                            return (
                                <Grid item xs={12}>
                                    <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>{item.label}</InputLabel>
                                    <Grouped
                                        name={item.data}
                                        onChange={(e, value) => handleDataSelect(e, value, item.label)}
                                        value={factData[item.label]}
                                    />
                                </Grid>
                            );
                        }
                    })}
                </Grid> */}
            {type === 'Facts' ? (
                <>
                    <Grid item xs={12}>
                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>{'Types'}</InputLabel>
                        <Grouped
                            name={'factTypes'}
                            onChange={(e, value) => handleDataSelect(e, value, 'factTypes')}
                            value={factData['factTypes']}
                            collection={allData?.data.filter((item) => item?.name || item?.title)}
                            nextClick={nextClick}
                        />
                    </Grid>


                    <Grid item xs={12} style={{ marginTop: 10 }}>
                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>{'Condition'}</InputLabel>
                        <Grouped
                            name={'factConditions'}
                            onChange={(e, value) => handleDataSelect(e, value, 'factConditions')}
                            value={factData['factConditions'] ? factData['factConditions'] : null}
                            collection={condition && condition?.data ? condition?.data : []}
                            nextClick={nextClick}
                        />
                    </Grid>
                    {console.log("item", allData)}
                    {factData?.factConditions?.title === "Reactivation Time" || (factData?.factConditions?.title === "Allowed timeout batch product" && factData?.factTypes?.name === "Red Cells") || factData?.factConditions?.title === "Allowed timeout" ?
                        (

                            <Grid item xs={12}>
                                <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>{'Device'}</InputLabel>
                                <Grouped
                                    name={'factDevice'}
                                    onChange={(e, value) => handleDataSelect(e, value, 'factDevice')}
                                    value={factData['factDevice']}
                                    collection={allData?.data.filter((item) => item?.type == "DEVICE" && item?.name !== "Associate Device" && item?.name !== "Mars-12AT")}
                                    nextClick={nextClick}
                                />
                            </Grid>) : null}
                    {factData?.factConditions?.title === "Unit other than O negative removed from device" ?
                        <Grid item xs={12}>
                            <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>Blood Group</InputLabel>
                            <SelectOption
                                // label="Select Location Type"
                                options={options?.data}
                                onChange={(e) => setBloodGroup(e.target.value)}
                                value={bloodGroup}
                                name="bloodGroup"
                                id="id"
                            //disabled={resData !== undefined && resData?.data?.length !== 0 ? true : false}
                            />
                        </Grid> : null}

                    {factData['factConditions'] ? (
                        <>
                            {factData?.factConditions?.label === 'Duration And Max Time Allowed' ? (
                                <>
                                    <Grid item xs={12} style={{ marginTop: 10 }}>
                                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                            Quarantine Duration
                                        </InputLabel>
                                        <span style={{ marginRight: 2 }}>
                                            <CustomInput
                                                onChange={(e) => handleInputChange(e, 'DurationInHr')}
                                                value={factData[`DurationInHr`]}
                                                placeholder="Mins"
                                                type="number"
                                                helperText={helperTextHr && helperTextHr}
                                                error={helperTextHr}
                                            />
                                        </span>
                                        <span style={{ marginLeft: 2 }}>
                                            <CustomInput
                                                value={factData['DurationInMin']}
                                                onChange={(e) => handleInputChange(e, 'DurationInMin')}
                                                placeholder="Seconds"
                                                type="number"
                                                helperText={helperTextMin && helperTextMin}
                                                error={helperTextMin}
                                            />
                                        </span>
                                    </Grid>
                                    <Grid item xs={12} style={{ marginTop: 10, marginBottom: 10 }}>
                                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                            Max Time Allowed
                                        </InputLabel>
                                        <span style={{ marginRight: 2 }}>
                                            <CustomInput
                                                onChange={(e) =>
                                                    e?.target?.value?.match(/[&}=><%-+]/g)
                                                        ? null
                                                        : handleInputChange(e, 'maximumTimeOutInMin')
                                                }
                                                value={factData[`maximumTimeOutInMin`]}
                                                placeholder="Mins"
                                                type="number"
                                                helperText={maxTimeMinErr && maxTimeMinErr}
                                                error={maxTimeMinErr}
                                            />
                                        </span>
                                        <span style={{ marginLeft: 2 }}>
                                            <CustomInput
                                                value={factData['maximumTimeOutInSec']}
                                                onChange={(e) =>
                                                    e?.target?.value?.match(/[&}=><%-+]/g)
                                                        ? null
                                                        : handleInputChange(e, 'maximumTimeOutInSec')
                                                }
                                                placeholder="Seconds"
                                                type="number"
                                                helperText={maxTimeSecErr && maxTimeSecErr}
                                                error={maxTimeSecErr}
                                            />
                                        </span>
                                    </Grid>
                                </>
                            ) : factData?.factConditions?.label === 'Duration' && !(factData?.factConditions?.title === "Allowed timeout" && factData?.factTypes?.name === "Red Cells") ? (
                                <>
                                    {console.log(factData?.factConditions?.label, 'factData?.factConditions?.label')}
                                    <Grid item xs={12} style={{ marginTop: 10 }}>
                                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                            {factData?.factConditions?.label && factData?.factConditions?.label}
                                        </InputLabel>
                                        <span style={{ marginRight: 2 }}>
                                            <CustomInput
                                                onChange={(e) => handleInputChange(e, 'DurationInHr')}
                                                value={factData[`DurationInHr`]}
                                                placeholder="Mins"
                                                type="number"
                                                helperText={helperTextHr && helperTextHr}
                                                error={helperTextHr}
                                            />
                                        </span>
                                        <span style={{ marginLeft: 2 }}>
                                            <CustomInput
                                                value={factData['DurationInMin']}
                                                onChange={(e) => handleInputChange(e, 'DurationInMin')}
                                                placeholder="Seconds"
                                                type="number"
                                                helperText={helperTextMin && helperTextMin}
                                                error={helperTextMin}
                                            />
                                        </span>
                                    </Grid>
                                </>
                            )
                                : factData?.factConditions?.label === 'Duration' && (factData?.factConditions?.title === "Allowed timeout") || (factData?.factConditions?.title === "Allowed timeout batch product") ? (
                                    <>
                                        {console.log(factData?.factConditions?.label, 'factData?.factConditions?.label')}
                                        <Grid xs={12} style={{ display: 'flex' }}>
                                            <Grid item xs={4} style={{ marginTop: 10 }}>
                                                <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                                    {/*{factData?.factConditions?.label && factData?.factConditions?.label}*/}
                                                    Min Duration Allowed (Mins)
                                                </InputLabel>
                                                <span style={{ marginRight: 2 }}>
                                                    <CustomInput
                                                        onChange={(e) => handleInputChange(e, 'DurationInMin')}
                                                        value={factData[`DurationInMin`]}
                                                        //placeholder="Min allowed time"
                                                        type="number"
                                                        helperText={helperTextHr && helperTextHr}
                                                        error={helperTextHr}
                                                    />
                                                </span>
                                                {timeError && (
                                                    <Typography style={{ fontSize: '0.75rem' }} color="error" variant="subtitle1">
                                                        {timeError}
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={4} style={{ marginTop: 10 }}>

                                                <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                                    {/*{factData?.factConditions?.label && factData?.factConditions?.label}*/}
                                                    Max Duration Allowed (Mins)
                                                </InputLabel>
                                                <span style={{ marginLeft: 2 }}>
                                                    <CustomInput
                                                        value={factData['DurationInMax']}
                                                        onChange={(e) => handleInputChange(e, 'DurationInMax')}
                                                        //placeholder="Max allowed time"
                                                        type="number"
                                                        helperText={helperTextMin && helperTextMin}
                                                        error={helperTextMin}
                                                    />
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </>
                                ) : (
                                    <Grid item xs={12} style={{ marginTop: 10 }}>
                                        {factData?.factConditions?.rconditionfieldtypeId[0]?.name === 'Switch' ||
                                            factData?.factConditions?.label ||
                                            factData?.factConditions?.rconditionfieldtypeId[0]?.name === 'Input' ||
                                            factData?.factConditions?.rconditionfieldtypeId[0]?.name === 'minMaxInput' ? (
                                            <>
                                                {' '}
                                                <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                                    {console.log('fffffffff', factData?.factConditions?.label)}
                                                    {factData?.factConditions?.label
                                                        ? factData?.factConditions?.label
                                                        : 'Product'}
                                                </InputLabel>
                                                {factData?.factConditions?.rconditionfieldtypeId[0]?.name === 'Input' ? (
                                                    <Grid>

                                                        <CustomInput
                                                            // placeholder={
                                                            //   factData?.factConditions?.label
                                                            //       ? factData?.factConditions?.label
                                                            //       : 'Product'
                                                            // }
                                                            placeholder="Reactivation duration"
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    'reactiveTime'
                                                                )
                                                            }
                                                            value={factData[`reactiveTime`]}
                                                        />


                                                    </Grid>
                                                ) : factData?.factConditions?.rconditionfieldtypeId[0]?.name ===
                                                    'minMaxInput' ? (
                                                    <>
                                                        <span style={{ marginRight: 2 }}>
                                                            <CustomInput
                                                                onChange={(e) => handleInputChange(e, 'Minimum')}
                                                                value={factData[`Minimum`]}
                                                                placeholder="min Value"
                                                                type="number"
                                                            />
                                                        </span>

                                                        <span style={{ marginLeft: 2 }}>
                                                            <CustomInput
                                                                value={factData['Maximum']}
                                                                onChange={(e) => handleInputChange(e, 'Maximum')}
                                                                placeholder="m Value"
                                                                type="number"
                                                            />
                                                        </span>
                                                    </>
                                                ) : factData?.factConditions?.rconditionfieldtypeId[0]?.name ===
                                                    'Switch' ? (
                                                    <>
                                                        <span>No</span>
                                                        <Switch
                                                            color="primary"
                                                            checked={factData['Switch']}
                                                            onChange={(e) => handleSwitchChange(e, 'Switch')}
                                                        />
                                                        <span>Yes</span>
                                                    </>
                                                ) : (
                                                    <Grouped
                                                        name={factData?.factConditions?.label}
                                                        onChange={(e, value) => handleDataSelect(e, value, 'options')}
                                                        value={factData['options'] ? factData['options'] : null}
                                                        collection={allData?.data.filter(
                                                            (val) =>
                                                                val?.type ===
                                                                factData?.factConditions?.rconditionfieldtypeId?.[0]?.ref
                                                        )}
                                                        nextClick={nextClick}
                                                    />
                                                )}
                                            </>
                                        ) : null}
                                    </Grid>
                                )}
                        </>
                    ) : null}
                </>
            ) : type === 'Notification' ? (
                <>

                    <Grid item xs={12}>
                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>{'Notification Type'}</InputLabel>
                        <Grouped
                            name={'notificationTypes'}
                            onChange={(e, value) => handleDataSelect(e, value, 'notificationTypes')}
                            value={factData['notificationTypes']}
                            collection={notificationType?.data}
                            nextClick={nextClick}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 10 }}>
                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>{'Notifiy By'}</InputLabel>
                        <Grouped
                            name={'notifyData'}
                            onChange={(e, value) => handleDataSelect(e, value, 'notifyData')}
                            value={factData['notifyData']}
                            collection={notifyBy?.data}
                            nextClick={nextClick}
                        />
                    </Grid>

                    <Grid >

                        {type === 'Notification' ?

                            <Grid item xs={12} style={{ marginTop: 10 }}>
                                <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }} id="dropdown-label">Notification Access role</InputLabel>
                                <FormControl variant="outlined" style={{ minWidth: 850 }}>

                                    <Select
                                        labelId="dropdown-label"
                                        value={selectedOption}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="local">Local</MenuItem>
                                        <MenuItem value="central">Central</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            : null}

                    </Grid>


                    {factData['notifyData'] ? (
                        <Grid item xs={12} style={{ marginTop: 10 }}>
                            {/* <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                {factData?.['notifyData']?.name ? factData?.['notifyData']?.name : 'Email Template'}
                            </InputLabel>
                            {factData.notifyData?.name === 'EMAIL' ? (
                                <Grouped
                                    name={
                                        factData?.notifyData?.selectName
                                            ? factData?.notifyData?.selectName
                                            : 'emailTemplate'
                                    }
                                    onChange={(e, value) => handleDataSelect(e, value, 'selectedNotify')}
                                    value={factData['selectedNotify']}
                                    collection={emailTemplate?.data}
                                    nextClick={nextClick}
                                /> */}
                            {/* ) : ( */}
                            {/* <CustomInput
                                onChange={(e) => handleInputChange(e, `${type}Message`)}
                                value={factData[`${type}Message`]}
                            /> */}
                            {/* )} */}
                        </Grid>
                    ) : null}

                    <Grid item xs={12} style={{ marginTop: 10 }}>
                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                            {'User || Access Role'}
                        </InputLabel>
                        <Grouped
                            name={'users'}
                            onChange={(e, value) => handleDataSelect(e, value, 'NotifyUser')}
                            value={factData['NotifyUser']}
                            collection={allData?.data.filter((item) => item.type === 'USER')}
                            nextClick={nextClick}
                        />
                    </Grid>
                </>
            ) : type === 'Resolution' ? (
                <>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                    {'Resolution Main Type'}
                                </InputLabel>
                                <Grouped
                                    height={'10px'}
                                    name={'ResolutionMainType'}
                                    onChange={(e, value) => handleDataSelect(e, value, 'ResolutionMainType')}
                                    value={factData['ResolutionMainType']}
                                    collection={resolutionType?.data || []}
                                    nextClick={nextClick}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                    {'Resolution Sub Type'}
                                </InputLabel>
                                <Grouped
                                    disabled={factData['ResolutionMainType'] && resolutionSubTypeValue ? false : true}
                                    name={'ResolutionSubType'}
                                    onChange={(e, value) => handleDataSelect(e, value, 'ResolutionSubType')}
                                    value={factData['ResolutionSubType']}
                                    collection={resolutionSubType?.data || []}
                                    nextClick={nextClick}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>{'Time'}</InputLabel>
                        <span style={{ marginRight: 4 }}>
                            <CustomInput
                                placeholder="Mins"
                                value={factData['resolutionTimeInMin'] ? factData['resolutionTimeInMin'] : ''}
                                onChange={(e) => {
                                    handleInputChange(e, 'resolutionTimeInMin');
                                }}
                                type="number"
                                helperText={helperTextHr && helperTextHr}
                                error={helperTextHr}
                            />
                        </span>
                        <CustomInput
                            placeholder="Seconds"
                            value={factData['resolutionTimeInSec'] ? factData['resolutionTimeInSec'] : ''}
                            onChange={(e) => {
                                handleInputChange(e, 'resolutionTimeInSec');
                            }}
                            type="number"
                            helperText={helperTextMin && helperTextMin}
                            error={helperTextMin}
                        />
                    </Grid>
                </>
            ) : type === 'Rule' ? (
                <>
                    {/* {[...Array(factNo)].map((e, i) => {
                                return (
                                    <Grid key={i} item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={5}>
                                                <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                                    {'Select Fact *'}
                                                </InputLabel>
                                                <Grouped
                                                    name={'selectedFact'}
                                                    onChange={(e, value) => handleDataSelect(e, value, `selectedFact${i}`)}
                                                    value={factData[`selectedFact${i}`]}
                                                    collection={factId?.data}
                                                    nextClick={nextClick}
                                                />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                                    {'Select Resolution'}
                                                </InputLabel>
                                                <Grouped
                                                    name={'selectedResolution'}
                                                    onChange={(e, value) =>
                                                        handleDataSelect(e, value, `selectedResolution${i}`)
                                                    }
                                                    value={factData[`selectedResolution${i}`]}
                                                    collection={resolutionId?.data}
                                                    nextClick={nextClick}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                {console.log(resolutionId)}
                                                <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                                    {'Condition'}
                                                </InputLabel>
                                                <Grouped
                                                    name={'Condition'}
                                                    onChange={(e, value) => handleDataSelect(e, value, `condition${i}`, i)}
                                                    value={factData[`condition${i}`]}
                                                    collection={operator}
                                                    nextClick={nextClick}
                                                    inputRef={conditionRef}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                            {factNo > 1 && (
                                <Grid container style={{ marginTop: 10 }} justify="flex-end">
                                    <Grid item>
                                        <CustomButton
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                [...Array(factNo)].map((e, i) => {
                                                    delete factData[`condition${i}`];
                                                    delete factData[`selectedResolution${i}`];
                                                    delete factData[`selectedFact${i}`];
                                                }),
                                                    setFactNo(1);
                                            }}
                                        >
                                            Clear condition
                                        </CustomButton>
                                    </Grid>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                                    {'Select Notification'}
                                </InputLabel>
                                <Grouped
                                    name={'selectedNotification'}
                                    onChange={(e, value) => handleDataSelect(e, value, 'selectedNotification')}
                                    value={factData['selectedNotification']}
                                    collection={notificationId?.data}
                                    nextClick={nextClick}
                                />
                            </Grid> */}
                    <Grid item xs={12}>
                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>{'Select Fact *'}</InputLabel>
                        <Grouped
                            name={'selectedFact'}
                            onChange={(e, value) => handleDataSelect(e, value, 'selectedFact')}
                            value={factData['selectedFact']}
                            collection={factId?.data || []}
                            nextClick={nextClick}
                            error={factTypeText}
                        />
                        {factTypeText && (
                            <Typography style={{ fontSize: '0.75rem' }} color="error" variant="subtitle1">
                                {factTypeText}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>
                            {'Select Notification'}
                        </InputLabel>
                        <Grouped
                            name={'selectedNotification'}
                            onChange={(e, value) => handleDataSelect(e, value, 'selectedNotification')}
                            value={factData['selectedNotification']}
                            collection={notificationId?.data || []}
                            nextClick={nextClick}
                            error={notificationTypeText}


                        />
                        {notificationTypeText && (
                            <Typography style={{ fontSize: '0.75rem' }} color="error" variant="subtitle1">
                                {notificationTypeText}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel style={{ margin: '10px 0px', marginTop: '15px' }}>{'Select Resolution'}</InputLabel>
                        <Grouped
                            name={'selectedResolution'}
                            onChange={(e, value) => handleDataSelect(e, value, 'selectedResolution')}
                            value={factData['selectedResolution']}
                            collection={resolutionId?.data || []}
                            nextClick={nextClick}
                            error={resolutionTypeText}
                        />
                        {resolutionTypeText && (
                            <Typography style={{ fontSize: '0.75rem' }} color="error" variant="subtitle1">
                                {resolutionTypeText}
                            </Typography>
                        )}
                    </Grid>{' '}
                    {/* <Grid item xs={12}>
                        <InputLabel style={{ margin: '10px 20px', float: 'left' }}>{'Auto Check'}</InputLabel>
                        <Checkbox checked={check} name="isVisible" handleChange={(e) => setCheck(!check)} />
                    </Grid> */}
                </>
            ) : null}
            {/* <Grid container>
                {formError && (
                    <Grid item>
                        <Typography color="error">Please enter all the fields</Typography>
                    </Grid>
                )}
            </Grid> */}
        </Grid>
    );

    return (
        <>
            <Paper>
                <Grid style={{ padding: 20 }} container>
                    <Grid item xs={5}>
                        {accessableCodes?.includes('BS-ACO-1022') && (
                            <CustomSearch
                                value={searchKey}
                                // size="md"
                                placeholder={'Search'}
                                handleChange={(e) => (e.target.value !== ' ' ? handleSearch(e.target.value) : null)}
                                handleSearchDelete={handleSearchDelete}
                                loader={searchKey && searchKey.length < 3 ? true : searchKey && loading}
                                disabled={!accessableCodes?.includes('BS-ACO-1022')}
                            />
                        )}
                    </Grid>
                    <Grid item xs={7}>
                        <HeaderIcons
                            showIcons={['excell',  ]}
                            //handleOpenAdd={handleOpenAdd}
                            label={type}
                            enableExcell={accessableCodes?.includes('BS-ACO-1023')}
                            enablePdf={accessableCodes?.includes('BS-MO-1053')}
                            handleFilters={handleFilters}
                            setFilterKeys={setFilterChips}
                            handleResetFilters={handleResetFilters}
                            response={responseData}
                            disabled={allData ? false : true}
                            handleDownloadData={handleDownloadData}
                            selectedFilters={showFilters}
                            refresh={refresh}
                            deletedChip={deletedChip}
                            setChipIdAndName={setChipIdAndName}
                            setFilterKeysObject={setFilterKeysObject}
                            enableFilter={accessableCodes?.includes('BS-ACO-1034')}
                        />
                    </Grid>

                </Grid>

                <Grid container style={{ padding: '0 20px' }} justify="space-between">
                    <Grid item>
                        <Grid container spacing={4}>
                            <Grid item>
                                <Typography variant="h6" color="primary" style={{ display: 'flex' }}>
                                    <Box fontWeight="500">{type ? `${type} : ${totalCount ? totalCount : 0}` : null}</Box>
                                    <Box fontWeight="500" style={{ marginLeft: 5 }}>
                                        {type
                                            ? `${showFilters || searchKey.length > 2
                                                ? loading
                                                    ? ''
                                                    : '(' + responseData?.page?.filterCount + ')'
                                                : ''
                                            }`
                                            : null}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <CustomChip
                                    module={'manage'}
                                    dataArray={filterChips}
                                    tooltip={true}
                                    handleDelete={handleChipDelete}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <DisplayConfig
                            disabled={!accessableCodes.includes('BS-ACO-1024')}
                            response={responseData?.displayConfigData}
                            urlEndPoint={'rules'}
                            pageSize={pageSize}
                        />
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={0} >
            <Grid container>
                <Grid item xs={12}>
                    {responseData?.data?.length > 0 ? (
                        <>
                            <CustomTable
                                    key={responseData}
                                    response={responseData}
                                    handleSelect={handleSelect}
                                    //handleEditDialog={handleEditDialog}
                                    //handleCloneDialog={handleCloneDialog}
                                    //setRowData={handleRowData}
                                    //handleVoucher={handleVoucher}
                                    //handleDialog={handleDialog}
                                    //viewRowAccess={accessableCodes?.includes('BS-ACO-1030')}
                                    //editRowAccess={accessableCodes?.includes('BS-ACO-1031')}
                                    //deleteRowAccess={accessableCodes?.includes('BS-ACO-1033')}
                                    //cloneRowAccess={accessableCodes?.includes('BS-ACO-1034')}
                                    //detailViewAccess={accessableCodes?.includes('BS-ACO-1028')}
                                    selectionAccess={accessableCodes?.includes('BS-ACO-1026')}
                                    sequenceChangeAccess={accessableCodes?.includes('BS-ACO-1025')}
                                    selectAllAccess={accessableCodes?.includes('BS-ACO-1027')}
                                    sort={sortValue}
                                    history={history}
                                    selectedData={selectedData}
                                    setSelectedData={setSelectedData}
                                    rowsPerPage={pageSize}
                                    selectedRecords={selectedRecords}
                                    selectAllRecords={selectAllRecords}
                                    //handleRuleBrealDialogOpen={handleRuleBrealDialogOpen}
                                    pageNum={pageNum}
                                    //onFormCheck={onFormCheck}
                                    hasSwitch={type === 'Rule'}

                            />
                        </>
                    ) : (
                        <NoData />
                    )}
                </Grid>
                </Grid>
            </Paper>

            <CustomDialog
                title={`Add ${type}`}
                open={openAdd}
                onClose={handleCloseAdd}
                onCancelClick={handleCloseAdd}
                //ruleType={pluralize.singular(type)}
                onNextClick={handleCheckData}
                onCompleteClick={handleCompleteClick}
                error={errorMessage}
            >
                {RulesForm}
            </CustomDialog>
            <CustomDialog
                title={`Edit ${type}`}
                open={openEdit}
                onClose={handleEditDialogClose}
                onCancelClick={handleEditDialogClose}
                //ruleType={pluralize.singular(type)}
                onNextClick={handleCheckData}
                onSaveClick={() => {
                    handleEditComplete(rowData._id);
                }}
                error={errorMessage}
                isSave
            >
                {RulesForm}
            </CustomDialog>
            <CustomDialog
                title={`Add ${type}`}
                open={cloneDialogOpen}
                onClose={handleCloneDialogClose}
                onCancelClick={handleCloneDialogClose}
                onSaveClick={handleCheckData}
                isSave
                error={errorMessage}
            // loading={postLoading}
            >
                {RulesForm}
            </CustomDialog>
            <ConfirmationDialog
                deleteLabel
                handleDialogClose={handleDialogClose}
                dialogOpen={deleteDialogOpen}
                title={CONSTANTS.LABEL_ARE_YOU_SURE}
                type={'warning'}
                error={errorMessage}
            >
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <CustomButton variant="outlined" color="primary" onClick={handleDialogClose}>
                            {CONSTANTS.CANCEL}
                        </CustomButton>
                    </Grid>
                    <Grid item>
                        <CustomButton variant="contained" color="primary" onClick={handleDeleteButtonClick}>
                            {deleteLoading ? <CircularProgress color="white" size="20px" /> : CONSTANTS.CONTINUE}
                        </CustomButton>
                    </Grid>
                </Grid>
            </ConfirmationDialog>

            <ConfirmationDialog
                deleteLabel
                handleDialogClose={handleRuleBrealDialogClose}
                dialogOpen={ruleBreakDialogOpen}
                title={CONSTANTS.LABEL_ARE_YOU_SURE}
                type={'warning'}
                error={errorMessage}
            >
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <CustomButton variant="outlined" color="primary" onClick={handleRuleBrealDialogClose}>
                            {CONSTANTS.CANCEL}
                        </CustomButton>
                    </Grid>
                    <Grid item>
                        <CustomButton variant="contained" color="primary" onClick={handleDeleteButtonClick}>
                            {CONSTANTS.CONTINUE}
                        </CustomButton>
                    </Grid>
                </Grid>
            </ConfirmationDialog>
            {deleteAlert && (
                <Alert
                    open={deleteAlert}
                    message={
                        deleteResponse?.status === true ? 'Record Deactivated Successfully.' : deleteError?.errorMessage
                    }
                    duration={2000}
                    onClose={() => setDeleteAlert(false)}
                    vertical={'bottom'}
                    horizontal={'center'}
                    severity={deleteResponse?.status === true ? 'success' : 'error'}
                    actions={false}
                />
            )}
            {alert && (
                <Alert
                    open={alert}
                    message={postRuleSuccess?.status === true && postRuleSuccess?.message}
                    duration={2000}
                    onClose={handleAlert}
                    vertical={'bottom'}
                    horizontal={'center'}
                    severity="success"
                    actions={false}
                />
            )}
        </>
        )
}

export default Rules;