import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as MaIcons from 'react-icons/md';
import Calendar from 'react-calendar';
import { useAppSelector } from '../../store/hook/redux';
import './Navbar.scss';

function Navbar() {
  // Show/Hide Menu
  const [sideMenu, setSideMenu] = useState(false);

  let user = null;
  const userString = localStorage.getItem('user');
  if (userString) {
    user = JSON.parse(userString).firstName;
  }

  const showsideMenu = () => {
    setSideMenu(!sideMenu);
    // console.log(sideMenu);
  };
  //
  // React Calendar
  const [date, setDate] = useState(new Date());
  const onchange = () => {
    setDate(date);
  };
  return (
    <div className="navbar-container">
      <div className="navbar">
        <NavLink to="#" className="menu-icons">
          <MaIcons.MdKeyboardDoubleArrowLeft />
        </NavLink>
      </div>
      <nav className="nav-menu">
        <h3 className="hello-text">Bienvenue {user} !</h3>
        {/* <div className="calendar-container">
          <Calendar onChange={onchange} value={date} />
        </div> */}
        <ul className="nav-menu-list">
          <li className="nav-menu-items">
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                color: isActive ? '#a46eff' : '',
                background: isActive ? '#fff' : '',
                borderRadius: isActive ? '5px' : '',
                padding: isActive ? '10px' : '',
              })}
            >
              <span>Mon tableau de bord</span>
            </NavLink>
          </li>
          <li className="nav-menu-items">
            <NavLink
              to="/account"
              style={({ isActive }) => ({
                color: isActive ? '#a46eff' : '',
                background: isActive ? '#fff' : '',
                borderRadius: isActive ? '5px' : '',
                padding: isActive ? '10px' : '',
              })}
            >
              <span>Mon compte</span>
            </NavLink>
          </li>
          <li className="nav-menu-items">
            <NavLink
              to="/docs"
              style={({ isActive }) => ({
                color: isActive ? '#a46eff' : '',
                background: isActive ? '#fff' : '',
                borderRadius: isActive ? '5px' : '',
                padding: isActive ? '10px' : '',
              })}
            >
              <span>Mon drive</span>
            </NavLink>
          </li>
          <li className="nav-menu-items">
            <NavLink
              to="/contacts"
              style={({ isActive }) => ({
                color: isActive ? '#a46eff' : '',
                background: isActive ? '#fff' : '',
                borderRadius: isActive ? '5px' : '',
                padding: isActive ? '10px' : '',
              })}
            >
              <span>Mon réseau</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
