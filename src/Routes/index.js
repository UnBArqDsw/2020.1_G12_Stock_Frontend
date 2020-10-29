import React, { useContext } from 'react';
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
import { AuthContext } from '../Contexts/AuthContext';
import { DeviceContext } from '../Contexts/DeviceContext';

export default function RoutesContainer() {
  return (
    <BrowserRouter>
      <Switch>
        <ContextProvider>
          <SideBar />
          <Routes />
        </ContextProvider>
      </Switch>
    </BrowserRouter>
  );
}

const Routes = () => {
  const { isUserSigned } = useContext(AuthContext);
  const { isDesktop } = useContext(DeviceContext);
  console.log(isDesktop);
  return (
    <div style={{ marginLeft: isUserSigned && isDesktop ? '15rem' : 0 }}>
      <PrivateRoute path="/" exact component={Dashboard} />
      <PrivateRoute path="/collaborators" exact component={Collaborators} />
      <PrivateRoute path="/feedback" exact component={Feedback} />
      <PrivateRoute path="/history" exact component={History} />
      <PrivateRoute path="/stock" exact component={Stock} />
      <Route path="/login" component={Login} />
    </div>
  );
};
