require('dotenv').config();

//proxy api call to 3rd party (token cannot be on client)
const fetchJson = () =>
  Promise.resolve({ results: [{ id: 1, value: 1 }] });

const getCategories = () => {
  return fetchJson().catch((e) => {
    console.log('could not fetch categories', e);
  });
};
module.exports = {
  getCategories,
};
