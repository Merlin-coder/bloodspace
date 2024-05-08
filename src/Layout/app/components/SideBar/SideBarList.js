import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExpandLess as IconExpandLess, ExpandMore as IconExpandMore } from '@material-ui/icons';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';

// local imports
import { useSidebarStyles } from './style';
import { useSelector } from 'react-redux';

// import myConsole from '../common/myConsoleLog';

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

const SideBarList = (props) => {
    const { name, icon, items = [], path, handleDrawerClose } = props;
    const location = useLocation();
    const isLinkActive = path && location.pathname === path;
    const classes = useSidebarStyles();
    const isExpandable = items && items.length > 0;
    const itemsAll = getItemsAll(items);
    const isChildLinkActive = isExpandable && itemsAll.filter((item) => item.path === location.pathname).length > 0;
    const isOpen = isChildLinkActive || false;
    const [openList, setOpenList] = React.useState(isOpen);
    // const [reportViewAcces, setReportViewAcces] = React.useState(false);

    function handleClick() {
        isExpandable ? '' : handleDrawerClose();
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
        >
            <div className={classes.icon}>{icon}</div>
            <ListItemText primary={name} className={classes.listitemText} />

            {isExpandable && !openList && <IconExpandMore />}
            {isExpandable && openList && <IconExpandLess />}
        </ListItem>
    );

    const MenuItemChildren = isExpandable ? (
        <Collapse in={openList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {items.map((item, index) => {
                    return (
                        <Sublist
                            {...item}
                            key={index}
                            route={item.type === 'manage' ? true : item.type === 'reports' ? true : false}
                            handleDrawerClose={handleDrawerClose}
                        />
                    );
                })}
            </List>
        </Collapse>
    ) : null;

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    );
};
const Sublist = (props) => {
    const { name, icon, path, handleDrawerClose, route } = props;
    const location = useLocation();
    const isLinkActive = path && location.pathname === path;
    const classes = useSidebarStyles();

    function handleClick() {
        console.log("handleClick")
        handleDrawerClose();
    }

    return (
        <ListItem
            button
            component={path && Link}
            to={route && path}
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

export default SideBarList;
