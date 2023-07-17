import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
// import { useLayoutEffect, useRef } from 'react';
import logo from '../../assets/images/logo.svg';
import './Login.scss';

function Login() {
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

  // Login form submit
  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const fetchParams = {
        method: 'POST',
        body: formData,
      };
      const response = await fetch('http://localhost:3000/login', fetchParams);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="box-wrap">
      <div className="box-login">
        <h2>Bienvenue</h2>
        <img className="logo" src={logo} alt="logo" />
        <form method="post" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <label htmlFor="email">Email : </label>
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
          <div className="input-wrap">
            <label htmlFor="password">Mot de passe : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="password"
              name="password"
              id="password"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <input type="submit" defaultValue="Se connecter" />
          </div>
        </form>
        <span className="forgot">
          Mot de passe oublié ?
          <Link to="/forgotPassword">Réinitialisez votre mot de passe</Link>
        </span>
        <span className="forgot">
          Pas de compte ? <Link to="/register">Créez votre compte</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
