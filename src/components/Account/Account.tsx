import { useState, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logOut from '../../Utils/logout';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { getUserInfos, modifyUserInfos } from '../../store/reducers/user';
import logo from '../../assets/images/logo.svg';
import { setError, setMessage } from '../../store/reducers/app';
import './Account.scss';

function Account() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.user.message);
  const error = useAppSelector((state) => state.user.error);
  const userInfos = useAppSelector((state) => state.user.infos);

  const [infos, setInfos] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
    address: '',
  });

  useEffect(() => {
    if (userInfos.email !== '') {
      setInfos(userInfos);
    } else {
      dispatch(getUserInfos());
    }
  }, [userInfos, dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const request = await dispatch(modifyUserInfos(formData));
    if (request.meta.requestStatus === 'fulfilled')
      dispatch(setMessage('Informations modifiées avec succès'));
  };

  return (
    <div className="box-account">
      <Link to="/dashboard">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label htmlFor="firstName">Nom : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={infos.lastName}
            required
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="lastName">Prénom : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={infos.firstName}
            required
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="email">Adresse email : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={infos.email}
            required
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="address">Adresse : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            name="address"
            id="address"
            onChange={handleChange}
            value={infos.address}
          />
          <div className="line" />
        </div>
        <input
          type="submit"
          className="button button--submit"
          value="Enregistrer les modifications"
        />
      </form>
      <input
        type="button"
        className="button button--password"
        value="Changer le mot de passe"
        onClick={() => navigate('/changePassword')}
      />
      <input
        type="button"
        className="button button--logout"
        value="Se déconnecter"
        onClick={logOut}
      />
      {message && <span className="infoMessage">{message}</span>}
      {error && <span className="errorMessage">{error}</span>}
      <Link to="/deleteAccount" className="delete-account">
        Supprimer le compte
      </Link>
    </div>
  );
}

export default Account;
