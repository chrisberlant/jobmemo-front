import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import securedFetch from '../../Utils/securedFetch';
import { UserType } from '../../@types/jobmemo';

const initialValue: UserType = {
  infos: {
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
    address: '',
  },
  isLoading: false,
  error: null,
  message: null,
  changedPassword: null,
};

export const login = createAsyncThunk(
  'user/LOGIN',
  async (credentials: FormData) => {
    const loginRequest = await securedFetch('/login', 'POST', credentials);
    if (loginRequest.failed) {
      throw new Error(loginRequest.data);
    }
    return loginRequest.data;
  }
);

export const getUserInfos = createAsyncThunk(
  'user/GET_USER_INFOS',
  async () => {
    const getInfosRequest = await securedFetch('/getUserInfos');
    if (getInfosRequest.failed) {
      throw new Error(getInfosRequest.data);
    }
    return getInfosRequest.data;
  }
);

export const modifyUserInfos = createAsyncThunk(
  'user/MODIFY_USER_INFOS',
  async (infos: FormData) => {
    const modificationRequest = await securedFetch(
      '/modifyUserInfos',
      'PATCH',
      infos
    );
    if (modificationRequest.failed) {
      throw new Error(modificationRequest.data);
    }
    return modificationRequest.data;
  }
);

export const removeAllMessages = createAction('user/REMOVE_ALL_MESSAGES');

const userReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      console.log('Chargement en cours');
      state.error = null;
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      if (action.error.message) {
        state.error = action.error.message;
      }
    })
    .addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('firstName', action.payload.firstName);
      state.infos = action.payload;
      state.message = null;
    })
    .addCase(getUserInfos.pending, (state) => {
      console.log('Infos utilisateur en cours de récupération');
      state.isLoading = true;
    })
    .addCase(getUserInfos.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Impossible de récupérer les infos';
      console.log('Impossible de récupérer les infos');
    })
    .addCase(getUserInfos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.infos = action.payload;
      console.log('Infos utilisateur récupérées');
    })
    .addCase(modifyUserInfos.pending, (state) => {
      console.log('Infos utilisateur en cours de modification');
      state.isLoading = true;
    })
    .addCase(modifyUserInfos.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error.message);
      if (action.error.message) {
        state.message = null;
        state.error = action.error.message;
      }
    })
    .addCase(modifyUserInfos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.infos = action.payload;
      localStorage.setItem('firstName', action.payload.firstName);
      state.error = null;
      state.message = 'Informations modifiées avec succès';
    })
    .addCase(removeAllMessages, (state) => {
      state.message = null;
      state.error = null;
    });
});

export default userReducer;
