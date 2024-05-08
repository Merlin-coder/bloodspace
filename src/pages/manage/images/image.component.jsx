import React from 'react';
import { Dialog, Divider, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { CustomButton, CustomSearch } from 'common';
import { useStyles } from './styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import 'font-awesome/css/font-awesome.min.css';
import BackupIcon from '@material-ui/icons/Backup';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Image from 'material-ui-image';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Video from '../../../common/vidoes.mp4';

import axios from 'axios';
import { DropzoneDialog } from 'material-ui-dropzone';
import Loader from 'components/loader/loader.container';

const ImageComponent = () => {
    const classes = useStyles();
    const [imgData, setImgData] = React.useState([]);
    const [iconOpen, setIconOpen] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState();
    const [extraImage, setExtraImage] = React.useState([]);
    const [slideImage, setSlideImage] = React.useState([]);
    const [imageSlideIndex, setImageSlideIndex] = React.useState(0);
    const [showDefaultBtn, setShowDefaultBtn] = React.useState(false);

    const initialState = {
        open: false,
        files: []
    };
    const [state, setState] = React.useState(initialState);

    const handleOpen = () => {
        setState({
            ...state,
            open: true
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false
        });
    };

    const handleSave = (files) => {
        setState({
            ...state,
            files: files,
            open: false
        });
    };
    const handleTick = (x) => {
        setSelected((prev) => [...prev, x]);
    };
    const handleTickRemove = (x) => {
        const filt = selected.filter((sel) => sel.id !== x.id);
        setSelected(filt);
    };

    function handleScroll() {
        if (
            Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight
        )
            return;
        setPage((prev) => prev + 1);
    }
    const getImage = async (page) => {
        setLoading(true);
        const data = await axios.get(
            `https://api.unsplash.com/search/photos?page=${page}&query=ring&client_id=l_vHKHQZ0I3qa27UQpQxYRyAk-x3wzTDsbPQkjWrNGU`
        );

        setImgData((prevData) => [...prevData, ...data.data.results]);
        setLoading(false);
    };
    React.useEffect(() => {
        getImage(page);
        getImage(page + 1);
    }, [page]);
    React.useEffect(() => {
        if (extraImage) {
            setSlideImage([previewImage, ...extraImage]);
        }
    }, [dialogOpen]);
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        window.onscroll = function () {
            myFunction();
        };

        var header = document.getElementById('myHeader');
        var sticky = header.offsetTop;

        function myFunction() {
            if (window.pageYOffset > sticky) {
                header.style.position = 'fixed';
                header.style.marginTop = '-20px';
                header.style.width = '97%';
                header.style.zIndex = '100';
            } else {
                header.style.position = 'static';
                header.style.marginTop = 'unset';
                header.style.width = 'unset';
                header.style.zIndex = 'unset';
            }
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const selectIcon = (x) => {
        if (selected.includes(x)) {
            return <CheckBoxIcon className={classes.rootSelected} onClick={() => handleTickRemove(x)} />;
        } else {
            return <CheckBoxOutlineBlankIcon className={classes.root} onClick={() => handleTick(x)} />;
        }
    };
    return (
        <Grid>
            <div id="myHeader">
                <Grid container justify="space-between" className={classes.wrapper}>
                    <Grid item xs={7}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={5}>
                                <CustomSearch size="md" />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h6" color="primary">
                                    {imgData?.length} Images
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container alignItems="center" justify="flex-end" className={classes.deleteIconContainer}>
                            {selected.length > 1 && (
                                <Grid item>
                                    <Tooltip title={`Delete ${selected.length} images`}>
                                        <IconButton size="small">
                                            <DeleteOutlineIcon
                                                className={`${classes.statsuIcon} ${classes.deleteIcon}`}
                                                color="primary"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            )}
                            <Grid item>
                                {selected.length > 1 ? (
                                    <Tooltip title="Upload Images">
                                        <IconButton size="small" onClick={handleOpen}>
                                            <BackupIcon className={classes.statsuIcon} color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <CustomButton variant="contained" color="primary" onClick={handleOpen}>
                                        <BackupIcon style={{ marginRight: '10px' }} />
                                        Upload
                                    </CustomButton>
                                )}
                            </Grid>
                        </Grid>
                        <DropzoneDialog
                            open={state.open}
                            onSave={handleSave}
                            acceptedFiles={['.jpg,.jpeg,.img,.png']}
                            showPreviews={true}
                            maxFileSize={5000000}
                            onClose={handleClose}
                            cancelButtonText={'cancel'}
                            submitButtonText={'submit'}
                            showFileNamesInPreview={true}
                            dialogTitle={'Select Image'}
                            filesLimit={5}
                        />
                    </Grid>
                </Grid>
            </div>
            <Grid container className={classes.imageSection}>
                <Grid
                    onMouseEnter={() => setIconOpen(true)}
                    onMouseLeave={() => setIconOpen(false)}
                    className={classes.cardWrapper}
                    container
                    spacing={1}
                >
                    {imgData.map((x, i) => (
                        <Grid item xs={2} key={x.id} className={classes.card}>
                            <>
                                <Grid container direction="column" justify="space-between" className={classes.sidebar}>
                                    {selectIcon(x)}
                                    <Grid
                                        container
                                        alignItems="flex-end"
                                        direction="column"
                                        className={classes.iconContainer}
                                    >
                                        <Grid>
                                            <Tooltip placement="left" title="Edit">
                                                <svg
                                                    className={classes.icon}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    onClick={() => {
                                                        setDialogOpen(true);
                                                        setPreviewImage(x.urls.regular);
                                                        setExtraImage([
                                                            imgData[i + 1].urls.regular,
                                                            imgData[i + 2].urls.regular,
                                                            imgData[i + 3].urls.regular,
                                                            imgData[i + 4].urls.regular
                                                        ]);
                                                    }}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                            </Tooltip>
                                        </Grid>
                                        <Grid className={classes.margTop}>
                                            <Tooltip placement="left" title="Delete">
                                                <svg
                                                    className={classes.icon}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Image
                                    imageStyle={{ width: '100%', height: '100%', borderRadius: '2px' }}
                                    cover
                                    clasName={classes.image}
                                    src={x.urls.regular}
                                    style={{ zIndex: '-1' }}
                                />

                                <Grid item className={classes.desGrid}>
                                    <Typography className={classes.description} variant="subtile1">
                                        Test Image.jpg
                                    </Typography>
                                </Grid>
                            </>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            {loading && (
                <Grid container justify="center" alignItems="center">
                    <Loader />
                </Grid>
            )}
            <Dialog maxWidth="lg" onClose={() => setDialogOpen(false)} open={dialogOpen}>
                <Grid
                    container
                    className={classes.dialog}
                    direction="column"
                    style={{ width: '900px', padding: '40px 80px' }}
                >
                    <Grid item className={classes.dialogTitle} style={{ paddingBottom: '5px' }}>
                        <Typography className={classes.dialogTitle} variant="h5" color="primary">
                            Test Image.jpeg
                        </Typography>
                    </Grid>
                    <Divider />

                    <Grid item justify="center" alignItems="center">
                        <Grid container direction="column">
                            <Grid item style={{ margin: '10px auto', position: 'relative' }}>
                                {/* <img
                                    style={{
                                        height: '400px',
                                        width: '700px',
                                        borderRadius: '1px',
                                        backgroundSize: 'cover',
                                        objectFit: 'cover'
                                    }}
                                    alt="mohan"
                                    src={previewImage}
                                /> */}
                                {/* <ArrowBackIosIcon
                                    onClick={() => {
                                        if (imageSlideIndex === 0) {
                                            setImageSlideIndex(slideImage.length - 1);
                                        } else {
                                            setImageSlideIndex(imageSlideIndex - 1);
                                        }
                                        setPreviewImage(slideImage[imageSlideIndex]);
                                    }}
                                    color="primary"
                                    className={classes.arrowBack}
                                />
                                <ArrowForwardIosIcon
                                    onClick={() => {
                                        if (imageSlideIndex === slideImage.length - 1) {
                                            setImageSlideIndex(0);
                                        } else {
                                            setImageSlideIndex(imageSlideIndex + 1);
                                        }
                                        setPreviewImage(slideImage[imageSlideIndex]);
                                    }}
                                    color="primary"
                                    className={classes.arrowForward}
                                /> */}
                                <video src={Video} width="750" height="415" autoPlay loop></video>
                            </Grid>
                            {/* <Grid container className={classes.default} justify="flex-end" alignItems="center">
                                <Grid item>
                                    <CheckBoxOutlineBlankIcon />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle" display="inline">
                                        Set as default image
                                    </Typography>
                                </Grid>
                            </Grid> */}

                            <Grid item xs={12} style={{ width: '730px', margin: '15px auto' }}>
                                <Grid container justify="space-between">
                                    {extraImage.map((im, i) => {
                                        return (
                                            <img
                                                style={{
                                                    width: '160px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                    backgroundSize: 'cover',
                                                    border: '2px solid black'
                                                }}
                                                alt="mohan"
                                                src={im}
                                                key={i}
                                                onClick={() => {
                                                    setPreviewImage(im);
                                                    extraImage[i] = previewImage;
                                                    setShowDefaultBtn(true);
                                                }}
                                                className={classes.extraImage}
                                            />
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </Grid>
    );
};

export default ImageComponent;
