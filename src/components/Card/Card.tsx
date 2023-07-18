import { useState } from 'react';
import './Card.scss';

interface CardItem {
  id: number;
  title: string;
  category: string;
  index: number;
  entreprise_name: string;
  contract_type: string;
  description: string;
  offer_url: string;
  location: string;
  salary: string;
  job_title: string;
  notation: number;
  color: string;
  is_deleted: boolean;
  notes: string;
}

function Card() {
  const [card, setCard] = useState([]);

  fetch('http://localhost:3000/userCards/1')
    .then((response) => response.json())
    .then((data) => {
      setCard(data);
    });

  return (
    <div className="Card">
      {card.map((cards: CardItem) => (
        <div key={cards.id}>
          <h3>Hello {cards.title} </h3>
          <p>L&apos;id de cette carte est : {cards.id}</p>
          <p>Nom : {cards.title}</p>
          <p>category : {cards.category}</p>
          <p>index : {cards.index}</p>
          <p>Entreprise : {cards.entreprise_name}</p>
          <p>Contrat : {cards.contract_type}</p>
          <p>Description : {cards.offer_url}</p>
          <p>Lien : {cards.description}</p>
          <p>Lieu : {cards.location}</p>
          <p>Salaire : {cards.salary}</p>
          <p>Nom du poste : {cards.job_title}</p>
          <p>Avis : {cards.notation}</p>
          <p>Coler Tag : {cards.color}</p>
          <p>Supprimé : {cards.is_deleted}</p>
          <p>Notes : {cards.notes}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Card;
