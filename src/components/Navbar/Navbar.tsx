import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as MaIcons from 'react-icons/md';
import Calendar from 'react-calendar';
import { useAppSelector } from '../../store/hook/redux';
import './Navbar.scss';

function Navbar() {
  const user = useAppSelector((state) => state.user.firstName);
  // Show/Hide Menu
  const [sideMenu, setSideMenu] = useState(false);
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
  //

  return (
    <div className="Navbar-container">
      <div className="Navbar">
        <NavLink to="#" className="Menu-icons">
          <MaIcons.MdKeyboardDoubleArrowLeft onClick={showsideMenu} />
        </NavLink>
      </div>
      <nav className={sideMenu ? 'Nav-menu active' : 'Nav-menu'}>
        <NavLink to="#" className="Menu-icons">
          <MaIcons.MdKeyboardDoubleArrowRight />
        </NavLink>
        <h3 className="Hello-text">Bienvenue {user} !</h3>
        <div className="Calendar-container">
          <Calendar onChange={onchange} value={date} />
        </div>
        <ul className="Nav-menu__list">
          <li className="Nav-menu__items">
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
          <li className="Nav-menu__items">
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
          <li className="Nav-menu__items">
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
          <li className="Nav-menu__items">
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
