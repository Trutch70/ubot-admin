import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoading } from './LoadingSlice';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
    const loading = useSelector(selectLoading);
    return (
        <>
            {loading && <div className={"loading"}></div>}
        </>
    );
};

export default LoadingOverlay;
