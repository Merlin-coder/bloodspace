import React, { useEffect, useState, useRef } from 'react';
import { StockPageStyles } from './style';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { Grid, InputLabel, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SelectOption from '../../../components/select';
//import CustomButton from '../../../components/button';
// import Index from './Index';
import CONSTANTS from '../../../common/constants';
import response from '../../../JSON/Sample.json';
import productCode from '../../../JSON/productCode1.json';
import CustomChip from '../../../components/chip/index';
import { CustomButton, CustomSearch, Index, Filter } from 'common';
//import IconFilter from '../../../assets/filterIcon.svg';
import IconPDF from '../../../assets/pdfIcon.svg';
import IconExcel from '../../../assets/excelIcon.svg';
import VerticalDivider from '../../../components/verticalDivider';
import CustomIcon from '../../../components/iconButton';
import { useSelector } from 'react-redux';

const StockPage1 = () => {
    const { userAccessLoading, userAccessData } = useSelector((state) => state.getUserAccess);
    //"BS-DR-0004"
    const [codesAndDescription, setCodesAndDescription] = useState({}); //to check codes related to this submenu
    const [accessableCodes, setAccessableCodes] = useState([]);

    useEffect(() => {
        if (!userAccessLoading && userAccessData && userAccessData.data) {
            let currentMoudleData = userAccessData.data[0]?.moduleId
                .filter((item) => item['drawer-code'].includes('BS-DR-0004'))
                .map((item) => item.code);
            let currentMoudleDatObject = userAccessData.data[0]?.moduleId
                .filter((item) => item['drawer-code'].includes('BS-DR-0004'))
                .map((item) => {
                    let { code, name, description } = item;
                    return { code, name, description };
                });
            setCodesAndDescription(currentMoudleDatObject);
            setAccessableCodes(currentMoudleData);
        }
    }, [userAccessData]);
    //  const maxWidth1304 = useMediaQuery('(max-width:1364px)');
    const classes = StockPageStyles();
    const [selectValue, setSelectValue] = useState({
        hospital: '',
        location: '',
        device: ''
    });

    const [chipData, setChipData] = useState({ location: [], device: [] });
    const [isProductCode, setIsProductCode] = useState(true);
    const [search, setSearch] = useState();
    // const [selectedSearch, setSelectedSearch] = useState();
    const [setFilterKeys] = useState('');
    // console.log(filterKeys);
    const inputRef = useRef(null);
    const [selectedSearch, setSelectedSearch] = useState();

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearch(val);
    };
    const handleSearchDelete = () => {
        setSearch('');
        inputRef.current.value = '';
    };
    // const handleSearchSet = () => {
    //     setSelectedSearch(search);
    // };

    const handleDelete = (chipToDelete) => () => {
        if (chipData.location.includes(chipToDelete)) {
            const value = chipData.location.filter((chip) => chip != chipToDelete);
            setChipData({ ...chipData, location: value });
        } else {
            const value2 = chipData.device.filter((chip) => chip != chipToDelete);
            setChipData({ ...chipData, device: value2 });
        }
    };

    const handleChip = () => {
        if (selectValue.location) {
            if (selectValue.location !== 'Select Location') {
                setChipData({
                    ...chipData,
                    location: [...chipData.location, selectValue.location]
                });
            }
        }
    };

    const handleChip2 = () => {
        if (selectValue.device) {
            if (selectValue.device !== 'Select Device') {
                setChipData({ ...chipData, device: [...chipData.device, selectValue.device] });
            }
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        if (!(event.target.name === 'option')) {
            if (
                chipData.location.includes(event.target.value) === false &&
                chipData.device.includes(event.target.value) === false
            ) {
                setSelectValue({
                    ...selectValue,
                    [event.target.name]: value
                });
            }
        }
    };

    const hospitalName = [
        { name: 'Location', key: 1 },
        { name: 'Location 2', key: 2 },
        { name: 'Location 3', key: '3' }
    ];
    const Location = [
        { name: 'Location', key: 1 },
        { name: 'Location 2', key: 2 },
        { name: 'Location 3', key: '3' }
    ];
    const Device = [
        { name: 'Device', key: 4 },
        { name: 'Device 2', key: 5 },
        { name: 'Device 3', key: '6' }
    ];

    useEffect(() => {
        if (selectValue.location) {
            handleChip();
        }
    }, [selectValue.location]);
    useEffect(() => {
        if (selectValue.device) {
            handleChip2();
        }
    }, [selectValue.device]);
    // console.log(accessableCodes, 'accessableCodes');

    return (
        <Grid container className={classes.root}>
            <Grid container justify="space-between" className={classes.rootInout} alignItems="flex-end">
                <Grid item xs={9}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_SEARCHHOSPITAL}</InputLabel>
                            <SelectOption
                                label="Select Hospital"
                                onChange={handleChange}
                                options={hospitalName}
                                value={selectValue.hospital}
                                name="hospital"
                                disabled={!accessableCodes?.includes('BS-MO-1015')}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_LOCATION}</InputLabel>
                            <SelectOption
                                label="Select Location"
                                name="location"
                                onChange={handleChange}
                                options={Location}
                                value={selectValue.location}
                                //  handleChip={handleChip}
                                disabled={!accessableCodes?.includes('BS-MO-1016')}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <InputLabel className={classes.inputLabel}>{CONSTANTS.LABEL_STORAGE}</InputLabel>
                            <SelectOption
                                label="Select Device"
                                name="device"
                                onChange={handleChange}
                                options={Device}
                                value={selectValue.device}
                                //   handleChip={handleChip}
                                disabled={!accessableCodes?.includes('BS-MO-1017')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs></Grid>
                {/* enableExcell={accessableCodes?.includes('BS-MO-1052')}
                enablePdf={accessableCodes?.includes('BS-MO-1053')} */}
                <Grid item className={classes.buttonGroup} xs={3}>
                    <Grid container justify="flex-end" alignItems="center" spacing={1}>
                        <Grid item>
                            <CustomIcon disabled={!accessableCodes?.includes('BS-MO-1052')} src={IconExcel} />
                        </Grid>
                        <Grid item>
                            <VerticalDivider />
                        </Grid>
                        <Grid item>
                            <CustomIcon disabled={!accessableCodes?.includes('BS-MO-1053')} src={IconPDF} />
                        </Grid>
                        <Grid item>
                            <VerticalDivider />
                        </Grid>
                        <Grid item>
                            <Filter screenId={2} response={response} setFilterKeys={setFilterKeys} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid className={classes.chipSection}>
                <CustomChip dataArray={chipData.location} handleDelete={handleDelete} />
                <CustomChip dataArray={chipData.device} handleDelete={handleDelete} />
            </Grid>

            <Grid container>
                <Paper elevation={0} variant="outline" className={classes.paper} alignItems="flex-end">
                    <Grid container>
                        <Grid item xs={4} className={classes.searchGrid}>
                            <CustomSearch
                                handleChange={handleSearch}
                                handleSearchDelete={handleSearchDelete}
                                placeholder="Product Code /  Count"
                                inputRef={inputRef}
                                disabled={
                                    !(accessableCodes.includes('BS-MO-1021') || accessableCodes.includes('BS-MO-1020'))
                                }
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        className={classes.paperContainer}
                        alignItems={isProductCode ? 'baseline' : 'flex-start'}
                        wrap="nowrap"
                    >
                        <Grid item className={classes.paperItem}>
                            {isProductCode ? (
                                <CustomizedTables isProductCode />
                            ) : (
                                <CustomizedTables
                                    response={productCode}
                                    noDesc
                                    setIsProductCode={setIsProductCode}
                                    handleSearchDelete={handleSearchDelete}
                                    setSelectedSearch={setSelectedSearch}
                                />
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12} className={classes.bigtable}>
                                    {isProductCode === true ? (
                                        <CustomizedTables
                                            selectedSearch={search}
                                            response={productCode}
                                            setIsProductCode={setIsProductCode}
                                            handleSearchDelete={handleSearchDelete}
                                            setSelectedSearch={setSelectedSearch}
                                        />
                                    ) : (
                                        selectedSearch && (
                                            <Index
                                                selectedSearch={search ? search : selectedSearch}
                                                response={response}
                                            />
                                        )
                                    )}
                                    {/*{console.log(selectedSearch)}*/}
                                </Grid>
                                {isProductCode || (
                                    <Grid item className={classes.isProductCodeBtn}>
                                        <CustomButton
                                            variant="outlined"
                                            color="primary"
                                            className={classes.backLink}
                                            onClick={() => {
                                                setIsProductCode(true);
                                                handleSearchDelete();
                                            }}
                                        >
                                            {CONSTANTS.BACK}
                                        </CustomButton>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('O Positive', 125),
    createData('O Negative', 458),
    createData('A Positive', 625),
    createData('A Negative', 312),
    createData('B Positive', 103),
    createData('B Negative', 178),
    createData('AB Positive', 253),
    createData('AB Negative', 253),
    createData('Oh Positive', 228),
    createData('Oh Negative', 113)
];

const useStyles = makeStyles((theme) => ({
    root: {
        border: `1px solid ${theme.palette.colors.gray.light}`,
        borderRadius: '10px 10px 0px 0px',
        '& .MuiTableCell-sizeSmall': {
            padding: '14px 24px 16px 16px'
        },
        overflowX: 'auto',
        height: '55.2vh'
    },
    table: {
        minWidth: 240
    },
    rowValue: {
        minWidth: '80px',
        fontSize: 14,
        fontWeight: '500',
        backgroundColor: theme.palette.list.main,
        borderRadius: '50px',
        color: theme.palette.colors.black,
        padding: '3px 30px'
    },
    summary: {
        fontSize: (isProductCode) => (isProductCode ? '15px' : '15px'),
        color: theme.palette.primary.main
    },
    summaryProductCode: {
        fontSize: '13px',
        color: theme.palette.primary.main,
        cursor: 'pointer',
        marginLeft: '20px'
    },

    productRowValue: {
        fontSize: '13px',
        color: theme.palette.colors.gray.main,
        marginRight: '20px'
    },
    productDesc: {
        fontSize: '13px',
        color: theme.palette.colors.gray.main
    },
    tableHead: {
        backgroundColor: '#F2F7FD',
        color: theme.palette.primary.main
    }
}));
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.colors.gray.darkGrayishBlue,
        color: theme.palette.common.white
    },
    body: {
        fontSize: '13px'
    }
}))(TableCell);
const StyledTableCellValue = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.colors.white
    }
}))(TableRow);

export function CustomizedTables(props) {
    const [row, setRow] = useState();
    const {
        response,
        setIsProductCode,
        selectedSearch,
        setSelectedSearch,
        isProductCode,
        noDesc,
        handleSearchDelete
    } = props;
    const classes = useStyles(isProductCode);

    const getData = () => {
        if (response) setRow(response.data);
    };

    function filterData() {
        setRow((row) => {
            if (selectedSearch) {
                const filterRow = row.filter((row1) => {
                    const valuesOfRow = Object.values(row1);
                    let hasNestedObjects = valuesOfRow.map((item) => {
                        if (typeof item === 'object') {
                            return Object.values(item);
                        } else {
                            return item;
                        }
                    });
                    const allValuesInRow = hasNestedObjects.flat();
                    return allValuesInRow.toString().toLowerCase().includes(selectedSearch.toLowerCase());
                });
                setRow(filterRow);
            } else {
                setRow(response.data);
            }
        });
    }

    useEffect(() => {
        if (response) {
            getData();
            filterData();
        }
        isProductCode && setRow();
    }, [response, selectedSearch]);

    return (
        <TableContainer style={{ overflowX: 'auto', height: '55.2vh' }} className={classes.root}>
            <div>
                <Table
                    stickyHeader
                    className={classes.table}
                    style={{ overflowX: 'auto' }}
                    aria-label="customized table"
                >
                    <TableHead>
                        <TableRow classname={classes.tableHead}>
                            <TableCell>
                                <span className={classes.summary}>{response ? 'Product Code' : 'Summary'}</span>
                            </TableCell>
                            {response && !noDesc && (
                                <TableCell align="left">
                                    <span className={classes.summary}>Description</span>
                                </TableCell>
                            )}
                            <TableCell align={response ? 'left' : 'center'}>
                                <span className={classes.summary}>{response ? 'Counts' : '2648 units'}</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {row ? (
                        <TableBody>
                            {row.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell
                                        size="small"
                                        component="th"
                                        scope="row"
                                        className={classes.summaryProductCode}
                                    >
                                        <span
                                            className={classes.summaryProductCode}
                                            onClick={() => {
                                                setIsProductCode(false);
                                                handleSearchDelete();
                                                setSelectedSearch(row.isbtCode);
                                            }}
                                        >
                                            {' '}
                                            {row.isbtCode}{' '}
                                        </span>
                                    </StyledTableCell>{' '}
                                    {response && !noDesc && (
                                        <StyledTableCellValue size="small" align="left">
                                            <span className={classes.productDesc}>{row.isbtDesc}</span>
                                        </StyledTableCellValue>
                                    )}
                                    <StyledTableCellValue size="small" align="left">
                                        <span className={classes.productRowValue}>{row.count}</span>
                                    </StyledTableCellValue>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            {rows.map((row1) => (
                                <StyledTableRow key={row1.name}>
                                    <StyledTableCell
                                        size="small"
                                        component="th"
                                        scope="row"
                                        className={classes.rowNames}
                                    >
                                        <span> {row1.name} </span>
                                    </StyledTableCell>

                                    <StyledTableCellValue size="small" align="center">
                                        <span className={classes.rowValue}>{row1.calories}</span>
                                    </StyledTableCellValue>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </div>
        </TableContainer>
    );
}

export default StockPage1;
