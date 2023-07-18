import './Card.scss';
import { CardType } from '../../@types/jobmemo';

function Card({
  title,
  enterprise_name,
  notation,
  color,
  created_at,
  index,
}: CardType) {
  return (
    <div className="Card">
      <h3>Nom : {title}</h3>
      <p>Entreprise : {enterprise_name}</p>
      <p>Etoile : {notation}</p>
      <p>Couleur : {color}</p>
      <p>Date : {created_at} </p>
      <p>index : {index}</p>
      <input type="checkbox" />
    </div>
  );
}

export default Card;
