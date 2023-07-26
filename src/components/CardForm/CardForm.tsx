import { Link, useParams } from 'react-router-dom';
// Import quill for react
import ReactQuill from 'react-quill';
import { useState } from 'react';
import logo from '../../assets/images/logo.svg';
import './CardForm.scss';
// Import Quill css and snow theme (2 themes are available : snow & bubble)
import 'react-quill/dist/quill.snow.css';

function CardForm() {
  const { id } = useParams();
  console.log(id);

  const [value, setValue] = useState('');

  return (
    <div className="box-wrap">
      <div className="box-cardform">
        <Link to="/dashboard">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <img className="avatar" src="avatarUrl" alt="avatar" />
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
              name="offerUrl"
              id="offerUrl"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="contractType">Type de contrat : </label>
            <select className="contractType">
              <option value="#">CDI</option>
              <option value="#">CDD</option>
              <option value="#">Alternance</option>
              <option value="#">Intérim</option>
              <div className="line" />
            </select>
          </div>
          <div className="input-wrap">
            <label htmlFor="commentaries">Descriptif du poste : </label>
            <textarea
              name="commentaries"
              id="commentaries"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="salary">Salaire : </label>
            <input type="text" name="salary" id="salary" autoComplete="off" />
            <div className="line" />
          </div>
          <div className="input-wrap">
            {/* Add quill text editor */}
            <div className="box-editor">
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
          </div>
          <div className="input-wrap">
            <label htmlFor="docs">Documents associés : </label>
            <select className="docs">
              <option value="#">Document 01</option>
              <option value="#">Document 02</option>
              <option value="#">Document 03</option>
              <option value="#">Document 04</option>
              <div className="line" />
            </select>
          </div>
          <h2>Ajouter un document depuis : </h2>
          <div className="input-wrap">
            <input type="submit" defaultValue="Drive" />
          </div>
          <div className="input-wrap">
            <input type="submit" defaultValue="Ordinateur" />
          </div>
          <div className="input-wrap">
            <input type="submit" defaultValue="Enregistrer" />
          </div>
          <div className="input-wrap">
            <input type="submit" defaultValue="Annuler" />
          </div>
          <div className="input-wrap">
            <span>Rating stars</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardForm;
