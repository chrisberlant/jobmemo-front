import './Card.scss';
import { CardType } from '../../@types/jobmemo';

function Card({
  title,
  enterpriseName,
  notation,
  color,
  createdAt,
  index,
}: CardType) {
  return (
    <div className="Card">
      <h3>Nom : {title}</h3>
      <p>Entreprise : {enterpriseName}</p>
      <p>Etoile : {notation}</p>
      <p>Couleur : {color}</p>
      <p>Date : {createdAt} </p>
      <p>index : {index}</p>
      <input type="checkbox" />
    </div>
  );
}

export default Card;
