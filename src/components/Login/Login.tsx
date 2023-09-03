import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  authHandleBlur,
  authHandleFocus,
  appearanceAnimation,
} from '../../Utils/animatedForm';
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

  useEffect(() => {
    appearanceAnimation(loginRef, tl);
  }, []);

  // Login form submit
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    redirectToDashboard(formData);
  };

  return (
    <div className="login" ref={loginRef}>
      <div className="box">
        <h2>Bienvenue</h2>
        <img className="logo" src={logo} alt="logo" />
        <form method="post" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <label htmlFor="email">Email : </label>
            <input
              onFocus={authHandleFocus}
              onBlur={authHandleBlur}
              type="email"
              name="email"
              id="email"
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
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <input
              type="submit"
              className="submit-button"
              defaultValue="Se connecter"
            />
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
