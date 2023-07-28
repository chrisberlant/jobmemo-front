import { Link, useNavigate, useParams } from 'react-router-dom';
import { CardType } from '../../@types/jobmemo';
import { useAppSelector } from '../../store/hook/redux';
import './CardItem.scss';

function CardItem() {
  const findCards = (items: CardType[], searchId: string) => {
    const item = items.find((goodItem) => {
      return goodItem.id === searchId;
    });
    return item;
  };

  const { id } = useParams();

  const cardItems = useAppSelector((state) =>
    findCards(state.cards.list, id as string)
  );

  const navigate = useNavigate();

  const back = () => {
    navigate('/dashboard');
    window.location.reload();
  };

  return (
    <div className="box-carditem">
      <ul className="card-items">
        <img src={cardItems?.logoUrl} alt="Enterprise Logo" />
        <li className="item">Categorie : {cardItems?.category}</li>
        <li className="item">Titre : {cardItems?.title}</li>
        <li className="item">Entreprise : {cardItems?.enterpriseName}</li>
        {/* <li className="item">Site Web de l'entreprise : {cardItems?.enterpriseUrl}</li> */}
        <li className="item">Adresse : {cardItems?.location}</li>
        <li className="item">
          Intitulé de l&apos;annonce : {cardItems?.jobTitle}
        </li>
        <li className="item">Lien de l&apos;annonce : {cardItems?.offerUrl}</li>
        <li className="item">Type de contrat : {cardItems?.contractType}</li>
        <li className="item">Descriptif du poste : {cardItems?.description}</li>
        <li className="item">Salaire : : {cardItems?.salary}</li>
      </ul>
      <button type="button" onClick={back}>
        Retour
      </button>
    </div>
  );
}

export default CardItem;
