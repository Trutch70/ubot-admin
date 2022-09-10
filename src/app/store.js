import { configureStore } from '@reduxjs/toolkit';
import receiverReducer from  '../components/Receiver/ReceiverEditionSlice';
import userReducer from './User/UserSlice';
import loadingReducer from '../components/Layout/Loading/LoadingSlice';

export default configureStore({
    reducer: {
        receiver: receiverReducer,
        user: userReducer,
        loading: loadingReducer,
    }
})