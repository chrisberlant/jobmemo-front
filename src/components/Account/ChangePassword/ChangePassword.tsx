import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleFocus, handleBlur } from '../../../Utils/animatedForm';
import logo from '../../../assets/images/logo.svg';
import logOut from '../../../Utils/logout';
import '../Account.scss';
import securedFetch from '../../../Utils/securedFetch';

function ChangePassword() {
  const [changedPassword, setChangedPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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
  }, [changedPassword]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const request = await securedFetch(
      '/modifyUserPassword',
      'PATCH',
      formData
    );
    if (request.failed) {
      setError(request.data);
      setInfos({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setError(null);
      setChangedPassword(
        'Mot de passe changé avec succès, vous allez être déconnecté.'
      );
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
      {changedPassword && (
        <span className="infoMessage">{changedPassword}</span>
      )}
      {error && <span className="errorMessage--password">{error}</span>}
    </div>
  );
}

export default ChangePassword;
