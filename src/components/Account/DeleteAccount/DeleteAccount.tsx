import { useNavigate } from 'react-router-dom';
import './DeleteAccount.scss';

function DeleteAccount() {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="box-wrap">
      <div className="box-deleteAccount">
        <h3>Voulez-vous vraiment supprimer votre compte ?</h3>
        <span>Atttion cette action est irréversible</span>
        <div className="input-wrap">
          <input
            type="button"
            onClick={navigateToDashboard}
            defaultValue="Revenir au tableau de bord"
          />
        </div>
        <div className="input-wrap">
          <input type="submit" defaultValue="Supprimer" />
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount;
