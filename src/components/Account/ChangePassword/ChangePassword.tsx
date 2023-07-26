import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';
import './ChangePassword.scss';

function ResetPassword() {
  const navigate = useNavigate();

  const cancelChange = () => {
    navigate('/account');
  };

  return (
    <div className="box-wrap">
      <div className="box-changepassword">
        <Link to="/dashboard">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <img className="avatar" src="avatarUrl" alt="avatar" />
        <span className="lastName">Nom</span>
        <span className="firstName">Prénom</span>
        <span className="email">email</span>
        <div className="input-wrap">
          <label htmlFor="oldPassword">Ancien mot de passe : </label>
          <input
            type="oldPassword"
            name="oldPassword"
            id="oldPassword"
            autoComplete="off"
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="newPassword">Nouveau mot de passe : </label>
          <input
            type="newPassword"
            name="newPassword"
            id="newPassword"
            autoComplete="off"
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="confirmPassword">
            Confirmez votre mot de passe :
          </label>
          <input
            type="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="off"
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <input type="submit" defaultValue="Valider" />
        </div>
        <div className="input-wrap">
          <input type="button" onClick={cancelChange} defaultValue="Annuler" />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
