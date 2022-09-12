import React, { useEffect, useState } from 'react';
import EditorComponent from '../Common/EditorComponent';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    descriptionChange,
    donationDescriptionChange,
    locationsChange,
    nameChange, positionChange,
    selectDonationDescription, selectEdition, selectInitialDescription,
    selectLocations,
    selectName,
    selectPosition
} from './ReceiverEditionSlice';
import LocationsProvider from '../../app/Location/LocationsProvider';
import ReceiverImages from './ReceiverImages';
import ReceiverImageInput from './ReceiverImageInput';
import ReceiverLinks from './Links/ReceiverLinks';
import ReceiverLinksEditionDialog from './Links/ReceiverLinksEditionDialog';

const ReceiverForm = ({onSubmit}) => {
    const [locations, setLocations] = useState([]);
    const dispatch = useDispatch();
    const name = useSelector(selectName);
    const donationDescription = useSelector(selectDonationDescription);
    const receiverLocations = useSelector(selectLocations);
    const position = useSelector(selectPosition);
    const initialDescription = useSelector(selectInitialDescription);
    const edition = useSelector(selectEdition);
    const [linksOpen, setLinksOpen] = useState(false);

    useEffect(() => {
        LocationsProvider.fetchLocations()
            .then(data => {
                setLocations(data)
            })
        ;
    }, []);

    const handleLinksOpen = () => {
        setLinksOpen(true);
    }

    return (
        <form onSubmit={onSubmit}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <h1>{name}</h1>
                {
                    edition &&
                    <>
                        <Button
                            variant={'contained'}
                            onClick={handleLinksOpen}
                        >
                            Edit links
                        </Button>
                        <ReceiverLinksEditionDialog open={linksOpen} handleClose={() => {setLinksOpen(false)}} />
                    </>
                }
            </Box>
            <br/>
            <FormControl>
                <TextField
                    required={true}
                    label={"Name"}
                    value={name}
                    onChange={(event) => dispatch(nameChange(event.target.value))}
                    sx={{mb: 3}}
                />
            </FormControl>
            <FormControl>
                <InputLabel
                    component={"div"}
                    shrink={true}
                    variant={"outlined"}
                    htmlFor={"description"}
                >Description</InputLabel>
                <Card
                    variant={"outlined"}
                    style={{borderTop: "none"}}
                    sx={{mb: 3}}
                >
                    <EditorComponent
                        initialContent={initialDescription}
                        onChange={(text) => dispatch(descriptionChange(text))}
                    />
                </Card>
            </FormControl>
            <TextField
                fullWidth={true}
                multiline={true}
                label={"Donation description"}
                value={donationDescription}
                onChange={(event) => dispatch(donationDescriptionChange(event.target.value))}
                sx={{mb: 3}}
                required={true}
            />
            <FormControl sx={{mr: 2}} style={{minWidth: 240}}>
                <InputLabel htmlFor={"locations"}>Locations</InputLabel>
                <Select
                    id={"locations"}
                    multiple={true}
                    onChange={(event) => dispatch(locationsChange(event.target.value))}
                    value={receiverLocations}
                    label={"Locations"}
                    sx={{mb: 2}}
                >
                    {
                        locations.map((location) =>
                            <MenuItem key={location.id}
                                      value={location.id}
                            >
                                {location.name}
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <TextField
                style={{minWidth: 240}}
                label={"Position"}
                type={"number"}
                value={position}
                onChange={(event) => dispatch(positionChange(event.target.value))}
            />
            { !edition && <ReceiverLinks /> }
            {
                edition && <>
                    <ReceiverImages/>
                    <ReceiverImageInput />
                </>
            }
            <div style={{textAlign: "right"}}>
                <Link style={{textDecoration: "none"}} to={"/"}>
                    <Button sx={{mr: 2}} variant={"outlined"} type={"button"}>Back</Button>
                </Link>
                <Button variant={"contained"} type={"submit"}>Save</Button>
            </div>
        </form>
    );
};

export default ReceiverForm;
