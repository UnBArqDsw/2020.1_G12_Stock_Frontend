/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useContext } from 'react';
import { GoGraph, FiBox, HiUserGroup, BiHistory, MdModeComment, GrMenu } from 'react-icons/all';
import { useLocation, useHistory } from 'react-router-dom';

import logo from '../../assets/images/logo-vertical.png';
import './styles.css';
import { DeviceContext } from '../../Contexts/DeviceContext';

export default function SideBar() {
  const location = useLocation();
  const history = useHistory();

  const { isMobile } = useContext(DeviceContext);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSidebar = () => setSideBarOpen(!sideBarOpen);

  const getNavClassOnSelect = (tabName) => {
    if (location.pathname === tabName) {
      return 'sidebar-option-selected';
    }
    return 'sidebar-option';
  };

  const getNavContainerByDevice = () => {
    if (isMobile && sideBarOpen) {
      return 'sidebar mobile open';
    }
    if (isMobile) {
      return 'sidebar mobile';
    }
    return 'sidebar';
  };

  const renderSandwichButton = () => {
    if (isMobile) {
      return (
        <div className="side-button">
          <GrMenu onClick={toggleSidebar} size={30} color="#000" />
        </div>
      );
    }
  };

  const renderSidebarOpenBackgroundOnMobile = () => {
    if (isMobile && sideBarOpen) {
      return <div className="sidebar-blur-on-open" onClick={toggleSidebar} />;
    }
  };

  return (
    <>
      {renderSandwichButton()}
      {renderSidebarOpenBackgroundOnMobile()}
      <div className={getNavContainerByDevice()}>
        <img src={logo} alt="logo" />

        <div
          className={getNavClassOnSelect('/')}
          onClick={() => {
            history.push('/');
            if (isMobile) toggleSidebar();
          }}
        >
          <GoGraph />
          <span>Painel de controle</span>
        </div>

        <div
          className={getNavClassOnSelect('/stock')}
          onClick={() => {
            history.push('/stock');
            if (isMobile) toggleSidebar();
          }}
        >
          <FiBox />
          <span>Estoque</span>
        </div>

        <div
          className={getNavClassOnSelect('/collaborators')}
          onClick={() => {
            history.push('/collaborators');
            if (isMobile) toggleSidebar();
          }}
        >
          <HiUserGroup />
          <span>Colaboradores</span>
        </div>

        <div
          className={getNavClassOnSelect('/history')}
          onClick={() => {
            history.push('/history');
            if (isMobile) toggleSidebar();
          }}
        >
          <BiHistory />
          <span>Histórico</span>
        </div>

        <div
          className={getNavClassOnSelect('/feedback')}
          onClick={() => {
            history.push('/feedback');
            if (isMobile) toggleSidebar();
          }}
        >
          <MdModeComment />
          <span>Feedback</span>
        </div>
      </div>
    </>
  );
}
