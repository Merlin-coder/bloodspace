import React from 'react';
import CardComponent from './card.component';

const Card = (props) => {
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

    return (
        <CardComponent
            media={media}
            mediaSrc={mediaSrc}
            mediaAlt={mediaAlt}
            content={content}
            contentText={contentText}
            actionArea={actionArea}
            buttons={buttons}
            firstButtonText={firstButtonText}
            onFirstButtonClick={onFirstButtonClick}
            onSecondButtonClick={onSecondButtonClick}
            secondButtonText={secondButtonText}
            cardBackGroundColor={cardBackGroundColor}
            imageHeight={imageHeight}
            firstButtonVariant={firstButtonVariant}
            secondButtonVariant={secondButtonVariant}
            firstButtonColor={firstButtonColor}
            secondButtonColor={secondButtonColor}
        />
    );
};

export default Card;
