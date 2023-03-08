import React from 'react';
import '../../styles/globals.css';
import '../../styles/player.css';
import '../../scss/main.scss';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import store from '../redux';
import { PersistGate } from 'redux-persist/integration/react';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        return {
            pageProps: {
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
            }
        };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <React.Fragment>
                {process.browser ? (
                    <Provider store={store}>
                        <PersistGate persistor={store.__PERSISTOR} loading={null}>
                            <Component {...pageProps} />
                        </PersistGate>
                    </Provider>
                ) : (
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                )}
            </React.Fragment>
        );
    }
}
const makeStore = () => store;
export default withRedux(makeStore)(MyApp);
