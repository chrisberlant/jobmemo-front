/* eslint-disable @typescript-eslint/naming-convention */
import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import securedFetch from '../../securedFetch';

import { CardType } from '../../@types/jobmemo';

interface CardTable {
  list: CardType[];
}

const initialValue: CardTable = {
  list: [],
};

export const getAllCards = createAsyncThunk('cards/GET_ALL_CARDS', async () => {
  const data = await securedFetch('/userCards', 'GET', null);
  return data;
  console.log(data);
});

const cardsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(getAllCards.pending, (state) => {})
    .addCase(getAllCards.rejected, (state) => {})
    .addCase(getAllCards.fulfilled, (state, action) => {
      state.list = action.payload;
    });
});

export default cardsReducer;
