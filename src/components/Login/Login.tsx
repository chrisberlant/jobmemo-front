/* eslint-disable no-console */
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '../../assets/images/logo.svg';
import './Login.scss';
import { useAppDispatch } from '../../store/hook/redux';
import { login } from '../../store/reducers/user';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginRef = useRef<HTMLFormElement>(null);
  const tl = useRef();

  async function redirectToDashboard(formData: FormData) {
    await dispatch(login(formData));
    navigate('/dashboard');
  }
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

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const loginBox = self.selector('.box-login');
      const loginElements = self.selector('.box-login *');
      const labels = self.selector('label');

      tl.current = gsap
        .timeline()
        .from(loginBox, {
          delay: 0.4,
          ease: 'ease.Out',
          scale: 0.9,
          duration: 0.4,
          opacity: 0,
          clipPath:
            'polygon(0px 250px, 50px 200px, 300px 200px, 300px 250px, 250px 300px, 0px 300px)',
        })

        .from(loginElements, {
          opacity: 0,
          stagger: 0.01,
        })
        .to(labels, {
          opacity: 1,
          stagger: 0.1,
        });
    }, loginRef);
    return () => ctx.revert();
  }, []);
  // FIN ANIMATION /////////////////////////////////////////////////////

  // Login form submit
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    redirectToDashboard(formData);
  };

  return (
    <div className="login" ref={loginRef}>
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
