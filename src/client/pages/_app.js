// pages/_app.js
import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Router from 'next/router';

import withRedux from 'next-redux-wrapper';
import makeStore from './../store/index.js';
import { LOGIN_SUCCESS } from 'actions/authActions.js';
import { getSelf } from 'actions/userActions.js';

import { APIFetch } from 'utils';
import paths from 'constants/paths.js';

import Layout from 'layouts';
import WebsocketsContainer from 'components/websockets';

import './../styles/app.scss';

class DariaApp extends App {
    static async getInitialProps({ Component, ctx }) {
        // TODO: move this elsewhere(action ?)
        if (ctx.req) {
            try {
                await APIFetch.get('/ensurelogin', null, ctx.req);
                ctx.store.dispatch({ type: LOGIN_SUCCESS });
                if (Component.authLevel === 'public') {
                    ctx.res.redirect(paths.AUTHENTICATED_REDIRECT_PATH);
                }
                if (ctx.store.getState().auth.authenticated) {
                    await ctx.store.dispatch(getSelf(ctx.req));
                }
            } catch (err) {
                if (Component.authLevel === 'private') {
                    ctx.res.redirect(paths.UNAUTHORIZED_REDIRECT_PATH);
                }
            }
        }

        // TODO : fetching the component initial props happens after getting user info. should use Promise.all to get the promises going in parallel.
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <WebsocketsContainer>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </WebsocketsContainer>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(makeStore)(DariaApp);
