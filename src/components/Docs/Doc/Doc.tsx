import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';
import './Doc.scss';

function Doc() {
  const navigate = useNavigate();

  const navigateToDrive = () => {
    navigate('/docs');
  };

  return (
    <div className="box-wrap">
      <div className="box-doc">
        <Link to="/docs">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <div className="input-wrap">
          <label htmlFor="password">Titre du document : </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
          />
          <div className="line" />
          <div className="input-wrap">
            <input
              type="button"
              onClick={navigateToDrive}
              defaultValue="Retour au drive"
            />
          </div>
          <div className="input-wrap">
            <input type="file" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doc;
