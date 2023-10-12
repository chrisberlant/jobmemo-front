import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import securedFetch from '../../Utils/securedFetch';
import { UserType, AnyObjectType } from '../../@types/jobmemo';
import { setMessage, setError, setLoading } from './app';

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
  async (credentials: AnyObjectType) => {
    const loginRequest = await securedFetch('/login', 'POST', credentials);
    if (loginRequest.failed) {
      throw new Error(loginRequest.data);
    }
    return loginRequest.data;
  }
);

export const getUserInfos = createAsyncThunk(
  'user/GET_USER_INFOS',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const getInfosRequest = await securedFetch('/getUserInfos');
    if (getInfosRequest.failed) {
      dispatch(setError('Impossible de récupérer les informations'));
      throw new Error(getInfosRequest.data);
    }
    dispatch(setLoading(false));
    return getInfosRequest.data;
  }
);

export const modifyUserInfos = createAsyncThunk(
  'user/MODIFY_USER_INFOS',
  async (infos: AnyObjectType, { dispatch }) => {
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
    })
    .addCase(modifyUserInfos.fulfilled, (state, action) => {
      state.infos = action.payload;
      localStorage.setItem('firstName', action.payload.firstName);
    });
});

export default userReducer;
