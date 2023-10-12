import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import securedFetch from '../../Utils/securedFetch';
import { setMessage } from '../../store/reducers/app';
import { CardType } from '../../@types/jobmemo';
import {
  modifyCard,
  sendCardToTrash,
  restoreCard,
} from '../../store/reducers/cards';
import './CardDetails.scss';

function CardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dashboardCard = useAppSelector((state) =>
    state.cards.items.find((searchedCard) => searchedCard.id === id)
  );
  const trashedCard = useAppSelector((state) =>
    state.cards.trashedItems.find((searchedCard) => searchedCard.id === id)
  );
  let card: CardType | null = null;
  if (dashboardCard) {
    card = dashboardCard;
  } else if (trashedCard) {
    card = trashedCard;
  }

  const [infos, setInfos] = useState({
    category: '',
    jobTitle: '',
    enterpriseName: '',
    title: '',
    offerUrl: '',
    contractType: '',
    comments: '',
    salary: '',
    rating: 1,
  });
  const [hover, setHover] = useState(1);
  console.log(infos);

  useEffect(() => {
    const fetchCard = async () => {
      if (card) {
        setInfos(card);
        setHover(card.rating);
      } else {
        const fetchedCard = await securedFetch(`/card/${id}`);
        if (fetchedCard.failed) {
          navigate('/404');
        } else {
          setInfos(fetchedCard.data);
          setHover(fetchedCard.data.rating);
        }
      }
    };
    fetchCard();
  }, [card, id, navigate]);

  const sendSelectedCardTotrash = async () => {
    if (id) {
      const request = await dispatch(sendCardToTrash(id));
      if (request.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard');
        setTimeout(() => {
          dispatch(setMessage('Fiche envoyée à la corbeille'));
        }, 200);
      }
    }
  };

  const restoreSelectedCard = async () => {
    if (id) {
      const request = await dispatch(restoreCard(id));
      if (request.meta.requestStatus === 'fulfilled') {
        navigate('/recycle-bin');
        setTimeout(() => {
          dispatch(setMessage('Fiche restaurée avec succès'));
        }, 200);
      }
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = await dispatch(modifyCard(infos));
    if (request.meta.requestStatus === 'fulfilled') {
      navigate('/dashboard');
      setTimeout(() => {
        dispatch(setMessage('Fiche modifiée avec succès'));
      }, 200);
    }
  };

  return (
    <div className="card-details">
      <span className="title">Détails de la fiche</span>
      <form className="card-details-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label htmlFor="title">Titre : </label>
          <input
            id="title"
            name="title"
            value={infos.title}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <div className="select-input">
            <label htmlFor="category">Catégorie : </label>
            <select
              id="category"
              name="category"
              value={infos.category}
              onChange={handleChange}
            >
              <option value="Mes offres">Mes offres</option>
              <option value="Mes candidatures">Mes candidatures</option>
              <option value="Mes relances">Mes relances</option>
              <option value="Mes entretiens">Mes entretiens</option>
            </select>
          </div>
        </div>
        <div className="input-wrap">
          <label htmlFor="enterpriseName">Entreprise : </label>
          <input
            id="enterpriseName"
            name="enterpriseName"
            value={infos.enterpriseName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="jobTitle">Intitulé du poste :</label>
          <input
            id="jobTitle"
            name="jobTitle"
            value={infos.jobTitle}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
              onChange={handleChange}
            >
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Alternance">Alternance</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="salary">Salaire :</label>
          <input
            id="salary"
            name="salary"
            value={infos.salary}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="comments">Commentaires :</label>
          <input
            id="comments"
            name="comments"
            value={infos.comments}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
        <input type="hidden" name="id" value={id} />
        <input
          type="submit"
          className="button button--submit"
          aria-label="Modifier la fiche"
          value="Modifier la fiche"
        />
        {card?.isDeleted ? (
          <input
            type="button"
            className="button button--restore"
            value="Restaurer la fiche"
            aria-label="Restaurer la fiche"
            onClick={restoreSelectedCard}
          />
        ) : (
          <input
            type="button"
            className="button button--delete"
            value="Supprimer la fiche"
            aria-label="Supprimer la fiche"
            onClick={sendSelectedCardTotrash}
          />
        )}
        <input
          type="button"
          className="button button--cancel"
          value="Annuler"
          aria-label="Annuler"
          onClick={() =>
            navigate(card?.isDeleted ? '/recycle-bin' : '/dashboard')
          }
        />
      </form>
    </div>
  );
}

export default CardDetails;
