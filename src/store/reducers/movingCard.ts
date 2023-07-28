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

export const setDestination = createAction<Destination>(
  'movingCard/SET_DESTINATION'
);

const movingCardReducer = createReducer(initialValue, (builder) => {
  builder.addCase(setDestination, (state, action) => {
    state.destinationColumnId = action.payload.destinationColumnId;
    state.destinationCardIndex = action.payload.destinationCardIndex;
    console.log(
      `Store: nouvelle colonne: ${state.destinationColumnId}, nouvel index: ${state.destinationCardIndex}`
    );
  });
});

export default movingCardReducer;
