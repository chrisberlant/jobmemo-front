/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { CardType } from '../../@types/jobmemo';

interface CardTable {
  list: CardType[];
}
const initialValue: CardTable = {
  list: [],
};
export const getAllCards = createAction<CardType[]>('cards/GET_ALL_CARDS');

const cardsReducer = createReducer(initialValue, (builder) => {
  builder.addCase(getAllCards, (state, action) => {
    state.list = action.payload;
  });
});

export default cardsReducer;
