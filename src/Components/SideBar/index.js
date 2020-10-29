import React, { useState, useEffect, useContext } from 'react';
import logo from '../../assets/images/logo-vertical.png';
import { GoGraph, FiBox, HiUserGroup, BiHistory, MdModeComment, GrMenu } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import './styles.css';
import { AuthContext } from '../../Contexts/AuthContext';
import { DeviceContext } from '../../Contexts/DeviceContext';

export default function SideBar() {
  const location = useLocation();
  const history = useHistory();

  const { isUserSigned } = useContext(AuthContext);
  const { isMobile } = useContext(DeviceContext);
  const [sideOpen, setSideOpen] = useState(false);

  const toggleSidebar = () => setSideOpen(!sideOpen);

  const getNavClassOnSelect = (tabName) => {
    if (location.pathname == tabName) {
      return 'sidebar-option-selected';
    } else {
      return 'sidebar-option';
    }
  };

  if (!isUserSigned) {
    return <div />;
  }

  const getNavContainerFromDevice = () => {
    if (isMobile && sideOpen) {
      return 'sidebar mobile open';
    } else if (isMobile) {
      return 'sidebar mobile';
    } else {
      return 'sidebar';
    }
  };

  const renderSidebarMobileButton = () => {
    if (isMobile) {
      return (
        <div className="side-button">
          <GrMenu onClick={toggleSidebar} size={30} />
        </div>
      );
    }
  };

  const renderSidebarBackgroundOnMobile = () => {
    if (isMobile && sideOpen) {
      return <div className="sidebar-blur-on-open" onClick={toggleSidebar} />;
    }
  };

  return (
    <>
      {renderSidebarMobileButton()}
      {renderSidebarBackgroundOnMobile()}
      <div className={getNavContainerFromDevice()}>
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
