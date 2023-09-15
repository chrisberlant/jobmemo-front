import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import securedFetch, { baseUrl } from '../../Utils/securedFetch';
import { UserType, UserInfosType } from '../../@types/jobmemo';

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
  isLogged: false,
};

export const login = createAsyncThunk(
  'user/LOGIN',
  async (credentials: FormData) => {
    try {
      const fetchLoginParams = {
        method: 'POST',
        credentials: 'include',
        body: credentials,
      };
      // TODO Gestion d'erreurs
      const response = await fetch(`${baseUrl}/login`, fetchLoginParams);
      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data);
      }
      localStorage.setItem('authenticated', 'true');
      return data;
    } catch (error) {
      throw new Error();
    }
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
      state.infos = action.payload.user;
      state.isLogged = true;
    })
    .addCase(modifyUserInfos.pending, (state) => {
      console.log('Infos utilisateur en cours de modification');
      state.isLoading = true;
    })
    .addCase(modifyUserInfos.rejected, (state) => {
      state.error = 'Impossible de modifier les infos';
      console.log('Impossible de modifier les infos');
    })
    .addCase(modifyUserInfos.fulfilled, (state, action) => {
      state.infos = action.payload;
      localStorage.setItem('user', JSON.stringify(state.infos));
      console.log('Infos utilisateur modifiées');
    });
});

export default userReducer;
