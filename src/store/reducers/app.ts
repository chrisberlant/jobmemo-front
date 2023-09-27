/* eslint-disable no-console */
import { createReducer, createAction } from '@reduxjs/toolkit';
import { NotificationType } from '../../@types/jobmemo';

const initialValue: NotificationType = {
  text: '',
  error: false,
};

export const setMessage = createAction<string>('app/SET_MESSAGE');
export const setError = createAction<string>('app/SET_ERROR');
export const removeAllMessages = createAction('app/REMOVE_ALL_MESSAGES');

const appReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(setMessage, (state, action) => {
      state.text = action.payload;
      state.error = false;
    })
    .addCase(setError, (state, action) => {
      state.text = action.payload;
      state.error = true;
    })
    .addCase(removeAllMessages, (state) => {
      state.text = '';
      state.error = false;
    });
});

export default appReducer;
