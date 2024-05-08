import WastedUnitFilterComponent from './wastedUnitFilterComponent';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';

// import filterResponseData from './filtersResponse.json';
import { useLocation } from 'react-router';
import { getApplyFilters } from '../../redux/actions/filters/globalFilterAction';

// import myConsole from 'common/myConsoleLog';

const WastedUnitFilter = (props) => {
    const cookies = new Cookies();
    const {
        screenId,
        noDragging,
        response,
        setFilterKeys,
        setFilterKeysObject,
        selectedFilters,
        remainingChips,
        enableFilter
    } = props;
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [expandedNodes, setExpandedNodes] = useState(['1']);

    const [minDateObject, setMinDateObject] = useState({});
    const [maxDateObject, setMaxDateObject] = useState({});

    const [chipData, setChipData] = useState([]);
    console.log('chip----', chipData)
    // const [searchedValue, setSearchedValue] = useState('');
    const [deviceDisplay, setDeviceDisplay] = useState({});
    // const [searchedDeviceList, setSearchedDeviceList] = useState([]);
    const [isDraging, setIsDraging] = useState(false);
    const [dateItem, setDateItem] = useState('');
    const dispatch = useDispatch();

    //keys in the table rowData

    const [rowData, setRowData] = useState({});

    const [filtersData, setFiltersData] = useState([]);

    const [datesObject, setDatesObject] = useState({});
    //responseData is for displayConfig
    const { responseData } = useSelector((state) => state.getData);

    //filterCriteria is reponse for filters to display
    let { filtersLoading, filterCriteria } = useSelector((state) => state.getFiltersCriteria);
    console.log("filter--", filterCriteria)

    let { newfiltersLoading, filtersNewData } = useSelector((state) => state.getFilter);
    console.log('fil----', filtersNewData)

    let { activityUnitfiltersLoading, activityUnitfiltersData } = useSelector((state) => state.getActivityUnitFilter);
    console.log('activityUnitfiltersData', activityUnitfiltersData);

    let { notifyUnitfiltersLoading, notifyUnitfiltersData } = useSelector((state) => state.getNotifyUnitFilter);
    console.log('notifyUnitfiltersData', notifyUnitfiltersData);

    let { wastedUnitfiltersLoading, wastedUnitfiltersData } = useSelector((state) => state.getWastedUnitFilter);
    console.log('wastedUnitfiltersData', wastedUnitfiltersData);


    //range is to store range type objects from filtersResponse
    const range = {};

    //dateObjects is to store date type objects from filtersResponse
    // const dateObjects = {};

    //displayConfData is displayConfig arrar from response
    let displayConfData = responseData && responseData.displayConfigData;

    //filterLabels is an object to display labels in filters and values
    const [filterLabels, setFilterLabels] = useState({});
    // filterCriteria = filterResponseData;

    let filterCriteriaKeys = wastedUnitfiltersData && wastedUnitfiltersData?.data?.length > 0 && Object.keys(wastedUnitfiltersData?.data[0]);
    console.log('filtercriteriakeys', filterCriteriaKeys)

    //upon receiving responseData we setFilterLabels

    const [chipNameAndId, setChipNameAndId] = useState({});

    const [switchFilter, setSwitchFilter] = useState({});
    const [switchItem, setSwitchItem] = useState('');

    const location = useLocation();

    useEffect(() => {
        if (
            wastedUnitfiltersData &&
            wastedUnitfiltersData?.data &&
            wastedUnitfiltersData?.data?.length > 0 &&
            responseData &&
            responseData?.displayConfigData
        ) {
            let tempFilterKeys = Object.keys(wastedUnitfiltersData?.data[0]);

            let tempDatesObject = {};
            let tempSwitchObject = {};
            let tempRowData = {};
            console.log('filtercriterrrrrr', wastedUnitfiltersData)
            tempFilterKeys.forEach((item) => {
                //console.log('tempkeysitems', item, wastedUnitfiltersData && wastedUnitfiltersData?.data[0][item][0]?.type)
                if (wastedUnitfiltersData &&
                    wastedUnitfiltersData.data &&
                    wastedUnitfiltersData.data[0] &&
                    wastedUnitfiltersData.data[0][item] &&
                    wastedUnitfiltersData.data[0][item][0] &&
                    wastedUnitfiltersData.data[0][item][0].type === 'date' &&
                    item === 'createdAt' || item === 'expiryDateAndTime') {
                    let dateItemLabel = displayConfData && displayConfData.find((a) => a.dbProperty === item);
                    console.log('dateitemllabel', dateItemLabel)

                    let dateLabel = dateItemLabel?.label;
                    let dateItem = {
                        label: dateLabel,
                        name: item,
                        startDate: moment(new Date(wastedUnitfiltersData?.data[0][item][0].min)).format('YYYY-MM-DD'),
                        endDate: moment(new Date(wastedUnitfiltersData?.data[0][item][0].max)).format('YYYY-MM-DD'),
                        minDate: moment(new Date(wastedUnitfiltersData?.data[0][item][0].min)).format('YYYY-MM-DD'),
                        maxDate: moment(new Date(wastedUnitfiltersData?.data[0][item][0].max)).format('YYYY-MM-DD')
                    };
                    console.log('dateitem---', dateItem)
                    tempDatesObject[item] = dateItem;

                }
                if (wastedUnitfiltersData?.length > 0 && wastedUnitfiltersData?.data[0][item][0]?.type === 'switch') {
                    let switchItemLable = displayConfData && displayConfData.find((a) => a.dbProperty === item);
                    let switchItem = {
                        label: switchItemLable?.label,
                        name: item,
                        value: 'no'
                    };
                    tempSwitchObject[item] = switchItem;
                }
                tempRowData[item] = '';
            });
            console.log('tempDatesObject', tempDatesObject)
            setRowData(tempRowData);
            if (chipData.length === 0) {
                setSwitchFilter({ ...tempSwitchObject });
                setDatesObject({ ...tempDatesObject });
            }
        }

        if (remainingChips !== undefined) {
            setChipData([...remainingChips]);
            setFiltersData([...selectedFilters]);
            console.log('selectedfilters', selectedFilters)
        }
    }, [wastedUnitfiltersData, responseData]);
    useEffect(() => {
        if (props.deletedChip && props.refresh) {
            handleChangeChipData();
        }
    }, [props.refresh]);
    // console.log('hellooochauicyiscyscj');
    const handleChangeChipData = () => {
        let value = [];
        //Checkbox will come here to reset
        let chipToDelete = props.deletedChip;
        chipData.forEach((chip) => {
            if (chip !== props.deletedChip) {
                value.push(chip);
            }
        });
        let tempFilterKeys = {};
        if (chipToDelete in chipNameAndId) {
            let chipId = chipNameAndId[chipToDelete];
            filtersData?.forEach((chip) => {
                console.log('-----chip---------')
                if (chip && chip.value && chip.value.length > 0 && chip?.value?.includes(chipId)) {
                    let chipValue = chip?.value?.filter((item) => item !== chipId);
                    if (chipValue.length >= 1) {
                        // console.log(chipValue, 'chipValue');
                        tempFilterKeys[chip.key] = { key: chip.key, value: chipValue };
                    }
                } else if (typeof chip === 'object') {
                    tempFilterKeys[chip.key] = chip;
                }
            });
            // let tempFilterObjects = showFilters.filter((item) => typeof item === 'object');
            setFiltersData([...Object.values(tempFilterKeys)]);
        } else {
            let filterKeysObjects = filterCriteriaKeys
                ?.filter((item) => typeof item === 'object')
                ?.filter((nextItem) => chipToDelete?.includes(nextItem.label))[0]?.name;
            // let toBeDeletedFilter = typeof chipToDelete !== 'number' ? chipToDelete.split(' ')[0] : chipToDelete;

            let tempFilterKeys = [...filtersData];
            let deleteIndex = tempFilterKeys?.filter((item) => item.key !== filterKeysObjects);

            setFiltersData([...deleteIndex]);
        }
        if (value.length === 0) {
            setFiltersData([]);
        }
        setChipData(value);
    };

    useEffect(() => {
        let tempFilterLabels = {};
        if (displayConfData) {
            displayConfData.forEach((item) => {
                console.log('item', item)
                if (item?.dbProperty?.includes('[0].')) {
                    tempFilterLabels[item.dbProperty.replace('[0].', '-')] = {
                        keyName: item.dbProperty.split('.')[1],
                        label: item.label
                    };
                } else {
                    tempFilterLabels[item.dbProperty] = {
                        keyName: item.dbProperty,
                        label: item.label
                    };
                }
            });
        }
        if (location.pathname === '/dashboard/reports/expiry') {
            tempFilterLabels['Expiry'] = {
                keyName: 'expiry',
                label: 'Expiry'
            };
        }
        setFilterLabels({ ...tempFilterLabels });
        console.log('filterlabels', tempFilterLabels)
    }, [responseData]);
    console.log("display==", displayConfData)


    filterCriteriaKeys =
        filterCriteriaKeys &&
        filterCriteriaKeys.map((item) => {
            if (wastedUnitfiltersData.length > 0 && wastedUnitfiltersData?.data[0][item][0]?.type === 'range') {
                let rangeItemLabel = displayConfData && displayConfData.find((a) => a.dbProperty === item);
                let rangeLabel = rangeItemLabel?.label;
                range[item] = [wastedUnitfiltersData.data[0][item][0].min, wastedUnitfiltersData.data[0][item][0].max];
                let rangeItem = {
                    name: item,
                    label: rangeLabel,
                    ...wastedUnitfiltersData.data[0][item][0]
                };
                return rangeItem;
            }
            if (wastedUnitfiltersData.length > 0 && wastedUnitfiltersData.data[0][item][0]?.type === 'date') {
                let dateItemLabel = displayConfData && displayConfData.find((a) => a.dbProperty === item);
                let dateLabel = dateItemLabel?.label;
                let rangeItem = {
                    label: dateLabel,
                    name: item,
                    ...wastedUnitfiltersData.data[0][item][0]
                };
                return rangeItem;
            }
            if (wastedUnitfiltersData.length > 0 && wastedUnitfiltersData.data[0][item][0]?.type === 'switch') {
                let switchItemLable = displayConfData && displayConfData.find((a) => a.dbProperty === item);
                let switchItem = {
                    label: switchItemLable?.label,
                    name: item,
                    type: 'switch'
                };
                return switchItem;
            }
            return item;
        });

    let filterCriteriaValues =
        wastedUnitfiltersData && wastedUnitfiltersData.data
            ? {
                ...wastedUnitfiltersData.data[0]
            }
            : {};

    let filterCriteriaFiveValues = {};

    let allFilterValues = {};

    wastedUnitfiltersData &&
        wastedUnitfiltersData.data &&
        filterCriteriaKeys &&
        filterCriteriaKeys.forEach((i) => {
            if (typeof i === 'string') {
                if (i === 'bloodgroupId-name') {
                    allFilterValues[i] = [];
                    filterCriteriaValues[i].forEach((item) => {
                        if (item && item.name === 'A Positive') {
                            allFilterValues[i][0] = { id: item?._id, ...item };
                        }
                        if (item && item.name === 'A Negative') {
                            allFilterValues[i][1] = { id: item?._id, ...item };
                        }
                        if (item && item.name === 'B Positive') {
                            allFilterValues[i][2] = { id: item?._id, ...item };
                        }
                        if (item && item.name === 'B Negative') {
                            allFilterValues[i][3] = { id: item?._id, ...item };
                        }
                        if (item && item.name === 'AB Positive') {
                            allFilterValues[i][4] = { id: item?._id, ...item };
                        }
                        if (item && item.name === 'AB Negative') {
                            allFilterValues[i][5] = { id: item?._id, ...item };
                        }
                        if (item && item.name === 'O Positive') {
                            allFilterValues[i][6] = { id: item?._id, ...item };
                        }
                        if (item && item.name === 'O Negative') {
                            allFilterValues[i][7] = { id: item?._id, ...item };
                        }
                        if (item && item.name === 'Oh Positive') {
                            allFilterValues[i][8] = { id: item?._id, ...item };
                        }
                        if (item && item.name === 'Oh Negative') {
                            allFilterValues[i][9] = { id: item?._id, ...item };
                        }
                    });
                } else {
                    allFilterValues[i] = [...new Set(filterCriteriaValues[i])]
                        .map((item) => {
                            return { id: item?._id, ...item };
                        })
                        .sort((a, b) => {
                            if (a && a.name && b && b.name) {
                                let fa = a.name?.toLowerCase(),
                                    fb = b.name?.toLowerCase();

                                if (fa < fb) {
                                    return -1;
                                }
                                if (fa > fb) {
                                    return 1;
                                }
                            }
                            return 0;
                        });
                }
            }

            // .filter((elm, index) => filterCriteriaValues[i].findIndex((obj) => obj._id === elm._id) === index);
        });
    if (
        location.pathname === '/dashboard/reports/expiry' &&
        filterCriteriaKeys &&
        !filterCriteriaKeys?.includes('Expiry')
    ) {
        filterCriteriaKeys.push({
            type: 'Expiry',
            name: 'Expiry',
            filters: [
                { key: 'expired', value: 'Expired' },
                { key: 'toBeExpired', value: 'To Be Expired (min 48 Hrs)' }
            ]
        });
    }

    useEffect(() => {
        if (chipData.length > 0) {
            if (dateItem && dateItem.length > 1) {
                let findDate = chipData?.filter((item) => item.includes(dateItem))[0];
                if (findDate) {
                    handleChipChanges('dateType');
                    setDateItem('');
                }
            } else if (currentItem && currentItem.length > 1) {
                let findItem = chipData?.filter((item) => item.includes(currentItem))[0];
                if (findItem) {
                    handleChipChanges('rangeType');
                    setCurrentItem('');
                }
            } else if (switchItem && switchItem.length > 1) {
                let switchLable = filterCriteriaKeys?.filter((item) => item?.name === switchItem)[0];
                let findItem = chipData?.filter((item) => item.includes(switchLable?.label))[0];
                if (findItem) {
                    handleChipChanges('switchType');
                    setSwitchItem('');
                }
            }
        }
        if (chipData?.length === 0) {
            if (props.setFilterKeys) {
                setFilterKeys('');
            }
        }
    }, [chipData]);

    const handleSearchChange = (e, key) => {
        let temp = { ...rowData };
        temp[key] = e.target.value;
        setRowData({ ...temp });
    };

    const handleSearchDelte = (key) => {
        let temp = rowData;
        temp[key] = '';
        setRowData({ ...temp });
    };

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDeviceDisplay({});
        enableFilter && setDrawerOpen(open);
    };

    function filterSubmit() {
        //When filter data is sumbmit
        let tempExp = expandedNodes;
        // setChipData;

        setExpandedNodes(tempExp);
        // onFilterSubmit(filterArr, selectedFilter);
        setDrawerOpen(false);
        console.log('chipdataaa', chipData, filtersData, chipNameAndId)
        if (filtersData.length > 0 && props.handleFilters && chipData.length > 0) {
            props.handleFilters(filtersData);

            if (props.setChipIdAndName) {
                props.setChipIdAndName(chipNameAndId);
            }
        }
        let filterKeysObjects = filterCriteriaKeys.filter((item) => typeof item === 'string');
        console.log("filterskeyobject", filterKeysObjects, filterCriteriaKeys)
        setFilterKeysObject(filterKeysObjects);
        let newFiltersObject = { chipNameAndId, chipData, filtersData, filterKeysObjects };
        // console.log(newFiltersObject, 'newFiltersObject');
        dispatch(getApplyFilters(newFiltersObject));

        setRowData({});
    }
    function resetFilter() {
        if (props.handleResetFilters) {
            props.handleResetFilters();
        }
        //on reset it will enpty the chipData
        setChipData([]);
        setFiltersData([]);
        //below process will reset date (current date) and weight (min and max weight)
        setDrawerOpen(false);

        if (props.setFilterKeys) {
            setFilterKeys('');
        }
    }

    const handleChipDelete = (chipToDelete) => () => {
        let value = [];
        //Checkbox will come here to reset
        chipData.forEach((chip) => {
            if (chip !== chipToDelete) {
                value.push(chip);
            }
        });

        let tempFilterKeys = {};
        if (chipToDelete in chipNameAndId === true) {
            let chipId = chipNameAndId[chipToDelete];
            filtersData?.forEach((chip) => {
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
            setFiltersData([...Object.values(tempFilterKeys)]);
            // setShowFilters([...tempFilterKeys]);
        } else {
            let filterKeysObjects = filterCriteriaKeys
                .filter((item) => typeof item === 'object')
                .filter((nextItem) => chipToDelete.includes(nextItem.label))[0]?.name;
            // let toBeDeletedFilter = typeof chipToDelete !== 'number' ? chipToDelete.split(' ')[0] : chipToDelete;

            let tempFilterKeys = [...filtersData];
            let deleteIndex = tempFilterKeys.filter((item) => item.key !== filterKeysObjects);

            setFiltersData([...deleteIndex]);
        }

        setChipData(value);
    };

    const handleChipChanges = (event, filterName) => {
        // when any of data is added or remove from the filter. It is comming over here
        //and it push or remove data from chipData
        // let value = event?.nativeEvent?.path[3].childNodes[0]?.childNodes[0]?.childNodes[0]?.name;
        if (filterName === 'Expiry') {
            let chipName = Object.values(event.target)[1].name;
            if (chipData.includes(chipName)) {
                let tempChipData = chipData.filter((item) => item !== chipName);
                setChipData([...tempChipData]);
            } else {
                let tempChipData = [...chipData, chipName];
                setChipData([...tempChipData]);
            }
        } else {
            if (event === 'switchType') {
                if (switchItem) {
                    let switchLable = filterCriteriaKeys.filter((item) => item?.name === switchItem)[0];
                    let findSwitch = chipData.filter((item) => item.includes(switchLable.label))[0].split(': ')[1];
                    let tempFiltersDate = [
                        ...filtersData.filter((item) => item.key !== switchItem),
                        { key: switchItem, value: findSwitch === 'Yes' ? 1 : 0 }
                    ];
                    setFiltersData([...tempFiltersDate]);
                }
            } else if (event === 'dateType') {
                console.log('datename', dateItem)
                if (dateItem === 'Activity At') { 
                    let dateName = filterCriteriaKeys.filter((item) => item?.label === dateItem)[0];
                    
                    let findDate = chipData
                        .filter((item) => item.includes(dateItem))[0]
                        .split(' ')
                        .filter((item) => {
                            let dateType = moment(new Date(item)).format('YYYY-MM-DD');
                            if (dateType !== 'Invalid date') {
                                return dateType;
                            }
                        });
                    let tempFiltersDate = [
                        ...filtersData.filter((item) => item.key !== dateName?.name),
                        { key:'createdAt', value: [findDate[0], findDate[1]] }
                    ];
                    setFiltersData([...tempFiltersDate]);
                }
                else if (dateItem === 'Expiry Date') {
                    let dateName = filterCriteriaKeys.filter((item) => item?.label === dateItem)[0];
                    let findDate = chipData
                        .filter((item) => item.includes(dateItem))[0]
                        .split(' ')
                        .filter((item) => {
                            let dateType = moment(new Date(item)).format('YYYY-MM-DD');
                            if (dateType !== 'Invalid date') {
                                return dateType;
                            }
                        });

                    let tempFiltersDate = [
                        ...filtersData.filter((item) => item.key !== dateName?.name),
                        { key: 'expiryDateAndTime', value: [findDate[0], findDate[1]] }
                    ];
                    setFiltersData([...tempFiltersDate]);
                }
            } else if (event === 'rangeType') {
                if (currentItem) {
                    let findItem = chipData
                        ?.filter((item) => item.includes(currentItem))[0]
                        ?.split(' ')
                        ?.filter((item) => {
                            if (parseInt(item) === 0) {
                                return item;
                            } else if (!Number.isNaN(parseInt(item))) {
                                return parseInt(item);
                            }
                        });
                    // console.log(findItem, chipData, 'findItem');
                    let rangeLable = filterCriteriaKeys?.filter((item) => item?.label === currentItem)[0];
                    let tempFiltersDate = [
                        ...filtersData.filter((item) => item.key !== rangeLable?.name),
                        { key: rangeLable?.name, value: [parseInt(findItem[0]), parseInt(findItem[1])] }
                    ];
                    setFiltersData([...tempFiltersDate]);
                }
            } else {
                let chipName = Object.values(event.target)[1]?.name ? Object.values(event.target)[1]?.name : event;

                let value = allFilterValues[filterName]?.filter((item) => {
                    return item[`${filterLabels[filterName].keyName}`] === chipName;
                })[0];

                let isChecked = event.target.checked;
                let firtHalfKey = filterName?.split('-')[0];
                if (isChecked) {
                    setChipData([...chipData?.filter((item) => item !== chipName), chipName]);
                    let tempChipIdAndName = { ...chipNameAndId };
                    tempChipIdAndName[chipName] = value.id;
                    setChipNameAndId(tempChipIdAndName);
                    if (filtersData?.findIndex((item) => item.key === `${firtHalfKey}._id`) === -1) {
                        let tempFiltersDate = [...filtersData, { key: `${firtHalfKey}._id`, value: [value.id] }];
                        setFiltersData([...tempFiltersDate]);
                    } else {
                        let chipIndex = filtersData?.findIndex((item) => item.key === `${firtHalfKey}._id`);
                        let newChipData = [...filtersData];

                        if (typeof filtersData[chipIndex].value === 'string') {
                            newChipData?.splice(chipIndex, 1, {
                                key: `${firtHalfKey}._id`,
                                value: [filtersData[chipIndex].value, value.id]
                            });
                        } else {
                            newChipData?.splice(chipIndex, 1, {
                                key: `${firtHalfKey}._id`,
                                value: [...filtersData[chipIndex]?.value, value.id]
                            });
                        }
                        setFiltersData([...newChipData]);
                    }
                } else {
                    let tempChipIdAndName = { ...chipNameAndId };
                    delete tempChipIdAndName[chipName];
                    setChipNameAndId(tempChipIdAndName);
                    let unCheckedChipData = chipData?.filter((chip) => chip !== chipName);
                    setChipData([...unCheckedChipData]);
                    if (chipData.length > 0) {
                        let chipIndex = filtersData?.findIndex((item) => item.key === `${firtHalfKey}._id`);
                        let newChipData = [...filtersData];
                        if (typeof filtersData[chipIndex]?.value === 'string') {
                            newChipData.splice(chipIndex, 1);
                        } else {
                            newChipData?.splice(chipIndex, 1, {
                                key: `${firtHalfKey}._id`,
                                value: [...filtersData[chipIndex]?.value.filter((chip) => chip !== value.id)]
                            });
                        }
                        setFiltersData([...newChipData]);
                    }
                }
            }
        }
    };

    // function dragElement(elmnt) {
    //     //let top = elmnt.nativeEvent.toElement.style.top;

    //     let top = elmnt.nativeEvent.target.style.top;
    //     // save position of filter for check drag element is moved or clicked
    //     let left = elmnt.nativeEvent.target.style.left;
    //     //let left = elmnt.nativeEvent.toElement.style.left;

    //     setIsDraging(true);
    //     var pos1 = 0,
    //         pos2 = 0,
    //         pos3 = 0,
    //         pos4 = 0;
    //     setDrawerOpen(false);
    //     /* otherwise, move the DIV from anywhere inside the DIV:*/
    //     elmnt.onmousedown = dragMouseDown();

    //     function dragMouseDown(e) {
    //         e = e || window.event;

    //         e.preventDefault();
    //         // get the mouse cursor position at startup:
    //         pos3 = e.clientX;
    //         pos4 = e.clientY;
    //         document.onmouseup = closeDragElement;

    //         // call a function whenever the cursor moves:
    //         document.onmousemove = elementDrag;
    //     }

    //     function elementDrag(e) {
    //         e = e || window.event;
    //         e.preventDefault();

    //         // calculate the new cursor position:
    //         pos1 = pos3 - e.clientX;
    //         pos2 = pos4 - e.clientY;
    //         pos3 = e.clientX;
    //         pos4 = e.clientY;
    //         setDrawerOpen(false);
    //         // set the element's new position:
    //         elmnt.nativeEvent.target.style.top = elmnt.nativeEvent.target.offsetTop - pos2 + 'px';
    //         elmnt.nativeEvent.target.style.left = elmnt.nativeEvent.target.offsetLeft - pos1 + 'px';
    //         cookies.set('FilterPosition', {
    //             top: elmnt.nativeEvent.target.style.top,
    //             left: elmnt.nativeEvent.target.style.left
    //         });
    //     }

    //     function closeDragElement() {
    //         /* stop moving when mouse button is released:*/
    //         document.onmouseup = null;
    //         document.onmousemove = null;
    //         //If is drag then it will not open drawer for that we are checking it is drag or moved

    //         if (elmnt.nativeEvent.target.style.top === top || elmnt.nativeEvent.target.style.left === left) {
    //             setIsDraging(false);
    //         } else {
    //             setIsDraging(true);
    //         }

    //         //nativeEvent.toElemnt is not working in fireFox
    //         // if (elmnt.nativeEvent.toElement.style.top === top || elmnt.nativeEvent.toElement.style.left === left) {
    //     }
    // }

    //on each response change to make filters refresh its chip and data and filter labels

    useEffect(() => {
        // setRowData({});
        if (remainingChips === undefined) {
            setChipData([]);
            setFiltersData([]);
        }
    }, [wastedUnitfiltersData]);

    const [value, setValue] = useState([]);

    const [currentItem, setCurrentItem] = useState('');

    const handleRangeInput = (e, position, range) => {
        // console.log(e, position, range, 'range filters');
        setCurrentItem(e.target.name);
        let tempValue = { ...value };
        if (position === 'start' && tempValue) {
            tempValue[e.target.name][0] =
                e.target.value > 0 && e.target.value < tempValue[e.target.name][1]
                    ? parseInt(e.target.value, 10)
                    : e.target.value > tempValue[e.target.name]?.[1]
                        ? tempValue[e.target.name]?.[1] > 1
                            ? tempValue[e.target.name]?.[1] - 1
                            : 0
                        : 0;
            // setChipData([...tempChipData, `${currentItem} ${value[currentItem][0]} to ${value[currentItem][1]}`]);
        }
        if (position === 'end' && tempValue) {
            tempValue[e.target.name][1] =
                e.target.value > 0 && e.target.value <= range ? parseInt(e.target.value, 10) : 0;
        }
        setValue(tempValue);
        let tempRange = { ...range };
        tempRange[e.target.name] = value;
        let tempChipData = chipData.map((item) => {
            if (!item.includes(currentItem)) {
                return item;
            } else {
                return null;
            }
        });
        tempChipData = tempChipData.filter((item) => item !== null && !item.includes('undefined'));
        if (e.target.name && tempValue[e.target.name]?.[1] > tempValue[e.target.name][0]) {
            setChipData([
                ...tempChipData,
                `${e.target.name} ${tempValue[e.target.name]?.[0]} to ${tempValue[e.target.name]?.[1]}`
            ]);
        }
    };

    const handleRangeChange = (event, newValue) => {
        // console.log(value, 'range input');
        let tempValues = { ...value };

        tempValues[currentItem] = newValue;

        setValue(tempValues);
    };

    // for range slider after selecting onMouseUp this function will get called
    // const [rangeObject, setRangeObject] = useState('');

    const handleRangeComitted = (rangeName) => {
        let tempRange = { ...range };
        tempRange[rangeName] = value;
        let tempChipData = chipData.map((item) => {
            if (!item.includes(currentItem)) {
                return item;
            } else {
                return null;
            }
        });
        tempChipData = tempChipData.filter((item) => item !== null && !item.includes('undefined'));
        if (
            value &&
            value[currentItem] &&
            value[currentItem][0] !== 'undefined' &&
            currentItem &&
            value[currentItem][1] > value[currentItem][0]
        ) {
            setChipData([...tempChipData, `${currentItem} ${value[currentItem][0]} to ${value[currentItem][1]}`]);
        }
    };

    const handleEndDateChange = (date, itemName, minDate, label) => {
        setDateItem(label);
        let endDate = moment(date).format('YYYY-MM-DD');
        let tempDates = { ...datesObject };
        tempDates[itemName] = { ...datesObject[itemName], endDate };
        setDatesObject(tempDates);
        let chipArray = [];

        //Date shoud be valid, greater then the start date, and should not greater then current date
        if (endDate !== 'Invalid date') {
            if (chipData.includes(`${label} ${minDateObject[itemName]} to ${maxDateObject[itemName]}`)) {
                // In chipData if date is there it will remove old and then add new one
                chipData.forEach((chip) => {
                    if (chip !== `${label} ${minDateObject[itemName]} to ${maxDateObject[itemName]}`) {
                        chipArray.push(chip);
                    }
                });
                setChipData([...chipArray, `${label} ${minDateObject[itemName]} to ${endDate}`]);
            } else {
                //     //If in chipData date is not there it will directly pushed to chipData array
                // } else {
                setChipData([...chipData, `${label} ${minDate} to ${endDate}`]);
            }
            let tempMaxDate = { ...maxDateObject };
            tempMaxDate[itemName] = endDate;
            setMaxDateObject({ ...tempMaxDate });
        }
    };

    const handleStartDateChange = (date, itemName, maxDate, label) => {
        console.log('startdate--', date, itemName, maxDate, label)
        setDateItem(label);
        let startDate = moment(date).format('YYYY-MM-DD');
        let tempDates = { ...datesObject };
        tempDates[itemName] = { ...datesObject[itemName], startDate };
        setDatesObject(tempDates);

        let chipArray = [];
        // Date should be valid and greater then maxDate
        if (startDate !== 'Invalid date') {
            // In chipData If date is there then it will remove and then add new one
            if (chipData.includes(`${label} ${minDateObject[itemName]} to ${maxDateObject[itemName]}`)) {
                chipData.forEach((chip) => {
                    if (chip !== `${label} ${minDateObject[itemName]} to ${maxDateObject[itemName]}`) {
                        chipArray.push(chip);
                    }
                });
                setChipData([...chipArray, `${label} ${startDate} to ${maxDateObject[itemName]}`]);
            } else {
                setChipData([...chipData, `${label} ${startDate} to ${maxDate}`]);

                let tempMaxDate = { ...maxDateObject };
                tempMaxDate[itemName] = maxDate;
                setMaxDateObject({ ...tempMaxDate });
            }
            let tempMinDate = { ...minDateObject };
            tempMinDate[itemName] = startDate;
            setMinDateObject({ ...tempMinDate });
        }
    };

    const handleCheckBoxLimit = (item, type) => {
        if (type === 'plus') {
            let tempDeviceDisplay = {};
            tempDeviceDisplay[item] = deviceDisplay[item] ? deviceDisplay[item] + 5 : 10;
            setDeviceDisplay({ ...tempDeviceDisplay });
        }
        if (type === 'minus') {
            let tempDeviceDisplay = {};
            tempDeviceDisplay[item] = 5;
            setDeviceDisplay({ ...tempDeviceDisplay });
        }

        //type is for showLess
    };

    const handleSwitchChange = (e, feild) => {
        let tempFactData = { ...switchFilter };
        tempFactData[feild] = e.target.checked
            ? { ...tempFactData[feild], value: 'Yes' }
            : { ...tempFactData[feild], value: 'No' };
        let switchLable = filterCriteriaKeys.filter((item) => item?.name === feild)[0];
        let tempChipData = chipData.map((item) => {
            if (!item.includes(switchLable.label)) {
                return item;
            } else {
                return null;
            }
        });
        tempChipData = tempChipData.filter((item) => item !== null && !item.includes('undefined'));
        if (tempFactData[feild]) {
            setChipData([...tempChipData, `${switchLable.label} : ${tempFactData[feild].value}`]);
        }
        setSwitchFilter({ ...tempFactData });
    };

    return (
        <WastedUnitFilterComponent
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
            expandedNodes={expandedNodes}
            filterSubmit={filterSubmit}
            resetFilter={resetFilter}
            screenId={screenId}
            handleChipDelete={handleChipDelete}
            handleChipChanges={handleChipChanges}
            chipData={chipData}
            // dragElement={noDragging ? null : dragElement}
            isDraging={isDraging}
            setIsDraging={setIsDraging}
            showFilters={filterCriteriaKeys}
            filtersObject={filterCriteriaFiveValues}
            allFilterValues={allFilterValues}
            handleSearchChange={handleSearchChange}
            rowData={rowData}
            handleSearchDelte={handleSearchDelte}
            setChipData={setChipData}
            range={range}
            handleRangeComitted={handleRangeComitted}
            value={value}
            handleRangeChange={handleRangeChange}
            setCurrentItem={setCurrentItem}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            dateObjects={datesObject}
            // dates={datesDynamicObject}
            handleRangeInput={handleRangeInput}
            setDeviceDisplay={setDeviceDisplay}
            deviceDisplay={deviceDisplay}
            handleCheckBoxLimit={handleCheckBoxLimit}
            filterLabels={filterLabels}
            switchFilter={switchFilter}
            handleSwitchChange={handleSwitchChange}
            setSwitchItem={setSwitchItem}
            filtersLoading={wastedUnitfiltersLoading}
            enableFilter={enableFilter}
        />
    );
};

export default WastedUnitFilter;
