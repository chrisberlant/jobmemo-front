import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import './Account.scss';

function Account() {
  const navigate = useNavigate();

  // logout function
  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const navigateToChangePassword = () => {
    navigate('/account/changePassword');
  };

  const navigateToDeleteAccount = () => {
    navigate('/deleteAccount');
  };

  return (
    <div className="box-wrap">
      <div className="box-account">
        <Link to="/dashboard">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <img className="avatar" src="avatarUrl" alt="avatar" />
        <div className="input-wrap">
          <label htmlFor="firstName">Nom : </label>
          <input
            type="text"
            name="fisrtName"
            id="firstName"
            autoComplete="off"
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="lastName">Prénom : </label>
          <input
            type="text"
            name="lasttName"
            id="lastName"
            autoComplete="off"
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="email">email : </label>
          <input type="email" name="email" id="email" autoComplete="off" />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="adress">Adresse : </label>
          <textarea name="adress" id="adress" autoComplete="off" />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <input
            type="button"
            onClick={navigateToChangePassword}
            defaultValue="Modifier le mot de passe"
          />
        </div>
        <div className="input-wrap">
          <input
            type="button"
            onClick={clearLocalStorage}
            defaultValue="Se déconnecter"
          />
        </div>
        <div className="input-wrap">
          <input
            type="button"
            onClick={navigateToDeleteAccount}
            defaultValue="Supprimer le compte"
          />
        </div>
      </div>
    </div>
  );
}

export default Account;

// <div key={user.id}>
// <h3>Hello {user.first_name} </h3>
// <p>Votre id est : {user.id}</p>
// <p>votre prénom est {user.first_name}</p>
// <p>votre nom est {user.last_name}</p>
// <img src={user.avatar_url} alt={user.first_name} />
// <br />
// </div>
