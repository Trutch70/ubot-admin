import React from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../app/User/UserSlice';
import { Navigate, Outlet } from 'react-router-dom';

const RouteGuard = () => {
    const token = useSelector(selectToken);

    return(
        token ? <Outlet/> : <Navigate to={'/login'} replace={true}/>
    );
};

export default RouteGuard;
