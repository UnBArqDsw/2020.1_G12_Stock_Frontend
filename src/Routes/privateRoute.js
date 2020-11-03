/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { isUserSigned, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Route
      {...props}
      render={() => {
        return isUserSigned ? <Component {...props} /> : <Redirect to="/home" />;
      }}
    />
  );
};

export default PrivateRoute;
