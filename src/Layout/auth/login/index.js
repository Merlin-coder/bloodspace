import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, CircularProgress, Grid, InputLabel, Link, Typography } from '@material-ui/core';
import ReactCardFlip from 'react-card-flip';

// local imports
import Logo from '../../../components/logo/Logo';
import CustomPassword from '../../../components/password/index';
import CustomInput from '../../../components/inputfeild/index';
import CheckBox from '../../../components/checkbox/checkbox.container';
import CONSTANTS from '../../../common/constants';
import { useLoginPageStyles } from './style';
import {
    login,
    getOtpLogin,
    forgotPasswordApi,
    clearOtpState,
    verifyOtpAndPassword,
    clearNewPasswordSuccess,
    clearLoginState,
    clearForgotPassowrdResponse
} from '../../../redux/actions/auth/authActions';
import Alert from '../../../components/alert/alert.container';
import { getDrawer, getLicense } from 'redux/actions/settings/drawerActions';
import { getUserAccessDrawerCodes } from 'redux/actions/userAccessRoutingActions';

const LoginPage = () => {
    const history = useHistory();
    const classes = useLoginPageStyles();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [btnText, setBtntext] = useState(`${CONSTANTS.LOGIN_BUTTON}`);
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPaswordError] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [otpLogin, setOtpLogin] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [checked, setChecked] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [emailValue, setEmailValue] = useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { otpLoading, getOtpSuccess, getOtpError } = useSelector((state) => state.otpRequest);

    const { drawerResponse, drawerError } = useSelector((state) => state.getDrawer);
    const { loading, error, userInfo } = userLogin;

    console.log("user---------",userInfo)

    const [otp, setOtp] = useState('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSnackbarSeverity] = useState('');

    const [frontScreen, setFrontScreen] = useState('mainLoginPart');
    const [backScreen, setBackScreen] = useState('otpLoginPart');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPasword] = useState('');

    const { forgotPasswordResponse, forgotPasswordError } = useSelector((state) => state.forgotPasswordResponse);

    const { newPasswordSuccess, newPasswordError } = useSelector((state) => state.verifyForgotPassword);

    const checkAtLeastLength = (expression, length) => expression && expression.trim().length >= length;
    const isValidFun = (expression) => checkAtLeastLength(expression, 0);
    const onSubmitLogin = () => {
        let loginType = 'web'
        if (!isValidFun(username)) {
            //doNothing
        } else if (!isValidFun(password)) {
            //doNothing
        } else {
            dispatch(login(username, password,undefined,loginType));
        }
    };

    function handleForgotPasswordClick(forgotPass) {
        setFlipped(!flipped);
        flipped ? setFrontScreen('forgotPasswordPart') : setBackScreen('forgotPasswordPart');
    }

    const validation = () => {
        isValidFun(username) ? null : setUserNameError(true);
        isValidFun(password) ? null : setPaswordError(true);
        checked ? handleOtpLogin() : onSubmitLogin();
    };
    const otpLoginValidation = () => {
        username.match(/[a-zA-Z0-9]+$/) ? null : setUserNameError(true);
        password.match(/^[a-zA-Z0-9&._-]+$/) ? null : setPaswordError(true);
    };
    useEffect(() => {
        let manageAccessCodes =
            userInfo?.data?.userAccess?.filter((item) => item?.isVisible === 1)?.map((item) => item?.['drawer-code']) ||
            [];
        let obj = drawerResponse?.data?.filter((item) => manageAccessCodes?.some((x) => x === item.code));
        let arrayOfPaths = obj?.filter((item) => item?.path).map((item) => item.path);

        if (userInfo?.status) {
            console.log('initial drawer api call and get license call');
            dispatch(getLicense());
            dispatch(getDrawer(userInfo?.data?.user?.['useraccessrole-code']));
            dispatch(getUserAccessDrawerCodes([]));
            userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1002'
                ? history.push('/dashboard')
                : Array.isArray(arrayOfPaths) &&
                  arrayOfPaths?.length &&
                  history.push(arrayOfPaths[arrayOfPaths?.length - 1]);

            setUserName('');
            setPassword('');
            flipped ? setFrontScreen('mainLoginPart') : setBackScreen('mainLoginPart');
        }
        if (error) {
            username && password && showSnackbar(true, error, 'error');
        }
        return () => {
            dispatch(clearOtpState());
            dispatch(clearLoginState());
            dispatch(clearForgotPassowrdResponse());
        };
    }, [userInfo, error]);
    function handleOtpLogin() {
        dispatch(getOtpLogin(username, password));
    }

    useEffect(() => {
        if (getOtpSuccess && getOtpSuccess?.status) {
            setFlipped(!flipped);
            flipped ? setFrontScreen('otpLoginPart') : setBackScreen('otpLoginPart');
            showSnackbar(true, getOtpSuccess.message, 'success');
        }
        if (getOtpError) {
            showSnackbar(true, getOtpError, 'error');
        }
    }, [getOtpSuccess, getOtpError]);

    useEffect(() => {
        // emailValue && forgotPasswordResponse && forgotPasswordResponse.status && setFlipped(true);
        if (forgotPasswordResponse && forgotPasswordResponse?.status) {
            setFlipped(!flipped);
            flipped ? setFrontScreen('changePasswordPart') : setBackScreen('changePasswordPart');
            showSnackbar(true, forgotPasswordResponse.message, 'success');
        } else if (forgotPasswordError) {
            showSnackbar(true, forgotPasswordError.errorMessage || forgotPasswordError, 'error');
        }
    }, [forgotPasswordResponse, forgotPasswordError]);

    function handleChangeCheckBox(event) {
        setChecked(event.target.checked);
        if (checked === true) {
            setBtntext(`${CONSTANTS.LOGIN_BUTTON}`);
            setOtpLogin(false);
        } else {
            // otpLoginValidation();
            setBtntext(`${CONSTANTS.LOGIN_OTPBUTTON}`);
            setOtpLogin(true);
        }
    }

    function handleChangeUserName(e) {
        setUserNameError(false);
        setUserName(e.target.value);
    }
    function handleChangePassword(e) {
        setPaswordError(false);
        setPassword(e.target.value);
    }
    const onEnterPress = () => {
        checked ? handleOtpLogin() : onSubmitLogin();
    };
    const handleSubmit = () => {
        if (checked) {
            setOtpLogin(true);
            validation();
        } else {
            validation();
        }
    };

    const handleSubmitEamil = () => {
        // if (emailValue.includes('@') && emailValue.includes('.') && emailValue.length > 7) {
        dispatch(forgotPasswordApi(emailValue));
        // } else {
        //     showSnackbar(true, 'Please Enter A valid Email', 'error');
        // }
    };

    const handleNewPasswordSubmit = () => {
        if (newPassword === confirmPassword) {
            dispatch(verifyOtpAndPassword(emailValue, otp, confirmPassword));
        } else {
            showSnackbar(true, 'Passwords should Match', 'error');
        }
    };

    const handlePasswordChanged = () => {
        setFlipped((prev) => !prev);
    };

    useEffect(() => {
        if (
            newPasswordSuccess &&
            newPasswordSuccess.status === true &&
            newPasswordSuccess &&
            newPasswordSuccess.message !== 'Failed'
        ) {
            showSnackbar(true, newPasswordSuccess.message, 'success', 'passwordSuccess');
            setEmailValue('');
            setNewPassword('');
            setConfirmPasword('');
            setOtp('');
            setFlipped(!flipped);
            flipped ? setFrontScreen('mainLoginPart') : setBackScreen('mainLoginPart');
            newPasswordSuccess.status === true && dispatch(clearNewPasswordSuccess());
        } else if (newPasswordSuccess && newPasswordSuccess.message === 'Failed') {
            showSnackbar(true, newPasswordSuccess.error, 'error');
        } else if (newPasswordError) {
            showSnackbar(true, newPasswordError.errorMessage || newPasswordError, 'error');
        }
    }, [newPasswordSuccess, newPasswordError]);

    const showSnackbar = (isopen, message, severity, passwordSuccess) => {
        setSnackbarMessage(`${message}`);
        setSnackbarSeverity(severity);
        setOpenSnackbar(isopen);
        if (passwordSuccess) {
            handlePasswordChanged();
        }
    };

    const letsFlip = (message, type) => {
        setFlipped((prev) => !prev);
        showSnackbar(true, message, type);
    };

    const verifyOtpText = () => {
        if (otp.length > 5) {
            dispatch(login(username, password, otp));
        } else {
            showSnackbar(true, 'Enter Valid Otp', 'error');
        }
    };

    const handleBackButtonClick = () => {
        setFlipped(!flipped);
        flipped ? setFrontScreen('mainLoginPart') : setBackScreen('mainLoginPart');
    };

    const logoPart = (
        <Grid className={classes.logoContainer} container direction="row" alignItems="center" justify="center">
           <Logo />
        </Grid>
    );
    const loginButton = (
        <Grid
            item
            className={classes.loginBtnContainer}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="column-end"
        >
            <Button
                disabled={userNameError && passwordError}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.submitBtn}
            >
                {loading ? <CircularProgress color="inherit" size={20} /> : `${btnText}`}
            </Button>
        </Grid>
    );

    const mainLoginPart = (
        <Grid container direction="row" alignItems="center" className={classes.loginCardGrid} justify="center">
            <Grid item>
                <InputLabel className={classes.inputLabel}>{CONSTANTS.USERNAME}</InputLabel>
                <CustomInput
                    name="userName"
                    value={username}
                    onChange={handleChangeUserName}
                    size="md"
                    focus={true}
                    error={userNameError}
                    helperText={userNameError && `${CONSTANTS.ERROR_USERNAMES}`}
                />
            </Grid>
            <Grid item className={classes.passwordInputBox}>
                <InputLabel className={classes.inputLabel}>{CONSTANTS.PASSWORD}</InputLabel>
                <CustomPassword
                    name="password"
                    size="md"
                    value={password}
                    autoFocus
                    onChange={handleChangePassword}
                    error={password.length > 4 ? null : passwordError}
                    helperText={passwordError && `${CONSTANTS.ERROR_PASSWORD}`}
                    onEnterPress={onEnterPress}
                />
            </Grid>
            <Grid item className={classes.secureLoginContainer}>
                <Grid container direction="row" alignItems={'center'} spacing={4}>
                    <Grid item>
                        <CheckBox
                            checked={checked}
                            handleChange={handleChangeCheckBox}
                            label={CONSTANTS.SECURE_LOGIN}
                        />
                    </Grid>
                    <Grid item>
                        {otpLogin ? (
                            <Typography
                                variant="subtitle2"
                                component={Link}
                                className={classes.forgotPasswordText}
                                onClick={() => handleForgotPasswordClick('forGot')}
                            >
                                {CONSTANTS.STRINGS_FORGOTPASSWORD}
                            </Typography>
                        ) : (
                            <Typography
                                variant="subtitle2"
                                component={Link}
                                onClick={handleForgotPasswordClick}
                                className={classes.forgotPasswordText}
                            >
                                {CONSTANTS.STRINGS_FORGOTPASSWORD}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            {loginButton}
        </Grid>
    );

    const sendButton = (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="column-end"
            className={classes.otpSendBtn}
        >
            <Button variant="contained" color="primary" onClick={() => letsFlip(true, 'TryThisTIme', 'success')}>
                {CONSTANTS.SEND_BUTTON}
            </Button>
        </Grid>
    );

    const forgotPasswordPart = (
        <>
            <Typography variant="h5" color="textSecondary" align="center" className={classes.typographyH6}>
                {CONSTANTS.STRINGS_FORGOTYOURPASS}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" align="center" className={classes.typographySubtitle}>
                {CONSTANTS.STRINGS_FORGOTPASS_SUBHEADING}
            </Typography>
            <Grid
                container
                direction="row"
                spacing={1}
                alignItems="flex-end"
                justify="center"
                className={classes.otpEmailInputBox}
            >
                <Grid item>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.EMAIL}</InputLabel>
                    <CustomInput
                        size="md"
                        autoFocus
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        onEnterPress={handleSubmitEamil}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="column-end"
                className={classes.otpSendBtn}
            >
                <Button variant="contained" color="primary" onClick={handleSubmitEamil}>
                    {'SUBMIT'}
                </Button>
            </Grid>
        </>
    );

    const changePasswordPart = (
        <>
            <Grid
                container
                alignItems="flex-end"
                justify="center"
                spacing={4}
                style={{ marginTop: 70 }}

                // className={classes.otpEmailInputBox}
            >
                <Grid item>
                    <InputLabel className={classes.inputLabel}>{'Enter OTP'}</InputLabel>
                    <CustomInput size="md" autoFocus value={otp} onChange={(e) => setOtp(e.target.value)} />
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="flex-end"
                justify="center"
                spacing={4}
                // className={classes.otpEmailInputBox}
            >
                <Grid item>
                    <InputLabel className={classes.inputLabel}>{'Enter New Password'}</InputLabel>
                    <CustomInput
                        size="md"
                        autoFocus
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="flex-end"
                justify="center"
                spacing={4}
                // className={classes.otpEmailInputBox}
            >
                <Grid item>
                    <InputLabel className={classes.inputLabel}>{'Confirm Password'}</InputLabel>
                    <CustomInput
                        size="md"
                        autoFocus
                        value={confirmPassword}
                        onChange={(e) => setConfirmPasword(e.target.value)}
                        onEnterPress={handleNewPasswordSubmit}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="column-end"
                className={classes.otpSendBtn}
            >
                <Button variant="contained" color="primary" onClick={handleNewPasswordSubmit}>
                    {'SUBMIT'}
                </Button>
            </Grid>
        </>
    );

    const otpLoginPart = (
        <>
            {' '}
            <Typography variant="h5" color="textSecondary" align="center" className={classes.typographyH6}>
                {CONSTANTS.STRINGS_OTPLOGIN}
            </Typography>
            <Typography
                variant="subtitle2"
                color="textSecondary"
                align="center"
                className={classes.typographyOTPSubtitle}
            >
                {CONSTANTS.STRINGS_OTPLOGIN_SUBHEADING}
            </Typography>
            <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.OTPInputBox}>
                <Grid item>
                    <InputLabel className={classes.inputLabel}>{CONSTANTS.OTP}</InputLabel>
                    <CustomInput size="md" autoFocus value={otp} onChange={(e) => setOtp(e.target.value)} />
                </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.backBtnContainer}>
                <Grid item xs={6} md={6}>
                    <Typography
                        variant="subtitle2"
                        component={Link}
                        onClick={handleBackButtonClick}
                        className={classes.forgotPasswordText}
                    >
                        {CONSTANTS.STRINGS_BACK}
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="column-end"
                className={classes.otpSendBtn}
            >
                <Button variant="contained" color="primary" onClick={verifyOtpText}>
                    {'SUBMIT'}
                </Button>
            </Grid>
        </>
    );

    const snackBar = (
        <Alert
            open={openSnackbar}
            message={snackbarMessage}
            duration={2000}
            onClose={() => setOpenSnackbar(false)}
            vertical={'bottom'}
            horizontal={'bottom'}
            severity={severity}
            actions={false}
        />
    );

    return (
        <>
            <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
                <Grid container direction="row" alignItems="center" justify="center">
                    <div className={classes.root}>
                        {logoPart}
                        {frontScreen === 'mainLoginPart' && mainLoginPart}
                        {frontScreen === 'forgotPasswordPart' && forgotPasswordPart}
                        {frontScreen === 'otpLoginPart' && otpLoginPart}
                        {frontScreen === 'changePasswordPart' && changePasswordPart}
                        {snackBar}
                    </div>
                </Grid>
                <Grid container direction="row" alignItems="center" justify="center">
                    <div className={classes.root}>
                        {logoPart}
                        {backScreen === 'otpLoginPart' && otpLoginPart}
                        {backScreen === 'changePasswordPart' && changePasswordPart}
                        {backScreen === 'forgotPasswordPart' && forgotPasswordPart}
                        {backScreen === 'mainLoginPart' && mainLoginPart}
                        {snackBar}
                    </div>
                </Grid>
            </ReactCardFlip>
            <Typography className={classes.copyrightText} variant="body2" align="center">
                {CONSTANTS.STRINGS_COPYRIGHT}
                <Link color="inherit" href="https://spacecode.com/">
                    {CONSTANTS.STRINGS_SPACECODE_SAS}
                </Link>{' '}
                {new Date().getFullYear()} {CONSTANTS.STRINGS_ALLRIGHTSRESERVED}
            </Typography>
        </>
    );
};

export default LoginPage;
