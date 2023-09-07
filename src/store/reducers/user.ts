import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { baseUrl } from '../../Utils/securedFetch';
import { UserType, UserInfosType } from '../../@types/jobmemo';

const initialValue: UserType = {
  infos: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
    address: '',
  },
  isLoading: false,
  error: undefined,
};

export const modifyUserInfos = createAction<UserInfosType>(
  'user/MODIFY_USER_INFOS'
);
// TODO ajouter async pour modifier les infos de la BDD
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
      state.infos.id = id;
      state.infos.email = email;
      state.infos.firstName = firstName;
      state.infos.lastName = lastName;
      state.infos.avatarUrl = avatarUrl;
      console.log('Infos utilisateur modifiées');
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      console.log('Chargement en cours');
      state.error = undefined;
    })
    .addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Email ou mot de passe incorrect';
    })
    .addCase(login.fulfilled, (state, action) => {
      const { id, email, firstName, lastName, avatarUrl, address } =
        action.payload.user;
      const { token } = action.payload;
      state.infos.id = id;
      state.infos.email = email;
      state.infos.firstName = firstName;
      state.infos.lastName = lastName;
      state.infos.avatarUrl = avatarUrl;
      state.infos.address = address;
      // Adding token to local storage if login is fulfilled
      localStorage.setItem('token', JSON.stringify(token));
      const userInfos = { email, firstName, lastName, avatarUrl, address };
      localStorage.setItem('user', JSON.stringify(userInfos));
    });
});

export default userReducer;
