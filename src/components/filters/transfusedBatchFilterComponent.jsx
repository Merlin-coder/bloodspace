import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import filterIcon from 'assets/filterIcon.svg';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import useTheme from '@material-ui/core/styles/useTheme';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeView from '@material-ui/lab/TreeView';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import TreeItem from '@material-ui/lab/TreeItem';
import { animated, useSpring } from 'react-spring/web.cjs';
import { useStyles, useTreeItemStyles } from './filter.style';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomButton from '../button';
import { Checkbox, DatePicker, DateTimePicker } from 'common';
import CONSTANTS from '../../common/constants';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import Slider from '@material-ui/core/Slider';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomSearch from '../../common/search';
import CustomChip from '../chip';
import Cookies from 'universal-cookie';
import CustomInput from 'components/inputfeild';
import { Switch } from '@material-ui/core';
import Loader from 'components/loader/loader.container';

const drawerWidth = 400;

function StyledTreeItem(props) {
    const classes = useTreeItemStyles({});
    const { labelText, ...other } = props;
    return (
        <TreeItem
            label={
                <div className={classes.labelRoot} style={{ zIndex: '9999 !important' }}>
                    {/* <LabelIcon color="action" className={classes.labelIcon} /> */}
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                </div>
            }
            classes={{
                content: classes.content,
                root: classes.root,
                label: classes.label
            }}
            TransitionComponent={TransitionComponent}
            {...other}
        />
    );
}

function TransitionComponent(props) {
    const style = useSpring({
        from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
        }
    });
    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

function valuetext(value) {
    return `${value}°C`;
}

const TransfusedBatchFilterComponent = (props) => {
    const classes = useStyles();

    const theme = useTheme();
    const cookies = new Cookies();
    let filterIconPosition = cookies.get('FilterPosition');

    if (!filterIconPosition) {
        filterIconPosition = {};
        filterIconPosition.top = '127px';
        filterIconPosition.left = '95.3%';
    }
    const {
        isDrawerOpen,
        toggleDrawer,
        expandedNodes,
        resetFilter,
        filterSubmit,
        expirationEndDate,
        expirationStartDate,
        screenId,
        handleChipDelete,
        handleChipChanges,
        chipData,
        dragElement,
        deviceDisplay,
        setDeviceDisplay,
        isDraging,
        // handleSearchValue,
        // searchedDeviceList,
        showFilters,
        filtersObject,
        allFilterValues,
        filterItemNames,
        handleSearchChange,
        handleSearchDelte,
        rowData,
        range,
        handleRangeComitted,
        value,
        handleRangeChange,
        setCurrentItem,
        handleEndDateChange,
        handleStartDateChange,
        dateObjects,
        dates,
        handleRangeInput,
        handleCheckBoxLimit,
        filterLabels,
        switchFilter,
        handleSwitchChange,
        setSwitchItem,
        filtersLoading,
        enableFilter
    } = props;
    console.log('showFilters', showFilters)
    console.log('dateobjects', dateObjects)
    console.log('filterLabels', filterLabels)
    console.log('allFilterValues', allFilterValues)
    console.log('rowData', rowData)

    const FilterCheckBOx = ({ value }) => (
        <FormControlLabel
            style={{ marginLeft: 1 }}
            control={<Checkbox color="primary" name={value} checked={chipData.includes(value)} />}
            label={<span className="checkboxLabel">{value}</span>}
        />
    );

    // let deviceItems = '';
    // if (filterData && filterData.device) {
    //     if (searchedDeviceList.length > 0) {
    //         deviceItems = searchedDeviceList.map((k) => (
    //             <FilterCheckBOx value={k} key={k} />
    //         ));
    //     } else {
    //         let deviceArray = [];
    //         for (let i = 0; i < 5 + deviceDisplay; i++) {
    //             if (filterData.device[i]) {
    //                 deviceArray.push(filterData.device[i]);
    //             }
    //         }
    //         deviceItems = deviceArray.map((k) => (
    //             <FilterCheckBOx value={k} key={k} />
    //         ));
    //     }
    // }

    //<div onMouseDown={dragElement} onClick={isDraging ? toggleDrawer(false) : toggleDrawer(true)}>
    //the above line is for dragging  and making filter icon to disappear
    return (
        <div>
            <div onMouseDown={null} onClick={toggleDrawer(true)}>
                <IconButton disabled={!enableFilter}>
                    <img src={filterIcon} />
                </IconButton>
            </div>
            <SwipeableDrawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                style={{
                    width: drawerWidth
                }}
            >
                <div className="filterWrapper">
                    <div className="content">
                        <Toolbar className={classes.title}>
                            <Grid
                                container
                                spacing={0}
                                alignItems="baseline"
                                justify="space-between"
                                className="header"
                            >
                                <Typography noWrap color="white" className="filterHeader" xs={10}>
                                    {CONSTANTS.NAME_FILTER}
                                </Typography>
                                <IconButton onClick={toggleDrawer(false)} className={classes.filterButton} xs={2}>
                                    <CloseIcon className="closeIcon" />
                                </IconButton>
                            </Grid>
                        </Toolbar>
                        <>
                            {filtersLoading ? (
                                <Loader />
                            ) : (
                                <>
                                    <Grid className={classes.chipSection}>
                                        <CustomChip dataArray={chipData} handleDelete={handleChipDelete} />
                                    </Grid>
                                    <Grid
                                        className="content"
                                        style={{
                                            height: 'auto',
                                            [theme.breakpoints.up('md')]: {
                                                width: drawerWidth,
                                                position: 'relative',
                                                height: 'auto'
                                            }
                                        }}
                                    >
                                        <Grid>
                                            {screenId === 2 ? (
                                                <TreeView
                                                    className={classes.treeRoot}
                                                    defaultExpanded={expandedNodes}
                                                    defaultCollapseIcon={
                                                        <IconButton size="small">
                                                            <ExpandLessIcon />
                                                        </IconButton>
                                                    }
                                                    defaultExpandIcon={
                                                        <IconButton size="small">
                                                            <ExpandMoreIcon />
                                                        </IconButton>
                                                    }
                                                >
                                                    {showFilters &&
                                                        showFilters.map((item, index) => (
                                                            <React.Fragment key={index}>

                                                                {typeof item === 'string' ? (
                                                                    <Grid key={index}>
                                                                        {console.log('showitem--', item)}
                                                                        {filterLabels[item] &&
                                                                            filterLabels[item].label ? (
                                                                            <>
                                                                                <StyledTreeItem
                                                                                    nodeId={showFilters.indexOf(item)}
                                                                                    label={filterLabels[item]?.label}
                                                                                    className={classes.formGroup}
                                                                                    onChange={(e) =>
                                                                                        e.cancelable
                                                                                            ? handleChipChanges(e, item)
                                                                                            : null
                                                                                    }
                                                                                >
                                                                                    {' '}
                                                                                    {allFilterValues[item]?.length >
                                                                                        5 ? (
                                                                                        <Grid
                                                                                            className={
                                                                                                classes.customSearchbox
                                                                                            }
                                                                                        >
                                                                                            <CustomSearch
                                                                                                size="md"
                                                                                                value={rowData[item]}
                                                                                                placeholder={
                                                                                                    CONSTANTS.PLACE_HOLDER_SEARCH
                                                                                                }
                                                                                                // handleChipChanges={handleSearchValue}
                                                                                                handleChange={(e) =>
                                                                                                    handleSearchChange(
                                                                                                        e,
                                                                                                        item
                                                                                                    )
                                                                                                }
                                                                                                handleSearchDelete={() =>
                                                                                                    handleSearchDelte(
                                                                                                        item
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </Grid>
                                                                                    ) : null}
                                                                                        {item === 'createdAt' || item === 'expiryDate' ?
                                                                                        <Grid
                                                                                            container
                                                                                            spacing={0}
                                                                                            alignItems="baseline"
                                                                                            justify="space-between"
                                                                                            className={
                                                                                                classes.datePicker
                                                                                            }
                                                                                        >
                                                                                            {console.log('onjs---', dateObjects[
                                                                                                item
                                                                                            ])}
                                                                                            <DatePicker
                                                                                                fontSize={'13px'}
                                                                                                // disableToolbar
                                                                                                variant="inline"
                                                                                                format="dd/MM/yyyy"
                                                                                                id="date-picker-inline"
                                                                                                label="Start Date"
                                                                                                value={
                                                                                                    dateObjects[
                                                                                                        item
                                                                                                    ]?.startDate
                                                                                                }
                                                                                                minDate={
                                                                                                    dateObjects[
                                                                                                        item
                                                                                                    ]?.minDate
                                                                                                }
                                                                                                maxDate={
                                                                                                    dateObjects[
                                                                                                        item
                                                                                                    ]?.maxDate
                                                                                                }
                                                                                                handleDate={(e) =>
                                                                                                    handleStartDateChange(
                                                                                                        e,
                                                                                                        item,
                                                                                                        dateObjects[
                                                                                                            item

                                                                                                        ]?.maxDate,
                                                                                                        dateObjects[
                                                                                                            item

                                                                                                        ]?.label
                                                                                                    )
                                                                                                }
                                                                                                size="small"
                                                                                                width="45%"
                                                                                                inputVariant={
                                                                                                    'outlined'
                                                                                                }
                                                                                                mask={'__/__/__'}
                                                                                            />
                                                                                            {'To'}
                                                                                            <DatePicker
                                                                                                fontSize={'13px'}
                                                                                                // disableToolbar
                                                                                                variant="inline"
                                                                                                format="dd/MM/yyyy"
                                                                                                id="date-picker-inline"
                                                                                                label="End Date"
                                                                                                value={
                                                                                                    dateObjects[
                                                                                                        item
                                                                                                    ]?.endDate
                                                                                                }
                                                                                                handleDate={(e) =>
                                                                                                    handleEndDateChange(
                                                                                                        e,
                                                                                                        item,
                                                                                                        dateObjects[
                                                                                                            item

                                                                                                        ]?.minDate,
                                                                                                        dateObjects[
                                                                                                            item

                                                                                                        ]?.label
                                                                                                    )
                                                                                                }
                                                                                                maxDate={
                                                                                                    dateObjects[
                                                                                                        item
                                                                                                    ]?.maxDate
                                                                                                }
                                                                                                minDate={
                                                                                                    dateObjects[
                                                                                                        item
                                                                                                    ]?.startDate
                                                                                                }
                                                                                                size="small"
                                                                                                width="45%"
                                                                                                inputVariant={
                                                                                                    'outlined'
                                                                                                }
                                                                                            />
                                                                                        </Grid> : null}
                                                                                    <FormGroup>
                                                                                        {rowData[item] !== undefined &&
                                                                                            rowData[item] !== ''
                                                                                            ? [
                                                                                                ...allFilterValues[
                                                                                                    item
                                                                                                ].filter((subItem) =>
                                                                                                    subItem?.[
                                                                                                        `${filterLabels[item]?.keyName}`
                                                                                                    ]
                                                                                                        ?.toLowerCase()
                                                                                                        ?.includes(
                                                                                                            rowData[
                                                                                                                item
                                                                                                            ]?.toLowerCase()
                                                                                                        )
                                                                                                )
                                                                                            ]
                                                                                                .slice(0, 4)
                                                                                                ?.map((chBox) => (
                                                                                                    <FilterCheckBOx
                                                                                                        value={
                                                                                                            chBox[
                                                                                                            `${filterLabels[item]?.keyName}`
                                                                                                            ]
                                                                                                        }
                                                                                                        key={
                                                                                                            chBox[
                                                                                                            `${filterLabels[item]?.keyName}`
                                                                                                            ]
                                                                                                        }
                                                                                                    />
                                                                                                ))
                                                                                            : allFilterValues[item]
                                                                                                ?.slice(
                                                                                                    0,
                                                                                                    deviceDisplay[
                                                                                                        item
                                                                                                    ]
                                                                                                        ? deviceDisplay[
                                                                                                        item
                                                                                                        ]
                                                                                                        : 5
                                                                                                )
                                                                                                .map((chBox) => (
                                                                                                    <>
                                                                                                        {chBox[
                                                                                                            `${filterLabels[item]?.keyName}`
                                                                                                        ] ? (
                                                                                                            <FilterCheckBOx
                                                                                                                value={
                                                                                                                    chBox[
                                                                                                                    `${filterLabels[item]?.keyName}`
                                                                                                                    ]
                                                                                                                }
                                                                                                                key={
                                                                                                                    chBox[
                                                                                                                    `${filterLabels[item]?.keyName}`
                                                                                                                    ]
                                                                                                                }
                                                                                                            />
                                                                                                        ) : null}
                                                                                                    </>
                                                                                                ))}

                                                                                        {allFilterValues[item]?.length >
                                                                                            5 &&
                                                                                            rowData[item] === '' ? (
                                                                                            <CustomButton
                                                                                                contained
                                                                                                color="primary"
                                                                                                onClick={() => {
                                                                                                    handleCheckBoxLimit(
                                                                                                        item,
                                                                                                        deviceDisplay[
                                                                                                            item
                                                                                                        ]
                                                                                                            ? allFilterValues[
                                                                                                                item
                                                                                                            ]
                                                                                                                ?.length >
                                                                                                                deviceDisplay[
                                                                                                                item
                                                                                                                ]
                                                                                                                ? 'plus'
                                                                                                                : 'minus'
                                                                                                            : 'plus'
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                {deviceDisplay[item]
                                                                                                    ? allFilterValues[
                                                                                                        item
                                                                                                    ]?.length >
                                                                                                        deviceDisplay[
                                                                                                        item
                                                                                                        ]
                                                                                                        ? 'Show More'
                                                                                                        : 'Show Less'
                                                                                                    : 'Show More'}
                                                                                            </CustomButton>
                                                                                        ) : null}
                                                                                    </FormGroup>
                                                                                </StyledTreeItem>
                                                                                <Divider />
                                                                            </>
                                                                        ) : null}
                                                                    </Grid>
                                                                ) : typeof item === 'object' ? (
                                                                    item.type === 'date' ? (
                                                                        <>
                                                                            <Grid key={item}>
                                                                                {console.log('item', item)}
                                                                                {item && item.label ? (
                                                                                    <>
                                                                                        <StyledTreeItem
                                                                                            nodeId={showFilters.indexOf(
                                                                                                item
                                                                                            )}
                                                                                            label={item.label}
                                                                                            className={
                                                                                                classes.formGroup
                                                                                            }
                                                                                        >

                                                                                        </StyledTreeItem>
                                                                                        <Divider />
                                                                                    </>
                                                                                ) : null}
                                                                            </Grid>
                                                                        </>
                                                                    ) : item.type === 'range' &&
                                                                        item.label !== '' &&
                                                                        item.label !== undefined ? (
                                                                        <>
                                                                            <StyledTreeItem
                                                                                nodeId={showFilters.indexOf(item)}
                                                                                label={item.label}
                                                                                className={classes.formGroup}
                                                                                onMouseOver={() => {
                                                                                    setCurrentItem(item.label);
                                                                                    setSwitchItem('');
                                                                                }}
                                                                            >
                                                                                <Slider
                                                                                    value={value[item.label]}
                                                                                    name={item.label}
                                                                                    onChange={handleRangeChange}
                                                                                    onChangeCommitted={() =>
                                                                                        handleRangeComitted(item.label)
                                                                                    }
                                                                                    valueLabelDisplay="auto"
                                                                                    getAriaValueText={valuetext}
                                                                                    className={classes.slider}
                                                                                    marks={[
                                                                                        {
                                                                                            value: item?.min,
                                                                                            label: item?.min
                                                                                        },
                                                                                        {
                                                                                            value: item?.max,
                                                                                            label: item?.max
                                                                                        }
                                                                                    ]}
                                                                                    defaultValue={[
                                                                                        item?.min,
                                                                                        item?.max
                                                                                    ]}
                                                                                    max={item.max}
                                                                                    min={item.min}
                                                                                />
                                                                                <Grid
                                                                                    container
                                                                                    spacing={0}
                                                                                    alignItems="baseline"
                                                                                    justify="space-between"
                                                                                    style={{
                                                                                        marginLeft: -10,
                                                                                        marginTop: 10
                                                                                    }}
                                                                                >
                                                                                    <CustomInput
                                                                                        onChange={(e) =>
                                                                                            handleRangeInput(
                                                                                                e,
                                                                                                'start',
                                                                                                item.min
                                                                                            )
                                                                                        }
                                                                                        name={item.label}
                                                                                        disabled
                                                                                        size="small"
                                                                                        width={'45%'}
                                                                                        value={
                                                                                            value[item?.label]
                                                                                                ? value[item?.label][0]
                                                                                                : null
                                                                                        }
                                                                                    />{' '}
                                                                                    {'To'}
                                                                                    <CustomInput
                                                                                        onChange={(e) =>
                                                                                            handleRangeInput(
                                                                                                e,
                                                                                                'end',
                                                                                                item.max
                                                                                            )
                                                                                        }
                                                                                        disabled
                                                                                        name={item.label}
                                                                                        value={
                                                                                            value[item?.label]
                                                                                                ? value[item?.label][1]
                                                                                                : null
                                                                                        }
                                                                                        size="small"
                                                                                        width={'45%'}
                                                                                    />
                                                                                </Grid>
                                                                            </StyledTreeItem>
                                                                            <Divider />
                                                                        </>
                                                                    ) : item.type === 'switch' &&
                                                                        item.name !== '' &&
                                                                        item.label ? (
                                                                        <>
                                                                            <StyledTreeItem
                                                                                nodeId={showFilters.indexOf(item)}
                                                                                label={item.label}
                                                                                className={classes.formGroup}
                                                                                onMouseOver={() => {
                                                                                    setSwitchItem(item.name);
                                                                                    setCurrentItem('');
                                                                                }}
                                                                            >
                                                                                <Grid style={{ marginTop: 10 }}>
                                                                                    <span>No</span>
                                                                                    <Switch
                                                                                        color="primary"
                                                                                        checked={
                                                                                            switchFilter[item.name]
                                                                                                ?.value === 'Yes'
                                                                                        }
                                                                                        onChange={(e) =>
                                                                                            handleSwitchChange(
                                                                                                e,
                                                                                                item.name
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                    <span>Yes</span>
                                                                                </Grid>
                                                                            </StyledTreeItem>
                                                                            <Divider />
                                                                        </>
                                                                    ) : item.type === 'Expiry' ? (
                                                                        <>
                                                                            <StyledTreeItem
                                                                                nodeId={showFilters.indexOf(item)}
                                                                                label={item.name}
                                                                                className={classes.formGroup}
                                                                                onMouseOver={() =>
                                                                                    setCurrentItem(item.name)
                                                                                }
                                                                                onChange={(e) =>
                                                                                    e.cancelable
                                                                                        ? handleChipChanges(e, 'Expiry')
                                                                                        : null
                                                                                }
                                                                            >
                                                                                {item.filters.map((xItem) => (
                                                                                    <Grid key={xItem.key}>
                                                                                        <FilterCheckBOx
                                                                                            key={xItem.key}
                                                                                            value={xItem.value}
                                                                                        />
                                                                                    </Grid>
                                                                                ))}
                                                                            </StyledTreeItem>
                                                                        </>
                                                                    ) : null
                                                                ) : null}
                                                            </React.Fragment>
                                                        ))}
                                                </TreeView>
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </>
                    </div>
                </div>
                {filtersLoading ? null : (
                    <div
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            textAlign: 'center',
                            paddingBottom: 10,
                            backgroundColor: '#f5f5f5',
                            flexGrow: 1,
                            minWidth: 400,
                            maxWidth: drawerWidth,
                            // maxWidth: 400,
                            paddingLeft: theme.spacing(3),
                            paddingRight: theme.spacing(3)
                        }}
                    >
                        <div style={{ marginBottom: '10px' }}>
                            <Divider />
                        </div>

                        <Grid container alignItems="flex-start" justify="space-evenly">
                            <Grid item onClick={resetFilter} style={{ marginTop: '10px' }}>
                                <CustomButton variant="contained" color="primary">
                                    {CONSTANTS.NAME_RESET}
                                </CustomButton>
                            </Grid>
                            <Grid item onClick={filterSubmit} style={{ marginTop: '10px' }}>
                                <CustomButton variant="contained" color="primary" disabled={chipData.length === 0}>
                                    {CONSTANTS.NAME_APPLY}
                                </CustomButton>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </SwipeableDrawer>
        </div>
    );
};

export default TransfusedBatchFilterComponent;
