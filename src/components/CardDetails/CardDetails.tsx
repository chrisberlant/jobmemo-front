import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import securedFetch from '../../Utils/securedFetch';
import { modifyCard } from '../../store/reducers/cards';
import './CardDetails.scss';

function CardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const card = useAppSelector((state) =>
    Object.values(state.cards.items)
      .flatMap((category) => category.items)
      .find((searchedCard) => searchedCard.id === id)
  );

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

  useEffect(() => {
    const fetchCard = async () => {
      if (card) {
        setInfos(card);
      } else {
        const fetchedCard = await securedFetch(`/card/${id}`);
        if (fetchedCard.status !== 200) {
          navigate('/404');
        }
        setInfos(fetchedCard.data);
      }
    };
    fetchCard();
  }, [card, id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    await dispatch(modifyCard(formData));
    navigate('/dashboard');
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
          <input
            id="category"
            name="category"
            value={infos.category}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
          <div className="line" />
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
          <label htmlFor="description">Descriptif du poste :</label>
          <input
            id="description"
            name="description"
            value={infos.description}
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
        <input type="hidden" name="id" value={id} />
        <input
          type="submit"
          className="button button--submit"
          value="Modifier la fiche"
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
