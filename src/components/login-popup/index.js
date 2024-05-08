import React, { useState } from 'react';
import { Button, CircularProgress, Dialog, Grid, InputLabel, Link, Typography } from '@material-ui/core';
import { Alert, CONSTANTS, CustomButton } from 'common';
import { useStyles } from './style';
import CustomPassword from 'components/password';
import CustomInput from 'components/inputfeild';
import Logo from 'components/logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/actions/auth/authActions';

const LoginPopup = (props) => {
    const { open, setOpenLogin } = props;

    const dispatch = useDispatch();
    const classes = useStyles();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const username = user?.data?.user?.username;
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPaswordError] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const onSubmitLogin = () => {
        let loginType = 'web'
        if (!username.match(/[a-zA-Z0-9]+$/)) {
            //doNothing
        } else if (!password.match(/[a-zA-Z0-9]+$/)) {
            //doNothing
        } else {
            dispatch(login(username, password,undefined,loginType));
        }
    };

    const validation = () => {
        username.match(/[a-zA-Z0-9]+$/) ? null : setUserNameError(true);
        password.match(/[a-zA-Z0-9]+$/) ? null : setPaswordError(true);
        onSubmitLogin();
    };

    const handleClose = () => {
        setOpenLogin(false);
    };
    const token = userInfo?.data?.token;
    React.useEffect(() => {
        if (token) {
            handleClose();
        }
        error && setAlertOpen(true);
    }, [error, token]);

    function handleChangePassword(e) {
        setPaswordError(false);
        setPassword(e?.target?.value);
    }
    const onEnterPress = () => {
        onSubmitLogin();
    };
    const handleSubmit = () => {
        validation();
    };

    return (
        <Dialog
            open={open}
            maxWidth="md"
            PaperProps={{
                style: {
                    borderRadius: '10px',
                    backgroundColor: CONSTANTS.COLOR_SECONDARY_MAIN
                }
            }}
        >
            <Grid container direction="row" alignItems="center" justify="center">
                <div className={classes.root}>
                    <Grid
                        // className={classes.logoContainer}
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                    >
                        {/* <Logo /> */}
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.loginCardGrid}
                        justify="center"
                    >
                        <Grid item>
                            <InputLabel className={classes.inputLabel}>{CONSTANTS.USERNAME}</InputLabel>
                            <CustomInput
                                name="userName"
                                value={username}
                                size="md"
                                focus={true}
                                error={userNameError}
                                helperText={userNameError && `${CONSTANTS.ERROR_USERNAMES}`}
                                disabled
                            />
                        </Grid>
                        <Grid item className={classes.passwordInputBox}>
                            <InputLabel className={classes.inputLabel}>{CONSTANTS.PASSWORD}</InputLabel>
                            <CustomPassword
                                name="password"
                                size="md"
                                autoFocus
                                onChange={handleChangePassword}
                                error={passwordError}
                                helperText={passwordError && `${CONSTANTS.ERROR_PASSWORD}`}
                                onEnterPress={onEnterPress}
                            />
                        </Grid>

                        <Grid item className={classes.loginBtnContainer}>
                            <Button
                                disabled={userNameError && passwordError}
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                className={classes.submitBtn}
                            >
                                {loading ? <CircularProgress color="inherit" size={20} /> : 'Login'}
                            </Button>
                        </Grid>
                    </Grid>
                    {alertOpen && error && (
                        <Alert
                            open={alertOpen}
                            message={error}
                            duration={100000}
                            onClose={() => setAlertOpen(false)}
                            vertical={'bottom'}
                            horizontal={'bottom'}
                            severity={'error'}
                            actions={false}
                        />
                    )}
                </div>
            </Grid>
            <Typography className={classes.copyrightText} variant="body2" align="center">
                {CONSTANTS.STRINGS_COPYRIGHT}
                <Link color="inherit" href="https://spacecode.com/">
                    {CONSTANTS.STRINGS_SPACECODE_SAS}
                </Link>{' '}
                {new Date().getFullYear()} {CONSTANTS.STRINGS_ALLRIGHTSRESERVED}
            </Typography>
        </Dialog>
    );
};

export default LoginPopup;
