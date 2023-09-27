/* eslint-disable no-console */
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import securedFetch from '../../Utils/securedFetch';
import { CardTable, CardType } from '../../@types/jobmemo';

const initialValue: CardTable = {
  items: [],
  trashedItems: [],
  isLoading: false,
  error: undefined,
  isEmpty: false,
  loadedCards: false,
};

export const getAllCards = createAsyncThunk<CardType[]>(
  'cards/GET_ALL_CARDS',
  async () => {
    const cardsRequest = await securedFetch('/userCards');
    if (cardsRequest.failed) {
      throw new Error(cardsRequest.data);
    }
    return cardsRequest.data;
  }
);

export const createNewCard = createAsyncThunk(
  'cards/CREATE_NEW_CARD',
  async (infos: FormData) => {
    const creationRequest = await securedFetch('/createNewCard', 'POST', infos);
    if (creationRequest.failed) {
      throw new Error(creationRequest.data);
    }
    return creationRequest.data;
  }
);

export const modifyCard = createAsyncThunk(
  'cards/MODIFY_CARD',
  async (infos: FormData) => {
    const modificationRequest = await securedFetch(
      '/modifyCard',
      'PATCH',
      infos
    );
    if (modificationRequest.failed) {
      throw new Error(modificationRequest.data);
    }
    return modificationRequest.data;
  }
);

export const moveCard = createAsyncThunk(
  'cards/MOVE_CARD',
  async (infos: FormData) => {
    const cardMoveRequest = await securedFetch('/moveCard', 'PATCH', infos);
    if (cardMoveRequest.failed) {
      throw new Error(cardMoveRequest.data);
    }
    return cardMoveRequest.data;
  }
);

export const sendCardToTrash = createAsyncThunk(
  'cards/SEND_CARD_TO_TRASH',
  async (id: string) => {
    const cardToTrash = new FormData();
    cardToTrash.append('id', id);
    const sendToTrashRequest = await securedFetch(
      '/sendCardToTrash',
      'PATCH',
      cardToTrash
    );
    if (sendToTrashRequest.failed) {
      throw new Error(sendToTrashRequest.data);
    }
    return sendToTrashRequest.data;
  }
);

export const restoreCard = createAsyncThunk(
  'cards/RESTORE_CARD',
  async (id: string) => {
    const cardToRestore = new FormData();
    cardToRestore.append('id', id);
    const restorationRequest = await securedFetch(
      '/restoreCard',
      'PATCH',
      cardToRestore
    );
    if (restorationRequest.failed) {
      throw new Error(restorationRequest.data);
    }
    return restorationRequest.data;
  }
);

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
      state.items = action.payload.filter((card) => card.isDeleted === false);
      state.trashedItems = action.payload.filter(
        (card) => card.isDeleted === true
      );
      state.loadedCards = true;
      console.log('Cartes chargées dans le store');
    })
    .addCase(createNewCard.pending, (state, action) => {
      console.log('Création de la fiche en cours');
    })
    .addCase(createNewCard.rejected, (state, action) => {
      console.log('Requête de création de fiche refusée');
    })
    .addCase(createNewCard.fulfilled, (state, action) => {
      state.isEmpty = false;
      state.items.push(action.payload);
      console.log('Fiche créée');
    })
    .addCase(modifyCard.pending, (state, action) => {
      console.log('Modification de la fiche en cours');
    })
    .addCase(modifyCard.rejected, (state, action) => {
      console.log('Requête de modification de contact refusée');
      state.error = action.error.message;
    })
    .addCase(modifyCard.fulfilled, (state, action) => {
      const { id } = action.payload;
      const updatedInfos = action.payload;
      const cardToUpdate = state.items.find((card) => card.id === id);
      if (cardToUpdate) {
        Object.assign(cardToUpdate, updatedInfos);
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
              otherCard.index > oldIndex &&
              otherCard.id !== id
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
          if (
            otherCard.category === category &&
            otherCard.index >= index &&
            otherCard.id !== id
          ) {
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
      }
      console.log('Carte restaurée');
    })
    .addCase(restoreCard.pending, () => {
      console.log("Restauration d'une carte");
    })
    .addCase(restoreCard.rejected, () => {
      console.log("Erreur lors de la restauration d'une carte");
    })
    .addCase(restoreCard.fulfilled, (state, action) => {
      const { id } = action.payload;
      const cardToRestore = state.trashedItems.find((card) => card.id === id);
      if (cardToRestore) {
        cardToRestore.isDeleted = false;
        state.items.push(cardToRestore);
        const indexToRestore = state.trashedItems.indexOf(cardToRestore);
        state.items.splice(indexToRestore, 1);
      }
      console.log('Carte restaurée');
    });
});

export default cardsReducer;
