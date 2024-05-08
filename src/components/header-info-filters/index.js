import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import headerData from './Header.json';
import { headerInfoStyles } from './style';
import { useDispatch } from 'react-redux';
import { getData } from 'redux/actions/scGenericApiCalls';

const HeaderInfo = ({ collectionName, pageSize, header }) => {
    const classes = headerInfoStyles();
    const [selectedButton, setSelectedButton] = useState('');

    const dispatch = useDispatch();

    const handleButton = (index, filters) => {
        dispatch(getData(collectionName, pageSize * 3, 1, '', filters));
        setSelectedButton(index);
    };

    return (
        <Grid container>
            <Grid xs={8} item>
                {header.data.map((item, index) => (
                    <Grid
                        className={index < header.data.length - 1 ? classes.infoGrid : classes.infoGridlast}
                        key={index.toString()}
                    >
                        <Typography variant="h5" color="primary" align="center" className={classes.leftGridValue}>
                            {item.value}
                        </Typography>
                        <Typography align="center" variant="subtitle1">
                            {item.label}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid xs={4} item className={classes.buttonsGrid}>
                {header.filters.map((item, index) => (
                    <Button
                        key={index.toString()}
                        className={selectedButton !== index ? classes.buttonStyles : classes.selectedButtonStyles}
                        onClick={() => handleButton(index, item.filter)}
                    >
                        <Typography variant="h4">{item.value}</Typography>
                        <Typography variant="caption">{item.label}</Typography>
                    </Button>
                ))}
            </Grid>
        </Grid>
    );
};

export default HeaderInfo;
