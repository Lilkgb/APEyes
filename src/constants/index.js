import * as types from './ActionTypes';
import {initialState, giphyState, authState, firebaseState} from './IntitialState';
import firebaseConfig from './firebaseConfig';

export default {
  firebaseConfig: firebaseConfig,
  firebaseState: firebaseState,
  initialState: initialState,
  giphyState: giphyState,
  authState: authState,
  types: types,
}
