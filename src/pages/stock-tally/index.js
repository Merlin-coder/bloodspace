import { Grid, Paper, Typography, useTheme } from '@material-ui/core';
import { CustomButton } from 'common';
import SelectOption from 'components/select';
import React, { useState } from 'react';
import { useStyles } from './styles';
import CustomIcon from 'components/iconButton';
import HeaderIcons from 'components/header-button-and-icons';
import DashboardTable from 'pages/dashboard/table';
import { getData } from 'redux/actions/scGenericApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import StickyHeadTable from './tallyTable';
import { CustomTable } from 'components';
import { Divider } from '@material-ui/core';
// import iconFilter from '../../assets/iconFilter'
const StockTally = () => {
    const data = [
        {
            status: 'Available',
            value: '5000'
        },
        {
            status: 'Detected',
            value: '0'
        },
        {
            status: 'Undetected',
            value: '4995'
        },
        {
            status: 'Memo',
            value: '5'
        },
        {
            status: 'Additional',
            value: '0'
        }
    ];
    const childData = [
        {
            name: 'Red Cell',
            value: '500'
        },
        {
            name: 'Auologous',
            value: '1000'
        },
        {
            name: 'Platelets',
            value: '499'
        },
        {
            name: 'Plasma',
            value: '500'
        }
    ];
    const [tableData, setTableData] = React.useState([]);
    const dispatch = useDispatch();
    const [showTable, setShowTable] = useState(false);
    const apiResponse = useSelector((state) => state.getData);
    const [tableHeader, setTableHeader] = useState('');
    let { filterCriteria } = useSelector((state) => state.getFiltersCriteria);
    const { loading, responseData } = apiResponse;
    const [selectedValue, setSelectedValue] = React.useState();
    const theme = useTheme();
    React.useEffect(() => {
        dispatch(getData('refSku', 10 * 3, 1));
        setTableData(data);
    }, []);
    const handleDataChange = (item) => {
        const filter = tableData.filter((val) => val.status == item.status);
        setTableData(filter);
        setShowTable(true);
    };
    React.useEffect(() => {
        if (tableData.length === 1) {
            setTableHeader(tableData[0]);
        }
    }, [tableData]);
    const classes = useStyles();
    return (
        <>
            {tableData.length > 0 && (
                <div className={classes.root}>
                    <Paper elevation={0} className={classes.paper}>
                        <Grid container justify="space-between" spacing={2}>
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={7}>
                                        <SelectOption />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomButton width={'120px'} variant="contained" color="primary">
                                            Scan
                                        </CustomButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={2} justify="flex-end">
                                    <Grid item xs={2}>
                                        <HeaderIcons showIcons={['filters']} />
                                    </Grid>
                                    <Grid item>
                                        <CustomButton variant="contained" width={'120px'} color="primary">
                                            Save
                                        </CustomButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Grid container justify="space-between">
                        {tableData.map((item, i) => (
                            <Grid item key={i} style={{ width: '19%' }}>
                                <Grid container spacing={2} direction="column">
                                    <Grid item>
                                        <Paper className={classes.card} elevation={0}>
                                            <Grid
                                                container
                                                justify="center"
                                                alignItems="center"
                                                direction="column"
                                                spacing={1}
                                            >
                                                <Grid item>
                                                    <Typography
                                                        color="primary"
                                                        variant="subtitle1"
                                                        style={{ fontWeight: 'bold' }}
                                                    >
                                                        {item.status}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        color="primary"
                                                        style={{ fontWeight: 'bold' }}
                                                        variant="h4"
                                                    >
                                                        {item.value}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item>
                                        <Paper className={classes.card} style={{ minHeight: '400px' }} elevation={0}>
                                            {item.value > 0 &&
                                                childData.map((val, i) => (
                                                    <>
                                                        <Grid
                                                            container
                                                            style={{
                                                                padding: '4px 20px',
                                                                width: '90%',
                                                                margin: '0 auto',
                                                                backgroundColor:
                                                                    val.name === selectedValue?.name &&
                                                                    theme.palette.primary.light,
                                                                cursor: 'pointer'
                                                            }}
                                                            justify="space-between"
                                                            alignItems="center"
                                                            onClick={() => {
                                                                handleDataChange(item), setSelectedValue(val);
                                                            }}
                                                            key={i}
                                                        >
                                                            <Grid item>
                                                                <Typography
                                                                    variant="subtitle1"
                                                                    onClick={() => {
                                                                        handleDataChange(item);
                                                                    }}
                                                                    style={{
                                                                        color:
                                                                            val.name === selectedValue?.name &&
                                                                            theme.palette.primary.main
                                                                    }}
                                                                >
                                                                    {val.name}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography
                                                                    variant="subtitle2"
                                                                    color="primary"
                                                                    style={{
                                                                        color:
                                                                            val.name === selectedValue?.name &&
                                                                            theme.palette.primary.main
                                                                    }}
                                                                >
                                                                    {val.value}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider
                                                            style={{
                                                                width: '90%',
                                                                margin: '0 auto'
                                                            }}
                                                        />
                                                    </>
                                                ))}
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                        {responseData.status && showTable && (
                            <Grid item style={{ width: '80%' }}>
                                <Paper elevation={0} className={classes.paper}>
                                    <Grid container direction="column">
                                        <Grid item xs>
                                            <Grid container alignItems="center" justify="space-between">
                                                <Grid item>
                                                    <Typography color="primary" variant="h6">
                                                        {`${tableHeader.status} > ${selectedValue?.name} < ${selectedValue?.value}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <CustomButton
                                                        color="primary"
                                                        onClick={() => {
                                                            setShowTable(false), setTableData(data), setSelectedValue();
                                                        }}
                                                        variant="outlined"
                                                    >
                                                        Back
                                                    </CustomButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs>
                                            <CustomTable response={responseData} />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                </div>
            )}
        </>
    );
};

export default StockTally;
