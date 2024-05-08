import React from 'react';
import { useCustomStyle } from './styles';
import TableCell from '@material-ui/core/TableCell';
import SortIdentifier from '../scSortIdentifier';
import SortableMyCell from '../scSortableCell';

export const MainSortableCell = (props) => {
    const classes = useCustomStyle();
    return (
        <TableCell className={classes.table} onClick={props.onClick}>
            {props.sort?.key === props.colIdx?.dbProperty && props.sort?.value === 1 ? (
                <SortIdentifier sort={props.sort?.value} />
            ) : null}
            <SortableMyCell index={props.index} key={props.colIdx} colIdx={props.colIdx} />
            {props.sort?.key === props.colIdx?.dbProperty && props.sort?.value === -1 ? (
                <SortIdentifier sort={props.sort?.value} />
            ) : null}
        </TableCell>
    );
};
