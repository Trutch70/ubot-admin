import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteLink,
    linkAdded,
    linkNameChange,
    linkRemoved,
    linkUrlChange,
    patchLink,
    postLink,
    selectLinks
} from '../ReceiverEditionSlice';
import { Box, Button, FormGroup, FormLabel, TextField } from '@mui/material';

const ReceiverLinks = ({edition}) => {
    const links = useSelector(selectLinks);
    const dispatch = useDispatch();

    const handleLinkNameChange = useCallback((event, index) => {
        dispatch(linkNameChange({index: index, value: event.target.value}));
    }, [dispatch])

    const handleLinkUrlChange = useCallback((event, index) => {
        dispatch(linkUrlChange({index: index, value: event.target.value}));
    }, [dispatch])

    const onSave = useCallback((index) => {
        if (links[index].id) {
            dispatch(patchLink(index));
        } else {
            dispatch(postLink(index));
        }
    }, [links, dispatch]);

    const onRemove = useCallback((index) => {
        if (links[index].id) {
            dispatch(deleteLink(index));
        } else {
            dispatch(linkRemoved(index));
        }
    }, [links, dispatch]);

    return (
        <Box>
            <FormLabel>Links</FormLabel>
            {
                links.map((link, index) => (
                    <Box
                        key={index}
                        marginBottom={4}
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <FormGroup row>
                            <TextField
                                variant={'outlined'}
                                label={'name'}
                                value={link.name}
                                onChange={(event) => {handleLinkNameChange(event, index)}}
                            />
                            <TextField
                                variant={'outlined'}
                                label={'url'}
                                sx={{ml: 2, display: 'inline-block'}}
                                value={link.url}
                                onChange={(event) => {handleLinkUrlChange(event, index)}}
                            />
                        </FormGroup>
                        { edition && <Button variant={'contained'} sx={{ml: 2}} onClick={() => {onSave(index)}}>Save</Button> }
                        { edition && <Button color={'secondary'} variant={'contained'} sx={{ml: 2}} onClick={() => {onRemove(index)}}>Remove</Button> }
                    </Box>
                ))
            }
            <Button
                onClick={() => {dispatch(linkAdded())}}
            >Add link</Button>
        </Box>
    );
};

export default ReceiverLinks;
