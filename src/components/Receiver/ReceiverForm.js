import React, { useEffect, useState } from 'react';
import EditorComponent from '../Common/EditorComponent';
import { Link } from 'react-router-dom';
import {
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
    nameChange, positionChange, resetReceiver,
    selectDescription,
    selectDonationDescription,
    selectLocations,
    selectName,
    selectPosition
} from './ReceiverEditionSlice';
import LocationsProvider from '../../app/Location/LocationsProvider';

const ReceiverForm = ({onSubmit}) => {
    const [locations, setLocations] = useState([]);
    const dispatch = useDispatch();
    const name = useSelector(selectName);
    const description = useSelector(selectDescription);
    const donationDescription = useSelector(selectDonationDescription);
    const receiverLocations = useSelector(selectLocations);
    const position = useSelector(selectPosition);

    useEffect(() => {
        LocationsProvider.fetchLocations()
            .then(data => {
                setLocations(data)
            })
        ;
    }, []);

    return (
        <form onSubmit={onSubmit}>
            <h1>{name}</h1>
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
                        html={description}
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
            <div style={{textAlign: "right"}}>
                <Link style={{textDecoration: "none"}} to={"/"}>
                    <Button sx={{mr: 2}} variant={"outlined"} type={"button"}>Back</Button>
                </Link>
                <Button variant={"contained"} type={"submit"}>Submit</Button>
            </div>
        </form>
    );
};

export default ReceiverForm;
