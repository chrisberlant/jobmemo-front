import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { ContactsType } from '../../@types/jobmemo';
import securedFetch from '../../Utils/securedFetch';
import { setMessage, setError, setLoading } from './app';

const initialValue: ContactsType = {
  items: [],
  isEmpty: false,
};

export const getAllContacts = createAsyncThunk(
  'contacts/GET_ALL_CONTACTS',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const contactsRequest = await securedFetch('/allContacts');
    if (contactsRequest.failed) {
      dispatch(setError('Impossible de récupérer les contacts'));
      throw new Error(contactsRequest.data);
    }
    dispatch(setLoading(false));
    return contactsRequest.data;
  }
);

export const createNewContact = createAsyncThunk(
  'contacts/CREATE_NEW_CONTACT',
  async (infos: FormData, { dispatch }) => {
    dispatch(setLoading(true));
    const creationRequest = await securedFetch(
      '/createNewContact',
      'POST',
      infos
    );
    if (creationRequest.failed) {
      dispatch(setError('Impossible de créer le contact'));
      throw new Error(creationRequest.data);
    }
    return creationRequest.data;
  }
);

export const modifyContact = createAsyncThunk(
  'contacts/MODIFY_CONTACT',
  async (infos: FormData, { dispatch }) => {
    dispatch(setLoading(true));
    const modificationRequest = await securedFetch(
      '/modifyContact',
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

export const deleteContact = createAsyncThunk(
  'contacts/DELETE_CONTACT',
  async (id: string, { dispatch }) => {
    const contactToDelete = new FormData();
    contactToDelete.append('id', id);
    dispatch(setLoading(true));
    const deleteRequest = await securedFetch(
      '/deleteContact',
      'DELETE',
      contactToDelete
    );
    if (deleteRequest.failed) {
      dispatch(setError('Impossible de supprimer le contact'));
      throw new Error(deleteRequest.data);
    }
    return id;
  }
);

const contactsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(getAllContacts.fulfilled, (state, action) => {
      if (action.payload.length === 0) state.isEmpty = true;
      else state.items = action.payload;
    })
    .addCase(createNewContact.fulfilled, (state, action) => {
      state.isEmpty = false;
      state.items.push(action.payload);
    })
    .addCase(modifyContact.fulfilled, (state, action) => {
      const updatedInfos = action.payload;
      const contactToUpdate = state.items.find(
        (contact) => contact.id === updatedInfos.id
      );
      if (contactToUpdate) {
        Object.assign(contactToUpdate, updatedInfos);
      }
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
    });
});

export default contactsReducer;
