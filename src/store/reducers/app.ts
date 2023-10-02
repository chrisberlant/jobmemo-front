import { createReducer, createAction } from '@reduxjs/toolkit';
import { NotificationType } from '../../@types/jobmemo';

const initialValue: NotificationType = {
  isLoading: false,
  text: '',
  error: false,
};

export const setLoading = createAction<boolean>('app/SET_LOADING');
export const setMessage = createAction<string>('app/SET_MESSAGE');
export const setError = createAction<string>('app/SET_ERROR');
export const removeNotification = createAction('app/REMOVE_ALL_MESSAGES');

const appReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setMessage, (state, action) => {
      state.isLoading = false;
      state.text = action.payload;
      state.error = false;
    })
    .addCase(setError, (state, action) => {
      state.isLoading = false;
      state.text = action.payload;
      state.error = true;
    })
    .addCase(removeNotification, (state) => {
      state.text = '';
      state.error = false;
    });
});

export default appReducer;
