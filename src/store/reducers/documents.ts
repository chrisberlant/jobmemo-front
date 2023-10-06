import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentsType } from '../../@types/jobmemo';
import securedFetch from '../../Utils/securedFetch';
import { setMessage, setError, setLoading } from './app';

const initialValue: DocumentsType = {
  items: [],
  isEmpty: false,
};

export const getAllDocuments = createAsyncThunk(
  'documents/GET_ALL_DOCUMENTS',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const documentsRequest = await securedFetch('/allDocuments');
    if (documentsRequest.failed) {
      dispatch(setError('Impossible de récupérer les documents'));
      throw new Error(documentsRequest.data);
    }
    dispatch(setLoading(false));
    return documentsRequest.data;
  }
);

export const createNewDocument = createAsyncThunk(
  'documents/CREATE_NEW_DOCUMENT',
  async (infos: FormData, { dispatch }) => {
    dispatch(setLoading(true));
    const creationRequest = await securedFetch(
      '/createNewDocument',
      'POST',
      infos
    );
    if (creationRequest.failed) {
      dispatch(setError('Impossible de créer le document'));
      throw new Error(creationRequest.data);
    }
    return creationRequest.data;
  }
);

export const modifyDocument = createAsyncThunk(
  'documents/MODIFY_DOCUMENT',
  async (infos: FormData, { dispatch }) => {
    dispatch(setLoading(true));
    const modificationRequest = await securedFetch(
      '/modifyDocument',
      'PATCH',
      infos
    );
    if (modificationRequest.failed) {
      dispatch(setError('Impossible de modifier le document'));
      throw new Error(modificationRequest.data);
    }
    return modificationRequest.data;
  }
);

export const deleteDocument = createAsyncThunk(
  'documents/DELETE_DOCUMENT',
  async (id: string, { dispatch }) => {
    const documentToDelete = new FormData();
    documentToDelete.append('id', id);
    dispatch(setLoading(true));
    const deleteRequest = await securedFetch(
      '/deleteDocument',
      'DELETE',
      documentToDelete
    );
    if (deleteRequest.failed) {
      dispatch(setError('Impossible de supprimer le document'));
      throw new Error(deleteRequest.data);
    }
    // dispatch(setMessage('Document supprimé'));
    return id;
  }
);

const documentsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(getAllDocuments.fulfilled, (state, action) => {
      if (action.payload.length === 0) state.isEmpty = true;
      else state.items = action.payload;
    })
    .addCase(createNewDocument.fulfilled, (state, action) => {
      state.isEmpty = false;
      state.items.push(action.payload);
    })
    .addCase(modifyDocument.fulfilled, (state, action) => {
      const updatedInfos = action.payload;
      const documentToUpdate = state.items.find(
        (contact) => contact.id === updatedInfos.id
      );
      if (documentToUpdate) {
        Object.assign(documentToUpdate, updatedInfos);
      }
    })
    .addCase(deleteDocument.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (Document) => Document.id !== action.payload
      );
    });
});

export default documentsReducer;
