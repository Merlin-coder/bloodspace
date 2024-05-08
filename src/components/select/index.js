import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import MenuList from '@material-ui/core/MenuList';
import { MenuStyles } from './styles';
import { FormHelperText } from '@material-ui/core';
import CheckboxComponent from 'components/checkbox/checkbox.component';

const SelectOption = (props) => {
    //for menu button
    const {
        label,
        disabledLabel,
        onChange,
        options,
        value,
        name,
        error,
        disabled,
        onFocus,
        requiredText,
        diff,
        type,
        ruleType,
        id,
        resolutionName,
        factName,
        decisionName,
        minWidth,
        noLabel,
        onLabelClick,
        isAlert,
        isbtCode,
        defaultValue,
        isCarrier,
        isColumn,
        onOpen,
        placeHolder,
        loading,
        handleSelectCheck,
        checklist,
        multiple
    } = props;
    const classes = MenuStyles();
    return (
        <div>
            <FormControl variant="outlined" fullWidth className={classes.form} error={error}>
                <Select
                    defaultValue={defaultValue}
                    disabled={disabled}
                    name={name}
                    multiple={multiple}
                    value={value ?? ''}
                    style={{ minWidth: minWidth && minWidth }}
                    onChange={onChange}
                    className={classes.root}
                    inputProps={{ 'aria-label': 'Without label' }}
                    // autoFocus={focus}
                    displayEmpty={true}
                    renderValue={
                        value !== undefined
                            ? value !== ''
                                ? undefined
                                : () => <span className={classes.placeHolder}>{placeHolder}</span>
                            : () => <span className={classes.placeHolder}>{placeHolder}</span>
                    }
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left'
                        },
                        getContentAnchorEl: null,
                        style: {
                            maxHeight: '450px',
                            maxWidth: '400px'
                        }
                    }}
                    onOpen={onOpen}
                >
                    {loading && <MenuItem disabled={true}>{'loading....'}</MenuItem>}
                    {noLabel || (
                        <MenuItem onClick={onLabelClick} value={label} disabled={disabledLabel}>
                            {label}
                        </MenuItem>
                    )}
                    {loading === false && options?.length === 0 && <MenuItem disabled={true}>{'Not Found'}</MenuItem>}
                    {options
                        ?.map((option, i) => {
                            return (
                               
                                <MenuItem
                                    style={{ color: '#777777' }}
                                    value={
                                        diff
                                            ? option.description
                                            : type
                                            ? option.type
                                            : ruleType
                                            ? option.ruleType
                                            : id
                                            ? option._id
                                            : factName
                                            ? option.factName
                                            : decisionName
                                            ? option.decisionName
                                            : resolutionName
                                            ? option.resolutionName
                                            : isAlert
                                            ? option.alert
                                            : isbtCode
                                            ? option.isbtcode
                                            : isCarrier
                                            ? option._id
                                            : isColumn
                                            ? option?.dbProperty
                                            : option.name
                                    }
                                    key={i}
                                >
                                    {diff
                                        ? option.description
                                        : type
                                        ? option.type
                                        : ruleType
                                        ? option.ruleType
                                        : factName
                                        ? option.factName
                                        : decisionName
                                        ? option.decisionName
                                        : resolutionName
                                        ? option.resolutionName
                                        : isAlert
                                        ? option.alert
                                        : isbtCode
                                        ? option.isbtcode
                                        : isColumn
                                        ? option?.dbProperty
                                        : option.name}
                                    </MenuItem>
                              
                            );
                        })
                        .sort((a, b) => {
                            if (a && a.name && b && b.name) {
                                let fa = a.name?.toLowerCase();
                                let fb = b.name?.toLowerCase();

                                if (fa < fb) {
                                    return -1;
                                }
                                if (fa > fb) {
                                    return 1;
                                }
                                // console.log('sorting', fa, fb);
                            }
                            return 0;
                        })}
                </Select>
                {error && <FormHelperText>{requiredText} is required</FormHelperText>}
            </FormControl>
        </div>
    );
};
export default SelectOption;
