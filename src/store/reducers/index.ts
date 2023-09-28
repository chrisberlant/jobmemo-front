import appReducer from './app';
import userReducer from './user';
import cardsReducer from './cards';
import contactsReducer from './contacts';
import documentsReducer from './documents';

const reducer = {
  app: appReducer,
  user: userReducer,
  cards: cardsReducer,
  contacts: contactsReducer,
  documents: documentsReducer,
};

export default reducer;
