import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import reduxPersist from './modules/reduxPersist';
import rootReduce from './modules/rootReduce';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reduxPersist(rootReduce),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
