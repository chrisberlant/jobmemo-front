import appReducer from './app';
import userReducer from './user';
import cardsReducer from './cards';
import contactsReducer from './contacts';

const reducer = {
  app: appReducer,
  user: userReducer,
  cards: cardsReducer,
  contacts: contactsReducer,
};

export default reducer;
