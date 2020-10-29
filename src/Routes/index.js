import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/AuthPages/Login';
import RegisterCompany from '../Pages/RegisterPages/RegisterCompany';
import ContextProvider from '../Contexts/Providers';
import PrivateRoute from './privateRoute';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <ContextProvider>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register/company" component={RegisterCompany} />
          <Route />
        </ContextProvider>
      </Switch>
    </BrowserRouter>
  );
}
