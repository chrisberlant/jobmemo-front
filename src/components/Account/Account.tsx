import { useState, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';
import logo from '../../assets/images/logo.svg';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import './Account.scss';
import { modifyUserInfos } from '../../store/reducers/user';

function Account() {
  const dispatch = useAppDispatch();
  const userInfos = useAppSelector((state) => state.user.infos);
  const [infos, setInfos] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
    address: '',
  });

  useEffect(() => {
    if (!userInfos) {
      // TODO récupérer les infos user si pas dans le store (nouvelle méthode de contrôleur avec securedfetch)
    }
  }, [userInfos]);

  // logout function
  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      modifyUserInfos({ ...userInfos, [event.target.name]: event.target.value })
    );
  };

  return (
    <div className="box-account">
      <Link to="/dashboard">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <form>
        <div className="input-wrap">
          <label htmlFor="firstName">Nom : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={userInfos.firstName}
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="lastName">Prénom : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
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
          />
          <div className="line" />
        </div>
        <div className="input-wrap address">
          <label htmlFor="address">Adresse : </label>
          <textarea name="address" id="address" onChange={handleChange} />
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
      <Link to="/changePassword" className="link">
        Changer le mot de passe
      </Link>
      <Link to="/deleteAccount" className="link">
        Supprimer le compte
      </Link>
      <Link to="/login" className="link" onClick={clearLocalStorage}>
        Se déconnecter
      </Link>
    </div>
  );
}

export default Account;
