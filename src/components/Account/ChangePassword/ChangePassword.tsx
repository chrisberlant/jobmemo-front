import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleFocus, handleBlur } from '../../../Utils/animatedForm';
import logo from '../../../assets/images/logo.svg';
import logOut from '../../../Utils/logout';
import { setError, setMessage } from '../../../store/reducers/app';
import { useAppDispatch } from '../../../store/hook/redux';
import securedFetch from '../../../Utils/securedFetch';
import '../Account.scss';

function ChangePassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [infos, setInfos] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = await securedFetch('/modifyUserPassword', 'PATCH', infos);
    if (request.failed) {
      dispatch(setError(request.data));
      setInfos({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      dispatch(
        setMessage(
          'Mot de passe changé avec succès, vous allez être déconnecté.'
        )
      );
      setTimeout(() => {
        logOut();
      }, 2000);
    }
  };

  return (
    <div className="box-account">
      <Link to="/dashboard">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label htmlFor="oldPassword">Ancien mot de passe : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="password"
            name="oldPassword"
            id="oldPassword"
            onChange={handleChange}
            value={infos.oldPassword}
            autoComplete="off"
            required
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="newPassword">Nouveau mot de passe : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="password"
            name="newPassword"
            id="newPassword"
            onChange={handleChange}
            value={infos.newPassword}
            autoComplete="off"
            required
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="confirmPassword">
            Confirmez votre mot de passe :
          </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleChange}
            value={infos.confirmPassword}
            autoComplete="off"
            required
          />
          <div className="line" />
        </div>
        <input
          type="submit"
          className="button button--submit"
          value="Valider"
        />
        <input
          type="button"
          className="button button--cancel"
          onClick={() => navigate('/account')}
          value="Annuler"
        />
      </form>
    </div>
  );
}

export default ChangePassword;
