import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  isLoading: boolean;
  error: string | null;
}

const initialValue: User = {
  id: 0,
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
    const fetchLoginParams = {
      method: 'POST',
      body: credentials,
    };
    const data = await fetch('http://localhost:3000/login', fetchLoginParams);
    const userData = await data.json();
    return userData;
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
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Email ou mot de passe incorrect';
    })
    .addCase(login.fulfilled, (state, action) => {
      const { id, email, firstName, lastName, avatarUrl, token } =
        action.payload;
      state.id = id;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.avatarUrl = avatarUrl;
      localStorage.setItem('token', token);
    });
});

export default userReducer;
