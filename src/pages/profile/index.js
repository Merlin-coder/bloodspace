import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useStyles } from './style';
import EditProfile from './components/EditProfile';
import Notifications from './components/Notifications';
import Password from './components/Password';
import { getProfileDetails } from '../../redux/actions/profileDeatils/profileDetails';
import { useSelector, useDispatch } from 'react-redux';

const ProfilePage = () => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const path = location.pathname;
    const userId = useSelector((state) => state.userLogin?.userInfo?.data?.user?._id);
    const profileDetails = useSelector((state) => state?.profileDetails);
    const dispatch = useDispatch();

    React.useState(() => {
        if (userId) {
            dispatch(getProfileDetails(userId));
        }
    }, [userId]);

    function handleSelected(index) {
        switch (index) {
            case 0:
                return path.includes('edit');
            case 1:
                return path.includes('notifications');
            case 2:
                return path.includes('password');
            default:
                break;
        }
    }
    function handleListClick(index) {
        switch (index) {
            case 0:
                history.push('/dashboard/accounts/edit');
                break;
            case 1:
                history.push('/dashboard/accounts/notifications');
                break;
            case 2:
                history.push('/dashboard/accounts/password');
                break;

            default:
                break;
        }
    }
    const options = ['Edit Profile', 'Notifications', 'Password and Security'];

    const drawer = (
        <List>
            {options.map((option, index) => (
                <ListItem
                    key={option}
                    button
                    selected={handleSelected(index)}
                    onClick={() => handleListClick(index)}
                    classes={{
                        selected: classes.listItemSelected,
                        button: classes.listItemButton
                    }}
                >
                    <ListItemText primary={option} />
                </ListItem>
            ))}
        </List>
    );
    return (
        <section className={classes.section}>
            <nav>
                <Drawer
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.permanentDrawerPaper,
                        root: classes.permanentDrawerRoot
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <main>
                {path.includes('edit') && <EditProfile />}
                {path.includes('notifications') && <Notifications />}
                {path.includes('password') && <Password />}
            </main>
        </section>
    );
};

export default ProfilePage;
