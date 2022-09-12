import React from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import ReceiverLinks from './ReceiverLinks';
import { useSelector } from 'react-redux';
import { selectName } from '../ReceiverEditionSlice';

const ReceiverLinksEditionDialog = ({open, handleClose}) => {
    const name = useSelector(selectName);

    return (
        <Dialog
            open={open}
            maxWidth={'md'}
            fullWidth={true}
        >
            <DialogTitle>{name} links</DialogTitle>
            <DialogContent>
                <ReceiverLinks edition={true}/>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Button variant={'outlined'} onClick={handleClose}>Close</Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ReceiverLinksEditionDialog;
