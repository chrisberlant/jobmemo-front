/* eslint-disable no-console */
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import securedFetch from '../../Utils/securedFetch';
import {
  CardItems,
  CardTable,
  CardType,
  MovingCard,
} from '../../@types/jobmemo';

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
  },
  trashedItems: [],
  isLoading: false,
  error: undefined,
  isEmpty: false,
  loadedCards: false,
  movingCardId: '',
};

const storeCardsFromApi = (apiCards: CardType[], storedCards: CardItems) => {
  storedCards.offres.items = apiCards.filter(
    (card: CardType) =>
      card.category === 'Mes offres' && card.isDeleted === false
  );
  storedCards.candidatures.items = apiCards.filter(
    (card: CardType) =>
      card.category === 'Mes candidatures' && card.isDeleted === false
  );
  storedCards.relances.items = apiCards.filter(
    (card: CardType) =>
      card.category === 'Mes relances' && card.isDeleted === false
  );
  storedCards.entretiens.items = apiCards.filter(
    (card: CardType) =>
      card.category === 'Mes entretiens' && card.isDeleted === false
  );
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
  async ({ movingCardId, movingCardindex, movingCardcategory }: MovingCard) => {
    const movingCardInfos = new FormData();
    movingCardInfos.append('id', movingCardId);
    movingCardInfos.append('index', movingCardindex.toString());
    movingCardInfos.append('category', movingCardcategory);
    console.log(
      `Déplacement de la carte ${movingCardId} vers l'index ${movingCardindex} de la catégorie ${movingCardcategory}`
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
      storeCardsFromApi(action.payload.dashboardCards, state.items);
      state.trashedItems = action.payload.trashedCards;
      console.log(action.payload.trashedCards);
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
      storeCardsFromApi(action.payload.updatedCards, state.items);
      state.loadedCards = true;
    })
    .addCase(sendCardToTrash.pending, () => {
      console.log("Suppression d'une carte");
    })
    .addCase(sendCardToTrash.rejected, () => {
      console.log("Erreur lors de la suppression d'une carte");
    })
    .addCase(sendCardToTrash.fulfilled, (state, action) => {
      const { id } = action.payload.data;
      // Iterate on every item of every category to find the card
      const cardToTrash = Object.values(state.items)
        .flatMap((category) => category.items)
        .find((card) => card.id === id);

      if (cardToTrash) {
        cardToTrash.isDeleted = true;
        // Create a copy of the card
        const cardTrashed = {
          ...cardToTrash,
          isDeleted: true,
        };
        // Remove the card from the items
        Object.values(state.items).forEach((category) => {
          category.items = category.items.filter((card) => card.id !== id);
        });
        // Add it to the trashed items
        state.trashedItems.push(cardTrashed);
      }
      console.log('Carte supprimée');
    });
});

export default cardsReducer;
