import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';
import './DeleteAccount.scss';
import securedFetch from '../../../securedFetch';

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
    <div className="box-deleteaccount">
      <Link to="/dashboard">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <h3>Voulez-vous vraiment supprimer votre compte ?</h3>
      <span>Attention cette action est irréversible</span>

      <div className="input-wrap">
        <input type="button" defaultValue="Supprimer" onClick={handleDelete} />
      </div>
      <Link to="/dashboard" className="link" onClick={back}>
        Retour
      </Link>

    </div>
  );
}

export default DeleteAccount;
