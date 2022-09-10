import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import ReceiverEdition from './components/Receiver/ReceiverEdition';
import { Provider } from 'react-redux';
import store from './app/store';
import LoginPage from './components/Login/LoginPage';
import RouteGuard from './components/Layout/Guard/RouteGuard';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
            <App>
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route element={<RouteGuard/>}>
                            <Route path={"/"} exact element={<Dashboard/>}/>
                            <Route path={"/receivers/new"} element={<ReceiverEdition/>}/>
                            <Route path={"/receivers/:receiverId"} element={<ReceiverEdition/>}/>
                        </Route>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"*"} element={<Navigate to={"/"}/>}/>
                    </Routes>
                </Suspense>
            </App>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
