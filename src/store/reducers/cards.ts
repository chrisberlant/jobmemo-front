import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

import securedFetch from '../../securedFetch';

import { CardType } from '../../@types/jobmemo';

interface CardTable {
  list: CardType[];
  isLoading: boolean;
  error: string | undefined;
}

const initialValue: CardTable = {
  list: [],
  isLoading: false,
  error: undefined,
};

export const getAllCards = createAsyncThunk('cards/GET_ALL_CARDS', async () => {
  // TODO Gestion d'erreurs
  const cardsRequest = await securedFetch('/userCards');

  if (cardsRequest.status !== 200) {
    throw new Error(cardsRequest.data);
  }
  return cardsRequest.data;
});

const cardsReducer = createReducer(initialValue, (builder) => {
  builder
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
    });
});

export default cardsReducer;
