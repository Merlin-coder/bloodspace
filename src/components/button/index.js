import React from 'react';
import Button from '@material-ui/core/Button';
import { CustomButtonStyles } from './style';

const CustomButton = (props) => {
    const classes = CustomButtonStyles();
    const {
        children,
        color,
        variant,
        fullWidth,
        onClick,
        disabled,
        type,
        fontsize,
        width,
        noPadding,
        fontColor,
        bgColor
    } = props;
    return (
        <div>
            <Button
                variant={variant}
                disabled={disabled}
                fullWidth={fullWidth}
                color={color}
                onClick={onClick}
                className={classes.button}
                type={type}
                style={{
                    fontSize: fontsize && fontsize,
                    width: width && width,
                    backgroundColor: bgColor !== undefined ? bgColor : color,
                    color: fontColor !== undefined ? fontColor : null,
                    padding: !noPadding && '5px 30px'
                }}
            >
                {children}
            </Button>
        </div>
    );
};

export default CustomButton;
