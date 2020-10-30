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
import NavBar from '../Components/Navbar';

export default function RoutesContainer() {
  return (
    <BrowserRouter>
      <Switch>
        <ContextProvider>
          <NavBar />
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

  const getRoutesClass = () => {
    if (isUserSigned && isDesktop) {
      return 'routes-logged-desktop';
    } else if (isUserSigned) {
      return 'routes-logged-mobile';
    }
  };

  return (
    <div className={getRoutesClass()}>
      <PrivateRoute path="/" exact component={Dashboard} />
      <PrivateRoute path="/collaborators" exact component={Collaborators} />
      <PrivateRoute path="/feedback" exact component={Feedback} />
      <PrivateRoute path="/history" exact component={History} />
      <PrivateRoute path="/stock" exact component={Stock} />
      <Route path="/login" component={Login} />
    </div>
  );
};
