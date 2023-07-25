import userReducer from './user';
import cardsReducer from './cards';
import movingCardReducer from './movingCard';

const reducer = {
  user: userReducer,
  cards: cardsReducer,
  movingCard: movingCardReducer,
};

export default reducer;
