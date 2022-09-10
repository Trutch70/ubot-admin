import React from 'react';
import classes from './ContentContainer.module.css';
import { Paper } from '@mui/material';

const ContentContainer = (props) => {
    return <Paper sx={{mb: 4}} className={`${classes['content-container']} ${props.className}`}>{props.children}</Paper>;
};

export default ContentContainer;
