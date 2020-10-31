import React, { useState, useContext } from 'react';
import './styles.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { BsFillBellFill, FaUserCircle } from 'react-icons/all';
import { AuthContext } from '../../Contexts/AuthContext';

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);
  const { signOut } = useContext(AuthContext);

  return (
    <nav className="nav-container">
      <div className="nav-item">
        <BsFillBellFill size={25} />
      </div>
      <div className="nav-item">
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
          <DropdownToggle color="transparent" caret>
            <FaUserCircle size={25} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Perfil</DropdownItem>
            <DropdownItem onClick={signOut}>Sair</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
}
