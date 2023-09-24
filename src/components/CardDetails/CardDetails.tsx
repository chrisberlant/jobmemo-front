import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import securedFetch from '../../Utils/securedFetch';
import { modifyCard, sendCardToTrash } from '../../store/reducers/cards';
import './CardDetails.scss';

function CardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const card = useAppSelector((state) =>
    state.cards.items.find((searchedCard) => searchedCard.id === id)
  );

  const [infos, setInfos] = useState({
    index: 0,
    category: '',
    jobTitle: '',
    enterpriseName: '',
    title: '',
    offerUrl: '',
    contractType: '',
    comments: '',
    salary: '',
    rating: 0,
  });
  console.log(infos);
  const [hover, setHover] = useState<number>(infos.rating);

  const deleteCard = async () => {
    if (id) {
      navigate('/dashboard');
      await dispatch(sendCardToTrash(id));
    }
  };

  useEffect(() => {
    const fetchCard = async () => {
      if (card) {
        setInfos(card);
      } else {
        const fetchedCard = await securedFetch(`/card/${id}`);
        if (fetchedCard.failed) {
          navigate('/404');
        }
        setInfos(fetchedCard.data);
      }
    };
    fetchCard();
  }, [card, id, navigate]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const request = await dispatch(modifyCard(formData));
    if (request.meta.requestStatus === 'fulfilled') navigate('/dashboard');
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
          {/* <input
            id="category"
            name="category"
            value={infos.category}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
          <div className="line" /> */}
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
          <label htmlFor="jobTitle">Intitulé de l&apos;annonce :</label>
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
          <label htmlFor="contractType">Type de contrat : </label>
          <input
            id="contractType"
            name="contractType"
            value={infos.contractType}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
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
          Note :
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              // eslint-disable-next-line react/jsx-key
              <label>
                <input
                  className="star-rating"
                  type="radio"
                  name="rating"
                  value={currentRating}
                  // onChange={handleChange}
                />
                <FaStar
                  className="star-element"
                  size={30}
                  color={
                    currentRating <= (hover || infos.rating) // TODO FIX COLOR
                      ? '#ffc107'
                      : '€e4e5e9'
                  }
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
        <input
          type="button"
          className="button button--delete"
          value="Supprimer la fiche"
          aria-label="Supprimer la fiche"
          onClick={deleteCard}
        />
        <input
          type="button"
          className="button button--cancel"
          value="Annuler"
          aria-label="Annuler"
          onClick={() => navigate('/dashboard')}
        />
      </form>
    </div>
  );
}

export default CardDetails;
