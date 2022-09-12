import React, { useEffect } from 'react';
import ContentContainer from '../Common/ContentContainer';
import { useParams } from 'react-router-dom';
import ReceiverForm from './ReceiverForm';
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchReceiver,
    editionDetected,
    loadingStarted,
    selectLoading,
    selectSuccess,
    selectError,
    submit, setError, resetReceiver, resetSuccess
} from './ReceiverEditionSlice';
import { setLoading } from '../Layout/Loading/LoadingSlice';

const ReceiverEdition = () => {
    const {receiverId} = useParams();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const success = useSelector(selectSuccess);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!receiverId) {
            return;
        }
        dispatch(loadingStarted());
        dispatch(editionDetected());
        dispatch(fetchReceiver(receiverId));

        return () => {
            dispatch(resetReceiver());
            dispatch(resetSuccess());
            dispatch(setError(false));
        }
    }, [dispatch, receiverId]);

    useEffect(() => {
        dispatch(setLoading(loading));
    }, [loading, dispatch]);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(loadingStarted());
        dispatch(setError(false));
        dispatch(resetSuccess());
        dispatch(submit());
    };

    return (
        <ContentContainer success={success} error={error}>
            {!loading && success && <Alert>Success!</Alert>}
            {!loading && error && <Alert severity={"error"}>{error}</Alert>}
            <ReceiverForm onSubmit={onSubmit} success={success}/>
        </ContentContainer>
    );
};

export default ReceiverEdition;
