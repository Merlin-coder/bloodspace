import { useState, useEffect } from 'react';
import {
    checkAtLeastLength,
    checkZipcodePattern,
    checkPhonePattern,
    checkIpAddressPattern,
    checkIsfilled,
    checkIsTrue,
    checkEmailPattern,
    checkOnlyNumberPattern
} from 'common/services/inputValidators';
import moment from 'moment';
import {
    get8thDropdown,
    get2ndDropdown,
    get3rdDropdown,
    clear8thDropDown
} from 'redux/actions/manage/manageFieldsAction';
import { useDispatch, useSelector } from 'react-redux';

const useForm = (initModel, submitCallback, rowData, setRowData, setNextClick, userInfo) => {
    const { collectionData } = useSelector((state) => state.getCollectionDropdown);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState(initModel);
    useEffect(() => {
        setInputs(initModel);
    }, [initModel]);
    const handleChange = (e) => {
        setNextClick(false);
        if (e?.target?.name === 'authorityId') {
            let filters = [{ key: 'authorityId._id', value: e.target.value }];
            dispatch(get3rdDropdown('clients', JSON.stringify(filters)));
            // dispatch(clear8thDropDown());
        }
        if (e?.target?.name === 'clientId') {
            let filters = [{ key: 'clientId._id', value: e.target.value }];
            dispatch(get8thDropdown('locations', JSON.stringify(filters)));
        }
        if (e?.target?.name === 'collectionName') {
            let filterName = collectionData?.data.filter((item, i) => i === e.target.value);
            let filters = [{ key: 'collectionName', value: filterName }];
            dispatch(get2ndDropdown('displayconfig', JSON.stringify(filters)));
        }

        inputs?.forEach((i) => {
            if (i.name === e?.target?.name) {
                i.value = i['fieldtype-code'] === 'SC-FT-006' ? (e.target.checked ? 1 : 0) : e.target.value;
                parseInput(i);
                i?.label?.includes('*') && validateInput(i);
            }
        });
        setInputs([...inputs]);
    };
    const handleChangeAutocomplete = (e, value, urlEndPoint, name) => {
        setNextClick(false);
        if (name === 'authorityId') {
            let filters = [{ key: 'authorityId._id', value: value?._id }];
            dispatch(get3rdDropdown('clients', JSON.stringify(filters)));
            // dispatch(clear8thDropDown());
        }
        if (name === 'clientId') {
            let filters = [{ key: 'clientId._id', value: value?._id }];
            dispatch(get8thDropdown('locations', JSON.stringify(filters)));
        }
        if (name === 'collectionName') {
            let filterName = collectionData?.data.filter((item, i) => i === value?._id);
            let filters = [{ key: 'collectionName', value: filterName }];
            dispatch(get2ndDropdown('displayconfig', JSON.stringify(filters)));
        }
        inputs?.forEach((i) => {
            if (i.name === name) {
                i.value = i['fieldtype-code'] === 'SC-FT-006' ? (e.target.checked ? 1 : 0) : value?._id.trimStart();
                parseInput(i);
                i?.label?.includes('*') && validateInput(i);
            }
        });
        setInputs([...inputs]);
    };
    const handleEditChange = (e) => {
        if (e?.target?.name === 'authorityId') {
            let filters = [{ key: 'authorityId._id', value: e.target.value }];
            dispatch(get3rdDropdown('clients', JSON.stringify(filters)));
            dispatch(clear8thDropDown());
        }
        if (e?.target?.name === 'clientId') {
            let filters = [{ key: 'clientId._id', value: e.target.value }];
            dispatch(get8thDropdown('locations', JSON.stringify(filters)));
        }
        if (e?.target?.name === 'collectionName') {
            let filterName = collectionData?.data.filter((item, i) => i === e.target.value);
            let filters = [{ key: 'collectionName', value: filterName }];
            dispatch(get2ndDropdown('displayconfig', JSON.stringify(filters)));
        }
        let temp = rowData;
        temp[e.target.name] = e.target.value.trimStart();
        setRowData({ ...rowData, temp });
        inputs.forEach((i) => {
            if (i.name === e.target.name) {
                i.value = i['fieldtype-code'] === 'SC-FT-006' ? (e.target.checked ? 1 : 0) : e.target.value.trimStart();
                parseInput(i);

                i?.label?.includes('*') && validateInput(i);
            }
        });
        setInputs([...inputs]);
    };
    const handleEditChangeAutocomplete = (e, value, urlEndPoint, name) => {
        if (name === 'authorityId') {
            let filters = [{ key: 'authorityId._id', value: value?._id }];
            dispatch(get3rdDropdown('clients', JSON.stringify(filters)));
            // dispatch(clear8thDropDown());
        }
        if (name === 'clientId') {
            let filters = [{ key: 'clientId._id', value: value?._id }];
            dispatch(get8thDropdown('locations', JSON.stringify(filters)));
        }
        if (name === 'collectionName') {
            let filterName = collectionData?.data.filter((item, i) => i === value?._id);
            let filters = [{ key: 'collectionName', value: filterName }];
            dispatch(get2ndDropdown('displayconfig', JSON.stringify(filters)));
        }
        let temp = rowData;
        temp[name] = value?._id.trimStart();
        setRowData({ ...rowData, temp });
        inputs.forEach((i) => {
            if (i.name === value?._id) {
                i.value = i['fieldtype-code'] === 'SC-FT-006' ? (e.target.checked ? 1 : 0) : value?._id;
                parseInput(i);

                i?.label?.includes('*') && validateInput(i);
            }
        });
        setInputs([...inputs]);
    };
    const handleDateChange = (name, date) => {
        setNextClick && setNextClick(false);
        let Date = moment.utc(date).format();
        let temp = rowData;
        temp[name] = Date;
        setRowData({ ...rowData, temp });
        inputs?.forEach((i) => {
            if (i.name === name) {
                if (i['fieldtype-code'] === 'SC-FT-005') {
                    i.value = Date;
                    parseInput(i);
                    validateInput(i);
                }
            }
        });
        setInputs([...inputs]);
    };

    const handleSubmit = (nextClick) => {
        let filtered;
        let filteredInputs;
        filtered = inputs?.filter((input) => input.label.includes('*'));
        // if (userInfo?.data?.user?.clientId) {
        //     filteredInputs = filtered?.filter((v) => v.name !== 'clientId' && v.name !== 'authorityId');
        //     console.log("if<<<<<",filtered,filteredInputs);
        // } else {
        filteredInputs = inputs?.filter((input) => input.label.includes('*'));
        // }
        filteredInputs.forEach((i) => validateInput(i));
        inputs?.some((i) => i.alert) ? setInputs([...inputs]) : submitCallback(nextClick);
    };

    const parseInput = (input) => (input.value = input.parseFun ? input.parseFun(input.value) : input.value);
    const isValidFun = (expression) => checkAtLeastLength(expression, 0);

    const validateInput = (input) => {
        let alert = null;
        input?.validatorId.forEach((v) => {
            if (v.code === 'SC-VA-001') {
                alert = !isValidFun(input.value) ? v.errorMessage : alert;
            }
            if (v.code === 'SC-VA-002') {
                alert = !checkOnlyNumberPattern(input.value) ? v.errorMessage : alert;
            }
            if (v.code === 'SC-VA-006') {
                alert = !checkEmailPattern(input.value) ? v.errorMessage : alert;
            }
            if (v.code === 'SC-VA-007') {
                alert = !checkPhonePattern(input.value) ? v.errorMessage : alert;
            }
            if (v.code === 'SC-VA-008') {
                alert = !checkIpAddressPattern(input.value) ? v.errorMessage : alert;
            }
            if (v.code === 'SC-VA-010') {
                alert = !checkIsfilled(input.value) ? v.errorMessage : alert;
            }
        });
        input.alert = alert;
    };
    const resetFormData = () => {
        inputs?.forEach((input) => {
            input.alert = '';
            if (input.name === 'gender' || input.name === 'dob' || input.name === 'accountValidity') {
                input.value = null;
            } else {
                input.value = '';
            }
        });
    };
    return [
        inputs,
        handleChange,
        handleEditChange,
        handleSubmit,
        resetFormData,
        handleDateChange,
        handleChangeAutocomplete,
        handleEditChangeAutocomplete
    ];
};

export default useForm;
