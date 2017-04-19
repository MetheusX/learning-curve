import { createStore, applyMiddleware, compose } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga'
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export default () => createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export function runSaga(){
  sagaMiddleware.run(rootSaga);
}
