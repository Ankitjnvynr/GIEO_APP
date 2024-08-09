// import {createStore, combineReducers, applyMiddleware} from 'redux';
// import rootReducer from '../reducers';
// import createSagaMiddleware from 'redux-saga';
// import rootSaga from '../saga';

// const sagaMiddleWare = createSagaMiddleware();

// const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
// sagaMiddleWare.run(rootSaga);

// const configureStore = () => {
//   return store;
// };

// export default configureStore;

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../reducers';
import rootSaga from '../saga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['EventReducer','AppReducers'],
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

const configureStore = () => {
  return store;
};

export default configureStore;
export const persistor = persistStore(store);