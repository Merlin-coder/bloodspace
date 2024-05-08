import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Index, CustomHeaderAndIcons, CustomTable } from '../../components';
import { CustomSearch } from '../../common';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './style';
import { getData, clearData, getReportData } from '../../redux/actions/scGenericApiCalls';
import { clearFilterCriteria, getFilterCriteria } from 'redux/actions/filters/filtersActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/loader/loader.container';
import HeaderInfo from 'components/header-info-filters';
import { voucher } from 'redux/actions/manage/scManageViewActions';
import { useHistory, useLocation } from 'react-router-dom';
import NoData from 'components/no data';

const CustomReport = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const { name, data } = props;
    const [filterKeys, setFilterKeys] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [resultCount, setResultsCount] = useState('');
    const [showFilters, setShowFilters] = useState('');
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState('');
    const [sortValue, setSortValue] = useState({});
    const [rowData, setRowData] = useState({});

    let mData = data.length > 1 ? data[1] : data[0];
    let url = mData.link.split('/').slice(2).join('/');
    const CurrentSubMenu = mData.label;
    const dispatch = useDispatch();
    const apiResponse = useSelector((state) => state.getData);

    const { loading, responseData } = apiResponse;
    const urlEndPoint = mData.urlEndPoint;
    // const screenName = location.pathname.split('/').slice(3)[0];
    // let filtervalue;
    // if (screenName === 'movements') {
    //     filtervalue = JSON.stringify([{ key: 'status', value: 'movements' }]);
    // }
    // if (screenName === 'assigned') {
    //     filtervalue = JSON.stringify([{ key: 'status', value: 'assigned' }]);
    // }
    // if (screenName === 'fated') {
    //     filtervalue = JSON.stringify([{ key: 'status', value: 'fated' }]);
    // }
    // if (screenName === 'dereservation') {
    //     filtervalue = JSON.stringify([{ key: 'status', value: 'dereservation' }]);
    // }
    const tableHandleChange = (changeValue, pageNumberOrPageSizeFlag) => {
        if (searchKey) {
            if (changeValue > pageNum) {
                dispatch(getData(urlEndPoint, pageSize, changeValue * 3, searchKey));
            }
        } else if (pageNumberOrPageSizeFlag) {
            if (sortValue && sortValue.key) {
                dispatch(getData(urlEndPoint, pageSize, changeValue + 3, '', '', sortValue));
            } else if (changeValue > pageNum) {
                dispatch(getData(urlEndPoint, pageSize, changeValue + 3, ''));
            }
        } else {
            setPageSize(changeValue);
            dispatch(getData(urlEndPoint, changeValue * 3, 1, ''));
        }

        if (changeValue > pageNum) {
            setPageNum(changeValue);
        }
    };

    const sortOperation = (sort) => {
        setSortValue(sort);
        if (showFilters) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, '', showFilters, sort));
        } else {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, '', '', sort));
        }
    };

    const handleFilters = (filterData) => {
        setShowFilters(filterData);
        dispatch(clearData());
        dispatch(getData(urlEndPoint, pageSize * 3, 1, '', filterData));
    };

    const handleResetFilters = () => {
        showFilters ? dispatch(getData(urlEndPoint, pageSize * 3, 1, '')) : null;
        setShowFilters('');
    };

    const handleSearch = (searchKey) => {
        setSearchKey(searchKey);
        if (searchKey.length > 2) {
            dispatch(getData(urlEndPoint, pageSize * 3, 1, searchKey));
        }
    };

    const handleSearchDelete = () => {
        setSearchKey('');
        dispatch(getData(urlEndPoint, pageSize * 3, 1, ''));
    };

    const handleVoucher = (rowId) => {
        localStorage.setItem('previousPath', JSON.stringify(props.path));
        // let currentRowId = { ...rowId, previousPath: props.path };
        // localStorage.setItem('voucherData', JSON.stringify(currentRowId));

        // dispatch(voucher(currentRowId));
    };

    useEffect(() => {
        if (!showFilters) {
            setTotalCount(responseData?.page?.totalCount);
        }
    }, [responseData]);

    useEffect(() => {
        dispatch(getReportData(urlEndPoint, pageSize * 3, 1));
        dispatch(getFilterCriteria(urlEndPoint));

        return () => {
            setShowFilters('');
            setPageNum(0);
            dispatch(clearData());
            dispatch(clearFilterCriteria());
        };
    }, [urlEndPoint]);
    return (
        <>
            <Paper elevation={0} className={classes.paper}>
                <Grid container>
                    <Grid container justifyContent="space-between" alignItems="center" className={classes.header}>
                        <Grid item xs={4}>
                            <CustomSearch
                                value={searchKey}
                                handleChange={(e) => (e.target.value !== ' ' ? handleSearch(e.target.value) : null)}
                                size="md"
                                placeholder={'Search'}
                                handleSearchDelete={handleSearchDelete}
                                loader={searchKey && searchKey.length < 3 ? true : searchKey && loading}
                            />
                        </Grid>
                        <Grid item xs={8} className={classes.tableResultsCount}>
                            <CustomHeaderAndIcons
                                // name={CurrentSubMenu}
                                // response={responseData.data ? responseData : response}
                                // totalCount={apiBehavior === 'live' ? totalCount : response?.data?.length}
                                // filterCount={
                                //     showFilters || searchKey.length > 2 ? responseData?.page?.filterCount : null
                                // }
                                setFilterKeys={setFilterKeys}
                                handleResetFilters={handleResetFilters}
                                handleFilters={handleFilters}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            {responseData && responseData.header && (
                <Paper elevation={0} className={classes.headerInfoPaper}>
                    <HeaderInfo collectionName={urlEndPoint} pageSize={pageSize} header={responseData.header} />
                </Paper>
            )}

            <Paper elevation={0} className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} className={classes.tableDiv}>
                        {loading ? (
                            <div className={classes.loaderDivStyles}>
                                <Loader />
                            </div>
                        ) : responseData?.data?.length > 0 ? (
                            <CustomTable
                                response={responseData}
                                rowsPerPage={10}
                                selectedSearch={null}
                                setRowData={setRowData}
                                setResultsCount={setResultsCount}
                                tableHandleChange={tableHandleChange}
                                sortOperation={sortOperation}
                                sort={sortValue}
                                history={history}
                                handleVoucher={handleVoucher}
                                currentLocation={url}
                            />
                        ) : (
                            <NoData />
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default CustomReport;
