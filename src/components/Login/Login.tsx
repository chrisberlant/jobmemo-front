import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  authHandleBlur,
  authHandleFocus,
  appearanceAnimation,
} from '../../Utils/animatedForm';
import logo from '../../assets/images/logo.svg';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { login } from '../../store/reducers/user';
import './Login.scss';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const tl = useRef();
  const error = useAppSelector((state) => state.user.error);

  useEffect(() => {
    appearanceAnimation(loginRef, tl);
  }, []);

  // Login form submit
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    await dispatch(login(formData));
    if (!error) navigate('/dashboard');
  };

  return (
    <div className="login" ref={loginRef}>
      <div className="box">
        <h2>Bienvenue</h2>
        <img className="logo" src={logo} alt="logo" />
        <form onSubmit={handleSubmit}>
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
              value="Se connecter"
            />
          </div>
        </form>
        {error && <span className="error">{error}</span>}

        <span>
          Mot de passe oublié ?
          <Link to="/forgotPassword">Réinitialisez votre mot de passe</Link>
        </span>
        <span>
          Pas de compte ? <Link to="/register">Créez votre compte</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
