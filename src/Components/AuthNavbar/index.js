/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
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
            <a href="/home">
              <img src={logo} alt="logo" />
            </a>
        
              
         <div className={getNavContainerByDevice()}>
            <p class="signUp">Cadastrar Estoque</p>
            <div className="signIn-page">
              <a href="/login">
              <button class="signIn-button" type="button">Portal do Gestor</button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
