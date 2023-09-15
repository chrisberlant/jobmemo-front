import { NavLink } from 'react-router-dom';
// import * as MaIcons from 'react-icons/md';
// import Calendar from 'react-calendar';
import logoWhite from '../../assets/images/logo-white.svg';
import iconDashboard from '../../assets/icons/icon-dashboard.svg';
import iconAccount from '../../assets/icons/icon-account.svg';
import iconDrive from '../../assets/icons/icon-drive.svg';
import iconContacts from '../../assets/icons/icon-contacts.svg';
import './Navbar.scss';

function Navbar() {
  // Show/Hide Menu
  // React Calendar
  // const [date, setDate] = useState(new Date());
  /* const onchange = () => {
    setDate(date);
  }; */

  return (
    <div className="navbar">
      <div className="brand-wrapper">
        <img src={logoWhite} alt="logo jobmemo" />
        <h2>Jobmemo</h2>
      </div>
      <div className="welcome-wrapper">
        <span>Bienvenue à bord</span>
        <span>Utilisateur !</span>
      </div>
      <div className="navigation-wrapper">
        <NavLink
          to="/dashboard"
          className="btn-navigation"
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
          style={({ isActive }) => ({
            background: isActive ? '#4a65ff' : '',
          })}
        >
          <img src={iconAccount} alt="icone compte" />
          <span>Mon compte</span>
        </NavLink>
        <NavLink to="#" className="btn-navigation">
          <img src={iconDrive} alt="icone fichiers" />
          <span>Mes fichiers</span>
        </NavLink>
        <NavLink
          to="/contacts"
          className="btn-navigation"
          style={({ isActive }) => ({
            background: isActive ? '#4a65ff' : '',
          })}
        >
          <img src={iconContacts} alt="icone contacts" />
          <span>Mes contacts</span>
        </NavLink>
      </div>
      <div className="calendar-wrapper">
        {/* <Calendar onChange={onchange} value={date} /> */}
      </div>
    </div>
  );
}

export default Navbar;
