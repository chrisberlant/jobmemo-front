/* eslint-disable no-console */
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import securedFetch from '../../Utils/securedFetch';
import { CardTable, CardType, MovingCard } from '../../@types/jobmemo';

const initialValue: CardTable = {
  items: {
    offres: {
      id: 0,
      name: 'Mes offres',
      color: '#eee',
      items: [],
      className: 'offres',
    },
    candidatures: {
      id: 1,
      name: 'Mes candidatures',
      color: '#eee',
      items: [],
      className: 'candidatures',
    },
    relances: {
      id: 2,
      name: 'Mes relances',
      color: '#eee',
      items: [],
      className: 'relances',
    },
    entretiens: {
      id: 3,
      name: 'Mes entretiens',
      color: '#eee',
      items: [],
      className: 'entretiens',
    },
    corbeille: {
      id: 4,
      name: 'Corbeille',
      color: '#eee',
      items: [],
      className: 'recycle-bin',
    },
  },
  isLoading: false,
  error: undefined,
  isEmpty: false,
  loadedCards: false,
  movingCardId: '',
};

export const getAllCards = createAsyncThunk<CardType[]>(
  'cards/GET_ALL_CARDS',
  async () => {
    const cardsRequest = await securedFetch('/userCards');

    if (cardsRequest.status !== 200) {
      throw new Error(cardsRequest.data);
    }
    return cardsRequest.data;
  }
);

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
  async ({ movingCardId, movingCardindex, movingCardcategory }: MovingCard) => {
    const movingCardInfos = new FormData();
    movingCardInfos.append('id', movingCardId);
    movingCardInfos.append('index', movingCardindex.toString());
    movingCardInfos.append('category', movingCardcategory);
    console.log(
      `Déplacement de la carte ${movingCardId} vers l'index ${movingCardindex} de la catégorie ${movingCardcategory}`
    );
    const cardMoved = await securedFetch('/moveCard', 'PATCH', movingCardInfos);
    return cardMoved;
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
    return cardIsTrashed;
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
      const offresCards = action.payload.filter(
        (card) => card.category === 'Mes offres'
      );
      const candidaturesCards = action.payload.filter(
        (card) => card.category === 'Mes candidatures'
      );
      const relancesCards = action.payload.filter(
        (card) => card.category === 'Mes relances'
      );
      const entretiensCards = action.payload.filter(
        (card) => card.category === 'Mes entretiens'
      );
      state.items.offres.items = offresCards;
      state.items.candidatures.items = candidaturesCards;
      state.items.relances.items = relancesCards;
      state.items.entretiens.items = entretiensCards;
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
      const updatedInfos = action.payload;
      const cardToUpdate = Object.values(state.items)
        .flatMap((category) => category.items)
        .find((card) => card.id === action.payload.id);

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
      const { id } = action.payload.data;
      const movingCard = Object.values(state.items)
        .flatMap((category) => category.items)
        .find((card) => card.id === id);

      if (movingCard) {
        movingCard.category = action.payload.data.category;
        movingCard.index = action.payload.data.index;
        console.log(`Carte déplacée ${movingCard.id}`);
      }
    })
    .addCase(sendCardToTrash.pending, () => {
      console.log("Suppression d'une carte");
    })
    .addCase(sendCardToTrash.rejected, () => {
      console.log("Erreur lors de la suppression d'une carte");
    })
    .addCase(sendCardToTrash.fulfilled, (state, action) => {
      const { id } = action.payload.data;
      const cardToUpdate = Object.values(state.items)
        .flatMap((category) => category.items)
        .find((card) => card.id === id);
      if (cardToUpdate) cardToUpdate.isDeleted = true;
      console.log('Carte supprimée');
    });
});

export default cardsReducer;
