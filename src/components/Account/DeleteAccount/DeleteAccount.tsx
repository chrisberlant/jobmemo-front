import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../../assets/images/logo.svg';
import securedFetch from '../../../Utils/securedFetch';
import './DeleteAccount.scss';

function DeleteAccount() {
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState('');
  const [failedConfirmation, setFailedConfirmation] = useState(false);

  const handleDelete = async () => {
    if (confirmation === 'Je confirme') {
      try {
        await securedFetch('/deleteUser', 'DELETE');
        alert('👏 votre compte a été supprimé');
        localStorage.clear();
        navigate('/login');
      } catch (error) {
        console.error(error);
        alert("une erreur c'est produite");
      }
    } else {
      setFailedConfirmation(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmation(e.target.value);
  };

  return (
    <div className="box-delete-account">
      <Link to="/dashboard">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <h3>Voulez-vous vraiment supprimer votre compte ?</h3>
      <form className="form">
        <span>Entrer ci-dessous la phrase : Je confirme</span>
        <input
          className={
            !failedConfirmation
              ? 'confirmation-input'
              : 'confirmation-input--failed'
          }
          value={confirmation}
          onChange={handleChange}
        />
        <input
          type="button"
          value="Supprimer le compte"
          className="button button--delete-account"
          onClick={handleDelete}
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
