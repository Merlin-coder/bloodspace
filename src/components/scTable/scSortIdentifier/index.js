import React from 'react';
import { Divider, Grow } from '@material-ui/core';
import { useCustomStyle } from './styles';

const CustomInput = (props) => {
    const classes = useCustomStyle();
    return (
        <Grow in={true} timeout={700}>
            <Divider className={props.sort === 1 ? classes.top : classes.bottom} orientation="horizontal" />
        </Grow>
    );
};
export default CustomInput;
