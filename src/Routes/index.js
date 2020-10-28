import React, { useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Collaborators from '../Pages/Collaborators';
import Feedback from '../Pages/Feedback';
import History from '../Pages/History';
import Stock from '../Pages/Stock';
import Login from '../Pages/AuthPages/Login';
import ContextProvider from '../Contexts/Providers';
import PrivateRoute from './privateRoute';
import SideBar from '../Components/SideBar';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <ContextProvider>
          <SideBar />
          <div style={{ marginLeft: '15rem' }}>
            <PrivateRoute path="/" exact component={Dashboard} />
            <PrivateRoute path="/collaborators" exact component={Collaborators} />
            <PrivateRoute path="/feedback" exact component={Feedback} />
            <PrivateRoute path="/history" exact component={History} />
            <PrivateRoute path="/stock" exact component={Stock} />
            <Route path="/login" component={Login} />
          </div>
        </ContextProvider>
      </Switch>
    </BrowserRouter>
  );
}
