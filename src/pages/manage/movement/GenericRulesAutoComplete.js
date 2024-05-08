/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import factsResponse from './responseWithFacts.json';
import { useSelector, useDispatch } from 'react-redux';
import { getCondition, getAll } from 'redux/actions/manage/rulePageAction';
import PersonIcon from '@material-ui/icons/Person';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import StopIcon from '@material-ui/icons/Stop';
import GroupIcon from '@material-ui/icons/Group';

export default function Grouped({ name, collection, disabled, height, value, onChange, error, inputRef, nextClick }) {
    useEffect(() => {}, [nextClick]);
    return (
        <Autocomplete
            options={collection}
            groupBy={(option) => option.type}
            getOptionLabel={(option) =>
                option?.name === undefined ? (option?.title === undefined ? 'undefine' : option?.title) : option?.name
            }
            disabled={disabled}
            renderOption={(option) => (
                <>
                    {option.collectionName === 'users' && name === 'factTypes' ? (
                        <PersonIcon style={{ marginRight: '10px', opacity: '0.9' }} fontSize="small" color="primary" />
                    ) : option.collectionName === 'devices' && name === 'factTypes' ? (
                        <StopIcon style={{ marginRight: '10px', opacity: '0.9' }} fontSize="small" color="primary" />
                    ) : option.collectionName === 'usergroups' && name === 'factTypes' ? (
                        <GroupIcon style={{ marginRight: '10px', opacity: '0.9' }} fontSize="small" color="primary" />
                    ) : option.collectionName === 'productcodes' && name === 'factTypes' ? (
                        <StopIcon style={{ marginRight: '10px', opacity: '0.9' }} fontSize="small" color="primary" />
                    ) : (
                        name === 'factTypes' && (
                            <ViewModuleIcon
                                style={{ marginRight: '10px', opacity: '0.9' }}
                                fontSize="small"
                                color="primary"
                            />
                        )
                    )}
                    {option?.name === undefined ? option?.title : option?.name ? option?.name : 'undefined'}
                </>
            )}
            renderInput={(params) => (
                <TextField
                    error={error}
                    {...params}
                    style={{ height: height }}
                    inputRef={inputRef}
                    required
                    variant="outlined"
                />
            )}
            onChange={(e, value) => onChange(e, value)}
            value={value ? value : null}
        />
    );
}
