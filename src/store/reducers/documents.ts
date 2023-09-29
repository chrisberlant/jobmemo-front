/* eslint-disable no-console */
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentsType } from '../../@types/jobmemo';
import securedFetch from '../../Utils/securedFetch';
import { setMessage, setError } from './app';

const initialValue: DocumentsType = {
  items: [],
  isLoading: false,
  isEmpty: false,
};

export const getAllDocuments = createAsyncThunk(
  'documents/GET_ALL_DOCUMENTS',
  async (_, { dispatch }) => {
    const documentsRequest = await securedFetch('/allDocuments');
    if (documentsRequest.failed) {
      dispatch(setError('Impossible de récupérer les documents'));
      throw new Error(documentsRequest.data);
    }
    return documentsRequest.data;
  }
);

export const createNewDocument = createAsyncThunk(
  'documents/CREATE_NEW_DOCUMENT',
  async (infos: FormData) => {
    const creationRequest = await securedFetch(
      '/createNewDocument',
      'POST',
      infos
    );
    if (creationRequest.failed) {
      throw new Error(creationRequest.data);
    }
    return creationRequest.data;
  }
);

export const modifyDocument = createAsyncThunk(
  'documents/MODIFY_DOCUMENT',
  async (infos: FormData, { dispatch }) => {
    const modificationRequest = await securedFetch(
      '/modifyDocument',
      'PATCH',
      infos
    );
    if (modificationRequest.failed) {
      dispatch(setError('Impossible de modifier le document'));
      throw new Error(modificationRequest.data);
    }
    dispatch(setMessage('Document modifié avec succès'));
    return modificationRequest.data;
  }
);

export const deleteDocument = createAsyncThunk(
  'documents/DELETE_DOCUMENT',
  async (id: string, { dispatch }) => {
    const documentToDelete = new FormData();
    documentToDelete.append('id', id);
    const deleteRequest = await securedFetch(
      '/deleteDocument',
      'DELETE',
      documentToDelete
    );
    if (deleteRequest.failed) {
      dispatch(setError('Impossible de supprimer le document'));
      throw new Error(deleteRequest.data);
    }
    dispatch(setMessage('Document supprimé'));
    return id;
  }
);

const documentsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(getAllDocuments.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllDocuments.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getAllDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.length === 0) state.isEmpty = true;
      else state.items = action.payload;
    })
    .addCase(createNewDocument.pending, (state) => {
      state.isLoading = true;
      console.log('Création du document en cours');
    })
    .addCase(createNewDocument.rejected, (state) => {
      state.isLoading = false;
      console.log('Requête de création de document refusée');
    })
    .addCase(createNewDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isEmpty = false;
      state.items.push(action.payload);
      console.log('Document créé');
    })
    .addCase(modifyDocument.pending, (state) => {
      state.isLoading = true;
      console.log('Modification du document en cours');
    })
    .addCase(modifyDocument.rejected, (state) => {
      state.isLoading = false;
      console.log('Requête de modification de document refusée');
    })
    .addCase(modifyDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedInfos = action.payload;
      const documentToUpdate = state.items.find(
        (contact) => contact.id === updatedInfos.id
      );
      if (documentToUpdate) {
        Object.assign(documentToUpdate, updatedInfos);
        console.log('Document modifié');
      }
    })
    .addCase(deleteDocument.pending, (state) => {
      state.isLoading = true;
      console.log('Suppression du document en cours');
    })
    .addCase(deleteDocument.rejected, (state) => {
      state.isLoading = false;
      console.log('Requête de suppression de document refusée');
    })
    .addCase(deleteDocument.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = state.items.filter(
        (Document) => Document.id !== action.payload
      );
      console.log('Document supprimé');
    });
});

export default documentsReducer;
