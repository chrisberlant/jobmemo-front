import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { baseUrl } from '../../securedFetch';

interface Destination {
  destinationColumnId: number;
  destinationCardIndex: number;
}

interface MovingCard extends Destination {
  cardId: string;
}

const initialValue: MovingCard = {
  cardId: 'default',
  destinationColumnId: 0,
  destinationCardIndex: 0,
};

export const setMovingCardId = createAction<string>(
  'movingCard/SET_MOVING_CARD_ID'
);

export const setDestination = createAction<Destination>(
  'movingCard/SET_DESTINATION'
);

const movingCardReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(setMovingCardId, (state, action) => {
      state.cardId = action.payload;
      console.log(`Valeur dans le store : ${state.cardId}`);
    })
    .addCase(setDestination, (state, action) => {
      state.destinationColumnId = action.payload.destinationColumnId;
      state.destinationCardIndex = action.payload.destinationCardIndex;
      console.log(
        `Store: nouvelle colonne: ${state.destinationColumnId}, nouvel index: ${state.destinationCardIndex}`
      );
    });
});

export default movingCardReducer;
