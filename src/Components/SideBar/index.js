import React, { useState, useEffect, useContext } from 'react';
import logo from '../../assets/images/logo-vertical.png';
import { GoGraph, FiBox, HiUserGroup, BiHistory, MdModeComment } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './styles.css';
import { AuthContext } from '../../Contexts/AuthContext';
import { DeviceContext } from '../../Contexts/DeviceContext';

export default function SideBar() {
  const location = useLocation();
  const { isUserSigned } = useContext(AuthContext);
  const { isMobile } = useContext(DeviceContext);
  console.log('isMobile', isMobile);

  const getNavClass = (tabName) => {
    if (location.pathname == tabName) {
      return 'sidebar-option-selected';
    } else {
      return 'sidebar-option';
    }
  };

  if (!isUserSigned) {
    return <div />;
  }

  return (
    <div className="sidebar">
      <img src={logo} alt="logo" />
      <Link to="/">
        <div className={getNavClass('/')}>
          <GoGraph />
          <span>Painel de controle</span>
        </div>
      </Link>
      <Link to="/stock">
        <div className={getNavClass('/stock')}>
          <FiBox />
          <span>Estoque</span>
        </div>
      </Link>
      <Link to="/collaborators">
        <div className={getNavClass('/collaborators')}>
          <HiUserGroup />
          <span>Colaboradores</span>
        </div>
      </Link>
      <Link to="/history">
        <div className={getNavClass('/history')}>
          <BiHistory />
          <span>Histórico</span>
        </div>
      </Link>
      <Link to="/feedback">
        <div className={getNavClass('/feedback')}>
          <MdModeComment />
          <span>Feedback</span>
        </div>
      </Link>
    </div>
  );
}
