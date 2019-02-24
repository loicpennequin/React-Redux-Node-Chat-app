import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './../reducers';

const logger = createLogger({
    collapsed: true
});

const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

export default function(initialState, { isServer }) {
    const middlewares = isServer ? [thunk] : [thunk, logger];
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );
}
