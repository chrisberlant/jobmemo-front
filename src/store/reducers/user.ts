import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import securedFetch from '../../Utils/securedFetch';
import { UserType } from '../../@types/jobmemo';
import { setMessage, setError } from './app';

const initialValue: UserType = {
  infos: {
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
    address: '',
  },
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
  async (infos: FormData, { dispatch }) => {
    const modificationRequest = await securedFetch(
      '/modifyUserInfos',
      'PATCH',
      infos
    );
    if (modificationRequest.failed) {
      dispatch(setError(modificationRequest.data));
      throw new Error(modificationRequest.data);
    }
    dispatch(setMessage('Informations modifiées avec succès'));
    return modificationRequest.data;
  }
);

const userReducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('firstName', action.payload.firstName);
      state.infos = action.payload;
    })
    .addCase(getUserInfos.fulfilled, (state, action) => {
      state.infos = action.payload;
      console.log('Infos utilisateur récupérées');
    })
    .addCase(modifyUserInfos.fulfilled, (state, action) => {
      state.infos = action.payload;
      localStorage.setItem('firstName', action.payload.firstName);
    });
});

export default userReducer;
