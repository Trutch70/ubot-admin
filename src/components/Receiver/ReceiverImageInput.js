import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, FormGroup, FormHelperText, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { imagesChange, selectId } from './ReceiverEditionSlice';
import ReceiverAPI from '../../app/Receiver/ReceiverAPI';
import { selectToken } from '../../app/User/UserSlice';

const initialFileName = 'Choose a file';

const ReceiverImageInput = () => {
    const fileInputRef = useRef();
    const [fileName, setFileName] = useState(initialFileName);
    const [error, setError] = useState(false);
    const id = useSelector(selectId);
    const token = useSelector(selectToken);
    const dispatch = useDispatch();

    useEffect(() => {
        setError(false);
        setFileName(initialFileName);
    }, []);

    const fileInputFilled = useCallback(() => {
        if (!fileInputRef.current) {
            return false;
        }

        return fileInputRef.current.files.length > 0;
    }, [fileInputRef]);

    const onImageUpload = async () => {
        if (!fileInputFilled()) {
            return;
        }

        try {
            const response = await ReceiverAPI.uploadReceiverImage(id, fileInputRef.current.files[0], token);

            if (!response.ok) {
                setError(true);
                return;
            }

            setError(false);
            const body = await response.json();

            dispatch(imagesChange(body.images));
            fileInputRef.current.value = '';
            setFileName(initialFileName);
        } catch (err) {
            setError(true);
        }
    }

    return (
        <>
            <FormGroup row>
                <Button
                    variant="contained"
                    component="label"
                    disableElevation
                    style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                >
                    Add Image
                    <input
                        type="file"
                        hidden
                        onChange={(event) => {setFileName(event.target.files[0].name)}}
                        ref={fileInputRef}
                    />
                </Button>
                <TextField
                    color={error ? 'error' : 'info'}
                    disabled={true}
                    style={{borderTopLeftRadius: 0, borderTopRightRadius: 0, paddingTop: 0}}
                    value={fileName}
                />
                <Button
                    disabled={!fileInputFilled()}
                    variant={'outlined'}
                    style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
                    onClick={onImageUpload}
                >
                    Upload
                </Button>
            </FormGroup>
            <FormHelperText>The image will be saved automatically without clicking "Save"</FormHelperText>
            {
                error && <Box>
                    <p style={{color: 'red'}}>Error while uploading the file.</p>
                </Box>
            }
        </>
    );
};

export default ReceiverImageInput;
