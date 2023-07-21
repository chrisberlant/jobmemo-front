import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as MaIcons from 'react-icons/md';
import Calendar from 'react-calendar';
import { useAppSelector } from '../hook/redux';
import logo from '../../assets/images/logo.svg';
import './Navbar.scss';

function Navbar() {
  const user = useAppSelector((state) => state.user.firstName);
  const [sideMenu, setSideMenu] = useState(false);
  const showsideMenu = () => {
    setSideMenu(!sideMenu);
    // console.log(sideMenu);
  };
  const [date, setDate] = useState(new Date());
  const onchange = () => {
    setDate(date);
  };

  return (
    <div className="Navbar-container">
      <div className="Navbar">
        <NavLink to="#" className="Menu-arrow">
          <MaIcons.MdKeyboardDoubleArrowLeft onClick={showsideMenu} />
        </NavLink>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <nav className={sideMenu ? 'Nav-menu active' : 'Nav-menu'}>
        <h3 className="Hello-text">Bienvenue {user} !</h3>
        <div className="Calendar-container">
          <Calendar onChange={onchange} value={date} />
        </div>
        <ul className="Nav-menu_list">
          <li className="Nav-menu_items">
            <NavLink to="/dashboard">
              <span>Mon tableau de bord</span>
            </NavLink>
          </li>
          <li className="Nav-menu_items">
            <NavLink to="/account">
              <span>Mon compte</span>
            </NavLink>
          </li>
          <li className="Nav-menu_items">
            <NavLink to="/docs">
              <span>Mon drive</span>
            </NavLink>
          </li>
          <li className="Nav-menu_items">
            <NavLink to="/contacts">
              <span>Mon réseau</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
