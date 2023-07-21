/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, createReducer } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

const initialValue: User = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  avatarUrl: '',
};

export const modifyUserInfos = createAction<User>('user/MODIFY_USER_INFOS');

const userReducer = createReducer(initialValue, (builder) => {
  builder.addCase(modifyUserInfos, (state, action) => {
    const { id, email, firstName, lastName, avatarUrl } = action.payload;
    state.id = id;
    state.email = email;
    state.firstName = firstName;
    state.lastName = lastName;
    state.avatarUrl = avatarUrl;
  });
});

export default userReducer;
