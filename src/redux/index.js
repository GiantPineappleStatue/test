import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './reducers';
let store;
let initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}
const isClient = typeof window !== 'undefined';
if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;
    // const storage = require('../storage');
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['auth']
    };

    store = createStore(
        persistReducer(persistConfig, rootReducer),
        initialState,
        applyMiddleware(...middleware)
    );
    store.__PERSISTOR = persistStore(store);
} else {
    store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
sagaMiddleware.run(rootSaga);
export default store;
