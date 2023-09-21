/* eslint-disable no-console */
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { Contacts } from '../../@types/jobmemo';

import securedFetch from '../../Utils/securedFetch';

const initialValue: Contacts = {
  items: [],
  isLoading: false,
  isEmpty: false,
  error: false,
  message: null,
};

export const getAllContacts = createAsyncThunk(
  'contacts/GET_ALL_CONTACTS',
  async () => {
    const contactsRequest = await securedFetch('/allContacts');
    if (contactsRequest.failed) {
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
    if (creationRequest.failed) {
      throw new Error(creationRequest.data);
    }
    return creationRequest.data;
  }
);

export const modifyContact = createAsyncThunk(
  'contacts/MODIFY_CONTACT',
  async (infos: FormData) => {
    const modificationRequest = await securedFetch(
      '/modifyContact',
      'PATCH',
      infos
    );
    if (modificationRequest.failed) {
      throw new Error(modificationRequest.data);
    }
    return modificationRequest.data;
  }
);

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
    .addCase(createNewContact.pending, (state, action) => {
      console.log('Création du contact en cours');
    })
    .addCase(createNewContact.rejected, (state, action) => {
      console.log('Requête de création de contact refusée');
    })
    .addCase(createNewContact.fulfilled, (state, action) => {
      state.isEmpty = false;
      state.items.push(action.payload);
      console.log('Contact créé');
    })
    .addCase(modifyContact.pending, (state, action) => {
      console.log('Modification du contact en cours');
    })
    .addCase(modifyContact.rejected, (state, action) => {
      console.log('Requête de modification de contact refusée');
      state.error = true;
    })
    .addCase(modifyContact.fulfilled, (state, action) => {
      const updatedInfos = action.payload;
      const contactIndexToUpdate = state.items.findIndex(
        (contact) => contact.id === updatedInfos.id
      );
      if (contactIndexToUpdate) {
        state.items[contactIndexToUpdate] = updatedInfos;
        console.log('Contact modifié');
      }
    });
});

export default contactsReducer;
