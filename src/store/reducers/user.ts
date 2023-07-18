/* eslint-disable no-param-reassign */
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
    state = action.payload;
  });
});

export default userReducer;
