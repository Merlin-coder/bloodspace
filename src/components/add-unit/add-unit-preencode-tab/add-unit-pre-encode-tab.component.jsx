import React from 'react';
import AddUnitForm from '../add-unit-form/add-unit-form.container';
import AddUnitGridTable from '../add-unit-grid-table/add-unit-grid-table.container';
import { Button, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './add-unit-pre-encoded-tab-style';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { DialogTitle } from '@material-ui/core';

const Pre_encodedTabComponent = (props) => {
    const {
        isGridPageOpen,
        setIsGridPageOpen,
        counterValue,
        counterIncrease,
        setIsDialogBoxOpen,
        isDialogBoxOpen
    } = props;
};
export default Pre_encodedTabComponent;
