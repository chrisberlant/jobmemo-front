import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Doc from './Doc/Doc';
import './Docs.scss';

function Docs() {
  const navigate = useNavigate();

  const navigateToDoc = () => {
    navigate('/doc/:id');
  };

  return (
    <div className="box-wrap">
      <div className="box-docs">
        <Header />
        <Navbar />
        <Footer />
        <div className="input-wrap">
          <input
            type="button"
            onClick={navigateToDoc}
            defaultValue="Ajouter un document"
          />
        </div>
      </div>
    </div>
  );
}

export default Docs;
