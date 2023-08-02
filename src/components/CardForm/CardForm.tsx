/* eslint-disable object-shorthand */
/* eslint-disable no-alert */
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ChangeEvent } from 'react';
import logo from '../../assets/images/logo.svg';
import './CardForm.scss';
import securedFetch from '../../securedFetch';

function randomColor(): string {
  const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return `hsl(
    ${randomInt(0, 360)},
    ${randomInt(90, 100)}%,
    ${randomInt(60, 70)}%)`;
}

function CardForm() {
  const navigate = useNavigate();
  // onSubmit : catch all entries from Form
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append('color', randomColor());
    try {
      const response = await securedFetch('/createNewCard', 'POST', formData);
      console.log(response.data);
      alert('👏 votre nouvelle fiche a été crée');
    } catch (error) {
      console.error(error);
      alert('🥺 Une erreur est survenue lors de la création');
    }
    navigate('/dashboard');
    window.location.reload();
  };

  const back = () => {
    navigate('/dashboard');
    window.location.reload();
  };

  // ANIMATION ////////////////////////////////////////////////////

  // Animation des champs email et mot de passe avec GSAP >>
  // Animation lorsqu'il y'a une action sur le champ
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const label = e.target.parentNode?.querySelector('label');
    const line = e.target.parentNode?.querySelector('.line');
    if (label && line) {
      gsap.to(label, {
        duration: 0.2,
        y: -16,
        color: '#4a65ff',
      });
      gsap.to(line, {
        scaleX: 1,
      });
    }
  };
  // Animation lorsque l'on sort du champ
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const label = e.target.parentNode?.querySelector('label');
    const line = e.target.parentNode?.querySelector('.line');

    if (label && line) {
      if (e.target.value === '') {
        gsap.to(label, {
          duration: 0.1,
          y: 0,
          color: '#999',
        });
        gsap.to(line, {
          scaleX: 0,
        });
      }
    }
  };
  // FIN ANIMATION /////////////////////////////////////////////////////

  const { category } = useParams();
  // console.log(category);

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
              defaultValue={category?.replace(/-/g, ' ')}
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
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="title"
              id="title"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="enterpriseName">Entreprise : </label>
            <input
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="enterpriseName"
              id="enterpriseName"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="jobTitle">Intitulé de l&apos;annonce : </label>
            <input
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="jobTitle"
              id="jobTitle"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="offerUrl">Source / Lien de l&apos;annonce : </label>
            <input
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="offerUrl"
              id="offerUrl"
              autoComplete="off"
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
            <textarea
              required
              name="description"
              id="description"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="salary">Salaire : </label>
            <input
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="salary"
              id="salary"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <input type="submit" defaultValue="Enregistrer" />
          </div>
          {/* <div className="input-wrap">
            <input type="reset" defaultValue="Annuler" />
          </div> */}
        </form>
        <button type="button" onClick={back}>
          Retour
        </button>
      </div>
    </div>
  );
}

export default CardForm;
