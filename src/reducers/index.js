import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import userReducer from './user';
import fileReducer from './file';
import toastReducer from './toast';
import coreReducer from './core';
import uploadReducer from './upload';


const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
  toasts: toastReducer,
  core: coreReducer,
  upload: uploadReducer,
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
