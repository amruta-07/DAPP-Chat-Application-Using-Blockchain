//privete route component
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const { path, element } = props;
    const islogin=localStorage.getItem("islogin")
    return (
        <Route path={path} element={islogin ? element : <Navigate to="/login" />} />
    );
}

export default PrivateRoute;