import React from 'react';
import { Card, CardActions, CardContent, Grid, Typography, CardMedia } from '@material-ui/core';
import { useCardStyles } from './card.style';
import underConstruction from '../../assets/under_construction.png';
import CustomButton from '../../components/button';

//info props see bottom

const CardComponent = (props) => {
    const {
        media,
        mediaSrc,
        mediaAlt,
        content,
        contentText,
        actionArea,
        buttons,
        firstButtonText,
        onFirstButtonClick,
        onSecondButtonClick,
        secondButtonText,
        cardBackGroundColor,
        imageHeight,
        firstButtonVariant,
        secondButtonVariant,
        firstButtonColor,
        secondButtonColor
    } = props;
    const classes = useCardStyles();
    return (
        <Card style={{ backgroundColor: cardBackGroundColor }}>
            {media ? (
                <CardMedia
                    className={classes.mediaStyles}
                    component="img"
                    src={mediaSrc ? underConstruction : null}
                    title="Contemplative Reptile"
                    height={imageHeight}
                    alt={mediaAlt}
                />
            ) : null}
            {content ? (
                <CardContent style={{ marginTop: media ? '' : 30 }}>
                    <Typography>{contentText}</Typography>
                </CardContent>
            ) : null}
            {actionArea ? (
                <CardActions>
                    {buttons ? (
                        <Grid className={classes.actionButton} container>
                            <CustomButton
                                onClick={onFirstButtonClick}
                                variant={firstButtonVariant}
                                color={firstButtonColor}
                                className={classes.cardButton}
                            >
                                {firstButtonText}
                            </CustomButton>
                            {secondButtonText ? (
                                <CustomButton
                                    onClick={onSecondButtonClick}
                                    variant={secondButtonVariant}
                                    color={secondButtonColor}
                                    className={classes.cardButton}
                                >
                                    {secondButtonText}
                                </CustomButton>
                            ) : null}
                        </Grid>
                    ) : null}
                </CardActions>
            ) : null}
        </Card>
    );
};

export default CardComponent;

//second button,content, actionArea and media are conditional

// we have to import all the images and the prop mediaSrc should be in the imported images to display
