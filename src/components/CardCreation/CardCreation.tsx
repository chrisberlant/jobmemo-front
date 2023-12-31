import { ChangeEvent, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';
import { useAppDispatch } from '../../store/hook/redux';
import { createNewCard } from '../../store/reducers/cards';
import { setMessage } from '../../store/reducers/app';
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
  const { categorySlug } = useParams();
  let category = '';
  if (categorySlug) {
    category = categorySlug?.replace(/^/, 'Mes ');
  }
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [infos, setInfos] = useState({
    category,
    jobTitle: '',
    enterpriseName: '',
    title: '',
    offerUrl: '',
    contractType: 'CDI',
    comments: '',
    salary: '',
    rating: 1,
    color: randomColor(),
  });
  const [hover, setHover] = useState(1);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = await dispatch(createNewCard(infos));
    if (request.meta.requestStatus === 'fulfilled') {
      navigate('/dashboard');
      setTimeout(() => {
        dispatch(setMessage('Fiche créée avec succès'));
      }, 200);
    }
  };

  return (
    <div className="card-creation">
      <h3 className="component-title">Création d&apos;une fiche</h3>
      <form className="card-creation-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label htmlFor="title">Titre : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="title"
            id="title"
            value={infos.title}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <div className="select-input">
            <label htmlFor="category">Catégorie : </label>
            <select
              id="category"
              name="category"
              value={infos.category?.replace(/-/g, ' ')}
              onChange={handleChange}
              className="category"
            >
              <option value="Mes offres">Mes offres</option>
              <option value="Mes candidatures">Mes candidatures</option>
              <option value="Mes relances">Mes relances</option>
              <option value="Mes entretiens">Mes entretiens</option>
            </select>
            <div className="line" />
          </div>
        </div>
        <div className="input-wrap">
          <label htmlFor="enterpriseName">Entreprise : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="enterpriseName"
            id="enterpriseName"
            value={infos.enterpriseName}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="jobTitle">Intitulé du poste : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="jobTitle"
            id="jobTitle"
            value={infos.jobTitle}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="offerUrl">Source / Lien de l&apos;annonce : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="offerUrl"
            id="offerUrl"
            value={infos.offerUrl}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <div className="select-input">
            <label htmlFor="contractType">Type de contrat : </label>
            <select
              id="contractType"
              className="contractType"
              name="contractType"
              value={infos.contractType}
              onChange={handleChange}
            >
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Alternance">Alternance</option>
              <option value="Autre">Autre</option>
            </select>
            <div className="line" />
          </div>
        </div>
        <div className="input-wrap">
          <label htmlFor="salary">Salaire : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="salary"
            id="salary"
            value={infos.salary}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="comments">Commentaires : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="comments"
            id="comments"
            value={infos.comments}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
        <div className="rating">
          <label htmlFor="rating">Note :</label>
          {[...Array(5)].map((_star, index) => {
            const currentRating = index + 1;
            return (
              <label key={currentRating}>
                <input
                  className="star-rating"
                  id={`rating${currentRating}`}
                  type="radio"
                  name="rating"
                  value={currentRating}
                  aria-label={`Noter ${currentRating} sur 5`}
                  onChange={handleChange}
                  onClick={() => setInfos({ ...infos, rating: currentRating })}
                />
                <FaStar
                  className="star-element"
                  size={30}
                  color={currentRating <= hover ? '#ffc107' : '#B7B7B7'}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(infos.rating)}
                />
              </label>
            );
          })}
        </div>
        <input
          type="submit"
          className="button button--submit"
          value="Enregistrer"
        />
        <input
          type="button"
          name="cancel-button"
          className="button button--cancel"
          value="Annuler"
          onClick={() => navigate('/dashboard')}
        />
      </form>
    </div>
  );
}

export default CardCreation;
