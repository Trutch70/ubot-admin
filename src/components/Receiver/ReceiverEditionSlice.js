import { createSlice } from '@reduxjs/toolkit';
import ReceiversProvider from '../../app/Receiver/ReceiversProvider';
import ReceiverAPI from '../../app/Receiver/ReceiverAPI';

const initialState = {
    receiver: {
        name: '',
        description: '',
        locations: [],
        donation_description: '',
        position: '',
        images: [],
        image_path: '',
        links: [],
    },
    loading: false,
    edition: false,
    success: false,
    error: false,
    initialDescription: '',
    linkStatus: [],
};

export const receiverEditionSlice = createSlice({
    name: 'receiver',
    initialState: initialState,
    reducers: {
        nameChange: (state, action) => {state.receiver.name = action.payload},
        descriptionChange: (state, action) => {state.receiver.description = action.payload},
        locationsChange: (state, action) => {state.receiver.locations = action.payload},
        donationDescriptionChange: (state, action) => {state.receiver.donation_description = action.payload},
        positionChange: (state, action) => {state.receiver.position = parseInt(action.payload) ?? ''},
        imagesChange: (state, action) => {state.receiver.images = action.payload},
        linksChange: (state, action) => {state.receiver.links = action.payload},
        linkNameChange: (state, action) => {state.receiver.links[action.payload.index].name = action.payload.value},
        linkUrlChange: (state, action) => {state.receiver.links[action.payload.index].url = action.payload.value},
        linkAdded: (state) => {state.receiver.links = [...state.receiver.links, {name: '', url: ''}]},
        linkRemoved: (state, action) => {
            const links = [...state.receiver.links];
            links.splice(action.payload, 1);
            state.receiver.links = links;
        },
        imagePathChange: (state, action) => {state.receiver.image_path = action.payload},
        receiverLoaded: (state  , action) => {
            state.receiver = action.payload;
            state.initialDescription = action.payload.description;
        },
        loadingStarted: (state) => {state.loading = true},
        loadingFinished: (state) => {state.loading = false},
        editionDetected: (state) => {state.edition = true},
        setError: (state, action) => {state.error = action.payload},
        successConfirmed: (state) => {state.success = true},
        resetSuccess: (state) => {state.success = false},
        resetReceiver: (state) => {
            state.receiver = {...initialState.receiver};
            state.loading = false;
            state.edition = false;
            state.success = false;
            state.error = false;
            state.initialDescription = '';
            state.linkStatus = [];
        },
    }
});

export const {
    nameChange,
    descriptionChange,
    locationsChange,
    donationDescriptionChange,
    positionChange,
    imagesChange,
    linksChange,
    linkNameChange,
    linkUrlChange,
    linkAdded,
    linkRemoved,
    imagePathChange,
    receiverLoaded,
    loadingFinished,
    loadingStarted,
    editionDetected,
    setError,
    successConfirmed,
    resetSuccess,
    resetReceiver,
} = receiverEditionSlice.actions;

export const fetchReceiver = (id) => (dispatch) => {
    ReceiversProvider.fetchReceiver(id)
        .then(data => {
            const locations = data.locations ? data.locations.map(location => location.id) : [];

            dispatch(
                receiverLoaded({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    donation_description: data.donation_description,
                    images: data.images,
                    links: data.links,
                    image_path: data.image_path,
                    position: data.position,
                    locations: locations
                })
            );
            dispatch(loadingFinished());
        })
    ;
}

export const submit = () => async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;
    const data = {...state.receiver.receiver};

    if (String(data.position) === '' || parseInt(String(data.position)) === 0) {
        data.position = null;
    }

    let method = 'POST';
    let url = process.env.REACT_APP_API_HOST + '/api/receivers';

    if (state.receiver.edition) {
        method = 'PATCH';
        url = process.env.REACT_APP_API_HOST + '/api/receivers/' + data.id;
    }

    try {
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authentication': token,
            }
        });

        if (!response.ok) {
            if (response.status === 400) {
                const body = await response.json();

                dispatch(setError(body.detail));
                dispatch(resetSuccess());
                dispatch(loadingFinished());
                return;
            }
            debugger;
            dispatch(setError(response.statusText));
            dispatch(resetSuccess());
            return;
        }

        const body = await response.json();
        const locations = body.locations ? body.locations.map(location => location.id) : [];

        dispatch(
            receiverLoaded({
                id: body.id,
                name: body.name,
                description: body.description,
                donation_description: body.donation_description,
                images: body.images,
                links: body.links,
                image_path: body.image_path,
                position: body.position,
                locations: locations
            })
        );
        dispatch(successConfirmed());
        dispatch(loadingFinished());
        dispatch(editionDetected());
    } catch (err) {
        dispatch(setError('Unknown error :('));
    } finally {
        dispatch(loadingFinished());
    }
}

export const postLink = (index) => async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;

    try {
        const response = await ReceiverAPI.postReceiverLink(
            state.receiver.receiver.id,
            state.receiver.receiver.links[index],
            token
        );

        if (!response.ok) {
            console.log(response);
            return;
        }

        const links = [...state.receiver.receiver.links];
        const body = await response.json();
        links[index] = {
            id: body.id,
            name: body.name,
            url: body.url,
        }

        dispatch(linksChange(links));
    } catch (err) {
        console.log(err);
    }
}

export const patchLink = (index) => async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;

    try {
        const response = await ReceiverAPI.patchReceiverLink(
            state.receiver.receiver.links[index],
            token
        );

        if (!response.ok) {
            console.log(response);
            return;
        }

        const links = [...state.receiver.receiver.links];
        const body = await response.json();
        links[index] = {
            id: body.id,
            name: body.name,
            url: body.url,
        }

        dispatch(linksChange(links));
    } catch (err) {
        console.log(err);
    }
}

export const deleteLink = (index) => async (dispatch, getState) =>{
    const state = getState();
    const token = state.user.token;

    try {
        const response = await ReceiverAPI.deleteReceiverLink(
            state.receiver.receiver.links[index].id,
            token
        );

        if (!response.ok) {
            return;
        }

        dispatch(linkRemoved(index));
    } catch (err) {
        console.log(err);
    }
}

export const selectId = (state) => state.receiver.receiver.id;
export const selectName = (state) => state.receiver.receiver.name;
export const selectLocations = (state) => state.receiver.receiver.locations;
export const selectDonationDescription = (state) => state.receiver.receiver.donation_description;
export const selectPosition = (state) => state.receiver.receiver.position;
export const selectImages = (state) => state.receiver.receiver.images;
export const selectLinks = (state) => state.receiver.receiver.links;
export const selectImagePath = (state) => state.receiver.receiver.image_path;
export const selectLoading = (state) => state.receiver.loading;
export const selectError = (state) => state.receiver.error;
export const selectSuccess = (state) => state.receiver.success;
export const selectInitialDescription = (state) => state.receiver.initialDescription;
export const selectEdition = (state) => state.receiver.edition;
export const selectLinkStatus= (state) => state.receiver.linkStatus;

export default receiverEditionSlice.reducer;
