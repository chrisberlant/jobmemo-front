/* eslint-disable no-console */
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import securedFetch from '../../securedFetch';

import { CardType } from '../../@types/jobmemo';

interface MovingCard {
  id: string;
  index: number;
  category: string;
}
interface CardTable extends MovingCard {
  list: CardType[];
  isLoading: boolean;
  error: string | undefined;
}

const initialValue: CardTable = {
  list: [],
  isLoading: false,
  error: undefined,
  id: '',
  index: 0,
  category: '',
};

export const getAllCards = createAsyncThunk('cards/GET_ALL_CARDS', async () => {
  // TODO Gestion d'erreurs
  const cardsRequest = await securedFetch('/userCards');

  if (cardsRequest.status !== 200) {
    throw new Error(cardsRequest.data);
  }
  return cardsRequest.data;
});

export const setMovingCardId = createAction<string>(
  'movingCard/SET_MOVING_CARD_ID'
);

export const moveCard = createAsyncThunk(
  'cards/MOVE_CARD',
  async ({ id, index, category }: MovingCard) => {
    const movingCardInfos = new FormData();
    movingCardInfos.append('id', id);
    movingCardInfos.append('index', index.toString());
    movingCardInfos.append('category', category);
    console.log(movingCardInfos);
    console.log(
      `Déplacement de la carte ${id} vers l'index ${index} de la catégorie ${category}`
    );
    const cardMoved = await securedFetch('/moveCard', 'PATCH', movingCardInfos);
    return cardMoved;
  }
);

const cardsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(setMovingCardId, (state, action) => {
      state.id = action.payload;
      console.log(`Id de la carte déplacée : ${state.id}`);
    })
    .addCase(getAllCards.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
      console.log('Chargement des cartes en cours');
    })
    .addCase(getAllCards.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      console.log(`Erreur au chargement des cartes: ${state.error}`);
    })
    .addCase(getAllCards.fulfilled, (state, action) => {
      state.list = action.payload;
      console.log('Cartes chargées');
    })
    .addCase(moveCard.pending, (state) => {
      console.log('Carte se déplaçant');
    })
    .addCase(moveCard.rejected, (state, action) => {
      state.error = action.error.message;
    })
    .addCase(moveCard.fulfilled, (state, action) => {
      console.log('Carte déplacée');
      console.log(`Payload : ${action.payload}`);
      const indexMoving = state.list.findIndex(
        (card) => card.id === action.payload.data.id
      );
      state.list[indexMoving].category = action.payload.data.category;
      state.list[indexMoving].index = action.payload.data.index;
      console.log(state.list);
    });
});

export default cardsReducer;
