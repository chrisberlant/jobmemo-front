import { useParams } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import './CardForm.scss';

function CardForm() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="box-wrap">
      <div className="box-cardform">
        <img className="logo" src={logo} alt="logo" />
        <img className="avatar" src="" alt="avatar" />
        <div className="input-wrap">
          <label htmlFor="category">Catégorie : </label>
          <select className="category">
            <option value="#">Mes offres</option>
            <option value="#">Mes candidatures</option>
            <option value="#">Mes relances</option>
            <option value="#">Mes entretiens</option>
            <div className="line" />
          </select>
        </div>
        <form method="post">
          <div className="input-wrap">
            <label htmlFor="title">Titre : </label>
            <input type="text" name="title" id="title" autoComplete="off" />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="enterpriseName">Entreprise : </label>
            <input
              type="text"
              name="enterpriseName"
              id="enterpriseName"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="enterpriseUrl">
              Site web de l&apos;entreprise :
            </label>
            <input
              type="text"
              name="enterpriseUrl"
              id="enterpriseUrl"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="adress">Adresse : </label>
            <textarea name="adress" id="adress" autoComplete="off" />
            <div className="line" />
          </div>
          <div className="contacts-wrap">
            <h3>Contacts liés</h3>
            <div className="input-wrap">
              <label htmlFor="contacts">Ajouter depuis mon réseau : </label>
              <input type="search" />
              <div className="line" />
            </div>
            <div className="input-wrap">
              <input type="submit" defaultValue="Ajouter un nouveau contact" />
            </div>
            <form method="post">
              <h3>Créer un nouveau contact</h3>
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
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                />
                <div className="line" />
              </div>
              <div className="input-wrap">
                <label htmlFor="phone">Téléphone : </label>
                <input type="text" name="phone" id="phone" autoComplete="off" />
                <div className="line" />
              </div>
              <div className="input-wrap">
                <label htmlFor="enterprise">Ajouter depuis mon réseau : </label>
                <input type="search" />
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
            </form>
          </div>
          <div className="input-wrap">
            <label htmlFor="offer-title">Intitulé de l&apos;annonce : </label>
            <input
              type="text"
              name="offer-title"
              id="offer-title"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="offerUrl">Source / Lien de l&apos;annonce : </label>
            <input
              type="text"
              name="enterpriseName"
              id="enterpriseName"
              autoComplete="off"
            />
            <div className="line" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardForm;
