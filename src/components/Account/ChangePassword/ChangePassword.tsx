import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap/src';
import logo from '../../../assets/images/logo.svg';
import '../Account.scss';

function ResetPassword() {
  const navigate = useNavigate();

  const cancelChange = () => {
    navigate('/account');
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
          <label htmlFor="oldPassword">Ancien mot de passe : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
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
            onFocus={handleFocus}
            onBlur={handleBlur}
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="off"
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <input type="submit" className="button--submit" value="Valider" />
        </div>
        <div className="input-wrap">
          <input
            type="button"
            className="cancel-button"
            onClick={cancelChange}
            value="Annuler"
          />
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
