/* eslint-disable no-console */
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import securedFetch from '../../securedFetch';

import { CardType } from '../../@types/jobmemo';

interface MovingCard {
  movingCardId: string;
  movingCardindex: number;
  movingCardcategory: string;
}
interface CardTable {
  list: CardType[];
  isLoading: boolean;
  error: string | undefined;
  loadedCards: boolean;
  movingCardId: string;
}

const initialValue: CardTable = {
  list: [],
  isLoading: false,
  error: undefined,
  loadedCards: false,
  movingCardId: '',
};

export const getAllCards = createAsyncThunk('cards/GET_ALL_CARDS', async () => {
  const cardsRequest = await securedFetch('/userCards');

  if (cardsRequest.status !== 200) {
    throw new Error(cardsRequest.data);
  }
  return cardsRequest.data;
});

export const setMovingCardId = createAction<string>('cards/SET_MOVING_CARD_ID');

export const moveCard = createAsyncThunk(
  'cards/MOVE_CARD',
  async ({ movingCardId, movingCardindex, movingCardcategory }: MovingCard) => {
    const movingCardInfos = new FormData();
    movingCardInfos.append('id', movingCardId);
    movingCardInfos.append('index', movingCardindex.toString());
    movingCardInfos.append('category', movingCardcategory);
    console.log(movingCardInfos);
    console.log(
      `Déplacement de la carte ${movingCardId} vers l'index ${movingCardindex} de la catégorie ${movingCardcategory}`
    );
    const cardMoved = await securedFetch('/moveCard', 'PATCH', movingCardInfos);
    return cardMoved;
  }
);

export const loadCardsToDashboard = createAction('cards/LOAD_CARDS');

const cardsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(loadCardsToDashboard, (state) => {
      state.loadedCards = true;
      console.log('Cartes envoyées au dashboard');
    })
    .addCase(setMovingCardId, (state, action) => {
      state.movingCardId = action.payload;
      console.log(`Id de la carte déplacée : ${state.movingCardId}`);
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
      state.loadedCards = false;
      console.log('Cartes chargées dans le store');
    })
    .addCase(moveCard.pending, () => {
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
