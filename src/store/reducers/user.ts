import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
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
    const loginRequest = await securedFetch('/login', 'POST', credentials);
    if (loginRequest.failed) {
      throw new Error(loginRequest.data);
    }
    return loginRequest.data;
  }
);

export const register = createAsyncThunk(
  'user/REGISTER',
  async (infos: FormData) => {
    const registerRequest = await securedFetch('/register', 'POST', infos);
    if (registerRequest.failed) {
      throw new Error(registerRequest.data);
    }
    return registerRequest.data;
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
      state.message = null;
    })
    .addCase(register.pending, (state) => {
      console.log('Utilisateur en cours de création');
      state.isLoading = true;
    })
    .addCase(register.rejected, (state, action) => {
      // TODO récupérer message d'erreur du serveur
      state.isLoading = false;
      if (action.error.message) state.error = action.error.message;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message =
        'Votre compte a été créé, vous pouvez désormais vous connecter.';
      console.log('Utilisateur créé');
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
