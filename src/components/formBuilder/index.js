import { Grid, Paper, Typography } from '@material-ui/core';
import { Checkbox, CustomButton } from 'common';
import CustomInput from 'components/inputfeild';
import SelectOption from 'components/select';
import React, { useEffect, useState } from 'react';
import { useStyles } from './style';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FormBuilder = () => {
    const classes = useStyles();
    const [inputCount, setInputCount] = useState(0);
    const [dropDownCount, setDropDownCount] = useState(0);
    const [checkboxCount, setCheckboxCount] = useState(0);
    const [radioCount, setRadioCount] = useState(0);
    const [filesCount, setFilesCount] = useState(0);
    const [buttonCount, setButtonCount] = useState(0);
    const formElements = [
        { id: 1, name: 'Input' },
        { id: 2, name: 'Dropdown' },
        { id: 3, name: 'Checkbox' },
        { id: 4, name: 'Radio' },
        { id: 5, name: 'Files' },
        { id: 6, name: 'Button' },
        { id: 7, name: 'Label' }
    ];
    const handleListClick = (id) => {
        if (id === 1) {
            setInputCount(inputCount + 1);
        }
        if (id === 2) {
            setDropDownCount(dropDownCount + 1);
        }
        if (id === 3) {
            setCheckboxCount(checkboxCount + 1);
        }
        if (id === 4) {
            setRadioCount(radioCount + 1);
        }
        if (id === 5) {
            setFilesCount(filesCount + 1);
        }
        if (id === 6) {
            setButtonCount(buttonCount + 1);
        }
    };
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    return (
        <Grid container alignItems="center" justify="center" spacing={5} className={classes.root}>
            <Grid item xs={2} className={classes.leftGrid}>
                <Paper className={classes.leftPaper}>
                    {formElements.map((ele) => (
                        <div className={classes.list} key={ele.id}>
                            <Typography
                                onClick={() => handleListClick(ele.id)}
                                className={classes.listItem}
                                variant="body2"
                            >
                                {ele.name}
                            </Typography>
                        </div>
                    ))}
                </Paper>
            </Grid>
            <Grid item xs={9} className={classes.rightGrid}>
                <Paper className={classes.rightPaper}>
                    <Grid container spacing={2} className={classes.formGrid}>
                        <Grid item xs={12} md={6} lg={6}>
                            {Array.from(Array(inputCount), (e, i) => (
                                <CustomInput
                                    autoFocus
                                    fullWidth
                                    style={{ width: 300 }}
                                    className={classes.textField}
                                    size="lg"
                                    key={i}
                                    placeholder=""
                                />
                            ))}
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            {Array.from(Array(dropDownCount), (e, i) => (
                                <SelectOption key={i} placeholder="" />
                            ))}
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            {Array.from(Array(checkboxCount), (e, i) => (
                                <Checkbox key={i} placeholder="" />
                            ))}
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            {Array.from(Array(buttonCount), (e, i) => (
                                <CustomButton variant="outlined" color="primary" key={i}>
                                    Save
                                </CustomButton>
                            ))}
                        </Grid>
                        {/* <Grid item xs={12} md={6} lg={6}>
                            {Array.from(Array(inputCount), (e, i) => (
                                <CustomInput key={i} placeholder="" />
                            ))}
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            {Array.from(Array(inputCount), (e, i) => (
                                <CustomInput key={i} placeholder="" />
                            ))}
                        </Grid> */}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default FormBuilder;
