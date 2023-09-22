import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
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
  const message = useAppSelector((state) => state.user.message);
  const [infos, setInfos] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    appearanceAnimation(loginRef, tl);
    const isLogged = localStorage.getItem('firstName');
    if (isLogged) navigate('/dashboard');
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  // Login form submit
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    await dispatch(login(formData));
    const isLogged = localStorage.getItem('firstName');
    if (isLogged) navigate('/dashboard');
  };

  return (
    <div className="login" ref={loginRef}>
      {message && <span className="message">{message}</span>}
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
              onChange={handleChange}
              required
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
              onChange={handleChange}
              required
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <input
              type="submit"
              className="button button--submit"
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
