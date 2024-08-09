import {combineReducers} from 'redux';
import AuthReducer from './Authreducer';
import AppReducers from './appReducer';
import EventReducer from './EventReducer'

const appReducer = combineReducers({
  AuthReducer,
  AppReducers,
  EventReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
