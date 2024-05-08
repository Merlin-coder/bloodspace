import React from 'react';
import { useCustomStyle } from './styles';
import TableCell from '@material-ui/core/TableCell';
import { SortableElement } from 'react-sortable-hoc';

const SortableCell = SortableElement(({ value, align, classes }) => {
    return (
        <div
            className={classes.cell}
            style={{
                paddingLeft: '15px',
                textAlign: align === 'left' ? 'left' : align === 'right' ? 'right' : 'center'
            }}
        >
            {value}
        </div>
    );
});

const CustomSortableCell = (props) => {
    const classes = useCustomStyle();
    return (
        <SortableCell
            index={props.index}
            key={props.key}
            align={'left'}
            value={props.colIdx === 'Check' || props.colIdx.label}
            classes={classes}
        />
    );
};
export default CustomSortableCell;
