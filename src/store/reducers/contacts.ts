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
}

const initialValue: Contacts = {
  list: [],
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
      console.log('Contacts récupérés');
    });
});

export default contactsReducer;
