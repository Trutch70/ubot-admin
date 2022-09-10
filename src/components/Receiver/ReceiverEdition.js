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
import { selectToken } from '../../app/User/UserSlice';

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
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(loadingStarted());
        dispatch(setError(false));
        dispatch(resetSuccess());
        dispatch(submit())
    };

    return (
        <ContentContainer>
            {!loading && success && <Alert>Success!</Alert>}
            {!loading && error && <Alert severity={"error"}>{error}</Alert>}
            {!loading && <ReceiverForm onSubmit={onSubmit}/>}
        </ContentContainer>
    );
};

export default ReceiverEdition;
