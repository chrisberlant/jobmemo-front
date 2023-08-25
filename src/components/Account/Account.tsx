import { Link, useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
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

  const back = () => {
    navigate('/dashboard');
    window.location.reload();
  };

  // ANIMATION ////////////////////////////////////////////////////

  // Animation des champs email et mot de passe avec GSAP >>
  // Animation lorsqu'il y'a une action sur le champ
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const label = e.target.parentNode?.querySelector('label');
    const line = e.target.parentNode?.querySelector('.line');
    if (label && line) {
      gsap.to(label, {
        duration: 0.2,
        y: -16,
        color: '#4a65ff',
      });
      gsap.to(line, {
        scaleX: 1,
      });
    }
  };
  // Animation lorsque l'on sort du champ
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const label = e.target.parentNode?.querySelector('label');
    const line = e.target.parentNode?.querySelector('.line');

    if (label && line) {
      if (e.target.value === '') {
        gsap.to(label, {
          duration: 0.1,
          y: 0,
          color: '#999',
        });
        gsap.to(line, {
          scaleX: 0,
        });
      }
    }
  };
  // FIN ANIMATION /////////////////////////////////////////////////////

  return (
    <div className="box-account">
      <Link to="/dashboard">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <form method="post">
        <div className="input-wrap">
          <label htmlFor="firstName">Nom : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="lasttName"
            id="lastName"
            autoComplete="off"
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="email">email : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="email"
            name="email"
            id="email"
            autoComplete="off"
          />
          <div className="line" />
        </div>
        <div className="input-wrap address">
          <label htmlFor="address">Adresse : </label>
          <textarea name="address" id="address" autoComplete="off" />
        </div>
        <div className="input-wrap">
          <div className="input-wrap">
            <input
              type="submit"
              className="submit-button"
              value="Enregistrer les modifications"
            />
          </div>
        </div>
      </form>
      <Link to="/account/changePassword" className="link">
        Réinitialisez votre mot de passe
      </Link>
      <Link to="/deleteAccount" className="link">
        Supprimer le compte
      </Link>
      <Link to="/login" className="link" onClick={clearLocalStorage}>
        Se déconnecter
      </Link>
      <Link to="/dashboard" className="link" onClick={back}>
        Retour
      </Link>
    </div>
  );
}

export default Account;
