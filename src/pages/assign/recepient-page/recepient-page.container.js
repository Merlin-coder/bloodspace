import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Paper, TextField, Typography } from '@material-ui/core';
import { assignLocalDataAction, socketAssociateBulkData } from 'redux/actions/socketAction';
import { passingAssociateProps } from 'redux/actions';
import { unitTable, searchResults } from '../DummyData';
import RecepientPageComponent from './recepient-page.component';
import Response from '../../../JSON/ResponseResults.json';
import unitIdResponse from '../../../JSON/unitIdResponse.json';
import CONSTANTS from 'common/constants';
import { checkTextSum } from '.././../../components/add-unit/add-unit-form/unitIdService';
import { useDispatch, useSelector } from 'react-redux';
import { clearUnitIdSearch, getUnitSearch } from '../../../redux/actions/assignUnit/unitIdSearchAction';
import { clearPostUnitResponse, postAddUnitData } from '../../../redux/actions/assignUnit/addUnitsRecipientActions';
import moment from 'moment';
import { getApplyFilters } from '../../../redux/actions/filters/globalFilterAction';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';
import { createAlert, get4thDropdown, getDropDown, getSettings, getRecipientCount } from 'redux/actions';
import { clear4thDropDown } from 'redux/actions/manage/manageFieldsAction';
import { Grid } from '@material-ui/core';
import { socketDeviceStatus } from 'redux/actions/socketAction';
import { declinedAction } from 'redux/actions/manage/headerActions';

function RecepientPage() {
    const { device } = useSelector((state) => state.getSocketDevice);
    const [successTags, setSuccessTags] = useState([]);
    const [failedTags, setFailedTags] = useState([]);
    const [assignable, setAssignable] = useState([]);
    console.log('assignable', assignable);
    const { settingsData } = useSelector((state) => state.settingsLocalDataStore);
    console.log('settin', settingsData);
    const { deviceWriteTagValidation } = useSelector((state) => state.deviceWriteTag);
    const { Lf_Hf_TagValidation } = useSelector((state) => state.lfTag);
    const { validationRequired } = useSelector((state) => state.associateValidation);
    const { recipientCount } = useSelector((state) => state.getRecipientCount);
    console.log(
        'recipient--',
        recipientCount?.data?.unitAssignedData?.find((seq) => seq.sequenceNo)
    );
    let recipientvalue = recipientCount?.data?.unitAssignedData?.map((item) => item.sequenceNo);
    console.log('recipientvalue', recipientvalue);
    const location = useLocation();
    const history = useHistory();
    const data = location?.state?.data || [];
    const tableData =
        data?.length > 0
            ? data.map((ele) => {
                  console.log('tabledata', data);

                  console.log(ele, 'ele===');
                  return {
                      unitId: ele?.donationCode,
                      productCode: ele?.productcodeId[0]?.isbtcode || 'No IsbtCode',
                      description: ele?.productcodeId[0]?.isbtdescription || 'no IsbtDescription',
                      //tableDRdate: hours_48_From_Now(),
                      expiryDateAndTime: ele?.expiryDateAndTime,
                      sequenceNo: ele?.sequenceNo,
                      tableDRdate: ele?.isAssigned
                          ? ele?.dereservationDate
                          : getDreservationDatetime(ele?.productcodeId?.productgroupId), //hours_48_From_Now(),
                      //tableDRdate: getDreservationDatetime(ele?.productcodeId?.productgroupId),
                      refskuId: ele?._id,
                      rfidNumber: ele?.rfidNumber,
                      bloodGroup: ele?.bloodgroupId?.[0]?.name,
                      assigned: ele?.isAssigned == 1 ? true : false,
                      associated: ele?.isAssigned == 0 ? true : false,
                      check: ele?.isAssigned || ele?.isAssociated ? false : true //--- remove if we don't want 'autoselect' of checkboxes while assigning bloodgroup to receipient
                  };
              })
            : [];
    const [scanOrManualOpen, setScanOrManualOpen] = useState(false);

    const uniqueId = [];
    const unique = unitTable.filter((element) => {
        const index = uniqueId.findIndex((ids) => ids.unitId === element.unitId);
        if (index === -1) {
            uniqueId.push(element);
            return true;
        }
        return false;
    });
    let remoteSelected = JSON.parse(localStorage.getItem('remoteSelectedItem'));
    console.log('remoteSelected', remoteSelected);
    let currentItem = JSON.parse(localStorage.getItem('moverecipient'));
    const [unitsTable, setUnitsTable] = useState(uniqueId);
    console.log(unitsTable, 'unit--');
    const [commonUnitId, setCommonUnitId] = useState([]);
    const [unitIdAssigned, setUnitIdAssigned] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sameDereservation, setSameDereservation] = useState(false);
    const [unitId, setUnitId] = useState('');
    console.log('id---', unitId);
    const [expiryDateAndTime, setExpiryDate] = useState('');
    const [unitIdError, setUnitIdError] = useState(false);
    const [productCode, setProductCode] = useState(null);
    console.log('productcode----', productCode);
    const [productCodeError, setProductCodeError] = useState(false);
    const [comments, setComments] = useState('');
    const [sequenceNo, setSequenceNo] = useState('');
    console.log('sequence', sequenceNo);
    const [unitId_id, setUnitId_id] = useState('');
    const [unitIdErrorText, setUnitIdErrorText] = useState('');
    const [manualEntry, setManualEntery] = useState(true);
    const [productCodeOptions, setProductCodeOptions] = useState([]);
    const [disableProductCode, setDisableProductCode] = useState(false);
    const [bloodGroup, setBloodGroup] = useState('');
    console.log('history', history);
    console.log('bloodgroup---', bloodGroup);
    const [disableCheck, setDisableCheck] = useState(false);
    const [checkAll, setCheckAll] = useState(true);
    const [tempUnitId, settempUnitId] = useState({});
    const commentRef = useRef();
    const unitIdRef = useRef();
    const productCodeRef = useRef();
    const { options } = useSelector((state) => state.getDropDown);
    // localStorage.setItem('recipientData'

    console.log('currentttt', location?.state?.row);
    // const userData =
    //     currentItem.data && currentItem?.data?.find((item) => item['_id'] === location.pathname.split('/').pop());
    // const headerData = userData && Object.keys(userData).includes('recipientId') ? userData.recipientId[0] : userData;
    const [selectedItem, setSelectedItem] = useState({});
    console.log('selected----', selectedItem);
    // const [selectedItem, setSelectedItem] = useState(
    //     currentItem.data && currentItem.data.find((item) => item['_id'] === location.pathname.split('/').pop())
    // );
    // console.log(selectedItem, location, 'selected Item');
    const tagsFromDeviceSelection = useSelector((state) => state.passingAssociatePropStore);
    const assignWriteRecipient = useSelector((state) => state.assignWriteRecipientStore);
    //const { assignData } = useSelector((state) => state.getSocketScanData);
    let { assignData } = useSelector((state) => state.assignDataLocalDataStore);

    //console.log("assignData", assignData)
    const socket = useSelector((state) => state.socketReducer.socket);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { token } = useSelector((state) => state.getSocketDeviceToken);
    const { devicestatus } = useSelector((state) => state.getSocketDeviceStatus);
    console.log('devicestatusAssignunit', devicestatus);
    const [socketReponse, setSocketResponse] = useState(false);
    // console.log(assignData, 'from socket response');
    const [rfidNumber, setRfidNumber] = useState('');
    const [isAssigned, setisAssigned] = useState(false);
    const [assignLoading, setAssignLoading] = useState(false);
    const genericEmit = (data) => {
        if (data) {
            socket?.emit('generic', data);
        }
    };

    useEffect(() => {
        setUnitsTable(tableData);
    }, [selectedItem]);

    useEffect(() => {
        socket?.on('deviceStatus', (data) => {
            console.log('dev---', data);
            dispatch(socketDeviceStatus(data));
            console.log('appdata---', data);
            console.log('devicests', data?.deviceStatus);
        });
    }, [socket]);

    useEffect(() => {
        dispatch(getRecipientCount(history?.location?.state?.row?._id));
    }, []);

    const handleSocketWriteAssign = () => {
        setAssignLoading(true);
        console.log(
            {
                method: 'E125',
                deviceToken: token,
                payload: {
                    status: true,
                    userName: userInfo?.data?.user?.username,
                    message: 'write on this tag',
                    tagNumbers: assignable?.map((i) => i?.rfidNumber),
                    recipientId: location.pathname.split('/').pop(),
                    dereservationDate: tableDRdate,
                    'track-code': 'BS-TR-5103',
                    comments: comments ? comments : '',
                    sequenceNo: sequenceNo
                }
            },
            'socket assign unit emit method'
        );
        genericEmit({
            method: 'E125',
            deviceToken: token,
            payload: {
                status: true,
                userName: userInfo?.data?.user?.username,
                message: 'write on this tag',
                tagNumbers: assignable.map((i) => i?.rfidNumber),
                recipientId: location.pathname.split('/').pop(),
                dereservationDate: tableDRdate,
                'track-code': 'BS-TR-5103',
                comments: comments ? comments : '',
                sequenceNo: sequenceNo
            }
        });
    };

    const handleSocketAssign = () => {
        if (location?.state?.row) {
            let receipentdata =
                currentItem?.data &&
                currentItem?.data.find((item) => item['_id'] === location.pathname.split('/').pop());
            setAssignLoading(true);
            let Units = [];
            console.log('receipentdata', receipentdata);
            unitsTable.map((i) => {
                console.log('Dereservation Date - ' + i.tableDRdate);

                if (i?.check && !i.assigned && i.associated) {
                    Units.push({
                        firstName: selectedItem?.firstName,
                        lastName: selectedItem?.lastName,
                        mrnNumber: selectedItem?.mrnNumber,
                        dob: selectedItem?.dob,
                        gender: selectedItem?.gender,
                        userName: userInfo?.data?.user?.username,
                        message: 'Assign Tag',
                        totalTags: [i?.rfidNumber],
                        recipientId: location.pathname.split('/').pop(),
                        dereservationDate: i.tableDRdate,
                        'track-code': 'BS-TR-5103',
                        comments: comments ? comments : '',
                        sequenceNo: i.sequenceNo
                    });
                }
            });

            console.log('---------------Units ------------' + Units);

            genericEmit({
                method: 'E128',
                deviceToken: token,
                payload: {
                    status: true,
                    data: Units,
                    message: 'Units Assigned Successfully'
                }
            });
            console.log('==units==', Units);
        } else {
            let receipentdata =
                currentItem?.data &&
                currentItem?.data.find((item) => item['_id'] === location.pathname.split('/').pop());
            setAssignLoading(true);
            let Units = [];
            console.log('receipentdata', receipentdata);
            unitsTable.map((i) => {
                console.log('Dereservation Date - ' + i.tableDRdate);

                if (i?.check && !i.assigned && i.associated) {
                    Units.push({
                        firstName: selectedItem?.firstName,
                        lastName: selectedItem?.lastName,
                        mrnNumber: selectedItem?.mrnNumber,
                        dob: selectedItem?.dob,
                        gender: selectedItem?.gender,
                        userName: userInfo?.data?.user?.username,
                        message: 'Assign Tag',
                        totalTags: [i?.rfidNumber],
                        recipientId: selectedItem?._id,
                        dereservationDate: i.tableDRdate,
                        'track-code': 'BS-TR-5103',
                        comments: comments ? comments : '',
                        sequenceNo: i.sequenceNo
                    });
                }
            });

            console.log('---------------Units ------------' + Units);

            genericEmit({
                method: 'E128',
                deviceToken: token,
                payload: {
                    status: true,
                    data: Units,
                    message: 'Units Assigned Successfully'
                }
            });
            console.log('==units', Units);
            const remoteAllocationAssigned = [{ _id: remoteSelected?._id, comments: 'Assigned', status: 'Assigned' }];
            dispatch(declinedAction(remoteAllocationAssigned));
        }
    };

    const handleAssignedCount = () => {
        if (selectedItem && selectedItem['assignedCountUnit'] > 0) {
            let recipientId = location.pathname.split('/').pop();
            let filtersData = [{ key: 'recipientId._id', value: [recipientId] }];
            let recipientName = selectedItem['name'];
            let chipData = [recipientName];
            let chipNameAndId = { name: recipientName, id: recipientId };
            let filterKeysObjects = {};

            let newFiltersObject = { chipNameAndId, chipData, filtersData, filterKeysObjects, staticFilters: true };
            dispatch(getApplyFilters(newFiltersObject));
            dispatch(setScreeenIndex(1));
            history.push('/dashboard/request-unit');
        }
    };

    const [check, setCheck] = useState();
    console.log('check--', check);
    const checkRef = React.useRef();

    const feilds = ['mrnNumber', 'name', 'dob', 'bloodgroupId', 'gender', 'assignedCountUnit'];
    const feildNames = {
        name: 'Name',
        firstName: CONSTANTS.FIRST_NAME,
        lastName: CONSTANTS.LAST_NAME,
        //badgeNo: 'Badge Number',
        bloodgroupId: CONSTANTS.BLOOD_GROUP,
        gender: CONSTANTS.GENDER,
        dob: CONSTANTS.DOB,
        mrnNumber: 'MRN Number',
        assignedCountUnit: 'Assigned Unit'
        //usedCount: 'Used Count'
    };

    const [tableDRdate, setTableDRdate] = useState(hours_48_From_Now());
    const [tableDRdateError, setTableDRdateError] = useState(false);
    const [dereservationDate, setDereservationDate] = useState(null);
    const [productCodeOpen, setProductCodeOpen] = useState(false);
    const [deviceGroup, setDeviceGroup] = useState('');
    const [emergencyDialogOpen, setEmergencyDialogOpen] = useState(true);

    // recipientData from api
    const apiResponse = useSelector((state) => state.getData);
    const { loading, responseData } = apiResponse;

    const checkCommonUnitIds = () => {
        const currentUnitIds = unitTable?.map((item) => item?.unitId);
        const assignedUnitIds = unitIdResponse?.data_array?.map((item) => item?.unitId);
        let matcheIds = assignedUnitIds?.filter((assigned) => currentUnitIds?.includes(assigned));
        if (matcheIds?.length > 0) {
            setCommonUnitId(matcheIds[0]);
            setUnitIdAssigned(true);
        } else {
            setDialogOpen(true);
        }
    };

    const id = location.pathname.split('/')[4];

    useEffect(() => {
        dispatch(getSettings('setting'));
    }, []);

    function hours_48_From_Now(dt = new Date()) {
        return new Date(dt.setDate(dt.getDate() + 0));
    }

    function getDreservationDatetime(productgroupId, dt = new Date()) {
        console.log('productgroupid--', productgroupId);
        //console.log("set---", settingsData)
        let datas = settingsData?.dereservation?.filter((obj) => obj.productgroupId === productgroupId);
        console.log('datas', datas);
        console.log('dereservationproduct--', settingsData?.dereservation);
        if (datas?.length > 0) {
            // dt.setHours(dt.getHours + datas[0].dereservationTime.Hours);
            console.log(dt);

            //dt.setMinutes(dt.getMinutes + datas[0].dereservationTime.Minutes);
            console.log(dt);
            const date = moment()
                .add(datas[0].dereservationTime.Hours, 'hour')
                .add(datas[0].dereservationTime.Minutes, 'minute');
            console.log(date);

            return date;
        } else {
            return new Date(dt.setDate(dt.getDate() + 2));
        }
    }
    const handleSave = () => {
        console.log('handlesave--' + tempUnitId);

        setBloodGroup(unitIdData?.data?.[0]?.bloodgroupId?.[0]?.name);
        if (tempUnitId !== undefined && tempUnitId !== null) {
            //sameDereservation ? handleDeresrvationDate(sameDereservation) : null;
            if (unitsTable.length === 0 && unitId.length > 11 && productCode?.isbtcode) {
                setUnitsTable([
                    {
                        unitId: unitId.toUpperCase(),
                        productCode: productCode.isbtcode,
                        description: productCode.isbtdescription,
                        expiryDateAndTime: expiryDateAndTime,
                        tableDRdate: tempUnitId?.isAssigned
                            ? tempUnitId?.dereservationDate
                            : getDreservationDatetime(tempUnitId?.productcodeId?.productgroupId), //hours_48_From_Now(),
                        refskuId: unitId_id,
                        comment: comments,
                        sequenceNo: sequenceNo,
                        associated:
                            tempUnitId.rfidNumber !== undefined && tempUnitId.rfidNumber.length > 0 ? true : false,
                        assigned: tempUnitId.isAssigned === 0 ? false : true,
                        bloodGroup: tempUnitId.bloodgroupId[0]?.name,
                        rfidNumber: tempUnitId.rfidNumber,
                        check: tempUnitId.isAssigned === 1 ? false : true
                    }
                ]);
                setUnitId('');
                setProductCode(null);
                //setTableDRdate(hours_48_From_Now());
                setCheck('');
                setDisableCheck(false);
                setUnitIdError('');
                setComments('');
                setSequenceNo('');
            } else if (unitsTable.length > 0) {
                console.log('elseblood', bloodGroup);
                unitsTable.unshift({
                    /* unitId: unitId.toUpperCase(),
                    productCode: productCode.isbtcode,
                    description: productCode.isbtdescription,
                    //tableDRdate,
                    refskuId: unitId_id,
                    comment: comments,
                    bloodGroup: bloodGroup?.name,
                    rfidNumber: rfidNumber*/
                    unitId: unitId.toUpperCase(),
                    productCode: productCode.isbtcode,
                    description: productCode.isbtdescription,
                    expiryDateAndTime: expiryDateAndTime,
                    tableDRdate: tempUnitId?.isAssigned
                        ? tempUnitId?.dereservationDate
                        : getDreservationDatetime(tempUnitId?.productcodeId?.productgroupId), //hours_48_From_Now(),
                    refskuId: unitId_id,
                    check: tempUnitId.isAssigned === 0 ? true : false,
                    comment: comments,
                    associated: tempUnitId.rfidNumber !== undefined && tempUnitId.rfidNumber.length > 0 ? true : false,
                    assigned: tempUnitId.isAssigned === 0 ? false : true,
                    bloodGroup: bloodGroup,
                    rfidNumber: tempUnitId.rfidNumber,
                    sequenceNo: sequenceNo
                });
                setUnitsTable([...unitsTable]);
                setUnitId('');
                setProductCode(null);
                setCheck('');
                setDisableCheck(false);
                setUnitIdError('');
                setComments('');
                setSequenceNo('');
            }
            setProductCodeOptions([]);
            setDisableProductCode(true);
        }
    };

    const handleBack = () => {
        history.push('/dashboard/assign-unit');
        setFailedTags([]);
        setSuccessTags([]);
        if (socketReponse) {
            setSocketResponse(false);
        }
    };
    const handleDelete = (index) => {
        unitsTable.splice(index, 1);
        setUnitsTable([...unitsTable]);
    };

    const handleChangeSelect = (e) => {
        setDeviceGroup(e.target.value);
    };

    const { postUnitLoading, postUnitResponse, postUnitError } = useSelector((state) => state.addUnitRecipient);
    const [alert, setAlert] = useState(false);

    const handleAlert = () => {
        setAlert(false);
        // console.log(assignable, unitsTable);
        if (assignable?.length === unitsTable?.length) {
            history.push('/dashboard/assign-unit');
        }
    };

    useEffect(() => {
        console.log('Setting Data' + settingsData?.general?.features + '-----------');
        console.log('Recipent Data ------------' + JSON.stringify(currentItem));
        if (postUnitResponse?.status) {
            setAlert(true);
            setDialogOpen(false);
            setAssignLoading(false);
            if (assignable?.length !== unitsTable?.length) {
                let tempUnits = [...unitsTable];
                setAssignable([]);
                let tempSelectedTags = [...successTags];
                let tempUnitsTable = tempUnits.map((i) => {
                    if (i?.check === true) {
                        // console.log(i, 'inside map after assign');
                        tempSelectedTags.push(i?.rfidNumber);
                        return { ...i, check: false };
                    } else {
                        return i;
                    }
                });
                tempSelectedTags = tempSelectedTags.filter((i) => i);
                setUnitsTable(tempUnitsTable);
                setSuccessTags(tempSelectedTags);
            }
        }
    }, [postUnitResponse]);

    const handleAssign = () => {
        console.log('handleAssign');
        setAssignLoading(false);
        let newTable = [...assignable];

        newTable = newTable.map((item) => {
            if (id === 'emergency') {
                return {
                    refskuId: item?.refskuId,
                    dereservationDate: moment(item?.tableDRdate).format('yyyy/MM/DD hh:mm'),
                    'track-code': 'BS-TR-5113',
                    comments: item?.comment ? item?.comment : 'No comments',
                    name: 'Emergency Assigned'
                };
            } else {
                return {
                    recipientId: location.pathname.split('/').pop(),
                    refskuId: item?.refskuId,
                    dereservationDate: item.tableDRdate,
                    'track-code': 'BS-TR-5103',
                    comments: item?.comment ? item?.comment : 'No comments'
                };
            }
        });

        let collectionName = 'activity';
        let validData = [...newTable];

        let formData = JSON.stringify({ collectionName, validData });

        dispatch(postAddUnitData(formData));
    };

    const handleDate = (e) => {
        if (!(e?.getTime() < new Date().getTime())) {
            setTableDRdate(e);
            setTableDRdateError(false);
        }
        // console.log(sameDereservation, 'same dereservation date');
    };

    const handleDeresrvationDate = (e) => {
        const checked = e?.target ? e.target.checked : e;
        const dateNtime = tableDRdate ? tableDRdate : unitsTable[0]?.tableDRdate;
        const newunitsTable = unitsTable.map((i) => ({ ...i, tableDRdate: dateNtime }));
        checked === true ? unitsTable.splice(0, unitsTable.length, ...newunitsTable) : null;
        checked === true ? setUnitsTable([...unitsTable]) : null;
        e?.target ? setSameDereservation(!sameDereservation) : null;
    };

    const handleTableDate = (e, data) => {
        console.log('e---', e);
        const newunitsTable = unitsTable.map((i) => {
            if (i.rfidNumber === data.rfidNumber) {
                return { ...i, tableDRdate: e };
            }
            return i;
        });

        setUnitsTable([...newunitsTable]);

        //const newunitsTable = unitsTable.map((i) => ({ ...i, tableDRdate: e }));
        //setUnitsTable([...newunitsTable]);
        //setTableDRdate(e);

        /* if (sameDereservation && !(e?.getTime() < new Date().getTime())) {
            let tempUnitsTable = [...unitsTable];
            let newTableDrDate = String(e);
            newTableDrDate !== 'Invalid Date'
                ? tempUnitsTable[index] = {
                      unitId: tempUnitsTable[index]?.unitId,
                      productCode: tempUnitsTable[index]?.productCode,
                      description: tempUnitsTable[index]?.description,
                      expiryDateAndTime: tempUnitsTable[index]?.expiryDateAndTime,
                      sequenceNo: tempUnitsTable[index]?.sequenceNo,
                      tableDRdate: newTableDrDate,
                      associated: tempUnitsTable[index]?.associated,
                      refskuId: tempUnitsTable[index]?.refskuId,
                      bloodGroup: tempUnitsTable[index]?.bloodGroup,
                      rfidNumber: tempUnitsTable[index]?.rfidNumber,
                      check: tempUnitsTable[index]?.check,
                  }
                : null;
            newTableDrDate !== 'Invalid Date' ? setUnitsTable([...tempUnitsTable]) : null;
        }
       */
    };

    const handleSequenceChange = (e, index) => {
        console.log(' handleSequenceChange ' + e);

        let sequenceNoExists = false;
        console.log('sequenceexist', sequenceNoExists);
        console.log('sequeceerror', unitsTable[index].sequenceError);
        unitsTable[index].sequenceError = false;
        unitsTable.map((i) => {
            if (i.sequenceNo === e.target.value) {
                sequenceNoExists = true;
                // unitsTable[index].sequenceError = true;
            }
        });
        if (recipientvalue != undefined) {
            recipientvalue.map((i) => {
                console.log('iiiiiiiii', i);
                if (i == e.target.value) {
                    sequenceNoExists = true;
                    // unitsTable[index].sequenceError = true;
                }
            });
        }
        console.log('sequenceexist', sequenceNoExists);
        if (sequenceNoExists) {
            unitsTable[index].sequenceError = true;
        }
        if (!sequenceNoExists) {
            unitsTable.map((i) => (i.sequenceError = false));
        }
        unitsTable[index].sequenceNo = e.target.value;
        setUnitsTable([...unitsTable]);
    };

    const closeAndsave = () => {
        console.log('Close & Save');
        //let tempUnitId = unitId.toUpperCase();

        if (unitIdData?.data === undefined || unitIdData?.data?.length === 0) {
            setUnitIdError(true);
            setUnitIdErrorText('Unit Id Not Found');
        } else if (tempUnitId === null || tempUnitId === undefined) {
            setProductCodeError('try with new product code or UNIT ID');
            productCodeRef?.current?.focus();
        } else if (check === null || check === undefined || check.length === 0) {
            setUnitIdError(true);
            setUnitIdErrorText('Please Enter Check Value');
        } else if (
            unitsTable.findIndex(
                (item) =>
                    item.unitId === tempUnitId?.donationCode?.toUpperCase() &&
                    item.productCode === tempUnitId.productcodeId[0]?.isbtcode
            ) !== -1
        ) {
            setUnitIdError(true);
            setUnitIdErrorText('Units Already added');
            setCheck('');
            setDisableCheck(false);
            setProductCodeOptions([]);
        } else if ((tempUnitId != null) & (tempUnitId !== undefined)) {
            setScanOrManualOpen(false);
            handleSave();
        } else {
            if (productCode === null) {
                setProductCodeError(true);
                return;
            }
            if (unitId === '' || unitId.length < 12) {
                setUnitIdError(true);
                // setUnitIdErrorText('Invalid Unit ID, Length Should Be Minimum 13 Charecters');
                return;
            }
        }

        dispatch(clearUnitIdSearch());
    };

    const openAndSave = () => {
        console.log('open And Save on next click');
        unitIdRef.current.focus();
        //let tempUnitId = unitId.toUpperCase();

        if (unitIdData?.data === undefined || unitIdData?.data?.length === 0) {
            setUnitIdError(true);
            setUnitIdErrorText('Unit Id Not Found');
        } else if (tempUnitId === null || tempUnitId === undefined) {
            setProductCodeError('try with new product code or UNIT ID');
            productCodeRef?.current?.focus();
        } else if (check === null || check === undefined || check.length === 0) {
            setUnitIdError(true);
            setUnitIdErrorText('Please Enter Check Value');
        } else if (
            unitsTable.findIndex(
                (item) =>
                    item.unitId === tempUnitId?.donationCode?.toUpperCase() &&
                    item.productCode === tempUnitId.productcodeId[0]?.isbtcode
            ) !== -1
        ) {
            setUnitIdError(true);
            setUnitIdErrorText('Units Already added');
            setCheck('');
            setDisableCheck(false);
            setProductCodeOptions([]);
        } else if (tempUnitId !== undefined && tempUnitId !== null) {
            if (unitId.length < 12) {
                setUnitIdError(true);
                // setUnitIdErrorText('Invalid Unit ID, Length Should Be Minimum 13 Charecters');
                return;
            }

            if (productCode === null) {
                setProductCodeError(true);
                return;
            }

            handleSave();
        }
        dispatch(clearUnitIdSearch());
    };

    const handleUnitId = (e) => {
        setProductCodeError('');
        setProductCodeOptions([]);
        setProductCode(null);
        let val = e?.target?.value;
        console.log(' ---- Unit Id ---', val);
        console.log(settingsData?.general?.barCodeFormat);
        console.log(val.length);

        if (val?.includes('=%') && val?.length >= 6) {
            setUnitId('');
            setUnitIdError(true);
            setUnitIdErrorText('Invalid Unit Id');
            return;
        }
        if (val?.includes('=<') && val?.length >= 10) {
            setUnitId('');
            setUnitIdError(true);
            setUnitIdErrorText('Invalid Unit Id');
            return;
        }
        if (val?.includes('=\\') && val?.length >= 20) {
            setUnitId('');
            setUnitIdError(true);
            setUnitIdErrorText('Invalid Unit Id');
            return;
        }

        /*if (val?.match(/[&}>=<=%]/g)) {
            setUnitIdError(true);
            setUnitIdErrorText('Invalid Unit Id');
        }
        else*/
        if (
            !val?.includes('=\\') &&
            val.startsWith('=') &&
            settingsData?.general?.barCodeFormat === 'AUSTRALIAN' &&
            val.length === 14
        ) {
            setManualEntery(false);
            console.log('Australian barcode Scan');
            const unit = val.substring(1, 14);
            setUnitId(unit);
            const check = checkTextSum(val.substring(1, 14));
            setCheck(check);
            productCodeRef?.current?.focus();
            setDisableCheck(true);
            setUnitIdError(false);
            setUnitIdErrorText('');
        } else if (
            !val?.includes('=\\') &&
            val.startsWith('=') &&
            settingsData?.general?.barCodeFormat === 'ISBT' &&
            val.length === 16
        ) {
            setManualEntery(false);
            console.log('ISBT barcode Scan');
            const unit = val.substring(1, 16);
            setUnitId(unit);
            const check = checkTextSum(val.substring(1, 14));
            setCheck(check);
            productCodeRef?.current?.focus();
            setDisableCheck(true);
            setUnitIdError(false);
            setUnitIdErrorText('');
        } else if (
            !val?.includes('=\\') &&
            val.length === 13 &&
            settingsData?.general?.barCodeFormat === 'AUSTRALIAN' &&
            val.match(/^[a-zA-Z0-9]+$/)
        ) {
            setManualEntery(true);
            console.log('Australian Manual Entry');
            setUnitId(val);
            checkRef.current && checkRef.current.focus();
            setUnitIdError(false);
            setUnitIdErrorText('');
        } else if (
            !val?.includes('=\\') &&
            val.length === 15 &&
            settingsData?.general?.barCodeFormat === 'ISBT' &&
            val.match(/^[a-zA-Z0-9]+$/)
        ) {
            setManualEntery(true);
            console.log('ISBT Manual Entry');
            setUnitId(val);
            checkRef.current && checkRef.current.focus();
            setUnitIdError(false);
            setUnitIdErrorText('');
        } else {
            setUnitIdError(true);
            setUnitIdErrorText('Invalid Unit Id');
            setUnitId(val);
            if (check) {
                setCheck('');
                setDisableCheck(false);
            }
        }
    };

    const handleCheck = (e) => {
        console.log(' ---- Handle check ---- ' + unitId);
        setProductCode(null);
        const checkVal = checkTextSum(unitId);
        console.log('----' + checkVal + '----');
        if (e.target.value.toUpperCase() === checkVal) {
            console.log('Unit Id & check are matching');
            setUnitIdError(false);
            productCodeRef?.current?.focus();
        } else if (validationRequired) {
            setUnitIdError(true);
            setUnitIdErrorText('Enter A Valid Unit ID');
        }
        setCheck(e.target.value.toUpperCase());
    };

    const onCancelDialog = () => {
        if (id === 'emergency') {
            setEmergencyDialogOpen(false);
        }
        setUnitId('');
        setCheck();
        setDisableCheck(false);
        setProductCode(null);
        /// setTableDRdate(hours_48_From_Now());
        setUnitIdError(false);
        setTableDRdateError(false);
        setProductCodeError(false);
        setScanOrManualOpen(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedItem?.newTable) {
            unitTable.push(...selectedItem.newTable);
            setUnitsTable([...unitTable]);
        }
        dispatch(get4thDropdown('devices', undefined, 'associate'));
        dispatch(getDropDown('productcodes'));
        // setTableDRdate(hours_48_From_Now());
        if (location?.state?.row) {
            setSelectedItem(location?.state?.row);
        } else {
            setSelectedItem(remoteSelected?.recipientId?.[0]);
        }
        localStorage.setItem('recipientName', `${location?.state?.row?.firstName} ${location?.state?.row?.lastName}`);
        setFailedTags([]);
        setSuccessTags([]);
        return () => {
            unitTable.length = 0;
            dispatch(clearUnitIdSearch());
            dispatch(clearPostUnitResponse());
            dispatch(clear4thDropDown());
        };
    }, []);

    const { unitIdData } = useSelector((state) => state.getUnitIdSearch);
    console.log('data____', unitIdData);

    // const unitIdSearchApi = () => {
    //     dispatch(getUnitSearch('refsku', unitId));
    // };

    useEffect(() => {
        console.log('socket-----', socket);

        console.log('alert----');
        socket?.on('assignUnitRecipient', (data) => {
            console.log('assignUnitRecipient', data);
            if (data.status === true) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: data.message,
                        alertType: 'success'
                    })
                );
                setAssignLoading(false);
                setDialogOpen(false);
                // Rescan functionality added
                genericEmit({
                    userName: userInfo?.data?.user?.username,
                    deviceToken: token,
                    method: 'E129',
                    payload: {
                        userName: userInfo.data.user.username,
                        method: 'E129',
                        type: 'Associate'
                    }
                });
            } else {
                console.log('ellllll');
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: data.message,
                        alertType: 'error'
                    })
                );
                setAssignLoading(false);
                setDialogOpen(false);
            }
        });
    }, [socket]);

    useEffect(() => {
        console.log('Check value Updated');

        let filterKey = [{ key: 'donationCode', value: unitId?.toUpperCase() }];
        if (unitId && unitId.length > 2 && check && !unitIdError) {
            dispatch(getUnitSearch('refsku', JSON.stringify(filterKey)));
            setUnitId_id('');
            setDisableProductCode(false);
        }

        if (check === '') {
            setCheck();
        }
    }, [check]);

    useEffect(() => {
        /*if (
            unitsTable.findIndex((item) => item.unitId === unitId?.toUpperCase()
                && item.productcodeId === tempUnitId.productcodeId) !== -1 &&
            unitIdData &&
            unitIdData.data &&
            unitIdData.data.length === 1 &&
            unitIdData.data?.[0]?.isAssigned === 0 &&
            unitIdData.data?.[0]?.trackId[0]?.name !== 'fated' &&
            unitIdData?.data?.[0]?.productcodeId?.[0]?.isbtcode !== undefined &&
            check
        ) {
            setUnitIdError(true);
            setUnitIdErrorText('Unit is Available in Table');
            setCheck('');
            setDisableCheck(false);
            setProductCodeOptions([]);
        } else*/
        if (unitIdData?.data?.length === 1 && unitIdData?.data?.[0]?.trackId[0]?.name === 'fated') {
            setUnitIdError(true);
            setUnitIdErrorText('Unit is Fated');
            setProductCodeOptions([]);
        } else if (unitIdData && unitIdData.data && unitIdData.data.length > 0 && check) {
            if (unitIdData?.data?.length > 1) {
                let tempProductCodeIds = unitIdData?.data
                    ?.filter(
                        (i) =>
                            i?.isAssigned === 0 &&
                            i?.trackId[0]?.name !== 'fated' &&
                            i?.productcodeId?.[0]?.isbtcode !== undefined &&
                            i?.donationCode === unitId &&
                            i?.expiryDateAndTime === expiryDateAndTime
                    )
                    .map((i) => i?.productcodeId?.[0]?._id);
                // console.log(unitsTable, tempProductCodeIds, 'current TABLE');

                let tempIsbtCOdes = unitsTable
                    ?.filter((item) => item.unitId === unitId?.toUpperCase())
                    ?.map((item) => item?.productCode);
                // console.log(tempIsbtCOdes, tempProductCodeIds, 'tempIsbtCOdes');
                let tempProductCodeOptions = options?.data
                    ?.filter((i) => tempProductCodeIds.includes(i?._id))
                    ?.filter((item) => !tempIsbtCOdes?.includes(item?.isbtcode));
                console.log('tempproduct---', tempProductCodeOptions);
                if (tempProductCodeIds?.length === 0) {
                    setUnitIdError(true);
                    setUnitIdErrorText('Unit is Already Assigned');
                    setDisableProductCode(true);
                    setDisableCheck(false);
                    setCheck('');
                    setProductCodeOptions([]);
                } else {
                    setDisableProductCode(false);
                    unitIdRef.current.blur();
                    setProductCodeOptions(tempProductCodeOptions);
                    productCodeRef?.current?.focus();
                }
            } else {
                let tempCode = options?.data?.filter((i) => i?._id === unitIdData?.data?.[0]?.productcodeId?.[0]?._id);
                setProductCodeOptions(tempCode);
                setDisableProductCode(false);
                unitIdRef.current.blur();
                productCodeRef?.current?.focus();
                setUnitId_id(unitIdData?.data?.[0]?._id);
                setRfidNumber(unitIdData?.data?.[0]?.rfidNumber);
                setisAssigned(unitIdData?.data?.[0]?.isAssigned);
            }
        } else if (unitIdData && unitIdData.data && unitIdData.data.length === 0 && check) {
            setUnitIdError(true);
            setUnitIdErrorText('UnitId Not Found');
            setCheck('');
            setDisableCheck(false);
            setProductCode(null);
            checkRef.current && checkRef.current.blur();
            setProductCodeOptions([]);
        }

        if (unitIdData?.data?.[0]?.length > 0) {
            console.log('setbloodgroup', unitIdData?.data);
            setBloodGroup(unitIdData?.data?.[0]?.bloodgroupId?.[0]?.name);
        }
    }, []);

    const handleCancleAssign = () => {
        if (postUnitError && postUnitError.errorMessage) {
            dispatch(clearPostUnitResponse());
        }
        setAssignLoading(false);
        setDialogOpen(false);
    };

    const onChangeAutoComplete = (e, value) => {
        console.log('onChangeAutoComplete');

        console.log(unitIdData);

        let tempIsbtCOdes = unitsTable
            ?.filter((item) => item.unitId === unitId?.toUpperCase())
            ?.map((item) => item?.productCode);

        let tempUnitId = unitIdData?.data?.filter((i) => i?.productcodeId?.[0]?._id === value?._id)[0];
        settempUnitId(tempUnitId);

        if (!tempIsbtCOdes.includes(value?.isbtcode)) {
            console.log('settempunit', tempUnitId);
            setUnitId_id(tempUnitId?._id);
            setProductCode(value);
            setBloodGroup(tempUnitId?.bloodgroupId[0]?.name);
            setRfidNumber(tempUnitId?.rfidNumber);
            setisAssigned(tempUnitId?.isAssigned);
            commentRef?.current?.focus();
            setExpiryDate(tempUnitId?.expiryDateAndTime);
        } else {
            setProductCodeError('Already exists in table');
            setProductCode(null);
            // commentRef?.current?.focus();
        }
        setProductCodeOpen(false);
    };

    const handleClickAway = () => {
        setProductCodeOpen(false);
    };

    const handleAutoCompleteChange = (e) => {
        console.log(' -- handleAutoCompleteChange --- ' + e?.target?.value);
        let tempUnitId;

        if (e && e?.target?.value?.match(/[&}>%]/g)) {
            setProductCodeError('Invalid Product code');

            setProductCode(null);
        }
        if (e && e?.target?.value?.includes('=%') && e?.target?.value?.length >= 6) {
            setProductCode(null);
            setProductCodeError('Invalid Product code');

            return;
        }

        if (e && e?.target?.value?.includes('=\\') && e?.target?.value?.length >= 20) {
            setProductCode(null);
            setProductCodeError('Invalid Product code');

            return;
        } else if (e && e?.target?.value?.includes('=<')) {
            let values = options?.data?.find(
                (item) => item.isbtcode.toLowerCase() === e?.target?.value?.substr(2).toLowerCase()
            );
            if (values) {
                console.log('values', values);
                let tempIsbtCOdes = unitsTable
                    ?.filter((item) => item.unitId === unitId?.toUpperCase())
                    ?.map((item) => item?.productCode);

                console.log(' ---- unitIdData --- ' + unitIdData);

                let tempUnitId = unitIdData?.data?.filter((i) => i?.productcodeId?.[0]?._id === values?._id)[0];
                console.log('Unit Id ---- ' + tempUnitId);
                settempUnitId(tempUnitId);
                console.log('Unit Id ---- ' + tempUnitId);
                if (tempIsbtCOdes?.includes(values?.isbtcode)) {
                    setProductCodeError('Already exists in table');
                    setProductCode(null);
                    setUnitIdError(true);
                    // productCodeRef?.current?.blur();
                }
                /*if (tempUnitId?.isAssigned === 1) {
                    setProductCodeError(`Product code ${e.target.value?.substr(2).toLowerCase()} is already assigned`);
                    // commentRef?.current?.focus();
                } else*/
                if (!tempIsbtCOdes?.includes(values?.isbtcode)) {
                    setUnitId_id(tempUnitId?._id);
                    setProductCode(values);
                    console.log('Blood Group' + tempUnitId?.bloodgroupId?.[0]?.name);
                    setBloodGroup(tempUnitId?.bloodgroupId?.[0]);
                    setProductCodeError('');
                    commentRef?.current?.focus();
                    setRfidNumber(tempUnitId?.rfidNumber);
                    setisAssigned(tempUnitId?.isAssigned);
                    // commentRef?.current?.focus();
                }

                setProductCode(values);
                //setBloodGroup(unitIdData?.data?.[0]?.bloodgroupId?.[0]);
                setProductCodeError('');
                setTimeout(() => commentRef?.current?.focus(), 500);
            }
        } else if (e?.target?.value?.length <= 10) {
            let values = options?.data?.find(
                (item) => item.isbtcode.toLowerCase() === e.target.value?.substr(2).toLowerCase()
            );

            console.log('---- Values ----- ' + values);
            if (values) {
                let tempIsbtCOdes = unitsTable
                    ?.filter((item) => item.unitId === unitId?.toUpperCase())
                    ?.map((item) => item?.productCode);
                // console.log(tempIsbtCOdes?.includes(values?.isbtcode), 'tempIsbtCOdes.includes(values.isbtcode');
                tempUnitId = unitIdData?.data?.filter((i) => i?.productcodeId?.[0]?._id === values?._id)[0];

                console.log('Unit Id ---- ' + tempUnitId);
                if (tempIsbtCOdes?.includes(values?.isbtcode)) {
                    setProductCodeError('Already exists in table');
                    setProductCode(null);
                    setUnitIdError(true);
                    // productCodeRef?.current?.blur();
                }
                /* if (tempUnitId?.isAssigned === 1) {
                    setProductCodeError(`Product code ${e.target.value?.substr(2).toLowerCase()} is already assigned`);
                    // commentRef?.current?.focus();
                } else*/
                if (tempUnitId?.isAssigned === 0 && !tempIsbtCOdes?.includes(values?.isbtcode)) {
                    setUnitId_id(tempUnitId?._id);
                    setProductCode(values);
                    setBloodGroup(tempUnitId.bloodgroupId.name);
                    setProductCodeError('');
                    commentRef?.current?.focus();
                    setRfidNumber(tempUnitId?.rfidNumber);
                    setisAssigned(tempUnitId?.isAssigned);
                    setExpiryDate(tempUnitId?.expiryDateAndTime);
                    // commentRef?.current?.focus();
                } else if (!tempIsbtCOdes?.includes(values?.isbtcode)) {
                    setProductCodeError('Product code not matching');
                }
            } else {
                e?.target?.value && e.target.value.length > 2 ? setProductCodeOpen(true) : setProductCodeOpen(false);
            }
        } else {
            setProductCodeError('Invalid Product code');
            setProductCode(null);
        }
    };

    useEffect(() => {
        if (options?.data?.length > 0) setProductCodeOptions(options?.data);
    }, [options]);

    useEffect(() => {
        console.log('assignData data--', assignData);
        if (device !== '' && !assignLoading) {
            setSocketResponse(true);
            setSameDereservation(true);
            let tempUnits = assignData.map((i) => {
                return {
                    unitId: i?.donationCode,
                    productCode: i?.productcodeId?.isbtcode,
                    description: i?.productcodeId?.isbtdescription,
                    expiryDateAndTime: i?.expiryDateAndTime,
                    tableDRdate: i?.isAssigned
                        ? i?.dereservationDate
                        : getDreservationDatetime(i?.productcodeId?.productgroupId), //hours_48_From_Now(),
                    rfidNumber: i?.rfidNumber,
                    recipientId: i?.recipientId,
                    bloodGroup: i?.bloodgroupId?.name,
                    assigned: i?.isAssigned,
                    associated: i?.isAssociated,
                    sequenceNo: i?.sequenceNo,
                    check: i?.isAssigned || !i?.isAssociated ? false : i?.check
                };
            });
            console.log('----------unitsTable--', unitsTable);
            console.log('--------------' + tempUnits + '---------------');

            setUnitsTable([...tempUnits]);
        }
    }, [assignData]);

    useEffect(() => {
        console.log('Page Refresh');
        console.log('Response ' + JSON.stringify(assignWriteRecipient));

        if (assignWriteRecipient?.status === false) {
            console.log('false status');
            setAssignLoading(false);
            setDialogOpen(false);
            console.log('assignwriterecipient', assignWriteRecipient);
        } else if (assignWriteRecipient?.status === true) {
            setAssignLoading(false);
            setDialogOpen(false);
            let tempFaildTags = [
                ...(assignWriteRecipient?.data?.[0]?.failedTags || []),
                ...failedTags.filter((i) => !assignWriteRecipient?.data?.[0]?.successTags?.includes(i))
            ];
            console.log('tempfailedtags--', tempFaildTags);
            let tempSuccessTags = assignWriteRecipient?.data?.[0]?.successTags || [];
            console.log('tempSuccessTags--', tempSuccessTags);
            let tempUnitsTable = unitsTable.map((i) => {
                if (assignWriteRecipient?.data?.[0]?.successTags?.includes(i?.rfidNumber)) {
                    return { ...i, check: false };
                } else {
                    return i;
                }
            });
            setUnitsTable(tempUnitsTable);
            console.log('tempUnitstable', tempUnitsTable);
            setSuccessTags([...successTags, ...tempSuccessTags]);
            setFailedTags([...tempFaildTags]);

            if (
                assignWriteRecipient?.data?.[0]?.totalTags?.length ===
                    assignWriteRecipient?.data?.[0]?.successTags?.length &&
                assignWriteRecipient?.data?.[0]?.successTags?.length > 0
            ) {
                dispatch(
                    createAlert({
                        showAlert: true,
                        alertMessage: 'Write Recipient Successful',
                        alertType: 'success',
                        alertDuration: 10000
                    })
                );
                setAssignLoading(false);
                setDialogOpen(false);
            } else if (assignWriteRecipient?.data?.[0]?.successTags?.length > 0) {
                setDialogOpen(false);
                setAssignLoading(false);
            }

            //Commented Temporarily

            //if (assignWriteRecipient?.[0]?.failedTags?.length > 0) {
            //    setDialogOpen(false);
            //    setAssignLoading(false);
            //    dispatch(
            //        createAlert({
            //            showAlert: true,
            //            alertMessage: 'Some Tags are not successfully written',
            //            alertType: 'error',
            //            alertDuration: 10000
            //        })
            //    );
            //}
        }
    }, [assignWriteRecipient]);

    console.log(
        { assignData, unitsTable, bloodGroup, tagsFromDeviceSelection, assignWriteRecipient },
        'assignWriteRecipient'
    );

    React.useEffect(() => {
        // console.log(socket && device !== '', socket, device);

        if (socket) {
            console.log('socket--', socket);

            socket.on('listenScannedData', (data) => {
                console.log('listenScannedData----', data);
                //  if (data.status === true && device && data?.data.length > 0) {
                if (data.status === true && data?.data.length > 0) {
                    const index = assignData.findIndex((ids) => ids.rfidNumber === data?.data[0].rfidNumber);
                    if (index === -1) {
                        console.log('Added');
                        assignData.push(data?.data[0]);
                    } else {
                        assignData = assignData.filter((item) => item.rfidNumber !== data?.data[0].rfidNumber);
                        assignData.push(data?.data[0]);
                    }
                    //localPreEncode.push(data?.data[0]);
                    console.log('-------localpreencode', assignData);

                    dispatch(assignLocalDataAction(assignData));
                }
            });
        }
    });

    useEffect(() => {
        let tempAssignable = [];

        tempAssignable = unitsTable?.filter(
            (item) => item.check === true && item.associated === true && item.assigned === false
        ); //else { //tempAssignable = []; // unitsTable.filter(

        /*if (unitsTable.some((i) => i?.check === true))
        {
           
            tempAssignable = unitsTable.filter(
                (i) => {
                    console.log("Assignable -> " + i.check)
                    // i?.bloodGroup?.toLowerCase() === selectedItem?.['bloodgroupId']?.[0]?.name?.toLowerCase() &&    //--- uncomment these line for bloodgroup validation
                    i?.check === true && !successTags?.includes(i?.rfidNumber)
                }
            );
        } */ //     (i) =>
        //         // i?.bloodGroup?.toLowerCase() === selectedItem?.['bloodgroupId']?.[0]?.name?.toLowerCase() &&  //--- uncomment these line for bloodgroup validation
        //         !successTags?.includes(i?.rfidNumber)
        // );
        //}

        console.log(tempAssignable, 'tempAssignable');
        setAssignable(tempAssignable);
        // console.log(unitsTable, successTags, 'unitsTable');
    }, [unitsTable, successTags]);
    const [selectedRecords, setSelectedRecords] = useState([]);

    const handleTableCheck = (e, indexm, unit) => {
        console.log('unit', unit);
        console.log('e--', e);
        console.log('indexm--', indexm);

        unitsTable[indexm].check = e.target.checked ? true : false;
        console.log(unitsTable[indexm]);

        let tempUnitsTable = [...unitsTable];
        tempUnitsTable[indexm].check = e.target.checked ? true : false;

        console.log('tempUnitsTable', tempUnitsTable);
        setUnitsTable(tempUnitsTable);
    };

    const handleTableCheckAll = (e) => {
        let localdata = [];

        unitsTable.forEach((data) => {
            console.log('dta--', data);
            console.log('Is Checked ----------------', data.check);
            if (data?.assigned || !data?.unitId) {
                data.check = false;
            } else {
                data.check = e.target.checked ? true : false;
            }
            localdata.push(data);
        });
        let val = unitsTable.filter((item) => item.check === true);
        if (val.length > 0) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
        console.log('localdata---', localdata);
        setUnitsTable(localdata);
    };

    useEffect(() => {
        if (Array.isArray(Lf_Hf_TagValidation) && Lf_Hf_TagValidation?.includes('hfWrite')) {
            setSocketResponse(true);
        } else {
            setSocketResponse(false);
        }
    }, [Lf_Hf_TagValidation]);

    const handleClear = () => {
        genericEmit({
            userName: userInfo?.data?.user?.username,
            deviceToken: token,
            method: 'E105',
            payload: {
                userName: userInfo?.data?.user?.username,
                method: 'E105',
                acknOn: 'ackStopScan'
            }
        });
        dispatch(socketAssociateBulkData());

        dispatch(assignLocalDataAction([]));
        setUnitsTable([]);
        setSelectedRecords([]);
    };

    return (
        <>
            <RecepientPageComponent
                checkAll={checkAll}
                handleClear={handleClear}
                loading={loading}
                handleAssign={
                    settingsData?.general?.features?.includes('Write') ? handleSocketWriteAssign : handleSocketAssign
                }
                handleBack={handleBack}
                handleDelete={handleDelete}
                handleSave={handleSave}
                feilds={feilds}
                feildNames={feildNames}
                unitId={unitId}
                setUnitId={setUnitId}
                expiryDateAndTime={expiryDateAndTime}
                setExpiryDate={setExpiryDate}
                productCode={productCode}
                setProductCode={setProductCode}
                selectedItem={selectedItem}
                handleDate={handleDate}
                tableDRdate={tableDRdate}
                handleDeresrvationDate={handleDeresrvationDate}
                dereservationDate={dereservationDate}
                setDereservationDate={setDereservationDate}
                sameDereservation={sameDereservation}
                setSameDereservation={setSameDereservation}
                setDialogOpen={setDialogOpen}
                dialogOpen={dialogOpen}
                productCodeOpen={productCodeOpen}
                unitIdAssigned={unitIdAssigned}
                setUnitIdAssigned={setUnitIdAssigned}
                commonUnitId={commonUnitId}
                unitsTable={unitsTable}
                checkCommonUnitIds={checkCommonUnitIds}
                handleTableDate={handleTableDate}
                handleSequenceChange={handleSequenceChange}
                scanOrManualOpen={scanOrManualOpen}
                setScanOrManualOpen={setScanOrManualOpen}
                closeAndsave={closeAndsave}
                openAndSave={openAndSave}
                productCodeError={productCodeError}
                setProductCodeError={setProductCodeError}
                unitIdError={unitIdError}
                setUnitIdError={setUnitIdError}
                tableDRdateError={tableDRdateError}
                setTableDRdateError={setTableDRdateError}
                onCancelDialog={onCancelDialog}
                check={check}
                setCheck={setCheck}
                checkRef={checkRef}
                handleUnitId={handleUnitId}
                handleCheck={handleCheck}
                id={id}
                deviceGroup={deviceGroup}
                comments={comments}
                setComments={setComments}
                handleChangeSelect={handleChangeSelect}
                error={postUnitError?.errorMessage}
                handleCancleAssign={handleCancleAssign}
                alert={alert}
                postUnitResponse={postUnitResponse}
                setAlert={setAlert}
                handleAlert={handleAlert}
                unitIdErrorText={unitIdErrorText}
                emergencyDialogOpen={emergencyDialogOpen}
                setEmergencyDialogOpen={setEmergencyDialogOpen}
                setUnitIdErrorText={setUnitIdErrorText}
                postUnitLoading={postUnitLoading}
                handleAssignedCount={handleAssignedCount}
                disableCheck={disableCheck}
                commentRef={commentRef}
                unitIdRef={unitIdRef}
                options={options?.data}
                handleAutoCompleteChange={handleAutoCompleteChange}
                onChangeAutoComplete={onChangeAutoComplete}
                handleClickAway={handleClickAway}
                disableProductCode={disableProductCode}
                setDisableProductCode={setDisableProductCode}
                productCodeRef={productCodeRef}
                failedTags={failedTags}
                successTags={successTags}
                assignable={assignable}
                handleTableCheck={handleTableCheck}
                assignLoading={assignLoading}
                socketReponse={socketReponse}
                unique={unique}
                handleTableCheckAll={handleTableCheckAll}
                selectedRecords={selectedRecords}
                recipientId={location.pathname.split('/').pop()}
                sequenceNo={sequenceNo}
                setSequenceNo={setSequenceNo}
                devicestatus={devicestatus}
            />
        </>
    );
}

export default RecepientPage;
