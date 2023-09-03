import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';
import '../Account.scss';
import securedFetch from '../../../Utils/securedFetch';

function DeleteAccount() {
  const navigate = useNavigate();

  const back = () => {
    navigate('/dashboard');
    window.location.reload();
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    try {
      await securedFetch('/deleteUser', 'DELETE');
      alert('👏 votre compte a été supprimé');
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert("une erreur c'est produite");
    }
  };

  return (
    <div className="box-account">
      <Link to="/dashboard">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <h3>Voulez-vous vraiment supprimer votre compte ?</h3>
      <span>Attention cette action est irréversible</span>
      <form>
        <div className="input-wrap">
          <input
            type="button"
            value="Supprimer"
            className="submit-button"
            onClick={handleDelete}
          />
        </div>
      </form>
      <Link to="/dashboard" className="link" onClick={back}>
        Retour
      </Link>
    </div>
  );
}

export default DeleteAccount;
