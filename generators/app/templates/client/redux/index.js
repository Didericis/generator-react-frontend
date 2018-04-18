import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';

const initialState = window.__PRELOADED_STATE__ || {};
delete window.__PRELOADED_STATE__;

const middleware = [thunkMiddleware];

export const store = (initial = {}, reducers = {}) => {
  return createStore(
    combineReducers({
      form: formReducer,
      ...reducers,
    }),
    { ...initialState, ...initial }, 
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
  );
};
