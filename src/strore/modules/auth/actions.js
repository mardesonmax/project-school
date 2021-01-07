import * as types from '../types';

export const loginRequest = (payload) => ({
  type: types.LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const loginFAilure = (payload) => ({
  type: types.LOGIN_FAILURE,
  payload,
});

// USER
export const userRequest = (payload) => ({
  type: types.USER_REQUEST,
  payload,
});

export const userSuccess = (payload) => ({
  type: types.USER_SUCCESS,
  payload,
});

export const userFailure = (payload) => ({
  type: types.USER_FAILURE,
  payload,
});

export const userLogout = (payload) => ({
  type: types.USER_LOGOUT,
  payload,
});
