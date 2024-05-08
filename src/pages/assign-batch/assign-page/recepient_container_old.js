import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { unitTable } from '../../assign/assign-page/DummyData';
import RecepientPageComponent from './recepient-page.component';
import Response from '../../../JSON/ResponseResults.json';
import unitIdResponse from '../../../JSON/unitIdResponse.json';
import CONSTANTS from 'common/constants';
import { checkTextSum } from '.././../../components/add-unit/add-unit-form/unitIdService';
import { clearData, getData } from 'redux/actions/scGenericApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCodes } from 'redux/actions/assignUnit/productcodeActions';
import { clearUnitIdSearch, getUnitSearch } from '../../../redux/actions/assignUnit/unitIdSearchAction';
import { clearPostUnitResponse, postAddUnitData } from '../../../redux/actions/assignUnit/addUnitsRecipientActions';
import moment from 'moment';
import { getApplyFilters } from '../../../redux/actions/filters/globalFilterAction';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';

const Data = Response.data_array;

function RecepientPageOld() {
    const location = useLocation();
    const history = useHistory();
    const data = location?.state?.data || [];
    const tableData =
        data?.length > 0
            ? data.map((ele) => {
                  return {
                      unitId: ele.donationCode,
                      productCode: ele.productcodeId[0]?.isbtcode || 'No IsbtCode',
                      description: ele.productcodeId[0]?.isbtdescription || 'no IsbtDescription',
                      tableDRdate: hours_48_From_Now(),
                      refskuId: ele._id
                  };
              })
            : [];
    const [scanOrManualOpen, setScanOrManualOpen] = useState(false);
    const [unitsTable, setUnitsTable] = useState(tableData);
    const [commonUnitId, setCommonUnitId] = useState([]);
    const [unitIdAssigned, setUnitIdAssigned] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sameDereservation, setSameDereservation] = useState(false);
    const [unitId, setUnitId] = useState('');
    const [unitIdError, setUnitIdError] = useState(false);
    const [productCode, setProductCode] = useState(null);
    const [productCodeError, setProductCodeError] = useState(false);
    const [comments, setComments] = useState('');
    const [unitId_id, setUnitId_id] = useState('');
    const [unitIdErrorText, setUnitIdErrorText] = useState('');
    const [manualEntry, setManualEntery] = useState(true);
    const [count, setCount] = useState(0);

    let currentItem = JSON.parse(localStorage.getItem('recipientData'));
    const { dateFormat } = useSelector((state) => state.dateFormat);
    const userData =
        currentItem.data && currentItem?.data?.find((item) => item['_id'] === location.pathname.split('/').pop());
    const headerData = userData && Object.keys(userData).includes('recipientId') ? userData.recipientId[0] : userData;
    const [selectedItem, setSelectedItem] = useState(headerData || []);
    // const [selectedItem, setSelectedItem] = useState(
    //     currentItem.data && currentItem.data.find((item) => item['_id'] === location.pathname.split('/').pop())
    // );

    const handleAssignedCount = () => {
        if (selectedItem && selectedItem['assignedCount'] > 0) {
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
    const checkRef = React.useRef();

    const feilds = ['name', 'dob', 'gender', 'bloodgroupId', 'assignedCount', 'usedCount'];
    const feildNames = {
        name: 'Name',
        firstName: CONSTANTS.FIRST_NAME,
        lastName: CONSTANTS.LAST_NAME,
        // badgeNo: 'Badge Number',
        bloodgroupId: CONSTANTS.BLOOD_GROUP,
        gender: CONSTANTS.GENDER,
        dob: CONSTANTS.DOB,
        mrnNumber: 'MRN Number',
        assignedCount: 'Assigned Unit',
        usedCount: 'Used Count'
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

    const handleAutoCompleteChange = (e) => {
        e?.target?.value && e.target.value.length > 2 ? setProductCodeOpen(true) : setProductCodeOpen(false);
    };

    const handleClickAway = () => {
        setProductCodeOpen(false);
    };

    const onChangeAutoComplete = (e, value) => {
        setProductCode(value);
        setProductCodeOpen(false);
    };

    const checkCommonUnitIds = () => {
        const currentUnitIds = unitTable.map((item) => item.unitId);
        const assignedUnitIds = unitIdResponse.data_array.map((item) => item.unitId);
        let matcheIds = assignedUnitIds.filter((assigned) => currentUnitIds.includes(assigned));
        if (matcheIds.length > 0) {
            setCommonUnitId(matcheIds[0]);
            setUnitIdAssigned(true);
        } else {
            setDialogOpen(true);
        }
    };

    const id = location.pathname.split('/')[4];

    function hours_48_From_Now(dt = new Date()) {
        return new Date(dt.setDate(dt.getDate() + 2));
    }

    const handleSave = () => {
        sameDereservation ? handleDeresrvationDate(sameDereservation) : null;

        if (unitsTable.length === 0 && unitId.length > 11 && productCode.productionCode && tableDRdate) {
            setUnitsTable([
                {
                    unitId: unitId.toUpperCase() + '00',
                    productCode: productCode.productionCode,
                    description: productCode.description,
                    tableDRdate,
                    refskuId: unitId_id,
                    comment: comments
                }
            ]);
            setUnitId('');
            setProductCode({ both: '' });
            setTableDRdate(hours_48_From_Now());
            setCheck('');
            setUnitIdError('');
            setComments('');
        } else if (unitsTable.length > 0) {
            unitsTable.unshift({
                unitId: unitId.toUpperCase() + '00',
                productCode: productCode.productionCode,
                description: productCode.description,
                tableDRdate,
                refskuId: unitId_id,
                comment: comments
            });
            setUnitsTable([...unitsTable]);
            setUnitId('');
            setProductCode({ both: '' });
            setTableDRdate(hours_48_From_Now());
            setCheck('');
            setUnitIdError('');
            setComments('');
        }
    };

    const handleBack = () => {
        history.push('/dashboard/assign-unit');
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
        history.push('/dashboard/assign-unit');
    };

    useEffect(() => {
        if (!postUnitLoading && postUnitResponse && postUnitResponse.status && postUnitResponse.error === null) {
            setAlert(true);
            setDialogOpen(false);
        }
    }, [postUnitResponse]);

    const handleAssign = () => {
        // const currentUnitIds = unitTable.map((item) => item.unitId);
        // const assignedUnitIds = unitIdResponse.data_array.map((item) => item.unitId);
        // let matcheIds = assignedUnitIds.filter((assigned) => currentUnitIds.includes(assigned));
        let newTable = [...unitsTable];

        newTable = newTable.map((item) => {
            if (id === 'emergency') {
                return {
                    refskuId: item?.refskuId,
                    dereservationDate: moment(item?.tableDRdate).format('DD/MM/yyyy hh:mm'),
                    'track-code': 'BS-TR-5113',
                    comments: item?.comment ? item?.comment : 'No comments',
                    name: 'Emergency Assigned'
                };
            } else {
                return {
                    recipientId: location.pathname.split('/').pop(),
                    refskuId: item?.refskuId,
                    dereservationDate: moment(item.tableDRdate).format('DD/MM/yyyy hh:mm'),
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
    };

    const handleDeresrvationDate = (e) => {
        const checked = e?.target ? e.target.checked : e;
        const dateNtime = tableDRdate ? tableDRdate : unitsTable[0]?.tableDRdate;
        const newunitsTable = unitsTable.map((i) => ({ ...i, tableDRdate: dateNtime }));
        checked === true ? unitsTable.splice(0, unitsTable.length, ...newunitsTable) : null;
        checked === true ? setUnitsTable([...unitsTable]) : null;
        e?.target ? setSameDereservation(!sameDereservation) : null;
    };

    const handleTableDate = (e, index) => {
        if (!(e?.getTime() < new Date().getTime())) {
            let tempUnitsTable = [...unitsTable];
            let newTableDrDate = String(e);
            newTableDrDate !== 'Invalid Date'
                ? tempUnitsTable.splice(index, 1, {
                      unitId: tempUnitsTable[index]?.unitId,
                      productCode: tempUnitsTable[index]?.productCode,
                      description: tempUnitsTable[index]?.description,
                      tableDRdate: newTableDrDate,
                      refskuId: tempUnitsTable[index]?.refskuId
                  })
                : null;
            newTableDrDate !== 'Invalid Date' ? setUnitsTable([...tempUnitsTable]) : null;
        }
    };

    const closeAndsave = () => {
        if (unitsTable.filter((item) => item.unitId === unitId.toUpperCase() + '00').length !== 0) {
            setUnitIdError(true);
            setUnitId(`=${unitId}`);
            setUnitIdErrorText('Unit Id Exists in Table');
        } else {
            if (unitId.length > 12 && productCode) {
                let invalidDate = String(tableDRdate);
                invalidDate !== 'Invalid Date' && tableDRdate > new Date().getTime() ? handleSave() : null;
                if (invalidDate !== 'Invalid Date' && tableDRdate > new Date().getTime()) {
                    setScanOrManualOpen(false), setEmergencyDialogOpen(false);
                } else {
                    null;
                }
            } else {
                if (productCode === null) {
                    setProductCodeError(true);
                }
                if (unitId === '' || unitId.length < 12) {
                    setUnitIdError(true);
                    // setUnitIdErrorText('Invalid Unit ID, Length Should Be Minimum 13 Charecters');
                }
                if (tableDRdate === null || String(tableDRdate) === 'Invalid Date') {
                    setTableDRdateError(true);
                }
            }
        }
        dispatch(clearUnitIdSearch());
    };

    const openAndSave = () => {
        if (unitsTable.filter((item) => item.unitId === unitId.toUpperCase() + '00').length !== 0) {
            setUnitIdError(true);
            setUnitIdErrorText('Unit Id Exists in Table');
        } else {
            if (unitId.length < 12) {
                setUnitIdError(true);
                // setUnitIdErrorText('Invalid Unit ID, Length Should Be Minimum 13 Charecters');
            }

            if (tableDRdate === null) {
                setTableDRdateError(true);
            }
            if (productCode === null) {
                setProductCodeError(true);
            } else {
                let invalidDate = String(tableDRdate);

                invalidDate !== 'Invalid Date' && tableDRdate?.getTime() > new Date().getTime()
                    ? handleSave()
                    : setTableDRdateError(true);
            }
        }
        dispatch(clearUnitIdSearch());
    };

    const handleUnitId = (e) => {
        const val = e.target.value;
        if (val.startsWith('=') && val.length > 15) {
            setManualEntery(false);
            const unit = val.substring(1, 14);
            setUnitId(unit);
            checkRef.current && checkRef.current.focus();
            const check = checkTextSum(unit);
            setCheck(check);
        } else if (val.length === 13 && val.match(/^[a-zA-Z0-9]+$/)) {
            checkRef.current && checkRef.current.focus();
        } else {
            setUnitId(val);
        }

        if (e.target.value === '') {
            setUnitId('');
            setCheck('');
            setUnitId_id('');
        }
        //  else {
        //     if (e.target.value.startsWith('=') ? e.target.value.length < 17 : e.target.value.length < 14) {
        //         const val = e.target.value;

        //         setUnitId(val);
        //         if (val.length === 13 && val.match(/^[a-zA-Z0-9]+$/)) {
        //             checkRef.current && checkRef.current.focus();
        //         } else if (val.length === 16 && val.charAt(0) === '=') {
        //             checkRef.current && checkRef.current.focus();
        //             const check = checkTextSum(unit);
        //             setCheck(check);
        //         }
        //     }
        // }
    };

    const handleCheck = (e) => {
        setCheck(e.target.value.toUpperCase());
        const checkVal = checkTextSum(unitId);
        if (e.target.value.toUpperCase() === checkVal) {
            setUnitIdError(false);
        } else {
            setUnitIdError(true);
            setUnitIdErrorText('Unit Id and Check Value Are Not Matching');
        }
    };

    const onCancelDialog = () => {
        if (id === 'emergency') {
            setEmergencyDialogOpen(false);
        }
        setUnitId('');
        setCheck('');
        setProductCode(null);
        setTableDRdate(hours_48_From_Now());
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
        setTableDRdate(hours_48_From_Now());

        return () => {
            unitTable.length = 0;
            dispatch(clearUnitIdSearch());
            dispatch(clearPostUnitResponse());
        };
    }, []);

    const { unitIdData } = useSelector((state) => state.getUnitIdSearch);

    // const unitIdSearchApi = () => {
    //     dispatch(getUnitSearch('refsku', unitId));
    // };

    useEffect(() => {
        let filterKey = [{ key: 'donationCode', value: unitId?.toUpperCase() + '00' }];
        if (unitId && unitId.length > 2 && check && !unitIdError) {
            dispatch(getUnitSearch('refsku', JSON.stringify(filterKey)));
            setUnitId_id('');
        }
    }, [check]);

    useEffect(() => {
        if (
            unitIdData &&
            unitIdData.data &&
            unitIdData.data.length > 0 &&
            unitIdData.data?.[0]?.isAssigned === 0 &&
            unitIdData.data?.[0]?.trackId[0]?.name !== 'fated' &&
            unitIdData?.data?.[0]?.productcodeId?.[0]?.isbtcode !== undefined &&
            check
        ) {
            let tempCode = {
                both: `${unitIdData?.data?.[0]?.productcodeId?.[0]?.isbtcode} | ${unitIdData?.data?.[0].productcodeId?.[0]?.isbtdescription}`,
                productionCode: unitIdData?.data?.[0]?.productcodeId?.[0]?.isbtcode,
                description: unitIdData?.data?.[0]?.productcodeId?.[0]?.isbtdescription
            };
            setUnitId_id(unitIdData?.data?.[0]?._id);
            setProductCode(tempCode);
        } else if (unitIdData && unitIdData.data && unitIdData.data.length === 0 && check) {
            setUnitIdError(true);
            setUnitIdErrorText('No Product Code Exist with this Unit');
            setCheck('');
            !manualEntry && !unitId.includes('=') ? setUnitId(`=${unitId}`) : null;
            checkRef.current && checkRef.current.blur();
        } else if (
            unitIdData &&
            unitIdData.data &&
            unitIdData.data.length > 0 &&
            // unitIdData.data[0].isAssigned === 1 &&
            check
        ) {
            setUnitIdError(true);
            setUnitIdErrorText('Already Assigned');
            setUnitId(`=${unitId}`);
            setCheck('');
            checkRef.current && checkRef.current.blur();
        }
    }, [unitIdData]);

    const handleCancleAssign = () => {
        if (postUnitError && postUnitError.errorMessage) {
            dispatch(clearPostUnitResponse());
        }
        setDialogOpen(false);
    };

    return (
        <RecepientPageComponent
            loading={loading}
            handleAssign={handleAssign}
            handleBack={handleBack}
            handleDelete={handleDelete}
            handleSave={handleSave}
            feilds={feilds}
            feildNames={feildNames}
            unitId={unitId}
            setUnitId={setUnitId}
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
            handleAutoCompleteChange={handleAutoCompleteChange}
            handleClickAway={handleClickAway}
            onChangeAutoComplete={onChangeAutoComplete}
            unitIdAssigned={unitIdAssigned}
            setUnitIdAssigned={setUnitIdAssigned}
            commonUnitId={commonUnitId}
            unitsTable={unitsTable}
            checkCommonUnitIds={checkCommonUnitIds}
            handleTableDate={handleTableDate}
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
            setCount={setCount}
            count={count}
        />
    );
}

export default RecepientPageOld;
