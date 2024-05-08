import React from 'react';
import AlertComponent from './alert.component';
const colors = {
    success: { color: '#31902D', bgColor: '#ECFAEC' },
    warning: { color: '#da9100', bgColor: '#f7e98e' },
    error: { color: '#f50000', bgColor: '#FAA2A2' },
    info: { color: '#0B3FE4', bgColor: '#B9C9FB' }
};
const Alert = (props) => {
    const { open, onClose, message, duration, vertical, horizontal, severity, actions } = props;

    return (
        <AlertComponent
            open={open}
            onClose={onClose}
            vertical={vertical}
            horizontal={horizontal}
            duration={duration}
            message={message}
            color={colors[severity]?.color}
            bgColor={colors[severity]?.bgColor}
            severity={severity}
            actions={actions}
        />
    );
};
export default Alert;
