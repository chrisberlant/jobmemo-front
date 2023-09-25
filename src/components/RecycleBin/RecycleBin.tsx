import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { getAllCards } from '../../store/reducers/cards';
import TrashedCard from '../TrashedCard/TrashedCard';
import './RecycleBin.scss';

function RecycleBin() {
  const cards = useAppSelector((state) => state.cards.trashedItems);
  const sortedCards = cards.slice().sort((a, b) => b.index - a.index);

  const loadedCards = useAppSelector((state) => state.cards.loadedCards);
  const dispatch = useAppDispatch();

  // Get the card from the API and dispatch them to the store on first render
  useEffect(() => {
    if (!loadedCards) {
      dispatch(getAllCards());
    }
  }, [dispatch, loadedCards]);

  // TODO
  return (
    <div className="recycle-bin">
      <div className="recycle-bin-header">
        <h1>Cartes à la corbeille :</h1>
        <button type="button" className="restore-button">
          Tout restaurer
        </button>
      </div>
      <div className="trashed-cards-container">
        {sortedCards.map((card) => (
          <TrashedCard
            key={card.id}
            id={card.id}
            title={card.title}
            enterpriseName={card.enterpriseName}
            createdAt={card.createdAt}
            color={card.color}
            rating={card.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default RecycleBin;
