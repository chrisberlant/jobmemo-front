import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleFocus, handleBlur } from '../../../Utils/animatedForm';
import logo from '../../../assets/images/logo.svg';
import { modifyUserPassword } from '../../../store/reducers/user';
import { useAppDispatch, useAppSelector } from '../../../store/hook/redux';
import logOut from '../../../Utils/logout';
import '../Account.scss';

function ChangePassword() {
  const dispatch = useAppDispatch();
  const changedPassword = useAppSelector((state) => state.user.changedPassword);
  const error = useAppSelector((state) => state.user.error);
  const navigate = useNavigate();
  const [infos, setInfos] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // If password has been succesfully changed
    if (changedPassword) {
      setTimeout(() => {
        logOut();
      }, 2000);
    }
    // If it failed, erase all every input
    if (error) {
      setInfos({ oldPassword: '', newPassword: '', confirmPassword: '' });
    }
  }, [changedPassword, error]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(modifyUserPassword(formData));
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
      {changedPassword && (
        <span className="infoMessage">{changedPassword}</span>
      )}
      {error && <span className="errorMessage--password">{error}</span>}
    </div>
  );
}

export default ChangePassword;
