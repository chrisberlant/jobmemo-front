/* eslint-disable no-console */
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { Contacts } from '../../@types/jobmemo';
import securedFetch from '../../Utils/securedFetch';
import { setMessage, setError } from './app';

const initialValue: Contacts = {
  items: [],
  isLoading: false,
  isEmpty: false,
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
  async (infos: FormData, { dispatch }) => {
    const creationRequest = await securedFetch(
      '/createNewContact',
      'POST',
      infos
    );
    if (creationRequest.failed) {
      dispatch(setError('Impossible de créer le contact'));
      throw new Error(creationRequest.data);
    }
    dispatch(setError('Contact créé avec succès'));
    return creationRequest.data;
  }
);

export const modifyContact = createAsyncThunk(
  'contacts/MODIFY_CONTACT',
  async (infos: FormData, { dispatch }) => {
    const modificationRequest = await securedFetch(
      '/modifyContact',
      'PATCH',
      infos
    );
    if (modificationRequest.failed) {
      dispatch(setError('Impossible de modifier le contact'));
      throw new Error(modificationRequest.data);
    }
    dispatch(setMessage('Contact modifié avec succès'));
    return modificationRequest.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/DELETE_CONTACT',
  async (id: string, { dispatch }) => {
    const contactToDelete = new FormData();
    contactToDelete.append('id', id);
    const deleteRequest = await securedFetch(
      '/deleteContact',
      'DELETE',
      contactToDelete
    );
    if (deleteRequest.failed) {
      dispatch(setError('Impossible de supprimer le contact'));
      throw new Error(deleteRequest.data);
    }
    dispatch(setMessage('Contact supprimé de la corbeille'));
    return id;
  }
);

const contactsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(getAllContacts.pending, (state) => {
      state.isLoading = true;
      console.log('Récupération des contacts');
    })
    .addCase(getAllContacts.rejected, (state) => {
      console.log('Impossible de récupérer les contacts');
      state.isLoading = false;
    })
    .addCase(getAllContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.length === 0) state.isEmpty = true;
      else state.items = action.payload;
      console.log('Contacts récupérés');
    })
    .addCase(createNewContact.pending, (state) => {
      state.isLoading = true;
      console.log('Création du contact en cours');
    })
    .addCase(createNewContact.rejected, (state) => {
      state.isLoading = false;
      console.log('Requête de création de contact refusée');
    })
    .addCase(createNewContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isEmpty = false;
      state.items.push(action.payload);
      console.log('Contact créé');
    })
    .addCase(modifyContact.pending, (state) => {
      state.isLoading = true;
      console.log('Modification du contact en cours');
    })
    .addCase(modifyContact.rejected, (state) => {
      state.isLoading = false;
      console.log('Requête de modification de contact refusée');
    })
    .addCase(modifyContact.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedInfos = action.payload;
      const contactIndexToUpdate = state.items.findIndex(
        (contact) => contact.id === updatedInfos.id
      );
      if (contactIndexToUpdate) {
        state.items[contactIndexToUpdate] = updatedInfos;
        console.log('Contact modifié');
      }
    })
    .addCase(deleteContact.pending, (state) => {
      state.isLoading = true;
      console.log('Suppression du contact en cours');
    })
    .addCase(deleteContact.rejected, (state) => {
      state.isLoading = false;
      console.log('Requête de suppression de contact refusée');
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
      console.log('Contact créé');
      console.log(state.items);
    });
});

export default contactsReducer;
