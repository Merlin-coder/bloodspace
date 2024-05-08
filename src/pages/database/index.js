import React, { useState } from 'react';
import {
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import { CONSTANTS, CustomButton } from 'common';
import SelectOption from 'components/select';
import CustomInput from 'components/inputfeild';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDatabaseStyles } from './style.js';
import Checkbox from '@material-ui/core/Checkbox';

const Database = () => {
    const [addCollection, setAddcollection] = useState(false);
    const classes = useDatabaseStyles();
    const [columns, setColumns] = useState([]);
    const [editIndex, setEditIndex] = useState('');
    const [collectionValue, setCollectionValue] = useState('');

    const [columnInput, setColumnInput] = useState({
        unique: false,
        columnLabel: '',
        columnName: '',
        dataType: '',
        default: '',
        allowNull: false,
        validationType: ''
    });

    const handleChange = (e) => {
        setColumnInput({
            ...columnInput,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        if (columnInput.columnName) {
            if (editIndex !== '') {
                let tempColumns = columns;
                tempColumns.splice(editIndex, 0, columnInput);
                setColumns(tempColumns);
                setEditIndex('');
            } else {
                setColumns([...columns, columnInput]);
            }
            setColumnInput({
                unique: false,
                columnName: '',
                columnLabel: '',
                dataType: '',
                default: '',
                allowNull: false,
                validationType: ''
            });
        }
    };

    const handleCheck = (e) => {
        setColumnInput({
            ...columnInput,
            [e.target.name]: e.target.checked
        });
    };

    const handleSelect = (e) => {
        setColumnInput({
            ...columnInput,
            [e.target.name]: e.target.value
        });
    };

    const dataTypesOption = [
        { name: 'String' },
        { name: 'Number' },
        { name: 'Object' },
        { name: 'Array' },
        { name: 'Boolean' },
        { name: 'Date' }
    ];

    const handleDeleteRow = (index) => {
        let tempColumns = columns;
        tempColumns.splice(index, 1);
        setColumns([...tempColumns]);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        let tempRow = columns[index];
        let tempColumns = columns;
        tempColumns.splice(index, 1);
        setColumns([...tempColumns]);
        setColumnInput({ ...tempRow });
    };

    const TableHeadFeilds = [
        CONSTANTS.NAME,
        CONSTANTS.LABEL,
        CONSTANTS.NAME_TYPE,
        CONSTANTS.DEFAULT_VALUE,
        CONSTANTS.VALIDATION_TYPE,
        CONSTANTS.REFERENCE,
        CONSTANTS.ALLOW_NULL,
        CONSTANTS.UNIQUE,
        CONSTANTS.REQUIRED,
        CONSTANTS.INDEXED,
        CONSTANTS.ACTION
    ];

    const validationOptions = [
        { name: 'Only String' },
        { name: 'Only Number' },
        { name: 'Only Date' },
        { name: 'Only Special Character' },
        { name: 'String with special Character' },
        { name: 'Number with special Character' },
        { name: 'Email Address' },
        { name: 'Phone Number' },
        { name: 'IP Address' },
        { name: 'Array' },
        { name: 'ObjectId' },
        { name: 'Object' },
        { name: 'Any' }
    ];

    return (
        <Grid>
            <Paper elevation={0} className={classes.buttonsPaper}>
                <Grid container justify="space-between">
                    <Grid xs={3}>
                        {addCollection ? (
                            <CustomInput fullWidth focus={true} />
                        ) : (
                            <SelectOption
                                options={[{ name: CONSTANTS.NAME_USERS }, { name: CONSTANTS.NAME_HOSPITALS }]}
                                onChange={(e) => setCollectionValue(e.target.value)}
                                value={collectionValue}
                                label={CONSTANTS.SELECT_COLLECTIONS}
                            />
                        )}
                    </Grid>

                    <Grid xs={6} className={classes.addCollectionButton}>
                        <CustomButton
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                setAddcollection(true);
                            }}
                        >
                            {CONSTANTS.ADD_COLLECTIONS}
                        </CustomButton>
                    </Grid>
                </Grid>
            </Paper>
            {addCollection && (
                <Paper elevation={0} className={classes.dataBaseTable}>
                    <Grid container xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        {TableHeadFeilds.map((item) => (
                                            <TableCell key={item} className={classes.TableHeadCell}>
                                                {item}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {columns.length > 0
                                        ? columns.map((item, index) => (
                                              <TableRow key={item}>
                                                  <TableCell>{item.columnName}</TableCell>
                                                  <TableCell>{item.columnLabel}</TableCell>
                                                  <TableCell>{item.dataType} </TableCell>
                                                  <TableCell>{item.default}</TableCell>
                                                  <TableCell>{item.validationType}</TableCell>
                                                  <TableCell>{item.reference}</TableCell>
                                                  <TableCell>
                                                      {item.allowNull ? CONSTANTS.TRUE : CONSTANTS.FALSE}
                                                  </TableCell>
                                                  <TableCell>
                                                      {item.unique ? CONSTANTS.TRUE : CONSTANTS.FALSE}
                                                  </TableCell>
                                                  <TableCell>
                                                      {item.isRequired ? CONSTANTS.TRUE : CONSTANTS.FALSE}
                                                  </TableCell>
                                                  <TableCell>
                                                      {item.isIndexed ? CONSTANTS.TRUE : CONSTANTS.FALSE}
                                                  </TableCell>
                                                  <TableCell>
                                                      <IconButton className={classes.iconButton} disableRipple>
                                                          <EditIcon onClick={() => handleEdit(index)} />
                                                      </IconButton>
                                                      <IconButton className={classes.iconButton} disableRipple>
                                                          <DeleteIcon onClick={() => handleDeleteRow(index)} />
                                                      </IconButton>
                                                  </TableCell>
                                              </TableRow>
                                          ))
                                        : null}

                                    <TableRow>
                                        <TableCell className={classes.inputCell}>
                                            <CustomInput
                                                name="columnName"
                                                value={columnInput.columnName}
                                                onChange={handleChange}
                                                width={120}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.inputCell}>
                                            <CustomInput
                                                name="columnLabel"
                                                value={columnInput.columnLabel}
                                                onChange={handleChange}
                                                width={120}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.selectCell}>
                                            <SelectOption
                                                options={dataTypesOption}
                                                onChange={handleSelect}
                                                name="dataType"
                                                value={columnInput.dataType}
                                                label={CONSTANTS.SELECT_DATA_TYPE}
                                            />
                                        </TableCell>

                                        <TableCell className={classes.inputCell}>
                                            <CustomInput
                                                name="default"
                                                value={columnInput.default}
                                                onChange={handleChange}
                                                width={120}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.selectCell2}>
                                            <SelectOption
                                                options={validationOptions}
                                                onChange={handleSelect}
                                                name="validationType"
                                                value={columnInput.validationType}
                                                label={CONSTANTS.SELECT_TYPE}
                                            />
                                        </TableCell>
                                        <TableCell className={classes.inputCell}>
                                            <CustomInput
                                                name="reference"
                                                value={columnInput.reference}
                                                onChange={handleChange}
                                                width={120}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                name="allowNull"
                                                color="primary"
                                                checked={columnInput.allowNull === true}
                                                onChange={handleCheck}
                                                className={classes.checkBox}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                name="unique"
                                                color="primary"
                                                checked={columnInput.unique === true}
                                                onChange={handleCheck}
                                                className={classes.checkBox}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                name="isRequired"
                                                color="primary"
                                                checked={columnInput.isRequired === true}
                                                onChange={handleCheck}
                                                className={classes.checkBox}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <Checkbox
                                                name="isIndexed"
                                                color="primary"
                                                checked={columnInput.isIndexed === true}
                                                onChange={handleCheck}
                                                className={classes.checkBox}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton className={classes.checkBox}>
                                                <SaveIcon onClick={handleSave} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid xs={12} item style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 30 }}>
                        <CustomButton variant="contained" color="primary">
                            {CONSTANTS.SAVE}
                        </CustomButton>
                    </Grid>
                </Paper>
            )}
        </Grid>
    );
};

export default Database;
