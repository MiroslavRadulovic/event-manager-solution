import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const loadAllUsers = createAction('[User Root Resolver] Load all users');

export const allUsersLoaded = createAction(
  '[Users Effect] Load all users from db',
  props<{ users: User[] }>()
);

export const userCreated = createAction(
  '[User Manage] User created',
  props<{ user: User }>()
);
