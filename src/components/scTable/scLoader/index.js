import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useCustomStyle } from './style';

const CustomTableLoader = () => {
    const classes = useCustomStyle();
    return (
        <div className={classes.loader}>
            <CircularProgress />
        </div>
    );
};

export default CustomTableLoader;
