import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import underConstruction from '../assets/under_construction.png';
import CONSTANTS from '../common/constants';

const UnderConstruction = () => {
    const [date, setDate] = useState('');
    const [version, setVersion] = useState('');
    useEffect(() => {
        // Update the document title using the browser API
        fetch('http://git.testweburl.xyz/gittime?folder=IN_BS_BUILD')
            .then((res) => res.json())
            .then((data) => {
                setDate(data.stdout);
            })
            .catch((err) => {
                setDate('');
            });
        fetch('http://git.testweburl.xyz/gittime?folder=IN_BS_BUILD')
            .then((res) => res.json())
            .then((data) => {
                setVersion(data.stdout);
            })
            .catch((err) => {
                setVersion('');
            });
    });

    const useStyles = makeStyles((theme) => ({
        typoGraphy: {
            marginTop: 50,
            fontWeight: 'bold',
            color: theme.palette.primary.main
        },
        lastUpdate: {
            color: theme.palette.colors.darkGrayishBlue
        },
        image: {
            width: '40%',
            height: '100%'
        },
        mainHeading: {
            marginTop: 100,
            display: 'grid',
            placeItems: 'center'
        },
        lastUpdateText: {
            position: 'absolute',
            right: '0px',
            bottom: '0px',
            placeItems: 'center',
            padding: 10
        }
    }));

    const classes = useStyles();
    return (
        <>
            <div className={classes.mainHeading}>
                <img src={underConstruction} alt="" className={classes.image} />
                <Typography variant="h4" className={classes.typoGraphy}>
                    {CONSTANTS.LABEL_UNDER_CONSTRUCTION}
                </Typography>
            </div>
            <div className={classes.lastUpdateText}>
                <Typography variant={'subtitle3'} className={classes.lastUpdate}>
                    {CONSTANTS.LABEL_UNDER_LAST_UPDATE}
                    {date}
                </Typography>
                <Typography variant={'body2'} className={classes.lastUpdate} align={'right'}>
                    Version: {process.env.REACT_APP_VERSION}
                </Typography>
            </div>
        </>
    );
};

export default UnderConstruction;
