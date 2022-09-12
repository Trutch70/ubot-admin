import React from 'react';
import { Box, FormLabel, Grid } from '@mui/material';
import ReceiverImage from './ReceiverImage';
import { useSelector } from 'react-redux';
import { selectImages } from './ReceiverEditionSlice';

const ReceiverImages = () => {
    const images = useSelector(selectImages);

    return (
        <Box sx={{mb: 2}}>
            <FormLabel>Images</FormLabel>
            <Grid container spacing={1} rowSpacing={1}>
                {
                    images.map((image, key) => (
                        <Grid item key={key} xs={12} md={4} lg={3}>
                            <ReceiverImage
                                src={image}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
};

export default ReceiverImages;
