import React from 'react';
import classes from './ReceiverImage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { imagePathChange, imagesChange, selectImagePath, selectImages } from './ReceiverEditionSlice';

const ReceiverImage = ({src}) => {
    const dispatch = useDispatch();
    const coverImage = useSelector(selectImagePath);
    const images = useSelector(selectImages);

    const setAsCoverImage = (event) => {
        dispatch(imagePathChange(event.target.dataset.src));
    }

    const onRemoveClick = () => {
        const newImages = [...images];
        const index = newImages.indexOf(src);

        newImages.splice(index, 1);
        dispatch(imagesChange(newImages));
    }

    return (
        <div style={{backgroundImage: `url("${src}")`}} className={`${classes['img-container']} ${coverImage === src ? classes.selected : ''}`} data-id={"receiver-image"} data-src={src}>
            <div className={classes.dummy}></div>
            <div className={classes['cover-container']}>
                <div className={classes.cover}>
                    <div className={classes['buttons-container']}>
                        <button disabled={coverImage === src ? 'disabled' : ''} type={"button"} className={classes['icon-button']} data-src={src} onClick={setAsCoverImage}>Set as cover image</button>
                        <button type={"button"} className={classes['icon-button']} data-src={src} onClick={onRemoveClick}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiverImage;
