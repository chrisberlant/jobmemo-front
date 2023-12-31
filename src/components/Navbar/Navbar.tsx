import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { GiHamburgerMenu } from 'react-icons/gi';
import logoWhite from '../../assets/images/logo-white.svg';
import iconDashboard from '../../assets/icons/icon-dashboard.svg';
import iconAccount from '../../assets/icons/icon-account.svg';
import iconDrive from '../../assets/icons/icon-drive.svg';
import iconContacts from '../../assets/icons/icon-contacts.svg';
import './Navbar.scss';

function Navbar() {
  const userFirstName = localStorage.getItem('firstName');
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className={mobileMenu ? 'navbar--mobile' : 'navbar'}>
      <nav className="navbar-content">
        <div className="brand-wrapper">
          <img src={logoWhite} alt="logo jobmemo" />
          <h2>Jobmemo</h2>
        </div>
        <div className="welcome-wrapper">
          <span>Bienvenue à bord</span>
          <span>{userFirstName ?? 'Utilisateur'} !</span>
        </div>
        <div className="navigation-wrapper">
          <NavLink
            to="/dashboard"
            className="btn-navigation"
            onClick={() => setMobileMenu(false)}
            style={({ isActive }) => ({
              background: isActive ? '#4a65ff' : '',
            })}
          >
            <img src={iconDashboard} alt="icone tableau de bord" />
            <span>Tableau de bord</span>
          </NavLink>
          <NavLink
            to="/account"
            className="btn-navigation"
            onClick={() => setMobileMenu(false)}
            style={({ isActive }) => ({
              background: isActive ? '#4a65ff' : '',
            })}
          >
            <img src={iconAccount} alt="icone compte" />
            <span>Mon compte</span>
          </NavLink>
          <NavLink
            to="/documents"
            className="btn-navigation"
            onClick={() => setMobileMenu(false)}
            style={({ isActive }) => ({
              background: isActive ? '#4a65ff' : '',
            })}
          >
            <img src={iconDrive} alt="icone fichiers" />
            <span>Mes documents</span>
          </NavLink>
          <NavLink
            to="/contacts"
            className="btn-navigation"
            onClick={() => setMobileMenu(false)}
            style={({ isActive }) => ({
              background: isActive ? '#4a65ff' : '',
            })}
          >
            <img src={iconContacts} alt="icone contacts" />
            <span>Mes contacts</span>
          </NavLink>
        </div>
      </nav>
      <button
        type="button"
        className="display-mobile-menu"
        aria-label="Ouvrir la barre de navigation"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        {mobileMenu ? <GiHamburgerMenu /> : <CiMenuBurger />}
      </button>
    </header>
  );
}

export default Navbar;
