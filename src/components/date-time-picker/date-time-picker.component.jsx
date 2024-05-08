/* eslint-disable no-useless-escape */

import React from 'react';
// import TodayIcon from '@material-ui/icons/Today';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { dateTimePickerStyles } from './date-time-picker.style';
import CONSTANTS from 'common/constants';
import { TextField } from '@material-ui/core';
import moment from 'moment';

const DateTimePickerComponent = (props) => {
    const {
        value,
        handleDate,
        format,
        disableFuture,
        disablePast,
        disableToolbar,
        color,
        width,
        inputVariant,
        size,
        bgColor,
        height,
        helperTextLabel,
        error,
        allowKeyboardControl,
        maxDate,
        onBlur,
        onFocus,
        regx,
        inputRef,
        placeholder,
        mask,
        refuse,
        variant,
        fontWeight,
        fontSize,
        padding,
        disabled,
        defaultValue,
        readOnly
        //     showInput
    } = props;

    const paddingSize = '14px 12px';
    const classes = dateTimePickerStyles(paddingSize);

    let dynamicProp = refuse ? { refuse, mask } : null;

    //  const renderInput = () => <TextField variant="outlined" type="text" onChange={(e) => console.log(e.target.value)} />;
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
                className={classes.textFeild}
                value={value ?? null}
                allowKeyboardControl={allowKeyboardControl}
                inputVariant={inputVariant}
                size={size}
                style={{ width: width }}
                format={format}
                onChange={handleDate}
                disabled={disabled}
                disableFuture={disableFuture}
                readOnly={readOnly}
                disablePast={disablePast}
                disableMaskedInput={false}
                ampm={true}
                disableToolbar={disableToolbar}
                // maxDate={moment(maxDate).format('YYYY-MM-DD')}
                inputRef={inputRef}
                // //  inputValue = 'ss'
                InputProps={{
                    inputRef: inputRef,
                    readOnly:false,
                    disableunderline: 'true',
                    placeholder: placeholder,
                    style: {
                        fontWeight: fontWeight,
                        height: height,
                        fontSize: fontSize ? fontSize : '14px',
                        color: color,
                        backgroundColor: 'white',
                        padding: padding
                    }
                }}
                error={error}
                helperText={error && helperTextLabel}
                oklabel={'Done'}
                onBlur={onBlur}
                onFocus={onFocus}
                variant={'inline'}
                {...dynamicProp}
                hideTabs={true}
                autoOk={true}
                defaultValue={defaultValue}
                InputAdornmentProps={{ position: "end" }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                disable
            />
        </MuiPickersUtilsProvider>
    );
};

export default DateTimePickerComponent;
