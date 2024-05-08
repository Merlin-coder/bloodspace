import { TableCell } from '@material-ui/core';
import React from 'react';
import { useCustomStyle } from './style';

const CustomTableCell = (props) => {
    const classes = useCustomStyle();
    return (
        <TableCell align={props.align} key={props.key} className={classes.rowStyle}>
            {props.children}
        </TableCell>
    );
};

export default CustomTableCell;
