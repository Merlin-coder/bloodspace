import React from 'react';
import DatePickerComponent from './date-picker.component';

const DatePicker = (props) => {
    const {
        value,
        handleDate,
        format,
        disableFuture,
        disablePast,
        disableToolbar,
        width,
        inputVariant,
        size,
        fontWeight,
        allowKeyboardControl,
        color,
        height,
        onFocus,
        onBlur,
        error,
        maxDate,
        helperText,
        minDate,
        variant,
        id,
        fontSize,
        placeholder,
        disabled,
        padding,
        refuse,
        mask,
        inputRef
    } = props;
    return (
        <DatePickerComponent
            id={id}
            allowKeyboardControl={allowKeyboardControl}
            value={value}
            handleDate={handleDate}
            disablePast={disablePast}
            format={format}
            disableFuture={disableFuture}
            disableToolbar={disableToolbar}
            width={width}
            size={size}
            inputVariant={inputVariant}
            fontWeight={fontWeight}
            color={color}
            height={height}
            onFocus={onFocus}
            onBlur={onBlur}
            error={error}
            maxDate={maxDate}
            helperText={helperText}
            minDate={minDate}
            variant={variant}
            fontSize={fontSize}
            placeholder={placeholder}
            disabled={disabled}
            padding={padding}
            refuse={refuse}
            mask={mask}
            inputRef={inputRef}
        />
    );
};

export default DatePicker;
