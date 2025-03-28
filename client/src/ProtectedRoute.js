import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn }) => {
    return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;