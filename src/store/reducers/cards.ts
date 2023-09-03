/* eslint-disable no-console */
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import securedFetch from '../../Utils/securedFetch';

import { CardType } from '../../@types/jobmemo';

interface MovingCard {
  movingCardId: string;
  movingCardindex: number;
  movingCardcategory: string;
}

interface CardTable {
  items: CardType[];
  isLoading: boolean;
  error: string | undefined;
  loadedCards: boolean;
  movingCardId: string;
}

const initialValue: CardTable = {
  items: [],
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

export const trashOrRestoreCard = createAsyncThunk(
  'cards/TRASH_OR_RESTORE_CARD',
  async (id: string) => {
    const cardForm = new FormData();
    cardForm.append('id', id);
    const cardIsTrashedOrRestored = await securedFetch(
      '/trashOrRestoreCard',
      'PATCH',
      cardForm
    );
    console.log(`Carte ${id} placée dans la corbeille`);
    return cardIsTrashedOrRestored;
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
      state.items = action.payload;
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
      const indexMoving = state.items.findIndex(
        (card) => card.id === action.payload.data.id
      );
      state.items[indexMoving].category = action.payload.data.category;
      state.items[indexMoving].index = action.payload.data.index;
      console.log(state.items);
    })
    .addCase(trashOrRestoreCard.pending, () => {
      console.log("Suppression/restauration d'une carte");
    })
    .addCase(trashOrRestoreCard.rejected, () => {
      console.log("Erreur lors de la suppression/restauration d'une carte");
    })
    .addCase(trashOrRestoreCard.fulfilled, (state, action) => {
      console.log('Carte supprimée/restaurée');
    });
});

export default cardsReducer;
