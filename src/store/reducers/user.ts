import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { baseUrl } from '../../securedFetch';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  isLoading: boolean;
  error: string | null;
}

const initialValue: User = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  avatarUrl: '',
  isLoading: false,
  error: null,
};

export const modifyUserInfos = createAction<User>('user/MODIFY_USER_INFOS');
export const login = createAsyncThunk(
  'user/LOGIN',
  async (credentials: FormData) => {
    try {
      const fetchLoginParams = {
        method: 'POST',
        body: credentials,
      };
      // TODO Gestion d'erreurs
      const response = await fetch(`${baseUrl}/login`, fetchLoginParams);
      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data);
      }
      return data;
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  }
);

const userReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(modifyUserInfos, (state, action) => {
      const { id, email, firstName, lastName, avatarUrl } = action.payload;
      state.id = id;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.avatarUrl = avatarUrl;
      console.log('Infos utilisateur modifiées');
    })
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
      const { id, email, firstName, lastName, avatarUrl } = action.payload.user;
      const { token } = action.payload;
      state.id = id;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.avatarUrl = avatarUrl;
      // Adding token to local storage if login is fulfilled
      localStorage.setItem('token', JSON.stringify(token));
      const userInfos = { email, firstName, lastName, avatarUrl };
      localStorage.setItem('user', JSON.stringify(userInfos));
    });
});

export default userReducer;
