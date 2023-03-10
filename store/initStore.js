import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {
  CATEGORIES_LOADING,
  CATEGORIES_LOADING_SUCCEEDED,
  SET_QUERY,
  SET_PAGE_LOADING,
} from './actions';
import { queryAsKey } from '../helpers';

const initState = {
  products: {
    data: {},
  },
  categories: {
    requested: false,
    data: {},
  },
  query: {},
  loading: false,
};
const reduceById = (items, item) => {
  items[item.id] = item;
  return items;
};

const rootReducer = (state = initState, action) => {
  const { type, payload } = action;
  if (type === SET_PAGE_LOADING) {
    return { ...state, loading: payload };
  }
  if (type === SET_QUERY) {
    return { ...state, query: payload };
  }
  if (type === CATEGORIES_LOADING) {
    return {
      ...state,
      categories: {
        ...state.categories,
        requested: true,
        loading: true,
      },
    };
  }
  if (type === CATEGORIES_LOADING_SUCCEEDED) {
    return {
      ...state,
      categories: {
        ...state.categories,
        data: payload.reduce(reduceById, {
          ...state.categories.data,
        }),
        loading: false,
      },
    };
  }
  if (type === 'SET_STATE') {
    return payload;
  }
  return state;
};

export const initStore = (initialState = initState) => {
  if (typeof window !== 'undefined') {
    if (window['__marketplace_store__'] === undefined) {
      window['__marketplace_store__'] = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
          applyMiddleware(thunkMiddleware),
        ),
      );
    }
    return window['__marketplace_store__'];
  }
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
};
export const STORE_KEY = '__NEXT_REDUX_STORE__';
