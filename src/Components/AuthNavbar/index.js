/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GrMenu } from 'react-icons/all';
import logo from '../../assets/images/logo-horizontal.png';
import './styles.css';
import { DeviceContext } from '../../Contexts/DeviceContext';

export default function AuthNavBar() {
  const { isMobile } = useContext(DeviceContext);
  const [authNavBarOpen, setauthNavBarOpen] = useState(false);

  const toggleSidebar = () => setauthNavBarOpen(!authNavBarOpen);

  const getNavContainerByDevice = () => {
    if (isMobile && authNavBarOpen) {
      return 'sidebar mobile open';
    }
    if (isMobile) {
      return 'sidebar mobile';
    }
  };

  const renderSandwichButton = () => {
    if (isMobile) {
      return (
        <div className="side-button">
          <GrMenu onClick={toggleSidebar} size={30} />
        </div>
      );
    }
  };

  const renderSidebarOpenBackgroundOnMobile = () => {
    if (isMobile && authNavBarOpen) {
      return <div className="sidebar-blur-on-open" onClick={toggleSidebar} />;
    }
  };

  return (
    <>
      {renderSandwichButton()}
      {renderSidebarOpenBackgroundOnMobile()}
      <div className="container">
        <div className="login-header">
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>

          <div className={getNavContainerByDevice()}>
            <div className="row">
              <p className="signUp">Cadastrar Estoque</p>
              <div className="signIn-page">
                <Link to="/login">
                  <button className="signIn-button" type="button" onClick={toggleSidebar}>
                    Portal do Gestor
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
