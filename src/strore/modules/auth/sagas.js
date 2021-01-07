import { call, put, all, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    yield put(actions.loginFAilure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}
// Registrar usuario
// eslint-disable-next-line consistent-return
function* userRequest({ payload }) {
  const { nome, email, password, id } = payload;

  try {
    if (!id) {
      const { data } = yield call(axios.post, '/users/store', {
        nome: nome.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      yield put(
        actions.userSuccess({
          user: data,
          msg: 'Usuário cadastrado com sucesso.',
          req: 'post',
        })
      );
      return history.push('/login');
    }

    const { data } = yield call(axios.put, '/users/update', {
      nome: nome.trim(),
      email: email.trim(),
      password: password ? password.trim() : undefined,
    });

    yield put(
      actions.userSuccess({
        user: data,
        msg: 'Usuário alterado com sucesso.',
        req: 'put',
      })
    );
  } catch (e) {
    const status = get(e, 'response.status', 0);
    const errors = get(e, 'response.data.errors', []);
    yield put(actions.userFailure({ errors, status }));
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.USER_REQUEST, userRequest),
]);
