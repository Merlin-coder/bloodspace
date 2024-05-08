import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { datePickerStyles } from './date-picker.styles';
import CONSTANTS from 'common/constants';

const DatePickerComponent = (props) => {
    const classes = datePickerStyles();
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
    let dynamicProp = refuse ? { refuse, mask } : null;
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                id={id}
                className={classes.root}
                value={value ?? null}
                autoOk={true}
                allowKeyboardControl={allowKeyboardControl}
                inputVariant={inputVariant}
                size={size}
                style={{ width: width }}
                format={format}
                onChange={handleDate}
                disableFuture={disableFuture}
                disablePast={disablePast}
                ampm={true}
                disableToolbar={disableToolbar}
                inputRef={inputRef}
                InputProps={{
                    disableunderline: 'true',
                    readOnly:false,
                    placeholder: placeholder ? placeholder : format,
                    style: {
                        fontWeight: fontWeight,
                        height: height,
                        fontSize: fontSize ? fontSize : '14px',
                        color: color,
                        backgroundColor: 'white',
                        padding: padding
                    }
                }}
                oklabel={'Done'}
                onBlur={onBlur}
                onFocus={onFocus}
                error={error}
                helperText={error && `${CONSTANTS.INVALID} ${helperText}`}
                maxDate={maxDate}
                minDate={minDate}
                variant={variant}
                {...dynamicProp}
                disabled={disabled}
                InputAdornmentProps={{ position: "end" }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                disable
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePickerComponent;
