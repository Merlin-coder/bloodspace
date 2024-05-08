import React, { useState } from 'react';
import {
    TableCell,
    Checkbox,
    Tooltip,
    Button,
    Grid,
    Popper,
    Paper,
    MenuItem,
    ClickAwayListener,
    Menu,
    IconButton
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CustomCheckBox = (props) => {
    const [popperOpen, setPopperOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleExpandMore = (event) => {
        setAnchorEl(event.currentTarget);
        setPopperOpen(!popperOpen);
    };

    const handleMenuItem = (option) => {
        const { pageNum, selectedPages } = props;
        if (option === 'SelectAll') {
            props.handleDialog();
        } else if (option === 'currentPage') {
            props?.handleCheck(selectedPages?.includes(pageNum) ? 'unChecked' : 'checked', 'singlePage', {});
        }
        handleClose();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableCell align="center" key={props.key}>
            <Grid>
                <span style={{ padding: 0, position: 'relative' }}>
                    <Checkbox
                        name={props.name}
                        checked={props.check}
                        onClick={props.onClick}
                        color={'primary'}
                        disabled={props.disabled}
                    />
                    {props.selectAllAccess && (
                        <Tooltip title={'Click To Select All'}>
                            <IconButton style={{ position: 'absolute', right: '-26px', top: '-5px' }} size="small">
                                <ExpandMoreIcon onClick={handleExpandMore} />
                            </IconButton>
                        </Tooltip>
                    )}
                </span>

                {/* <Popper
                    style={{ zIndex: 10 }}
                    anchorEl={anchorEl}
                    open={popperOpen}
                    onClose={handleExpandMore}
                    placement="right-start"
                >
                    <ClickAwayListener onClickAway={handleExpandMore}> 
                        <Paper style={{ zIndex: 10 }}>
                            <MenuItem onClick={() => handleMenuItem('SelectAll')}>{props.selectAllRecords?'UnSelect ALL':'Select ALL'}</MenuItem>
                            <MenuItem onClick={() => handleMenuItem('currentPage')}>
                                {props.selectedPages?.includes(props.pageNum)
                                    ? 'UnSelect Current Page'
                                    : 'Current Page'}
                            </MenuItem>
                        </Paper>
                    </ClickAwayListener>
                </Popper> */}
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                >
                    <MenuItem onClick={() => handleMenuItem('SelectAll')}>
                        {props.selectAllRecords ? 'Unselect ALL' : 'Select ALL'}
                    </MenuItem>
                    {!props.selectAllRecords && (
                        <MenuItem onClick={() => handleMenuItem('currentPage')} disabled={props.selectAllRecords}>
                            {props.selectedPages?.includes(props.pageNum) ? 'Unselect Current Page' : 'Current Page'}
                        </MenuItem>
                    )}
                </Menu>
            </Grid>
        </TableCell>
    );
};
export default CustomCheckBox;
