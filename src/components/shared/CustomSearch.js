import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Close from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

const CustomSearch = (props) => {
    const { loader, searchData, search, setSearch } = props;
    return (
        <TextField
            label="Search"
            InputProps={{
                endAdornment: (
                    <InputAdornment>
                        {search && (
                            <IconButton onClick={() => setSearch('')}>
                                <Close />
                            </IconButton>
                        )}
                        <Tooltip>
                            {!loader ? (
                                <IconButton onClick={searchData}>
                                    <SearchIcon />
                                </IconButton>
                            ) : (
                                <CircularProgress />
                            )}
                        </Tooltip>
                    </InputAdornment>
                )
            }}
            size="small"
            style={{ width: '30%' }}
            id="outlined-search"
            type="text"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value.trimStart())}
        />
    );
};

export default CustomSearch;
