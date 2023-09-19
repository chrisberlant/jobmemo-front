/* eslint-disable object-shorthand */
import { ChangeEvent, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { authHandleFocus, authHandleBlur } from '../../Utils/animatedForm';
import securedFetch from '../../Utils/securedFetch';
import logo from '../../assets/images/logo.svg';
import './CardCreation.scss';

function randomColor(): string {
  const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return `hsl(
    ${randomInt(0, 360)},
    ${randomInt(90, 100)}%,
    ${randomInt(60, 70)}%)`;
}

function CardCreation() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [infos, setInfos] = useState({
    index: 0,
    category: '',
    jobTitle: '',
    enterpriseName: '',
    title: '',
    offerUrl: '',
    contractType: '',
    description: '',
    salary: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append('color', randomColor());
    try {
      const response = await securedFetch('/createNewCard', 'POST', formData);
      alert('👏 votre nouvelle fiche a été crée');
    } catch (error) {
      alert('🥺 Une erreur est survenue lors de la création');
    }
    navigate('/dashboard');
  };
  // TODO values, voir si copier le form existant
  return (
    <div className="box-wrap">
      <div className="box-cardform">
        <NavLink to="/dashboard">
          <img className="logo" src={logo} alt="logo" />
        </NavLink>
        <form method="post" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <label htmlFor="category">Catégorie : </label>
            <select
              name="category"
              value={category?.replace(/-/g, ' ')}
              // TODO OnChange ?
              className="category"
            >
              <option value="Mes offres">Mes offres</option>
              <option value="Mes candidatures">Mes candidatures</option>
              <option value="Mes relances">Mes relances</option>
              <option value="Mes entretiens">Mes entretiens</option>
            </select>
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="title">Titre : </label>
            <input
              onFocus={authHandleFocus}
              onBlur={authHandleBlur}
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="enterpriseName">Entreprise : </label>
            <input
              onFocus={authHandleFocus}
              onBlur={authHandleBlur}
              type="text"
              name="enterpriseName"
              id="enterpriseName"
              onChange={handleChange}
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="jobTitle">Intitulé de l&apos;annonce : </label>
            <input
              onFocus={authHandleFocus}
              onBlur={authHandleBlur}
              type="text"
              name="jobTitle"
              id="jobTitle"
              onChange={handleChange}
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="offerUrl">Source / Lien de l&apos;annonce : </label>
            <input
              onFocus={authHandleFocus}
              onBlur={authHandleBlur}
              type="text"
              name="offerUrl"
              id="offerUrl"
              onChange={handleChange}
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="contractType">Type de contrat : </label>
            <select
              className="contractType"
              name="contractType"
              defaultValue="CDI"
            >
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Alternance">Alternance</option>
              <option value="Autre">Autre</option>
            </select>
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="description">Descriptif du poste : </label>
            <input
              name="description"
              id="description"
              onChange={handleChange}
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="salary">Salaire : </label>
            <input
              onFocus={authHandleFocus}
              onBlur={authHandleBlur}
              type="text"
              name="salary"
              id="salary"
              onChange={handleChange}
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="notation">Note</label>
            <select className="notation" name="notation" defaultValue="DEFAULT">
              <option value="DEFAULT" disabled>
                Modifier la note
              </option>
              <option value="1">⭑</option>
              <option value="2">⭑⭑</option>
              <option value="3">⭑⭑⭑</option>
              <option value="4">⭑⭑⭑⭑</option>
            </select>
          </div>
          <div className="input-wrap">
            <input type="submit" value="Enregistrer" />
          </div>
          {/* <div className="input-wrap">
            <input type="reset" defaultValue="Annuler" />
          </div> */}
          <input
            type="button"
            name="cancel-button"
            className="button--cancel"
            value="Annuler"
            aria-label="Annuler"
            onClick={() => navigate('/dashboard')}
          />
        </form>
      </div>
    </div>
  );
}

export default CardCreation;
