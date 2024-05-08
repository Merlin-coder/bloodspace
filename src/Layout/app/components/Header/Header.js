import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    IconButton,
    Tooltip
} from '@material-ui/core';
import {
    ExpandLess,
    ExpandMore,
    ExitToApp as ExitToAppIcon,
    Palette as PaletteIcon,
    AccountCircleOutlined as AccountIcon
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

//local imports
import { deviceLogout, logout } from '../../../../redux/actions/auth/authActions';
import { useHeaderStyles } from './style';
import { themeSwitch } from 'redux/actions/settings/themeSwitchAction';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const classes = useHeaderStyles();
    const history = useHistory();
    const { userInfo } = useSelector((state) => state.userLogin);
    let remoteInfo = JSON.parse(localStorage.getItem('remoteInfo'));
    const [anchorEl, setAnchorEl] = useState(null);
    // eslint-disable-next-line
    const open = Boolean(anchorEl);
    const [open1, setOpen1] = useState(false);

    const handleClick1 = () => {
        setOpen1(!open1);
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(deviceLogout());
        console.log(userInfo?.data?.user?.username);
        if (remoteInfo.remoteLogin === "TRUE") {
            history.push('/remotelogin');
        }
        else {
            history.push('/login');
        }
         
    }

    const handleProfile = () => {
        history.push('/dashboard/accounts/edit');
        handleClose();
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const colors = [
        {
            class: classes.primary,
            onClick: () => {
                dispatch(themeSwitch('primary'));
            },
            title: 'Primary'
        },
        {
            class: classes.magenta,
            onClick: () => {
                dispatch(themeSwitch('magenta'));
            },
            title: 'Magenta'
        },
        {
            class: classes.red,
            onClick: () => {
                dispatch(themeSwitch('red'));
            },
            title: 'Red'
        },
        {
            class: classes.green,
            onClick: () => {
                dispatch(themeSwitch('green'));
            },
            title: 'Green'
        },
        {
            class: classes.purple,
            onClick: () => {
                dispatch(themeSwitch('purple'));
            },
            title: 'Purple'
        },
        {
            class: classes.dark,
            onClick: () => {
                dispatch(themeSwitch('dark'));
            },
            title: 'Dark'
        }
    ];

    return (
        <>
            <List>
                <ListItem button onClick={handleMenu} className={classes.loginList}>
                    <div className={classes.subList}>
                        <ListItemText
                            primary={
                                <Typography type="body2" className={classes.userNameToolbar}>
                                    {userInfo?.data?.user.firstName} {userInfo?.data?.user.lastName}
                                </Typography>
                            }
                            secondary={
                                <Typography type="caption" className={classes.usertypeToolbar}>
                                    {/* {userInfo?.data.user.metaData[0].value} */}
                                </Typography>
                            }
                            className={classes.userListToolbar}
                        />
                    </div>
                    {open ? (
                        <ExpandLess className={classes.appBarExpandIcon} style={{ marginTop: 1 }} />
                    ) : (
                        <ExpandMore className={classes.appBarExpandIcon} style={{ marginTop: 1 }} />
                    )}
                </ListItem>
            </List>

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
                <MenuItem className={classes.simpleMenu} onClick={handleProfile}>
                    <AccountIcon className={classes.accountIcon} /> My Account
                </MenuItem>
                <MenuItem className={classes.simpleMenu} onClick={handleLogout}>
                    <ExitToAppIcon className={classes.logoutIcon} /> Logout
                </MenuItem>

                <List className={classes.nestedMenu}>
                    <ListItem button onClick={handleClick1}>
                        <ListItemIcon>
                            <PaletteIcon className={classes.paletteIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Theme Color" className={classes.toolbarListText} />
                        {open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem className={classes.nested}>
                                {colors.map((clr, index) => (
                                    <Tooltip title={clr.title} key={index}>
                                        <IconButton size="small" onClick={clr.onClick}>
                                            <span className={clr.class} />
                                        </IconButton>
                                    </Tooltip>
                                ))}
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Menu>
        </>
    );
};

export default Header;
