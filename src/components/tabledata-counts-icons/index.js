import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import CustomIcon from '../../components/iconButton';
import VerticalDivider from '../../components/verticalDivider';
//import IconFilter from '../../assets/filterIcon.svg';
import IconPDF from '../../assets/pdfIcon.svg';
import IconExcel from '../../assets/excelIcon.svg';
import { Filter } from 'common';
import samplePdf from '../../common/samplePdf.pdf';
import sampleExcel from '../../common/sampleExcel.xlsx';

const CustomHeaderAndIcons = (props) => {
    const {
        response,
        setFilterKeys,
        handleFilters,
        totalCount,
        filterCount,
        name,
        handleResetFilters,
        handleDownloadData
    } = props;
    return (
        <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xs={6}>
                <Typography variant="h5" color="primary" style={{ cursor: 'pointer', fontWeight: '500' }}>
                    {name
                        ? `${name} : ${totalCount ? totalCount : 0} ${filterCount ? '(' + filterCount + ')' : ''}`
                        : null}

                    {/* { resultsCount === 0 && searchKey !== ''
                        ? 0
                        : resultsCount && searchKey !== ''
                        ? resultsCount
                        : response?.page?.totalCount
                    } 
                    { "("}{resultsCount === 0 && searchKey !== ''
                    ? 0
                    : resultsCount && searchKey !== ''
                    ? resultsCount
                    : response?.data?.length    }{")"}                  */}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={1} alignItems={'flex-end'} justify={'flex-end'}>
                    <Grid item>
                        <a href={sampleExcel} download="sampleExcel.xlsx" onClick={handleDownloadData}>
                            <CustomIcon src={IconExcel} />
                        </a>
                    </Grid>
                    <Grid item>
                        <VerticalDivider />
                    </Grid>
                    <Grid item>
                        <a href={samplePdf} download="samplePdf.pdf">
                            <CustomIcon src={IconPDF} />
                        </a>
                    </Grid>
                    <Grid item>
                        <VerticalDivider />
                    </Grid>
                    <Grid item>
                        <Filter
                            screenId={2}
                            response={response}
                            setFilterKeys={setFilterKeys}
                            handleFilters={handleFilters}
                            handleResetFilters={handleResetFilters}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CustomHeaderAndIcons;
