import React from 'react';
import { ClickAwayListener, MenuItem, Paper, Popper } from '@material-ui/core';
import { subMenuStyles } from './sub-menu.style';

const SubMenuComponent = (props) => {
    const { menuItems, handleItem, anchorEl, handleClose, placement } = props;
    const classes = subMenuStyles();
    return (
        <Popper
            className={classes.zindex}
            open={Boolean(anchorEl)}
            placement={placement}
            anchorEl={anchorEl}
            transition
        >
            <ClickAwayListener onClickAway={handleClose}>
                <Paper>
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} onClick={handleItem}>
                            {item}
                        </MenuItem>
                    ))}
                </Paper>
            </ClickAwayListener>
        </Popper>
    );
};

export default SubMenuComponent;
