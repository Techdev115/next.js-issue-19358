import '../style.scss';
import '../LightBox.scss';
import React from 'react';
import { Provider } from 'react-redux';
import { initStore } from '../store/initStore.js';
import Router from 'next/router';
import { setPageLoading, setState } from '../store/actions';

export default function App({ Component, pageProps }) {
  const store = initStore(pageProps.reduxState);
  const dispatch = store.dispatch;
  React.useEffect(() => {
    const start = () => {
      dispatch(setPageLoading(true));
    };
    const end = () => {
      dispatch(setPageLoading(false));
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, [dispatch]);
  //set redux state if it was passed (came from server)
  pageProps.reduxState &&
    dispatch(setState(pageProps.reduxState));
  return (
    <div>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
