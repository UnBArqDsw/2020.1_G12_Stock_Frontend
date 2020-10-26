/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { isUserSigned, user, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log(isUserSigned, user);

  return (
    <Route
      {...props}
      render={() => {
        return isUserSigned ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
