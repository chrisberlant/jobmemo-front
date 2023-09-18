/* eslint-disable no-console */
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import securedFetch from '../../Utils/securedFetch';
import { CardTable, MovingCard } from '../../@types/jobmemo';

const initialValue: CardTable = {
  items: [],
  trashedItems: [],
  isLoading: false,
  error: undefined,
  isEmpty: false,
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

export const modifyCard = createAsyncThunk(
  'contacts/MODIFY_CARD',
  async (infos: FormData) => {
    const modificationRequest = await securedFetch(
      '/modifyCard',
      'PATCH',
      infos
    );
    if (modificationRequest.status !== 200) {
      throw new Error(modificationRequest.data);
    }
    return modificationRequest.data;
  }
);

export const setMovingCardId = createAction<string>('cards/SET_MOVING_CARD_ID');

export const moveCard = createAsyncThunk(
  'cards/MOVE_CARD',
  async ({ movingCardId, movingCardIndex, movingCardCategory }: MovingCard) => {
    const movingCardInfos = new FormData();
    movingCardInfos.append('id', movingCardId);
    movingCardInfos.append('newIndex', movingCardIndex.toString());
    movingCardInfos.append('newCategory', movingCardCategory);
    console.log(
      `Déplacement de la carte ${movingCardId} vers l'index ${movingCardIndex} de la catégorie ${movingCardCategory}`
    );
    const cardMoved = await securedFetch('/moveCard', 'PATCH', movingCardInfos);
    return cardMoved.data;
  }
);

export const sendCardToTrash = createAsyncThunk(
  'cards/SEND_CARD_TO_TRASH',
  async (id: string) => {
    const cardForm = new FormData();
    cardForm.append('id', id);
    const cardIsTrashed = await securedFetch(
      '/sendCardToTrash',
      'PATCH',
      cardForm
    );
    console.log(`Carte ${id} placée dans la corbeille`);
    return cardIsTrashed.data;
  }
);

const cardsReducer = createReducer(initialValue, (builder) => {
  builder
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
      state.items = action.payload.dashboardCards;
      state.trashedItems = action.payload.trashedCards;
      state.loadedCards = true;
      console.log('Cartes chargées dans le store');
    })
    .addCase(modifyCard.pending, (state, action) => {
      console.log('Modification du contact en cours');
    })
    .addCase(modifyCard.rejected, (state, action) => {
      console.log('Requête de modification de contact refusée');
      state.error = action.error.message;
    })
    .addCase(modifyCard.fulfilled, (state, action) => {
      const { id } = action.payload;
      const updatedInfos = action.payload;
      let cardToUpdate = state.items.find((card) => card.id === id);

      if (cardToUpdate) {
        cardToUpdate = updatedInfos;
        console.log('Fiche modifiée');
      }
    })
    .addCase(moveCard.pending, () => {
      console.log('Carte se déplaçant');
    })
    .addCase(moveCard.rejected, (state, action) => {
      state.error = action.error.message;
    })
    .addCase(moveCard.fulfilled, (state, action) => {
      const { card, oldCategory, oldIndex } = action.payload;
      const { id, category, index } = card;
      const cardMoved = state.items.find(
        (searchedCard) => searchedCard.id === id
      );

      if (cardMoved) {
        // Update the state to decrement other cards' index from the old category
        cardMoved.index = index;
        cardMoved.category = category;
        // If the card changed category
        if (oldCategory !== category) {
          state.items = state.items.map((otherCard) => {
            if (
              otherCard.category === oldCategory &&
              otherCard.index > oldIndex
            ) {
              return {
                ...otherCard,
                index: otherCard.index - 1,
              };
            }
            return otherCard;
          });
        }
        // Update the state to increment other cards' index from the new category
        state.items = state.items.map((otherCard) => {
          if (otherCard.category === category && otherCard.index >= index) {
            return {
              ...otherCard,
              index: otherCard.index + 1,
            };
          }
          return otherCard;
        });
      }

      state.loadedCards = true;
    })
    .addCase(sendCardToTrash.pending, () => {
      console.log("Suppression d'une carte");
    })
    .addCase(sendCardToTrash.rejected, () => {
      console.log("Erreur lors de la suppression d'une carte");
    })
    .addCase(sendCardToTrash.fulfilled, (state, action) => {
      const { id } = action.payload;
      const cardToTrash = state.items.find((card) => card.id === id);
      if (cardToTrash) {
        cardToTrash.isDeleted = true;
        state.trashedItems.push(cardToTrash);
        const indexToTrash = state.items.indexOf(cardToTrash);
        state.items.splice(indexToTrash, 1);
        console.log(state.items);
      }
      console.log('Carte envoyée à la corbeille');
    });
});

export default cardsReducer;
