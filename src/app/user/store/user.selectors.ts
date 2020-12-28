import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './reducers';

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.userStateFeatureKey
);

export const selectAllUsers = createSelector(
  selectUserState,
  fromUser.selectAll
);

export const selectAllUsersLoaded = createSelector(
  selectUserState,
  (state) => state.isUserLoaded
);

export const selectAllEventEntities = createSelector(
  selectUserState,
  fromUser.selectEntities
);
