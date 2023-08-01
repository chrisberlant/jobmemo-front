import { useNavigate, useParams } from 'react-router-dom';
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
    <div className="box-wrap">
      <div className="box-carditem">
        {/* <img src={cardItems?.logoUrl} alt="Enterprise Logo" /> */}
        <div className="item-wrap">
          <span className="item">index : {cardItems?.index}</span>
        </div>
        <div className="item-wrap">
          <span className="item">Categorie : {cardItems?.category}</span>
        </div>
        <div className="item-wrap">
          <span className="item">Titre : {cardItems?.title}</span>
        </div>
        <div className="item-wrap">
          <span className="item">Entreprise : {cardItems?.enterpriseName}</span>
        </div>
        {/* <span className="item">Site Web de l'entreprise : {cardItems?.enterpriseUrl}</span> */}
        <div className="item-wrap">
          <span className="item">Adresse : {cardItems?.location}</span>
        </div>
        <div className="item-wrap">
          <span className="item">
            Intitulé de l&apos;annonce : {cardItems?.jobTitle}
          </span>
        </div>
        <div className="item-wrap">
          <span className="item">
            Lien de l&apos;annonce : {cardItems?.offerUrl}
          </span>
        </div>
        <div className="item-wrap">
          <span className="item">
            Type de contrat : {cardItems?.contractType}
          </span>
        </div>
        <div className="item-wrap">
          <span className="item">
            Descriptif du poste : {cardItems?.description}
          </span>
        </div>
        <div className="item-wrap">
          <p className="item">Salaire : : {cardItems?.salary}</p>
        </div>
        <button type="button" onClick={back}>
          Retour
        </button>
      </div>
    </div>
  );
}

export default CardItem;
