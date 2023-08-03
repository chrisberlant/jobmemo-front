import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { getAllCards } from '../../store/reducers/cards';
import Navbar from '../Navbar/Navbar';
import './RecycleBin.scss';
import CardItem from '../CardItem/CardItem';
import Card from '../Card/Card';

function RecycleBin() {
  const cards = useAppSelector((state) => state.cards.list);
  const dispatch = useAppDispatch();

  // Get the card from the API and dispatch them to the store on first render
  useEffect(() => {
    dispatch(getAllCards());
  }, [dispatch]);

  // TODO
  return (
    <div className="RecycleBin">
      {/* <Navbar /> */}
      <h1>Cartes à la corbeille :</h1>
      <div className="cards-container">
        {cards.map((card) => (
          <Card key={card.id} item={card} />
        ))}
      </div>
    </div>
  );
}

export default RecycleBin;
