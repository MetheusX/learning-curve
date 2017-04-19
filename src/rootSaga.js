import { fork } from 'redux-saga/effects';
import watchShopSaga from './saga/shopSaga';

export default function* rootSaga() {
  yield fork(watchShopSaga);
}
