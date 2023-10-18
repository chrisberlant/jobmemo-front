import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import securedFetch from '../../Utils/securedFetch';
import { CardTable, CardType } from '../../@types/jobmemo';
import { setError, setLoading, setMessage } from './app';

const initialValue: CardTable = {
  items: [],
  trashedItems: [],
  isEmpty: false,
  loadedCards: false,
};

export const getAllCards = createAsyncThunk<CardType[]>(
  'cards/GET_ALL_CARDS',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const cardsRequest = await securedFetch('/allCards');
    if (cardsRequest.failed) {
      dispatch(setError('Impossible de récupérer les fiches'));
      throw new Error(cardsRequest.data);
    }
    dispatch(setLoading(false));
    return cardsRequest.data;
  }
);

export const createNewCard = createAsyncThunk(
  'cards/CREATE_NEW_CARD',
  async (infos: Record<string, string>, { dispatch }) => {
    const creationRequest = await securedFetch('/createNewCard', 'POST', infos);
    if (creationRequest.failed) {
      dispatch(setError(creationRequest.data));
      throw new Error(creationRequest.data);
    }
    return creationRequest.data;
  }
);

export const modifyCard = createAsyncThunk(
  'cards/MODIFY_CARD',
  async (infos: Record<string, string>, { dispatch }) => {
    const modificationRequest = await securedFetch(
      '/modifyCard',
      'PATCH',
      infos
    );
    if (modificationRequest.failed) {
      dispatch(setError(modificationRequest.data));
      throw new Error(modificationRequest.data);
    }
    return modificationRequest.data;
  }
);

export const moveCard = createAsyncThunk(
  'cards/MOVE_CARD',
  async (infos: Record<string, string>, { dispatch }) => {
    dispatch(setLoading(true));
    const cardMoveRequest = await securedFetch('/moveCard', 'PATCH', infos);
    if (cardMoveRequest.failed) {
      dispatch(setError('Impossible de déplacer la fiche'));
      throw new Error(cardMoveRequest.data);
    }
    dispatch(setMessage('Fiche déplacée avec succès'));
    return cardMoveRequest.data;
  }
);

export const sendCardToTrash = createAsyncThunk(
  'cards/SEND_CARD_TO_TRASH',
  async (id: string, { dispatch }) => {
    dispatch(setLoading(true));
    const sendToTrashRequest = await securedFetch('/sendCardToTrash', 'PATCH', {
      id,
    });
    if (sendToTrashRequest.failed) {
      dispatch(setError("Impossible d'envoyer la fiche à la corbeille"));
      throw new Error(sendToTrashRequest.data);
    }
    dispatch(setMessage('Fiche envoyée à la corbeille'));
    return sendToTrashRequest.data;
  }
);

export const restoreCard = createAsyncThunk(
  'cards/RESTORE_CARD',
  async (id: string, { dispatch }) => {
    dispatch(setLoading(true));
    const restorationRequest = await securedFetch('/restoreCard', 'PATCH', {
      id,
    });
    if (restorationRequest.failed) {
      dispatch(setError('Impossible de restaurer la fiche'));
      throw new Error(restorationRequest.data);
    }
    dispatch(setMessage('Fiche restaurée avec succès'));
    return restorationRequest.data;
  }
);

export const deleteCard = createAsyncThunk(
  'cards/DELETE_CARD',
  async (id: string, { dispatch }) => {
    dispatch(setLoading(true));
    const deleteRequest = await securedFetch('/deleteCard', 'DELETE', {
      id,
    });
    if (deleteRequest.failed) {
      dispatch(setError('Impossible de supprimer la fiche'));
      throw new Error(deleteRequest.data);
    }
    return id;
  }
);

const cardsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(getAllCards.fulfilled, (state, action) => {
      state.items = action.payload.filter((card) => card.isDeleted === false);
      state.trashedItems = action.payload.filter(
        (card) => card.isDeleted === true
      );
      state.loadedCards = true;
    })
    .addCase(createNewCard.fulfilled, (state, action) => {
      state.isEmpty = false;
      state.items.push(action.payload);
    })
    .addCase(modifyCard.fulfilled, (state, action) => {
      const { id } = action.payload;
      const updatedInfos = action.payload;
      const cardToUpdate = state.items.find((card) => card.id === id);
      if (cardToUpdate) {
        Object.assign(cardToUpdate, updatedInfos);
      }
    })
    .addCase(moveCard.fulfilled, (state, action) => {
      const { id, category: newCategory, index: newIndex } = action.payload;
      const cardToMove = state.items.find(
        (searchedCard) => searchedCard.id === id
      );

      if (cardToMove) {
        const { index: oldIndex, category: oldCategory } = cardToMove;
        cardToMove.index = newIndex;

        if (newCategory !== oldCategory) {
          // If the card changed category
          cardToMove.category = newCategory;
          state.items = state.items.map((otherCard) => {
            if (
              otherCard.category === oldCategory &&
              otherCard.index > oldIndex &&
              otherCard.id !== id
            ) {
              return {
                ...otherCard,
                index: otherCard.index - 1, // Update the state to decrement index of the cards in the old category
              };
            }
            if (
              otherCard.category === newCategory &&
              otherCard.index >= newIndex &&
              otherCard.id !== id
            ) {
              return {
                ...otherCard,
                index: otherCard.index + 1, // Update the state to increment index of the cards in the new category
              };
            }
            return otherCard;
          });
        } else if (newCategory === oldCategory) {
          // If the card moved in the same category
          if (newIndex > oldIndex) {
            state.items = state.items.map((otherCard) => {
              if (
                otherCard.category === newCategory &&
                otherCard.index <= newIndex &&
                otherCard.index > oldIndex &&
                otherCard.id !== id
              ) {
                return {
                  ...otherCard,
                  index: otherCard.index - 1, // Update the state to decrement index of the cards in the category
                };
              }
              return otherCard;
            });
          } else {
            state.items = state.items.map((otherCard) => {
              if (
                otherCard.category === newCategory &&
                otherCard.index >= newIndex &&
                otherCard.index < oldIndex &&
                otherCard.id !== id
              ) {
                return {
                  ...otherCard,
                  index: otherCard.index + 1, // Update the state to increment index of the cards in the category
                };
              }
              return otherCard;
            });
          }
        }
      }
      state.loadedCards = true;
    })
    .addCase(sendCardToTrash.fulfilled, (state, action) => {
      const { id, index: newIndex } = action.payload;
      const cardToSendToTrash = state.items.find((card) => card.id === id);

      if (cardToSendToTrash) {
        const { category, index: oldIndex } = cardToSendToTrash;
        cardToSendToTrash.isDeleted = true;
        cardToSendToTrash.index = newIndex;
        state.items = state.items.filter((card) => card !== cardToSendToTrash);
        state.trashedItems.push(cardToSendToTrash);

        state.items = state.items.map((card) => {
          if (card.category === category && card.index > oldIndex) {
            return { ...card, index: card.index - 1 };
          }
          return card;
        });
      }
    })
    .addCase(restoreCard.fulfilled, (state, action) => {
      const { id, index: newIndex } = action.payload;
      const cardToRestore = state.trashedItems.find((card) => card.id === id);

      if (cardToRestore) {
        const { index: oldIndex } = cardToRestore;

        state.trashedItems = state.trashedItems.filter(
          (card) => card !== cardToRestore
        );
        cardToRestore.index = newIndex;
        state.items.push(cardToRestore);

        state.trashedItems = state.trashedItems.map((card) => {
          if (card.index > oldIndex) {
            return { ...card, index: card.index - 1 };
          }
          return card;
        });
      }
    })
    .addCase(deleteCard.fulfilled, (state, action) => {
      const id = action.payload;
      const cardToDelete = state.trashedItems.find((card) => card.id === id);
      state.trashedItems = state.trashedItems.filter(
        (card) => card !== cardToDelete
      );
    });
});

export default cardsReducer;
