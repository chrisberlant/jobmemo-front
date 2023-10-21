import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../../assets/images/logo.svg';
import securedFetch from '../../../Utils/securedFetch';
import { setError, setMessage } from '../../../store/reducers/app';
import { handleBlur, handleFocus } from '../../../Utils/animatedForm';
import logOut from '../../../Utils/logout';
import { useAppDispatch } from '../../../store/hook/redux';
import './DeleteAccount.scss';

function DeleteAccount() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState('');
  const [infos, setInfos] = useState({
    password: '',
  });
  const [failedConfirmation, setFailedConfirmation] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmation === 'Je confirme') {
      const deleteRequest = await securedFetch('/deleteUser', 'DELETE', infos);
      if (deleteRequest.failed) {
        dispatch(setError(deleteRequest.data));
      } else {
        dispatch(
          setMessage(
            "Compte supprimé avec succès, vous allez être redirigé vers l'accueil."
          )
        );
        setTimeout(() => {
          logOut();
        }, 2000);
      }
    } else {
      dispatch(setError('La phrase de confirmation est incorrecte'));
      setFailedConfirmation(true);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfos({ password: event.target.value });
  };

  const handleConfirmationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmation(event.target.value);
  };

  return (
    <div className="box-delete-account">
      <Link to="/dashboard">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <h3>Voulez-vous vraiment supprimer votre compte ?</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label htmlFor="confirmation">
            <span>Entrer ci-dessous la phrase : Je confirme</span>
          </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="confirmation"
            id="confirmation"
            className={
              failedConfirmation
                ? 'confirmation-input--failed'
                : 'confirmation-input'
            }
            value={confirmation}
            onChange={handleConfirmationChange}
            required
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="password">Mot de passe : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="password"
            name="password"
            id="password"
            value={infos.password}
            onChange={handlePasswordChange}
            required
          />
          <div className="line" />
        </div>
        <input
          type="submit"
          value="Supprimer le compte"
          className="button button--delete"
        />
      </form>
      <span>Attention cette action est irréversible</span>
      <input
        type="button"
        className="button button--cancel"
        value="Annuler"
        onClick={() => navigate('/account')}
      />
    </div>
  );
}

export default DeleteAccount;
