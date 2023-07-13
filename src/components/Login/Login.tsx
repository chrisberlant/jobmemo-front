// import { Link } from 'react-router-dom';
import './Login.scss';

function Login() {
  return (
    <div className="Login">
      <h3>Connexion</h3>
      <form className="form">
        <p>Email</p>
        <input type="text" placeholder="email" />
        <p>Mot de passe</p>
        <input type="password" placeholder="Mot de passe" />
      </form>
      <a href="/account/resetPassword">Mot de passe oublié</a>
      <button type="submit">Se connecter</button>
      <p>Ou</p>
      <p>
        Vous n&apos;avez pas de compte
        <a href="/signup">Créer un compte Jobmemo</a>
      </p>
    </div>
  );
}

export default Login;
