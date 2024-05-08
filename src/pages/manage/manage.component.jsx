import React from 'react';
import Grid from '@material-ui/core/Grid';
import { CustomTable, CustomHeaderAndIcons, CustomButton } from '../../components';
import { CONSTANTS, CustomSearch } from '../../common';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './style';
import ConfirmationDialog from 'components/confirmations/confirmation.container';
import product from '../../JSON/JProduct.json';
import productType from '../../JSON/JProductType.json';

import summary from '../../JSON/JSummary.json';
import CustomMovementTable from './CustomStockTable';
import { useSelector } from 'react-redux';

const ManageComponent = (props) => {
    const classes = useStyles();
    const {
        response,
        children,
        name,
        handleDialog,
        handleDialogClose,
        onEnterKey,
        dialogOpen,
        setRowData,
        searchKey,
        setSearchKey,
        resultsCount,
        setResultsCount,
        setFilterKeys,
        filterKeys,
        edit,
        setInitialData,
        setSelectValue,
        selectValue,
        tableHandleChange,
        pageSize,
        sortOperation,
        sortValue,
        handleFilters,
        handleSearch,
        loading
        // removeSearchKey
    } = props;
    const { apiBehavior } = useSelector((state) => state.changeResponse);

    const [selected, setSelected] = React.useState(productType.data[0].typeId);
    React.useEffect(() => {
        if (selected && setSelectValue) {
            productType.data.map((pro) => {
                if (pro.typeId === selected)
                    setSelectValue({
                        ...selectValue,
                        productType: pro.description
                    });
            });
        }

        if (searchKey) {
            handleSearch(searchKey);
        }
    }, [selected, searchKey]);

    return (
        <>
            <Paper elevation={0} className={classes.paper}>
                <Grid container>
                    <Grid item xs={5}>
                        <CustomSearch
                            value={searchKey}
                            size="md"
                            placeholder={'Search'}
                            onEnterPress={onEnterKey}
                            handleChange={(e) => (e.target.value !== ' ' ? setSearchKey(e.target.value) : null)}
                            handleSearchDelete={() => setSearchKey('')}
                            loader={searchKey && searchKey.length < 3 ? true : searchKey && loading}
                        />
                    </Grid>
                    <Grid container xs={7} alignItems={'flex-end'} justify={'flex-end'} spacing={2}>
                        <Grid item>{children}</Grid>
                    </Grid>
                    <CustomHeaderAndIcons
                        name={name !== 'Rules' ? name : ''}
                        response={response}
                        resultsCount={resultsCount}
                        searchKey={searchKey}
                        setFilterKeys={setFilterKeys}
                        handleFilters={handleFilters}
                    />
                    <ConfirmationDialog
                        deleteLabel
                        handleDialogClose={handleDialogClose}
                        dialogOpen={dialogOpen}
                        title={CONSTANTS.LABEL_ARE_YOU_SURE}
                        type={'warning'}
                    >
                        <Grid container spacing={2} className={classes.deleteDialog} justify="center">
                            <Grid item>
                                <CustomButton variant="outlined" color="primary" onClick={handleDialog}>
                                    {CONSTANTS.CANCEL}
                                </CustomButton>
                            </Grid>
                            <Grid item>
                                <CustomButton variant="contained" color="primary" onClick={handleDialog}>
                                    {CONSTANTS.CONTINUE}
                                </CustomButton>
                            </Grid>
                        </Grid>
                    </ConfirmationDialog>

                    <Grid container>
                        <Grid item xs={12}>
                            {name === 'Rules' ? (
                                <Grid container spacing={8} style={{ padding: '10px 5px' }}>
                                    <Grid item xs={2}>
                                        <CustomMovementTable
                                            response={summary}
                                            selected={selected}
                                            setSelected={setSelected}
                                        />
                                    </Grid>
                                    {/* <Grid item xs /> */}
                                    <Grid item xs={10}>
                                        <CustomMovementTable noDesc response={product} selected={selected} />
                                    </Grid>
                                </Grid>
                            ) : searchKey ? (
                                <CustomTable
                                    response={response}
                                    rowsPerPage={pageSize}
                                    selectedSearch={apiBehavior !== 'live' ? searchKey : null}
                                    handleDialog={handleDialog}
                                    handleEditDialog={edit}
                                    setRowData={setRowData}
                                    setResultsCount={setResultsCount}
                                    setInitialData={setInitialData}
                                    tableHandleChange={tableHandleChange}
                                />
                            ) : (
                                <CustomTable
                                    response={response}
                                    rowsPerPage={pageSize}
                                    setRowData={setRowData}
                                    handleDialog={handleDialog}
                                    handleEditDialog={edit}
                                    selectedSearch={filterKeys ? filterKeys : null}
                                    setResultsCount={setResultsCount}
                                    setInitialData={setInitialData}
                                    tableHandleChange={tableHandleChange}
                                    sortOperation={sortOperation}
                                    sort={sortValue}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ManageComponent;
