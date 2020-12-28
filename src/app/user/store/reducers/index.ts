import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { userActions } from '../user.action.types';

export const userStateFeatureKey = 'user';

export interface UserState extends EntityState<User> {
  isUserLoaded: boolean;
}

export const userAdapter = createEntityAdapter<User>();

export const initialUserState: UserState = userAdapter.getInitialState({
  isUserLoaded: false,
});

export const userReducers = createReducer(
  initialUserState,
  on(userActions.allUsersLoaded, (state, action) => {
    return userAdapter.setAll(action.users, {
      ...state,
      isUserLoaded: true,
    });
  }),
  on(userActions.userCreated, (state, { user }) => {
    return userAdapter.addOne(user, state);
  })
);

export const { selectAll, selectEntities } = userAdapter.getSelectors();
