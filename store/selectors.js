import { createSelector } from 'reselect';
import { get, queryAsKey } from '../helpers';
import { LANGUAGE } from '../constants';

const NOT_REQUESTED = {
  requested: false,
  loading: false,
};
const AVAILABLE = {
  requested: true,
  loading: false,
};
export const selectCategories = (state) => state.categories;
export const selectQuery = (state) => state.query;
export const selectCategoriesData = createSelector(
  selectCategories,
  (categories) => categories.data,
);
