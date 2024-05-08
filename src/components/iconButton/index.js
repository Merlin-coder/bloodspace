import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const CustomButton = (props) => {
    const { src, disabled } = props;
    return (
        <IconButton disabled={disabled} color="primary" component="span">
            <img src={src} alt={''} />
        </IconButton>
    );
};

export default CustomButton;
