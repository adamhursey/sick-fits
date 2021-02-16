/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';

// TODO swap with our own
import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default MyApp;
