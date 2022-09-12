import React from 'react';
import classes from './ContentContainer.module.css';
import { Paper } from '@mui/material';

const ContentContainer = (props) => {
    const sx = {
        mb: 4
    };

    if (props.success) {
        sx.border = '3px #4caf50 solid';
    }

    if (props.error) {
        sx.border = '3px #ef5350 solid';
    }

    return (
        <Paper sx={sx} className={`${classes['content-container']} ${props.className}`}>
            {props.children}
        </Paper>
    );
};

export default ContentContainer;
