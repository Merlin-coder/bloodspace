import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import {
    CustomButton, Filter, RequestUnitFilter, RequestBatchFilter, ActivityUnitFilter, ActivityBatchFilter, NotifyUnitFilter,
    NotifyBatchFilter, WastedUnitFilter, WastedBatchFilter, TransfusedUnitFilter, TransfusedBatchFilter, RecipientFilter, UserFilter, SwapoutFilter
} from 'common';
import VerticalDivider from 'components/verticalDivider';
import CustomIcon from '../../components/iconButton';
import samplePdf from '../../common/samplePdf.pdf';
import sampleExcel from '../../common/sampleExcel.xlsx';
import IconPDF from '../../assets/pdfIcon.svg';
import IconExcel from '../../assets/excelIcon.svg';
import { useStyles } from './style';

const HeaderIcons = (props) => {
    const {
        showIcons,
        handleDownloadData,
        label,
        handleOpenAdd,
        response,
        setFilterKeys,
        handleFilters,
        handleResetFilters,
        name,
        totalCount,
        filterCount,
        selectedFilters,
        refresh,
        deletedChip,
        setChipIdAndName,
        setFilterKeysObject,
        disabled,
        enableExcell,
        enablePdf,
        remainingChips,
        chipNameAndId,
        enableFilter,
        enalbeAddButton,
        isRequestUnit,
        isRequestBatch,
        isActivityUnit,
        isActivityBatch,
        isNotifyUnit,
        isNotifyBatch,
        isWastedUnit,
        isWastedBatch,
        isTransfusedUnit,
        isTransfusedBatch,
        chipIdAndName,
        isRecipient,
        isUser,
        isSwapout,
    } = props;
    const classes = useStyles();
    return (
        <Grid container alignItems={'flex-end'} justify={'flex-end'}>
            {showIcons.includes('excell') && enableExcell ? (
                <>
                    <Grid item className={classes.iconStyles}>
                        <a onClick={handleDownloadData} style={{ pointerEvents: enableExcell ? null : 'none' }}>
                            <CustomIcon src={IconExcel} />
                        </a>
                    </Grid>
                    <Grid item>
                        <VerticalDivider />
                    </Grid>
                </>
            ) : null}

            {showIcons.includes('pdf') ? (
                <>
                    <Grid item className={classes.iconStyles}>
                        <a
                            href={samplePdf}
                            download="samplePdf.pdf"
                            style={{ pointerEvents: enablePdf ? null : 'none' }}
                        >
                            <CustomIcon src={IconPDF} />
                        </a>
                    </Grid>
                    <Grid item>
                        <VerticalDivider />
                    </Grid>
                </>
            ) : null}

            {showIcons.includes('filters') ? (
                <>
                    {isRequestUnit === true ? (
                        <Grid item className={classes.iconStyles}>
                            <RequestUnitFilter
                                screenId={2}
                                response={response}
                                setFilterKeys={setFilterKeys}
                                handleFilters={handleFilters}
                                handleResetFilters={handleResetFilters}
                                selectedFilters={selectedFilters}
                                refresh={refresh}
                                deletedChip={deletedChip}
                                setChipIdAndName={setChipIdAndName}
                                setFilterKeysObject={setFilterKeysObject}
                                remainingChips={remainingChips}
                                chipIdAndName={chipIdAndName}
                                enableFilter={enableFilter}
                                isRequestUnit={isRequestUnit}
                            />
                        </Grid>
                    ) :
                        isRequestBatch === true ? (
                            <Grid item className={classes.iconStyles}>
                                <RequestBatchFilter
                                    screenId={2}
                                    response={response}
                                    setFilterKeys={setFilterKeys}
                                    handleFilters={handleFilters}
                                    handleResetFilters={handleResetFilters}
                                    selectedFilters={selectedFilters}
                                    refresh={refresh}
                                    deletedChip={deletedChip}
                                    setChipIdAndName={setChipIdAndName}
                                    setFilterKeysObject={setFilterKeysObject}
                                    remainingChips={remainingChips}
                                    chipIdAndName={chipIdAndName}
                                    enableFilter={enableFilter}
                                    isRequestBatch={isRequestBatch}
                                />
                            </Grid>
                        ) :
                            isActivityUnit === true ? (
                                <Grid item className={classes.iconStyles}>
                                    <ActivityUnitFilter
                                        screenId={2}
                                        response={response}
                                        setFilterKeys={setFilterKeys}
                                        handleFilters={handleFilters}
                                        handleResetFilters={handleResetFilters}
                                        selectedFilters={selectedFilters}
                                        refresh={refresh}
                                        deletedChip={deletedChip}
                                        setChipIdAndName={setChipIdAndName}
                                        setFilterKeysObject={setFilterKeysObject}
                                        remainingChips={remainingChips}
                                        chipIdAndName={chipIdAndName}
                                        enableFilter={enableFilter}
                                        isActivityUnit={isActivityUnit}
                                    />
                                </Grid>
                            ) :
                    isActivityBatch === true ? (
                    <Grid item className={classes.iconStyles}>
                        <ActivityBatchFilter
                            screenId={2}
                            response={response}
                            setFilterKeys={setFilterKeys}
                            handleFilters={handleFilters}
                            handleResetFilters={handleResetFilters}
                            selectedFilters={selectedFilters}
                            refresh={refresh}
                            deletedChip={deletedChip}
                            setChipIdAndName={setChipIdAndName}
                            setFilterKeysObject={setFilterKeysObject}
                            remainingChips={remainingChips}
                            chipIdAndName={chipIdAndName}
                            enableFilter={enableFilter}
                                            isActivityBatch={isActivityBatch}
                        />
                    </Grid>
                                ) :
                                    isNotifyUnit === true ? (
                                        <Grid item className={classes.iconStyles}>
                                            <NotifyUnitFilter
                                                screenId={2}
                                                response={response}
                                                setFilterKeys={setFilterKeys}
                                                handleFilters={handleFilters}
                                                handleResetFilters={handleResetFilters}
                                                selectedFilters={selectedFilters}
                                                refresh={refresh}
                                                deletedChip={deletedChip}
                                                setChipIdAndName={setChipIdAndName}
                                                setFilterKeysObject={setFilterKeysObject}
                                                remainingChips={remainingChips}
                                                chipIdAndName={chipIdAndName}
                                                enableFilter={enableFilter}
                                                isNotifyUnit={isNotifyUnit}
                                            />
                                        </Grid>
                                    ) :
                    isNotifyBatch === true ? (
                    <Grid item className={classes.iconStyles}>
                        <NotifyBatchFilter
                            screenId={2}
                            response={response}
                            setFilterKeys={setFilterKeys}
                            handleFilters={handleFilters}
                            handleResetFilters={handleResetFilters}
                            selectedFilters={selectedFilters}
                            refresh={refresh}
                            deletedChip={deletedChip}
                            setChipIdAndName={setChipIdAndName}
                            setFilterKeysObject={setFilterKeysObject}
                            remainingChips={remainingChips}
                            chipIdAndName={chipIdAndName}
                            enableFilter={enableFilter}
                            isNotifyBatch={isNotifyBatch}
                        />
                    </Grid>
                                        ) :
                                            isWastedUnit === true ? (
                                                <Grid item className={classes.iconStyles}>
                                                    <WastedUnitFilter
                                                        screenId={2}
                                                        response={response}
                                                        setFilterKeys={setFilterKeys}
                                                        handleFilters={handleFilters}
                                                        handleResetFilters={handleResetFilters}
                                                        selectedFilters={selectedFilters}
                                                        refresh={refresh}
                                                        deletedChip={deletedChip}
                                                        setChipIdAndName={setChipIdAndName}
                                                        setFilterKeysObject={setFilterKeysObject}
                                                        remainingChips={remainingChips}
                                                        chipIdAndName={chipIdAndName}
                                                        enableFilter={enableFilter}
                                                        isWastedUnit={isWastedUnit}
                                                    />
                                                </Grid>
                                            ) :
                                                isWastedBatch === true ? (
                                                    <Grid item className={classes.iconStyles}>
                                                        <WastedBatchFilter
                                                            screenId={2}
                                                            response={response}
                                                            setFilterKeys={setFilterKeys}
                                                            handleFilters={handleFilters}
                                                            handleResetFilters={handleResetFilters}
                                                            selectedFilters={selectedFilters}
                                                            refresh={refresh}
                                                            deletedChip={deletedChip}
                                                            setChipIdAndName={setChipIdAndName}
                                                            setFilterKeysObject={setFilterKeysObject}
                                                            remainingChips={remainingChips}
                                                            chipIdAndName={chipIdAndName}
                                                            enableFilter={enableFilter}
                                                            isWastedBatch={isWastedBatch}
                                                        />
                                                    </Grid>
                                                ) :
                                                    isTransfusedUnit === true ? (
                                                        <Grid item className={classes.iconStyles}>
                                                            <TransfusedUnitFilter
                                                                screenId={2}
                                                                response={response}
                                                                setFilterKeys={setFilterKeys}
                                                                handleFilters={handleFilters}
                                                                handleResetFilters={handleResetFilters}
                                                                selectedFilters={selectedFilters}
                                                                refresh={refresh}
                                                                deletedChip={deletedChip}
                                                                setChipIdAndName={setChipIdAndName}
                                                                setFilterKeysObject={setFilterKeysObject}
                                                                remainingChips={remainingChips}
                                                                chipIdAndName={chipIdAndName}
                                                                enableFilter={enableFilter}
                                                                isTransfusedUnit={isTransfusedUnit}
                                                            />
                                                        </Grid>
                                                    ) :
                                                        isTransfusedBatch === true ? (
                                                            <Grid item className={classes.iconStyles}>
                                                                <TransfusedBatchFilter
                                                                    screenId={2}
                                                                    response={response}
                                                                    setFilterKeys={setFilterKeys}
                                                                    handleFilters={handleFilters}
                                                                    handleResetFilters={handleResetFilters}
                                                                    selectedFilters={selectedFilters}
                                                                    refresh={refresh}
                                                                    deletedChip={deletedChip}
                                                                    setChipIdAndName={setChipIdAndName}
                                                                    setFilterKeysObject={setFilterKeysObject}
                                                                    remainingChips={remainingChips}
                                                                    chipIdAndName={chipIdAndName}
                                                                    enableFilter={enableFilter}
                                                                    isTransfusedBatch={isTransfusedBatch}
                                                                />
                                                            </Grid>
                                                        ):
                                                            isRecipient === true ? (
                                                        <Grid item className={classes.iconStyles}>
                                                            <RecipientFilter
                                                                screenId={2}
                                                                response={response}
                                                                setFilterKeys={setFilterKeys}
                                                                handleFilters={handleFilters}
                                                                handleResetFilters={handleResetFilters}
                                                                selectedFilters={selectedFilters}
                                                                refresh={refresh}
                                                                deletedChip={deletedChip}
                                                                setChipIdAndName={setChipIdAndName}
                                                                setFilterKeysObject={setFilterKeysObject}
                                                                remainingChips={remainingChips}
                                                                chipIdAndName={chipIdAndName}
                                                                enableFilter={enableFilter}
                                                                isRecipient={isRecipient}
                                                            />
                                                        </Grid>
                                                            ) :
                                                                isUser === true ? (
                                                                    <Grid item className={classes.iconStyles}>
                                                                        <UserFilter
                                                                            screenId={2}
                                                                            response={response}
                                                                            setFilterKeys={setFilterKeys}
                                                                            handleFilters={handleFilters}
                                                                            handleResetFilters={handleResetFilters}
                                                                            selectedFilters={selectedFilters}
                                                                            refresh={refresh}
                                                                            deletedChip={deletedChip}
                                                                            setChipIdAndName={setChipIdAndName}
                                                                            setFilterKeysObject={setFilterKeysObject}
                                                                            remainingChips={remainingChips}
                                                                            chipIdAndName={chipIdAndName}
                                                                            enableFilter={enableFilter}
                                                                            isUser={isUser}
                                                                        />
                                                                    </Grid>
                                                                ) :
                                                                    isSwapout === true ? (
                                                                        <Grid item className={classes.iconStyles}>
                                                                            <SwapoutFilter
                                                                                screenId={2}
                                                                                response={response}
                                                                                setFilterKeys={setFilterKeys}
                                                                                handleFilters={handleFilters}
                                                                                handleResetFilters={handleResetFilters}
                                                                                selectedFilters={selectedFilters}
                                                                                refresh={refresh}
                                                                                deletedChip={deletedChip}
                                                                                setChipIdAndName={setChipIdAndName}
                                                                                setFilterKeysObject={setFilterKeysObject}
                                                                                remainingChips={remainingChips}
                                                                                chipIdAndName={chipIdAndName}
                                                                                enableFilter={enableFilter}
                                                                                isSwapout={isSwapout}
                                                                            />
                                                                        </Grid>
                                                                    ) : (
                        <Grid item className={classes.iconStyles}>
                            <Filter
                                screenId={2}
                                response={response}
                                setFilterKeys={setFilterKeys}
                                handleFilters={handleFilters}
                                handleResetFilters={handleResetFilters}
                                selectedFilters={selectedFilters}
                                refresh={refresh}
                                deletedChip={deletedChip}
                                setChipIdAndName={setChipIdAndName}
                                setFilterKeysObject={setFilterKeysObject}
                                remainingChips={remainingChips}
                                chipNameAndId={chipNameAndId}
                                enableFilter={enableFilter}
                                isRequestUnit={isRequestUnit}
                            />
                        </Grid>
                    )}
                    <>
                        {showIcons.includes('addButton') ? (
                            <Grid item>
                                <VerticalDivider />
                            </Grid>
                        ) : null}
                    </>
                </>
            ) : null}
            {showIcons.includes('addButton') ? (
                <Grid item className={classes.addButton}>
                    <CustomButton
                        variant="contained"
                        color="primary"
                        fontsize={14}
                        disabled={disabled}
                        onClick={handleOpenAdd}
                    >
                        Add {label}
                    </CustomButton>
                </Grid>
            ) : null}
        </Grid>
    );
};

export default HeaderIcons;
