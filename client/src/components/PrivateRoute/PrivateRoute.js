import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

function PrivateRoute({ element }) {
    const { user } = useUserContext();
    return user ? element : <Navigate to="/signin" />;
  }
export default PrivateRoute;