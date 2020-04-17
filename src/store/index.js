import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import rootSaga from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware(rootSaga);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers, 
    /* preloadedState, */ 
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

// const store = createStore(
//     reducers,
//     {},
//     applyMiddleware(sagaMiddleware)
// );

sagaMiddleware.run(rootSaga);

export default store;