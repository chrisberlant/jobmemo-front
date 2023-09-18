import {
  createAction,
  createReducer,
  createAsyncThunk,
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
};

export const login = createAsyncThunk(
  'user/LOGIN',
  async (credentials: FormData) => {
    try {
      const loginRequest = await securedFetch('/login', 'POST', credentials);
      // TODO Gestion d'erreurs
      if (loginRequest.status !== 200) {
        throw new Error(loginRequest.data);
      }
      return loginRequest.data;
    } catch (error) {
      throw new Error();
    }
  }
);

export const getUserInfos = createAsyncThunk(
  'user/GET_USER_INFOS',
  async () => {
    const getInfosRequest = await securedFetch('/getUserInfos');
    if (getInfosRequest.status !== 200) {
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
    if (modificationRequest.status !== 200) {
      throw new Error(modificationRequest.data);
    }
    return modificationRequest.data;
  }
);

const userReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      console.log('Chargement en cours');
      state.error = null;
    })
    .addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Email ou mot de passe incorrect';
    })
    .addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('firstName', action.payload.firstName);
      state.infos = action.payload;
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
      localStorage.setItem('firstName', action.payload.firstName);
      console.log('Infos utilisateur récupérées');
    })
    .addCase(modifyUserInfos.pending, (state) => {
      console.log('Infos utilisateur en cours de modification');
      state.isLoading = true;
    })
    .addCase(modifyUserInfos.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Impossible de modifier les infos';
      console.log('Impossible de modifier les infos');
    })
    .addCase(modifyUserInfos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.infos = action.payload;
      localStorage.setItem('firstName', action.payload.firstName);
      console.log('Infos utilisateur modifiées');
    });
});

export default userReducer;
