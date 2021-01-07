import { call, put, all, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import * as types from '../types';

const request = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

function* exampreRequest() {
  try {
    yield call(request);
    yield put(actions.botaoClicadoSuccess);
  } catch {
    yield put(actions.botaoClicadoFailure);
  }
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampreRequest)]);
