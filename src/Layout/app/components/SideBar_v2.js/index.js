/*eslint-disable */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExpandLess as IconExpandLess, ExpandMore as IconExpandMore } from '@material-ui/icons';
import { List, ListItem, ListItemText, Collapse, Popover, Typography } from '@material-ui/core';

// local imports
import { useSidebarStyles } from './style';

function getItemsAll(items) {
    return items.reduce((allItems, item) => {
        // let res = allItems.concat([item])

        if (item.items && item.items.length) {
            return allItems.concat([item], getItemsAll(item.items));
        } else {
            return allItems.concat([item]);
        }
    }, []);
}
const SideBar = (props) => {
    const { name, icon, items = [], path, handleDrawerClose } = props;
    const location = useLocation();
    const isLinkActive = path && location.pathname === path;
    const classes = useSidebarStyles();
    const isExpandable = items && items.length > 0;
    const itemsAll = getItemsAll(items);
    const isChildLinkActive = isExpandable && itemsAll.filter((item) => item.path === location.pathname).length > 0;
    const isOpen = isChildLinkActive || false;
    const [openList, setOpenList] = React.useState(isOpen);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    function handleClick() {
        handleDrawerClose();
        setOpenList(!openList);
    }
    const MenuItemRoot = (
        <ListItem
            button
            component={path && Link}
            to={path}
            className={classes.menuItem}
            onClick={handleClick}
            selected={isLinkActive}
            classes={{
                button: classes.listItemButton
            }}
            onMouseEnter={isExpandable && handlePopoverOpen}
            onMouseLeave={isExpandable && handlePopoverClose}
        >
            {icon}
            <ListItemText primary={name} className={classes.listitemText} />

            {isExpandable && !openList && <IconExpandMore />}
            {isExpandable && openList && <IconExpandLess />}
        </ListItem>
    );

    const MenuItemChildren = isExpandable ? (
        <Popover
            className={classes.popover}
            classes={{
                paper: classes.paper
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
            onClose={handlePopoverClose}
        >
            <List component="div" disablePadding>
                {items.map((item, index) => (
                    <Sublist {...item} key={index} handleDrawerClose={handleDrawerClose} />
                ))}
            </List>
        </Popover>
    ) : null;
    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    );
};
const Sublist = (props) => {
    const { name, icon, path, handleDrawerClose } = props;
    const location = useLocation();
    const isLinkActive = path && location.pathname === path;
    const classes = useSidebarStyles();

    function handleClick() {
        handleDrawerClose();
    }
    return (
        <ListItem
            button
            component={path && Link}
            to={path}
            onClick={handleClick}
            className={classes.menuItem}
            selected={isLinkActive}
            classes={{
                selected: classes.listItemSelected,
                button: classes.listItemButton
            }}
        >
            <ListItemText primary={name} inset={!icon} />
        </ListItem>
    );
};

export default SideBar;
