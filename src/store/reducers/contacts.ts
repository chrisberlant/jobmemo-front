/* eslint-disable no-console */
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import { ContactType, Contacts } from '../../@types/jobmemo';

import securedFetch from '../../Utils/securedFetch';

const initialValue: Contacts = {
  items: [],
  isLoading: false,
  isEmpty: false,
  error: false,
};

export const getAllContacts = createAsyncThunk(
  'contacts/GET_ALL_CONTACTS',
  async () => {
    const contactsRequest = await securedFetch('/allContacts');
    if (contactsRequest.status !== 200) {
      throw new Error(contactsRequest.data);
    }
    return contactsRequest.data;
  }
);

export const createNewContact = createAsyncThunk(
  'contacts/CREATE_NEW_CONTACT',
  async (contact: FormData) => {
    console.log(contact);
    const creationRequest = await securedFetch(
      '/createNewContact',
      'POST',
      contact
    );
    if (creationRequest.status !== 201) {
      throw new Error(creationRequest.data);
    }
    return creationRequest.data;
  }
);

export const loadCardsToDashboard = createAction('cards/LOAD_CARDS');

const contactsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(getAllContacts.pending, (state, action) => {
      state.isLoading = true;
      console.log('Récupération des contacts');
    })
    .addCase(getAllContacts.rejected, (state, action) => {
      console.log('Impossible de récupérer les contacts');
      state.isLoading = false;
      state.error = true;
    })
    .addCase(getAllContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.length === 0) state.isEmpty = true;
      else state.items = action.payload;
      console.log('Contacts récupérés');
    })
    .addCase(createNewContact.rejected, (state, action) => {
      console.log('Requête de création de contact refusée');
    })
    .addCase(createNewContact.fulfilled, (state, action) => {
      state.isEmpty = false;
      console.log('Contact créé');
    });
});

export default contactsReducer;
