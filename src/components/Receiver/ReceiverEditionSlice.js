import { createSlice } from '@reduxjs/toolkit';
import ReceiversProvider from '../../app/Receiver/ReceiversProvider';

const initialState = {
    receiver: {
        name: '',
        description: '',
        locations: [],
        donation_description: '',
        position: '',
    },
    loading: false,
    edition: false,
    success: false,
    error: false,
};

export const receiverEditionSlice = createSlice({
    name: 'receiver',
    initialState: initialState,
    reducers: {
        nameChange: (state, action) => {state.receiver.name = action.payload},
        descriptionChange: (state, action) => {state.receiver.description = action.payload},
        locationsChange: (state, action) => {state.receiver.locations = action.payload},
        donationDescriptionChange: (state, action) => {state.receiver.donation_description = action.payload},
        positionChange: (state, action) => {state.receiver.position = action.payload},
        receiverLoaded: (state  , action) => {state.receiver = action.payload},
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
        }
    }
});

export const {
    nameChange,
    descriptionChange,
    locationsChange,
    donationDescriptionChange,
    positionChange,
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

        const body = await response.json();

        if (!response.ok) {
            if (response.status === 400) {
                dispatch(setError(body.detail));
                dispatch(resetSuccess());
                dispatch(loadingFinished());
                return;
            }
            debugger;
            console.log(response);
            dispatch(setError(response.statusText));
            dispatch(resetSuccess());
            return;
        }

        console.log(await response.json);
        dispatch(successConfirmed());
    } catch (err) {
        setError('Unknown error :(');
    } finally {
        dispatch(loadingFinished());
    }
}

export const selectName = (state) => state.receiver.receiver.name;
export const selectDescription = (state) => state.receiver.receiver.description;
export const selectLocations = (state) => state.receiver.receiver.locations;
export const selectDonationDescription = (state) => state.receiver.receiver.donation_description;
export const selectPosition = (state) => state.receiver.receiver.position;
export const selectLoading = (state) => state.receiver.loading;
export const selectError = (state) => state.receiver.error;
export const selectSuccess = (state) => state.receiver.success;

export default receiverEditionSlice.reducer;
