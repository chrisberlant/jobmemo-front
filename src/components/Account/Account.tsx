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
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
    address: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (userInfos.email !== '') {
      setInfos(userInfos);
    } else if (storedUser) {
      const parsedStoredUser = JSON.parse(storedUser);
      setInfos(parsedStoredUser);
    }
  }, [userInfos]);

  // logout function
  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(modifyUserInfos(formData));
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
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="address">Adresse : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="textarea"
            name="address"
            id="address"
            onChange={handleChange}
            value={infos.address}
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <input
            type="submit"
            className="submit-button"
            value="Enregistrer les modifications"
          />
        </div>
      </form>
      <Link to="/changePassword" className="link">
        Changer le mot de passe
      </Link>
      <Link to="/deleteAccount" className="link">
        Supprimer le compte
      </Link>
      <Link to="/login" className="link" onClick={logOut}>
        Se déconnecter
      </Link>
    </div>
  );
}

export default Account;
