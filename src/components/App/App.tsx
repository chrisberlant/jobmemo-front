import { Link } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Link to="/login" className="login-link">
        Se connecter
      </Link>
      <h1>/</h1>
    </div>
  );
}

export default App;
