import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid, IconButton, InputLabel, Paper, Switch, Typography } from '@material-ui/core';
import { useStyles } from './style';
import CustomInput from 'components/inputfeild';
import SelectOption from 'components/select';
import { Checkbox, CustomButton, DatePicker } from 'common';
import CustomRadio from 'components/radioButtons';
import EditIcon from '@material-ui/icons/Edit';
import CustomDialog from 'components/dialog';
import { get2ndDropdown, get3rdDropdown, get4thDropdown } from 'redux/actions/manage/manageFieldsAction';

// import "./styles.css";

// This method is needed for rendering clones of draggables
/*eslint-disable */
const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
    const classes = useStyles();
    const item = items[rubric.source.index];
    return (
        <React.Fragment>
            <ListItem
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                // style={provided.draggableProps.style}
                className={classes.list}
            >
                <ListItemText primary={item.label} />
            </ListItem>
        </React.Fragment>
    );
};

/*eslint-enable */
function Copyable(props) {
    const classes = useStyles();
    return (
        <Droppable
            renderClone={getRenderItem(props.items, props.className)}
            droppableId={props.droppableId}
            isDropDisabled={true}
        >
            {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                    {props.items.map((item, index) => {
                        const shouldRenderClone = item.id === snapshot.draggingFromThisWith;
                        return (
                            <React.Fragment key={item.id}>
                                {shouldRenderClone ? (
                                    <div className={classes.list}>
                                        <Typography variant="body2" className={classes.listItem}>
                                            {item.label}
                                        </Typography>
                                    </div>
                                ) : (
                                    <Draggable draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <React.Fragment>
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={classes.list}
                                                >
                                                    <Typography variant="body2" className={classes.listItem}>
                                                        {item.label}
                                                    </Typography>
                                                </div>
                                            </React.Fragment>
                                        )}
                                    </Draggable>
                                )}
                            </React.Fragment>
                        );
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

function FieldsType(props) {
    return <Copyable droppableId="FIELDSTYPE" items={props.items} />;
}

function FormContainer(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const radioOptions = [
        { name: 'Yes', value: '1' },
        { name: 'No', value: '0' }
    ];
    const [formTitle, setFormTitle] = useState('Form Header');
    const [display, setDisplay] = useState('notdisplayed');
    const [inputDisplay, setInputDisplay] = useState('notdisplayed');
    const [openHeaderEdit, setOpenHeaderEdit] = useState(false);
    const [openInputEdit, setOpenInputEdit] = useState(false);
    const { options2 } = useSelector((state) => state.get2ndDropdown);
    const { options3 } = useSelector((state) => state.get3rdDropdown);
    const { options4 } = useSelector((state) => state.get4thDropdown);
    useEffect(() => {
        dispatch(get2ndDropdown('fieldType'));
        dispatch(get3rdDropdown('validator'));
        dispatch(get4thDropdown('drawer'));
    }, []);

    const showButton = (e) => {
        e.preventDefault();
        setDisplay('displayed');
    };

    const hideButton = (e) => {
        e.preventDefault();
        setDisplay('notdisplayed');
    };
    const showInputButton = (e) => {
        e.preventDefault();
        setInputDisplay('displayed');
    };

    const hideInputButton = (e) => {
        e.preventDefault();
        setInputDisplay('notdisplayed');
    };
    const handleHeaderClick = () => {
        setOpenHeaderEdit(true);
    };
    const handleInputClick = (id) => {
        setOpenInputEdit(true);
    };
    const Header = (
        <div className={classes.headerIcon} onMouseEnter={(e) => showButton(e)} onMouseLeave={(e) => hideButton(e)}>
            <Typography color="primary" variant="h5" className={classes.headerTypoGraphy}>
                {formTitle}
            </Typography>
            <IconButton
                onClick={handleHeaderClick}
                className={display === 'displayed' ? classes.displayed : classes.notdisplayed}
            >
                <EditIcon style={{ fontSize: 'medium' }} />
            </IconButton>
        </div>
    );
    const handleHeaderCancelClick = () => {
        setOpenHeaderEdit(false);
        setFormTitle('Form Header');
    };
    const handleInputCancelClick = () => {
        setOpenInputEdit(false);
        // setFormTitle('Form Header');
    };
    const onFormTitleChange = (e) => {
        setFormTitle(e.target.value);
    };
    const InputEditContainer = (
        <>
            <Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                        <InputLabel className={classes.inputLabel}>Code</InputLabel>
                        <CustomInput
                            fullWidth
                            style={{ width: 300 }}
                            className={classes.textField}
                            size="lg"
                            name="code"
                            value=""
                            // onChange={onFormTitleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                        <InputLabel className={classes.inputLabel}>Name</InputLabel>
                        <CustomInput
                            fullWidth
                            style={{ width: 300 }}
                            className={classes.textField}
                            size="lg"
                            name="formHeader"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                        <InputLabel className={classes.inputLabel}>Label</InputLabel>
                        <CustomInput
                            fullWidth
                            style={{ width: 300 }}
                            className={classes.textField}
                            size="lg"
                            name="formHeader"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                        <InputLabel className={classes.inputLabel}>Field Type Code</InputLabel>
                        <SelectOption options={options2?.data} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                        <InputLabel className={classes.inputLabel}>Validator Code</InputLabel>
                        <SelectOption options={options3?.data} isAlert />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                        <InputLabel className={classes.inputLabel}>Drawer Code</InputLabel>
                        <SelectOption options={options4?.data} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} className={classes.inputField}>
                        <InputLabel className={classes.inputLabel}>is Active</InputLabel>
                        <Switch color="primary" />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
    const HeaderEditContainer = (
        <>
            <InputLabel className={classes.inputLabel}>Form Header</InputLabel>
            <CustomInput name="formHeader" value={formTitle} onChange={onFormTitleChange} />
        </>
    );
    return (
        <>
            <Droppable droppableId="BAG">
                {(provided, snapshot) => (
                    <Grid>
                        <Grid container spacing={3} className={classes.formGrid} ref={provided.innerRef}>
                            <>
                                {props?.items.length === 0 && props?.items?.filter((item) => item.label !== 'Header') && (
                                    <div className={classes.headerContainer}>
                                        <Typography variant="body2" align="center">
                                            Drop Header here.
                                        </Typography>
                                    </div>
                                )}
                                {props?.items.length === 0 && props?.items?.filter((item) => item.label === 'Header') && (
                                    <div className={classes.formContainer}>
                                        <Typography
                                            variant="body2"
                                            align="center"
                                            className={classes.formContainerText}
                                        >
                                            Drop Form Elements here.
                                        </Typography>
                                    </div>
                                )}
                            </>

                            {props.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <>
                                            <div>{item.label === 'Header' && Header}</div>
                                            <Grid
                                                item
                                                xs={12}
                                                md={6}
                                                lg={6}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={provided.draggableProps.style}
                                                className={classes.inputField}
                                            >
                                                {item.label === 'Input' ? (
                                                    <div
                                                        onMouseEnter={(e) => showInputButton(e)}
                                                        onMouseLeave={(e) => hideInputButton(e)}
                                                    >
                                                        <InputLabel className={classes.inputLabel}>
                                                            {item.label}
                                                        </InputLabel>
                                                        <div className={classes.inputEditContainer}>
                                                            <CustomInput
                                                                autoFocus
                                                                style={{ width: 300 }}
                                                                className={classes.textField}
                                                                size="md"
                                                                placeholder="Input"
                                                            />
                                                            <IconButton
                                                                onClick={() => handleInputClick(item.id)}
                                                                className={
                                                                    inputDisplay === 'displayed'
                                                                        ? classes.displayed
                                                                        : classes.notdisplayed
                                                                }
                                                            >
                                                                <EditIcon style={{ fontSize: 'medium' }} />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                ) : item.label === 'Checkbox' ? (
                                                    <>
                                                        <InputLabel className={classes.inputLabel}>
                                                            {item.label}
                                                        </InputLabel>
                                                        <Checkbox />
                                                    </>
                                                ) : item.label === 'DropDown' ? (
                                                    <>
                                                        <InputLabel className={classes.inputLabel}>
                                                            {item.label}
                                                        </InputLabel>
                                                        <SelectOption label="Dropdown" />
                                                    </>
                                                ) : item.label === 'Switch' ? (
                                                    <>
                                                        <InputLabel className={classes.inputLabel}>
                                                            {item.label}
                                                        </InputLabel>
                                                        <Switch color="primary" />
                                                    </>
                                                ) : item.label === 'Date' ? (
                                                    <>
                                                        <InputLabel className={classes.inputLabel}>
                                                            {item.label}
                                                        </InputLabel>
                                                        <DatePicker
                                                            inputVariant={'outlined'}
                                                            // handleDate={handleDateChange}
                                                            // value={input.value}
                                                            format="MM/dd/yyyy"
                                                            // disablePast={urlEndPoint === 'recipient' ? false : true}
                                                            // disableFuture={urlEndPoint === 'recipient' && true}
                                                            fullWidth
                                                            width={'100%'}
                                                            height={45}
                                                        />
                                                    </>
                                                ) : item.label === 'Radio' ? (
                                                    <>
                                                        <InputLabel className={classes.inputLabel}>
                                                            {item.label}
                                                        </InputLabel>
                                                        <CustomRadio name="Yes" value="1" options={radioOptions} />
                                                    </>
                                                ) : item.label === 'Button' ? (
                                                    <CustomButton variant="contained" color="primary">
                                                        Submit
                                                    </CustomButton>
                                                ) : null}
                                            </Grid>
                                        </>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Grid>
                    </Grid>
                )}
            </Droppable>
            <CustomDialog
                open={openHeaderEdit}
                isSave
                onCancelClick={handleHeaderCancelClick}
                onSaveClick={() => setOpenHeaderEdit(false)}
                onClose={() => setOpenHeaderEdit(false)}
            >
                {HeaderEditContainer}
            </CustomDialog>
            <CustomDialog
                open={openInputEdit}
                isSave
                onCancelClick={handleInputCancelClick}
                onSaveClick={() => setOpenInputEdit(false)}
                onClose={() => setOpenInputEdit(false)}
            >
                {InputEditContainer}
            </CustomDialog>
        </>
    );
}

const COLLECTION = [
    { id: uuid(), label: 'Header' },
    { id: uuid(), label: 'Input' },
    { id: uuid(), label: 'Checkbox' },
    { id: uuid(), label: 'DropDown' },
    { id: uuid(), label: 'Radio' },
    { id: uuid(), label: 'Date' },
    { id: uuid(), label: 'Switch' },
    { id: uuid(), label: 'Button' }
];

const reorder = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
    const item = source[droppableSource.index];
    destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destination;
};

function FormBuilder() {
    const classes = useStyles();
    const [formContainerItems, setFormContainerItems] = React.useState([]);
    const onDragEnd = React.useCallback(
        (result) => {
            const { source, destination } = result;

            if (!destination) {
                return;
            }

            switch (source.droppableId) {
                case destination.droppableId:
                    setFormContainerItems((state) => reorder(state, source.index, destination.index));
                    break;
                case 'FIELDSTYPE':
                    setFormContainerItems((state) => copy(COLLECTION, state, source, destination));
                    break;
                default:
                    break;
            }
        },
        [setFormContainerItems]
    );
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container alignItems="center" justify="center" spacing={5} className={classes.root}>
                    <Grid item xs={2} className={classes.leftGrid}>
                        <Paper className={classes.leftPaper}>
                            <FieldsType items={COLLECTION} />
                        </Paper>
                    </Grid>
                    <Grid item xs={9} className={classes.rightGrid}>
                        <Paper className={classes.rightPaper}>
                            <FormContainer items={formContainerItems} />
                        </Paper>
                    </Grid>
                </Grid>
            </DragDropContext>
        </>
    );
}
export default FormBuilder;
