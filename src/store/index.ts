import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


import rootReducer from './rootReducer';

export type AppState = ReturnType<typeof rootReducer>;

export const configureStore = (preloadedState: any = undefined) => {
    const middlewares = [thunk];    // Other middlewares go here
    const enhancers = [applyMiddleware(...middlewares)]; // Other custom enhancers go here
    
    const store = createStore(rootReducer, preloadedState, composeWithDevTools(...enhancers));

    // if (process.env.NODE_ENV !== 'production' && module.hot) {
    //     module.hot.accept('./reducers', () => store.replaceReducer(reducer))
    // }

    return store;
};
