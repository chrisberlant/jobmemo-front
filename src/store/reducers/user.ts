/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, createReducer } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
}

const initialValue: User = {
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
  avatar_url: '',
};

export const modifyInfos = createAction<User>('user/MODIFY_INFOS');

const userReducer = createReducer(initialValue, (builder) => {
  builder.addCase(modifyInfos, (state, action) => {
    const { id, email, first_name, last_name, avatar_url } = action.payload;
    state.id = id;
    state.email = email;
    state.first_name = first_name;
    state.last_name = last_name;
    state.avatar_url = avatar_url;
  });
});

export default userReducer;
