import { USER_LOGGED_IN } from '../types';
import api from '../api';

export const userLoggedIn = (user) => ({
  type: USER_LOGGED_IN,
  user
})

// go into ../../api.js to access api.user.login method that makes API request
// if successful, dispatch userLoggedIn action to reducers
export const login = (credentials) => (dispatch) =>
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));
