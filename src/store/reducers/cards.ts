import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

import securedFetch from '../../securedFetch';

import { CardType } from '../../@types/jobmemo';

interface CardTable {
  list: CardType[];
  isLoading: boolean;
  error: string | null;
}

const initialValue: CardTable = {
  list: [],
  isLoading: false,
  error: null,
};

export const getAllCards = createAsyncThunk('cards/GET_ALL_CARDS', async () => {
  // TODO Gestion d'erreurs
  const data = await securedFetch('/userCards');
  return data;
});

const cardsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(getAllCards.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      console.log('Chargement des cartes en cours');
    })
    .addCase(getAllCards.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Erreur au chargement des cartes';
      console.log(state.error);
    })
    .addCase(getAllCards.fulfilled, (state, action) => {
      state.list = action.payload;
      console.log('Cartes chargées');
    });
});

export default cardsReducer;
