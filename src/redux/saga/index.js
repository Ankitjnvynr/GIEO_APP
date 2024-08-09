import {all} from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import AppSaga from './AppSaga';
import EventSaga from './EventSaga';

export default function* rootSaga() {
  yield all([...AuthSaga, ...AppSaga,...EventSaga]);
}
