import fetch from 'isomorphic-unfetch';
import { group, toUrl } from '../helpers';
import { API } from '../constants';

const API_URL = API;
export const makeConfig = () => ({
  headers: {
    accept: '*/*',
    'content-type': 'application/json',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
  },
  mode: 'cors',
});

const fetchJson = (...args) =>
  fetch(...args)
    .then((result) => result.json())
    .then((result) => {
      if (result.errors) {
        throw result.errors[0].message;
      }
      return result;
    });
const groupFetchJson = group(fetchJson);

export const getCategories = (query) => {
  const url = toUrl(`${API_URL}/categories`, { query });
  return groupFetchJson(url, makeConfig());
};
