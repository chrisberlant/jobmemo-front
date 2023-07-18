import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hook/redux';
import './Dashboard.scss';
import Card from '../Card/Card';
import { CardType } from '../../@types/jobmemo';

function Dashboard() {
  const user = useAppSelector((state) => state.user);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/userCards/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
      });
  }, [user.id]);

  const cardsItems = cards.map((card: CardType) => (
    <Card key={card.id} {...card} />
  ));

  return (
    <div className="Dashboard">
      <div>{cardsItems}</div>
    </div>
  );
}

export default Dashboard;
