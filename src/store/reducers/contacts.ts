/* eslint-disable no-console */
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import securedFetch from '../../securedFetch';

interface ContactType {
  id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  enterprise: string;
  comments: string;
  color: string;
}

interface Contacts {
  list: ContactType[];
  isLoading: boolean;
  isEmpty: boolean;
}

const initialValue: Contacts = {
  list: [],
  isLoading: true,
  isEmpty: true,
};

export const getAllContacts = createAsyncThunk(
  'contacts/GET_ALL_CONTACTS',
  async () => {
    const contactsRequest = await securedFetch('/userContacts');

    if (contactsRequest.status !== 200) {
      throw new Error(contactsRequest.data);
    }
    return contactsRequest.data;
  }
);

export const createNewContact = createAsyncThunk(
  'contacts/CREATE_NEW_CONTACT',
  async (formData: FormData) => {
    const creationRequest = await securedFetch(
      '/createNewContact',
      'POST',
      formData
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
      console.log('Récupération des contacts');
    })
    .addCase(getAllContacts.rejected, (state, action) => {
      console.log('Impossible de récupérer les contacts');
    })
    .addCase(getAllContacts.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
      if (state.list.length > 0) state.isEmpty = false;
      console.log('Contacts récupérés');
    })
    .addCase(createNewContact.rejected, (state, action) => {
      console.log('Requête de création de contact refusée');
    })
    .addCase(createNewContact.fulfilled, (state, action) => {
      console.log('Contact créé');
    });
});

export default contactsReducer;
