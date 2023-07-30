import './CreateContact.scss';

function CreateContact() {
  return (
    <div className="box-contact">
      <div className="box-contactform">
        <form method="post">
          <div className="input-wrap">
            <label htmlFor="firstName">Prénom : </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="lastName">Nom : </label>
            <input
              type="text"
              name="lastName"
              id="LastName"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="entrepriseUrl">email: </label>
            <input type="email" name="email" id="email" autoComplete="off" />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="phone">Téléphone : </label>
            <input type="tel" name="phone" id="phone" autoComplete="off" />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="select-enterprise">Entreprise : </label>
            <select className="select-enterprise">
              <option value="#">Entreprise 1</option>
              <option value="#">Entreprise 2</option>
              <option value="#">Entreprise 3</option>
              <option value="#">Entreprise 4</option>
              <div className="line" />
            </select>
          </div>
          <div className="input-wrap">
            <label htmlFor="commentaries">Commentaires : </label>
            <textarea
              name="commentaries"
              id="commentaries"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <input type="submit" defaultValue="Enregistrer" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateContact;
