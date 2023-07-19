import userReducer from './user';
import cardsReducer from './cards';

const reducer = {
  user: userReducer,
  cards: cardsReducer,
};

export default reducer;
