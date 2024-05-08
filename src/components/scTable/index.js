import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import { SortableContainer } from 'react-sortable-hoc';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createStyles, withStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Redirect } from 'react-router-dom';
// import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
//import VerifiedIcon from '@material-ui/icons-material/Verified';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import moment, { relativeTimeRounding } from 'moment';
import { checkTextSum } from '../add-unit/add-unit-form/unitIdService';
import specialTestingCheck from '../add-unit/add-unit-form/specialTestingService';
import CheckBoxTable from './scCheckBox';
import { MainSortableCell } from './scMainHeader';
import Loader from '../loader/loaderNew.container';
import Fade from '@material-ui/core/Fade';
import CustomTableCell from './scTableCell';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, Typography, Badge, Grid } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CustomButton from 'components/button';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { putDisplayConfigData, activeDeactiveAction } from 'redux/actions/manage/manageFieldsAction';
import keyFine from 'common/services/keyFineMethod';
import FlareIcon from '@material-ui/icons/Flare';
import { CancelOutlined } from '@material-ui/icons';

const SortableHead = SortableContainer(({ children }) => {
    return (
        <TableHead>
            <TableRow
                style={{
                    position: 'sticky',
                    top: 0,
                    whiteSpace: 'nowrap',
                    height: 5,
                    backgroundColor: '#f2f2f2',
                    zIndex: 10
                }}
            >
                {children}
            </TableRow>
        </TableHead>
    );
});

const StyledTableRow = withStyles((theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.secondary.main
            }
        }
    })
)(TableRow);

// const keyFine = keyFine();

const StyledTPagination = withStyles((theme) =>
    createStyles({
        root: {
            '& .MuiTablePagination-spacer': {
                display: 'none'
            },
            '& p:nth-last-child(2)': {
                marginLeft: 'auto'
            },
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.background.default,
            '& p:nth-child(2)': {
                marginLeft: '-15px'
            }
        }
    })
)(TablePagination);
const styles = (theme) => ({
    myCustomClass: {
        color: theme.palette.colors.dark
    }
});

const checkBoxItem = {
    label: 'checkbox',
    align: 'left',
    dbProperty: '#'
};

const actionsItem = {
    label: 'Actions',
    align: 'center  ',
    dbProperty: '@'
};

//const handleNext = () => {
//    const newActiveStep =
//        isLastStep() && !allStepsCompleted()
//            ? steps.findIndex((step, i) => !(i in completed))
//            : activeStep + 1;

//    setActiveStep(newActiveStep);

//    if (newActiveStep === 1) {
//        history.push('/your-next-page');
//    }
//};

const StickyTableCell = withStyles((theme) => ({
    head: {
        color: theme.palette.primary,
        left: 0,
        position: 'sticky',
        zIndex: 10000,
        padding: 0,
        margin: 0,
        paddingRight: 20,
        marginRight: 20
    },
    body: {
        backgroundColor: 'white',
        minWidth: '50px',
        left: 0,
        position: 'sticky',
        zIndex: 1,
        padding: 0,
        margin: 0,
        paddingRight: 20,
        marginRight: 20
    }
}))(TableCell);

const StickyTableActions = withStyles((theme) => ({
    head: {
        color: theme.palette.primary.main,
        right: 0,
        position: 'sticky',
        zIndex: 10000,
        padding: 0,
        margin: 0,
        paddingLeft: 20,
        marginLeft: 20
    },
    body: {
        backgroundColor: 'white',
        minWidth: '50px',
        right: 0,
        position: 'sticky',
        zIndex: 0,
        padding: 0,
        margin: 0,
        paddingLeft: 20,
        marginLeft: 20
    }
}))(TableCell);

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsPerPage: this.props.rowsPerPage || 10,
            page: 0,
            rows: [],
            initialFormData: [],
            columns: [],
            windowDimensions: this.props.windowDimensions,
            order: [],
            check: false,
            setAll: false,
            selectedPages: [],
            dialogOpen: false,
            isDefault: false
        };
    }
    
    handleChangePage = (event, newPage) => {
        this.state.rows.map((row) => (row['check'] = false));
        this.setState({ setAll: false });
        this.setState({ page: newPage });
        if (this.props.tableHandleChange) {
            this.props.tableHandleChange(newPage, true);
        }
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: parseInt(event.target.value), page: 0 });
        if (this.props.tableHandleChange) {
            this.props.tableHandleChange(parseInt(event.target.value), false);
        }
        this.displayLoading();
    };

    filterData = () => {
        this.setState({ rows: this.props.response?.data }, () => {
            if (this.props.selectedSearch) {
                if (typeof this.props.selectedSearch === 'string') {
                    const filterRow = this.state.rows.filter((row) => {
                        const valuesOfRow = Object.values(row);
                        let hasNestedObjects = valuesOfRow.map((item) => {
                            if (typeof item === 'object') {
                                return Object.values(item);
                            } else {
                                return item;
                            }
                        });
                        const allValuesInRow = hasNestedObjects.flat();
                        return allValuesInRow
                            .toString()
                            .toLowerCase()
                            .includes(this.props.selectedSearch.toLowerCase());
                    });
                    this.setState({ rows: filterRow });
                    if (this.props.setResultsCount) {
                        this.props.setResultsCount(filterRow.length);
                    }
                } else {
                    let mainFilterRow = this.state.rows;
                    const multipleSearch = (searchString, dateType, index) => {
                        mainFilterRow = mainFilterRow.filter((row) => {
                            if (typeof dateType === 'string') {
                                if (index === 0) {
                                    return new Date(row[dateType]).getTime() > new Date(searchString).getTime();
                                } else if (index === 1) {
                                    return new Date(row[dateType]).getTime() < new Date(searchString).getTime();
                                }
                            } else {
                                const valuesOfRow = Object.values(row);

                                let hasNestedObjects = valuesOfRow.map((item) => {
                                    if (typeof item === 'object') {
                                        return Object.values(item);
                                    } else {
                                        return item;
                                    }
                                });

                                let reCheck = hasNestedObjects?.flat().map((item) => {
                                    if (typeof item === 'object') {
                                        return Object.values(item);
                                    } else {
                                        return item;
                                    }
                                });

                                const allValuesInRow = reCheck?.flat();

                                return allValuesInRow.toString()?.toLowerCase().includes(searchString?.toLowerCase());
                            }
                        });

                        return mainFilterRow;
                    };
                    this.props.selectedSearch.forEach((searchString) => {
                        if (searchString.indexOf('Date') > 0) {
                            let DateArray = [searchString.split(' ')[2], searchString.split(' ')[4]];
                            let DateType =
                                searchString.split(' ')[0] === 'Collection'
                                    ? 'createdAt'
                                    : searchString.split(' ')[0] === 'Expiration'
                                    ? 'expiry'
                                    : 'collection';
                            DateArray.forEach((dates, index) => multipleSearch(dates, DateType, index));
                        } else {
                            multipleSearch(searchString);
                        }
                    });

                    this.setState({ rows: mainFilterRow });

                    if (this.props.setResultsCount) {
                        this.props.setResultsCount(mainFilterRow?.length);
                    }
                }
            } else {
                this.setState({ rows: this?.props?.response?.data });
            }
        });
    };

    // isAdded = false;
    //  let displayConfigs;
    //         if (this.props.response.displayConfig) {
    //             displayConfigs = this.props.response.displayConfig;
    //         } else {
    //             displayConfigs = this.props.response.displayConfigData?.filter((d) => d.isVisible);
    //         }
    getData() {
        const { selectedRecords, handleSelect, sort } = this.props;
        const { setAll } = this.state;
        if (this.props.response && this.props.response.data) {
            let mColumns = [];

            // mColumns = this.props.response?.displayConfigData
            //     ? this.props.response?.displayConfigData.filter((d) => d.isVisible)
            //     : undefined;

            let mOrder = [];
            if (this.props.response?.displayConfigData) {
                // if (this.props.response && this.props.response.data) {

                let sortColumn = [];
                if (this.props.response.displayConfigData) {
                    sortColumn = this.props.response?.displayConfigData.sort(
                        (a, b) => parseFloat(a.sequence) - parseFloat(b.sequence)
                    );
                    console.log('sortColumn', sortColumn);
                    mColumns = sortColumn ? sortColumn.filter((d) => d.isVisible) : undefined;
                }
            }
            console.log('mColumns', mColumns);
            if (mColumns === undefined || mColumns.length === 0) {
                mColumns = [];
                let oneRecord = this.props.response.data[0];
                for (let key in oneRecord) {
                    if (key === 'name') {
                        mColumns.push({
                            label: key.replace(/_/g, ' '), //.toUpperCase(),
                            dbProperty: key,
                            align: 'left'
                        });
                    } else if (key !== '_id' && typeof oneRecord[key] !== 'object') {
                        if (
                            key.toString() !== 'is_synced' &&
                            key.toString() !== 'isDeleted' &&
                            key.toString() !== 'isActive' &&
                            key.toString() !== 'isSynced' &&
                            key.toString() !== '__v'
                        )
                            mColumns.push({
                                label: key.replace(/_/g, ' '), //.toUpperCase(),
                                dbProperty: key,
                                align: 'left'
                            });
                    }
                }
            }
            // if (this.props.reciveUnit === true) {
            //     for (let i = 1; i <= mColumns?.length; i++) {
            //         mOrder.push(i);
            //     }
            // } else
            if (this.props.pullOutRequest === true) {
                for (let i = 0; i <= mColumns?.length; i++) {
                    mOrder.push(i);
                }
            } else if (this.props.transferUnit === true) {
                for (let i = 1; i <= mColumns?.length + 1; i++) {
                    mOrder.push(i);
                }
            } else if (this.props?.preEncoded === true) {
                for (let i = 0; i <= mColumns?.length; i++) {
                    mOrder.push(i);
                }
            } else if (this.props.module !== 'reports' && !this.props.scView) {
                for (let i = 0; i <= mColumns?.length + 1; i++) {
                    mOrder.push(i);
                }
            } else {
                for (let i = 1; i <= mColumns?.length; i++) {
                    mOrder.push(i);
                }
            }
            if (mColumns.findIndex((i) => i.dbProperty === 'name') !== -1) {
                let nameKey = mColumns.find((i) => i.dbProperty === 'name');
                nameKey.isVoucher = true;
                nameKey.isLink = true;
                mColumns.splice(
                    mColumns.findIndex((i) => i.dbProperty === 'name'),
                    1,
                    nameKey
                );
            }
            console.log('mOrder', mOrder);
            this.setState(
                {
                    rows: this.props.response.data,
                    initialFormData: this.props.response.data,
                    columns: [this.props.module !== 'reports' && checkBoxItem, ...mColumns, actionsItem],
                    order: mOrder,
                    sort: sort
                },
                () => {
                    this.state.rows.map((row, i) => (row['check'] = false));
                }
            );
            // if (this.props.response?.displayConfig) {
            //     let object = {};
            //     let data = this.props.response?.displayConfig;
            //     data.forEach((obj, i) => (obj.sequence = i + 1));

            //     object.collectionName = 'column';
            //     object.validData = data;
            //     let json = JSON.stringify(object);
            //     this.props.dispatch(putDisplayConfigData(json));
            // }
        }
    }

    //new Ankit...
    /*getData() {
        if (this.props.response && this.props.response.data) {
            let mColumns = [];

            mColumns = this.props.response?.displayConfigData
                ? this.props.response?.displayConfigData.filter((d) => d.isVisible)
                : undefined;

            let mOrder = [];
            if (mColumns === undefined || mColumns.length === 0) {
                mColumns = [];
                let oneRecord = this.props.response.data[0];
                for (let key in oneRecord) {
                    if (key === 'name') {
                        mColumns.push({
                            label: key.replace(/_/g, ' ').toUpperCase(),
                            dbProperty: key,
                            align: 'left'
                        });
                    } else if (key !== '_id' && typeof oneRecord[key] !== 'object') {
                        if (
                            key.toString() !== 'is_synced' &&
                            key.toString() !== 'isDeleted' &&
                            key.toString() !== 'isActive' &&
                            key.toString() !== 'isSynced' &&
                            key.toString() !== '__v'
                        )
                            mColumns.push({
                                label: key.replace(/_/g, ' ').toUpperCase(),
                                dbProperty: key,
                                align: 'left'
                            });
                    }
                }
            }

            if (this.props.module !== 'reports') {
                for (let i = 0; i <= mColumns?.length + 1; i++) {
                    mOrder.push(i);
                }
            } else {
                for (let i = 1; i <= mColumns?.length; i++) {
                    mOrder.push(i);
                }
            }
            if (mColumns.findIndex((i) => i.dbProperty === 'name') !== -1) {
                let nameKey = mColumns.find((i) => i.dbProperty === 'name');
                nameKey.isVoucher = true;
                nameKey.isLink = true;
                mColumns.splice(
                    mColumns.findIndex((i) => i.dbProperty === 'name'),
                    1,
                    nameKey
                );
            }
            const defaultColumns = JSON.parse(JSON.stringify(this.props.response?.displayConfigData));
            console.log("defaultColumns",defaultColumns)
            this.setState(
                {
                    rows: this.props.response.data,
                    columns: [checkBoxItem, ...mColumns, actionsItem],
                    order: mOrder,
                    defaultColumns
                },
                () => {
                    this.state.rows.map((row, i) => (row['check'] = false));
                }
            );
        }
    }*/

    componentDidMount() {
        this.getData();
        this.filterData();
        this.setState({ profileExist: false });
        setTimeout(() => {
            this.setState({ profileExist: true });
        }, 2000);
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedSearch, response, selectedRecords, sort } = this.props;
        const { rows, columns } = this.state;

        if (prevProps.selectedSearch !== selectedSearch) {
            if (selectedSearch) {
                this.filterData();
            } else {
                this.setState({ rows: this.props.response.data });
            }
        }

        if (prevProps.response !== response) {
            this.getData();
            localStorage.setItem('tempDC', JSON.stringify(this.state.columns));
        }
        if (prevState.rows !== rows) {
            this.getData();
            localStorage.setItem('tempDC', JSON.stringify(this.state.columns));

            //  this.props.setSelectedRow(rows);
        }
        if (prevProps.selectedRecords !== selectedRecords) {
            this.getData();
            localStorage.setItem('tempDC', JSON.stringify(this.state.columns));
        }
    }

    checkValue = (val) => {
        return checkTextSum(val);
    };
    checkTestingValue = (val) => {
        return specialTestingCheck(val);
    };

    handleCheck = (e, operation, row) => {
        let newRows = [];
        const { selectedRecords, pageNum, response, selectAllRecords, setUnchecked, unchecked } = this.props;
        const { selectedPages, rows, rowsPerPage } = this.state;

        if (e?.target?.checked === true && selectAllRecords && unchecked.length > 0) {
            if (this.props?.preEncoded === true) {
                setUnchecked([...unchecked.filter((item) => item !== row?.rfidNumber)]);
                this.props.handleSelect &&
                    this.props.handleSelect(selectedRecords, selectAllRecords, row?.rfidNumber, true);
            } else {
                setUnchecked([...unchecked.filter((item) => item !== row?._id)]);
                this.props.handleSelect && this.props.handleSelect(selectedRecords, selectAllRecords, row?._id, true);
            }
        } else if (e?.target?.checked === false && unchecked?.length > 0) {
            if (this.props?.preEncoded === true) {
                setUnchecked([...unchecked, row?.rfidNumber]);
                this.props.handleSelect && this.props.handleSelect(selectedRecords, selectAllRecords, row?.rfidNumber);
            } else {
                setUnchecked([...unchecked, row?._id]);
                this.props.handleSelect && this.props.handleSelect(selectedRecords, selectAllRecords, row?._id);
            }
        } else {
            let selectedDummyRecords = JSON.parse(JSON.stringify(selectedRecords)) || [];
            let tempPages = selectedPages;
            let selectAll = selectAllRecords;
            if (operation === 'allPages') {
                if (e === true) {
                    selectAll = true;
                    this.setState({ setAll: true });
                    if (this.props?.preEncoded === true) {
                        this.state.rows.map((row, i) => {
                            !selectedDummyRecords.includes(row.rfidNumber) && selectedDummyRecords.push(row.rfidNumber);
                        });
                    } else {
                        this.state.rows.map((row, i) => {
                            !selectedDummyRecords.includes(row._id) && selectedDummyRecords.push(row._id);
                        });
                    }

                    const allPages = [];
                    let startPage = 0;
                    const totalPages = response.page.filterCount / rowsPerPage;
                    while (startPage < totalPages) {
                        allPages.push(startPage), startPage++;
                    }
                    tempPages = allPages;
                } else {
                    selectAll = false;
                    tempPages = [];
                    selectedDummyRecords = [];
                }
                this.setState({ dialogOpen: false });
            }
            if (operation === 'singlePage') {
                const removeIds = [];
                this.state.rows.map((row, i) => {
                    if (
                        i < this.state.rowsPerPage * (this.state.page + 1) &&
                        this.state.rowsPerPage * this.state.page <= i
                    ) {
                        if (this.props?.preEncoded === true) {
                            if (e === 'checked') {
                                !selectedDummyRecords.includes(row.rfidNumber) &&
                                    selectedDummyRecords.push(row.rfidNumber);
                            } else {
                                removeIds.push(row.rfidNumber);
                            }
                        } else {
                            if (e === 'checked') {
                                !selectedDummyRecords.includes(row._id) && selectedDummyRecords.push(row._id);
                            } else {
                                removeIds.push(row._id);
                            }
                        }
                    }
                });
                if (removeIds.length > 0) {
                    selectedDummyRecords = selectedDummyRecords.filter((x) => !removeIds.includes(x));
                }
                tempPages =
                    tempPages.indexOf(pageNum) === -1
                        ? [...tempPages, pageNum]
                        : tempPages.filter((page) => page !== pageNum);
                selectAll = false;
            } else if (operation === 'singleRecord') {
                let records = [];
                const removeIds = [];
                let count = 0;
                if (this.props?.preEncoded === true) {
                    if (e.target.checked) {
                        selectedDummyRecords.push(row?.rfidNumber);
                    } else {
                        selectedDummyRecords = selectedRecords.filter((ele) => ele !== row?.rfidNumber);
                    }
                } else {
                    if (e.target.checked) {
                        selectedDummyRecords.push(row._id);
                    } else {
                        selectedDummyRecords = selectedRecords.filter((ele) => ele !== row._id);
                    }
                }
                // for removing and adding current page
                for (let index = 0; index < rows.length; index += rowsPerPage) {
                    let record = rows.slice(index, index + rowsPerPage);
                    records.push(record);
                }
                if (this.props.preEncoded === true) {
                    records[pageNum]?.map((ele) => {
                        if (selectedDummyRecords.includes(ele.rfidNumber)) count++;
                    });
                } else {
                    records[pageNum]?.map((ele) => {
                        if (selectedDummyRecords.includes(ele._id)) count++;
                    });
                }
                if (selectAll) {
                    tempPages = tempPages.filter((page) => page < pageNum);
                    records.map((ele, i) => {
                        if (this.props.preEncoded === true) {
                            if (i > pageNum)
                                records[i].map((row) => {
                                    removeIds.push(row.rfidNumber);
                                });
                        } else {
                            if (i > pageNum)
                                records[i].map((row) => {
                                    removeIds.push(row._id);
                                });
                        }
                    });
                    selectAll = false;
                }
                if (removeIds.length > 0) {
                    selectedDummyRecords = selectedDummyRecords.filter((x) => !removeIds.includes(x));
                }
                tempPages =
                    count === rowsPerPage ? [...tempPages, pageNum] : tempPages.filter((page) => page !== pageNum);
            }
            this.setState({ selectedPages: tempPages });
            this.props.handleSelect && this.props.handleSelect(selectedDummyRecords, selectAll);
        }
    };

    onReorderEnd = ({ oldIndex, newIndex }) => {
        let old = this.props.module !== 'reports' ? oldIndex : oldIndex + 1;
        let newI = this.props.module !== 'reports' ? newIndex : newIndex + 1;
        const { columns, defaultColumns } = this.state;
        const { setNewColumns } = this.props;
        const columnsOrder = columns;
        const movedColumns = columnsOrder.splice(old, 1);
        columnsOrder.splice(newI, 0, movedColumns[0]);
        const newColumns = columnsOrder.map((ele, index) => {
            return { ...ele, sequence: this.props.module !== 'reports' ? index : index };
        });

        let isInActive = defaultColumns?.filter((ele) => ele.isVisible === 0);
        // setNewColumns(newColumns, isInActive);
        let object = {};
        object.collectionName = 'column';
        object.validData = newColumns;
        let json = JSON.stringify(object);
        if (newIndex !== oldIndex) {
            this.props.dispatch(putDisplayConfigData(json));
        }
    };
    // onReorderEnd = ({ oldIndex, newIndex }) => {
    //     let data = this.props.response?.displayConfigData.sort(
    //         (a, b) => parseFloat(a.sequence) - parseFloat(b.sequence)
    //     );

    //     // console.log(oldIndex, newIndex, this.props.response?.displayConfigData, 'llll');
    //     // let data = this.props.response?.displayConfigData;
    //     let object = {};
    //     data.forEach((obj, i) => {
    //         if (newIndex > oldIndex) {
    //             let flag = 0;
    //             if (obj.sequence <= newIndex) {
    //                 if (i + 1 === oldIndex && flag === 0) {
    //                     obj['sequence'] = newIndex;
    //                     flag = 1;
    //                 } else if (obj.sequence > oldIndex && obj.sequence <= newIndex) {
    //                     obj['sequence'] = obj.sequence - 1;
    //                 }
    //             }
    //         } else {
    //             let flag = 0;
    //             if (i + 1 === oldIndex && flag === 0) {
    //                 obj['sequence'] = newIndex;
    //                 flag = 1;
    //             } else if (obj.sequence < oldIndex && obj.sequence >= newIndex) {
    //                 obj['sequence'] = obj.sequence + 1;
    //             }
    //         }
    //     });

    // object.collectionName = 'column';
    // object.validData = data;
    // let json = JSON.stringify(object);
    // if (newIndex !== oldIndex) {
    //     this.props.dispatch(putDisplayConfigData(json));
    // }
    //     // const newOrder = this.state.order;
    //     // const moved = newOrder.splice(oldIndex, 1);
    //     console.log(newIndex, oldIndex, data, 'llll');
    // };

    // keyFine = (key, row) => {
    //     let keys = key.split('.');
    //     if (keys[0].includes('[0]')) {
    //         keys[0] = keys[0]?.substr(0, keys[0]?.indexOf('['));
    //     }
    //     if (keys[0] === 'skuId') {
    //         if (keys[2] === 'expiryDate') {
    //             return row[keys[0]]?.[keys[1]]?.[0]?.[keys[2]];
    //         }
    //         if (keys[2] === 'collectionDate') {
    //             return row[keys[0]]?.[keys[1]]?.[0]?.[keys[2]];
    //         }
    //         return row[keys[0]]?.['rfidNumber'];
    //     }
    //     if (keys[0] === 'clientId') {
    //         if (keys[1] === 'name') {
    //             if (row[keys[0]]?.[keys[1]] !== undefined) return row[keys[0]]?.[keys[1]];
    //             else if (row[keys[0]]?.[0] !== undefined && row[keys[0]]?.[0]?.[keys[1]] !== undefined)
    //                 return row[keys[0]]?.[0]?.[keys[1]];
    //             else return '-';
    //         }
    //         if (keys[1] === 'code') {
    //             return row[keys[0]]?.[keys[1]];
    //         }
    //     }
    //     if (keys[0] === 'locationTypeId') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             if (keys[1] === 'name') {
    //                 if (row[keys[0]]?.[keys[1]] !== undefined) {
    //                     return row[keys[0]]?.[keys[1]];
    //                 }
    //                 if (row[keys[0]]?.[0] !== undefined && row[keys[0]]?.[0]?.[keys[1]] !== undefined)
    //                     return row[keys[0]]?.[0]?.[keys[1]];
    //                 else return '-';
    //             }
    //         }
    //     }

    //     if (keys[0] === 'locationId') {
    //         if (keys[1] === 'name') {
    //             if (row[keys[0]]?.[0] !== undefined && row[keys[0]]?.[0]?.[keys[1]] !== undefined)
    //                 return row[keys[0]]?.[0]?.[keys[1]];
    //             else return '-';
    //         }
    //     }
    //     if (keys[0] === 'deviceTypeId') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             if (keys[1] === 'name') {
    //                 if (row[keys[0]]?.[0] !== undefined && row[keys[0]]?.[0]?.[keys[1]] !== undefined)
    //                     return row[keys[0]]?.[0]?.[keys[1]];
    //                 else return '-';
    //             }
    //         }
    //     }

    //     if (keys[0] === 'labsId') {
    //         return row[keys[0]]?.[0]?.[keys[1]];
    //     }

    //     if (keys[0] === 'createdBy') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             if (row[keys[0]]?.[0]?.[keys[1]]) {
    //                 return row[keys[0]]?.[0]?.[keys[1]];
    //             } else {
    //                 return 'admin';
    //             }
    //         }
    //     }
    //     if (keys[0] === 'updatedBy') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             if (row[keys[0]][0]?.[keys[1]] === 'undefined') {
    //                 return row[keys[0]]?.[0]?.[keys[1]];
    //             } else {
    //                 return 'admin';
    //             }
    //         }
    //     }

    //     if (keys[0] === 'authorityId') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             return row[keys[0]]?.[0]?.[keys[1]];
    //         }
    //     }
    //     if (keys[0] === 'actionId') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             return row[keys[0]]?.[0]?.[keys[1]];
    //         }
    //     }
    //     if (keys[0] === 'conditionId') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             return row[keys[0]]?.[0]?.[keys[1]];
    //         }
    //     }
    //     if (keys[0] === 'userroleId') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             return row[keys[0]]?.[0]?.[keys[1]];
    //         }
    //     }
    //     //recipientId[0].dob

    //     if (keys[0] === 'recipientId') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             if (keys[1] === 'dob') {
    //                 let momentDate = row[keys[0]]?.[0]?.[keys[1]];

    //                 return momentDate === undefined ? '-' : moment(momentDate).format('DD-MMM-YYYY');
    //             }
    //         }
    //     }

    //     if (keys[0] === 'refskuId') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             if (keys[1] === 'dereservationDate') {
    //                 let momentDate = moment(row[keys[0]]?.[0]?.[keys[1]]).format(
    //                     this.props?.dateFormat ? this.props?.dateFormat : 'DD-MMM-YYYY HH:mm'
    //                 );
    //                 return momentDate !== 'Invalid date' ? momentDate : '-';
    //             } else if (keys[1] === 'expiryDateAndTime') {
    //                 return moment(row[keys[0]][0]?.[keys[1]]).format(
    //                     this.props?.dateFormat ? this.props?.dateFormat : 'DD-MMM-YYYY HH:mm'
    //                 );
    //             } else if (keys[1] === 'productiontionDateAndTime') {
    //                 return row[keys[0]]?.[0]?.[keys[1]] === undefined
    //                     ? '-'
    //                     : moment(row[keys[0]]?.[0]?.[keys[1]]).format(
    //                           this.props?.dateFormat ? this.props?.dateFormat : 'DD-MMM-YYYY HH:mm'
    //                       );
    //             } else {
    //                 return row[keys[0]]?.[0]?.[keys[1]];
    //             }
    //         }
    //     }
    //     if (keys[0] === 'deviceId') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             if (row[keys[0]]?.[0]?.[keys[1]]) {
    //                 return row[keys[0]]?.[0]?.[keys[1]];
    //             } else {
    //                 return '-';
    //             }
    //         } else {
    //             return '-';
    //         }
    //     }
    //     if (keys[0] === 'userId') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             return row[keys[0]]?.[0]?.[keys[1]];
    //         } else {
    //             return '-';
    //         }
    //     }
    //     if (keys[0] === 'trackId') {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             return row[keys[0]]?.[0]?.[keys[1]];
    //         } else {
    //             return '-';
    //         }
    //     } else {
    //         let hasOwnProp = Object.keys(row).some((item) => item === keys[0]);
    //         if (hasOwnProp) {
    //             if (row[keys[0]]?.[0]?.[keys[1]]) {
    //                 return row[keys[0]]?.[0]?.[keys[1]];
    //             } else {
    //                 return '-';
    //             }
    //         } else {
    //             return '-';
    //         }
    //     }
    // };

    applySort = (columnName) => {
        if (this.props.sortOperation) {
            const { sort, sortOperation } = this.props;

            if (sort && sort.key === columnName.dbProperty) {
                let order = sort.value === 1 ? -1 : 1;
                const newSort = { key: sort.key, value: order };
                this.setState({ sort: newSort });
                sortOperation(newSort);
            } else {
                const newSort = { key: columnName.dbProperty, value: 1 };
                this.setState({ sort: newSort });
                sortOperation(newSort);
            }
        } else {
            const { sort } = this.state;
            if (sort && sort.key === columnName.dbProperty) {
                let order = sort.value === 1 ? -1 : 1;
                const newSort = { key: sort.key, value: order };
                this.setState({ sort: newSort });
                this.sortTable(newSort);
            } else {
                const newSort = { key: columnName.dbProperty, value: 1 };
                this.setState({ sort: newSort });
                this.sortTable(newSort);
            }
        }
        this.displayLoading();
    };

    displayLoading = () => {
        this.setState({ profileExist: false });
        setTimeout(() => {
            this.setState({ profileExist: true });
        }, 1500);
        this.setState({ page: 0 });
    };

    sortTable = (sort) => {
        let { rows } = this.state;

        let newRows = [];
        if (!sort.key.includes('.')) {
            const key = sort.key;

            sort.value === 1
                ? (newRows = rows.sort((a, b) => this.sortLogic(a[`${key}`], b[`${key}`])))
                : (newRows = rows.sort((a, b) => this.sortLogic(a[`${key}`], b[`${key}`])).reverse());
            this.setState({ rows: newRows });
        } else if (sort.key.includes('.')) {
            sort.value === 1
                ? (newRows = rows.sort((a, b) => this.sortLogic(keyFine(sort.key, a), keyFine(sort.key, b))))
                : (newRows = rows.sort((a, b) => this.sortLogic(keyFine(sort.key, a), keyFine(sort.key, b))).reverse());
            this.setState({ rows: newRows });
        }
    };

    sortLogic = (a, b) => {
        let fa = a?.toLowerCase(),
            fb = b?.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    };

    state = { redirect: null };

    handleSelectAllRow = () => {
        this.props.selectAllRow(!this.props.isAllSelected);
    };
    handleRowSelector = (event) => {
        let checked = event.target.checked;

        this.props.isAllSelected && this.handleSelectAllRow();
    };

    handleDialog = () => {
        this.setState({
            dialogOpen: true
        });
    };

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        });
    };

    render() {
        let { rows, rowsPerPage, page, sort, selectedPages } = this.state;
        console.log('perpage---', this.props
            .viewRowAccess)
        const { pageNum, selectAllRecords, selectAllAccess, isAction, data, scView } = this.props;
        // console.log('this?.state?.columns?.length', this?.state?.columns?.length,this?.state?.columns);
        if (this.state.redirect) return <Redirect to={this.state.redirect} />;
        let isCurrentPageSelected = selectedPages?.some((page) => page === pageNum);
        return (
            <>
                {
                    // this.state.profileExist === false ? (
                    //     <Loader />
                    // ) :
                    <Fade in={true}>
                        <div style={{ flexGrow: 1 }}>
                            <div style={{ marginTop: this.props.preEncoded ? 0 : 20 }}>
                                {this?.state?.columns?.length > 0 ? (
                                    <div
                                        style={{
                                            overflow: 'auto',
                                            minWidth: 16,
                                            minHeight: 16,
                                            maxHeight: 'calc(55vh)'
                                        }}
                                    >
                                        <Table stickyHeader size="small">
                                            
                                            <SortableHead
                                                axis="x"
                                                onSortEnd={this.props.sequenceChangeAccess ? this.onReorderEnd : null}
                                            >
                                                {this.state.order.map((colIdx, i) =>
                                                    this.state.columns[colIdx].dbProperty === '#' ? (
                                                        <>

                                                            <StickyTableCell>
                                                                {!scView && (
                                                                    <CheckBoxTable
                                                                        key={i}
                                                                        name="checkedB"
                                                                        onClick={(e) =>
                                                                            selectAllRecords
                                                                                ? null
                                                                                : this.handleCheck(
                                                                                      selectedPages.includes(pageNum)
                                                                                          ? 'unChecked'
                                                                                          : 'checked',
                                                                                      'singlePage',
                                                                                      {}
                                                                                  )
                                                                        }
                                                                        check={isCurrentPageSelected}
                                                                        disabled={
                                                                            !this.props.selectionAccess || isAction
                                                                        }
                                                                        handleCheck={this.handleCheck}
                                                                        handleDialog={this.handleDialog}
                                                                        pageNum={pageNum}
                                                                        selectedPages={selectedPages}
                                                                        selectAllAccess={selectAllAccess}
                                                                        selectAllRecords={selectAllRecords}
                                                                    />
                                                                )}
                                                            </StickyTableCell>
                                                        </>
                                                    ) : this.state.columns[colIdx].dbProperty === '@' ? (
                                                        <StickyTableActions
                                                            style={{
                                                                fontSize: 14,
                                                                padding: 'none',
                                                                color: this.props.theme.palette.primary.main,
                                                                fontWeight: '500'
                                                            }}
                                                        >
                                                            {!scView && this.state.columns[colIdx].label}
                                                        </StickyTableActions>
                                                    ) : (
                                                        <MainSortableCell
                                                            index={i}
                                                            onClick={
                                                                this.props.noSorting
                                                                    ? null
                                                                    : this.state.columns[colIdx].label !== '#' &&
                                                                      this.state.columns[colIdx].dbProperty !== '@'
                                                                    ? () => this.applySort(this.state.columns[colIdx])
                                                                    : null
                                                            }
                                                            sort={sort}
                                                            colIdx={this.state.columns[colIdx]}
                                                        />
                                                    )
                                                )}
                                            </SortableHead>
                                            <TableBody>

                                                <>
                                                    {(rowsPerPage > 0
                                                        ? rows.slice(
                                                              page * rowsPerPage,
                                                              page * rowsPerPage + rowsPerPage
                                                          )
                                                        : rows
                                                    ).map((row, i) => (
                                                        <StyledTableRow
                                                            key={i}
                                                            style={{
                                                                fontSize: 12,
                                                                whiteSpace: 'nowrap',
                                                                padding: 'none',
                                                                color: '#777777',
                                                                backgroundColor: this?.props?.pulledOutIds?.includes(
                                                                    row?._id
                                                                )
                                                                    ? '#e3fce4'
                                                                    : row['flag'] === 'error'
                                                                    ? 'rgba(255, 204, 204,0.4)'
                                                                    : '',
                                                                height: '40px'
                                                            }}
                                                        >
                                                            <>
                                                                {this.state.order.map((colIdx) =>
                                                                    this.state.columns[colIdx].dbProperty ===
                                                                    'testing' ? (
                                                                        <CustomTableCell key={colIdx} align="center">
                                                                            {this.checkTestingValue(row.specialtesting)}
                                                                        </CustomTableCell>
                                                                    ) : this.state.columns[colIdx].dbProperty ===
                                                                      'check' ? (
                                                                        <CustomTableCell key={colIdx} align="center">
                                                                            {this.checkValue(row.donationId)}
                                                                        </CustomTableCell>
                                                                    ) : this.state.columns[colIdx].dbProperty ===
                                                                      '#' ? (
                                                                        <>
                                                                            <StickyTableCell>
                                                                                <CustomTableCell
                                                                                    key={colIdx}
                                                                                    align="center"
                                                                                    style={{
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        justifyContent: 'center'
                                                                                    }}
                                                                                >
                                                                                    {!scView && (
                                                                                        <Checkbox
                                                                                            style={{
                                                                                                padding: 3,
                                                                                                margin: 0,
                                                                                                marginLeft: 6,
                                                                                                marginTop: -7
                                                                                            }}
                                                                                            name="checkedB"
                                                                                            color="primary"
                                                                                            checked={
                                                                                                this.props
                                                                                                    ?.preEncoded ===
                                                                                                true
                                                                                                    ? this.props?.selectedRecords?.includes(
                                                                                                          row.rfidNumber
                                                                                                      )
                                                                                                    : this.props?.selectedRecords?.includes(
                                                                                                          row._id
                                                                                                      ) ||
                                                                                                      row.check ||
                                                                                                      row.tick ||
                                                                                                      false
                                                                                            }
                                                                                            onClick={(e) =>
                                                                                                this.handleCheck(
                                                                                                    e,
                                                                                                    'singleRecord',
                                                                                                    row
                                                                                                )
                                                                                            }
                                                                                            disabled={
                                                                                                this.props
                                                                                                    ?.preEncoded ===
                                                                                                true
                                                                                                    ? row?.donationCode &&
                                                                                                      row?.expiryDateAndTime &&
                                                                                                      row?.rfidNumber &&
                                                                                                      row?.bloodgroupId &&
                                                                                                      row?.productcodeId
                                                                                                        ? false
                                                                                                        : true
                                                                                                    : !this.props
                                                                                                          .selectionAccess ||
                                                                                                      isAction
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                                    {this.props.isRequestUnit ? (
                                                                                        <FlareIcon
                                                                                            style={{
                                                                                                marginRight: '-3px',
                                                                                                marginLeft: 0,
                                                                                                marginTop: 5,
                                                                                                paddingTop: 5,
                                                                                                width: '100%',
                                                                                                fontSize: 25,
                                                                                                color: this?.props?.triggeredLedList?.includes(
                                                                                                    row._id
                                                                                                )
                                                                                                    ? '#DD0004'
                                                                                                    : null
                                                                                            }}
                                                                                        />
                                                                                    ) : null}
                                                                                </CustomTableCell>
                                                                            </StickyTableCell>
                                                                        </>
                                                                    ) : this.state.columns[colIdx] === 'Check' ? (
                                                                        <TableCell align="center" key={colIdx}>
                                                                            {this.checkValue(row.donationId)}
                                                                        </TableCell>
                                                                    ) : this.state.columns[colIdx].label ===
                                                                      'Unit ID#' ? (
                                                                        <TableCell
                                                                            align="center"
                                                                            style={{ position: 'relative' }}
                                                                            key={colIdx}
                                                                        >
                                                                            {row[this.state.columns[colIdx].dbProperty]}
                                                                        </TableCell>
                                                                    ) : this.state.columns[colIdx].dbProperty ===
                                                                      '@' ? (
                                                                        <StickyTableActions align={'left'} key={colIdx}>
                                                                            {this.props.transferUnit === true ? (
                                                                                <IconButton
                                                                                    size="small"
                                                                                    onClick={() => {
                                                                                        this.props.handleDialog
                                                                                            ? this.props.handleDialog()
                                                                                            : null;
                                                                                        this.props?.setRowData(row);
                                                                                    }}
                                                                                >
                                                                                    <DeleteIcon
                                                                                        style={{
                                                                                            opacity: 0.7,
                                                                                            fontSize: 16,
                                                                                            padding: 0,
                                                                                            margin: 0
                                                                                        }}
                                                                                    />
                                                                                </IconButton>
                                                                            ) : (
                                                                                <>
                                                                                                                { /*{this.props.handleVoucher && (*/}
                                                                                               { this?.props?.history?.location?.pathname === '/dashboard/swapout' ? (
                                                                                        <Tooltip
                                                                                            title={
                                                                                                this.props.viewRowAccess
                                                                                                    ? 'View Record'
                                                                                                    : 'No Access'
                                                                                            }
                                                                                        >
                                                                                            <IconButton
                                                                                                size="small"
                                                                                                                            onClick={() => {
                                                                                                                                console.log(
                                                                                                                                    'On Click' +
                                                                                                                                    JSON.stringify(row)
                                                                                                                                );
                                                                                                    if (
                                                                                                        this.props
                                                                                                            .handleVoucher &&
                                                                                                        this.props
                                                                                                            .viewRowAccess
                                                                                                    ) {
                                                                                                        this.props.handleVoucher(
                                                                                                            row
                                                                                                        );
                                                                                                    }
                                                                                                    if (
                                                                                                        this.props
                                                                                                            .setRowData
                                                                                                    ) {
                                                                                                        this.props?.setRowData(
                                                                                                            row
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                                style={{
                                                                                                    marginRight: '5px'
                                                                                                }}
                                                                                            >
                                                                                                <VisibilityIcon
                                                                                                    style={{
                                                                                                        opacity: 0.7,
                                                                                                        fontSize: 16
                                                                                                    }}
                                                                                                />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                    ) :null}
                                                                                                                {this?.props?.history?.location?.pathname === '/dashboard/rules' || this?.props?.history?.location?.pathname === '/dashboard/swapout' || this?.props?.history?.location?.pathname === '/dashboard/compatibility' ? (null) : (
                                                                                        <Tooltip
                                                                                            title={
                                                                                                this.props.editRowAccess
                                                                                                    ? 'Edit Record'
                                                                                                    : 'No Access'
                                                                                            }
                                                                                        >
                                                                                            <IconButton
                                                                                                size="small"
                                                                                                onClick={() => {
                                                                                                    if (
                                                                                                        this.props
                                                                                                            .handleEditDialog &&
                                                                                                        this.props
                                                                                                            .editRowAccess
                                                                                                    ) {
                                                                                                        this.props.handleEditDialog(
                                                                                                            row
                                                                                                        );
                                                                                                    }
                                                                                                    if (
                                                                                                        this.props
                                                                                                            .setRowData
                                                                                                    ) {
                                                                                                        this.props.setRowData(
                                                                                                            row
                                                                                                        );
                                                                                                    }
                                                                                                    if (
                                                                                                        this.props
                                                                                                            .setInitialData
                                                                                                    ) {
                                                                                                        localStorage.setItem(
                                                                                                            'initialData',
                                                                                                            JSON.stringify(
                                                                                                                row
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                                style={{
                                                                                                    marginRight: '5px'
                                                                                                }}
                                                                                            >
                                                                                                <EditIcon
                                                                                                    style={{
                                                                                                        opacity: 0.7,
                                                                                                        fontSize: 16
                                                                                                    }}
                                                                                                />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                    )}
                                                                                    {this.props.handleCloneDialog && (
                                                                                        <Tooltip
                                                                                            title={
                                                                                                this.props
                                                                                                    .cloneRowAccess
                                                                                                    ? 'Clone Record'
                                                                                                    : 'No Access'
                                                                                            }
                                                                                        >
                                                                                            <IconButton
                                                                                                size="small"
                                                                                                onClick={() => {
                                                                                                    if (
                                                                                                        this.props
                                                                                                            .handleCloneDialog &&
                                                                                                        this.props
                                                                                                            .cloneRowAccess
                                                                                                    ) {
                                                                                                        this.props.handleCloneDialog(
                                                                                                            row
                                                                                                        );
                                                                                                    }
                                                                                                    if (
                                                                                                        this.props
                                                                                                            .setRowData
                                                                                                    ) {
                                                                                                        this.props.setRowData(
                                                                                                            row
                                                                                                        );
                                                                                                    }
                                                                                                    if (
                                                                                                        this.props
                                                                                                            .setInitialData
                                                                                                    ) {
                                                                                                        this.props.setInitialData(
                                                                                                            row
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                                style={{
                                                                                                    marginRight: '5px'
                                                                                                }}
                                                                                            >
                                                                                                <FileCopyIcon
                                                                                                    style={{
                                                                                                        opacity: 0.7,
                                                                                                        fontSize: 16
                                                                                                    }}
                                                                                                />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                    )}
                                                                                    {this?.props?.history?.location
                                                                                        ?.pathname === '/dashboard/rules' || this?.props?.history?.location?.pathname === "/dashboard/request-unit" || this?.props?.history?.location?.pathname === "/dashboard/compatibility"
                                                                                         || this?.props?.history?.location?.pathname === '/dashboard/swapout'
                                                                                           ? (
                                                                                        null
                                                                                    ) : (
                                                                                        <Tooltip
                                                                                            title={
                                                                                                this.props
                                                                                                    .deleteRowAccess
                                                                                                    ? 'Deactivate Record'
                                                                                                    : 'No Access'
                                                                                            }
                                                                                        >
                                                                                            <IconButton
                                                                                                size="small"
                                                                                                onClick={() => {
                                                                                                    if (
                                                                                                        this.props
                                                                                                            .deleteRowAccess &&
                                                                                                        this.props
                                                                                                            .setRowData
                                                                                                    ) {
                                                                                                        this.props.setRowData(
                                                                                                            row
                                                                                                        );
                                                                                                    }

                                                                                                    this.props
                                                                                                        .deleteRowAccess &&
                                                                                                    this.props
                                                                                                        .handleDialog
                                                                                                        ? this.props.handleDialog()
                                                                                                        : null;
                                                                                                }}
                                                                                            >
                                                                                                <NotInterestedIcon
                                                                                                    style={{
                                                                                                        opacity: 0.7,
                                                                                                        fontSize: 16
                                                                                                    }}
                                                                                                />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                    )}
                                                                                                                {this?.props?.history?.location?.pathname === '/dashboard/compatibility' && (
                                                                                                                    <Tooltip
                                                                                                                        title={
                                                                                                                            this.props.pdfRowAccess
                                                                                                                                ? 'Deactivate Record'
                                                                                                                                : 'No Access'
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <IconButton
                                                                                                                            size="small"
                                                                                                                            onClick={() => {
                                                                                                                                    this.props.handleNext();
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            <PictureAsPdfIcon
                                                                                                                                style={{
                                                                                                                                    opacity: 0.7,
                                                                                                                                    fontSize: 16
                                                                                                                                }}
                                                                                                                            />
                                                                                                                        </IconButton>
                                                                                                                    </Tooltip>
                                                                                                                )}


                                                                                                                {this?.props?.history?.location?.pathname === '/dashboard/compatibility' && (
                                                                                                                    <Tooltip
                                                                                                                        title={
                                                                                                                            this.props.pdfRowAccess
                                                                                                                                ? 'Deactivate Record'
                                                                                                                                : 'No Access'
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <IconButton
                                                                                                                            size="small"
                                                                                                                            //onClick={() => handleNext(index)}
                                                                                                                        >
                                                                                                                            <LibraryAddCheckIcon
                                                                                                                                style={{
                                                                                                                                    opacity: 0.7,
                                                                                                                                    fontSize: 16
                                                                                                                                }}
                                                                                                                            />
                                                                                                                        </IconButton>
                                                                                                                    </Tooltip>
                                                                                                                )}


                                                                                                                 
                                                                                    {this.props.hasSwitch && (
                                                                                        <Tooltip>
                                                                                            <Switch
                                                                                                size="small"
                                                                                                style={{
                                                                                                    marginRight: '5px'
                                                                                                }}
                                                                                                color="primary"
                                                                                                name="isDefault"
                                                                                                checked={
                                                                                                    row.isActive
                                                                                                        ? true
                                                                                                        : false
                                                                                                }
                                                                                                onChange={(e) =>
                                                                                                    this.props.onFormCheck(
                                                                                                        e,
                                                                                                        row
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </Tooltip>
                                                                                    )}
                                                                                    {this.props.breakRule && (
                                                                                        <Tooltip title="Rule Break">
                                                                                            <IconButton
                                                                                                size="small"
                                                                                                onClick={() => {
                                                                                                    if (
                                                                                                        this.props
                                                                                                            .setRowData
                                                                                                    ) {
                                                                                                        this.props.setRowData(
                                                                                                            row
                                                                                                        );
                                                                                                    }

                                                                                                    this.props
                                                                                                        .handleRuleBrealDialogOpen
                                                                                                        ? this.props.handleRuleBrealDialogOpen()
                                                                                                        : null;
                                                                                                }}
                                                                                            >
                                                                                                <CancelIcon
                                                                                                    style={{
                                                                                                        opacity: 0.7,
                                                                                                        fontSize: 16
                                                                                                    }}
                                                                                                />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </StickyTableActions>
                                                                    ) : this.state.columns[colIdx].dbProperty ===
                                                                          'createdAt' ||
                                                                      this.state.columns[colIdx].dbProperty ===
                                                                          'transactionDateTime' ? (
                                                                        <CustomTableCell align="left" key={colIdx}>
                                                                            {moment(
                                                                                row[
                                                                                    this.state.columns[colIdx]
                                                                                        .dbProperty
                                                                                ] === undefined
                                                                                    ? '-'
                                                                                    : row[
                                                                                          this.state.columns[colIdx]
                                                                                              .dbProperty
                                                                                      ]
                                                                            ).format('DD-MMM-YYYY HH:mm')}
                                                                        </CustomTableCell>
                                                                    ) : this.state.columns[colIdx].dbProperty ===
                                                                      'expiryDate' ? (
                                                                        <CustomTableCell align="left" key={colIdx}>
                                                                            {moment(
                                                                                row[
                                                                                    this.state.columns[colIdx]
                                                                                        .dbProperty
                                                                                ] === undefined
                                                                                    ? '-'
                                                                                    : row[
                                                                                          this.state.columns[colIdx]
                                                                                              .dbProperty
                                                                                      ]
                                                                            ).format('DD-MMM-YYYY')}
                                                                        </CustomTableCell>
                                                                    ) : this.state.columns[colIdx].dbProperty ===
                                                                      'refsku.dereservationDate' ? (
                                                                        <CustomTableCell align="left" key={colIdx}>
                                                                            {row?.refsku === undefined ||
                                                                            row?.refsku.dereservationDate === undefined ||
                                                                        row?.refsku.dereservationDate === null                               
                                                                                ? '-'
                                                                                : moment(
                                                                                      row.refsku.dereservationDate
                                                                                  ).format('DD-MMM-YYYY  HH:mm')}
                                                                        </CustomTableCell>
                                                                    ) : this.state.columns[colIdx].dbProperty ===
                                                                      'batches.dereservationDateAndTime' ? (
                                                                        <CustomTableCell align="left" key={colIdx}>
                                                                            {row?.batches === undefined ||
                                                                            row?.batches.dereservationDateAndTime ===
                                                                         undefined || row?.batches.dereservationDateAndTime === null
                                                                                ? '-'
                                                                                : moment(
                                                                                      row.batches
                                                                                          .dereservationDateAndTime
                                                                                  ).format('DD-MMM-YYYY  HH:mm')}
                                                                        </CustomTableCell>
                                                                    ) : this.state.columns[colIdx].dbProperty ===
                                                                          'dereservationDate' ||
                                                                      this.state.columns[colIdx].dbProperty ===
                                                                          'dereservationDateAndTime' ||
                                                                      this.state.columns[colIdx].dbProperty ===
                                                                          'collectionDateAndTime' ||
                                                                      this.state.columns[colIdx].dbProperty ===
                                                                          'productiontionDateAndTime' ||
                                                                      //this.state.columns[colIdx].dbProperty ===
                                                                      //    'expiryDateAndTime' ||
                                                                      this.state.columns[colIdx].dbProperty ===
                                                                          'expiryDate' ||
                                                                      this.state.columns[colIdx].dbProperty ===
                                                                          'startTime' ||
                                                                      this.state.columns[colIdx].dbProperty ===
                                                                          'endTime' ||
                                                                      this.state.columns[colIdx].dbProperty ===
                                                                          'expiry' ||
                                                                      this.state.columns[colIdx].dbProperty === 'dob' ||
                                                                      this.state.columns[colIdx].dbProperty ===
                                                                          'date' ||
                                                                      this.state.columns[colIdx].dbProperty ===
                                                                          'expiryDateAndTime' ? (
                                                                        <CustomTableCell align="left" key={colIdx}>
                                                                            {moment(
                                                                                row[
                                                                                    this.state.columns[colIdx]
                                                                                        .dbProperty
                                                                                ] === undefined
                                                                                    ? '-'
                                                                                    : row[
                                                                                          this.state.columns[colIdx]
                                                                                              .dbProperty
                                                                                      ]
                                                                            ).format('DD-MMM-YYYY HH:mm') !==
                                                                            'Invalid date'
                                                                                ? moment(
                                                                                      row[
                                                                                          this.state.columns[colIdx]
                                                                                              .dbProperty
                                                                                      ]
                                                                                  ).format('DD-MMM-YYYY HH:mm')
                                                                                : '-'}
                                                                        </CustomTableCell>
                                                                    ) : this.state.columns[
                                                                          colIdx
                                                                      ].dbProperty?.toLowerCase() === 'updatedat' ? (
                                                                        <CustomTableCell align="left" key={colIdx}>
                                                                            {moment(
                                                                                row[
                                                                                    this.state.columns[colIdx]
                                                                                        .dbProperty
                                                                                ] === undefined
                                                                                    ? '-'
                                                                                    : row[
                                                                                          this.state.columns[colIdx]
                                                                                              .dbProperty
                                                                                      ]
                                                                            ).format(
                                                                                this.state.columns[colIdx]
                                                                                    .dbProperty === 'dob'
                                                                                    ? 'DD-MMM-YYYY'
                                                                                    : this.props?.dateFormat
                                                                                    ? this.props?.dateFormat
                                                                                    : 'DD-MMM-YYYY HH:mm'
                                                                            ) !== 'Invalid date'
                                                                                ? moment(
                                                                                      row[
                                                                                          this.state.columns[colIdx]
                                                                                              .dbProperty
                                                                                      ]
                                                                                  ).format(
                                                                                      this.state.columns[colIdx]
                                                                                          .dbProperty === 'dob'
                                                                                          ? 'DD-MMM-YYYY'
                                                                                          : this.props?.dateFormat
                                                                                          ? this.props?.dateFormat
                                                                                          : 'DD-MMM-YYYY HH:mm'
                                                                                  )
                                                                                : '-'}
                                                                        </CustomTableCell>
                                                                    ) : (
                                                                        <TableCell
                                                                            key={colIdx}
                                                                            align={this.state.columns[colIdx].align}
                                                                            style={{
                                                                                position: 'relative',
                                                                                fontSize: 12,
                                                                                padding: 'none',
                                                                                color: this.state.columns[colIdx].isLink
                                                                                    ? this.props.theme.palette.primary
                                                                                          .main
                                                                                    : this.state.columns[colIdx]
                                                                                          .isClickable &&
                                                                                      row[
                                                                                          this.state.columns[colIdx]
                                                                                              .dbProperty
                                                                                      ]?.toString() !== 'Received'
                                                                                    ? this.props.theme.palette.primary
                                                                                          .main
                                                                                    : this.props.theme.palette.label
                                                                                          .main,
                                                                                fontWeight: this.state.columns[colIdx]
                                                                                    .isLink
                                                                                    ? '700'
                                                                                    : '500',
                                                                                cursor:
                                                                                    this.state.columns[colIdx]
                                                                                        .dbProperty === 'requestNo' ||
                                                                                    (this.state.columns[colIdx]
                                                                                        .isClickable &&
                                                                                        row[
                                                                                            this.state.columns[colIdx]
                                                                                                .dbProperty
                                                                                        ]?.toString() !== 'Received')
                                                                                        ? 'pointer'
                                                                                        : this.state.columns[colIdx]
                                                                                              .isLink
                                                                                        ? 'pointer'
                                                                                        : ''
                                                                            }}
                                                                            onClick={() => {
                                                                                console.log(
                                                                                    'On Click ' +
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty
                                                                                );
                                                                                console.log(
                                                                                    'On Click' +
                                                                                        this.state.columns[colIdx]
                                                                                            .isLink
                                                                                );
                                                                                console.log(
                                                                                    'On Click' +
                                                                                        this.state.columns[colIdx]
                                                                                );
                                                                                console.log('pppppppp', this.state.columns[colIdx]);

                                                                                if (
                                                                                    this.state.columns[colIdx]
                                                                                        .isClickable
                                                                                ) {
                                                                                    console.log('row', this.state.columns[colIdx]
                                                                                        .dbProperty,row);
                                                                                    if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty ===
                                                                                        'refsku.donationCode'
                                                                                    ) {
                                                                                        console.log('unitrefsku', this.props.history.location.pathname);
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/reports/unit/undefined/activities/refsku/${row.refsku._id}`
                                                                                        );
                                                                                    }else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty ===
                                                                                        'donationCode' && this.props.currentLocation === 'reports/wasted-units'
                                                                                    ) {
                                                                                        console.log('unitwastednav', this.props.history.location.pathname);
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/reports/unit/undefined/activities/wastedUnits/${row._id}`
                                                                                        );
                                                                                    }
                                                                                    else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty ===
                                                                                        'donationCode' && this.props.currentLocation === 'reports/transfused-units'
                                                                                    ) {
                                                                                        console.log('unit');
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/reports/unit/undefined/activities/transfusedUnits/${row._id}`
                                                                                        );
                                                                                    }
                                                                                   else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty ===
                                                                                        'assignbatcheId[0].gtinNumber' 
                                                                                    ) {
                                                                                        console.log('unit');
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/reports/batch/undefined/activities/assignbatches/${row.assignbatcheId._id}`
                                                                                        );
                                                                                    }
                                                                                  
                                                                                    else if (
                                                                                         this.state.columns[colIdx]
                                                                                            .dbProperty === 'gtinNumber' && this.props.currentLocation !== 'reports/wasted-batch' && this.props.currentLocation !== "reports/transfused-batch" 
                                                                                    ) {
                                                                                        console.log('navigation', this.props.currentLocation );
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/reports/batch/undefined/activities/assignbatches/${row._id}`
                                                                                        );
                                                                                    } 
                                                                                    else if (
                                                                                        this.state.columns[colIdx].dbProperty === 'gtinNumber' &&
                                                                                        this.props.currentLocation === 'reports/wasted-batch'
                                                                                    ) {
                                                                                        console.log('unit',);
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/reports/batch/undefined/activities/wastedBatches/${row._id}`
                                                                                        );
                                                                                    }
                                                                                    else if (
                                                                                        this.state.columns[colIdx].dbProperty === 'gtinNumber' &&
                                                                                        this.props.currentLocation  === "reports/transfused-batch"
                                                                                    ) {
                                                                                        console.log('unit',); 
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/reports/batch/undefined/activities/transfusedBatches/${row._id}`
                                                                                        );
                                                                                    }
                                                                                    else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty === 'batches.gtinNumber'
                                                                                    ) {
                                                                                        console.log('unit');
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/reports/batch/undefined/activities/assignbatches/${row.batches._id}`
                                                                                        );
                                                                                    }
                                                                                    //if (this.state.columns[colIdx].dbProperty === 'storagetypeId[0].name') {
                                                                                    //    this.props.history.push(`/dashboard/v/manage/device/${row?.storagetypeId[0].name}/activities/device/${row?.storagetypeId[0]?._id}`)
                                                                                    //}
                                                                                    else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty ===
                                                                                        'recipientId[0].name'
                                                                                    ) {
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/manage/recipient/${row?.recipientId[0].name}/activities/recipient/${row?.recipientId[0]?._id}`
                                                                                        );
                                                                                    } else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty ===
                                                                                        'deviceId[0].name'
                                                                                    ) {
                                                                                        console.log('ifdevice');
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/manage/device/${row?.deviceId[0].name}/activities/device/${row?.deviceId[0]?._id}`
                                                                                        );
                                                                                    } else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty ===
                                                                                        'clientId[0].name'
                                                                                    ) {
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/manage/hospital/${row?.clientId[0].name}/activities/client/${row?.clientId[0]?._id}`
                                                                                        );
                                                                                    } else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty ===
                                                                                        'createdBy[0].firstName'
                                                                                    ) {
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/manage/user/${row?.createdBy[0].firstName}/activities/user/${row?.createdBy[0]?._id}`
                                                                                        );
                                                                                    } else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty ===
                                                                                        'locationId[0].name'
                                                                                    ) {
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/manage/location/${row?.locationId[0].name}/activities/location/${row?.locationId[0]?._id}`
                                                                                        );
                                                                                    }
                                                                                    //manage navigation
                                                                                    else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty === 'name' &&
                                                                                        this.state.columns[colIdx]
                                                                                            .mref === 'devices'
                                                                                    ) {
                                                                                        console.log('ifname');
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/manage/device/${row?.name}/activities/device/${row?._id}`
                                                                                        );
                                                                                    } else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty === 'name' &&
                                                                                        this.state.columns[colIdx]
                                                                                            .mref === 'recipients'
                                                                                    ) {
                                                                                        console.log('ifname');
                                                                                        this.props.history.push(
                                                                                            `/dashboard/assign-unit`
                                                                                            //`/dashboard/v/manage/recipient/${row?.name}/activities/recipient/${row?._id}`
                                                                                        );
                                                                                    } else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty === 'name' &&
                                                                                        this.state.columns[colIdx]
                                                                                            .mref === 'clients'
                                                                                    ) {
                                                                                        console.log('ifname');
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/manage/hospital/${row?.name}/activities/client/${row?._id}`
                                                                                        );
                                                                                    } else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty === 'name' &&
                                                                                        this.state.columns[colIdx]
                                                                                            .mref === 'users'
                                                                                    ) {
                                                                                        console.log('ifname');
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/manage/user/${row?.name}/activities/user/${row?._id}`
                                                                                        );
                                                                                    } else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty === 'name' &&
                                                                                        this.state.columns[colIdx]
                                                                                            .mref === 'locations'
                                                                                    ) {
                                                                                        console.log('ifname');
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/manage/location/${row?.name}/activities/location/${row?._id}`
                                                                                        );
                                                                                    } else if (
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty ===
                                                                                            'mrnNumber' &&
                                                                                        this.state.columns[colIdx]
                                                                                            .mref === 'recipients'
                                                                                    ) {
                                                                                        console.log('ifname');
                                                                                        this.props.history.push(
                                                                                            `/dashboard/v/manage/recipient/${row?.mrnNumber}/activities/recipient/${row?._id}`
                                                                                        );
                                                                                    }
                                                                                }
                                                                                if (this.state.columns[colIdx].isLink) {
                                                                                    if (
                                                                                        this.props?.searchKey?.length >
                                                                                        0
                                                                                    ) {
                                                                                        this.props.history.push({
                                                                                            pathname: `/dashboard/assign-unit/r/${row['_id']}`,
                                                                                            state: { row, data }
                                                                                        });
                                                                                    } else if (
                                                                                        this?.props?.assignBatch
                                                                                    ) {
                                                                                        this.props.history.push({
                                                                                            pathname: `/dashboard/assign-batch/r/${row['_id']}`,
                                                                                            state: { row, data }
                                                                                        });
                                                                                    } else {
                                                                                        let index = i;
                                                                                        if (page > 0) {
                                                                                            index =
                                                                                                index +
                                                                                                page * rowsPerPage;
                                                                                        }
                                                                                        if (this.props.setValues) {
                                                                                            this.props.setValues(index);
                                                                                        }
                                                                                        if (
                                                                                            this.props.setEditDetailOpen
                                                                                        ) {
                                                                                            this.props.setEditDetailOpen(
                                                                                                true
                                                                                            );
                                                                                            this.props
                                                                                                .setEditdialogHeader
                                                                                                ? this.props.setEditdialogHeader(
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].label
                                                                                                  )
                                                                                                : null;
                                                                                        }
                                                                                    }
                                                                                }
                                                                                if (
                                                                                    this.state.columns[colIdx]
                                                                                        .dbProperty === 'requestNo' ||
                                                                                    (this.state.columns[colIdx]
                                                                                        .isClickable &&
                                                                                        this.props?.detailViewAccess &&
                                                                                        row[
                                                                                            this.state.columns[colIdx]
                                                                                                .dbProperty
                                                                                        ]?.toString() !== 'Received')
                                                                                ) {
                                                                                    console.log(
                                                                                        'this.state.columns[colIdx].dbProperty',
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty
                                                                                    );
                                                                                    this.props.handleVoucher
                                                                                        ? this.props.handleVoucher(
                                                                                              row,
                                                                                              this.state.columns[colIdx]
                                                                                                  .childDataTable,
                                                                                              row[
                                                                                                  this.state.columns[
                                                                                                      colIdx
                                                                                                  ].dbProperty
                                                                                              ]
                                                                                          )
                                                                                        : null;
                                                                                    this.props.setRowData
                                                                                        ? this.props.setRowData(row)
                                                                                        : null;
                                                                                }
                                                                            }}
                                                                        >
                                                                            {this.state.columns[
                                                                                colIdx
                                                                            ].dbProperty?.includes('.') ? (
                                                                                keyFine(
                                                                                    this.state.columns[colIdx]
                                                                                        .dbProperty,
                                                                                    row
                                                                                )
                                                                            ) : (this.state.columns[colIdx]
                                                                                  .dbProperty === 'badgeNumber' ||
                                                                                  this.state.columns[colIdx]
                                                                                      .dbProperty === 'name') &&
                                                                              row[this.state.columns[colIdx].dbProperty]
                                                                                  ?.toUpperCase()
                                                                                  ?.includes(
                                                                                      this.props.searchKey?.toUpperCase()
                                                                                  ) ? (
                                                                                <>
                                                                                    <span style={{ color: '#004272' }}>
                                                                                        {row[
                                                                                            this.state.columns[colIdx]
                                                                                                .dbProperty
                                                                                        ].substr(
                                                                                            0,
                                                                                            this.props.searchKey?.length
                                                                                        )}
                                                                                    </span>
                                                                                    {row[
                                                                                        this.state.columns[colIdx]
                                                                                            .dbProperty
                                                                                    ].substr(
                                                                                        this.props.searchKey?.length
                                                                                    )}
                                                                                </>
                                                                            ) : row.tick &&
                                                                              this.state.columns[colIdx].dbProperty ===
                                                                                  'donationCode' ? (
                                                                                <>
                                                                                    <span>
                                                                                        {row[
                                                                                            this.state.columns[colIdx]
                                                                                                .dbProperty
                                                                                        ]?.toString()}
                                                                                        <CheckCircleOutlineIcon
                                                                                            style={{
                                                                                                color: 'green',
                                                                                                fontSize: 16,
                                                                                                position: 'absolute',
                                                                                                right: 3
                                                                                            }}
                                                                                        />
                                                                                    </span>
                                                                                </>
                                                                            ) : this.state.columns[colIdx]
                                                                                  .dbProperty === 'tagNumbers' ? (
                                                                                <>
                                                                                    <Typography
                                                                                        color="primary"
                                                                                        align="center"
                                                                                        style={{
                                                                                            cursor: 'pointer',
                                                                                            fontSize: 12,
                                                                                            fontWeight: 'bold'
                                                                                        }}
                                                                                        onClick={() => {
                                                                                            row[
                                                                                                this.state.columns[
                                                                                                    colIdx
                                                                                                ].dbProperty
                                                                                            ]?.length > 0 &&
                                                                                                this.props.handleScanCountDialog();
                                                                                            this.props.setTagIdList(
                                                                                                row[
                                                                                                    this.state.columns[
                                                                                                        colIdx
                                                                                                    ].dbProperty
                                                                                                ]
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        {this.state.columns[colIdx]
                                                                                            .dbProperty === 'tagNumbers'
                                                                                            ? row[
                                                                                                  this.state.columns[
                                                                                                      colIdx
                                                                                                  ].dbProperty
                                                                                              ]?.length
                                                                                            : row[
                                                                                                  this.state.columns[
                                                                                                      colIdx
                                                                                                  ].dbProperty
                                                                                              ]?.toString()}
                                                                                    </Typography>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {' '}
                                                                                    {this.state.columns[colIdx]
                                                                                        .dbProperty === 'status' ? (
                                                                                        <span>
                                                                                            {row[
                                                                                                this.state.columns[
                                                                                                    colIdx
                                                                                                ].dbProperty
                                                                                            ]?.toString() === '1' ? (
                                                                                                <CheckCircleOutlineIcon
                                                                                                    style={{
                                                                                                        color: 'green'
                                                                                                    }}
                                                                                                />
                                                                                            ) : row[
                                                                                                  this.state.columns[
                                                                                                      colIdx
                                                                                                  ].dbProperty
                                                                                              ]?.toString() === '0' ? (
                                                                                                <CancelOutlined
                                                                                                    style={{
                                                                                                        color: '#e6555c'
                                                                                                    }}
                                                                                                />
                                                                                            ) : (
                                                                                                row[
                                                                                                    this.state.columns[
                                                                                                        colIdx
                                                                                                    ].dbProperty
                                                                                                ]?.toString() || '-'
                                                                                            )}
                                                                                        </span>
                                                                                    ) : this.state.columns[colIdx]
                                                                                          .dbProperty ===
                                                                                      'isRemoteAllocationAllowed' ? (
                                                                                        <span>
                                                                                            {row[
                                                                                                this.state.columns[
                                                                                                    colIdx
                                                                                                ].dbProperty
                                                                                            ]?.toString() === '1'
                                                                                                ? 'True'
                                                                                                : row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.toString() === '0'
                                                                                                ? 'False'
                                                                                                : row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.toString() || '-'}
                                                                                        </span>
                                                                                    ) : this.state.columns[colIdx]
                                                                                          .dbProperty ===
                                                                                      'isBadgeAccessAllowed' ? (
                                                                                        <span>
                                                                                            {row[
                                                                                                this.state.columns[
                                                                                                    colIdx
                                                                                                ].dbProperty
                                                                                            ]?.toString() === '1'
                                                                                                ? 'True'
                                                                                                : row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.toString() === '0'
                                                                                                ? 'False'
                                                                                                : row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.toString() || '-'}
                                                                                        </span>
                                                                                    ) : this.state.columns[colIdx]
                                                                                          .dbProperty ===
                                                                                      'isTemperatureAllowed' ? (
                                                                                        <span>
                                                                                            {row[
                                                                                                this.state.columns[
                                                                                                    colIdx
                                                                                                ].dbProperty
                                                                                            ]?.toString() === '1'
                                                                                                ? 'True'
                                                                                                : row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.toString() === '0'
                                                                                                ? 'False'
                                                                                                : row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.toString() || '-'}
                                                                                        </span>
                                                                                    ) : this.state.columns[colIdx]
                                                                                          .dbProperty ===
                                                                                      'isDeviceScanAutomated' ? (
                                                                                        <span>
                                                                                            {row[
                                                                                                this.state.columns[
                                                                                                    colIdx
                                                                                                ].dbProperty
                                                                                            ]?.toString() === '1'
                                                                                                ? 'True'
                                                                                                : row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.toString() === '0'
                                                                                                ? 'False'
                                                                                                : row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.toString() || '-'}
                                                                                        </span>
                                                                                    ) : this.state.columns[colIdx]
                                                                                          .dbProperty ===
                                                                                      'isEmergencyAccessAllowed' ? (
                                                                                        <span>
                                                                                            {row[
                                                                                                this.state.columns[
                                                                                                    colIdx
                                                                                                ].dbProperty
                                                                                            ]?.toString() === '1'
                                                                                                ? 'True'
                                                                                                : row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.toString() === '0'
                                                                                                ? 'False'
                                                                                                : row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.toString()}
                                                                                        </span>
                                                                                    ) : this.state.columns[colIdx]
                                                                                          .dbProperty ===
                                                                                      'donationCode' && (this.props.currentLocation !== 'reports/wasted-units' || this.props.currentLocation !== 'reports/transfused-units' || this.state.columns[colIdx]
                                                                                          .dbProperty !== 'name') ? (
                                                                                        <span
                                                                                            onClick={() =>
                                                                                                this.props.history.push(
                                                                                                    `/dashboard/v/reports/unit/undefined/activities/refsku/${row._id}`
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                                                                                                                        {console.log('devrefsku')}
                                                                                            {row[
                                                                                                this.state.columns[
                                                                                                    colIdx
                                                                                                ].dbProperty
                                                                                            ]?.toString() || '-'}
                                                                                        </span>
                                                                                    ) : (
                                                                                        <span>
                                                                                            {Array.isArray(
                                                                                                row[
                                                                                                    this.state.columns[
                                                                                                        colIdx
                                                                                                    ].dbProperty
                                                                                                ]
                                                                                            )
                                                                                                ? row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.length
                                                                                                : row[
                                                                                                      this.state
                                                                                                          .columns[
                                                                                                          colIdx
                                                                                                      ].dbProperty
                                                                                                  ]?.toString() || '-'}
                                                                                        </span>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </TableCell>
                                                                    )
                                                                )}
                                                            </>
                                                        </StyledTableRow>
                                                    ))}
                                                </>
                                            </TableBody>
                                        </Table>
                                        <Dialog open={this.state.dialogOpen}>
                                            <DialogTitle style={{ textAlign: 'center' }}>
                                                <Typography color="primary">{'Select All'}</Typography>{' '}
                                            </DialogTitle>
                                            <DialogContent>
                                                {selectAllRecords
                                                    ? `Do you want to unselect all ${
                                                          this.props.response?.page?.filterCount -
                                                          this?.props?.unchecked?.length
                                                      } rows?`
                                                    : `Do you want to select all ${this.props.response?.page?.filterCount} rows?`}
                                            </DialogContent>
                                            <DialogActions
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    justifyItems: 'center',
                                                    minHeight: 90
                                                }}
                                            >
                                                <CustomButton
                                                    variant={'outlined'}
                                                    color="primary"
                                                    onClick={this.handleDialogClose}
                                                    size="small"
                                                >
                                                    {' '}
                                                    {'Cancel'}
                                                </CustomButton>
                                                <CustomButton
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={(e) => this.handleCheck(!selectAllRecords, 'allPages', {})}
                                                >
                                                    {'Ok'}
                                                </CustomButton>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '500px'
                                        }}
                                    >
                                        <Loader type="table" />
                                    </div>
                                )}
                            </div>
                            {10 <= rows?.length && rows?.length !== undefined ? (
                                <StyledTPagination
                                    rowsPerPageOptions={[10, 15, 20]}
                                    component="div"
                                    count={
                                        this.props.tableHandleChange
                                            ? this.props.response?.page?.filterCount
                                            : rows?.length
                                    }
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    style={{ marginBottom: this.props.preEncoded ? 5 : 20 }}
                                />
                            ) : null}
                        </div>
                    </Fade>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dateFormat: state.dateFormat.dateFormat
    };
};

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Index));
