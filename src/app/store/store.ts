import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';

// Individual reducers
import { dataSourcesReducer } from '../../containers/data-sources/data-sources-store';
import { sageBarReducer } from '../../containers/sage-bar/sage-bar-store';

declare const window: any;

/**
 * Root Reducer
 */
const rootReducer = combineReducers({
    dataSources: dataSourcesReducer,
    sageBar: sageBarReducer,
});

/**
 * Typescript type for whole AppState
 */
export type AppState = ReturnType<typeof rootReducer>;

// For Redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Middlewares
 */
const middlewares =  composeEnhancers(
    applyMiddleware(thunk)
);

/**
 * Store
 */
export const store = createStore(
    rootReducer,
    middlewares
);
