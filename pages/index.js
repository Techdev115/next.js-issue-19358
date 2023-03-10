import React from 'react';
import { useSelector } from 'react-redux';
import { basicInit } from '../helpers';
import { loadCategories } from '../store/actions';
import { selectCategories } from '../store/selectors';

function HomePage() {
  const categories = useSelector(selectCategories);
  return (
    <div>
      <h1>hello</h1>
      categories:
      <pre>{JSON.stringify(categories, undefined, 2)}</pre>
    </div>
  );
}
export function getStaticProps(ctx) {
  return basicInit({ ...ctx, query: ctx.params }).then(
    ({ query, store: { dispatch, getState } }) => {
      return loadCategories()(dispatch, getState).then(
        () => {
          return {
            props: {
              query,
              reduxState: getState(),
            },
          };
        },
      );
    },
  );
}

export default HomePage;
