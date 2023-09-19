import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  authHandleBlur,
  authHandleFocus,
  appearanceAnimation,
} from '../../Utils/animatedForm';
import logo from '../../assets/images/logo.svg';
import { useAppSelector, useAppDispatch } from '../../store/hook/redux';
import { register } from '../../store/reducers/user';
import './Register.scss';

function Register() {
  const registerRef = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tl = useRef();
  const error = useAppSelector((state) => state.user.error);
  const [infos, setInfos] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    appearanceAnimation(registerRef, tl);
    if (error)
      setInfos((prevInfos) => ({
        ...prevInfos,
        password: '',
        confirmPassword: '',
      }));
    const isLogged = localStorage.getItem('firstName');
    if (isLogged) navigate('/dashboard');
  }, [navigate, error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    dispatch(register(formData));
    // navigate('/login');
  };

  return (
    <div className="register" ref={registerRef}>
      {error && <span className="error">{error}</span>}
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
              autoComplete="given-name"
              value={infos.firstName}
              onChange={handleChange}
              required
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
              autoComplete="family-name"
              value={infos.lastName}
              onChange={handleChange}
              required
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
              autoComplete="email"
              value={infos.email}
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
              autoComplete="new-password"
              value={infos.password}
              onChange={handleChange}
              required
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
              value={infos.confirmPassword}
              onChange={handleChange}
              required
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <input
              type="submit"
              className="button--submit"
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
