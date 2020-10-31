import React, { useContext, Fragment } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import Login from '../Pages/AuthPages/Login';
import ContextProvider from '../Contexts/Providers';
import PrivateRoute from './privateRoute';
import Home from '../Pages/Home'
import HomePage from '../Pages/HomePage'
import AuthNavBar from '../Components/AuthNavbar';

export default function RoutesContainer() {
  return (
    <BrowserRouter>
      <Switch>
        <ContextProvider>
          <Route />
          <Routes />
        </ContextProvider>
      </Switch>
    </BrowserRouter>
  );
}

const Routes = () => {
  const { isUserSigned } = useContext(AuthContext);

  const getRoutesClass = () => {
    if (isUserSigned) {
      return 'routes-logged-mobile';
    }
  };

  const renderTopAndSideBar = () => {
    if (isUserSigned) {
      return (
        <Fragment>
          {/* <NavBar />
          <SideBar /> */}
        </Fragment>
      );
    }
    else {
      return (
        <Fragment>
          <AuthNavBar />
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      {renderTopAndSideBar()}
      <div className={getRoutesClass()}>
        <Route path="/home" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" exact component={Home} />
        {/* <PrivateRoute path="/collaborators" exact component={Collaborators} />
        <PrivateRoute path="/feedback" exact component={Feedback} />
        <PrivateRoute path="/history" exact component={History} />
        <PrivateRoute path="/stock" exact component={Stock} /> */}
      </div>
    </Fragment>
  );
};
