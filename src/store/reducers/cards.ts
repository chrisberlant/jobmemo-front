/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { CardType } from '../../@types/jobmemo';

const initialValue: CardType = {
  id: 0,
  title: '',
  category: '',
  index: 0,
  enterprise_name: '',
  logo_url: '',
  enterprise_activity: '',
  contract_type: '',
  description: '',
  created_at: '',
  offer_url: '',
  location: '',
  salary: '',
  job_title: '',
  notation: 0,
  color: '',
  is_deleted: false,
  notes: '',
  reminder: new Date(),
  user_id: 0,
};

export const getAllCards = createAction<CardType>('cards/GET_ALL_CARDS');

const cardsReducer = createReducer(initialValue, (builder) => {
  builder.addCase(getAllCards, (state, action) => {
    const {
      id,
      title,
      category,
      index,
      enterprise_name,
      logo_url,
      enterprise_activity,
      contract_type,
      description,
      created_at,
      offer_url,
      location,
      salary,
      job_title,
      notation,
      color,
      is_deleted,
      notes,
      reminder,
      user_id,
    } = action.payload;
    state.id = id;
    state.title = title;
    state.category = category;
    state.index = index;
    state.enterprise_name = enterprise_name;
    state.logo_url = logo_url;
    state.enterprise_activity = enterprise_activity;
    state.contract_type = contract_type;
    state.description = description;
    state.created_at = created_at;
    state.offer_url = offer_url;
    state.location = location;
    state.salary = salary;
    state.job_title = job_title;
    state.notation = notation;
    state.color = color;
    state.is_deleted = is_deleted;
    state.notes = notes;
    state.reminder = reminder;
    state.user_id = user_id;
  });
});

export default cardsReducer;
