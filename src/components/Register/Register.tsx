import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  authHandleBlur,
  authHandleFocus,
  appearanceAnimation,
} from '../../Utils/animatedForm';
import logo from '../../assets/images/logo.svg';
// import check from '../../assets/icons/check.svg';
// import error from '../../assets/icons/error.svg';
import './Register.scss';

function Register() {
  const registerRef = useRef();
  const navigate = useNavigate();
  const tl = useRef();

  useEffect(() => {
    appearanceAnimation(registerRef, tl);
  }, []);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const fetchParams = {
        method: 'POST',
        body: formData,
      };
      const response = await fetch(
        'http://localhost:3000/register',
        fetchParams
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    navigate('/login');
  };

  return (
    <div className="register" ref={registerRef}>
      <div className="box">
        <h2>Créer votre compte</h2>
        <img className="logo" src={logo} alt="logo" />
        <form onSubmit={handleSubmit}>
          <div className="input-wrap">
            <label htmlFor="firstName">Prénom : </label>
            <input
              onFocus={authHandleFocus}
              onBlur={authHandleBlur}
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="new-password"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="lastName">Nom : </label>
            <input
              onFocus={authHandleFocus}
              onBlur={authHandleBlur}
              type="text"
              name="lastName"
              id="lastName"
              autoComplete="new-password"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="email">Email : </label>
            <input
              onFocus={authHandleFocus}
              onBlur={authHandleBlur}
              type="email"
              name="email"
              id="email"
              autoComplete="new-password"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="password">Mot de passe : </label>
            <input
              onFocus={authHandleFocus}
              onBlur={authHandleBlur}
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="confirmPassword">Confirmez mot de passe : </label>
            <input
              onFocus={authHandleFocus}
              onBlur={authHandleBlur}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <input
              type="submit"
              className="submit-button"
              value="S'enregistrer"
            />
          </div>
        </form>
        <span className="existing-account">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
