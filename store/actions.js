import { getCategories } from '../api/client';
import { selectCategories } from './selectors';

export const CATEGORIES_LOADING = 'CATEGORIES_LOADING';
export const CATEGORIES_LOADING_ERROR =
  'CATEGORIES_LOADING_ERROR';
export const CATEGORIES_LOADING_SUCCEEDED =
  'CATEGORIES_LOADING_SUCCEEDED';
export const SET_QUERY = 'SET_QUERY';
export const SET_PAGE_LOADING = 'SET_PAGE_LOADING';
export const SET_STATE = 'SET_STATE';

export const loadCategories = () => (
  dispatch,
  getState,
) => {
  const categories = selectCategories(getState());
  if (!categories.loading && categories.requested) {
    return Promise.resolve();
  }
  dispatch({ type: CATEGORIES_LOADING });
  return getCategories().then((response) => {
    dispatch({
      type: CATEGORIES_LOADING_SUCCEEDED,
      payload: response.results,
    });
  });
};
export const setQuery = (query) => ({
  type: SET_QUERY,
  payload: query,
});
export const setPageLoading = (loading = false) => ({
  type: SET_PAGE_LOADING,
  payload: loading,
});
export const setState = (state) => ({
  type: SET_STATE,
  payload: state,
});
