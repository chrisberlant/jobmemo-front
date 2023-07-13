import './SignUp.scss';

function SignUp() {
  return (
    <div className="SignUp">
      <h3>Se créer un compte</h3>
      <form className="form">
        <p>Email</p>
        <input type="text" placeholder="email" />
        <p>Mot de passe</p>
        <input type="password" placeholder="Mot de passe" />
        <p>Confirmez votre mot de passe</p>
        <input type="password" placeholder="Confirmez votre mot de passe" />
        <p>Nom</p>
        <input type="text" placeholder="Nom" />
        <p>Prénom</p>
        <input type="text" placeholder="Prénom" />
      </form>
      <button type="submit">S&apos;inscrire</button>
    </div>
  );
}

export default SignUp;
