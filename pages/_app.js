import "../assets/styles.less";

import App from "next/app";
import AppProvider from "../components/shared/AppProvider";
import { GlobalStyles } from "../components/styles/GlobalStyles";
import Head from "next/head";
import NProgress from "nprogress";
import Page from "../components/Page";
import Router from "next/router";
import { persistor, store } from '../redux/store';
import { createWrapper } from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';

// Start NProgress when route changes start
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx, req }) {
    let pageProps = {};
    const userAgent = ctx.req
      ? ctx.req.headers["user-agent"]
      : navigator.userAgent;

    let ie = false;
    if (userAgent.match(/Edge/i) || userAgent.match(/Trident.*rv[ :]*11\./i)) {
      ie = true;
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    pageProps.query = ctx.query;
    pageProps.ieBrowser = ie;
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        <Head>
          {/* Meta tags and headers for the page */}
        </Head>
        <AppProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </AppProvider>
      </PersistGate>
    );
  }
}

// Create the Redux store and connect it to Next.js using createWrapper
const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
