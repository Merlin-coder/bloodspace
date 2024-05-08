import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Card, CardContent, Grid, IconButton, InputLabel, Paper, Switch, Typography } from '@material-ui/core';
import { useStyles } from './style';
import { Checkbox, CustomButton, DatePicker } from 'common';
import CheckboxComponent from 'components/checkbox/checkbox.component';
import DeleteIcon from '@material-ui/icons/Delete';

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
        <>
            <div className={classes.leftHeadingContainer}>
                <Typography variant="body1" className={classes.leftHeading}>
                    All Fields From Unit
                </Typography>
            </div>
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
                                        <Draggable draggableId={item.id} index={index} isDragDisabled={false}>
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
        </>
    );
}

function FieldsType(props) {
    return <Copyable droppableId="FIELDSTYPE" items={props.items} />;
}

function FormContainer(props) {
    const { items, setFormContainerItems } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const [display, setDisplay] = useState(items);
    useEffect(() => {
        setDisplay(items);
    }, [items]);
    const handleMouseEnter = (index) => {
        setDisplay((prevState) => {
            return display?.map((row) => {
                if (row?.id === index) {
                    return { ...row, isSelected: true };
                }
                return row;
            });
        });
    };

    const handleMouseLeave = (index) => {
        setDisplay((prevState) => {
            return display?.map((row) => {
                if (row?.id === index) {
                    return { ...row, isSelected: false };
                }
                return row;
            });
        });
    };
    const handleDelete = (index) => {
        setDisplay(display?.filter((item) => item.id !== index));
        setFormContainerItems(display?.filter((item) => item.id !== index));
    };

    return (
        <>
            <Droppable droppableId="BAG">
                {(provided, snapshot) => (
                    <Grid>
                        <div className={classes.rightHeadingContainer}>
                            <Typography variant="body1" className={classes.rightHeading}>
                                Selected fields to be write on Tag memory
                            </Typography>
                        </div>
                        <></>
                        <Grid container spacing={5} className={classes.formGrid} ref={provided.innerRef}>
                            {display?.length === 0 && (
                                <div className={classes.formContainer}>
                                    <Typography variant="body2" align="center" className={classes.formContainerText}>
                                        Drag and Drop fields here.
                                    </Typography>
                                </div>
                            )}
                            {display?.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <>
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
                                                <Paper
                                                    className={classes.cardRoot}
                                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                                    onMouseLeave={() => handleMouseLeave(item.id)}
                                                    elevation={0}
                                                >
                                                    <Grid container>
                                                        <Grid item xs={5} />
                                                        <Grid item xs>
                                                            <Grid container justify="space-between" alignItems="center">
                                                                <Grid item>
                                                                    <Typography variant="body2">
                                                                        {item.label}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <IconButton
                                                                        onClick={() => handleDelete(item.id)}
                                                                        className={
                                                                            item.isSelected
                                                                                ? classes.displayed
                                                                                : classes.notdisplayed
                                                                        }
                                                                    >
                                                                        <DeleteIcon style={{ fontSize: 'medium' }} />
                                                                    </IconButton>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
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
        </>
    );
}

const COLLECTION = [
    { id: uuid(), label: 'Tag ID' },
    { id: uuid(), label: 'Unit ID' },
    { id: uuid(), label: 'Product Code' },
    { id: uuid(), label: 'Product Group ID' },
    { id: uuid(), label: 'Bloodgroup Code ' },
    { id: uuid(), label: 'Recepient ID' },
    { id: uuid(), label: 'Expiray Date' },
    { id: uuid(), label: 'Collection Date' }
];

const reorder = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list;
};

function duplicateChips(arr) {
    let chipArray = [];
    arr.forEach((item) => {
        if (chipArray.findIndex((x) => x.label === item.label) === -1) {
            chipArray.push(item);
        }
    });
    return chipArray;
}

const copy = (source, destination, droppableSource, droppableDestination) => {
    const item = source[droppableSource.index];
    destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });

    let uniqueItem = duplicateChips(destination);
    return uniqueItem;
};

function TagConfig() {
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
            <Grid container justify="center" alignItems="center">
                <Grid item xs={9}>
                    <Paper className={classes.CheckboxPaper} elevation={0}>
                        <div className={classes.CheckboxContainer}>
                            <CheckboxComponent />
                            <Typography variant="body2" className={classes.listItem}>
                                Enable Encode Tag
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container justify="center" alignItems="center" spacing={5} className={classes.root}>
                    <Grid item xs={2} className={classes.leftGrid}>
                        <Paper className={classes.leftPaper} elevation={0}>
                            <FieldsType items={COLLECTION} />
                        </Paper>
                    </Grid>
                    <Grid item xs={7} className={classes.rightGrid}>
                        <Paper className={classes.rightPaper} elevation={0}>
                            <FormContainer items={formContainerItems} setFormContainerItems={setFormContainerItems} />
                        </Paper>
                    </Grid>
                </Grid>
            </DragDropContext>

            <div className={classes.saveBtn}>
                <CustomButton disabled={formContainerItems?.length === 0} variant="contained" color="primary">
                    Save
                </CustomButton>
            </div>
        </>
    );
}
export default TagConfig;
