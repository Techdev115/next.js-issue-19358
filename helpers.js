import { setQuery } from './store/actions';
import { initStore } from './store/initStore';

// sort keys in query to always get the same json string for query key
export const queryAsKey = (query) =>
  JSON.stringify(
    Object.entries(query)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .reduce((result, [key, value]) => {
        result[key] = value;
        return result;
      }, {}),
  );
export const toUrl = (baseUrl) => {
  return baseUrl;
};
export const withPage = ({
  page = 1,
  pageSize = 60,
  ...query
} = {}) => ({
  page,
  pageSize,
  ...query,
});
export const addStoreToContext = (context) => ({
  ...context,
  store: initStore(),
});
export const addPageQuery = (context) => ({
  ...context,
  query: withPage(context.query),
});
export const addQueryToState = (context) => {
  context.store.dispatch(setQuery(context.query));
  return context;
};
export const compose = (functions) => (arg) =>
  functions.reduce(
    (result, fn) => result.then(fn),
    Promise.resolve(arg),
  );
export const basicInit = compose([
  addStoreToContext,
  addPageQuery,
  addQueryToState,
]);
const cache = () => new Map();
export const group = (fn, groups = cache()) => {
  return (...args) => {
    const key = JSON.stringify(args);
    const existing = groups.get(key);
    if (existing) {
      return existing;
    }
    const result = fn(...args);
    groups.set(key, result);
    return result.finally(() => groups.delete(key));
  };
};
export const createGroupedThunkAction = (
  thunkAction,
  groups = cache(),
) => {
  const groupFn = group(
    (args, dispatch, getState) =>
      thunkAction.apply(null, args)(dispatch, getState),
    groups,
  );

  return (...args) => (dispatch, getState) => {
    return groupFn(args, dispatch, getState);
  };
};
