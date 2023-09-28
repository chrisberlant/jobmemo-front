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
  'contacts/GET_ALL_DOCUMENTS',
  async (_, { dispatch }) => {
    const documentsRequest = await securedFetch('/allDocuments');
    if (documentsRequest.failed) {
      dispatch(setError('Impossible de récupérer les documents'));
      throw new Error(documentsRequest.data);
    }
    return documentsRequest.data;
  }
);

const documentsReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(getAllDocuments.pending, (state) => {
      state.isLoading = true;
      console.log('Récupération des documents');
    })
    .addCase(getAllDocuments.rejected, (state) => {
      console.log('Impossible de récupérer les documents');
      state.isLoading = false;
    })
    .addCase(getAllDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.length === 0) state.isEmpty = true;
      else state.items = action.payload;
      console.log('Documents récupérés');
    });
});

export default documentsReducer;
